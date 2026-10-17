import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const checklistPath = join(root, "docs/release-readiness-checklist.md");
const validatorPath = join(root, "scripts/check-release-readiness-checklist.mjs");
const canonical = await readFile(checklistPath, "utf8");
const cases = [
  { label: "missing decision section", mutate: text => text.replace("## 5. Decisión", "## 5. Resultado"), expectedDiagnostic: "falta sección: ## 5. Decisión" },
  { label: "heading text only inside a sentence", mutate: text => text.replace("## 5. Decisión", "Texto de ejemplo: ## 5. Decisión"), expectedDiagnostic: "falta sección: ## 5. Decisión" },
  { label: "duplicate decision section", mutate: text => text.replace("## 5. Decisión", "## 5. Decisión\n\n## 5. Decisión"), expectedDiagnostic: "sección duplicada: ## 5. Decisión" },
  { label: "duplicate limits section", mutate: text => text.replace("## Límites", "## Límites\n\n## Límites"), expectedDiagnostic: "sección duplicada: ## Límites" },
  { label: "duplicate security section", mutate: text => text.replace("## 3. Herramientas, permisos y seguridad", "## 3. Herramientas, permisos y seguridad\n\n## 3. Herramientas, permisos y seguridad"), expectedDiagnostic: "sección duplicada: ## 3. Herramientas, permisos y seguridad" },
  { label: "safeguard only inside tab-indented code", mutate: text => text.replaceAll("no inferir éxito", "\tno inferir éxito"), expectedDiagnostic: "falta regla o salvaguarda: no inferir éxito" },
  { label: "safeguard only inside indented code", mutate: text => text.replaceAll("no inferir éxito", "no asegurar éxito").replace("no asegurar éxito", "    no inferir éxito"), expectedDiagnostic: "falta regla o salvaguarda: no inferir éxito" },
  { label: "title only inside HTML comment", mutate: text => text.replace("# Lista de comprobación de preparación para publicar", "<!-- # Lista de comprobación de preparación para publicar -->"), expectedDiagnostic: "falta título exacto: # Lista de comprobación de preparación para publicar" },
  { label: "section only inside HTML comment", mutate: text => text.replace("## 5. Decisión", "<!-- ## 5. Decisión -->"), expectedDiagnostic: "falta sección: ## 5. Decisión" },
  { label: "safeguard only inside HTML comment", mutate: text => text.replaceAll("no inferir éxito", "no asegurar éxito").replace("no asegurar éxito", "<!-- no inferir éxito -->"), expectedDiagnostic: "falta regla o salvaguarda: no inferir éxito" },
  { label: "safeguard only inside fenced code", mutate: text => text.replaceAll("no inferir éxito", "```text\nno inferir éxito\n```"), expectedDiagnostic: "falta regla o salvaguarda: no inferir éxito" },
  { label: "missing evidence safeguard", mutate: text => text.replace("no inferir éxito", "asumir éxito"), expectedDiagnostic: "falta regla o salvaguarda: no inferir éxito" },
  { label: "missing decision owner", mutate: text => text.replace("| Responsable de la decisión |", "| Dueño de la decisión |"), expectedDiagnostic: "falta campo en el registro de decisión: Responsable de la decisión" },
  { label: "decision owner row outside decision section", mutate: text => text.replace("| Responsable de la decisión | |", "").replace("## 5. Decisión", "| Responsable de la decisión | valor de ejemplo |\n\n## 5. Decisión"), expectedDiagnostic: "falta campo en el registro de decisión: Responsable de la decisión" },
  { label: "missing manual accessibility status", mutate: text => text.replace("| Accesibilidad manual | |\n", ""), expectedDiagnostic: "falta campo en el registro de decisión: Accesibilidad manual" },
  { label: "missing privacy and consent status", mutate: text => text.replace("| Privacidad/consentimiento | |\n", ""), expectedDiagnostic: "falta campo en el registro de decisión: Privacidad/consentimiento" },
  { label: "missing critical failure policy", mutate: text => text.replace("fallo crítico", "incidencia"), expectedDiagnostic: "falta regla o salvaguarda: fallo crítico" },
  { label: "missing release outcome choices", mutate: text => text.replace("BLOQUEAR / APROBAR CON CONDICIONES / APROBAR", "PUBLICAR"), expectedDiagnostic: "falta regla o salvaguarda: BLOQUEAR / APROBAR CON CONDICIONES / APROBAR" },
  { label: "title only inside tab-indented code", mutate: text => text.replace("# Lista de comprobación de preparación para publicar", "\t# Lista de comprobación de preparación para publicar"), expectedDiagnostic: "falta título exacto: # Lista de comprobación de preparación para publicar" },
  { label: "title only inside indented code", mutate: text => text.replace("# Lista de comprobación de preparación para publicar", "    # Lista de comprobación de preparación para publicar"), expectedDiagnostic: "falta título exacto: # Lista de comprobación de preparación para publicar" },
  { label: "heading inside tilde-fenced code", mutate: text => text.replace("## 5. Decisión", "~~~markdown\n## 5. Decisión\n~~~"), expectedDiagnostic: "falta sección: ## 5. Decisión" },
  { label: "unclosed fence hides later headings", mutate: text => text.replace("## 1. Alcance y procedencia", "```markdown\n## 1. Alcance y procedencia"), expectedDiagnostic: "falta sección: ## 1. Alcance y procedencia" },
  { label: "section only inside indented code", mutate: text => text.replace("## 5. Decisión", "    ## 5. Decisión"), expectedDiagnostic: "falta sección: ## 5. Decisión" },
  { label: "title only inside fenced code", mutate: text => text.replace("# Lista de comprobación de preparación para publicar", "```markdown\n# Lista de comprobación de preparación para publicar\n```"), expectedDiagnostic: "falta título exacto: # Lista de comprobación de preparación para publicar" },
  { label: "section only inside fenced code", mutate: text => text.replace("## 5. Decisión", "```markdown\n## 5. Decisión\n```"), expectedDiagnostic: "falta sección: ## 5. Decisión" },
  { label: "title text only inside a sentence", mutate: text => text.replace("# Lista de comprobación de preparación para publicar", "Ejemplo: # Lista de comprobación de preparación para publicar"), expectedDiagnostic: "falta título exacto: # Lista de comprobación de preparación para publicar" },
  { label: "title with altered capitalization", mutate: text => text.replace("# Lista de comprobación de preparación para publicar", "# Lista de Comprobación de preparación para publicar"), expectedDiagnostic: "falta título exacto: # Lista de comprobación de preparación para publicar" },
  { label: "duplicate title", mutate: text => text.replace("# Lista de comprobación de preparación para publicar", "# Lista de comprobación de preparación para publicar\n\n# Lista de comprobación de preparación para publicar"), expectedDiagnostic: "título duplicado: # Lista de comprobación de preparación para publicar" },
  { label: "duplicate title with trailing spaces", mutate: text => text.replace("# Lista de comprobación de preparación para publicar", "# Lista de comprobación de preparación para publicar\n\n# Lista de comprobación de preparación para publicar   "), expectedDiagnostic: "título duplicado: # Lista de comprobación de preparación para publicar" },
  { label: "empty document", mutate: () => "", expectedDiagnostic: "falta título exacto: # Lista de comprobación de preparación para publicar" },
  { label: "duplicate decision field", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\n| Responsable de la decisión | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "duplicate indented decision field", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\n  | Responsable de la decisión | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "duplicate decision field with flexible cell spacing", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\n|   Responsable de la decisión   | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "duplicate decision field with tab indentation", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\n\t| Responsable de la decisión | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "duplicate decision field with CR-only endings", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\r| Responsable de la decisión | |").replace(/\r?\n/g, "\r"), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "duplicate decision field with mixed line endings", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\r\n| Responsable de la decisión | |").replace(/\r?\n/g, (match, offset) => offset % 2 ? "\r" : match), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "duplicate decision field with trailing spaces", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\n| Responsable de la decisión | |   "), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "malformed heading", mutate: text => text.replace("## 2. Cambio y verificación", "# 2. Cambio y verificación"), expectedDiagnostic: "falta sección: ## 2. Cambio y verificación" },
  { label: "duplicate manual accessibility field", mutate: text => text.replace("| Accesibilidad manual | |", "| Accesibilidad manual | |\n| Accesibilidad manual | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Accesibilidad manual" },
  { label: "duplicate privacy field", mutate: text => text.replace("| Privacidad/consentimiento | |", "| Privacidad/consentimiento | |\n| Privacidad/consentimiento | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Privacidad/consentimiento" },
  { label: "missing exact revision safeguard", mutate: text => text.replace("| Revisión exacta | |", "| Revisión general | |"), expectedDiagnostic: "falta campo en el registro de decisión: Revisión exacta" },
  { label: "missing build evidence field", mutate: text => text.replace("| Resultado de build y checks | |\n", ""), expectedDiagnostic: "falta campo en el registro de decisión: Resultado de build y checks" },
  { label: "missing test evidence field", mutate: text => text.replace("| Evidencia de pruebas | |\n", ""), expectedDiagnostic: "falta campo en el registro de decisión: Evidencia de pruebas" },
  { label: "missing critical-failure field", mutate: text => text.replace("| Fallos críticos abiertos | |\n", ""), expectedDiagnostic: "falta campo en el registro de decisión: Fallos críticos abiertos" },
  { label: "missing decision field", mutate: text => text.replace("| Decisión | BLOQUEAR / APROBAR CON CONDICIONES / APROBAR |\n", ""), expectedDiagnostic: "falta campo en el registro de decisión: Decisión" },
  { label: "duplicate final decision field", mutate: text => text.replace("| Decisión | BLOQUEAR / APROBAR CON CONDICIONES / APROBAR |", "| Decisión | BLOQUEAR / APROBAR CON CONDICIONES / APROBAR |\n| Decisión | BLOQUEAR / APROBAR CON CONDICIONES / APROBAR |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Decisión" },
  { label: "missing independent diff review safeguard", mutate: text => text.replace("revisión independiente del diff", "revisión del cambio"), expectedDiagnostic: "falta regla o salvaguarda: revisión independiente del diff" },
  { label: "missing scope section", mutate: text => text.replace("## 1. Alcance y procedencia", "## 1. Alcance"), expectedDiagnostic: "falta sección: ## 1. Alcance y procedencia" },
  { label: "missing change verification section", mutate: text => text.replace("## 2. Cambio y verificación", "## 2. Cambio"), expectedDiagnostic: "falta sección: ## 2. Cambio y verificación" },
  { label: "missing tools and permissions section", mutate: text => text.replace("## 3. Herramientas, permisos y seguridad", "## 3. Herramientas"), expectedDiagnostic: "falta sección: ## 3. Herramientas, permisos y seguridad" },
  { label: "missing operations and recovery section", mutate: text => text.replace("## 4. Operación y recuperación", "## 4. Operación"), expectedDiagnostic: "falta sección: ## 4. Operación y recuperación" },
  { label: "missing limits section", mutate: text => text.replace("## Límites", "## Limitaciones"), expectedDiagnostic: "falta sección: ## Límites" },
  { label: "missing no-execution safeguard", mutate: text => text.replace("no se ejecutó", "no se revisó"), expectedDiagnostic: "falta regla o salvaguarda: no se ejecutó" },
  { label: "missing decision owner safeguard", mutate: text => text.replace(/responsable/g, "persona encargada"), expectedDiagnostic: "falta regla o salvaguarda: responsable" },
  { label: "missing security limitation safeguard", mutate: text => text.replace("no demuestra por sí sola la seguridad", "demuestra la seguridad"), expectedDiagnostic: "falta regla o salvaguarda: no demuestra por sí sola la seguridad" },
  { label: "missing release revision field", mutate: text => text.replace("| Revisión exacta | |", "| Revisión revisada | |"), expectedDiagnostic: "falta campo en el registro de decisión: Revisión exacta" },
  { label: "missing build checks field", mutate: text => text.replace("| Resultado de build y checks | |", "| Resultado técnico | |"), expectedDiagnostic: "falta campo en el registro de decisión: Resultado de build y checks" },
  { label: "missing test evidence field", mutate: text => text.replace("| Evidencia de pruebas | |", "| Pruebas | |"), expectedDiagnostic: "falta campo en el registro de decisión: Evidencia de pruebas" },
  { label: "missing critical failures field", mutate: text => text.replace("| Fallos críticos abiertos | |", "| Fallos | |"), expectedDiagnostic: "falta campo en el registro de decisión: Fallos críticos abiertos" },
  { label: "missing accessibility field", mutate: text => text.replace("| Accesibilidad manual | |", "| Accesibilidad | |"), expectedDiagnostic: "falta campo en el registro de decisión: Accesibilidad manual" },
  { label: "missing privacy field", mutate: text => text.replace("| Privacidad/consentimiento | |", "| Privacidad | |"), expectedDiagnostic: "falta campo en el registro de decisión: Privacidad/consentimiento" },
  { label: "duplicate release revision field", mutate: text => text.replace("| Revisión exacta | |", "| Revisión exacta | |\n| Revisión exacta | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Revisión exacta" },
  { label: "duplicate build checks field", mutate: text => text.replace("| Resultado de build y checks | |", "| Resultado de build y checks | |\n| Resultado de build y checks | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Resultado de build y checks" },
  { label: "duplicate test evidence field", mutate: text => text.replace("| Evidencia de pruebas | |", "| Evidencia de pruebas | |\n| Evidencia de pruebas | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Evidencia de pruebas" },
  { label: "duplicate critical failures field", mutate: text => text.replace("| Fallos críticos abiertos | |", "| Fallos críticos abiertos | |\n| Fallos críticos abiertos | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Fallos críticos abiertos" },
  { label: "duplicate privacy field with whitespace", mutate: text => text.replace("| Privacidad/consentimiento | |", "| Privacidad/consentimiento | |\n| Privacidad/consentimiento | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Privacidad/consentimiento" }
];

const temp = await mkdtemp(join(tmpdir(), "release-checklist-tests-"));
let failures = 0;
function run(fixturePath) {
  return spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, RELEASE_CHECKLIST_PATH: fixturePath }
  });
}
function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error("FAIL " + message);
    return false;
  }
  return true;
}
async function writeFixture(name, text) {
  const path = join(temp, name);
  await writeFile(path, text, "utf8");
  return path;
}
function expectPass(label, result) {
  const output = result.stdout + result.stderr;
  assert(result.status === 0, label + ": expected exit 0, got " + result.status + "\n" + output);
  assert(output.includes("Release readiness checklist check passed"), label + ": missing success message\n" + output);
  if (result.status === 0 && output.includes("Release readiness checklist check passed")) console.log("PASS " + label);
}
function expectFail(label, result, expectedDiagnostic) {
  const output = result.stdout + result.stderr;
  assert(result.status === 1, label + ": expected exit 1, got " + result.status + "\n" + output);
  assert(output.includes(expectedDiagnostic), label + ": missing expected diagnostic " + JSON.stringify(expectedDiagnostic) + "\n" + output);
  if (result.status === 1 && output.includes(expectedDiagnostic)) console.log("PASS rejects " + label + " with expected diagnostic");
}

try {
  const variants = [
    ["canonical LF", canonical],
    ["canonical CRLF", canonical.replace(/\r?\n/g, "\r\n")],
    ["canonical CR-only", canonical.replace(/\r?\n/g, "\r")],
    ["canonical mixed line endings", canonical.replace(/\r?\n/g, "\r\n").replace("## 1. Alcance y procedencia\r\n", "## 1. Alcance y procedencia\r")],
    ["trailing spaces", canonical.replace(/([^\r\n]+)$/gm, "$1   ")],
    ["extra final newlines", canonical.replace(/[\r\n]*$/, "\n\n\n")],
    ["decision-like row outside decision section", canonical.replace("## 5. Decisión", "| Responsable de la decisión | valor de ejemplo |\n\n## 5. Decisión")]
  ];
  let referenceStatus;
  for (const [label, content] of variants) {
    const path = await writeFixture(label.replace(/[^a-z0-9]+/gi, "-") + ".md", content);
    const result = run(path);
    expectPass(label, result);
    if (referenceStatus === undefined) referenceStatus = result.status;
    else assert(result.status === referenceStatus, label + ": formatting-only change altered exit status");
  }

  const missingPath = join(temp, "does-not-exist.md");
  expectFail("unreadable input", run(missingPath), "unable to read checklist input");

  for (const testCase of cases) {
    const mutated = testCase.mutate(canonical);
    if (!assert(mutated !== canonical, testCase.label + ": mutation did not alter the canonical fixture")) continue;
    const fixturePath = await writeFixture(testCase.label.replace(/[^a-z0-9]+/gi, "-") + ".md", mutated);
    expectFail(testCase.label, run(fixturePath), testCase.expectedDiagnostic);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}

if (failures) {
  console.error("Release checklist regression tests failed: " + failures + " assertion(s).");
  process.exit(1);
}
console.log("Release checklist regression tests passed: formatting-only variants accepted; malformed semantic variants rejected with specific diagnostics.");
