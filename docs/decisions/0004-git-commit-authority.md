# HD-2 — Git commit authority

*Fourth recorded decision of this repository — recorded using the ADR-per-decision plus index mechanism established by D1.*

**Label legend:** **Fact** = observed in the repository, in `AGENTS.md`, or in the decision statement communicated by the human project owner. **Observation** = a fact plus its immediate significance. **Interpretation** = an inference beyond the observed data. **Recommendation** = an option for evaluation; decides nothing. *(Ambiguity references in this record are local: `AMB-A1`–`AMB-A7`; D1's `A1`–`A7`, GP1's `AMB-G1`–`AMB-G6`, and HD-1's `AMB-P1`–`AMB-P7` are separate.)*

---

## 1. Record fields

| Field | Value | Basis |
|---|---|---|
| **Decision ID** | `HD-2` | **Fact** — the identifier used in the decision statement communicated by the human project owner; the same identifier was used for this question in `experiments/08-gp1-artifact-scope-analysis.md` §9/§14/§15/§20. The relationship between `HD-2` and the file number `0004` (both assigned by the task instruction) is not governed by any established identifier scheme — see ambiguity AMB-A3. |
| **Title** | Git commit authority | **Fact** — taken from the file name specified by the human's task instruction (`0004-git-commit-authority.md`). |
| **Status** | `Accepted` | **Interpretation of communication, not verbatim communication** — the human stated that HD-2 "has now been made" but supplied **no status string**. `Accepted` follows the precedent of the two existing records (D1's status was verbatim; GP1's followed the same precedent — GP1 AMB-G1). **No status vocabulary has been standardized** (D1 ambiguity A3; Experiment 06 D2 open) — see ambiguity AMB-A1. |
| **Decided by** | Human project owner | **Fact** — as communicated. |
| **Decision date** | `2026-10-08` (date-level precision only) | **Fact** — verified from the environment at recording time: system clock returned `Thu Oct 8 08:08:19 CEST 2026` (`2026-10-08`). **The decider stated no date** — see ambiguity AMB-A2. |
| **Scope** | Git commit authority: who may create Git commits, and the agent's pre-commit announcement constraint | **Fact** — wording derived from the decision statement communicated in the task that produced this record. |
| **Explicit non-scope** | This decision does **not** establish branch policy; commit-message conventions; commit frequency; pull-request policy; merge policy; release policy; force-push policy; or a general Git workflow. It does **not** decide staging policy, CI, rebasing, or release tags beyond that list, and it does **not** select the website technology stack. | **Fact** — the first list is required verbatim by the decision statement's boundary; the additions follow the decider's own non-expansion list recorded in §3 (CI, rebase) and GP1's recorded non-scope (staging), plus `AGENTS.md` § *Do not invent requirements* and § *The human remains responsible for product decisions* for the technology stack. |
| **Record file** | `docs/decisions/0004-git-commit-authority.md` | **Fact** — path specified by the human's task instruction, not chosen by the agent. |

---

## 2. Context

**Fact — evidence from previous records and experiments (recorded as observations, not as retroactive requirements):**

* GP1 (`docs/decisions/0002-harness-artifact-persistence.md`) is explicitly non-scope on "who commits" and on commit frequency, branch strategy, commit-message conventions, staging, CI, and release policy (GP1 §1 non-scope; §3.1 point 4). GP1 §3.1 point 4 further states that future Git governance decisions remain human-owned unless explicitly delegated, and that any delegation must itself be recorded as an explicit decision naming its scope (citing D1 §3.1).
* Experiment 08 (`experiments/08-gp1-artifact-scope-analysis.md`) recorded, as Class D-1 (§9), that *execution* of the in-scope untracked set cannot be determined from GP1 alone and requires a human execution-policy decision — its **HD-2** (§14/§20): *"Who commits the confirmed in-scope untracked artifacts, when, in what scope, and under what commit-message convention?"* — with candidate interpretations (a)/(b)/(c), all then-unapproved.
* Experiment 02 H10 (commit/branch/message workflow) remains open (Exp08 §3.4); no recorded decision before this one grants the agent any Git act.
* `AGENTS.md` § *Repository Safety* governs commit hygiene as a human-governed act (read; **not modified**).

**Fact — the human has now decided HD-2**, communicating the decision statement reproduced in §3.

**Fact — rationale:** the decider supplied **no rationale** for HD-2 beyond the decision statement itself. Per instruction, **no rationale is manufactured here**; the experiment evidence above is cited as context/observation only, not as decider rationale. (D1 AMB-A4 and GP1 AMB-G5 carried the same posture.)

**Observation:** HD-2 is the fourth recorded decision; the mechanism established by D1 now holds four records.

**Interpretation:** nothing in this file expands HD-2; every element beyond the decision statement is a labelled fact, a labelled analysis-derived consequence (§5.2), or a flagged ambiguity (§6).

---

## 3. Decision (as made by the human project owner — not altered)

**Fact — the decision statement as communicated (original wording preserved verbatim):**

> "**Both the agent and the human user may create Git commits.**
>
> Additional constraint:
>
> **If the agent wants to create a commit, it must first explicitly state that it wants to commit and explain why.**
>
> The agent must not create a commit silently.
>
> Do not expand this into additional Git policy concerning: branch strategy; commit message format; commit frequency; pull requests; release tags; CI; force pushes; rebasing; merge policy.
>
> Those remain unresolved unless already established elsewhere."

**Fact — what HD-2 does NOT establish.** Per the decision statement itself, this decision does **not** establish:

* branch policy;
* commit-message conventions;
* commit frequency;
* pull-request (PR) policy;
* merge policy;
* release policy (including release tags);
* force-push policy;
* general Git workflow (including rebasing, CI, staging policy, and anything else in the decider's non-expansion list not settled elsewhere).

**Fact:** each of the above "remain[s] unresolved unless already established elsewhere" — i.e. this record checks nothing against other records on their behalf; it only records that HD-2 does not decide them.

### 3.1 Authority boundary (required explicit statements)

**Fact — this ADR states explicitly that:**

1. **HD-2 was decided by the human project owner.** The agent did not select, expand, narrow, or alter it; the agent's role here is scribe only.
2. **The agent is recording the decision, not making it.** Writing this record confers no authority on the writer — recording a decision and owning it are separate acts (consistent with D1 §3.1 and GP1 §3.1).
3. **Both the human user and the agent may create Git commits.**
4. **An agent must announce its intention to commit before doing so — explicitly stating that it wants to commit — and must explain why.** **Silent agent commits are not permitted.**
5. **This decision does NOT establish** branch policy; commit-message conventions; commit frequency; PR policy; merge policy; release policy; force-push policy; or general Git workflow (full list in §1/§3).
6. **Recording HD-2 and acting under HD-2 are separate actions.** This record performs **no** Git action: nothing is staged, committed, or pushed. (GP1 §3.1 point 6 — recording ≠ executing — is unaffected.)
7. **This record is the explicit, scope-named delegation that D1 §3.1 requires** ("If a future delegation occurs, it must itself be recorded as an explicit decision naming the scope of the delegation"). Its scope is exactly §3/§4 of this record: commit creation plus the announcement constraint. *(Observation: this satisfies D1's stated form for a delegation; whether it is sufficient in any other respect is not decided here.)*

---

## 4. Alternatives considered

**Fact — label:** the alternatives below were **presented in Experiment 08 §14 (HD-2 row)** as **candidate interpretations, then unapproved**. They are recorded here as *alternatives considered*, **not** as selected or rejected decisions. **No alternative beyond those documented in Experiment 08 §14 is invented here.**

| Ref | Alternative (as presented in Experiment 08 §14 — then unapproved) |
|---|---|
| (a) | **Single batch commit** of all confirmed-in-scope files after HD-1 resolves |
| (b) | **Incremental commits** per artifact class (decisions first, then reports, then whatever HD-1 adds) |
| (c) | **Human-manual, unscheduled** — the human commits when convenient; **the agent never commits** |

**Fact:** Experiment 08 §14 also carried **unapproved Recommendations** favoring (a) or (c), and listed a consequence for each. Recommendations decide nothing (Exp08 §17/§20; `AGENTS.md` § *The human remains responsible for product decisions*).

**Fact — what is NOT known:** the decision statement communicated by HD-2 records the **selection only** (its own wording). It does not state which alternatives the decider weighed, in what order, or why. **This ADR does not reconstruct or infer a rationale.**

**Interpretation — cross-reference for traceability only:**

* HD-2 answers the **"who"** sub-question of Experiment 08's HD-2 question (who commits) and adds the announcement constraint; it deliberately leaves the "when / in what scope / under what message convention" sub-questions undecided (§5.2, AMB-A5).
* Consequently, no option label is adopted as a whole: (a) and (b) are *commit-scope/frequency* options and remain undecided; (c) as a package is **not** selected, because its element "the agent never commits" is contradicted by the decided statement that the agent may commit. This is a cross-reference, not a modification, expansion, or reinterpretation of the decision.

---

## 5. Consequences

### 5.1 Stated by the decider or directly carried by the decision wording (Fact)

* **Both the human user and the agent may create Git commits.**
* **Before creating a commit, an agent must explicitly state that it wants to commit and explain why.**
* **Silent agent commits are not permitted.**
* Branch strategy, commit-message format, commit frequency, pull requests, release tags, CI, force pushes, rebasing, and merge policy are **not** established by this decision and remain unresolved unless already established elsewhere (§3).
* **Executing** anything under this authority is a separate action and was **not performed** by this record — per instruction, nothing is staged or committed here.

### 5.2 Analysis-derived (Interpretation — from previous experiment records; not part of the decision statement)

* **Experiment 08's HD-2 question is only partially answered:** "who commits" → answered (both); "when, in what scope, under what message convention" → still open (Exp08 §14/§20; Experiment 02 H10 open; GP1 non-scope). GP1's execution therefore has authority but no schedule, batching rule, or message convention.
* **Permission, not obligation:** the wording is "may create" — this record does not require, schedule, or forbid any particular commit, and it does not authorize or perform GP1's execution (GP1 §3.1 point 6).
* **The announcement requirement creates a visible pre-commit moment, but no approval/waiting rule is stated** — see AMB-A4. This record does not resolve whether announcement must precede a waiting period or human approval.
* **Consistency with `AGENTS.md`:** § *Repository Safety* frames commit hygiene as human-governed; HD-2 delegates a bounded part of that act to the agent under an announcement constraint. `AGENTS.md` was **not** modified by this task (modification not authorized); whether its text should later be amended to reflect HD-2 is a separate, unmade decision, not implied by this record.
* **Interaction with GP1 execution (HD-1 + this record):** the two decisions Experiment 08 identified as its "minimum human decision set" are now both recorded, but *recording them is not executing them* — the untracked durability gap persists in Git history until a separate, human-directed execution act.

---

## 6. Ambiguities and open points (reported, not silently resolved)

**Fact — the following were encountered while writing this record and were deliberately NOT resolved by the agent:**

| # | Ambiguity | Handling |
|---|---|---|
| **AMB-A1** | **Status vocabulary.** No status string was supplied for HD-2; the task states the decision "has now been made" but communicates no status value. The vocabulary itself remains unapproved (D1 A3; Experiment 06 D2 open). | Recorded `Accepted` following D1/GP1 precedent, flagged in §1 as interpretation rather than verbatim communication. **No vocabulary decision is made here.** |
| **AMB-A2** | **Decision date.** The decider stated no date or time. | Recorded `2026-10-08`, date-level, environment-verified (`Thu Oct 8 08:08:19 CEST 2026`) — same method as D1 A1 / GP1 AMB-G2 / HD-1 AMB-P2. **Not a human-stated date; if a different decision date applies, it requires human confirmation.** No communication date invented. |
| **AMB-A3** | **Identifier scheme.** `HD-2` is an experiment-era identifier (Exp08 §14/§20); the file ordinal `0004` continues the unreconciled `D1`↔`0001`, `GP1`↔`0002`, `HD-1`↔`0003` pairings (D1 A2; GP1 AMB-G3; HD-1 AMB-P3). | Both values recorded as given; the pairing is by the task instruction specifying this file path. **No identifier scheme is created or normalized**; identifier policy remains open (D2/D7). |
| **AMB-A4** | **Announcement semantics.** The decision requires the agent to "first explicitly state that it wants to commit and explain why" before committing. It does **not** state whether the agent must then **wait for human approval**, for how long, or whether announcing and explaining (then proceeding) suffices. | Reported, not resolved. **No approval/waiting rule is invented here.** A future agent in doubt must ask the human rather than infer a default. |
| **AMB-A5** | **The remainder of Experiment 08's HD-2 question is open.** "When, in what scope, and under what commit-message convention" was part of the original question (Exp08 §14); HD-2's statement addresses only authority + announcement, and says the rest "remain[s] unresolved unless already established elsewhere" (which this record does not check on anyone's behalf). | Reported, not resolved. No frequency, batching, scope, or message policy invented. |
| **AMB-A6** | **Rationale absent.** The decider supplied no rationale for HD-2. | Recorded as absent (§2); experiment evidence cited as context/observation only, not manufactured into rationale (same posture as GP1 AMB-G5). |
| **AMB-A7** | **Index-note tension.** `INDEX.md`'s standing note states statuses/dates are "reproduced exactly as communicated by the decider" — for HD-2, no status/date was communicated (AMB-A1/A2). | The note was **not** modified (change authorized only "to add the two decisions and the minimum necessary count/index information"); the tension is reported here for human resolution in a future authorized edit — same posture as GP1 AMB-G6(b) and HD-1 AMB-P6. |

**Observation:** AMB-A1/A2/A3 are the same *class* of gap flagged in every previous record (D1 A1–A3; GP1 AMB-G1–G3; HD-1 AMB-P1–P3); AMB-A4 and AMB-A5 are *new*, created by the decision's deliberate partiality — this record grants authority while leaving workflow open, which is faithful to the decider's boundary but leaves a future agent needing to ask rather than proceed on defaults.

---

## 7. Supersession information

| Field | Value | Basis |
|---|---|---|
| **Supersedes** | None | **Fact** — no earlier record decides commit authority; D1, GP1, and HD-1 are separate decisions on separate subjects. This record *answers the "who" half* of the question Experiment 08 raised as HD-2, but it supersedes no record. |
| **Superseded by** | None, as of `2026-10-08` | **Fact** — no later record exists at creation time. |
| **Status history** | Initial record: `Accepted` (see AMB-A1 for its basis), recorded `2026-10-08` by the agent at the human project owner's instruction | **Fact** |
| **Revisit conditions** | Not specified by the decider | **Fact** — none were communicated. A supersession/retention policy does not exist yet (Experiment 03 D7 remains open). **This record does not invent a revisit trigger.** |
| **Deletion policy** | Not decided | **Fact** — no policy exists; this file must not be treated as setting one. |

**Interpretation:** if this decision is ever superseded, the successor record should link back here — but the rule for doing so is itself undecided (D7) and is not established by this file.

---

## 8. Facts vs. interpretations in this record (summary)

| Element | Classification |
|---|---|
| Decision statement (verbatim, §3) and its non-establishment list | **Fact** — as communicated |
| Status `Accepted` (§1) | **Interpretation** — precedent-based; not communicated (AMB-A1) |
| Date `2026-10-08` and its basis (§1) | **Fact** — environment-verified, date-level precision; not human-stated (AMB-A2) |
| Scope, non-scope, authority-boundary statements (§1, §3.1) | **Fact** — as communicated in the task instruction, or directly carried by the decision wording |
| Alternatives (a)–(c) (§4) | **Fact** — as presented in Experiment 08 §14, then unapproved |
| "Answers only the 'who' sub-question"; "(c) not selected as a package" (§4) | **Interpretation** — cross-reference only; no option label adopted by this record |
| "This record satisfies D1 §3.1's form for a delegation" (§3.1 point 7) | **Observation** — a fact plus its immediate significance; not a claim of sufficiency |
| Consequences in §5.2 | **Interpretation** — analysis-derived, explicitly not part of the decision statement |
| Ambiguities AMB-A1–AMB-A7 (§6) | **Fact** that they are unresolved; no resolutions offered |

---

## 9. Source references

* `AGENTS.md` — § *Do not invent requirements*, § *The human remains responsible for product decisions*, § *Repository Safety*, § *Change Discipline* (read; **not modified**).
* `docs/decisions/0001-decision-recording-mechanism.md` — D1, the mechanism used to record HD-2, and §3.1's delegation requirement (read; not modified).
* `docs/decisions/0002-harness-artifact-persistence.md` — GP1, whose explicit non-scope ("who commits", frequency, branch/message/staging/CI/release) frames what HD-2 does and does not decide (read; not modified).
* `docs/decisions/INDEX.md` — discovery index, updated to add HD-1 and HD-2 under D1's authorized mechanism (modified **only** to add the two entries and keep its decision count accurate).
* `experiments/08-gp1-artifact-scope-analysis.md` — Class D-1 execution analysis, HD-2 question matrix (§9, §14, §15, §20) (read; not modified).
* `experiments/experiment-08-prompt.md` — the task prompt and appended response for Experiment 08 (read; not modified).
* Decision statement for HD-2 — communicated by the human project owner in the task that produced this record (the human stored this task's prompt at `experiments/experiment-09-prompt.md` during the task; the agent never wrote to that file).

---

## 10. Verification of this record's creation

1. **Working tree inspected:** `git status --short --untracked-files=all`; `git diff --cached`, `git ls-files -m` empty → no tracked file modified (except as authorized below); stash empty.
2. **Exactly two new files created by the agent:** `docs/decisions/0003-experiment-prompt-artifacts.md` and `docs/decisions/0004-git-commit-authority.md`.
3. **Exactly one existing file modified, as authorized:** `docs/decisions/INDEX.md` (two changes only: decision count `two`→`four`, and the added HD-1/HD-2 rows).
4. **Checksums re-verified against the pre-task baseline:** `AGENTS.md` `7355a77e…`, D1 record `5f9deeb4…`, GP1 record `04af7636…`, `.gitignore` `8f7a9110…`, `INITIAL_PROMPT.md` `e8ebf1f4…`, and all experiment reports/prompt files unchanged, **with one documented exception:** `experiments/experiment-09-prompt.md` was observed **empty** (`d41d8cd9…`) at task start and was filled to 4,736 B (`d551d9d2…`) by the **human during the task** (it contains this task's verbatim prompt and an unfilled `Response:` marker) — human work; the agent never wrote to it.
5. **No application code** created or modified; **no stack selected**; **no harness rules modified**; **no experiment file modified**.
6. **No files staged; no Git commit or push performed** (HEAD unchanged at `5fd9f54`; commit count still 2; `origin/main` still `5fd9f54…`) — this itself complies with, and does not act under, HD-2: no commit was attempted, announced or otherwise.
7. **No GP1 execution performed:** nothing is staged, committed, or pushed; recording HD-2 and acting under HD-2 remain separate, as §3.1 states.
