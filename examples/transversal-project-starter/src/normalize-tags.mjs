export function normalizeTags(input) {
  if (typeof input !== "string") {
    throw new TypeError("input must be a string");
  }
  return input.split(",").map((tag) => tag.trim()).filter(Boolean);
}
