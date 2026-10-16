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

function resolveLocalUrl(value, sourcePath) {
  const parsed = new URL(value, `https://route-check.invalid${sourcePath}`);
  if (parsed.origin !== "https://route-check.invalid") return null;
  const pathname = decodeURIComponent(parsed.pathname);
  const target = path.resolve(outputDir, `.${pathname}`);
  if (target !== outputDir && !target.startsWith(outputDir + path.sep)) {
    throw new Error(`Path escapes generated site: ${value}`);
  }
  return { target, fragment: decodeURIComponent(parsed.hash.slice(1)) };
}

const failures = [];
await walk(outputDir);
if (htmlFiles.length === 0) {
  console.error("Route check failed: no generated HTML files found in _site/.");
  process.exit(1);
}

const idCache = new Map();
async function idsIn(file) {
  if (!idCache.has(file)) {
    const html = await readFile(file, "utf8");
    idCache.set(file, new Set([...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(match => match[1])));
  }
  return idCache.get(file);
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const sourcePath = browserPath(file);
  const attributes = [...html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']*)["']/gi)];

  for (const match of attributes) {
    const value = match[1].trim();
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
      if (!(await idsIn(target)).has(resolved.fragment)) {
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
