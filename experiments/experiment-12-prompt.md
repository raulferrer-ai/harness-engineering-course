# Experiment 12 — Harness Repair Decision Analysis

## Role

Act as the implementation agent for the `harness-engineering-course` repository.

This is a **read-only analysis experiment**.

Your task is to analyze the harness gaps identified by Experiment 11 and convert them into decision-ready human decision briefs.

You MUST NOT implement, modify, repair, normalize, commit, push, or otherwise change the harness as part of this experiment.

The only file you may create is:

```text
experiments/12-harness-repair-decision-analysis.md
```

Do not modify any existing file.

Do not stage or commit anything.

Do not push anything.

---

# 1. Required repository understanding

Before analysis, inspect the repository and establish the current state.

You MUST inspect at least:

* `AGENTS.md`
* `docs/decisions/INDEX.md`
* all current ADRs under `docs/decisions/`
* Experiment 05
* Experiment 06
* Experiment 08
* Experiment 09
* Experiment 10
* Experiment 11
* relevant experiment prompt files
* current Git state
* current commit
* remote state if needed to evaluate persistence/publication

Do not rely on conversational context as evidence.

Treat repository content as the authoritative evidence base.

---

# 2. Experiment boundary

The purpose of this experiment is **decision analysis**, not decision making.

You may:

* identify problems;
* classify evidence;
* consolidate duplicate issues;
* identify dependencies between decisions;
* formulate options;
* identify trade-offs;
* recommend a preferred option;
* identify consequences;
* identify verification requirements;
* identify ambiguities;
* propose decision wording for human consideration.

You MUST NOT:

* select an option on behalf of the human;
* modify `AGENTS.md`;
* modify `README.md`;
* modify ADRs;
* modify the decision index;
* modify previous experiment reports;
* create templates;
* establish Git policy;
* establish precedence rules;
* establish discovery rules;
* decide when commits or pushes occur.

A recommendation is not a decision.

Every recommendation must remain explicitly marked as a recommendation pending human decision.

---

# 3. Primary objective

Analyze the harness repair problem exposed by Experiment 11.

The analysis must determine:

1. Which findings are already resolved by existing human decisions.
2. Which findings require new human decisions.
3. Which findings can be solved by the agent without additional human authority.
4. Which decisions depend on other decisions.
5. What the minimum decision set is before harness repair can begin.
6. What verification evidence will be required after repair.
7. Whether any previously proposed HD identifiers should be consolidated, split, or discarded.

Do not assume that the provisional HD-5…HD-10 labels from Experiment 11 are correct.

Treat them as provisional analytical labels only.

---

# 4. Mandatory problem areas

The analysis MUST cover these areas separately.

## A. Decision discovery

Determine how a future agent should discover:

* that formal decisions exist;
* where the authoritative decision index is;
* where individual ADRs are stored;
* how to discover unresolved decisions;
* how to distinguish decision records from historical experiment reports.

Analyze candidate mechanisms, including at least:

* `AGENTS.md` pointer;
* `README.md` pointer;
* both;
* another repository-local mechanism.

Do not choose the mechanism.

---

## B. Experiment/history discovery

Determine how a future agent should discover:

* experiment reports;
* experiment prompts;
* chronological harness history;
* the relationship between experiments and decisions.

Analyze whether the current repository provides sufficient discovery mechanisms.

Do not assume that "directory naming" is sufficient merely because Experiment 11 eventually found the files.

---

## C. Decision authority and precedence

Analyze the stale-information problem identified by Experiment 11.

In particular:

* Experiment 06 contains an open `PROV-GIT` item.
* GP1 was subsequently decided.
* GP1 was subsequently recorded.
* GP1 was subsequently executed.

Determine what information an agent needs to distinguish:

* current human decisions;
* historical analysis;
* superseded analysis;
* unresolved questions;
* observations;
* experiment results.

Analyze possible precedence models.

Do not establish the precedence rule.

---

## D. Decision-record governance

Determine what is still missing from the decision-recording mechanism.

Consider:

* decision identifiers;
* file numbering;
* status vocabulary;
* dates;
* authority;
* supersession;
* amendment;
* index maintenance;
* unresolved decisions;
* decision lifecycle;
* relationship between ADRs and historical reports.

Identify which items are genuinely blocking and which are merely improvements.

---

## E. Future harness-artifact scope

GP1 states that project/harness artifacts that belong to the project must be versioned in Git.

Experiment 11 identified a remaining operational problem:

> GP1 establishes an obligation but does not establish a cadence or workflow for satisfying it.

Analyze:

* how future agents identify in-scope artifacts;
* whether the current class-based rule is sufficient;
* whether prompts/reports should automatically be included;
* how new artifact classes should be handled;
* whether temporary artifacts require a distinct treatment;
* whether generated or exploratory material needs classification.

Do not expand GP1 beyond what the human actually decided.

---

## F. Git execution workflow

HD-2 establishes:

