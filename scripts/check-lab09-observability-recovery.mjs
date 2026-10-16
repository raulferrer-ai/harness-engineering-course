import { readFile } from "node:fs/promises";
import process from "node:process";

const data = JSON.parse(await readFile(new URL("../fixtures/lab09-observability-recovery.json", import.meta.url), "utf8"));
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
if (!nonempty(data.exercise_id) || !nonempty(data.purpose)) errors.push("falta identificación o propósito");
if (!nonempty(data.service?.name) || !nonempty(data.service?.baseline_id)) errors.push("falta servicio o línea base");
const signals = data.signals ?? [];
unique(signals, "señales");
if (signals.length < 4) errors.push("se requieren al menos cuatro señales");
for (const s of signals) {
  if (!nonempty(s.name) || !nonempty(s.unit) || !Number.isFinite(s.window_minutes) || s.window_minutes <= 0) errors.push(`${s.id}: definición de señal incompleta`);
  if (!["lt","lte","gt","gte","eq"].includes(s.threshold?.operator) || !Number.isFinite(s.threshold?.value)) errors.push(`${s.id}: umbral inválido`);
  if (!nonempty(s.action)) errors.push(`${s.id}: falta acción operativa`);
}
const events = data.events ?? [];
unique(events, "eventos");
if (events.length < 4) errors.push("se requieren al menos cuatro tipos de evento");
for (const e of events) if (!Array.isArray(e.required_fields) || !e.required_fields.includes("timestamp")) errors.push(`${e.id}: faltan campos obligatorios o timestamp`);
const steps = data.recovery_steps ?? [];
unique(steps, "pasos de recuperación");
if (steps.length < 3) errors.push("se requieren al menos tres pasos de recuperación");
for (const r of steps) for (const field of ["trigger","action","verification","rollback"]) if (!nonempty(r[field])) errors.push(`${r.id}: falta ${field}`);
const signalIds = new Set(signals.map(x => x.id));
for (const r of steps) if (!signalIds.has(r.trigger)) errors.push(`${r.id}: trigger desconocido ${r.trigger}`);
const scenarios = data.scenarios ?? [];
unique(scenarios, "escenarios");
if (scenarios.length < 5) errors.push("se requieren al menos cinco escenarios");
for (const s of scenarios) if (!nonempty(s.input) || !nonempty(s.expected)) errors.push(`${s.id}: falta entrada o resultado esperado`);
const criteria = data.acceptance_criteria ?? [];
unique(criteria, "criterios");
if (criteria.length < 5) errors.push("se requieren al menos cinco criterios");
for (const c of criteria) for (const field of ["condition","evidence","verification"]) if (!nonempty(c[field])) errors.push(`${c.id}: falta ${field}`);
if (!Array.isArray(data.audit_fields) || !["incident_id","source_revision","decision","timestamp"].every(x => data.audit_fields.includes(x))) errors.push("registro de auditoría insuficiente");
if (data.policy?.promotion_on_critical_security_signal !== "block" || data.policy?.redact_secrets !== true) errors.push("faltan salvaguardas críticas");
if (!Array.isArray(data.limitations) || data.limitations.length < 2) errors.push("faltan limitaciones explícitas");
if (errors.length) {
  for (const error of errors) console.error(`LAB-09 observability/recovery: ${error}`);
  process.exit(1);
}
console.log(`LAB-09 fixture OK: ${signals.length} señales, ${events.length} eventos, ${steps.length} pasos de recuperación, ${scenarios.length} escenarios.`);
