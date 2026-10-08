# Experiment 11 — Fresh-clone Persistence and Discoverability

* Date: 2026-10-08
* Status: completed (READ-ONLY measurement — **no repair attempted; nothing staged; nothing committed; nothing pushed**)
* File created: `experiments/11-fresh-clone-persistence.md` (this document)

**Label legend:** **Fact** — directly established by the repository, its Git objects, or a recorded project document. **Observation** — a fact plus its immediate significance. **Interpretation** — an inference beyond the observed data. **Recommendation** — a proposed course of action that **still requires human approval**; decides nothing. **Open question** — a question existing evidence does not answer. **Human decision** — a question reserved to the human project owner; this document makes none of them.

**Standing disclaimer:** this experiment measures the harness as it exists in commit `a4653b9`. It deliberately does **not** modify `AGENTS.md`, any decision record, any experiment file, or any Git state to make any result look better. If discoverability fails, that failure is the result.

---

## 1. Objective

**Fact — what this experiment was intended to do:**

1. Test whether the project's harness knowledge (decisions, experiment history, current harness state) is recoverable from the **Git-versioned state of commit `a4653b9`** alone.
2. Test two properties separately:
   * **P1 — Persistence:** are the artifacts present in the committed repository?
   * **P2 — Discoverability:** can an agent reasonably find them without being told their exact paths?
3. Simulate a future agent with the repository, its history, and no conversational context; record the discovery procedure honestly.
4. Consume the recorded decisions (Q1–Q6) from repository evidence only.
5. Run a fresh-clone thought experiment, compare with Experiments 05/06/08/09/10, and classify harness gaps F1–F7.
6. Create exactly one output file and modify nothing else.

**Interpretation:** the experiment's value depends on reporting P1 and P2 separately — a passing P1 with a failing P2 would be invisible in any single blended verdict.

---

## 2. Simulation boundary

**Fact — what the simulated agent is allowed to use:** the working tree and Git history of this repository, standard exploration commands (`pwd`, `ls`, `find`, `git status`, `git log`, `git ls-files`, `git ls-tree`, `git show`, content search), and the task's neutral framing: *"This is the Harness Engineering course repository. I need to understand the project's existing decisions and harness history before making changes."*

**Fact — declared contamination (threat to validity, reported rather than hidden):**

1. This agent **cannot forget** prior conversation. It knows, from earlier sessions, that `docs/decisions/` and `experiments/` exist. A perfectly naive agent cannot be simulated by an agent that already knows the answers; pretending otherwise would be a false claim.
2. Mitigation actually applied: the Phase 2 exploration was executed as an explicit, pre-declared order starting at the repository root (never opening `docs/decisions/` or `experiments/` first), each step's choice rationale was recorded *as it happened* (§5), and **every conclusion in §7 is cited to specific repository content**, so no answer depends on conversational memory. The prompt's file paths were used only to identify the experiment target, not as discovery instructions.
3. What remains genuinely testable despite contamination: (a) whether any repository artifact *explicitly points* to the decision/experiment stores — verified mechanically by grep (§5, step S4); (b) whether the content needed for Q1–Q6 exists in the committed files — verified by citation; (c) how many steps the recorded procedure took.
4. What is **not** fully testable: the subjective experience of surprise of a truly naive agent — its search order would differ. **Open question:** a true fresh-clone test on a separate machine with a fresh model session would remove this contamination; this experiment did not perform one (Phase 4 is a thought experiment by instruction).

**Observation:** the contamination is asymmetric — it can only *hide* discoverability failures (a knowing agent finds things more easily), never create them. The reported P2 result is therefore an **upper bound** on true discoverability.

**Fact:** the read-only constraint was honored: no file was modified, no Git state changed, no clone was performed (Phase 4 is a thought experiment per instruction; no temporary location was needed).

---

## 3. Repository state under test

**Fact — state at experiment start (2026-10-08 08:33 CEST):**

| Item | Value |
|---|---|
| HEAD | `a4653b96b60e0c6fe258aadf2ac008370a308c43` (`a4653b9`) |
| Commit message | `chore: execute GP1 — version-control project/harness artifacts` |
| Commit metadata | Raúl <raul.ferrer.dev@gmail.com>, Thu Oct 8 08:25:09 2026 +0200; parent `5fd9f54` |
| Commit count | 3 (`5ed7b84` Init course → `5fd9f54` chore: init… → `a4653b9` execute GP1) |
| Tracked files | 27 |
| Staged files | 0 |
| Stash | empty |
| `origin/main` | `5fd9f54…` — **remote is one commit behind HEAD; no push performed** |
| Tracked worktree vs HEAD | identical (`git diff HEAD` empty; `git ls-files -m` empty) |

