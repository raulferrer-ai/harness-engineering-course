import { readFile } from "node:fs/promises";
import process from "node:process";

const data = JSON.parse(await readFile(new URL("../fixtures/lab08-release-gates.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = v => typeof v === "string" && v.trim().length > 0;
const unique = (items, label) => {
  const seen = new Set();
  for (const item of items ?? []) {
    if (!nonempty(item.id) || seen.has(item.id)) errors.push(`${label}: ID vacío o duplicado ${item.id}`);
    seen.add(item.id);
  }
};
if (data.schema_version !== 1) errors.push("schema_version debe ser 1");
if (!nonempty(data.release_id) || !nonempty(data.purpose)) errors.push("falta release_id o propósito");
const evidence = data.required_evidence ?? [];
unique(evidence, "evidencias");
if (evidence.length < 5) errors.push("se requieren al menos cinco evidencias");
const evidenceIds = new Set(evidence.map(x => x.id));
for (const item of evidence) if (!nonempty(item.name) || !nonempty(item.description)) errors.push(`${item.id}: nombre o descripción ausente`);
const gates = data.gates ?? [];
unique(gates, "gates");
if (gates.length < 4) errors.push("se requieren al menos cuatro gates");
for (const gate of gates) {
  if (!Array.isArray(gate.required) || !gate.required.length) errors.push(`${gate.id}: sin evidencias requeridas`);
  for (const id of gate.required ?? []) if (!evidenceIds.has(id)) errors.push(`${gate.id}: evidencia desconocida ${id}`);
  if (gate.failure !== "block") errors.push(`${gate.id}: la política de fallo debe bloquear`);
}
const scenarios = data.scenarios ?? [];
unique(scenarios, "escenarios");
if (scenarios.length < 6) errors.push("se requieren al menos seis escenarios");
for (const item of scenarios) if (!nonempty(item.input) || !nonempty(item.expected)) errors.push(`${item.id}: falta entrada o resultado esperado`);
const criteria = data.acceptance_criteria ?? [];
unique(criteria, "criterios");
if (criteria.length < 5) errors.push("se requieren al menos cinco criterios");
for (const item of criteria) for (const field of ["condition","evidence","verification"]) if (!nonempty(item[field])) errors.push(`${item.id}: falta ${field}`);
if (data.policy?.default !== "block" || data.policy?.missing_evidence !== "block" || data.policy?.commit_mismatch !== "block") errors.push("la política debe bloquear por defecto y ante evidencia ausente o inconsistente");
if (data.policy?.approval_cannot_override_failed_tests !== true || data.policy?.deployment_is_separate_from_eligibility !== true) errors.push("faltan salvaguardas de aprobación/despliegue");
if (!Array.isArray(data.audit_record_fields) || !["release_id","source_revision","artifact_digest","decision"].every(x => data.audit_record_fields.includes(x))) errors.push("registro de auditoría insuficiente");
if (!Array.isArray(data.limitations) || data.limitations.length < 2) errors.push("faltan limitaciones");
if (errors.length) {
  for (const error of errors) console.error(`LAB-08 release gates: ${error}`);
  process.exit(1);
}
console.log(`LAB-08 fixture OK: ${evidence.length} evidencias, ${gates.length} gates, ${scenarios.length} escenarios.`);
