export function authorizeToolOperation({ tool, operation, resource, approved = false, networkRequired = false, networkEnabled = false, approvalValid = false }) {
  const deny = (reason) => ({ decision: "deny", reason });
  if (typeof tool !== "string" || !tool.trim() || typeof operation !== "string" || !operation.trim() || typeof resource !== "string" || !resource.trim()) {
    return deny("incomplete_request");
  }
  if (tool === "read_project_file") {
    const segments = resource.split("/");
    const allowedPath = segments[0] === "workspace"
      && segments.length > 1
      && segments.every(segment => segment !== "" && segment !== "." && segment !== "..")
      && !resource.includes("\\")
      && !segments.some(segment => segment === ".env" || segment.startsWith(".env."));
    if (operation === "read" && allowedPath) return { decision: "allow", reason: "workspace_read_only" };
    return deny("resource_outside_allowed_workspace");
  }
  if (tool === "run_unit_tests") {
    if (operation !== "run_preapproved_test") return deny("command_not_preapproved");
    if (networkRequired || networkEnabled) return deny(networkEnabled ? "network_execution_not_implemented" : "network_disabled");
    return { decision: "allow", reason: "preapproved_test" };
  }
  if (["delete_file", "publish_release", "send_external_data"].includes(tool)) {
    if (!approved) return deny("explicit_approval_required");
    if (!approvalValid) return deny("approval_missing_or_invalid");
    return { decision: "allow", reason: "explicit_approval_validated" };
  }
  return deny("unknown_tool");
}
