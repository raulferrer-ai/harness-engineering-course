# Experiment 05 — Decision Consumption

* Date: 2026-10-06
* Status: completed (consumption test; no harness change made, no decision made or closed)
* File created: `experiments/05-decision-consumption.md` (this document)
* Records under test: `docs/decisions/0001-decision-recording-mechanism.md` (D1), `docs/decisions/INDEX.md`

**Label legend:** **Fact** = directly observed in the repository, in `AGENTS.md`, or in command output recorded below. **Observation** = a fact plus its immediate significance. **Interpretation** = an inference beyond the observed data. **Recommendation** = an option for the human to evaluate; not a decision.

**Standing constraint honoured:** no discovery pointer, template, maintenance rule, new ADR, `AGENTS.md` change, or `INDEX.md` change was added. The repository was observed, not repaired.

---

## 1. Objective

**Fact — what this experiment was intended to test:**

1. Whether a future agent session, arriving with **no conversational context** about how decisions are recorded, can *discover* that recorded decisions exist (question 1).
2. Whether D1 can be located **without relying on the prompt's stated storage paths**, and what discovery path is actually followed (question 2).
3. Whether the D1 record carries enough information to establish what/who/when/scope/non-scope/active/superseded/authoritative (question 3).
4. Whether the repository provides an **unambiguous** way to distinguish a human decision from an agent recommendation, an experiment result, an observation, and an unresolved question — particularly against analysis silently becoming a requirement (question 4).
5. What a future task would consume from D1, and how that would constrain behaviour (question 5).
6. Every point at which discovery or interpretation could fail (question 6).
7. Whether the current repository is already sufficient, and if not, what minimum mechanism is missing and which human decision each would require (question 7).
8. Whether Experiment 04 established a *complete* decision-closure mechanism or only its persistence portion (question 8).

**Interpretation:** Experiments 01–03 built the analysis, and Experiment 04 wrote the first record. This is the first test of the **read side** — the side that determines whether any of it has operational value.

---

## 2. Test setup

**Fact:**

* **Role assumed:** an agent session whose only inputs are the repository on disk and its contents. The prompt's descriptions of where D1 is stored were treated as *test metadata*, not as knowledge to be used during discovery.
* **Inputs read:** `AGENTS.md` (292 lines, MD5 `7355a77e…`, unchanged), `README.md`, `docs/`, experiment reports 01–03, `docs/decisions/`, Git metadata.
* **Operations performed:** read-only — `ls`, `grep`, `find`, `wc`, `git status`, `git ls-files`, `git log`, `md5`, file reads.
* **Protected before writing:** MD5 baseline captured for every existing file, including the two records under test (`0001-…` → `5f9deeb4f359a62eda03872b875edc7e`; `INDEX.md` → `f5d34b46685b37457d2393e1dbab2d96`).
* **Environment:** working directory is a Git repository; HEAD `5fd9f54`; 2 commits; 6 tracked files.

**Threat to validity (stated up front, not hidden):**

* **Fact:** this session *does* carry prior conversational context about `docs/decisions/` from earlier tasks. It cannot be un-known.
* **Fact — mitigation applied:** discovery was executed as a sequence of content-based repository queries (§3), and their outputs are recorded verbatim so that the *path's* viability can be judged independently of what the agent remembered. Step S5/S6 prove that a generic query (`decision`) surfaces the records with no path knowledge encoded in the query.
* **Interpretation — residual confound:** the *decision to run that query* may have been influenced by prior knowledge, and that part is not verifiable. The prompt's instruction not to compensate for missing mechanisms with prompt-supplied information was followed in substance; this caveat is disclosed rather than resolved.

---

## 3. Discovery path

### 3.1 Actual path followed (commands and results, in order)

