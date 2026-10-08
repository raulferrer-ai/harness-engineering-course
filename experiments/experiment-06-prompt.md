We are starting Experiment 06 of the Harness Engineering course project.

The purpose of this experiment is to transform the evidence from Experiments 03, 04, and 05 into precise human-decision briefs.

This experiment MUST NOT implement any of the proposed changes.

The goal is to prepare decisions for human approval.

Read:

* AGENTS.md
* experiments/03-decision-closure-analysis.md
* experiments/04-decision-closure.md if present; otherwise inspect the actual Experiment 04 artifacts and repository state
* experiments/05-decision-consumption.md
* docs/decisions/0001-decision-recording-mechanism.md
* docs/decisions/INDEX.md
* current repository structure

Do not modify any existing file.

Do not modify AGENTS.md.

Do not modify docs/decisions/0001-decision-recording-mechanism.md.

Do not modify docs/decisions/INDEX.md.

Do not create application code.

Do not select the website technology stack.

Do not make any human decision.

Do not implement any recommendation from this experiment.

Create exactly ONE new file:

`experiments/06-decision-specification.md`

## Context

Experiments 03–05 established the following evidence:

1. ADR-per-decision plus index was explicitly selected by the human as D1.
2. D1 was successfully recorded as an ADR and indexed.
3. The ADR and INDEX are currently untracked Git files.
4. Therefore the decision records are not durable across a fresh clone.
5. There is no authoritative discovery pointer from AGENTS.md.
6. Discovery currently depends on repository search or prior knowledge.
7. The decision information model and status vocabulary are not yet formally approved.
8. Write/transition governance is not defined.
9. Index-maintenance rules are not defined.
10. Supersession/retention policy is not defined.
11. Experiment reports contain Fact/Observation/Interpretation/Recommendation labels, but their authority relative to decisions is not formally established.
12. Experiment 05 demonstrated that a future agent can consume D1 once it finds the record, but discovery is not guaranteed.

Treat these as evidence from previous experiments, not as automatically approved requirements.

## Objective

Identify and precisely specify the human decisions now required to turn the experimental decision-recording mechanism into a reliable project harness.

Focus on:

* D2 — Information model
* D4 — Discovery and precedence
* D5 — Write/transition governance
* D7 — Retention/supersession

Also separately identify the Git/version-control persistence decision demonstrated as necessary by Experiment 05.

Do NOT assume that these decision IDs are final if the previous experiment reports show otherwise. Explain any ambiguity instead of silently normalizing it.

## For each proposed human decision

Create a decision brief containing:

1. Decision ID / provisional identifier
2. Title
3. Evidence motivating the decision
4. Problem to solve
5. Why this is human-owned
6. Exact question the human must answer
7. Constraints already established by previous human decisions
8. Available options
9. Trade-offs for each option
10. Consequences of each option
11. What remains unchanged regardless of the choice
12. What future behavior would be affected
13. Dependencies on other decisions
14. Whether the decision blocks the next harness change
15. Recommendation, if appropriate

Recommendations must remain recommendations.

Do not present any recommendation as an approved decision.

## Special analysis requirements

### A. Information model

Analyze:

* stable decision identifiers;
* file naming;
* status vocabulary;
* required fields;
* optional fields;
* authority metadata;
* decision scope;
* supersession references;
* rationale;
* revisit conditions.

Explicitly identify which elements are facts from existing artifacts and which are proposed design choices.

### B. Discovery and precedence

Analyze:

* how a future agent should discover the decision index;
* whether AGENTS.md should contain a pointer;
* whether README.md should contain a pointer;
* whether both should;
* what source is authoritative if multiple sources disagree;
* how decisions relate in authority to:

  * AGENTS.md;
  * requirements;
  * experiment reports;
  * repository facts;
  * conversation;
  * code/configuration.

Do not select the mechanism.

### C. Write and transition governance

Analyze who may:

* propose a decision;
* record a human decision;
* change status;
* supersede a decision;
* correct a factual error;
* modify the index.

Distinguish agent authority from human authority.

Do not assume that the agent can change an accepted decision merely because it has write access.

### D. Retention and supersession

Analyze:

* what happens to superseded decisions;
* whether old ADRs remain;
* how supersession is represented;
* whether IDs are reused;
* whether obsolete decisions remain discoverable;
* how an agent should avoid consuming superseded decisions.

Do not choose a policy.

### E. Git persistence

Experiment 05 demonstrated that untracked ADRs disappear from a fresh clone.

Analyze whether version-controlled persistence should be treated as:

* a project requirement;
* a harness invariant;
* an implementation convention;
* a human decision;
* or something else.

Present alternatives and trade-offs.

Do not assume that "Git should contain the decisions" is automatically approved merely because Git is already used.

## Required distinction

Throughout the document explicitly distinguish:

**FACT**
Something directly established by the repository or previous experiment.

**OBSERVATION**
Something observed during an experiment.

**INTERPRETATION**
Reasoning about what the evidence means.

**RECOMMENDATION**
A proposed course of action that still requires human approval.

Do not use these labels as decoration. Use them to prevent recommendations from becoming accidental requirements.

## Required document structure

The file must contain exactly these major sections, in this order:

1. Objective
2. Evidence base
3. Decision D2 — Information model
4. Decision D4 — Discovery and precedence
5. Decision D5 — Write and transition governance
6. Decision D7 — Retention and supersession
7. Git persistence decision
8. Decision dependencies
9. Minimum decision set required before harness repair
10. Harness observations
11. Result
12. Lessons learned
13. Human decisions required

