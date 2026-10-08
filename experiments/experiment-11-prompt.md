We are continuing the Harness Engineering course project.

The previous experiment executed GP1.

Current local repository state:

* HEAD: `a4653b96b60e0c6fe258aadf2ac008370a308c43`
* Commit message: `chore: execute GP1 — version-control project/harness artifacts`
* Working tree: clean
* 27 tracked files
* No untracked files
* No staged files
* GP1 has been executed locally.
* No push has been performed.
* `origin/main` remains at the previous commit.

This experiment is READ-ONLY.

Do not modify the repository under test.
Do not create commits.
Do not push.
Do not modify any project file.

---

# Objective

Test whether the project's harness knowledge is actually recoverable from the Git-versioned repository state represented by commit `a4653b9`.

The experiment must simulate a future agent/session that has:

* the repository;
* its Git history;
* no access to the current conversation;
* no reliance on prior conversational knowledge.

The central question is:

> Can a fresh agent recover the important decisions, experiment history, and current harness state from the versioned repository alone?

This is a persistence/discoverability experiment.

It is NOT yet a harness-repair experiment.

---

# Important distinction

Test two separate properties:

## P1 — Persistence

Are the artifacts present in the committed repository?

## P2 — Discoverability

Can an agent reasonably discover the relevant artifacts without being told their exact paths?

A repository can satisfy P1 while failing P2.

Do not treat "the file exists" as proof that the harness is discoverable.

---

# Simulation rules

Start from the committed repository state.

Do NOT use:

* this conversation;
* previous agent responses;
* assumptions about file locations from previous experiments;
* the task prompt's explicit paths as discovery instructions.

The paths in this prompt are context for identifying the experiment target, not discovery hints for the simulated agent.

You may use normal repository exploration mechanisms such as:

* `pwd`
* `ls`
* `find`
* `git status`
* `git log`
* `git ls-files`
* `git show`
* searching file contents.

However, when testing discoverability, record how you chose what to inspect.

---

# Phase 1 — Persistence

Verify that the committed tree contains the expected historical/project artifacts.

At minimum establish whether the committed repository contains:

* decision records;
* decision index;
* experiment reports;
* experiment prompt files;
* original project scaffold.

Verify using Git itself, not merely the current working tree.

Useful evidence includes:

* `git ls-tree`;
* `git ls-files`;
* `git show`;
* commit metadata.

Do not modify anything.

---

# Phase 2 — Fresh-agent discovery

Now deliberately act as if you know only:

> "This is the Harness Engineering course repository. I need to understand the project's existing decisions and harness history before making changes."

Do NOT begin by opening `docs/decisions/`.

Do NOT begin by opening `experiments/`.

Do NOT use the filenames from this prompt as search targets.

Instead explore the repository from its root as a new agent would.

Record:

1. What did you inspect first?
2. What information did you obtain?
3. Did anything explicitly tell you where decisions are recorded?
4. Did anything explicitly tell you where experiments are recorded?
5. Could you discover the decision mechanism?
6. Could you discover the experiment history?
7. Could you identify the authoritative source for human decisions?
8. Could you determine the current unresolved governance issues?
9. How many exploratory steps were required?

Do not optimize the search retrospectively.

The goal is to observe the current harness, not to demonstrate that a skilled investigator can eventually find files.

---

# Phase 3 — Decision consumption

Using only information discoverable from the repository, attempt to answer:

### Q1

What is the project's decision-recording mechanism?

### Q2

What human decisions are currently recorded?

At minimum identify:

* D1
* GP1
* HD-1
* HD-2

### Q3

What does GP1 require?

### Q4

What does HD-1 establish?

### Q5

What does HD-2 establish?

### Q6

What important governance questions remain unresolved?

Do not use conversational knowledge to fill gaps.

For every answer classify it as:

* Fact
* Observation
* Interpretation
* Open question

---

# Phase 4 — Fresh-clone thought experiment

Do NOT actually clone or modify the project unless a safe temporary location outside the repository is required and can be used without modifying the project.

Determine:

> If another machine cloned commit `a4653b9`, what would it have?

And:

> What would it still not know without inspecting the repository deeply?

Also distinguish:

* persistence failure;
* discoverability failure;
* governance/schema failure.

---

# Phase 5 — Failure analysis

Determine whether the current harness has any of these properties:

### F1

An authoritative pointer telling agents where decision records live.

### F2

An authoritative pointer telling agents where experiment history lives.

### F3

A documented rule telling agents which decision records are authoritative.

### F4

A documented rule telling agents how decision records relate to AGENTS.md.

### F5

A documented mechanism for discovering unresolved decisions.

### F6

A documented artifact-scope rule for future harness artifacts.

### F7

A documented Git persistence rule.

For each, classify:

* Present
* Partially present
* Absent

Cite the repository evidence supporting the classification.

---

# Phase 6 — Compare with previous findings

Compare the fresh-clone results against the previous experiment findings, especially:

* Experiment 05 — Decision Consumption
* Experiment 06 — Decision Specification
* Experiment 08 — GP1 Artifact Scope Analysis
* Experiment 09 — HD-1 / HD-2 recording
* Experiment 10 — GP1 execution

Determine:

* which previous findings were confirmed;
* which were invalidated;
* which remain unresolved;
* whether GP1 execution actually improved persistence;
* whether GP1 execution improved discoverability.

Do not assume the answer.

---

# Required output

Create exactly one new file:

`experiments/11-fresh-clone-persistence.md`

Do not modify any other file.

Do not modify:

* AGENTS.md
* README.md
* INITIAL_PROMPT.md
* docs/*
* existing experiments/*
* .gitignore
* src/*

Do not commit the new experiment report.

The experiment report itself must remain uncommitted until a later authorized action.

---

# Required report structure

Use exactly these sections, in this order:

1. Objective
2. Simulation boundary
3. Repository state under test
4. Persistence verification
5. Fresh-agent discovery procedure
6. Discovery observations
7. Decision consumption results
8. Fresh-clone thought experiment
9. Failure analysis
10. Comparison with previous experiments
11. What GP1 fixed
12. What GP1 did not fix
13. Harness observations
14. Recommendations
15. Result
16. Lessons learned
17. Human decisions required
18. Verification

Use these labels consistently:

* Fact
* Observation
* Interpretation
* Recommendation
* Open question
* Human decision

Do not present recommendations as decisions.

---

# Critical methodological constraint

Do NOT modify the harness to make this experiment pass.

If discoverability fails, that failure is the result.

The next phase may repair the harness, but Experiment 11 must measure the current state.

---

# Verification

Before finishing:

1. Verify exactly one new file was created.
2. Verify no existing project file was modified.
3. Verify no files were staged.
4. Verify no commit was created.
5. Verify no push occurred.
6. Verify the tested commit is `a4653b9`.
7. Verify the working tree state.
8. Verify the report accurately distinguishes persistence from discoverability.
9. Verify no conclusion depends on the current conversation.
10. Report the exact final Git state.

STOP after producing the Experiment 11 report.

Response:

Experiment 11 complete. Report created: experiments/11-fresh-clone-persistence.md (398 lines, 18 required sections in exact order). STOP — no further action taken.
Headline results
Central question — Can a fresh agent recover decisions, experiment history, and harness state from the versioned repository alone? → Yes for the committed state, but findable-while-unguided.
Property	Verdict	Evidence
P1 — Persistence	PASS	git ls-tree/git show on a4653b9: 27/27 files — 4 ADRs, index, 6 reports, 10 prompts, 6 scaffold; git fsck clean; content verified in the object store, not the worktree
P2 — Discoverability	PARTIAL	11 recorded steps (root → README → AGENTS.md → … → index); 5 of the first 6 steps produced zero pointers; discovery succeeded only via directory naming and git log --stat. F1/F2 (pointers) = Absent; F3/F5/F6 = Partial; F4 = Absent; F7 = Present
Notable findings
- Declared contamination (§2): I cannot forget prior paths — so P2 is reported as an upper bound, every conclusion cites committed files, and a true external fresh-session clone test is left as an open recommendation.
- Two live failures captured: (a) origin still serves 5fd9f54 — for remote clones P1 still fails (Exp05 FM2 is only fixed locally; push policy is undecided in every record); (b) first concrete stale open-list: Exp06 L474 still marks PROV-GIT "OPEN" though GP1 is decided + executed — no records-vs-reports precedence rule exists.
- GP1 impact: persistence materially improved (FM2/Q2/MM2 invalidated locally); discoverability structurally unchanged — D4's pointer gap, known since D1, still fails its first independent test.
- Flow, not state: two new in-scope artifacts appeared during the experiment (your experiment-11-prompt.md, plus this report) — both left uncommitted by design; GP1 is a standing obligation with no cadence policy yet.
- 6 Recommendations (R1–R6) marked unapproved; 6 proposed human decisions (HD-5…HD-10, provisional labels) — none decided here.
Verification (all 10 ✓)
1. Exactly one new file (only ?? 11-fresh-clone-persistence.md + your ?? experiment-11-prompt.md) ✓ 2. No existing file modified (git diff HEAD empty; all checksums match baselines) ✓ 3. Nothing staged ✓ 4. No commit (3 commits) ✓ 5. No push (ls-remote origin → 5fd9f54, unchanged) ✓ 6. Tested commit = a4653b9 ✓ 7. Tree state verified ✓ 8. P1/P2 separated throughout (§4 vs §5–6, §9, §15) ✓ 9. All answers cite repository content; contamination declared rather than used as evidence ✓ 10. Final state:
HEAD a4653b96b60e0c6fe258aadf2ac008370a308c43 · 3 commits · 27 tracked (clean) · 0 staged · 0 modified · 2 untracked (1 human + this report) · stash empty · origin/main = 5fd9f54… (remote one commit behind; no push).