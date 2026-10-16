# Initial website implementation status

Date: 2026-10-16

## Scope of this increment

Initial Eleventy static-site skeleton on a dedicated feature branch. It includes the course landing page, module landing-page template, principles page, curriculum metadata, responsive CSS, and a GitHub Actions build workflow.

## Explicitly not complete

- Detailed lesson content and fully specified lab instructions.
- Route/link integrity automation and accessibility automation.
- Clean-clone installation and production build verification in a runner.
- Keyboard, screen-reader, contrast, and responsive manual review.
- Learner pilot and observed-duration validation.
- Netlify configuration, deploy preview, or production deployment.

## Curriculum integrity

The module IDs, titles, workload, and lab IDs are sourced from `docs/curriculum.md`. The module landing pages explicitly identify themselves as scaffolding; they do not claim that detailed labs have been authored or verified.

## Verification record

No local checkout or dependency installation was available during authoring through the GitHub API. The workflow is configured to run the Eleventy build on branch pushes and pull requests, but its result must be observed after the branch is published. Do not treat the presence of the workflow as evidence that the build passes.