* both human and agent may commit;
* an agent must announce its intention to commit;
* the agent must explain why;
* silent commits are prohibited.

Analyze what remains undefined, including where relevant:

* when a commit should be proposed;
* what constitutes a commit-ready unit;
* scope verification;
* commit message conventions;
* staging verification;
* post-commit verification;
* push authority;
* branch policy;
* handling of unrelated changes.

Clearly distinguish:

1. already decided;
2. implied operational consequences;
3. genuinely new policy decisions.

Do not silently turn implications into policy.

---

## G. Remote publication

Experiment 11 found:

```text
HEAD       = a4653b96...
origin/main = 5fd9f54...
```

Analyze the distinction between:

* local Git persistence;
* remote repository persistence;
* publication/push authorization.

Determine whether a new human decision is required before pushing.

Do not push.

Do not assume that "GP1 says version-controlled" automatically means "agent is authorized to push".

---

# 5. Decision consolidation

Do not simply reproduce HD-5…HD-10.

Create a normalized decision inventory.

For every candidate decision, provide:

* provisional ID;
* concise title;
* problem statement;
* evidence;
* why the decision matters;
* whether human decision is required;
* dependencies;
* candidate options;
* advantages/disadvantages;
* risks;
* recommended option, if appropriate;
* minimum acceptable decision;
* verification implications;
* whether it can be deferred.

Use explicit labels:

* FACT
* OBSERVATION
* INTERPRETATION
* RECOMMENDATION
* OPEN QUESTION
* HUMAN DECISION REQUIRED

Never present a recommendation as an accepted decision.

---

# 6. Avoid decision explosion

A central objective of this experiment is to determine the **minimum viable set of human decisions**.

Do not create separate human decisions for every minor implementation detail.

For each candidate decision ask:

> Does resolving this issue change externally observable harness behaviour, authority, governance, or infrastructure?

If no, classify it as agent-safe implementation detail or defer it.

If yes, determine whether it can be grouped with another decision without losing clarity.

The final analysis must distinguish:

* blocking decisions;
* important but deferrable decisions;
* agent-safe decisions;
* implementation details.

---

# 7. Dependency graph

Construct a dependency graph among the resulting candidate decisions.

At minimum consider relationships among:

```text
Discovery
Authority / precedence
Decision-record governance
Future artifact scope
Git execution workflow
Remote publication
```

Identify the minimum root decisions required before implementation can safely begin.

---

# 8. Repair boundary

Define precisely what can be repaired after the human decisions are made.

Separate:

### Harness repair

Examples may include:

* adding discovery pointers;
* documenting authoritative sources;
* adding lifecycle rules;
* adding artifact-scope guidance;
* documenting Git workflow.

### Non-repair / future product work

Examples:

* website stack;
* website architecture;
* content system;
* deployment;
* domain;
* curriculum implementation.

Do not allow harness repair analysis to become product design.

---

# 9. Verification plan

For every proposed repair area, identify how it should later be verified.

At minimum consider:

* fresh-agent discovery;
* decision consumption;
* stale historical evidence;
* artifact-scope classification;
* Git commit workflow;
* local persistence;
* remote persistence/publication, if authorized.

The verification plan must be testable.

---

# 10. Required report structure

Create exactly:

```text
experiments/12-harness-repair-decision-analysis.md
```

The report MUST contain these sections, in this exact order:

1. Objective
2. Evidence Base
3. Current Harness State
4. Experiment 11 Findings Reconstructed
5. Already-Resolved Issues
6. Candidate Decision Inventory
7. Decision Consolidation Analysis
8. Decision Dependencies
9. Minimum Human Decision Set
10. Agent-Safe Decisions
11. Deferrable Decisions
12. Harness Repair Boundary
13. Verification Requirements
14. Remote Publication Analysis
15. Harness Observations
16. Recommendations
17. Result
18. Lessons Learned
19. Human Decisions Required
20. Verification

---

# 11. Evidence discipline

Every substantive conclusion must be traceable to repository evidence.

For each important claim distinguish:

```text
Fact
Observation
Interpretation
Recommendation
```

Do not write:

> "The harness must..."

unless that requirement has already been decided by the human.

Prefer:

> "The evidence indicates that..."

or:

> "A possible policy is..."

or:

> "Human decision required: ..."

Historical experiment reports are evidence about what happened at that time.

They are NOT automatically current policy.

Current ADRs represent recorded human decisions, subject to the authority/precedence rules that actually exist.

Do not invent a precedence rule while analyzing the absence of one.

---

# 12. Special requirement: stale evidence

Use the `PROV-GIT` example from Experiment 06 as a concrete test case.

Determine:

1. What does Experiment 06 say?
2. What does GP1 say?
3. What happened operationally in Experiment 10?
4. What should a future agent currently infer?
5. What information is missing from the repository to make that inference unambiguous?

Do not solve the missing policy in this experiment.

---

# 13. Special requirement: GP1 scope

