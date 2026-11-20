import assert from "node:assert/strict";
import test from "node:test";
import { validateTable } from "../src/treasure/tables/schema.js";
import { BASIC_BOOK_TABLES, TYPE_ROLLS, ENCHANTMENT_COUNT, ENCHANTMENT_PRICES } from "../src/treasure/tables/basicBook.js";
import { parseDice, rollDice, dieRange } from "../src/treasure/dice.js";
import { startTreasure, startTable, nextStep, applyRoll, resolveWithDice } from "../src/treasure/treasureEngine.js";
import { createRng } from "../src/random.js";

const row = (id, min) => BASIC_BOOK_TABLES[id].rows.find((r) => r.min === min);

test("every basic book table covers its die without gaps", () => {
  const ids = Object.keys(BASIC_BOOK_TABLES);
  assert.equal(ids.length, 22 * 2 + 3 + 8 + 7);
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

test("item tables 8-3, 8-4, 8-5 and 8-12", () => {
  const counts = { "8-3": 49, "8-4/arma": 44, "8-4/armadura": 11, "8-4/esotérico": 10,
    "8-5/arma": 15, "8-5/armadura": 12, "8-5/esotérico": 10, "8-12": 38 };
  for (const [id, n] of Object.entries(counts)) {
    assert.ok(BASIC_BOOK_TABLES[id], id);
    assert.equal(BASIC_BOOK_TABLES[id].rows.length, n, id);
    assert.deepEqual(validateTable(BASIC_BOOK_TABLES[id]), [], id);
  }
  assert.deepEqual(TYPE_ROLLS, {
    equipment: [[1, 3, "arma"], [4, 5, "armadura"], [6, 6, "esotérico"]],
    magic: [[1, 2, "arma"], [3, 3, "armadura"], [4, 6, "acessório"]],
  });
  assert.deepEqual(row("8-3", 9).result, { kind: "item", name: "Bálsamo restaurador", category: "diverso" });
  assert.equal(row("8-3", 9).max, 23);
  assert.equal(row("8-4/arma", 99).result.name, "Virotes (20)");
  assert.equal(row("8-4/arma", 99).result.category, "arma");
  assert.equal(row("8-4/armadura", 56).result.category, "escudo");
  assert.equal(row("8-4/armadura", 11).result.category, "armadura");
  assert.equal(row("8-4/esotérico", 86).result.category, "esotérico");
  const atroz = row("8-5/arma", 1).result;
  assert.deepEqual(atroz, { kind: "improvement", name: "Atroz", special: "counts-as-two" });
  assert.equal(row("8-5/arma", 91).result.special, "counts-as-two");
  assert.equal(row("8-5/armadura", 91).result.special, "counts-as-two");
  const mat = row("8-5/armadura", 41).result;
  assert.deepEqual(mat, { kind: "improvement", name: "Material especial", subroll: { die: "1d6",
    options: ["aço-rubi", "adamante", "gelo eterno", "madeira Tollon", "matéria vermelha", "mitral"] } });
  assert.deepEqual(row("8-5/arma", 66).result.subroll.options.length, 6);
  assert.ok(row("8-5/esotérico", 46).result.subroll);
  assert.equal(row("8-5/esotérico", 86).result.name, "Vigilante");
  assert.deepEqual(row("8-12", 37).result, { kind: "item", name: "Escudo da Fé (aprimoramento para duração cena)", price: 120, category: "poção" });
  assert.deepEqual(row("8-12", 83).result, { kind: "item", name: "Curar Ferimentos (7d8+7 PV)", price: 1080, category: "poção" });
  assert.equal(row("8-12", 97).result.price, 3000);
});

test("magic item tables 8-8 to 8-15", () => {
  const counts = { "8-8": 29, "8-9": 18, "8-10": 26, "8-11": 13, "8-13": 21, "8-14": 22, "8-15": 22 };
  for (const [id, n] of Object.entries(counts)) {
    assert.ok(BASIC_BOOK_TABLES[id], id);
    assert.equal(BASIC_BOOK_TABLES[id].rows.length, n, id);
    assert.deepEqual(validateTable(BASIC_BOOK_TABLES[id]), [], id);
  }
  assert.deepEqual(ENCHANTMENT_COUNT, { menor: 1, médio: 2, maior: 3 });
  assert.deepEqual(ENCHANTMENT_PRICES, { 1: { price: 18000, dcIncrease: 10 }, 2: { price: 36000, dcIncrease: 15 }, 3: { price: 72000, dcIncrease: 20 } });
  assert.deepEqual(row("8-8", 91).result, { kind: "enchantment", name: "Arma específica", special: "specific", next: "8-9" });
  assert.equal(row("8-8", 91).max, 100);
  assert.deepEqual(row("8-10", 91).result, { kind: "enchantment", name: "Item específico", special: "specific", next: "8-11" });
  assert.deepEqual(row("8-8", 6).result.subroll, { die: "1d6", options: ["animal", "construto", "espírito", "monstro", "morto-vivo", "uma raça de humanoides"] });
  for (const n of [46, 64, 65]) assert.equal(row("8-8", n).result.special, "counts-as-two", String(n));
  assert.equal(row("8-8", 65).result.name, "Magnífica");
  assert.equal(row("8-8", 54).result.special, undefined);
  assert.equal(row("8-10", 15).result.special, "shield-only");
  assert.equal(row("8-10", 35).result.special, "shield-only");
  assert.deepEqual(row("8-10", 45).result, { kind: "enchantment", name: "Guardião", special: "counts-as-two" });
  assert.deepEqual(row("8-9", 61).result, { kind: "item", name: "Arco do poder", price: 90000, category: "arma", tier: "maior" });
  assert.equal(row("8-9", 96).result.price, 200000);
  assert.equal(row("8-11", 21).result.category, "escudo");
  assert.equal(row("8-11", 26).result.category, "armadura");
  assert.equal(row("8-11", 94).result.name, "Armadura da luz");
  assert.equal(row("8-11", 94).result.tier, "maior");
  assert.deepEqual(row("8-13", 99).result, { kind: "item", name: "Pingente da saúde", price: 9000, category: "acessório", tier: "menor" });
  assert.deepEqual(row("8-14", 95).result, { kind: "item", name: "Tiara da sapiência", price: 25500, category: "acessório", tier: "médio" });
  assert.deepEqual(row("8-15", 99).result, { kind: "item", name: "Espelho do aprisionamento", price: 150000, category: "acessório", tier: "maior" });
});

// ---------- Motor de tesouros (Task 4) ----------

// Fonte fixa: aplica cada valor da lista ao pedido seguinte.
function feed(state, values) {
  return values.reduce((s, v) => applyRoll(s, v), state);
}

test("dice helpers", () => {
  assert.deepEqual(parseDice("2d6+1"), { count: 2, sides: 6, bonus: 1 });
  assert.deepEqual(parseDice("1d3"), { count: 1, sides: 3, bonus: 0 });
  assert.deepEqual(parseDice("d%"), { count: 1, sides: 100, bonus: 0 });
  assert.deepEqual(parseDice("4d6-2"), { count: 4, sides: 6, bonus: -2 });
  assert.throws(() => parseDice("2x6"));
  assert.throws(() => parseDice("0d6"));
  assert.deepEqual(dieRange("d%"), [1, 100]);
  assert.deepEqual(dieRange("1d6"), [1, 6]);
  assert.deepEqual(dieRange("2d12"), [2, 24]);
  assert.deepEqual(dieRange("1d3+1"), [2, 4]);
  const rng = createRng("dados");
  for (let i = 0; i < 500; i++) {
    const { total, rolls } = rollDice("2d6+1", rng);
    assert.equal(rolls.length, 2);
    for (const r of rolls) assert.ok(r >= 1 && r <= 6);
    assert.equal(total, rolls[0] + rolls[1] + 1);
  }
});

test("money: ND 7, d% 70 and 2d12 = 15 gives 150 TO", () => {
  const [state] = startTreasure({ challengeRating: "7", column: "money", mode: "padrão" });
  const first = nextStep(state);
  assert.equal(first.tableId, "8-1/7/money");
  assert.equal(first.die, "d%");
  assert.equal(first.kind, "table");
  assert.equal(first.bonus, 0);
  assert.equal(typeof first.reason, "string");
  const afterTable = applyRoll(state, 70);
  const amountStep = nextStep(afterTable);
  assert.equal(amountStep.kind, "expression");
  assert.equal(amountStep.die, "2d12");
  assert.equal(amountStep.tableId, "8-1/7/money");
  const done = applyRoll(afterTable, 15);
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains, [{ kind: "money", amount: 150, currency: "TO" }]);
  assert.equal(done.steps.length, 2);
  assert.equal(done.steps[0].value, 70);
  assert.equal(done.steps[1].parentId, done.steps[0].id);
});

test("Metade halves coins within their currency", () => {
  const [state] = startTreasure({ challengeRating: "7", column: "money", mode: "metade" });
  assert.deepEqual(feed(state, [70, 15]).gains, [{ kind: "money", amount: 75, currency: "TO" }]);
  const [tc] = startTreasure({ challengeRating: "0.25", column: "money", mode: "metade" });
  assert.deepEqual(feed(tc, [50, 3]).gains, [{ kind: "money", amount: 15, currency: "TC" }]);
});

test("Metade halves a wealth value with one decimal in T$", () => {
  const state = startTable("8-2", { tier: "menor", mode: "metade" });
  assert.equal(nextStep(state).tableId, "8-2/menor");
  const done = feed(state, [10, 11]);
  assert.equal(nextStep(done), null);
  assert.equal(done.gains.length, 1);
  const gain = done.gains[0];
  assert.equal(gain.kind, "wealth");
  assert.equal(gain.amount, 5.5);
  assert.equal(gain.value, 5.5);
  assert.equal(gain.currency, "T$");
  assert.match(gain.examples, /^Ágata/);
  const full = feed(startTable("8-2/menor"), [10, 11]);
  assert.equal(full.gains[0].amount, 11);
});

test("Dobro creates two independent states", () => {
  const states = startTreasure({ challengeRating: "7", column: "money", mode: "dobro" });
  assert.equal(states.length, 2);
  assert.notEqual(states[0], states[1]);
  const a = feed(states[0], [70, 15]);
  assert.deepEqual(a.gains, [{ kind: "money", amount: 150, currency: "TO" }]);
  assert.deepEqual(states[1].gains, []);
  assert.equal(nextStep(states[1]).tableId, "8-1/7/money");
  assert.equal(startTreasure({ challengeRating: "7", column: "money", mode: "padrão" }).length, 1);
});

test("+% adds 20 to the next 8-2 d%, capped at 100", () => {
  const [state] = startTreasure({ challengeRating: "12", column: "money", mode: "padrão" });
  const s1 = applyRoll(state, 20);
  const req = nextStep(s1);
  assert.equal(req.tableId, "8-2/média");
  assert.equal(req.kind, "table");
  assert.equal(req.bonus, 20);
  const s2 = applyRoll(s1, 85);
  const step = s2.steps.at(-1);
  assert.equal(step.value, 85);
  assert.equal(step.effective, 100);
  assert.equal(step.row.min, 100);
  assert.equal(step.row.result.dice, "6d8");
  const value = nextStep(s2);
  assert.equal(value.die, "6d8");
  assert.equal(value.bonus, 0);
  const done = applyRoll(s2, 27);
  assert.equal(done.gains[0].amount, 27000);
});

test("wealth counts: 1d3+1 = 3 asks 8-2 three times", () => {
  const [state] = startTreasure({ challengeRating: "6", column: "money", mode: "padrão" });
  const s1 = applyRoll(state, 95);
  const count = nextStep(s1);
  assert.equal(count.kind, "expression");
  assert.equal(count.die, "1d3+1");
  const s2 = applyRoll(s1, 3);
  assert.equal(s2.pending.length, 3);
  for (const r of s2.pending) {
    assert.equal(r.tableId, "8-2/menor");
    assert.equal(r.bonus, 0);
  }
  assert.equal(new Set(s2.pending.map((r) => r.id)).size, 3);
  // tipo e valor de cada riqueza, em profundidade
  const done = feed(s2, [10, 8, 30, 2, 100, 20]);
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains.map((g) => g.amount), [8, 20, 2000]);
  assert.ok(done.gains.every((g) => g.kind === "wealth" && g.currency === "T$"));
});

