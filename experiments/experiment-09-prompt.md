We are continuing the Harness Engineering course project.

Experiments 07 and 08 are complete.

Two human decisions have now been made to close the remaining decisions identified by Experiment 08.

## HD-1 — Experiment prompt files

Human decision:

Each `experiment-XX-prompt.md` file contains the prompt passed to the LLM for that experiment and the response produced by the LLM. These files are static historical records of the process and do not change once created.

Therefore:

**Experiment prompt files are project/harness artifacts and fall within GP1's scope. They must be version-controlled.**

Do not expand this into a broader rule about every possible prompt, transcript, chat export, or temporary interaction artifact. The decision concerns the existing `experiment-XX-prompt.md` artifact class.

## HD-2 — Git commit authority

Human decision:

**Both the agent and the human user may create Git commits.**

Additional constraint:

**If the agent wants to create a commit, it must first explicitly state that it wants to commit and explain why.**

The agent must not create a commit silently.

Do not expand this into additional Git policy concerning:

* branch strategy;
* commit message format;
* commit frequency;
* pull requests;
* release tags;
* CI;
* force pushes;
* rebasing;
* merge policy.

Those remain unresolved unless already established elsewhere.

---

# Task

Record HD-1 and HD-2 formally using the already-established ADR-per-decision plus index mechanism.

Do not execute GP1 yet.

Do not stage anything.

Do not commit anything.

Do not modify application code.

---

# Read first

Read:

* `AGENTS.md`
* `docs/decisions/0001-decision-recording-mechanism.md`
* `docs/decisions/0002-harness-artifact-persistence.md`
* `docs/decisions/INDEX.md`
* `experiments/08-gp1-artifact-scope-analysis.md`
* the relevant Experiment 08 prompt file
* current repository state

Use the existing ADR structure and conventions. Do not redesign them.

---

# Files authorized

Create exactly two new ADR files:

1. `docs/decisions/0003-experiment-prompt-artifacts.md`
2. `docs/decisions/0004-git-commit-authority.md`

Modify:

3. `docs/decisions/INDEX.md`

No other file may be modified.

Do not modify existing ADRs.

Do not modify experiment reports or prompts.

---

# ADR 0003 requirements

Record HD-1 faithfully.

The ADR must establish:

* experiment prompt files are static historical records;
* they contain the prompt and the LLM response for the experiment;
* the existing `experiment-XX-prompt.md` class is project/harness material;
* it falls under GP1;
* these files must therefore be version-controlled.

Explicitly state the boundary:

This decision does not automatically classify arbitrary prompts, chat transcripts, temporary notes, or other interaction artifacts as project artifacts.

---

# ADR 0004 requirements

Record HD-2 faithfully.

The ADR must establish:

* both the human user and the agent may create Git commits;
* an agent must announce its intention to commit before doing so;
* the agent must explain why it wants to commit;
* silent agent commits are not permitted.

Explicitly state that this decision does NOT establish:

* branch policy;
* commit-message conventions;
* commit frequency;
* PR policy;
* merge policy;
* release policy;
* force-push policy;
* general Git workflow.

---

# Authority

Both decisions were made by the human project owner.

The ADRs must distinguish:

* human decision;
* agent recording;
* analysis-derived consequences.

Do not invent rationale.

If the human did not provide a rationale, record that fact rather than manufacturing one.

---

# Dates and status

Follow the existing D1/GP1 ADR convention.

If a status or date is inferred rather than explicitly supplied by the human, mark that distinction clearly as the previous ADRs do.

Do not silently invent a communication date.

---

# INDEX

Update `docs/decisions/INDEX.md` to include:

* HD-1 / ADR 0003
* HD-2 / ADR 0004

Retain D1 and GP1.

Do not redesign the index.

Do not change unrelated existing text.

---

# Verification

Before finishing:

1. Verify exactly two new ADR files were created.
2. Verify INDEX changed only to add the two decisions and the minimum necessary count/index information.
3. Verify D1 and GP1 ADRs are unchanged.
4. Verify all experiment files are unchanged.
5. Verify AGENTS.md is unchanged.
6. Verify nothing is staged.
7. Verify no commit was created.
8. Verify no push occurred.
9. Verify no application code was changed.
10. Verify the final Git state exactly.
11. Report any ambiguity that remains.

The purpose of this task is ONLY to record HD-1 and HD-2.

Do not execute GP1.

Do not stage files.

Do not commit.

Do not push.


Response:

