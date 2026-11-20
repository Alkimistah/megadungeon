import assert from "node:assert/strict";
import test from "node:test";
import { validateTable } from "../src/treasure/tables/schema.js";
import { BASIC_BOOK_TABLES, TYPE_ROLLS, ENCHANTMENT_COUNT, ENCHANTMENT_PRICES } from "../src/treasure/tables/basicBook.js";
import { parseDice, rollDice, dieRange } from "../src/treasure/dice.js";
import { startTreasure, startTable, nextStep, applyRoll, resolveWithDice } from "../src/treasure/treasureEngine.js";
import { createRng } from "../src/random.js";
import { summarizeGains } from "../src/treasure/treasureSummary.js";

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

test("items column: '—' ends the chain", () => {
  const [state] = startTreasure({ challengeRating: "7", column: "items", mode: "padrão" });
  assert.equal(nextStep(state).tableId, "8-1/7/items");
  const done = applyRoll(state, 10);
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains, []);
});

// ---------- Motor de itens (Task 5) ----------

// Fração que faz randomInt(rng, 1, sides) devolver `value`.
const face = (value, sides) => (value - 0.5) / sides;

// rng que devolve as frações da lista e depois recorre a `fallback`; conta as chamadas.
function scriptedRng(fractions, fallback = createRng("roteiro")) {
  const queue = [...fractions];
  const rng = () => { rng.calls++; return queue.length ? queue.shift() : fallback(); };
  rng.calls = 0;
  return rng;
}

const itemsChain = (nd) => startTreasure({ challengeRating: nd, column: "items", mode: "padrão" })[0];
const itemGain = (name, category, details = {}, extra = {}) => ({ kind: "item", name, category, ...extra, details });

test("diverse: d% on 8-3 gives an item without price", () => {
  const s1 = applyRoll(itemsChain("1"), 50);
  assert.equal(nextStep(s1).tableId, "8-3");
  assert.equal(nextStep(s1).die, "d%");
  const done = applyRoll(s1, 10);
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains, [itemGain("Bálsamo restaurador", "diverso")]);
  assert.equal("price" in done.gains[0], false);
});

test("equipment: type 2 (arma) and d% 40 on 8-4 gives Espada longa", () => {
  const s1 = applyRoll(itemsChain("1"), 70);
  const type = nextStep(s1);
  assert.equal(type.kind, "expression");
  assert.equal(type.die, "1d6");
  assert.equal(type.tableId, "8-1/1/items");
  assert.match(type.reason, /arma/);
  const s2 = applyRoll(s1, 2);
  assert.equal(s2.steps.at(-1).outcome.type, "arma");
  assert.equal(nextStep(s2).tableId, "8-4/arma");
  const done = applyRoll(s2, 40);
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains, [itemGain("Espada longa", "arma")]);
  assert.deepEqual(done.steps.map((s) => s.parentId), [null, "1", "1.1"]);
  const armor = feed(itemsChain("1"), [70, 5, 60]);
  assert.deepEqual(armor.gains, [itemGain("Escudo leve", "escudo")]);
  assert.deepEqual(feed(itemsChain("1"), [70, 6, 1]).gains, [itemGain("Bolsa de pó", "esotérico")]);
});

