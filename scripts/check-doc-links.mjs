import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirectories = new Set([".git", "node_modules", "_site", "coverage"]);
const markdownFiles = [];

function walk(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) markdownFiles.push(absolute);
  }
}

function slugHeading(heading) {
  return heading
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/\x60([^\x60]*)\x60/g, "$1")
    .replace(/[*_~]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function targetExists(raw, sourceFile) {
  const hashIndex = raw.indexOf("#");
  const beforeHash = hashIndex < 0 ? raw : raw.slice(0, hashIndex);
  const queryIndex = beforeHash.indexOf("?");
  const rawPath = queryIndex < 0 ? beforeHash : beforeHash.slice(0, queryIndex);
  const rawFragment = hashIndex < 0 ? "" : raw.slice(hashIndex + 1);
  let pathname, fragment;
  try {
    pathname = decodeURIComponent(rawPath);
    fragment = decodeURIComponent(rawFragment);
  } catch {
    return { exists: false, reason: "URL local mal codificada" };
  }
  const resolved = pathname ? (pathname.startsWith("/")
    ? path.resolve(root, "." + pathname)
    : path.resolve(path.dirname(sourceFile), pathname)) : sourceFile;
  if (resolved !== root && !resolved.startsWith(root + path.sep))
    return { exists: false, reason: "el enlace sale del repositorio" };
  const candidates = pathname ? [resolved, path.join(resolved, "index.md"), path.join(resolved, "index.html")] : [sourceFile];
  const target = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!target) return { exists: false, resolved };
  if (!fragment) return { exists: true, resolved };
  const content = fs.readFileSync(target, "utf8")
    .replace(/\x60\x60\x60[\s\S]*?\x60\x60\x60|~~~[\s\S]*?~~~/g, "")
    .replace(/(^|[^\x60])\x60+[^\x60\n]*\x60+(?!\x60)/g, "$1")
    .replace(/<!--[\s\S]*?-->/g, "");
  const ids = new Set();
  const headingPattern = /^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$|^ {0,3}(?!#)(.+?)\r?\n {0,3}(=+|-+)\s*$/gm;
  for (const match of content.matchAll(headingPattern)) {
    const heading = (match[1] ?? match[2]).trim().replace(/\s+#+\s*$/, "");
    const base = slugHeading(heading);
    if (!base) continue;
    let slug = base, suffix = 1;
    while (ids.has(slug)) slug = base + "-" + suffix++;
    ids.add(slug);
  }
  for (const tag of content.matchAll(/<[a-z][^>]*>/gi)) {
    for (const match of tag[0].matchAll(/\b(?:id|name)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s"'=<> \x60]+))/gi)) {
      ids.add(match[1] ?? match[2] ?? match[3]);
    }
  }
  return ids.has(fragment) ? { exists: true, resolved } : { exists: false, reason: "ancla no encontrada", resolved, fragment };
}

walk(root);
const errors = [];
let linksChecked = 0;
const linkPattern = /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\)/g;

for (const file of markdownFiles) {
  const source = fs.readFileSync(file, "utf8");
  const withoutCode = source
    .replace(/\x60\x60\x60[\s\S]*?\x60\x60\x60|~~~[\s\S]*?~~~/g, "")
    .replace(/(^|[^\x60])\x60+[^\x60\n]*\x60+(?!\x60)/g, "$1")
    .replace(/<!--[\s\S]*?-->/g, "");
  const referenceDefinitions = new Map();
  for (const match of withoutCode.matchAll(/^\s{0,3}\[([^\]]+)\]:\s*<?([^\s>]+)>?/gm)) {
    referenceDefinitions.set(match[1].trim().toLowerCase(), match[2].trim());
  }
  const referenceUses = /(?<!!)\[([^\]]+)\](?:\[([^\]]*)\])?/g;
  for (const match of withoutCode.matchAll(referenceUses)) {
    const lineStart = withoutCode.lastIndexOf("\n", match.index - 1) + 1;
    const nextLine = withoutCode.indexOf("\n", match.index);
    const line = withoutCode.slice(lineStart, nextLine < 0 ? undefined : nextLine);
    if (/^\s{0,3}\[[^\]]+\]:/.test(line) || withoutCode[match.index + match[0].length] === "(") continue;
    const hasExplicitLabel = match[0].includes("][");
    const label = (match[2] || match[1]).trim().toLowerCase();
    const raw = referenceDefinitions.get(label);
    if (!hasExplicitLabel && !raw) continue;
    if (!raw) {
      errors.push(`${path.relative(root, file)}: definición de enlace Markdown no encontrada "[${label}]".`);
      continue;
    }
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(raw)) continue;
    linksChecked++;
    const result = targetExists(raw, file);
    if (!result.exists) {
      const from = path.relative(root, file);
      const to = result.resolved ? path.relative(root, result.resolved) : raw;
      errors.push(`${from}: ${result.reason ?? "enlace local no encontrado"} "${raw}"${result.fragment ? ` (ancla: #${result.fragment})` : ""} (destino: ${to})`);
    }
  }
  for (const match of withoutCode.matchAll(linkPattern)) {
    const raw = (match[1] ?? match[2] ?? "").trim();
    if (!raw || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(raw)) continue;
    linksChecked++;
    const result = targetExists(raw, file);
    if (!result.exists) {
      const from = path.relative(root, file);
      const to = result.resolved ? path.relative(root, result.resolved) : raw;
      errors.push(`${from}: ${result.reason ?? "enlace local no encontrado"} "${raw}" (destino: ${to})`);
    }
  }
}

if (errors.length) {
  console.error(`Falló la validación de enlaces Markdown: ${errors.length} problema(s) en ${markdownFiles.length} archivo(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`PASS documentación: ${markdownFiles.length} archivos Markdown y ${linksChecked} enlaces locales comprobados.`);
}