Do not reinterpret:

> "las decisiones, experimentos y demás artefactos del harness que deban formar parte del proyecto deben quedar versionados en Git"

as a broader policy than the human actually stated.

Explicitly identify what GP1 establishes and what it does not establish.

---

# 14. Special requirement: HD-2 scope

Do not reinterpret HD-2 as permission to:

* push;
* force-push;
* merge;
* create branches;
* modify remote state;
* define PR policy.

HD-2 concerns commit authority and the mandatory announcement/explanation before an agent commit.

Separate that from all other Git operations.

---

# 15. Final human-decision section

The final section before verification must contain a concise decision table.

For each genuinely required human decision include:

* proposed decision ID;
* title;
* decision statement;
* why it is required;
* dependencies;
* consequence of leaving it unresolved.

Do NOT decide these questions.

The purpose is to make the next human interaction efficient.

---

# 16. Verification requirements

Before finishing:

* exactly one new file exists:
  `experiments/12-harness-repair-decision-analysis.md`
* no existing file modified;
* no files staged;
* no commit created;
* no push performed;
* current HEAD recorded;
* current remote state recorded;
* Git working-tree state recorded;
* all major conclusions grounded in repository evidence;
* all proposed decisions remain explicitly undecided;
* no harness or product implementation performed.

If any of these conditions cannot be satisfied, stop and report the discrepancy.

---

# 17. Stop condition

After creating and verifying the report:

STOP.

Do not:

* implement any recommendation;
* modify `AGENTS.md`;
* modify `README.md`;
* modify ADRs;
* update the decision index;
* commit;
* push;
* start Experiment 13.

Return a concise execution report containing:

1. file created;
2. number of candidate decisions identified;
3. minimum human decision set;
4. decisions that can be deferred;
5. whether any existing requirement was found to be contradictory;
6. final Git state;
7. confirmation that no implementation or commit occurred.


Response: 

Experiment 12 complete — execution report.
1. File created:
experiments/12-harness-repair-decision-analysis.md (617 lines; all 20 required sections in exact order).
2. Candidate decisions identified: 7 (normalized, not copied from HD-5…HD-10)
RD-DISC (discovery pointers, areas A+B), RD-AUTH (precedence/fail-safe/current-open source, area C incl. the PROV-GIT 5-question test case), RD-SCHEMA (identifiers/numbering/vocabulary/dates/template, area D), RD-LIFE (transition/supersession/index/retention — new, omitted by Exp11), RD-EXPCONV (history conventions = Exp02 H8, new), RD-CADENCE (commit tempo/unit, areas E+F), RD-PUSH (remote publication, area G). Plus 1 discarded: HD-10/HD-4 (condition never met — Exp08 L356), and folded elements (RD-MSG → deferred/folded; open-list registry → RD-AUTH option).
3. Minimum human decision set: exactly 2 — RD-DISC + RD-AUTH (both AGENTS.md text; the roots that gate every identified repair). Recommended-but-not-required same-session bundle: RD-SCHEMA's minimal core (vocabulary + human-assigned-ID sentence).
4. Deferrable: RD-SCHEMA (trigger: next record/first status conflict), RD-CADENCE (trigger approaching — 2 experiment streams pending), RD-PUSH (blocks only pushes, not repair), RD-LIFE (0 live triggers), RD-EXPCONV, plus RD-MSG, branch/PR/merge/release/force-push/CI, AMB-P4 (resolved per commit gate), Exp03 D6 backfill — each with an explicit trigger in §11. Agent-safe without any new authority: S1–S9 (announce-and-wait commits, existing pre/post-commit rules, stop-and-ask classification, flagging stale evidence).
5. Contradictions found: yes — 2, both reported not fixed: (a) INDEX reading rule 3 (L39) asserts "the current list of open questions lives in those experiment reports" while reports are immutable historical documents — a rule that routes agents to stale-by-design sources for currency; (b) the stale PROV-GIT case: Exp06 L474 says OPEN, ADR 0002 says Accepted, commit a4653b9 executed it — with no precedence rule to arbitrate. No ADR-vs-ADR or ADR-vs-AGENTS.md contradictions; HD-2's "may commit" vs task-level prohibitions is apparent-only (per-task scoping, explained).
6. Final Git state: HEAD a4653b96b60e0c6fe258aadf2ac008370a308c43 · 3 commits · 27 tracked (clean: git diff HEAD = 0, all 13 md5 baselines match) · 0 staged · 0 modified · 0 stash · 4 untracked (Exp11 report, Exp12 report, prompts 11+12) · origin/main = ls-remote = 5fd9f54… — remote unchanged, fast-forwardable, one commit behind.
7. No implementation or commit occurred: confirmed — nothing staged, no commit, no push, no AGENTS.md/README.md/ADR/INDEX/report/.gitignore edit, no template or policy created; 18 RECOMMENDATION markers all marked unapproved, all §19 decision statements marked DRAFT/undecided.
STOP.