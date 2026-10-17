import { readFile } from "node:fs/promises";

const checklistPath = process.env.RELEASE_CHECKLIST_PATH || new URL("../docs/release-readiness-checklist.md", import.meta.url);
let markdown;
try {
  markdown = (await readFile(checklistPath, "utf8")).replace(/\r\n?/g, "\n");
} catch (error) {
  console.error("Release readiness checklist check failed: unable to read checklist input.");
  process.exit(1);
}


const failures = [];
const requireText = (text, message = "falta texto obligatorio: " + text) => {
  if (!markdown.includes(text)) failures.push(message);
};

if (!markdown.split("\n").some(line => line.trim() === "# Lista de comprobación de preparación para publicar")) failures.push("falta título exacto: # Lista de comprobación de preparación para publicar");
for (const heading of [
  "## 1. Alcance y procedencia",
  "## 2. Cambio y verificación",
  "## 3. Herramientas, permisos y seguridad",
  "## 4. Operación y recuperación",
  "## 5. Decisión",
  "## Límites"
]) {
  if (!markdown.split("\n").some(line => line.trim() === heading)) failures.push("falta sección: " + heading);
}

for (const phrase of [
  "no inferir éxito",
  "fallo crítico",
  "revisión independiente del diff",
  "no se ejecutó",
  "BLOQUEAR / APROBAR CON CONDICIONES / APROBAR",
  "responsable",
  "no demuestra por sí sola la seguridad"
]) requireText(phrase, "falta regla o salvaguarda: " + phrase);

const decisionRows = [
  "Revisión exacta",
  "Responsable de la decisión",
  "Resultado de build y checks",
  "Evidencia de pruebas",
  "Fallos críticos abiertos",
  "Accesibilidad manual",
  "Privacidad/consentimiento",
  "Decisión"
];
for (const row of decisionRows) {
  const rowPattern = new RegExp("^\\|\\s*" + row + "\\s*\\|");
  const matchingRows = markdown.split("\n").filter(line => rowPattern.test(line.trimStart()));
  if (matchingRows.length === 0) failures.push("falta campo en el registro de decisión: " + row);
  if (matchingRows.length > 1) failures.push("campo duplicado en el registro de decisión: " + row);
}

if (failures.length) {
  console.error("Release readiness checklist check failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("Release readiness checklist check passed: required sections, unique decision fields, and evidence safeguards are present.");
