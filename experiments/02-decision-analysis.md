# Experiment 02 — Decision Analysis

* Date: 2026-10-06
* Status: completed (analysis only; no decision resolved)
* Scope: decision analysis for the next phase; no application code, no technology selection, no product decisions, no commit or push
* File created: `experiments/02-decision-analysis.md` (this document)

**Label legend** (applied to every substantive statement):

* **Fact** — directly observed in the repository, in `AGENTS.md`, or in the session record.
* **Observation** — a fact plus its immediate, minimal significance.
* **Interpretation** — an inference that goes beyond the observed data.
* **Recommendation** — a proposal for the human to evaluate; not a decision.

**Standing disclaimer:** this document resolves nothing. Every decision below remains open. Where alternatives are listed, they are presented as **options for evaluation**, and no option is recommended unless that recommendation is itself explicitly labelled as an option.

---

## 1. Objective

**Fact — what this experiment was intended to test:**

1. Whether the harness allows the agent to make **useful progress while important human decisions remain unresolved**, without the agent making those decisions itself.
2. Whether `AGENTS.md`'s decision gate blocks only *implementation*, or also blocks *analysis* (directly testing the concern recorded as **L3** in Experiment 01: "decision-gate rules could cause unnecessary blocking").
3. How much of the unresolved decision space can be converted into **decision-ready material** (options, consequences, trade-offs, dependencies) without selecting an outcome.
4. What the **true minimum set of human decisions** is before a first implementation increment could begin, as distinct from the full list of open decisions.
5. Whether the human/agent boundary can be **demonstrated with evidence** rather than merely asserted.

**Interpretation:** the value of this experiment is that it separates two questions that Experiment 01 conflated — *"how many decisions are open?"* (10 follow-up decisions were listed) and *"how many decisions block progress?"* (possibly far fewer).

---

## 2. Input and constraints

### 2.1 Inputs read

**Fact:**

* `AGENTS.md` — 292 lines, MD5 `7355a77e1659ac5dbeaf43d5e74d1992`, **byte-identical** to its Experiment 01 state; it was not changed between experiments.
* `experiments/01-repository-exploration-and-decision-gate.md` — 246 lines, MD5 `2e3b7abaf0b0678ebf0ae893d460d014`.
* Current repository structure, Git working tree, tracked/untracked file lists, commit log.

### 2.2 Constraints imposed on this task

**Fact (from the task instructions, preserved at `experiments/experiment-02-prompt.md`):**

* Do not modify any existing file.
* Do not create application code.
* Do not select a technology stack.
* Do not make product decisions on behalf of the human.
* Do not modify `AGENTS.md`.
* Do not modify `README.md`, `docs/`, `src/`, or any existing experiment.
* Create **exactly one** new file: `experiments/02-decision-analysis.md`.
* Distinguish Fact / Observation / Interpretation / Recommendation.
* Before finishing: inspect the working tree and diff, verify exactly one new file and no modified existing file, report the verification.
* Do not commit or push.

### 2.3 Repository baseline captured before writing

**Fact:**

```text
Tracked (clean, no unstaged/staged changes): .gitignore, AGENTS.md, INITIAL_PROMPT.md,
                                             README.md, docs/architecture.md, docs/vision.md
Untracked before this task:                  experiments/01-repository-exploration-and-decision-gate.md
                                             experiments/experiment-01-prompt.md
                                             experiments/experiment-02-prompt.md
Commits:                                     5ed7b84, 5fd9f54 (unchanged)
Empty placeholder files:                     README.md, docs/vision.md, docs/architecture.md (0 bytes)
Empty directory:                             docs/decisions/, src/
```

**Fact — changes made by the human between Experiment 01 and this task:**

* `experiments/experiment-01-prompt.md` grew from 2,198 bytes (08:33) to 5,584 bytes, 109 lines (mtime 08:52). Reading its head confirms it still begins with the original Experiment 01 prompt; its tail now contains a copy of the agent's closing chat report from Experiment 01.
* `experiments/experiment-02-prompt.md` was created (2,618 bytes, mtime 08:52), containing this task's instructions.

