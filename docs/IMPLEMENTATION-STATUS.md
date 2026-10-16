# Initial website implementation status

Date: 2026-10-16

## Scope of this increment

The initial Eleventy static-site skeleton is on the dedicated feature branch `feat/initial-eleventy-site`. It includes the course landing page, module landing-page template, principles page, curriculum metadata, responsive CSS, and a GitHub Actions workflow that builds the site and checks generated local routes.

## Verification record

- Initial scaffold commit: `2ae5cb8380888c9073aa3e2186a6ba3859080bf2`.
- The GitHub Actions build for that commit completed successfully: [workflow run 38862664781](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/38862664781).
- This increment adds `npm run check`, which runs the Eleventy build followed by a local `href`/`src` and fragment check against generated HTML. Its result must be confirmed in CI for the commit containing this change.
- A committed npm lockfile is not included in this increment. The local environment had no network access or cached Eleventy package metadata, so a trustworthy lockfile could not be generated and verified. CI still uses `npm install`; reproducible `npm ci` installation remains open.

## Curriculum integrity

Module IDs, titles, total hours, descriptions, and lab IDs are represented in the module metadata. The approved curriculum specifies total workload but does not define a per-module split between fundamentals and lab hours; those unsupported split estimates have been removed. The module pages identify themselves as scaffolding and do not claim that detailed labs have been authored or verified.

## Explicitly not complete

- Detailed lesson content and fully specified lab instructions.
- Committed lockfile and reproducible `npm ci` installation.
- Accessibility automation and manual keyboard, screen-reader, contrast, and responsive review.
- Learner pilot and observed-duration validation.
- Netlify configuration, deploy preview, or production deployment.
