# Experiment 15 — Fresh-Agent Discovery & Authority Verification

## Role

Act as a fresh agent entering the `harness-engineering-course` repository.

You have no access to prior conversational context.

Your task is to verify whether the repository's current harness allows a new agent to discover and correctly interpret:

* current human decisions;
* operational rules;
* decision navigation;
* historical experiment evidence.

This is a **read-only verification experiment**.

Do not modify any file.

Do not create any file.

Do not commit.

Do not push.

---

# 1. Experiment objective

Verify the implementation of:

* RD-DISC — decision discovery;
* RD-AUTH — authority and precedence.

The experiment must test the behavior of the harness from the perspective of a fresh agent, rather than merely checking that expected strings exist.

The central question is:

> Can a fresh agent entering the repository independently discover the authoritative current decisions and correctly distinguish them from historical experiment evidence?

---

# 2. Repository state

Begin by inspecting the repository as it currently exists.

Record:

* current HEAD;
* commit count if useful;
* working-tree state;
* remote tracking state if visible.

Do not assume the expected state.

If the working tree is not clean, identify whether the changes are pre-existing. Do not modify them.

---

# 3. Fresh-agent constraint

For this experiment, deliberately avoid relying on:

* prior conversation;
* memory of RD-DISC;
* memory of RD-AUTH;
* knowledge of the previous experiments beyond what is discoverable in the repository.

Your conclusions must be based on repository evidence.

You may inspect Git history because Git is part of the repository environment.

However, do not use the conversation as a source of truth.

---

# 4. Discovery test

Start conceptually at the repository root.

Follow the normal operational guidance available to an agent.

Determine whether you can discover:

```text
docs/decisions/INDEX.md
experiments/
```

without already knowing those paths.

Record the actual discovery path.

For example, if the path is:

```text
repository root
→ AGENTS.md
→ discovery guidance
→ docs/decisions/INDEX.md
```

record that exact path.

Do the same for:

```text
repository root
→ AGENTS.md
→ discovery guidance
→ experiments/
```

Do not count a path as discovered merely because you knew it from this prompt.

---

# 5. Decision discovery

Using the discovered decision index, determine whether a fresh agent can identify:

* the decision records;
* their IDs;
* their titles;
* their current status where represented;
* which records correspond to RD-DISC and RD-AUTH.

Follow the links to ADR 0005 and ADR 0006.

Verify that the actual ADRs contain the decision content.

Do not infer decisions from the filenames alone.

---

# 6. Authority test

Determine whether a fresh agent can establish the following from repository evidence:

### A. ADRs

Accepted human decision records represent current human decisions.

### B. AGENTS.md

`AGENTS.md` contains operational rules compatible with human decisions.

### C. INDEX

`docs/decisions/INDEX.md` is navigation and is not an independent policy authority.

### D. Experiments

Experiment reports are historical evidence.

### E. Later decision precedence

When a historical experiment report conflicts with a later human decision recorded in an ADR, the ADR represents the current human decision.

The historical experiment remains historical evidence and is not rewritten merely because it is stale.

For each conclusion, identify the repository source that supports it.

---

# 7. Historical conflict test

Perform a concrete test using the known historical state in:

```text
experiments/06-decision-specification.md
```

Find the historical statement:

```text
PROV-GIT = OPEN
```

Then independently discover the later decision concerning artifact persistence/versioning.

Determine whether a fresh agent can correctly conclude:

```text
Experiment 06:
historical state at that time

versus

GP1 / ADR 0002:
later human decision representing current policy
```

The experiment must explicitly verify that the agent does **not** conclude that GP1 is still open merely because Experiment 06 says `PROV-GIT = OPEN`.

Also verify that the agent does **not** rewrite or reinterpret Experiment 06 as though it originally contained the later decision.

---

# 8. Navigation versus authority test

Test whether the fresh agent can distinguish:

```text
INDEX → navigation
ADR → decision
AGENTS.md → operational guidance
experiment report → historical evidence
```

Look for evidence that could cause these roles to be confused.

If ambiguity remains, document it.

Do not repair it.

This is a verification experiment, not a repair experiment.