| Step | Operation | Result |
|---|---|---|
| **S1** | `ls -la` (repository root) | `AGENTS.md`, `docs/`, `experiments/`, `src/`, `README.md` (0 bytes), `.gitignore`. **No root-level indication that decisions exist** — `docs/decisions/` is not visible at this depth. |
| **S2** | Read `AGENTS.md`; `grep -i "docs/decisions\|INDEX\|ADR\|decision" AGENTS.md` | 13 occurrences of the word *decision* (concept/rule level: "human decisions", "decision gate", "Technology selection is a human decision"). **0 occurrences of any path, filename, directory, or pointer to the decision mechanism.** |
| **S3** | `wc -c README.md` | **0 bytes** — no pointer. |
| **S4** | `ls -la docs` | `decisions/`, `vision.md` (0 B), `architecture.md` (0 B). **The `decisions/` directory first becomes visible here.** `vision`/`architecture` are empty, so no pointer. |
| **S5** | `grep -ril "decision" . --exclude-dir=.git` | 12 files, **including `./docs/decisions/0001-decision-recording-mechanism.md` and `./docs/decisions/INDEX.md`**. |
| **S6** | `find . -not -path './.git/*' \( -iname '*decision*' -o -iname '*index*' \)` | `./docs/decisions/`, the ADR, and `./docs/decisions/INDEX.md`. |
| **S7** | Read `docs/decisions/INDEX.md` | **First authoritative confirmation:** identifies the mechanism (ADR-per-decision plus index), lists D1 with status `Accepted`, repository-relative link to the ADR, and explicit non-implication rules. |
| **S8** | Read `docs/decisions/0001-decision-recording-mechanism.md` | Full record: fields, context, decision text, authority boundary §3.1, alternatives, consequences, supersession, ambiguities A1–A7. |
| **S9** | `git ls-files \| grep -i decision`; `git log --all --oneline -- docs/decisions`; `git status --short --untracked-files=all` | **No tracked file with "decision" in its path. Empty history for `docs/decisions/`. Both records appear as `??` (untracked).** |

### 3.2 Answers to question 1 (discovery)

**Fact:**

* **Where the discovery path begins:** at repository root → `AGENTS.md` (the only mandatory harness reading) → **dead end** (S2) → `README.md` → **dead end** (S3) → `docs/` (S4) → directory becomes visible.
* **Does `AGENTS.md` point to the decision mechanism?** **No.** It *requires* that decisions be documented ("Important decisions, discoveries and lessons should be captured in the repository…") but never says where. (S2)
* **Does another authoritative pointer exist?** **No.** `README.md`, `docs/vision.md`, `docs/architecture.md` are all 0 bytes. The only texts containing the path `docs/decisions/` are the two records themselves and the experiment reports/prompt files (S5) — analysis and conversation, not harness authority.
* **Can the INDEX be discovered without prior conversational knowledge?** **Yes, via repository-wide content or filename search** (S5/S6 surface it). It cannot be reached by following any documented instruction.
* **Does discovery depend on guessing or repository-wide search?** **Yes — both are available, neither is required by any rule.** Either guess that decisions live under `docs/`, or search the repository for "decision". No authoritative pointer exists to do the work.

**Observation:** discovery succeeded, but by *search*, not by *instruction*.

**Interpretation — the critical property:** discovery is **task-correlated**. A task whose subject matter mentions decisions ("record this decision", "what mechanism do we use?") will trigger a search that succeeds. A task whose subject matter does **not** mention decisions will not trigger any search — so a constraining recorded decision can be **silently unheard**, without any error being visible to anyone. That is the failure mode that matters, and it is structural, not accidental.

### 3.3 Answers to question 2 (D1 discovery without the prompt's paths)

**Fact:** D1 was located through S1→S8, ending at `docs/decisions/0001-decision-recording-mechanism.md`, using only repository content queries. The prompt's paths were not used as inputs to the search steps.

**Fact — exact point where guessing or prior knowledge entered:**

1. **Between S4 and S5.** With `AGENTS.md` and `README.md` exhausted and silent, the next move required either an assumption (guess: "decisions probably live under `docs/`") or a deliberate repository-wide search. **I chose search.** Everything before this point was documented-reading; everything after it was search-driven. **This is the exact point where discovery stopped being instruction-driven.**
2. **Session prior knowledge** (disclosed in §2): cannot be excluded as an influence on that choice.

