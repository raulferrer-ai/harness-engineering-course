# D1 — Decision-recording mechanism

*ADR-per-decision plus index — first recorded decision of this repository.*

**Label legend:** **Fact** = observed in the repository, in `AGENTS.md`, or in the decision statement communicated by the human. **Observation** = a fact plus its immediate significance. **Interpretation** = an inference beyond the observed data. **Recommendation** = an option for evaluation; decides nothing.

---

## 1. Record fields

| Field | Value | Basis |
|---|---|---|
| **Decision ID** | `D1` | **Fact** — the identifier used in the decision statement communicated by the human project owner. See ambiguity A2: the relationship between `D1` and the file number `0001` is not established. |
| **Title** | Decision-recording mechanism: ADR-per-decision plus index | **Fact** — derived from the decision statement. |
| **Status** | `Accepted` | **Fact** — status as communicated by the human project owner, recorded verbatim. Not normalized to any other vocabulary (see ambiguity A3). |
| **Decided by** | Human project owner | **Fact** — as communicated. |
| **Decision date** | `2026-10-06` (date-level precision only) | **Fact** — verified from the environment at recording time: system clock returned `Tue Oct 6 14:44:52 CEST 2026` (`2026-10-06`), corroborated by repository file mtimes dated `2026-10-06`. **No time-of-decision is recorded anywhere in the repository** — see ambiguity A1. |
| **Scope** | Repository decision governance | **Fact** — as communicated. |
| **Explicit non-scope** | This decision does **not** select the website technology stack, content, deployment, hosting, infrastructure, or any other product matter. | **Fact** — the decision statement explicitly excludes the technology stack; the remainder follows from `AGENTS.md` § 1 and § 7 as applied by the task constraints. |
| **Record file** | `docs/decisions/0001-decision-recording-mechanism.md` | **Fact** — path specified by the human's task instruction, not chosen by the agent. |

---

## 2. Context

**Fact:**

* Experiments 01–03 established that the harness can identify and analyze unresolved decisions but had no defined mechanism for formally closing a human decision and making it consumable by future sessions (`experiments/03-decision-closure-analysis.md`, §2).
* `docs/decisions/` existed as an empty directory (created 2026-10-06 07:56:02) with no defined format, status vocabulary, or discovery path.
* Experiment 03 §5–§6 presented eight candidate mechanisms (M1–M8) with trade-offs, and §9 proposed a minimum viable specification (MV1–MV6) **without selecting any mechanism**, because selection was reserved for the human.
* The human project owner has now decided the mechanism, communicating the decision statement reproduced in §3.

**Observation:** this record is the first use of the mechanism it records — the decision about decision recording is itself the first recorded decision.

**Interpretation:** nothing in this file expands the decision; every element beyond the decision statement is either a labelled fact, a labelled analysis-derived consequence (§5), or a flagged ambiguity (§6).

---

## 3. Decision (as made by the human project owner — not altered)

**Fact — the decision statement as communicated:**

* **Decision:** Use an ADR-per-decision plus index mechanism.
* **Status:** Accepted.
* **Decided by:** Human project owner.
* **Scope:** Repository decision governance.
* **This decision does NOT select the website technology stack.**
* **This decision establishes how future human decisions will be recorded and discovered.**

### 3.1 Authority boundary (required explicit statements)

**Fact — this ADR states explicitly that:**

1. **The mechanism was selected by the human project owner.** The agent did not select, recommend-as-outcome, or alter it; the agent's role here is scribe only.
2. **The decision is ADR-per-decision plus index** — one record file per decision, plus a discovery index (`docs/decisions/INDEX.md`).
3. **This decision does not determine the website technology stack.** No stack, framework, tool, hosting, deployment, or infrastructure choice is made, implied, or constrained by this record.
4. **Future decisions remain human-owned unless explicitly delegated.** Nothing in this record transfers decision authority to the agent. If a future delegation occurs, it must itself be recorded as an explicit decision naming the scope of the delegation.

**Observation:** writing this record confers no authority on the writer — recording a decision and owning it are separate acts.

---

## 4. Alternatives considered

**Fact — the alternatives presented for evaluation in the decision analysis:**

| ID | Mechanism (as analyzed in Experiment 03 §5) |
|---|---|
| M1 | Single append-only decision log |
| M2 | One file per decision, fixed template (ADR-style) |
| **M3** | **ADR-per-file plus a machine-readable/curated index** — the shape matching the selected decision |
| M4 | Single machine-readable registry (YAML/JSON) |
| M5 | Decisions colocated with the experiment that surfaced them |
| M6 | Decisions recorded in `AGENTS.md` itself |
| M7 | Git-native closure (commit/tag/merge as the decision) |
| M8 | External system (issue tracker / wiki) |