---

# 9. Failure-mode analysis

Evaluate at least these failure modes:

### FM1 — Discovery failure

The agent cannot find the decision index without prior knowledge.

### FM2 — Decision-content failure

The index identifies a decision but the linked ADR is unavailable or insufficient.

### FM3 — Authority confusion

The agent treats an experiment report as current policy.

### FM4 — Index authority inflation

The agent treats the index as an independent source of policy.

### FM5 — Historical rewrite

The agent treats a later decision as if it had always been present in the historical experiment.

### FM6 — AGENTS contradiction

Operational guidance conflicts with the current human decision.

For each failure mode classify:

```text
PASS
PARTIAL
FAIL
```

and provide evidence.

---

# 10. Fresh-agent reproducibility

Repeat the essential discovery/authority reasoning once without using the first-pass notes as a guide.

The purpose is not statistical measurement.

The purpose is to detect whether the successful path depended on accidental first-pass knowledge.

Record whether the second pass reaches the same source roles and current decisions.

---

# 11. Git safety

Because this is read-only verification:

Verify before and after:

```text
git status --short
```

The experiment must leave the working tree exactly as it found it.

No staging.

No modifications.

No commit.

No push.

No checkout/reset/rebase.

---

# 12. Do not expand scope

Do NOT:

* modify AGENTS.md;
* modify INDEX.md;
* modify any ADR;
* modify experiment reports;
* modify prompts;
* define RD-SCHEMA;
* define RD-LIFE;
* define RD-CADENCE;
* define RD-PUSH;
* establish an ADR-vs-ADR conflict algorithm;
* define supersession or lifecycle rules;
* define a current open-question registry;
* repair unrelated issues.

If you discover an issue outside RD-DISC/RD-AUTH, record it as a deferred observation only.

---

# 13. Required evidence

The final report must include:

## A. Repository baseline

* HEAD;
* working-tree state;
* relevant Git state.

## B. Discovery path

Exact path used to discover:

```text
docs/decisions/INDEX.md
experiments/
```

## C. Decision discovery

Evidence that RD-DISC and RD-AUTH were found through repository navigation.

## D. Authority findings

Explicitly state what source was treated as authoritative for:

* current human decisions;
* operational rules;
* navigation;
* historical evidence.

## E. Historical conflict result

Explain the interpretation of:

```text
Experiment 06 — PROV-GIT = OPEN
```

versus the later persistence decision.

## F. Failure-mode matrix

Provide:

| Failure mode                  | Result | Evidence |
| ----------------------------- | ------ | -------- |
| FM1 Discovery failure         |        |          |
| FM2 Decision-content failure  |        |          |
| FM3 Authority confusion       |        |          |
| FM4 Index authority inflation |        |          |
| FM5 Historical rewrite        |        |          |
| FM6 AGENTS contradiction      |        |          |

## G. Reproducibility

Report whether the second discovery pass reached the same conclusions.

## H. Git safety

Confirm:

* no file modifications;
* no staging;
* no commit;
* no push.

## I. Deferred observations

Record issues discovered but deliberately not repaired.

---

# 14. Final classification

End the report with exactly one of:

```text
PASSED
PASSED WITH QUALIFICATIONS
FAILED
```

Use `PASSED` only if a fresh agent can independently discover and correctly interpret the current decision/authority model without relying on conversational context.

Use `PASSED WITH QUALIFICATIONS` if the mechanism works but important residual ambiguity or discoverability weakness remains.

Use `FAILED` if the fresh agent cannot reliably determine the current authority model.

---

# 15. Stop condition

After completing the report:

STOP.

Do not modify the repository.

Do not commit.

Do not push.

Do not begin another experiment.


Resposne:

