export function calculateProductivityComparison(comparison) {
  const errors = [];
  if (!Number.isFinite(comparison?.labor_cost_per_hour) || comparison.labor_cost_per_hour < 0) {
    errors.push("labor_cost_per_hour ausente o inválido");
  }
  const groups = {};
  for (const key of ["baseline", "assisted"]) {
    const g = comparison?.[key];
    if (!g || !Number.isInteger(g.tasks_completed) || g.tasks_completed <= 0 ||
        !Number.isInteger(g.accepted_deliveries) || g.accepted_deliveries <= 0 || g.accepted_deliveries > g.tasks_completed ||
        !Number.isFinite(g.human_minutes_per_task) || g.human_minutes_per_task < 0 ||
        !Number.isFinite(g.infra_cost) || g.infra_cost < 0 ||
        !Number.isFinite(g.model_cost) || g.model_cost < 0 ||
        !Number.isInteger(g.defects_found) || g.defects_found < 0) {
      errors.push(`${key}: datos insuficientes o inválidos`);
      continue;
    }
    const failureCost = comparison?.expected_failure_cost?.[key];
    if (!Number.isFinite(failureCost) || failureCost < 0) {
      errors.push(`${key}: expected_failure_cost ausente o inválido`);
      continue;
    }
    groups[key] = {
      acceptedDeliveryRate: g.accepted_deliveries / g.tasks_completed,
      humanLaborCost: g.human_minutes_per_task * g.tasks_completed / 60 * comparison.labor_cost_per_hour,
      totalCost: g.model_cost + g.infra_cost +
        g.human_minutes_per_task * g.tasks_completed / 60 * comparison.labor_cost_per_hour + failureCost,
      costPerAcceptedDelivery: (g.model_cost + g.infra_cost +
        g.human_minutes_per_task * g.tasks_completed / 60 * comparison.labor_cost_per_hour + failureCost) / g.accepted_deliveries,
      defectsPerAcceptedDelivery: g.defects_found / g.accepted_deliveries
    };
  }
  if (errors.length) return { complete: false, errors };
  const b = groups.baseline, a = groups.assisted;
  if (b.costPerAcceptedDelivery === 0 || b.defectsPerAcceptedDelivery === 0) {
    return { complete: false, errors: ["baseline: denominador cero para variaciones porcentuales"] };
  }
  return {
    complete: true,
    groups,
    deltas: {
      costPerAcceptedDeliveryPercent: (a.costPerAcceptedDelivery / b.costPerAcceptedDelivery - 1) * 100,
      acceptedDeliveryRatePercentagePoints: (a.acceptedDeliveryRate - b.acceptedDeliveryRate) * 100,
      defectsPerAcceptedDeliveryPercent: (a.defectsPerAcceptedDelivery / b.defectsPerAcceptedDelivery - 1) * 100
    }
  };
}

export function recommendAdoption({ comparison, calculation, qualityNonInferior = false, humanApproval = false }) {
  if (!calculation?.complete) return { decision: "inconclusive", reason: "measurement_incomplete" };
  const independentlyCalculated = calculateProductivityComparison(comparison);
  if (!independentlyCalculated.complete ||
      !Number.isFinite(calculation?.deltas?.costPerAcceptedDeliveryPercent) ||
      !Number.isFinite(calculation?.deltas?.acceptedDeliveryRatePercentagePoints) ||
      !Number.isFinite(calculation?.deltas?.defectsPerAcceptedDeliveryPercent) ||
      calculation.deltas.costPerAcceptedDeliveryPercent !== independentlyCalculated.deltas.costPerAcceptedDeliveryPercent ||
      calculation.deltas.acceptedDeliveryRatePercentagePoints !== independentlyCalculated.deltas.acceptedDeliveryRatePercentagePoints ||
      calculation.deltas.defectsPerAcceptedDeliveryPercent !== independentlyCalculated.deltas.defectsPerAcceptedDeliveryPercent) {
    return { decision: "inconclusive", reason: "calculation_not_reproducible" };
  }
  const c = comparison?.comparability;
  if (!c || c.task_definition_match !== true || c.acceptance_criteria_version_match !== true ||
      c.observation_window_days_match !== true || c.source_data_verified !== true) {
    return { decision: "inconclusive", reason: "comparability_or_source_unverified" };
  }
  if (!qualityNonInferior) return { decision: "do_not_expand", reason: "quality_non_inferiority_not_demonstrated" };
  if (calculation.deltas.costPerAcceptedDeliveryPercent >= 0) return { decision: "do_not_expand", reason: "unit_cost_not_lower" };
  if (!humanApproval) return { decision: "hold_for_human_approval", reason: "approval_required" };
  return { decision: "expand_cautiously", reason: "gates_passed" };
}
