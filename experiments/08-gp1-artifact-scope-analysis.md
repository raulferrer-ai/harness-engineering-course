# Experiment 08 — GP1 Artifact Scope Analysis

* Date: 2026-10-06
* Status: completed (analysis only — **no classification is a decision; nothing executed; nothing committed**)
* File created: `experiments/08-gp1-artifact-scope-analysis.md` (this document)

**Label legend — used to prevent analysis from becoming requirement:**

* **Fact** — directly established by the repository, Git state, or a recorded project document.
* **Observation** — a fact plus its immediate significance.
* **Interpretation** — an inference beyond the observed data.
* **Recommendation** — a proposed course of action that **still requires human approval**.
* **Open question** — a question existing evidence does not answer.
* **Human decision** — a question reserved to the human project owner; this document makes none of them.

**Standing disclaimer:** GP1 is decided. This experiment classifies current artifacts *relative to* GP1; it does not reinterpret, narrow, or expand GP1, and every classification below is analysis awaiting human confirmation.

---

## 1. Objective

**Fact — what this experiment was intended to do:**

1. Inventory every artifact currently present in the repository, with Git state and apparent role.
2. Classify each artifact against GP1 using the explicit A/B/C/D vocabulary (§5).
3. Separate artifact identity ("does it belong to the project?") from Git execution ("should/how should it be committed?").
4. Analyze experiment artifacts, decision artifacts, the existing Git boundary, and `.gitignore` as evidence for scope.
5. Produce a human decision matrix and the **minimum human decision set** needed before GP1 can be executed.
6. Describe the harness gap: whether future agents have a mechanism to determine which artifacts are subject to GP1.
7. Create exactly one output file and modify nothing else.

**Interpretation:** the value of this experiment is measured by how small and precise the remaining human decisions become — a classification that quietly decides anything would defeat the purpose.

---

## 2. Problem statement

**Fact:** GP1 (recorded at `docs/decisions/0002-harness-artifact-persistence.md`) states:

> "las decisiones, experimentos y demás artefactos del harness que deban formar parte del proyecto deben quedar versionados en Git."

**Fact:** Experiment 07 recorded GP1 deliberately **without executing it**. The repository therefore still shows a durability gap: decision records, experiment reports, and experiment prompt files are all untracked; the tracked history predates the experiments entirely; and no Git commit may be created by this experiment.

**Fact — the problem GP1 leaves open:** GP1 deliberately does **not** enumerate its covered artifacts ("demás artefactos del harness que deban formar parte del proyecto" — recorded as ambiguity AMB-G4 in the GP1 ADR: *"Left undefined by design; any enumeration requires a future human decision"*). Before GP1 can be executed, someone must determine what currently exists and which of it GP1 covers. That determination is the subject of this experiment.

**Open question (the one this analysis addresses, without answering for the human):** *which current repository artifacts "form part of the project" within GP1's wording, and therefore require version control?*

---

## 3. Evidence and repository state

### 3.1 Git state at task start (Fact, verified)

| Item | Value |
|---|---|
| HEAD | `5fd9f5437bd27276dbaec511f86e31daa3dc36b0` |
| Commit count | 2 (`5ed7b84` "Init course"; `5fd9f54` "chore: init harness engineerign course") |
| Tracked files | 6 (`.gitignore`, `AGENTS.md`, `INITIAL_PROMPT.md`, `README.md`, `docs/architecture.md`, `docs/vision.md`) |
| Untracked paths | 16 (3 decision files, 5 experiment reports, 8 experiment prompt files) |
| Staged files | none |
| Ignored files | none present (`.gitignore` rules match nothing currently in the tree) |
| Stash | empty |
| `src/` | exists (created 07:56) but **empty** — Git tracks no empty directories, so there is no artifact in it |

### 3.2 Files read for this analysis (Fact)

`AGENTS.md` (7,099 B, `7355a77e…`), `INITIAL_PROMPT.md` (995 B, `e8ebf1f4…`, read in full), `.gitignore` (48 B, `8f7a9110…`), `README.md`/`docs/vision.md`/`docs/architecture.md` (all **0 bytes** — empty tracked placeholders), `docs/decisions/0001-…` (`5f9deeb4…`), `docs/decisions/0002-…` (`04af7636…`), `docs/decisions/INDEX.md` (`06d3a538…`, 50 lines), `experiments/01-…`, `02-…`, `03-…`, `05-…`, `06-…` reports (checksums unchanged since Exp07), all 8 prompt files (headers, sizes, tail signatures, `Response:` regions), repository tree with sizes/mtimes, `git ls-tree` of both commits. `experiments/04-*.md` does not exist (Fact, re-verified). No file was modified while performing this inventory.

### 3.3 Concurrent human activity observed during the task (Fact)

* `experiments/experiment-07-prompt.md` changed between Exp07 and this task's start (`037754a5…` → `6371f517…`): the human appended the Exp07 closing response — human work, not agent drift.
* `experiments/experiment-08-prompt.md` was **created empty at 15:59:12 and filled to 9,404 B by the human mid-task** (`d41d8cd9…` → `6456963b…`); it contains this task's prompt verbatim and ends with an unfilled response marker (`Resposne:` — sic, quoted as observed). The agent never wrote to this file.

**Observation:** the human's concurrent prompt-file writes are now a recurring, expected pattern (7th occurrence across experiments); verification must distinguish human-concurrent edits from agent modifications.

### 3.4 Evidence carried forward from previous records (Fact)

* **GP1 ADR** (`0002-…`): the decision wording above; explicit non-scope (no complete Git workflow; no commit frequency/branch/message/staging/CI/release policy; "other harness artifacts" deliberately not enumerated — AMB-G4); authority boundary (human-owned; recording ≠ executing); alternatives P6–P10/C1–C4 presented in Exp06 §7 and **not adopted** by any label.
* **D1 ADR** (`0001-…`): mechanism = **ADR-per-decision plus index** — "one record file per decision, plus a discovery index (`docs/decisions/INDEX.md`)"; INDEX is part of the mechanism by explicit human decision.
* **INDEX.md**: two recorded decisions (D1, GP1); reading rules state unrecorded questions are open and that open questions "may not be implemented as if resolved"; line 36 states the open-question lists live in `experiments/01…03` reports — i.e., the index treats reports as load-bearing project knowledge.
* **AGENTS.md** (unchanged, unmodified): § *Purpose* — the repository is "a living example of the engineering practices taught by the project"; § *Documentation is part of the system* — "Important decisions, discoveries and lessons should be captured in the repository rather than remaining only in conversation"; § *Repository Safety* — commit hygiene is a human-governed act; § *Current Project Status* — harness changes are proposed, not applied, by the agent.
* **Prior experiments**: Exp05 FM2/Q2 (fresh clone would lack records and reports — durability gap); Exp06 §2.2/§10 O3 (gap is repo-wide, includes reports; all evidence untracked); Exp06 §7 C1–C4 (commit-scope options, all then-unapproved); Exp02 H10 (commit/branch/message workflow — **still open**); Exp05 evidence item 11 (authority of experiment reports relative to decisions is not formally established).

---

## 4. Artifact inventory

**Fact — complete inventory of the repository as inspected (23 files + 1 empty directory + absent categories).** Git state: T = tracked, U = untracked, I = ignored (none). "GP1 applies?" states whether GP1's wording *clearly* covers the artifact — classifications are consolidated in §6–§9.

