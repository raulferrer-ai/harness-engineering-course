import { readFile } from "node:fs/promises";
import process from "node:process";
const data=JSON.parse(await readFile(process.env.LAB08_FIXTURE_PATH ?? new URL("../fixtures/lab08-security-threats.json",import.meta.url),"utf8"));
const errors=[];const ok=v=>typeof v==="string"&&v.trim().length>0;
const unique=(items,label)=>{const seen=new Set();for(const x of items??[]){if(!ok(x.id)||seen.has(x.id))errors.push(label+": ID vacío o duplicado "+x.id);seen.add(x.id);}};
if(data.schema_version!==1||data.lab_id!=="LAB-08"||data.topic!=="security-threats")errors.push("versión, ID o tema incorrecto");
if(!ok(data.exercise_id)||!ok(data.purpose))errors.push("falta identificación o propósito");
for(const [f,min] of [["assets",3],["trust_boundaries",3],["threats",5],["test_cases",5],["acceptance_criteria",4],["limitations",2]]){
 if(!Array.isArray(data[f])||data[f].length<min)errors.push(f+": se requieren al menos "+min+" elementos");
 else if(f==="limitations"&&data[f].some(item=>!ok(item)))errors.push("limitations contiene elementos vacíos");
 if(["assets","trust_boundaries","threats","test_cases","acceptance_criteria"].includes(f))unique(data[f],f);
}
for(const x of data.threats??[])for(const f of ["scenario","control","expected"])if(!ok(x[f]))errors.push(x.id+": falta "+f);
const assetIds=new Set((data.assets??[]).map(x=>x.id));
const boundaryIds=new Set((data.trust_boundaries??[]).map(x=>x.id));
const testIds=new Set((data.test_cases??[]).map(x=>x.id));
const threatIds=new Set((data.threats??[]).map(x=>x.id));
for(const x of data.assets??[])if(!ok(x.name)||!ok(x.impact))errors.push(x.id+": activo sin nombre o impacto");
for(const x of data.trust_boundaries??[])for(const f of ["source","trust","rule"])if(!ok(x[f]))errors.push(x.id+": límite de confianza sin "+f);
for(const x of data.threats??[]){
 if(!testIds.has(x.test_case_id))errors.push(x.id+": test_case_id debe referenciar una prueba existente");
 if(!Array.isArray(x.asset_ids)||x.asset_ids.length===0||x.asset_ids.some(id=>!assetIds.has(id)))errors.push(x.id+": asset_ids debe referenciar activos existentes");
 if(Array.isArray(x.asset_ids)&&new Set(x.asset_ids).size!==x.asset_ids.length)errors.push(x.id+": asset_ids contiene referencias duplicadas");
 if(!Array.isArray(x.trust_boundary_ids)||x.trust_boundary_ids.length===0||x.trust_boundary_ids.some(id=>!boundaryIds.has(id)))errors.push(x.id+": trust_boundary_ids debe referenciar límites existentes");
 if(Array.isArray(x.trust_boundary_ids)&&new Set(x.trust_boundary_ids).size!==x.trust_boundary_ids.length)errors.push(x.id+": trust_boundary_ids contiene referencias duplicadas");
}
for(const x of data.test_cases??[]){
 if(!Array.isArray(x.threat_ids)||x.threat_ids.length===0||x.threat_ids.some(id=>!threatIds.has(id)))errors.push(x.id+": threat_ids debe referenciar amenazas existentes");
 if(Array.isArray(x.threat_ids)&&new Set(x.threat_ids).size!==x.threat_ids.length)errors.push(x.id+": threat_ids contiene referencias duplicadas");
}
const testById=new Map((data.test_cases??[]).map(x=>[x.id,x]));
for(const t of data.threats??[]){const linked=testById.get(t.test_case_id);if(linked&&!linked.threat_ids?.includes(t.id))errors.push(t.id+": el caso vinculado no referencia de vuelta esta amenaza");}
for(const tc of data.test_cases??[])for(const threatId of tc.threat_ids??[]){const threat=(data.threats??[]).find(t=>t.id===threatId);if(threat&&threat.test_case_id!==tc.id)errors.push(tc.id+": vínculo contradictorio con "+threatId);}
const coveredAssets=new Set((data.threats??[]).flatMap(t=>t.asset_ids??[]));
for(const assetId of assetIds)if(!coveredAssets.has(assetId))errors.push(assetId+": activo sin ninguna amenaza asociada");
const coveredBoundaries=new Set((data.threats??[]).flatMap(t=>t.trust_boundary_ids??[]));
for(const boundaryId of boundaryIds)if(!coveredBoundaries.has(boundaryId))errors.push(boundaryId+": límite de confianza sin amenaza asociada");
for(const x of data.test_cases??[])for(const f of ["input","expected"])if(!ok(x[f]))errors.push(x.id+": falta "+f);
for(const x of data.acceptance_criteria??[])for(const f of ["condition","evidence","verification"])if(!ok(x[f]))errors.push(x.id+": falta "+f);
const knownTestIds=new Set((data.test_cases??[]).map(x=>x.id));
for(const x of data.acceptance_criteria??[]){
 const refs=[...(x.evidence??"").matchAll(/SEC-T\d+/g)].map(m=>m[0]);
 for(const ref of refs)if(!knownTestIds.has(ref))errors.push(x.id+": evidencia referencia una prueba inexistente "+ref);
 if(/resultados?\b/i.test(x.evidence??"")&&refs.length===0)errors.push(x.id+": evidencia basada en resultados debe citar al menos un caso SEC-Txx");
}
if(errors.length){for(const e of errors)console.error("LAB-08 security: "+e);process.exit(1);}
console.log("LAB-08 security fixture OK: "+data.assets.length+" activos, "+data.threats.length+" amenazas, "+data.test_cases.length+" pruebas.");