**Fact:** Experiment 03 §6 analyzed the trade-offs of each (e.g. M3's strength = fast, unambiguous discovery; its weakness = index/file divergence risk).

**Fact — what is NOT known:** the decision statement communicated by the human records the **selection only**. It does not state which alternatives were weighed by the decider, in what order, or why the selected option prevailed. **This ADR does not reconstruct or infer a rationale**; a rationale field remains empty until the decider supplies one.

**Interpretation:** the selection matches candidate **M3** as labeled in the Experiment 03 analysis. This is a cross-reference for traceability, not a modification, expansion, or reinterpretation of the decision.

---

## 5. Consequences

### 5.1 Stated by the decider (Fact)

* The mechanism **establishes how future human decisions will be recorded and discovered**.
* It **does not select the website technology stack**.

### 5.2 Analysis-derived (Interpretation — from `experiments/03-decision-closure-analysis.md` §6/§9; not part of the decision statement)

**Positive:**

* One file per decision gives clear per-record lifecycle and reviewable diffs (P11, E3).
* An index gives future sessions fast discovery (P2), avoiding the enumeration cost of scanning a directory unaided.

**Negative / obligations created:**

* **Index drift:** the index can diverge from the record files (Experiment 03 §6, M3). *No maintenance or check rule exists yet* — this ADR does not create one (that would be an additional decision).
* **Dependent decisions remain open:** full effectiveness of this mechanism still requires a field/status specification (Experiment 03 D2), a discovery pointer in `AGENTS.md` (D4), and write/transition governance (D5). **None of those is decided by this record.**
* **Discovery is not yet wired into the harness:** `AGENTS.md` contains no pointer to `docs/decisions/`. Until such a pointer exists, a future session will find this record only if instructed to look here.

---

## 6. Ambiguities and open points (reported, not silently resolved)

**Fact — the following were encountered while writing this record and were deliberately NOT resolved by the agent:**

| # | Ambiguity | Handling |
|---|---|---|
| **A1** | **Decision date precision.** The repository contains no evidence of when the decision was made internally; only the current environment date is verifiable. | Recorded as `2026-10-06` with its verification basis stated (environment clock + repository mtimes). **If a different decision date applies, it requires human confirmation.** No time-of-decision invented. |
| **A2** | **Identifier scheme.** The decision is called `D1`; the file number `0001` came from the task instruction. Whether `D1` and `0001` are the same identifier space, and how future records are numbered/ID'd, is not established. | Both values recorded as given. **No ID scheme created** — identifier policy remains part of open items (Experiment 03 D2/D7). |
| **A3** | **Status vocabulary.** The communicated status is `Accepted`; the unapproved candidate vocabulary in Experiment 03 §4.3 used `decided`/`open`/`superseded`. | Recorded verbatim as `Accepted`. **No normalization applied** — vocabulary approval remains open (D2). |
| **A4** | **Rationale absent.** The decider supplied no rationale. | Left empty rather than inferred from Experiment 03's analysis. |
| **A5** | **No `AGENTS.md` discovery pointer** exists for `docs/decisions/`. | **Reported, not created:** adding it would modify the harness rules (explicitly out of scope) and corresponds to open decision D4. |
| **A6** | **No template or field specification exists** for future records. | **Reported, not created:** creating one would constitute an unrequested artifact and would pre-empt open decision D2. |
| **A7** | **Index maintenance responsibility** (who updates `INDEX.md`, and whether it may drift) is undefined. | **Reported, not created** — left to a future decision. |

**Observation:** A5–A7 are artifacts this agent judged *necessary for full effectiveness* but was correctly prevented from creating by the task constraints; they are reported here instead of created, as the instruction required.

---

## 7. Supersession information

| Field | Value | Basis |
|---|---|---|
| **Supersedes** | None | **Fact** — `docs/decisions/` was empty before this record; no earlier decision record exists. |
| **Superseded by** | None, as of `2026-10-06` | **Fact** — no later record exists at creation time. |
| **Status history** | Initial record: `Accepted`, as communicated by the human project owner | **Fact** |
| **Revisit conditions** | Not specified by the decider | **Fact** — none were communicated. A supersession/retention policy does not exist yet (Experiment 03 D7 remains open). **This record does not invent a revisit trigger.** |
| **Deletion policy** | Not decided | **Fact** — no policy exists; this file must not be treated as setting one. |

**Interpretation:** if this decision is ever superseded, the successor record should link back here — but the rule for doing so is itself undecided (D7) and is not established by this file.

---

## 8. Facts vs. interpretations in this record (summary)

| Element | Classification |
|---|---|
| Decision statement, status, decider, scope, non-scope (§3) | **Fact** — as communicated |
| Date `2026-10-06` and its basis (§1) | **Fact** — environment-verified, date-level precision |
| Alternatives M1–M8 (§4) | **Fact** — as presented in Experiment 03 |
| "Matches candidate M3" (§4) | **Interpretation** — cross-reference only |
| Consequences in §5.2 | **Interpretation** — analysis-derived, explicitly not part of the decision |
| Ambiguities A1–A7 (§6) | **Fact** that they are unresolved; no resolutions offered |

---

## 9. Source references

* `AGENTS.md` — § *Do not invent requirements*, § *The human remains responsible for product decisions*, § *Documentation is part of the system* (read; not modified).
* `experiments/01-repository-exploration-and-decision-gate.md` — origin of the decision backlog.
* `experiments/02-decision-analysis.md` — decision inventory (H1–H14), all still open.
* `experiments/03-decision-closure-analysis.md` — problem statement, candidates M1–M8, minimum specification MV1–MV6, open decisions D2–D7.
* Decision statement for D1 — communicated by the human project owner in the task that produced this record (also stored by the human at `experiments/experiment-4-prompt.md`).

---

## 10. Verification of this record's creation

1. **Working tree inspected:** `git status --short --untracked-files=all`; tracked files clean.
2. **Diff inspected:** `git diff`, `git diff --cached`, `git ls-files -m` all empty → no tracked file modified.
3. **Checksums re-verified against the pre-write baseline:** `AGENTS.md` `7355a77e…`, `README.md` / `docs/vision.md` / `docs/architecture.md` `d41d8cd9…`, `INITIAL_PROMPT.md` `e8ebf1f4…`, `.gitignore` `8f7a9110…`, and all experiment files unchanged.
4. **Exactly two files created by the agent:** `docs/decisions/0001-decision-recording-mechanism.md` and `docs/decisions/INDEX.md`.
5. **No application code** created or modified; **no stack selected**; **no harness rules modified**.
6. **No Git commit or push performed** (HEAD unchanged at `5fd9f54`).
