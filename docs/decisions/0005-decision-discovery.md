# RD-DISC — Decision and harness-history discovery

*Fifth recorded decision of this repository — recorded using the ADR-per-decision plus index mechanism established by D1.*

**Label legend:** **Fact** = observed in the repository, in `AGENTS.md`, or in the decision statement communicated by the human project owner. **Observation** = a fact plus its immediate significance. **Interpretation** = an inference beyond the observed data. **Recommendation** = an option for evaluation; decides nothing. *(Ambiguity references in this record are local: `AMB-D1`–`AMB-D4`; D1's `A1`–`A7`, GP1's `AMB-G1`–`AMB-G6`, HD-1's `AMB-P1`–`AMB-P7`, and HD-2's `AMB-A1`–`AMB-A7` are separate.)*

---

## 1. Record fields

| Field | Value | Basis |
|---|---|---|
| **Decision ID** | `RD-DISC` | **Fact** — the identifier used for this decision in the human project owner's recording instruction (this task), following the label used in `experiments/12-harness-repair-decision-analysis.md` §6/§7/§19. The relationship between `RD-DISC` and the file number `0005` (both assigned by the task instruction) is not governed by any established identifier scheme — see ambiguity AMB-D2. |
| **Title** | Decision and harness-history discovery | **Fact** — specified verbatim by the human's recording instruction. |
| **Status** | `Accepted` | **Fact** — the status value `Accepted` was explicitly specified by the human project owner's recording instruction ("Record the decision as: … Status: Accepted"), unlike HD-1/HD-2 where no status string was communicated (contrast AMB-P1). The status **vocabulary itself** remains unstandardized (D1 A3; Experiment 06 D2 open) — the value is human-approved for this record, not a vocabulary decision. |
| **Decided by** | Human project owner | **Fact** — the task states these are "already-decided human decisions… explicitly approved by the project owner"; the agent did not select the option. |
| **Decision date** | `2026-10-08` (date-level precision only) | **Fact** — the approval was communicated by the human project owner in the current session, dated `2026-10-08`; the environment clock was verified at recording time (`Thu Oct 8 15:01:48 CEST 2026`). The recording instruction authorizes using this date from session evidence (task §9). The decider communicated no date *string* — see ambiguity AMB-D4. |
| **Scope** | Discovery guidance: `AGENTS.md` must contain explicit pointers to `docs/decisions/INDEX.md` (human decisions) and `experiments/` (experimental history) | **Fact** — taken directly from the decision statement communicated in the recording instruction (§3). |
| **Explicit non-scope** | This decision does **not** itself modify `AGENTS.md` (implementation is a separate, later action). It does **not** decide the exact wording or placement of the pointers, whether any other file also receives pointers, the structure of the harness beyond these two pointers, the precedence/authority of sources (that is RD-AUTH, record `0006`), or the website technology stack. | **Fact** — the first sentence is stated explicitly in the decision statement (§3); the remainder follows from the task's boundary ("the decision concerns discoverability, not the complete structure of the harness") and `AGENTS.md` § *Do not invent requirements* / § *The human remains responsible for product decisions*. |
| **Record file** | `docs/decisions/0005-decision-discovery.md` | **Fact** — path specified by the human's task instruction, not chosen by the agent. |

---

## 2. Context

**Fact — evidence from previous experiments (recorded as provenance, not as retroactive requirements):**

* Experiment 05 (`experiments/05-decision-consumption.md`) found no authoritative pointer: `AGENTS.md` required decisions to be documented but never said where (§3.1 S2; FM1, FM3; MM1 rated "the single highest-leverage change").
* Experiment 03 recorded the question as open decision **D4**; Experiment 06 analysed it as a brief (§4, options P1–P5); Experiment 11 measured it again as **F1 (Absent)** and **F2 (Absent)** — five of its first six discovery steps produced zero pointers (§5, §6).
* Experiment 12 (`experiments/12-harness-repair-decision-analysis.md`) consolidated these into candidate **RD-DISC** (§6 area A, §7, §9), identified it as one of the two minimum root decisions before repair (§9), and drafted a statement that remained explicitly undecided (§19, marked DRAFT).

