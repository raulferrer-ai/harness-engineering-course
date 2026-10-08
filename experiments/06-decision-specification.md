# Experiment 06 — Decision Specification

* Date: 2026-10-06
* Status: completed (decision briefs prepared; **no decision made, no change implemented**)
* File created: `experiments/06-decision-specification.md` (this document)
* Preceding evidence: Experiments 03, 04, 05

**Label legend — used to keep analysis from becoming requirement:**

* **FACT** — directly established by the repository, by `AGENTS.md`, or by a previous experiment's recorded output.
* **OBSERVATION** — something observed during an experiment.
* **INTERPRETATION** — reasoning about what the evidence means.
* **RECOMMENDATION** — a proposed course of action that **still requires human approval**. Nothing labelled RECOMMENDATION is in force.

**Standing disclaimer:** this document prepares the human decision boundary. It does not cross it. Every option set below is offered for evaluation; no option is selected; no record is created or altered; `AGENTS.md` is untouched.

---

## 1. Objective

**FACT — what this experiment was intended to do:**

1. Transform the evidence produced by Experiments 03–05 into **precise, decision-ready briefs** for the human project owner.
2. Specify four named decisions — **D2** (information model), **D4** (discovery and precedence), **D5** (write/transition governance), **D7** (retention/supersession) — plus the **Git/version-control persistence** decision demonstrated by Experiment 05.
3. For each: state the evidence, the exact question, the constraints already fixed by prior human decisions, the options, the trade-offs, the consequences, what stays the same whatever is chosen, what behaviour changes, dependencies, whether it blocks the next harness change, and any recommendation.
4. Analyse the five special areas (A–E) without selecting anything.
5. Report ambiguities in existing decision IDs and terminology rather than silently normalising them.

**INTERPRETATION:** Experiments 03–05 produced analysis and one recorded decision. The bottleneck has moved from *understanding the problem* to *getting decisions made*. The value of this document is measured by whether the human can answer each brief without re-reading three experiment reports.

---

## 2. Evidence base

### 2.1 Inputs read

**FACT:** `AGENTS.md` (292 lines, MD5 `7355a77e…`, unchanged), `experiments/03-decision-closure-analysis.md` (431 lines, `d58367e0…`), `experiments/05-decision-consumption.md` (302 lines, `6faa8e1e…`), `docs/decisions/0001-decision-recording-mechanism.md` (170 lines, `5f9deeb4…`), `docs/decisions/INDEX.md` (49 lines, `f5d34b46…`), `experiments/experiment-4-prompt.md`, current repository structure, Git metadata.

**FACT — no `experiments/04-*.md` exists.** Experiment 04 has no report file; its artifacts are the two records in `docs/decisions/` plus `experiments/experiment-4-prompt.md` (the task prompt with the session response appended). Per instruction, Experiment 04 evidence was taken from those actual artifacts.

### 2.2 Evidence items (treated as evidence, **not** as approved requirements)

| # | Evidence (as supplied by the task) | Verified how | Source |
|---|---|---|---|
| 1 | ADR-per-decision plus index selected by the human as D1 | Read the decision statement in the ADR §3 | Exp04 |
| 2 | D1 recorded as an ADR and indexed | ADR has all 11 required fields; INDEX has the D1 entry + link | Exp04 |
| 3 | ADR and INDEX are **untracked** Git files | `git ls-files` shows no decision path; `git status` shows `??` for both | Exp05 S9 |
| 4 | Decision records are **not durable across a fresh clone** | Exp05 FM2: a clone would contain neither record | Exp05 |
| 5 | No authoritative discovery pointer from `AGENTS.md` | `grep` of `AGENTS.md`: 13 uses of the word "decision", **0** location pointers | Exp05 S2 |
| 6 | Discovery depends on repository search or prior knowledge | Exp05 S1–S9: pointer-following ends at step S4; search begins at S5 | Exp05 |
| 7 | Information model and status vocabulary not formally approved | ADR A2/A3/A6 record these as open; no template exists | Exp03 D2/D7, Exp04 |
| 8 | Write/transition governance undefined | No rule anywhere states who may create/transition records | Exp05 FM6 |
| 9 | Index-maintenance rules undefined | ADR A7 states it; no rule exists | Exp04 |
| 10 | Supersession/retention policy undefined | ADR §7: supersession fields exist but policy, revisit trigger, deletion policy all "not decided" | Exp04 |
| 11 | Report labels exist but authority vs. decisions not established | Exp05 §5: only *location + attribution + status* signal authority; labels are convention | Exp05 |
| 12 | A future agent **can** consume D1 once found; discovery not guaranteed | Exp05 §4.1 all 8 points answerable; §3.2 search-dependent | Exp05 |

**OBSERVATION:** items 3–4, 5–6, 7–10 each form a *mechanism gap* that a human decision can close; none can be closed by the agent, because each would change harness rules or repository-wide practice.

### 2.3 Identifier and terminology ambiguity register (reported, not normalised)

**FACT — three ID/terminology conflicts exist in the existing artifacts:**

