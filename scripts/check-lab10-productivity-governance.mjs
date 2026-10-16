import { readFile } from "node:fs/promises";
import process from "node:process";

const data = JSON.parse(await readFile(new URL("../fixtures/lab10-productivity-governance.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = v => typeof v === "string" && v.trim().length > 0;
const unique = (items, label) => {
  const seen = new Set();
  for (const item of items ?? []) {
    if (!nonempty(item.id) || seen.has(item.id)) errors.push(`${label}: ID vacío o duplicado ${item.id}`);
    seen.add(item.id);
  }
};
if (data.schema_version !== 1 || !nonempty(data.exercise_id) || !nonempty(data.purpose)) errors.push("identificación o schema_version inválidos");
const c = data.comparison ?? {};
for (const key of ["baseline","assisted"]) {
  const group = c[key];
  if (!nonempty(group?.id)) errors.push(`${key}: falta ID`);
  for (const field of ["tasks_completed","accepted_deliveries","cycle_time_minutes","human_minutes_per_task","defects_found","infra_cost","model_cost"]) {
    if (!Number.isFinite(group?.[field]) || group[field] < 0) errors.push(`${key}: ${field} debe ser numérico y no negativo`);
  }
  if (Number.isFinite(group?.accepted_deliveries) && Number.isFinite(group?.tasks_completed) && group.accepted_deliveries > group.tasks_completed) errors.push(`${key}: entregas aceptadas superan tareas completadas`);
}
if (!Number.isFinite(c.labor_cost_per_hour) || c.labor_cost_per_hour <= 0) errors.push("labor_cost_per_hour debe ser positivo");
if (!c.expected_failure_cost || !["baseline","assisted"].every(k => Number.isFinite(c.expected_failure_cost[k]) && c.expected_failure_cost[k] >= 0)) errors.push("faltan costes esperados de fallos por grupo");
if (!Array.isArray(c.measurement_notes) || c.measurement_notes.length < 2) errors.push("faltan notas sobre calidad de medición");
const metrics = data.metrics ?? [];
unique(metrics,"métricas");
if (metrics.length < 4) errors.push("se requieren al menos cuatro métricas");
for (const m of metrics) if (!nonempty(m.name) || !nonempty(m.unit) || !nonempty(m.definition) || !["higher_is_better","lower_is_better"].includes(m.direction)) errors.push(`${m.id}: definición de métrica inválida`);
const gov = data.governance_matrix ?? [];
unique(gov,"gobernanza");
if (gov.length < 3) errors.push("se requieren al menos tres casos de gobernanza");
for (const g of gov) {
  for (const field of ["use_case","risk","approval","data_rule","owner_role","stop_condition"]) if (!nonempty(g[field])) errors.push(`${g.id}: falta ${field}`);
  if (!["low","medium","high"].includes(g.risk)) errors.push(`${g.id}: nivel de riesgo inválido`);
}
const decisions = data.decision_rules ?? [];
unique(decisions,"reglas de decisión");
if (decisions.length < 3) errors.push("se requieren al menos tres reglas de decisión");
for (const d of decisions) if (!nonempty(d.condition) || !nonempty(d.decision)) errors.push(`${d.id}: regla incompleta`);
const scenarios = data.scenarios ?? [];
unique(scenarios,"escenarios");
if (scenarios.length < 4) errors.push("se requieren al menos cuatro escenarios");
for (const s of scenarios) if (!nonempty(s.input) || !nonempty(s.expected)) errors.push(`${s.id}: escenario incompleto`);
const criteria = data.acceptance_criteria ?? [];
unique(criteria,"criterios");
if (criteria.length < 5) errors.push("se requieren al menos cinco criterios");
for (const a of criteria) for (const field of ["condition","evidence","verification"]) if (!nonempty(a[field])) errors.push(`${a.id}: falta ${field}`);
if (data.policy?.missing_measurement !== "mark_unknown_not_zero" || data.policy?.unapproved_external_action !== "block" || data.policy?.high_risk_requires_human_approval !== true) errors.push("faltan salvaguardas de medición o aprobación");
if (!Array.isArray(data.limitations) || data.limitations.length < 2) errors.push("faltan limitaciones explícitas");
if (errors.length) {
  for (const error of errors) console.error(`LAB-10 productivity/governance: ${error}`);
  process.exit(1);
}
console.log(`LAB-10 fixture OK: ${metrics.length} métricas, ${gov.length} casos de gobernanza, ${scenarios.length} escenarios, ${criteria.length} criterios.`);