test("superior with 2 improvements: 8-5 twice, duplicates and counts-as-two reroll as children", () => {
  const s1 = feed(itemsChain("5"), [95, 1, 40]);
  assert.equal(s1.pending.length, 2);
  for (const r of s1.pending) assert.equal(r.tableId, "8-5/arma");
  const s2 = applyRoll(s1, 14); // Certeira
  const s3 = applyRoll(s2, 14); // Certeira de novo
  const rejected = s3.steps.at(-1);
  assert.equal(rejected.outcome.rejected, "repetida");
  const reroll = nextStep(s3);
  assert.equal(reroll.id, `${rejected.id}.1`);
  assert.equal(reroll.tableId, "8-5/arma");
  assert.match(reroll.reason, /repetida/);
  const s4 = applyRoll(s3, 1); // Atroz conta como duas, mas resta 1
  const tooBig = s4.steps.at(-1);
  assert.equal(tooBig.outcome.rejected, "conta como duas");
  assert.equal(nextStep(s4).id, `${tooBig.id}.1`);
  assert.match(nextStep(s4).reason, /conta como duas/);
  const done = applyRoll(s4, 81); // Precisa
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains, [itemGain("Espada longa (certeira, precisa)", "arma", { improvements: ["Certeira", "Precisa"] })]);
  const ids = done.steps.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("superior: counts-as-two fills both slots; on a 1-improvement item it rerolls", () => {
  const atroz = feed(itemsChain("5"), [95, 1, 40, 1]);
  assert.equal(nextStep(atroz), null);
  assert.deepEqual(atroz.gains, [itemGain("Espada longa (atroz)", "arma", { improvements: ["Atroz"] })]);
  const s1 = feed(itemsChain("2"), [95, 1, 1]);
  assert.equal(s1.pending.length, 1);
  const s2 = applyRoll(s1, 91); // Pungente
  assert.equal(s2.steps.at(-1).outcome.rejected, "conta como duas");
  assert.match(nextStep(s2).reason, /conta como duas/);
  assert.equal(nextStep(s2).tableId, "8-5/arma");
});

test("material sub-roll is a step of its own", () => {
  const s1 = feed(itemsChain("2"), [95, 4, 11, 41]); // Completa, Material especial
  const sub = nextStep(s1);
  assert.equal(sub.die, "1d6");
  assert.equal(sub.id, `${s1.steps.at(-1).id}.1`);
  assert.match(sub.reason, /adamante/);
  const done = applyRoll(s1, 2);
  const step = done.steps.at(-1);
  assert.equal(step.parentId, s1.steps.at(-1).id);
  assert.equal(step.outcome.option, "adamante");
  assert.deepEqual(done.gains, [itemGain("Completa (material especial: adamante)", "armadura",
    { improvements: ["Material especial"], material: "adamante" })]);
});

test("potions: 1d3+1 with +% adds 20 to each 8-12 d%", () => {
  const s1 = applyRoll(itemsChain("12"), 50);
  assert.equal(nextStep(s1).kind, "expression");
  assert.equal(nextStep(s1).die, "1d3+1");
  const s2 = applyRoll(s1, 3);
  assert.equal(s2.pending.length, 3);
  for (const r of s2.pending) {
    assert.equal(r.tableId, "8-12");
    assert.equal(r.bonus, 20);
  }
  const done = feed(s2, [80, 1, 50]);
  assert.deepEqual(done.steps.slice(-3).map((s) => s.effective), [100, 21, 70]);
  assert.deepEqual(done.gains, [
    itemGain("Curar Ferimentos (11d8+11 PV)", "poção", {}, { price: 3000 }),
    itemGain("Luz (óleo)", "poção", {}, { price: 30 }),
    itemGain("Metamorfose", "poção", {}, { price: 270 }),
  ]);
  const one = applyRoll(itemsChain("4"), 60); // 1 poção*
  assert.equal(one.pending.length, 1);
  assert.equal(nextStep(one).bonus, 20);
  const plain = applyRoll(itemsChain("1"), 95); // 1 poção
  assert.equal(nextStep(plain).bonus, 0);
  assert.deepEqual(applyRoll(plain, 1).gains, [itemGain("Abençoar Alimentos (óleo)", "poção", {}, { price: 30 })]);
});

test("magic minor weapon: one enchantment on 8-8", () => {
  const s1 = feed(itemsChain("9"), [100, 1, 40]);
  assert.equal(s1.pending.length, 1);
  assert.equal(nextStep(s1).tableId, "8-8");
  const done = applyRoll(s1, 1);
  assert.deepEqual(done.gains, [itemGain("Espada longa (ameaçadora)", "arma", { enchantments: ["Ameaçadora"] }, { tier: "menor" })]);
  // tipo 3 = armadura, 4-6 = acessório na rolagem de mágico
  assert.equal(nextStep(feed(itemsChain("9"), [100, 3])).tableId, "8-4/armadura");
  assert.equal(nextStep(feed(itemsChain("9"), [100, 4])).tableId, "8-13");
});

test("magic: counts-as-two rerolls on a minor item and is accepted on a medium one", () => {
  const s1 = feed(itemsChain("9"), [100, 1, 40, 65]); // Magnífica
  assert.equal(s1.steps.at(-1).outcome.rejected, "conta como duas");
  assert.match(nextStep(s1).reason, /conta como duas/);
  assert.equal(nextStep(s1).tableId, "8-8");
  const done = applyRoll(s1, 54);
  assert.deepEqual(done.gains, [itemGain("Espada longa (formidável)", "arma", { enchantments: ["Formidável"] }, { tier: "menor" })]);
  const medium = feed(itemsChain("13"), [100, 1, 40, 65]);
  assert.equal(nextStep(medium), null);
  assert.deepEqual(medium.gains, [itemGain("Espada longa (magnífica)", "arma", { enchantments: ["Magnífica"] }, { tier: "médio" })]);
});

test("magic: 'specific' swaps the item for 8-9 and discards enchantments", () => {
  const s1 = feed(itemsChain("13"), [100, 1, 40, 1, 95]);
  assert.equal(s1.pending.length, 1);
  assert.equal(nextStep(s1).tableId, "8-9");
  const done = applyRoll(s1, 61);
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains, [itemGain("Arco do poder", "arma", { specific: true }, { price: 90000, tier: "maior" })]);
  // específica no primeiro encanto descarta o segundo, que ainda não foi rolado
  const first = feed(itemsChain("13"), [100, 1, 40, 95]);
  assert.equal(first.pending.length, 1);
  assert.equal(nextStep(first).tableId, "8-9");
  const armor = feed(itemsChain("9"), [100, 3, 11, 95]);
  assert.equal(nextStep(armor).tableId, "8-11");
  assert.deepEqual(applyRoll(armor, 21).gains, [itemGain("Escudo do conjurador", "escudo", { specific: true }, { price: 45000, tier: "maior" })]);
});

