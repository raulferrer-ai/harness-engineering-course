# Experiment 12 — Harness Repair Decision Analysis

* Date: 2026-10-08
* Status: completed (READ-ONLY decision analysis — **nothing implemented, modified, staged, committed, or pushed**)
* File created: `experiments/12-harness-repair-decision-analysis.md` (this document)

**Label legend (used in uppercase per task §5):** **FACT** — directly established by repository content or Git state, cited. **OBSERVATION** — a fact plus its immediate significance. **INTERPRETATION** — an inference beyond the observed data. **RECOMMENDATION** — an option pending human decision; it decides nothing and creates no obligation. **OPEN QUESTION** — a question existing evidence does not answer. **HUMAN DECISION REQUIRED** — a question reserved to the human project owner; this document answers none of them.

**Standing disclaimers:** (1) this is decision *analysis*, not decision *making*; every candidate below remains undecided; (2) no precedence rule is invented while analyzing the absence of one; (3) GP1 and HD-2 are not reinterpreted beyond their recorded wording; (4) historical reports are treated as evidence about the past, not as current policy.

---

## 1. Objective

**FACT — what this experiment was tasked to do:**

1. Analyze the harness gaps Experiment 11 exposed and convert them into decision-ready briefs for the human project owner.
2. Determine, per finding: already resolved / requires new human decision / agent-solvable / dependent on other decisions.
3. Determine the **minimum decision set** before harness repair can begin, the required post-repair verification, and whether Experiment 11's provisional HD-5…HD-10 labels should be consolidated, split, or discarded.
4. Cover seven problem areas separately (A–G): decision discovery, experiment/history discovery, authority/precedence, decision-record governance, future artifact scope, Git execution workflow, remote publication.
5. Avoid decision explosion: separate blocking, deferrable, agent-safe, and implementation-detail items; construct the dependency graph; define the repair boundary (harness repair vs product work); produce a testable verification plan.

**FACT — what it was forbidden to do:** implement, modify, repair, normalize, commit, push, stage; modify `AGENTS.md`, `README.md`, ADRs, the index, previous reports; create templates; establish Git policy, precedence rules, discovery rules, or commit/push timing; select any option for the human.

**INTERPRETATION — the experiment's central purpose:** the harness has produced two full analysis passes over the same gap space (Experiment 06 briefs, Experiment 11 F1–F7). This third pass must compress, not repeat: its value is measured by how few decisions remain after consolidation, not by how thoroughly the gaps are re-described.

---

## 2. Evidence Base

**FACT — repository content inspected for this analysis (read-only):**

| Evidence | How inspected | Notes |
|---|---|---|
| `AGENTS.md` (292 lines, md5 `7355a77e…`) | Full read + targeted grep for line-cited rules (L69, L84, L101, L133, L179, L186, L192–194, L269–276, L292) | Unchanged since 2026-10-06 |
| `docs/decisions/INDEX.md` (52 lines, `94ea0e5e…`) | Full read (reading rules L37–40; discovery notes L44–52) | 4 rows |
| ADR `0001`–`0004` | `0001` full read; `0002` full read; `0003`/`0004` re-verified by md5 (`a7b53e6a…`, `f7ec871c…`) + §3 targeted reads (decision statements, non-scope lists, ambiguity tables) | All committed in `a4653b9` |
| Experiment 05 | Headers + §3 (discovery path S1–S9), §5 (authority), §6 (FM1–FM12), §7 (MM1–MM8), §9 result, §11 open decisions | Targeted-section reading, declared |
| Experiment 06 | Headers + §2.2–2.3 (evidence, AMB-1…4), §4 (D4 brief, options P1–P5/R1–R4/F1–F2), §7 refs, §9 minimum sets, §10 (O1–O7), §11 result, §13 open list | Targeted-section reading, declared |
| Experiment 08 | Full (in-session), §14/§16/§20 re-grepped (HD-4 condition L226/L290/L330/L354–356; Layer 1/2 L375–376; R2/R3 L387–388) | |
| Experiment 09 | **No report exists** — `experiments/experiment-09-prompt.md` inspected (task structure + response tail: verification, AMB-P1…P7, AMB-A1…A7) | Prompt file is the record |
| Experiment 10 | **No report exists** — `experiments/experiment-10-prompt.md` inspected (8 steps, HD-2 announcement text, final state) | Prompt file is the record |
| Experiment 11 | Full (working-tree file, md5 `c15fdbd7…`, **uncommitted**) | F1–F7, §§10–17 |
| Provenance prompts | `experiment-04-prompt.md` (D1 statement L7), `experiment-07-prompt.md` (GP1 Spanish wording L10) | Confirm ADR provenance chains |
| Reports 01/02/03 | Targeted: Exp03 §13 catalog facts; Exp02 H8/H10 rows (L97, L203, L221) | Via INDEX reading-rule-3 pointer |
| Git state | `rev-parse`, `log`, `status`, `ls-files`, `ls-remote`, `merge-base --is-ancestor`, `stash list`, md5 baselines | See §3 |

**FACT — what is NOT evidence here:** conversational context. Every claim below cites a repository file (and line where applicable). Experiment 11's provisional HD-5…HD-10 labels are treated as *analytical proposals from a prior agent document*, not as decisions (they were never human-approved; Experiment 11 §17 says so itself).

**OBSERVATION — evidence limitations, declared:** (a) Experiments 05 and 06 were read by targeted sections rather than linearly end-to-end — the sections read cover findings, open-decision lists, options, and results, which is what this analysis consumes; (b) six experiments (04, 07, 09, 10, 11, 12) have **no report files**, so their records are prompt files — a fact this analysis both relies on and evaluates (§6 area B).

---

## 3. Current Harness State

**FACT — Git state at analysis start (2026-10-08 08:51 CEST):**

| Item | Value |
|---|---|
| HEAD | `a4653b96b60e0c6fe258aadf2ac008370a308c43` — *chore: execute GP1 — version-control project/harness artifacts* |
| Commits | 3 (`5ed7b84` → `5fd9f54` → `a4653b9`), linear |
| Tracked files | 27, all identical to HEAD (`git diff HEAD` empty, `ls-files -m` empty) |
| Staged / modified / stash | 0 / 0 / 0 |
| `origin/main` (local ref) | `5fd9f54…` |
| `git ls-remote --heads origin` | `5fd9f54…` — **remote unchanged, one commit behind** |
| Fast-forward check | `git merge-base --is-ancestor origin/main HEAD` → **true** (a future push would fast-forward; no force needed while remote stands) |
| Remote URL | `https://github.com/raulferrer-ai/harness-engineering-course.git` — **OPEN QUESTION: public/private visibility not recorded anywhere** |
| Untracked (before this file) | `experiments/11-fresh-clone-persistence.md` (`c15fdbd7…`), `experiments/experiment-11-prompt.md` (`de2de75f…`, 10,828 B), `experiments/experiment-12-prompt.md` (`d69a2688…`, 13,258 B) |

**FACT — harness content state:**

* **Decision records: 4** — `D1` (mechanism), `GP1` (persistence), `HD-1` (prompt artifacts), `HD-2` (commit authority); all `Accepted`; all committed.
* **Decision index:** `docs/decisions/INDEX.md`, 4 rows, committed; its discovery notes (L48–50) still record: no `AGENTS.md` pointer (D4 open), no template (D2 open), no index-maintenance rule (D7/D5 open), "treat the record files as authoritative and this index as a convenience listing".
* **Experiment reports: 6 tracked** (01, 02, 03, 05, 06, 08); **prompt files: 10 tracked + 2 untracked** (11, 12).
* **Scaffold:** `AGENTS.md`, `README.md` (0 B), `INITIAL_PROMPT.md`, `docs/vision.md` (0 B), `docs/architecture.md` (0 B), `.gitignore`.
* **Uncommitted by design:** the entire Experiment 11 output stream (report + prompt) and this Experiment 12 stream (prompt + this report) — **OBSERVATION:** GP1's obligation has re-accumulated four in-scope artifacts within one day of its execution, exactly the cadence gap Experiment 11 §12(6) recorded.

**FACT — decided vs undecided summary (from records only):** decided = mechanism, persistence obligation (local), prompt-file class, commit authority/announcement. Undecided (recorded as such) = discovery pointers, precedence, schema/vocabulary, write/supersession governance, index maintenance, cadence, message/branch/PR/merge/release/force-push policy, push authority, experiment conventions (Exp02 H8), backfill scope (Exp03 D6).

---

## 4. Experiment 11 Findings Reconstructed

**FACT — Experiment 11's measured results (working-tree report `11-fresh-clone-persistence.md`, uncommitted):**

| Finding | Content |
|---|---|
| P1 persistence | **PASS** for commit `a4653b9` (27/27 files by category, object-store verified); **FAIL for any `origin` clone** (remote lacks all decision/experiment files) |
| P2 discoverability | **PARTIAL** — recoverable in 11 steps, but 5 of the first 6 steps produced zero pointers; success driven by directory naming and `git log --stat`, not by harness rules |
| F1 decision-store pointer | **Absent** (`AGENTS.md` grep: zero path matches; self-documented at `INDEX.md` L48) |
| F2 experiment-history pointer | **Absent** (no `experiments/` path in `AGENTS.md`; `INDEX.md` L39 reachable only after the index is found) |
| F3 which records are authoritative | **Partially present** (index-vs-records only, `INDEX.md` L50; nothing for records-vs-reports; no vocabulary/template) |
| F4 ADRs ↔ `AGENTS.md` relation | **Absent** (no statement anywhere) |
| F5 mechanism for unresolved-decision discovery | **Partially present** (`INDEX.md` L37–40 + ambiguity tables; fragmented, no single current list, staleness proven) |
| F6 future artifact-scope rule | **Partially present** (GP1 + HD-1 classes + `AGENTS.md` §1 ask-default + `0002` AMB-G4 "enumeration requires a future human decision") |
| F7 Git persistence rule | **Present** (`0002` §3, executed by `a4653b9`) |
| Staleness test case | Experiment 06 line 474 still marks **PROV-GIT OPEN** though GP1 is decided and executed — first live records-vs-reports contradiction |
| Flow-not-state | In-scope artifacts reappeared uncommitted immediately after GP1's execution |
| Provisional labels | HD-5…HD-10 proposed in Experiment 11 §17, explicitly "provisional naming suggestions… part of HD-7", undecided |

