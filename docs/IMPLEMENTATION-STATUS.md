# Implementation status

Date: 2026-10-17

## Current delivery

The Eleventy static course website is published at https://harnessengineeringcourse.netlify.app/. The repository's `main` branch is the source of truth. The published site is a structural and content baseline, not a completed, piloted course.

The site contains the approved ten modules M01–M10, module pages, course principles, and curriculum metadata. Module pages include draft learning outcomes, foundations, and lab instructions to varying degrees. Their presence does not imply that every lab has been independently executed or that the learning design has been validated with learners.

## Automated checks

- `npm run check` runs the Eleventy build, automated accessibility structure checks and their regression tests, generated route checks, Markdown link checks and regressions, release-readiness checks and mutations, curriculum and selected fixture/example traceability checks, all ten lab fixture validators, the offline LAB-01 output evaluator regressions, and negative mutation tests across the lab validators.
- The curriculum check validates approved module/lab scope, identifier uniqueness, workload arithmetic, competency IDs and primary mappings, artifact references, dedicated module pages, expected lab IDs and hours, core learning/evidence sections, and links to each module's worked example, evidence template, and traceability matrix.
- The accessibility structure gate checks document language, one main landmark, one h1, image alt attributes, and detectable link names via text, labels or image alt text; it also verifies that `aria-labelledby` targets exist. It does not compute the full accessible-name algorithm or validate keyboard/screen-reader behavior, contrast, responsive behavior or WCAG conformance; it is a limited static check, not an accessibility audit.
- GitHub Actions run 39017490380 passed for commit `dffc181`.
- These checks do not verify pedagogical quality, all curricular relationships, actual model or learner execution, real sandbox/security enforcement, manual accessibility conformance, or observed learner outcomes.

## Approved workload

The ten modules total 104 hours: 40 hours of fundamentals and 64 hours of labs. The transversal project adds 40 hours and evaluation adds 16 hours, for 160 hours overall. Working defaults for the transversal project and a provisional rubric are now documented. The rubric calibration procedure is documented, but no real calibration has been performed; final summative approval remains pending.

## Work in progress

- The MIT fallback starter is checked in CI with a clean `npm ci` and `npm test`. Still pending: independent learner-run validation and admission/license checks for any participant-selected repository.
- Calibrate the provisional rubric against sample submissions before summative use.
- Complete and independently execute all lab instructions, recording environment and evidence.
- Validate competency-to-outcome-to-activity-to-evidence traceability.
- Conduct the manual accessibility review using `docs/accessibility-review-checklist.md`, including keyboard, screen reader, contrast, responsive behavior and reduced motion.
- Pilot the course and validate actual duration, clarity and learner outcomes.

## Release discipline

Use reviewable branches and pull requests. Do not claim tests passed without an actual CI result. A successful build proves neither that educational content is complete nor that the entire user experience conforms to accessibility requirements. Keep unresolved curriculum decisions explicit until approved.


## Progress log — module resources and assessment protocol

- Linked the matching worked example, learner evidence template, and traceability matrix from all ten module pages.
- Added `docs/rubric-calibration-protocol.md` and linked it from the rubric. The procedure defines independent scoring, discrepancy resolution, evidence recording, and a pilot-readiness decision; no real calibration is claimed.
- The project brief and rubric contain operational defaults, but real learner pilot, manual accessibility review, and independently executed lab evidence remain outstanding.
- Updated the traceability and lab-validation backlogs to distinguish operational defaults from still-unverified execution and curricular approval.


## Progress log — lab runtime and traceability

- Added `docs/lab-runtime-matrix.md` with per-lab default environments, evidence expectations, and explicit stop conditions. It distinguishes automated repository checks from actual model experiments, sandbox enforcement, recovery exercises, and empirical measurements.
- Updated `docs/curriculum.md` to reflect operational defaults for the project and rubric while keeping clean-install, practical lab execution, traceability review, accessibility, calibration, privacy, and learner pilot as open gates.
- Updated `docs/traceability.md` to clarify remaining mapping and evidence-chain decisions. GitHub Actions run 39015239082 passed for commit `ee18406`; later commits need their own workflow result before being called validated.