**Observation:** had the search in S5 not been run, nothing in the repository would have led the session to D1 — S2, S3, and S4 produce no pointer.

---

## 4. D1 consumption

### 4.1 What the record establishes (question 3)

| Question | Established by D1? | Value | Label |
|---|---|---|---|
| What was decided? | **Yes** | "Use an ADR-per-decision plus index mechanism" (§3, reproduced unaltered) | **Fact** |
| Who decided it? | **Yes** | "Decided by: Human project owner"; §3.1(1) states the human selected it and the agent acted as scribe | **Fact** |
| When? | **Yes, date-level** | `2026-10-06`, with its verification basis (environment clock + repo mtimes) recorded; A1 states no time-of-decision exists and that a different date requires human confirmation | **Fact** (with stated limit) |
| Scope? | **Yes** | "Repository decision governance" | **Fact** |
| What it does NOT decide? | **Yes** | Explicit non-scope row: does not select the website technology stack, content, deployment, hosting, infrastructure, or any product matter | **Fact** |
| Currently active? | **Yes** | Status `Accepted`; §7 status history = initial record; no revisit trigger specified (A4/D7) | **Fact** |
| Superseded? | **Yes** | Supersedes: none; Superseded by: none as of `2026-10-06` | **Fact** |
| Authoritative or analysis? | **Yes** | In `docs/decisions/` + INDEX entry + human attribution ⇒ authoritative. Contrast: `experiments/03-decision-closure-analysis.md` §9 explicitly did *not* select a mechanism and labels its proposals **Recommendation** | **Fact** (classification) / **Observation** (contrast) |

**Observation:** all eight points are answerable from the record alone, without consulting conversation history.

### 4.2 What a future task would consume, and how it constrains behaviour (question 5)

**Scenario:** a future task requires knowledge of the project's decision-recording mechanism. *(The task itself is not performed.)*

**Fact — information consumed from D1 / INDEX:**

1. **Mechanism:** one record file per decision in `docs/decisions/`, plus `INDEX.md` for discovery.
2. **Discovery entry point:** `docs/decisions/INDEX.md` lists recorded decisions and links records by repository-relative path.
3. **Authority:** the mechanism was selected by the human project owner; **future decisions remain human-owned unless explicitly delegated** (§3.1(4)).
4. **Boundary:** D1 carries no stack information and must not be read as implying any (non-scope row).
5. **Index semantics:** absence of an entry means *not recorded*, never *resolved* (`INDEX.md` "What this index does NOT mean").

**Interpretation — resulting behavioural constraints:**

| # | Constraint on the future agent |
|---|---|
| C1 | Any decision record belongs in `docs/decisions/` as a separate file — **not** inside an experiment report, not in `AGENTS.md`, not in conversation. |
| C2 | When decision knowledge is needed, read `INDEX.md` first; verify status, attribution, scope, and supersession before relying on any record. |
| C3 | **Recording ≠ owning.** Writing a record confers no authority (ADR §3.1). I may prepare material, but I must not mark anything `Accepted`/decided, and — because write/transition governance (D5) is undefined — I would stop and ask before creating or updating any record. |
| C4 | D1 governs decision *governance* only; it neither authorizes nor constrains stack, hosting, content, or scope choices. |
| C5 | The analysis in Experiments 02–03 (fields MV1–MV6, consumption Phases A–E, statuses `open`/`decided`/`superseded`) is **Recommendation, not requirement** — no record approves it, and `AGENTS.md` contains no rule making experiment analysis binding. I must not implement it as if it were a schema. |
| C6 | If a future decision contradicts what I would otherwise do, and I cannot find the record (§3.2), the safe default applies: treat as undetermined and ask. |

**Observation:** consumption yields **WHERE records live, WHAT they are, and WHO owns them** — but not *how to write a new one* (no approved template/field spec, D2), *whether I may write one* (D5), or *how the index is maintained* (A7/D7). Consumption for **reading** works; consumption for **writing** correctly terminates at a human gate.