| # | Conflict | Evidence | Handling here |
|---|---|---|---|
| **AMB-1** | This task names section 4 **"D4 — Discovery and precedence"**, but Experiment 03 §13 defines **D3 = precedence rule + fail-safe default** and **D4 = discovery pointer** as *two separate* decisions. | Exp03 §13 rows D3, D4 (quoted in full at §4 below) | **Reported, not merged silently.** The §4 brief explicitly states it spans Exp03 **D3 and D4**, offers them as either one combined answer or two separate answers, and leaves the choice to the human. |
| **AMB-2** | **ID scheme and file naming** are attributed to different decisions in different documents: Exp03 §13 gives "ID scheme, filename conventions" to **D7**; this task's Section A asks for "stable decision identifiers; file naming" inside **D2**; the ADR's ambiguity A2 says "D2/D7". | Exp03 §13 D2/D7 rows; ADR A2 | **Reported.** Both briefs analyse their assigned elements (§3 covers identifiers/naming per Section A; §6 covers retention/ID-reuse per Section D) and each cross-references the other. Final home of the ID-scheme question is the human's. |
| **AMB-3** | Two identifier spaces are in use with no reconciliation: human-facing **D1** (Exp03 catalog, ADR, INDEX) and file ordinal **0001** (filename, set by the Exp04 instruction). Exp05 FM10 predicts the next record exposes the collision (Exp03's open **D2** vs. file `0002`). | ADR A2; Exp05 FM10 | **Reported as evidence for D2.** No scheme proposed as decided. |

**FACT — secondary terminology notes:**

* Exp02 uses **H1–H14** for its open-decision catalog (H6 = decision-record process, H10 = Git workflow, H8 = experiment conventions); Exp03 uses **D1–D7**. The two catalogs overlap in subject matter but were never mapped to each other.
* **STATUS-VOCABULARY AMBIGUITY:** D1's status is `Accepted` (human-supplied); Exp03's candidate vocabulary was `open`/`decided`/`superseded` (explicitly unapproved). Neither is canonical today.
* The **Git persistence decision has no existing ID** — see §7 for its candidate identifiers.

**INTERPRETATION:** these are not cosmetic. An ID collision (AMB-3) plus an ID-home conflict (AMB-2) means that recording decision "D2" next could be ambiguous within one keystroke. This is precisely why the identifier question belongs in a human brief rather than an agent's convenience.

---

## 3. Decision D2 — Information model

*Special analysis A embedded. **Not a template** — the tables below analyse candidate elements; they do not constitute an approved schema.*

### Brief

| # | Field | Content |
|---|---|---|
| **1** | **Decision ID / provisional identifier** | `D2` (Exp03 §13 catalog). **AMB-2:** ID-scheme/home-of-question also implicates `D7` per Exp03 §13 and ADR A2. |
| **2** | **Title** | Approve the decision-record information model: identifiers, file naming, status vocabulary, and fields. |
| **3** | **Evidence motivating** | ADR ambiguities A2 (no ID scheme), A3 (no status vocabulary), A6 (no template); Exp05 FM4 (ad-hoc `Accepted`), FM5 (schema implicit in one example), FM10 (ID collision predicted), MM3; Exp03 §4.1 proposed 14 fields, §4.2 exclusions. **FACT:** no approved schema exists anywhere. |
| **4** | **Problem to solve** | Record N+1 can be written malformed — wrong status, missing attribution, colliding ID, unbounded scope — with no rule detectable as violated. |
| **5** | **Why human-owned** | `AGENTS.md` §7 (human owns product decisions) and § *Dependency and Technology Decisions*: a schema governs all future records, i.e. it materially affects architecture of the governance system. Exp03 D2 was classified C1 (human-required). |
| **6** | **Exact question the human must answer** | *Which record specification is approved for all future decision records?* Specifically and separately: **(a)** identifier scheme — one unified `D<N>`↔file-number space, or two spaces, or one of them retired; **(b)** file-naming pattern for record N+1; **(c)** status vocabulary and which status transitions are legal; **(d)** which fields are required vs. optional; **(e)** which authority metadata is mandatory. *Granularity note: this may be answered as one bundle or as five sub-decisions — that choice is yours (AMB-2).* |
| **7** | **Constraints already established by prior human decisions** | **D1 (Accepted):** mechanism = one record file per decision + index — so schema must fit *file-per-decision*, not a single log or YAML registry. Exp04 instruction fixed **11 required fields** for D1's record (ID, Title, Status, Decided by, Decision date, Scope, Context, Decision, Alternatives considered, Consequences, Supersession) and **6 minimum index columns** (ID, Title, Status, Decided by, Date, Scope) — *FACT: these are the only field requirements any human has ever specified.* `AGENTS.md` §7: future decisions human-owned unless explicitly delegated. |
| **8** | **Available options** | See option tables O-1…O-5 below (identifiers, naming, status vocabulary, fields, authority metadata). |
| **9** | **Trade-offs** | Stated per option in the tables. |
| **10** | **Consequences** | Stated per option in the tables. |
| **11** | **What remains unchanged regardless of choice** | D1 stays valid (its fields already satisfy any plausible superset); mechanism stays file-per-decision + index (D1 binding); no stack implication; `AGENTS.md` unchanged by this decision alone; the human remains the owner of every decision; experiment reports keep their labels. |
| **12** | **Future behaviour affected** | How record N+1 is written; how INDEX rows are formatted; whether a future agent recognises a status; whether Exp05 FM4/FM5/FM10 recur; what D5 governs transitions *between*; what D7 does with supersession fields. |
| **13** | **Dependencies** | Depends on: **D1** (done). Interacts: **D5** (vocabulary defines *legal transitions*; D5 defines *who may perform them*); **D7** (supersession fields, ID non-reuse); **Git persistence §7** (where files live). Partially overlaps **D7** per AMB-2. |
| **14** | **Blocks next harness change?** | **Blocks the next *recorded decision* and any template** (a schema-less record is the FM5 failure). Does **not** block D4's pointer addition — a pointer can be written before a schema exists. |

**O-1 — Identifier scheme (options)**

| Option | Trade-off | Consequence |
|---|---|---|
| (a) Single unified space: `D<N>` *is* file `NNNN` (D1 ⇔ 0001) | One thing to remember; removes AMB-3 | Requires retro-fitting meaning onto the existing pair (they coincidentally align today only by luck) |
| (b) Two spaces, explicitly mapped (human ID ↔ file ordinal) | Preserves both existing usages | Keeps a mapping that must be maintained forever |
| (c) Retire the file ordinal; files named by `D<N>` | One ID everywhere | Renames D1's file — conflicts with "do not modify D1 ADR" now, and with E4 stability later |
| (d) Retire the `D<N>` label; use only ordinals | Simple counter | Loses the human-facing shorthand already used in three reports |
| (e) Slug/hash-based IDs | Collision-proof, order-free | Unreadable in conversation; breaks the "D1" habit |

**O-2 — File naming (options):** (a) `NNNN-slug.md` — *FACT: already used by D1's file, but set by a one-off instruction, not by rule*; (b) `D<N>-slug.md`; (c) `YYYY-MM-DD-slug.md`; (d) slug only; (e) numbered + dated. Trade-offs: (a) sorts chronologically, matches existing artifact, but hides the human ID if AMB-3 unresolved; (b) ties file to conversation ID; (c) makes date primary (useful for retention/D7, weak for cross-reference); (d) smallest, but reordering/rewording breaks links (E4 violation risk).

**O-3 — Status vocabulary (options):**

| Option | Trade-off | Consequence |
|---|---|---|
| (a) Exp03 candidate: `open` / `decided` / `superseded` | Designed for this project's lifecycle; includes *open* (pre-decision) state | Requires mapping D1's `Accepted` into the set — i.e. touching D1's status eventually |
| (b) Build around what already exists: `Accepted` (+ `Proposed` / `Rejected` / `Superseded`) | Matches D1 exactly; no re-litigation of the one real record | Vocabulary derived from one instance; `open` vs `Proposed` may blur |
| (c) Standard ADR conventions (`proposed`/`accepted`/`deprecated`/`superseded`) | Familiar outside this project (educational value E6) | Imports terminology the project never chose |
| (d) Minimal binary: `decided` / `not-decided` | Impossible to misread; strongest FM4 defence | Too coarse for supersession, which needs a third state |

**O-4 — Required vs. optional fields (options):** (a) **Exp04's 11 as required** — *FACT: the only human-specified set*; adopt-with-nothing-to-invent; (b) Exp03's 14 (adds Rationale, Revisit conditions, Enforcement hook, Affected work items) — fuller, more ceremony (E7 risk); (c) 11 + Rationale only (targets A4); (d) minimal core (ID/Status/Decided-by/Date/Statement/Scope) + everything else optional — cheap, but weakens G3/G5 defences. **INTERPRETATION:** whichever is chosen, rationale is currently *absent from D1* (A4) and revisit conditions *absent* (ADR §7), so a choice of (b) or (c) implies a decision about whether D1 itself is grandfathered or amended later — a consequence, not a fact.

**O-5 — Authority metadata (options):** (a) require `Decided by` + `Recorded by` (separating owner from scribe — mirrors D1 §3.1); (b) add `Delegated from` to make D1 §3.1(4)'s delegation machine-visible; (c) require a `Source` link to the informing experiment/task; (d) require none beyond existing `Decided by`. Trade-off axis: auditability vs. per-record ceremony.

**A-element classification (FACT vs PROPOSED):**

| Element | **FACT** (from existing artifacts) | **PROPOSED design choice** (undecided) |
|---|---|---|
| Stable identifiers | `D1` used in Exp03 catalog/ADR/INDEX; `0001` used in filename; ADR A2 says unreconciled | Which scheme; whether spaces merge; whether IDs may be reused |
| File naming | `0001-decision-recording-mechanism.md` and `INDEX.md` exist as written; naming came from a one-off Exp04 instruction | The standing pattern for record N+1 |
| Status vocabulary | D1 = `Accepted`; Exp03 candidate `open`/`decided`/`superseded` (labelled Recommendation, never approved); INDEX reproduces `Accepted` verbatim with a note that no vocabulary is standardised | The canonical set; legal transitions |
| Required fields | The 11 fields exist in D1; they were specified by the human in the Exp04 instruction | Making them mandatory prospectively; adding any |
| Optional fields | D1 additionally has Context, Alternatives, Consequences, Supersession block, Ambiguities A1–A7, Verification; Rationale and Revisit conditions are **absent** (A4) | Which become required |
| Authority metadata | `Decided by: Human project owner`; §3.1 authority boundary; INDEX "Decided by" column; `AGENTS.md` §7; D1 §3.1(4) delegation clause | `Recorded by`, `Delegated from`, `Source` fields |
| Decision scope | D1 has Scope + explicit non-scope row (human instruction required it); INDEX has Scope column and a non-implication section | Scope taxonomy/format for future records |
| Supersession references | D1 §7 rows exist: Supersedes (none), Superseded by (none), Status history, Revisit conditions (not specified), Deletion policy (not decided) | Semantics → **D7** |
| Rationale | Absent from D1 (A4); proposed in Exp03 §4.1 field 9 (Recommendation) | Required or optional; may it be retro-filled |
| Revisit conditions | Absent from D1; proposed in Exp03 §4.1 field 12; ADR §7 defers to D7 | Required or optional; who evaluates them |

**15. RECOMMENDATION (unapproved options only):**
* **R-D2a:** consider answering (a)–(e) as five small sub-decisions rather than one bundle, since AMB-2 shows they have been drifting between D2 and D7.
* **R-D2b:** consider treating the Exp04 field set as the baseline, because it is the only field list a human has actually specified — adopting it means ratifying existing practice rather than inventing new requirements.
* **R-D2c:** consider deciding the status vocabulary *with* D5, since vocabulary and transition authority are hard to test independently.
* *These are RECOMMENDATIONS. They are not approved, and no schema described here is in force.*

---

## 4. Decision D4 — Discovery and precedence

*Special analysis B embedded. **AMB-1 applies:** this brief spans Experiment 03's **D3** and **D4**.*

**FACT — the two source definitions this brief covers:**

> Exp03 §13 **D3**: "Approve the precedence rule and the fail-safe default, and add them to `AGENTS.md`" — only the human may amend `AGENTS.md`; also resolves Experiment 01 A4.
> Exp03 §13 **D4**: "Approve the discovery pointer — the exact path/lookup a future session must perform at task start, documented in `AGENTS.md`" — determines property P2 for every future session.

**OBSERVATION:** this task's section title fuses these into one ("Discovery and precedence"). **Nothing has been approved or merged by me**; the brief below presents them as **one combined question or two separate ones, at the human's election**.

### Brief

| # | Field | Content |
|---|---|---|
| **1** | **Provisional identifier** | `D4` per this task; = **Exp03 D3 + D4** (AMB-1). |
| **2** | **Title** | Discovery pointer for recorded decisions, and authority precedence among sources. |
| **3** | **Evidence** | Exp05 S2–S4 (AGENTS.md/README/vision/architecture all silent), S5–S8 (search succeeds), §3.2 (discovery is task-correlated), FM1 (no authoritative pointer), FM3 (silent unheard risk), FM8 (no precedence rule exists), FM9 (analysis-as-requirement possible), MM1 (highest-leverage fix), MM7; INDEX's own note that `AGENTS.md` has no pointer; ADR A5. **FACT:** `grep` finds no path pointer and no precedence rule anywhere in `AGENTS.md`. |
| **4** | **Problem to solve** | Two distinct gaps: **(i)** a future session is not *told* where decisions live, so it finds them only by luck/search; **(ii)** when `AGENTS.md`, a recorded decision, an experiment report, and conversation disagree, no rule says which wins — so an agent must improvise the exact judgement `AGENTS.md` §1 exists to prevent. |
| **5** | **Why human-owned** | Both fixes require **editing `AGENTS.md`**, which `AGENTS.md` § *Current Project Status* reserves: "propose an improvement to this file rather than silently working around the problem". Precedence also allocates authority — a product/governance decision under §7. |
| **6** | **Exact question(s)** | **(i)** *Where must the authoritative pointer live — `AGENTS.md`, `README.md`, both, or elsewhere — and what exact wording?* **(ii)** *What is the precedence order when sources conflict?* **(iii)** *Should the fail-safe default ("no record or ambiguous record ⇒ not decided ⇒ ask") be written into `AGENTS.md`?* — answerable together or separately (AMB-1). |
| **7** | **Constraints from prior human decisions** | **D1 (Accepted):** establishes that decisions *are* recorded per-decision + index, so the pointer must target an index; D1 §3.1(4): future decisions human-owned unless explicitly delegated (any precedence rule must preserve this); D1's non-scope: no stack implication. `AGENTS.md` §1 and §7 remain in force *until amended by the human* — this brief cannot modify them. |
| **8** | **Available options** | **Pointer (P1–P5)**; **Precedence (R1–R4)**; **Fail-safe (F1–F2)** below. |
| **9** | **Trade-offs** | Per option below. |
| **10** | **Consequences** | Per option below. |
| **11** | **Unchanged whatever is chosen** | `AGENTS.md` still governs the harness; D1 remains Accepted and valid; experiment reports keep their labels and their non-binding-by-default character *unless* a precedence rule says otherwise; no stack implication; no record format change (that is D2). |
| **12** | **Future behaviour affected** | Whether a session discovers decisions **by rule** or **by search** (Exp05 FM1/FM3); how conflicts are arbitrated; whether experiment analysis can be mistaken for requirement (FM9); what "authoritative" means for every future task; the reliability claim of the whole mechanism. |
| **13** | **Dependencies** | Independent of **D2** (a pointer does not need a schema) but should *name* what it points to; depends on **D1** (done); **Git persistence §7** matters for durability of what is pointed at; interacts with **D5** (who may edit `AGENTS.md` pointer wording — effectively human-only today). |
| **14** | **Blocks next harness change?** | **Yes — this is the harness change.** It is the gate for Exp05 MM1/MM7, rated highest-leverage. Nothing else in this document must precede it; its own sub-questions (i)–(iii) must be answered first. |

**Pointer options:**

| # | Option | Trade-off | Consequence |
|---|---|---|---|
| P1 | Pointer in `AGENTS.md` only | Guaranteed read every session (it is the mandatory harness file); single authoritative copy (P10) | Adds length to the instruction file — the failure mode recorded for Exp03 M6 (instruction bloat vs. adherence) |
| P2 | Pointer in `README.md` only | Good for human readers; no `AGENTS.md` bloat | Agents are not required to read README → discovery stays search-dependent (FM1 survives) |
| P3 | Both | Redundancy: survives if one is missed | Two copies to keep in sync; divergence risk (G6/P10) unless one is declared non-authoritative |
| P4 | `AGENTS.md` pointer + `docs/decisions/` self-description only (INDEX already documents itself) | Instruction file stays slim; records remain self-describing (INDEX does this today) | Still needs *one* pointer in a must-read file, so this does not avoid P1's trade-off so much as minimise wording |
| P5 | No pointer; accept search-based discovery | Zero change; no bloat | FM1/FM3 persist: a constraining decision can be silently unheard with no visible error |

**Precedence options:**

| # | Option | Trade-off | Consequence |
|---|---|---|---|
| R1 | `AGENTS.md` (requirements) **>** recorded decisions **>** experiment analysis **>** conversation/observation | Harness principles never silently overridden by a later record; matches §1's anti-invention stance | A genuinely newer decision that needs to *amend* a rule must go through an `AGENTS.md` edit (slower, explicit) |
| R2 | Recorded decisions **>** `AGENTS.md` *within the decision's stated scope* | Specificity wins; decisions can evolve practice without editing the harness | A stale or over-broadly-scoped record could outrank a live principle — the G4/G5 risk, mitigated only by scope fields (D2) |
| R3 | Most-recent-wins (by `Decided on`) | Trivial to reason about; natural for evolving projects | Rewards whoever records latest; makes dates load-bearing (A1 shows dates are date-level only) |
| R4 | No precedence rule (status quo) | No decision needed now | FM8 remains: conflicts resolved by agent improvisation, the exact thing §1 prohibits |

**Fail-safe options:** **F1** — write Exp03 §4.3's default into `AGENTS.md` ("no or ambiguous record ⇒ not decided ⇒ ask"), making conservative behaviour mandatory rather than observed; **F2** — leave it unwritten (today it is *practised* — Exp05 O8 noted graceful degradation — but not required).

**INTERPRETATION:** options P1–P5 concern *mechanics*; R1–R4 and F1–F2 concern *authority allocation*. The latter are the more consequential, because they determine what any future agent treats as binding — including whether this very document's analysis is later read as requirement.

**15. RECOMMENDATION (unapproved):**
* **R-D4a:** consider treating pointer and precedence as **one decision session** — both are `AGENTS.md` edits, and a pointer without precedence still leaves FM8 open.
* **R-D4b:** consider whether the ambiguity in AMB-1 (D3+D4 combined or separate) is resolved *first*, since it determines whether one or two briefs are answered.
* *Neither is approved. No `AGENTS.md` wording is proposed as final; no pointer has been added.*

---

## 5. Decision D5 — Write and transition governance

*Special analysis C embedded.*

### Brief

| # | Field | Content |
|---|---|---|
| **1** | **Provisional identifier** | `D5` (Exp03 §13: "Governance: who may write and transition records — may the agent draft `open` items? may only the human set `decided`?"). |
| **2** | **Title** | Who may propose, record, transition, supersede, correct, and index. |
| **3** | **Evidence** | Exp05 FM6 (no write/transition rule exists), MM4; ADR A6/A7 (index maintenance reported, not created); D1 §3.1 (recording ≠ owning; delegation must be explicit); `AGENTS.md` §7 and § *Current Project Status*; **FACT:** the one record that exists was *written by the agent* at human instruction, in a scribe role the human directed. |
| **4** | **Problem to solve** | Write access exists; authority does not. Without a rule, either an agent records something unauthorized (requirement inflation, G2), or every write stalls with no defined process — and index edits are similarly unowned. |
| **5** | **Why human-owned** | This *is* the authority boundary: `AGENTS.md` §7 assigns product decisions to the human; a rule about who may bind the project cannot be self-assigned by the party it constrains. D1 §3.1(4): delegation must itself be explicitly recorded. |
| **6** | **Exact question** | For each of six actions — **propose a decision · record a human decision · change status · supersede · correct a factual error · modify the index** — *which role may perform it: human project owner, agent, or both under what condition?* (Answerable as one matrix or action-by-action.) |
| **7** | **Constraints from prior decisions** | **D1:** mechanism = file-per-decision + index (so governance attaches to those two artifacts); D1 §3.1(1) agent = scribe; §3.1(4) future decisions human-owned **unless explicitly delegated** — delegation is possible but must be recorded. `AGENTS.md` §7; § *Current Project Status* (only the human changes `AGENTS.md`). INDEX rule: no entry may be created, guessed, or inferred by an agent *as a decision* (existing convention, not yet a ratified rule). |
| **8** | **Available options** | Governance models **G1–G4** below. |
| **9** | **Trade-offs** | Per model below. |
| **10** | **Consequences** | Per model below. |
| **11** | **Unchanged whatever is chosen** | The human remains owner of every decision; writing a record still confers no authority (D1 §3.1 — a rule cannot change that clause without a new decision); D1 stays valid; no stack implication; `AGENTS.md` still human-only to edit. |
| **12** | **Future behaviour affected** | Whether the agent may ever create `docs/decisions/*` unprompted; who updates INDEX (tie-in to A7/D7); whether status transitions can happen at all without the human physically acting; speed of the decision loop; the FM6 failure mode. |
| **13** | **Dependencies** | Needs **D2** for the vocabulary it transitions *between* (a governance rule referencing statuses requires statuses to exist) — though a role-only rule can precede D2; depends on **D1** (done); interacts with **D7** (who may supersede) and **§7 Git** (who commits — a record change is only durable if committed, so governance and commit policy overlap). |
| **14** | **Blocks next harness change?** | **Blocks the next record written by anyone but the human**, and blocks any index-maintenance rule. Does not block D4's pointer. |

**Governance model options:**

| # | Model | Propose | Record | Transition status | Supersede | Fix factual error | Modify INDEX | Trade-off / consequence |
|---|---|---|---|---|---|---|---|---|
| **G1** | Human-only writes | Human | Human | Human | Human | Human | Human | Zero authority risk; every write is a human round-trip — slowest, and the agent's scribe role (as used for D1) would need re-authorising each time |
| **G2** | Two-phase: agent drafts, human approves status | Agent | Agent (as draft, status `proposed`/`open`) | **Human only** | Human | Agent may fix non-substance with human ack | Agent may maintain; human approves | Keeps scribe efficiency; requires D2's vocabulary to distinguish draft from decided; needs an approval signal (how the human marks it) |
| **G3** | Human approves first, agent executes | Human decides | Agent writes after explicit instruction | Human only | Human | Agent, human reviewed | Agent | Mirrors exactly what happened with D1 (agent wrote, human directed) — lowest-friction fit to observed practice |
| **G4** | Delegated by recorded decision | Per delegation | Per delegation | Per delegation | Never (assumed) | Per delegation | Per delegation | Scales best; but D1 §3.1(4) requires each delegation be recorded — so this option *presupposes* a delegation record and is not "free" |

**C-analysis — agent vs. human authority (INTERPRETATION):**

* **FACT:** file write access exists for the agent; D1 §3.1 states "writing a record confers no authority" and "future decisions remain human-owned unless explicitly delegated".
* **FACT:** correcting a factual error is categorically different from changing a decision: a typo fix alters no meaning, whereas altering the decision statement is supersession, not correction. Any model must separate them, or G2/G3's "correction" permission becomes a backdoor around the human gate.
* **FACT:** index modification is *maintenance*, not *decision-making* — but a wrong index row misstates which decisions exist, so it carries decision-shaped risk (G6).
* **OBSERVATION:** no model may grant the agent status-transition authority implicitly; Exp05 FM6 exists precisely because nobody has said so.
* **INTERPRETATION:** the sharpest line is not "who can edit files" but "who can move a record into a binding state". Write access is a filesystem fact; binding is a governance act.

**15. RECOMMENDATION (unapproved):**
* **R-D5a:** consider separating **correction of non-substance** from **supersession** explicitly in whatever model is chosen, since that seam is where silent decision-drift would occur.
* **R-D5b:** consider answering this *after or with* D2, because G2/G3 reference statuses that D2 defines.
* *Both are RECOMMENDATIONS only. No governance model is adopted; the agent's authority is unchanged by this document (i.e. none).*

---

## 6. Decision D7 — Retention and supersession

*Special analysis D embedded. **AMB-2 applies:** Exp03 §13 also assigns "ID scheme, filename conventions" to D7.*

### Brief

| # | Field | Content |
|---|---|---|
| **1** | **Provisional identifier** | `D7` (Exp03 §13: "Retention and supersession policy — how long obsolete records stay, ID scheme, filename conventions"). |
| **2** | **Title** | What happens to superseded decisions, and how supersession is represented, discovered, and prevented from being consumed. |
| **3** | **Evidence** | ADR §7: Supersedes (none), Superseded by (none), Revisit conditions **"not specified by the decider"**, Deletion policy **"not decided"**; ADR A7 (no maintenance rule); Exp05 FM7 (index drift), MM6; Exp03 G1 (obsolete-record-treated-as-active = costliest error), G13 (silent edit erases history), P6/P11/E3/E4; Exp03 §4.3 step 4 (follow chains to tip) exists only as a *Recommendation*. |
| **4** | **Problem to solve** | When D1 is eventually superseded (or a revisit trigger fires), there is no defined representation, no rule on file retention, no rule on ID reuse, no rule on index treatment, and no mandated agent behaviour for skipping obsolete records — so the costliest known failure (G1) is unguarded by rule. |
| **5** | **Why human-owned** | It defines how the project's history may be altered and what remains discoverable — a governance/education trade-off (Exp03 E3/E4) affecting the repository's claim to be an inspectable example (§ *Purpose*). |
| **6** | **Exact question** | *When a decision is superseded: (a) does the old ADR file remain, and where? (b) how is supersession represented (status change, cross-links, both)? (c) are IDs ever reused? (d) do obsolete records stay discoverable via INDEX, and how are they marked? (e) how is an agent instructed to avoid consuming them? (f) what fires a revisit — and who judges it?* |
| **7** | **Constraints from prior decisions** | **D1 (Accepted):** file-per-decision + index (supersession must work *within* that shape); D1 §7 already contains Supersedes/Superseded-by/Status-history/Revisit/Deletion rows — the *fields* exist, only their policy is undefined; D1 §3.1(4) delegation clause; `AGENTS.md` §6 (document what is known) and § *Educational Content* (the artifact is course material — history has teaching value). "Do not modify the existing D1 ADR" (task constraint) means any future change to D1 follows policy, not whim. |
| **8** | **Available options** | See O-6…O-9 below. |
| **9** | **Trade-offs** | Per option. |
| **10** | **Consequences** | Per option. |
| **11** | **Unchanged whatever is chosen** | Nothing is superseded today (FACT: one record, status Accepted); D1 remains valid now; the mechanism stays file-per-decision + index; IDs need not be renumbered by any option that forbids reuse; educational value of retained history is preserved unless the human chooses otherwise. |
| **12** | **Future behaviour affected** | What a future agent reads when a decision changes; whether stale records can be mistaken as active (G1); whether INDEX can drift (FM7); how long the record corpus grows (E7 ceremony cost); whether Exp03 §4.3 step 4 becomes a rule or stays a habit. |
| **13** | **Dependencies** | Depends on **D2** for status vocabulary and supersession field semantics (AMB-2 overlap: ID-reuse question straddles D2/D7); governance of *who* supersedes is **D5**; discoverability of retained records assumes **D4**; durability assumes **§7 Git**. |
| **14** | **Blocks next harness change?** | **No.** No supersession exists; nothing today requires it. It becomes blocking only when a decision changes or a revisit trigger fires — which can happen at any time, so it is cheap to decide early and expensive to leave undefined at the first real supersession. |

**O-6 — Fate of superseded ADRs (options):** (a) **keep in place**, status flipped, file untouched otherwise; (b) **keep + move** to a `superseded/` subfolder; (c) **keep + header banner** ("SUPERSEDED BY …"); (d) **delete, leave tombstone** in INDEX; (e) delete entirely. Trade-offs: (a)–(c) preserve E3/E6 teaching value and P6/P11 auditability at the cost of corpus growth; (d) keeps discoverability but loses the reasoning; (e) is smallest but triggers G13 (history erased) and violates §6 of `AGENTS.md`.

**O-7 — Representation (options):** (a) status change **plus** bidirectional `supersedes`/`superseded-by` cross-links (fields already exist in D1 §7 — FACT); (b) status change only (one-directional, forward pointer); (c) status change + INDEX-level relation. Trade-off: linkage completeness vs. maintenance burden (each link is two places to keep correct → FM7 exposure).

**O-8 — ID reuse (options):** (a) **never reuse** (standard practice; keeps E4 stable links; matches Exp03 E4); (b) reuse after retirement (keeps numbers small, but breaks old references — E4/G13 risk); (c) per-version IDs (`D1`, `D1.1`). Trade-off: uniqueness vs. readability.

**O-9 — Discoverability of obsolete records (options):** (a) remain in INDEX with explicit `Superseded` status (agent filters by status); (b) move to a separate "historical" section of INDEX; (c) drop from INDEX but file remains (loss of G1 defence — an agent scanning INDEX never learns the ID once existed). Plus, **agent-avoidance rules (options):** (i) rule written into `AGENTS.md` ("follow supersession chains to the tip; never implement `Superseded`") — requires D4-adjacent `AGENTS.md` edit; (ii) rule stated in INDEX only; (iii) leave Exp03 §4.3 step 4 as unwritten practice.

**D-analysis (INTERPRETATION):** the options split along one axis — **preserve history** (a–c in O-6) vs. **minimise artefacts** (d–e). Because this repository is explicitly a *teaching artifact* (§ *Purpose*; Exp03 E1–E8), preservation carries double weight: it serves auditability *and* course material. That is an observation about incentives, not a selection.

**15. RECOMMENDATION (unapproved):**
* **R-D7a:** consider deciding O-8 (ID non-reuse) **early and together with D2's identifier scheme**, because AMB-3 shows the two are entangled and a collision becomes likely at the very next record.
* **R-D7b:** consider whether revisit triggers are even required for D1 now that it has none (ADR §7) — leaving that blank is a live choice, not a neutral default.
* *RECOMMENDATIONS only; no policy adopted; no record altered.*

---

## 7. Git persistence decision

*Special analysis E embedded. **This decision has no existing ID** — see AMB-3 note and item 1 below.*

### Brief

| # | Field | Content |
|---|---|---|
| **1** | **Decision ID / provisional identifier** | **None exists.** Candidates for the human to assign: **(a)** new sequential ID (next free slot in the Exp03 catalog, e.g. `D8` — *the number is not chosen here*); **(b)** map to **Exp02 H10** ("Git workflow: who commits, branch/commit-message style") — related but narrower; **(c)** treat as a sub-question of **D4** (durability of what the pointer targets); **(d)** fold into **D1**'s scope as an implementation detail. **OBSERVATION:** Exp05 MM2 called it "a human decision on version-control/commit policy (Exp02 H10)". **Reporting AMB-4 rather than normalising it.** |
| **2** | **Title** | Version-controlled persistence of decision records (and other untracked project evidence). |
| **3** | **Evidence** | Exp05 FM2: `git ls-files` shows no decision path; `git log -- docs/decisions` empty; both records `??` untracked; **a fresh clone would contain no D1 and no INDEX → that test would have FAILED**; MM2; **FACT (this inspection):** *all* decision records **and every experiment report* are untracked — 12 untracked paths, while only 6 scaffold files are tracked (`.gitignore`, `AGENTS.md`, `INITIAL_PROMPT.md`, `README.md`, `docs/vision.md`, `docs/architecture.md`); HEAD unchanged at `5fd9f54` since 08:31. |
| **4** | **Problem to solve** | Everything of substance produced so far — decisions, analysis, experiment evidence — exists only on this disk. The harness's own §6 ("captured in the repository rather than remaining only in conversation") is satisfied in the weakest sense: files exist, but the project's version history does not contain them, so durability, review, and auditability claims are unmet. |
| **5** | **Why human-owned** | `AGENTS.md` § *Repository Safety* makes commits a human-governed act ("before committing, ensure the diff contains only changes belonging to the current task"); no commit policy exists (Exp02 H10 open); who commits and what enters history is a project-workflow decision, and Exp05's finding alone does not approve any policy. **Classification itself is the decision** (see E-analysis). |
| **6** | **Exact question** | *How should persistence of decision records (and experiment evidence) be classified and handled?* Specifically: **(i)** is version-controlled persistence a **project requirement**, a **harness invariant**, an **implementation convention**, a **one-off human action**, or **something else**? **(ii)** what is the standing commit policy — *who* commits, *when*, and *what scope*? **(iii)** should all 12 untracked paths be committed, or only `docs/decisions/`? |
| **7** | **Constraints from prior decisions** | **D1 (Accepted)** says records live in `docs/decisions/` — it says **nothing about Git** (verified: ADR §3 statement text contains no VCS commitment; INDEX likewise). `AGENTS.md` § *Repository Safety* already presupposes Git (Exp01 C1) and constrains commit hygiene. Task constraint: "Do not stage or commit anything" — so this document cannot test-commit. **FACT:** "Git should contain the decisions" is **not** an approved requirement anywhere. |
| **8** | **Available options** | See P6–P10 (classification) and C1–C4 (action) below. |
| **9** | **Trade-offs** | Per option. |
| **10** | **Consequences** | Per option. |
| **11** | **Unchanged whatever is chosen** | D1 remains Accepted and valid either way; discovery behaviour in *this* working copy is unaffected; no stack implication; the two records' content is identical whether tracked or not; `AGENTS.md` is not modified by this decision alone. |
| **12** | **Future behaviour affected** | Whether a clone can consume decisions at all (Exp05 Q2); whether experiment evidence survives; whether "verification by Git diff" (used in every experiment so far) remains available to future sessions; the credibility of the repository as a durable teaching artifact; recurring risk that FM2 silently reappears for new files. |
| **13** | **Dependencies** | Independent of **D2/D5/D7** (none requires VCS). Reinforced by **D4**: a pointer to untracked files fails in a clone. Interacts with **Exp02 H10** (commit policy) and **Exp02 H8** (experiment conventions — untracked reports). |
| **14** | **Blocks next harness change?** | **Not mechanically** — D4's pointer can be added while records stay untracked. **But** it blocks any claim of *durable* persistence, and Exp05 rated durability a pass-qualifier (Q2). Treat as time-critical rather than strictly blocking. |

**Classification options (E-analysis):**

| # | Classification as… | Trade-off | Consequence if chosen |
|---|---|---|---|
| P6 | **A project requirement** (a normative rule, like R1–R7) | Strongest wording; travels with the project; testable ("are decisions tracked?") | Adds a requirement the project must always satisfy — heavier governance; must be recorded (in `AGENTS.md` or a decision record) |
| P7 | **A harness invariant** (a property the harness must always have, checked per experiment) | Makes durability *checkable* — aligns with §4's verification demand | Implies a verification step each experiment; no checking tooling exists yet |
| P8 | **An implementation convention** (informal practice: "the human commits after each experiment") | Zero ceremony; matches current behaviour (the human has committed twice already) | FM2 recurs whenever a new artifact class is forgotten; nothing prevents drift |
| P9 | **A human decision (one-off action + standing policy)** | Immediate: the current 12 paths become durable; the policy prevents recurrence | Requires an actual commit (human act) plus a written policy — still needs an owner (H10) |
| P10 | **Something else** (e.g. periodic backup, mirror, or treating this as out of scope for the project) | Avoids committing to a governance model now | Leaves FM2 unaddressed; a clone still loses everything |

**Action options (if the human decides persistence matters):**

| # | Action | Trade-off | Consequence |
|---|---|---|---|
| C1 | Commit **all 12 untracked paths** now | Preserves everything; ends FM2 repo-wide | History gains a large batch — requires a commit message and scope judgement under § *Repository Safety* |
| C2 | Commit **only `docs/decisions/`** | Smallest decision-focused step; unblocks decision durability specifically | Experiment evidence stays untracked → FM2 persists for reports (a known, separate gap) |
| C3 | Commit decisions + reports, leave prompt files | Keeps instruction clutter out of history | Prompt files are evidence too (Exp04 has no report — its prompt file is the only trail) |
| C4 | Do nothing now | No risk of an unwanted commit; no change | FM2 and its Exp05 Q2 qualification remain live |

**INTERPRETATION:** the classification question (i) is *prior* to the action question (iii): committing without deciding what persistence *is* would produce exactly the silent convention that Evidence-9/10 warns against — a decision the harness does not know it has (Exp05 O6). Conversely, classifying it as a requirement without ever committing would create a rule the repository demonstrably violates today.

**15. RECOMMENDATION (unapproved):**
* **R-GITa:** consider answering (i) and (ii) together, because "what is it?" without "who does it, when?" recreates Exp02 H10's open question.
* **R-GITb:** consider treating the currently-untracked experiment reports as part of the same decision rather than a follow-up, since Exp04's only trail is a prompt file.
* *RECOMMENDATIONS only. **Nothing has been staged or committed;** the fact that Git already exists does not approve any of the above (explicitly per Section E).*

---

## 8. Decision dependencies

**FACT — dependency relations implied by the briefs above (arrows read "must be settled before"):**

```text
D1 (Accepted, recorded) ──► D2 information model ──► D5 governance (statuses to transition between)
                                 │                        │
                                 ├────────► D7 (fields, ID non-reuse, status semantics)
                                 │                        │
                                 └────────► AMB-2 (ID scheme lives in D2? or D7? — unresolved)

D4 discovery + precedence  ── independent of D2/D5/D7 ── needs only: what it points to (D1 ✓)
                                 │
                                 └── strengthens: durability of target = Git persistence

Git persistence ── independent of D2/D5/D7 ── reinforced by D4 (pointer must target durable files)
                └── overlaps Exp02 H10 (commit policy) and H8 (experiment conventions)
```

| Decision | Depends on | Is depended on by | Overlaps / entangled with |
|---|---|---|---|
| **D2** (info model) | D1 ✓ | D5, D7 | **AMB-2** with D7 (ID scheme, file naming) |
| **D4** (discovery + precedence) | D1 ✓ | everything's discoverability | Exp03 D3 (AMB-1); `AGENTS.md` edit shared with any other harness rule |
| **D5** (governance) | D2 (vocabulary) — *partial only* | D7 (who supersedes); index ownership (ADR A7) | §7 Git (who commits = who makes durable) |
| **D7** (retention/supersession) | D2 (statuses, IDs), D5 (who may supersede) | future agents' consumption safety | **AMB-2** with D2 |
| **Git persistence** | nothing (standalone) | D4's durability; Exp05 Q2 verdict | Exp02 H10, H8 |

**OBSERVATION:** D4 and Git persistence have no upstream dependencies — both can be decided immediately. D5's full answer needs D2; D7 needs both. **INTERPRETATION:** the dependency graph is shallow but has two independent entry points (the *authority* track: D4 + Git; the *format* track: D2 → D5 → D7).

---

## 9. Minimum decision set required before harness repair

**FACT — "harness repair" is not a defined term in this repository.** For this section it means: *any change to harness rules or decision-store scaffolding* — adding a discovery pointer, writing a template, adding an index-maintenance rule, committing records. No such repair has been made.

**FACT — what each candidate repair actually needs:**

| Candidate repair | Strictly requires | Recommended to have first |
|---|---|---|
| Add a discovery pointer (Exp05 MM1) | **D4(i)** pointer location + wording | D4(ii) precedence, so the pointer's authority is defined (RECOMMENDATION) |
| Commit decision records (Exp05 MM2) | **Git persistence** classification (i)+(ii) | C1–C3 scope choice (which files) |
| Write a record template (Exp05 MM5/MM3) | **D2** (a)–(e) | D5, so the template's authority fields are answerable |
| Change any record's status | **D2** vocabulary + **D5** transition rights | — |
| Supersede anything | **D7** + **D5** + **D2** | — |
| Next *recorded decision* (record N+1) | **D2** + **D5** | Git persistence (else it too is untracked) |

**INTERPRETATION — minimum sets, by goal:**

* **Minimum to perform any single harness repair:** one decision — the one governing that repair. There is no global prerequisite set; that is the main structural finding of this section.
* **Minimum to repair *safely* (my reading of the evidence, RECOMMENDATION):** **D4 + Git persistence**, because those two convert "a record exists on one disk, findable by search" into "a durable record, findable by rule" — closing Exp05's two pass-qualifiers (Q1, Q2) at once.
* **Minimum before writing record N+1:** **D2 + D5** (schema and write authority), otherwise FM5/FM6 recur immediately.

**RECOMMENDATION (unapproved):** consider deciding in the order *Git persistence → D4 → D2+D5 → D7*, on the grounds that the first two fix the failures already demonstrated twice, while D7 has no live trigger yet. This is a sequencing suggestion only; each row remains an open human decision.

---

## 10. Harness observations

* **O1 — The pipeline works end-to-end without a requirement being invented.** *FACT:* this document produced five briefs from three experiments' evidence while making zero decisions; no option table has a selection; every RECOMMENDATION is explicitly marked unapproved. *INTERPRETATION:* the Fact/Observation/Interpretation/Recommendation discipline is not decorative here — it is the mechanism that keeps a *decision brief* from becoming a *requirement* (the exact G2/G7 failure Exp03 warned about).
* **O2 — The decision catalogue has drifted between documents.** *FACT:* AMB-1 (D3 vs D4 conflation), AMB-2 (ID scheme attributed to D2 by this task, D7 by Exp03 §13, "D2/D7" by the ADR), AMB-3 (two ID spaces), AMB-4 (Git decision has no ID at all). *OBSERVATION:* four identifier conflicts across four documents, none previously reported. *INTERPRETATION:* identifier discipline was itself left undecided, so the catalogue of undecided things is now ambiguous about its own members — a bootstrap problem that D2/D7 must fix before record N+1.
* **O3 — Evidence 3/4 is repo-wide, not decisions-only.** *FACT:* all experiment reports are untracked too; only 6 scaffold files are tracked; HEAD has not moved since 08:31. *OBSERVATION:* the durability gap covers the entire evidence chain of Experiments 01–05. *INTERPRETATION:* a clone today loses the whole experimental record, which weakens the "living example" claim in `AGENTS.md` § *Purpose* more than it weakens any single decision.
* **O4 — D1's field list is more authoritative than it looks.** *FACT:* the 11 required fields came from the human's Exp04 instruction, not from Exp03's analysis. *INTERPRETATION:* D2 is smaller than Exp03 assumed — much of the information model already exists as one-off human specification awaiting ratification, so D2 is substantially a *ratify-or-adjust* question rather than a *design-from-zero* question.
* **O5 — Experiment 04 is undocumented as an experiment.** *FACT:* no `experiments/04-*.md` exists; its only narrative trail is `experiment-4-prompt.md` (prompt + appended response). *OBSERVATION:* Exp02's open decision H8 (experiment conventions) continues to be informally resolved and unrecorded — the third experiment in a row showing convention drift.
* **O6 — The mechanism self-documents its gaps.** *FACT:* the ADR lists A1–A7; INDEX states there is no pointer. *INTERPRETATION:* the record format's honesty about its own incompleteness is what made these briefs possible — an unusual and useful property worth preserving in any D2 schema.
* **O7 — Every gap maps to an existing open decision ID — except one.** *FACT:* D2/D4(+D3)/D5/D7 cover eight of the nine gaps; Git persistence had no ID (AMB-4). *OBSERVATION:* Exp02 H10 existed but was scoped to "who commits/branch style", not to persistence classification. *INTERPRETATION:* decision catalogues decay as evidence accumulates; catalogues need a periodic reconciliation step (an unowned idea — flagged, not proposed as required).

---

## 11. Result

# **PASSED WITH QUALIFICATIONS**

**FACT — the success criterion stated by the task:** *"produces precise, decision-ready briefs without silently turning agent analysis into project requirements."*

**Why it PASSED (evidence):**

| Criterion | Evidence |
|---|---|
| Exactly the required structure | 13 major sections, in the specified order |
| Five decision briefs with all 15 fields | D2 (§3), D4 (§4), D5 (§5), D7 (§6), Git persistence (§7) — each numbered 1–15 |
| Special analyses A–E delivered | A→§3 field tables + FACT/PROPOSED split; B→§4 pointer/precedence/fail-safe options + authority sources; C→§5 G1–G4 permission matrix; D→§6 O-6…O-9 + agent-avoidance; E→§7 P6–P10 classification + C1–C4 actions |
| No decision made | No option selected anywhere; no status changed; no record created; `AGENTS.md` untouched |
| No implementation | No ADR, template, pointer, index rule, staging, or commit |
| Recommendations stay recommendations | Every RECOMMENDATION carries "unapproved"/"not approved"; see Verification item 10 |
| Ambiguities reported, not normalised | AMB-1…AMB-4 in §2.3, expanded in §4, §6, §7 |
| Evidence treated as evidence | §2.2 marks all 12 items as evidence, not approved requirements |

**Why NOT plain PASSED (the qualifications):**

* **Q1 — option lists are agent-generated and may be incomplete.** Completeness of the alternatives for each brief cannot be verified by the agent that wrote them; the human may know of options that are absent.
* **Q2 — granularity of the exact questions is agent-shaped.** D2's question bundles five sub-decisions; D4's bundles three. Whether these should be split or merged is itself left open (AMB-1, §3 item 6).
* **Q3 — identifier conflicts remain unresolved by design.** AMB-1…AMB-4 are reported, not fixed; a reader must not mistake the *labels used in this document* for settled IDs.
* **Q4 — dependencies and minimum sets are interpretation.** §8/§9 derive from evidence but are the agent's reading; they are analysis, not established project structure.

**Why NOT FAILED:** every required section, field, label, and analysis is present; nothing was implemented or decided; protected files verified byte-identical; and each brief is answerable by a human without consulting the underlying experiment reports.

**INTERPRETATION:** the test's real measure — whether analysis could be converted into decision-ready form *without* the conversion itself becoming requirement — was met, and was met specifically because the labels were applied to carry load (FACT vs PROPOSED per element) rather than as headings.

---

## 12. Lessons learned

*INTERPRETATIONS; none is a decision.*

1. **A decision catalogue needs identifier discipline before it needs more members.** Four ID ambiguities (AMB-1…4) now make the list of open decisions partly ambiguous about itself — the governance system's first bootstrap problem.
2. **Evidence and requirement are separated by labelling work, not labelling intent.** The 12 evidence items were supplied *as* facts by the task; treating them as unapproved inputs (§2.2) is what kept them from becoming requirements through repetition.
3. **The most valuable finding of a specification exercise is often which question has no ID.** Git persistence had no home in any catalogue until this experiment forced it into a brief — unowned decisions are invisible in a list of owned ones.
4. **Some "design" questions are really ratification questions.** D2's field set already exists as a human instruction from Exp04; recognising that shrinks the decision and reduces the chance of the agent inventing structure the human had already chosen.
5. **Dependency graphs tell you where the cheap decisions are.** D4 and Git persistence have no upstream dependencies and fix demonstrated failures — while D7, though cheap, has no live trigger; sequencing is a human choice, but the evidence for it is now visible in one page.
6. **Self-documenting gaps compound into useful analysis.** The ADR's A1–A7 and INDEX's own "no pointer" note were the raw material for these briefs — records that admit what they lack make subsequent work cheaper.
7. **Convention drift is now measurable across experiments.** H8 remains open while practice evolves unrecorded (no Exp04 report, mixed prompt naming) — the same class of failure D1 was created to fix, occurring *around* the mechanism rather than inside it.
8. **Preparing a decision boundary and crossing it produce opposite artefacts.** This document's value would be destroyed by implementing any part of it; that is why the constraints (no template, no pointer, no stage) were treated as the experiment, not as obstacles to it.

---

## 13. Human decisions required

**FACT — nothing below was decided, approved, or assumed by this document.** Each row is an open decision awaiting the human project owner.

| Provisional ID | Title | Status here | Notes |
|---|---|---|---|
| **D2** | Information model: identifiers, file naming, status vocabulary, required/optional fields, authority metadata | **OPEN** — brief at §3 | AMB-2: may be split into 5 sub-decisions; ID-scheme home disputed with D7 |
| **D4** *(this task's label)* = **Exp03 D3 + D4** | Discovery pointer + precedence rule + fail-safe default | **OPEN** — brief at §4 | AMB-1: combined or separate is the human's call; requires `AGENTS.md` edit |
| **D5** | Write/transition governance: propose, record, transition, supersede, correct, index | **OPEN** — brief at §5 | Models G1–G4 offered; none selected |
| **D7** | Retention and supersession: fate of old ADRs, representation, ID reuse, discoverability | **OPEN** — brief at §6 | AMB-2 overlap with D2; no live trigger yet |
| **PROV-GIT** *(no existing ID)* | Version-controlled persistence: classification + commit policy + scope | **OPEN** — brief at §7 | AMB-4: assign new ID, map to Exp02 H10, D4, or D1-scope |
| Exp03 **D6** | Backfill scope (whether Exp02's H1–H14 become records) | **OPEN — out of scope here** | Not part of this task's focus; listed so it is not forgotten |
| Exp02 **H8 / H10** | Experiment conventions / commit-and-branch workflow | **OPEN — adjacent** | Overlap with §7 and Exp05 FM11/FM12 |

**RECOMMENDATIONS (all unapproved, listed for evaluation only):**

* **R-D2a/b/c**, **R-D4a/b**, **R-D5a/b**, **R-D7a/b**, **R-GITa/b** as stated in §3–§7.
* **R-MIN:** consider the sequencing in §9 (Git persistence → D4 → D2+D5 → D7).
* *No recommendation above has been accepted by anyone. Their presence in this document creates no obligation.*

---

## Verification

**FACT — performed after writing this file:**

1. **`git status --short --untracked-files=all` inspected:** exactly one new path attributable to this task (`experiments/06-decision-specification.md`); all other paths pre-existing.
2. **`git diff`** (unstaged) and **`git diff --cached`** (staged) inspected → both empty; **`git ls-files -m`** empty → **no existing file modified**.
3. **Exactly one new file created by me:** `experiments/06-decision-specification.md`.
4. **No existing file modified:** all pre-task MD5 values re-verified identical (AGENTS.md `7355a77e…`, D1 ADR `5f9deeb4…`, INDEX `f5d34b46…`, reports `2e3b7abaf…`/`903b0565…`/`d58367e0…`/`6faa8e1e…`, all prompt files).
5. **D1 ADR and INDEX byte-for-byte unchanged:** `5f9deeb4f359a62eda03872b875edc7e` (12,651 B, mtime 14:47:00) and `f5d34b46685b37457d2393e1dbab2d96` (3,437 B, mtime 14:47:24).
6. **`AGENTS.md` unchanged:** `7355a77e1659ac5dbeaf43d5e74d1992`, 7,099 B, 292 lines, mtime 08:00:08.
7. **No application code** created or modified — repository contains only Markdown plus `.gitignore`.
8. **No Git commit, staging, or push:** HEAD `5fd9f54`, log still 2 commits, `git stash list` empty, `.git/index` and `.git/refs/heads/main` mtimes unchanged.
9. **Ambiguities reported:** **AMB-1** (task's "D4" conflates Exp03 D3+D4), **AMB-2** (ID scheme/file naming attributed to D2 by this task, D7 by Exp03 §13, "D2/D7" by ADR A2), **AMB-3** (two unreconciled ID spaces `D1` vs `0001`), **AMB-4** (Git persistence decision has no existing ID; candidates listed in §7 item 1). Plus terminology notes: status vocabulary (`Accepted` vs `open`/`decided`/`superseded`) and the H/D catalog overlap — all reported in §2.3, none normalised.
10. **Every recommendation confirmed unapproved:** RECOMMENDATION blocks appear only in §3 (R-D2a/b/c), §4 (R-D4a/b), §5 (R-D5a/b), §6 (R-D7a/b), §7 (R-GITa/b), §9 (R-MIN), §13 (aggregate) — each explicitly labelled "unapproved" / "not approved" / "RECOMMENDATIONS only", with in-line statements that no schema, pointer, governance model, retention policy, persistence classification, or sequencing is in force. No recommendation is phrased as a decision, requirement, or rule.

**Not done, by instruction:** no decisions made; no ADRs created; no D1 or INDEX modification; no `AGENTS.md` modification; no template; no discovery pointer; no staging or commit; no application code; no technology stack selection; no implementation of any recommendation.