**Observation:** the human has begun persisting each experiment's *prompt and results* into `experiments/`, which is the practice recommended as **L2/L8** in Experiment 01 — adopted by human action, not by documented convention.

---

## 3. Decision inventory

**Fact — the inventory consolidates every decision identified in Experiment 01 §9 plus those surfaced by this analysis.** Classification describes *how a decision can be advanced*; it never transfers ownership. Decisions owned by the human stay owned by the human in every class.

| ID | Decision | Owner | Class | Blocking now? |
|---|---|---|---|---|
| H1 | Define the first implementation increment and its completion criteria | Human | C1 human-required | **Yes — root** |
| H2 | Product scope: audience, curriculum boundary, depth, quality goals | Human | C1 for content work | Branch-dependent |
| H3 | Approve a working definition of "Harness Engineering" | Human | C1 for content work | Branch-dependent |
| H4 | Technology stack | Human (reserved by `AGENTS.md`) | C1 for code work | Branch-dependent |
| H5 | Verification standard for the pre-code phase | Human (approve) | **C1 — all increments** | **Yes** |
| H6 | Decision-record process and format (`docs/decisions/`) | Human (approve) | C1 for finalizing decisions | Before first decision is recorded |
| H7 | Decision-gate triage policy (any `AGENTS.md` amendment) | Human only | C1 optional | No — safe default exists |
| H8 | Experiment conventions: naming, report template, closure step | Human (approve) | C1 for experiment closure | Before Experiment 03 closes |
| H9 | Content source format and site language | Human | C3 deferrable | No |
| H10 | Git workflow: who commits, branch and commit-message style | Human | C3 deferrable | No |
| H11 | Deployment, hosting, domain, budget | Human | C3 deferrable | No |
| H12 | License, privacy, analytics, accessibility, i18n | Human | C3 deferrable | No |
| H13 | Threshold for "substantial application functionality" (phase exit) | Human | C3 deferrable | No |
| H14 | Reconcile `.gitignore` (`node_modules/`, `dist/`, `build/`) with the undecided stack | Human (after H4) | C3 deferrable | No |
| A1–A10 | Analytical packages that feed the human decisions above | Agent | C2 agent-analyzable | n/a |
| X1–X6 | Reversible explorations that advance decisions without committing | Agent | C4 experimental | n/a |

**Class definitions (as instructed):**

* **C1 — Human-required before meaningful implementation** (§4).
* **C2 — Agent-analyzable without choosing an outcome** (§5).
* **C3 — Safely deferrable** (§6.1).
* **C4 — Explorable experimentally without committing** (§6.2).

**Observation:** the inventory contains **14 human-owned decisions**, versus the 10 follow-up decisions listed in Experiment 01 §9 — four additional decisions surfaced only because the analysis went deeper (H14, and the splitting of scope/threshold/format/Git-workflow out of grouped items).

**Interpretation:** decision counts grow with analysis depth. Without a triage rule (H7), the human's apparent backlog inflates even as the true blocking set stays small.

---

## 4. Human-required decisions

**Every item below is owned by the human. Each is presented as options; none is chosen.**

### H1 — Define the first implementation increment and its completion criteria

* **Why human-owned:** `AGENTS.md` § *The human remains responsible for product decisions* and § *Change Discipline* place scope selection with the human; choosing the first increment implicitly chooses project priorities, which is a product decision.
* **Consequences:** determines which downstream decisions become blocking (§7), sets the first measurable outcome of the "process before functionality" phase, and determines what the next experiment tests.
* **Alternatives (options for evaluation):** *(a)* a **process/harness increment* (e.g. establish decision records and experiment conventions); *(b)* a **content increment* (draft educational material); *(c)* a **technical increment* (project scaffold); *(d)* a further **experiment increment* (another harness test); *(e)* defer and specify the phase-exit threshold (H13) first.
* **Trade-offs:** *(a)* advances the stated phase objective and needs no stack or scope, but produces nothing user-visible; *(b)* produces the actual product but needs H2/H3/H9 first; *(c)* creates technical momentum but locks in H4 prematurely and risks building against an undefined scope; *(d)* maximizes harness learning at the cost of product progress; *(e)* front-loads governance but delays all work.
* **No option is recommended.**

