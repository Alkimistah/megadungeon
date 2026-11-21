import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildIdOf, injectPrecache } from "../build/swPrecache.js";

const src = readFileSync("public/sw.js", "utf8");

test("injectPrecache writes the list and the build id", () => {
  const out = injectPrecache(src, ["assets/a.js", "assets/icons/x.svg"], "abc123");
  assert.match(out, /const BUILD_ID = "abc123";/);
  assert.match(out, /const PRECACHE = \["assets\/a\.js","assets\/icons\/x\.svg"\];/);
});
test("injectPrecache throws when markers are missing", () => {
  assert.throws(() => injectPrecache("const X = 1;", [], "id"));
});
test("cache name changes when content changes", () => {
  const a = buildIdOf([{ path: "a.js", content: Buffer.from("1") }]);
  const b = buildIdOf([{ path: "a.js", content: Buffer.from("2") }]);
  assert.notEqual(a, b);
  assert.match(a, /^[0-9a-f]{10}$/);
});
test("public sw.js carries both markers", () => {
  assert.doesNotThrow(() => injectPrecache(readFileSync("public/sw.js", "utf8"), [], "x"));
});
