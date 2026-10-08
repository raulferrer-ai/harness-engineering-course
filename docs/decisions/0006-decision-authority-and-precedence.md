# RD-AUTH — Authority and precedence between current decisions and historical evidence

*Sixth recorded decision of this repository — recorded using the ADR-per-decision plus index mechanism established by D1.*

**Label legend:** **Fact** = observed in the repository, in `AGENTS.md`, or in the decision statement communicated by the human project owner. **Observation** = a fact plus its immediate significance. **Interpretation** = an inference beyond the observed data. **Recommendation** = an option for evaluation; decides nothing. *(Ambiguity references in this record are local: `AMB-R1`–`AMB-R5`; D1's `A1`–`A7`, GP1's `AMB-G1`–`AMB-G6`, HD-1's `AMB-P1`–`AMB-P7`, HD-2's `AMB-A1`–`AMB-A7`, and RD-DISC's `AMB-D1`–`AMB-D4` are separate.)*

---

## 1. Record fields

| Field | Value | Basis |
|---|---|---|
| **Decision ID** | `RD-AUTH` | **Fact** — the identifier used for this decision in the human project owner's recording instruction (this task), following the label used in `experiments/12-harness-repair-decision-analysis.md` §6/§7/§19. The relationship between `RD-AUTH` and the file number `0006` (both assigned by the task instruction) is not governed by any established identifier scheme — see ambiguity AMB-R4. |
| **Title** | Authority and precedence between current decisions and historical evidence | **Fact** — specified verbatim by the human's recording instruction. |
| **Status** | `Accepted` | **Fact** — the status value `Accepted` was explicitly specified by the human project owner's recording instruction ("Record the decision as: … Status: Accepted"), unlike HD-1/HD-2 where no status string was communicated (contrast AMB-P1). The status **vocabulary itself** remains unstandardized (D1 A3; Experiment 06 D2 open) — the value is human-approved for this record, not a vocabulary decision. |
| **Decided by** | Human project owner | **Fact** — the task states these are "already-decided human decisions… explicitly approved by the project owner"; the agent did not select the option. |
| **Decision date** | `2026-10-08` (date-level precision only) | **Fact** — the approval was communicated by the human project owner in the current session, dated `2026-10-08`; the environment clock was verified at recording time (`Thu Oct 8 15:01:48 CEST 2026`). The recording instruction authorizes using this date from session evidence (task §9). The decider communicated no date *string* — see ambiguity AMB-R2 (ordering) for the related precision note. |
| **Scope** | The authority relationship among: accepted decision records/ADRs (current human decisions), `AGENTS.md` (operational rules, compatible with those decisions), `docs/decisions/INDEX.md` (navigation, not policy authority), and `experiments/` (historical evidence) — including the rule for a historical report conflicting with a later ADR | **Fact** — taken directly from the six-rule decision statement communicated in the recording instruction (§3). |
| **Explicit non-scope** | This decision does **not** establish: a general ADR supersession mechanism; a complete status lifecycle; conflict resolution between two contradictory ADRs; amendment rules; retention rules. It does **not** decide who may edit `AGENTS.md` or the index, the wording of any `AGENTS.md` wiring (implementation is a separate future action), or the website technology stack. | **Fact** — the first list is stated explicitly and verbatim by the recording instruction ("Do NOT invent… Those remain unresolved unless already explicitly decided elsewhere"); the remainder follows from the task's implementation boundary (§11) and `AGENTS.md` § *The human remains responsible for product decisions*. |
| **Record file** | `docs/decisions/0006-decision-authority-and-precedence.md` | **Fact** — path specified by the human's task instruction, not chosen by the agent. |

---

## 2. Context

**Fact — evidence from previous experiments (recorded as provenance, not as retroactive requirements):**

* Experiment 05 (§5) found that only *location + human attribution + status* signal authority, that report labels are "convention only", and that no precedence rule exists anywhere (FM8, FM9, MM7).
* Experiment 06 (§4) analysed the question as a brief spanning Experiment 03's D3 (precedence rule + fail-safe default) and D4 (discovery pointer), offering precedence options R1–R4 and fail-safe options F1–F2, all then-unapproved; its §13 left "D4 (Exp03 D3+D4)" OPEN.
* Experiment 11 measured the gap as **F3 Partially present, F4 Absent** (no documented relation between ADRs and `AGENTS.md`, no records-vs-reports rule) and demonstrated a **live stale-information case**: `experiments/06-decision-specification.md` line 474 still lists **PROV-GIT as OPEN**, although GP1 had since been decided, recorded, and executed (§10, §11).
* Experiment 12 (`experiments/12-harness-repair-decision-analysis.md`) consolidated the question into candidate **RD-AUTH** (§6 area C, including the five-question PROV-GIT test case), identified it as one of the two minimum root decisions (§9), and drafted a statement that remained explicitly undecided (§19, marked DRAFT).

**Fact — the human has now decided RD-AUTH**, approving **option B** with the explicit minimum authority rule communicated in the recording instruction (§3), including the Experiment 06 / GP1 motivating example.

**Fact — characterization supplied with the decision:** the recording instruction states the rule's components (current decisions = accepted records/ADRs; `AGENTS.md` = operational rules compatible with them; index = navigation, not independent policy authority; `experiments/` = historical evidence; later ADR wins over conflicting historical report; the report is not rewritten merely to remove the historical state) and explicitly bounds it ("Do not extend this decision into a complete decision lifecycle, supersession system, status taxonomy, or conflict-resolution framework beyond what is explicitly stated"). **No further rationale was communicated, and none is manufactured here.**

**Observation — the motivating case is concrete and verifiable:** Experiment 06 recorded PROV-GIT open; GP1 was decided and recorded (ADR `0002`); GP1 was executed (Experiment 10, commit `a4653b9`). Before this decision, nothing *required* an agent to read Experiment 06's row as historical.

---

## 3. Decision (as made by the human project owner — not altered)

**Fact — the decision statement as communicated in the recording instruction (substance preserved verbatim):**

> 1. Accepted human decision records/ADRs represent current human decisions.
> 2. `AGENTS.md` contains operational rules and must remain compatible with those human decisions.
> 3. `docs/decisions/INDEX.md` is a navigation/index mechanism and is not an independent policy authority.
> 4. `experiments/` contains historical evidence.
> 5. When a historical experiment report conflicts with a later human decision recorded in an ADR, the later human decision represented by the ADR is authoritative for the current state.
> 6. The historical experiment report remains historical evidence and must not be rewritten merely because its previous state is no longer current.

**Fact — the motivating example, communicated by the decider as part of the decision:**

> * Experiment 06 recorded `PROV-GIT` as open.
> * GP1 was subsequently decided and recorded in ADR 0002.
> * GP1 was subsequently executed in Experiment 10.
> * Therefore Experiment 06 remains historical evidence, while ADR 0002 represents the current human decision.

**Fact — the approved option:** the human project owner approved **option B**, "with the explicit minimum authority rule described above". The label "B" and its full content are established by the human's approval itself (see AMB-R1 for the label-to-table mapping note).

**Fact — what RD-AUTH does NOT state.** Per the recording instruction itself, this decision does **not** establish:

* a general ADR **supersession** mechanism;
* a complete **status lifecycle**;
* **conflict resolution between two contradictory ADRs** (rule 5 addresses ADR-vs-historical-report only);
* **amendment** rules;
* **retention** rules.

**Fact:** those remain **unresolved** unless already explicitly decided elsewhere. **Nothing unresolved is represented as decided by this record.**

### 3.1 Authority boundary (required explicit statements)

**Fact — this ADR states explicitly that:**

1. **RD-AUTH was decided by the human project owner.** The agent did not select, expand, narrow, or alter it; the agent's role here is scribe only.
2. **The agent is recording the decision, not making it.** Writing this record confers no authority on the writer — recording a decision and owning it are separate acts (consistent with D1 §3.1, GP1 §3.1, HD-1 §3.1).
3. **The rule is the minimum and only what is stated:** the six rules of §3 plus the decider's example. No ordering framework, no lifecycle, no ADR-vs-ADR arbitration is added here — the decider explicitly forbade extending the decision (§3 non-statements).
4. **This record does not itself modify `AGENTS.md`.** Operationally wiring the distinction into `AGENTS.md` (making it discoverable to agents) is a separate, future, human-authorized repair action (the task's explicit boundary: "RD-AUTH — decision recorded ✓; precedence rules operationally wired into `AGENTS.md` ✗").
5. **Recording RD-AUTH and implementing RD-AUTH are separate actions.** This record performs no `AGENTS.md` edit and no Git action: nothing is staged, committed, or pushed.
6. **RD-AUTH does not supersede any previous decision** (task §7). It *relates to* D1, GP1, HD-1, and (as unrelated subject matter) HD-2 — see §7's relationship table.
7. **Historical experiment reports are not to be rewritten** by this or any agent action to remove their historical state (rule 6) — no experiment file is modified by this task (verified in §10).
8. **Future decisions remain human-owned unless explicitly delegated** (consistent with D1 §3.1).

---

## 4. Alternatives considered

**Fact — label:** the precedence alternatives below were **presented in Experiment 12 §6 (area C)** (restating Experiment 06 §4's options) as candidate models, all then-unapproved. They are recorded here as *alternatives considered*, **not** as selected or rejected decisions. **No alternative beyond those documented in Experiment 12 §6 is invented here.**

| Ref | Alternative (as presented in Experiment 12 §6 area C — then unapproved) |
|---|---|
| C1 | `AGENTS.md` > records > reports/analysis > conversation (Experiment 06 R1) — principles never silently overridden |
| C2 | Records > `AGENTS.md` within record scope (R2) — specificity wins; stale-override risk |
| C3 | Most-recent-wins by date (R3) — trivial; load-bearing on date-level data |
| C4 | No rule (R4, status quo) — FM8 persists |
| F1/F2 | Fail-safe default written into `AGENTS.md` (F1) or left practised-but-unwritten (F2) |
| L1/L2/L3 | Current-open-question source: status quo / lists-as-historical + records authoritative / registry artifact |

**Fact — what is NOT known:** the decision statement does not state which alternatives the decider weighed, in what order, or why, and **the mapping of "option B" to these or any other option tables is not established in the repository** (AMB-R1). **This ADR does not reconstruct or infer a rationale beyond what the recording instruction supplies (§2).**

**Interpretation — cross-reference for traceability only:** the decided content (ADR = current authority over conflicting historical report; index = navigation only; `AGENTS.md` compatible with decisions; reports = historical, not rewritten) is *directionally consistent with* C1-family ordering for the ADR-vs-report pair, and with L2 for the historical-lists question — **but this record asserts no label mapping** (the human's label "B" stands as communicated) and does not adopt F1/F2, C1–C4 wholesale, or L1–L3 as decided. This is a cross-reference, not a modification of the decision — the same posture as D1 §4 and HD-1 §4.

---

## 5. Consequences

### 5.1 Decision-stated consequences (Fact — follow directly from the approved decision wording)

* **Accepted human decision records/ADRs represent current human decisions** (rule 1).
* **`AGENTS.md` must remain compatible with those human decisions** (rule 2) — its content remains operational rules.
* **`docs/decisions/INDEX.md` is not an independent policy authority** — navigation/index only (rule 3).
* **`experiments/` contains historical evidence** (rule 4).
* **On conflict: the later ADR is authoritative for the current state; the historical report remains historical evidence and must not be rewritten merely because its state is no longer current** (rules 5–6).
* **Current decisions and historical evidence are explicitly separated** (rules 1–4 combined).
* **Historical reports can remain immutable** — rule 6 forbids rewriting them merely to remove superseded states (stated directly by the decider).
* **The motivating example is decided as stated:** Experiment 06 remains historical evidence; ADR `0002` (GP1) represents the current human decision (decider's own "Therefore" statement, §3).
* **Implementation is separate:** wiring the distinction into `AGENTS.md` was **not** performed by this record (task §11 boundary).

### 5.2 Analysis-derived consequences (Interpretation — identified by the agent; NOT statements made by the human)

* **Stale historical states no longer need to be interpreted as current decisions:** an agent that reads "PROV-GIT … OPEN" in Experiment 06 now has a recorded rule under which ADR `0002` governs — the improvisation Experiment 11 §8 identified as necessary becomes rule-guided (once the rule is discoverable).
* **Future repair must make this distinction discoverable to agents** — i.e., the recorded rule's operational value depends on a later human-authorized implementation step (e.g., `AGENTS.md` wiring alongside RD-DISC's pointers); until then, agents must find `0006` by the same discovery paths Experiment 11 measured.
* **Experiment 06's report is now *knowingly* stale on PROV-GIT and must still not be edited** — the rule protects it; the staleness is reclassified from "defect to fix" to "historical state to cite correctly".
* **INDEX reading rule 3's wording** ("The current list of open questions lives in those experiment reports") sits in tension with rules 4–5 and is **not** modified here (change authorization covers only count + rows); reconciling it belongs to the future implementation step (reported, not resolved — AMB-R5).
* **The scope of "conflict" in rule 5 is left to future interpretation** in genuinely novel cases (e.g., a report's *analysis* vs an ADR's *scope* boundary); no such novel case exists today — the PROV-GIT pattern (explicit OPEN status vs explicit later decision) is the covered case.

---

## 6. Ambiguities and open points (reported, not silently resolved)

**Fact — the following were encountered while writing this record and were deliberately NOT resolved by the agent:**

| # | Ambiguity | Handling |
|---|---|---|
| **AMB-R1** | **Option label mapping.** The human approved "option B". The label's correspondence to Experiment 12 §6 area C's option tables (`C1`–`C4`, `F1`/`F2`, `L1`–`L3`, restating Experiment 06 R1–R4) is **not established in the repository** — the mapping exists only in session context. | The label **B** and its full content are recorded exactly as communicated (§3); the decision content itself is fully established by the human's own six rules, so recording proceeds. **No table-mapping is asserted here.** |
| **AMB-R2** | **"Later" ordering basis.** Rule 5 turns on which decision is "later". Ordering would rely on decision dates, which are date-level only (D1 A1), and two records' dates were session/environment-derived rather than decider-stated (HD-1 AMB-P2; RD-DISC AMB-D4). No ordering mechanism (timestamps, sequence numbers, tie-handling) is established — and establishing one is excluded by the decider's non-extension boundary (§3). | Reported, not resolved. Rule 5 recorded verbatim; **no ordering framework invented.** If a genuine ordering edge case arises, it requires human resolution. |
| **AMB-R3** | **Compatibility-maintenance mechanism.** Rule 2 requires `AGENTS.md` to "remain compatible" with human decisions, but *who detects* incompatibility and *who/when edits* `AGENTS.md` to restore it is not established — `AGENTS.md` edits are human-reserved (`AGENTS.md` § *Current Project Status*: propose, do not apply). | Reported, not resolved. The obligation is recorded; its mechanism is undecided (relates to open Experiment 03 D5 territory). **No maintenance rule invented.** |
| **AMB-R4** | **Identifier scheme.** `RD-AUTH` is a fourth prefix in six records; the file ordinal `0006` continues the unreconciled pairings (D1 A2; GP1 AMB-G3; HD-1 AMB-P3; RD-DISC AMB-D2). | Both values recorded as given; pairing by the task instruction specifying this file path. **No identifier scheme is created or normalized** (the recording instruction forbids it). |
| **AMB-R5** | **INDEX reading-rule tension.** `INDEX.md` reading rule 3 states "The current list of open questions lives in those experiment reports" — in partial tension with rules 4–5 (reports = historical evidence; ADRs = current authority). The index's discovery note also still calls the pointer question an "open decision" (RD-DISC AMB-D3). | Neither note was modified: change authorization for `INDEX.md` covers only the decision count and the two new rows (task §8). Tension reported for a future authorized edit — same posture as HD-1 AMB-P6. |

**Observation:** AMB-R1 is the same *class* of label-mapping gap as RD-DISC AMB-D1 (both stem from option labels used in session approval); AMB-R2/R3 record exactly the frontiers the decider's non-extension boundary drew — reported so the boundary is visible rather than silently crossed.

---

## 7. Supersession information

| Field | Value | Basis |
|---|---|---|
| **Supersedes** | None | **Fact** — no earlier record decides source authority/precedence. This record *answers the question* Experiment 03 D3 / Experiment 05 MM7 raised, but it supersedes no record (the recording instruction forbids claiming supersession: task §7). |
| **Superseded by** | None, as of `2026-10-08` | **Fact** — no later record exists at creation time. |
| **Status history** | Initial record: `Accepted` (human-specified status, §1), recorded `2026-10-08` by the agent at the human project owner's instruction | **Fact** |
| **Revisit conditions** | Not specified by the decider | **Fact** — none were communicated. No lifecycle/supersession policy exists (explicitly excluded by §3; Experiment 03 D7 remains open). **This record does not invent a revisit trigger.** |
| **Deletion policy** | Not decided | **Fact** — explicitly outside this decision (§3 non-statements); no retention rule exists. |

**Fact — relationships to existing decisions (recorded per the recording instruction; none is superseded):**

| Related decision | Relationship |
|---|---|
| **D1** (`0001`) | **RD-AUTH relies on D1** — the rule governs authority among *recorded* human decisions; without D1's ADR-per-decision mechanism there would be no records for it to privilege. |
| **GP1** (`0002`) | **GP1 establishes persistence** of the records and reports whose authority RD-AUTH ranks; GP1 is also the decided side of the motivating example (Experiment 06's PROV-GIT row vs ADR `0002`). |
| **HD-1** (`0003`) | **HD-1 establishes the prompt files** as project/harness artifacts — part of the `experiments/` historical evidence RD-AUTH classifies (rule 4). |
| **HD-2** (`0004`) | **Unrelated to decision authority** — HD-2 governs who may create Git commits and the announcement requirement; it decides nothing about which source wins when content conflicts (the recording instruction states this relationship explicitly). |
| **RD-DISC** (`0005`) | Complementary sibling decision recorded in the same session — RD-DISC concerns *finding* decisions and history; RD-AUTH concerns which source *governs* when they disagree. No dependency in either direction is established by the records. |

---

## 8. Facts vs. interpretations in this record (summary)

| Element | Classification |
|---|---|
| The six-rule decision statement and motivating example (§3) | **Fact** — as communicated in the recording instruction |
| The non-extension list (§3: no supersession system, no status lifecycle, no ADR-vs-ADR conflict resolution, no amendment, no retention) | **Fact** — as communicated |
| Approved option "B" with its described content (§3) | **Fact** — as communicated; table-mapping not asserted (AMB-R1) |
| Status `Accepted` (§1) | **Fact** — human-specified in this record's instruction (vocabulary policy still open) |
| Date `2026-10-08` and its basis (§1) | **Fact** — session evidence + environment clock, date-level; not a human-stated date string |
| Scope, non-scope, authority-boundary statements (§1, §3.1) | **Fact** — as communicated, or directly carried by the decision wording |
| Alternatives C1–C4/F1–F2/L1–L3 (§4) | **Fact** — as presented in Experiment 12 §6, then unapproved |
| "Directionally consistent with C1-family / L2" (§4) | **Interpretation** — cross-reference only; no option label adopted by this record |
| Consequences in §5.2 | **Interpretation** — analysis-derived, explicitly not part of the decision statement |
| Ambiguities AMB-R1–AMB-R5 (§6) | **Fact** that they are unresolved; no resolutions offered |

---

## 9. Source references

* `AGENTS.md` — read; **not modified** (its edit is the separate future implementation action; § *Current Project Status* reserves `AGENTS.md` amendment to the human).
* `docs/decisions/0001-decision-recording-mechanism.md` — D1, the mechanism used to record RD-AUTH and the existence of records the rule relies on (read; not modified).
* `docs/decisions/0002-harness-artifact-persistence.md` — GP1, the decided side of the motivating example (read; not modified).
* `docs/decisions/0003-experiment-prompt-artifacts.md`, `docs/decisions/0004-git-commit-authority.md` — HD-1/HD-2 relationships (§7) (read; not modified).
* `docs/decisions/INDEX.md` — discovery index, updated to add RD-DISC and RD-AUTH under D1's authorized mechanism (modified **only** to add the two entries and keep its decision count accurate).
* `experiments/05-decision-consumption.md` — §5 authority signals, FM8/FM9/MM7 (read; not modified).
* `experiments/06-decision-specification.md` — §4 precedence brief (R1–R4, F1–F2), §13 OPEN row for PROV-GIT at line 474 — the historical state rule 5 addresses (read; **not modified** — rule 6 forbids rewriting it).
* `experiments/10` record: `experiments/experiment-10-prompt.md` — GP1's execution (Steps 1–8, commit `a4653b9`) as cited by the motivating example (read; not modified).
* `experiments/11-fresh-clone-persistence.md` — F3/F4 findings, §8 staleness analysis, §17 provisional HD-6 label (read; not modified).
* `experiments/12-harness-repair-decision-analysis.md` — candidate RD-AUTH, area C options and PROV-GIT test case, §9 minimum set, §19 draft statement (read; not modified).
* Decision statement and approved option for RD-AUTH — communicated by the human project owner in the task that produced this record (the human stores this task's prompt at `experiments/experiment-13-prompt.md`; the agent never wrote to that file).

---

## 10. Verification of this record's creation

1. **Working tree inspected before writing:** `git status --short --untracked-files=all`; `git diff --cached`, `git ls-files -m`, stash all empty; HEAD `a4653b96b60e0c6fe258aadf2ac008370a308c43` (3 commits); `origin/main`/`ls-remote` `5fd9f54…`.
2. **Exactly two new files created by the agent:** `docs/decisions/0005-decision-discovery.md` and `docs/decisions/0006-decision-authority-and-precedence.md`.
3. **Exactly one existing file modified, as authorized:** `docs/decisions/INDEX.md` (two changes only: decision count `four`→`six`, and the added RD-DISC/RD-AUTH rows).
4. **Checksums re-verified against the pre-task baseline:** `AGENTS.md` `7355a77e…`, D1 `5f9deeb4…`, GP1 `04af7636…`, HD-1 `a7b53e6a…`, HD-2 `f7ec871c…`, `README.md` `d41d8cd9…`, `.gitignore` `8f7a9110…`, **all six experiment reports** (including `06-decision-specification.md`, whose historical PROV-GIT state rule 5 protects) and **all experiment prompt files** unchanged — **with one documented human-concurrent observation:** `experiments/experiment-13-prompt.md` (this task's prompt file, created by the **human** before the agent's first write; baseline `67fdae99…` captured at task start) — human work; the agent never wrote to it.
5. **No experiment report was rewritten** — rule 6 of this very decision observed by the agent performing it (no `experiments/*.md` content change of any kind).
6. **No application code** created or modified; **no `AGENTS.md` edit** (the decided wiring was NOT performed); **no stack selected**.
7. **No files staged; no Git commit or push performed** (HEAD unchanged at `a4653b9`; commit count still 3; `origin/main` still `5fd9f54…`).
8. **No implementation performed:** RD-AUTH recorded ✓, precedence rules operationally wired into `AGENTS.md` ✗ — recording and implementation remain separate, as §3.1 point 4 states.


Response:

All verification passed. Experiment 14 — execution report:
1. Files modified:
- AGENTS.md — +25 lines, pure insertion (0 deletions: no existing line altered, no reordering, no restructuring — git diff --stat shows 25 insertions only; 292 → 317 lines).
- docs/decisions/INDEX.md — 3 line replacements this task (rule 3 sentence, discovery-notes bullet, Interpretation line). Note: its cumulative diff vs HEAD also contains Experiment 13's pre-existing authorized uncommitted changes (count four→six + two rows) — verified present before this task began and not re-touched.
- No other file changed; no file created.
2. RD-DISC implementation summary: New ## Recorded decisions and experiment history section in AGENTS.md, placed directly after ## Purpose (first thing an agent reads): two bullets pointing to docs/decisions/INDEX.md ("the entry point… links to its individual ADR record, which is the decision in full") and experiments/ ("experiment reports and prompt files — what was tried, observed, and analyzed at the time"), plus one consult-before-changing sentence; sources cited as RD-DISC/0005. Concise (2 bullets + 1 sentence); no new mechanism; no index contents duplicated; both pointers are repo-root-relative markdown links.
3. RD-AUTH implementation summary: New ## Authority of sources section immediately after the discovery section — five bullets operationalizing exactly the approved minimum: ADRs = current human decisions; AGENTS.md = operational rules, must remain compatible; index = navigation, not independent policy authority; experiments/ = historical evidence (reports document what was observed/analyzed/decided at the time, don't automatically represent current policy); later ADR represents the current decision over conflicting historical report, report not rewritten merely to remove historical state. Closing sentence explicitly marks ADR-vs-ADR conflicts, status lifecycle, supersession, amendment, retention as remain undecided — a grep confirmed those terms appear only in that sentence (no over-specification leakage; §6 respected).
4. INDEX contradiction repaired: Reading rule 3's final sentence — "The current list of open questions lives in those experiment reports, not here" — replaced with the §7-required meaning (reports may contain open questions as historical context; not automatically the current authoritative list; unresolved current governance questions must not be inferred from historical reports alone; cited to RD-AUTH/0006). No registry created; maintenance rules undefined. Additionally, under §9 (removing direct contradictions): the discovery note's "AGENTS.md currently contains no pointer… corresponds to an open decision" and the Interpretation's "known limitation" claims would both have been false post-implementation — each minimally updated to state the pointers now exist per RD-DISC while preserving the historical "left undone because out of scope" fact. Untouched as compatible: rules 1/2/4, the template/update-rule notes (D2/D7 still open), standing note, all six rows.
5. Historical reports preserved: experiments/06-decision-specification.md byte-for-byte unchanged (md5 0389f381… = baseline; its PROV-GIT = OPEN state intact, intentionally — the new rule now teaches its interpretation). All 6 ADRs unchanged (5f9deeb4…, 04af7636…, a7b53e6a…, f7ec871c…, 5079d371…, cfa9e4e4…); all experiment reports/prompts unchanged (baselines incl. exp14-prompt 612f4df4…); README.md/.gitignore unchanged.
6. Unrelated changes avoided: Pre-implementation check (§10) traced every edit to RD-DISC or RD-AUTH before writing; no other desirable repair implemented (see deferred list).
7. Verification performed:
- A. Discovery: grep AGENTS.md finds docs/decisions/INDEX.md (L26, L39) and experiments/ (L27, L40) with no prior path knowledge needed ✓
- B. Authority: all five determinations present at L37–41 ✓
- C. Preservation: Exp06 report + all ADRs byte-identical ✓
- D. Scope: git ls-files -m = exactly AGENTS.md, docs/decisions/INDEX.md ✓; untracked set identical before/after (8) ✓
- E. Consistency: the four sources agree on pointer existence, source roles, and current-vs-historical; no contradiction introduced (consistency checked only on dimensions covered by these decisions, per §11-E)
8. Git state: HEAD a4653b96b60e0c6fe258aadf2ac008370a308c43 (3 commits) — unchanged. Pre-task tree: not clean (INDEX already modified by Exp13, 8 untracked, 0 staged) — recorded as required. Post-task: git diff --stat = 2 files, +31/−4 total; git diff --check clean (no whitespace errors); 0 staged; origin/main = ls-remote = 5fd9f54… unchanged; 0 stash. Expected modified paths confirmed; no other path changed.
9. Deferred observations (recorded, not implemented):
1. INDEX bullets on record template (D2) and index-update rule (D7/D5) remain open — RD-SCHEMA out of scope (§15).
2. INDEX standing note's status-vocabulary tension (AMB-P6 precedent) — untouched; needs RD-SCHEMA.
3. Pre-existing D1 link typo in INDEX (0001-decision-recording_mechanism.md) — not a RD-DISC/RD-AUTH contradiction; out of §9's scope.
4. README pointer option (Exp12 A2/A3) — never decided; deferred to human.
5. RD-DISC row's "(implementation separate)" scope wording kept — scope column describes the decision's scope, not implementation status; not a contradiction (implementation state now recorded in the discovery notes).
6. Exp11's F1–F7 fresh-agent re-measurement (Exp12 verification V-class) — belongs to a future measurement experiment, not this repair.
7. Commit of the accumulated artifacts (ADRs 0005/0006, Exp11/12 reports, prompts) — requires HD-2 announcement + human confirmation; forbidden here by §13.
8. Between tasks, human modified experiment-13-prompt.md (67fdae99… → 496e5a2a…) — human-attributed (agent never wrote it); new baseline captured at task start.
10. No commit or push occurred: confirmed — 0 staged, HEAD/commit count unchanged, origin/main unchanged, no push attempted.
STOP — no new experiment, no commit, no push, no RD-SCHEMA/RD-LIFE/RD-CADENCE/RD-PUSH, no history or product-file edits. Awaiting human review of the implementation result.


Response:
