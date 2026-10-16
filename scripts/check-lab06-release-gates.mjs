import { readFile } from "node:fs/promises";
import process from "node:process";
const data = JSON.parse(await readFile(new URL("../fixtures/lab06-release-gates.json", import.meta.url), "utf8"));
const errors=[]; const nonempty=v=>typeof v==="string"&&v.trim().length>0;
const unique=(items,label)=>{const seen=new Set();for(const x of items??[]){if(!nonempty(x.id)||seen.has(x.id))errors.push(`${label}: ID vacío o duplicado ${x.id}`);seen.add(x.id);}};
if(data.schema_version!==1||data.lab_id!=="LAB-06"||data.topic!=="release-gates")errors.push("versión, ID o tema incorrecto");
if(!nonempty(data.release_id)||!nonempty(data.purpose))errors.push("falta release_id o propósito");
const ev=data.required_evidence??[];unique(ev,"evidencias");if(ev.length<5)errors.push("se requieren cinco evidencias");const ids=new Set(ev.map(x=>x.id));for(const x of ev)if(!nonempty(x.name)||!nonempty(x.description))errors.push(`${x.id}: nombre o descripción ausente`);
const gates=data.gates??[];unique(gates,"gates");if(gates.length<4)errors.push("se requieren cuatro gates");for(const g of gates){if(!Array.isArray(g.required)||!g.required.length)errors.push(`${g.id}: sin evidencias`);for(const id of g.required??[])if(!ids.has(id))errors.push(`${g.id}: evidencia desconocida ${id}`);if(g.failure!=="block")errors.push(`${g.id}: el fallo debe bloquear`);}
const scenarios=data.scenarios??[];unique(scenarios,"escenarios");if(scenarios.length<6)errors.push("se requieren seis escenarios");for(const x of scenarios)if(!nonempty(x.input)||!nonempty(x.expected))errors.push(`${x.id}: falta entrada o resultado`);
const criteria=data.acceptance_criteria??[];unique(criteria,"criterios");if(criteria.length<5)errors.push("se requieren cinco criterios");for(const x of criteria)for(const f of ["condition","evidence","verification"])if(!nonempty(x[f]))errors.push(`${x.id}: falta ${f}`);
if(data.policy?.default!=="block"||data.policy?.missing_evidence!=="block"||data.policy?.commit_mismatch!=="block")errors.push("la política debe bloquear por defecto y ante evidencia ausente o inconsistente");
if(data.policy?.approval_cannot_override_failed_tests!==true||data.policy?.deployment_is_separate_from_eligibility!==true)errors.push("faltan salvaguardas de aprobación/despliegue");
if(!Array.isArray(data.audit_record_fields)||!["release_id","source_revision","artifact_digest","decision"].every(x=>data.audit_record_fields.includes(x)))errors.push("registro de auditoría insuficiente");
if(!Array.isArray(data.limitations)||data.limitations.length<2)errors.push("faltan limitaciones");
if(errors.length){for(const e of errors)console.error(`LAB-06 release gates: ${e}`);process.exit(1);}
console.log(`LAB-06 fixture OK: ${ev.length} evidencias, ${gates.length} gates, ${scenarios.length} escenarios.`);
