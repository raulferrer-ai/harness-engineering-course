import { readFile } from "node:fs/promises";
import process from "node:process";

const path = process.env.LAB02_FIXTURE_PATH ?? new URL("../fixtures/lab02-specification.json", import.meta.url);
const data = JSON.parse(await readFile(path, "utf8"));
const errors = [];
const requiredText = (value) => typeof value === "string" && value.trim().length > 0;
if (data.schema_version !== 1) errors.push("schema_version debe ser 1");
if (!requiredText(data.source_request)) errors.push("falta source_request");
if (!Array.isArray(data.blocking_questions) || data.blocking_questions.length < 1) errors.push("debe haber preguntas bloqueantes");
else if (data.blocking_questions.some(question => !requiredText(question))) errors.push("cada pregunta bloqueante debe ser texto no vacío");
for (const key of ["allowed", "forbidden"]) {
  if (!Array.isArray(data.scope?.[key]) || data.scope[key].length < 1) errors.push(`scope.${key} debe contener al menos un elemento`);
  else if (data.scope[key].some(item => !requiredText(item))) errors.push(`scope.${key} no puede contener elementos vacíos`);
}
if (!Array.isArray(data.acceptance_criteria) || data.acceptance_criteria.length < 4) errors.push("se requieren al menos cuatro criterios de aceptación");
const ids = new Set();
for (const criterion of data.acceptance_criteria ?? []) {
  if (!requiredText(criterion.id) || ids.has(criterion.id)) errors.push(`ID de criterio vacío o duplicado: ${criterion.id}`);
  ids.add(criterion.id);
  for (const field of ["condition", "evidence", "verification"]) {
    if (!requiredText(criterion[field])) errors.push(`${criterion.id || "criterio"}: falta ${field}`);
  }
}
if (!Array.isArray(data.stop_conditions) || data.stop_conditions.length < 1) errors.push("faltan condiciones de parada");
else if (data.stop_conditions.some(condition => !requiredText(condition))) errors.push("cada condición de parada debe ser texto no vacío");
if (!requiredText(data.decision?.status) || !requiredText(data.decision?.reason)) errors.push("la decisión debe incluir estado y justificación");
if (errors.length) {
  for (const error of errors) console.error(`LAB-02 specification: ${error}`);
  process.exit(1);
}
console.log(`LAB-02 specification OK: ${data.acceptance_criteria.length} criterios con evidencia y verificación; ${data.stop_conditions.length} condiciones de parada.`);
