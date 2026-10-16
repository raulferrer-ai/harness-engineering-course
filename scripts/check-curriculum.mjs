import { readFile, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const modulesPath = path.join(root, "src/_data/modules.json");
const curriculumPath = path.join(root, "docs/curriculum.md");
const modules = JSON.parse(await readFile(modulesPath, "utf8"));
const curriculum = await readFile(curriculumPath, "utf8");
const errors = [];
const seen = { id: new Set(), slug: new Set(), labId: new Set() };

if (!Array.isArray(modules) || modules.length !== 10) {
  errors.push(`Expected exactly 10 approved modules (M01–M10); found ${Array.isArray(modules) ? modules.length : "non-array"}.`);
}

for (const [index, module] of modules.entries()) {
  const where = module?.id ?? `modules[${index}]`;
  for (const key of ["id", "slug", "labId"]) {
    const value = module?.[key];
    if (typeof value !== "string" || !value.trim()) {
      errors.push(`${where}: missing or invalid ${key}.`);
    } else if (seen[key].has(value)) {
      errors.push(`${where}: duplicate ${key} "${value}".`);
    } else {
      seen[key].add(value);
    }
  }

  for (const key of ["hours", "fundamentalsHours", "labHours"]) {
    if (!Number.isFinite(module?.[key]) || module[key] <= 0) {
      errors.push(`${where}: ${key} must be a positive number.`);
    }
  }

  if (Number.isFinite(module?.hours) &&
      Number.isFinite(module?.fundamentalsHours) &&
      Number.isFinite(module?.labHours) &&
      module.hours !== module.fundamentalsHours + module.labHours) {
    errors.push(`${where}: hours must equal fundamentalsHours + labHours.`);
  }

  if (module?.id && !curriculum.includes(module.id)) {
    errors.push(`${where}: ID is missing from docs/curriculum.md.`);
  }

  if (typeof module?.slug === "string" && module.slug) {
    const pagePath = path.join(root, "src/modulos", `${module.slug}.njk`);
    try {
      await access(pagePath);
    } catch {
      errors.push(`${where}: missing dedicated page src/modulos/${module.slug}.njk.`);
    }
  }
}

if (errors.length) {
  console.error(`Curriculum check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const total = modules.reduce((sum, module) => sum + module.hours, 0);
console.log(`Curriculum check passed: ${modules.length} modules, ${total} module hours, unique IDs/slugs/labs, consistent hours, and dedicated pages present.`);