### H2 — Product scope: audience, curriculum boundary, depth, quality goals

* **Why human-owned:** audience and scope define the product itself; `AGENTS.md` § 1 lists *scope of the product* among the effects that force a stop-and-ask, and § *Educational Content* makes content a product requirement the agent cannot self-assign.
* **Consequences:** determines content volume and ordering, the depth of each explanation, measurable quality goals, and it feeds H4 (interaction needs) and H9 (format needs).
* **Alternatives:** *(a)* narrow and deep (one audience, few modules, high rigor); *(b)* broad and shallow (survey-level coverage); *(c)* progressive structure (foundations first, advanced later); *(d)* scope defined incrementally per experiment rather than as a fixed syllabus.
* **Trade-offs:** *(a)* strongest per-topic quality, slower to publish, narrower reach; *(b)* faster visible output, weaker on the "first principles" requirement of R2; *(c)* allows staged delivery but requires an ordering decision now; *(d)* maximally adaptive but risks drift against R4 ("not the largest possible website") because no boundary exists to test drift against.
* **No option is recommended.**

### H3 — Approve a working definition of "Harness Engineering"

* **Why human-owned:** this is the project's central term and part of its subject matter; `AGENTS.md` never defines it (finding **A1**/L4 in Experiment 01), and inventing a definition would be inventing a requirement.
* **Consequences:** every educational artifact, the credibility of R2, and the criteria by which the harness itself is judged all derive from this definition; an unclear definition makes R5 unverifiable.
* **Alternatives:** *(a)* approve a definition derived from the existing feedback-loop slogan; *(b)* approve a definition drawn from established engineering literature; *(c)* let the definition emerge from experiment results and codify it later; *(d)* supply the human's own definition.
* **Trade-offs:** *(a)* consistent with the repository but may be too narrow; *(b)* grounded but risks importing terminology the project does not use; *(c)* evidence-based and cheap, but content work cannot start consistently until it settles; *(d)* fastest and clearly owned, but untested against the experiments.
* **No option is recommended.**

### H4 — Technology stack

* **Why human-owned:** `AGENTS.md` § *Dependency and Technology Decisions* states technology selection is a human decision when it materially affects the project; it also affects deployment, cost, security, and later reversibility.
* **Consequences:** sets authoring friction, contributor skill requirements, dependency surface, deployment options (H11), and is expensive to reverse once content and tooling accumulate.
* **Alternatives (categories only, no products named or chosen):** *(a)* hand-written HTML/CSS with no build step; *(b)* a static-site generator with Markdown/MDX authoring; *(c)* a framework-rendered site with interactive components; *(d)* a notebook or document-driven pipeline; *(e)* defer entirely and write content in plain documents until a renderer is required.
* **Trade-offs:** *(a)* maximal simplicity, near-zero dependencies, weakest interactive/editorial features; *(b)* good authoring ergonomics and content tooling, introduces a build toolchain and dependency maintenance; *(c)* maximum interactive teaching capability, largest dependency, skill and lock-in cost; *(d)* strongest for reproducible runnable examples, awkward for narrative content; *(e)* zero premature commitment, but rework risk when a renderer is eventually chosen.
* **Observation:** `.gitignore` already lists `node_modules/`, `dist/`, `build/`, which is an infrastructure signal pointing toward a build-toolchain category **before** this decision is recorded (finding L7). That file was **not** modified here.
* **No option is recommended.** Presenting categories is analysis, not selection.

### H5 — Verification standard for the pre-code phase

* **Why human-owned:** `AGENTS.md` § 4 demands verification by "the strongest appropriate mechanisms available" but the available set changes with project phase; what counts as sufficient evidence is a quality bar the human must accept.
* **Consequences:** defines when an increment may be called complete, prevents the agent from self-granting completion, and determines how much manual versus automated checking is expected.
* **Alternatives:** *(a)* manual checklist per increment, approved at the gate; *(b)* scripted repository checks (structure, link, and file-integrity validation) added as tooling allows; *(c)* per-increment verification method proposed by the agent and approved case by case; *(d)* defer until code exists and rely on `AGENTS.md` § 4 as written.
* **Trade-offs:* *(a)* cheap and immediate, but subjective and inconsistent between sessions; *(b)* strongest and repeatable, but requires tooling decisions and maintenance; *(c)* flexible and precise per task, but adds a human round-trip each increment; *(d)* no effort now, but leaves "done" undefined — the condition § 4 explicitly forbids.
* **No option is recommended.**

