export function authorizeToolOperation({ tool, operation, resource, approved = false, networkRequired = false, networkEnabled = false }) {
  const deny = (reason) => ({ decision: "deny", reason });
  if (!tool || !operation || !resource) return deny("incomplete_request");
  if (tool === "read_project_file") {
    if (resource.startsWith("workspace/") && !resource.includes("/../") && !resource.includes("/.env")) {
      return { decision: "allow", reason: "workspace_read_only" };
    }
    return deny("resource_outside_allowed_workspace");
  }
  if (tool === "run_unit_tests") {
    if (operation !== "run_preapproved_test") return deny("command_not_preapproved");
    if (networkRequired && !networkEnabled) return deny("network_disabled");
    if (networkEnabled && !approved) return deny("network_requires_approval");
    return { decision: "allow", reason: "preapproved_test" };
  }
  if (["delete_file", "publish_release", "send_external_data"].includes(tool)) {
    return approved ? { decision: "allow", reason: "explicit_approval" } : deny("explicit_approval_required");
  }
  return deny("unknown_tool");
}