test("+% applies to each of the N wealth rolls; Metade keeps the count", () => {
  const [state] = startTreasure({ challengeRating: "20", column: "money", mode: "metade" });
  const s1 = applyRoll(applyRoll(state, 80), 4);
  assert.equal(s1.pending.length, 4);
  for (const r of s1.pending) assert.equal(r.bonus, 20);
  // d% 1 + 20 = 21 -> maior 16-25 (2d8 x 100); d% 81 + 20 -> 100 (4d12 x 10.000)
  const done = feed(s1, [1, 2, 1, 2, 1, 2, 81, 4]);
  assert.equal(done.gains.length, 4);
  assert.deepEqual(done.gains.map((g) => g.amount), [100, 100, 100, 20000]);
});

test("applyRoll rejects invalid values and leaves the state untouched", () => {
  const [state] = startTreasure({ challengeRating: "7", column: "money", mode: "padrão" });
  const snapshot = structuredClone(state);
  for (const bad of [0, 101, 5.5, NaN, "50", undefined]) {
    assert.throws(() => applyRoll(state, bad), RangeError, String(bad));
  }
  assert.deepEqual(state, snapshot);
  const s1 = applyRoll(state, 70);
  const snap1 = structuredClone(s1);
  assert.throws(() => applyRoll(s1, 1), RangeError);
  assert.throws(() => applyRoll(s1, 25), RangeError);
  assert.deepEqual(s1, snap1);
  assert.deepEqual(state, snapshot);
  const done = applyRoll(s1, 24);
  assert.throws(() => applyRoll(done, 10), Error);
});