test("magic armor: shield-only rerolls on armor, not on shields", () => {
  const s1 = feed(itemsChain("9"), [100, 3, 11, 15]); // Completa, Animado
  assert.equal(nextStep(s1).tableId, "8-10");
  assert.equal(s1.steps.at(-1).outcome.rejected, "apenas escudos");
  assert.match(nextStep(s1).reason, /apenas escudos/);
  assert.deepEqual(applyRoll(s1, 1).gains, [itemGain("Completa (abascante)", "armadura", { enchantments: ["Abascante"] }, { tier: "menor" })]);
  const shield = feed(itemsChain("9"), [100, 3, 56, 15]);
  assert.deepEqual(shield.gains, [itemGain("Escudo leve (animado)", "escudo", { enchantments: ["Animado"] }, { tier: "menor" })]);
});

test("magic: duplicate enchantment rerolls; Anticriatura rolls the creature", () => {
  const s1 = feed(itemsChain("17"), [100, 1, 40, 1, 1]); // maior: Ameaçadora duas vezes
  assert.equal(s1.steps.at(-1).outcome.rejected, "repetida");
  assert.match(nextStep(s1).reason, /repetida/);
  const s2 = feed(s1, [6]); // Anticriatura
  assert.equal(nextStep(s2).die, "1d6");
  assert.match(nextStep(s2).reason, /morto-vivo/);
  const done = feed(s2, [5, 54]);
  assert.equal(nextStep(done), null);
  assert.deepEqual(done.gains, [itemGain("Espada longa (ameaçadora, anticriatura: morto-vivo, formidável)", "arma",
    { enchantments: ["Ameaçadora", "Anticriatura", "Formidável"], creature: "morto-vivo" }, { tier: "maior" })]);
});

test("magic medium accessory: d% on 8-14", () => {
  const s1 = feed(itemsChain("13"), [100, 4]);
  assert.equal(nextStep(s1).tableId, "8-14");
  assert.deepEqual(applyRoll(s1, 95).gains, [itemGain("Tiara da sapiência", "acessório", {}, { price: 25500, tier: "médio" })]);
  assert.equal(nextStep(feed(itemsChain("17"), [100, 6])).tableId, "8-15");
});

test("2D in Consultar: the GM enters the chosen die", () => {
  const s1 = applyRoll(itemsChain("4"), 31); // Equipamento^
  const req = nextStep(s1);
  assert.equal(req.kind, "twoDice");
  assert.equal(req.die, "1d6");
  assert.match(req.reason, /2D/);
  const snapshot = structuredClone(s1);
  assert.throws(() => applyRoll(s1, 7), RangeError);
  assert.throws(() => applyRoll(s1, 3, { dice: [2, 6] }), RangeError);
  assert.throws(() => applyRoll(s1, 2, { dice: [2, 9] }), RangeError);
  assert.deepEqual(s1, snapshot);
  const withDice = applyRoll(s1, 6, { dice: [2, 6] });
  assert.deepEqual(withDice.steps.at(-1).dice, [2, 6]);
  assert.equal(withDice.steps.at(-1).chosen, 6);
  assert.equal(nextStep(withDice).tableId, "8-4/esotérico");
  const bare = applyRoll(s1, 4);
  assert.equal(bare.steps.at(-1).chosen, 4);
  assert.equal(nextStep(bare).tableId, "8-4/armadura");
});