| # | Path | Git | Apparent role | Generated / authored | Project knowledge | Harness | GP1 clearly applies | Confidence | Unresolved question |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `.gitignore` | T | Version-control config (OS/secrets/Node/build ignores) | Authored | No (rules only) | Repo infra | Yes — already versioned | High | None for identity; any *change* is separate (§13) |
| 2 | `AGENTS.md` | T | Harness rules (292 lines) | Authored | Yes | Yes — core | Yes — already versioned | High | None |
| 3 | `INITIAL_PROMPT.md` | T | Seed task prompt that started Exp01 (read in full) | Human-authored | Yes (original instruction) | Borderline (prompt) | Yes — already versioned | High | Note: a *prompt file* that the human chose to track at inception (§12) |
| 4 | `README.md` | T | Project readme — **0 bytes**, empty placeholder | Human-authored (empty) | No (empty) | No | Yes — already versioned | High | None (content future) |
| 5 | `docs/vision.md` | T | Vision doc — **0 bytes** | Human-authored (empty) | No (empty) | No | Yes — already versioned | High | None (content future) |
| 6 | `docs/architecture.md` | T | Architecture doc — **0 bytes** | Human-authored (empty) | No (empty) | No | Yes — already versioned | High | None (content future) |
| 7 | `docs/decisions/0001-decision-recording-mechanism.md` | U | D1 ADR — recorded human decision | Agent-recorded at human instruction | Yes | Yes — decision record | **Yes — GP1 names "decisiones"** | High | None |
| 8 | `docs/decisions/0002-harness-artifact-persistence.md` | U | GP1 ADR — recorded human decision | Agent-recorded at human instruction | Yes | Yes — decision record | **Yes — GP1 names "decisiones"** | High | None |
| 9 | `docs/decisions/INDEX.md` | U | Decision discovery index (D1 mechanism component) | Agent-maintained at human instruction | Yes | Yes — index | Yes — via D1's mechanism wording | High (see §11) | Human may override; trivial to reclassify |
| 10 | `experiments/01-repository-exploration-and-decision-gate.md` | U | Exp01 report — findings, decision backlog | Agent-authored (human-approved flow) | Yes | Yes — experiment record | **Yes — GP1 names "experimentos"** | High | None |
| 11 | `experiments/02-decision-analysis.md` | U | Exp02 report — H1–H14 inventory | Agent-authored | Yes | Yes | **Yes** | High | None |
| 12 | `experiments/03-decision-closure-analysis.md` | U | Exp03 report — mechanisms M1–M8, spec MV1–MV6, D2–D7 | Agent-authored | Yes | Yes | **Yes** | High | None |
| 13 | `experiments/05-decision-consumption.md` | U | Exp05 report — FM1–FM12, MM1–MM8 | Agent-authored | Yes | Yes | **Yes** | High | None |
| 14 | `experiments/06-decision-specification.md` | U | Exp06 report — D2/D4/D5/D7/Git briefs | Agent-authored | Yes | Yes | **Yes** | High | None |
| 15 | `experiments/experiment-01-prompt.md` | U | Post-hoc instruction to create Exp01 report + appended agent response | Human (prompt) + agent (appended) | Partial (unique disclosure in response) | Borderline | **Open — prompt class** | — | **HD-1** (§14) |
| 16 | `experiments/experiment-02-prompt.md` | U | Exp02 task prompt + appended response | Human + agent | Partial (duplicates report) | Borderline | **Open — prompt class** | — | **HD-1** |
| 17 | `experiments/experiment-03-prompt.md` | U | Exp03 task prompt + appended response | Human + agent | Partial (duplicates report) | Borderline | **Open — prompt class** | — | **HD-1** |
| 18 | `experiments/experiment-04-prompt.md` | U | D1 decision communication + task + appended response — **sole narrative record of Exp04** (no `04-*.md` report exists) | Human + agent | Yes — **unique, unreplicated** | Borderline | **Open — prompt class** | — | **HD-1** (strongest in-scope candidate) |
| 19 | `experiments/experiment-05-prompt.md` | U | Exp05 task prompt + appended response | Human + agent | Partial (duplicates report) | Borderline | **Open — prompt class** | — | **HD-1** |
| 20 | `experiments/experiment-06-prompt.md` | U | Exp06 task prompt + appended response | Human + agent | Partial (duplicates report) | Borderline | **Open — prompt class** | — | **HD-1** |
| 21 | `experiments/experiment-07-prompt.md` | U | GP1 decision communication + task + appended response (original Spanish wording's communication trail) | Human + agent | Partial — GP1 wording itself is replicated in ADR 0002 | Borderline | **Open — prompt class** | — | **HD-1** |
| 22 | `experiments/experiment-08-prompt.md` | U | This task's prompt (9,404 B, human-written mid-task; response marker unfilled) | Human | Partial (prompt only so far) | Borderline | **Open — prompt class** | — | **HD-1** |
| 23 | `experiments/08-gp1-artifact-scope-analysis.md` | U (created by this task) | This report — GP1 scope analysis | Agent-authored (human-directed) | Yes | Yes — experiment record | **Yes — GP1 names "experimentos"** | High | None |
| — | `src/` | — | Empty directory (07:56) — no artifact exists inside | — | No | No | No current artifact | — | Future content is outside GP1's wording (§9) |
| — | `.DS_Store`, `.env`, `.env.*`, `node_modules/`, `dist/`, `build/` | I by rule | Ignored categories — **none present** in the tree | — | — | — | Not applicable | — | None |

**Observation:** the inventory contains no transient/generated artifacts and no personal working material at all — every current file is either tracked project scaffold or untracked harness work.

---

## 5. Classification model

**Fact — the vocabulary this report uses (per the task's specification):**

| Class | Meaning |
|---|---|
| **A — Clearly in scope** | Evidence indicates the artifact is part of the project and GP1 clearly applies |
| **B — Clearly out of scope** | Evidence indicates the artifact is transient, generated, personal working material, or otherwise not part of the project |
| **C — Human decision required** | The artifact may reasonably be considered project/harness material, but existing evidence does not authorize the agent to decide |
| **D — Existing Git policy / separate governance issue** | The artifact's inclusion cannot be determined from GP1 alone because another policy or governance decision is required |

**Fact — two separation rules applied throughout (task §3):**

1. **Artifact identity ≠ Git execution.** Questions 1 ("does it belong?") and 2 ("does GP1 require version control?") are the subject here. Questions 3 ("should it be committed now?") and 4 ("how?") are **not decided** — no existing human decision establishes them (Exp02 H10 open; GP1 non-scope; Exp07/Exp08 constraints).
2. **Classifications are analysis, not decisions.** Per INDEX reading rule 2 and AGENTS.md §1, nothing in A–D is binding until the human confirms it. A classification is an *interpretation of evidence relative to an already-made decision*, never a new decision.

**Fact — classification counts:** A = 15 files; B = 0; C = 8; D = 0 current-file identities (D applies to execution and future matters — §9).

---

## 6. Clearly in-scope artifacts (Class A)

**Fact — 15 files, with the evidence anchor for each group:**

**Group A1 — already-tracked project scaffold (6 files): `.gitignore`, `AGENTS.md`, `INITIAL_PROMPT.md`, `README.md`, `docs/vision.md`, `docs/architecture.md`.**

* Evidence: all six were committed by the human as project material (commits `5ed7b84`, `5fd9f54`). GP1's version-control obligation is **already satisfied** for them; no execution step concerns them.
* Interpretation: their identity as project files is not in question; classifying them A records that GP1's requirement is met, not that any action is pending.

**Group A2 — decision records (2 files): `docs/decisions/0001-…`, `docs/decisions/0002-…`.**

* Evidence: GP1's wording names **"las decisiones"** explicitly — the strongest textual anchor in the decision. Both files are decision records created under D1's human-approved mechanism.
* Consequence: these two files are the least ambiguous untracked artifacts in the repository.

**Group A3 — the decision index (1 file): `docs/decisions/INDEX.md`.**

* Evidence: D1 (human decision) defines the mechanism as "ADR-per-decision **plus index**" — the index is a required component of the recording mechanism by explicit prior decision, not an agent convenience. GP1 covers "demás artefactos del harness que deban formar parte del proyecto"; INDEX was established as harness material by D1.
* Interpretation: this is an inference from D1's mechanism wording — evidence-authorized, but the human may override; see §11 and Q3 of §18.

**Group A4 — experiment reports (6 files): `experiments/01-…`, `02-…`, `03-…`, `05-…`, `06-…`, `08-…` (this report).**

* Evidence (multiple independent anchors, not mere usefulness):
 1. GP1's wording names **"experimentos"** directly.
 2. `AGENTS.md` § *Documentation is part of the system*: "Important decisions, discoveries and lessons should be captured in the repository rather than remaining only in conversation" — the reports are precisely that capture.
 3. `INDEX.md` line 36 treats the experiment reports as the location of the open-decision lists — the index itself depends on reports as project knowledge.
 4. The GP1 ADR cites Experiment 05/06 findings as its context — decision records consume experiment reports as evidence, making reports load-bearing.
 5. `AGENTS.md` § *Purpose*: the repository is "a living example of the engineering practices taught by the project" — the reports are that example's primary content.

**Observation:** Class A contains every untracked artifact whose classification has a direct textual anchor in GP1 or in a recorded human decision. **Human decision:** none pending for A-identity; only execution remains open (HD-2, §14).

---

## 7. Clearly out-of-scope artifacts (Class B)

**Fact — Class B is empty.** The repository currently contains no transient artifacts, no generated files, no build outputs, no personal working material, and no ignored files (verified via `git status --ignored` → none; `.gitignore` rules match nothing present).

**Interpretation:** the emptiness is itself a finding, not an oversight. It holds only while the repository contains Markdown and an empty `src/`; the classification will change materially once application code, dependencies, or build outputs appear (`.gitignore` anticipates `node_modules/`, `dist/`, `build/` — none exist yet).

**Open question (deferred, not asked now):** whether *future* generated artifacts belong in B requires no decision — `.gitignore` already encodes the categories; the human already chose them.

---

## 8. Human-decision-required artifacts (Class C)

**Fact — Class C contains exactly the 8 experiment prompt files** (`experiments/experiment-01-prompt.md` … `experiment-08-prompt.md`).

**Fact — why the agent is not authorized to classify them:** this task's authority boundary states explicitly that the agent may **not** "decide whether experiment prompts must be versioned". The question is therefore reserved to the human regardless of the evidence's strength — it is a GP1-scope question, and GP1-scope questions are human-owned (GP1 ADR §3.1; AGENTS.md §7).

**Fact — evidence inventory for the human's decision (both directions, no selection):**

*For prompts being project material:*

1. `AGENTS.md` § *Documentation*: the prompt files are literally "conversation captured in the repository" — the pattern the rule endorses.
2. **Unique content:** `experiment-04-prompt.md` is the **sole narrative record of Experiment 04** — no `experiments/04-*.md` report exists (Fact, re-verified); excluding prompts would leave that content version-controlled nowhere.
3. `experiment-07-prompt.md` is the communication trail of GP1 itself (the task that decided it); `experiment-01-prompt.md` contains a unique post-hoc disclosure not replicated in the Exp01 report.
4. `INITIAL_PROMPT.md` — a prompt file — is tracked (Fact, §12): the human's own precedent versions at least one prompt.

*Against / ambiguity:*

1. GP1 says **"experimentos"** — plausibly meaning experiment *records* (the reports), not the conversational prompts that instructed them.
2. Six of eight prompts (02, 03, 05, 06, and partially 01/08) largely duplicate content already captured in the corresponding reports.
3. Prompts are mixed artifacts: part instruction (human), part record (agent response appended by the human) — their identity is not homogeneous.

**Fact — sub-kinding observed (evidence for HD-1, not a decision):**

| Sub-kind | Files | Distinctive content |
|---|---|---|
| (a) Post-hoc documentation instruction + appended response | `01` | Unique disclosure; Exp01's creation trail |
| (b) Task prompt + appended response | `02`, `03`, `05`, `06` | Mostly duplicative of reports |
| (c) Decision communication + task + appended response | `04`, `07` | Sole trail of Exp04 (04); GP1's communication trail (07) |
| (d) Current task prompt, response pending | `08` | This task's instruction; ends with unfilled marker |

**Human decision:** HD-1 (§14) — do experiment prompt files "form part of the project" within GP1, and therefore require version control? **Open question** remains until the human answers; no default is applied here.

---

## 9. Git-policy-dependent artifacts (Class D)

**Fact — no *current file's identity* falls in Class D.** Every current artifact's identity is either settled by GP1/D1 wording (A) or reserved by explicit task constraint (C). Class D nevertheless applies to three **execution/future** matters, recorded here so they are not mistaken for identity questions:

| D-item | Matter | Why GP1 alone cannot determine it | What is required |
|---|---|---|---|
| D-1 | **Execution of the A-class untracked set** (9 files: 3 decision files + 6 reports) | GP1 says artifacts "must be version-controlled" but is explicitly non-scope on commit frequency, who commits, message conventions, staging (GP1 ADR §1 non-scope; §3.1). Exp02 H10 (commit workflow) remains open. | A human execution-policy decision (**HD-2**) |
| D-2 | **Future application code in `src/`** (currently empty) | GP1's wording covers "harness artifacts"; application code is not a harness artifact. Its versioning is governed by ordinary Git practice plus future stack/workflow decisions — none made. | No decision needed **now**; recorded to prevent later confusion |
| D-3 | **Any future `.gitignore` change** (e.g., excluding files HD-1 puts out of scope) | Modifying `.gitignore` is a governance act; nothing authorizes it, and this task forbids it. Ignoring ≠ untracked: a file can be out-of-scope yet still visible in `git status`. | Conditional human decision (**HD-4**), only if HD-1 excludes files |

**Interpretation:** the cleanest reading of the task's §3 separation is that Class A/C answer "does it belong?" while D-1 answers "how does it get versioned?" — GP1 settles the first for its clear cases and deliberately leaves the second to future decisions.

---

## 10. Experiment artifact analysis

**Fact — what the evidence establishes about experiment *reports* (6 files, Class A):** GP1 names "experimentos"; `AGENTS.md` § *Documentation* requires discoveries/lessons be captured in the repository; `INDEX.md` depends on reports for its open-decision pointer; the GP1 ADR cites reports as context; reports are the project's primary educational artifact per § *Purpose*. Reports are established as project artifacts by **recorded textual anchors**, not by the fact that they are useful.

**Fact — what the evidence establishes about experiment *prompt files* (8 files, Class C):** nothing in any recorded decision classifies prompts. The strongest available evidence (§8) points both ways, and the task explicitly reserves prompt versioning to the human. **The evidence does not establish that prompts are project artifacts — nor that they are not.**

**Fact — asymmetry between the two categories:** reports have four independent textual anchors plus direct GP1 wording; prompts have contextual analogy (§ *Documentation*) and two unique-content cases, against a plausible narrower reading of "experimentos". One category is clearly project material (A); the other is genuinely ambiguous (C).

**Interpretation:** the asymmetry is why this experiment asks HD-1 as a *classification decision* rather than deriving it — deriving it would require choosing between two defensible readings of GP1, which is exactly what AMB-G4 reserves for the human.

---

## 11. Decision artifact analysis

**Fact — what existing evidence establishes, by artifact type:**

| Artifact type | Current instances | Evidence | Classification |
|---|---|---|---|
| **Decision records (ADRs)** | `0001-…`, `0002-…` | GP1 names "decisiones"; D1's mechanism is record-per-decision | **A** — strongest anchor in GP1 |
| **Decision index** | `INDEX.md` | D1 (human decision): mechanism = record + index; index is the discovery component | **A** (inference from D1 wording; human may override) |
| **Decision analysis** | `experiments/02-…`, `03-…` (and §4–§7 of `06-…`) | These are simultaneously *experiment reports* (A per §10) — no separate analysis files exist outside `experiments/` | **A** as reports; dual role noted, classification unchanged |
| **Decision specifications** | `experiments/06-…` (D2/D4/D5/D7 briefs) | Same dual role — a report containing unapproved decision briefs | **A** as report; the briefs inside remain unapproved (Exp06 §11) |
| **Temporary working notes** | none exist (Fact) | No scratch files, no drafts directory, no editor artifacts in the tree | Not applicable today |
| **Future decision records** | none yet | GP1's wording will cover them by definition when created ("decisiones") | Will be **A** when they exist |

**Observation:** the decision-artifact class is the *least ambiguous* part of the repository: GP1's first named category maps directly onto files created by D1's human-approved mechanism, and the index rides along on D1's explicit wording. The ambiguity in this repository lives entirely in the prompt files (C) and the execution policy (D-1).

---

## 12. Existing Git boundary analysis

**Fact — what the original history contains:**

| Commit | Files | Date basis |
|---|---|---|
| `5ed7b84` "Init course" | `AGENTS.md`, `INITIAL_PROMPT.md`, `README.md`, `docs/architecture.md`, `docs/vision.md` | First commit |
| `5fd9f54` "chore: init harness engineerign course" | + `.gitignore` (6 lines) | Second commit; HEAD since 08:31 |

**Fact — what this reveals about the original artifact boundary:** the human's initial versioning covered the **project scaffold**: harness rules, the seed instruction, and empty content placeholders — plus, in the second commit, version-control configuration. Everything produced by the experiments (reports, prompts, decision records) postdates the tracked history entirely and is untracked.

**Fact — the one nuance:** `INITIAL_PROMPT.md` — a prompt file — **was included** in the original commit. The human's own historical practice therefore versions at least one prompt as project material.

**Interpretation — and the task's constraint applied:** the original commit is **historical state, not a scope ruling** (task §6: "Do NOT treat the original commit as automatically defining the current scope"). It neither settles HD-1 (one tracked prompt is precedent, not a policy — and only one of eight prompt files resembles it) nor contradicts GP1 (which postdates the commits entirely). Its proper evidentiary weight: *weak supporting context for the human's HD-1 decision*, nothing more.

**Observation:** the tracked history is a poor scope oracle for GP1-era questions because it predates the entire harness — but it is not empty of information: it shows what the human chose to version *before* any decision mechanism existed.

---

## 13. `.gitignore` analysis

**Fact — current content (48 B, 6 rules):** `.DS_Store`, `.env`, `.env.*`, `node_modules/`, `dist/`, `build/`.

**Fact — categories ignored:** OS metadata; environment/secret files; Node.js dependencies; build output directories.

**Fact — accidental coverage of current harness/project artifacts:** **none.** Verified: `git status --ignored` lists no ignored files; no current artifact name matches any rule; every inventory file (§4) is either tracked or untracked-but-visible.

**Fact — evidence relevant to scope:** the ignore list implies an expected Node web stack (`node_modules/`, `dist/`, `build/`) — observed already in Exp01 (L7). It is a **hint about a future stack, not a stack decision**; this experiment selects no stack, and the ignore rules constrain nothing today.

**Fact — whether changing `.gitignore` would require a separate decision:** yes. Nothing authorizes modifying it; this task forbids it; and the only foreseeable trigger is HD-1's outcome (if the human excludes prompt files *and* wants them invisible rather than merely untracked — D-3/HD-4). No current need for any change exists: GP1's classification outcomes do not require ignore rules, because "out of scope" and "ignored" are different states.

**Interpretation:** `.gitignore` is currently *non-conflicting evidence* — it neither includes nor excludes any harness artifact, so it neither helps nor hinders GP1's execution. Its future relevance is conditional on HD-1, and any change is a separate human act.

---

## 14. Human decision matrix

**Fact — matrix covers every Class C/D item (HD-1…HD-4). No decision is made here; each row is a question awaiting the human project owner.**

### HD-1 — Experiment prompt files (Class C; 8 files)

| Element | Content |
|---|---|
| **Question** | Do experiment prompt files (`experiments/experiment-01-prompt.md` … `08`) "form part of the project" within GP1's wording, and therefore require version control? |
| **Relevant evidence** | §8: AGENTS.md § *Documentation* (conversation-to-repository pattern); unique content in `04` (sole Exp04 trail) and `01` (unique disclosure) and `07` (GP1's communication trail); `INITIAL_PROMPT.md` tracked precedent (§12); against: "experimentos" plausibly means records/reports; 02/03/05/06 prompts largely duplicate reports; prompts are mixed human/agent artifacts. Task reserves this question explicitly. |
| **Candidate interpretations** | (i) **All 8 prompts in scope** — full conversation capture per § *Documentation*. (ii) **Only unique-content prompts in scope** (`01`, `04`, `07`) — needs a per-file judgment rule to be recorded. (iii) **No prompts in scope** — reports suffice as the experiment record; prompts are conversational material. |
| **Consequence of each** | (i) Durability for everything; largest history; every future prompt presumably included too. (ii) Partial durability; the rule for "unique" must itself be decided and applied consistently; `02/03/05/06/08` stay untracked. (iii) `04`'s only narrative trail and `07`'s communication trail remain version-controlled nowhere — the durability gap persists for that content despite GP1. |
| **Recommended decision** | **Recommendation (unapproved):** interpretation (i) — include all prompt files — on the grounds that AGENTS.md § *Documentation* endorses exactly this capture pattern and that exclusions would require inventing a "unique content" rule the project has no mechanism to apply consistently. (ii) is acceptable if minimizing history is preferred. |
| **Delegate to agent?** | **No — requires the human.** The task explicitly forbids the agent deciding prompt versioning; it is a GP1-scope question, and scope is human-owned (GP1 ADR §3.1). |

### HD-2 — Execution policy for the Class-A untracked set (Class D-1)

| Element | Content |
|---|---|
| **Question** | Who commits the A-class untracked artifacts, when, in what scope, and under what commit-message convention? |
| **Relevant evidence** | GP1 is explicitly non-scope on commit frequency/branch/message/staging/CI/release and on who commits (GP1 ADR §1, §3.1); Exp02 H10 (Git workflow) is still open; Exp06 §7 C1–C4 (commit-scope options, then-unapproved); Exp07 established recording ≠ executing; AGENTS.md § *Repository Safety* governs commit hygiene as a human act. |
| **Candidate interpretations** | (a) **Single batch commit** of all confirmed-A files after HD-1 resolves (Exp06 C1-variant). (b) **Incremental commits** per artifact class (decisions first, then reports, then whatever HD-1 adds). (c) **Human-manual, unscheduled** — human commits when convenient; agent never commits. |
| **Consequence of each** | (a) Durability gap closed in one act; one large, reviewable diff; simplest to verify. (b) History readable by class; more commits to manage; requires message conventions anyway. (c) Gap persists indefinitely; no agent involvement; zero policy ambiguity but zero guarantees. |
| **Recommended decision** | **Recommendation (unapproved):** (a) or (c) — either a single human-executed batch commit after HD-1, or explicit human-manual scheduling. Both keep commit authority with the human, consistent with AGENTS.md § *Repository Safety* and GP1's non-scope. |
| **Delegate to agent?** | **No — requires the human.** Commit policy is explicitly outside GP1 and outside the agent's authority; no recorded decision delegates it. |

### HD-3 — Future application code in `src/` (Class D-2; informational)

| Element | Content |
|---|---|
| **Question** | None required now. Recorded for the record: application code is outside GP1's wording ("harness artifacts"); its versioning will be governed by ordinary Git practice plus future stack/workflow decisions once code exists. |
| **Consequence of recording it here** | Prevents a future agent from misreading GP1 as covering (or excluding) future source code. |
| **Delegate to agent?** | Not applicable — no decision requested. |

### HD-4 — `.gitignore` treatment of any HD-1-excluded files (Class D-3; conditional)

| Element | Content |
|---|---|
| **Question** | *Only if* HD-1 excludes some prompt files: should those files be added to `.gitignore` (invisible in `git status`) or simply left untracked (visible but out of scope)? |
| **Relevant evidence** | §13: ignoring ≠ untracked; `.gitignore` currently matches nothing; modifying it requires a separate decision; this task forbids it. |
| **Consequence of each** | Ignore → quieter status output, but the exclusion becomes encoded in a tracked config file (itself a durable project statement). Leave untracked → exclusion visible as an explicit open state, no config change. |
| **Recommended decision** | **Recommendation (unapproved):** leave untracked — "out of scope" is a classification, and encoding it in `.gitignore` would give a human decision more permanence than HD-1's wording may intend. |
| **Delegate to agent?** | **No — requires the human** (if it becomes live at all; it is conditional on HD-1). |

---

## 15. Minimum human decision set

**Fact — the smallest set of human decisions required before GP1 can be executed for the current repository, with each item's epistemic status:**

| Item | Status | Basis |
|---|---|---|
| Decision records must be version-controlled | **Already decided** | GP1 names "decisiones" |
| Experiment reports must be version-controlled | **Already decided (derivable from evidence)** | GP1 names "experimentos" + four independent anchors (§6 A4) — no new decision needed |
| The decision index must be version-controlled | **Derivable from evidence** | D1's mechanism wording (record + index); human may override cheaply |
| Historical untracked artifacts are in GP1's execution scope | **Derivable from evidence** | GP1's present-tense wording + the artifacts' clear project membership (A2/A4) — no "backfill decision" is needed for identity |
| Execution mechanics (who/when/scope/messages) | **Genuinely unresolved — HD-2** | GP1 non-scope; Exp02 H10 open |
| Prompt-file classification | **Genuinely unresolved — HD-1** | Task-reserved; evidence ambiguous both ways |
| `.gitignore` change (conditional on HD-1) | **Genuinely unresolved — HD-4** | Only if HD-1 excludes files |

**Interpretation — the minimum set is exactly two decisions:** **HD-1** (prompt classification) and **HD-2** (execution policy). HD-1 must precede HD-2, because its outcome changes *what* HD-2's execution covers. HD-4 is conditional and may never arise. Everything else GP1 requires is either already decided or derivable from evidence — asking the human for those would violate the task's instruction to "avoid asking the human questions that are already resolved".

**Recommendation (unapproved):** answer HD-1 and HD-2 in that order; treat every other item above as settled-by-evidence unless the human explicitly reopens it.

---

## 16. Harness gap analysis

**Fact — the question:** does the current repository have a mechanism for a future agent to determine *"which artifacts are project artifacts and therefore subject to GP1"*?

**Fact — no such mechanism exists.** Evidence:

1. **GP1 deliberately does not enumerate** its covered artifacts ("demás artefactos… que deban formar parte del proyecto"; ADR AMB-G4: *"Left undefined by design; any enumeration requires a future human decision"*).
2. **No artifact-scope record exists.** `docs/decisions/` holds two ADRs and an index; none enumerates artifact classes. This report is analysis, not an approved scope record.
3. **INDEX.md lists decisions, not artifact classifications** — and its reading rule 2 states unrecorded questions are open and must not be treated as resolved, so a future agent following the index correctly finds *no* scope answer.
4. **AGENTS.md contains no artifact-scope rule** — and per Exp05 FM1 it contains **no pointer to `docs/decisions/` at all**, so a future agent may not even discover GP1's existence without being told (D4 remains open).

**Fact — the gap has two layers:**

* **Layer 1 (no authoritative record):** once the human answers HD-1/HD-2, the outcome currently has nowhere durable to live except this experiment report — whose authority relative to decisions is itself unestablished (Exp05 evidence item 11). A future agent reading only `docs/decisions/` would find GP1 but not its scope determination.
* **Layer 2 (no discovery path):** even if a scope record were created under D1's mechanism, no harness pointer guarantees any future session finds it (Exp05 FM1/FM3; Exp03 D4 open).

**Observation:** the gap is structural, not accidental — it is the direct, recorded consequence of two deliberately unmade decisions (GP1's non-enumeration; D4's pointer). **Not implemented here** (per task): this experiment describes the gap only.

---

## 17. Recommendations

**Fact — all of the following are Recommendations; none is approved, and none creates an obligation:**

* **R1 —** Answer **HD-1** (prompt classification), then **HD-2** (execution policy), in that order (§15).
* **R2 —** Once HD-1/HD-2 are answered, **record the resolved artifact-scope classification as a new decision record** under D1's mechanism (e.g. an ADR following `0001`/`0002`, with its identifier assigned by the human — GP1/AMB-G3 shows identifier discipline is itself unresolved). This closes Harness-gap Layer 1 so scope lives in `docs/decisions/`, where future agents are directed to look.
* **R3 —** Consider resolving **Exp03 D4** (the `AGENTS.md` discovery pointer) before or alongside execution, so future sessions can actually find GP1 and any scope record (closes Layer 2). This requires modifying `AGENTS.md` — a separate human-directed act, not done here.
* **R4 —** Do **not** treat this report's A/B/C/D classifications as decisions until confirmed; per INDEX reading rule 2, unconfirmed classifications are analysis.
* **R5 —** If HD-1 excludes prompt files, prefer leaving them untracked over `.gitignore` changes (HD-4), so exclusions remain reviewable rather than encoded.

**Fact — explicitly NOT recommended and NOT implied:** any commit, any staging, any `.gitignore` edit, any `AGENTS.md` change, any stack selection, any prompt-file inclusion/exclusion as an accomplished fact. GP1's wording is reproduced unaltered throughout this document; nothing here expands or narrows it.

---

## 18. Result

# **PASSED WITH QUALIFICATIONS**

**Fact — the success criterion:** produce decision-ready analysis of GP1's current artifact scope **without resolving ambiguous cases, without executing GP1, and without turning analysis into requirement.**

**Why it PASSED (evidence):**

| Criterion | Evidence |
|---|---|
| Complete inventory | 23 files + empty `src/` + absent ignored categories; every row carries Git state, role, and GP1-applicability (§4) |
| Explicit A/B/C/D classification | A=15, B=0, C=8, D=0 current identities (with D-1/D-2/D-3 execution/future matters recorded); counts reconcile with the inventory |
| Identity vs execution separated | §5 separation rules; §9 executes the split; questions 3–4 explicitly not decided |
| Ambiguities not resolved | HD-1/HD-2/HD-4 presented with candidate interpretations, consequences, and unapproved recommendations only |
| Minimum decision set | §15: exactly two decisions (HD-1 → HD-2), everything else derived from evidence or already decided |
| Harness gap described, not implemented | §16: two-layer gap with evidence; no pointer, template, or record created |
| GP1 unaltered | Wording reproduced verbatim (§2, §17); classifications derive from GP1's own words + D1/AGENTS.md anchors; no strengthening claims anywhere |
| Analysis only | One new file; zero modifications; zero staging; zero commits (§21) |

**Why NOT plain PASSED (qualifications):**

* **Q1 — snapshot race:** the inventory is a snapshot taken while the human concurrently modified `experiment-08-prompt.md` (0 → 9,404 B mid-task; §3.3). Row 22 reflects the state at inspection time; the file's *content* may grow when the human appends the response — its Class-C classification is unaffected.
* **Q2 — prompt sub-kinding is interpretation:** the (a)–(d) sub-kinds (§8) are the agent's reading, offered as evidence for HD-1, not as established categories.
* **Q3 — INDEX.md's Class A is a high-confidence inference** from D1's mechanism wording, not a verbatim GP1 clause; the human may override it trivially (no downstream dependency exists today).
* **Q4 — recommendations remain unapproved:** if any reader treats R1–R5 or the A/B/C/D labels as decisions, the experiment's purpose is defeated; the labelling is the only guard, and it is load-bearing, not decorative.

**Why NOT FAILED:** no ambiguous case was resolved; no decision was made; no file besides this report was created or modified; GP1's wording is unaltered; and the two remaining human questions are stated precisely enough to answer without re-reading this report.

---

## 19. Lessons learned

*Interpretations; none is a decision.*

1. **A deliberately non-enumerating decision converts execution into scope-craft.** GP1's "demás artefactos… que deban formar parte del proyecto" is simultaneously its flexibility and its cost: without an enumeration, *every* artifact class becomes a potential decision — this experiment had to classify 23 files to find that only 8 are genuinely ambiguous.
2. **The tracked history is a weak scope oracle but not a silent one.** The original commits predate the entire harness, yet they contain one informative datum: the human tracked `INITIAL_PROMPT.md` — a prompt file — at inception. Historical practice *informs* HD-1 without *deciding* it.
3. **Prompt files are the harness's least-governed artifact class.** Created by human convention, half instruction and half record, covered by no decision, and load-bearing in one case (`04`, sole trail of an experiment with no report) — the project's own § *Documentation* principle points at them, but no record says so.
4. **Empty classes are findings.** Class B is empty because no transient artifacts exist yet — a fact that will invert once `src/` fills. Recording *why* the class is empty prevents a future reader from assuming the classification was skipped.
5. **Classification without authority is still analysis.** Every Class-A label here is a well-evidenced *recommendation-shaped fact* until the human confirms it; the INDEX's own reading rule ("absence of an entry means open") is the project's existing defense, and this report leans on it rather than inventing a new one.
6. **Concurrent human edits are now a permanent feature of verification.** Seventh occurrence: prompt files changed mid-task by the human. Agent verification must treat changed-during-task files as human work by default and prove non-involvement rather than assume it.
7. **The identity/execution split is the cleanest way to keep a decision faithful.** "Does it belong?" was answerable from GP1's wording and recorded anchors; "how does it get committed?" was answerable from nothing — separating them kept this experiment inside its authority boundary with two crisp human questions left over, which is exactly the intended residue.

---

## 20. Human decisions required

**Fact — nothing below was decided, approved, or assumed by this document:**

| ID | Decision | Class | Precondition | Answer enables |
|---|---|---|---|---|
| **HD-1** | Do experiment prompt files form part of the project within GP1, and therefore require version control? (8 files; candidate interpretations (i)/(ii)/(iii) at §14) | C | — | HD-2's exact file set |
| **HD-2** | Who commits the confirmed in-scope untracked artifacts, when, in what scope, and under what message convention? | D-1 | HD-1 | GP1's execution (a separate, human-directed act) |
| **HD-4** | *(Conditional — only if HD-1 excludes files)* ignored vs merely untracked for the excluded files | D-3 | HD-1 | Clean status output; optional |

**Fact — not requested, because already settled or derivable (per §15):** decision records in scope (GP1); experiment reports in scope (GP1 + evidence anchors); index in scope (D1); historical untracked artifacts in GP1's execution scope (GP1's wording); future `src/` code (outside GP1's wording; no decision now); any current `.gitignore` change (none needed).

**Fact — recommendation status:** R1–R5 (§17) are unapproved; HD-1/HD-2/HD-4 are questions, not proposals; the human's answers may differ from every recommendation here without contradicting any recorded decision.

---

## 21. Verification

**Fact — performed after writing this file:**

1. **Exactly one new file created:** `experiments/08-gp1-artifact-scope-analysis.md` — confirmed via `find -newermt` (only this file is agent-authored new content) and `git status` (one new untracked path beyond the 16 pre-existing).
2. **No existing file modified:** all protected checksums re-verified identical to pre-task baseline — `AGENTS.md` `7355a77e…`, D1 `5f9deeb4…`, GP1 ADR `04af7636…`, INDEX `06d3a538…`, reports `2e3b7abaf…`/`903b0565…`/`d58367e0…`/`6faa8e1e…`/`0389f381…`, all prompt files, `.gitignore` `8f7a9110…`, scaffold files. **Documented exception:** `experiments/experiment-08-prompt.md` changed **by the human during the task** (0 → 9,404 B; `d41d8cd9…` → `6456963b…`; §3.3) — the agent never wrote to it; its content is this task's verbatim prompt plus an unfilled response marker.
3. **No files staged:** `git diff --cached` empty; `git ls-files -m` empty; `.git/index` mtime unchanged from pre-task (`08:31:51`).
4. **No commit created:** HEAD unchanged at `5fd9f54`; commit count still 2; log unchanged.
5. **No push occurred:** a remote **is** configured (`origin` → `https://github.com/raulferrer-ai/harness-engineering-course.git`). No push evidence exists: remote-tracking ref `origin/main` = `5fd9f5437b…` = local HEAD, and `.git/refs/remotes/origin/main` is dated `08:31` (clone/setup time, predating all experiments); a push from this task would have moved that ref or HEAD's upstream state — neither happened, and nothing was staged or committed that could be pushed. *(Correction recorded transparently: the first draft of this item stated "no remote configured" — an unsupported claim made without checking `git remote -v`; verification caught it and this sentence replaces it. Lesson captured in §19-adjacent practice: verification claims must be evidence-backed, including negative claims.)*
6. **Application code untouched:** `src/` remains an empty directory; repository contains only Markdown + `.gitignore`; no code files exist or were created.
7. **Inventory matches actual repository state:** §4 lists 23 files + `src/`; final `git status` shows 6 tracked + 17 untracked (the 16 baseline paths + this report) — reconciles exactly (§4 rows 1–6 tracked; rows 7–22 untracked baseline; row 23 = this report).
8. **Every human decision request is genuinely unresolved:** HD-1 (explicitly task-reserved; no record classifies prompts), HD-2 (GP1 non-scope; Exp02 H10 open; no policy exists anywhere), HD-4 (conditional; `.gitignore` unmodified and authoritative only for its current rules). None duplicates GP1/D1 content; none was answered here.
9. **GP1 was not silently expanded or narrowed:** GP1's Spanish wording is reproduced verbatim (§2, §17); all classifications derive from GP1's own words ("decisiones", "experimentos", "demás artefactos… que deban formar parte del proyecto") or from recorded decisions (D1) and `AGENTS.md`; no strengthening claims ("everything must be committed", "all experiments committed immediately", "Git is the only mechanism", etc.) appear as statements — the forbidden list is referenced only as the thing being avoided.
10. **Final Git state:** HEAD `5fd9f5437bd27276dbaec511f86e31daa3dc36b0`; **2 commits**; **6 tracked**, **17 untracked** (16 pre-existing + this report); **0 staged**; **0 modified by the agent** (1 file modified by the human during the task: `experiments/experiment-08-prompt.md`, documented above); stash empty; no ignored files present.

**Not done, by instruction:** no GP1 execution; no commit; no staging; no `.gitignore` modification; no `AGENTS.md` modification; no decision records created or altered; no ambiguous classification resolved; no stack selected; no harness rules changed; no "cleanup" of any file.

