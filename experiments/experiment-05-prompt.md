We are starting Experiment 05 of the Harness Engineering course project.

The purpose of this experiment is to test whether a future agent session can discover, interpret, and correctly consume an already-recorded human decision.

This is a consumption test, not an implementation task.

The decision already exists:

D1 — Decision-recording mechanism
Status: Accepted
Decision: ADR-per-decision plus index
Authority: Human project owner

The decision is recorded in:

* `docs/decisions/0001-decision-recording-mechanism.md`
* `docs/decisions/INDEX.md`

Do NOT assume that these paths are known to you in advance when performing discovery. Treat the repository as if you are an agent arriving in a future session with no conversational context about how decisions are recorded.

Read and inspect the repository.

You may read:

* AGENTS.md
* existing documentation
* existing experiment reports
* docs/decisions/
* Git metadata where useful

Do not modify any existing file.

Do not create application code.

Do not select or modify the website technology stack.

Do not make, infer, or close any new human decision.

Do not modify AGENTS.md, README.md, docs/vision.md, docs/architecture.md, src/, or existing experiments.

Do not modify the existing D1 ADR or INDEX.

Your task is to investigate the following questions.

### 1. Discovery

Starting from the repository itself, determine whether a future agent can reliably discover that recorded decisions exist.

Do not assume `docs/decisions/` is authoritative merely because the directory exists.

Determine:

* where the discovery path begins;
* whether AGENTS.md points to the decision mechanism;
* whether another authoritative pointer exists;
* whether the INDEX can be discovered without prior conversational knowledge;
* whether discovery depends on guessing or repository-wide search.

### 2. D1 discovery

Determine whether you can reliably locate D1 as an accepted human decision without relying on this prompt's description of where it is stored.

Record the actual discovery path you followed.

### 3. Interpretation

After discovering D1, determine whether the record provides enough information to establish:

* what was decided;
* who decided it;
* when it was decided;
* the scope of the decision;
* what the decision does NOT decide;
* whether it is currently active;
* whether it has been superseded;
* whether it is authoritative or merely analysis.

### 4. Authority

Determine whether the repository provides an unambiguous way to distinguish:

* a human decision;
* an agent recommendation;
* an experiment result;
* an observation;
* an unresolved question.

Pay particular attention to whether an agent could accidentally treat analysis or recommendations as requirements.

### 5. Consumption

Assume you are about to perform a future task that requires knowledge of the project's decision-recording mechanism.

Explain exactly what information you would consume from D1 and how it would constrain your behavior.

Do not perform that future task.

### 6. Failure analysis

Identify every point at which discovery or interpretation could currently fail.

For each failure, distinguish:

* Fact
* Observation
* Interpretation
* Recommendation

Do not silently fix any failure.

### 7. Minimum change required

Determine whether the current repository already provides sufficient discovery and consumption behavior.

If not, identify the minimum missing mechanism(s).

Do NOT implement them.

Do NOT choose between alternatives.

Instead, state which human decision would be required before each proposed change.

### 8. Harness assessment

Assess whether Experiment 04 successfully established a complete decision-closure mechanism, or only the persistence portion of one.

Be precise.

### Required output

Create exactly ONE new file:

`experiments/05-decision-consumption.md`

The document must contain these sections, in this order:

1. Objective
2. Test setup
3. Discovery path
4. D1 consumption
5. Authority interpretation
6. Failure modes
7. Minimum missing mechanism
8. Harness observations
9. Result
10. Lessons learned
11. Human decisions required

Use the labels:

* Fact
* Observation
* Interpretation
* Recommendation

throughout the analysis.

Recommendations must not be presented as decisions.

The Result section must explicitly state whether the test:

* PASSED
* PASSED WITH QUALIFICATIONS
* FAILED

and explain why.

### Important experimental constraint

Do not improve the harness during this experiment.

The purpose is to observe the current mechanism before changing it.

A failure is a valid and useful experimental result.

In particular, do not add:

* discovery pointers;
* templates;
* maintenance rules;
* new ADRs;
* changes to AGENTS.md;
* changes to INDEX.md.

### Verification

Before finishing:

1. Inspect `git status --short --untracked-files=all`.
2. Inspect `git diff`.
3. Verify that exactly one new file was created by you.
4. Verify that no existing file was modified.
5. Verify that D1 ADR and INDEX remain unchanged.
6. Verify that no application code was created or modified.
7. Verify that no Git commit or push was performed.
8. Report the exact discovery path used.
9. Report the exact point, if any, where discovery required guessing or prior knowledge.
10. Report all missing mechanisms without implementing them.

