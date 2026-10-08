# Experiment 03 — Decision Closure Analysis

* Date: 2026-10-06
* Status: completed (analysis only; no mechanism selected, no decision recorded or closed)
* Scope: how human decisions should be recorded and made consumable by future agent sessions
* File created: `experiments/03-decision-closure-analysis.md` (this document)

**Label legend** (applied to every substantive statement):

* **Fact** — directly observed in the repository, in `AGENTS.md`, or in the session record.
* **Observation** — a fact plus its immediate, minimal significance.
* **Interpretation** — an inference beyond the observed data.
* **Recommendation** — a proposal for the human to evaluate. Recommendations are never decisions and decide nothing.

**Standing disclaimer:** no mechanism is chosen here. Candidate mechanisms in §5 and §6 are alternatives presented for evaluation. Nothing in this document is, or becomes, a recorded decision.

---

## 1. Objective

**Fact — what this experiment was intended to test:**

1. Whether the harness problem identified across Experiments 01–02 — *"decisions can be surfaced and analyzed, but never formally closed and handed to future sessions"* — can be analyzed to a decision-ready specification **without selecting the solution**.
2. What minimum information a recorded decision must carry to be reliably consumable (question 1 of the task).
3. What must be excluded from a decision record so that observations, requirements, results, options, and assumptions are not silently promoted into decisions (question 2).
4. How a future agent can classify the six record kinds — active, resolved, obsolete, observation, requirement, experiment result — using unambiguous signals (question 3).
5. The risks of the two failure extremes: conversation-only decisions, and incorrectly recorded decisions (questions 4–5).
6. What mechanisms could close a decision, with their trade-offs (questions 6–7), what the minimum viable mechanism would be (question 8), what properties a long-lived educational example demands (question 9), and how a future agent would discover and consume records (question 10).

**Interpretation:** Experiments 01 and 02 established that the harness can *open* gates and *analyze* decisions. This experiment examines the missing closing half of that loop, consistent with `AGENTS.md` § *Learning From Failures* ("improve the harness rather than repeatedly correcting the same class of mistake").

---

## 2. Problem statement

### 2.1 Facts

**Fact:**

* `AGENTS.md` § *Documentation is part of the system* requires that "important decisions, discoveries and lessons should be captured in the repository rather than remaining only in conversation."
* `docs/decisions/` exists as an **empty directory** (created 2026-10-06 07:56:02); no file, template, naming rule, or status vocabulary is defined for it anywhere.
* Nothing in `AGENTS.md` states where a decision is recorded, what a record contains, who may write one, what statuses exist, or how a later session should find and apply them.
* Experiment 01 ended with 10 follow-up decisions listed only in a report; Experiment 02 ended with 14 human-owned decisions (H1–H14) analyzed but all still open; Experiment 01's results themselves existed only in conversation until the human pasted them into `experiments/experiment-01-prompt.md` (2,198 → 5,584 bytes, 08:52).
* Three experiments have now reached a point where a human answer is needed, and in all three cases there was **no defined place to put the answer**.

### 2.2 The problem

**Interpretation (the problem under investigation, as stated by the task):**

> The current harness can identify unresolved decisions and can analyze them without making them, but there is no defined mechanism for formally closing a human decision and making the resulting decision reliably consumable by future agent sessions.

Decay of the loop as observed:

```text
Understand → Inspect → Identify decisions → Analyze → [HUMAN GATE] → ??? → Implement → Verify → Document
                                                          │
                                                          └─ no receiving mechanism: the answer has
                                                             nowhere durable to live, so a future session
                                                             cannot distinguish "decided" from "undecided"
```

**Observation:** the break sits precisely between the gate and implementation. Every later stage (`Implement`, `Verify`, `Document`) depends on knowing what was decided.