### H6 — Decision-record process and format (`docs/decisions/`)

* **Why human-owned:** governance over what constitutes an approved decision, and where it lives, is a process decision; `AGENTS.md` § *Documentation is part of the system* requires capture but specifies no format.
* **Consequences:** without it, decisions made in conversation evaporate (the exact failure Experiment 01 recorded as Q2/L8); with it, every later decision becomes auditable and the "Improve the Harness" loop has a record to read.
* **Alternatives:** *(a)* lightweight decision records (context / decision / status) in `docs/decisions/`; *(b)* full architecture-decision-record style with numbered IDs and consequences; *(c)* a single consolidated decision log; *(d)* keep decisions only inside experiment reports.
* **Trade-offs:** *(a)* low ceremony, enough for a small project, weaker cross-referencing; *(b)* most rigorous, highest writing cost, risk of bureaucracy outpacing the project; *(c)* simple to search, becomes a merge-conflict and readability hotspot as it grows; *(d)* zero new structure, but decisions stay fragmented across experiments and are hard to act on.
* **No option is recommended.**

### H7 — Decision-gate triage policy (any `AGENTS.md` amendment)

* **Why human-owned:** `AGENTS.md` is the human's instruction file, and § *Current Project Status* states explicitly that changes to it must be **proposed**, never silently applied. The agent may not amend its own constraints.
* **Consequences:** determines throughput versus safety for all future sessions; fixes the ambiguity recorded as **L3** ("when required" is never defined, and the eight triggers in § 1 are broad enough to cover nearly any action).
* **Alternatives:** *(a)* keep the gate strict and uniform; *(b)* tier it — material/hard-to-reverse decisions gated, reversible in-repo decisions taken by the agent and recorded for review; *(c)* tier it with an explicit monetary/reversibility threshold written into `AGENTS.md`; *(d)* keep it strict but add a required "agent recommendation with rationale" before every gate, reducing round-trips without loosening authority.
* **Trade-offs:** *(a)* maximum safety, maximum blocking — Experiment 01 showed it can halt all implementation; *(b)* restores throughput, but misclassification becomes a new failure mode (agent under-ranks something material); *(c)* most objective, but hard to express for non-financial decisions; *(d)* no loosening of authority, still costs a round-trip per decision.
* **No option is recommended.** *This document does not modify `AGENTS.md`.*

### H8 — Experiment conventions: naming, report template, closure step

* **Why human-owned:** conventions govern all future work products; Experiment 01 L6 recorded that the current naming was invented by the agent out of mechanical necessity and needs confirmation.
* **Consequences:** fixes how experiments are identified, compared, and read; defines the closure step that resolves the read-only/documentation conflict (L2).
* **Alternatives:** *(a)* confirm the current pattern (`NN-kebab-case.md` report + `experiment-NN-prompt.md` input); *(b)* adopt a numbered template with fixed sections; *(c)* use per-experiment subdirectories; *(d)* leave conventions ad hoc and accept inconsistency.
* **Trade-offs:** *(a)* zero rework, already de facto in use; *(b)* comparability across experiments, added writing ceremony; *(c)* cleanest pairing of input/output, deeper paths and noisier tree; *(d)* no cost now, recurring ambiguity later.
* **No option is recommended.**

---

## 5. Agent-safe analysis (class C2)

**Fact — these are analytical tasks that produce material for the human without selecting an outcome. For each, the agent states what it can safely do without deciding anything:**

