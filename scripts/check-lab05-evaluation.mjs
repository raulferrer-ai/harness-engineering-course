import { readFile } from "node:fs/promises";
import process from "node:process";

const data = JSON.parse(await readFile(new URL("../fixtures/lab05-evaluation.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = (v) => typeof v === "string" && v.trim().length > 0;
const unique = (items, label) => {
  const seen = new Set();
  for (const item of items ?? []) {
    if (!nonempty(item.id) || seen.has(item.id)) errors.push(`${label}: ID vacío o duplicado ${item.id}`);
    seen.add(item.id);
  }
};
if (data.schema_version !== 1) errors.push("schema_version debe ser 1");
if (!nonempty(data.evaluation_id) || !nonempty(data.purpose)) errors.push("falta identificación o propósito");
const rubric = data.rubric ?? [];
unique(rubric, "rúbrica");
if (rubric.length < 4) errors.push("se requieren al menos cuatro dimensiones");
const weightSum = rubric.reduce((sum, item) => sum + (typeof item.weight === "number" ? item.weight : 0), 0);
if (Math.abs(weightSum - 1) > 0.000001) errors.push(`los pesos deben sumar 1 (actual: ${weightSum})`);
for (const item of rubric) if (!nonempty(item.dimension) || !nonempty(item.description)) errors.push(`${item.id}: dimensión o descripción ausente`);
if (data.score_scale?.minimum !== 0 || data.score_scale?.maximum !== 4) errors.push("la escala debe ir de 0 a 4");
for (let score = 0; score <= 4; score++) if (!nonempty(data.score_scale?.anchors?.[score])) errors.push(`falta anclaje de puntuación ${score}`);
const cases = data.cases ?? [];
unique(cases, "casos");
if (cases.length < 3) errors.push("se requieren al menos tres casos");
for (const item of cases) {
  for (const field of ["prompt", "reference_facts", "required_evidence", "critical_failures"]) {
    if (!(Array.isArray(item[field]) ? item[field].length : nonempty(item[field]))) errors.push(`${item.id}: falta ${field}`);
  }
}
for (const field of ["steps", "critical_failure_policy", "missing_data_policy", "limitations"]) {
  if (!(Array.isArray(data.scoring_protocol?.[field]) ? data.scoring_protocol[field].length : nonempty(data.scoring_protocol?.[field]))) errors.push(`falta scoring_protocol.${field}`);
}
if (errors.length) {
  for (const error of errors) console.error(`LAB-05 evaluation fixture: ${error}`);
  process.exit(1);
}
console.log(`LAB-05 fixture OK: ${rubric.length} dimensiones (pesos ${weightSum}), ${cases.length} casos y protocolo de puntuación definido.`);