All verification checks pass. Here is the report.
What was done
Created exactly two files (as authorized):
1. docs/decisions/0003-experiment-prompt-artifacts.md (HD-1, 187 lines)
2. docs/decisions/0004-git-commit-authority.md (HD-2, 198 lines)
Modified exactly one file (as authorized):
3. docs/decisions/INDEX.md — two changes only: decision count two→four, and the added HD-1/HD-2 rows (50 → 52 lines). D1 and GP1 rows byte-identical; standing note untouched.
Both ADRs follow the existing D1/GP1 structure verbatim (10 sections, Fact/Observation/Interpretation/Recommendation labels, local ambiguity IDs AMB-P1–P7 / AMB-A1–A7).
Key recording choices (all flagged inside the ADRs)
- HD-1 (ADR 0003) records verbatim: the decider's premise ("static historical records… do not change once created") + "Therefore: … must be version-controlled", plus the explicit boundary that arbitrary prompts/transcripts/temporary notes/chat exports are not automatically classified. §3.1 point 4 carries the required non-expansion statement. The premise-and-therefore structure is the decider's supplied basis; nothing beyond it was manufactured.
- HD-2 (ADR 0004) records verbatim: both parties may commit; agent must state intent + explain why first; silent agent commits not permitted. §3/§3.1 explicitly list what it does NOT establish (branch, message, frequency, PR, merge, release, force-push, general Git workflow), plus the decider's fuller non-expansion list (CI, rebase, etc.). Recorded that no rationale was supplied for HD-2.
- Authority split is explicit in both: human decision (§3, verbatim) vs. agent recording (§3.1 points 1–2) vs. analysis-derived consequences (§5.2, labelled Interpretation).
- Status/date: no status string or date was communicated by the human. Accepted is marked as precedent-based interpretation (not verbatim); 2026-10-08 is marked as environment-verified (Thu Oct 8 08:08:19 CEST 2026), not a human-stated communication date.
Verification (all 11 items)
 1. Exactly two new files — docs/decisions/ now holds 0001, 0002, 0003, 0004, INDEX.md; working tree shows exactly the two new untracked ADR paths.
 2. INDEX change is minimal — full content diffed against the pre-task original: only count + two rows.
 3. D1/GP1 unchanged — 5f9deeb4…, 04af7636… match baseline.
 4. All experiment files unchanged — all 6 reports and 8 pre-existing prompts match baseline checksums. One documented human-concurrent change: experiments/experiment-09-prompt.md went from empty (d41d8cd9…) to 4,736 B (d551d9d2…) during the task — it contains this task's verbatim prompt; I never wrote to it (recorded in both ADRs' §10).
 5. AGENTS.md unchanged — 7355a77e….
 6. Nothing staged — git diff --cached empty, git ls-files -m empty, .git/index mtime still Oct 6 08:31.
 7. No commit — HEAD 5fd9f54…, commit count still 2.
 8. No push — origin/main = 5fd9f54… = local HEAD; stash empty.
 9. No application code changed — src/ still empty; no code files exist or were created.
10. Final Git state: HEAD 5fd9f5437bd27276dbaec511f86e31daa3dc36b0; 2 commits; 6 tracked; 20 untracked paths (18 pre-existing + my 2 ADRs); 0 staged; 0 tracked files modified.
11. GP1 not executed — nothing staged, committed, or pushed; recording remains separate from execution (§3.1 of both ADRs).
Ambiguities that remain (reported, not resolved)
- AMB-P1/P2, AMB-A1/A2: status and date for HD-1/HD-2 were not communicated by the human; Accepted/2026-10-08 are flagged interpretations/environment facts. The INDEX standing note ("reproduced exactly as communicated by the decider") now sits in tension with these two rows — note left unchanged (change authorized only to add rows/count); flagged as AMB-P6/AMB-A7.
- AMB-P4: whether experiment-XX-prompt.md files created after this decision are automatically covered is not explicitly stated (class wording vs. "the existing class").
- AMB-A4: whether the agent's announcement must be followed by human approval/waiting before committing is not stated — no default invented; a future agent in doubt must ask.
- AMB-A5: Experiment 08's HD-2 question also asked when / scope / message convention — HD-2 answers only "who" + announcement; those remain open (Exp02 H10).
- AMB-P3/AMB-A3: identifier scheme (HD-1↔0003, HD-2↔0004) still ungoverned (D2/D7 open).
- Pre-existing, untouched: INDEX line 24's D1 link target contains a typo (…recording_mechanism.md) carried from before this task; left as-is under change discipline.