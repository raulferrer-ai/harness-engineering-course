import { readFile } from "node:fs/promises";
import process from "node:process";

const data = JSON.parse(await readFile(new URL("../fixtures/lab06-observability.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = v => typeof v === "string" && v.trim().length > 0;
const unique = (items, label) => {
  const ids = new Set();
  for (const item of items ?? []) {
    if (!nonempty(item.id) || ids.has(item.id)) errors.push(`${label}: ID vacío o duplicado ${item.id}`);
    ids.add(item.id);
  }
};
if (data.schema_version !== 1) errors.push("schema_version debe ser 1");
if (!nonempty(data.experiment_id) || !nonempty(data.scenario)) errors.push("falta identificación o escenario");
const events = data.events ?? [];
const eventNames = new Set();
for (const event of events) {
  if (!nonempty(event.name) || eventNames.has(event.name)) errors.push(`evento vacío o duplicado: ${event.name}`);
  eventNames.add(event.name);
  if (!Array.isArray(event.required) || !event.required.length) errors.push(`${event.name}: faltan campos requeridos`);
}
for (const name of ["task.started","tool.started","tool.completed","test.completed","change.proposed","task.completed"]) if (!eventNames.has(name)) errors.push(`falta evento ${name}`);
for (const field of ["never_log","minimize","preserve"]) if (!Array.isArray(data.redaction_policy?.[field]) || !data.redaction_policy[field].length) errors.push(`falta política de redacción ${field}`);
const alerts = data.alert_rules ?? [];
unique(alerts, "alertas");
if (alerts.length < 3) errors.push("se requieren al menos tres reglas de alerta");
const cases = data.test_cases ?? [];
unique(cases, "casos");
if (cases.length < 5) errors.push("se requieren al menos cinco casos");
for (const item of cases) if (!nonempty(item.input) || !nonempty(item.expected)) errors.push(`${item.id}: falta input o resultado esperado`);
const criteria = data.acceptance_criteria ?? [];
unique(criteria, "criterios");
if (criteria.length < 4) errors.push("se requieren al menos cuatro criterios");
for (const item of criteria) for (const field of ["condition","evidence","verification"]) if (!nonempty(item[field])) errors.push(`${item.id}: falta ${field}`);
if (errors.length) {
  for (const error of errors) console.error(`LAB-06 observability fixture: ${error}`);
  process.exit(1);
}
console.log(`LAB-06 fixture OK: ${events.length} tipos de evento, ${alerts.length} alertas, ${cases.length} casos.`);
