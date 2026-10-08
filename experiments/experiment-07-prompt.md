We are continuing the Harness Engineering course project.

A second human decision has now been explicitly made.

## Human decision

**GP1 — Harness artifact persistence**

Decision:
"Las decisiones, experimentos y demás artefactos del harness que deban formar parte del proyecto deben quedar versionados en Git."

English interpretation for the agent:
Decisions, experiments, and other harness artifacts that are part of the project must be version-controlled in Git.

Important:

* This decision has already been made by the human project owner.
* Do not reinterpret, expand, narrow, or replace it.
* Do not infer a complete Git workflow from this decision.
* Do not decide what "other harness artifacts" means beyond recording the wording faithfully.
* Do not decide commit frequency, branch strategy, commit-message conventions, staging policy, CI policy, or release policy.
* Those may require future human decisions.

The task is ONLY to record GP1 using the already-approved ADR-per-decision plus index mechanism established by D1.

Read first:

* AGENTS.md
* experiments/03-decision-closure-analysis.md
* experiments/04-decision-closure.md if present; otherwise inspect the Experiment 04 artifacts
* experiments/05-decision-consumption.md
* experiments/06-decision-specification.md
* docs/decisions/0001-decision-recording-mechanism.md
* docs/decisions/INDEX.md
* current repository structure

Do not modify any existing file.

Do not modify:

