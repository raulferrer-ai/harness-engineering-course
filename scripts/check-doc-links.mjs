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

function targetExists(raw, sourceFile) {
  let decoded;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return { exists: false, reason: "URL local mal codificada" };
  }
  const pathname = decoded.split("#")[0].split("?")[0];
  if (!pathname) return { exists: true };
  const resolved = pathname.startsWith("/")
    ? path.resolve(root, "." + pathname)
    : path.resolve(path.dirname(sourceFile), pathname);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    return { exists: false, reason: "el enlace sale del repositorio" };
  }
  const candidates = [resolved, path.join(resolved, "index.md"), path.join(resolved, "index.html")];
  return { exists: candidates.some((candidate) => fs.existsSync(candidate)), resolved };
}

walk(root);
const errors = [];
let linksChecked = 0;
const linkPattern = /!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\)/g;

for (const file of markdownFiles) {
  const source = fs.readFileSync(file, "utf8");
  const referenceDefinitions = new Map();
  const withoutCode = source.replace(/```[\\s\\S]*?```|~~~[\\s\\S]*?~~~/g, "");
  for (const match of withoutCode.matchAll(/^\\s{0,3}\\[([^\\]]+)\\]:\\s*<?([^\\s>]+)>?/gm)) {
    referenceDefinitions.set(match[1].trim().toLowerCase(), match[2].trim());
  }
  const referenceUses = /(?<!!)\\[([^\\]]+)\\](?:\\[([^\\]]*)\\])?/g;
  for (const match of withoutCode.matchAll(referenceUses)) {
    if (match[0].startsWith("[")) continue;
    const label = (match[2] || match[1]).trim().toLowerCase();
    const raw = referenceDefinitions.get(label);
    if (!raw) {
      errors.push(`${path.relative(root, file)}: definición de enlace Markdown no encontrada "[${match[2]}]".`);
      continue;
    }
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(raw)) continue;
    linksChecked++;
    const result = targetExists(raw, file);
    if (!result.exists) {
      const from = path.relative(root, file);
      const to = result.resolved ? path.relative(root, result.resolved) : raw;
      errors.push(`${from}: enlace local no encontrado "${raw}" (destino: ${to})`);
    }
  }
  for (const match of source.matchAll(linkPattern)) {
    const raw = (match[1] ?? match[2] ?? "").trim();
    if (!raw || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(raw)) continue;
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
