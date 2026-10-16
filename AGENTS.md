# Project instructions

## Purpose

This repository will host an open, Spanish-language educational website about AI-assisted software engineering, agentic systems, context engineering, harness engineering, evaluation, security, and responsible operation.

The curriculum authority is the approved COURSE-02 design summarized in `docs/curriculum.md`. The site architecture and implementation must follow the approved decisions recorded in `docs/architecture.md`. If this repository conflicts with those documents, stop and report the conflict rather than silently choosing one.

## Working rules

- Distinguish repository facts, approved decisions, proposals, assumptions, implementation, and verification.
- Inspect relevant files and the current Git state before making changes.
- Work in small, reviewable increments with explicit acceptance criteria.
- Do not invent product requirements or make consequential architectural choices without approval.
- Do not delete or overwrite unrelated human work.
- Do not commit or deploy without explicit authorization for that action.
- Treat the public website as educational software: accuracy, accessibility, reproducibility, and maintainability are requirements.
- Explain technical concepts through rationale, trade-offs, limitations, and verification—not recipes alone.
- Prefer open tools and a no-paid-subscription learning path. Clearly label any optional paid service or remote-model dependency.
- Never claim tests, builds, accessibility checks, or deployments passed unless there is evidence.
- Do not expose secrets, tokens, personal data, or sensitive learner information.

## Change workflow

1. Inspect.
2. State the intended change and affected files.
3. Implement only the authorized scope.
4. Run the available checks.
5. Review the diff and report results and limitations.
6. Obtain authorization before any separately gated commit, merge, or deployment.

## Deployment

Netlify is the intended hosting target. No production deployment is authorized by this file. Deploy previews and production releases must be treated as separate gates, and production publication requires explicit approval.
