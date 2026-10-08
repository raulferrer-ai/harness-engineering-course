# Experiment 14 — Implement RD-DISC and RD-AUTH

## Role

Act as the implementation agent for the `harness-engineering-course` repository.

This is the first harness-repair implementation experiment.

Two human decisions have already been approved and recorded:

* **RD-DISC** — ADR 0005
* **RD-AUTH** — ADR 0006

Your task is to implement only those two decisions in the repository's operational guidance.

You MUST NOT make new governance decisions.

You MUST NOT expand the scope of the repair.

---

# 1. Authoritative decisions

Read:

```text id="fd5z5r"
docs/decisions/0005-decision-discovery.md
docs/decisions/0006-decision-authority-and-precedence.md
```

Treat those ADRs as the authoritative specification for this experiment.

Also read:

```text id="1j35je"
docs/decisions/INDEX.md
AGENTS.md
experiments/12-harness-repair-decision-analysis.md
experiments/13-*
```

Do not rely on conversational context.

---

# 2. Objective

Implement the minimum repository changes necessary to make RD-DISC and RD-AUTH operationally effective.

The repair must ensure that a future agent entering the repository can determine:

1. where current human decisions are recorded;
2. where experiment history is recorded;
3. which source represents current human decisions;
4. which source represents operational rules;
5. that the decision index is navigation rather than independent policy;
6. that experiment reports are historical evidence;
7. that a later human decision recorded in an ADR takes precedence over an earlier historical experiment state.

---

# 3. Allowed files

You may modify ONLY:

```text id="yqkt3x"
AGENTS.md
docs/decisions/INDEX.md
```

No other file may be modified.

Do NOT modify:

* any ADR;
* any experiment report;
* any experiment prompt;
* README.md;
* `.gitignore`;
* source code;
* configuration;
* Git history.

You may create no new file.

---

# 4. Required implementation — RD-DISC

Add an explicit discovery section to `AGENTS.md`.

It must point to:

```text id="q4m9cu"
docs/decisions/INDEX.md
experiments/
```

The wording must make clear:

* `docs/decisions/INDEX.md` is the entry point for human decisions;
* individual ADRs are the decision records;
* `experiments/` contains experimental history;
* agents should consult these sources when relevant before making changes.

Do not create a new discovery mechanism.

Do not duplicate the complete contents of the index.

Keep the guidance concise.

---

# 5. Required implementation — RD-AUTH

Add an explicit authority/precedence section to `AGENTS.md`.

It must operationalize exactly the approved minimum rule.

The section must communicate:

### Current human decisions

Accepted human decision records/ADRs represent current human decisions.

### Operational rules

`AGENTS.md` contains operational rules and must remain compatible with human decisions.

### Index

`docs/decisions/INDEX.md` is navigation/index material.

It is not an independent policy authority.

### Historical evidence

`experiments/` contains historical evidence.

Experiment reports document what was observed, analyzed, or decided at the time.

They do not automatically represent current policy.

### Later human decision

When a historical experiment report conflicts with a later human decision recorded in an ADR, the ADR represents the current human decision.

The historical experiment report remains historical evidence.

Do not rewrite the experiment report merely to remove the historical state.

---

# 6. Do not over-specify authority

This is critical.

RD-AUTH does NOT authorize you to invent:

* a complete hierarchy among all repository documents;
* an ADR-vs-ADR conflict algorithm;
* status lifecycle rules;
* supersession rules;
* amendment rules;
* retention rules;
* temporal ordering machinery;
* automatic conflict resolution;
* an open-question registry;
* a schema for future ADRs.

If the approved decision does not answer something, leave it unresolved.

Do not turn reasonable implementation preferences into governance rules.

---

# 7. INDEX.md repair

Inspect the current `docs/decisions/INDEX.md`.

Experiment 12 identified a contradiction in its reading rule:

> the current list of open questions lives in experiment reports.