test("start validation", () => {
  assert.throws(() => startTreasure({ challengeRating: "21", column: "money", mode: "padrão" }), RangeError);
  assert.throws(() => startTreasure({ challengeRating: "0.75", column: "money", mode: "padrão" }), RangeError);
  assert.throws(() => startTreasure({ challengeRating: "7", column: "both", mode: "padrão" }), RangeError);
  assert.throws(() => startTreasure({ challengeRating: "7", column: "money", mode: "triplo" }), RangeError);
  assert.throws(() => startTable("8-99"), RangeError);
  assert.throws(() => startTable("8-2", { tier: "enorme" }), RangeError);
  assert.equal(startTreasure({ challengeRating: 0.25, column: "money", mode: "padrão" })[0].pending[0].tableId, "8-1/0.25/money");
  assert.equal(nextStep(startTable("8-2", { tier: "maior" })).tableId, "8-2/maior");
});

test("items column: '—' ends the chain; other kinds are not yet supported", () => {
  const [state] = startTreasure({ challengeRating: "7", column: "items", mode: "padrão" });
  assert.equal(nextStep(state).tableId, "8-1/7/items");
  const done = applyRoll(state, 10);
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains, []);
  assert.throws(() => applyRoll(state, 50), /ainda não/);
});

test("resolveWithDice resolves money chains with a seeded rng", () => {
  const rng = createRng("tesouro");
  for (const nd of ["0.25", "0.5", ...Array.from({ length: 20 }, (_, i) => String(i + 1))]) {
    for (let i = 0; i < 30; i++) {
      const [state] = startTreasure({ challengeRating: nd, column: "money", mode: "padrão" });
      const done = resolveWithDice(state, rng);
      assert.equal(nextStep(done), null);
      assert.deepEqual(state.steps, []);
      for (const g of done.gains) {
        assert.ok(["money", "wealth"].includes(g.kind));
        assert.ok(g.amount > 0);
      }
    }
  }
  const a = resolveWithDice(startTable("8-2/maior"), createRng("x"));
  const b = resolveWithDice(startTable("8-2/maior"), createRng("x"));
  assert.deepEqual(a, b);
});

test("performance: 198 ND 20 chains in Dobro under 500 ms", () => {
  const rng = createRng("desempenho");
  const t0 = performance.now();
  let chains = 0;
  for (let i = 0; i < 99; i++) {
    for (const state of startTreasure({ challengeRating: "20", column: "money", mode: "dobro" })) {
      resolveWithDice(state, rng);
      chains++;
    }
  }
  const ms = performance.now() - t0;
  console.log(`# perf: ${chains} cadeias em ${ms.toFixed(1)} ms`);
  assert.equal(chains, 198);
  assert.ok(ms < 500, `${ms} ms`);
});