**Fact — divergence from the state described in the task prompt:** the task prompt stated "Working tree: clean; No untracked files." At inspection time the tree contained **one untracked file**: `experiments/experiment-11-prompt.md` (8,029 B, created 08:30 by the human — this task's own prompt file; the established, documented human-concurrent pattern, 10th occurrence). It was created *after* the prompt's state description and *before* this agent's first command.

**Observation:** this is itself data for P1/P2: in-scope artifacts (HD-1 class) reappeared **immediately after GP1's execution**, uncommitted. GP1's execution is a one-time act over a living artifact stream, not a steady state.

**Fact:** the experiment targets the committed state `a4653b9`; the untracked `experiment-11-prompt.md` is outside the test target (not in the commit) and was read only for identification, never modified.

---

## 4. Persistence verification (P1)

**Fact — verified from Git objects, not the working tree:**

| Expected category | Present in `a4653b9`? | Evidence (`git ls-tree -r HEAD`) |
|---|---|---|
| Decision records | **4/4** | `docs/decisions/0001…0004-*.md` |
| Decision index | **1/1** | `docs/decisions/INDEX.md` |
| Experiment reports | **6/6** | `experiments/01,02,03,05,06,08-*.md` (no `04/07/09/10` reports exist — by design; see §11) |
| Experiment prompt files | **10/10** | `experiments/experiment-01…10-prompt.md` |
| Original project scaffold | **6/6** | `.gitignore`, `AGENTS.md`, `INITIAL_PROMPT.md`, `README.md`, `docs/vision.md`, `docs/architecture.md` |
| **Total** | **27/27** | `git ls-files \| wc -l` → 27; root split: 4 root files + 7 `docs/` + 16 `experiments/` |

**Fact — content verified inside the object store (bypassing the worktree):**

* `git show HEAD:docs/decisions/INDEX.md` returns the four-decision table (D1, GP1, HD-1, HD-2 with statuses/dates/record links).
* `git show HEAD:docs/decisions/0002-harness-artifact-persistence.md` returns GP1's verbatim Spanish wording and English interpretation.
* `git cat-file -p HEAD` returns a valid commit (`tree 2f5147ae…`, parent `5fd9f54`); `git fsck --no-dangling` reports no errors.
* The GP1-execution commit itself shows 21 files changed, 5,304 insertions — the exact artifacts moved from untracked to versioned.

**Fact — P1 verdict for the committed state: PASS.** Every expected historical/project artifact category is present in commit `a4653b9`, readable without reference to the working tree.

**Observation — P1 has a boundary:** P1 holds *for this local repository*. The remote `origin` still serves `5fd9f54`, which **lacks all 16 experiment files and all 5 decision files** (verified: `git ls-remote origin` → `5fd9f54`). For a clone taken from the remote today, P1 would **FAIL**. See §8.

---

## 5. Fresh-agent discovery procedure (P2)

**Fact — the steps below were executed in exactly this order, each with the stated rationale:**

| Step | Action | Rationale recorded at the time | Obtained |
|---|---|---|---|
| **S1** | `pwd; ls -la` (repository root) | Standard orientation for any new agent | Root listing: `.gitignore`, `AGENTS.md` (7,099 B), `INITIAL_PROMPT.md`, `README.md` (**0 B — visible from size without opening**), `docs/`, `experiments/`, `src/` (empty) |
| **S2** | Read `README.md` | Convention: READMEs are the standard entry point | Empty (0 lines). **No onboarding, no pointers** |
| **S3** | Read `AGENTS.md` (292 lines) | It is the harness-rules file; a new agent must read it first | Project purpose, principles, working method. **Contains no path to any decision or experiment artifact** |
| **S4** | `grep` over `AGENTS.md` for `docs/ | decisions/ | experiments/ | index`, plus all occurrences of "decision"/"experiment" | Mechanically confirm whether S3's reading missed a pointer | **Combined pointer-pattern grep: zero matches.** "decision" appears 15× (lines 34, 36, 117, 122, 133, 137, 156, 160, 171, 190, 201, 230, 280 — none with a location); "experiment" 5× (lines 11, 124, 214, 231, 292 — none with a location). **Nothing explicitly says where decisions or experiments are recorded** |
| **S5** | `git log --oneline`; `git status`; `git show --stat HEAD` | History orientation; commit messages often reveal structure | 3 commits; latest is the GP1 execution. **`git show --stat` exposes all 21 added paths** (`docs/decisions/…`, `experiments/…`) — an accidental but effective discovery affordance |
| **S6** | Read `INITIAL_PROMPT.md` | Root seed file; may describe the project's origins | The original analysis task. **No pointers** to decision/experiment stores |
| **S7** | `ls docs/`; `ls experiments/`; `ls src/` | After S2–S6 gave no explicit pointers, the only remaining navigational affordance was **directory names visible since S1** | `docs/decisions/` (self-describing name) found; `experiments/` contents: 6 reports + 11 prompt files (`experiment-11-prompt.md` = human's untracked file); `src/` empty |
| **S8** | Read `docs/decisions/INDEX.md` | Natural entry once the directory was found; file name self-describing | Mechanism (L11), four-decision table (L20–27), reading rules (L37–40), **discovery notes (L48–52)** including the explicit pointer to `experiments/01,02,03` reports (L39) |
| **S9** | Read `docs/decisions/0001-decision-recording-mechanism.md` | INDEX L13 names it as the mechanism record | D1's decision statement, authority boundary, and its own gap documentation (L103–104: no pointer exists; D2/D4/D5 open) |
| **S10** | Targeted reads of `0002`, `0003`, `0004` §3 decision statements | Chosen via the INDEX table rows (S8) | GP1, HD-1, HD-2 verbatim decisions and non-scope lists |
| **S11** | Grep for open items: ADR §6 ambiguity tables; reports' open lists **following INDEX L39's explicit pointer** | Question: what remains unresolved? | INDEX L39/L48–50; ADR tables A1–A7, AMB-G1–G6, AMB-P1–P7, AMB-A1–A7; Exp03 §13 D2–D7; Exp02 H10; Exp06 AMB-1–4; Exp08 §20 |

**Fact — step counts:** 11 exploratory steps (S1–S11) to complete discovery plus decision consumption; the decision store was **first visible at step 7** (directory listing); the index was read at step 8; steps S2–S6 (5 steps) produced **zero** pointers. Step S12 (grepping Experiments 05/06/08 for Phase 6) was comparison research, not discovery.

**Fact — no search was optimized retrospectively:** the order above is the order the commands were executed, chosen from the neutral framing alone (README convention → harness rules → history → seed file → directory names → index), not from prompt paths.

---

## 6. Discovery observations

Answers to the nine required questions, each grounded in §5:

1. **What was inspected first?** **Fact:** repository root (`pwd; ls -la`), then `README.md`, then `AGENTS.md` (S1–S3).
2. **What information was obtained?** **Fact:** project purpose and rules from `AGENTS.md`; empty README; directory names; commit history showing the GP1 execution commit with its full file list (`git show --stat`). **Observation:** history metadata was the first *explicit* source that named decision/experiment paths (S5) — before any directory was opened.
3. **Did anything explicitly say where decisions are recorded?** **Fact: no** — not `README.md` (empty), not `AGENTS.md` (S4 grep: zero path matches), not `INITIAL_PROMPT.md`. **Fact:** `INDEX.md` L3/L11 *self-describes* its location and mechanism — but only once found. **Fact:** `INDEX.md` L48 explicitly records this failure itself: "`AGENTS.md` currently contains **no pointer** to this index."
4. **Did anything explicitly say where experiments are recorded?** **Fact: no** from the harness entry points (S1–S6). **Fact:** after the index was found, `INDEX.md` L39 names the three experiment report files explicitly. **Fact:** the root directory name `experiments/` is self-describing (S1).
5. **Could the decision mechanism be discovered?** **Fact: yes** — `docs/decisions/` listing (S7) → `INDEX.md` L11 ("ADR-per-decision plus index") → `0001` §3. **Observation:** discovery relied on directory naming and file naming, not on any harness rule.
6. **Could the experiment history be discovered?** **Fact: yes** — root directory `experiments/` (S1/S7) plus `INDEX.md` L39. **Observation:** history exists in two shapes — reports (`NN-*.md`, 6 files) and prompt files (`experiment-NN-prompt.md`, 10 files); experiments 04, 07, 09, 10 exist **only** as prompt files, so prompt-file discovery is load-bearing (HD-1's practical value, §11).
7. **Could the authoritative source for human decisions be identified?** **Fact: yes, within the decision store** — `INDEX.md` L50: "treat the record files as authoritative and this index as a convenience listing"; reading rule 1 (L37): only actually-made decisions appear. **Open question:** no record defines authority *between* the ADRs and `AGENTS.md`, nor between records and the reports' open-lists (see F3/F4, §9).
8. **Could the current unresolved governance issues be determined?** **Interpretation: partially.** The *categories* are discoverable after S8 (INDEX L39/L48–50; ADR §6 tables). A *complete and current* list is **not** available from any single source: open-item lists are spread across INDEX notes, four ADR ambiguity tables, and historical report sections, and at least one list is provably stale (Exp06 L474 still marks PROV-GIT **OPEN**, while ADR 0002 + commit `a4653b9` show it decided and executed — reconciliation required, see §10).
9. **How many exploratory steps were required?** **Fact:** 11 (S1–S11); 7 to first sighting of the decision store; 5 of the first 6 steps yielded no pointer at all.

---

## 7. Decision consumption results

All answers derived from repository content opened during §5; classifications per label legend.

### Q1 — What is the project's decision-recording mechanism?

**Fact.** `INDEX.md` L11: "the decision-recording mechanism is **ADR-per-decision plus index** — one record file per decision in `docs/decisions/`, plus this index for discovery", established by decision D1 (`0001` §3.1 point 2: "one record file per decision, plus a discovery index (`docs/decisions/INDEX.md`)").

**Observation:** the mechanism is fully documented once found, including its own known gaps (`INDEX.md` L48–52; `0001` §5.2 L103–104).

### Q2 — What human decisions are currently recorded?

**Fact.** `INDEX.md` L20: "exactly **four** decisions"; table L24–27:

| ID | Title | Status | Date | Record |
|---|---|---|---|---|
| `D1` | Decision-recording mechanism: ADR-per-decision plus index | `Accepted` | `2026-10-06` | `docs/decisions/0001-decision-recording-mechanism.md` |
| `GP1` | Harness artifact persistence | `Accepted` | `2026-10-06` | `docs/decisions/0002-harness-artifact-persistence.md` |
| `HD-1` | Experiment prompt artifacts | `Accepted` | `2026-10-08` | `docs/decisions/0003-experiment-prompt-artifacts.md` |
| `HD-2` | Git commit authority | `Accepted` | `2026-10-08` | `docs/decisions/0004-git-commit-authority.md` |

**Fact (caveat, INDEX L29):** statuses/dates are "reproduced exactly as communicated by the decider; no status vocabulary has been standardized yet, and no identifier scheme beyond the values shown has been established."

### Q3 — What does GP1 require?

**Fact.** `0002` §3: "Las decisiones, experimentos y demás artefactos del harness que deban formar parte del proyecto deben quedar versionados en Git" / "Decisions, experiments, and other harness artifacts that are part of the project must be version-controlled in Git."
**Fact (boundaries):** `0002` §3 — GP1 does not mean "everything must always be committed", "all experiments committed immediately", "Git is the only mechanism", "all repository files are harness artifacts", or "the agent may commit automatically"; §3.1 point 4 — GP1 does not establish commit frequency, branch strategy, message conventions, staging, CI, release policy, or who commits.
**Fact:** GP1 was **executed** locally by commit `a4653b9` (`0004` §5.2 and the commit itself; recording vs. executing separated per `0002` §3.1 point 6).

### Q4 — What does HD-1 establish?

**Fact.** `0003` §3: each `experiment-XX-prompt.md` file contains the prompt, the LLM response, and the historical record of the experiment interaction; they are static historical records; **"Experiment prompt files are project/harness artifacts and fall within GP1's scope. They must be version-controlled."**
**Fact (boundary):** `0003` §3.1 point 4 — "This decision does **not** automatically classify arbitrary prompts, chat transcripts, temporary notes, chat exports, or other interaction artifacts as project artifacts."

### Q5 — What does HD-2 establish?

**Fact.** `0004` §3: "Both the agent and the human user may create Git commits."; "If the agent wants to create a commit, it must first explicitly state that it wants to commit and explain why."; "The agent must not create a commit silently."
**Fact (boundary):** `0004` §3 — does NOT establish branch policy, commit-message conventions, commit frequency, pull-request policy, merge policy, release policy, force-push policy, or general Git workflow; those "remain unresolved unless already established elsewhere."
**Open question (recorded, `0004` AMB-A4):** whether announcement must be followed by human approval/waiting before the agent commits is not stated.

### Q6 — What important governance questions remain unresolved?

**Fact — the following are recorded as unresolved in repository files (sources cited):**

| # | Unresolved question | Repository source |
|---|---|---|
| 1 | Status vocabulary, record template, field specification | `INDEX.md` L29, L49; `0001` A3/A6 (L116/L119); `0002` AMB-G1 |
| 2 | Identifier scheme (three prefixes `D*`/`GP*`/`HD*`, `0001`↔`D1` ordinals) | `0001` A2; `0002` AMB-G3; `0003` AMB-P3; `0004` AMB-A3; Exp06 AMB-2/AMB-3 |
| 3 | `AGENTS.md` discovery pointer to the decision store | `INDEX.md` L48; `0001` A5 + L104; Exp03 D4; Exp05 L278 |
| 4 | Precedence rule: ADRs vs `AGENTS.md`; records vs reports' open-lists | Exp03 D3/D4 (Exp06 §4 brief spans both); no rule found anywhere (**Open question**) |
| 5 | Index maintenance / write-transition governance | `INDEX.md` L50; `0001` A7; Exp03 D5/D7 |
| 6 | Git workflow remainder: frequency, message format, branch, PR, merge, release, force-push | `0004` §3 non-list + AMB-A5; `0002` §3.1 point 4; Exp02 H10 (L97) |
| 7 | **Push policy — no record decides pushing at all** | grep over `docs/decisions/*.md`: zero policy statements (only verification notes) — **Fact** |
| 8 | Agent approval/waiting semantics after HD-2 announcement | `0004` AMB-A4 |
| 9 | Retention/deletion/supersession policy | `0001` §7 (L133–134); `0002` §7 |
| 10 | Enumeration rule for future artifact classes beyond known ones | `0002` AMB-G4 ("any enumeration requires a future human decision") |
| 11 | HD-1 temporal scope (prompt files created after the decision) | `0003` AMB-P4 |
| 12 | Whether HD-4 (`ignore` vs untracked) should be recorded as not-triggered | Exp08 §20 HD-4 is conditional on HD-1 excluding files; HD-1 includes them — **Interpretation:** condition unmet; no record confirms this formally (**Open question**) |

**Observation:** every open question is *somewhere* recorded; none is recorded in a single authoritative current list (see §9 F5).

---

## 8. Fresh-clone thought experiment

**Question:** *If another machine cloned commit `a4653b9`, what would it have?*

**Fact — a clone of this local repository at `a4653b9` receives:** all 3 commits and full history (including the GP1 execution commit message and its 21-file stat); all 27 tracked files (4 ADRs + index, 6 reports, 10 prompt files, 6 scaffold files, `.gitignore`, `AGENTS.md`, `INITIAL_PROMPT.md`); the branch `main`; and the remote configuration.

**Fact — it would NOT receive:**

* `src/` — Git does not track empty directories (the directory would simply not exist);
* `experiments/experiment-11-prompt.md` and **this report** — uncommitted (the report by explicit instruction; the prompt file awaiting a later authorized action);
* `.git/gk/` (local tool metadata inside `.git`, not part of the object store);
* any conversational context, and any working-copy state (index stat cache, reflog timestamps).

**Fact — a clone from the configured remote `origin` would NOT receive `a4653b9` at all.** `git ls-remote origin` shows `refs/heads/main = 5fd9f54` — the pre-GP1 state with 6 tracked files and **zero** decision/experiment artifacts.

**Interpretation — failure-type mapping:**

| Scenario | Persistence | Discoverability | Governance/schema |
|---|---|---|---|
| Clone of **local** repo at `a4653b9` | **No persistence failure** (P1 pass, §4) | **Discoverability failure:** content present but unreachable from harness entry points; success depends on directory-name intuition and `git log --stat` (F1/F2 Absent) | **Governance/schema failure:** no status vocabulary, no ID scheme, no precedence rule, stale open-lists (Exp06 L474) — the clone cannot fully determine the current unresolved set without reconciliation |
| Clone from **origin** today | **Persistence failure:** the durability gap Exp05 FM2 described **still exists on the remote** | Same discoverability failures would apply *plus* nothing to discover (FM2's "fail outright" scenario is live for remote clones) | Same |

**Observation:** the two clone scenarios differ only because no push has occurred — a **Human decision** (push policy is undecided anywhere; §7 Q6 item 7), not a harness defect.

**Open question:** what the clone "would still not know without deep inspection" includes: which open-lists are stale; that experiments 04/07/09/10 have no reports (prompt files only); that statuses/dates are unnormalized interpretations; whether `AGENTS.md` or the ADRs win on conflict; why `README.md`/`docs/vision.md`/`docs/architecture.md` are empty (placeholders vs. intentional).

---

## 9. Failure analysis (F1–F7)

| ID | Property | Classification | Repository evidence |
|---|---|---|---|
| **F1** | Authoritative pointer to where decision records live | **Absent** | S4 grep: `AGENTS.md` contains no `docs/`/`decisions/` path (zero matches); `README.md` empty; `INITIAL_PROMPT.md` silent. Self-documented absence: `INDEX.md` L48; `0001` A5 + L104 ("`AGENTS.md` contains no pointer to `docs/decisions/`"). Discovery worked only via directory naming (S7) and `git show --stat` (S5) |
| **F2** | Authoritative pointer to where experiment history lives | **Absent** | Same grep: no `experiments/` path in `AGENTS.md` (the word "experiment" appears only at lines 11/124/214/231/292, never as a location). `INDEX.md` L39 names report files — but INDEX is itself behind F1 (findable only after S7–S8) |
| **F3** | Documented rule for which decision records are authoritative | **Partially present** | Present: `INDEX.md` L50 ("treat the record files as authoritative and this index as a convenience listing"), reading rules 1/2/4 (L37–40). Missing: no authority rule for records-vs-reports' open-lists (stale list conflict exists, Exp06 L474 vs ADR 0002); no approved vocabulary (L29); no template (`INDEX.md` L49, Exp03 D2) |
| **F4** | Documented rule for how decision records relate to `AGENTS.md` | **Absent** | No statement anywhere relating ADRs to `AGENTS.md` precedence; `AGENTS.md` never mentions the decision store (S4); the question exists only as an unrun brief (Exp06 §4 spans Exp03 D3+D4; `0001` L103 lists D2/D4/D5 as undecided) |
| **F5** | Documented mechanism for discovering unresolved decisions | **Partially present** | Present: `INDEX.md` L39 (open lists live in `experiments/01,02,03`), L37–38 (absence = open, not resolved), L48–50 (gap notes); ADR §6 tables. Missing: entry point unreachable (F1); no single current ledger; staleness already materialized (Exp06 L474 PROV-GIT still "OPEN" though decided+executed); lists split across ≥6 files requiring manual reconciliation |
| **F6** | Documented artifact-scope rule for future harness artifacts | **Partially present** | Present: GP1 general rule (`0002` §3); explicit class rule for prompts (`0003` §3, §3.1 point 3); documented default for new cases — "`any enumeration requires a future human decision`" (`0002` AMB-G4) plus `AGENTS.md` §1 (stop and ask). Missing: no general classifier (Exp08's A/B/C/D vocabulary was experiment-local and explicitly not approved as a standing rule, Exp08 R4); HD-1 temporal scope open (`0003` AMB-P4) |
| **F7** | Documented Git persistence rule | **Present** | `0002` §3 (GP1 wording) — version-control obligation; `0004` §3 (who may commit + announcement) as the operational authority; executed by commit `a4653b9` (§4). Note: commit *frequency/message/branch* rules are deliberately non-scope (`0002` §3.1-4, `0004` §3) — absence there is per-decision, not a gap in F7 itself |

**Observation:** the pattern is consistent — *content-layer rules are present or partial; routing-layer rules are absent.* The harness knows what decisions are; it does not point at them.

---

## 10. Comparison with previous experiments

| Previous finding | Status now | Evidence |
|---|---|---|
| **Exp05 FM2** — "a fresh clone would contain no D1 and no INDEX… discovery in a clone would fail outright" (L175) | **INVALIDATED (locally)** | §4: clone of local repo at `a4653b9` contains all 5 decision files. **Still true for `origin` clones** (remote = `5fd9f54`) |
| **Exp05 Q2** — "persistence is not durable… the pass applies to this working copy only" (L246) | **INVALIDATED (locally)** | 21 in-scope files committed; P1 verified from object store |
| **Exp05 MM2** — missing "version-controlled persistence" mechanism (L202) | **INVALIDATED** | GP1 + commit `a4653b9` provide it; F7 = Present |
| **Exp05 FM1/FM3** — discovery is search-based and task-correlated (L175–176) | **CONFIRMED** | F1/F2 Absent; S2–S6 produced zero pointers; `INDEX.md` L48 still accurate |
| **Exp05 open list** — D4 pointer, "Commit policy" (L278–279) | **PARTIALLY resolved** | Commit *authority* resolved by HD-2; *persistence* executed; pointer (D4) still open; message/branch/frequency still open (Exp02 H10) |
| **Exp06 AMB-4 / PROV-GIT "OPEN"** (L474) | **INVALIDATED as to the decision, but the report still says OPEN** | GP1 recorded (`0002`) and executed (`a4653b9`). **First concrete instance of open-list staleness** — reports are immutable historical records, so the contradiction now exists in-repo (see F3/F5) |
| **Exp06 O2/O7** — identifier/catalogue drift, four ID conflicts (L408, L413) | **CONFIRMED unresolved** | Three prefixes now in use (`D*`, `GP*`, `HD*`); no scheme recorded (§7 Q6 item 2) |
| **Exp08 §16 Layer 1** — "no authoritative scope record" (L375) | **INVALIDATED** | Exp08 R2 executed by Experiment 09: ADRs `0003`/`0004` now live in `docs/decisions/` and are committed |
| **Exp08 §16 Layer 2** — "no discovery path… no harness pointer" (L376), R3 (L388) | **CONFIRMED** | F1/F2 Absent; `AGENTS.md` unchanged (md5 `7355a77e…` throughout) |
| **Exp08 §20** — HD-1/HD-2 "genuinely unresolved" | **INVALIDATED** | Both recorded (`0003`, `0004`) and committed; HD-4 conditionally untriggered (**Interpretation**, §7 Q6 item 12); HD-3 informational |
| **Exp09 / Exp10** — recording GP1/HD-1/HD-2; executing GP1 | **CONFIRMED persisted** | Records + prompt files for 09/10 all present in `a4653b9` (§4); no report files for 04/07/09/10 exist — **prompt files are their only narrative record**, proving HD-1's practical necessity |
| **Exp03 D2/D3/D4/D5/D7; Exp02 H10** | **CONFIRMED unresolved** | §7 Q6 items 1–6; no records exist resolving them |

**Answer — did GP1 execution actually improve persistence?** **Fact: yes, locally and substantially.** 21 in-scope files went from untracked to versioned; Exp05's clone-failure prediction is now false for this repository; P1 passes at the object-store level. **Interpretation:** persistence is now *conditional on push* — the remote still exhibits the pre-GP1 failure mode.

**Answer — did GP1 execution improve discoverability?** **Interpretation: not structurally.** No pointer, index change, or `AGENTS.md` change occurred as part of execution (all outside its scope by design); F1/F2 remain Absent; the in-repo discovery procedure (§5) is identical to what Exp05 described. The only discoverability gain is *indirect*: content that previously did not exist in clones now does (a clone can now stumble onto `docs/decisions/` at all). **P2 before GP1 execution was "nothing to find"; P2 now is "findable but unguided."**

---

## 11. What GP1 fixed

**Fact:**

1. **Local clone durability** for every artifact class it covers: decision records (4), index (1), reports (6), prompt files (10) — verified from Git objects (§4). Exp05 FM2/Q2/MM2 are closed for local clones.
2. **The identity question for 21 files** — tracked vs untracked ambiguity is gone; `git status` is clean except the two deliberately-uncommitted current-task files.
3. **A working, exercised commit path** — HD-2's announcement procedure was used for the real GP1 commit; the rule exists, is recorded, and has been demonstrated once.
4. **Prompt-file durability (HD-1)** — experiments 04, 07, 09, 10 have no reports; their prompt files are now versioned, so their interaction history survives a clone for the first time.
5. **F7 (Git persistence rule)** exists as documented, recorded policy — not folklore.

**Observation:** GP1 converted persistence from an *agent-dependent favor* (whatever happens to be lying around) into a *recorded obligation* with a verified first execution.

---

## 12. What GP1 did not fix

**Fact:**

1. **Discoverability is untouched** — F1/F2 Absent; a fresh agent still gets zero routing help from `AGENTS.md`/`README.md` (§5 S2–S6); Exp05 FM1/FM3 remain true.
2. **Remote persistence** — no push; `origin` still serves the pre-GP1 state (§4/§8). Push policy is undecided in every record (§7 Q6 item 7).
3. **Open-list staleness** — Exp06 L474 still says PROV-GIT OPEN; reports are now provably out of date relative to records, and no reconciliation rule exists (F3/F5 partial).
4. **Schema/governance gaps** — status vocabulary, ID scheme, template, precedence rules, retention: all still open (§7 Q6 items 1–5, 9).
5. **Workflow remainder** — frequency, message, branch, PR, merge, release, force-push, approval semantics: deliberately non-scope, still open (§7 Q6 items 6, 8).
6. **GP1 is a standing rule facing a moving stream** — in-scope artifacts reappeared uncommitted within minutes of execution (`experiment-11-prompt.md`, plus this report); with no frequency policy, the durability gap re-forms after every experiment until the next authorized commit.
7. **This experiment's own outputs are uncommitted by design** — P1 for the current task is intentionally not yet satisfied.

**Open question:** whether (6) is a defect or the intended cadence is not decided anywhere — recurrence policy belongs to the open frequency question.

---

## 13. Harness observations

*Interpretations unless marked otherwise.*

1. **Directory naming is the real discovery mechanism.** `docs/decisions/` and `experiments/` did 100% of the navigational work in §5; no rule prescribes those names and no rule guarantees future stores will follow them. The harness's discoverability rests on an undocumented convention.
2. **`git log --stat` is an accidental discovery aid** (S5): the GP1 commit message plus file list revealed both stores before any directory was opened. Useful, but a side effect of commit hygiene, not a designed feature.
3. **The index is honestly self-aware — and that honesty is currently the only pointer to the pointer problem.** `INDEX.md` L48–52 documents its own undiscoverability; that note has been accurate across four records and three experiments. **Fact:** the gap was known and recorded long before this experiment; **Interpretation:** a harness that documents its own failures is behaving as `AGENTS.md` § *Documentation is part of the system* requires — the missing piece is the authorized *act* (D4), not awareness.
4. **Staleness is no longer hypothetical.** Exp06 L474 vs ADR `0002` is the first live contradiction between "reports say open" and "records say decided". The division of labor (records = decided, reports = historical) is *inferable* from `INDEX.md` reading rules but never stated; a future agent could obey reading rule 3 and wrongly conclude persistence is undecided.
5. **HD-1's value is now demonstrable, not theoretical:** without committed prompt files, four experiments (04/07/09/10) would have no durable narrative record at all.
6. **Persistence is a flow, not a state.** Two new in-scope artifacts appeared during this experiment (prompt file, this report). Any future experiment that reports "0 untracked in-scope files" is reporting a moment, not a property.
7. **Empty orientation files are a missed, cheap opportunity:** `README.md`, `docs/vision.md`, `docs/architecture.md` are 0-byte tracked placeholders — the natural entry points for a fresh agent are exactly the ones with nothing in them.

---

## 14. Recommendations

**Fact — all of the following are Recommendations; none is approved, and none creates an obligation:**

* **R1 —** Consider authorizing the repair phase for F1/F2/F4 (the `AGENTS.md` pointer + precedence question, Exp03 D3/D4) as the next experiment: §5 evidence shows 5 of 6 early steps yielding zero pointers, and `INDEX.md` L48 marks this as the known blocker.
* **R2 —** Consider a documented rule for the reports-vs-records relationship (marks report open-lists as historical snapshots, or adds a "later superseded-by" convention) — the Exp06 L474 contradiction now exists in-repo and will recur per §12(6).
* **R3 —** Consider resolving the schema cluster (status vocabulary, ID scheme, template: Exp03 D2/D7) before record `0005`, since three identifier prefixes already coexist.
* **R4 —** Consider deciding push policy and/or authorizing a push of `a4653b9`, recognizing that until then Exp05's FM2 remains true for every remote clone.
* **R5 —** Consider a commit-cadence decision (frequency/scope) so GP1's standing obligation is met per-experiment rather than ad hoc; then authorize committing `experiment-11-prompt.md` and this report.
* **R6 —** If a purer P2 measurement is wanted, run a true external fresh-session clone test (removes the §2 contamination caveat).

**Fact — explicitly NOT recommended and NOT implied:** modifying any harness file from this experiment; treating F1–F7 classifications as approved repairs; any commit, staging, or push; presenting any recommendation above as decided.

---

## 15. Result

# **PASSED WITH QUALIFICATIONS**

**Fact — against the success criterion (recover decisions, history, and harness state from the versioned repository):**

| Criterion | Verdict | Evidence |
|---|---|---|
| **P1 — Persistence** of all expected artifact categories in `a4653b9` | **PASS** | §4: 27/27 files by category; object-store reads; `git fsck` clean |
| **P2 — Discoverability** without being told paths | **PARTIAL** | §5–§6: fully recoverable in 11 steps, but **zero** harness-rule pointers (F1/F2 Absent); success driven by directory naming + `git log --stat`, not by any designed guidance |
| Q1–Q6 answerable from repository alone | **PASS** | §7: all six answered with citations; Q6 answerable but fragmented and partly stale |
| P1/P2 kept distinct | **PASS** | §4 vs §5–§6 measured separately; §9 classification per failure type |
| No repair, no state change | **PASS** | §18 |

**Why not plain PASSED (qualifications):**

* **Q1 — contamination:** this agent knew paths from prior conversation (§2); P2 is an **upper bound**; a true naive test remains an Open question (R6).
* **Q2 — persistence is local-only:** `origin` still serves the pre-GP1 state; for remote clones P1 fails today (§4/§8).
* **Q3 — governance/schema failure:** a fresh agent cannot derive a complete, current unresolved-decisions list without manual reconciliation of provably stale sources (§7 Q6, Exp06 L474).
* **Q4 — the current task's artifacts are deliberately uncommitted**, so P1 necessarily does not cover `experiment-11-prompt.md` or this report (§3/§12).

**Why not FAILED:** the central question — *"Can a fresh agent recover the important decisions, experiment history, and current harness state from the versioned repository alone?"* — answers **yes** for the committed state (P1 pass, Q1–Q5 fully recoverable), with P2 qualified as *findable but unguided*, precisely the split this experiment was designed to detect.

---

## 16. Lessons learned

*Interpretations; none is a decision.*

1. **Persistence and discoverability are genuinely separable properties, and separating them changed the verdict.** A blended test would have said "PASS — everything was found"; the split shows the finding was produced by directory names and commit stats while every designed guidance mechanism was absent.
2. **The harness's self-documentation is doing real work.** `INDEX.md` L48–52 converted what could have been an invisible failure into a *known, recorded, repeatedly-confirmed* gap — this experiment measured the gap instead of rediscovering it.
3. **Recorded gaps that lack an owner-with-authority decay into permanent features.** D4 has been "known and open" since D1's creation, was re-flagged by GP1, HD-1 and HD-2, and still fails its first independent test — awareness without an authorized act produces a stable defect, documented at every step.
4. **Immutability of historical reports guarantees drift once decisions advance.** Exp06's "PROV-GIT OPEN" is now wrong, will never be edited by design, and no supersession convention exists — the project chose append-only history, so it now needs a reconciliation layer (a governance decision, not an editing decision).
5. **Executing a persistence rule once is not persistence; it is a prototype.** New in-scope artifacts appeared during the very experiment that verified the fix — GP1 is a standing obligation against a live stream, and obligations without cadence re-create the gap silently.
6. **An empty README is an empty handshake.** The three orientation files a stranger reads first are the three zero-byte files — discoverability failures often live in the cheapest unspent place.
7. **Declared contamination beats pretended objectivity.** Recording the bias (§2) and bounding its direction (can only hide failures) made the P2 result interpretable; an unqualified "fresh-agent simulation" claim would have been unfalsifiable.

---

## 17. Human decisions required

**Fact — nothing below was decided, approved, or assumed by this document:**

| ID | Decision | Source/status |
|---|---|---|
| **HD-5** *(proposed label — no ID assigned yet)* | Whether/ how `AGENTS.md` gains an authoritative pointer to `docs/decisions/` (F1/F2 repair) | Corresponds to open Exp03 D4; **Human decision** |
| **HD-6** *(proposed label)* | Precedence rule: ADRs vs `AGENTS.md`, and records vs reports' open-lists (F3/F4 repair; resolves the Exp06 L474 contradiction class) | Corresponds to open Exp03 D3 (Exp06 §4 brief); **Human decision** |
| **HD-7** *(proposed label)* | Status vocabulary + identifier scheme + record template | Open Exp03 D2/D7; **Human decision** |
| **HD-8** *(proposed label)* | Push policy — whether/when `a4653b9` (or later commits) are pushed to `origin` | Undecided in every record (§7 Q6 item 7); remote currently pre-GP1; **Human decision** |
| **HD-9** *(proposed label)* | Commit cadence for GP1's standing obligation (frequency/scope), and authorization to commit `experiment-11-prompt.md` + this report | Open Exp02 H10 remainder + task instruction ("remain uncommitted until a later authorized action"); **Human decision** |
| **HD-10** *(proposed label)* | Whether to record HD-4 (Exp08) as not-triggered, or leave it conditionally open | **Open question** (§7 Q6 item 12) |
| — | Whether the next experiment **repairs** the harness (this experiment only measured) | Task scope boundary; **Human decision** |

**Fact — the labels HD-5…HD-10 are provisional naming suggestions for readability only; no identifier scheme exists (§7 Q6 item 2), and assigning IDs is itself part of HD-7.**

---

## 18. Verification

**Fact — performed after writing this file:**

1. **Exactly one new file created:** `experiments/11-fresh-clone-persistence.md` — confirmed via `git status --short --untracked-files=all`: only pre-existing `?? experiments/experiment-11-prompt.md` (human's) plus this file; no other new path.
2. **No existing file modified:** `git diff HEAD` empty and `git ls-files -m` empty → all 27 tracked files byte-identical to `a4653b9` (`AGENTS.md` `7355a77e…`, `INDEX.md` `94ea0e5e…`, all other tracked md5s unchanged since before the experiment).
3. **No files staged:** `git diff --cached --name-only` empty.
4. **No commit created:** HEAD `a4653b96b60e0c6fe258aadf2ac008370a308c43`; commit count 3; log unchanged (3 entries).
5. **No push occurred:** `git rev-parse origin/main` = `5fd9f54…`; `git ls-remote origin` → `refs/heads/main 5fd9f54…` (remote unchanged from experiment start); stash empty.
6. **Tested commit is `a4653b9`** — verified at experiment start and end (`git rev-parse HEAD`).
7. **Working-tree state:** 27 tracked (clean vs HEAD); **2 untracked** — `experiments/experiment-11-prompt.md` (human-created, 8,029 B, read-only during this task) and this report (agent-created, the authorized output); 0 staged; `src/` empty.
8. **P1/P2 distinction maintained:** §4 measures persistence from Git objects only; §5–§6 measure discovery procedure and observations separately; §9 classifies failures by type; no verdict blends them (§15 table).
9. **No conclusion depends on current conversation:** every Q1–Q6 answer, F1–F7 classification, and §10 comparison row cites a committed file (and line where applicable); the conversational contamination is declared and directionally bounded in §2 rather than used as evidence.
10. **Exact final Git state:** HEAD `a4653b96b60e0c6fe258aadf2ac008370a308c43`; **3 commits**; **27 tracked** (clean); **0 staged**; **0 modified**; **2 untracked** (1 human + this report); stash empty; `origin/main` = `5fd9f54…` (no push; remote one commit behind local).

**Not done, by instruction:** no clone performed (Phase 4 thought experiment only); no file modified outside this report; no harness repair; no staging, commit, or push; no decision recorded or altered; no recommendation presented as decided.
