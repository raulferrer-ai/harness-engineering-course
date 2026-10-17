import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.env.SITE_DIR ?? path.join(process.cwd(), "_site"));
const htmlFiles = [];
async function walk(directory) {
  let entries;
  try { entries = await readdir(directory, { withFileTypes: true }); }
  catch (error) {
    if (error.code === "ENOENT") throw new Error(`Generated site directory not found: ${directory}. Run the build first.`);
    throw error;
  }
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) htmlFiles.push(absolute);
  }
}
const attr = (tag, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(new RegExp("(?:^|\\s)" + escaped + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s>]+))", "i"));
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : null;
};
await walk(root);
if (htmlFiles.length === 0) {
  console.error("Accessibility structure check failed: no generated HTML pages found.");
  process.exit(1);
}
const errors = [];
for (const file of htmlFiles) {
  const relative = path.relative(root, file);
  const html = await readFile(file, "utf8");
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0];
  if (!htmlTag || !attr(htmlTag, "lang")?.trim()) errors.push(`${relative}: <html> must declare a non-empty lang attribute`);
  const mains = [...html.matchAll(/<main\b[^>]*>/gi)];
  if (mains.length !== 1) errors.push(`${relative}: expected exactly one main landmark; found ${mains.length}`);
  const h1Count = [...html.matchAll(/<h1\b[^>]*>/gi)].length;
  if (h1Count !== 1) errors.push(`${relative}: expected exactly one h1; found ${h1Count}`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    const alt = attr(image[0], "alt");
    if (alt === null) errors.push(`${relative}: img element is missing its alt attribute`);
    else if (alt.trim() === "" && !/(?:^|\\s)alt\\s*=\\s*(?:""|\x27\x27)/i.test(image[0])) errors.push(`${relative}: img alt text must not contain whitespace only; use alt="" for decorative images`);
  }
  const idValues = [...html.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)].map(match => match[1] ?? match[2]);
  const availableIds = new Set(idValues);
  const seenIds = new Set();
  for (const id of idValues) {
    if (seenIds.has(id)) errors.push(relative + ': duplicate id attribute value "' + id + '"');
    seenIds.add(id);
  }
  for (const tag of html.matchAll(/<[a-z][\w:-]*\b([^>]*)>/gi)) {
    const labelledBy = (attr(tag[1], "aria-labelledby") ?? "").trim().split(/\s+/).filter(Boolean);
    for (const id of labelledBy) {
      if (!availableIds.has(id)) errors.push(relative + ': aria-labelledby references missing id "' + id + '"');
    }
  }
  for (const anchor of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attributes = anchor[1];
    const inner = anchor[2];
    const textContent = inner.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;/gi, " ").trim();
    const labelledBy = (attr(attributes, "aria-labelledby") ?? "").trim().split(/\s+/).filter(Boolean);
    const validLabelledBy = labelledBy.length > 0 && labelledBy.every(id => availableIds.has(id));
    const hasAccessibleName = Boolean(attr(attributes, "aria-label")?.trim() || validLabelledBy || textContent || [...inner.matchAll(/<img\b[^>]*>/gi)].some(image => Boolean(attr(image[0], "alt")?.trim())));
    if (!hasAccessibleName) errors.push(`${relative}: link has no detectable accessible name`);
  }
}
if (errors.length) {
  console.error(`Accessibility structure check failed: ${errors.length} issue(s) across ${htmlFiles.length} HTML page(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`PASS accessibility structure: ${htmlFiles.length} HTML pages declare language, one main landmark, one h1, and alt attributes on images.`);
