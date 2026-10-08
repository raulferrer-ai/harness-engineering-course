# HD-1 — Experiment prompt artifacts

*Third recorded decision of this repository — recorded using the ADR-per-decision plus index mechanism established by D1.*

**Label legend:** **Fact** = observed in the repository, in `AGENTS.md`, or in the decision statement communicated by the human project owner. **Observation** = a fact plus its immediate significance. **Interpretation** = an inference beyond the observed data. **Recommendation** = an option for evaluation; decides nothing. *(Ambiguity references in this record are local: `AMB-P1`–`AMB-P7`; D1's `A1`–`A7` and GP1's `AMB-G1`–`AMB-G6` are separate.)*

---

## 1. Record fields

| Field | Value | Basis |
|---|---|---|
| **Decision ID** | `HD-1` | **Fact** — the identifier used in the decision statement communicated by the human project owner; the same identifier was used for this question in `experiments/08-gp1-artifact-scope-analysis.md` §14/§20. The relationship between `HD-1` and the file number `0003` (both assigned by the task instruction) is not governed by any established identifier scheme — see ambiguity AMB-P3. |
| **Title** | Experiment prompt artifacts | **Fact** — taken from the file name specified by the human's task instruction (`0003-experiment-prompt-artifacts.md`). |
| **Status** | `Accepted` | **Interpretation of communication, not verbatim communication** — the human stated that HD-1 "has now been made" but supplied **no status string**. `Accepted` follows the precedent of the two existing records (D1's status was verbatim; GP1's followed the same precedent — GP1 AMB-G1). **No status vocabulary has been standardized** (D1 ambiguity A3; Experiment 06 D2 open) — see ambiguity AMB-P1. |
| **Decided by** | Human project owner | **Fact** — as communicated. |
| **Decision date** | `2026-10-08` (date-level precision only) | **Fact** — verified from the environment at recording time: system clock returned `Thu Oct 8 08:08:19 CEST 2026` (`2026-10-08`). **The decider stated no date** — see ambiguity AMB-P2. |
| **Scope** | Classification of the existing `experiment-XX-prompt.md` artifact class under GP1 (whether it is project/harness material and therefore must be version-controlled) | **Fact** — wording derived from the decision statement and its explicit boundary ("The decision concerns the existing `experiment-XX-prompt.md` artifact class"), both communicated in the task that produced this record. |
| **Explicit non-scope** | This decision does **not** automatically classify arbitrary prompts, chat transcripts, temporary notes, chat exports, or other interaction artifacts as project artifacts. It does **not** decide when, how, or under what commit-message convention the files are version-controlled (execution). It does **not** select the website technology stack. | **Fact** — the boundary is stated explicitly in the decision statement; the execution exclusion follows from the decision statement's silence on execution plus GP1's recorded non-scope; the technology-stack exclusion follows from `AGENTS.md` § *Do not invent requirements* and § *The human remains responsible for product decisions* as applied by the task constraints. |
| **Record file** | `docs/decisions/0003-experiment-prompt-artifacts.md` | **Fact** — path specified by the human's task instruction, not chosen by the agent. |

---

## 2. Context

**Fact — evidence from previous records and experiments (recorded as observations, not as retroactive requirements):**

* Experiment 08 (`experiments/08-gp1-artifact-scope-analysis.md`) inventoried 23 files and classified **all 8 experiment prompt files** (`experiments/experiment-01-prompt.md` … `experiment-08-prompt.md`) as **Class C — human decision required**, because no recorded decision classifies prompts and the task of that experiment explicitly reserved prompt versioning to the human (Exp08 §8).
* Experiment 08 asked this exact question as **HD-1** (§14/§20): *"Do experiment prompt files 'form part of the project' within GP1, and therefore require version control?"* — with three candidate interpretations (i)/(ii)/(iii), all then-unapproved.
* GP1 (`docs/decisions/0002-harness-artifact-persistence.md`) deliberately does not enumerate the artifact classes under "demás artefactos del harness que deban formar parte del proyecto" (GP1 ambiguity AMB-G4: *"Left undefined by design; any enumeration requires a future human decision"*). HD-1 is one such enumeration decision, for this artifact class.
* Before this record, **no decision record classified any prompt file.**