## Progress log — 2026-10-17 (validator hardening)

- Strengthened LAB-01 to parse the ticket identifier from the input and compare it exactly with the expected identifier. Added regressions for mismatch, missing identifier, and misleading extra occurrences. A regex escaping defect was caught by CI and corrected in commit `0d9cd44`.
- Strengthened LAB-02 and LAB-03 to reject empty scope/questions/stop conditions and empty or duplicate reference evidence.
- Strengthened LAB-04 to reject empty review controls and duplicate/empty baseline fields.
- Strengthened LAB-05 and LAB-06 to reject empty permission/gate evidence, duplicate audit/evidence entries, contradictory allow/deny permissions, and empty limitations.
- Strengthened LAB-07 to reject empty scoring-protocol steps and decision rules.
- Strengthened LAB-08, LAB-09, and LAB-10 to reject empty limitations.
- Added negative mutation cases to `scripts/test-lab-validator-regressions.mjs` for the new invariants. The regression suite checks the canonical fixtures and requires each mutated fixture to fail for the expected diagnostic.
- CI passed for commit `751109a` (run 39016507274), which includes the accumulated validator and regression changes through that commit.
- These checks validate fixture contracts and validator behavior; they do not establish that a learner or model has completed the labs, nor that the instructional design has been piloted.

- Added `scripts/check-accessibility-basics.mjs` and regression tests, integrated into `npm run check`. The structural check verifies document language, one main landmark, one h1, and image alt attributes across generated pages. CI passed for `e66c5e2` (run 39016637722). This is not a full WCAG audit; manual accessibility review remains a release gate.

- Added a structural accessibility gate and six regression scenarios, integrated into `npm run check`; its scope is intentionally limited and does not replace manual WCAG review.
- Aligned the LAB-04 fixture with its worked example: the same `normalizeTags` task, scope restrictions, acceptance criteria, and positive/negative/regression cases are now represented consistently. CI passed for commit `d9c9b20` (run 39016760285).

- Removed repeated `Ejemplo resuelto` sections from the LAB-01, LAB-02, LAB-04, LAB-05 and LAB-07 validation packs; the documentation link check and full CI passed for commit `828afb2` (run 39016860116).

- The curriculum checker now verifies that every module page contains observable learning outcomes, acceptance criteria, analysis/reflection questions, learner evidence/deliverables, its own worked example, the evidence template, and the traceability matrix. CI passed for commit `ad81111` (run 39017001312).

- The module curriculum gate now checks the expected LAB ID and laboratory-hour allocation in each page, in addition to learning outcomes, acceptance criteria, reflection questions, evidence/deliverables and required resources. CI passed for commit `ee435ec` (run 39017109243).
- Aligned the LAB-03 context fixture with its worked example: current API documentation, archived API v1, and an untrusted external note are now the shared scenario. CI passed for commit `a82364f` (run 39017189645).

- LAB-06 now rejects duplicate audit-record fields; LAB-07 rejects duplicate rubric dimensions; LAB-09 rejects duplicate signal names; LAB-10 rejects duplicate metric names. Each invariant has a corresponding negative mutation in the validator regression suite. CI passed for commits `bcae84f`, `4bdddd7`, `8996096` and `5aa6f84` (runs 39017289608, 39017314397, 39017339886 and 39017368189 respectively).

- Repaired the traceability backlog, removing a malformed orphaned line and consolidating remaining gates into explicit actions: formal mapping review, learner evidence chains, real lab execution, repository admission, rubric calibration, manual accessibility/privacy/reproducibility review, and learner pilot. CI passed for commit `cee2dba` (run 39017454345).

