import { readFile } from "node:fs/promises";
import process from "node:process";

let data;
try {
  data = JSON.parse(await readFile(process.env.LAB03_FIXTURE_PATH ?? new URL("../fixtures/lab03-context-experiment.json", import.meta.url), "utf8"));
} catch (error) {
  console.error(`LAB-03 context fixture: no se pudo leer o interpretar JSON: ${error.message}`);
  process.exit(1);
}
if (!data || typeof data !== "object" || Array.isArray(data)) {
  console.error("LAB-03 context fixture: la raíz debe ser un objeto JSON");
  process.exit(1);
}
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
const availableSourcePaths = new Set(
  variants.flatMap(variant => (variant.files ?? [])
    .filter(file => nonempty(file.path))
    .map(file => file.path.split("#", 1)[0]))
);
const cases = data.reference_cases ?? [];
const caseIds = new Set();
for (const item of cases) {
  if (!nonempty(item.id) || caseIds.has(item.id)) errors.push(`ID de caso vacío o duplicado: ${item.id}`);
  caseIds.add(item.id);
  if (!nonempty(item.question)) errors.push(`${item.id}: falta pregunta`);
  if (!Array.isArray(item.expected_facts) || item.expected_facts.length === 0) errors.push(`${item.id}: faltan hechos de referencia`);
  else if (item.expected_facts.some(fact => !nonempty(fact))) errors.push(`${item.id}: los hechos de referencia deben ser texto no vacío`);
  if (!Array.isArray(item.required_sources) || item.required_sources.length === 0) errors.push(`${item.id}: faltan fuentes requeridas`);
  else {
    if (item.required_sources.some(source => !nonempty(source))) errors.push(`${item.id}: las fuentes requeridas deben ser texto no vacío`);
    if (new Set(item.required_sources).size !== item.required_sources.length) errors.push(`${item.id}: las fuentes requeridas no pueden estar duplicadas`);
    for (const source of item.required_sources) {
      if (nonempty(source) && !availableSourcePaths.has(source)) {
        errors.push(`${item.id}: fuente requerida no presente en ninguna variante ${source}`);
      }
    }
  }
}
if (cases.length < 5) errors.push("se requieren al menos cinco casos de referencia");
for (const field of ["fixed_variables", "per_run_record", "rules"]) {
  if (!Array.isArray(data.measurement_policy?.[field]) || data.measurement_policy[field].length === 0) errors.push(`falta measurement_policy.${field}`);
  else if (data.measurement_policy[field].some(item => !nonempty(item))) errors.push(`measurement_policy.${field} contiene elementos vacíos`);
}
if (errors.length) {
  for (const error of errors) console.error(`LAB-03 context fixture: ${error}`);
  process.exit(1);
}
console.log(`LAB-03 fixture OK: ${variants.length} variantes, ${cases.length} casos, política de medición definida.`);
