import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { parsePrimaryTraceability } from "./lib/parse-traceability.mjs";

const root = process.cwd();
const modulesPath = path.join(root, "src/_data/modules.json");
const curriculumPath = path.join(root, "docs/curriculum.md");
const traceabilityPath = path.join(root, "docs/traceability.md");
const modules = JSON.parse(await readFile(modulesPath, "utf8"));
const curriculum = await readFile(curriculumPath, "utf8");
const traceability = await readFile(traceabilityPath, "utf8");
const errors = [];
const seen = { id: new Set(), slug: new Set(), labId: new Set() };
const expectedModuleIds = Array.from({ length: 10 }, (_, i) => `M${String(i + 1).padStart(2, "0")}`);
const expectedLabIds = Array.from({ length: 10 }, (_, i) => `LAB-${String(i + 1).padStart(2, "0")}`);
const expectedCompetencyIds = Array.from({ length: 9 }, (_, i) => `COMP-${String(i + 1).padStart(2, "0")}`);

if (!Array.isArray(modules) || modules.length !== expectedModuleIds.length) {
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

  if (module?.id && !expectedModuleIds.includes(module.id)) {
    errors.push(`${where}: module ID is outside the approved M01–M10 scope.`);
  }

  if (module?.labId && !expectedLabIds.includes(module.labId)) {
    errors.push(`${where}: lab ID is outside the approved LAB-01–LAB-10 scope.`);
  }

  if (module?.id && module?.labId) {
    const expectedLabId = `LAB-${module.id.slice(1)}`;
    if (module.labId !== expectedLabId) {
      errors.push(`${where}: expected associated lab ${expectedLabId}, found ${module.labId}.`);
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
  if (module?.labId && !curriculum.includes(module.labId)) {
    errors.push(`${where}: lab ID is missing from docs/curriculum.md.`);
  }

  if (module?.id && [module?.fundamentalsHours, module?.labHours, module?.hours].every(Number.isFinite)) {
    const rowPattern = "^\\|\\s*" + module.id + "\\s*\\|[^\\n]*?\\|\\s*(\\d+)\\s*h\\s*\\|\\s*(\\d+)\\s*h\\s*\\|\\s*(\\d+)\\s*h\\s*\\|";
    const row = new RegExp(rowPattern, "m").exec(curriculum);
    if (!row) {
      errors.push(`${where}: no matching hours row found in docs/curriculum.md.`);
    } else if (Number(row[1]) !== module.fundamentalsHours || Number(row[2]) !== module.labHours || Number(row[3]) !== module.hours) {
      errors.push(`${where}: hours in docs/curriculum.md do not match module metadata (expected ${module.fundamentalsHours}/${module.labHours}/${module.hours}).`);
    }
  }

  if (typeof module?.slug === "string" && module.slug) {
    const pagePath = path.join(root, "src/modulos", `${module.slug}.njk`);
    try {
      await access(pagePath);
      const pageContent = await readFile(pagePath, "utf8");
      const labHeadingPattern = new RegExp(String.raw`${module.labId}\s*·\s*${module.labHours}\\s*HORAS`, "i");
      if (!labHeadingPattern.test(pageContent)) {
        errors.push(`${where}: lab section must identify ${module.labId} and its ${module.labHours}-hour allocation.`);
      }
      const requiredLearningSections = [
        [/Resultados de aprendizaje/i, "observable learning outcomes"],
        [/Criterios de aceptación/i, "acceptance criteria"],
        [/Preguntas de (?:análisis|reflexión)/i, "reflection or analysis questions"],
        [/(?:Evidencias requeridas|Registro de evidencia|Revisión y evidencia|Entregables(?: y evidencia)?)/i, "learner evidence or deliverables"]
      ];
      for (const [pattern, label] of requiredLearningSections) {
        if (!pattern.test(pageContent)) errors.push(`${where}: module page is missing ${label}.`);
      }
      const exampleName = `${String(module.labId ?? "").toLowerCase().replace("-", "")}-worked-example.md`;
      for (const [resource, label] of [
        [`docs/${exampleName}`, "worked example for its own lab"],
        ["docs/lab-evidence-template.md", "lab evidence template"],
        ["docs/traceability.md", "curriculum traceability matrix"]
      ]) {
        if (!pageContent.includes(resource)) {
          errors.push(`${where}: module page must link to the ${label} (${resource}).`);
        }
      }
    } catch {
      errors.push(`${where}: missing dedicated page src/modulos/${module.slug}.njk.`);
    }
  }
}

for (const id of expectedModuleIds) {
  if (!seen.id.has(id)) errors.push(`Approved module ${id} is missing from src/_data/modules.json.`);
  if (!traceability.includes(id)) errors.push(`Traceability matrix does not reference ${id}.`);
}
for (const id of expectedLabIds) {
  if (!seen.labId.has(id)) errors.push(`Approved lab ${id} is missing from module metadata.`);
  if (!curriculum.includes(id)) errors.push(`Approved lab ${id} is missing from docs/curriculum.md.`);
  if (!traceability.includes(id)) errors.push(`Traceability matrix does not reference ${id}.`);
}
for (const id of expectedCompetencyIds) {
  if (!curriculum.includes(id)) errors.push(`Approved competency ${id} is missing from docs/curriculum.md.`);
  if (!traceability.includes(id)) errors.push(`Traceability matrix does not reference ${id}.`);
}

const { competencyRows, moduleRows } = parsePrimaryTraceability(traceability);
for (const id of competencyRows) {
  if (!expectedCompetencyIds.includes(id)) errors.push(`Traceability matrix contains unapproved competency ${id}.`);
}
for (const id of expectedCompetencyIds) {
  const count = competencyRows.filter(value => value === id).length;
  if (count === 0) errors.push(`Traceability matrix has no primary mapping row for competency ${id}.`);
  if (count > 1) errors.push(`Traceability matrix defines competency ${id} more than once in its primary mapping.`);
}
for (const id of moduleRows) {
  if (!expectedModuleIds.includes(id)) errors.push(`Traceability matrix references unapproved module ${id}.`);
}
for (const id of expectedModuleIds) {
  const count = moduleRows.filter(value => value === id).length;
  if (count === 0) errors.push(`Traceability matrix has no primary mapping row for module ${id}.`);
  if (count > 1) errors.push(`Traceability matrix maps module ${id} more than once in its primary mapping.`);
}

// Ensure every repository artifact linked in the traceability matrix actually exists.
const artifactRefs = [...traceability.matchAll(/`((?:src|fixtures|scripts)\/[^`]+)`/g)].map(match => match[1]);
for (const artifact of new Set(artifactRefs)) {
  try {
    await access(path.join(root, artifact));
  } catch {
    errors.push(`Traceability matrix references missing artifact: ${artifact}.`);
  }
}

const total = Array.isArray(modules) ? modules.reduce((sum, module) => sum + (Number.isFinite(module?.hours) ? module.hours : 0), 0) : 0;
if (total !== 104) errors.push(`Expected 104 hours across the ten modules; found ${total}.`);

if (errors.length) {
  console.error(`Curriculum check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Curriculum check passed: ${modules.length} modules, ${total} module hours, all nine competencies and ten labs referenced, unique IDs/slugs/labs, consistent hours, and dedicated pages present.`);