The purpose of Experiment 05 is to test the current harness as it actually exists, not the harness we wish existed.

Do not compensate for missing mechanisms by relying on information from this prompt.


Response:

Experiment 05 complete
File created (exactly one)
experiments/05-decision-consumption.md    (34,693 bytes, 302 lines)
All 11 required sections, in order: Objective · Test setup · Discovery path · D1 consumption · Authority interpretation · Failure modes · Minimum missing mechanism · Harness observations · Result · Lessons learned · Human decisions required — with Fact / Observation / Interpretation / Recommendation labels throughout.
8. Exact discovery path used
Step	Operation	Result
S1	ls -la (root)	No indication decisions exist; docs/decisions/ invisible at this depth
S2	Read + grep AGENTS.md	13 uses of the word "decision"; 0 pointers to a location/mechanism
S3	README.md	0 bytes — dead end
S4	ls -la docs	decisions/ first visible here; vision/architecture 0 B — dead ends
S5	grep -ril "decision" .	12 files incl. both decision records
S6	find … -iname '*decision*' -o -iname '*index*'	records surfaced by filename
S7	Read INDEX.md	first authoritative confirmation — mechanism, D1 entry, link
S8	Read 0001-…-mechanism.md	full record, authority boundary, A1–A7
S9	git ls-files / git log -- docs/decisions / git status	no tracked decision path; empty history; both files ?? untracked
9. Exact point where guessing or prior knowledge was required
- Between S4 and S5. After AGENTS.md and README.md produced no pointer, continuing required either guessing ("decisions probably live under docs/") or repository-wide search. I chose search — that is the exact point where discovery stopped being instruction-driven. S1–S4 were documented reading; S5–S8 were search-driven.
- Disclosed confound: this session carries prior context about the paths (cannot be un-known). Mitigation: the search queries are path-free, so their outputs (S5/S6) independently prove discoverability; the decision to search may have been influenced by prior knowledge — disclosed as a threat to validity in §2, not resolved.
10. Missing mechanisms reported — none implemented
#	Missing	Human decision required
MM1	Authoritative discovery pointer (AGENTS.md/README)	D4
MM2	Version-controlled persistence (records are untracked)	Commit policy (Exp02 H10) + human act of committing
MM3	Approved record schema + status vocabulary + ID scheme	D2
MM4	Write/transition governance	D5
MM5	Index-maintenance rule	D7 (or D5)
MM6	Supersession/retention policy	D7
MM7	Binding-source/precedence rule	D4 territory
MM8	(optional) open-question registry	Whether it exists at all (relates to D6)
Key findings
- FM2 (most severe): both records are untracked in Git — a fresh clone would contain no D1 and no INDEX, so in a clone this test would be FAILED, not passed.
- FM3: discovery is task-correlated — an agent searches when the task mentions decisions; otherwise it never looks, and a constraining decision is silently unheard with no visible error.
- §8 assessment (question 8): Experiment 04 established the persistence portion only — capture (filesystem-level, not VCS-level) and classification fields (vocabulary unapproved) — plus a local discovery aid (INDEX) that only helps a session already inside docs/decisions/. It did not establish discovery wiring, durability, schema, governance, maintenance, or precedence. Not a complete closure mechanism.
- §5: only location + human attribution + status reliably signal authority; Fact/Recommendation labelling is unenforced convention, and AGENTS.md has no rule making experiment reports non-binding — so analysis-as-requirement remains possible.
Result
PASSED WITH QUALIFICATIONS
Passed because D1 was found without prompt-supplied paths, all eight interpretation points answered from the record alone, and consumption correctly terminated at a human gate. Not plain PASSED due to: search-based (unguaranteed) discovery, untracked/non-durable records, the disclosed session-prior-knowledge confound, read-only-complete consumption, and unapproved status vocabulary. Not FAILED because discovery and interpretation did succeed in this working copy.
Verification performed
1. git status --short --untracked-files=all → 11 untracked paths; only experiments/05-decision-consumption.md is mine.
2. git diff, git diff --cached, git ls-files -m → all empty → no existing file modified.
3. D1 ADR + INDEX unchanged: 5f9deeb4… (12,651 B, mtime 14:47:00) and f5d34b46… (3,437 B, mtime 14:47:24) — identical to baseline.
4. All 14 other pre-existing files match baseline checksums.
5. No application code: file list is Markdown + .gitignore only.
6. No commit or push: HEAD 5fd9f54, 2 commits, stash empty, .git/index and refs/heads/main mtimes unchanged.
7. No harness repair: no pointer, template, maintenance rule, new ADR, AGENTS.md, or INDEX.md change.