This is incompatible with RD-AUTH because experiment reports are historical evidence.

Repair this wording **only to the minimum extent required to make the index consistent with RD-AUTH**.

The corrected wording must NOT invent a new open-question registry.

It should instead make clear that:

* experiment reports may contain open questions as historical context;
* they are not automatically the current authoritative list of open questions;
* unresolved current governance questions must not be inferred from historical experiment reports alone.

Do not create a new registry.

Do not define how unresolved questions are maintained unless already decided.

---

# 8. Preserve history

Do NOT edit:

```text id="0v79ep"
experiments/06-decision-specification.md
```

even though it contains the stale:

```text
PROV-GIT = OPEN
```

This is intentional.

The purpose of the repair is to teach the future agent how to interpret that historical statement.

The experiment report is evidence of what was true/open at that time.

The later ADR is the current decision.

---

# 9. Minimality requirement

Before editing, identify the smallest textual changes needed.

Do not restructure `AGENTS.md`.

Do not rewrite existing sections unnecessarily.

Do not reorder unrelated material.

Do not change existing rules unless required to remove a direct contradiction with RD-DISC or RD-AUTH.

If an existing statement is compatible with the new decisions, leave it untouched.

---

# 10. Pre-implementation decision check

Before modifying files, verify that every planned change can be traced to:

```text
RD-DISC
or
RD-AUTH
```

If you identify another desirable repair that is not required by these decisions:

* do NOT implement it;
* record it as a deferred observation in your execution report.

If you encounter an ambiguity that requires a new human governance decision, STOP before modifying files and report it.

---

# 11. Verification

After implementation, verify at minimum:

## A. Discovery

Starting conceptually from the repository root, an agent reading `AGENTS.md` can find:

```text
docs/decisions/INDEX.md
experiments/
```

without needing prior knowledge of their paths.

## B. Authority

An agent can determine from `AGENTS.md`:

* ADRs represent current human decisions;
* INDEX is navigation;
* experiments are historical evidence;
* later ADR decision beats earlier historical experiment state.

## C. Historical preservation

Verify:

```text
experiments/06-decision-specification.md
```

is byte-for-byte unchanged.

Also verify all ADRs remain unchanged.

## D. Scope

Verify that no unrelated file was modified.

## E. Consistency

Check for contradictions introduced between:

* `AGENTS.md`
* `docs/decisions/INDEX.md`
* ADR 0005
* ADR 0006

Do not attempt to prove consistency with unresolved policies not covered by these decisions.

---

# 12. Git verification

Before finishing:

* record HEAD;
* verify whether the working tree was clean before implementation;
* inspect `git diff`;
* inspect `git diff --check`;
* verify no files are staged;
* verify no commit was created;
* verify no push occurred;
* verify remote reference remains unchanged;
* identify every modified path.

The expected modified paths are:

```text
AGENTS.md
docs/decisions/INDEX.md
```

If any other path changed, investigate and report it.

---

# 13. Important commit boundary

DO NOT COMMIT.

Even though HD-2 permits an agent to commit after announcing its intention and explaining why, this experiment explicitly ends before the commit.

The purpose is to verify the implementation independently before deciding whether to commit it.

---

# 14. Required execution report

Return a concise report containing:

1. Files modified.
2. RD-DISC implementation summary.
3. RD-AUTH implementation summary.
4. INDEX contradiction repaired.
5. Historical reports preserved.
6. Unrelated changes avoided.
7. Verification performed.
8. Git state.
9. Deferred observations, if any.
10. Confirmation that no commit or push occurred.

---

# 15. Stop condition

After implementation and verification:

STOP.

Do not:

* create another experiment;
* commit;
* push;
* implement RD-SCHEMA;
* implement RD-LIFE;
* implement RD-CADENCE;
* implement RD-PUSH;
* modify experiment history;
* modify website/product files.

The human will review the implementation result before any commit or further repair.


Response: