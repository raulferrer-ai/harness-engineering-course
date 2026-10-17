# Approved curriculum baseline — COURSE-02

This document is a concise implementation baseline, not a replacement for the full curriculum dossier maintained in the project design record. Where detail is missing, do not invent it; flag it for resolution.

## Course structure

Total planned workload: 160 hours.

- Fundamentals: 40 hours
- Practical labs: 64 hours
- Transversal project: 40 hours
- Evaluation: 16 hours

## Ten modules

| ID | Module | Fundamentals | Lab | Total |
|---|---|---:|---:|---:|
| M01 | Models, capabilities, and limits | 4 h | 4 h | 8 h |
| M02 | Task specification and design | 4 h | 6 h | 10 h |
| M03 | Context engineering | 4 h | 6 h | 10 h |
| M04 | AI-assisted development and code review | 4 h | 8 h | 12 h |
| M05 | Agents, tools, and delegation | 4 h | 8 h | 12 h |
| M06 | Harness engineering and execution control | 4 h | 8 h | 12 h |
| M07 | Testing, evals, and verification | 4 h | 8 h | 12 h |
| M08 | Security and risk management | 4 h | 6 h | 10 h |
| M09 | CI/CD, observability, and maintenance | 4 h | 6 h | 10 h |
| M10 | Productivity, costs, and governance | 4 h | 4 h | 8 h |

The ten modules account for 104 hours. The transversal project (40 h) and evaluation (16 h) are additional.

## Competencies

- COMP-01: Model capabilities and limits — N3
- COMP-02: Delegable task specification — N4
- COMP-03: Context engineering — N3
- COMP-04: AI-assisted development and code review — N4
- COMP-05: Agents and delegation — N3
- COMP-06: Harness and execution control — N4
- COMP-07: Testing, evals, and verification — N4
- COMP-08: Operation and maintenance — N3
- COMP-09: Cost, governance, and responsibility — N4

Proficiency scale: N1 insufficient; N2 basic/partial; N3 competent/reliable; N4 advanced, able to compare alternatives and propose improvements.

## Lab baseline

- LAB-01: Model characterization — 4 h
- LAB-02: Ambiguous incident to specification — 6 h
- LAB-03: Context-engineering experiment — 6 h
- LAB-04: Code change with independent review — 8 h
- LAB-05: Agent with tools and limits — 8 h
- LAB-06: Harness with executable policies — 8 h
- LAB-07: Testing and evals — 8 h
- LAB-08: Threats and adversarial testing — 6 h
- LAB-09: CI/CD, observability, and recovery — 6 h
- LAB-10: Productivity, cost, and governance — 4 h

Each lab should document preparation, specification, execution, verification, evidence, acceptance criteria, limitations, and recovery. Include negative tests where relevant.

## Transversal project and evaluation

The project is planned for 40 hours and should use an existing repository, compare an appropriate baseline with AI-assisted work where feasible, and record quality, regressions, verification effort, human intervention, costs, maintainability, and security. The operational default is that each learner selects a repository meeting the admission contract in `docs/transversal-project.md`; a single shared repository is not required. License and admission must be checked for each selected repository before work begins.

The 16-hour evaluation design includes conceptual assessment, individual practical work, failure diagnosis, and defense. A provisional rubric and decision threshold are documented in `docs/transversal-project-rubric.md`, with a calibration procedure in `docs/rubric-calibration-protocol.md`. These are working defaults for preparation and pilot calibration, not a validated summative policy. Do not automate a final grade or claim the threshold is validated before human calibration and approval.

## Known implementation gates

Still to be validated: lab-specific tool/runtime matrix; license/admission checks for selected repositories; clean-install reproducibility; independent execution of all ten labs; formal review of competency-to-outcome-to-activity-to-evidence traceability; accessibility validation; rubric calibration; privacy review; and a learner pilot with observed durations and outcomes. A successful build or fixture validator does not close these gates.
