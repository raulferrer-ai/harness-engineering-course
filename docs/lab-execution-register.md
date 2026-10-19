# Lab execution register

**Purpose:** record reproducible, learner-style execution evidence for all ten labs. This register separates automated repository checks from practical validation by a learner or reviewer.

## Evidence standard

For each lab, record the exact commit SHA, date, operating system/runtime and versions, setup prerequisites, exact commands, raw output or linked artifact, failures and remediation, and reviewer decision. Distinguish automated contract/fixture tests from actual hands-on execution. Do not describe simulated policies as operating-system isolation, and do not present synthetic productivity figures as measured savings.

A green CI run proves only that the configured automation passed for that commit. It does not establish that a learner completed the lab successfully. Until evidence is attached and reviewed, the status remains **Not evaluated**.

## Current register

| Lab | Hands-on status | Existing automated check (contract/fixture only) | Evidence needed before marking validated |
|---|---|---|---|
| LAB-01 | Not evaluated | `npm run check:lab01` and `npm run test:lab01-evaluator` | Run the learner experiment using actual model outputs; preserve prompt, model/version, parameters, raw outputs, scoring and reviewer decision. |
| LAB-02 | Not evaluated | `npm run check:lab02` | Have a learner independently produce and apply the specification from a clean checkout; record unanswered questions, acceptance criteria and whether oral clarification was needed. |
| LAB-03 | Not evaluated | `npm run check:lab03` | Run the controlled A/B experiment with one variable changed; preserve paired inputs/outputs, model/version, scoring method and limitations. |
| LAB-04 | Not evaluated | `npm run check:lab04` | Execute baseline and changed code in a clean environment; preserve base/final commits, diff, positive/negative/regression test outputs and independent review. |
| LAB-05 | Not evaluated | `npm run check:lab05` and `npm run test:lab05-executable` | Test allowed and denied tool operations in a disposable environment with externally enforced permissions; preserve logs and verify no unauthorized side effects. |
| LAB-06 | Not evaluated | `npm run check:lab06` | Exercise allow/deny release-gate cases in a real practice pipeline; demonstrate that the control blocks promotion, and record the exact artifact/commit checked. |
| LAB-07 | Not evaluated | `npm run check:lab07` | Evaluate a declared set of actual outputs, preserve scoring inputs and calculations, test missing/critical cases, and record independent human calibration. |
| LAB-08 | Not evaluated | `npm run check:lab08` and `npm run test:lab08-security-cases` | Run benign adversarial cases in an isolated environment; capture expected/observed denials, external controls and evidence of no unauthorized effects. |
| LAB-09 | Not evaluated | `npm run check:lab09` and `npm run test:lab09-recovery` | Trigger a controlled failure in a sandbox/staging pipeline; preserve telemetry, alert, containment and recovery/rollback evidence. |
| LAB-10 | Not evaluated | `npm run check:lab10` and `npm run test:lab10-productivity` | Recalculate costs and quality metrics from disclosed inputs; separate synthetic demonstrations from measured observations and document uncertainty and adoption decision. |

## Per-lab evidence template

Use a copy of the [full evidence template](lab-evidence-template.md) for each execution. Copy the compact fields below only when they are sufficient for the case. For each actual validation; do not fill in expected outputs as if they were observed.

- **Lab / scenario:**
- **Status:** Not evaluated / Blocked / Validated
- **Commit SHA:**
- **Date and reviewer:**
- **Environment:** OS, architecture, runtime/tool versions
- **Prerequisites and setup:**
- **Exact commands:**
- **Observed output / artifact:**
- **Failures and remediation:**
- **Decision and rationale:**
- **Known limitations:**

## Relationship to other validation documents

- [Lab validation plan](lab-validation-plan.md) describes the evidence gaps and validation approach.
- [Lab runtime matrix](lab-runtime-matrix.md) describes runtime and release-evidence expectations.
- [Implementation status](IMPLEMENTATION-STATUS.md) tracks repository changes and CI observations.

**Release rule:** do not mark a lab as hands-on validated without reproducible execution evidence and a recorded review decision.
