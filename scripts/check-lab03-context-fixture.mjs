import { readFile } from "node:fs/promises";
import process from "node:process";

const data = JSON.parse(await readFile(new URL("../fixtures/lab03-context-experiment.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = (v) => typeof v === "string" && v.trim().length > 0;
if (data.schema_version !== 1) errors.push("schema_version debe ser 1");
if (!nonempty(data.task?.id) || !nonempty(data.task?.prompt)) errors.push("falta ID o prompt de tarea");
if (!Array.isArray(data.task?.acceptance_criteria) || data.task.acceptance_criteria.length < 4) errors.push("se requieren criterios de aceptación");
const variants = data.context_variants ?? [];
const variantIds = new Set();
for (const variant of variants) {
  if (!nonempty(variant.id) || variantIds.has(variant.id)) errors.push(`ID de variante vacío o duplicado: ${variant.id}`);
  variantIds.add(variant.id);
  if (!Array.isArray(variant.files) || variant.files.length === 0) errors.push(`${variant.id}: manifiesto de contexto vacío`);
  const paths = new Set();
  for (const file of variant.files ?? []) {
    if (!nonempty(file.path) || !nonempty(file.version) || !nonempty(file.role)) errors.push(`${variant.id}: archivo sin ruta, versión o rol`);
    if (paths.has(file.path)) errors.push(`${variant.id}: ruta duplicada ${file.path}`);
    paths.add(file.path);
  }
}
if (variants.length !== 3) errors.push("se requieren exactamente tres variantes comparables");
const cases = data.reference_cases ?? [];
const caseIds = new Set();
for (const item of cases) {
  if (!nonempty(item.id) || caseIds.has(item.id)) errors.push(`ID de caso vacío o duplicado: ${item.id}`);
  caseIds.add(item.id);
  if (!nonempty(item.question)) errors.push(`${item.id}: falta pregunta`);
  if (!Array.isArray(item.expected_facts) || item.expected_facts.length === 0) errors.push(`${item.id}: faltan hechos de referencia`);
  if (!Array.isArray(item.required_sources) || item.required_sources.length === 0) errors.push(`${item.id}: faltan fuentes requeridas`);
}
if (cases.length < 5) errors.push("se requieren al menos cinco casos de referencia");
for (const field of ["fixed_variables", "per_run_record", "rules"]) {
  if (!Array.isArray(data.measurement_policy?.[field]) || data.measurement_policy[field].length === 0) errors.push(`falta measurement_policy.${field}`);
}
if (errors.length) {
  for (const error of errors) console.error(`LAB-03 context fixture: ${error}`);
  process.exit(1);
}
console.log(`LAB-03 fixture OK: ${variants.length} variantes, ${cases.length} casos, política de medición definida.`);