**FACT — Experiment 11's own boundary:** it measured and recommended only; its §14 recommendations R1–R6 and §17 HD rows all remain unapproved. **OBSERVATION:** Experiment 11's report is itself an uncommitted artifact — its finding about cadence applies to itself.

---

## 5. Already-Resolved Issues

**FACT — issues from the gap analyses that existing human decisions (or existing `AGENTS.md` rules) already settle; no new decision needed:**

| Issue raised by | Resolved by | Evidence |
|---|---|---|
| Records/reports/prompts do not survive a clone (Exp05 FM2/MM2; Exp06 evidence 3–4) | **GP1** + **HD-1** + execution | `0002` §3; `0003` §3; commit `a4653b9`; Exp11 §4 P1 PASS (local) |
| Who may commit (Exp02 H10 "who"; Exp05 "Commit policy" row) | **HD-2** | `0004` §3 "Both the agent and the human user may create Git commits" |
| Commit announcement/silent-commit prohibition | **HD-2** | `0004` §3 (announce + explain why; no silent commits); demonstrated in `experiment-10-prompt.md` Step 7 |
| Are prompt files in scope? (Exp08 Class C, HD-1) | **HD-1** | `0003` §3 "must be version-controlled" + §3.1-4 boundary |
| Are reports/records in scope? | **GP1** by its own words | `0002` §3 names "las decisiones[ y] experimentos"; index covered by D1 mechanism (`0001` §3.1-2) |
| What is the decision mechanism? | **D1** | `0001` §3.1; `INDEX.md` L11 |
| Exp08 minimum set (HD-1 + HD-2) | Both recorded and committed | `0003`, `0004`, `INDEX.md` L26–27 |
| Exp05/Exp08 "Commit policy — everything untracked" | Executed | `a4653b9` (21 files) |
| **PROV-GIT the persistence question** (Exp06 §7) | **GP1** decided + executed | Decision part resolved; only its *stale evidence* remains → area C below |
| HD-4 (`.gitignore` treatment) | Condition never met | Exp08 L330/L356: "only if HD-1 excludes files"; HD-1 included all → discard candidate (§7) |
| Pre-commit scope/staging verification (area F) | Existing `AGENTS.md` rules | L179 (inspect Git status), L186 (diff only current task), L84–101 (verification is part of implementation; never claim without evidence), L69 (small verifiable increments), L269–276 (report what was inspected/changed/verified) |
| What to do when scope is unclear (area E) | Existing `AGENTS.md` principle | §1 "stop and ask" (L36–58) + `0002` AMB-G4 (enumeration requires a future human decision) |
| Who may amend `AGENTS.md` | Existing reservation | L292 "propose an improvement to this file rather than silently working around the problem" — human-amendment reserved |
| Who is responsible for product/tech choices | Existing allocation | L133–141 (human remains responsible) — relevant to area G |

**OBSERVATION:** the "already decided" surface is larger than the gap lists suggest — five of area F's sub-questions and area E's default handling are covered by rules that predate HD-2. **INTERPRETATION:** the genuinely new decisions are concentrated in *routing* (where things are, which source wins) and *tempo* (when commits/pushes happen), not in operational hygiene.

---

## 6. Candidate Decision Inventory

*One subsection per mandated area A–G. Every candidate carries: problem, evidence, why it matters, human-required?, dependencies, options with trade-offs, risks, RECOMMENDATION (if any, unapproved), minimum acceptable decision, verification implications, deferrability. No option is selected.*

### A. Decision discovery

**Problem (FACT):** a future agent is not told that formal decisions exist, where the index is, where ADRs live, how to find unresolved decisions, or how records differ from reports. Evidence: Exp05 S1–S4 dead ends + §3.2 ("discovery succeeded, but by search, not by instruction"; task-correlated → FM1/FM3 silent-unheard risk); Exp06 evidence 5–6, MM1 "single highest-leverage change", MM7; `INDEX.md` L48; `0001` A5/L103–104; Exp11 S1–S11 (5 of 6 early steps zero pointers), F1 Absent.

**Why it matters (OBSERVATION):** without a pointer, every other recorded decision is only *potentially* binding — a constraining record can be unheard with no visible error (Exp05 FM3).

**HUMAN DECISION REQUIRED:** yes — the fix is an edit to `AGENTS.md` (and/or `README.md`), both reserved to the human (L292; `INDEX.md` L48 defers explicitly because "modifying `AGENTS.md` is out of scope").

