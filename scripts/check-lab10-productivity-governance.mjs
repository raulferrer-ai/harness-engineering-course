import { readFile } from "node:fs/promises";
import process from "node:process";

const data = JSON.parse(await readFile(process.env.LAB10_FIXTURE_PATH ?? new URL("../fixtures/lab10-productivity-governance.json", import.meta.url), "utf8"));
const errors = [];
const nonempty = v => typeof v === "string" && v.trim().length > 0;
const unique = (items, label) => {
  const seen = new Set();
  for (const item of items ?? []) {
    if (!nonempty(item.id) || seen.has(item.id)) errors.push(`${label}: ID vacío o duplicado ${item.id}`);
    seen.add(item.id);
  }
};
if (data.schema_version !== 1 || !nonempty(data.exercise_id) || !nonempty(data.purpose)) errors.push("identificación o schema_version inválidos");
const c = data.comparison ?? {};
for (const key of ["baseline","assisted"]) {
  const group = c[key];
  if (!nonempty(group?.id)) errors.push(`${key}: falta ID`);
  for (const field of ["tasks_completed","accepted_deliveries","cycle_time_minutes","human_minutes_per_task","defects_found","infra_cost","model_cost"]) {
    if (!Number.isFinite(group?.[field]) || group[field] < 0) errors.push(`${key}: ${field} debe ser numérico y no negativo`);
  }
  if (Number.isFinite(group?.accepted_deliveries) && Number.isFinite(group?.tasks_completed) && group.accepted_deliveries > group.tasks_completed) errors.push(`${key}: entregas aceptadas superan tareas completadas`);
  for (const field of ["tasks_completed", "accepted_deliveries", "defects_found"]) {
    if (Number.isFinite(group?.[field]) && !Number.isInteger(group[field])) errors.push(key + ": " + field + " debe ser un recuento entero");
  }
}
if (!Number.isFinite(c.labor_cost_per_hour) || c.labor_cost_per_hour <= 0) errors.push("labor_cost_per_hour debe ser positivo");
for (const key of ["baseline","assisted"]) {
  const group=c[key];
  if (Number.isFinite(group?.accepted_deliveries) && group.accepted_deliveries <= 0) errors.push(key+": accepted_deliveries debe ser mayor que cero para calcular costes unitarios");
  if (Number.isFinite(group?.cycle_time_minutes) && group.cycle_time_minutes <= 0) errors.push(key+": cycle_time_minutes debe ser mayor que cero");
}
if (!c.expected_failure_cost || !["baseline","assisted"].every(k => Number.isFinite(c.expected_failure_cost[k]) && c.expected_failure_cost[k] >= 0)) errors.push("faltan costes esperados de fallos por grupo");
if (!/^[A-Z]{3}$/.test(c.currency ?? "")) errors.push("comparison.currency debe declarar un código de moneda de tres letras");
const cmp = c.comparability ?? {};
for (const field of ["task_definition_match", "acceptance_criteria_version_match", "observation_window_days_match", "source_data_verified"]) if (typeof cmp[field] !== "boolean") errors.push(`comparability.${field} debe ser booleano`);
if (!nonempty(cmp.note)) errors.push("comparability.note debe explicar el estado de la evidencia");
if (!Array.isArray(c.measurement_notes) || c.measurement_notes.length < 2) errors.push("faltan notas sobre calidad de medición");
const metrics = data.metrics ?? [];
unique(metrics,"métricas");
if (metrics.length < 4) errors.push("se requieren al menos cuatro métricas");
const metricNames = new Set();
for (const m of metrics) {
  if (!nonempty(m.name) || !nonempty(m.unit) || !nonempty(m.definition) || !["higher_is_better","lower_is_better"].includes(m.direction)) errors.push(`${m.id}: definición de métrica inválida`);
  if (nonempty(m.name) && metricNames.has(m.name)) errors.push("nombre de métrica duplicado: "+m.name);
  if (nonempty(m.name)) metricNames.add(m.name);
}
const gov = data.governance_matrix ?? [];
unique(gov,"gobernanza");
if (gov.length < 3) errors.push("se requieren al menos tres casos de gobernanza");
for (const g of gov) {
  for (const field of ["use_case","risk","approval","data_rule","owner_role","stop_condition"]) if (!nonempty(g[field])) errors.push(`${g.id}: falta ${field}`);
  if (!["low","medium","high"].includes(g.risk)) errors.push(`${g.id}: nivel de riesgo inválido`);
}
const decisions = data.decision_rules ?? [];
unique(decisions,"reglas de decisión");
if (decisions.length < 3) errors.push("se requieren al menos tres reglas de decisión");
for (const d of decisions) if (!nonempty(d.condition) || !nonempty(d.decision)) errors.push(`${d.id}: regla incompleta`);
const scenarios = data.scenarios ?? [];
unique(scenarios,"escenarios");
if (scenarios.length < 4) errors.push("se requieren al menos cuatro escenarios");
for (const s of scenarios) if (!nonempty(s.input) || !nonempty(s.expected)) errors.push(`${s.id}: escenario incompleto`);
const criteria = data.acceptance_criteria ?? [];
unique(criteria,"criterios");
if (criteria.length < 5) errors.push("se requieren al menos cinco criterios");
for (const a of criteria) for (const field of ["condition","evidence","verification"]) if (!nonempty(a[field])) errors.push(`${a.id}: falta ${field}`);
const evidenceIds = new Set([
  ...metrics.map(x => x.id),
  ...gov.map(x => x.id),
  ...decisions.map(x => x.id),
  ...scenarios.map(x => x.id),
  ...(data.decision_test_vectors ?? []).map(x => x.id)
]);
for (const a of criteria) {
  const refs = [...(a.evidence ?? "").matchAll(/\b(?:MET|GOV|DEC|VAL-T|TV)-\d+\b/g)].map(m => m[0]);
  for (const ref of refs) if (!evidenceIds.has(ref)) errors.push(`${a.id}: evidencia referencia un elemento inexistente ${ref}`);
  if (/\b(?:MET|GOV|DEC|VAL-T|TV)-/i.test(a.evidence ?? "") && refs.length === 0) errors.push(`${a.id}: la evidencia contiene referencias que no se pudieron interpretar`);
}
if (data.policy?.missing_measurement !== "mark_unknown_not_zero" || data.policy?.unapproved_external_action !== "block" || data.policy?.high_risk_requires_human_approval !== true) errors.push("faltan salvaguardas de medición o aprobación");
if (!Array.isArray(data.limitations) || data.limitations.length < 2) errors.push("faltan limitaciones explícitas");
else if (data.limitations.some(item => !nonempty(item))) errors.push("limitaciones explícitas contiene elementos vacíos");
const requiredMetrics=new Map(metrics.map(m=>[m.name,m]));
for(const name of ["accepted_delivery_rate","cost_per_accepted_delivery","defect_rate"])if(!requiredMetrics.has(name))errors.push("falta métrica clave "+name);
const acceptanceMetric=requiredMetrics.get("accepted_delivery_rate");
if(acceptanceMetric && (acceptanceMetric.unit!=="ratio" || acceptanceMetric.definition!=="accepted_deliveries / tasks_completed"))errors.push("accepted_delivery_rate debe usar ratio y accepted_deliveries / tasks_completed");
const defectMetric=requiredMetrics.get("defect_rate");
if(defectMetric && (defectMetric.unit!=="defects_per_accepted_delivery" || defectMetric.definition!=="defects_found / accepted_deliveries"))errors.push("defect_rate debe usar defectos por entrega aceptada y el denominador correcto");