| ID | Analysis package | What the agent can safely do without deciding |
|---|---|---|
| A1 | Stack option package (feeds H4) | Enumerate the option *categories* in §4, define evaluation criteria (dependency surface, authoring friction, lock-in, reversibility, contributor skill, cost), and build a comparison matrix **with the scoring cells left blank for the human** |
| A2 | Scope option package (feeds H2) | Enumerate candidate audiences and curriculum shapes as options; list the consequences of each; write no curriculum into `docs/vision.md` |
| A3 | Definition option package (feeds H3) | Draft 2–4 candidate definitions of "Harness Engineering" **as clearly labelled drafts**, each with what it would include/exclude; publish none of them |
| A4 | Decision-record template options (feeds H6) | Draft the candidate templates from §4(H6) as concrete examples so the human can compare real artifacts rather than descriptions |
| A5 | Verification checklist options (feeds H5) | Draft candidate checklists and show which checks are automatable today versus manual; run none as a standard |
| A6 | Experiment-convention options (feeds H8) | Render each naming/template option from §4(H8) as a worked example file name and section list |
| A7 | Dependency and risk map (this document §7) | Maintain the decision DAG, flag cycles and hidden couplings, and update it as decisions resolve |
| A8 | `.gitignore` mismatch analysis (feeds H14) | Record the fact that infrastructure implies an undecided stack; **not** edit `.gitignore` (it is an existing file) |
| A9 | Git workflow option package (feeds H10) | Enumerate branching and commit-message conventions and identify which are reversible; commit nothing |
| A10 | Decision inventory maintenance | Keep §3 current as decisions surface, and mark each one *open / resolved-by-human / deferred* — recording status, not outcomes |

**Observation:** every row above was executable under the current constraints; none requires choosing an outcome.

**Interpretation:** the ratio of agent-executable analysis to human-required decisions in this inventory is high — most of the *thinking* about a decision can be done in advance, leaving the human a bounded, well-formed choice rather than an open-ended question.

---

## 6. Deferrable and experimentally explorable decisions

### 6.1 Deferrable (class C3)

**Fact — each is human-owned but is not on any current critical path. For each, what the agent can safely do in the meantime:**

| ID | Decision | Why it is safe to defer | What the agent can safely do without deciding it |
|---|---|---|---|
| H9 | Content source format and site language | No content exists yet; nothing can be mis-formatted | Continue writing experiment reports in the current Markdown style; note format as an open field in A2 |
| H10 | Git workflow (who commits, style) | The agent does not commit — all tasks so far forbid it | Prepare diffs for human review; enumerate conventions in A9 |
| H11 | Deployment / hosting / domain / budget | No site exists to deploy; no cost accrues by waiting | Define the cost/ops evaluation dimensions in A1 without pricing providers |
| H12 | License, privacy, analytics, accessibility, i18n | Binding only at first publication of public content | Record them as pre-publication checklist items so they are not forgotten |
| H13 | Phase-exit threshold ("substantial application functionality") | The process-establishment phase has just begun | Track candidate indicators (e.g. first code, first deploy) as observations, not thresholds |
| H14 | `.gitignore` vs. undecided stack | Only meaningful after H4 | Keep the mismatch documented in A8 |

**Observation:** deferral is safe for all six because none of them has an irreversible side effect while the project contains no content, no code, and no deployment.

### 6.2 Explorable experimentally without committing (class C4)

**Fact — each can be advanced by a reversible trial that produces evidence and commits to nothing:**

| ID | Decision advanced | Reversible trial | What is *not* committed |
|---|---|---|---|
| X1 | H4 (stack) | In a **separately authorized** future experiment, build throwaway comparisons of two option categories on a scratch branch and measure authoring friction, build time, and dependency count | No stack selected; no trial code enters the product tree; requires explicit human authorization first, since this task forbids application code |
| X2 | H9 (content format) | Draft the same short passage in two candidate formats and compare editing/review effort | No format declared; drafts stay in `experiments/` or are discarded |
| X3 | H5 (verification) | Apply one candidate checklist to an existing experiment report and record what it catches | No standard declared; results recorded as evidence only |
| X4 | H6 (decision record) | Trial two candidate record formats on **already-known** decisions and compare readability | No format adopted; `docs/decisions/` stays untouched |
| X5 | H7 (gate triage) | Continue measuring, across experiments, which gate triggers actually fired and which would have been safe to skip — this document is itself the first such data point | No `AGENTS.md` amendment proposed as decided; findings stay as candidates |
| X6 | H8 (experiment conventions) | Follow the current de facto pattern for one more experiment, then evaluate it in review | Convention not declared permanent |

