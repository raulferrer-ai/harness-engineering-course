export function normalizeTags(input) {
  return input.split(",").map((tag) => tag.trim()).filter(Boolean);
}