## Critical constraint

Do NOT make the decisions.

Do NOT create ADRs for these proposed decisions.

Do NOT modify the existing D1 ADR.

Do NOT modify INDEX.md.

Do NOT modify AGENTS.md.

Do NOT create a decision template.

Do NOT implement discovery pointers.

Do NOT stage or commit anything.

The purpose of this experiment is to prepare the human decision boundary, not cross it.

## Verification

Before finishing:

1. Inspect `git status --short --untracked-files=all`.
2. Inspect `git diff`.
3. Verify exactly one new file was created by you.
4. Verify no existing file was modified.
5. Verify D1 ADR and INDEX are byte-for-byte unchanged.
6. Verify AGENTS.md is unchanged.
7. Verify no application code was created or modified.
8. Verify no Git commit, staging, or push occurred.
9. Report any ambiguity in the existing decision IDs or terminology.
10. Confirm that every recommendation in the document remains explicitly unapproved.

The experiment succeeds if it produces precise, decision-ready briefs without silently turning agent analysis into project requirements.


Response:

Experiment 06 complete
(Note: the first write attempt failed with a provider stream error before completing — I verified no partial file existed and no protected file changed, then wrote successfully in two parts.)
File created (exactly one)
experiments/06-decision-specification.md    (62,131 bytes, 502 lines, MD5 0389f381…)
Section order verified (13 required, exact): 1 Objective · 2 Evidence base · 3 D2 Information model · 4 D4 Discovery and precedence · 5 D5 Write/transition governance · 6 D7 Retention/supersession · 7 Git persistence decision · 8 Decision dependencies · 9 Minimum decision set required before harness repair · 10 Harness observations · 11 Result · 12 Lessons learned · 13 Human decisions required (+ Verification appendix).
Delivered: five decision briefs, each with all 15 required fields (§3–§7); special analyses A–E embedded (A: FACT/PROPOSED split per element; B: P1–P5 pointer + R1–R4 precedence + F1–F2 fail-safe; C: G1–G4 permission matrix across all six actions; D: O-6…O-9 + agent-avoidance rules; E: P6–P10 classification + C1–C4 actions).
9. Ambiguities reported (not normalised)
ID	Conflict	Handling
AMB-1	Task's "D4 — Discovery and precedence" conflates Exp03's D3 (precedence) and D4 (pointer) — verified from Exp03 §13 rows	§4 states it spans both; offers combined or separate answering; left to you
AMB-2	ID scheme/file naming assigned to D2 by this task, to D7 by Exp03 §13, to "D2/D7" by ADR A2	Reported; both briefs analyse their assigned elements + cross-reference
AMB-3	Two unreconciled ID spaces: D1 vs file 0001 (ADR A2; Exp05 FM10 predicts collision at next record)	Reported as D2 evidence; no scheme proposed as decided
AMB-4	Git persistence decision has no existing ID — candidates listed (new ID / Exp02 H10 / D4 / D1-scope)	Reported in §7 item 1; none assigned
Plus terminology notes: status vocabulary (Accepted vs unapproved open/decided/superseded) and H/D catalog overlap — all in §2.3.
10. Recommendations confirmed unapproved
RECOMMENDATION blocks appear only in §3 (R-D2a/b/c), §4 (R-D4a/b), §5 (R-D5a/b), §6 (R-D7a/b), §7 (R-GITa/b), §9 (R-MIN), §13 (aggregate) — each explicitly labelled "unapproved"/"RECOMMENDATIONS only", with in-line statements that no schema, pointer, governance model, retention policy, persistence classification, or sequencing is in force. No option is selected anywhere; no decision is made.
Verification performed
1. git status --short --untracked-files=all → 13 untracked paths; only experiments/06-decision-specification.md is new from this task.
2. git diff, git diff --cached, git ls-files -m → all empty → no existing file modified.
3. find -newermt (my write window) → only experiments/ dir + my file → exactly one new file.
4. D1 ADR byte-for-byte unchanged: 5f9deeb4…, 12,651 B, mtime 14:47:00. INDEX unchanged: f5d34b46…, 3,437 B, mtime 14:47:24.
5. AGENTS.md unchanged: 7355a77e…, 7,099 B, 292 lines, mtime 08:00:08.
6. All 18 other pre-existing files match pre-task checksums (reports 2e3b7abaf/903b0565/d58367e0/6faa8e1e, all prompts, scaffold files).
7. No application code: repo-wide listing = Markdown + .gitignore only.
8. No commit, staging, or push: HEAD 5fd9f54, log still 2 commits, stash empty, .git/index 08:31:51, .git/refs/heads/main unchanged.
Result
PASSED WITH QUALIFICATIONS
Passed: exact structure, five complete briefs, A–E delivered, zero decisions made, zero implementations, ambiguities reported rather than normalised, all recommendations explicitly unapproved. Qualifications: option lists are agent-generated and may be incomplete; question granularity (D2 = 5 sub-questions, D4 = 3) is agent-shaped; identifier conflicts remain open by design; §8/§9 dependencies are interpretation. Not FAILED: every required element present and protected files verified byte-identical.
Key evidence finding (O3): the durability gap is repo-wide — all decision records and every experiment report are untracked; only 6 scaffold files are tracked, HEAD unmoved since 08:31. A clone today would lose the entire Experiments 01–05 record.