# Experiment 13 — Record RD-DISC and RD-AUTH

## Role

Act as the implementation agent for the `harness-engineering-course` repository.

This task records two human decisions that have already been explicitly approved by the project owner.

The decisions are:

* **RD-DISC** — Decision discovery
* **RD-AUTH** — Authority and precedence

The human has approved the following options:

### RD-DISC

Approved option: **A**

`AGENTS.md` must contain explicit pointers to:

* `docs/decisions/INDEX.md` for human decisions;
* `experiments/` for experimental history.

These pointers are authoritative discovery guidance for the agent.

This decision does NOT yet modify `AGENTS.md`. That implementation belongs to a later repair step.

### RD-AUTH

Approved option: **B**, with the explicit minimum authority rule described below.

Current human decisions are represented by the accepted decision records/ADRs.

`AGENTS.md` contains operational rules and must remain compatible with those human decisions.

`docs/decisions/INDEX.md` is a navigation/index mechanism, not an independent source of policy authority.

`experiments/` contains historical evidence.

If a historical experiment report contains a state that conflicts with a later human decision recorded in an ADR, the later human decision represented by the ADR is the current authoritative decision; the experiment report remains historical evidence and must not be rewritten merely to remove the historical state.

Do not extend this decision into a complete decision lifecycle, supersession system, status taxonomy, or conflict-resolution framework beyond what is explicitly stated above.

---

# 1. Allowed changes

You may create exactly:

```text
docs/decisions/0005-decision-discovery.md
docs/decisions/0006-decision-authority-and-precedence.md
```

You may update exactly:

```text
docs/decisions/INDEX.md
```

No other file may be modified.

In particular, DO NOT modify:

* `AGENTS.md`
* `README.md`
* any experiment report;
* any experiment prompt;
* `.gitignore`;
* source code;
* configuration;
* Git history.

Do not stage anything.

Do not commit.

Do not push.

---

# 2. Required repository inspection

Before writing anything, inspect:

* `AGENTS.md`
* `docs/decisions/INDEX.md`
* `docs/decisions/0001-decision-recording-mechanism.md`
* `docs/decisions/0002-harness-artifact-persistence.md`
* `docs/decisions/0003-experiment-prompt-artifacts.md`
* `docs/decisions/0004-git-commit-authority.md`
* Experiment 12
* relevant previous experiment reports as needed
* current Git status and HEAD

The purpose is to preserve the existing decision-recording mechanism and avoid inventing a second format.

---

# 3. Decision authority

These are already-decided human decisions.

You are NOT deciding:

* whether RD-DISC should be A;
* whether RD-AUTH should be B;
* whether the authority rule should exist.

Those decisions have already been made by the human.

Your task is to record them accurately.

If any required metadata cannot be established from repository evidence or the human decision itself, do not invent it silently. Mark the metadata ambiguity explicitly in the ADR and continue only if doing so preserves the authority boundary.

---

# 4. ADR 0005 — RD-DISC

Create:

```text
docs/decisions/0005-decision-discovery.md
```

Record the decision as:

**Decision ID:** RD-DISC

**Title:** Decision and harness-history discovery

**Status:** Accepted

**Decision:**

The repository's `AGENTS.md` must contain explicit pointers to:

1. `docs/decisions/INDEX.md` as the entry point for human decisions.
2. `experiments/` as the entry point for experimental history.

These pointers are discovery guidance for agents.

The decision does not itself modify `AGENTS.md`; implementation is a separate action.

Record clearly that:

* the decision was made by the human project owner;
* the decision was derived from the findings of Experiments 11 and 12;
* the approved option was A;
* the decision concerns discoverability, not the complete structure of the harness;
* `docs/decisions/INDEX.md` remains the decision-record index;
* `experiments/` remains historical experiment material.

Do not add requirements that were not approved.

---

# 5. ADR 0006 — RD-AUTH

Create:

```text
docs/decisions/0006-decision-authority-and-precedence.md
```

Record the decision as:

**Decision ID:** RD-AUTH

**Title:** Authority and precedence between current decisions and historical evidence

**Status:** Accepted

Record the approved rule precisely:

1. Accepted human decision records/ADRs represent current human decisions.
2. `AGENTS.md` contains operational rules and must remain compatible with those human decisions.
3. `docs/decisions/INDEX.md` is a navigation/index mechanism and is not an independent policy authority.
4. `experiments/` contains historical evidence.
5. When a historical experiment report conflicts with a later human decision recorded in an ADR, the later human decision represented by the ADR is authoritative for the current state.
6. The historical experiment report remains historical evidence and must not be rewritten merely because its previous state is no longer current.

