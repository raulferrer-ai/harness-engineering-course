# Decision Index

**Location:** `docs/decisions/INDEX.md` (repository-relative path)

**Purpose:** discovery index of human decisions that have been formally made and recorded in this repository.

---

## Mechanism

**Fact:** the decision-recording mechanism is **ADR-per-decision plus index** — one record file per decision in `docs/decisions/`, plus this index for discovery.

* Established by decision **D1** — *Status: `Accepted`*, *Decided by: Human project owner*, recorded at [`docs/decisions/0001-decision-recording-mechanism.md`](docs/decisions/0001-decision-recording-mechanism.md).
* This mechanism decision does **not** select the website technology stack.

---

## Recorded decisions

**Fact:** exactly **six** decisions have been recorded in this repository.

| Decision ID | Title | Status | Decided by | Decision date | Scope | Record |
|---|---|---|---|---|---|---|
| `D1` | Decision-recording mechanism: ADR-per-decision plus index | `Accepted` | Human project owner | `2026-10-06` | Repository decision governance | [`docs/decisions/0001-decision-recording-mechanism.md`](docs/decisions/0001-decision-recording_mechanism.md) |
| `GP1` | Harness artifact persistence | `Accepted` | Human project owner | `2026-10-06` | Persistence/versioning of project harness artifacts | [`docs/decisions/0002-harness-artifact-persistence.md`](docs/decisions/0002-harness-artifact-persistence.md) |
| `HD-1` | Experiment prompt artifacts | `Accepted` | Human project owner | `2026-10-08` | Classification of the `experiment-XX-prompt.md` artifact class under GP1 | [`docs/decisions/0003-experiment-prompt-artifacts.md`](docs/decisions/0003-experiment-prompt-artifacts.md) |
| `HD-2` | Git commit authority | `Accepted` | Human project owner | `2026-10-08` | Who may create Git commits; agent pre-commit announcement requirement | [`docs/decisions/0004-git-commit-authority.md`](docs/decisions/0004-git-commit-authority.md) |
| `RD-DISC` | Decision and harness-history discovery | `Accepted` | Human project owner | `2026-10-08` | Discovery pointers in `AGENTS.md` to `docs/decisions/INDEX.md` and `experiments/` (implementation separate) | [`docs/decisions/0005-decision-discovery.md`](docs/decisions/0005-decision-discovery.md) |
| `RD-AUTH` | Authority and precedence between current decisions and historical evidence | `Accepted` | Human project owner | `2026-10-08` | Authority relationship among ADRs, `AGENTS.md`, the index, and experiment reports (later ADR over conflicting historical report) | [`docs/decisions/0006-decision-authority-and-precedence.md`](docs/decisions/0006-decision-authority-and-precedence.md) |

*Statuses and dates are reproduced exactly as communicated by the decider; no status vocabulary has been standardized yet, and no identifier scheme beyond the values shown has been established (see ambiguities A2 and A3 in the D1 record).*

---

## What this index does NOT mean

**Fact — reading rules for future sessions:**

1. **Only decisions the human project owner has actually made appear here.** No entry has been created, guessed, inferred, or pre-populated by the agent.
2. **Absence of an entry means: no decision has been recorded — it does NOT mean the question is resolved.** An unrecorded question is *open*, and an open question must not be treated as decided.
3. **Open decisions are deliberately not listed as entries.** The unresolved questions identified in `experiments/01-repository-exploration-and-decision-gate.md`, `experiments/02-decision-analysis.md`, and `experiments/03-decision-closure-analysis.md` remain open; this index records none of them, and none of them may be implemented as if resolved. Experiment reports may contain open questions as historical context, but they are not automatically the current authoritative list of open questions, and unresolved current governance questions must not be inferred from historical experiment reports alone (RD-AUTH, [`docs/decisions/0006-decision-authority-and-precedence.md`](docs/decisions/0006-decision-authority-and-precedence.md)).
4. **A record's presence does not extend its scope.** Each decision applies only within the scope stated in its record; see the `Scope` and non-scope statements in the D1 record.

---

## Discovery notes for future sessions

**Fact:**

* `AGENTS.md` now contains explicit pointers to this index and to `experiments/` (RD-DISC, implemented per [`docs/decisions/0005-decision-discovery.md`](docs/decisions/0005-decision-discovery.md)). The pointer was previously tracked as open decision Experiment 03, D4 and was left undone by the task that produced this file, because modifying `AGENTS.md` was out of scope for that task.
* No record template or field specification exists yet (open decision, Experiment 03 D2).
* No rule exists for who may update this index or how index/record divergence is prevented (open decision, Experiment 03 D7 / D5 territory). Until such a rule exists, treat the record files as authoritative and this index as a convenience listing.

**Interpretation:** with the `AGENTS.md` pointers added under RD-DISC, this index is now discoverable through the harness rules rather than only by instruction or exploration — the limitation previously reported here has been addressed.