**Fact — the human has now decided HD-1**, communicating the decision statement reproduced in §3.

**Fact — characterization supplied by the decider:** the decision statement itself states that each `experiment-XX-prompt.md` file "contains the prompt passed to the LLM for that experiment and the response produced by the LLM" and that these files "are static historical records of the process and do not change once created", followed by "Therefore:" and the decision. This premise-and-therefore structure is the decider's own supplied basis; **no further rationale was communicated, and none is manufactured here** (contrast GP1 AMB-G5, where no rationale at all was supplied).

**Observation:** the decider's characterization matches the files' observed structure (Exp08 §4 rows 15–22: human-authored prompt plus appended response; several observed changing only by human appends between experiments).

**Observation:** HD-1 is the third recorded decision; the mechanism established by D1 now holds three records.

**Interpretation:** nothing in this file expands HD-1; every element beyond the decision statement is a labelled fact, a labelled analysis-derived consequence (§5.2), or a flagged ambiguity (§6).

---

## 3. Decision (as made by the human project owner — not altered)

**Fact — the decision statement as communicated (original wording preserved verbatim):**

> "Each `experiment-XX-prompt.md` file contains the prompt passed to the LLM for that experiment and the response produced by the LLM. These files are static historical records of the process and do not change once created.
>
> Therefore:
>
> **Experiment prompt files are project/harness artifacts and fall within GP1's scope. They must be version-controlled.**
>
> Do not expand this into a broader rule about every possible prompt, transcript, chat export, or temporary interaction artifact. The decision concerns the existing `experiment-XX-prompt.md` artifact class."

**Fact — what HD-1 does NOT state.** The recorded decision does **not** strengthen into any of the following; none of these has been decided:

* "every possible prompt, transcript, chat export, or temporary interaction artifact is a project artifact";
* "prompt files must be committed immediately, or at any particular time";
* "the agent or the human may execute this versioning without further steps";
* "any retention, deletion, or supersession rule for prompt files applies".

### 3.1 Authority boundary (required explicit statements)

**Fact — this ADR states explicitly that:**

1. **HD-1 was decided by the human project owner.** The agent did not select, expand, narrow, or alter it; the agent's role here is scribe only.
2. **The agent is recording the decision, not making it.** Writing this record confers no authority on the writer — recording a decision and owning it are separate acts (consistent with D1 §3.1 and GP1 §3.1).
3. **The existing `experiment-XX-prompt.md` class is project/harness material:** it falls within GP1's scope, and these files **must be version-controlled** — the scope recorded in §1, taken from the human's own wording.
4. **This decision does not automatically classify arbitrary prompts, chat transcripts, temporary notes, chat exports, or other interaction artifacts as project artifacts.** The decider explicitly forbade that expansion; the decision concerns the existing `experiment-XX-prompt.md` artifact class only.
5. **Recording HD-1 and executing HD-1 are separate actions.** This record performs **no** Git action: nothing is staged, committed, or pushed. Actually version-controlling the prompt files is a separate, future, human-directed action (consistent with GP1 §3.1 point 6).
6. **HD-1 decides classification, not execution.** *Who* may create commits is addressed by ADR 0004 (HD-2); *when/how/under what message convention* anything is committed is decided nowhere and remains open (see AMB-P7).
7. **Future decisions remain human-owned unless explicitly delegated** (consistent with D1 §3.1). Any future delegation must itself be recorded as an explicit decision naming its scope.

---

## 4. Alternatives considered

**Fact — label:** the alternatives below were **presented in Experiment 08 §14 (HD-1 row)** as **candidate interpretations, then unapproved**. They are recorded here as *alternatives considered*, **not** as selected or rejected decisions. **No alternative beyond those documented in Experiment 08 §14 is invented here.**

