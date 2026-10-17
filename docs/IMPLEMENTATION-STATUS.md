# Implementation status

Date: 2026-10-17

## Current delivery

The Eleventy static course website is published at https://harnessengineeringcourse.netlify.app/. The repository's `main` branch is the source of truth. The published site is a structural and content baseline, not a completed, piloted course.

The site contains the approved ten modules M01–M10, module pages, course principles, and curriculum metadata. Module pages include draft learning outcomes, foundations, and lab instructions to varying degrees. Their presence does not imply that every lab has been independently executed or that the learning design has been validated with learners.

## Automated checks

- `npm run check` runs the Eleventy build, generated local-route checks, and curriculum metadata/traceability checks.
- The curriculum check validates the approved module/lab scope, identifier uniqueness, workload arithmetic, references to all nine competency IDs and ten lab IDs, and the presence of dedicated module pages.
- GitHub Actions run 38902168065 passed for the curriculum-check update merged in IMP-02 follow-up.
- These checks do not verify pedagogical quality, every matrix relationship, lab reproducibility, accessibility conformance, security effectiveness, or observed learner outcomes.

## Approved workload

The ten modules total 104 hours: 40 hours of fundamentals and 64 hours of labs. The transversal project adds 40 hours and evaluation adds 16 hours, for 160 hours overall. Working defaults for the transversal project and a provisional rubric are now documented. The rubric calibration procedure is documented, but no real calibration has been performed; final summative approval remains pending.

## Work in progress

- Validate the operational project brief with a candidate repository and document a clean setup.
- Calibrate the provisional rubric against sample submissions before summative use.
- Complete and independently execute all lab instructions, recording environment and evidence.
- Validate competency-to-outcome-to-activity-to-evidence traceability.
- Conduct accessibility reviews, including keyboard, screen reader, contrast, responsive behavior and reduced motion.
- Pilot the course and validate actual duration, clarity and learner outcomes.

## Release discipline

Use reviewable branches and pull requests. Do not claim tests passed without an actual CI result. A successful build proves neither that educational content is complete nor that the entire user experience conforms to accessibility requirements. Keep unresolved curriculum decisions explicit until approved.


## Progress log — 2026-10-17 (continued)

- Linked the matching worked example, learner evidence template, and traceability matrix from all ten module pages in commits `e81997b` and `525763b`.
- CI passed for `e81997b` (run 39014432250). The follow-up commit `525763b` has been pushed; its own workflow result must be checked separately before claiming the full set of module links is validated.
- The project brief and rubric now contain operational defaults, but real learner pilot, manual accessibility review, and independently executed lab evidence remain outstanding.


- Added `docs/rubric-calibration-protocol.md` to make independent scoring, discrepancy resolution, evidence recording, and the pilot-readiness decision reproducible. This is a procedure, not a claim that calibration has occurred.
- Linked the calibration procedure from the rubric so future reviewers can follow a single workflow.

- Added a rubric calibration procedure and linked it from the rubric. It defines independent scoring and discrepancy resolution; no real calibration has been performed yet.
- Updated the traceability and lab-validation backlogs to distinguish operational defaults from still-unverified execution and curricular approval.


## Progress log — 2026-10-17 (continued)

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
