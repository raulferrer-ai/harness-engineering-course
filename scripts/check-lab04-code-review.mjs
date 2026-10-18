import { readFile } from "node:fs/promises";
import process from "node:process";

let data;
try {
  data = JSON.parse(await readFile(process.env.LAB04_FIXTURE_PATH ?? new URL("../fixtures/lab04-code-review.json", import.meta.url), "utf8"));
} catch (error) {
  console.error(`LAB-04 code review: no se pudo leer o interpretar JSON: ${error.message}`);
  process.exit(1);
}
if (!data || typeof data !== "object" || Array.isArray(data)) {
  console.error("LAB-04 code review: la raíz debe ser un objeto JSON");
  process.exit(1);
}
const errors = [];
const text = (v) => typeof v === "string" && v.trim().length > 0;
const unique = (items, label) => {
  const ids = new Set();
  for (const item of items ?? []) {
    if (!text(item.id) || ids.has(item.id)) errors.push(`${label}: ID vacío o duplicado: ${item.id}`);
    ids.add(item.id);
  }
};
if (data.schema_version !== 1) errors.push("schema_version debe ser 1");
if (!text(data.change_request?.id) || !text(data.change_request?.request)) errors.push("falta solicitud o ID del cambio");
for (const key of ["scope_allowed", "scope_forbidden"]) {
  if (!Array.isArray(data.change_request?.[key]) || !data.change_request[key].length) errors.push(`falta change_request.${key}`);
}
const criteria = data.change_request?.acceptance_criteria ?? [];
if (criteria.length < 4) errors.push("se requieren al menos cuatro criterios");
unique(criteria, "criterios");
for (const criterion of criteria) {
  for (const field of ["condition", "evidence", "verification"]) if (!text(criterion[field])) errors.push(`${criterion.id}: falta ${field}`);
}
const matrix = data.test_matrix ?? [];
if (matrix.length < 4) errors.push("se requieren casos positivos, negativos y regresión");
unique(matrix, "tests");
for (const test of matrix) {
  if (!["positive", "negative", "edge", "regression"].includes(test.kind)) errors.push(`${test.id}: tipo de prueba no válido`);
  if (!text(test.expected) || !criteria.some(c => c.id === test.criterion)) errors.push(`${test.id}: expectativa vacía o criterio desconocido`);
}
for (const kind of ["positive", "negative", "edge", "regression"]) {
  if (!matrix.some(test => test.kind === kind)) errors.push(`falta al menos un caso de prueba de tipo ${kind}`);
}
const coveredCriteria = new Set(matrix.map(test => test.criterion).filter(id => criteria.some(criterion => criterion.id === id)));
for (const criterion of criteria) {
  const requiresTest = /ejecutar|prueba|test/i.test(criterion.verification ?? "");
  if (requiresTest && !coveredCriteria.has(criterion.id)) errors.push(`${criterion.id}: criterio verificable por prueba sin caso asociado`);
}
const requiredBaselineFields = data.baseline_record?.required ?? [];
for (const field of ["base_commit", "runtime_version", "install_command", "test_command", "test_output_before", "known_failures"]) {
  if (!requiredBaselineFields.includes(field)) errors.push(`línea base: falta campo requerido ${field}`);
}
if (new Set(requiredBaselineFields).size !== requiredBaselineFields.length) errors.push("línea base: campos requeridos duplicados");
if (requiredBaselineFields.some(field => !text(field))) errors.push("línea base: campos requeridos vacíos");
if (!Array.isArray(data.review_checklist) || data.review_checklist.length < 4) errors.push("checklist de revisión insuficiente");
else if (data.review_checklist.some(item => !text(item))) errors.push("checklist de revisión contiene controles vacíos");
if (!["accept", "request_changes", "reject", "blocked"].includes(data.decision_gate?.default)) errors.push("decisión inicial no válida");
if (errors.length) {
  for (const error of errors) console.error(`LAB-04 review fixture: ${error}`);
  process.exit(1);
}
console.log(`LAB-04 fixture OK: ${criteria.length} criterios, ${matrix.length} pruebas (positivas, negativas, borde y regresión) y ${data.review_checklist.length} controles de revisión.`);