| Ref | Alternative (as presented in Experiment 08 §14 — then unapproved) |
|---|---|
| (i) | **All 8 prompts in scope** — full conversation capture per `AGENTS.md` § *Documentation* |
| (ii) | **Only unique-content prompts in scope** (`01`, `04`, `07`) — requires a per-file "unique content" judgment rule |
| (iii) | **No prompts in scope** — reports suffice as the experiment record; prompts are conversational material |

**Fact:** Experiment 08 §14 also carried an **unapproved Recommendation** favoring interpretation (i), and listed a consequence for each interpretation. Recommendations decide nothing (Exp08 §17/§20; `AGENTS.md` § *The human remains responsible for product decisions*).

**Fact — what is NOT known:** the decision statement communicated by HD-1 records the **selection only** (its own wording). It does not state which alternatives the decider weighed, in what order, or why. **This ADR does not reconstruct or infer a rationale beyond the premise the decider supplied in §3.**

**Interpretation — cross-reference for traceability only:** the decided wording ("Experiment prompt files are project/harness artifacts… They must be version-controlled", bounded to "the existing `experiment-XX-prompt.md` artifact class") corresponds to candidate **(i)** for the files existing at the time of Experiment 08, and does not select (ii) or (iii). This is a cross-reference, not a modification, expansion, or reinterpretation of the decision — the same posture as D1 §4's "matches candidate M3". Note that (ii)'s per-file judgment rule and (iii)'s exclusion are therefore not adopted, and no "unique content" rule exists or is created.

---

## 5. Consequences

### 5.1 Stated by the decider or directly carried by the decision wording (Fact)

* **Experiment prompt files (`experiment-XX-prompt.md`) are project/harness artifacts and fall within GP1's scope; they must be version-controlled.**
* The decider's stated basis: these files are **static historical records of the process** (prompt plus LLM response for the experiment) that **do not change once created** (§3).
* **The boundary is explicit:** this decision does **not** automatically classify arbitrary prompts, chat transcripts, temporary notes, chat exports, or other interaction artifacts as project artifacts; it concerns the existing `experiment-XX-prompt.md` artifact class.
* The Class-C question Experiment 08 reserved to the human (HD-1) is **answered for this artifact class**.
* **Executing** the versioning is a separate action and was **not performed** by this record — per instruction, nothing is staged or committed here.

### 5.2 Analysis-derived (Interpretation — from previous experiment records; not part of the decision statement)

* **GP1's execution set grows by 8 files:** the prompt files join the 15 Class-A files (Exp08 §6) as artifacts whose identity is now settled; the eventual execution act covers the in-scope untracked set including prompts. **No execution, staging, or commit happens now** (GP1 §3.1; this task's constraints).
* **HD-4 does not arise as formulated:** Experiment 08's conditional HD-4 (ignore-vs-merely-untracked) applied *only if* HD-1 excluded files (Exp08 §14/§20). HD-1 includes them, so the condition is not met and `.gitignore` needs no change for this purpose (`.gitignore` unmodified by this task).
* **Experiment 08's report is now historically superseded on this point but is not edited:** Exp08 §8/§14/§20 still reads as "awaiting HD-1". `experiments/*` may not be modified by this task; the cross-reference is recorded in this file only (same posture as GP1 AMB-G6(a)).
* **Harness gap (Exp08 §16) is partially closed:** Layer 1 (no authoritative scope record) now has a scope record for this artifact class in `docs/decisions/`; Layer 2 (no `AGENTS.md` pointer to `docs/decisions/`, Exp03 D4/Exp05 FM1) is **unchanged** — discovery of this record is still not guaranteed.
* **Durability concern addressed in principle:** Experiment 08 §8 noted `experiment-04-prompt.md` is the sole narrative record of Experiment 04 (no `04-*.md` report exists). HD-1 puts that trail inside GP1's scope; until execution occurs, the gap in Git history persists.

---

## 6. Ambiguities and open points (reported, not silently resolved)

**Fact — the following were encountered while writing this record and were deliberately NOT resolved by the agent:**

