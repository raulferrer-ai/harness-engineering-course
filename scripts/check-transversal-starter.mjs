import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd(), "examples/transversal-project-starter");
const errors = [];
async function read(relative) {
  try { return await readFile(path.join(root, relative), "utf8"); }
  catch { errors.push(`missing required file: ${relative}`); return ""; }
}
const packageText = await read("package.json");
const lockText = await read("package-lock.json");
const license = await read("LICENSE");
const readme = await read("README.md");
const source = await read("src/normalize-tags.mjs");
const tests = await read("test/normalize-tags.test.mjs");
let pkg, lock;
try { pkg = JSON.parse(packageText); } catch { errors.push("package.json is not valid JSON"); }
try { lock = JSON.parse(lockText); } catch { errors.push("package-lock.json is not valid JSON"); }
if (pkg) {
  if (pkg.name !== "transversal-project-starter") errors.push("unexpected starter package name");
  if (pkg.license !== "MIT") errors.push("starter package must declare the MIT license");
  if (pkg.engines?.node !== ">=20") errors.push("starter must declare Node.js >=20");
  if (pkg.scripts?.test !== "node --test") errors.push("starter must use the built-in Node.js test runner");
  if (Object.keys(pkg.dependencies ?? {}).length || Object.keys(pkg.devDependencies ?? {}).length) errors.push("starter must remain free of external dependencies");
}
if (lock) {
  if (lock.lockfileVersion !== 3) errors.push("starter lockfile must use lockfileVersion 3");
  if (lock.name !== pkg?.name || lock.version !== pkg?.version) errors.push("starter package-lock metadata does not match package.json");
  if (lock.packages?.[""]?.license !== "MIT") errors.push("starter lockfile must preserve the MIT license metadata");
}
if (!/MIT License/.test(license) || !/Permission is hereby granted/.test(license)) errors.push("MIT license text is incomplete");
if (!/npm ci/.test(readme) || !/npm test/.test(readme) || !/tarea deliberadamente pendiente/i.test(readme)) errors.push("README must document clean install, tests and the deliberate starter task");
if (!/export function normalizeTags/.test(source)) errors.push("starter function entry point is missing");
if (!/node:test/.test(tests) || !/preserves duplicate tags/.test(tests)) errors.push("starter regression tests are missing");
if (errors.length) {
  console.error(`Transversal starter contract failed: ${errors.length} issue(s).`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("PASS transversal starter contract: MIT license, Node.js >=20, lockfile, task instructions and built-in tests.");