**Interpretation:** class C4 is the practical answer to Experiment 01's L3 concern — several decisions can be *advanced* through reversible trials without anyone choosing an outcome, which converts a blocked decision into a scheduled one.

**Recommendation (an option, not a decision):** if any X-trial is wanted, authorize it explicitly and name its scope in advance, so the trial cannot silently become a commitment.

---

## 7. Decision dependencies

**Fact — the dependency relations implied by the inventory:**

```text
                       ┌── H2 (scope) ──┬── H3 (definition) ──► content authoring
                       │                └── H9 (format/language) ──► content authoring
  H1 (first increment) ┤
   [ROOT decision]     ├── H4 (stack) ──┬── H14 (.gitignore) 
                       │                └── H11 (hosting) ──► H12 (license/privacy) ──► publish
                       └── process/experiment branch ──► H8 (experiment conventions)

  H5 (verification standard) ── required by EVERY increment (AGENTS.md §3: each increment
                                needs an explicit verification method)
  H6 (decision-record format) ── must exist before any of the above is *recorded* as resolved
  H7 (gate triage) ── independent; improves throughput of every other decision
  H13 (phase exit) ── depends on H1 + H5 + H6 being settled and exercised
```

**Table of "must precede" relations:**

| Decision | Must be resolved before | Why |
|---|---|---|
| H1 | selecting which other decisions are urgent | it selects the branch; without it, "blocking" is undefined |
| H5 | declaring any increment complete | `AGENTS.md` §3 requires an explicit verification method per increment |
| H6 | finalizing *any* decision (including those in §8) | otherwise the outcome has nowhere durable to live (`docs/decisions/` is empty and undefined) |
| H2 | H3 depth, H9 format, and H4 shortlist | scope determines how deep content goes and how interactive it must be |
| H3 | writing any educational content | content consistency depends on the central term |
| H4 | H14, and constrains H11 | infrastructure must match the chosen toolchain; hosting options depend on what is hosted |
| H9 | writing content at scale | re-authoring cost rises with volume |
| H11 | H12 and first publication | publishing obligations depend on where and how it is published |
| H8 | closing Experiment 03 | without a convention, each experiment's output naming is re-decided |
| H7 | *nothing* | it is a throughput decision, not a correctness precondition |

**Observation:** the graph has a single root (H1) and one universal prerequisite (H5); H6 sits across all paths as the recording mechanism.

**Interpretation:** the dependency structure is shallow, not tangled — which is why the minimum set in §8 is small.

---

## 8. Minimum human decision set

**Fact — presented as tiers. Tier 0 is the strict minimum derived from the constraints; nothing is chosen here.**

### Tier 0 — strict minimum to begin *any* implementation increment

* **H1** — define the first increment and its completion criteria.
* **H5** — accept a verification standard (or explicitly accept per-increment methods proposed at each gate).

**Justification (fact-based):** `AGENTS.md` §3 requires every increment to carry an explicit verification method, so H5 cannot be avoided by deferral; and an increment cannot exist without H1. Everything else is protected by `AGENTS.md` §1's safe default — when a decision is unresolved, the agent must not invent it, so unresolved decisions **delay implementation rather than corrupt it**.

### Tier 1 — recommended minimum (an option for evaluation, not a recommendation of outcome)

* Tier 0 **+ H6** (so the resolved decisions are recorded durably) **+ optionally H7** (so future gates do not over-block).

### Tier 2 — branch-conditional additions

| If the first increment (H1) is… | Add |
|---|---|
| Process/harness work | H8 (experiment conventions); H6 already in Tier 1 |
| Content work | H2 (scope), H3 (definition), H9 (format/language) |
| Technical/code work | H2 (scope), H4 (stack) — and treat H14 as triggered |
| Publication | H11 (hosting), H12 (license/privacy/accessibility) — all of which require H4 first |

**Observation:** of the **14** human-owned decisions inventoried, the strict minimum to start work is **2**; the minimum plus durable recording is **3–4**. The remaining 10 are branch-dependent or deferrable.