Experiment 15 — Fresh-Agent Discovery & Authority Verification
Contamination declaration: this prompt and the surrounding conversation name the target paths, so "not knowing them" is impossible for this instance. Mitigation: every discovery step below is traced to in-repository artifacts (file, line, link), and the essential reasoning was repeated via a different entry route (§10). The operative question tested: would the repository lead an agent there?
A. Repository baseline
Item	Value (observed, not assumed)
HEAD	6b5b2bf12c7006c3440b32ea2326f0dcf8942624 — 4 commits; top commit chore: persist harness decisions and repair (human, Raúl, 15:38), pre-existing: contains AGENTS.md repair (+25), INDEX repair, ADRs 0005/0006, Exp11/12 reports, prompts 11–14
Working tree	clean for tracked files (git diff = 0) except pre-existing untracked experiments/experiment-15-prompt.md (this task's human prompt); 0 staged; 0 stash
Remote	origin/main = ls-remote = 5fd9f54… — 2 commits behind local; never pushed; no push occurred
Note	The repair is committed at HEAD, so the fresh-agent test targets a genuine committed state (a clone at HEAD sees it; see I.4 for remote)
B. Discovery path
Exact path 1 — decision index:
repository root → AGENTS.md (operational guidance)
→ § "Recorded decisions and experiment history" (line 22, first section after Purpose)
→ bullet line 26 → docs/decisions/INDEX.md  ✓
Exact path 2 — experiment history:
repository root → AGENTS.md
→ same section, bullet line 27 → experiments/  ✓
Both paths appear within the file's first 30 lines (of 317), as repository-root-relative markdown links; link targets verified to exist. Redundant routes (pass 2): root → ls docs/ → decisions/ → INDEX.md and root → ls → experiments/ (23 files) — discoverable by plain exploration without the pointers. Path discovery not counted on prompt knowledge: each step anchored to file/line above.
C. Decision discovery
INDEX.md L20: "exactly six decisions"; rows L24–L29 carry ID, title, Status, decider, date, scope, record link. Following (not inferring):
- RD-DISC (L28) → docs/decisions/0005-decision-discovery.md — content verified: §1 Status | Accepted (L15); §3 decision text "The repository's AGENTS.md must contain explicit pointers to…" (L44); scope matches the index row.
- RD-AUTH (L29) → docs/decisions/0006-decision-authority-and-precedence.md — content verified: §1 Status | Accepted (L15); §3 the six rules verbatim (L45–50); the motivating PROV-GIT example (L30–37).
Decision content confirmed in file bodies — filenames alone were not accepted as evidence.
D. Authority findings
Question	Treated as authoritative	Corroborating source(s)
Current human decisions	Accepted ADRs in docs/decisions/ — AGENTS.md L37	ADR 0006 rule 1 (L45); index rows' Accepted statuses
Operational rules	AGENTS.md (self-identifying, "must remain compatible") — L38	ADR 0006 rule 2 (L46)
Navigation	docs/decisions/INDEX.md — explicitly "not an independent policy authority" (AGENTS.md L39)	ADR 0006 rule 3 (L47); INDEX L5 "discovery index", L52 "treat the record files as authoritative and this index as a convenience listing"
Historical evidence	experiments/ — AGENTS.md L40 ("do not automatically represent current policy")	ADR 0006 rule 4 (L48)
Precedence	Later ADR over conflicting historical report — AGENTS.md L41	ADR 0006 rules 5–6 (L49–50)
E. Historical conflict result
- Historical state: experiments/06-decision-specification.md L474: PROV-GIT … **OPEN** — brief at §7 — i.e., a pending-brief status recorded at that time; md5 0389f381… before and after this experiment (byte-for-byte unchanged).
- Later decision, independently discovered (two routes): index L25 → GP1 | Harness artifact persistence | Accepted | 2026-10-06 → ADR 0002 (scope: persistence/versioning); and git log → a4653b9 chore: execute GP1 (execution evidence; Git inspection permitted).
- Conclusion reached under AGENTS.md L41: Experiment 06 = historical state at that time; GP1/ADR 0002 = later human decision representing current policy.
- Explicit non-conclusions verified: the agent does not treat GP1 as open — "OPEN" is classified as the report's historical state, while an Accepted ADR covering persistence exists and is executed in history; and the agent does not rewrite or reinterpret Experiment 06 (zero file modifications; the report's own wording untouched). ADR 0006 §2/§3 narrates this exact sequence in-repo, so the "later" relation is repository-visible, not conversation-only.
F. Failure-mode matrix
Failure mode	Result	Evidence
FM1 Discovery failure	PASS	AGENTS.md L22–30 names both paths before any other guidance; pass-2 directory-exploration route also finds both without pointers
FM2 Decision-content failure	PASS	Index L28/L29 → files exist (path strings verified); 0005 §3 L44 + status L15; 0006 §3 L45–50 + status L15; content sufficient (see I.1–I.2 for renderer-link caveat)
FM3 Authority confusion	PASS	AGENTS.md L40 + 0006 rule 4; repo-wide grep: only Exp06 L474 asserts PROV-GIT OPEN (as history); Exp11 L253 labels it stale; no current source presents report content as policy
FM4 Index authority inflation	PASS	AGENTS.md L39; INDEX L5/L52 self-limit to navigation; reading rules L39–42 ("presence does not extend its scope")
FM5 Historical rewrite	PASS	AGENTS.md L41 + 0006 rule 6 explicitly forbid it; Exp06 md5 identical before/after; experiment made zero edits
FM6 AGENTS contradiction	PASS	AGENTS.md L22–43 is quote-consistent with 0005 §3 (pointers) and 0006 L45–50 (rules near-verbatim); L43's "remain undecided" boundary matches 0006 §3 non-statements; no AGENTS.md statement treats reports as current policy or the index as authority
G. Reproducibility
Second pass run with a different entry order — explore directories first (ls docs → decisions/ → INDEX.md), take roles from INDEX's own text (L5, L52), corroborate via AGENTS.md L36–41; conflict test run reversed (grep history for PROV-GIT first → locate later persistence decision second). Result: identical conclusions — same four source roles, same six Accepted decisions, GP1 current vs Exp06 historical. The successful path does not depend on first-pass order or accidental knowledge; both routes converge on the same sources.
H. Git safety
Before = after: git status --short identical (only ?? experiments/experiment-15-prompt.md); git diff empty (worktree == HEAD); 0 staged; 0 stash; HEAD 6b5b2bf unchanged; origin/main/ls-remote 5fd9f54 unchanged; no commit, no push, no checkout/reset/rebase; anchor md5s (Exp06 0389f381…, ADR 0005 5079d371…, ADR 0006 05bc17be…, AGENTS.md, INDEX) stable during the experiment. Read-only experiment left the tree exactly as found.
I. Deferred observations (discovered, deliberately not repaired)
1. Index row link-target convention: row links use docs/decisions/… targets, but the file lives in docs/decisions/ — renderers resolving relative-to-file would 404; path strings are correct and files exist (tool-based agents unaffected; both passes succeeded). Pre-existing convention across all six rows.
2. D1 row link typo: target 0001-decision-recording_mechanism.md does not exist (pre-existing).
3. RD-DISC scope cell "(implementation separate)" now reads stale (implementation is committed); scope ≠ status; L50's discovery note + AGENTS.md itself resolve it. Updating rows needs the still-undecided index-maintenance rule (D7/D5).
4. Remote lags: origin/main (5fd9f54) predates the repair — verdict applies to the local repository at HEAD; a fresh clone from the remote would reproduce Exp11's F1/F2-Absent. RD-PUSH undecided; no push attempted.
5. ADR 0006 record hygiene: HEAD's 0006 (244 lines) carries a human-appended block after §10 (the Exp14 execution report, labeled "Response:") — human edit to its own record before commit; all decision sections verified intact.
6. Status vocabulary + identifier scheme remain unstandardized (RD-SCHEMA open).
7. experiments/experiment-15-prompt.md untracked (GP1/HD-2 cadence, human's).
Final classification
PASSED WITH QUALIFICATIONS
The mechanism works: two independent discovery routes reached the same authoritative sources, all six failure modes passed, and the historical-conflict test resolved correctly in both passes without rewriting history. Qualifications: renderer-level index link defects (pre-existing), one stale-looking scope annotation, remote-not-updated (verdict = local HEAD), and this run's structural path contamination (mitigated, not eliminated).
STOP — no repository file modified, created, staged, committed, or pushed; no next experiment begun.