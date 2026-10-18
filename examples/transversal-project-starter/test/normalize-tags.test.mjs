import test from "node:test";
import assert from "node:assert/strict";
import { normalizeTags } from "../src/normalize-tags.mjs";

test("trims tags and preserves order", () => {
  assert.deepEqual(normalizeTags("alpha, beta,gamma"), ["alpha", "beta", "gamma"]);
});

test("drops empty tags", () => {
  assert.deepEqual(normalizeTags(" , alpha, ,beta, "), ["alpha", "beta"]);
});

test("returns an empty array for an empty string", () => {
  assert.deepEqual(normalizeTags(""), []);
});

test("preserves duplicate tags rather than silently deduplicating", () => {
  assert.deepEqual(normalizeTags("a,a"), ["a", "a"]);
});

test("rejects non-string input with TypeError", () => {
  for (const input of [null, undefined, 42, {}, ["alpha"]]) {
    assert.throws(() => normalizeTags(input), TypeError);
  }
});
