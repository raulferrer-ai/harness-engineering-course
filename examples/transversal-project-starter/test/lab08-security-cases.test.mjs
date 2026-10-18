import test from "node:test";
import assert from "node:assert/strict";
import { authorizeToolOperation } from "../src/tool-policy.mjs";

test("SEC-T01: untrusted document content cannot grant access to secrets", () => {
  const request = { tool: "read_project_file", operation: "read", resource: "workspace/.env" };
  const decision = authorizeToolOperation(request);
  assert.equal(decision.decision, "deny");
  assert.notEqual(decision.reason, "workspace_read_only");
});

test("SEC-T02: workspace traversal is denied before content is returned", () => {
  const decision = authorizeToolOperation({ tool: "read_project_file", operation: "read", resource: "workspace/../../outside.txt" });
  assert.deepEqual(decision, { decision: "deny", reason: "resource_outside_allowed_workspace" });
});

test("SEC-T03: external transfer is denied without a validated approval", () => {
  const decision = authorizeToolOperation({ tool: "send_external_data", operation: "send", resource: "synthetic-fixture", approved: false });
  assert.equal(decision.decision, "deny");
  assert.equal(decision.reason, "explicit_approval_required");
});

test("SEC-T04: destructive operations are denied unless approval is explicitly validated", () => {
  const request = { tool: "delete_file", operation: "execute", resource: "workspace/tmp/synthetic.txt", approved: true };
  assert.equal(authorizeToolOperation(request).decision, "deny");
  assert.equal(authorizeToolOperation({ ...request, approvalValid: true }).decision, "allow");
});

test("SEC-T05: publication is denied when approval is absent, expired, or parameter binding is not validated", () => {
  const request = { tool: "publish_release", operation: "publish", resource: "release:synthetic-v1", approved: true, approvalValid: false };
  assert.equal(authorizeToolOperation(request).reason, "approval_missing_or_invalid");
  assert.equal(authorizeToolOperation({ ...request, approved: false, approvalValid: true }).reason, "explicit_approval_required");
});

test("SEC-T06: alternate tools cannot bypass default-deny policy", () => {
  const blocked = authorizeToolOperation({ tool: "send_external_data", operation: "send", resource: "synthetic-fixture" });
  const alternate = authorizeToolOperation({ tool: "unknown_export_tool", operation: "send", resource: "synthetic-fixture", approved: true, approvalValid: true });
  assert.equal(blocked.decision, "deny");
  assert.equal(alternate.decision, "deny");
});

test("SEC-T07: network access is denied even when an approval flag is supplied", () => {
  const decision = authorizeToolOperation({
    tool: "run_unit_tests",
    operation: "run_preapproved_test",
    resource: "workspace",
    networkEnabled: true,
    approved: true,
    approvalValid: true
  });
  assert.equal(decision.decision, "deny");
  assert.equal(decision.reason, "network_execution_not_implemented");
});
