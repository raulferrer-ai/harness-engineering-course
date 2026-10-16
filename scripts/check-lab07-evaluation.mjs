import { readFile } from "node:fs/promises";
import process from "node:process";
const data=JSON.parse(await readFile(new URL("../fixtures/lab07-evaluation.json",import.meta.url),"utf8"));
const errors=[]; const ok=v=>typeof v==="string"&&v.trim().length>0;
const unique=(items,label)=>{const seen=new Set();for(const x of items??[]){if(!ok(x.id)||seen.has(x.id))errors.push(label+": ID vacío o duplicado "+x.id);seen.add(x.id);}};
if(data.schema_version!==1||data.lab_id!=="LAB-07"||data.topic!=="testing-evaluation")errors.push("versión, ID o tema incorrecto");
if(!ok(data.evaluation_id)||!ok(data.purpose))errors.push("falta identificación o propósito");
const rubric=data.rubric??[];unique(rubric,"rúbrica");if(rubric.length<4)errors.push("se requieren cuatro dimensiones");
const sum=rubric.reduce((s,x)=>s+(typeof x.weight==="number"?x.weight:0),0);if(Math.abs(sum-1)>1e-6)errors.push("los pesos deben sumar 1");
for(const x of rubric)if(!ok(x.dimension)||!ok(x.description))errors.push(x.id+": dimensión o descripción ausente");
if(data.score_scale?.minimum!==0||data.score_scale?.maximum!==4)errors.push("la escala debe ser 0–4");
for(let i=0;i<=4;i++)if(!ok(data.score_scale?.anchors?.[i]))errors.push("falta anclaje "+i);
const cases=data.cases??[];unique(cases,"casos");if(cases.length<3)errors.push("se requieren tres casos");
const dimensions=new Set(rubric.map(x=>x.dimension));
for(const x of rubric)if(typeof x.weight!=="number"||x.weight<0||x.weight>1)errors.push(x.id+": peso debe estar entre 0 y 1");
for(const x of cases){
  for(const f of ["prompt","reference_facts","required_evidence","critical_failures"])if(!(Array.isArray(x[f])?x[f].length:ok(x[f])))errors.push(x.id+": falta "+f);
  if(!Array.isArray(x.minimum_dimensions)||x.minimum_dimensions.length===0)errors.push(x.id+": falta minimum_dimensions");
  else for(const d of x.minimum_dimensions)if(!dimensions.has(d))errors.push(x.id+": dimensión mínima desconocida "+d);
}
for(const f of ["steps","critical_failure_policy","missing_data_policy","limitations"])if(!(Array.isArray(data.scoring_protocol?.[f])?data.scoring_protocol[f].length:ok(data.scoring_protocol?.[f])))errors.push("falta scoring_protocol."+f);
if(data.scoring_protocol?.aggregate_formula!=="sum(weight * score / 4) * 100")errors.push("fórmula agregada ausente o no reconocida");
if(!/fallo crítico/i.test(data.scoring_protocol?.critical_failure_policy??""))errors.push("la política debe declarar el tratamiento de fallos críticos");
if(!/no imputar/i.test(data.scoring_protocol?.missing_data_policy??""))errors.push("la política de datos ausentes debe prohibir imputaciones");
if(errors.length){for(const e of errors)console.error("LAB-07 evaluation: "+e);process.exit(1);}
console.log("LAB-07 fixture OK: "+rubric.length+" dimensiones, "+cases.length+" casos y protocolo de puntuación.");