**Interpretation:** the problem is not that decisions are hard to *make*, but that closure has three unimplemented parts — **capture** (durability), **classification** (status semantics), and **discovery** (a future session's lookup path). Sections 3–9 treat those three parts.

---

## 3. Required properties

**Fact — properties derived from `AGENTS.md` and from what Experiments 01–02 demonstrated a future session needs.** These describe a mechanism's requirements, not a chosen mechanism.

| # | Property | Why it is required (source) |
|---|---|---|
| P1 | **Durable** — lives in the repository, survives the session that created it | `AGENTS.md` § *Documentation is part of the system*; Experiment 01 Q2 showed conversation-only results are lost |
| P2 | **Discoverable** — a fresh session finds it by a documented, cheap lookup | Experiment 02 §5: an agent only reliably follows steps that are cheap and documented |
| P3 | **Structured** — stable fields and a controlled status vocabulary, not free-form narrative alone | Question 1: an agent must extract a decision programmatically and unambiguously |
| P4 | **Unambiguous status semantics** — exactly one meaning per status, with a defined writer for each | Question 3; `AGENTS.md` § 1 forbids assumption drift |
| P5 | **Attributable** — records *who* decided, and distinguishes human decisions from agent analysis | `AGENTS.md` § 7 (human owns product decisions); § 1 (agent assumptions are not requirements) |
| P6 | **Dated and supersession-aware** — decision date, status-change date, `supersedes`/`superseded-by` links | `AGENTS.md` § *Current Project Status* (the harness is expected to evolve) |
| P7 | **Traceable** — links to the analysis that informed it (e.g. Experiment 02 §4 H-codes) | `AGENTS.md` § *Communication* (report reasoning, distinguish facts from assumptions) |
| P8 | **Scope-bounded** — states what it covers **and what it explicitly does not cover** | Prevents both over-application and re-litigation (§8.2) |
| P9 | **Consequential** — records what changes as a result, and what is now excluded | `AGENTS.md` § *Dependency and Technology Decisions* requires trade-offs be explained |
| P10 | **Single canonical copy** — one authoritative location, no divergent duplicates | Two copies that disagree are worse than one copy that is absent (§8.2) |
| P11 | **Reviewable in diff** — record changes are visible and attributable in Git review | `AGENTS.md` § *Repository Safety* (commits must be inspectable) |
| P12 | **Authoritative-by-approval** — a record binds implementation only if a human approved it | `AGENTS.md` § 7 |
| P13 | **Fail-safe default** — absent, stale, or ambiguous record ⇒ *not decided* ⇒ stop and ask | `AGENTS.md` § 1 ("stop and ask"; "do not proceed by inventing the missing requirement") |
| P14 | **Self-describing** — legible to a human reader without needing to reconstruct session history | Project goal: "a reliable, understandable and inspectable example" (`AGENTS.md` § *Purpose*) |

### 3.1 Additional properties for a long-lived educational example (question 9)

**Fact — `AGENTS.md` § *Purpose* states the repository is both a software project and "a living example of the engineering practices taught by the project", and must remain "reliable, understandable and inspectable".**

**Interpretation — a long-lived teaching artifact adds these requirements:**

| # | Property | Reasoning |
|---|---|---|
| E1 | **Minimal tooling surface** — plain text/Markdown readable in any editor and on any host | A mechanism requiring specific software will break or be unreadable in several years; the audience is learners, not operations |
| E2 | **Human-legible first, machine-consumable second** — a learner reading one file should understand the practice | The records *are* course content; a format only an LLM can parse teaches nothing |
| E3 | **Diff-able and cheap to review** — every change tells a story in review | Demonstrates review practice to readers; also serves P11 |
| E4 | **Stable identifiers and paths** — IDs and filenames do not churn | Educational references, links, and future sessions must not break when prose is edited |
| E5 | **No service lock-in or external dependency for correctness** — the repository must be understandable offline | `AGENTS.md` § *Dependency and Technology Decisions*; also survivability of the example |
| E6 | **Demonstrable by example** — the first few real records must be readable as a worked demonstration | The practice being taught has to be visible in the artifact itself |
| E7 | **Low ceremony per record** — recording must stay cheaper than not recording | High ceremony produces lagging records, i.e. documentation that lies (P10's opposite) |
| E8 | **Graceful degradation** — if tooling disappears, the records still function as prose | Longevity insurance |

**Observation:** E1–E8 and P1–P14 overlap heavily. **Interpretation:** mechanisms that serve agents (structure, statuses, cheap discovery) are the same mechanisms that serve learners (legibility, low tooling, diffs) — the educational and operational requirements converge rather than conflict.

---

## 4. Information model

### 4.1 What a recorded decision must contain (question 1)

**Fact — required for an agent to use a decision without re-asking the human.** The fields are mechanism-neutral: they must exist *somewhere*, not necessarily as a schema.

**Core (blocking) fields:**

1. **Identifier** — unique, stable, never reused (e.g. `DEC-0001` or a fixed slug).
2. **Title / subject** — what is being decided, in noun form.
3. **Status** — from a controlled vocabulary (see §4.3).
4. **Decision statement** — the choice in exact, implementable terms; specific enough that a future agent can act and can *check* conformance. ("Stack is X" is usable; "a modern framework" is not.)
5. **Decided by** — human attribution (name/role). *No record binds implementation without this.*
6. **Decided on** — date (and date of any status change).
7. **Scope** — what the decision applies to, and an explicit non-scope line.
8. **Supersedes / superseded-by** — links forming an unbroken chain (empty if none).

**Supporting fields:**

9. **Rationale** — why this option won, briefly.
10. **Source analysis** — link to the informing material (e.g. `experiments/02-decision-analysis.md` §4 H4).
11. **Consequences** — what now changes, what is now excluded (P9).
12. **Revisit conditions** — premises whose failure reopens the decision (e.g. "revisit if scope changes").
13. **Enforcement / verification hook** — how compliance is checked at completion (feeds `AGENTS.md` § 4).
14. **Affected work items** — which increment/experiment it constrains.

**Observation:** field 5 (attribution) plus field 3 (status) are what separate a *decision* from a *suggestion*; fields 4, 7, and 8 are what make it *usable* rather than merely *knowable*.

### 4.2 What must NOT be recorded as if it were a decision (question 2)

**Fact — the following are different kinds of information; presenting any of them as a decision would violate `AGENTS.md` § 1:**

| Excluded item | Correct treatment instead |
|---|---|
| Agent recommendations and presented options (Experiment 02 §4/§6) | Analysis, kept with their experiment or attached to an *open* item as decision briefs |
| Repository facts and observations (checksums, mtimes, states) | Observations in experiment reports |
| Requirements (R1–R7 from `AGENTS.md`; the human's task instructions) | Requirements — they bind already, without being "decided" |
| Experiment results and harness findings (O1–O8, L1–L8) | Experiment reports; they *inform* decisions but decide nothing |
| Open questions awaiting an answer | An `open` status item, never a resolved record |
| Assumptions and provisional defaults — e.g. `.gitignore` implying `node_modules/`, `dist/`, `build/` with no stack decision | Recorded explicitly as an assumption or flagged mismatch (Experiment 02 A8/H14) |
| Hypothetical human preferences ("I'd probably prefer X") | Not recordable until the human confirms at a gate |
| Derived/computable content (a file list, a status index regenerated by tooling) | Generated on demand, not stored as authoritative |
| **Secrets, credentials, tokens, personal data** | Never recorded; `.gitignore` already excludes `.env*` |
| Superseded text left in an active record | Moved into history with a supersession link (P6) |
| Anything the agent decided unilaterally | An assumption, clearly labelled — never a resolved record |

**Observation (the sharpest example in this repository):** `docs/decisions/` is an **empty directory**. It looks like an adopted convention, but no decision created it in any recorded form. **Interpretation:** treating the directory's existence as evidence that a mechanism was chosen would be exactly the assumption-drift failure `AGENTS.md` § 1 forbids — presence of a path is a fact, not a decision.

### 4.3 Distinguishing the six record kinds (question 3)

**Fact — candidate classification signals, stated so a future agent can apply them mechanically:**

| Kind | Normative modality | Status | Who writes it | Binding on implementation? | Location convention (candidate) | Example already in repo |
|---|---|---|---|---|---|---|
| **Active (open) decision** | "must be decided" / question form | `open` | Agent may draft; only human moves it to `decided` | No — blocks, never authorizes | Decision store, open section | Experiment 02 H1–H14 |
| **Resolved decision** | "is / will be" + approval + date | `decided` | Human (or human-approved record) | **Yes** | Decision store | *none yet* |
| **Obsolete decision** | "was / formerly" + pointer | `superseded` / `rejected` | Human, via supersession | **No — must never be implemented** | Decision store, history | *none yet* |
| **Observation** | "is / was" (descriptive, no obligation) | n/a | Agent | No | `experiments/*.md` reports | Experiment 01 §3.1 |
| **Requirement** | "must / shall" (normative, pre-existing authority) | n/a | Human (this project) | **Yes** | `AGENTS.md`, human task prompts | R1–R7 |
| **Experiment result** | "occurred / produced" (evidence, dated, session-scoped) | n/a | Agent | No — informs, never authorizes | `experiments/NN-*.md` | Experiment 02 §10 |

**Interpretation — the decision procedure a future agent should apply (a recommendation for the human to evaluate, not a rule in force):**

1. **Read the status field first**, then the location, then the modality. A controlled vocabulary (P3/P4) means status alone is normally sufficient.
2. **Test attribution before authority:** a record without human attribution is never `decided`, whatever it is called.
3. **Apply precedence when sources disagree:** `AGENTS.md` (requirements) → resolved decisions → analysis/options → observations and experiment results. *This precedence rule does not exist today and would need to be added to `AGENTS.md` — a human decision (§13, D3).*
4. **Follow supersession chains to the tip**; if any link is broken or unclear, the record is not usable.
5. **Default to "not decided"** whenever status, scope, or attribution is ambiguous (P13) — then stop and ask.

**Observation:** items 1, 2, 4 and 5 are mechanically checkable; item 3 requires a written rule that does not yet exist. **Interpretation:** until precedence is documented, two individually unambiguous records can still produce conflicting instructions with no way to arbitrate — an ambiguity that cannot be fixed by better record format alone.

---

## 5. Candidate mechanisms

**Fact — alternatives identified for supporting decision closure. None is selected; each is stated with what it would look like here.**

| ID | Mechanism | Shape |
|---|---|---|
| **M1** | **Single append-only decision log** | One file (e.g. `docs/decisions.md` or `docs/decisions/README.md`) holding a chronological list of entries with status labels |
| **M2** | **One file per decision, fixed template (ADR-style)** | `docs/decisions/NNNN-slug.md`, each with the §4.1 fields; statuses inside each file |
| **M3** | **M2 plus a machine-readable index** | Per-decision files *and* a small manifest/index (e.g. `docs/decisions/index.md`) listing ID, status, title, date for fast discovery |
| **M4** | **Single machine-readable registry** | One structured file (YAML/JSON) as the source of truth; prose rendering optional |
| **M5** | **Decisions colocated with the experiment that surfaced them** | Closure recorded inside `experiments/NN-*.md` (current de facto practice for findings) |
| **M6** | **Decisions recorded in `AGENTS.md` itself** | Append resolved decisions to the instruction file, alongside the principles |
| **M7** | **Git-native closure** | The decision *is* a commit message, tag, or merge; discovery via `git log` / `git show` |
| **M8** | **External system** | GitHub Issues/Projects, wiki, or hosted docs; repository holds only a link |

**Observation:** `docs/decisions/` already exists empty, which is the natural home for M1–M4 — but its existence is a fact, not an adopted decision (§4.2).

---

## 6. Trade-offs

**Fact — comparison of the candidates against the properties in §3 and the educational properties in §3.1.** "Strong / Partial / Weak" are interpretations.

| Mechanism | P2 discoverability | P3 structure | P10 single copy | P11 diff review | E1/E2 tooling & legibility | Main strength | Main weakness |
|---|---|---|---|---|---|---|---|
| **M1 log** | Partial — one place, but grows unbounded | Weak — fields live in prose | Strong | Strong (append-only) | Strong — trivially readable | Cheapest to start; one file to read | Status/ID discipline depends on prose care; concurrent edits collide; hard to query at scale |
| **M2 per-file ADR** | Partial — needs a directory listing rule | Strong | Strong | Strong — one decision per diff | Strong | Clear lifecycle per record; scales; matches learner expectations | Requires a template + naming rule to be defined first; N files to scan |
| **M3 ADR + index** | **Strong** — index gives O(1) discovery | Strong | **Partial** — index can drift from files | Strong | Partial — two things to maintain | Fastest, unambiguous discovery for agents | Index/file divergence is a new failure mode unless the index is derived or checked |
| **M4 registry** | Strong | **Strong** — schema-enforceable | Strong | Partial — one hot file, merge-prone | **Weak** — least legible for learners; needs tooling | Machine-checkable; cheapest for an agent to parse | Poor as teaching material; hand-editing errors; E2/E8 at risk |
| **M5 in experiments** | Weak — scattered | Partial | **Weak — duplicates the analysis it rests on** | Strong | Strong | Zero new structure; context-rich | Violates P10 and P7 (record and its analysis entangle); decisions become hard to enumerate; already showing this strain |
| **M6 in `AGENTS.md`** | **Strong** — agents read it first | Partial | Weak — mixes principles with state | Strong | Partial — bloats the instruction file | Guaranteed to be read | Separation-of-concerns failure: harness rules and project state evolve at different rates; length erodes instruction adherence |
| **M7 Git-native** | Weak — discovery requires archaeology | Weak | Strong | Strong | Weak — unreadable to learners without Git fluency | Free, immutable, already in place | Message prose is not a record; amends/rebases rewrite "decisions"; E2 fails badly |
| **M8 external** | Weak — outside the repo | Partial | Weak — two sources of truth | Weak | **Weak — fails E5 (offline) and P1** | Rich workflow/notifications | Lock-in, access requirements, breaks the "repository is the example" premise |

**Interpretation — the recurring trade-off axes (no axis is resolved here):**

1. **Simplicity of start vs. strength of structure** — M1 is nearly free; M3/M4 buy machine-checkability with maintenance cost.
2. **Human legibility vs. machine parseability** — the two properties the project needs *simultaneously* (E2 vs P3); M4 and M8 sit at opposite ends.
3. **Colocation vs. central authority** — M5 keeps context but fragments enumeration; M1–M3 centralize but separate a decision from the reasoning that produced it (mitigated by P7 links).
4. **Zero new tooling vs. checkability** — M1/M2/M7 need no tooling; M3/M4 enable automated validation that `AGENTS.md` § 4 would eventually want.
5. **Durability vs. convenience** — in-repo (M1–M7) survives and forks cleanly; external (M8) is convenient but violates P1/E5.
6. **Rigidity vs. drift resistance** — a strict template prevents ambiguity (§8.2) but raises E7 ceremony cost; loose prose is quick but is where ambiguous statuses breed.

**Recommendation (explicitly an option, not a decision):** combinations are possible — e.g. M2 for records with M3-style indexing derived from them, or M1 as a bootstrap that migrates to M2. Whether to combine, and which combination, is a human decision (§13, D1).

---

## 7. Agent consumption model (question 10)

**Interpretation — a candidate consumption procedure for a future session, offered for evaluation. It assumes a discovery pointer exists in `AGENTS.md`, which today it does not (§13, D3/D4).**

### Phase A — Discovery (start of task, before planning)

1. Read `AGENTS.md`; follow its documented pointer to the decision store (**P2**).
2. Enumerate records cheaply: list the store; read the index/manifest if one exists (M3) or glob `docs/decisions/*.md` (M2) or read the single log (M1).
3. Filter to `status = decided` **and** scope covering the task at hand.
4. **Fail-safe:** if no pointer exists, or the store is empty or unreadable, treat *every* decision as unclosed and proceed only to the analysis stage, then ask (P13).

### Phase B — Validation (before committing to a plan)

5. Verify human attribution on each candidate record (§4.3 step 2).
6. Follow `superseded-by` chains to the current tip; discard stale records (§4.3 step 4).
7. Check records against each other and against `AGENTS.md` for conflicts; with no documented precedence rule (§4.3 step 3), conflicts ⇒ stop and ask.
8. Check `revisit conditions` against current repository facts; a triggered condition demotes the record to `open`.

### Phase C — Consumption (during planning)

9. Convert each applicable decision into an explicit **task constraint** and cite it in the plan ("constrained by DEC-0004") so the human can verify the agent's reading.
10. Carry unresolved questions forward as `open` items — never as assumptions.

### Phase D — Closure (at the human gate)

11. On receiving a human answer, **write the record first** (fields §4.1), then implement. Rationale: a decision implemented before it is recorded is a decision that exists only in a diff.

### Phase E — Verification and maintenance (at completion, and after)

12. At completion, verify conformance against the cited records — this gives `AGENTS.md` § 4 a concrete mechanism to test (Experiment 01 L5).
13. When premises change, mark superseded rather than deleting; never silently edit a `decided` record's substance (**P6**, **E4**).

**Observation:** every phase is cheap — a handful of reads plus one write at the gate. **Interpretation:** consumption cost is the main adoption risk; the moment discovery takes more than a few commands (M5, M7, M8), sessions will skip it, which is the same adoption insight Experiment 02 recorded for gate triggers (O1 there): agents follow what is cheap and documented.

---

## 8. Failure modes

### 8.1 Risks if decisions remain only in conversation (question 4)

| # | Risk | Evidence or reasoning |
|---|---|---|
| F1 | **Session amnesia** — a new session starts with no decisions and re-asks or, worse, re-decides | **Fact:** all three experiments restated constraints from scratch; conversations are not carried between sessions |
| F2 | **Loss of prior results** — analysis disappears entirely | **Fact/near-miss:** Experiment 01's results existed only in conversation until the human manually pasted them into `experiment-01-prompt.md` at 08:52 |
| F3 | **Cross-session divergence** — two sessions can act on different "decisions" with no way to detect the conflict | Interpretation; no canonical copy exists (P10 violated by absence) |
| F4 | **Silent assumption drift** — the agent fills gaps with reasonable inventions | `AGENTS.md` § 1's named failure mode; Experiment 01 R-a |
| F5 | **Unverifiable compliance** — nothing can be checked at verification time if the constraint is not written | `AGENTS.md` § 4 requires evidence; a remembered constraint yields none |
| F6 | **No audit trail** — the "inspectable example" goal cannot be demonstrated | `AGENTS.md` § *Purpose*; readers cannot see why anything was built |
| F7 | **Human becomes the bottleneck** — the only durable store is human memory, so throughput equals recall accuracy | Interpretation |
| F8 | **Educational failure** — the taught practice (documenting decisions) is absent from the artifact | `AGENTS.md` § *Educational Content* (practice must be demonstrable) |
| F9 | **Unattributable drift** — later changes cannot be traced to an authority, so review degrades to guesswork | Contradicts `AGENTS.md` § *Repository Safety* review intent |

### 8.2 Risks if decisions are recorded incorrectly or ambiguously (question 5)

| # | Risk | Consequence | Guarding property/field |
|---|---|---|---|
| G1 | **Obsolete record treated as active** | Implements a superseded choice — the costliest single error | P6, supersession chain, §4.3 step 4 |
| G2 | **Missing attribution** | Agent analysis masquerades as human authority; becomes unchallengeable "requirement" — requirement inflation | P5, field 5 |
| G3 | **Vague statement** ("use a modern toolchain") | Non-actionable ⇒ agent must interpret ⇒ invention | field 4 |
| G4 | **Over-broad scope** | Decision applied outside its domain, blocking valid work | field 7, non-scope line |
| G5 | **Over-narrow scope** | Same decision re-litigated repeatedly; fatigue and inconsistency | field 7 |
| G6 | **Divergent duplicates** | Two "authoritative" records disagree; precedence rule absent ⇒ deadlock or arbitrary pick | P10, §4.3 step 3 |
| G7 | **Options recorded as decisions** | An unchosen alternative gets implemented | §4.2 |
| G8 | **Missing date / revisit condition** | A decision whose premise expired keeps silently binding | fields 6, 12 |
| G9 | **Ambiguous status vocabulary** | "Proposed"/"agreed"/"final" read differently by different sessions | P4 |
| G10 | **Record undiscoverable** | Functionally identical to conversation-only loss — *plus* false confidence that it was recorded | P2 |
| G11 | **Ceremony-induced lag** | Records trail reality; readers learn that documentation lies (E7) | E7 |
| G12 | **Secrets or personal data in records** | Security/privacy exposure in a public repository | §4.2 exclusion |
| G13 | **Silent edit of a decided record** | History lost; no way to know when or why behavior changed | P6, P11, Phase E.13 |

**Interpretation:** G1, G2, and G10 are the three that break trust in the mechanism itself; a mechanism that cannot prevent them is worse than no mechanism, because it manufactures false confidence.

---

## 9. Minimum viable mechanism (question 8)

**Stated as a specification, not a selection.** Which candidate satisfies it is shown as a comparison; choosing is a human decision (§13, D1).

### 9.1 Minimum viable specification (the smallest thing that would work)

| # | Minimum requirement | Satisfies |
|---|---|---|
| MV1 | One durable, in-repository location, **named by a pointer in `AGENTS.md`** | P1, P2 |
| MV2 | A record with: `id`, `title`, `status` (`open` / `decided` / `superseded`), `decided_by`, `decided_on`, `statement`, `scope`, `links` (to analysis and to supersession) | P3–P8 |
| MV3 | One canonical copy; all other references are links | P10 |
| MV4 | Written rule: *no record or ambiguous record ⇒ not decided ⇒ ask*, plus a precedence order among sources | P13, §4.3 step 3 |
| MV5 | All changes visible in Git review | P11 |
| MV6 | Readable by a human with no tooling | E1, E2, E8 |

**Observation:** MV1, MV4, and MV6 are rules and pointers rather than files — MV4 in particular requires editing `AGENTS.md`, which is explicitly out of bounds for this task.

### 9.2 Which candidates could satisfy the minimum (interpretation, not selection)

| Candidate | MV1 | MV2 | MV3 | MV4 | MV5 | MV6 | Note |
|---|---|---|---|---|---|---|---|
| M1 (log) | ✔ | △ (fields in prose) | ✔ | needs the `AGENTS.md` rule regardless | ✔ | ✔ | Least ceremony; weakest field enforcement |
| M2 (ADR files) | ✔ | ✔ | ✔ | needs the rule | ✔ | ✔ | Fully satisfies with a template |
| M3 (ADR + index) | ✔ | ✔ | △ (index can drift) | needs the rule | ✔ | △ | Extra checkability, extra upkeep |
| M4 (registry) | ✔ | ✔ | ✔ | needs the rule | △ | ✖ (E2/E8 weak) | Machine-friendly, learner-unfriendly |
| M5 (in experiments) | ✖ | △ | ✖ | n/a | ✔ | ✔ | Fails the minimum as specified |
| M6 (in `AGENTS.md`) | ✔ | △ | ✖ | ✔ (already there) | ✔ | △ | Blends harness and state |
| M7 (Git-native) | ✖ | ✖ | ✔ | n/a | ✔ | ✖ | Not a record format |
| M8 (external) | ✖ | △ | ✖ | n/a | ✖ | ✖ | Fails P1/E5 |

**Interpretation:** several candidates could meet the minimum; **none is uniquely forced by the analysis.** The choice depends on priorities the human must weight — ceremony (E7) versus checkability (P3), legibility (E2) versus machine parseability (P3) — which are preference trade-offs, not technical facts.

**Recommendation (option only):** the analysis suggests the *specification* (§9.1) is worth approving independently of which candidate carries it — the specification is what makes closure work; the candidate is a container. Approving MV1–MV6 first, then selecting a container, is one sequencing option among others; sequencing is also the human's call.

---

## 10. Harness observations

* **O1 — The harness creates decisions faster than it can close them.** *Fact:* 10 decisions surfaced in Experiment 01, 14 in Experiment 02, and none has anywhere to be recorded; `docs/decisions/` has been empty since 07:56. *Observation:* decision debt is accumulating at roughly one experiment's worth per experiment.
* **O2 — The predicted loss already occurred once.** *Fact:* Experiment 01's results lived only in conversation until manually re-pasted (08:52). *Observation:* failure mode F2 is no longer hypothetical; `AGENTS.md` § *Learning From Failures* now has a concrete incident to respond to.
* **O3 — The instruction exists, the mechanism does not.** *Fact:* `AGENTS.md` § *Documentation is part of the system* mandates capture but defines no location, schema, status vocabulary, or discovery path. *Interpretation:* the harness specifies an obligation without providing the means — a documented requirement that cannot currently be satisfied as written.
* **O4 — Absence of a record is already being misread as intent.** *Fact:* `docs/decisions/` exists but is empty and undocumented. *Interpretation:* an empty directory invites future sessions to infer an adopted convention (§4.2) — a live example of assumption drift caused by infrastructure rather than by text.
* **O5 — Precedence ambiguity (Experiment 01 A4) sharpens once records exist.** *Fact:* no rule states whether a task prompt, `AGENTS.md`, or a recorded decision wins when they conflict. *Observation:* without precedence, even a perfect record format cannot prevent G6.
* **O6 — The human is already operating a manual persistence layer.** *Fact:* prompts for experiments 01–03 are stored in-repo, and `experiment-01-prompt.md` was extended to hold the agent's closing report (2,198 → 5,584 bytes). *Observation:* capture is being performed by hand, case by case; formalizing it generalizes existing practice rather than inventing new behavior.
* **O7 — Agent-produced analysis has no receiving end.** *Fact:* Experiment 01 §9 and Experiment 02 §4 produced decision briefs in a consistent shape with no place to file them. *Interpretation:* closure would immediately double the value of work already done — the briefs become the "source analysis" field (§4.1 field 10).
* **O8 — Convergence of agent and learner needs.** *Fact:* every property that helps a future session (P1–P14) also serves the educational goal (E1–E8). *Interpretation:* the mechanism chosen here is simultaneously harness infrastructure and course material — which raises its stakes and is a reason the choice belongs to the human.

---

## 11. Result

**Result: PASSED** (analysis complete), subject to the mechanical verification reported below.

**Evidence:**

| Requirement | Evidence |
|---|---|
| Q1 — required record content | §4.1: 8 core + 6 supporting fields |
| Q2 — what must not be recorded | §4.2: 11 exclusions with correct treatment for each |
| Q3 — distinguishing six kinds | §4.3: classification table + 5-step agent procedure |
| Q4 — conversation-only risks | §8.1: F1–F9, incl. one already-observed near-miss (F2) |
| Q5 — incorrect-recording risks | §8.2: G1–G13 with guarding property for each |
| Q6 — candidate mechanisms | §5: M1–M8 |
| Q7 — trade-offs | §6: property matrix + 6 trade-off axes |
| Q8 — minimum viable mechanism | §9.1 spec MV1–MV6 + §9.2 candidate comparison, **no selection** |
| Q9 — long-lived educational properties | §3.1: E1–E8 |
| Q10 — discovery and consumption | §7: phases A–E |
| 13 required sections | all present, in order |
| No mechanism chosen | §5/§6/§9 present alternatives only; §6 and §9 recommendations explicitly labelled as options |
| No product/architectural decision | no stack, format, location, or policy adopted |
| Exactly one new file, none modified | verified below |

**Qualifications:**

* **Q1 — the model is untested.** No real decision has been closed with it; §7's consumption procedure is a proposal that only a future session can validate.
* **Q2 — the candidate set may be incomplete.** M1–M8 reflect this analysis; the human may know of options it does not (e.g. tooling-specific conventions).
* **Q3 — the specification encodes priorities.** MV1–MV6 and properties P1–P14 reflect the agent's reading of `AGENTS.md`; weighting them (legibility vs checkability) is a preference judgment left to the human.

---

## 12. Lessons learned

*Interpretations drawn from the evidence above.*

1. **A decision process needs a receiving end.** Experiments 01–03 show a harness that opens gates, analyzes options, and stops — closure is the missing component, and its absence accumulates debt rather than safety.
2. **Durability and discoverability are different properties.** A record that exists but is not cheaply found is functionally equivalent to conversation-only loss, while adding false confidence (G10).
3. **Attribution is the anti-drift mechanism.** The single field that prevents agent analysis from hardening into human-authoritative requirement is *who decided* — the same boundary `AGENTS.md` § 1 and § 7 protect everywhere else.
4. **The safe default pattern works again.** Experiment 02 found that "do not invent" converts unresolved decisions into delay; here the same pattern ("no record ⇒ not decided ⇒ ask") converts missing records into questions instead of fabrications. Safe defaults are the harness's most transferable design element.
5. **Failures in this project are already supplying evidence.** F2 (results lost from conversation) and O4 (empty directory implying convention) are real incidents, not hypotheticals — exactly the class of failure `AGENTS.md` § *Learning From Failures* says to fix in the harness rather than patch per-session.
6. **Presence is not intent.** `docs/decisions/` being empty-but-present repeats Experiment 01's lesson about empty `vision.md`: files and directories are facts, and facts are not decisions.
7. **For a teaching artifact, mechanism and content are the same object.** A decision record is simultaneously a constraint on the agent and a worked example for the learner — so the format must satisfy both an operational spec (P1–P14) and a pedagogical one (E1–E8).
8. **The division of labor holds at higher difficulty.** This experiment reached a complete specification — fields, statuses, failure modes, consumption procedure — without selecting a container, confirming Experiment 02's pattern: analysis belongs before the gate, selection belongs to the human.

---

## 13. Human decisions required

**Fact — none of the following was decided in this document; each is listed for the human.**

| ID | Decision | Why it requires human ownership |
|---|---|---|
| **D1** | **Select the decision-recording mechanism** (M1–M8, or a combination) and its location | Architectural/process choice affecting all future sessions; `AGENTS.md` § 7 and § *Dependency and Technology Decisions* reserve such choices |
| **D2** | **Approve the information model** — required fields (§4.1), status vocabulary (`open` / `decided` / `superseded`), and the exclusions in §4.2 | Defines what counts as a binding record; wrong field/status design produces G2/G3/G9 |
| **D3** | **Approve the precedence rule and the fail-safe default**, and add them to `AGENTS.md` | Only the human may amend `AGENTS.md` (§ *Current Project Status*: propose, do not apply); also resolves Experiment 01 A4 |
| **D4** | **Approve the discovery pointer** — the exact path/lookup a future session must perform at task start, documented in `AGENTS.md` | Requires an `AGENTS.md` edit; determines P2 for every future session |
| **D5** | **Governance: who may write and transition records** — may the agent draft `open` items? may only the human set `decided`? | Defines the authority boundary this experiment was about (§4.3 step 2) |
| **D6** | **Backfill scope** — whether the 14 open decisions from Experiment 02 (H1–H14) and the earlier findings are transcribed into records when the mechanism is adopted | Product/process scope decision |
| **D7** | **Retention and supersession policy** — how long obsolete records stay, ID scheme, filename conventions | Longevity/education trade-off (E4, G13) |

**Recommendations (options for evaluation, not decisions):**

* **R-a (option):** approve the §9.1 specification (MV1–MV6) *before* selecting a container, so the container is judged against an agreed bar.
* **R-b (option):** run the mechanism as an X-class trial — as contemplated for other open questions in Experiment 02 §6.2 — for one experiment, then evaluate it at review before committing permanently.
* **R-c (option):** treat D3 and D4 as a single `AGENTS.md` amendment proposal, since both are needed before Phase A of §7 can execute in a real session.

**Not done, by instruction:** no mechanism selected, no record written to `docs/decisions/`, no application code, no technology stack selected, no product or architectural decision made, and no modification of `AGENTS.md`, `README.md`, `docs/`, `src/`, or any existing experiment.

---

## Verification of this document's creation

**Fact — verification performed after writing:**

1. **Working tree inspected:** `git status --short --untracked-files=all` — tracked files clean; untracked paths are the pre-existing experiment files plus this document.
2. **Diff inspected:** `git diff --stat` empty; `git diff --cached --stat` empty; `git ls-files -m` empty → **no tracked file modified**.
3. **Checksums re-verified against the pre-write baseline:** `AGENTS.md` `7355a77e1659ac5dbeaf43d5e74d1992`, `INITIAL_PROMPT.md` `e8ebf1f4…`, `README.md` / `docs/vision.md` / `docs/architecture.md` `d41d8cd9…`, `.gitignore` `8f7a9110…`, `01-report` `2e3b7abaf…`, `02-report` `903b0565…`, `experiment-01-prompt.md` `78443627…`, `experiment-02-prompt.md` `3a369e90…`, `experiment-03-prompt.md` `f83d7e17…` — all unchanged.
4. **New-file count:** exactly one file created by the agent — `experiments/03-decision-closure-analysis.md`.
5. **Git untouched:** no `init`, `add`, `commit`, `checkout`, or `push`; only read-only commands (`status`, `diff`, `log`, `ls-files`, `cat`, `grep`, `stat`, `md5`) were used.
