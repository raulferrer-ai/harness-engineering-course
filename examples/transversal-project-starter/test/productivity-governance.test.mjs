import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { calculateProductivityComparison, recommendAdoption } from "../src/productivity-governance.mjs";

const fixture = JSON.parse(await readFile(new URL("../../../fixtures/lab10-productivity-governance.json", import.meta.url), "utf8"));
const comparison = fixture.comparison;

test("calculates complete costs and quality ratios from the fixture", () => {
  const result = calculateProductivityComparison(comparison);
  assert.equal(result.complete, true);
  assert.ok(Math.abs(result.groups.baseline.costPerAcceptedDelivery - 58.5882352941) < 0.001);
  assert.ok(Math.abs(result.groups.assisted.costPerAcceptedDelivery - 50.1428571429) < 0.001);
  assert.ok(result.groups.assisted.defectsPerAcceptedDelivery > result.groups.baseline.defectsPerAcceptedDelivery);
  assert.ok(result.deltas.costPerAcceptedDeliveryPercent < 0);
});

test("missing failure cost yields incomplete result instead of treating it as zero", () => {
  const incomplete = structuredClone(comparison);
  delete incomplete.expected_failure_cost.assisted;
  const result = calculateProductivityComparison(incomplete);
  assert.equal(result.complete, false);
  assert.match(result.errors.join(" "), /expected_failure_cost/);
});

test("synthetic unverified source data cannot authorize expansion", () => {
  const calculation = calculateProductivityComparison(comparison);
  assert.deepEqual(recommendAdoption({ comparison, calculation, qualityNonInferior: true, humanApproval: true }), {
    decision: "inconclusive", reason: "comparability_or_source_unverified"
  });
});

test("worse quality blocks expansion even when cost falls", () => {
  const verified = { ...structuredClone(comparison), comparability: { task_definition_match: true, acceptance_criteria_version_match: true, observation_window_days_match: true, source_data_verified: true } };
  const calculation = calculateProductivityComparison(verified);
  assert.equal(recommendAdoption({ comparison: verified, calculation, qualityNonInferior: false, humanApproval: true }).decision, "do_not_expand");
});

test("verified comparable evidence still requires human approval before expansion", () => {
  const verified = { ...structuredClone(comparison), comparability: { task_definition_match: true, acceptance_criteria_version_match: true, observation_window_days_match: true, source_data_verified: true } };
  const calculation = calculateProductivityComparison(verified);
  assert.equal(recommendAdoption({ comparison: verified, calculation, qualityNonInferior: true, humanApproval: false }).decision, "hold_for_human_approval");
  assert.equal(recommendAdoption({ comparison: verified, calculation, qualityNonInferior: true, humanApproval: true }).decision, "expand_cautiously");
});

test("rejects missing or negative labor rate", () => {
  for (const rate of [undefined, -1, NaN]) {
    const input = structuredClone(comparison);
    input.labor_cost_per_hour = rate;
    const result = calculateProductivityComparison(input);
    assert.equal(result.complete, false);
    assert.match(result.errors.join(" "), /labor_cost_per_hour/);
  }
});

test("rejects impossible accepted delivery counts", () => {
  const input = structuredClone(comparison);
  input.assisted.accepted_deliveries = input.assisted.tasks_completed + 1;
  assert.equal(calculateProductivityComparison(input).complete, false);
});

test("rejects undefined percentage changes from zero baseline", () => {
  const input = structuredClone(comparison);
  input.baseline.defects_found = 0;
  assert.equal(calculateProductivityComparison(input).complete, false);
  assert.match(calculateProductivityComparison(input).errors.join(" "), /denominador cero/);
});

test("missing comparison returns an incomplete measurement without throwing", () => {
  const result = calculateProductivityComparison(undefined);
  assert.equal(result.complete, false);
  assert.match(result.errors.join(" "), /labor_cost_per_hour/);
});

test("forged favorable cost delta cannot authorize expansion", () => {
  const verified = structuredClone(comparison);
  verified.comparability = { task_definition_match: true, acceptance_criteria_version_match: true, observation_window_days_match: true, source_data_verified: true };
  const calculation = calculateProductivityComparison(verified);
  const forged = structuredClone(calculation);
  forged.deltas.costPerAcceptedDeliveryPercent = -99;
  assert.deepEqual(recommendAdoption({ comparison: verified, calculation: forged, qualityNonInferior: true, humanApproval: true }), {
    decision: "inconclusive", reason: "calculation_not_reproducible"
  });
});

test("rejects non-finite cost deltas rather than returning a decision", () => {
  const verified = structuredClone(comparison);
  verified.comparability = { task_definition_match: true, acceptance_criteria_version_match: true, observation_window_days_match: true, source_data_verified: true };
  const calculation = calculateProductivityComparison(verified);
  for (const delta of [NaN, Infinity, -Infinity]) {
    const manipulated = structuredClone(calculation);
    manipulated.deltas.costPerAcceptedDeliveryPercent = delta;
    assert.deepEqual(recommendAdoption({ comparison: verified, calculation: manipulated, qualityNonInferior: true, humanApproval: true }), {
      decision: "inconclusive", reason: "calculation_not_reproducible"
    });
  }
});

test("forged acceptance-rate or defect delta cannot authorize expansion", () => {
  const verified = structuredClone(comparison);
  verified.comparability = { task_definition_match: true, acceptance_criteria_version_match: true, observation_window_days_match: true, source_data_verified: true };
  const original = calculateProductivityComparison(verified);
  for (const metric of ["acceptedDeliveryRatePercentagePoints", "defectsPerAcceptedDeliveryPercent"]) {
    const manipulated = structuredClone(original);
    manipulated.deltas[metric] = metric === "defectsPerAcceptedDeliveryPercent" ? -99 : 99;
    assert.deepEqual(recommendAdoption({ comparison: verified, calculation: manipulated, qualityNonInferior: true, humanApproval: true }), {
      decision: "inconclusive", reason: "calculation_not_reproducible"
    });
  }
});

test("rejects finite inputs whose derived costs overflow", () => {
  const input = structuredClone(comparison);
  input.labor_cost_per_hour = Number.MAX_VALUE;
  input.baseline.human_minutes_per_task = Number.MAX_VALUE;
  assert.equal(calculateProductivityComparison(input).complete, false);
});


test("does not expand when measured quality regresses despite a positive attestation", () => {
  const verified = structuredClone(comparison);
  verified.comparability = { task_definition_match: true, acceptance_criteria_version_match: true, observation_window_days_match: true, source_data_verified: true };
  verified.assisted.defects_found = verified.baseline.defects_found + 10;
  const calculation = calculateProductivityComparison(verified);
  assert.equal(calculation.complete, true);
  assert.deepEqual(recommendAdoption({ comparison: verified, calculation, qualityNonInferior: true, humanApproval: true }), {
    decision: "do_not_expand", reason: "quality_non_inferiority_not_demonstrated"
  });
});

test("does not expand when acceptance rate falls despite a positive quality attestation", () => {
  const verified = structuredClone(comparison);
  verified.comparability = { task_definition_match: true, acceptance_criteria_version_match: true, observation_window_days_match: true, source_data_verified: true };
  verified.assisted.accepted_deliveries = verified.assisted.accepted_deliveries - 1;
  const calculation = calculateProductivityComparison(verified);
  assert.equal(calculation.complete, true);
  assert.deepEqual(recommendAdoption({ comparison: verified, calculation, qualityNonInferior: true, humanApproval: true }), {
    decision: "do_not_expand", reason: "quality_non_inferiority_not_demonstrated"
  });
});
