import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const checklistPath = join(root, "docs/release-readiness-checklist.md");
const validatorPath = join(root, "scripts/check-release-readiness-checklist.mjs");
const canonical = await readFile(checklistPath, "utf8");
const mutations = [
  { label: "missing decision section", mutate: text => text.replace("## 5. Decisión", "## 5. Resultado"), expectedDiagnostic: "falta sección: ## 5. Decisión" },
  { label: "missing evidence safeguard", mutate: text => text.replace("no inferir éxito", "asumir éxito"), expectedDiagnostic: "falta regla o salvaguarda: no inferir éxito" },
  { label: "missing decision owner", mutate: text => text.replace("| Responsable de la decisión |", "| Dueño de la decisión |"), expectedDiagnostic: "falta campo en el registro de decisión: Responsable de la decisión" },
  { label: "missing manual accessibility status", mutate: text => text.replace("| Accesibilidad manual | |\n", ""), expectedDiagnostic: "falta campo en el registro de decisión: Accesibilidad manual" },
  { label: "missing privacy and consent status", mutate: text => text.replace("| Privacidad/consentimiento | |\n", ""), expectedDiagnostic: "falta campo en el registro de decisión: Privacidad/consentimiento" },
  { label: "missing critical failure policy", mutate: text => text.replace("fallo crítico", "incidencia"), expectedDiagnostic: "falta regla o salvaguarda: fallo crítico" },
  { label: "missing release outcome choices", mutate: text => text.replace("BLOQUEAR / APROBAR CON CONDICIONES / APROBAR", "PUBLICAR"), expectedDiagnostic: "falta regla o salvaguarda: BLOQUEAR / APROBAR CON CONDICIONES / APROBAR" },
  { label: "empty document", mutate: () => "", expectedDiagnostic: "falta texto obligatorio: # Lista de comprobación de preparación para publicar" },
  { label: "duplicate decision field", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\n| Responsable de la decisión | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "duplicate decision field with CR-only endings", mutate: text => text.replace("| Responsable de la decisión | |", "| Responsable de la decisión | |\r| Responsable de la decisión | |").replace(/\r?\n/g, "\r"), expectedDiagnostic: "campo duplicado en el registro de decisión: Responsable de la decisión" },
  { label: "malformed heading", mutate: text => text.replace("## 2. Cambio y verificación", "# 2. Cambio y verificación"), expectedDiagnostic: "falta sección: ## 2. Cambio y verificación" },
  { label: "duplicate manual accessibility field", mutate: text => text.replace("| Accesibilidad manual | |", "| Accesibilidad manual | |\n| Accesibilidad manual | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Accesibilidad manual" },
  { label: "duplicate privacy field", mutate: text => text.replace("| Privacidad/consentimiento | |", "| Privacidad/consentimiento | |\n| Privacidad/consentimiento | |"), expectedDiagnostic: "campo duplicado en el registro de decisión: Privacidad/consentimiento" }
];

const temp = await mkdtemp(join(tmpdir(), "release-checklist-tests-"));
const results = [];
function run(fixturePath) {
  return spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, RELEASE_CHECKLIST_PATH: fixturePath }
  });
}
async function writeFixture(name, content) {
  const path = join(temp, name);
  await writeFile(path, content, "utf8");
  return path;
}
function record(label, passed, detail = "") {
  results.push({ label, passed, detail });
}
function expectPass(label, result) {
  const output = result.stdout + result.stderr;
  record(label, result.status === 0 && output.includes("Release readiness checklist check passed"),
    result.status !== 0 ? "expected exit 0, got " + result.status + ": " + output : output);
}
function expectFail(label, result, expectedDiagnostic) {
  const output = result.stdout + result.stderr;
  record(label, result.status === 1 && output.includes(expectedDiagnostic),
    result.status !== 1 ? "expected exit 1, got " + result.status + ": " + output :
      !output.includes(expectedDiagnostic) ? "missing diagnostic " + JSON.stringify(expectedDiagnostic) + ": " + output : "");
}

try {
  const variants = [
    ["canonical LF", canonical],
    ["canonical CRLF", canonical.replace(/\r?\n/g, "\r\n")],
    ["canonical CR-only", canonical.replace(/\r?\n/g, "\r")],
    ["canonical mixed line endings", canonical.replace(/\r?\n/g, "\r\n").replace("## 1. Alcance y procedencia\r\n", "## 1. Alcance y procedencia\r")],
    ["trailing spaces", canonical.replace(/([^\r\n]+)$/gm, "$1   ")],
    ["extra final newlines", canonical.replace(/[\r\n]*$/, "\n\n\n")]
  ];
  for (const [label, content] of variants) {
    const path = await writeFixture(label.replace(/[^a-z0-9]+/gi, "-") + ".md", content);
    expectPass(label, run(path));
  }

  const missingPath = join(temp, "does-not-exist.md");
  expectFail("unreadable input", run(missingPath), "unable to read checklist input");

  for (const testCase of mutations) {
    const mutated = testCase.mutate(canonical);
    if (mutated === canonical) {
      record(testCase.label, false, "mutation did not alter the canonical fixture");
      continue;
    }
    const fixturePath = await writeFixture(testCase.label.replace(/[^a-z0-9]+/gi, "-") + ".md", mutated);
    expectFail(testCase.label, run(fixturePath), testCase.expectedDiagnostic);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}

const failed = results.filter(result => !result.passed);
for (const result of results) {
  console.log((result.passed ? "PASS " : "FAIL ") + result.label);
  if (!result.passed) console.error("  " + result.detail);
}
console.log("Release checklist regression summary: " + (results.length - failed.length) + "/" + results.length + " passed; " + failed.length + " failed.");
if (failed.length) process.exit(1);
