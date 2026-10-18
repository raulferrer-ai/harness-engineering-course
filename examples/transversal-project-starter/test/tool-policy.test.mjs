import test from "node:test";
import assert from "node:assert/strict";
import { authorizeToolOperation } from "../src/tool-policy.mjs";

test("denies incomplete and unknown operations by default", () => {
  assert.equal(authorizeToolOperation({ tool: "mystery", operation: "run", resource: "x" }).decision, "deny");
  assert.equal(authorizeToolOperation({ tool: "run_unit_tests", operation: "run", resource: "workspace" }).decision, "deny");
  assert.equal(authorizeToolOperation({ tool: "", operation: "run", resource: "x" }).reason, "incomplete_request");
});

test("limits reads to workspace and denies secret paths", () => {
  assert.equal(authorizeToolOperation({ tool: "read_project_file", operation: "read", resource: "workspace/src/index.mjs" }).decision, "allow");
  assert.equal(authorizeToolOperation({ tool: "read_project_file", operation: "read", resource: "outside/.env" }).decision, "deny");
  assert.equal(authorizeToolOperation({ tool: "read_project_file", operation: "read", resource: "workspace/../outside.txt" }).decision, "deny");
  assert.equal(authorizeToolOperation({ tool: "read_project_file", operation: "read", resource: "workspace/src/../../outside.txt" }).decision, "deny");
  assert.equal(authorizeToolOperation({ tool: "read_project_file", operation: "read", resource: "workspace/config/.env.production" }).decision, "deny");
  assert.equal(authorizeToolOperation({ tool: "read_project_file", operation: "write", resource: "workspace/src/index.mjs" }).decision, "deny");
});

test("allows only the preapproved test operation and keeps network off by default", () => {
  assert.equal(authorizeToolOperation({ tool: "run_unit_tests", operation: "run_preapproved_test", resource: "workspace" }).decision, "allow");
  assert.equal(authorizeToolOperation({ tool: "run_unit_tests", operation: "run_preapproved_test", resource: "workspace", networkRequired: true }).reason, "network_disabled");
  assert.equal(authorizeToolOperation({ tool: "run_unit_tests", operation: "run_preapproved_test", resource: "workspace", networkEnabled: true }).reason, "network_requires_approval");
  assert.equal(authorizeToolOperation({ tool: "run_unit_tests", operation: "run_preapproved_test", resource: "workspace", networkEnabled: true, approved: true }).reason, "network_execution_not_implemented");
});

test("requires explicit approval for destructive or external effects", () => {
  for (const tool of ["delete_file", "publish_release", "send_external_data"]) {
    assert.equal(authorizeToolOperation({ tool, operation: "execute", resource: "workspace" }).decision, "deny");
    assert.equal(authorizeToolOperation({ tool, operation: "execute", resource: "workspace", approved: true }).decision, "allow");
  }
});