---

## 5. Authority interpretation (question 4)

**Fact — how each kind is signalled in the repository today:**

| Kind | Where it lives | Distinguishing signal | Unambiguous? |
|---|---|---|---|
| **Human decision** | `docs/decisions/` + INDEX entry | Location + "Decided by: Human project owner" + `Status: Accepted` + supersession fields | **Yes — if found** (S7/S8) |
| **Agent recommendation** | `experiments/*` (e.g. Exp02 §4, §6; Exp03 §9) | Section labels "**Recommendation**"; explicit "no option is recommended" statements | **No — by convention only** |
| **Experiment result** | `experiments/NN-*.md` § "Result" | Heading convention | **No — convention only** |
| **Observation** | inside reports | Inline label "**Observation**" | **No — convention only** |
| **Unresolved question** | Exp02 H1–H14; Exp03 §13 D2–D7 (spread across reports) | Numbered lists in analysis reports; `INDEX.md` explicitly states absence ≠ resolved | **Partial** — the guard sentence exists, but there is no single open-question registry |

**Fact — the load-bearing signals are unenforced:**

* `AGENTS.md` contains **no rule** stating that experiment reports are non-binding, **no precedence rule** among sources (Exp03 §4.3 step 3 proposed one; it was never adopted), and no definition of the status vocabulary ("Accepted" is not from any approved vocabulary — none exists).
* The labels *Fact / Observation / Interpretation / Recommendation* are conventions established in agent-written documents, applied by the same party that could misapply them.

**Fact — concrete opportunities for mistaking analysis for requirement:**

1. `experiments/03-decision-closure-analysis.md` §9.1 presents a "Minimum viable specification (MV1–MV6)" whose format reads like an approved spec, though it is labelled as a specification "not a selection".
2. `experiments/02-decision-analysis.md` §4 presents decision briefs with "trade-offs" phrasing that can be skimmed as normative.
3. `experiments/experiment-4-prompt.md` and `experiment-5-prompt.md` contain imperative instructions ("Do not modify…") from *historical* tasks; a future agent could mistake stale task constraints for current rules.
4. `experiments/experiment-4-prompt.md` contains an appended session response — past analysis stored in a prompt file, indistinguishable at a glance from instructions.

**Observation:** only **location + human attribution + status** reliably mark authority; every other distinction depends on conventions with no enforcement.

**Interpretation:** an agent *could* absolutely treat analysis or recommendations as requirements — nothing in the harness currently prevents it. The mitigations that exist are incidental (labels used consistently so far, Exp03's own "not a selection" phrasing, INDEX's non-implication sentence), not structural.

**Recommendation (an option, not a decision):** the precedence rule and binding-source list proposed in Exp03 §4.3 remain the missing structural answer; adopting them would require a human decision to amend `AGENTS.md`.

---

## 6. Failure modes (question 6)

*No failure was fixed. Each is recorded as observed.*

