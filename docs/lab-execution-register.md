# Lab execution register

**Purpose:** record reproducible, learner-style execution evidence for all ten labs. This register separates automated repository checks from practical validation by a learner or reviewer.

## Evidence standard

For each lab, record the exact commit SHA, date, operating system/runtime and versions, setup prerequisites, exact commands, raw output or linked artifact, failures and remediation, and reviewer decision. Distinguish automated contract/fixture tests from actual hands-on execution. Do not describe simulated policies as operating-system isolation, and do not present synthetic productivity figures as measured savings.

A green CI run proves only that the configured automation passed for that commit. It does not establish that a learner completed the lab successfully. Until evidence is attached and reviewed, the status remains **Not evaluated**.

## Current register

| Lab | Hands-on status | Evidence needed before marking validated |
|---|---|---|
| LAB-01 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-02 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-03 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-04 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-05 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-06 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-07 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-08 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-09 | Not evaluated | Learner follows the lab from a clean checkout; record environment, exact commands, outputs, and review. |
| LAB-10 | Not evaluated | Execute productivity-governance examples and tests, verify adoption gates against measured inputs, and record environment, exact commands, outputs, and review. |

## Per-lab evidence template

Copy this section for each actual validation; do not fill in expected outputs as if they were observed.

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
