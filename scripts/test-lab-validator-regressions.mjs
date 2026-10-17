import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import process from "node:process";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const labs = [
  {
    id: "LAB-01", env: "LAB01_FIXTURE_PATH", fixture: "fixtures/lab01-cases.json", validator: "scripts/check-lab01-fixtures.mjs",
    cases: [
      ["missing rationale", d => { delete d.cases[0].rationale; }, /falta justificación/],
      ["duplicate case ID", d => { d.cases[1].id = d.cases[0].id; }, /ID vacío o duplicado/],
      ["invalid priority", d => { d.cases[0].expected.priority = "urgent"; }, /prioridad no permitida/],
      ["expected ticket ID mismatches parsed ticket", d => { d.cases[0].expected.id = "T-999"; }, /expected.id T-999 no coincide con el ticket de la entrada T-104/],
      ["ticket ID hidden elsewhere does not mask mismatch", d => { d.cases[0].input += " Nota relacionada con T-104."; d.cases[0].expected.id = "T-104"; d.cases[0].input = d.cases[0].input.replace("Ticket T-104", "Ticket T-999"); }, /expected.id T-104 no coincide con el ticket de la entrada T-999/],
      ["missing ticket identifier", d => { d.cases[0].input = "La incidencia afecta a varios usuarios."; }, /la entrada no contiene un identificador de ticket reconocible/],
      ["duplicate expected ticket ID", d => { d.cases[1].expected.id = d.cases[0].expected.id; }, /expected.id duplicado/]
    ]
  },
  {
    id: "LAB-02", env: "LAB02_FIXTURE_PATH", fixture: "fixtures/lab02-specification.json", validator: "scripts/check-lab02-specification.mjs",
    cases: [
      ["missing source request", d => { delete d.source_request; }, /falta source_request/],
      ["duplicate acceptance criterion ID", d => { d.acceptance_criteria[1].id = d.acceptance_criteria[0].id; }, /ID de criterio vacío o duplicado/],
      ["missing verification evidence", d => { delete d.acceptance_criteria[0].verification; }, /falta verification/],
      ["empty blocking question", d => { d.blocking_questions[0] = "   "; }, /cada pregunta bloqueante debe ser texto no vacío/],
      ["empty allowed scope item", d => { d.scope.allowed[0] = ""; }, /scope.allowed no puede contener elementos vacíos/],
      ["empty stop condition", d => { d.stop_conditions[0] = ""; }, /cada condición de parada debe ser texto no vacío/],
      ["duplicate blocking question", d => { d.blocking_questions[1] = d.blocking_questions[0]; }, /las preguntas bloqueantes no pueden estar duplicadas/],
      ["scope item both allowed and forbidden", d => { d.scope.forbidden[0] = d.scope.allowed[0]; }, /scope no puede permitir y prohibir el mismo elemento/]
    ]
  },
  {
    id: "LAB-03", env: "LAB03_FIXTURE_PATH", fixture: "fixtures/lab03-context-experiment.json", validator: "scripts/check-lab03-context-fixture.mjs",
    cases: [
      ["duplicate context variant ID", d => { d.context_variants[1].id = d.context_variants[0].id; }, /ID de variante vacío o duplicado/],
      ["duplicate path in variant", d => { d.context_variants[0].files.push({ ...d.context_variants[0].files[0] }); }, /ruta duplicada/],
      ["missing required source", d => { d.reference_cases[0].required_sources = []; }, /faltan fuentes requeridas/],
      ["empty expected fact", d => { d.reference_cases[0].expected_facts[0] = " "; }, /los hechos de referencia deben ser texto no vacío/],
      ["duplicate required source", d => { d.reference_cases[0].required_sources.push(d.reference_cases[0].required_sources[0]); }, /las fuentes requeridas no pueden estar duplicadas/],
      ["required source absent from all variants", d => { d.reference_cases[0].required_sources = ["docs/not-in-context.md"]; }, /fuente requerida no presente en ninguna variante docs\/not-in-context\.md/],
      ["empty measurement rule", d => { d.measurement_policy.rules[0] = ""; }, /measurement_policy.rules contiene elementos vacíos/]
    ]
  },
  {
    id: "LAB-04", env: "LAB04_FIXTURE_PATH", fixture: "fixtures/lab04-code-review.json", validator: "scripts/check-lab04-code-review.mjs",
    cases: [
      ["unknown acceptance criterion reference", d => { d.test_matrix[0].criterion = "AC-999"; }, /expectativa vacía o criterio desconocido/],
      ["duplicate test ID", d => { d.test_matrix[1].id = d.test_matrix[0].id; }, /tests: ID vacío o duplicado/],
      ["invalid decision gate", d => { d.decision_gate.default = "ship_it"; }, /decisión inicial no válida/],
      ["empty review checklist item", d => { d.review_checklist[0] = " "; }, /checklist de revisión contiene controles vacíos/],
      ["duplicate required baseline field", d => { d.baseline_record.required.push(d.baseline_record.required[0]); }, /campos requeridos duplicados/],
      ["missing regression test category", d => { d.test_matrix = d.test_matrix.filter(test => test.kind !== "regression"); }, /falta al menos un caso de prueba de tipo regression/],
      ["acceptance criterion has no test", d => { d.test_matrix = d.test_matrix.map(test => ({ ...test, criterion: "AC-01" })); }, /AC-02: criterio verificable por prueba sin caso asociado/]
    ]
  },
  {
    id: "LAB-05", env: "LAB05_FIXTURE_PATH", fixture: "fixtures/lab05-tool-permissions.json", validator: "scripts/check-lab05-tool-permissions.mjs",
    cases: [
      ["allow by default", d => { d.decision_policy.default = "allow"; }, /la política debe denegar por defecto/],
      ["duplicate tool name", d => { d.tools[1].name = d.tools[0].name; }, /herramientas: valor vacío o duplicado/],
      ["invalid tool risk", d => { d.tools[0].risk = "extreme"; }, /riesgo no válido/],
      ["empty allowed permission", d => { d.tools[0].allowed[0] = " "; }, /allowed contiene permisos vacíos/],
      ["permission both allowed and denied", d => { d.tools[0].denied.push(d.tools[0].allowed[0]); }, /un permiso no puede estar simultáneamente permitido y denegado/],
      ["duplicate audit field", d => { d.audit_fields.push(d.audit_fields[0]); }, /campos de auditoría duplicados/],
      ["unknown threat referenced by criterion", d => { d.acceptance_criteria[0].evidence = "TP-999"; }, /evidencia referencia una amenaza inexistente TP-999/],
      ["threat not covered by acceptance evidence", d => { for (const criterion of d.acceptance_criteria) criterion.evidence = criterion.evidence.replace(/TP-06/g, ""); }, /TP-06: amenaza sin referencia en la evidencia de ningún criterio/],
      ["policy conflict not escalated", d => { d.decision_policy.policy_conflict = "allow"; }, /los conflictos de política deben denegar y escalar/],
      ["logging policy omits secret handling", d => { d.decision_policy.logging = "Guardar todos los datos para depuración."; }, /la política de logging debe definir una regla explícita para no registrar secretos/]
    ]
  },
  {
    id: "LAB-06", env: "LAB06_FIXTURE_PATH", fixture: "fixtures/lab06-release-gates.json", validator: "scripts/check-lab06-release-gates.mjs",
    cases: [
      ["unknown required evidence", d => { d.gates[0].required = ["EV-999"]; }, /evidencia desconocida EV-999/],
      ["duplicate gate ID", d => { d.gates[1].id = d.gates[0].id; }, /gates: ID vacío o duplicado/],
      ["duplicate audit field", d => { d.audit_record_fields.push(d.audit_record_fields[0]); }, /campos del registro de auditoría duplicados/],
      ["failed gate does not block", d => { d.gates[0].failure = "warn"; }, /el fallo debe bloquear/],
      ["duplicate required evidence", d => { d.gates[0].required.push(d.gates[0].required[0]); }, /referencias de evidencia duplicadas/],
      ["empty limitation", d => { d.limitations[0] = ""; }, /limitaciones contiene elementos vacíos/],
      ["required evidence is not covered by a gate", d => { d.gates = d.gates.filter(gate => !gate.required.includes("EV-06")); }, /EV-06: evidencia no está exigida por ningún gate/]
    ]
  },
  {
    id: "LAB-07", env: "LAB07_FIXTURE_PATH", fixture: "fixtures/lab07-evaluation.json", validator: "scripts/check-lab07-evaluation.mjs",
    cases: [
      ["duplicate rubric ID", d => { d.rubric[1].id = d.rubric[0].id; }, /rúbrica: ID vacío o duplicado/],
      ["duplicate rubric dimension", d => { d.rubric[1].dimension = d.rubric[0].dimension; }, /dimensión de rúbrica duplicada/],
      ["invalid score threshold", d => { d.scoring_protocol.pass_threshold_percent = 150; }, /umbral de aprobación debe estar entre 0 y 100/],
      ["fractional rubric score", d => { const dimension = d.rubric[0].dimension; d.scoring_protocol.decision_test_vectors[0].scores[dimension] = 2.5; }, /puntuación para .* debe ser un entero entre 0 y 4/],
      ["empty scoring step", d => { d.scoring_protocol.steps[0] = " "; }, /scoring_protocol.steps contiene elementos vacíos/],
      ["empty decision rule", d => { d.scoring_protocol.decision_rule[0] = ""; }, /regla de decisión contiene elementos vacíos/],
      ["critical failure lacks decision vector", d => { d.scoring_protocol.decision_test_vectors = d.scoring_protocol.decision_test_vectors.filter(vector => vector.id !== "DEC-07"); }, /EV-01: fallo crítico sin vector de decisión: Afirmar que la nota histórica obsoleta prevalece/]
    ]
  },
  {
    id: "LAB-08",
    env: "LAB08_FIXTURE_PATH",
    fixture: "fixtures/lab08-security-threats.json",
    validator: "scripts/check-lab08-security-threats.mjs",
    cases: [
      ["missing asset name", d => { delete d.assets[0].name; }, /activo sin nombre o impacto/],
      ["duplicate asset ID", d => { d.assets[1].id = d.assets[0].id; }, /ID vacío o duplicado/],
      ["duplicate asset reference", d => { d.threats[0].asset_ids.push(d.threats[0].asset_ids[0]); }, /asset_ids contiene referencias duplicadas/],
      ["duplicate threat reference", d => { d.test_cases[0].threat_ids.push(d.test_cases[0].threat_ids[0]); }, /threat_ids contiene referencias duplicadas/],
      ["empty security limitation", d => { d.limitations[0] = " "; }, /limitations contiene elementos vacíos/],
      ["unknown security test evidence", d => { d.acceptance_criteria[1].evidence = "resultado SEC-T99"; }, /evidencia referencia una prueba inexistente SEC-T99/],
      ["security test not covered by acceptance criteria", d => { d.acceptance_criteria = d.acceptance_criteria.map(criterion => ({ ...criterion, evidence: criterion.evidence.replace(/SEC-T02|SEC-T03|SEC-T04|SEC-T05/g, "") })); }, /SEC-T02: prueba sin referencia en la evidencia de ningún criterio/]
    ]
  },
  {
    id: "LAB-09",
    env: "LAB09_FIXTURE_PATH",
    fixture: "fixtures/lab09-observability-recovery.json",
    validator: "scripts/check-lab09-observability-recovery.mjs",
    cases: [
      ["invalid signal threshold", d => { d.signals[0].threshold.value = "unknown"; }, /umbral inválido/],
      ["rate outside valid range", d => { const signal = d.signals.find(s => /rate$/.test(s.name)); signal.threshold.value = 1.5; }, /una tasa debe expresarse entre 0 y 1/],
      ["rate uses wrong unit", d => { const signal = d.signals.find(s => /rate$/.test(s.name)); signal.unit = "percent"; }, /las tasas deben usar unit=ratio/],
      ["invalid currency code", d => { d.signals.find(s => s.name === "cost_per_accepted_task").currency = "EURO"; }, /debe declarar unidad monetaria por tarea y código de moneda ISO 4217/],
      ["missing audit timestamp", d => { d.audit_fields = d.audit_fields.filter(field => field !== "timestamp"); }, /registro de auditoría insuficiente/],
      ["missing artifact digest audit field", d => { d.audit_fields = d.audit_fields.filter(field => field !== "artifact_digest"); }, /registro de auditoría insuficiente/],
      ["duplicate audit field", d => { d.audit_fields.push(d.audit_fields[0]); }, /registro de auditoría insuficiente/],
      ["duplicate event required field", d => { d.events[0].required_fields.push(d.events[0].required_fields[0]); }, /required_fields debe ser una lista sin duplicados/],
      ["duplicate signal ID", d => { d.signals[1].id = d.signals[0].id; }, /ID vacío o duplicado/],
      ["duplicate signal name", d => { d.signals[1].name = d.signals[0].name; }, /nombre de señal duplicado/],
      ["unknown recovery trigger", d => { d.recovery_steps[0].trigger = "SIG-999"; }, /trigger desconocido/],
      ["missing required recovery step", d => { d.recovery_steps = d.recovery_steps.filter(step => step.trigger !== "SIG-03"); }, /SIG-03: requiere un paso de recuperación por política/],
      ["empty limitation", d => { d.limitations[0] = " "; }, /limitaciones explícitas contiene elementos vacíos/],
      ["critical security signal does not require recovery", d => { d.signals.find(signal => signal.name === "unauthorized_action_count").recovery_required = false; }, /SIG-04: las señales de seguridad críticas deben requerir recuperación/],
      ["recovery marked complete despite failed regression", d => { const scenario = d.scenarios.find(s => /regresi[oó]n/i.test(s.input)); scenario.expected = "se declara recuperación completa aunque la suite de regresión falla"; }, /debe existir un escenario que impida declarar recuperación completa si falla la regresión/],
      ["unknown operational scenario evidence", d => { d.acceptance_criteria[2].evidence = "OPS-T99 y REC-01"; }, /evidencia referencia un elemento inexistente OPS-T99/],
      ["operational scenario not covered by criteria", d => { d.acceptance_criteria[0].evidence = d.acceptance_criteria[0].evidence.replace("OPS-T01", ""); }, /OPS-T01: elemento sin referencia en la evidencia de ningún criterio/]
    ]
  },
  {
    id: "LAB-10",
    env: "LAB10_FIXTURE_PATH",
    fixture: "fixtures/lab10-productivity-governance.json",
    validator: "scripts/check-lab10-productivity-governance.mjs",
    cases: [
      ["accepted deliveries exceed completed tasks", d => { d.comparison.baseline.accepted_deliveries = d.comparison.baseline.tasks_completed + 1; }, /entregas aceptadas superan tareas completadas/],
      ["duplicate metric ID", d => { d.metrics[1].id = d.metrics[0].id; }, /ID vacío o duplicado/],
      ["duplicate metric name", d => { d.metrics[1].name = d.metrics[0].name; }, /nombre de métrica duplicado/],
      ["broken evidence reference", d => { d.acceptance_criteria[0].evidence = "MET-999"; }, /evidencia referencia un elemento inexistente MET-999/],
      ["unverified source data claimed as observed expansion evidence", d => { d.decision_test_vectors.find(v => v.id === "TV-04").evidence_basis = "observed_fixture"; }, /no se puede expandir con evidencia observada si los datos de origen no están verificados/],
      ["expansion without mandatory human review", d => { d.decision_test_vectors.find(v => v.id === "TV-04").expansion_gate.human_review_required = false; }, /expansion_gate.human_review_required debe ser true para permitir expansión/],
      ["empty limitation", d => { d.limitations[0] = " "; }, /limitaciones explícitas contiene elementos vacíos/],
      ["unknown decision vector evidence", d => { d.acceptance_criteria[5].evidence = "TV-99"; }, /evidencia referencia un elemento inexistente TV-99/],
      ["decision vector not covered by acceptance criteria", d => { d.acceptance_criteria[5].evidence = d.acceptance_criteria[5].evidence.replace("TV-04", ""); }, /TV-04: elemento sin referencia en la evidencia de ningún criterio/]
    ]
  }
];