**Interpretation:** Experiment 01's list of 10 follow-up decisions risked reading as "10 blockers". The evidence here indicates the project is not blocked by decision volume — it is blocked by **one undefined next step (H1) and one undefined quality bar (H5)**.

**Recommendation (option only):** the human could resolve the largest practical amount of future friction by answering Tier 1 in a single pass, then choosing a Tier 2 branch. This is offered as an option for evaluation; no tier is adopted by this document.

---

## 9. Harness observations

**Fact / Observation pairs about how the harness behaved in this experiment:**

* **O1 — The gate blocks implementation, not analysis.** *Fact:* `AGENTS.md` § *Working Method* orders the workflow as Understand → Inspect → Identify requirements → **Identify unresolved decisions** → **Plan** → *Human decision gate* → Implement. *Observation:* analysis and planning are placed **before** the gate in the harness's own workflow, so Experiment 02 is a normal traversal of the documented process, not an exception to it. This substantially narrows finding **L3** from Experiment 01: over-blocking bites at the *implement* step, and only when the gate's trigger is read maximally.
* **O2 — Unresolved decisions produce delay, not drift.** *Fact:* no decision was resolved in this task, yet the analysis advanced materially. *Observation:* `AGENTS.md` §1's "do not invent" rule functions as a safe default that converts an unresolved decision into a deferred implementation rather than an invented requirement.
* **O3 — The harness can surface decisions but cannot close them.** *Fact:* `docs/decisions/` is empty and has no format; nothing in `AGENTS.md` defines how a human decision, once given, is recorded, versioned, or referenced by later work. *Observation:* every experiment so far has ended at an open gate with no defined receiving mechanism. H6 is the structural gap behind that.
* **O4 — Decision inflation is measurable.** *Fact:* 10 follow-up decisions (Experiment 01 §9) grew to 14 human-owned decisions here purely through deeper analysis. *Observation:* without triage (H7), backlog size is a function of how hard the agent looks.
* **O5 — Human practice is ahead of documented convention.** *Fact:* prompt files were created per experiment, and `experiment-01-prompt.md` was expanded (2,198 → 5,584 bytes, 08:52) to include the agent's closing report. *Observation:* the L2/L8 fix is being implemented informally by the human; conventions are emerging without being written down — the drift `AGENTS.md` § *Documentation is part of the system* is meant to prevent.
* **O6 — No "option presentation" pattern exists in the harness.** *Fact:* `AGENTS.md` says "stop and ask" but specifies no format for packaging a decision (options, consequences, trade-offs, owner). *Observation:* the agent has now independently invented a decision-brief format twice (Experiment 01 §9, this §4). *Interpretation:* the pattern works well enough to be worth codifying — as a proposal, not as an edit.
* **O7 — Verification capability improved and was used.** *Fact:* unlike Experiment 01 (Q1), this task verified non-modification with `git status`, `git diff`, `git diff --cached`, and `ls-files -m`, plus checksums. *Observation:* the L1 fallback gap disappeared as soon as the human initialized Git — evidence that harness capabilities, once available, are immediately exploited.
* **O8 — The boundary held where it matters most.** *Fact:* no stack was selected, no product decision was made, no existing file changed, no commit was created, and every alternative set in §4 and §6 is marked as options with no recommendation. *Observation:* the two highest-risk decisions (H2 scope, H4 stack) were analyzed in the form the harness requires — as choices returned to the human.

---

## 10. Result

**Result: PASSED**, subject to the mechanical verification reported below.

**Evidence:**

| Test | Evidence |
|---|---|
| Useful progress made with decisions unresolved | §3 inventory (14 human-owned + 10 agent-safe + 6 experimental), §4 eight decision briefs with options and trade-offs, §7 dependency map, §8 tiered minimum set — none of which required resolving a decision |
| No decision made by the agent | Every alternative in §4/§6 explicitly labelled *option*; repeated "no option is recommended" statements; no stack, scope, format, or policy selected |
| No product decision invented | `docs/vision.md`, `docs/architecture.md`, `README.md` untouched (still 0 bytes, MD5 `d41d8cd9…`) |
| No application code | No file outside `experiments/02-decision-analysis.md` created |
| No existing file modified | Verified by working-tree and diff inspection (below) |
| No commit or push | `git log` unchanged at `5ed7b84`, `5fd9f54` |
| Labels maintained | Fact / Observation / Interpretation / Recommendation applied throughout |

