# AGENTS.md

## Purpose

This repository contains a public educational website that teaches **Harness Engineering and agentic software development from first principles**.

The website itself is being developed using Harness Engineering.

This creates a deliberate feedback loop:

> Learn → Experiment → Build → Verify → Document → Publish → Improve the Harness

The repository is therefore both:

1. a software project; and
2. a living example of the engineering practices taught by the project.

The primary goal is not to build the largest possible website. The primary goal is to build a **reliable, understandable and inspectable example of software developed with AI coding agents**.

---

## Recorded decisions and experiment history

Before making changes, consult the repository's recorded decisions and experiment history when they are relevant:

* **Human decisions:** [`docs/decisions/INDEX.md`](docs/decisions/INDEX.md) is the entry point — it lists every recorded decision and links to its individual ADR record, which is the decision in full.
* **Experiment history:** [`experiments/`](experiments/) contains the experiment reports and prompt files — what was tried, observed, and analyzed at the time.

Consult these sources when relevant before making changes: recorded decisions state what the project has decided, and the experiment history explains how the repository reached its current state. *(Recorded as RD-DISC: [`docs/decisions/0005-decision-discovery.md`](docs/decisions/0005-decision-discovery.md).)*

---

## Authority of sources

How to read this repository's sources:

* **Current human decisions:** accepted decision records/ADRs in [`docs/decisions/`](docs/decisions/) are the current human decisions.
* **Operational rules:** `AGENTS.md` (this file) contains operational rules and must remain compatible with those human decisions.
* **Index:** [`docs/decisions/INDEX.md`](docs/decisions/INDEX.md) is navigation/index material — not an independent policy authority.
* **Historical evidence:** `experiments/` contains historical evidence. Experiment reports document what was observed, analyzed, or decided at the time; they do not automatically represent current policy.
* **Later decision over historical state:** when a historical experiment report conflicts with a later human decision recorded in an ADR, the ADR represents the current human decision. The report remains historical evidence — do not rewrite it merely to remove the historical state.

This states only the approved minimum rule; ADR-vs-ADR conflicts, status lifecycle, supersession, amendment, and retention remain undecided. *(Recorded as RD-AUTH: [`docs/decisions/0006-decision-authority-and-precedence.md`](docs/decisions/0006-decision-authority-and-precedence.md).)*

---

## Core Principles

### 1. Do not invent requirements

Never silently turn a reasonable technical assumption into a product requirement.

Distinguish clearly between:

* explicit requirements;
* facts observed in the repository;
* technical options;
* agent assumptions;
* human decisions.

If an unresolved decision could change:

* externally observable behaviour;
* architecture;
* infrastructure;
* technology selection;
* security;
* privacy;
* deployment;
* cost;
* or the scope of the product,

stop and ask the human.

Do not proceed by inventing the missing requirement.

---

### 2. Understand before modifying

Before making changes:

1. inspect the relevant repository files;
2. understand the current state;
3. identify applicable requirements and constraints;
4. determine what is already implemented;
5. identify uncertainties;
6. propose a plan when the task is non-trivial.

Do not modify files merely because a modification seems useful.

---

### 3. Small, verifiable increments

Prefer small changes that can be independently verified.

Avoid large speculative implementations.

Each implementation increment should have:

* a clearly defined objective;
* a limited scope;
* an explicit verification method;
* a clear completion condition.

---

### 4. Verification is part of implementation

Never consider a task complete merely because the code was written.

After implementation, verify the result using the strongest appropriate mechanisms available, such as:

* tests;
* type checking;
* linting;
* build;
* static analysis;
* local execution;
* repository-specific validation;
* manual inspection where automated verification is insufficient.

Report what was verified and what could not be verified.

Never claim that something works without evidence.

---

### 5. Preserve existing behaviour

Before changing existing functionality, understand its current behaviour.

Do not introduce unrelated refactoring, dependency upgrades, architecture changes or cleanup unless explicitly required or separately approved.

Prefer the smallest change that satisfies the requirement.

---

### 6. Documentation is part of the system

Important decisions, discoveries and lessons should be captured in the repository rather than remaining only in conversation.

When appropriate, update the relevant documentation describing:

* requirements;
* decisions;
* architecture;
* experiments;
* constraints;
* failures;
* lessons learned.

Documentation should describe what is actually known, not what we assume to be true.

---

### 7. The human remains responsible for product decisions

The agent is responsible for analysis, implementation and verification within the agreed constraints.

The human is responsible for unresolved product and architectural decisions.

When the boundary is unclear, stop and ask.

Do not optimize for autonomous progress at the expense of correctness.

---

## Working Method

For non-trivial tasks, follow this general workflow:

```text
Understand
    ↓
Inspect
    ↓
Identify requirements and constraints
    ↓
Identify unresolved decisions
    ↓
Plan
    ↓
Human decision gate, when required
    ↓
Implement
    ↓
Verify
    ↓
Review
    ↓
Document
```

If a decision gate is reached, do not continue implementation until the decision is resolved.

---

## Repository Safety

Before modifying files:

* inspect the current Git status;
* identify untracked and modified files;
* do not overwrite unrelated human work;
* do not delete files without a clear requirement;
* do not reset or discard changes made by the human;
* do not modify generated files unless necessary.

Before committing, ensure that the diff contains only changes belonging to the current task.

---

## Dependency and Technology Decisions

Do not introduce a framework, library, service or external dependency simply because it is familiar or convenient.

Before introducing a significant dependency, explain:

* why it is needed;
* what alternatives exist;
* what trade-offs it introduces;
* whether it affects deployment, security, privacy or cost.

Technology selection is a human decision when it materially affects the project.

---

## Educational Content

The educational content is itself a product requirement.

Explanations should prioritize:

1. understanding;
2. reasoning;
3. reproducibility;
4. practical experimentation.

Avoid presenting a technique merely as a recipe.

When teaching a practice, explain:

* what problem it solves;
* why the problem matters;
* what the agent would otherwise do;
* how the practice changes agent behaviour;
* how the result is verified;
* what limitations remain.

The material should distinguish clearly between:

* established engineering principles;
* project-specific decisions;
* experimental observations;
* personal opinions or recommendations.

---

## Learning From Failures

Failures are valuable evidence.

When an agent makes an important mistake, do not merely fix the resulting code.

Consider whether the failure indicates a weakness in:

* requirements;
* repository context;
* agent instructions;
* verification;
* architecture;
* tooling;
* documentation;
* or the overall harness.

If so, improve the harness rather than repeatedly correcting the same class of mistake manually.

---

## Change Discipline

Do not make broad improvements while working on an unrelated task.

If you discover a potentially useful improvement outside the current scope:

1. mention it;
2. record it when appropriate;
3. do not implement it unless it belongs to the current task or is explicitly approved.

---

## Communication

When reporting work:

* state what was inspected;
* state what was changed;
* state why it was changed;
* state what was verified;
* identify unresolved issues;
* distinguish facts from assumptions.

If blocked by an unresolved requirement, explain the decision that is needed rather than guessing.

---

## Current Project Status

This repository is in the early establishment phase.

The initial objective is to establish and test the Harness Engineering process **before building substantial application functionality**.

The harness itself is expected to evolve.

When evidence from experiments demonstrates that an instruction is ineffective, ambiguous or unnecessarily restrictive, propose an improvement to this file rather than silently working around the problem.