if(!/model_cost.*infra_cost|infra_cost.*model_cost/i.test(requiredMetrics.get("cost_per_accepted_delivery")?.definition??""))errors.push("el coste por entrega debe incluir coste de modelo e infraestructura");
if(!/human/i.test(requiredMetrics.get("cost_per_accepted_delivery")?.definition??""))errors.push("el coste por entrega debe incluir trabajo humano");
if(!/expected_failure_cost/i.test(requiredMetrics.get("cost_per_accepted_delivery")?.definition??""))errors.push("el coste por entrega debe incluir coste esperado de fallos");
const costMetric=requiredMetrics.get("cost_per_accepted_delivery");
if(costMetric && costMetric.unit!==`${c.currency}_per_delivery`)errors.push("la unidad de coste debe coincidir con la moneda declarada y expresarse por entrega aceptada");
if(costMetric){
  const expectedDefinition="(model_cost + infra_cost + human_labor_cost + expected_failure_cost) / accepted_deliveries";
  if(costMetric.definition!==expectedDefinition)errors.push("la definición del coste por entrega debe usar la fórmula canónica y unidades coherentes");
}
for(const key of ["baseline","assisted"]){
  const g=c[key];
  if(g&&Number.isFinite(g.accepted_deliveries)&&g.accepted_deliveries>0&&Number.isFinite(g.tasks_completed)&&g.tasks_completed>0){
    const acceptanceRate=g.accepted_deliveries/g.tasks_completed;
    if(acceptanceRate<0||acceptanceRate>1)errors.push(key+": tasa de aceptación fuera de [0,1]");
    const humanCost=g.human_minutes_per_task*g.tasks_completed/60*c.labor_cost_per_hour;
    const failureCost=c.expected_failure_cost?.[key];
    const total=(g.model_cost+g.infra_cost+humanCost+failureCost)/g.accepted_deliveries;
    if(!Number.isFinite(total)||total<0)errors.push(key+": coste total por entrega no calculable");
  }
}
for(const key of ["baseline","assisted"]){
  const g=c[key];
  if(Number.isFinite(g?.human_minutes_per_task)&&Number.isFinite(g?.tasks_completed)&&Number.isFinite(c.labor_cost_per_hour)){
    const laborCost=g.human_minutes_per_task*g.tasks_completed/60*c.labor_cost_per_hour;
    if(!Number.isFinite(laborCost)||laborCost<0)errors.push(key+": coste de trabajo humano no calculable");
  }
}
if(!Array.isArray(data.decision_test_vectors)||data.decision_test_vectors.length<4)errors.push("se requieren al menos cuatro vectores de prueba para coste/calidad/gobernanza");
const vectorIds=new Set();
const vectorDecisions=new Set();
for(const v of data.decision_test_vectors??[]){
  if(!nonempty(v.id)||vectorIds.has(v.id)||!["expand_cautiously","do_not_expand","inconclusive","block"].includes(v.expected_decision))errors.push("vector de decisión inválido o duplicado "+v.id);
  vectorIds.add(v.id);vectorDecisions.add(v.expected_decision);
  if(!nonempty(v.reason))errors.push(v.id+": falta justificación de la decisión");
  if(!["observed_fixture","hypothetical_gate"].includes(v.evidence_basis))errors.push(v.id+": evidence_basis debe ser observed_fixture o hypothetical_gate");
  if(typeof v.missing_measurement!=="boolean"||typeof v.unapproved_external_action!=="boolean")errors.push(v.id+": faltan flags booleanos de medición o autorización");
  if(v.missing_measurement===true&&v.expected_decision!=="inconclusive")errors.push(v.id+": datos ausentes deben producir resultado inconcluso");
  if(v.unapproved_external_action===true&&v.expected_decision!=="block")errors.push(v.id+": acción externa sin aprobación debe bloquearse");
  if(v.expected_decision==="expand_cautiously"&&!/comparable/i.test(v.reason))errors.push(v.id+": la expansión debe exigir tareas comparables");
  if(v.expected_decision==="expand_cautiously"&&!/quality|calidad/i.test(v.reason))errors.push(v.id+": la expansión debe mencionar calidad");
  if(v.expected_decision==="expand_cautiously"&&!/coste|cost/i.test(v.reason))errors.push(v.id+": la expansión debe mencionar coste total");
  if(v.expected_decision==="expand_cautiously" && v.evidence_basis==="observed_fixture" && c.comparability?.source_data_verified!==true)errors.push(v.id+": no se puede expandir con evidencia observada si los datos de origen no están verificados");
  if(v.expected_decision==="expand_cautiously" && v.evidence_basis==="observed_fixture" && ["task_definition_match","acceptance_criteria_version_match","observation_window_days_match"].some(field=>c.comparability?.[field]!==true))errors.push(v.id+": la expansión exige definiciones, criterios y ventanas de observación comparables");
  if(v.expected_decision==="expand_cautiously"){
    const gate=v.expansion_gate??{};
    for(const field of ["tasks_comparable","quality_non_inferior","lower_total_cost","source_data_verified","human_review_required"])if(gate[field]!==true)errors.push(v.id+": expansion_gate."+field+" debe ser true para permitir expansión");
    if(v.evidence_basis==="hypothetical_gate" && !/hypothetical|hipotético|escenario/i.test(v.reason))errors.push(v.id+": una expansión hipotética debe identificarse explícitamente como escenario, no como resultado observado");
  }
  if(v.evidence_basis==="observed_fixture" && v.comparison_result && ["expand_cautiously","do_not_expand"].includes(v.expected_decision)){
    const totalCost=g=>((g.model_cost+g.infra_cost+(g.human_minutes_per_task*g.tasks_completed/60*c.labor_cost_per_hour)+(c.expected_failure_cost?.[g===c.baseline?"baseline":"assisted"]??0))/g.accepted_deliveries);
    const baselineCost=totalCost(c.baseline), assistedCost=totalCost(c.assisted);
    const baselineDefectRate=c.baseline.defects_found/c.baseline.accepted_deliveries, assistedDefectRate=c.assisted.defects_found/c.assisted.accepted_deliveries;
    const costDirection=assistedCost<baselineCost?"lower":assistedCost>baselineCost?"higher":"equal";
    const defectDirection=assistedDefectRate<baselineDefectRate?"lower":assistedDefectRate>baselineDefectRate?"higher":"not_higher";
    if(v.comparison_result.cost_per_delivery!==costDirection)errors.push(v.id+": dirección de coste no coincide con el cálculo del fixture");
    if(v.comparison_result.defect_rate!==defectDirection)errors.push(v.id+": dirección de defectos por entrega aceptada no coincide con el cálculo del fixture");
  }
  if(["expand_cautiously","do_not_expand"].includes(v.expected_decision)){
    const result=v.comparison_result;
    if(!result||!["lower","equal","higher","unknown"].includes(result.cost_per_delivery)||!["lower","not_higher","higher","unknown"].includes(result.defect_rate)||typeof result.tasks_comparable!=="boolean")errors.push(v.id+": falta comparación explícita de coste, defectos y comparabilidad");
    if(v.expected_decision==="expand_cautiously"&&result&&(result.cost_per_delivery!=="lower"||result.defect_rate!=="not_higher"||result.tasks_comparable!==true))errors.push(v.id+": no se puede ampliar sin menor coste, calidad no inferior y tareas comparables");
    if(v.expected_decision==="do_not_expand"&&result&&result.cost_per_delivery==="lower"&&result.defect_rate==="not_higher"&&result.tasks_comparable===true)errors.push(v.id+": la decisión conservadora contradice la evidencia declarada");
  }
  if(v.expected_decision==="do_not_expand"&&!v.missing_measurement&&v.unapproved_external_action!==true){
    const cost=g=>((g.model_cost+g.infra_cost+(g.human_minutes_per_task*g.tasks_completed/60*c.labor_cost_per_hour)+c.expected_failure_cost[g===c.baseline?"baseline":"assisted"])/g.accepted_deliveries);
    const baselineDefectRate=c.baseline.defects_found/c.baseline.accepted_deliveries; const assistedDefectRate=c.assisted.defects_found/c.assisted.accepted_deliveries; if(cost(c.assisted)<cost(c.baseline)&&assistedDefectRate<=baselineDefectRate)errors.push(v.id+": decisión conservadora contradice los datos comparativos");
  }
}
for(const decision of ["expand_cautiously","do_not_expand","inconclusive","block"])if(!vectorDecisions.has(decision))errors.push("faltan vectores para decisión "+decision);
if (errors.length) {
  for (const error of errors) console.error(`LAB-10 productivity/governance: ${error}`);
  process.exit(1);
}
console.log(`LAB-10 fixture OK: ${metrics.length} métricas, ${gov.length} casos de gobernanza, ${scenarios.length} escenarios, ${criteria.length} criterios.`);