**Fact — the human has now decided RD-DISC**, approving **option A** and communicating the recording instruction reproduced in §3.

**Fact — characterization supplied with the decision:** the task states the approved pointers "are authoritative discovery guidance for the agent", that "this decision does NOT yet modify `AGENTS.md`", and that "implementation belongs to a later repair step". The task also requires recording that the decision "was derived from the findings of Experiments 11 and 12" and "concerns discoverability, not the complete structure of the harness". **No further rationale was communicated, and none is manufactured here.**

**Observation:** the two pointer targets already exist (`docs/decisions/INDEX.md` and `experiments/`) — the decision requires guidance pointing at them, not new artifacts.

---

## 3. Decision (as made by the human project owner — not altered)

**Fact — the decision statement as communicated in the recording instruction (substance preserved):**

> The repository's `AGENTS.md` must contain explicit pointers to:
>
> 1. `docs/decisions/INDEX.md` as the entry point for human decisions.
> 2. `experiments/` as the entry point for experimental history.
>
> These pointers are discovery guidance for agents.
>
> The decision does not itself modify `AGENTS.md`; implementation is a separate action.

**Fact — the approved option:** the human project owner approved **option A** (the `AGENTS.md` pointer mechanism, as described in the recording instruction). The label "A" and its full content are established by the human's approval itself (see AMB-D1 for the label-to-table mapping note).

**Fact — what RD-DISC does NOT state.** The recorded decision does **not** strengthen into any of the following; none of these has been decided:

* "the pointers have now been added to `AGENTS.md`" (they have not — `AGENTS.md` is unmodified);
* "any particular wording, section, or formatting of the pointers" — wording is implementation;
* "`README.md` or any other file must (or must not) contain pointers";
* "the structure, template, or governance of what the pointers point to is hereby defined" — that is D1/RD-AUTH territory;
* "any precedence or authority rule among sources" — that is RD-AUTH, record `0006`;
* "the website technology stack or any product decision".

### 3.1 Authority boundary (required explicit statements)

**Fact — this ADR states explicitly that:**

