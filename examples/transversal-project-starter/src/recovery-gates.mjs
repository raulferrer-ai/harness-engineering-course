const allowedTransitions = {
  healthy: ["degraded"],
  degraded: ["contained"],
  contained: ["rollback_started"],
  rollback_started: ["rollback_verified", "rollback_failed"],
  rollback_failed: ["contained"],
  rollback_verified: ["recovery_verified"],
  recovery_verified: ["promotion_allowed"]
};

export function transitionRecoveryState(state, event) {
  if (!Object.hasOwn(allowedTransitions, state)) {
    return { accepted: false, state, reason: "unknown_state" };
  }
  if (!allowedTransitions[state].includes(event)) {
    return { accepted: false, state, reason: "invalid_transition" };
  }
  return { accepted: true, state: event, reason: "transition_accepted" };
}

export function canPromote({ state, regressionPassed = false, artifactVerified = false, incidentClosed = false }) {
  if (state !== "recovery_verified") return { allowed: false, reason: "recovery_not_verified" };
  if (!regressionPassed) return { allowed: false, reason: "regression_not_passed" };
  if (!artifactVerified) return { allowed: false, reason: "artifact_not_verified" };
  if (!incidentClosed) return { allowed: false, reason: "incident_not_closed" };
  return { allowed: true, reason: "all_recovery_gates_passed" };
}
