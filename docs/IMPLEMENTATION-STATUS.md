# Implementation status

Date: 2026-10-16

## Current delivery

The Eleventy static course website is published at https://harnessengineeringcourse.netlify.app/. The repository's `main` branch is the source of truth. The published site is a structural and content baseline, not a completed, piloted course.

The site contains the approved ten modules M01–M10, module pages, course principles, and curriculum metadata. Module pages include draft learning outcomes, foundations, and lab instructions to varying degrees. Their presence does not imply that every lab has been independently executed or that the learning design has been validated with learners.

## Automated checks

- `npm run check` runs the Eleventy build, generated local-route checks, and curriculum metadata/traceability checks.
- The curriculum check validates the approved module/lab scope, identifier uniqueness, workload arithmetic, references to all nine competency IDs and ten lab IDs, and the presence of dedicated module pages.
- GitHub Actions run 38902168065 passed for the curriculum-check update merged in IMP-02 follow-up.
- These checks do not verify pedagogical quality, every matrix relationship, lab reproducibility, accessibility conformance, security effectiveness, or observed learner outcomes.

## Approved workload

The ten modules total 104 hours: 40 hours of fundamentals and 64 hours of labs. The transversal project adds 40 hours and evaluation adds 16 hours, for 160 hours overall. The project repository/license, tool/runtime matrix, operational evaluation thresholds, and treatment of critical security failures remain pending approval.

## Work in progress

- Formalize and validate the project brief, repository, license, runtime/tooling and reproducible environment.
- Approve the assessment rubric, scoring rules, critical-security-failure policy, review and recovery process.
- Complete and independently execute all lab instructions, recording environment and evidence.
- Validate competency-to-outcome-to-activity-to-evidence traceability.
- Conduct accessibility reviews, including keyboard, screen reader, contrast, responsive behavior and reduced motion.
- Pilot the course and validate actual duration, clarity and learner outcomes.

## Release discipline

Use reviewable branches and pull requests. Do not claim tests passed without an actual CI result. A successful build proves neither that educational content is complete nor that the entire user experience conforms to accessibility requirements. Keep unresolved curriculum decisions explicit until approved.
