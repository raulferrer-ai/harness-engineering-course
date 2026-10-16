# Website architecture and delivery plan

## Status

The architecture direction is approved as a proposal for implementation planning. This file does not assert that the site has already been implemented, tested, or deployed.

## Technical direction

- Static educational website.
- Eleventy as the intended static-site generator.
- Content and metadata separated from presentation templates.
- GitHub repository as source of truth.
- Netlify as intended hosting and continuous-deployment target.
- No learner account system or custom LMS in the initial scope.

Before implementation, inspect the repository and confirm exact package scripts, configuration, and output paths rather than assuming defaults.

## Information architecture

Initial page types:
- Home / course overview.
- Ten module landing pages.
- Lesson pages.
- Lab instructions and downloadable/reference materials.
- References and source notes.
- Project, evaluation, accessibility, and reproducibility guidance.

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

The previously approved visual direction is D2 Console Editorial: editorial serif typography with system fallbacks, ink-blue accent, and system-preference light/dark theme without JavaScript. Apply styling through wrappers and CSS without altering approved learning content or semantics unnecessarily.

Target WCAG 2.2 AA. Include keyboard operation, visible focus, semantic structure, adequate contrast, useful alternative text, responsive layouts, reduced-motion support, transcripts/captions where relevant, and textual alternatives to diagrams.

## Quality checks

The intended quality gate should cover:
- Clean install and production build.
- Internal links and route integrity.
- Curriculum and lab traceability.
- Semantic HTML and accessibility checks.
- Keyboard and responsive manual review.
- Reproducibility of lab instructions.
- Dependency and licensing review.
- No required paid subscription.
- No secrets or private learner data in the repository.

Do not claim a check passed unless it has actually been run and its result recorded.

## Git and Netlify workflow

Intended sequence:
1. Change on a reviewable branch.
2. Inspect diff and run local checks.
3. Commit only with explicit authorization.
4. CI checks.
5. Netlify Deploy Preview.
6. Human review and explicit production-release authorization.

The current reset does not authorize a Netlify connection, deploy preview, or production deployment.