- Extended the curriculum gate to require the correct LAB ID/hour allocation on each module page and verify that each module's worked example and mapped lab validation pack actually exist. CI passed for commit `9a9bc96` (run 39017684142).

- Added `docs/references.md`, a curated source index grouped by all ten modules, and linked it from the README and content contract. CI passed for commit `bcccd7a` (run 39017877871).
- Prepared draft PR [#46](https://github.com/raulferrer-ai/harness-engineering-course/pull/46) to link the reference index from all ten rendered module pages and enforce that link through the curriculum checker. Both branch CI runs passed (39018079003 and 39018071326). The PR remains unmerged because it changes rendered site pages; the documented Deploy Preview, manual accessibility/content review, and explicit production-release authorization remain required.

- Netlify reported a successful Deploy Preview status for PR #46 at `https://deploy-preview-46--harnessengineeringcourse.netlify.app`. The automated CI runs for the PR head also passed. This is preview evidence only; manual inspection remains outstanding and the PR has not been merged.

- Added a structured transversal-project report template and linked it from the project brief and README. It covers reproducible baseline, acceptance criteria, positive/negative/regression tests, independent review, risk and cost evidence, and the individual defense.
- Added pilot participant-information/consent, observation, exit-survey and results-report templates; linked them from the pilot protocol and README. The participant information is explicitly a draft with required privacy/retention fields still needing responsible review. CI passed for commit `4a58465` (run 39018406636).

- Added an MIT-licensed, dependency-free Node.js fallback starter for the transversal project, with a deliberately scoped validation task and four baseline tests. The top-level `npm run check` now checks the starter's license/metadata contract, runs `npm ci` in its directory and executes its tests. CI passed for commit `9fe9aeb` (run 39018598606).

- Expanded the release-readiness checklist to include the reference-index site PR, clean-install validation of the MIT fallback project, approved participant information/consent, pilot observation/survey/results templates, and the transversal-project report template. CI passed for commit `dec6dd6` (run 39018701984).


## Progress log — validator and accessibility hardening

- LAB-03 now checks that every required source is present in at least one declared context variant (normalizing optional fragment identifiers), and rejects duplicate or ungrounded source references through negative regression tests.
- LAB-04 now requires the test matrix to include positive, negative, and regression cases explicitly; a sufficient row count alone no longer satisfies that contract.
- LAB-06 now requires every declared evidence item to be referenced by at least one release gate, preventing orphaned evidence from appearing in the fixture without affecting release eligibility.
- Extended the automated accessibility structure check to flag links with no detectable accessible name, while accepting text labels, non-empty image alt text, and explicit `aria-label`/`aria-labelledby`. A regular-expression bug in the checker was caught by CI and corrected; this remains a limited static check, not a WCAG audit.
- CI passed for commit `4ec734d` (run 39019831695) after correcting the accessibility attribute parser, and for commit `ba19de4` (run 39019874856), which also includes the LAB-06 evidence-coverage invariant.
- These checks validate repository contracts and generated HTML heuristics only. They do not replace manual screen-reader/keyboard review or real lab execution.

- LAB-05 now validates traceability from each declared threat case to acceptance-criteria evidence, rejects unknown threat references, and flags threat cases not covered by any criterion. CI passed for commit `834b334` (run 39019967246), including the full repository check and mutation suite.

- LAB-08 now requires every security test case to be referenced by acceptance-criteria evidence and rejects unknown test references. The fixture now enumerates `SEC-T02`, `SEC-T03`, `SEC-T04`, and `SEC-T05` explicitly instead of using a compact range that the validator could not trace reliably. CI passed for commit `9d50592` (run 39020089545).

- LAB-09 now parses the scenario identifier format actually used by its fixture, requires explicit traceability for every signal, event, recovery step and operational scenario, and rejects unknown or unreferenced evidence. The fixture's abbreviated ranges were expanded into explicit IDs. CI passed for commit `c680b24` (run 39020169381).

- LAB-05 now also enforces deny-and-escalate behavior for policy conflicts and requires an explicit logging rule that excludes secrets. Negative mutation cases cover both controls. CI passed for commit `82c8385` (run 39020240781).

- LAB-10 now maps every declared metric, governance case, decision rule, scenario, and decision test vector to acceptance-criteria evidence. Identifier parsing now matches the actual `VAL-T01` format, and abbreviated ranges were replaced with explicit IDs. Added mutations for unknown and unreferenced decision vectors. CI passed for commit `d134015` (run 39020396669).

- LAB-07 now requires a decision vector for every declared critical-failure condition, not just for each case and outcome. Added four vectors to exercise critical failures that had previously been declared but not individually covered, plus a negative regression for missing coverage. CI passed for commit `54b3603` (run 39020552900).

- LAB-02 now rejects duplicate blocking questions, duplicate scope/stop-condition entries, and exact scope items listed as both allowed and forbidden. Added negative mutation coverage. CI passed for commit `8b8b7a6` (run 39020643882).

- LAB-04 now requires each acceptance criterion whose verification calls for a test/execution to be mapped to a test case, while leaving the explicitly manual independent-diff review as a review control rather than misclassifying it as an automated test. CI passed for commit `32247f8` (run 39020782005).

- Added an offline LAB-01 output evaluator that compares saved model responses against the versioned fixture, separates schema validity from semantic matching, and reports missing/duplicate/unknown cases without copying raw responses into the report. Added eight regression scenarios and integrated them into `npm run check`; CI passed for commit `a0ddc18` (run 39020913714). This enables reproducible evaluation of supplied outputs but does not invoke a model or claim model quality without actual runs.

- Aligned LAB-02's canonical specification fixture with its worked example by adding an explicit acceptance criterion for release authorization and mandatory gates. CI passed for commit `a6d08d0` (run 39021199459).

- Updated the LAB-07 worked example and validation pack to enumerate all ten decision vectors, including the four newly added critical-failure cases. CI passed for commit `86cf30b` (run 39021294964).

- Added a cross-document traceability check for LAB-02 acceptance criteria, LAB-07 decision vectors, LAB-09 operational evidence IDs, and LAB-10 metrics/governance/scenario IDs, plus three regression scenarios. This prevents a fixture and its worked example from silently drifting apart. CI passed for commit `d8e2975` (run 39021532068).

- Added `docs/accessibility-review-checklist.md` for manual WCAG 2.2 AA review and explicit TG-07/TG-08 gates for accessibility and privacy/consent. These are actionable checklists, not completed audits; both remain pending human execution/review. CI passed for commit `d8a7a3c` (run 39021897657) and for the subsequent gate update `53a2cbc` (run 39021933575).


## 2026-10-17 — Robustez de validadores y CI

- Los validadores de LAB-04 a LAB-10 ahora informan explícitamente de errores al leer o interpretar JSON y rechazan raíces que no sean objetos JSON. El mismo patrón ya se había aplicado a LAB-01 a LAB-03.
- CI pasó para el commit `8b1de9a` en Node.js 22 y Node.js 24 (ejecución 39027628869). Este resultado valida el estado de ese commit; los cambios posteriores requieren su propia ejecución.
- Se mantiene pendiente la ejecución real e independiente de los diez laboratorios, el piloto con estudiantes, la calibración humana de la rúbrica y la auditoría manual de accesibilidad y privacidad. Los validadores automatizados no sustituyen esas actividades.


- Expanded `scripts/test-lab-validator-regressions.mjs` with 20 additional negative cases: malformed JSON and non-object JSON roots for each of the ten lab validators. The full `npm run check` workflow passed on Node.js 22 and Node.js 24 for commit `5a42b61` (run 39028319488). The regression suite now exercises 86 semantic mutations plus these 20 malformed-input cases, alongside acceptance of all ten canonical fixtures. This is evidence for validator behavior only; it is not evidence that the practical labs have been executed by learners.