| # | Ambiguity | Handling |
|---|---|---|
| **AMB-P1** | **Status vocabulary.** No status string was supplied for HD-1; the task states the decision "has now been made" but communicates no status value. D1's `Accepted` was verbatim for that record; the vocabulary itself remains unapproved (D1 A3; Experiment 06 D2 open). | Recorded `Accepted` following D1/GP1 precedent, flagged in §1 as interpretation rather than verbatim communication. **No vocabulary decision is made here.** |
| **AMB-P2** | **Decision date.** The decider stated no date or time. | Recorded `2026-10-08`, date-level, environment-verified (`Thu Oct 8 08:08:19 CEST 2026`) — same method as D1 A1 / GP1 AMB-G2. **Not a human-stated date; if a different decision date applies, it requires human confirmation.** No communication date invented. |
| **AMB-P3** | **Identifier scheme.** `HD-1` is an experiment-era identifier (Exp08 §14/§20); the file ordinal `0003` continues the unreconciled `D1`↔`0001`, `GP1`↔`0002` pairings (D1 A2; GP1 AMB-G3). The `HD-*` prefix is a third prefix in three records. | Both values recorded as given; the pairing is by the task instruction specifying this file path. **No identifier scheme is created or normalized**; identifier policy remains open (D2/D7). |
| **AMB-P4** | **Temporal scope.** The decision speaks of the `experiment-XX-prompt.md` **class** and of "Experiment prompt files" in general, while the task also says "The decision concerns the **existing** `experiment-XX-prompt.md` artifact class". Whether prompt files of this class **created after this decision** are automatically covered is not explicitly stated. | Reported, not resolved: the wording is recorded verbatim (§3) and neither reading is asserted here. If a future instance's status matters, it requires human confirmation. |
| **AMB-P5** | **Rationale depth.** The decider supplied the premise-and-therefore basis reproduced in §3, but no further rationale (e.g. why versioning rather than another persistence mechanism). | Recorded as supplied (§2, §3); nothing manufactured beyond it. |
| **AMB-P6** | **Index-note tension.** `INDEX.md`'s standing note states statuses/dates are "reproduced exactly as communicated by the decider" — for HD-1, no status/date was communicated (AMB-P1/P2). | The note was **not** modified (change authorized only "to add the two decisions and the minimum necessary count/index information"); the tension is reported here for human resolution in a future authorized edit — same posture as GP1 AMB-G6(b). |
| **AMB-P7** | **Execution remains undecided.** HD-1 settles *what* must be version-controlled, not *when/how/by which message*. GP1's non-scope (frequency/branch/message/staging/CI/release) and Experiment 02 H10 (Git workflow) remain open; ADR 0004 (HD-2) decides only commit **authority** + announcement. | Reported, not resolved. No execution policy invented; GP1's execution remains a separate, future, human-directed act. |

**Observation:** AMB-P1/P2/P3 are the same *class* of gap D1 flagged at A1–A3 and GP1 repeated at AMB-G1–G3 — the mechanism records faithfully, but vocabulary, dates, and identifiers remain undecided, now recurring on the third record rather than being closed by it.

---

## 7. Supersession information

| Field | Value | Basis |
|---|---|---|
| **Supersedes** | None | **Fact** — no earlier record decides prompt-file classification; D1 and GP1 are separate decisions on separate subjects. This record *answers the question* Experiment 08 raised as HD-1, but it supersedes no record. |
| **Superseded by** | None, as of `2026-10-08` | **Fact** — no later record exists at creation time. |
| **Status history** | Initial record: `Accepted` (see AMB-P1 for its basis), recorded `2026-10-08` by the agent at the human project owner's instruction | **Fact** |
| **Revisit conditions** | Not specified by the decider | **Fact** — none were communicated. A supersession/retention policy does not exist yet (Experiment 03 D7 remains open). **This record does not invent a revisit trigger.** |
| **Deletion policy** | Not decided | **Fact** — no policy exists; this file must not be treated as setting one. |

