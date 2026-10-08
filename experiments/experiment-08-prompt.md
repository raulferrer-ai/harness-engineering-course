We are continuing the Harness Engineering course project.

## Context

GP1 has been explicitly decided by the human project owner and recorded in:

* `docs/decisions/0002-harness-artifact-persistence.md`

GP1 states:

> "las decisiones, experimentos y demás artefactos del harness que deban formar parte del proyecto deben quedar versionados en Git."

Experiment 07 recorded GP1 but deliberately did not execute it.

The current repository therefore still contains a durability gap:

* decision records are untracked;
* experiment reports are untracked;
* experiment prompt files may also be untracked;
* the repository's existing tracked history predates the experiments;
* no Git commit should be created by this experiment.

The purpose of this experiment is to determine the **current artifact scope** implied by GP1.

This is an analysis experiment, not an implementation task.

---

# Primary objective

Analyze the repository and classify the artifacts that currently exist according to whether they:

1. clearly belong to the project and therefore fall under GP1;
2. clearly do not belong to the project;
3. are ambiguous and require a human decision;
4. are generated/transient artifacts that should not be versioned;
5. require a separate governance decision before being classified.

Do NOT resolve ambiguous cases yourself.

The output must make the next human decision as small and precise as possible.

---

# Read first

Read:

* `AGENTS.md`
* `docs/decisions/0001-decision-recording-mechanism.md`
* `docs/decisions/0002-harness-artifact-persistence.md`
* `docs/decisions/INDEX.md`
* `experiments/01-repository-exploration-and-decision-gate.md`
* `experiments/02-decision-analysis.md`
* `experiments/03-decision-closure-analysis.md`
* `experiments/04-decision-closure.md` if present
* `experiments/05-decision-consumption.md`
* `experiments/06-decision-specification.md`
* all existing experiment prompt/report files relevant to the current harness
* `.gitignore`
* `README.md`
* `docs/vision.md`
* `docs/architecture.md`

Also inspect the complete repository tree and current Git state.

Do not rely on conversational context to determine the artifact set.

---

# Important authority boundary

GP1 is already decided.

You may NOT:

* reinterpret GP1;
* narrow GP1;
* expand GP1;
* decide which ambiguous artifacts belong to the project;
* create a new Git policy;
* decide commit frequency;
* decide branch strategy;
* decide commit-message conventions;
* decide staging policy;
* decide whether the agent may commit;
* decide whether experiment prompts must be versioned;
* decide retention rules for historical experiment artifacts.

Those are separate decisions unless already explicitly established by existing project records.

You may analyze and make recommendations, but recommendations are NOT decisions.

---

# Required analysis

## 1. Complete artifact inventory

Produce an inventory of the relevant current repository artifacts.

At minimum inspect:

* root-level project files;
* `AGENTS.md`;
* `INITIAL_PROMPT.md`;
* `README.md`;
* `docs/`;
* `docs/decisions/`;
* `experiments/`;
* `src/`;
* `.gitignore`;
* any other files currently present.

For each artifact identify:

* path;
* current Git state: tracked / untracked / ignored;
* apparent role;
* whether it is generated or source-authored;
* whether it contains project knowledge;
* whether it is part of the harness;
* whether GP1 clearly applies;
* confidence;
* unresolved question, if any.

Do not modify files while performing this inventory.

---

# 2. Classification

Use explicit classifications.

Recommended vocabulary:

### A — Clearly in scope

Evidence indicates the artifact is part of the project and GP1 clearly applies.

### B — Clearly out of scope

Evidence indicates the artifact is transient, generated, personal working material, or otherwise not part of the project.

### C — Human decision required

The artifact may reasonably be considered project/harness material, but existing evidence does not authorize the agent to decide.

### D — Existing Git policy / separate governance issue

The artifact's inclusion cannot be determined from GP1 alone because another policy or governance decision is required.

Do not force every file into A/B if the evidence does not support it.

---

# 3. Distinguish artifact identity from Git execution

Explicitly separate these questions:

1. "Does this artifact belong to the project?"
2. "Does GP1 require it to be version-controlled?"
3. "Should it be committed now?"
4. "How should it be committed?"

The first two are the subject of this experiment.

The last two are NOT to be decided here unless an existing human decision already establishes them.

---

# 4. Analyze experiment artifacts

Pay particular attention to:

* `experiments/01-*`
* `experiments/02-*`
* `experiments/03-*`
* `experiments/04-*`
* `experiments/05-*`
* `experiments/06-*`
* `experiments/07-*`
* experiment prompt files
* experiment reports

Determine whether existing project evidence establishes that:

* reports are project artifacts;
* prompts are project artifacts;
* both are project artifacts;
* one category is clearly project material and the other is ambiguous.

Do not infer the answer solely from the fact that the files are useful.

---

# 5. Analyze decision artifacts

Determine what existing evidence establishes about:

* ADRs;
* `INDEX.md`;
* decision analysis;
* decision specifications;
* future decision records.

At minimum distinguish:

* decision records themselves;
* supporting analysis;
* indexes;
* temporary working notes.

Again, classify rather than silently decide.

---

# 6. Analyze existing tracked files

Inspect the initial Git history and determine:

* which files were originally versioned;
* what that reveals about the project's original artifact boundary;
* whether that historical state is evidence of current scope or merely historical state.

Do NOT treat the original commit as automatically defining the current scope.

---

# 7. Analyze `.gitignore`

Determine:

* what categories are currently ignored;
* whether any current harness/project artifact is accidentally covered;
* whether `.gitignore` contains evidence relevant to scope;
* whether changing `.gitignore` would require a separate decision.

Do not modify `.gitignore`.

---

# 8. Human decision matrix

Produce a concise decision matrix for every C/D classification.

For each unresolved item include:

* question;
* relevant evidence;
* candidate interpretations;
* consequence of each interpretation;
* recommended decision;
* whether the recommendation is safe to delegate to the agent or requires the human.

Do not make the decision.

---

# 9. Minimum human decision set

The experiment must identify the smallest set of human decisions required before GP1 can be executed for the current repository.

Avoid asking the human questions that are already resolved by GP1 or earlier decisions.

The output should distinguish:

* already decided;
* derivable from evidence;
* genuinely unresolved.

---

# 10. Harness implications

Analyze whether the current repository has a mechanism for future agents to determine:

> "Which artifacts are project artifacts and therefore subject to GP1?"

If no such mechanism exists, describe the gap.

Do not implement the mechanism in this experiment.

---

# 11. Required output file

Create exactly one new file:

`experiments/08-gp1-artifact-scope-analysis.md`

Do not create or modify any other file.

Do not modify:

* `AGENTS.md`
* `INITIAL_PROMPT.md`
* `README.md`
* `docs/vision.md`
* `docs/architecture.md`
* `docs/decisions/*`
* existing experiment files
* `.gitignore`
* `src/*`

---

# Required structure of the report

The report must contain these sections, in this order:

1. Objective
2. Problem statement
3. Evidence and repository state
4. Artifact inventory
5. Classification model
6. Clearly in-scope artifacts
7. Clearly out-of-scope artifacts
8. Human-decision-required artifacts
9. Git-policy-dependent artifacts
10. Experiment artifact analysis
11. Decision artifact analysis
12. Existing Git boundary analysis
13. `.gitignore` analysis
14. Human decision matrix
15. Minimum human decision set
16. Harness gap analysis
17. Recommendations
18. Result
19. Lessons learned
20. Human decisions required
21. Verification

Use the following labels consistently where appropriate:

* **Fact**
* **Observation**
* **Interpretation**
* **Recommendation**
* **Open question**
* **Human decision**

Do not present recommendations as decisions.

---

# Verification

Before finishing:

1. Verify exactly one new file was created.
2. Verify no existing file was modified.
3. Verify no files were staged.
4. Verify no commit was created.
5. Verify no push occurred.
6. Verify application code was untouched.
7. Verify the report's inventory matches the actual repository state.
8. Verify every human decision request is genuinely unresolved.
9. Verify GP1 itself was not silently expanded or narrowed.
10. Report the exact final Git state:

* HEAD;
* commit count;
* tracked/untracked state;
* staged state;
* modified files.

The purpose of Experiment 08 is analysis only.

Do not execute GP1.

Do not commit anything.
Do not stage anything.
Do not "clean up" unrelated files.
Do not fix existing ambiguities.
Do not modify the harness rules.
Do not select the website technology stack.


Resposne:

Experiment 08 complete
File created (exactly one)
experiments/08-gp1-artifact-scope-analysis.md    (472 lines, 50,363 B, MD5 eca8c1dd…)
All 21 required sections present in exact order (Objective → … → Verification).
Analysis outcome
Classification of the 23-file repository (6 tracked + 16 untracked + this report):
Class	Count	Contents
A — clearly in scope	15	6 tracked scaffold files (already versioned); 3 decision files (GP1 names "decisiones"; INDEX via D1's mechanism wording); 6 experiment reports (GP1 names "experimentos" + four independent anchors: AGENTS.md §Documentation, INDEX line 36, the GP1 ADR's own citations, §Purpose)
B — clearly out of scope	0	No transient/generated/personal artifacts exist yet — recorded as a finding, not an omission
C — human decision required	8	All experiment prompt files — the task explicitly reserves prompt versioning to you
D — policy-dependent	0 identities	Applies to execution/future matters only: D-1 commit policy, D-2 future src/ code, D-3 conditional .gitignore change
Key structural findings:
- Identity vs. execution cleanly separated — every A-class identity is derivable from GP1's wording + recorded anchors; every execution question is GP1 non-scope.
- Minimum human decision set = exactly 2: HD-1 (prompt classification — answer first, it changes HD-2's file set) → HD-2 (who commits/when/scope/messages — Exp02 H10 open). HD-4 (ignore-vs-untracked) is conditional on HD-1 excluding files. Everything else is already decided or evidence-derivable — no other question is asked of you.
- Harness gap (§16), described not implemented: no mechanism exists for future agents to determine GP1's artifact scope — two layers: (1) no authoritative scope record (GP1 deliberately doesn't enumerate, AMB-G4); (2) no AGENTS.md pointer (Exp05 FM1), so even the GP1 record may go undiscovered. R2/R3 recommend closing these via a new decision record + the D4 pointer — both human-directed, nothing created.
- Recommendations R1–R5 are explicitly unapproved; no classification binds until you confirm it (INDEX reading rule 2 does the work).
Verification (task items 1–10)
 1. Exactly one new file — find -newermt + git status confirm it.
 2. No existing file modified — all protected checksums identical to baseline (AGENTS 7355a77e…, D1 5f9deeb4…, GP1 ADR 04af7636…, INDEX 06d3a538…, all reports/prompts/.gitignore). Documented exception: experiment-08-prompt.md changed by you mid-task (0 → 9,404 B, d41d8cd9… → 6456963b…) — I never wrote to it; it holds this task's verbatim prompt + unfilled Resposne: marker.
 3. Nothing staged — git diff --cached empty; .git/index mtime still 08:31:51.
 4. No commit — HEAD 5fd9f54, count still 2.
 5. No push — origin is configured (github.com/raulferrer-ai/harness-engineering-course.git); origin/main = 5fd9f54 = local HEAD, ref dated 08:31 (pre-experiments); nothing staged/committed that could be pushed.
 6. Application code untouched — src/ still empty; repo = Markdown + .gitignore only.
 7. Inventory matches repo state — §4's 23 rows reconcile exactly with final git status (6 tracked + 17 untracked).
 8. All HD requests genuinely unresolved — HD-1 (task-reserved; no record classifies prompts), HD-2 (GP1 non-scope; H10 open), HD-4 (conditional); none duplicates GP1/D1.
 9. GP1 not expanded/narrowed — Spanish wording reproduced verbatim in §2/§17; classifications derive only from GP1's own words + D1 + AGENTS.md; forbidden strengthening claims appear only as things being avoided.
10. Final Git state: HEAD 5fd9f54…; 2 commits; 6 tracked / 17 untracked; 0 staged; 0 agent-modified (1 human-modified during task: exp08-prompt, documented); stash empty; no ignored files.
Transparency note — one in-flight correction
Verification caught an unsupported claim in my own first draft of §21 item 5: I had written "no remote configured" without checking. git remote -v shows origin is configured. The no-push conclusion was and is correct (evidence above), but the stated reason was wrong; I corrected the item in place and recorded the failure inside the report itself — a negative claim needs evidence exactly like a positive one.
Result
PASSED WITH QUALIFICATIONS — qualifications: (Q1) inventory is a snapshot raced by your concurrent exp08-prompt write; (Q2) prompt sub-kinding (a)–(d) is agent interpretation offered as evidence for HD-1; (Q3) INDEX.md's Class A is a high-confidence inference from D1's wording, cheaply overridable; (Q4) all classifications/recommendations remain analysis until confirmed.
Awaiting you: HD-1 (are experiment prompt files project material under GP1?) and then HD-2 (execution policy). Nothing was executed, staged, or committed.