const expectedLabIds = Array.from({ length: 10 }, (_, index) => `LAB-${String(index + 1).padStart(2, "0")}`);
const actualLabIds = labs.map(lab => lab.id);
if (JSON.stringify(actualLabIds) !== JSON.stringify(expectedLabIds)) {
  throw new Error(`Regression suite must cover LAB-01 through LAB-10 in order; got: ${actualLabIds.join(", ")}`);
}
for (const lab of labs) {
  if (lab.cases.length < 3) {
    throw new Error(`${lab.id} must define at least three negative mutations; got ${lab.cases.length}`);
  }
}
for (const field of ["env", "fixture", "validator"]) {
  const values = labs.map(lab => lab[field]);
  if (new Set(values).size !== values.length) {
    throw new Error(`Regression suite contains duplicate ${field} entries`);
  }
}

const temp = await mkdtemp(join(tmpdir(), "lab-validator-regressions-"));
let failures = 0;
function runValidator(lab, fixturePath) {
  return spawnSync(process.execPath, [join(root, lab.validator)], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, [lab.env]: fixturePath }
  });
}
try {
  for (const lab of labs) {
    const canonicalPath = join(root, lab.fixture);
    const canonical = JSON.parse(await readFile(canonicalPath, "utf8"));
    const positive = runValidator(lab, canonicalPath);
    if (positive.status !== 0) {
      failures++;
      console.error(`FAIL ${lab.id} canonical fixture should pass\n${positive.stdout}${positive.stderr}`);
    } else {
      console.log(`PASS ${lab.id} canonical fixture`);
    }

    for (let i = 0; i < lab.cases.length; i++) {
      const [label, mutate, expected] = lab.cases[i];
      const altered = structuredClone(canonical);
      mutate(altered);
      const fixturePath = join(temp, `${lab.id.toLowerCase()}-${i + 1}.json`);
      await writeFile(fixturePath, JSON.stringify(altered, null, 2) + "\n", "utf8");
      const result = runValidator(lab, fixturePath);
      const output = result.stdout + result.stderr;
      const diagnosticLines = output.split(/\r?\n/).filter(line => line.trim() && !/^(Validator regression suite|FAIL |PASS )/.test(line));
      const matchingLines = diagnosticLines.filter(line => expected.test(line));
      if (result.status !== 1 || matchingLines.length !== 1) {
        failures++;
        console.error(`FAIL ${lab.id} ${label}: expected exit 1 and exactly one diagnostic matching / ${expected.source} /\nexit=${result.status}; diagnostics=${diagnosticLines.length}; matches=${matchingLines.length}\n${output}`);
      } else {
        console.log(`PASS ${lab.id} rejects ${label} with the expected diagnostic`);
      }
    }
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
if (failures) {
  console.error(`Validator regression suite failed: ${failures} failure(s).`);
  process.exit(1);
}
const mutationCount = labs.reduce((total, lab) => total + lab.cases.length, 0);
console.log(`Validator regression suite OK: 10 canonical fixtures accepted; ${mutationCount} invalid mutations rejected for the expected reason.`);
