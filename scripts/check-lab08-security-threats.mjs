import { readFile } from "node:fs/promises";
import process from "node:process";
const data=JSON.parse(await readFile(new URL("../fixtures/lab08-security-threats.json",import.meta.url),"utf8"));
const errors=[];const ok=v=>typeof v==="string"&&v.trim().length>0;
const unique=(items,label)=>{const seen=new Set();for(const x of items??[]){if(!ok(x.id)||seen.has(x.id))errors.push(label+": ID vacío o duplicado "+x.id);seen.add(x.id);}};
if(data.schema_version!==1||data.lab_id!=="LAB-08"||data.topic!=="security-threats")errors.push("versión, ID o tema incorrecto");
if(!ok(data.exercise_id)||!ok(data.purpose))errors.push("falta identificación o propósito");
for(const [f,min] of [["assets",3],["trust_boundaries",3],["threats",5],["test_cases",5],["acceptance_criteria",4],["limitations",2]]){
 if(!Array.isArray(data[f])||data[f].length<min)errors.push(f+": se requieren al menos "+min+" elementos");
 if(["assets","trust_boundaries","threats","test_cases","acceptance_criteria"].includes(f))unique(data[f],f);
}
for(const x of data.threats??[])for(const f of ["scenario","control","expected"])if(!ok(x[f]))errors.push(x.id+": falta "+f);
for(const x of data.test_cases??[])for(const f of ["input","expected"])if(!ok(x[f]))errors.push(x.id+": falta "+f);
for(const x of data.acceptance_criteria??[])for(const f of ["condition","evidence","verification"])if(!ok(x[f]))errors.push(x.id+": falta "+f);
if(errors.length){for(const e of errors)console.error("LAB-08 security: "+e);process.exit(1);}
console.log("LAB-08 security fixture OK: "+data.assets.length+" activos, "+data.threats.length+" amenazas, "+data.test_cases.length+" pruebas.");