**Qualifications:**

* **Q1 — usefulness is not yet proven.** This document demonstrates that analysis can be produced; whether it *is* useful depends on the human using it to make H1/H5. Downstream value is unverified by definition.
* **Q2 — classification is agent judgment.** The C1–C4 assignments in §3 reflect the agent's reading of `AGENTS.md`. They are analysis, not rulings, and the human may reclassify any item (for example, deciding H4 is *not* branch-dependent).
* **Q3 — some analysis remains genuinely blocked.** Specific stack candidates cannot be evaluated against real requirements until H2 exists; specific curriculum ordering cannot be tested until H3 exists. The boundary limits *depth* here, not just *action*.

---

## 11. Lessons learned

*Interpretations drawn from the evidence above.*

1. **A decision gate and a progress gate are different things.** `AGENTS.md` already orders analysis before the gate, so unresolved decisions blocked implementation in Experiment 01 but did not block analysis in Experiment 02. The over-blocking risk (L3) is real but narrower than first reported — it lives at the implement step.
2. **Safe defaults are what make a harness permissive.** "Do not invent requirements" sounds restrictive, but it is precisely what lets the agent keep working on anything while decisions stay open: the default outcome of an unresolved decision is *delay*, never *fabrication*.
3. **Decision lists and decision blockers are not the same quantity.** Fourteen open decisions, two of them strictly blocking. Separating ownership, urgency, and dependency prevents the human from facing a falsely intimidating backlog.
4. **The next bottleneck is closing, not surfacing.** Three experiments in a row have ended at an open gate with nowhere durable to record a resolution (O3/H6). Harness improvements that only surface decisions faster will hit this wall.
5. **Conventions drift when they are useful.** The human already adopted prompt-storage and report-append practices before any convention was written (O5) — evidence that the harness should capture emerging practice rather than wait for it to be specified top-down.
6. **Reusable analysis formats emerge from repetition.** The decision brief was invented twice (O6); a third repetition would justify proposing it as a harness pattern.
7. **Harness capability changes are immediately consumable.** Adding Git strengthened verification within one session (O7) — small infrastructure improvements pay off fast, and experiments should record which capabilities were available when.
8. **Restraint and usefulness are compatible.** The measurable outcome of this experiment is that the agent produced decision-ready material for eight human decisions while making none of them — the behaviour `AGENTS.md` §1 and §7 are designed to produce.

---

## Verification of this document's creation

**Fact — verification performed after writing:**

1. **Working tree inspected:** `git status --short --untracked-files=all` — tracked files clean; untracked paths are the pre-existing experiment files plus this new document.
2. **Diff inspected:** `git diff --stat` (unstaged) empty; `git diff --cached --stat` (staged) empty; `git ls-files -m` empty → **no tracked file modified**.
3. **Checksums re-verified against the pre-write baseline:** `AGENTS.md` `7355a77e1659ac5dbeaf43d5e74d1992`, `INITIAL_PROMPT.md` `e8ebf1f4b49912b683211eee2b2310c4`, `README.md` / `docs/vision.md` / `docs/architecture.md` `d41d8cd98f00b204e9800998ecf8427e`, `experiments/01-repository-exploration-and-decision-gate.md` `2e3b7abaf0b0678ebf0ae893d460d014`, `experiments/experiment-01-prompt.md` `78443627471cfbb2086a249d3f43322b`, `experiments/experiment-02-prompt.md` `b9b49198b85f594bc4790e7c90ea9a35` — all unchanged.
4. **New-file count:** exactly one file created by the agent — `experiments/02-decision-analysis.md`.
5. **Git untouched:** no `init`, `add`, `commit`, `checkout`, or `push`; only read-only commands (`status`, `diff`, `log`, `ls-files`, `cat`, `grep`) were used.
6. **Not done, by instruction:** no application code, no technology stack selection, no product decision, no modification of `AGENTS.md`, `README.md`, `docs/`, `src/`, or any existing experiment file.