test("2D in Rolar: equal dice need no draw; different dice pick one with equal chance", () => {
  const s1 = applyRoll(itemsChain("4"), 31);
  const same = scriptedRng([face(3, 6), face(3, 6), face(40, 100)]);
  const a = resolveWithDice(s1, same);
  assert.equal(same.calls, 3);
  const typeStep = a.steps.find((s) => s.kind === "twoDice");
  assert.deepEqual(typeStep.dice, [3, 3]);
  assert.equal(typeStep.chosen, 3);
  assert.equal(a.gains[0].category, "arma");
  const fallback = createRng("2d");
  let low = 0;
  for (let i = 0; i < 1000; i++) {
    const done = resolveWithDice(s1, scriptedRng([face(2, 6), face(6, 6)], fallback));
    const step = done.steps.find((s) => s.kind === "twoDice");
    assert.deepEqual(step.dice, [2, 6]);
    assert.ok([2, 6].includes(step.chosen));
    if (step.chosen === 2) low++;
  }
  assert.ok(low >= 400 && low <= 600, `${low} de 1000`);
});

test("2D on superior and magic type rolls", () => {
  assert.equal(nextStep(applyRoll(itemsChain("4"), 90)).kind, "twoDice");
  const magic = applyRoll(itemsChain("20"), 60);
  assert.equal(nextStep(magic).kind, "twoDice");
  assert.equal(nextStep(applyRoll(magic, 5, { dice: [5, 1] })).tableId, "8-15");
});

test("step rows are copies: mutating them does not touch the tables", () => {
  const done = feed(itemsChain("1"), [70, 2, 40]);
  done.steps.at(-1).row.result.name = "Mudado";
  done.steps[0].row.min = 999;
  assert.equal(row("8-4/arma", 39).result.name, "Espada longa");
  assert.equal(BASIC_BOOK_TABLES["8-1/1/items"].rows.find((r) => r.max === 90).min, 66);
});

