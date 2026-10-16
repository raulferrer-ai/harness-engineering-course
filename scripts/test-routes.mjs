import { cp, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const checker = join(root, "scripts/check-routes.mjs");
const temp = await mkdtemp(join(tmpdir(), "route-check-tests-"));
let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error("FAIL " + message);
  }
}

async function fixture(name, files) {
  const project = join(temp, name);
  await mkdir(join(project, "scripts"), { recursive: true });
  await mkdir(join(project, "_site"), { recursive: true });
  await cp(checker, join(project, "scripts/check-routes.mjs"));
  for (const [relative, contents] of Object.entries(files)) {
    const destination = join(project, "_site", relative);
    await mkdir(join(destination, ".."), { recursive: true });
    await writeFile(destination, contents, "utf8");
  }
  return project;
}

function run(projectRoot) {
  return spawnSync(process.execPath, [join(projectRoot, "scripts/check-routes.mjs")], {
    cwd: projectRoot,
    encoding: "utf8"
  });
}

function expectPass(label, projectRoot) {
  const result = run(projectRoot);
  const output = result.stdout + result.stderr;
  assert(result.status === 0, label + ": expected exit 0; output:\n" + output);
  if (result.status === 0) console.log("PASS " + label);
}

function expectFail(label, projectRoot, diagnostic) {
  const result = run(projectRoot);
  const output = result.stdout + result.stderr;
  assert(result.status === 1, label + ": expected exit 1; output:\n" + output);
  assert(output.includes(diagnostic), label + ": expected diagnostic " + JSON.stringify(diagnostic) + "\n" + output);
  if (result.status === 1 && output.includes(diagnostic)) console.log("PASS rejects " + label);
}

try {
  const valid = await fixture("valid", {
    "index.html": '<a href="/guide/#details">Guide</a><a href="/assets/site.css">CSS</a>\n',
    "guide/index.html": '<h1 id="top">Guide</h1><section id=details>Details</section>\n',
    "assets/site.css": "body { margin: 0; }\n"
  });
  expectPass("local files, directory indexes, quoted and unquoted fragment IDs", valid);

  const encodedUnicodePathAndFragment = await fixture("encoded-unicode-path-and-fragment", {
    "index.html": '<a href="/gu%C3%ADa/?vista=compacte#secci%C3%B3n">Ir a la sección</a>\n',
    "guía/index.html": '<section id="sección">Contenido</section>\n'
  });
  expectPass("encoded Unicode paths and fragments with query strings", encodedUnicodePathAndFragment);

  const unquotedLocalAttributes = await fixture("unquoted-local-attributes", {
    "index.html": '<a href=/guide/>Guide</a><img src=/assets/site.css alt="">\n',
    "guide/index.html": '<h1 id="top">Guide</h1>\n',
    "assets/site.css": "body { margin: 0; }\n"
  });
  expectPass("unquoted local href and src attributes", unquotedLocalAttributes);

  const unquotedMissingTarget = await fixture("unquoted-missing-target", {
    "index.html": '<a href=/missing/>Missing</a>\n'
  });
  expectFail("unquoted href to missing local target", unquotedMissingTarget, "broken local URL");

  const encodedMissingPath = await fixture("encoded-missing-path", {
    "index.html": '<a href="/gu%C3%ADa-inexistente/">Missing page</a>\n'
  });
  expectFail("percent-encoded Unicode path to missing file", encodedMissingPath, "broken local URL");

  const missingFile = await fixture("missing-file", {
    "index.html": '<a href="/missing/">Missing</a>\n'
  });
  expectFail("missing local target", missingFile, "broken local URL");

  const encodedMissingFragment = await fixture("encoded-missing-fragment", {
    "index.html": '<a href="/guide/#secci%C3%B3n-inexistente">Missing section</a>\n',
    "guide/index.html": '<section id="sección">Contenido</section>\n'
  });
  expectFail("encoded Unicode fragment that does not exist", encodedMissingFragment, 'missing fragment "#sección-inexistente"');

  const missingFragment = await fixture("missing-fragment", {
    "index.html": '<a href="/guide/#absent">Missing section</a>\n',
    "guide/index.html": '<h1 id="present">Guide</h1>\n'
  });
  expectFail("missing fragment", missingFragment, 'missing fragment "#absent"');

  const duplicateIds = await fixture("duplicate-ids", {
    "index.html": '<h2 id="same">First</h2><p id="same">Second</p>\n'
  });
  expectFail("duplicate IDs", duplicateIds, 'duplicate HTML id "same"');

  const ignoredNonMarkup = await fixture("ignored-non-markup", {
    "index.html": '<!-- <div id="commented"></div> --><script>const sample = \'<div id="scripted"></div>\';</script><h1 id="real">Real</h1>\n'
  });
  expectPass("ignores IDs in comments and script content", ignoredNonMarkup);
} finally {
  await rm(temp, { recursive: true, force: true });
}

if (failures) {
  console.error("Route checker regression tests failed: " + failures + " assertion(s).");
  process.exit(1);
}
console.log("Route checker regression tests passed.");
