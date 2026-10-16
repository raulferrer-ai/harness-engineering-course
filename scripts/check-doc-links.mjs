import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const markdownFiles = ["README.md", ...walk(path.join(root, "docs")).map((file) => path.relative(root, file))]
  .filter((file) => fs.existsSync(path.join(root, file)) && file.endsWith(".md"));

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function targetExists(target) {
  const cleaned = decodeURIComponent(target.split("#")[0].split("?")[0]);
  if (!cleaned) return true;
  const resolved = path.resolve(root, cleaned);
  return fs.existsSync(resolved) || fs.existsSync(path.join(resolved, "index.md")) || fs.existsSync(path.join(resolved, "index.html"));
}

const errors = [];
let linksChecked = 0;
for (const relativeFile of markdownFiles) {
  const source = fs.readFileSync(path.join(root, relativeFile), "utf8");
  const links = source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g);
  for (const match of links) {
    const raw = match[1].trim().replace(/^<|>$/g, "").split(/\s+["']/)[0];
    if (/^(?:https?:|mailto:|tel:|#|data:)/i.test(raw)) continue;
    const target = raw.startsWith("/") ? raw.slice(1) : path.join(path.dirname(relativeFile), raw);
    linksChecked += 1;
    if (!targetExists(target)) errors.push(`${relativeFile}: enlace local no encontrado: ${raw}`);
  }
}

if (errors.length) {
  console.error("Falló la validación de enlaces de documentación:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`PASS documentación: ${markdownFiles.length} archivos Markdown, ${linksChecked} enlaces locales comprobados.`);
}
