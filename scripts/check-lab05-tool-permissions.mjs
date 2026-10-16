import { readFile } from "node:fs/promises";
import process from "node:process";
const data = JSON.parse(await readFile(process.env.LAB05_FIXTURE_PATH ?? new URL("../fixtures/lab05-tool-permissions.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = v => typeof v === "string" && v.trim().length > 0;
const unique = (items, label, key = "id") => { const seen = new Set(); for (const item of items ?? []) { const value = item[key]; if (!nonempty(value) || seen.has(value)) errors.push(`${label}: valor vacío o duplicado ${value}`); seen.add(value); } };
if (data.schema_version !== 1 || data.lab_id !== "LAB-05" || data.topic !== "tool-permissions") errors.push("versión, ID o tema incorrecto");
if (!nonempty(data.exercise_id) || !nonempty(data.scenario)) errors.push("falta identificación o escenario");
if (!Array.isArray(data.principles) || data.principles.length < 4) errors.push("faltan principios de seguridad");
const tools = data.tools ?? []; unique(tools,"herramientas","name");
for (const t of tools) { if (!["low","medium","high","critical"].includes(t.risk)) errors.push(`${t.name}: riesgo no válido`); for (const f of ["allowed","denied"]) if (!Array.isArray(t[f])) errors.push(`${t.name}: falta ${f}`); if (!nonempty(t.approval)) errors.push(`${t.name}: falta aprobación`); }
const cases = data.threat_cases ?? []; unique(cases,"amenazas"); if (cases.length < 5) errors.push("se requieren cinco amenazas"); for (const c of cases) if (!nonempty(c.input)||!nonempty(c.expected)) errors.push(`${c.id}: falta entrada o resultado`);
const criteria = data.acceptance_criteria ?? []; unique(criteria,"criterios"); if (criteria.length < 5) errors.push("se requieren cinco criterios"); for (const c of criteria) for (const f of ["condition","evidence","verification"]) if (!nonempty(c[f])) errors.push(`${c.id}: falta ${f}`);
if (!Array.isArray(data.audit_fields)||!["run_id","tool_name","decision","policy_rule"].every(x=>data.audit_fields.includes(x))) errors.push("campos de auditoría insuficientes");
if (data.decision_policy?.default!=="deny"||data.decision_policy?.unknown_tool!=="deny"||data.decision_policy?.missing_approval!=="deny") errors.push("la política debe denegar por defecto");
if (!Array.isArray(data.limitations)||data.limitations.length<2) errors.push("faltan limitaciones");
if(errors.length){for(const e of errors) console.error(`LAB-05 tool permissions: ${e}`);process.exit(1);}
console.log(`LAB-05 fixture OK: ${tools.length} herramientas, ${cases.length} amenazas, ${criteria.length} criterios.`);