**Dependencies:** soft on **RD-AUTH** (a pointer's target should be declared authoritative — Exp06 R-D4a: one session); independent of schema/cadence.

**Candidate mechanisms (analysis only):**

| # | Mechanism | Advantage | Disadvantage |
|---|---|---|---|
| A1 | Pointer in `AGENTS.md` only (Exp06 P1) | Guaranteed read every session; single copy | Instruction-file bloat (Exp03 M6 adherence risk) |
| A2 | Pointer in `README.md` only (P2) | Human-facing; no `AGENTS.md` growth | Agents are not required to read README (Exp05 S3 was 0 B anyway) → FM1 survives |
| A3 | Both (P3) | Redundancy | Two copies to sync; divergence risk (Exp06 G6/P10) unless one is declared non-authoritative |
| A4 | Another repository-local mechanism (P4 variant): self-describing `docs/decisions/`+`INDEX.md` (exists today), a root `DECISIONS.md`, `docs/README.md`, or a session-start checklist item | Keeps must-read files slim; INDEX already self-describes (L3–11) | Any file still needs *one* entry point a session will open → does not escape A1's trade-off; a "checklist step" is itself an `AGENTS.md` edit (= A1 content) |
| A5 | No pointer, accept search (P5) | Zero change | F1/F2 stay Absent; P2 stays "findable but unguided" (Exp11 §15) |

**Scope sub-question (FACT):** the pointer's *content* — decisions only, or also experiment history (area B) and where unresolved questions are listed — is separable from its *location*. **RECOMMENDATION (unapproved):** consider answering location + scope + RD-AUTH precedence in **one human decision session** (both are `AGENTS.md` text; Exp06 R-D4a), with pointer wording drafted by the agent and approved by the human. **RECOMMENDATION (unapproved):** consider A1 (mandatory file) with a single sentence naming `docs/decisions/INDEX.md` and `experiments/`, leaving README untouched until the product phase — README is a *product* file, and choosing A2/A3 mixes harness repair into future product surface.

**Risks:** bloat (A1), divergence (A3), pointer-without-precedence still leaves FM8 open (A1 without RD-AUTH), over-wording that hard-codes paths which later change (mitigate: name directories, not individual files).

**Minimum acceptable decision:** one sentence in a file every session must read, naming the decision index (and ideally `experiments/`), plus a statement of whether it is authoritative. **HUMAN DECISION REQUIRED — blocking root.**

**Verification implications:** V1, V2 (§13). **Deferrable:** no.

### B. Experiment / history discovery

**Problem (FACT):** no artifact tells a future agent that experiment history exists or how it is organized. Current affordances: root directory name; `INDEX.md` L39 (only after the index is found); `git log --stat` (incidental, Exp11 S5). Structure is dual: 6 reports `NN-*.md` + 12 prompt files `experiment-NN-prompt.md`; **experiments 04, 07, 09, 10, 11, 12 have no report** — their only narrative record is the prompt file (Exp06 O5: "Experiment 04 is undocumented as an experiment"; Exp05 FM11/FM12 convention drift; Exp02 H8 still open: naming, report template, closure step).

**OBSERVATION:** Experiment 11 was only able to reconstruct history because prompt files persisted — which required HD-1 (decided one day earlier). **INTERPRETATION:** directory naming was *sufficient* in Experiment 11's sample but is load-bearing without being documented, and the report/prompt duality means "history" has two unequal halves (6 rich reports vs 6 prompt-only experiments) with no index over either.

**HUMAN DECISION REQUIRED:** split —

* the *pointer* half merges into **RD-AUD**'s sibling (**RD-DISC**, area A);
* the *conventions* half (what an experiment must leave behind; whether reports are required; which is authoritative for what) = **RD-EXPCONV** (candidate below), currently open as Exp02 H8.

**RD-EXPCONV — experiment/history conventions** (candidate):

* **Problem (FACT):** no recorded convention governs report naming, report-per-experiment, prompt-file handling, or closure; practice drifted silently across six experiments (FM11/FM12, O5, Exp02 H8).
* **Why it matters (OBSERVATION):** the historical record's shape determines what a clone preserves; prompt-only experiments are already the majority.
* **Options:** B1 ratify current practice (prompt file every experiment; report for analysis-type; response appended to prompt) — honest, cheap, but legitimizes the 6 missing reports; B2 require a report for every experiment — completeness, but backfilled reports would be *re-authored* (must be labeled retrospective or not written); B3 record no conventions — drift continues.
* **RECOMMENDATION (unapproved):** consider B1 plus one sentence in the discovery pointer that history = `experiments/` reports **and** prompt files.
* **Risks:** B1 freezes an accidental pattern; B2 creates anachronistic authorship if backfilled.
* **Minimum acceptable decision:** a statement that both file classes constitute history and which is authoritative for what (overlaps RD-AUTH).
* **Dependencies:** soft on RD-AUD (pointer names the directory), soft on RD-AUTH (authority split).
* **Verification implications:** V2, V5. **Deferrable:** yes (§11).

**Does the current repository provide sufficient discovery mechanisms? (FACT — answer):** **No.** The two mechanisms that work (directory naming, index self-description) are undocumented conventions; the documented mechanism (`INDEX.md` L39) is unreachable until the index is found. **Experiment 11 finding "directory naming is the real discovery mechanism" (§13 obs 1) is therefore not sufficient-by-design — it is sufficient-by-luck, and the task's caution is confirmed.**

### C. Decision authority and precedence (incl. stale-evidence test case)

**Problem (FACT):** no rule states which source wins when `AGENTS.md`, a record, the index, an experiment report, and conversation disagree. Evidence: Exp05 §5 (authority signals "unenforced… convention only"; FM8/FM9), Exp06 §4 (options R1–R4, F1–F2; AMB-1), Exp11 F3/F4 (Partial/Absent). `INDEX.md` L50 settles only records-vs-index.

**Special requirement — the PROV-GIT test case (five questions, repository evidence only):**

1. **What does Experiment 06 say?** FACT: `experiments/06-decision-specification.md` L474: "**PROV-GIT** *(no existing ID)* … **OPEN** — brief at §7"; §7 brief covers "version-controlled persistence: classification + commit policy + scope"; AMB-4 records that this question had no ID at all.
2. **What does GP1 say?** FACT: `0002` §3: *"Las decisiones, experimentos y demás artefactos del harness que deban formar parte del proyecto deben quedar versionados en Git"* / English interpretation supplied by the human; status `Accepted`, decided `2026-10-06` (`INDEX.md` L25); non-expansion list in §3 (not "everything always committed", not "agent may commit automatically", etc.).
3. **What happened operationally in Experiment 10?** FACT: scope reconstructed from ADRs + live repo; 21 explicit paths staged (no `git add .`); HD-2 announcement issued; after human confirmation, commit `a4653b9` created (21 files, 5,304 insertions); nothing pushed (`experiment-10-prompt.md` Steps 1–8).
4. **What should a future agent currently infer?** **INTERPRETATION:** the correct inference — "the persistence question is decided (GP1) and executed (`a4653b9`)" — is *reachable*: the `INDEX.md` table (L25) → ADR 0002, and `git log` show decision and execution. **But** nothing *requires* that inference: reading rule 3 (L39) directs the agent to experiment reports for open questions; Experiment 06 says PROV-GIT is open; no rule says records outrank reports, no rule marks the report list as historical, and no record states "GP1 *is* the answer to PROV-GIT" (its AMB-4 ID-mapping question was never answered). The agent must improvise the exact judgment `AGENTS.md` §1 prohibits.
5. **What information is missing to make the inference unambiguous?** FACT (three gaps): **(i)** a precedence rule across `AGENTS.md` / records / index / reports / conversation (Exp05 MM7, Exp06 R1–R4); **(ii)** a staleness/supersession marker for historical open-lists (reports are immutable by practice — Exp11 §16.4 — so either "superseded-by" cross-references, or a declared authoritative current-open source); **(iii)** an explicit identity mapping (GP1 ↔ PROV-GIT ↔ Exp02 H10's persistence half), which is an AMB-4/O7 leftover. **This experiment does not solve any of the three.**

**Precedence models (analysis only):**

| # | Model | Advantage | Disadvantage |
|---|---|---|---|
| C1 | `AGENTS.md` > records > reports/analysis > conversation (Exp06 R1) | Principles never silently overridden; matches §1 anti-invention stance | Amending a live rule requires an `AGENTS.md` edit (deliberately slower) |
| C2 | Records > `AGENTS.md` within record scope (R2) | Specificity lets decisions evolve practice cheaply | A stale/over-broad record could outrank a live principle (G4/G5 risk) |
| C3 | Most-recent-wins by date (R3) | Trivial to reason about | Dates are date-level only (`0001` A1) and partly interpreted (AMB-P2/AMB-A2) — load-bearing on shaky data |
| C4 | No rule (R4, status quo) | No decision now | FM8 persists; agent improvisation stays structural |
| Fail-safe | F1 write the default into `AGENTS.md` ("no or ambiguous record ⇒ not decided ⇒ ask") / F2 leave it practised-but-unwritten | F1 makes conservative behavior mandatory (it is already practised — Exp05 O8) | F1 adds text; F2 leaves the safety net unenforced |
| Open-list source | L1 keep `INDEX.md` L39 as-is / L2 declare lists historical, records+index authoritative for "decided", reports authoritative only as history / L3 create an open-question registry artifact (Exp05 D6/MM8) | L2 is cheap and matches current reality; L3 gives one canonical place | L1 is the staleness bug (rule vs immutable docs); L3 is a new artifact needing ownership (RD-LIFE territory) |

**HUMAN DECISION REQUIRED:** yes — precedence allocates authority (governance, `AGENTS.md` L133–141) and requires `AGENTS.md` text (L292).

**RECOMMENDATION (unapproved):** consider one decision session covering pointer + precedence + fail-safe (Exp06 R-D4a), leaning C1 + F1 + L2 as the most conservative combination consistent with `AGENTS.md` §1 — **explicitly not selected here**. Consider answering AMB-1's combined-or-separate question as *two decisions, one session* (RD-DISC = mechanics, RD-AUTH = authority).

**Risks:** choosing C2 without scope fields (D2/RD-SCHEMA) invites stale-override; C3 is unsafe while dates are interpreted; combining too much in one statement makes the rule hard to cite.

**Minimum acceptable decision:** an explicit precedence order among `AGENTS.md`, records, reports, and conversation + the fail-safe sentence + a statement of which artifact holds the *current* open-question list. **HUMAN DECISION REQUIRED — blocking root.**

**Verification implications:** V4, V5. **Deferrable:** no.

### D. Decision-record governance

**Problem (FACT):** the mechanism (D1) exists; its *substance* does not. Missing per record: identifier scheme (`D1`↔`0001` ordinals; three prefixes now in use — `0001` A2/A3, `0002` AMB-G3, `0003` AMB-P3, `0004` AMB-A3, Exp06 AMB-2/3), status vocabulary (`Accepted` partly interpreted — AMB-P1/AMB-A1; INDEX L29 warns none is standardized), date basis (AMB-P2/AMB-A2), template (INDEX L49), authority to write/transition (Exp03 D5, Exp06 §5, Exp05 MM4/FM6), supersession/amendment (Exp03 D7, Exp06 §6, `0001` §7), index maintenance (`0001` A7, INDEX L50), retention, lifecycle, and the records↔reports relationship (area C).

**Blocking vs improvement (INTERPRETATION, evidence-based):**

| Element | Blocking? | Reasoning |
|---|---|---|
| Status vocabulary + ID/numbering note | **Soft-blocking** | Repair will produce records 0005+; today the *human* supplies ID/status per task (4/4 precedent: D1, GP1, HD-1, HD-2 all human-given) → safe interim exists; but Exp06 O2/FM10 show drift risk grows per record, and INDEX L29's "no vocabulary" note sits in tension with rows it describes (AMB-P6) |
| Template/fields | No | Exp06 O4: the 11 fields already exist as human specification from Exp04 → *ratify-or-adjust*, not design-from-zero |
| Date convention | No | date-level precision suffices; interpretation flags already recorded |
| Authority to create records | No (live practice) | Creation happens only at explicit human task instruction (every record's provenance); transition never exercised (0 transitions to date) |
| Transition/supersession/amendment/retention/index-maintenance | No live trigger | 0 status changes, 0 supersessions, 0 index divergences observed; interim rule exists (`INDEX.md` L50 records-authoritative) |
| Records↔reports relationship | → **RD-AUTH** (area C) | same question |

**Candidate RD-SCHEMA — information model:**

* **Options:** D1 *ratify* the de facto 11-field record + publish a minimal vocabulary and an ID-assignment statement; D2 *full model* per Exp06 §3 (all elements, one shot); D3 *vocabulary-only* (3 statuses + date basis + "IDs assigned by the human per record"); D4 *defer* (status quo).
* **Advantages/disadvantages:** D1 low effort, matches O4, closes FM4/FM5 partly — but ratifies current interpretations without retro-validation; D2 complete — but agent-shaped granularity (Exp06 Q2) and big-bang; D3 smallest binding change — leaves fields implicit; D4 zero cost — FM10/O2/AMB-2 drift continues, and each record keeps carrying interpretation flags.
* **Risks:** schema adopted without human review of the flags; or schema debate delaying the two blocking roots (must not — see §9).
* **RECOMMENDATION (unapproved):** consider bundling **D3's minimal core** (status vocabulary + ID-assignment sentence) into the same session as the roots, deferring D1/D2's fuller form.
* **Minimum acceptable decision:** a status vocabulary (≥3 values with meanings) + statement "identifiers are assigned by the human project owner per record; file ordinals are storage-only".
* **Dependencies:** none on the roots; RD-LIFE depends on it.
* **Verification implications:** V3. **Deferrable:** yes (§11), with trigger.

**Candidate RD-LIFE — write/transition/supersession/retention/index-maintenance governance (bundles Exp03 D5+D7, Exp06 §5+§6, Exp05 MM4/MM5/MM6):**

* **Options:** D5 defer until first live trigger; D6 minimal lifecycle now (who transitions + supersede representation + index-update rule); D7 full governance now.
* **Trade-offs:** D5 matches zero-trigger evidence but risks the first transition being improvised; D6 covers the first real event at low text cost; D7 comprehensive, premature (and depends on RD-SCHEMA anyway — transitions cannot be well-defined without vocabulary).
* **RECOMMENDATION (unapproved):** consider D5 with *explicit triggers* (first status change, first supersession, first index/record divergence).
* **Minimum acceptable decision (when taken):** who may transition status; what a superseded record becomes (never deleted — `0001` §7 direction); who updates the index.
* **Dependencies:** RD-SCHEMA (vocabulary), RD-AUTH (conflict arbitration). **Verification:** V3, V8. **Deferrable:** yes.

### E. Future harness-artifact scope

**FACT — what GP1 establishes (verbatim scope, not expanded):** `0002` §3 — decisions, experiments, and other harness artifacts *that are part of the project* must be version-controlled in Git. **FACT — what it does NOT establish (its own non-expansion list + AMB-G4):** not "everything always committed"; not immediate/experiment-by-experiment commits; not Git-only persistence; not "all repo files are artifacts"; not agent auto-commit; not cadence, frequency, message, branch, staging, CI, release, or who commits (§3.1-4); and *no enumeration of classes is approved* ("any enumeration requires a future human decision", AMB-G4).

**Analysis (FACT/INTERPRETATION):**

* **How future agents identify in-scope artifacts today:** the settled classes — decision records + index (GP1 words + D1), reports ("experimentos"), prompt files (HD-1 class) — plus the documented default for anything else: stop and ask (`AGENTS.md` §1; AMB-G4). **INTERPRETATION:** the class-based rule *is* sufficient as a mechanism, because its unresolved branch routes to the human by design; what it deliberately does not provide is automatic coverage of novel classes.
* **Should prompts/reports automatically be included?** FACT: reports — yes, by GP1's own wording. FACT: the *existing* prompt class — yes (`0003` §3). FACT: prompt files *created after* HD-1 — **OPEN QUESTION** (AMB-P4: "not explicitly stated… requires human confirmation"); interim behavior = confirm at each commit gate (which HD-2 mandates anyway). FACT: new classes (generated output, exploratory material, temporary artifacts) — not classified; `.gitignore` covers 0 files today; modifying it is a governance act (Exp08 D-3/HD-4).
* **Temporary/generated material:** FACT none exists (repo contains only Markdown + `.gitignore`; `src/` empty; 0 ignored files). No decision needed until such a class appears → trigger-based deferral.
* **The operational gap:** FACT `0002` establishes an obligation, not a cadence; Experiment 11 §12(6) shows four in-scope artifacts re-accumulating within 24h of execution. Cadence is genuinely *not* in GP1 (§3.1-4) and not in HD-2 (announcement ≠ timing).

**Candidate RD-CADENCE — when/what commits are proposed (also area F's core):**

* **Options:** E1 propose a commit at each task/experiment completion when in-scope artifacts exist (announce → human gates); E2 milestone batching; E3 strictly per-task authorization only (status quo — each task explicitly allows/forbids); E4 standing agent discretion (structurally unsafe: collides with the silent-commit ban).
* **Advantages/disadvantages:** E1 matches demonstrated practice (Exp10) and `AGENTS.md` L69 small increments — but adds per-task announcement overhead; E2 fewer commits — longer durability window (the observed gap); E3 zero new policy — but GP1's obligation currently depends on each task's text, which is exactly how artifacts drifted untracked for 8 experiments; E4 rejected by HD-2's constraints.
* **Risks:** commit fragmentation (vs L69 — E1 aligns if "commit-ready unit" = one task's authorized outputs); message ambiguity persists until RD-MSG (folded below).
* **RECOMMENDATION (unapproved):** consider E1 with commit-ready unit = "one experiment's authorized outputs + any records it created", announced per HD-2 and gated per task.
* **Minimum acceptable decision:** a statement that the agent *proposes* commits at natural completion points (announce + explain, human confirms), instead of waiting solely for task text.
* **Dependencies:** none blocking; interacts with RD-PUSH (what happens after commits accumulate) and RD-MSG (element).
* **Verification:** V6. **Deferrable:** yes for repair; trigger approaching (two experiment streams pending).

### F. Git execution workflow

**FACT — three-way split mandated by the task:**

**1. Already decided:** who commits (both — `0004` §3); announcement + explanation before agent commits; silent commits prohibited (`0004` §3); pre-commit status inspection (L179); diff-belongs-to-current-task check (L186); verification-as-part-of-implementation + no unevidenced claims (L84–101); small verifiable increments (L69); report-what-was-inspected/changed/verified (L269–276); do not overwrite unrelated human work (L177–187); the announcement format itself, demonstrated in `experiment-10-prompt.md` Step 7.

**2. Implied operational consequences (INTERPRETATION — not new policy; flagged so they are not silently upgraded):**

* staging-set verification *before* announcing (follows from L186 + HD-2's "explain why");
* post-commit verification and reporting (follows from L84/L101/L269–276; demonstrated in Exp10);
* handling unrelated changes: leave them, report them (follows from L177–187; demonstrated repeatedly — e.g., `.git/gk/config` observation, human prompt-file concurrency);
* commit-ready unit ≈ current task's diff (follows from L69 + L186).

*These are recorded as consequences, not as decided rules; if the human wants any of them explicit, that is a one-line addition — HUMAN DECISION REQUIRED only for explicitation.*

**3. Genuinely new policy decisions:** when commits are proposed (**RD-CADENCE**, area E/F); commit-message conventions (**RD-MSG** — options: fold into RD-CADENCE / defer with informal `chore: …` precedent (3/3 commits) / adopt a convention now; FACT precedent exists but `0004` §3 explicitly did not decide it, and Exp10's proposal said "HD-2 does not establish commit-message conventions; this is a proposal you may edit"; **RECOMMENDATION: fold or defer**); branch policy (single branch `main`, no second branch exists — defer with trigger); PR/merge/release/force-push/CI/rebase (all in HD-2's explicit non-list `0004` §3 — defer with triggers; no live activity); push authority → **RD-PUSH** (area G, §14).

**RD-CADENCE** as candidate: see area E (consolidated; single candidate). **HUMAN DECISION REQUIRED:** yes, but **deferrable relative to repair** — the repair task will state its own commit handling, and HD-2's per-announcement gate covers safety meanwhile.

### G. Remote publication

**FACT — three distinct things:**

| Layer | State | Evidence |
|---|---|---|
| Local Git persistence | **Exists** | `a4653b9` holds all 27 in-scope files; Exp11 §4 P1 PASS |
| Remote persistence | **Absent** | `origin/main` = `ls-remote` = `5fd9f54…` (pre-GP1); any remote clone today lacks every decision/report/prompt file (Exp11 §8) |
| Publication/push authorization | **Undecided anywhere** | grep over `docs/decisions/*.md`: zero push-policy statements (Exp11 Q6 item 7; re-verified this session); `0004` §3 non-list includes force pushes; `0002` §3 says "versionados en Git" — **this experiment does NOT reinterpret that as push authority** (task §13); `AGENTS.md` never mentions push |

**FACT — does a new human decision be required before pushing? YES — HUMAN DECISION REQUIRED (RD-PUSH).** Reasons: (i) no recorded authority covers modifying remote state; (ii) GP1's obligation is about *version-control* of artifacts, explicitly non-expanding (§13); (iii) HD-2 covers *commits only* — its own non-list reaches force-pushes, and nothing adjacent implies publication (task §14); (iv) publication is externally visible behavior in a domain `AGENTS.md` L133–141 reserves to the human (product/tech decisions), and Exp10's own announcement said "Nothing will be pushed unless you separately request it" — observed practice = human-triggered push only.

**Analysis:** pushing does **not** depend on RD-CADENCE, RD-DISC, or RD-AUTH (independent root); it is **not blocking for harness repair** (repair = local text edits); it **is blocking for any push and for closing Exp05 FM2's remote half**. FACT (recorded above): a push now would fast-forward (remote is a direct ancestor) — no force decision needed *yet*. Detailed option analysis: §14.

**Candidate RD-PUSH — remote publication authority:** human required; dependencies: none (soft interaction with RD-CADENCE); verification: V7; **deferrable for repair, blocking for push.**

---

## 7. Decision Consolidation Analysis

**FACT — normalization of Experiment 11's HD-5…HD-10 plus the legacy open-catalogs (Exp03 D2/D3/D4/D5/D6/D7, Exp05 §11 list, Exp06 §13 list, Exp02 H8/H10), by consolidate / split / discard:**

| Source label(s) | Normalized into | Action & reasoning |
|---|---|---|
| HD-5 (Exp11) = Exp03 **D4** = Exp05 **D4**/MM1 = Exp06 P-set | **RD-DISC** (area A) | **Merge** — all describe one mechanism question (pointer location + content). Exp11 HD-5's "F1/F2" wording already spans decisions *and* experiments, absorbing area B's pointer half. |
| HD-6 (Exp11) = Exp03 **D3** (precedence + fail-safe) = Exp05 **D4**-half/MM7 = Exp06 §4 R/F sets | **RD-AUTH** (area C) | **Merge** — authority allocation, including the current-open-list question (L2 set) and optional registry (Exp05 D6/MM8 as an option, not a separate decision). Resolves Exp06 AMB-1 *as a proposal*: split pointer (RD-DISC) from authority (RD-AUTH) — two decisions, one session. |
| HD-7 (Exp11) = Exp03 **D2** (+ part of D7: ID reuse) = Exp06 §3 | **RD-SCHEMA** (area D) | **Merge; keep separate from roots** — schema does not block pointer/precedence (Exp06 §9 agrees: independent) though it should follow soon. |
| Exp03 **D5** + **D7** = Exp05 MM4/MM5/MM6 = Exp06 §5+§6 | **RD-LIFE** (area D) | **New consolidated candidate (not in HD-5…10)** — Experiment 11 omitted write/supersession governance entirely; grouping them is correct because all share one trigger property (zero live triggers today). |
| Exp02 **H8** = Exp05 "H8" row = Exp06 O5 | **RD-EXPCONV** (area B) | **New consolidated candidate** — history conventions; pointer half stays in RD-DISC. |
| HD-9 (Exp11) = Exp02 **H10**'s "when" half = Exp05 "Commit policy" remainder = Exp08 AMB-A5 remainder | **RD-CADENCE** (areas E/F) | **Merge** — all are the same tempo question. |
| *(H10's "message style" half; Exp11 had no label)* | **RD-MSG** | **Fold into RD-SCENCE's optional elements / defer** — single-contributor precedent working (3/3 messages fine); splitting it out would manufacture a decision. Listed under deferrable elements. |
| HD-8 (Exp11) = *(no legacy ID — Exp06 AMB-4 noted persistence lacked one; its push half never existed)* | **RD-PUSH** (area G) | **Keep as its own decision** — remote-state authority is materially different from local commit authority (external visibility); merging it into cadence would hide the GP1/HD-2 non-expansion boundary. |
| **HD-10 (Exp11)** = Exp08 **HD-4** | **DISCARD** | **Discard as a decision.** Exp08 L330/L356: HD-4 was conditional *only if HD-1 excluded files*; HD-1 included the whole class (`0003` §3) → condition never met; no `.gitignore` change is needed or wanted today (Exp08 L290: "out of scope" ≠ "ignored"). If a future class is ever excluded *and* should be invisible, the question resurfaces as a trigger-note under area E — no standing decision required. |
| Exp03 **D6** (backfill: do Exp02's H1–H14 become records?) | *deferred, no new ID* | Out of harness-repair scope; listed in §11 so it is not forgotten (it was listed the same way in Exp06 §13). |

**FACT — consolidated inventory: 7 candidate decisions** (RD-DISC, RD-AUTH, RD-SCHEMA, RD-LIFE, RD-EXPCONV, RD-CADENCE, RD-PUSH) **+ 1 discarded label** (HD-10/HD-4) **+ folded elements** (RD-MSG, open-list registry as an RD-AUTH option, `.gitignore` trigger-note).

**OBSERVATION:** Experiment 11's six provisional labels reduce to five decisions plus one discard; Experiment 06's five briefs plus Experiment 03's six-catalog plus Exp02's H8/H10 reduce to the same seven. **INTERPRETATION:** the open-decision space did not grow across eight experiments — only its *documentation* did; most "new" labels were re-entries of D2/D3/D4/D5/D7/H8/H10, which is itself the AMB-2/O2 catalogue-drift symptom (an argument for RD-SCHEMA's ID statement, not for more labels).

**HUMAN DECISION REQUIRED — normalization status:** the mapping above is analytical. Whether RD-* numbering is adopted, or HD-*/D-* legacy labels continue, is itself part of RD-SCHEMA (identifier governance) — **no scheme is chosen here**.

---

## 8. Decision Dependencies

```text
                    ┌─────────────┐
                    │   RD-DISC   │  pointer location + content (A, B-pointer)
                    └──────┬──────┘
                           │ soft: pointer should name the authoritative source
                    ┌──────▼──────┐
                    │   RD-AUTH   │  precedence + fail-safe + current-open source (C)
                    └──────┬──────┘
                           │ soft: authority semantics inform lifecycle
   ┌──────────────┐   ┌────▼──────┐
   │ RD-EXPCONV   │──►│ RD-SCHEMA │  vocabulary + ID statement (D)
   └──────────────┘   └────┬──────┘
      (soft: history        │ required by
       authority            ▼
       question)       ┌──────────┐
                       │ RD-LIFE  │  transition/supersession/index (D)
                       └──────────┘

   ┌──────────────┐         ┌─────────────┐
   │ RD-CADENCE   │ ~soft~► │   RD-PUSH   │   (independent roots; cadence feeds
   └──────────────┘         └─────────────┘    what accumulates to push)
```

**FACT — dependency statements:** RD-DISC and RD-AUTH are each independently decidable (neither requires the other), but Exp06 R-D4a recommends one session; RD-SCHEMA depends on neither root; RD-LIFE requires RD-SCHEMA (vocabulary) first; RD-EXPCONV soft-depends on RD-AUTH (which source is authoritative for history) and RD-DISC (what the pointer names); RD-CADENCE and RD-PUSH are independent roots with a soft operational link (cadence determines accumulation; push drains it); **nothing depends on RD-PUSH**, and **RD-PUSH depends on nothing** — it gates only remote-state actions.

**Minimum roots required before implementation can safely begin (INTERPRETATION):** **RD-DISC + RD-AUTH.** Every repair listed in §12's left column that is *currently identified* (pointers, precedence documentation, the index's gap-notes closure) is governed by exactly these two. Repair does not require schema (pointer wording needs no vocabulary), does not require cadence (the repair task will state its own commit handling under HD-2), and does not require push (local edits only).

---

## 9. Minimum Human Decision Set

**FACT — the minimum set before harness repair can begin:**

# **RD-DISC + RD-AUTH (two decisions)**

| | Decision | Covers |
|---|---|---|
| Root 1 | **RD-DISC** — where discovery pointers live and what they name (decisions + experiments) | Exp11 F1, F2; Exp05 MM1; Exp03 D4; areas A + B-pointer |
| Root 2 | **RD-AUTH** — precedence order + fail-safe default + where the current open-question list lives | Exp11 F3 (partial→complete), F4, F5 (partial→complete); the PROV-GIT test case; Exp05 MM7/FM8/FM9; Exp03 D3; area C |

**INTERPRETATION — why exactly two:**

1. Every identified repair (§12) either *is* one of these two or *documents* their outcome; the rest of the inventory changes behavior that is not currently misbehaving (no status changes, no supersessions, no second branch, no push attempts — zero live triggers).
2. Exp06 §9 reached a compatible structural conclusion ("minimum to repair safely: D4 + Git persistence"); Git persistence has since been decided *and executed* (GP1 + `a4653b9`), removing it from the set — which is why today's minimum is two, not three.
3. The roots are cheap: A1+L2 form is a few sentences of `AGENTS.md` text; cost is decision time, not implementation.

**RECOMMENDATION (unapproved), not part of the minimum:** consider answering **RD-SCHEMA's minimal core** (status vocabulary + ID-assignment sentence) in the same session — it would make the repair decisions themselves (records 0005/0006) recordable without new interpretation flags. **Tension disclosed (FACT):** Exp06 §9 stated "minimum before writing record N+1: D2 + D5"; this analysis treats the *existing* practice — human assigns ID/status per task (4/4 precedent) — as a safe interim, so schema is soft- not hard-blocking. **OPEN QUESTION:** whether the human accepts that interim or prefers schema-first; the choice does not change the repair's content, only its recording ceremony.

**Not in the minimum (and why):** RD-CADENCE (repair task states its own commit handling), RD-PUSH (local repair), RD-LIFE/RD-EXPCONV (no triggers), RD-SCHEMA (interim exists).

---

## 10. Agent-Safe Decisions

**FACT — items the agent can act on without any new human authority (each grounded in an existing rule or decision):**

| # | Item | Authority |
|---|---|---|
| S1 | **Propose** a commit with HD-2's announcement (intent + reason + scope), then **wait** | `0004` §3 gives authority; AMB-A4 (approval semantics) is open, so the conservative branch — announce, ask, wait — is what the record already requires of "a future agent in doubt" (`experiment-09-prompt.md` ambiguities) |
| S2 | Pre-commit verification: status inspection, staged-set listing, scope check vs current task, checksums | `AGENTS.md` L179, L186, L84–101 (already decided rules — execution, not policy) |
| S3 | Post-commit verification and reporting (state inspected/changed/verified, exact final git state) | `AGENTS.md` L269–276, L84; demonstrated Exp10 |
| S4 | Leave unrelated/concurrent changes untouched; report them (human prompt files, `.git/gk/config` pattern) | `AGENTS.md` L177–187; observed practice |
| S5 | Classify artifacts by the **existing** classes (records/index/reports/prompt files) and **stop-and-ask** for any novel class | `AGENTS.md` §1; `0002` AMB-G4; `0003` §3 |
| S6 | Flag stale/conflicting evidence when encountered — report, don't fix | `AGENTS.md` §Communication + § *Change Discipline* ("mention it; record it; do not implement") — exactly what this experiment does with PROV-GIT |
| S7 | Record a decision **when explicitly tasked**, using human-supplied ID/status, updating the index as the task authorizes | D1 mechanism + provenance of all four records (Exp04/07/09 tasks) |
| S8 | Draft pointer/precedence/templating *wording as proposals* for human approval | Drafting ≠ deciding; `AGENTS.md` L292 reserves the edit, not the draft |
| S9 | Write experiment reports when a task commissions them; append responses to prompt files when the human does so | Observed convention (reports 01–08; prompt-append pattern) — execution under task authority |

**FACT — explicitly NOT agent-safe:** editing `AGENTS.md`/`README.md`/ADRs/INDEX outside a task's authorization; choosing a precedence order; setting cadence or message rules; pushing; declaring any RD-* candidate decided. **OBSERVATION:** the agent-safe list is entirely *execution under existing rules* — which is why the gap analysis converges on routing/tempo decisions rather than behavioral ones.

---

## 11. Deferrable Decisions

**FACT — deferrable candidates with triggers (deferral is a proposal, not a decision):**

| Item | Class | Trigger that should end deferral | Risk while deferred |
|---|---|---|---|
| **RD-SCHEMA** | Important | Before/at the next record beyond routine human-assigned IDs, or first status conflict; RECOMMENDATION: same session as roots | Per-record interpretation flags (AMB-P1/A1-class) keep accruing; ID drift (O2/AMB-2/3) |
| **RD-CADENCE** | Important | Before the next multi-experiment batch; two experiment streams are already pending (trigger approaching) | GP1 obligation keeps re-accumulating untracked in-scope artifacts (observed) |
| **RD-PUSH** | Important | Before any push / before first public-visibility milestone | Remote clones keep failing P1 (FM2 remote half live); local/remote divergence window grows |
| **RD-LIFE** | Deferrable | First status change, first supersession, first index/record divergence | First transition improvised (mitigated by §1 ask + no vocabulary exists yet anyway) |
| **RD-EXPCONV** | Deferrable | When a report/prompts mismatch matters to someone; or with RD-DISC's session | Convention drift continues (already 6 prompt-only experiments) |
| **RD-MSG** (message conventions) | Deferrable element | First message-dispute or second contributor | Informal `chore:…` precedent may ossify without review |
| **Branch / PR / merge / release / force-push / CI / rebase** | Deferrable | First non-`main` branch, first contributor, first release | None today (single linear branch; FF-able remote) |
| **AMB-P4** (HD-1 temporal scope for new prompt files) | Deferrable-by-gate | Resolved at each commit gate (record says "requires human confirmation") | None — the gate is mandatory anyway (HD-2) |
| **Exp03 D6** (backfill of H1–H14 into records) | Deferrable, out of repair scope | When backfill is wanted | Old catalogs stay unmapped (already cross-referenced in reports) |
| **HD-4 / `.gitignore`** | **Discarded** (§7) | Only if a class is excluded *and* should be invisible | None |
| **Open-question registry** (Exp05 D6/MM8) | Option *within* RD-AUTH | Decided together with RD-AUTH L1/L2/L3 choice | Lists stay scattered |

**FACT — classification test applied (task §6):** none of the deferrable items changes externally observable harness behavior *today* (no status change occurs, no second branch exists, no push happens, no new artifact class is pending); each becomes observable only at its trigger. **RECOMMENDATION (unapproved):** record the deferral table's triggers in the repair decision's notes so triggers are discoverable later — pending human approval like everything else.

---

## 12. Harness Repair Boundary

### Harness repair (legitimate scope *after* the human decisions + a human-authorized repair task)

| Repair | Gated by |
|---|---|
| Add discovery pointer(s) to `AGENTS.md` (and/or README if chosen) naming `docs/decisions/INDEX.md` + `experiments/` | RD-DISC (+ L292 authorization via the repair task) |
| Write precedence order + fail-safe default; state where the current open-question list lives | RD-AUTH |
| Update `INDEX.md` discovery notes (L48–50) to record the pointer's existence / mark gap-notes closed | RD-DISC outcome; task authorization (index edits are task-authorized by precedent) |
| Document artifact-scope guidance (restating GP1 + HD-1 classes + the ask-default — **no new policy, only existing decisions made findable**) | Task authorization; wording must not exceed `0002`/`0003` non-scope lists (task §13) |
| Record the repair decisions themselves as records 0005/0006 + index rows | RD-DISC/RD-AUTH outcomes; D1 mechanism; human-assigned IDs (interim §9) |
| Mark stale sources per whatever convention RD-AUTH sets (e.g., a "superseded-by" note *where allowed*) | RD-AUTH — reports must not be silently edited beforehand |
| Document Git workflow (cadence/message) **only if decided** | RD-CADENCE (+ RD-MSG if folded in) |
| Lifecycle/template rules **only if decided** | RD-SCHEMA → RD-LIFE |

### Non-repair / future product work (out of scope — must not be pulled in)

**FACT — excluded with citations:** website technology stack (`0001` §6 non-scope, `0002` §3.1-4, `AGENTS.md` L192–194); site architecture/vision content (`docs/*.md` are product files, currently empty by design); content system, curriculum implementation (repository `AGENTS.md` § Purpose — educational website content); deployment/hosting/domain/budget (Exp02 H11, open); license/privacy/analytics (Exp02 H12, open); product-language/format (Exp02 H9); anything requiring `src/` code (none exists).

**OBSERVATION — one boundary friction (FACT):** if the human picks README as a pointer location (option A2/A3), the repair edits a *product* file (currently 0 B). That does not make it product design, but it does merge harness text into the future product's front door — flagged so the choice is made knowingly.

**RECOMMENDATION (unapproved):** hold the boundary by scope statement in the repair task: "modify only the pointer/precedence sentences; no product content, no stack, no new artifacts beyond the decided records."

---

## 13. Verification Requirements

**FACT — testable verifications, per repair area (pass/fail stated in advance):**

| # | Area | Test | Pass criterion |
|---|---|---|---|
| **V1** | RD-DISC static | `grep -n "docs/decisions" AGENTS.md` (or chosen file) | ≥1 match at the agreed location; wording cites the index path; no unrelated `AGENTS.md` lines changed (diff review) |
| **V2** | Discovery behavior | Rerun Experiment 11 §5's protocol as a fresh-session simulation (root → README → harness file → …), recording steps | Agent reaches the index **by citing the pointer** as its reason (not directory-name luck); steps-to-index ≤ 3 from root; can also locate `experiments/` from the same guidance; P2 re-scored vs baseline (11 steps, 5 pointerless) |
| **V3** | RD-SCHEMA (if decided) | Present record N+1 (the repair record itself) against the approved vocabulary/ID statement | Status value from the approved set; ID human-assigned per rule; no new "flagged interpretation" rows for status/ID; `INDEX.md` L29 note updated or removed as decided |
| **V4** | RD-AUTH — PROV-GIT regression | Fresh session given Exp06 L474 + `0002` + `a4653b9` evidence, asked "is persistence decided?" | Answer "decided + executed" **with a citation to the precedence rule**; no improvised judgment; consistent with V5 |
| **V5** | RD-AUTH — conflict drill + history | Synthetic disagreement: a report says OPEN, a record says Accepted; also ask "what is the current open-question list?" | Same verdict from two sessions; current-open source named per the rule; historical lists treated as history (staleness case closed) |
| **V6** | RD-CADENCE (if decided) | Observe next experiment completion | Announcement issued (or documented deferral); after authorized commit, in-scope untracked count returns to 0; commit-ready unit matches the decision |
| **V7** | Remote/publication (only if RD-PUSH decided) | `git ls-remote origin` vs local HEAD after an authorized push; then P1 check on a remote clone | Remote ref == pushed commit; remote clone contains all in-scope artifacts; **if push remains unauthorized: verification is `ls-remote` unchanged + "no push" claim in the report** |
| **V8** | Local persistence (regression) | Exp11 §4 protocol: `git ls-tree -r HEAD` category counts after any repair commit | 27+ files, all five categories present; `git fsck` clean |
| **V9** | Boundary integrity (any repair) | md5/diff baselines for `0001`–`0004`, all prior reports, `.gitignore`; `git status` | Prior files byte-identical except explicitly authorized edits; no product files touched; no untracked additions beyond the authorized set |
| **V10** | Decision hygiene (any analysis/repair output) | Label audit | Every recommendation carries RECOMMENDATION/unapproved; no "must" attributed to a human; undecided rows stay undecided |

**OBSERVATION:** V2 and V4/V5 are the experiment-grade tests — they measure the *behavioral* outcome (a future agent's path and judgment), not merely the presence of text; V1 alone would repeat Experiment 11's "file exists ≠ harness discoverable" lesson.

---

## 14. Remote Publication Analysis

**FACT — the distinction, stated precisely:**

1. **Local Git persistence exists and is verified** — commit `a4653b9` (3rd commit), 27 tracked files, clean tree, all five artifact categories present (Exp11 §4).
2. **Remote repository persistence does not include GP1's output** — local ref `origin/main` and live `git ls-remote --heads origin` both return `5fd9f54…` (pre-GP1, 6 tracked files). Every claim in Exp11 about P1/P2 was local-only; **any clone from `origin` today reproduces Exp05 FM2's original failure** (no D1, no index, no reports, no prompts).
3. **Publication/push authorization is undecided** — FACT (grep, re-verified): no push policy in any record; `0004` §3's non-list explicitly reaches force pushes; `0002` §3's "deben quedar versionados en Git" is an obligation about *version-control of artifacts*, and this analysis does **not** expand it to remote publication (task §13); HD-2's grant covers *creating commits* only (task §14); `AGENTS.md` is silent on push; observed practice: 3 commits, 0 pushes, Exp10's announcement "Nothing will be pushed unless you separately request it."

**INTERPRETATION — is a new human decision required before pushing?** **Yes (RD-PUSH, HUMAN DECISION REQUIRED).** Grounds: (i) authority vacuum — no record lets anyone, agent or human-via-agent, modify remote state; (ii) scope discipline — GP1/HD-2 non-expansion lists were written precisely to prevent this inference; (iii) responsibility allocation — externally visible publication sits in `AGENTS.md` L133–141's human-reserved domain; (iv) asymmetry of consequence — a push is trivially reversible locally but not observably (remote history/visibility may be seen by others first).

**FACT — decision-relevant mechanics:** remote is a **direct ancestor** of HEAD (`merge-base --is-ancestor` → true), so an authorized push would **fast-forward**; no force-push decision is needed for catch-up (force-push remains undecided for hypothetical divergent futures). The remote URL exists (`github.com/raulferrer-ai/harness-engineering-course.git`); **OPEN QUESTION: repository visibility (public/private) is not recorded anywhere in the repository** — relevant because publication exposure differs for a public repo.

**Candidate options (analysis only):**

| # | Option | Advantage | Disadvantage |
|---|---|---|---|
| G1 | Human-only push (status quo) | Zero new authority; full human control | Remote stays pre-GP1 indefinitely; every local commit widens divergence; the repo's remote mirror misrepresents its local state |
| G2 | Agent push allowed with HD-2-style announcement + explicit confirmation per push | Symmetric with the decided commit rule; minimal ceremony; auditable | Extends agent authority to remote state — a deliberate governance choice to approve |
| G3 | Standing rule: push after each commit (announced, no per-push gate) | Keeps remote continuously current | Highest exposure velocity; weakest human gate; premature while cadence itself is undecided |
| G4 | Milestone-based push (human designates milestones) | Matches a publishing rhythm | Requires cadence/milestone definition first (couples to RD-CADENCE) |

**RECOMMENDATION (unapproved):** consider deciding RD-PUSH **before the next publication-relevant milestone**, and if agent participation is wanted, consider G2 (mirror HD-2's announcement + confirmation pattern) as the smallest symmetric extension — **not selected; explicitly undecided.** Also consider noting the repository's visibility status wherever publication decisions are recorded (open question above).

**Minimum acceptable decision:** a statement of *who may push, under what gate, and to which remote*. **Deferrable for harness repair; blocking for any push.** **Verification:** V7.

---

## 15. Harness Observations

*All INTERPRETATION unless marked FACT.*

1. **The harness measures its gap more reliably than it closes it.** FACT: the same `grep` for a pointer has now been run in three experiments (Exp05 S2, Exp06 evidence-5, Exp11 S4) — each time returning zero; D4 has been open since 2026-10-06 while eight experiments ran. OBSERVATION: measurement loop works; decision loop has latency. The bottleneck is not analysis quality — it is decision packaging (which is what §9 attempts).
2. **Consolidation shrank the space instead of growing it.** FACT: 7 candidates absorbed HD-5…HD-10, Exp03's D2–D7, Exp05's seven-row list, Exp06's five briefs, and Exp02's H8/H10; one label was discarded outright. OBSERVATION: every "new" gap label mapped to an existing catalog entry — catalogue drift (O2/AMB-2) is documentation noise, not new undecidedness.
3. **The blocking set is two `AGENTS.md` sentences.** FACT: RD-DISC + RD-AUTH are both text edits to one file; everything else has interim behavior. INTERPRETATION: the cheapest decisions in the inventory are the ones deferred longest — the harness's cost is concentrated in the human gate, which suggests decision *sessions* (batching) over decision *sequences*.
4. **Existing `AGENTS.md` rules already cover most of area F.** FACT: L69, L84–101, L179, L186, L269–276 pre-decide scope verification, pre/post-commit inspection, and reporting. OBSERVATION: the "Git workflow gap" is narrower than Exp02 H10 implied — what remains is tempo, message style, and remote authority, not hygiene.
5. **INDEX reading rule 3 contains a latent contradiction (FACT).** L39 asserts "The current list of open questions lives in those experiment reports" — but reports are immutable historical documents, and at least one list they hold (Exp06 L474) is now wrong. The rule directs agents to *stale-by-design* sources for *currency*. This is a rule-level defect, not merely evidence drift — and it is inside the file that would be pointed at by RD-DISC.
6. **GP1 executes as a flow, and the flow already refilled.** FACT: four uncommitted in-scope artifacts (2 prompts, 2 reports) within 24h of `a4653b9`. OBSERVATION: cadence is the only reason P1 is true-at-HEAD and false-in-the-working-tree.
7. **Prompt files became the primary history channel before any convention said so.** FACT: 6 of 12 experiments have no report; the ADR provenance chains (Exp04/07 prompts; Exp09/10 prompts) are the sole narrative records. OBSERVATION: HD-1 (yesterday) was, in effect, a retrospective ratification of this drift — RD-EXPCONV would formalize what practice already decided informally.
8. **Decision hygiene has held across eight experiments.** FACT: `AGENTS.md` md5 constant (`7355a77e…`) since 2026-10-06; no recommendation has been silently adopted; every record's status/date ambiguity is flagged rather than smoothed. OBSERVATION: the failure mode here is *not* agent overreach — it is unmade decisions accumulating documentation about themselves.
9. **The human-ID assignment practice works (so far).** FACT: D1, GP1, HD-1, HD-2 were each uniquely human-assigned, 4/4 collision-free. OPEN QUESTION: this is observed luck-plus-discipline, not a rule; RD-SCHEMA's ID sentence exists to convert it from practice into policy.
10. **OPEN QUESTION — remote visibility:** nothing in the repository records whether `origin` is public or public-to-be; a public pre-GP1 mirror would show a "living example" repository missing the example's harness (AGENTS.md § Purpose tension).

---

## 16. Recommendations

**FACT — every item below is a RECOMMENDATION pending human decision; none is approved; none creates an obligation:**

* **R1 —** Consider resolving **RD-DISC + RD-AUTH in a single decision session** (pointer location/content + precedence order + fail-safe + current-open source), per Exp06 R-D4a and §8's root analysis — the minimum set that unblocks repair (§9).
* **R2 —** Consider bundling **RD-SCHEMA's minimal core** (status vocabulary + human-assigned-ID sentence) into that same session, deferring the fuller information model (§6-D options D1/D2).
* **R3 —** Consider executing repair as **one authorized task** with pre-declared verification (V1, V2, V4, V5, V9, V10), so pointer and precedence land together and are measured behaviorally, not just textually (§13).
* **R4 —** Consider **discarding HD-10/HD-4** as a standing decision (condition never met; trigger-note suffices) — closing one of Experiment 11's six proposals outright (§7).
* **R5 —** Consider **deferring RD-LIFE, RD-EXPCONV, RD-CADENCE, RD-PUSH** per §11's trigger table, and recording those triggers somewhere durable *when the repair is authorized* (the trigger table itself becomes repair-task content, not new policy).
* **R6 —** Consider deciding **RD-PUSH before the next publication milestone**; until then, treat "no push" as the verified status quo (V7's no-push form) and state remote-staleness explicitly in any persistence claim (§14).
* **R7 —** Consider fixing INDEX reading rule 3's currency claim **as part of RD-AUTH's outcome** (not before — editing it now would pre-empt the decision) (§15.5).
* **R8 —** Consider a **post-repair re-measurement** (rerun Exp11's protocol as the next experiment) so F1–F7 get before/after evidence rather than assumed success.
* **R9 —** Consider **committing the pending Experiment 11/12 streams when the human authorizes it** under HD-2's announcement pattern — an act already covered by existing decisions (GP1 + HD-2), needing no new one; cadence policy (RD-CADENCE) determines whether this stays episodic or becomes routine.

**FACT — explicitly NOT recommended:** implementing any of the above now; treating any RD-* label as assigned; editing `AGENTS.md`, `README.md`, records, or the index in this experiment; pushing; any reinterpretation of GP1/HD-2 beyond their recorded text.

---

## 17. Result

# **PASSED**

**FACT — against the task's success criteria:**

| Criterion | Evidence |
|---|---|
| Areas A–G covered separately | §6 (A, B, C incl. PROV-GIT five-question test, D, E, F three-way split, G) |
| Normalized inventory, not a copy of HD-5…HD-10 | §7: 7 candidates, 1 discard, folded elements; mapping from five legacy catalogs |
| Minimum viable decision set determined | §9: **two** (RD-DISC, RD-AUTH) + one recommended bundle; §8 root graph |
| Blocking / deferrable / agent-safe / detail separated | §9, §10 (S1–S9), §11 (trigger table), element-level folds in §6-F |
| Dependency graph + minimum roots | §8 |
| Repair boundary vs product work | §12 (two columns with gating) |
| Testable verification plan | §13 (V1–V10 with pass criteria) |
| Remote analyzed as three distinct layers | §14 (+ §3 FF/ancestor facts) |
| GP1/HD-2 scopes not expanded | §6-E verbatim non-lists; §14 push non-inference; §5 already-resolved table quotes only recorded wording |
| No decision made; recommendations marked | Every option table lacks a selection; all R*/RECOMMENDATION carry "unapproved"; §19 rows undecided |
| Exactly one file created; no other change | §20 |

**Qualifications (declared, not disqualifying):** **Q1** — option lists are agent-generated and may be incomplete (same epistemic limit Experiment 06 Q1 recorded: the human may know options absent here). **Q2** — Experiments 05/06 were inspected by targeted sections (§2 declares which), not linearly end-to-end. **Q3** — the "safe interim" reading in §9 (human-assigned IDs making RD-SCHEMA soft-blocking) is an INTERPRETATION the human may reject in favor of Exp06 §9's stricter "schema before record N+1". **Q4** — repository visibility of `origin` is unknown and could affect RD-PUSH weighting (§14).

**FACT — the central question's answer:** of Experiment 11's findings, **3 issue-groups were already resolved** by GP1/HD-1/HD-2 + execution (persistence locally, prompt scope, commit authority), **2 require new human decisions to repair the harness** (discovery, precedence), **1 is discarded as moot** (HD-10/HD-4), and **4 remain as important-but-deferrable** (schema, cadence, push, lifecycle/conventions) with defined triggers; the remainder of area F is agent-safe execution of existing rules.

---

## 18. Lessons Learned

*INTERPRETATIONS; none is a decision.*

1. **Consolidation is a result, not a chore.** Reducing six proposals plus four legacy catalogs to seven candidates (one discarded) proved the open-question *space* is stable while its *documentation* inflates — the correct response to decision explosion is normalization, not more labels.
2. **The minimum viable decision set shrinks as sibling decisions land.** Exp06 needed "D4 + Git persistence"; persistence has since been decided *and executed*, so today's minimum is two. Minimums are *time-stamped conclusions*, not permanent lists — they must be recomputed per experiment, exactly as this one was.
3. **A stale-evidence test case turns precedence from philosophy into engineering.** PROV-GIT gave V4/V5 a concrete, reproducible drill; without it, "precedence matters" would remain an assertion. Every future governance rule should ship with its own regression test.
4. **Reading rules can be staler than the data they govern.** INDEX rule 3's "current list lives in those reports" was plausibly true when written and is now a rule pointing at immutable stale documents — defects accumulate in *routing metadata*, the same layer as F1/F2, which suggests routing text needs its own review cadence.
5. **Discarding is a legitimate consolidation outcome.** HD-4/HD-10 cost three documents' attention to conclude "condition never met"; recording the discard prevents it from being re-proposed (a fourth time would be catalogue drift, not diligence).
6. **Separating "decided / implied / new" preserved the GP1 and HD-2 boundaries.** The three-way split in §6-F made it visible that most workflow worries were already answered by `AGENTS.md` — without the split, the analysis would likely have re-asked decided questions (the exact failure mode Exp08's instruction to "avoid asking what is already resolved" targets).
7. **Behavioral verification beats textual verification.** V1 (grep) can pass while V2 (fresh-agent path) fails — a lesson this report itself draws from Experiment 11's "file exists ≠ discoverable"; repair verification must measure the agent's path, not the file's presence.
8. **The cheapest decisions are the ones deferred longest.** Two sentences have outrun eight experiments — packaging them tightly (§9) attacks latency, which the evidence shows is the harness's real bottleneck, not analysis capacity.

---

## 19. Human Decisions Required

**FACT — nothing in this table is decided, approved, or assumed. Proposed wordings are drafts for consideration. Labels RD-* are proposed; no identifier scheme exists (that is RD-SCHEMA's question).**

| Proposed ID | Title | Proposed decision statement (DRAFT — undecided) | Why required | Dependencies | Consequence if unresolved |
|---|---|---|---|---|---|
| **RD-DISC** | Discovery pointers | *"A sentence in `AGENTS.md` [or: chosen location] states that recorded human decisions are indexed at `docs/decisions/INDEX.md`, that experiment history lives in `experiments/`, and that both are read before making changes."* (location + exact wording = the decision) | F1/F2 Absent; discovery stays search-based; three experiments measured the same zero | Soft: same session as RD-AUTH | Every recorded decision stays potentially-unheard (Exp05 FM1/FM3); P2 stays "lucky" |
| **RD-AUTH** | Authority & precedence | *"When sources conflict: `AGENTS.md` > recorded decisions > experiment reports/analysis > conversation [order = draft]; no/ambiguous record ⇒ not decided ⇒ ask; the current open-question list is kept at: ___."* | F4 Absent, F3/F5 partial; PROV-GIT case unresolvable by rule; stale lists actively mislead | Soft: RD-DISC session; informs RD-LIFE/RD-EXPCONV | Agents improvise authority judgments (FM8/FM9); stale "OPEN" rows remain undetectable-as-stale |
| **RD-SCHEMA** | Record information model | *"Status vocabulary = {…}; identifiers are human-assigned per record; file ordinals are storage-only; required fields = {…}."* (minimal core vs full model = the decision) | Three ID prefixes in use; statuses partly interpreted; each new record accrues flags | None for roots; gates RD-LIFE | ID/status drift continues; record N+1's ceremony stays ad hoc (4/4 precedent may break) |
| **RD-CADENCE** | Commit tempo & unit | *"The agent proposes a commit when ___ [e.g., each task's authorized outputs complete], announced per HD-2 and confirmed by the human; commit-ready unit = ___."* | GP1 obligation has no delivery rhythm; 4 artifacts already re-accumulated | None (soft: RD-PUSH) | GP1 compliance stays task-text-dependent (how it failed for 8 experiments) |
| **RD-PUSH** | Remote publication | *"Who may push to `origin`: ___; gate: ___; verification: ___."* | No push authority exists anywhere; remote is pre-GP1 | None (independent) | Remote clones keep failing P1; divergence grows; publication can't proceed (but repair can) |
| **RD-LIFE** | Transition/supersession/index governance | *"Who may transition status; what superseded records become; who updates the index."* | D5/D7 open; first transition would be improvised | RD-SCHEMA, RD-AUTH | First status change lacks a rule (no trigger has fired yet) |
| **RD-EXPCONV** | Experiment conventions | *"Each experiment leaves: [prompt file always / report when ___]; history = reports + prompts; authoritative for what: ___."* | H8 open; 6/12 experiments report-less by drift | Soft: RD-AUTH, RD-DISC | Record shape keeps drifting; "living example" claim rests on accident |
| ~~HD-10~~ | *(`.gitignore` treatment)* | **DISCARD proposed** — condition (HD-1 excludes files) never met; trigger-note only | — | — | — (discarding removes noise; nothing needed) |

**FACT — also unresolved and relevant but not posed as new decisions here:** RD-MSG/branch/PR/merge/release/force-push (HD-2 non-list; deferred per §11), AMB-P4 (resolved per commit gate), Exp03 D6 backfill, repository-visibility question (§14), and the identifier scheme *for the RD labels themselves* (inside RD-SCHEMA).

---

## 20. Verification

**FACT — performed after writing this file:**

1. **Exactly one new file:** `experiments/12-harness-repair-decision-analysis.md` exists; `git status --short --untracked-files=all` shows only it plus the three pre-existing untracked files (Exp11 report + prompts 11/12) — no other new or changed path.
2. **No existing file modified:** `git diff HEAD` empty; `git ls-files -m` empty; md5 baselines re-checked and unchanged — `AGENTS.md` `7355a77e…`, `INDEX.md` `94ea0e5e…`, `0001` `5f9deeb4…`, `0002` `04af7636…`, `0003` `a7b53e6a…`, `0004` `f7ec871c…`, all six reports, `.gitignore` `8f7a9110…`, prompts 01–10.
3. **No files staged:** `git diff --cached --name-only` empty.
4. **No commit created:** HEAD `a4653b96b60e0c6fe258aadf2ac008370a308c43`; commit count 3; log unchanged.
5. **No push performed:** `git rev-parse origin/main` = `5fd9f54…`; `git ls-remote --heads origin` returns the same; stash empty.
6. **Current HEAD recorded:** `a4653b96b60e0c6fe258aadf2ac008370a308c43` (§3).
7. **Current remote state recorded:** `origin/main` = `5fd9f5437bd27276dbaec511f86e31daa3dc36b0`, one commit behind local, fast-forwardable (§3, §14).
8. **Working-tree state recorded:** 27 tracked (clean vs HEAD), 0 staged, 0 modified, 0 stash; 4 untracked after this file (3 pre-existing + this report); `src/` empty (§3, verified).
9. **Major conclusions grounded in evidence:** every §5–§15 claim cites a repository file and line/section (spot-check targets: `INDEX.md` L39/L48–50, `AGENTS.md` L69/L84/L179/L186/L292, Exp06 L474, Exp08 L356, `0002` §3, `0004` §3, Exp10 Steps 7–8, Exp11 F-table/§17).
10. **All proposed decisions remain explicitly undecided:** no option table contains a selection; all RECOMMENDATION blocks carry "unapproved"; §19 statements are marked DRAFT; no status was set; no record created.
11. **No harness or product implementation:** `AGENTS.md`, `README.md`, `docs/**`, prior reports, `.gitignore`, `src/**` untouched; no template or new artifact created beyond this report.

**Not done, by instruction:** no repair; no `AGENTS.md`/README/ADR/INDEX edits; no staging/commit/push; no precedence, discovery, Git, or cadence rule established; no Experiment 13 started; no recommendation implemented.

**Exact final Git state:** HEAD `a4653b96b60e0c6fe258aadf2ac008370a308c43` · 3 commits · 27 tracked (clean) · 0 staged · 0 modified · 4 untracked (`11-fresh-clone-persistence.md`, `experiment-11-prompt.md`, `experiment-12-prompt.md`, `12-harness-repair-decision-analysis.md`) · stash empty · `origin/main` = `5fd9f54…` (unchanged; no push; remote one commit behind).
