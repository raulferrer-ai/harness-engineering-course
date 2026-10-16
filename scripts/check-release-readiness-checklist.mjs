import { readFile } from "node:fs/promises";
import process from "node:process";

const path = new URL("../docs/release-readiness-checklist.md", import.meta.url);
const markdown = await readFile(path, "utf8");
const failures = [];
const requireText = (pattern, message) => {
  if (!pattern.test(markdown)) failures.push(message);
};

requireText(/^# Lista de comprobación de preparación para publicar$/m, "falta el título canónico");
for (const heading of [
  "## 1. Alcance y procedencia",
  "## 2. Cambio y verificación",
  "## 3. Herramientas, permisos y seguridad",
  "## 4. Operación y recuperación",
  "## 5. Decisión",
  "## Límites"
]) requireText(new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "m"), "falta sección: " + heading);

for (const phrase of [
  "no inferir éxito",
  "fallo crítico",
  "revisión independiente del diff",
  "no se ejecutó",
  "BLOQUEAR / APROBAR CON CONDICIONES / APROBAR",
  "responsable",
  "no equivale a validación pedagógica"
]) requireText(new RegExp(phrase, "i"), "falta regla o salvaguarda: " + phrase);

const decisionRows = ["Revisión exacta", "Responsable de la decisión", "Resultado de build y checks", "Evidencia de pruebas", "Fallos críticos abiertos", "Decisión"];
for (const row of decisionRows) requireText(new RegExp("^\\|\\s*" + row.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\|", "m"), "falta campo en el registro de decisión: " + row);

if (failures.length) {
  console.error("Release readiness checklist check failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("Release readiness checklist check passed: required sections, decision fields, and evidence safeguards are present.");
