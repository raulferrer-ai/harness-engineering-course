import test from "node:test";
import assert from "node:assert/strict";
import { transitionRecoveryState, canPromote } from "../src/recovery-gates.mjs";

test("recovery state machine accepts the controlled rollback path", () => {
  let state = "healthy";
  for (const event of ["degraded", "contained", "rollback_started", "rollback_verified", "recovery_verified"]) {
    const result = transitionRecoveryState(state, event);
    assert.equal(result.accepted, true, `${state} -> ${event}`);
    state = result.state;
  }
  assert.equal(state, "recovery_verified");
});

test("recovery state machine rejects skipping containment and rollback verification", () => {
  assert.deepEqual(transitionRecoveryState("degraded", "rollback_started"), {
    accepted: false, state: "degraded", reason: "invalid_transition"
  });
  assert.equal(transitionRecoveryState("rollback_started", "recovery_verified").accepted, false);
});

test("rollback failure returns to containment, not promotion", () => {
  assert.equal(transitionRecoveryState("rollback_started", "rollback_failed").state, "rollback_failed");
  assert.equal(transitionRecoveryState("rollback_failed", "contained").state, "contained");
  assert.equal(canPromote({ state: "rollback_failed", regressionPassed: true, artifactVerified: true, incidentClosed: true }).allowed, false);
});

test("promotion requires verified recovery, regression, artifact and incident closure", () => {
  const valid = { state: "recovery_verified", regressionPassed: true, artifactVerified: true, incidentClosed: true };
  assert.equal(canPromote(valid).allowed, true);
  for (const field of ["regressionPassed", "artifactVerified", "incidentClosed"]) {
    assert.equal(canPromote({ ...valid, [field]: false }).allowed, false, field);
  }
  assert.equal(canPromote({ ...valid, state: "rollback_verified" }).reason, "recovery_not_verified");
});
