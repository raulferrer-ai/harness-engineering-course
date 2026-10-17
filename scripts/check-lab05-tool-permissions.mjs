import { readFile } from "node:fs/promises";
import process from "node:process";
const data = JSON.parse(await readFile(process.env.LAB05_FIXTURE_PATH ?? new URL("../fixtures/lab05-tool-permissions.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = v => typeof v === "string" && v.trim().length > 0;
const unique = (items, label, key = "id") => { const seen = new Set(); for (const item of items ?? []) { const value = item[key]; if (!nonempty(value) || seen.has(value)) errors.push(`${label}: valor vacío o duplicado ${value}`); seen.add(value); } };
if (data.schema_version !== 1 || data.lab_id !== "LAB-05" || data.topic !== "tool-permissions") errors.push("versión, ID o tema incorrecto");
if (!nonempty(data.exercise_id) || !nonempty(data.scenario)) errors.push("falta identificación o escenario");
if (!Array.isArray(data.principles) || data.principles.length < 4) errors.push("faltan principios de seguridad");
else if (data.principles.some(item => !nonempty(item))) errors.push("principios de seguridad contiene elementos vacíos");
const tools = data.tools ?? []; unique(tools,"herramientas","name");
for (const t of tools) {
  if (!["low","medium","high","critical"].includes(t.risk)) errors.push(`${t.name}: riesgo no válido`);
  for (const f of ["allowed","denied"]) {
    if (!Array.isArray(t[f])) errors.push(`${t.name}: falta ${f}`);
    else if (t[f].some(item => !nonempty(item))) errors.push(`${t.name}: ${f} contiene permisos vacíos`);
  }
  if (!nonempty(t.approval)) errors.push(`${t.name}: falta aprobación`);
  if (Array.isArray(t.allowed) && Array.isArray(t.denied) && t.allowed.some(permission => t.denied.includes(permission))) errors.push(`${t.name}: un permiso no puede estar simultáneamente permitido y denegado`);
}
const cases = data.threat_cases ?? []; unique(cases,"amenazas"); if (cases.length < 5) errors.push("se requieren cinco amenazas"); for (const c of cases) if (!nonempty(c.input)||!nonempty(c.expected)) errors.push(`${c.id}: falta entrada o resultado`);
const criteria = data.acceptance_criteria ?? []; unique(criteria,"criterios"); if (criteria.length < 5) errors.push("se requieren cinco criterios"); for (const c of criteria) for (const f of ["condition","evidence","verification"]) if (!nonempty(c[f])) errors.push(`${c.id}: falta ${f}`);
const threatIds = new Set(cases.map(item => item.id));
const coveredThreats = new Set();
for (const criterion of criteria) {
  const refs = [...(criterion.evidence ?? "").matchAll(/\bTP-\d+\b/g)].map(match => match[0]);
  for (const ref of refs) {
    if (!threatIds.has(ref)) errors.push(`${criterion.id}: evidencia referencia una amenaza inexistente ${ref}`);
    else coveredThreats.add(ref);
  }
}
for (const item of cases) if (!coveredThreats.has(item.id)) errors.push(`${item.id}: amenaza sin referencia en la evidencia de ningún criterio`);
if (!Array.isArray(data.audit_fields)||!["run_id","tool_name","decision","policy_rule"].every(x=>data.audit_fields.includes(x))) errors.push("campos de auditoría insuficientes");
if (Array.isArray(data.audit_fields) && new Set(data.audit_fields).size !== data.audit_fields.length) errors.push("campos de auditoría duplicados");
if (data.decision_policy?.default!=="deny"||data.decision_policy?.unknown_tool!=="deny"||data.decision_policy?.missing_approval!=="deny") errors.push("la política debe denegar por defecto");
if (!Array.isArray(data.limitations)||data.limitations.length<2) errors.push("faltan limitaciones");
else if (data.limitations.some(item => !nonempty(item))) errors.push("limitaciones contiene elementos vacíos");
if(errors.length){for(const e of errors) console.error(`LAB-05 tool permissions: ${e}`);process.exit(1);}
console.log(`LAB-05 fixture OK: ${tools.length} herramientas, ${cases.length} amenazas, ${criteria.length} criterios.`);
