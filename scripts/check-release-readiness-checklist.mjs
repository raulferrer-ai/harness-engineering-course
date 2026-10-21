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
  if (!safeguardMarkdown.includes(text)) failures.push(message);
};

const linesOutsideFences = markdown.split("\n");
let fenceMarker = null;
let fenceLength = 0;
const structuralMarkdown = linesOutsideFences.map(line => {
  const fence = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
  if (fence) {
    const marker = fence[1][0];
    if (fenceMarker === null) {
      fenceMarker = marker;
      fenceLength = fence[1].length;
    } else if (marker === fenceMarker && fence[1].length >= fenceLength && /^\s*$/.test(fence[2])) {
      fenceMarker = null;
      fenceLength = 0;
    }
    return "";
  }
  if (fenceMarker !== null || /^ {4,}/.test(line) || /^\t/.test(line)) return "";
  return line;
}).join("\n");
const commentFreeMarkdown = structuralMarkdown.replace(/<!--[\s\S]*?-->/g, "");
const structuralLines = commentFreeMarkdown.split("\n");
const safeguardMarkdown = structuralLines.filter(line => !/^(\t| {4,})/.test(line)).join("\n");
const title = "# Lista de comprobación de preparación para publicar";
const titleCount = structuralLines.filter(line => !/^\t/.test(line) && line.trim() === title).length;
if (titleCount === 0) failures.push("falta título exacto: " + title);
if (titleCount > 1) failures.push("título duplicado: " + title);
for (const heading of [
  "## 1. Alcance y procedencia",
  "## 2. Cambio y verificación",
  "## 3. Herramientas, permisos y seguridad",
  "## 4. Operación y recuperación",
  "## Evidencia práctica de los diez laboratorios",
  "## Requisitos previos del piloto",
  "## Evidencia de publicación y decisión trazable",
  "## 5. Decisión",
  "## Límites"
]) {
  const matches = structuralLines.filter(line => !/^\t/.test(line) && line.trim() === heading).length;
  if (matches === 0) failures.push("falta sección: " + heading);
  if (matches > 1) failures.push("sección duplicada: " + heading);
}

if (!/\[[^\]]+\]\(pilot-results-report-template\.md\)/.test(safeguardMarkdown)) {
  failures.push("falta regla o salvaguarda: ](pilot-results-report-template.md)");
}

for (const phrase of [
  "no inferir éxito",
  "no demuestra por sí sola la seguridad",
  "fallo crítico",
  "revisión independiente del diff",
  "no se ejecutó",
  "BLOQUEAR / APROBAR CON CONDICIONES / APROBAR",
  "La CI del commit",
  "No sustituye los gates de evidencia práctica",
  "plantilla del informe de resultados",
  "responsable"
]) requireText(phrase, "falta regla o salvaguarda: " + phrase);

const decisionMarkdown = commentFreeMarkdown;
const decisionStart = decisionMarkdown.indexOf("## 5. Decisión");
const templateEnd = decisionMarkdown.indexOf("## Registro de revisión", decisionStart);
const limitsStart = decisionMarkdown.indexOf("## Límites");
const decisionEnd = templateEnd > decisionStart ? templateEnd : limitsStart;
const decisionSection = decisionStart >= 0 && decisionEnd > decisionStart
  ? decisionMarkdown.slice(decisionStart, decisionEnd)
  : "";

const decisionRows = [
  "Revisión exacta",
  "Responsable de la decisión",
  "Resultado de build y checks",
  "Evidencia de pruebas",
  "Fallos críticos abiertos",
  "Accesibilidad manual",
  "Privacidad/consentimiento",
  "Riesgo residual aceptado por",
  "Decisión",
  "Condiciones, vencimiento y responsable"
];
for (const row of decisionRows) {
  const rowPattern = new RegExp("^\\|\\s*" + row + "\\s*\\|");
  const matchingRows = decisionSection.split("\n").filter(line => rowPattern.test(line.replace(/^ {0,3}/, "")));
  if (matchingRows.length === 0) failures.push("falta campo en el registro de decisión: " + row);
  if (matchingRows.length > 1) failures.push("campo duplicado en el registro de decisión: " + row);
}

if (failures.length) {
  console.error("Release readiness checklist check failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("Release readiness checklist check passed: required sections, unique decision fields, and evidence safeguards are present.");