test("resolveWithDice resolves item chains for every ND", () => {
  const rng = createRng("itens");
  for (const nd of ["0.25", "0.5", ...Array.from({ length: 20 }, (_, i) => String(i + 1))]) {
    for (let i = 0; i < 40; i++) {
      const state = itemsChain(nd);
      const done = resolveWithDice(state, rng);
      assert.equal(nextStep(done), null);
      assert.deepEqual(state.steps, []);
      const ids = done.steps.map((s) => s.id);
      assert.equal(new Set(ids).size, ids.length, nd);
      for (const s of done.steps) if (s.parentId) assert.ok(ids.includes(s.parentId));
      for (const g of done.gains) {
        assert.equal(g.kind, "item");
        assert.equal(typeof g.name, "string");
        assert.ok(g.category);
        assert.equal(typeof g.details, "object");
      }
    }
  }
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

test("performance: 198 ND 20 chains in Dobro under 500 ms, per column", () => {
  for (const column of ["money", "items"]) {
    const rng = createRng(`desempenho-${column}`);
    const t0 = performance.now();
    let chains = 0;
    for (let i = 0; i < 99; i++) {
      for (const state of startTreasure({ challengeRating: "20", column, mode: "dobro" })) {
        resolveWithDice(state, rng);
        chains++;
      }
    }
    const ms = performance.now() - t0;
    console.log(`# perf ${column}: ${chains} cadeias em ${ms.toFixed(1)} ms`);
    assert.equal(chains, 198);
    assert.ok(ms < 500, `${column}: ${ms} ms`);
  }
});

test("summarizeGains totals coins, keeps wealth out of coins and groups items", () => {
  const gains = [
    { kind: "money", amount: 35, currency: "TC" },
    { kind: "money", amount: 200, currency: "T$" },
    { kind: "money", amount: 3, currency: "TO" },
    { kind: "wealth", tier: "média", value: 50, amount: 50, currency: "T$", examples: "Ágata" },
    { kind: "wealth", tier: "menor", value: 10, amount: 10, currency: "T$", examples: "Ônix" },
    { kind: "item", name: "Poção", category: "poções", price: 50, details: {} },
    { kind: "item", name: "Poção", category: "poções", price: 50, details: {} },
  ];
  const summary = summarizeGains(gains);
  assert.deepEqual(summary.coins, { TC: 35, "T$": 200, TO: 3 });
  assert.equal(summary.totalTibars, 233.5);
  assert.deepEqual(summary.wealth, [
    { value: 50, examples: "Ágata" },
    { value: 10, examples: "Ônix" },
  ]);
  assert.deepEqual(summary.items, [{ name: "Poção", category: "poções", price: 50, quantity: 2 }]);
});

test("summarizeGains keeps undefined price for items without one", () => {
  const summary = summarizeGains([
    { kind: "item", name: "Corda", category: "equipamento", details: {} },
  ]);
  assert.equal(summary.items.length, 1);
  assert.equal(summary.items[0].price, undefined);
  assert.equal(summary.items[0].quantity, 1);
  assert.equal(summary.totalTibars, 0);
});

// ---------- Task 8: lote e formatação ----------
import { buildBatch, rollBatch } from "../src/treasure/treasureBatch.js";
import { describeStep, describeRowResult } from "../src/treasure/treasureFormat.js";

const specBatch = () => [
  { challengeRating: "0.25", quantity: 3, mode: "padrão", columns: "both" },
  { challengeRating: "0.25", quantity: 5, mode: "metade", columns: "both" },
  { challengeRating: "3", quantity: 2, mode: "padrão", columns: "both" },
  { challengeRating: "3", quantity: 1, mode: "padrão", columns: "items" },
];

test("buildBatch generates 11 treasures and 21 chains for the spec batch", () => {
  const batch = buildBatch(specBatch());
  const treasures = batch.flatMap((b) => b.treasures);
  assert.equal(treasures.length, 11);
  assert.deepEqual(treasures.map((t) => t.index), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  assert.equal(treasures.reduce((n, t) => n + t.states.length, 0), 21);
});

test("buildBatch handles Dobro, money-only and specific tables; rejects bad rows", () => {
  const dobro = buildBatch([{ challengeRating: "5", quantity: 1, mode: "dobro", columns: "both" }]);
  assert.equal(dobro[0].treasures[0].states.length, 4);
  const table = buildBatch([{ tableId: "8-12", quantity: 2 }]);
  assert.equal(table[0].treasures.length, 2);
  assert.equal(table[0].treasures[0].states.length, 1);
  assert.throws(() => buildBatch([{ challengeRating: "3", quantity: 1, mode: "metade", columns: "items" }]), RangeError);
  assert.throws(() => buildBatch([{ challengeRating: "3", quantity: 0, mode: "padrão", columns: "both" }]), RangeError);
  assert.throws(() => buildBatch([{ challengeRating: "3", quantity: 100, mode: "padrão", columns: "both" }]), RangeError);
  assert.throws(() => buildBatch([{ challengeRating: "99", quantity: 1, mode: "padrão", columns: "both" }]), RangeError);
});

test("rollBatch resolves every chain", () => {
  const batch = rollBatch(specBatch(), createRng("t8"));
  for (const t of batch.flatMap((b) => b.treasures)) for (const s of t.states) assert.equal(nextStep(s), null);
});

test("describeStep formats table, expression and 2D steps", () => {
  const state = resolveWithDice(startTable("8-1/7/money"), createRng("fmt"));
  const first = describeStep(state.steps[0]);
  assert.match(first.roll, /^d% \d+/);
  assert.ok(first.result.length > 0);
  const plus = describeStep({ kind: "table", tableId: "8-2/média", die: "d%", value: 90, bonus: 20, effective: 100, row: { min: 96, max: 100, result: { kind: "none" } } });
  assert.match(plus.roll, /90/);
  assert.match(plus.roll, /\+20%/);
  assert.match(plus.roll, /100/);
  const expr = describeStep({ kind: "expression", tableId: "8-1/7/money", die: "2d12", value: 14, bonus: 0,
    outcome: { raw: 140, amount: 140, currency: "TO" } });
  assert.equal(expr.roll, "2d12 = 14");
  assert.match(expr.result, /140 TO/);
  const two = describeStep({ kind: "twoDice", tableId: "8-1/20/items", die: "1d6", value: 3, bonus: 0, dice: [5, 3], chosen: 3, outcome: { type: "arma" } });
  assert.match(two.roll, /5 e 3/);
  assert.match(two.roll, /escolhido 3/);
  assert.equal(describeRowResult({ kind: "item", name: "Corda", price: 1 }), "Corda (T$ 1)");
});