Explicitly use the Experiment 06 / GP1 case as the motivating example:

* Experiment 06 recorded `PROV-GIT` as open.
* GP1 was subsequently decided and recorded in ADR 0002.
* GP1 was subsequently executed in Experiment 10.
* Therefore Experiment 06 remains historical evidence, while ADR 0002 represents the current human decision.

Do NOT invent a general ADR supersession mechanism.

Do NOT define a complete status lifecycle.

Do NOT define conflict resolution between two contradictory ADRs.

Do NOT define amendment rules.

Do NOT define retention rules.

Those remain unresolved unless already explicitly decided elsewhere.

---

# 6. Consequences

For each ADR distinguish clearly between:

### Decision-stated consequences

Consequences that follow directly from the approved decision.

### Analysis-derived consequences

Implications identified by the agent.

Do not present analysis-derived consequences as statements made by the human.

At minimum note:

For RD-DISC:

* agents receive an explicit discovery path;
* implementation of the pointers remains a separate future action;
* the decision does not require a new discovery infrastructure.

For RD-AUTH:

* historical reports can remain immutable;
* stale historical states no longer need to be interpreted as current decisions;
* current decisions and historical evidence are explicitly separated;
* future repair must make this distinction discoverable to agents.

---

# 7. Relationship to existing decisions

For each new ADR, identify relevant relationships:

* RD-DISC depends on the existing decision-recording mechanism D1.
* RD-AUTH relies on the existence of recorded human decisions established by D1.
* GP1 establishes persistence of relevant harness artifacts in Git.
* HD-1 establishes experiment prompt artifacts as project/harness artifacts.
* HD-2 establishes commit authority but is unrelated to decision authority.

Do not claim that RD-DISC or RD-AUTH supersedes any previous decision.

---

# 8. Update INDEX.md

Update:

```text
docs/decisions/INDEX.md
```

Add RD-DISC and RD-AUTH following the existing index format.

The index must allow an agent to identify at least:

* decision ID;
* title;
* status;
* decision owner/decider;
* decision date if already represented by the existing convention;
* scope;
* link to the ADR.

Do not redesign the index.

Do not introduce a new index schema.

Do not rewrite existing entries except where required to insert the two new decisions.

Preserve all existing content unless a minimal structural edit is necessary.

---

# 9. Metadata discipline

The human explicitly approved the decisions in the current conversation.

Do not invent a rationale beyond the rationale supported by Experiments 11 and 12.

If the repository's existing convention requires a decision date and the exact human communication date is available from the repository/session evidence, use it.

If the existing convention requires metadata that cannot be established reliably, flag the ambiguity rather than silently manufacturing it.

Do not create a new identifier scheme.

Use:

```text
RD-DISC → file 0005
RD-AUTH  → file 0006
```

because the existing ADR numbering sequence is 0001–0004.

If you detect an existing convention that makes this mapping problematic, stop and report the conflict instead of inventing a resolution.

---

# 10. Verification

Before finishing, verify:

### Files

Exactly these changes exist:

```text
docs/decisions/0005-decision-discovery.md
docs/decisions/0006-decision-authority-and-precedence.md
docs/decisions/INDEX.md
```

### Content

Verify:

* both decisions are explicitly marked Accepted;
* both identify the human as decision authority;
* both approved options are recorded accurately;
* RD-DISC explicitly identifies `AGENTS.md` as the future location of discovery pointers;
* RD-AUTH explicitly separates current decisions from historical experiment evidence;
* Experiment 06 / GP1 is recorded as the motivating stale-information example;
* no unresolved issue has accidentally been represented as decided;
* no previous ADR has been changed.

### Git

Verify:

* HEAD is unchanged;
* no commit was created;
* nothing was staged;
* no push occurred;
* pre-existing untracked files remain unmodified;
* only the three allowed paths changed.

---

# 11. Important boundary

This experiment records decisions.

It does NOT implement them.

Therefore:

```text
RD-DISC
    decision recorded ✓
    AGENTS.md modified ✗

RD-AUTH
    decision recorded ✓
    precedence rules operationally wired into AGENTS.md ✗
```

The implementation of the repair will happen later, after this recording step has been independently verified.

---

# 12. Stop condition

After creating the two ADRs, updating the index, and verifying the result:

STOP.

Do not:

* modify `AGENTS.md`;
* modify `README.md`;
* repair the harness;
* create Experiment 14;
* commit;
* push.

Return a concise execution report containing:

1. files created;
2. index update;
3. exact decision IDs recorded;
4. confirmation that both are Accepted;
5. any metadata ambiguities;
6. verification result;
7. final Git state;
8. confirmation that no implementation, staging, commit, or push occurred.


Response:

Experiment 13 — execution report.
1. Files created:
- docs/decisions/0005-decision-discovery.md (196 lines)
- docs/decisions/0006-decision-authority-and-precedence.md (209 lines)
- (no other file created)
2. Index update:
docs/decisions/INDEX.md — exactly two authorized changes, verified by git diff (2 hunks, nothing else): decision count four → six (L20), and two appended rows after HD-2 (RD-DISC, RD-AUTH, each with ID/title/Accepted/Human project owner/2026-10-08/scope/link in the existing 7-column format). Row count now 6; all existing content, reading rules, standing note, and discovery notes preserved untouched (no schema redesign; the pre-existing D1 link typo also left as-is).
3. Exact decision IDs recorded: RD-DISC → 0005-decision-discovery.md, RD-AUTH → 0006-decision-authority-and-precedence.md. No new identifier scheme created; mapping follows the existing sequence 0001–0004 as instructed — no convention conflict detected, so no stop was triggered.
4. Both Accepted: confirmed — both record fields show Status | Accepted, explicitly marked human-specified in these instructions (unlike HD-1/HD-2's flagged precedents); both identify the human project owner as decider and contain "the agent is recording the decision, not making it". Content checks also confirmed: approved option A (AGENTS.md as future pointer location, both targets) and approved option B (the six-rule minimum authority rule, quoted), the Experiment 06/PROV-GIT → GP1 → Exp10 motivating example recorded verbatim in §3, "supersedes no record" stated in both, and unresolved items (lifecycle/supersession/amendment/retention/ADR-vs-ADR conflict resolution/wording/placement) explicitly marked as not decided.
5. Metadata ambiguities (flagged, not silently resolved):
- AMB-D1/AMB-R1 — option labels "A"/"B" as communicated in the approval; their mapping to Experiment 12's option tables is not established in-repo (content itself fully established by the human's descriptions).
- AMB-D2/AMB-R4 — identifier scheme: RD-* is a fourth prefix; file pairings by task instruction; no scheme normalized.
- AMB-D4 (0005) / date basis in 0006 §1 — decider gave no date string; recorded 2026-10-08 from session evidence as §9 authorizes (environment clock verified: Thu Oct 8 15:01:48 CEST 2026), date-level.
- AMB-D3 — INDEX discovery note still calls the pointer an "open decision" (now decided-but-unimplemented); note not modified (authorization covers count + rows only).
- AMB-R2 — "later" in rule 5 would rely on date-level ordering; no ordering framework invented. AMB-R3 — AGENTS.md compatibility-maintenance mechanism not established. AMB-R5 — INDEX reading rule 3 tension reported, not edited.
6. Verification result: all pass. Exactly the three allowed paths changed (M INDEX.md, ?? 0005, ?? 0006); no previous ADR changed (0001 5f9deeb4…, 0002 04af7636…, 0003 a7b53e6a…, 0004 f7ec871c… all match baseline); AGENTS.md 7355a77e… unchanged and still contains 0 docs/decisions matches (pointers NOT implemented, as required); all 6 reports + 13 prompts unchanged (including experiment-13-prompt.md 67fdae99… — no human-concurrent change this time); pre-existing untracked reports 11/12 match baselines (c15fdbd7…/d54ab9bd…).
7. Final Git state: HEAD a4653b96b60e0c6fe258aadf2ac008370a308c43 · 3 commits (log unchanged) · 1 tracked file modified (INDEX, authorized) · 0 staged · 0 stash · origin/main = ls-remote = 5fd9f54… (no push) · 7 untracked (2 new ADRs + 5 pre-existing: Exp11/12 reports, prompts 11/12/13).
8. No implementation, staging, commit, or push occurred: confirmed — AGENTS.md untouched (RD-DISC recorded ✓ / implemented ✗; RD-AUTH recorded ✓ / wired into AGENTS.md ✗), no experiment file, README, .gitignore, config, or history touched; git diff --cached empty; HEAD and remote refs unchanged.
STOP — no repair, no AGENTS.md edit, no Experiment 14, no commit, no push.