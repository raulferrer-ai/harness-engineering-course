import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("_site");
const htmlFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(fullPath);
  }
}

function browserPath(file) {
  const relative = path.relative(outputDir, file).split(path.sep).join("/");
  return relative.endsWith("/index.html")
    ? `/${relative.slice(0, -"index.html".length)}`
    : `/${relative}`;
}

function extractStartTags(markup) {
  const tags = [];
  for (let index = 0; index < markup.length; index++) {
    if (markup[index] !== "<" || !/[a-z]/i.test(markup[index + 1] ?? "")) continue;
    const start = index;
    let quote = null;
    for (index++; index < markup.length; index++) {
      const character = markup[index];
      if (quote) {
        if (character === quote) quote = null;
      } else if (character === '"' || character === "'") {
        quote = character;
      } else if (character === ">") {
        tags.push(markup.slice(start, index + 1));
        break;
      }
    }
  }
  return tags;
}

function resolveLocalUrl(value, sourcePath) {
  const parsed = new URL(value, `https://route-check.invalid${sourcePath}`);
  if (parsed.origin !== "https://route-check.invalid") return null;
  let pathname;
  let fragment;
  try {
    pathname = decodeURIComponent(parsed.pathname);
    fragment = decodeURIComponent(parsed.hash.slice(1));
  } catch {
    throw new Error(`Malformed percent-encoding in local URL: "${value}"`);
  }
  const target = path.resolve(outputDir, `.${pathname}`);
  if (target !== outputDir && !target.startsWith(outputDir + path.sep)) {
    throw new Error(`Path escapes generated site: ${value}`);
  }
  return { target, fragment };
}

const failures = [];
await walk(outputDir);
if (htmlFiles.length === 0) {
  console.error("Route check failed: no generated HTML files found in _site/.");
  process.exit(1);
}

const idCache = new Map();
async function htmlAnchorsIn(file) {
  if (!idCache.has(file)) {
    const html = (await readFile(file, "utf8"))
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
    const ids = new Set();
    const duplicates = new Set();
    for (const tag of extractStartTags(html)) {
      for (const match of tag.matchAll(/\b(id|name)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s"'=<> \x60]+))/gi)) {
        const value = match[2] ?? match[3] ?? match[4];
        if (match[1].toLowerCase() === "id") {
          if (ids.has(value)) duplicates.add(value);
          ids.add(value);
        } else {
          ids.add(value);
        }
      }
    }
    idCache.set(file, { ids, duplicates });
  }
  return idCache.get(file);
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const sourcePath = browserPath(file);
  const { duplicates } = await htmlAnchorsIn(file);
  for (const id of duplicates) failures.push(sourcePath + ': duplicate HTML id "' + id + '"');

  const markup = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
  const attributes = [];
  for (const tag of extractStartTags(markup)) {
    for (const attribute of tag.matchAll(/\b(href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<> \x60]+))/gi)) {
      attributes.push({ name: attribute[1].toLowerCase(), value: attribute[2] ?? attribute[3] ?? attribute[4] });
    }
  }

  for (const attribute of attributes) {
    const value = attribute.value.trim();
    if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) continue;

    let resolved;
    try {
      resolved = resolveLocalUrl(value, sourcePath);
    } catch (error) {
      failures.push(`${sourcePath}: ${error.message}`);
      continue;
    }
    if (!resolved) continue;

    let target = resolved.target;
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, "index.html");
    } catch {
      if (!path.extname(target)) target = path.join(target, "index.html");
    }

    try {
      if (!(await stat(target)).isFile()) throw new Error("not a file");
    } catch {
      failures.push(`${sourcePath}: broken local URL "${value}" (expected ${path.relative(outputDir, target)})`);
      continue;
    }

    if (resolved.fragment && target.endsWith(".html")) {
      if (!(await htmlAnchorsIn(target)).ids.has(resolved.fragment)) {
        failures.push(`${sourcePath}: missing fragment "#${resolved.fragment}" in ${path.relative(outputDir, target)}`);
      }
    }
  }
}

if (failures.length) {
  console.error(`Route check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Route check passed: checked ${htmlFiles.length} HTML page(s) and their local href/src targets.`);
