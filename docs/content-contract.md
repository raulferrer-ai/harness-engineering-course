# Content contract and traceability — IMP-02

## Purpose and authority

This contract defines the minimum evidence required before course content is considered authored and ready for review. The approved scope is the ten modules M01–M10 in `docs/curriculum.md`; this document does not add competencies, hours, scoring thresholds, tools, or course requirements.

When source documents disagree, record the discrepancy for human resolution. Do not silently invent missing details or treat scaffolding as completed instruction.

## Traceability chain

Every authored learning unit should be traceable through:

1. **Competency** — an existing competency from the approved curriculum, or a clearly marked proposal awaiting approval.
2. **Learning outcome** — an observable learner performance with a measurable condition or product. Do not claim coverage based only on a topic being mentioned.
3. **Instruction and activity** — lesson material and an activity that gives learners a reasonable opportunity to achieve the outcome.
4. **Assessment evidence** — an artifact, observation, test result, or explanation that demonstrates the performance.
5. **Acceptance criteria** — explicit conditions a reviewer can check against the evidence.
6. **Lab link** — where applicable, the relevant LAB identifier and its instructions.

Use stable identifiers for competencies, outcomes, lessons, evidence items, and acceptance criteria. IDs must be unique within their namespace. Keep a traceability table or structured metadata so every relationship can be inspected.

## Minimum contract for each module

- Approved module ID, title, workload, and lab ID match `src/_data/modules.json` and `docs/curriculum.md`.
- Module purpose and outcomes are stated in observable terms.
- Outcomes map to approved competencies; uncertain mappings are marked **pending validation**.
- Lessons and activities support the stated outcomes.
- Assessment evidence and acceptance criteria are specified; do not substitute vague labels such as “understands” or “works correctly”.
- The lab has a defined objective, prerequisites, environment and dependencies, reproducible starting state, task steps, applicable positive and negative checks, evidence, acceptance criteria, reset/recovery, limitations, privacy and cost considerations, and model/provider/version context when remote models are used.
- References and claims that depend on external sources include source notes.
- Any unverified content, assumptions, or decisions awaiting approval are explicitly labelled.

## Lab completion states

Use these states consistently:

- **Not specified** — no meaningful lab instructions exist yet.
- **Draft** — instructions exist but have not passed the required review.
- **Verified** — the stated setup and checks have been executed in a documented environment and evidence is recorded.
- **Blocked** — progress depends on a decision, dependency, or access not yet available.

A page existing in the repository, a successful website build, or a passing route check does not by itself make a lab **Verified**.

## Assessment and project constraints

The transversal project remains planned for 40 hours and evaluation for 16 hours. Working defaults are documented in `docs/transversal-project.md`, and provisional scoring and critical-failure rules are documented in `docs/transversal-project-rubric.md`. These are operational defaults for preparation and pilot calibration; they do not override the approved curriculum or constitute validated summative policy. Do not automate grading or claim the threshold is validated until calibration and the required human approval are recorded.

## Review and release checklist

Before a module is represented as complete, reviewers should confirm:

- [ ] The module and lab IDs match the approved baseline.
- [ ] Every outcome is observable and mapped to a competency.
- [ ] Learning activities and evidence support each outcome.
- [ ] Acceptance criteria are objective and reviewable.
- [ ] Lab setup, execution, verification, and recovery are reproducible.
- [ ] Negative/security checks are included where relevant.
- [ ] Privacy, cost, limitations, and external dependencies are documented.
- [ ] Evidence from actual execution is recorded; no verification is inferred from a build alone.
- [ ] Accessibility, language quality, and source references have been reviewed.
- [ ] Open questions and unapproved proposals remain clearly distinguished from approved requirements.

## Automated checks and their limits

`npm run check` builds the site and runs these automated gates:

- generated-route and local-link validation, including regression tests for malformed URLs, missing targets and anchors;
- Markdown link and anchor validation with negative regression cases;
- release-readiness checklist validation and mutation tests;
- curriculum scope, IDs, hours, competency mappings, artifact references, required module sections, lab IDs/hours and links to worked examples/evidence/traceability;
- structural accessibility checks on generated HTML (document language, one main landmark, one h1, image alt attributes) plus regression tests;
- canonical fixture validation for LAB-01 through LAB-10 and negative mutation tests that check validators reject invalid data with expected diagnostics.

These checks prove only the invariants they execute. They do not establish pedagogical quality, formal approval of all competency mappings, actual model/learner execution, sandbox or production security effectiveness, full WCAG conformance, clean-install reproducibility for every candidate repository, or learner outcomes.
