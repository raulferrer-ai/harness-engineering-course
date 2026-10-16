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
const eventNames=new Set();
for(const e of events){
  if(!nonempty(e.name)||eventNames.has(e.name))errors.push(`${e.id}: nombre de evento vacío o duplicado`);
  eventNames.add(e.name);
  if(!Array.isArray(e.required_fields)||new Set(e.required_fields).size!==e.required_fields.length)errors.push(`${e.id}: required_fields debe ser una lista sin duplicados`);
  if(Array.isArray(e.required_fields)&&!e.required_fields.includes("run_id"))errors.push(`${e.id}: todo evento debe incluir run_id para correlación`);
}
const requiredByEvent={run_started:["source_revision","environment"],model_call_completed:["model_version","latency_ms","status"],tool_invocation:["tool_name","decision","result_status"],evaluation_completed:["eval_suite_version","score","failed_cases","decision"],recovery_action:["incident_id","action","actor","outcome"]};
for(const e of events)for(const field of requiredByEvent[e.name]??[])if(!e.required_fields?.includes(field))errors.push(`${e.id}: ${e.name} debe incluir ${field}`);
for (const e of events) if (!Array.isArray(e.required_fields) || !e.required_fields.includes("timestamp")) errors.push(`${e.id}: faltan campos obligatorios o timestamp`);
for (const e of events) {
  if (!Array.isArray(e.required_fields) || e.required_fields.length===0) continue;
  if (new Set(e.required_fields).size!==e.required_fields.length) errors.push(`${e.id}: campos requeridos duplicados`);
  for (const field of e.required_fields) if (!nonempty(field)) errors.push(`${e.id}: campo requerido vacío`);
}
const steps = data.recovery_steps ?? [];
unique(steps, "pasos de recuperación");
if (steps.length < 3) errors.push("se requieren al menos tres pasos de recuperación");
for (const r of steps) for (const field of ["trigger","action","verification","rollback"]) if (!nonempty(r[field])) errors.push(`${r.id}: falta ${field}`);
const signalIds = new Set(signals.map(x => x.id));
const signalById = new Map(signals.map(x => [x.id, x]));
const recoveryTriggers=new Set(steps.map(r=>r.trigger));
for(const signal of signals)if(signal.name==="unauthorized_action_count"&&!recoveryTriggers.has(signal.id))errors.push(`${signal.id}: una señal de acción no autorizada requiere paso de recuperación`);
for (const r of steps) {
  if (!signalIds.has(r.trigger)) errors.push(`${r.id}: trigger desconocido ${r.trigger}`);
  const signal = signalById.get(r.trigger);
  if (signal?.id === "SIG-04" && (!/bloque|revoc/i.test(r.action) || !/autoriz/i.test(r.rollback))) errors.push(`${r.id}: una acción no autorizada debe bloquearse y requerir autorización antes de restaurar permisos`);
}
for (const s of signals) {
  if (s.threshold?.operator === "lt" && s.threshold.value <= 0) errors.push(`${s.id}: umbral lt debe ser positivo`);
  if (s.threshold?.operator === "lte" && s.threshold.value < 0) errors.push(`${s.id}: umbral lte no puede ser negativo`);
  if (s.name === "unauthorized_action_count" && (s.threshold?.operator !== "gt" || s.threshold.value !== 0)) errors.push("las acciones no autorizadas deben disparar con conteo > 0");
  if (/rate$/.test(s.name) && (s.threshold?.value < 0 || s.threshold?.value > 1)) errors.push(`${s.id}: una tasa debe expresarse entre 0 y 1`);
  if (/rate$/.test(s.name) && s.unit !== "ratio") errors.push(`${s.id}: las tasas deben usar unit=ratio`);
  if (s.name === "p95_latency_ms" && s.unit !== "milliseconds") errors.push(`${s.id}: p95_latency_ms debe usar milliseconds`);
  if (s.name === "cost_per_accepted_task" && (!/currency/i.test(s.unit) || !/^[A-Z]{3}$/.test(s.currency ?? ""))) errors.push(`${s.id}: cost_per_accepted_task debe declarar unidad monetaria por tarea y código de moneda ISO 4217`);
  if (s.name === "unauthorized_action_count" && s.unit !== "count") errors.push(`${s.id}: unauthorized_action_count debe usar count`);
}
const requiredPolicy = {
  unknown_signal: "do_not_assume_healthy",
  rollback_target: "immutable_revision_and_artifact",
  recovery_complete_requires: "service_health_and_regression_checks"
};
for (const [key, expected] of Object.entries(requiredPolicy)) if (data.policy?.[key] !== expected) errors.push(`policy.${key} debe ser ${expected}`);
const scenarios = data.scenarios ?? [];
unique(scenarios, "escenarios");
if (scenarios.length < 5) errors.push("se requieren al menos cinco escenarios");
for (const s of scenarios) if (!nonempty(s.input) || !nonempty(s.expected)) errors.push(`${s.id}: falta entrada o resultado esperado`);
const recoveryRegressionScenario = scenarios.find(s => /regresi[oó]n/i.test(s.input));
if (!recoveryRegressionScenario || !/no se declara recuperaci[oó]n completa|no se declara recuperaci[oó]n/i.test(recoveryRegressionScenario.expected)) errors.push("debe existir un escenario que impida declarar recuperación completa si falla la regresión");
const costSignal = signals.find(s => s.name === "cost_per_accepted_task");
if (costSignal && (!Number.isFinite(costSignal.threshold?.value) || costSignal.threshold.value <= 0)) errors.push("cost_per_accepted_task debe tener un umbral positivo");
const criteria = data.acceptance_criteria ?? [];
unique(criteria, "criterios");
if (criteria.length < 5) errors.push("se requieren al menos cinco criterios");
for (const c of criteria) for (const field of ["condition","evidence","verification"]) if (!nonempty(c[field])) errors.push(`${c.id}: falta ${field}`);
const evidenceIds = new Set([
  ...signals.map(x => x.id),
  ...events.map(x => x.id),
  ...steps.map(x => x.id),
  ...scenarios.map(x => x.id)
]);
for (const c of criteria) {
  const refs = [...(c.evidence ?? "").matchAll(/\b(?:SIG|EVT|REC|OPS-T)-\d+\b/g)].map(m => m[0]);
  for (const ref of refs) if (!evidenceIds.has(ref)) errors.push(`${c.id}: evidencia referencia un elemento inexistente ${ref}`);
  if (/\b(?:SIG|EVT|REC|OPS-T)-/i.test(c.evidence ?? "") && refs.length === 0) errors.push(`${c.id}: la evidencia contiene referencias que no se pudieron interpretar`);
}
if (!Array.isArray(data.audit_fields) || !["incident_id","source_revision","decision","timestamp"].every(x => data.audit_fields.includes(x))) errors.push("registro de auditoría insuficiente");
if (data.policy?.promotion_on_critical_security_signal !== "block" || data.policy?.redact_secrets !== true) errors.push("faltan salvaguardas críticas");
if (data.policy?.unknown_signal !== "do_not_assume_healthy") errors.push("una señal ausente no debe interpretarse como estado saludable");
if (data.policy?.rollback_target !== "immutable_revision_and_artifact") errors.push("el rollback debe identificar revisión y artefacto inmutables");
if (data.policy?.recovery_complete_requires !== "service_health_and_regression_checks") errors.push("la recuperación requiere salud del servicio y pruebas de regresión");
if (!Array.isArray(data.limitations) || data.limitations.length < 2) errors.push("faltan limitaciones explícitas");
if (errors.length) {
  for (const error of errors) console.error(`LAB-09 observability/recovery: ${error}`);
  process.exit(1);
}
console.log(`LAB-09 fixture OK: ${signals.length} señales, ${events.length} eventos, ${steps.length} pasos de recuperación, ${scenarios.length} escenarios.`);