**Interpretation:** if this decision is ever superseded, the successor record should link back here — but the rule for doing so is itself undecided (D7) and is not established by this file.

---

## 8. Facts vs. interpretations in this record (summary)

| Element | Classification |
|---|---|
| Decision statement (verbatim, §3) and its explicit boundary | **Fact** — as communicated |
| Decider-supplied premise (static historical records…), §2/§3 | **Fact** — as communicated; no further rationale exists |
| Status `Accepted` (§1) | **Interpretation** — precedent-based; not communicated (AMB-P1) |
| Date `2026-10-08` and its basis (§1) | **Fact** — environment-verified, date-level precision; not human-stated (AMB-P2) |
| Scope, non-scope, authority-boundary statements (§1, §3.1) | **Fact** — as communicated in the task instruction, or directly carried by the decision wording |
| Alternatives (i)–(iii) (§4) | **Fact** — as presented in Experiment 08 §14, then unapproved |
| "Corresponds to candidate (i)" (§4) | **Interpretation** — cross-reference only; no option label adopted by this record |
| Consequences in §5.2 | **Interpretation** — analysis-derived, explicitly not part of the decision statement |
| Ambiguities AMB-P1–AMB-P7 (§6) | **Fact** that they are unresolved; no resolutions offered |

---

## 9. Source references

* `AGENTS.md` — § *Do not invent requirements*, § *The human remains responsible for product decisions*, § *Documentation is part of the system*, § *Repository Safety* (read; **not modified**).
* `docs/decisions/0001-decision-recording-mechanism.md` — D1, the mechanism used to record HD-1 (read; not modified).
* `docs/decisions/0002-harness-artifact-persistence.md` — GP1, whose scope this decision enumerates for one artifact class (read; not modified).
* `docs/decisions/INDEX.md` — discovery index, updated to add HD-1 and HD-2 under D1's authorized mechanism (modified **only** to add the two entries and keep its decision count accurate).
* `experiments/08-gp1-artifact-scope-analysis.md` — Class-C classification, HD-1 question matrix (§8, §14, §20), harness-gap analysis (§16) (read; not modified).
* `experiments/experiment-08-prompt.md` — the task prompt and appended response for Experiment 08 (read; not modified).
* Decision statement for HD-1 — communicated by the human project owner in the task that produced this record (the human stored this task's prompt at `experiments/experiment-09-prompt.md` during the task; the agent never wrote to that file).

---

## 10. Verification of this record's creation

1. **Working tree inspected:** `git status --short --untracked-files=all`; `git diff --cached`, `git ls-files -m` empty → no tracked file modified (except as authorized below); stash empty.
2. **Exactly two new files created by the agent:** `docs/decisions/0003-experiment-prompt-artifacts.md` and `docs/decisions/0004-git-commit-authority.md`.
3. **Exactly one existing file modified, as authorized:** `docs/decisions/INDEX.md` (two changes only: decision count `two`→`four`, and the added HD-1/HD-2 rows).
4. **Checksums re-verified against the pre-task baseline:** `AGENTS.md` `7355a77e…`, D1 record `5f9deeb4…`, GP1 record `04af7636…`, `.gitignore` `8f7a9110…`, `INITIAL_PROMPT.md` `e8ebf1f4…`, and all experiment reports/prompt files unchanged, **with one documented exception:** `experiments/experiment-09-prompt.md` was observed **empty** (`d41d8cd9…`) at task start and was filled to 4,736 B (`d551d9d2…`) by the **human during the task** (it contains this task's verbatim prompt and an unfilled `Response:` marker) — human work; the agent never wrote to it.
5. **No application code** created or modified; **no stack selected**; **no harness rules modified**; **no experiment file modified**.
6. **No files staged; no Git commit or push performed** (HEAD unchanged at `5fd9f54`; commit count still 2; `origin/main` still `5fd9f54…`).
7. **No GP1 execution performed:** nothing is staged, committed, or pushed; recording HD-1 and executing HD-1 remain separate, as §3.1 states.
