# Initial website implementation status

Date: 2026-10-16

## Scope of this increment

The initial Eleventy static-site skeleton is on the dedicated feature branch `feat/initial-eleventy-site`. It includes the course landing page, module landing-page template, principles page, curriculum metadata, responsive CSS, a committed npm lockfile, and a GitHub Actions workflow that installs from the lockfile, builds the site, and checks generated local routes.

## Verification record

- Initial scaffold commit: `2ae5cb8380888c9073aa3e2186a6ba3859080bf2`; its GitHub Actions build passed: [workflow run 38862664781](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/38862664781).
- The route-check increment was verified successfully in CI: [workflow run 38864875493](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/38864875493). The check runs the Eleventy build followed by local `href`/`src` and fragment checks against generated HTML.
- The lockfile was generated on a GitHub-hosted runner and verified with `npm ci` and `npm run check`: [workflow run 38868954308](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/38868954308).
- `package-lock.json` is committed on this feature branch. It uses lockfile format v3 and records 134 package entries, including Eleventy `3.1.2`.
- The finalized workflow uses read-only repository permissions, `npm ci`, and `npm run check`; it does not regenerate or commit the lockfile during CI. This workflow passed on the preceding implementation commit: [workflow run 38869032187](https://github.com/raulferrer-ai/harness-engineering-course/actions/runs/38869032187).

## Curriculum integrity

Module IDs, titles, total hours, descriptions, and lab IDs are represented in the module metadata. The approved curriculum specifies total workload but does not define a per-module split between fundamentals and lab hours; those unsupported split estimates have been removed. The module pages identify themselves as scaffolding and do not claim that detailed labs have been authored or verified.

## Explicitly not complete

- Detailed lesson content and fully specified lab instructions.
- Accessibility automation and manual keyboard, screen-reader, contrast, and responsive review.
- Learner pilot and observed-duration validation.
- Netlify configuration, deploy preview, or production deployment.