1. **RD-DISC was decided by the human project owner.** The agent did not select, expand, narrow, or alter it; the agent's role here is scribe only.
2. **The agent is recording the decision, not making it.** Writing this record confers no authority on the writer — recording a decision and owning it are separate acts (consistent with D1 §3.1, GP1 §3.1, HD-1 §3.1).
3. **`AGENTS.md` is the decided future location of the discovery pointers** — to `docs/decisions/INDEX.md` for human decisions and to `experiments/` for experimental history. This record does **not** modify `AGENTS.md`; adding the pointers is a separate, future, human-authorized repair action (the task's explicit boundary: "RD-DISC — decision recorded ✓; `AGENTS.md` modified ✗").
4. **`docs/decisions/INDEX.md` remains the decision-record index** and `experiments/` remains historical experiment material — this decision changes their *discoverability*, not their content, roles, or governance.
5. **This decision concerns discoverability only** — not the complete structure of the harness, not authority among sources (RD-AUTH, `0006`), not schema/lifecycle questions (Experiment 03 D2/D5/D7 remain open).
6. **Recording RD-DISC and implementing RD-DISC are separate actions.** This record performs no `AGENTS.md` edit and no Git action: nothing is staged, committed, or pushed.
7. **Future decisions remain human-owned unless explicitly delegated** (consistent with D1 §3.1).

---

## 4. Alternatives considered

**Fact — label:** the mechanism alternatives below were **presented in Experiment 12 §6 (area A)** as candidate mechanisms, all then-unapproved. They are recorded here as *alternatives considered*, **not** as selected or rejected decisions. **No alternative beyond those documented in Experiment 12 §6 is invented here.**

| Ref | Alternative (as presented in Experiment 12 §6 area A — then unapproved) |
|---|---|
| A1 | Pointer in `AGENTS.md` only (Experiment 06's P1) — guaranteed read; adds instruction-file length |
| A2 | Pointer in `README.md` only (P2) — human-facing; agents not required to read it |
| A3 | Both (P3) — redundancy; two copies to keep in sync |
| A4 | Another repository-local mechanism (P4 variant) — still needs one reachable entry point |
| A5 | No pointer, accept search-based discovery (P5) — F1/F2 stay Absent |

**Fact:** Experiment 12's RECOMMENDATION (R1) favored answering pointer and precedence "in one human decision session"; that recommendation decided nothing. **The human's approval here selects the `AGENTS.md` pointer mechanism with both targets** — corresponding, in content, to the `AGENTS.md`-pointer option (A1's location with both entry points named).

**Fact — what is NOT known:** the decision statement does not state which alternatives the decider weighed, in what order, or why. **This ADR does not reconstruct or infer a rationale beyond what the recording instruction supplies (§2).**

**Interpretation — cross-reference for traceability only:** the decided content ("`AGENTS.md` must contain explicit pointers to `docs/decisions/INDEX.md` … and `experiments/`") corresponds to the `AGENTS.md`-pointer mechanism; A2/A3/A4's *additional or alternative locations* are neither adopted nor forbidden by this record, and A5 is not selected. This is a cross-reference, not a modification of the decision — the same posture as D1 §4 and HD-1 §4.

---

## 5. Consequences

### 5.1 Decision-stated consequences (Fact — follow directly from the approved decision wording)

* **`AGENTS.md` must contain explicit pointers** to `docs/decisions/INDEX.md` (entry point for human decisions) and to `experiments/` (entry point for experimental history).
* **These pointers are discovery guidance for agents** — their purpose as stated by the decider.
* **The decision does not itself modify `AGENTS.md`; implementation is a separate action** (stated explicitly; the recording instruction confirms "implementation belongs to a later repair step").
* **`docs/decisions/INDEX.md` remains the decision-record index; `experiments/` remains historical experiment material** (stated in the recording instruction; §3.1 point 4).
* **The decision concerns discoverability, not the complete structure of the harness** (stated in the recording instruction).
* **Recording ≠ implementation:** nothing in `AGENTS.md` changed by this record (verified in §10).

### 5.2 Analysis-derived consequences (Interpretation — identified by the agent; NOT statements made by the human)

* **Agents receive an explicit discovery path once the pointers are implemented** — the practical effect Experiment 11 measured as missing (F1/F2 Absent → repaired only when implemented).
* **No new discovery infrastructure is required:** both pointer targets already exist, so implementation is guidance text, not new artifacts, directories, or tooling.
* **Implementation remains a future, separate, human-authorized action** and must be independently verified after execution (the recording instruction's §11 boundary).
* **Experiment 11's F1/F2 classifications describe the state as of commit `a4653b9`;** they remain accurate for `AGENTS.md` after this record, because recording does not edit `AGENTS.md` (the reports themselves remain historical evidence, unmodified).
* **The discovery gap is now *decided-open* rather than *undecided*:** future sessions can cite `0005` when asking why `AGENTS.md` lacks pointers ("decided, not yet implemented" is now a recorded state).

---

## 6. Ambiguities and open points (reported, not silently resolved)

**Fact — the following were encountered while writing this record and were deliberately NOT resolved by the agent:**

| # | Ambiguity | Handling |
|---|---|---|
| **AMB-D1** | **Option label mapping.** The human approved "option A". The label's correspondence to Experiment 12's option tables (its §6 area A used `A1`–`A5`, derived from Experiment 06's `P1`–`P5`) is **not established in the repository** — the mapping exists only in session context. | The label **A** and its full content are recorded exactly as communicated (§3); the decision content itself is fully established by the human's own description, so recording proceeds. **No table-mapping is asserted here.** |
| **AMB-D2** | **Identifier scheme.** `RD-DISC` is a fourth prefix in five records (`D1`, `GP1`, `HD-1`/`HD-2`, now `RD-*`); the file ordinal `0005` continues the unreconciled pairings (D1 A2; GP1 AMB-G3; HD-1 AMB-P3). | Both values recorded as given; the pairing is by the task instruction specifying this file path. **No identifier scheme is created or normalized** (the recording instruction forbids it); identifier policy remains open (Experiment 03 D2/D7). |
| **AMB-D3** | **INDEX discovery-note staleness.** `INDEX.md`'s discovery notes still state that "Adding a harness pointer corresponds to an **open decision** (Experiment 03, D4)". After this record that is inaccurate — RD-DISC is `Accepted` (though unimplemented); the note's factual claim that `AGENTS.md` "currently contains no pointer" remains **true** until implementation. | The note was **not** modified: change authorization for `INDEX.md` covers only the decision count and the two new rows (task §8). The tension is reported here for a future authorized edit — same posture as HD-1 AMB-P6 (INDEX standing-note tension). |
| **AMB-D4** | **Decision date basis.** The decider communicated no date string; the recording instruction authorizes using the session-evidence date. | Recorded `2026-10-08`, date-level, environment-verified at recording time (`Thu Oct 8 15:01:48 CEST 2026`) per task §9. If a different decision date applies, it requires human confirmation. No time-of-day decision fact is invented. |

**Observation:** AMB-D2/D4 repeat the *class* of gap D1 flagged at A2/A3/A1 and every record since has flagged — the mechanism records faithfully, but vocabulary, dates, and identifiers remain undecided; this is the fifth record carrying the same flags.

---

## 7. Supersession information

| Field | Value | Basis |
|---|---|---|
| **Supersedes** | None | **Fact** — no earlier record decides discovery-pointer placement. This record *answers the question* Experiment 03 D4 / Experiment 05 MM1 raised, but it supersedes no record (the recording instruction forbids claiming supersession: task §7). |
| **Superseded by** | None, as of `2026-10-08` | **Fact** — no later record exists at creation time. |
| **Status history** | Initial record: `Accepted` (human-specified status, §1), recorded `2026-10-08` by the agent at the human project owner's instruction | **Fact** |
| **Revisit conditions** | Not specified by the decider | **Fact** — none were communicated. No lifecycle/supersession policy exists (Experiment 03 D7 remains open). **This record does not invent a revisit trigger.** |
| **Deletion policy** | Not decided | **Fact** — no policy exists; this file must not be treated as setting one. |

**Fact — relationships to existing decisions (recorded per the recording instruction; none is superseded):**

| Related decision | Relationship |
|---|---|
| **D1** (`0001`) | **RD-DISC depends on D1** — the pointer targets the index that D1's mechanism created (`docs/decisions/INDEX.md`); without D1 there is nothing to point at. |
| **GP1** (`0002`) | **GP1 establishes persistence** of the pointed-to artifacts in Git, so the discovery path leads to durable content (locally; remote remains pre-GP1 until a future push decision). |
| **HD-1** (`0003`) | **HD-1 established the prompt files** as project/harness artifacts — the `experiments/` history RD-DISC points to includes them. |
| **HD-2** (`0004`) | **Unrelated to decision authority/this subject** — HD-2 governs who may create commits; RD-DISC governs discovery guidance. (HD-2 would be needed only when the future implementation is committed.) |
| **RD-AUTH** (`0006`) | Complementary sibling decision recorded in the same session — authority/precedence among sources; RD-DISC concerns *finding* them, RD-AUTH concerns which one *wins*. No dependency in either direction is established by the records. |

---

## 8. Facts vs. interpretations in this record (summary)

| Element | Classification |
|---|---|
| Decision statement (§3) and its explicit non-statements | **Fact** — as communicated in the recording instruction |
| Approved option "A" with its described content (§3) | **Fact** — as communicated; table-mapping not asserted (AMB-D1) |
| Decider/task-supplied characterization (§2) | **Fact** — as communicated; no further rationale exists |
| Status `Accepted` (§1) | **Fact** — human-specified in this record's instruction (vocabulary policy still open) |
| Date `2026-10-08` and its basis (§1) | **Fact** — session evidence + environment clock, date-level; not a human-stated date string (AMB-D4) |
| Scope, non-scope, authority-boundary statements (§1, §3.1) | **Fact** — as communicated, or directly carried by the decision wording |
| Alternatives A1–A5 (§4) | **Fact** — as presented in Experiment 12 §6, then unapproved |
| "Corresponds to the `AGENTS.md`-pointer mechanism" (§4) | **Interpretation** — cross-reference only |
| Consequences in §5.2 | **Interpretation** — analysis-derived, explicitly not part of the decision statement |
| Ambiguities AMB-D1–AMB-D4 (§6) | **Fact** that they are unresolved; no resolutions offered |

---

## 9. Source references

* `AGENTS.md` — read; **not modified** (its edit is the separate future implementation action).
* `docs/decisions/0001-decision-recording-mechanism.md` — D1, the mechanism used to record RD-DISC (read; not modified).
* `docs/decisions/0002-harness-artifact-persistence.md` — GP1, persistence dependency (read; not modified).
* `docs/decisions/0003-experiment-prompt-artifacts.md`, `docs/decisions/0004-git-commit-authority.md` — HD-1/HD-2 relationships (§7) (read; not modified).
* `docs/decisions/INDEX.md` — discovery index, updated to add RD-DISC and RD-AUTH under D1's authorized mechanism (modified **only** to add the two entries and keep its decision count accurate).
* `experiments/05-decision-consumption.md` — FM1/FM3/MM1 (read; not modified).
* `experiments/06-decision-specification.md` — §4 discovery brief, options P1–P5 (read; not modified).
* `experiments/11-fresh-clone-persistence.md` — F1/F2 findings, §17 provisional HD-5 label (read; not modified).
* `experiments/12-harness-repair-decision-analysis.md` — candidate RD-DISC, area A options, §9 minimum set, §19 draft statement (read; not modified).
* Decision statement and approved option for RD-DISC — communicated by the human project owner in the task that produced this record (the human stores this task's prompt at `experiments/experiment-13-prompt.md`; the agent never wrote to that file).

---

## 10. Verification of this record's creation

1. **Working tree inspected before writing:** `git status --short --untracked-files=all`; `git diff --cached`, `git ls-files -m`, stash all empty; HEAD `a4653b96b60e0c6fe258aadf2ac008370a308c43` (3 commits); `origin/main`/`ls-remote` `5fd9f54…`.
2. **Exactly two new files created by the agent:** `docs/decisions/0005-decision-discovery.md` and `docs/decisions/0006-decision-authority-and-precedence.md`.
3. **Exactly one existing file modified, as authorized:** `docs/decisions/INDEX.md` (two changes only: decision count `four`→`six`, and the added RD-DISC/RD-AUTH rows).
4. **Checksums re-verified against the pre-task baseline:** `AGENTS.md` `7355a77e…`, D1 `5f9deeb4…`, GP1 `04af7636…`, HD-1 `a7b53e6a…`, HD-2 `f7ec871c…`, `README.md` `d41d8cd9…`, `.gitignore` `8f7a9110…`, all six experiment reports and all experiment prompt files unchanged — **with one documented human-concurrent observation:** `experiments/experiment-13-prompt.md` (this task's prompt file, created by the **human** before the agent's first write; baseline `67fdae99…` captured at task start) — human work; the agent never wrote to it.
5. **No application code** created or modified; **no `AGENTS.md` edit** (the decided implementation was NOT performed); **no experiment file modified**; **no stack selected**.
6. **No files staged; no Git commit or push performed** (HEAD unchanged at `a4653b9`; commit count still 3; `origin/main` still `5fd9f54…`).
7. **No implementation performed:** RD-DISC recorded ✓, `AGENTS.md` modified ✗ — recording and implementation remain separate, as §3.1 point 6 states.
