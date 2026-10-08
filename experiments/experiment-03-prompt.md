We are starting Experiment 03 of the Harness Engineering course project.

The purpose of this experiment is to investigate how human decisions should be recorded and made available to future agent sessions.

Read:

* AGENTS.md
* experiments/01-repository-exploration-and-decision-gate.md
* experiments/02-decision-analysis.md
* the current repository structure

Do not modify any existing file.

Do not create application code.

Do not select the website technology stack.

Do not make any product or architectural decision.

The problem to investigate is:

The current harness can identify unresolved decisions and can analyze them without making them, but there is currently no defined mechanism for formally closing a human decision and making the resulting decision reliably consumable by future agent sessions.

Analyze this problem.

Determine:

1. What information a recorded decision must contain for an agent to reliably use it.
2. What information should NOT be recorded as if it were a decision.
3. How a future agent should distinguish:

   * an active decision;
   * a resolved decision;
   * an obsolete decision;
   * an observation;
   * a requirement;
   * an experiment result.
4. What risks exist if decisions remain only in conversation.
5. What risks exist if decisions are recorded incorrectly or ambiguously.
6. What possible repository mechanisms could support decision closure.
7. The trade-offs between those mechanisms.
8. What the minimum viable decision-recording mechanism would be for this project.
9. What properties the mechanism should have if the repository is intended to be a long-lived educational example.
10. How a future agent should discover and consume recorded decisions before implementing a task.

Do NOT choose the mechanism.

Present possible mechanisms as alternatives and explain their trade-offs.

Do not modify:

* AGENTS.md
* README.md
* docs/
* src/
* existing experiments

Create exactly one file:

experiments/03-decision-closure-analysis.md

The document must contain:

1. Objective
2. Problem statement
3. Required properties
4. Information model
5. Candidate mechanisms
6. Trade-offs
7. Agent consumption model
8. Failure modes
9. Minimum viable mechanism
10. Harness observations
11. Result
12. Lessons learned
13. Human decisions required

Clearly distinguish:

* Fact
* Observation
* Interpretation
* Recommendation

Recommendations must not be presented as decisions.

Before finishing:

* inspect the Git working tree;
* inspect the diff;
* verify that exactly one new file was created by you;
* verify that no existing file was modified;
* do not commit or push anything.

The goal of this experiment is analysis, not implementation.


Response: 

Experiment 03 complete
File created (exactly one)
experiments/03-decision-closure-analysis.md    (41,128 bytes, 431 lines)
All 13 required sections present, in order: Objective · Problem statement · Required properties · Information model · Candidate mechanisms · Trade-offs · Agent consumption model · Failure modes · Minimum viable mechanism · Harness observations · Result · Lessons learned · Human decisions required — with Fact / Observation / Interpretation / Recommendation labels applied throughout.
Analysis delivered (all 10 questions, no mechanism chosen)
Question	Where answered	Substance
1. Required record content	§4.1	8 core fields (id, title, status, statement, decided_by, decided_on, scope, supersession links) + 6 supporting (rationale, source analysis, consequences, revisit conditions, enforcement hook, affected work)
2. What must NOT be a decision	§4.2	11 exclusions: options, observations, requirements, results, open questions, assumptions (.gitignore case), hypotheticals, derived content, secrets, superseded text, agent unilateral calls
3. Distinguishing six kinds	§4.3	Classification table (modality/location/writer/binding) + 5-step agent procedure incl. precedence rule and fail-safe default
4. Conversation-only risks	§8.1	F1–F9 — F2 already realized once (Exp01 results)
5. Bad-recording risks	§8.2	G1–G13, each mapped to the guarding property; G1/G2/G10 flagged as trust-breaking
6. Candidate mechanisms	§5	M1–M8: log · ADR-per-file · ADR+index · registry · colocated-in-experiments · AGENTS.md · Git-native · external
7. Trade-offs	§6	Property matrix + 6 recurring axes; combinations noted as options
8. Minimum viable mechanism	§9	Spec MV1–MV6 (not a pick) + candidate-against-spec comparison; several satisfy it, none uniquely forced
9. Long-lived educational properties	§3.1	E1–E8: minimal tooling, human-legible first, diff-able, stable IDs, no lock-in, demonstrable by example, low ceremony, graceful degradation
10. Discovery/consumption	§7	Phases A–E: discover → validate → consume → write record first at the gate → verify & maintain; fail-safe if no pointer exists
Recommendations are labelled as options only (R-a/b/c in §13). Seven human decisions listed (D1–D7) — mechanism selection, information model, AGENTS.md precedence rule, discovery pointer, write/transition governance, backfill scope, retention policy — none decided here.
Notable finding (O4): the empty docs/decisions/ directory looks like an adopted convention but is only a fact — inferring intent from it would be exactly the assumption drift AGENTS.md §1 forbids. docs/decisions/ remains empty and untouched.
Verification performed
1. Working tree: git status --short --untracked-files=all → 6 untracked paths, all under experiments/; tracked clean.
2. Diff: git diff --stat empty, git diff --cached --stat empty, git ls-files -m empty → no tracked file modified.
3. Checksums vs. pre-write baseline — all 11 identical: AGENTS.md 7355a77e…, INITIAL_PROMPT.md e8ebf1f4…, README.md/docs/* d41d8cd9…, .gitignore 8f7a9110…, exp01 2e3b7abaf…, exp02 903b0565…, and all three prompt files (78443627…, 3a369e90…, f83d7e17…).
4. mtimes: every pre-existing file ≤ 12:22 (unchanged); find -newermt 12:23 returns only experiments/ (dir entry time) and my new file → exactly one file created by me.
5. No commit or push: HEAD still 5fd9f54, log still 2 commits, git stash list empty, .git/index mtime still 08:31:51, .git/refs/heads/main unchanged.
6. By instruction: no application code, no stack selected, no product/architectural decision, no changes to AGENTS.md, README.md, docs/, src/, or existing experiments.
Result recorded: PASSED — with qualifications that the model is untested (no real decision has been closed with it), the candidate set may be incomplete, and the specification encodes my reading of AGENTS.md for you to reweight.