| # | Failure | Labels |
|---|---|---|
| **FM1** | **No authoritative pointer.** `AGENTS.md` requires documenting decisions but names no location; `README.md`/`vision`/`architecture` are empty. | **Fact** (S2–S4) · **Observation** discovery ends instruction-following at step S4 · **Interpretation** any session that does not independently search will never learn decisions exist · **Recommendation** a human decision on adding a harness pointer (D4), not made here |
| **FM2** | **Records are not in Git.** `git ls-files` shows no decision path; `git log -- docs/decisions` is empty; both files are `??` untracked. | **Fact** (S9) · **Observation** persistence is filesystem-local only · **Interpretation** a fresh clone of this repository would contain **no D1 and no INDEX**, so discovery in a clone would **fail outright** — this test would be FAILED rather than passed · **Recommendation** a human decision on version-control/commit policy (who commits, when), not made here |
| **FM3** | **Discovery is task-correlated.** Search is triggered by task subject matter. | **Fact** (§3.2) · **Observation** decisions bind only tasks that happen to prompt a lookup · **Interpretation** a constraining decision can be silently unheard, with no visible error · **Recommendation** as FM1 |
| **FM4** | **No approved status vocabulary.** D1's `Accepted` is ad hoc; Exp03's `open`/`decided`/`superseded` was a candidate, never approved. | **Fact** · **Observation** status semantics rest on one worked example · **Interpretation** a future agent may map `Accepted` incorrectly or invent a new status · **Recommendation** human decision D2 |
| **FM5** | **No template/field specification.** Only D1 exists as an example. | **Fact** · **Observation** schema is implicit in a single artifact · **Interpretation** record N+1 may omit a load-bearing field (attribution, scope, supersession) unnoticed · **Recommendation** human decision D2 |
| **FM6** | **No write/transition governance.** Nothing states who may create records or move statuses. | **Fact** (ADR A3/A6 context) · **Observation** the read path works; the write path is undefined · **Interpretation** either an agent records something unauthorized, or all recording stalls at the gate · **Recommendation** human decision D5 |
| **FM7** | **No index-maintenance rule.** `INDEX.md` can silently diverge from `docs/decisions/`. | **Fact** (ADR A7) · **Observation** index drift is a known, unowned risk · **Interpretation** the discovery entry point could list stale status while records changed underneath · **Recommendation** human decision D7 (or D5) |
| **FM8** | **No precedence rule between sources.** `AGENTS.md` vs. recorded decision vs. analysis is unsettled. | **Fact** (grep: no such rule) · **Observation** conflicts cannot be arbitrated by rule · **Interpretation** in a conflict, resolution would depend on the agent's judgment — the exact thing AGENTS.md §1 is designed to prevent · **Recommendation** human decision to adopt a precedence rule (D4 territory) |
| **FM9** | **Analysis-as-requirement risk.** See §5 items 1–4. | **Fact** those documents exist and read as spec-like · **Observation** no rule marks experiment reports as non-binding · **Interpretation** MV1–MV6 could be implemented as if approved · **Recommendation** human decision on binding-source/precedence (D4) |
| **FM10** | **Identifier ambiguity.** `D1` is used both as an *open-question* ID (Exp03 §13) and as a *record* ID (INDEX); `0001` came from a task instruction; no scheme reconciles them (ADR A2). | **Fact** · **Observation** currently harmless because both refer to the same decision · **Interpretation** the next recorded decision will expose the collision (e.g. Exp03's D2 vs. file `0002`) · **Recommendation** human decision D2/D7 on identifier scheme |
| **FM11** | **Experiment 04 has no report file.** `experiments/` contains `01-`, `02-`, `03-` reports and prompt files for 01–03/4/5, but **no `04-*.md`**; Exp04's outcome lives in `experiment-4-prompt.md` (appended response). | **Fact** (directory listing) · **Observation** experiment persistence is being done by ad hoc prompt-file appending · **Interpretation** findings of Exp04 are not discoverable in the same way the other reports are · **Recommendation** human decision on experiment conventions (open decision H8 from Exp02) |
| **FM12** | **Stale-prompt contamination.** Prompt files carry imperative, historically-authoritative text. | **Fact** · **Observation** `experiments/` mixes instructions, analysis, and results in one directory · **Interpretation** a future agent may obey constraints belonging to completed tasks · **Recommendation** human decision on experiment file conventions (H8) |

**Observation:** FM1–FM3 concern *discovery*, FM4–FM8 *interpretation and lifecycle*, FM9–FM12 *authority hygiene*. None was fixed during this experiment, per instruction.

---

## 7. Minimum missing mechanism (question 7)

**Fact — is the current repository sufficient for reliable discovery and consumption?**

**No.** It is sufficient for a session that *already suspects decisions exist* and is willing to search (as demonstrated), and insufficient for guaranteed, rule-driven discovery or for safe writing.

**Fact — minimum missing mechanisms, each paired with the human decision it would require.** None is implemented; no alternative is chosen between.

| # | Missing mechanism (minimum form) | Human decision required before it may exist |
|---|---|---|
| **MM1** | An **authoritative discovery pointer** — a single sentence in `AGENTS.md` (or `README.md`) naming where decisions are recorded | **D4** (Experiment 03): amending harness rules is human-only (`AGENTS.md` § *Current Project Status* — propose, do not apply) |
| **MM2** | **Version-controlled persistence** — the records committed to Git so they survive a clone | A human decision on **commit/version-control policy** (Exp02 H10: who commits, when, with what message style) plus the human act of committing |
| **MM3** | An **approved record schema and status vocabulary** (required fields; what `Accepted`/`open`/`superseded` mean) | **D2** (Experiment 03): the information model |
| **MM4** | **Write/transition governance** — who may create a record, who may set/change status | **D5** (Experiment 03) |
| **MM5** | An **index-maintenance rule** — who updates `INDEX.md`, and whether divergence is checked | **D7** (or D5) (Experiment 03) |
| **MM6** | A **supersession/retention policy** — how records become obsolete without being deleted | **D7** (Experiment 03) |
| **MM7** | A **binding-source/precedence rule** — what is authoritative when sources conflict, and that experiment analysis is non-binding | **D4** territory (amending `AGENTS.md`), informed by Exp03 §4.3 step 3 |
| **MM8** | *(Optional)* An **open-question registry** — a single list of undecided questions, instead of Exp02/Exp03 lists scattered across reports | A human decision on whether such an artifact exists at all and in what form (relates to D6) |

**Interpretation:** MM1 alone would convert discovery from "search or guess" into "read the harness and follow the pointer" — the single highest-leverage change. **Whether** to make it, and **how** to word it, is D4 and is not decided here.

**Recommendation (option, not decision):** order of attack could be MM1/MM2 first (discovery + durability), then MM3/MM4 (schema + governance), then MM5–MM7. Sequencing is itself a human choice.

---

## 8. Harness observations

* **O1 — The read path works, but by search rather than by rule.** **Fact:** D1 was discovered and correctly interpreted using only repository contents (S1–S8). **Observation:** nothing in the harness *required* that discovery to happen. **Interpretation:** the mechanism currently has a working demonstration, not a working guarantee.
* **O2 — Experiment 04 established the *persistence portion* of a decision-closure mechanism, plus an intra-directory discovery aid — not a complete mechanism.** **Fact:** Experiment 04 delivered (a) a record containing all eleven required fields, and (b) `INDEX.md` with mechanism identification, a D1 entry, a repository-relative link, exposed ID/title/status, and explicit non-implication rules. It did **not** deliver: a harness pointer (MM1), Git-tracked persistence (MM2), an approved schema/vocabulary (MM3), write governance (MM4), index-maintenance rules (MM5), supersession policy (MM6), or a precedence rule (MM7). **Fact:** per Experiment 03 §2.2, closure has three parts — *capture*, *classification*, *discovery*. **Interpretation, stated precisely:** Experiment 04 achieved **capture** (at filesystem level, not yet at VCS level) and **classification signals** (fields present, vocabulary unapproved), while **discovery** was achieved only *locally* — `INDEX.md` helps a session that is already inside `docs/decisions/`, which is the one place it cannot help a session that has not yet found. **So: the persistence portion, with a partial local discovery affordance; not a complete closure mechanism.**
* **O3 — The durability gap undercuts the persistence claim.** **Fact:** both records are untracked (S9). **Observation:** "recorded in the repository" currently means "present on this disk". **Interpretation:** Experiment 04's persistence portion is real but not yet durable in the sense `AGENTS.md` § *Documentation* intends — a clone loses it entirely.
* **O4 — The index's non-implication guard works.** **Fact:** `INDEX.md` explicitly states that absence of an entry means *not recorded*, not *resolved*, and points to experiment reports for open questions. **Observation:** this is the one authority question answered by an explicit rule rather than by convention.
* **O5 — The strongest discoveries of this test are its failures.** **Fact:** FM1–FM12 were found without modifying anything. **Interpretation:** observing-before-fixing produced a sharper list than building-then-hoping would have; this matches `AGENTS.md` § *Learning From Failures*.
* **O6 — Conventions continue to drift undocumented.** **Fact:** Exp04 has no report file; experiment prompts are named `experiment-4-prompt.md`/`experiment-5-prompt.md` (no leading zero) while reports use `05-…`; results are appended to prompt files. **Observation:** Exp02's open decision H8 (experiment conventions) is being informally resolved in practice without being recorded — the same drift pattern noted in Experiment 02 O5, now observable across three experiments. **Interpretation:** conventions that are exercised but never recorded are decisions the harness does not know it has.
* **O7 — The consumption test validates the value of Experiment 03's analysis.** **Fact:** the classification table and fail-safe default from Exp03 §4.3/§7 were directly usable in reading D1. **Observation:** those remain *recommendations*, not approved rules — they helped here, but they are not binding (FM9).

---

## 9. Result

# **PASSED WITH QUALIFICATIONS**

**Why PASSED (evidence):**

| Criterion | Evidence |
|---|---|
| Discovery without prompt-supplied paths | S1→S8: located D1 via directory listing and generic content/filename search; prompt paths not used as search input (§3.3) |
| Record found and identified as authoritative | INDEX entry: `D1` / `Accepted` / `Human project owner`, linking the ADR (S7) |
| Interpretation complete | All eight required points — what, who, when, scope, non-scope, active, superseded, authoritative — answered from the record alone (§4.1) |
| Consumption derivable | Six behavioural constraints C1–C6 extracted; write path correctly terminates at a human gate (§4.2) |
| Authority boundary readable | Human decision vs. analysis distinguishable at the record via location + attribution + status (§5) |
| No harness change | No pointer, template, maintenance rule, new ADR, `AGENTS.md`, or `INDEX.md` change made; protected-file checksums unchanged (Verification) |

**Why not plain PASSED (the qualifications):**

* **Q1 — discovery is not guaranteed.** It depended on repository-wide search after `AGENTS.md`, `README.md`, `docs/vision.md`, and `docs/architecture.md` all failed to point anywhere (FM1/FM3). Guarantee requires MM1, which does not exist.
* **Q2 — persistence is not durable.** Both records are untracked in Git (FM2). In a fresh clone this test would have **FAILED**, because there would be nothing to discover. The pass applies to this working copy only.
* **Q3 — test-confound disclosed.** This session carried prior context about the paths (§2); search-based steps mitigate but cannot eliminate that caveat.
* **Q4 — consumption is read-only-complete.** Writing a new record would still require human input on schema, vocabulary, governance, and index maintenance (MM3–MM5).
* **Q5 — status vocabulary unapproved.** `Accepted` was interpreted from context, not from an approved standard (FM4).

**Why not FAILED:** discovery *did* succeed through repository contents alone; interpretation was complete and correct on every required point; no misreading of analysis-as-requirement occurred in this run; and the two records remained byte-identical throughout.

**Interpretation:** the mechanism demonstrably survives its first read test, and its weaknesses are precisely the ones predicted by Experiment 03's analysis — which is itself evidence that the analysis was sound.

---

## 10. Lessons learned

*Interpretations; none is a decision.*

1. **A record is not a mechanism.** Experiment 04 produced a good record; this test shows the mechanism also needs discovery wiring, durability, schema, and governance before the record reliably reaches the session that needs it.
2. **Discovery that depends on search is discovery that depends on luck.** The harness mandates reading `AGENTS.md` — the one document that does not know where decisions live.
3. **Task-correlated discovery fails silently.** The dangerous outcome is not "agent cannot find the decision"; it is "agent never looks, and nobody finds out".
4. **Persistence means VCS, not disk.** Untracked records satisfy "written down" but fail "survives"; Experiment 04's central accomplishment is thinner than it appears until committed.
5. **Conventions with no record become invisible decisions.** Prompt-file appending, filename schemes, and report numbering are all being *used* without being *decided* — the exact condition D1 was created to fix.
6. **Explicit guard sentences beat label conventions.** The one authority question answered unambiguously (`INDEX.md`: absence ≠ resolved) was answered by an explicit statement, not by a naming convention — while Fact/Recommendation labelling elsewhere remains unenforced.
7. **Observing before repairing produced the better evidence.** FM1–FM12 exist because the harness was tested as-is; fixing during the experiment would have destroyed the measurement.
8. **A safe default covers a missing rule.** Where no pointer exists (MM1), the conservative behaviour — search, and if not found, ask — degraded gracefully instead of inventing, which is `AGENTS.md` §1 working as designed even where the mechanism is incomplete.

---

## 11. Human decisions required

**Fact — none of the following was decided, inferred, or closed by this experiment.** Each is listed for the human.

| ID | Decision required | Blocking significance |
|---|---|---|
| **D4** | Whether (and how) `AGENTS.md` gains an authoritative pointer to the decision store, and whether a binding-source/precedence rule is adopted | **MM1, MM7** — without it, discovery stays search-based (FM1/FM3/FM8/FM9) |
| **Commit policy** | Who commits the decision records (and experiment files) to Git, and when — currently everything of value is untracked | **MM2** — without it, records do not survive a clone (FM2); relates to open decision Exp02 H10 |
| **D2** | Approved record schema and status vocabulary (fields; meaning of `Accepted` vs. `open`/`superseded`; identifier scheme reconciling `D1`/`0001`) | **MM3** — without it, record N+1 may be malformed (FM4/FM5/FM10) |
| **D5** | Governance: who may create records and transition statuses | **MM4** — without it, writing stays undefined (FM6) |
| **D7** | Index-maintenance rule plus supersession/retention policy | **MM5, MM6** — without it, index drift and obsolete records are unowned (FM7) |
| **H8** | Experiment conventions (report naming, whether reports exist for every experiment, prompt-file handling) | Addresses FM11/FM12 — drift now spans three experiments |
| **D6** *(optional)* | Whether an open-question registry artifact exists, replacing lists scattered across reports | **MM8** — improves authority clarity in §5 |

**Recommendations (options only, not decisions):**

* **R-a:** consider MM1 and MM2 first, since they alone convert a *demonstrated* read path into a *guaranteed* and *durable* one.
* **R-b:** consider having a human review FM2 before any further experiment relies on untracked records.
* **R-c:** consider closing H8 by recording the conventions already in informal use, so practice stops outrunning records.

---

## Verification

1. **`git status --short --untracked-files=all`** inspected: exactly one new path attributable to this task — `experiments/05-decision-consumption.md`; all other paths pre-existing.
2. **`git diff`** (unstaged) and **`git diff --cached`** (staged) both empty; **`git ls-files -m`** empty → no tracked file modified.
3. **D1 ADR and INDEX unchanged:** `0001-decision-recording-mechanism.md` MD5 `5f9deeb4f359a62eda03872b875edc7e` (12,651 B, mtime 14:47:00) and `INDEX.md` MD5 `f5d34b46685b37457d2393e1dbab2d96` (3,437 B, mtime 14:47:24) — identical to the pre-task baseline.
4. **All other existing files unchanged:** `AGENTS.md` `7355a77e…`, `README.md`/`docs/vision.md`/`docs/architecture.md` `d41d8cd9…`, `INITIAL_PROMPT.md` `e8ebf1f4…`, `.gitignore` `8f7a9110…`, experiment reports `2e3b7abaf…`/`903b0565…`/`d58367e0…`, and all prompt files unchanged.
5. **No application code** created or modified — repository file list contains only Markdown and `.gitignore`.
6. **No Git commit or push:** HEAD still `5fd9f54`, log still 2 commits, stash empty, `.git/index` mtime unchanged.
7. **No harness repair attempted:** no discovery pointer, template, maintenance rule, new ADR, `AGENTS.md` edit, or `INDEX.md` edit.
