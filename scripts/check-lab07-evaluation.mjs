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
if(typeof data.scoring_protocol?.pass_threshold_percent!=="number"||data.scoring_protocol.pass_threshold_percent<0||data.scoring_protocol.pass_threshold_percent>100)errors.push("umbral de aprobación debe estar entre 0 y 100");
if(typeof data.scoring_protocol?.minimum_dimension_score!=="number"||data.scoring_protocol.minimum_dimension_score<0||data.scoring_protocol.minimum_dimension_score>4)errors.push("mínimo por dimensión debe estar entre 0 y 4");
if(!Array.isArray(data.scoring_protocol?.decision_rule)||data.scoring_protocol.decision_rule.length<3)errors.push("falta regla de decisión completa");
if(!/revisión humana/i.test(data.scoring_protocol?.threshold_status??""))errors.push("el estado del umbral debe indicar revisión humana");
const protocol=data.scoring_protocol??{};
const vectors=protocol.decision_test_vectors??[];
if(vectors.length<5)errors.push("se requieren al menos cinco vectores de prueba de decisión");
const vectorIds=new Set();
const coveredOutcomes=new Set();
const coveredCases=new Set();
for(const v of vectors){
  if(!ok(v.id)||vectorIds.has(v.id)||!["APROBADO","NO APROBADO","INCONCLUSO"].includes(v.expected)||!cases.some(x=>x.id===v.case_id)) {errors.push("vector de decisión inválido o duplicado: "+v.id);continue;}
  vectorIds.add(v.id);coveredOutcomes.add(v.expected);coveredCases.add(v.case_id);
  if(!Array.isArray(v.critical_failures)||v.critical_failures.some(failure=>!ok(failure)))errors.push(v.id+": critical_failures debe ser un array de descripciones no vacías");
  if(typeof v.missing_required_evidence!=="boolean")errors.push(v.id+": missing_required_evidence debe ser booleano");
  if(!v.scores||typeof v.scores!=="object"||Array.isArray(v.scores))errors.push(v.id+": scores debe ser un objeto");
  const scoreEntries=rubric.map(r=>[r.dimension,v.scores?.[r.dimension]]);
  for(const dimension of Object.keys(v.scores??{}))if(!dimensions.has(dimension))errors.push(v.id+": dimensión de puntuación desconocida "+dimension);
  const missing= v.missing_required_evidence===true || scoreEntries.some(([,score])=>typeof score!=="number"||score<0||score>4);
  const aggregate=missing?null:rubric.reduce((sum,r)=>sum+r.weight*v.scores[r.dimension]/4*100,0);
  const critical=Array.isArray(v.critical_failures)&&v.critical_failures.length>0;
  let actual="APROBADO";
  if(missing) actual="INCONCLUSO";
  else if(critical||aggregate<protocol.pass_threshold_percent||cases.find(testCase=>testCase.id===v.case_id).minimum_dimensions.some(d=>v.scores[d]<protocol.minimum_dimension_score)) actual="NO APROBADO";
  if(actual!==v.expected)errors.push(v.id+": esperado "+v.expected+", obtenido "+actual);
}
for(const outcome of ["APROBADO","NO APROBADO","INCONCLUSO"])if(!coveredOutcomes.has(outcome))errors.push("faltan vectores de decisión para "+outcome);
for(const testCase of cases)if(!coveredCases.has(testCase.id))errors.push("falta vector de decisión para el caso "+testCase.id);
if(errors.length){for(const e of errors)console.error("LAB-07 evaluation: "+e);process.exit(1);}
console.log("LAB-07 fixture OK: "+rubric.length+" dimensiones, "+cases.length+" casos y protocolo de puntuación.");
