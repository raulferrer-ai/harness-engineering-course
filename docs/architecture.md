# Website architecture and delivery plan

## Current status

The initial static website is implemented and published at https://harnessengineeringcourse.netlify.app/. The site is built from this repository with Eleventy and deployed by Netlify. The published version is a structural baseline, not a completed course: detailed lessons, full lab materials, learner pilot, and comprehensive manual accessibility review remain outstanding.

## Technical implementation

- Static educational website generated with Eleventy 3.1.2.
- Source content and metadata live under `src/`; shared templates live under `src/_includes/`.
- `src/_data/modules.json` is the source for the ten-module navigation and summary.
- GitHub repository is the source of truth; `main` is the production branch.
- Netlify builds with `npm run build` and publishes `_site/`, as configured in `netlify.toml`.
- No learner account system or custom LMS is in the initial scope.

Verify package scripts, configuration, and output paths from the repository before changing build assumptions.

## Information architecture

The current published baseline includes:
- Home / course overview.
- Ten module destinations generated from the approved module metadata.
- Principles page.

Planned content to develop:
- Detailed lesson pages.
- Complete lab instructions and reference materials.
- References and source notes.
- Transversal project and evaluation guidance.
- Accessibility and reproducibility guidance.

Curriculum navigation must follow the ten approved modules in `docs/curriculum.md`. Old routes must not be carried over automatically; preserve or redirect an old URL only when there is a justified destination.

## Lab content contract

Each lab should specify:
- Objective and prerequisites.
- Environment and dependencies.
- Reproducible starting state.
- Task specification and steps.
- Positive and negative checks as applicable.
- Evidence to submit or inspect.
- Acceptance criteria.
- Recovery/reset procedure.
- Known limitations, privacy considerations, and cost requirements.
- Provider/model/version and execution context when remote models are involved.

## Visual and accessibility direction

The approved visual direction is D2 Console Editorial: editorial serif typography with system fallbacks, ink-blue accent, and system-preference light/dark theme without JavaScript. Apply styling through wrappers and CSS without altering approved learning content or semantics unnecessarily.

Target WCAG 2.2 AA. Include keyboard operation, visible focus, semantic structure, adequate contrast, useful alternative text, responsive layouts, reduced-motion support, transcripts/captions where relevant, and textual alternatives to diagrams. The presence of CSS affordances alone is not evidence of full conformance; manual and automated evaluation remain necessary.

## Quality checks

The repository provides `npm run check`, which runs the Eleventy build and the local generated-route/link checker. This is a baseline, not a complete quality gate. Further checks and review should cover:
- Curriculum and lab traceability.
- Semantic HTML and accessibility checks.
- Keyboard and responsive manual review.
- Reproducibility of lab instructions.
- Dependency and licensing review.
- No required paid subscription.
- No secrets or private learner data in the repository.

Do not claim a check passed unless it has actually been run and its result recorded.

## Git and Netlify workflow

1. Make changes on a reviewable branch.
2. Inspect the diff and run available local checks.
3. Commit changes with explicit authorization.
4. Review CI results.
5. Inspect the Netlify Deploy Preview.
6. Obtain explicit production-release authorization before any deliberate production release.

Netlify is already connected and the initial site is published. Keep changes reviewable; do not treat a successful build as proof that the course content or the whole user experience is complete.