* AGENTS.md
* README.md
* INITIAL_PROMPT.md
* docs/vision.md
* docs/architecture.md
* experiments/*
* src/*
* docs/decisions/0001-decision-recording-mechanism.md

Create exactly two new files:

1. `docs/decisions/0002-harness-artifact-persistence.md`
2. Update `docs/decisions/INDEX.md`

The INDEX update is explicitly authorized because D1 established ADR-per-decision plus index.

Do not modify any other existing file.

## ADR requirements

The new ADR must contain, at minimum:

1. Decision ID
2. Title
3. Status
4. Decided by
5. Decision date
6. Scope
7. Context
8. Decision
9. Alternatives considered
10. Consequences
11. Supersession information

Record the decision faithfully.

The decision statement must preserve the human-approved wording. Do not strengthen it into claims such as:

* "everything must always be committed";
* "all experiments must be committed immediately";
* "Git is the only persistence mechanism";
* "all repository files are harness artifacts";
* "the agent may commit automatically".

None of those decisions have been made.

## Authority boundary

The ADR must explicitly state:

* GP1 was decided by the human project owner.
* The agent is recording the decision, not making it.
* GP1 concerns persistence/versioning of project harness artifacts.
* GP1 does not establish a complete Git workflow.
* Future Git governance decisions remain human-owned unless explicitly delegated.

## Context

The context may cite Experiment 06's evidence that:

* decision records are currently untracked;
* experiment reports are currently untracked;
* a fresh clone would therefore not contain them;
* this creates a durability gap.

Clearly distinguish these as observations/evidence rather than retroactively treating them as requirements.

Do not invent additional rationale.

If rationale is not explicitly provided by the human, do not manufacture one.

## Alternatives

Record reasonable alternatives that were actually considered in Experiment 06 where appropriate, but clearly label them as alternatives considered rather than selected decisions.

Do not invent an alternative that was not supported by the existing analysis.

## INDEX

Update `docs/decisions/INDEX.md` to add GP1.

The index must:

* retain the existing D1 entry;
* add GP1 as a separate entry;
* link to `0002-harness-artifact-persistence.md`;
* expose ID, title, and status;
* preserve the existing index semantics;
* not imply that other unresolved decisions have been resolved.

Do not redesign the index.

## Important constraint

Do NOT commit or stage the new files.

This experiment is specifically testing decision recording.

GP1 says that project harness artifacts should be version-controlled, but it does NOT itself authorize you to commit them.

Recording a decision and executing the policy are separate actions.

## Verification

Before finishing:

1. Inspect `git status --short --untracked-files=all`.
2. Inspect `git diff`.
3. Verify exactly one new ADR was created.
4. Verify INDEX.md was modified only as authorized to add GP1.
5. Verify D1 ADR is byte-for-byte unchanged.
6. Verify AGENTS.md is unchanged.
7. Verify all existing experiment reports are unchanged.
8. Verify no application code was created or modified.
9. Verify no files were staged.
10. Verify no commit or push occurred.
11. Report the exact files created/modified.
12. Report how the human authority boundary is represented.
13. Report any ambiguity without silently resolving it.

The purpose of this task is to record GP1, not to execute GP1.

Do not implement any other decision from Experiment 06.
Do not modify the harness rules.
Do not select the website technology stack.


Response:

All verification checks pass. GP1 has been recorded.
Task result
Files changed — exactly the two authorized:
Action	File	Detail
Created	docs/decisions/0002-harness-artifact-persistence.md	GP1 ADR (MD5 04af7636…)
Modified (authorized)	docs/decisions/INDEX.md	Exactly 2 changes: line 20 count one→two; line 25 GP1 row added after D1 row. All other 48 lines byte-identical to the pre-task copy.
Verification (task items 1–10):
 1. git status — the two files above are the only paths touched this task (both untracked, as expected).
 2. git diff, git diff --cached, git ls-files -m — all empty; INDEX is untracked so its change was verified by content comparison instead (50 lines = 49 + 1).
 3. Exactly one new ADR created; find -newermt confirms only the ADR and INDEX changed.
 4. INDEX modified only as authorized — D1 entry retained, GP1 added as separate entry linking 0002-harness-artifact-persistence.md, ID/title/status exposed, semantics preserved, no redesign.
 5. D1 ADR byte-for-byte unchanged (5f9deeb4…).
 6. AGENTS.md unchanged (7355a77e…).
 7. All experiment reports unchanged (exp01–exp06, all prompt files match baseline; experiment-07-prompt.md is your file — untouched).
 8. No application code — repo contains only Markdown + .gitignore.
 9. Nothing staged — .git/index mtime still 08:31:51 (predates the task).
10. No commit or push — HEAD still 5fd9f54, log still 2 commits, stash empty.
How the human authority boundary is represented (item 12)
- §1 — Decided by: Human project owner; Status and Date flagged as interpretation/precedent-based, not verbatim communication.
- §3 — your Spanish wording quoted verbatim + your English interpretation, each labelled as communicated fact; followed by an explicit "what GP1 does NOT state" list (the five forbidden strengthening claims).
- §3.1 — all six required statements: decided by human; agent recording not making; scope = persistence/versioning of project harness artifacts; no complete Git workflow established; future Git governance remains human-owned unless explicitly delegated; recording ≠ executing — nothing staged or committed by this record.
- §5.1/§5.2 — consequences split: decider-stated facts vs analysis-derived interpretation; execution explicitly a separate, future, human-directed action.
Ambiguities reported, not resolved (item 13)
Ref	Ambiguity	Handling
AMB-G1	No status string supplied for GP1	Recorded Accepted following D1 precedent, flagged in §1 as interpretation; vocabulary approval remains open (D2)
AMB-G2	Decider stated no date	2026-10-06, date-level, environment-verified — flagged; if wrong, needs your confirmation
AMB-G3	Identifier scheme: GP1 is a new prefix outside the D-catalog; file ordinal 0002 continues the unreconciled D1↔0001 pairing (Exp06 AMB-3/4); GP1 is not one of Exp06 §7's candidate mappings	Recorded as given; no scheme created
AMB-G4	"que deban formar parte del proyecto" deliberately not enumerated	Left undefined by design
AMB-G5	No rationale supplied	Recorded as absent; Exp06 evidence cited as context only, never as manufactured rationale
AMB-G6	(a) Exp06 §13 still lists PROV-GIT as open — cross-reference lives in the ADR only, since experiments/* is unmodifiable here; (b) INDEX's standing note says statuses/dates are "reproduced exactly as communicated by the decider" — true for D1, not for GP1 (nothing was communicated)	(a) reported in ADR only; (b) note left unmodified (change authorized only "to add GP1"); tension reported here for a future authorized edit
Minor observation: the INDEX link targets use repo-root-relative paths (e.g. docs/decisions/0001-… from within docs/decisions/) — a pre-existing convention from the D1 row that I matched rather than "fixed", since changing it would exceed the add-GP1 authorization.
Standing fact, unchanged by this task: all decision records and experiment reports remain untracked. GP1 records that they must be version-controlled; actually committing them is the separate execution step, awaiting your direction — no commit was made here.