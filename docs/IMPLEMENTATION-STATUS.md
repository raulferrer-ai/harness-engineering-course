# Initial website implementation status

Date: 2026-10-16

## Scope of this increment

The initial Eleventy static-site skeleton is on the dedicated feature branch `feat/initial-eleventy-site`. It includes the course landing page, module landing-page template, principles page, curriculum metadata, responsive CSS, and a GitHub Actions workflow that builds the site and checks generated local routes.

## Verification record

- Initial scaffold commit: `2ae5cb8380888c9073aa3e2186a6ba3859080bf2`; its GitHub Actions build passed: [workflow run 38862664781](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/38862664781).
- The route-check increment was verified successfully in CI: [workflow run 38864875493](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/38864875493). The check runs the Eleventy build followed by local `href`/`src` and fragment checks against generated HTML.
- A follow-up CI experiment generated `package-lock.json` on a GitHub-hosted runner, then successfully ran `npm ci` and `npm run check`: [workflow run 38865103950](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/38865103950).
- The generated lockfile was uploaded as a workflow artifact, but has not yet been committed to the repository. The local environment cannot reach GitHub to generate it locally, and the artifact could not be transferred into the repository through the available repository-file interface. Therefore the committed project still lacks a lockfile, and reproducible `npm ci` installation is not yet established for the normal workflow.
- The committed workflow has been returned to read-only repository permissions. Its current artifact-generation variant was not re-run after that final cleanup change.

## Curriculum integrity

Module IDs, titles, total hours, descriptions, and lab IDs are represented in the module metadata. The approved curriculum specifies total workload but does not define a per-module split between fundamentals and lab hours; those unsupported split estimates have been removed. The module pages identify themselves as scaffolding and do not claim that detailed labs have been authored or verified.

## Explicitly not complete

- Detailed lesson content and fully specified lab instructions.
- Committed lockfile and normal-workflow `npm ci` installation.
- Accessibility automation and manual keyboard, screen-reader, contrast, and responsive review.
- Learner pilot and observed-duration validation.
- Netlify configuration, deploy preview, or production deployment.
