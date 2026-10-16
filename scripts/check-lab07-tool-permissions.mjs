import { readFile } from "node:fs/promises";
import process from "node:process";

const data = JSON.parse(await readFile(new URL("../fixtures/lab07-tool-permissions.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = v => typeof v === "string" && v.trim().length > 0;
const unique = (items, label, key = "id") => {
  const seen = new Set();
  for (const item of items ?? []) {
    const value = item[key];
    if (!nonempty(value) || seen.has(value)) errors.push(`${label}: valor vacío o duplicado ${value}`);
    seen.add(value);
  }
};
if (data.schema_version !== 1) errors.push("schema_version debe ser 1");
if (!nonempty(data.exercise_id) || !nonempty(data.scenario)) errors.push("falta identificación o escenario");
if (!Array.isArray(data.principles) || data.principles.length < 4) errors.push("faltan principios de seguridad");
const tools = data.tools ?? [];
unique(tools, "herramientas", "name");
for (const tool of tools) {
  if (!["low","medium","high","critical"].includes(tool.risk)) errors.push(`${tool.name}: riesgo no válido`);
  for (const field of ["allowed","denied"]) if (!Array.isArray(tool[field])) errors.push(`${tool.name}: falta ${field}`);
  if (!nonempty(tool.approval)) errors.push(`${tool.name}: falta política de aprobación`);
}
const cases = data.threat_cases ?? [];
unique(cases, "casos de amenaza");
if (cases.length < 5) errors.push("se requieren al menos cinco casos de amenaza");
for (const item of cases) if (!nonempty(item.input) || !nonempty(item.expected)) errors.push(`${item.id}: falta entrada o resultado esperado`);
const criteria = data.acceptance_criteria ?? [];
unique(criteria, "criterios");
if (criteria.length < 5) errors.push("se requieren al menos cinco criterios");
for (const item of criteria) for (const field of ["condition","evidence","verification"]) if (!nonempty(item[field])) errors.push(`${item.id}: falta ${field}`);
if (!Array.isArray(data.audit_fields) || !["run_id","tool_name","decision","policy_rule"].every(x => data.audit_fields.includes(x))) errors.push("campos de auditoría insuficientes");
if (data.decision_policy?.default !== "deny" || data.decision_policy?.unknown_tool !== "deny" || data.decision_policy?.missing_approval !== "deny") errors.push("la política debe denegar por defecto");
if (!Array.isArray(data.limitations) || data.limitations.length < 2) errors.push("faltan limitaciones explícitas");
if (errors.length) {
  for (const error of errors) console.error(`LAB-07 permissions fixture: ${error}`);
  process.exit(1);
}
console.log(`LAB-07 fixture OK: ${tools.length} herramientas, ${cases.length} amenazas, ${criteria.length} criterios.`);
