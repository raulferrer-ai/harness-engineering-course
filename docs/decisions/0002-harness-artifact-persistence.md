# GP1 — Harness artifact persistence

*Second recorded decision of this repository — recorded using the ADR-per-decision plus index mechanism established by D1.*

**Label legend:** **Fact** = observed in the repository, in `AGENTS.md`, or in the decision statement communicated by the human project owner. **Observation** = a fact plus its immediate significance. **Interpretation** = an inference beyond the observed data. **Recommendation** = an option for evaluation; decides nothing. *(Ambiguity references in this record are local: `AMB-G1`–`AMB-G6`; D1's `A1`–`A7` are separate.)*

---

## 1. Record fields

| Field | Value | Basis |
|---|---|---|
| **Decision ID** | `GP1` | **Fact** — the identifier used in the decision statement communicated by the human project owner ("GP1 — Harness artifact persistence"). The relationship between `GP1` and the file number `0002` is not established — see ambiguity AMB-G3. |
| **Title** | Harness artifact persistence | **Fact** — as communicated by the human project owner. |
| **Status** | `Accepted` | **Interpretation of communication, not verbatim communication** — the human stated that GP1 "has now been explicitly made" but supplied **no status string**. `Accepted` follows the precedent of the only existing record (D1, whose status the human supplied verbatim). **No status vocabulary has been standardized** (D1 ambiguity A3; Experiment 06 D2 open) — see ambiguity AMB-G1. |
| **Decided by** | Human project owner | **Fact** — as communicated. |
| **Decision date** | `2026-10-06` (date-level precision only) | **Fact** — verified from the environment at recording time: system clock returned `Tue Oct 6 15:49:46 CEST 2026` (`2026-10-06`). **The decider stated no date** — see ambiguity AMB-G2. |
| **Scope** | Persistence/versioning of project harness artifacts | **Fact** — wording taken from the human's task instruction ("GP1 concerns persistence/versioning of project harness artifacts"). |
| **Explicit non-scope** | This record does **not** decide: a complete Git workflow; commit frequency; branch strategy; commit-message conventions; staging policy; CI policy; release policy; who commits; the meaning of "other harness artifacts" beyond the recorded wording; which artifacts "form part of the project" beyond the recorded wording. It does **not** select the website technology stack. | **Fact** — the task instruction states these are not decided by GP1 and may require future human decisions; the technology-stack exclusion follows from `AGENTS.md` § 1 and § 7 as applied by the standing task constraints. |
| **Record file** | `docs/decisions/0002-harness-artifact-persistence.md` | **Fact** — path specified by the human's task instruction, not chosen by the agent. |

---

## 2. Context

**Fact — evidence from previous experiments (recorded as observations, not as retroactive requirements):**

* Experiment 05 (finding FM2) and Experiment 06 (§2.2 items 3–4, §10 O3) established that, at those times: both decision records (`docs/decisions/0001-decision-recording-mechanism.md` and `docs/decisions/INDEX.md`) were **untracked** Git files; experiment reports were also **untracked**; and a **fresh clone would therefore not contain them** — a **durability gap**.
* This was verified again at the start of the current task: `git status --short --untracked-files=all` showed every decision record and experiment report as untracked (`??`), while only the six scaffold files were tracked.
* Experiment 05 rated this a pass-qualifier (Q2); Experiment 06 presented it as an undecided decision ("PROV-GIT", AMB-4) with classification and action options (§7) and made **no recommendation in force**.

**Fact — the human has now decided GP1**, communicating the decision statement reproduced in §3.

**Fact — rationale:** the decider supplied **no rationale** beyond the decision statement itself. Per instruction, **no rationale is manufactured here**; the experiment evidence above is cited as context/observation only, not as a retroactively imposed requirement or as decider rationale. (D1's record carried the same posture — see D1 ambiguity A4.)

**Observation:** GP1 is the second recorded decision; the mechanism established by D1 now holds two records.

**Interpretation:** nothing in this file expands GP1; every element beyond the decision statement is a labelled fact, a labelled analysis-derived consequence (§5.2), or a flagged ambiguity (§6).

---

## 3. Decision (as made by the human project owner — not altered)

**Fact — the decision statement as communicated (original wording preserved verbatim):**

> "Las decisiones, experimentos y demás artefactos del harness que deban formar parte del proyecto deben quedar versionados en Git."

**Fact — English interpretation supplied by the human project owner for the agent:**

> "Decisions, experiments, and other harness artifacts that are part of the project must be version-controlled in Git."

**Fact — what GP1 does NOT state.** The recorded decision does **not** strengthen into any of the following; none of these has been decided:

* "everything must always be committed";
* "all experiments must be committed immediately";
* "Git is the only persistence mechanism";
* "all repository files are harness artifacts";
* "the agent may commit automatically".

### 3.1 Authority boundary (required explicit statements)

**Fact — this ADR states explicitly that:**

1. **GP1 was decided by the human project owner.** The agent did not select, expand, narrow, or alter it; the agent's role here is scribe only.
2. **The agent is recording the decision, not making it.** Writing this record confers no authority on the writer — recording a decision and owning it are separate acts (consistent with D1 §3.1).
3. **GP1 concerns persistence/versioning of project harness artifacts** — the scope recorded in §1, taken from the human's own wording.
4. **GP1 does not establish a complete Git workflow.** Commit frequency, branch strategy, commit-message conventions, staging policy, CI policy, release policy, and who commits are **not decided** by GP1.
5. **Future Git governance decisions remain human-owned unless explicitly delegated** (consistent with D1 §3.1). Any future delegation must itself be recorded as an explicit decision naming its scope.
6. **Recording GP1 and executing GP1 are separate actions.** This record performs **no** Git action: nothing is staged, committed, or pushed. GP1's execution — actually version-controlling the artifacts it covers — is a separate, future, human-directed action.

---

## 4. Alternatives considered

**Fact — label:** the alternatives below were **presented in Experiment 06 §7** (classification options P6–P10, action options C1–C4) as **unapproved options at that time**. They are recorded here as *alternatives considered*, **not** as selected decisions. **No option label is adopted by this record** — asserting that GP1 "is" any particular option would be an interpretation, and interpretation is outside this record's authority. **No alternative beyond those documented in Experiment 06 §7 is invented here.**

**Classification alternatives (as presented in Experiment 06 §7):**

| Ref | Alternative (as presented in Experiment 06 §7 — then unapproved) |
|---|---|
| P6 | Treat persistence as a **project requirement** (normative rule, testable) |
| P7 | Treat persistence as a **harness invariant** (a property checked per experiment) |
| P8 | Treat persistence as an **implementation convention** (informal practice) |
| P9 | Treat persistence as a **human decision** (one-off action + standing policy) |
| P10 | Treat persistence as **something else** (e.g. periodic backup, mirror, or out of scope) |

**Action alternatives (as presented in Experiment 06 §7):**

| Ref | Alternative (as presented in Experiment 06 §7 — then unapproved) |
|---|---|
| C1 | Commit all untracked paths present at the time (12 files) |
| C2 | Commit only `docs/decisions/` |
| C3 | Commit decisions + reports, leave prompt files |
| C4 | Do nothing at the time |

**Fact — what is NOT known:** Experiment 06 marked **all** of the above as unapproved options. The decision statement communicated by GP1 records the **selection only** (its own wording); it does not state which alternatives the decider weighed, in what order, or why. **This ADR does not reconstruct or infer a rationale**, and does not map GP1 onto any P/C reference.

**Fact:** Experiment 06 §7 also listed candidate *identifier* mappings for this decision (new sequential ID / Exp02 H10 / fold into D4 / fold into D1 scope) — recorded there as unresolved (AMB-4). The human assigned the identifier `GP1`; this record treats that as the communicated identifier and draws **no scheme conclusion** (see AMB-G3).

---

## 5. Consequences

### 5.1 Stated by the decider or directly carried by the decision wording (Fact)

* Decision records, experiment reports, and **other harness artifacts that form part of the project** fall within GP1's scope: they **must be version-controlled in Git**.
* The durability gap observed in Experiments 05/06 (untracked records; a fresh clone would lack them) is **addressed in principle** by GP1 for the artifacts it covers. **Executing** GP1 is a separate action and was **not performed** by this record — per instruction, nothing is staged or committed here.
* GP1 does **not** decide: commit frequency, who commits, branch/commit-message/staging/CI/release policy, or the enumeration of "other harness artifacts" or of "part of the project" beyond the recorded wording. These remain open for future human decisions.

### 5.2 Analysis-derived (Interpretation — from previous experiment records; not part of the decision statement)

* **Recording does not equal execution:** until a human-directed action commits them, the current untracked state persists; GP1 changes what *ought* to be the case, not yet what *is* in Git history.
* **Discovery remains unguaranteed:** Experiment 06 established that `AGENTS.md` contains no pointer to `docs/decisions/` (Exp03 D4 open). GP1 does not change that; future sessions still find this record only when instructed to look, or by exploring.
* **The Experiment 06 briefs remain open:** D2 (information model), D4 (discovery/precedence), D5 (write/transition governance), D7 (retention/supersession) were **not** decided, implemented, or modified by GP1 or by this record.
* **Identifier ambiguity is partially changed, not resolved:** the human assigned `GP1` (a new prefix outside Experiment 03's D-catalog), paired with file ordinal `0002`. Experiment 06 AMB-3 (unreconciled `D1`↔`0001` spaces) and AMB-4 (no ID existed for this decision) are therefore *affected* by GP1's assignment but **no identifier scheme is established** — D2/D7 remain open.
* **Experiment 06's open list is unchanged:** `experiments/*` may not be modified by this task, and the index was authorized only to add the GP1 row; Experiment 06 §13 still lists the Git-persistence decision under its provisional identifier. The cross-reference is recorded in this file (AMB-G6) only.

---

## 6. Ambiguities and open points (reported, not silently resolved)

**Fact — the following were encountered while writing this record and were deliberately NOT resolved by the agent:**

| # | Ambiguity | Handling |
|---|---|---|
| **AMB-G1** | **Status vocabulary.** No status string was supplied for GP1; the task states a decision was "explicitly made" but communicates no status value. D1's `Accepted` was communicated verbatim by the decider for that record; the vocabulary itself remains unapproved (D1 A3; Experiment 06 D2 open). | Recorded `Accepted` following D1's precedent, flagged in §1 as interpretation rather than verbatim communication. **No vocabulary decision is made here.** |
| **AMB-G2** | **Decision date.** The decider stated no date or time. | Recorded `2026-10-06`, date-level, environment-verified (`Tue Oct 6 15:49:46 CEST 2026`) — same method as D1 A1. **Not a human-stated date; if a different date applies, it requires human confirmation.** |
| **AMB-G3** | **Identifier scheme.** `GP1` uses a **new prefix** absent from Experiment 03's D-catalog (D1–D7); the file ordinal is `0002`, continuing the unreconciled `D1`↔`0001` pairing flagged in Experiment 06 AMB-3; GP1 is also **not** one of Experiment 06 §7's candidate mappings (new D-number / H10 / D4 / D1-scope) — the human assigned `GP1` directly. | Both values recorded as given. **No identifier scheme is created or normalized**; identifier policy remains open (D2/D7). |
| **AMB-G4** | **Scope boundary.** "Que deban formar parte del proyecto" / "that are part of the project" is **deliberately not enumerated** — the task forbids defining "other harness artifacts" or "part of the project" beyond the recorded wording. | Left undefined by design; any enumeration requires a future human decision. |
| **AMB-G5** | **Rationale absent.** The decider supplied no rationale. | Recorded as absent (§2); Experiment 06 evidence cited as context/observation only, not manufactured into rationale. |
| **AMB-G6** | **Index cross-reference and index-note tension.** (a) Experiment 06 §13 lists this decision family under provisional ID "PROV-GIT" (AMB-4); GP1 answers that question at the level of the recorded wording, but `experiments/*` may not be modified here and the index was authorized only to add the GP1 row. (b) `INDEX.md`'s standing note states statuses/dates are "reproduced exactly as communicated by the decider" — for GP1, no status/date was communicated (see AMB-G1/G2). | (a) Cross-reference recorded in this file only; Experiment 06's open list is unchanged. (b) The index note was **not** modified (change authorized only "to add GP1"); the tension is reported here for human resolution in a future authorized edit. |

**Observation:** AMB-G1/G2/G3 are the same *class* of gap D1 flagged at A1–A3 — the mechanism records faithfully, but vocabulary, dates, and identifiers remain undecided — now recurring on the second record rather than being closed by it.

---

## 7. Supersession information

| Field | Value | Basis |
|---|---|---|
| **Supersedes** | None | **Fact** — no earlier record targets GP1; D1 is a separate decision on a separate subject. |
| **Superseded by** | None, as of `2026-10-06` | **Fact** — no later record exists at creation time. |
| **Status history** | Initial record: `Accepted` (see AMB-G1 for its basis), recorded `2026-10-06` by the agent at the human project owner's instruction | **Fact** |
| **Revisit conditions** | Not specified by the decider | **Fact** — none were communicated. A supersession/retention policy does not exist yet (Experiment 06 D7 remains open). **This record does not invent a revisit trigger.** |
| **Deletion policy** | Not decided | **Fact** — no policy exists; this file must not be treated as setting one. |

**Interpretation:** if this decision is ever superseded, the successor record should link back here — but the rule for doing so is itself undecided (D7) and is not established by this file.

---

## 8. Facts vs. interpretations in this record (summary)

| Element | Classification |
|---|---|
| Decision statement (Spanish original + English interpretation) (§3) | **Fact** — as communicated, verbatim |
| Status `Accepted` (§1) | **Interpretation** — precedent-based; not communicated (AMB-G1) |
| Date `2026-10-06` and its basis (§1) | **Fact** — environment-verified, date-level precision; not human-stated (AMB-G2) |
| Scope, non-scope, authority-boundary statements (§1, §3.1) | **Fact** — as communicated in the task instruction |
| Alternatives P6–P10, C1–C4 (§4) | **Fact** — as presented in Experiment 06 §7, then unapproved |
| "No option label is adopted" (§4) | **Fact** — deliberately; mapping would be interpretation |
| Consequences in §5.2 | **Interpretation** — analysis-derived, explicitly not part of the decision statement |
| Ambiguities AMB-G1–AMB-G6 (§6) | **Fact** that they are unresolved; no resolutions offered |

---

## 9. Source references

* `AGENTS.md` — § *Do not invent requirements*, § *The human remains responsible for product decisions*, § *Repository Safety* (read; **not modified**).
* `experiments/03-decision-closure-analysis.md` — open decisions D2–D7 background (read; not modified).
* `experiments/05-decision-consumption.md` — finding FM2, pass-qualifier Q2, missing mechanism MM2 (read; not modified).
* `experiments/06-decision-specification.md` — §2.2 evidence items 3–4, §7 alternatives P6–P10 / C1–C4, §10 O3, AMB-3/AMB-4 (read; not modified).
* `docs/decisions/0001-decision-recording-mechanism.md` — D1, the mechanism used to record GP1 (read; **not modified**).
* `docs/decisions/INDEX.md` — discovery index, updated to add GP1 under D1's authorized mechanism (modified **only** to add the GP1 entry and keep its decision count accurate).
* Decision statement for GP1 — communicated by the human project owner in the task that produced this record (also stored by the human at `experiments/experiment-07-prompt.md`).

---

## 10. Verification of this record's creation

1. **Working tree inspected:** `git status --short --untracked-files=all`; `git diff`, `git diff --cached`, and `git ls-files -m` all empty → no tracked file modified; `docs/decisions/INDEX.md` is untracked, so its authorized modification was verified by content comparison against the pre-task copy (`f5d34b46…`).
2. **Checksums re-verified against the pre-write baseline:** `AGENTS.md` `7355a77e…`, D1 record `5f9deeb4…`, `README.md` / `docs/vision.md` / `docs/architecture.md` `d41d8cd9…`, `INITIAL_PROMPT.md` `e8ebf1f4…`, `.gitignore` `8f7a9110…`, and all experiment files unchanged.
3. **Exactly one new file created by the agent:** `docs/decisions/0002-harness-artifact-persistence.md`. **Exactly one existing file modified, as authorized:** `docs/decisions/INDEX.md` (two changes only: decision count `one`→`two`, and the added GP1 row).
4. **No application code** created or modified; **no stack selected**; **no harness rules modified**; **no template, pointer, or governance rule created**.
5. **No files staged; no Git commit or push performed** (HEAD unchanged at `5fd9f54`; stash empty). Recording GP1 and executing GP1 remain separate — as §3.1 states.
