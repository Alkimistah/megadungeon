import assert from "node:assert/strict";
import test from "node:test";
import { validateTable } from "../src/treasure/tables/schema.js";
import { BASIC_BOOK_TABLES } from "../src/treasure/tables/basicBook.js";

const row = (id, min) => BASIC_BOOK_TABLES[id].rows.find((r) => r.min === min);

test("every basic book table covers its die without gaps", () => {
  const ids = Object.keys(BASIC_BOOK_TABLES);
  assert.equal(ids.length, 22 * 2 + 3);
  for (const id of ids) assert.deepEqual(validateTable(BASIC_BOOK_TABLES[id]), [], id);
  assert.ok(validateTable({ ...BASIC_BOOK_TABLES["8-2/menor"], rows: BASIC_BOOK_TABLES["8-2/menor"].rows.slice(1) }).length > 0);
});

test("table 8-1 matches printed rows", () => {
  assert.equal(BASIC_BOOK_TABLES["8-1/7/money"].rows.length, 4);
  assert.deepEqual(row("8-1/7/money", 61).result, { kind: "money", dice: "2d12", multiplier: 10, currency: "TO" });
  const w = row("8-1/12/money", 11);
  assert.equal(w.max, 45);
  assert.deepEqual(w.result, { kind: "wealth", count: 1, tier: "média" });
  assert.equal(w.flags.bonus20, true);
  const m = row("8-1/20/items", 51);
  assert.equal(m.max, 100);
  assert.deepEqual(m.result, { kind: "magic", tier: "maior" });
  assert.equal(m.flags.twoDice, true);
  assert.equal(BASIC_BOOK_TABLES["8-1/0.25/items"].rows.length, 3);
  assert.deepEqual(row("8-1/6/items", 96).result, { kind: "superior", improvements: 2 });
  assert.deepEqual(row("8-1/10/items", 51).result, { kind: "potion", count: "1d3+1" });
  assert.deepEqual(row("8-1/2/money", 86).result, { kind: "money", dice: "2d6+1", multiplier: 100, currency: "T$" });
  assert.deepEqual(row("8-1/3/money", 91).result, { kind: "wealth", count: "1d3", tier: "menor" });
  assert.deepEqual(row("8-1/20/money", 76).result, { kind: "wealth", count: "1d3+1", tier: "maior" });
  assert.ok(row("8-1/20/money", 76).flags.bonus20);
});

test("table 8-2 values", () => {
  assert.equal(BASIC_BOOK_TABLES["8-2/menor"].rows.length, 8);
  assert.equal(BASIC_BOOK_TABLES["8-2/média"].rows.length, 9);
  assert.equal(BASIC_BOOK_TABLES["8-2/maior"].rows.length, 9);
  const r = row("8-2/menor", 1);
  assert.equal(r.max, 25);
  assert.deepEqual({ ...r.result, examples: undefined }, { kind: "wealthValue", dice: "4d4", multiplier: 1, average: 10, examples: undefined });
  assert.match(r.result.examples, /^Ágata ou hematita/);
  const big = row("8-2/maior", 96);
  assert.equal(big.max, 100);
  assert.equal(big.result.dice, "4d12");
  assert.equal(big.result.multiplier, 10000);
  assert.equal(big.result.average, 260000);
});
