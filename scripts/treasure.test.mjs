import assert from "node:assert/strict";
import test from "node:test";
import { validateTable } from "../src/treasure/tables/schema.js";
import { BASIC_BOOK_TABLES, TYPE_ROLLS, ENCHANTMENT_COUNT, ENCHANTMENT_PRICES } from "../src/treasure/tables/basicBook.js";
import { parseDice, rollDice, dieRange } from "../src/treasure/dice.js";
import { startTreasure, startTable, nextStep, applyRoll, resolveWithDice } from "../src/treasure/treasureEngine.js";
import { BASE_PRICES, NAME_ALIASES, IMPROVEMENT_PRICES, MATERIAL_PRICES, normalizeName, basePriceOf, priceOf } from "../src/treasure/tables/prices.js";
import { createRng } from "../src/random.js";
import { summarizeGains } from "../src/treasure/treasureSummary.js";
import { stepReference } from "../src/treasure/treasureFormat.js";

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
// Tira `source` e `details.components` (conferidos nos testes de pesos entre livros).
const stripSource = (gains) => gains.map(({ source, details: { components, ...details }, ...g }) => ({ ...g, details }));

test("diverse: d% on 8-3 gives an item with its Chapter 3 price", () => {
  const s1 = applyRoll(itemsChain("1"), 50);
  assert.equal(nextStep(s1).tableId, "8-3");
  assert.equal(nextStep(s1).die, "d%");
  const done = applyRoll(s1, 10);
  assert.equal(nextStep(done), null);
  assert.deepEqual(stripSource(done.gains), [itemGain("Bálsamo restaurador", "diverso", {}, { price: 10 })]);
  assert.equal(done.gains[0].price, 10);
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
  assert.deepEqual(stripSource(done.gains), [itemGain("Espada longa", "arma", {}, { price: 15 })]);
  assert.deepEqual(done.steps.map((s) => s.parentId), [null, "1", "1.1"]);
  const armor = feed(itemsChain("1"), [70, 5, 60]);
  assert.deepEqual(stripSource(armor.gains), [itemGain("Escudo leve", "escudo", {}, { price: 5 })]);
  assert.deepEqual(stripSource(feed(itemsChain("1"), [70, 6, 1]).gains), [itemGain("Bolsa de pó", "esotérico", {}, { price: 300 })]);
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
  assert.deepEqual(stripSource(done.gains), [itemGain("Espada longa (certeira, precisa)", "arma", { improvements: ["Certeira", "Precisa"] }, { price: 3015 })]);
  const ids = done.steps.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("superior: counts-as-two fills both slots; on a 1-improvement item it rerolls", () => {
  const atroz = feed(itemsChain("5"), [95, 1, 40, 1]);
  assert.equal(nextStep(atroz), null);
  assert.deepEqual(stripSource(atroz.gains), [itemGain("Espada longa (atroz)", "arma", { improvements: ["Atroz"] }, { price: 3015 })]);
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
  assert.deepEqual(stripSource(done.gains), [itemGain("Completa (material especial: adamante)", "armadura",
    { improvements: ["Material especial"], material: "adamante" }, { price: 21300 })]);
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
  assert.deepEqual(stripSource(done.gains), [
    itemGain("Curar Ferimentos (11d8+11 PV)", "poção", {}, { price: 3000 }),
    itemGain("Luz (óleo)", "poção", {}, { price: 30 }),
    itemGain("Metamorfose", "poção", {}, { price: 270 }),
  ]);
  const one = applyRoll(itemsChain("4"), 60); // 1 poção*
  assert.equal(one.pending.length, 1);
  assert.equal(nextStep(one).bonus, 20);
  const plain = applyRoll(itemsChain("1"), 95); // 1 poção
  assert.equal(nextStep(plain).bonus, 0);
  assert.deepEqual(stripSource(applyRoll(plain, 1).gains), [itemGain("Abençoar Alimentos (óleo)", "poção", {}, { price: 30 })]);
});

test("magic minor weapon: one enchantment on 8-8", () => {
  const s1 = feed(itemsChain("9"), [100, 1, 40]);
  assert.equal(s1.pending.length, 1);
  assert.equal(nextStep(s1).tableId, "8-8");
  const done = applyRoll(s1, 1);
  assert.deepEqual(stripSource(done.gains), [itemGain("Espada longa (ameaçadora)", "arma", { enchantments: ["Ameaçadora"] }, { tier: "menor", price: 18015 })]);
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
  assert.deepEqual(stripSource(done.gains), [itemGain("Espada longa (formidável)", "arma", { enchantments: ["Formidável"] }, { tier: "menor", price: 18015 })]);
  const medium = feed(itemsChain("13"), [100, 1, 40, 65]);
  assert.equal(nextStep(medium), null);
  assert.deepEqual(stripSource(medium.gains), [itemGain("Espada longa (magnífica)", "arma", { enchantments: ["Magnífica"] }, { tier: "médio", price: 36015 })]);
});

test("magic: 'specific' swaps the item for 8-9 and discards enchantments", () => {
  const s1 = feed(itemsChain("13"), [100, 1, 40, 1, 95]);
  assert.equal(s1.pending.length, 1);
  assert.equal(nextStep(s1).tableId, "8-9");
  const done = applyRoll(s1, 61);
  assert.equal(nextStep(done), null);
  assert.deepEqual(stripSource(done.gains), [itemGain("Arco do poder", "arma", { specific: true }, { price: 90000, tier: "maior" })]);
  // específica no primeiro encanto descarta o segundo, que ainda não foi rolado
  const first = feed(itemsChain("13"), [100, 1, 40, 95]);
  assert.equal(first.pending.length, 1);
  assert.equal(nextStep(first).tableId, "8-9");
  const armor = feed(itemsChain("9"), [100, 3, 11, 95]);
  assert.equal(nextStep(armor).tableId, "8-11");
  assert.deepEqual(stripSource(applyRoll(armor, 21).gains), [itemGain("Escudo do conjurador", "escudo", { specific: true }, { price: 45000, tier: "maior" })]);
});

test("magic armor: shield-only rerolls on armor, not on shields", () => {
  const s1 = feed(itemsChain("9"), [100, 3, 11, 15]); // Completa, Animado
  assert.equal(nextStep(s1).tableId, "8-10");
  assert.equal(s1.steps.at(-1).outcome.rejected, "apenas escudos");
  assert.match(nextStep(s1).reason, /apenas escudos/);
  assert.deepEqual(stripSource(applyRoll(s1, 1).gains), [itemGain("Completa (abascante)", "armadura", { enchantments: ["Abascante"] }, { tier: "menor", price: 21000 })]);
  const shield = feed(itemsChain("9"), [100, 3, 56, 15]);
  assert.deepEqual(stripSource(shield.gains), [itemGain("Escudo leve (animado)", "escudo", { enchantments: ["Animado"] }, { tier: "menor", price: 18005 })]);
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
  assert.deepEqual(stripSource(done.gains), [itemGain("Espada longa (ameaçadora, anticriatura: morto-vivo, formidável)", "arma",
    { enchantments: ["Ameaçadora", "Anticriatura", "Formidável"], creature: "morto-vivo" }, { tier: "maior", price: 72015 })]);
});

test("magic medium accessory: d% on 8-14", () => {
  const s1 = feed(itemsChain("13"), [100, 4]);
  assert.equal(nextStep(s1).tableId, "8-14");
  assert.deepEqual(stripSource(applyRoll(s1, 95).gains), [itemGain("Tiara da sapiência", "acessório", {}, { price: 25500, tier: "médio" })]);
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
  const same = scriptedRng([face(3, 6), face(3, 6), 0.1, face(40, 100)]); // 0.1: fonte = Livro Básico
  const a = resolveWithDice(s1, same);
  assert.equal(same.calls, 4);
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

import { tableLabel } from "../src/treasure/treasureFormat.js";
test("tableLabel gives readable table names", () => {
  assert.equal(tableLabel("8-1/0.25/money"), "Tabela 8-1 · Dinheiro ND 1/4");
  assert.equal(tableLabel("8-1/12/items"), "Tabela 8-1 · Itens ND 12");
  assert.equal(tableLabel("8-4/esotérico"), "Tabela 8-4 · Equipamento, Esotérico");
  assert.equal(tableLabel("8-2/média"), "Tabela 8-2 · Riquezas, coluna média");
  assert.equal(tableLabel("8-3"), "Tabela 8-3 · Itens Diversos");
});

// ---------- Listas dos outros livros (Task 10) ----------
import { ALL_TABLES, LIST_TABLES } from "../src/treasure/tables/index.js";
import { listDie, validateListTable } from "../src/treasure/tables/schema.js";
import { listSpecificTables } from "../src/treasure/treasureBatch.js";

// Contagens fixadas a partir das páginas renderizadas dos PDFs.
const LIST_COUNTS = {
  "ameacas/armas": 16, "ameacas/armaduras": 4, "ameacas/itens-gerais": 44, "ameacas/materiais": 3,
  "herois/armas": 47, "herois/municoes": 5, "herois/armaduras": 14, "herois/itens-gerais": 137,
  "herois/armas-especificas/medio": 6, "herois/armas-especificas/maior": 11,
  "herois/armaduras-especificas/medio": 4, "herois/armaduras-especificas/maior": 6,
  "herois/esotericos/medio": 1, "herois/esotericos/maior": 3,
  "herois/acessorios/menor": 23, "herois/acessorios/medio": 30, "herois/acessorios/maior": 11,
  "deuses/itens-gerais": 70, "deuses/melhorias": 5, "herois/melhorias": 12,
};

test("other-book lists have the printed item counts and valid shape", () => {
  assert.deepEqual(Object.keys(LIST_TABLES).sort(), Object.keys(LIST_COUNTS).sort());
  for (const [id, count] of Object.entries(LIST_COUNTS)) {
    const list = LIST_TABLES[id];
    assert.equal(list.items.length, count, id);
    assert.deepEqual(validateListTable(list), [], id);
    assert.equal(list.kind, "list");
  }
  assert.equal(ALL_TABLES["8-3"], BASIC_BOOK_TABLES["8-3"]);
  assert.equal(ALL_TABLES["herois/acessorios/menor"], LIST_TABLES["herois/acessorios/menor"]);
});

test("magic lists carry their tier; non-magic lists have none; prices are numbers or printed strings", () => {
  const tiers = { menor: "menor", medio: "médio", maior: "maior" };
  for (const [id, list] of Object.entries(LIST_TABLES)) {
    const suffix = id.split("/").pop();
    const magic = /^herois\/(armas-especificas|armaduras-especificas|esotericos|acessorios)\//.test(id);
    assert.equal(list.tier, magic ? tiers[suffix] : undefined, id);
    for (const item of list.items) {
      assert.equal(item.tier, list.tier, `${id}: ${item.name}`);
      assert.ok(["number", "string", "undefined"].includes(typeof item.price), `${id}: ${item.name}`);
    }
  }
  assert.equal(LIST_TABLES["deuses/melhorias"].items.every((i) => i.price === undefined && i.category === "melhoria"), true);
  const prices = (id) => LIST_TABLES[id].items.map((i) => i.price);
  assert.equal(prices("ameacas/materiais").every((p) => typeof p === "string"), true);
  assert.equal(LIST_TABLES["herois/itens-gerais"].items.filter((i) => i.price === "—").length, 2);
  assert.equal(LIST_TABLES["ameacas/armas"].items.find((i) => i.name === "Presa de serpente").price, 1000);
  assert.deepEqual(LIST_TABLES["ameacas/armas"].items[0], { name: "Porrete", price: 2, category: "arma" });
});

test("list pages and first/last items match the book", () => {
  const first = (id) => LIST_TABLES[id].items[0].name;
  const last = (id) => LIST_TABLES[id].items.at(-1).name;
  assert.equal(first("ameacas/armas"), "Porrete");
  assert.equal(last("ameacas/armas"), "Arpão");
  assert.equal(last("ameacas/itens-gerais"), "Traje selako");
  assert.equal(first("herois/armas"), "Bastão lúdico");
  assert.equal(last("herois/armas"), "Sifão cáustico");
  assert.equal(last("herois/itens-gerais"), "Sarau informativo");
  assert.equal(first("herois/acessorios/menor"), "Algibeira mordedora");
  assert.equal(last("herois/acessorios/maior"), "Tomo dos companheiros");
  assert.equal(first("deuses/itens-gerais"), "Água benta concentrada");
  assert.equal(last("deuses/itens-gerais"), "Sacramento");
  assert.equal(LIST_TABLES["herois/acessorios/menor"].pdfPage, 267);
  assert.equal(LIST_TABLES["herois/acessorios/menor"].bookPage, 265);
  assert.equal(LIST_TABLES["ameacas/armas"].pdfPage, 396);
  assert.equal(LIST_TABLES["deuses/melhorias"].pdfPage, 56);
  for (const list of Object.values(LIST_TABLES)) assert.equal(list.bookPage, list.pdfPage - 2, list.id);
});

test("listDie builds 1d<n> and the engine yields the v-th item", () => {
  assert.equal(listDie(23), "1d23");
  assert.equal(listDie(LIST_COUNTS["herois/acessorios/menor"]), "1d23");
  const state = startTable("herois/acessorios/menor");
  const request = nextStep(state);
  assert.equal(request.kind, "list");
  assert.equal(request.die, "1d23");
  const first = applyRoll(state, 1);
  assert.equal(nextStep(first), null);
  assert.deepEqual(first.gains, [{ kind: "item", source: "herois/acessorios/menor", name: "Algibeira mordedora", category: "acessório", price: 1000, tier: "menor",
    details: { components: [{ role: "base", name: "Algibeira mordedora", book: "Heróis de Arton", bookPage: 265 }] } }]);
  const lastItem = applyRoll(state, 23);
  assert.equal(lastItem.gains[0].name, LIST_TABLES["herois/acessorios/menor"].items[22].name);
  assert.equal(lastItem.gains[0].name, "Saco dos ventos silenciosos");
  assert.equal(first.steps[0].kind, "list");
  assert.throws(() => applyRoll(state, 0), RangeError);
  assert.throws(() => applyRoll(state, 24), RangeError);
  assert.throws(() => applyRoll(state, 1.5), RangeError);
  const melhoria = applyRoll(startTable("deuses/melhorias"), 3).gains[0];
  assert.deepEqual(melhoria, { kind: "item", source: "deuses/melhorias", name: "Inscrito", category: "melhoria", appliesTo: ["armadura", "ferramenta", "vestuário"],
    details: { components: [{ role: "base", name: "Inscrito", book: "Deuses de Arton", bookPage: 54 }] } });
});

test("resolveWithDice picks uniformly from a list and is reproducible", () => {
  const a = resolveWithDice(startTable("herois/armas"), createRng("lista"));
  const b = resolveWithDice(startTable("herois/armas"), createRng("lista"));
  assert.deepEqual(a.gains, b.gains);
  const seen = new Set();
  const rng = createRng("cobertura");
  for (let i = 0; i < 400; i++) seen.add(resolveWithDice(startTable("herois/municoes"), rng).gains[0].name);
  assert.equal(seen.size, 5);
});

test("listSpecificTables offers basic book and list tables; batch and labels work with list ids", () => {
  const ids = listSpecificTables().map((t) => t.id);
  assert.ok(ids.includes("8-3"));
  assert.ok(!ids.some((id) => id.startsWith("8-1/")));
  for (const id of Object.keys(LIST_COUNTS)) assert.ok(ids.includes(id), id);
  const batch = rollBatch([{ tableId: "herois/acessorios/maior", quantity: 3 }], createRng("lote"));
  assert.equal(batch[0].treasures.length, 3);
  for (const t of batch[0].treasures) assert.equal(t.states[0].gains[0].tier, "maior");
  assert.equal(batch[0].label, "Heróis · Acessórios específicos (maiores)");
  assert.throws(() => rollBatch([{ tableId: "herois/nao-existe", quantity: 1 }], createRng("x")), RangeError);
  assert.equal(tableLabel("herois/acessorios/menor"), "Heróis · Acessórios específicos (menores)");
  assert.equal(tableLabel("ameacas/armas"), "Ameaças · Novas armas");
  assert.equal(tableLabel("deuses/melhorias"), "Deuses · Melhorias");
  const step = applyRoll(startTable("ameacas/materiais"), 1).steps[0];
  const text = describeStep(step);
  assert.match(text.roll, /^1d3 1$/);
  assert.match(text.result, /^Casco de monstro/);
  assert.equal(describeRowResult({ kind: "item", name: "X", price: "—" }), "X (—)");
});

// ---------- Revisão final: categoria, página e ajustes ----------
import { formatItemLine, parseTypedValue } from "../src/treasure/treasureFormat.js";

test("item gains carry their source table (list and basic-book chains)", () => {
  const list = applyRoll(startTable("ameacas/materiais"), 1);
  assert.equal(list.gains[0].source, "ameacas/materiais");
  const basic = applyRoll(startTable("8-12"), 1);
  for (const g of basic.gains.filter((x) => x.kind === "item")) assert.equal(g.source, "8-12");
});

test("summarizeGains groups items by name and source, keeping category", () => {
  const a = { kind: "item", name: "X", category: "arma", source: "8-4", details: {} };
  const summary = summarizeGains([a, { ...a }, { ...a, source: "8-12" }]);
  assert.equal(summary.items.length, 2);
  assert.equal(summary.items[0].quantity, 2);
  assert.equal(summary.items[0].category, "arma");
  assert.equal(summary.items[1].source, "8-12");
});

test("formatItemLine shows quantity, category, price and book page", () => {
  const page = ALL_TABLES["8-4/arma"].bookPage;
  assert.equal(formatItemLine({ quantity: 2, name: "Espada", category: "arma", price: 1500, source: "8-4/arma" }),
    `2× Espada (arma) — T$ 1.500 — ${ALL_TABLES["8-4/arma"].book} p. ${page}`);
  assert.equal(formatItemLine({ quantity: 1, name: "Z", category: "item geral", source: "8-3" }).includes("T$"), false);
});

test("parseTypedValue maps 00 to 100 only on d%", () => {
  assert.equal(parseTypedValue("00", "d%"), 100);
  assert.equal(parseTypedValue("0", "d%"), 0);
  assert.equal(parseTypedValue("00", "1d6"), 0);
  assert.equal(parseTypedValue(" 42 ", "d%"), 42);
});

test("batch group heading shows the column choice unless both", () => {
  const label = (columns) => buildBatch([{ challengeRating: "3", quantity: 1, mode: "padrão", columns }])[0].label;
  assert.equal(label("both"), "ND 3, Padrão");
  assert.equal(label("items"), "ND 3, Padrão, Só itens");
  assert.equal(label("money"), "ND 3, Padrão, Só dinheiro");
});

// ---------- Preços (Tabelas 3-3, 3-5, 3-6, 3-7, 3-9) ----------

const longSword = { name: "Espada longa", category: "arma" };

test("every 8-3 and 8-4 item resolves to a base price", () => {
  const missing = [];
  for (const id of ["8-3", "8-4/arma", "8-4/armadura", "8-4/esotérico"]) {
    for (const r of BASIC_BOOK_TABLES[id].rows) if (basePriceOf(r.result.name) === undefined) missing.push(`${id}: ${r.result.name}`);
  }
  assert.deepEqual(missing, []);
  for (const alias of Object.keys(NAME_ALIASES)) assert.ok(BASE_PRICES.has(NAME_ALIASES[alias]), alias);
  assert.equal(normalizeName("Bálsamo  Restaurador"), "balsamo restaurador");
});

test("printed prices are transcribed", () => {
  assert.equal(basePriceOf("Espada longa"), 15);
  assert.equal(basePriceOf("Pedras (20)"), 0.5);
  assert.equal(basePriceOf("Armadura completa"), 3000);
  assert.equal(basePriceOf("Tomo hermético"), 1500);
  assert.equal(basePriceOf("Clava"), "—");
  assert.deepEqual(IMPROVEMENT_PRICES, { 1: 300, 2: 3000, 3: 9000, 4: 18000 });
  assert.equal(MATERIAL_PRICES["gelo eterno"].arma, 600);
  assert.equal(MATERIAL_PRICES.mitral["armadura pesada"], 12000);
});

test("priceOf adds improvements, material and enchantments", () => {
  assert.equal(priceOf({}, longSword), 15);
  assert.equal(priceOf({ improvements: ["Certeira", "Precisa"] }, longSword), 15 + 3000);
  assert.equal(priceOf({ improvements: ["Atroz"], improvementCount: 2 }, longSword), 15 + 3000);
  assert.equal(priceOf({ enchantments: ["A", "B"] }, longSword), 15 + 36000);
  assert.equal(priceOf({ enchantments: ["A"], enchantmentCount: 2 }, longSword), 15 + 36000);
  assert.equal(priceOf({ improvements: ["Material especial"], material: "adamante" }, longSword), 15 + 300 + 3000);
  assert.equal(priceOf({ improvements: ["Material especial"], material: "adamante" }, { name: "Completa", category: "armadura" }), 3000 + 300 + 18000);
  assert.equal(priceOf({ improvements: ["Material especial"], material: "mitral" }, { name: "Escudo leve", category: "escudo" }), 5 + 300 + 1500);
  assert.equal(priceOf({ improvements: ["Material especial"], material: "aço-rubi" }, { name: "Varinha arcana", category: "esotérico" }), 100 + 300 + 6000);
  assert.equal(priceOf({}, { name: "Clava", category: "arma" }), "—");
  const clava = { name: "Clava", category: "arma" };
  assert.equal(priceOf({ improvements: ["Certeira"] }, clava), 300);
  assert.equal(priceOf({ improvements: ["Material especial"], material: "adamante" }, clava), 300 + 3000);
  assert.equal(priceOf({ enchantments: ["A"] }, clava), 18000);
  assert.equal(priceOf({}, { name: "Inexistente", category: "arma" }), undefined);
});

test("engine gains carry a computed price; potions and specific items keep table price", () => {
  const plain = feed(itemsChain("1"), [50, 10]);
  assert.equal(plain.gains[0].price, 10); // Bálsamo restaurador
  const sup = feed(itemsChain("5"), [95, 1, 40, 14, 81]); // Espada longa certeira, precisa
  assert.equal(sup.gains[0].price, 15 + 3000);
  const atroz = feed(itemsChain("5"), [95, 1, 40, 1]);
  assert.equal(atroz.gains[0].price, 15 + 3000);
  const adam = feed(itemsChain("2"), [95, 4, 11, 41, 2]); // Completa, material especial: adamante
  assert.equal(adam.gains[0].price, 3000 + 300 + 18000);
  assert.equal(row("8-12", 37).result.price, 120);
  assert.equal(row("8-9", 61).result.price, 90000);
});

test("improvement lists: printed order, categories and appliesTo from the printed sections", () => {
  const her = LIST_TABLES["herois/melhorias"];
  assert.equal(her.label, "Heróis · Novas melhorias");
  assert.equal(her.pdfPage, 242);
  assert.equal(her.tier, undefined);
  assert.deepEqual(her.items.map((i) => i.name), ["Farpada", "Fósforo", "Guarda", "Incendiária", "Pressurizada",
    "Balístico", "Injetora", "Prudente", "Potencializador", "Brasonado", "Usado", "Deslumbrante"]);
  const by = (list, n) => list.items.find((i) => i.name === n);
  assert.deepEqual(by(her, "Farpada").appliesTo, ["arma"]);
  assert.deepEqual(by(her, "Prudente").appliesTo, ["armadura"]);
  assert.deepEqual(by(her, "Potencializador").appliesTo, ["esotérico"]);
  assert.deepEqual(by(her, "Brasonado").appliesTo, ["ferramenta", "vestuário"]);
  assert.deepEqual(by(her, "Deslumbrante").appliesTo, ["arma", "armadura", "esotérico", "ferramenta", "vestuário"]);
  const gods = LIST_TABLES["deuses/melhorias"];
  assert.deepEqual(by(gods, "Conduíte").appliesTo, ["arma"]);
  assert.deepEqual(by(gods, "Inscrito").appliesTo, ["armadura", "ferramenta", "vestuário"]);
  assert.deepEqual(by(gods, "Canônico").appliesTo, ["arma", "armadura", "esotérico", "ferramenta", "vestuário"]);
  for (const list of [her, gods]) {
    for (const i of list.items) {
      assert.equal(i.category, "melhoria", i.name);
      assert.ok(i.appliesTo.length > 0, i.name);
      assert.equal(i.special, undefined, i.name);
      assert.equal(i.subroll, undefined, i.name);
    }
  }
});

// ---------- Pesos entre livros (ajustes, Task 3) ----------
import { WEIGHTED_POOLS, pickSource } from "../src/treasure/bookWeights.js";
import { parseMaterialPriceText, materialPriceOf } from "../src/treasure/tables/prices.js";

const BASIC = "Livro Básico";
const fixed = (x) => () => x;

test("pickSource: Livro Básico below 0.7, another book from 0.7 up", () => {
  assert.deepEqual(pickSource("8-3", { tableId: "8-3" }, fixed(0.69)), { tableId: "8-3", share: 0.7 });
  const other = pickSource("8-3", { tableId: "8-3" }, fixed(0.7));
  assert.notEqual(other.tableId, "8-3");
  assert.equal(ALL_TABLES[other.tableId].kind, "list");
  assert.equal(pickSource("8-3", { tableId: "8-3" }, fixed(0.999)).tableId, "deuses/itens-gerais");
  assert.equal(pickSource("8-3", { tableId: "8-3" }, fixed(0.7)).tableId, "ameacas/itens-gerais");
  assert.equal(WEIGHTED_POOLS["8-3"].basicShare, 0.7);
});

test("pickSource: Livro Básico share stays between 67% and 73% in 10,000 draws", () => {
  const rng = createRng("pesos");
  let basic = 0;
  for (let i = 0; i < 10000; i++) if (pickSource("8-4/arma", { tableId: "8-4/arma" }, rng).tableId === "8-4/arma") basic++;
  assert.ok(basic >= 6700 && basic <= 7300, `${basic}`);
});

test("pickSource: other books split 30% in proportion to eligible item counts", () => {
  const n = { "ameacas/itens-gerais": 44, "herois/itens-gerais": 135, "deuses/itens-gerais": 67 };
  const total = 44 + 135 + 67;
  const rng = createRng("proporcao");
  const seen = {};
  for (let i = 0; i < 20000; i++) {
    const { tableId, share } = pickSource("8-3", { tableId: "8-3" }, rng);
    if (tableId === "8-3") continue;
    assert.ok(Math.abs(share - 0.3 * n[tableId] / total) < 1e-12, tableId);
    seen[tableId] = (seen[tableId] ?? 0) + 1;
  }
  const others = Object.values(seen).reduce((a, b) => a + b, 0);
  for (const [id, count] of Object.entries(n)) {
    assert.ok(Math.abs(seen[id] / others - count / total) < 0.03, `${id}: ${seen[id] / others}`);
  }
  // 8-5 filtra por appliesTo: armas = 6 de Heróis + 3 de Deuses
  const imp = new Set();
  for (let i = 0; i < 2000; i++) imp.add(JSON.stringify(pickSource("8-5/arma", { tableId: "8-5/arma" }, rng)));
  const shares = [...imp].map((s) => JSON.parse(s)).filter((s) => s.tableId !== "8-5/arma");
  assert.deepEqual(shares.map((s) => s.tableId).sort(), ["deuses/melhorias", "herois/melhorias"]);
  assert.ok(Math.abs(shares.find((s) => s.tableId === "herois/melhorias").share - 0.3 * 6 / 9) < 1e-12);
});

test("pickSource: category without list is 100% Livro Básico", () => {
  for (const key of ["8-9/menor", "8-11/menor", "8-4/esotérico", "8-12", "8-8"]) {
    for (const x of [0, 0.5, 0.7, 0.999]) {
      assert.deepEqual(pickSource(key, { tableId: key.split("/")[0] === "8-4" ? key : key.split("/")[0] }, fixed(x)).share, 1, key);
    }
  }
  // cadeia com esotérico: o passo de 8-4/esotérico nunca sorteia outro livro
  const rng = scriptedRng([face(70, 100), face(6, 6), 0.99]);
  const done = resolveWithDice(itemsChain("1"), rng);
  const eso = done.steps.find((s) => s.tableId === "8-4/esotérico");
  assert.equal(eso.sourceBook, BASIC);
  assert.equal(eso.share, 1);
  assert.equal(done.gains[0].category, "esotérico");
});

test("resolveWithDice: other-book improvements reroll duplicates by name and record their source", () => {
  const rng = scriptedRng([
    face(95, 100), face(1, 6), // superior 2 melhorias, arma
    0.1, face(40, 100), // Livro Básico: Espada longa
    0.99, face(2, 3), // Deuses: Canônico
    0.99, face(2, 3), // Canônico de novo: repetida
    0.1, face(14, 100), // Livro Básico: Certeira
  ]);
  const done = resolveWithDice(itemsChain("5"), rng);
  assert.equal(nextStep(done), null);
  const [gain] = done.gains;
  assert.equal(gain.name, "Espada longa (canônico, certeira)");
  assert.deepEqual(gain.details.improvements, ["Canônico", "Certeira"]);
  assert.equal(gain.price, 15 + 3000);
  const rejected = done.steps.find((s) => s.outcome?.rejected);
  assert.equal(rejected.outcome.rejected, "repetida");
  assert.equal(rejected.sourceBook, "Deuses de Arton");
  assert.equal(rejected.sourceTableId, "deuses/melhorias");
  assert.ok(Math.abs(rejected.share - 0.3 * 3 / 9) < 1e-12);
  assert.equal(rejected.die, "1d3");
  const base = done.steps.find((s) => s.tableId === "8-4/arma");
  assert.deepEqual([base.sourceBook, base.sourceTableId, base.share], [BASIC, "8-4/arma", 0.7]);
  assert.deepEqual(gain.details.components, [
    { role: "base", name: "Espada longa", book: BASIC, bookPage: 144 },
    { role: "melhoria", name: "Canônico", book: "Deuses de Arton", bookPage: 54 },
    { role: "melhoria", name: "Certeira", book: BASIC, bookPage: 165 },
  ]);
});

test("Ameaças material prices parse into the per-type columns", () => {
  assert.deepEqual(parseMaterialPriceText("Arma +T$ 600; Armadura leve +T$ 1.500; Armadura pesada +T$ 3.000; Escudo +T$ 1.500; Esotérico +T$ 400"),
    { arma: 600, "armadura leve": 1500, "armadura pesada": 3000, escudo: 1500, esotérico: 400 });
  assert.throws(() => parseMaterialPriceText("Arma +T$ 600"));
  assert.equal(materialPriceOf("Casco de monstro", { name: "Espada longa", category: "arma" }), 750);
  assert.equal(materialPriceOf("adamante", { name: "Completa", category: "armadura" }), 18000);
});

test("item gains carry components with book and page, and the computed price", () => {
  // material de Ameaças numa armadura completa
  const mat = resolveWithDice(itemsChain("2"), scriptedRng([
    face(95, 100), face(4, 6), 0.1, face(11, 100), 0.1, face(41, 100), 0.99, face(3, 3),
  ]));
  const [armor] = mat.gains;
  assert.equal(armor.name, "Completa (material especial: Prata)");
  assert.equal(armor.details.material, "Prata");
  assert.equal(armor.price, 3000 + 300 + 3000);
  assert.equal(armor.details.priceNote, undefined);
  assert.deepEqual(armor.details.components, [
    { role: "base", name: "Completa", book: BASIC, bookPage: 153 },
    { role: "melhoria", name: "Material especial", book: BASIC, bookPage: 165 },
    { role: "material", name: "Prata", book: "Ameaças de Arton", bookPage: 400 },
  ]);
  // item geral de Deuses pela 8-3
  const div = resolveWithDice(itemsChain("1"), scriptedRng([face(50, 100), 0.99, face(1, 70)]));
  assert.equal(div.gains[0].name, "Água benta concentrada");
  assert.equal(div.gains[0].price, 60);
  assert.equal(div.gains[0].source, "deuses/itens-gerais");
  assert.deepEqual(div.gains[0].details.components, [{ role: "base", name: "Água benta concentrada", book: "Deuses de Arton", bookPage: 50 }]);
  // arma de outro livro como base de item superior: preço da lista
  const sup = resolveWithDice(itemsChain("2"), scriptedRng([face(95, 100), face(1, 6), 0.7, face(1, 16), 0.1, face(14, 100)]));
  assert.equal(sup.gains[0].name, "Porrete (certeira)");
  assert.equal(sup.gains[0].price, 2 + 300);
  assert.equal(sup.gains[0].details.components[0].book, "Ameaças de Arton");
  // específica de Heróis da mesma categoria do item mágico (médio)
  const spec = resolveWithDice(itemsChain("13"), scriptedRng([face(100, 100), face(1, 6), 0.1, face(40, 100), face(1, 100), face(95, 100), 0.99, face(1, 6)]));
  const [s] = spec.gains;
  assert.equal(s.source, "herois/armas-especificas/medio");
  assert.equal(s.tier, "médio");
  assert.equal(s.details.specific, true);
  assert.deepEqual(s.details.components, [{ role: "específico", name: s.name, book: "Heróis de Arton", bookPage: 257 }]);
  // poção: só Livro Básico, componente base com a página da 8-12
  const pot = resolveWithDice(itemsChain("1"), scriptedRng([face(95, 100), face(1, 100)]));
  assert.deepEqual(pot.gains[0].details.components, [{ role: "base", name: pot.gains[0].name, book: BASIC, bookPage: BASIC_BOOK_TABLES["8-12"].bookPage }]);
  // encanto
  const mag = resolveWithDice(itemsChain("9"), scriptedRng([face(100, 100), face(1, 6), 0.1, face(40, 100), face(1, 100)]));
  assert.deepEqual(mag.gains[0].details.components.map((c) => c.role), ["base", "encanto"]);
});

test("applyRoll never records a source book other than Livro Básico", () => {
  const rng = createRng("livro");
  for (const nd of ["2", "5", "9", "13", "17", "20"]) {
    for (let i = 0; i < 60; i++) {
      let s = itemsChain(nd);
      for (let r = nextStep(s); r; r = nextStep(s)) {
        const [min, max] = dieRange(r.die);
        s = applyRoll(s, randomIntIn(rng, min, max));
      }
      for (const step of s.steps) {
        assert.ok(step.sourceBook === undefined || step.sourceBook === BASIC);
        assert.ok(step.sourceTableId === undefined || !ALL_TABLES[step.sourceTableId] || ALL_TABLES[step.sourceTableId].kind !== "list");
      }
      for (const g of s.gains) for (const c of g.details.components) assert.equal(c.book, BASIC);
    }
  }
});

function randomIntIn(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

test("performance with book weights: 396 ND 20 Dobro chains (both columns) under 500 ms", () => {
  const rng = createRng("desempenho-pesos");
  const t0 = performance.now();
  let chains = 0;
  for (const column of ["money", "items"]) {
    for (let i = 0; i < 99; i++) {
      for (const state of startTreasure({ challengeRating: "20", column, mode: "dobro" })) {
        resolveWithDice(state, rng);
        chains++;
      }
    }
  }
  const ms = performance.now() - t0;
  console.log(`# perf pesos: ${chains} cadeias em ${ms.toFixed(1)} ms`);
  assert.equal(chains, 396);
  assert.ok(ms < 500, `${ms} ms`);
});

// ---------- Correções da revisão da Task 3 ----------
import { chapter3PageOf } from "../src/treasure/tables/prices.js";

test("Livro Básico components use the Chapter 3 pages; materials 3-9; enchantments keep 8-8", () => {
  assert.equal(chapter3PageOf("Adaga"), 144);
  assert.equal(chapter3PageOf("Tridente"), 144);
  assert.equal(chapter3PageOf("Alabarda"), 145);
  assert.equal(chapter3PageOf("Balas (20)"), 145);
  assert.equal(chapter3PageOf("Couro"), 153);
  assert.equal(chapter3PageOf("Escudo pesado"), 153);
  assert.equal(chapter3PageOf("Água benta"), 156);
  assert.equal(chapter3PageOf("Dente-de-dragão"), 156);
  assert.equal(chapter3PageOf("Essência abissal"), 157);
  assert.equal(chapter3PageOf("Riso de Nimb"), 157);
  const mat = resolveWithDice(itemsChain("2"), scriptedRng([face(95, 100), face(4, 6), 0.1, face(11, 100), 0.1, face(41, 100), 0.1, face(2, 6)]));
  assert.deepEqual(mat.gains[0].details.components.map((c) => c.bookPage), [153, 165, 167]);
  const mag = resolveWithDice(itemsChain("9"), scriptedRng([face(100, 100), face(1, 6), 0.1, face(40, 100), face(1, 100)]));
  assert.deepEqual(mag.gains[0].details.components.map((c) => c.bookPage), [144, BASIC_BOOK_TABLES["8-8"].bookPage]);
  const div = feed(itemsChain("1"), [50, 10]); // Bálsamo restaurador pela 8-3, com applyRoll
  assert.deepEqual(div.gains[0].details.components, [{ role: "base", name: "Bálsamo restaurador", book: BASIC, bookPage: 156 }]);
});

test("a table chosen on purpose is never weighted; chains from 8-1 still reach other books", () => {
  const rng = createRng("escolhida");
  for (const id of ["8-13", "8-3", "8-4/arma"]) {
    for (let i = 0; i < 500; i++) {
      const done = resolveWithDice(startTable(id), rng);
      assert.equal(done.gains[0].source, id);
      for (const s of done.steps) assert.equal(s.sourceBook, undefined);
    }
  }
  for (const tableId of ["8-13", "8-3"]) {
    const groups = rollBatch([{ tableId, quantity: 99 }, { tableId, quantity: 99 }, { tableId, quantity: 99 }], rng);
    for (const t of groups.flatMap((g) => g.treasures)) for (const st of t.states) for (const g of st.gains) assert.equal(g.source, tableId);
  }
  const sources = new Set();
  for (let i = 0; i < 300; i++) for (const g of resolveWithDice(itemsChain("1"), rng).gains) sources.add(g.source);
  assert.ok([...sources].some((src) => ALL_TABLES[src]?.kind === "list"), [...sources].join(", "));
});

test("superior/magic item with an other-book base takes the origin list as source", () => {
  const sup = resolveWithDice(itemsChain("2"), scriptedRng([face(95, 100), face(1, 6), 0.7, face(1, 16), 0.1, face(14, 100)]));
  assert.equal(sup.gains[0].source, "ameacas/armas");
});

test("shield-only accepts an other-book shield and rerolls on an other-book armor", () => {
  const shield = resolveWithDice(itemsChain("9"), scriptedRng([face(100, 100), face(3, 6), 0.99, face(14, 14), face(15, 100)]));
  assert.equal(shield.gains[0].name, "Sagna (animado)");
  assert.equal(shield.gains[0].category, "escudo");
  const armor = resolveWithDice(itemsChain("9"), scriptedRng([face(100, 100), face(3, 6), 0.99, face(1, 14), face(15, 100), face(1, 100)]));
  assert.equal(armor.steps.find((s) => s.outcome?.rejected).outcome.rejected, "apenas escudos");
  assert.equal(armor.gains[0].name, "Armadura sensual (abascante)");
});

test("an improvement printed in Livro Básico and another book is a duplicate", () => {
  const done = resolveWithDice(itemsChain("5"), scriptedRng([
    face(95, 100), face(6, 6), face(1, 100), // superior 2 melhorias, esotérico: Bolsa de pó (8-4/esotérico sem lista)
    0.1, face(75, 100), // Livro Básico: Potencializador
    0.7, face(1, 2), // Heróis: Potencializador → repetida
    0.1, face(90, 100), // Livro Básico: Vigilante
  ]));
  const rejected = done.steps.find((s) => s.outcome?.rejected);
  assert.equal(rejected.outcome.rejected, "repetida");
  assert.equal(rejected.sourceTableId, "herois/melhorias");
  assert.deepEqual(done.gains[0].details.improvements, ["Potencializador", "Vigilante"]);
});

test("other-book armors carry leve/pesada from the printed sections and use that material column", () => {
  const by = (id, n) => LIST_TABLES[id].items.find((i) => i.name === n);
  assert.equal(by("herois/armaduras", "Colete fora da lei").armor, "leve");
  assert.equal(by("herois/armaduras", "Brigantina").armor, "pesada");
  assert.equal(by("herois/armaduras", "Broquel").armor, undefined);
  assert.equal(by("ameacas/armaduras", "Veste de teia de aranha").armor, "leve");
  assert.equal(by("ameacas/armaduras", "Armadura de quitina").armor, "pesada");
  assert.equal(materialPriceOf("adamante", { name: "Colete fora da lei", category: "armadura", armor: "leve" }), 6000);
  assert.equal(materialPriceOf("adamante", { name: "Brigantina", category: "armadura", armor: "pesada" }), 18000);
  // Heróis 3-3 item 1 (Armadura sensual, leve, T$ 55) + 1 melhoria + adamante leve
  const done = resolveWithDice(itemsChain("2"), scriptedRng([face(95, 100), face(4, 6), 0.99, face(1, 14), 0.1, face(41, 100), 0.1, face(2, 6)]));
  assert.equal(done.gains[0].price, 55 + 300 + 6000);
});

// ---------- Task 4: totais, componentes e livro sorteado ----------
import { formatComponents, formatBookDraw } from "../src/treasure/treasureFormat.js";

test("summarizeGains adds wealthTotal and grandTotal with one decimal", () => {
  const summary = summarizeGains([
    { kind: "money", amount: 35, currency: "TC" },
    { kind: "money", amount: 200, currency: "T$" },
    { kind: "wealth", tier: "média", value: 50.5, amount: 50.5, currency: "T$", examples: "A" },
    { kind: "wealth", tier: "menor", value: 10.25, amount: 10.25, currency: "T$", examples: "B" },
  ]);
  assert.equal(summary.wealthTotal, 60.8);
  assert.equal(summary.totalTibars, 203.5);
  assert.equal(summary.grandTotal, 264.3);
  const empty = summarizeGains([]);
  assert.equal(empty.wealthTotal, 0);
  assert.equal(empty.grandTotal, 0);
});

test("summarizeGains keeps components and does not merge items with different components", () => {
  const comp = (n) => [{ role: "base", name: "Espada longa", book: "Livro Básico", bookPage: 144 },
    { role: "melhoria", name: n, book: "Heróis de Arton", bookPage: 240 }];
  const g = (n) => ({ kind: "item", name: "Espada longa", category: "arma", source: "8-4/arma", price: 18000, details: { components: comp(n) } });
  const summary = summarizeGains([g("Potencializador"), g("Potencializador"), g("Cruel")]);
  assert.equal(summary.items.length, 2);
  assert.equal(summary.items[0].quantity, 2);
  assert.equal(summary.items[0].components.length, 2);
});

test("formatComponents prints one line per component, base first, extras indented", () => {
  assert.deepEqual(formatComponents([
    { role: "base", name: "Espada longa", book: "Livro Básico", bookPage: 144 },
    { role: "melhoria", name: "Potencializador", book: "Heróis de Arton", bookPage: 240 },
    { role: "encanto", name: "Chama", book: "Livro Básico" },
  ]), ["Espada longa — Livro Básico p. 144", "· Potencializador — Heróis de Arton p. 240", "· Chama — Livro Básico"]);
  assert.deepEqual(formatComponents(undefined), []);
});

test("formatBookDraw shows the drawn book only when share < 1", () => {
  assert.equal(formatBookDraw({ sourceBook: "Heróis de Arton", share: 0.7 }), "Livro sorteado: Heróis de Arton (70%)");
  assert.equal(formatBookDraw({ sourceBook: "Ameaças de Arton", share: 0.124 }), "Livro sorteado: Ameaças de Arton (12,4%)");
  assert.equal(formatBookDraw({ sourceBook: "Livro Básico", share: 1 }), "");
  assert.equal(formatBookDraw({ sourceBook: "Livro Básico" }), "");
});

// ---------- Ajustes finais ----------
import { describeBookRowResult } from "../src/treasure/treasureFormat.js";
import { eligibleItems } from "../src/treasure/bookWeights.js";

test("describeBookRowResult prints table rows as in the book", () => {
  assert.equal(describeBookRowResult({ kind: "none" }), "—");
  assert.equal(describeBookRowResult({ kind: "potion", count: 1 }), "1 poção");
  assert.equal(describeBookRowResult({ kind: "potion", count: "1d3+1" }), "1d3+1 poções");
  assert.equal(describeBookRowResult({ kind: "wealth", count: 1, tier: "menor" }), "1 riqueza menor");
  assert.equal(describeBookRowResult({ kind: "wealth", count: "1d3", tier: "média" }), "1d3 riquezas médias");
  assert.equal(describeBookRowResult({ kind: "wealth", count: "1d3+1", tier: "maior" }), "1d3+1 riquezas maiores");
  assert.equal(describeBookRowResult({ kind: "superior", improvements: 2 }), "Superior (2 melhorias)");
  assert.equal(describeBookRowResult({ kind: "superior", improvements: 1 }), "Superior (1 melhoria)");
  assert.equal(describeBookRowResult({ kind: "magic", tier: "médio" }), "Mágico (médio)");
  assert.equal(describeBookRowResult({ kind: "diverse" }), "Diverso");
  assert.equal(describeBookRowResult({ kind: "equipment" }), "Equipamento");
  assert.equal(describeBookRowResult({ kind: "money", dice: "2d4", multiplier: 100, currency: "T$" }), "2d4x100 T$");
  assert.equal(describeBookRowResult({ kind: "money", dice: "1d8", multiplier: 10, currency: "TO" }), "1d8x10 TO");
  // o histórico segue com o texto atual
  assert.equal(describeRowResult({ kind: "potion", count: 1 }), "Poções: 1");
});

test("weighted 8-3 pool excludes services but lists keep them", () => {
  const services = ["Casamento (por pessoa)", "Cerimônia religiosa", "Sacramento", "Condecoração militar", "Favor da pessoa amada"];
  for (const id of ["deuses/itens-gerais", "herois/itens-gerais"]) {
    const names = LIST_TABLES[id].items.map((i) => i.name);
    const eligible = eligibleItems("8-3", id).map((i) => i.name);
    for (const s of services) assert.ok(!eligible.includes(s), `${id} elegível: ${s}`);
    assert.ok(eligible.length > 0);
    for (const s of names.filter((n) => services.includes(n))) assert.ok(names.includes(s));
  }
  const all = Object.values(LIST_TABLES).flatMap((t) => t.items.map((i) => i.name));
  for (const s of services) assert.ok(all.includes(s), `lista mantém ${s}`);
  const rng = createRng("servicos");
  for (let i = 0; i < 3000; i++) {
    const done = resolveWithDice(startTable("8-3"), rng);
    for (const g of done.gains) assert.ok(!services.includes(g.name), g.name);
  }
});

test("stepReference shows only the page for basic book tables", () => {
  assert.equal(stepReference({ tableId: "8-1/1/money" }), "p. 328");
});
test("stepReference uses the drawn source table", () => {
  const id = Object.keys(ALL_TABLES).find((k) => ALL_TABLES[k].book && ALL_TABLES[k].book !== "Livro Básico");
  const t = ALL_TABLES[id];
  assert.equal(stepReference({ tableId: "8-3", sourceTableId: id }), `${t.book} p. ${t.bookPage}`);
});
test("stepReference is empty for unknown tables", () => {
  assert.equal(stepReference({ tableId: "nao-existe" }), "");
});

// ---------- Restrições de materiais e melhorias (Livro Básico p. 165–167) ----------
import { materialProblem, improvementProblem, isWoodenWeapon, isFiringWeapon } from "../src/treasure/itemRules.js";
import { armorWeight } from "../src/treasure/tables/prices.js";
import { ALL_TABLES as RULE_TABLES } from "../src/treasure/tables/index.js";
const WOODEN = ["Arco curto", "Arco longo", "Bordão", "Clava", "Lança", "Lança montada", "Pique", "Tacape", "Porrete", "Tetsubo",
  "Malho", "Clava-grão", "Lança de justa", "Lança de falange", "Arco montado", "Arco de guerra"];
const NO_MATERIAL = ["Presa de serpente", "Veste de teia de aranha", "Armadura de pedra"];
// `armor` impresso na lista de outro livro de onde veio o item-base.
const gainArmor = (gain) => RULE_TABLES[gain.source]?.items?.find((i) => i.name === gain.details.components[0].name)?.armor;

test("Tollon on a Couraça rerolls the material d6 with the reason; the final material is valid", () => {
  const s1 = feed(itemsChain("2"), [95, 4, 31, 41]); // Couraça, Material especial
  const s2 = applyRoll(s1, 4); // madeira Tollon
  const rejected = s2.steps.at(-1);
  assert.equal(rejected.outcome.rejected, "material inválido");
  assert.equal(rejected.outcome.name, "madeira Tollon");
  const again = nextStep(s2);
  assert.equal(again.id, `${rejected.id}.1`);
  assert.equal(again.die, "1d6");
  assert.equal(again.kind, "expression");
  assert.match(again.reason, /de novo/);
  assert.match(again.reason, /madeira Tollon só em armas de madeira, escudos leves e esotéricos; Couraça é armadura/);
  assert.match(again.reason, /2 adamante/);
  const done = applyRoll(s2, 6); // mitral
  assert.equal(nextStep(done), null);
  assert.equal(done.gains.length, 1);
  assert.equal(done.gains[0].name, "Couraça (material especial: mitral)");
  assert.equal(done.gains[0].details.material, "mitral");
  assert.deepEqual(done.gains[0].details.components.map((c) => c.name), ["Couraça", "Material especial", "mitral"]);
});

test("Tollon: rejected on Espada longa and Escudo pesado, accepted on Clava, Escudo leve and esotéricos", () => {
  const tollon = (type, base, improvement) => applyRoll(feed(itemsChain("2"), [95, type, base, improvement]), 4);
  assert.equal(tollon(1, 40, 66).steps.at(-1).outcome.rejected, "material inválido"); // Espada longa
  assert.match(nextStep(tollon(1, 40, 66)).reason, /Espada longa não é de madeira/);
  assert.equal(tollon(4, 66, 41).steps.at(-1).outcome.rejected, "material inválido"); // Escudo pesado
  const club = tollon(1, 28, 66); // Clava
  assert.equal(nextStep(club), null);
  assert.equal(club.gains[0].details.material, "madeira Tollon");
  const shield = tollon(4, 56, 41); // Escudo leve
  assert.equal(nextStep(shield), null);
  assert.equal(shield.gains[0].details.material, "madeira Tollon");
  const esoteric = tollon(6, 11, 46); // Cajado arcano
  assert.equal(nextStep(esoteric), null);
  assert.equal(esoteric.gains[0].details.material, "madeira Tollon");
});

test("material rules: wooden weapons by name, light shields only, other materials free", () => {
  for (const name of ["Arco curto", "Arco longo", "Bordão", "Clava", "Lança", "Lança montada", "Pique", "Tacape",
    "Porrete", "Tetsubo", "Malho", "Clava-grão", "Lança de justa", "Lança de falange", "Arco montado", "Arco de guerra",
    "Zarabatana", "Bastão lúdico"]) {
    assert.ok(isWoodenWeapon(name), name);
  }
  for (const name of ["Picareta", "Espada longa", "Besta leve", "Flechas (20)", "Lança de fogo", "Martelo longo"]) {
    assert.ok(!isWoodenWeapon(name), name);
  }
  assert.equal(materialProblem("madeira Tollon", { name: "Armadura de ossos", category: "armadura", armor: "leve" }) !== null, true);
  for (const material of ["aço-rubi", "adamante", "gelo eterno", "matéria vermelha", "mitral", "Casco de monstro", "Lanajuste", "Prata"]) {
    for (const base of [{ name: "Couraça", category: "armadura" }, { name: "Espada longa", category: "arma" }, { name: "Escudo pesado", category: "escudo" }]) {
      assert.equal(materialProblem(material, base), null, `${material} em ${base.name}`);
    }
  }
});

test("Mira telescópica: rerolls on Espada longa and Funda, accepted on Arco longo", () => {
  const sword = feed(itemsChain("2"), [95, 1, 40, 76]);
  assert.equal(sword.steps.at(-1).outcome.rejected, "só armas de disparo");
  assert.equal(nextStep(sword).tableId, "8-5/arma");
  assert.equal(nextStep(sword).id, `${sword.steps.at(-1).id}.1`);
  assert.match(nextStep(sword).reason, /Melhoria de novo na Tabela 8-5\/arma \(só armas de disparo\): Mira telescópica só em armas de disparo \(exceto fundas\); Espada longa não é arma de disparo/);
  assert.equal(applyRoll(sword, 81).gains[0].name, "Espada longa (precisa)");
  const sling = feed(itemsChain("2"), [95, 1, 52, 76]);
  assert.equal(sling.steps.at(-1).outcome.rejected, "só armas de disparo");
  assert.match(nextStep(sling).reason, /Funda é funda/);
  const bow = feed(itemsChain("2"), [95, 1, 11, 76]);
  assert.equal(nextStep(bow), null);
  assert.equal(bow.gains[0].name, "Arco longo (mira telescópica)");
  for (const name of ["Arco curto", "Besta leve", "Besta pesada", "Pistola", "Mosquete", "Arcabuz", "Besta de mão", "Garrucha"]) assert.ok(isFiringWeapon(name), name);
  for (const name of ["Funda", "Azagaia", "Rede", "Flechas (20)", "Shuriken", "Chakram", "Adaga"]) assert.ok(!isFiringWeapon(name), name);
});

test("Reforçada and Delicada exclude each other: the later one rerolls", () => {
  const a = feed(itemsChain("5"), [95, 4, 11, 24, 56]); // Completa: Delicada, depois Reforçada
  assert.equal(a.steps.at(-1).outcome.rejected, "reforçada e delicada");
  assert.equal(a.steps.at(-1).outcome.name, "Reforçada");
  assert.match(nextStep(a).reason, /\(reforçada e delicada\): um item não pode ser reforçado e delicado; Completa já é delicada/);
  const b = feed(itemsChain("5"), [95, 4, 11, 56, 24]); // Reforçada, depois Delicada
  assert.equal(b.steps.at(-1).outcome.rejected, "reforçada e delicada");
  assert.equal(b.steps.at(-1).outcome.name, "Delicada");
  assert.match(nextStep(b).reason, /Completa já é reforçada/);
  assert.equal(applyRoll(b, 81).gains[0].name, "Completa (reforçada, selada)");
  assert.equal(improvementProblem("Delicada", { name: "Completa", category: "armadura" }, ["Ajustada"]), null);
});

test("seeded mass run: 2000 superior items never break the material and improvement rules", () => {
  const rng = createRng("restricoes");
  const start = { ...applyRoll(itemsChain("5"), 95), weighted: true }; // 2 melhorias, com pesos entre livros
  let tollon = 0, rerolls = 0;
  for (let i = 0; i < 2000; i++) {
    const done = resolveWithDice(start, rng);
    rerolls += done.steps.filter((s) => s.outcome?.rejected).length;
    for (const gain of done.gains) {
      const base = { name: gain.details.components[0].name, category: gain.category };
      const improvements = gain.details.improvements ?? [];
      const names = improvements.map(normalizeName);
      assert.ok(!(names.includes("reforcada") && names.includes("delicada")), gain.name);
      assert.ok(!(names.includes("macica") && names.includes("precisa")), gain.name);
      if (names.includes("delicada")) assert.equal(armorWeight({ ...base, armor: gainArmor(gain) }), "pesada", gain.name);
      if (names.includes("material especial")) assert.ok(!NO_MATERIAL.includes(base.name), gain.name);
      if (names.includes("mira telescopica")) assert.ok(isFiringWeapon(base.name), gain.name);
      improvements.forEach((name, j) => assert.equal(improvementProblem(name, base, improvements.slice(0, j)), null, gain.name));
      if (gain.details.material) {
        assert.equal(materialProblem(gain.details.material, base), null, gain.name);
        if (normalizeName(gain.details.material) === "madeira tollon") {
          tollon++;
          assert.notEqual(gain.category, "armadura", gain.name);
          if (gain.category === "arma") assert.ok(WOODEN.includes(base.name), gain.name);
          if (gain.category === "escudo") assert.ok(["Escudo leve", "Broquel", "Escudo de couro"].includes(base.name), gain.name);
        }
      }
    }
  }
  assert.ok(tollon > 0, "alguma madeira Tollon válida saiu");
  assert.ok(rerolls > 0);
});

test("a rejected material step shows the material and the reroll note", async () => {
  const { describeStep } = await import("../src/treasure/treasureFormat.js");
  const s = applyRoll(feed(itemsChain("2"), [95, 4, 31, 41]), 4);
  assert.deepEqual(describeStep(s.steps.at(-1)), { roll: "1d6 = 4", result: "Resultado: madeira Tollon (recusado: material inválido; rola de novo)" });
});

test("fix 1: Tollon on the other books' wooden weapons and light shields", () => {
  const tollon = (name, category) => materialProblem("madeira Tollon", { name, category });
  assert.equal(tollon("Porrete", "arma"), null);
  assert.equal(tollon("Malho", "arma"), null);
  assert.equal(tollon("Lança de fogo", "arma").cause, "material inválido");
  assert.match(tollon("Lança de fogo", "arma").text, /Lança de fogo não é de madeira/);
  for (const name of ["Escudo leve", "Broquel", "Escudo de couro"]) assert.equal(tollon(name, "escudo"), null, name);
  for (const name of ["Escudo pesado", "Escudo torre", "Sagna", "Escudo de vime"]) {
    assert.equal(tollon(name, "escudo").cause, "material inválido", name);
    assert.match(tollon(name, "escudo").text, new RegExp(`${name} não é escudo leve`));
  }
});

test("fix 1: Delicada only on heavy armor", () => {
  const couraca = feed(itemsChain("2"), [95, 4, 31, 24]); // Couraça é leve (Tabela 3-5)
  assert.equal(couraca.steps.at(-1).outcome.rejected, "só armaduras pesadas");
  assert.match(nextStep(couraca).reason, /\(só armaduras pesadas\): Delicada só em armaduras pesadas; Couraça é armadura leve/);
  const shield = feed(itemsChain("2"), [95, 4, 56, 24]);
  assert.equal(shield.steps.at(-1).outcome.rejected, "só armaduras pesadas");
  assert.match(nextStep(shield).reason, /Delicada só em armaduras pesadas; Escudo leve é escudo/);
  const full = feed(itemsChain("2"), [95, 4, 11, 24]); // Completa (Armadura completa) é pesada
  assert.equal(nextStep(full), null);
  assert.equal(full.gains[0].name, "Completa (delicada)");
  assert.equal(improvementProblem("Delicada", { name: "Colete fora da lei", category: "armadura", armor: "leve" }, []).cause, "só armaduras pesadas");
  assert.equal(improvementProblem("Delicada", { name: "Brigantina", category: "armadura", armor: "pesada" }, []), null);
});

test("fix 1: Maciça and Precisa exclude each other: the later one rerolls", () => {
  const a = feed(itemsChain("5"), [95, 1, 40, 56, 81]); // Maciça, depois Precisa
  assert.equal(a.steps.at(-1).outcome.rejected, "maciça e precisa");
  assert.equal(a.steps.at(-1).outcome.name, "Precisa");
  assert.match(nextStep(a).reason, /\(maciça e precisa\): uma arma não pode ser maciça e precisa; Espada longa já é maciça/);
  const b = feed(itemsChain("5"), [95, 1, 40, 81, 56]); // Precisa, depois Maciça
  assert.equal(b.steps.at(-1).outcome.name, "Maciça");
  assert.match(nextStep(b).reason, /Espada longa já é precisa/);
  assert.equal(applyRoll(b, 14).gains[0].name, "Espada longa (precisa, certeira)");
});

test("fix 1: items that do not accept Material especial reroll the improvement before the d6", () => {
  for (const name of ["Presa de serpente", "Veste de teia de aranha", "Armadura de pedra"]) {
    const problem = improvementProblem("Material especial", { name, category: "arma" }, []);
    assert.equal(problem.cause, "não aceita material", name);
    assert.match(problem.text, new RegExp(`${name} não aceita material especial`));
  }
  assert.equal(improvementProblem("Material especial", { name: "Espada longa", category: "arma" }, []), null);
  // Ameaças 3-1, item 13 (Presa de serpente) + 1 melhoria: Material especial (recusada), depois Precisa
  const done = resolveWithDice(itemsChain("2"), scriptedRng([face(95, 100), face(1, 6), 0.71, face(13, 16),
    0.1, face(66, 100), 0.1, face(81, 100)]));
  const base = done.steps.find((s) => s.item?.name === "Presa de serpente");
  assert.ok(base);
  const rejected = done.steps.find((s) => s.outcome?.rejected);
  assert.equal(rejected.outcome.rejected, "não aceita material");
  assert.equal(rejected.outcome.name, "Material especial");
  assert.ok(!done.steps.some((s) => s.kind === "expression" && s.reason.startsWith("Material especial")), "sem sub-rolagem de material");
  assert.equal(done.gains[0].details.improvements.join(), "Precisa");
});

// ---------- Cristais ----------
import { getCrystalValueByChallenge, getCrystalValueTable, CRYSTAL_COLORS, crystalLine } from "../src/economy/crystalValues.js";
import { crystalLinesOf } from "../src/treasure/treasureBatch.js";
import { summarizeCrystals, splitAmongPlayers } from "../src/treasure/treasureSummary.js";

test("cristais: valores de ND 1/4 a 10 não mudam e ND 11 a 20 seguem o spec", () => {
  const old = [5, 10, 20, 40, 75, 120, 200, 300, 450, 650, 900, 1200];
  const table = getCrystalValueTable();
  assert.deepEqual(table.slice(0, 12).map((e) => e.value), old);
  assert.deepEqual(table.slice(12).map((e) => [e.challenge, e.value]),
    [[11, 1600], [12, 2000], [13, 2600], [14, 3400], [15, 4400], [16, 5700], [17, 7400], [18, 9600], [19, 12500], [20, 16000]]);
  assert.equal(getCrystalValueByChallenge(15), 4400);
  assert.equal(getCrystalValueByChallenge("1/4"), 5);
  assert.equal(getCrystalValueByChallenge(25), 16000);
});

test("cristais: multiplicadores 1, 5 e 10", () => {
  assert.deepEqual(Object.fromEntries(Object.entries(CRYSTAL_COLORS).map(([k, v]) => [k, v.multiplier])), { azul: 1, verde: 5, irregular: 10 });
  assert.equal(CRYSTAL_COLORS.irregular.label, "Irregular");
});

test("cristais: linhas verde e irregular", () => {
  const green = crystalLine({ challenge: 3, color: "verde", quantity: 1 });
  assert.equal(green.total, 375);
  assert.equal(green.estimate, false);
  const irr = crystalLine({ challenge: 2, color: "irregular", quantity: 1 });
  assert.equal(irr.total, 400);
  assert.equal(irr.estimate, true);
  assert.equal(crystalLine({ challenge: 3, color: "azul", quantity: 4 }).unitValue, 75);
});

test("cristais: última sessão do PO soma 470", () => {
  const rows = [["0.25", 6], ["0.5", 4], ["1", 5], ["3", 4]].map(([challengeRating, quantity]) => ({ kind: "crystals", challengeRating, color: "azul", quantity }));
  assert.deepEqual(buildBatch(rows), []);
  assert.deepEqual(rollBatch(rows, createRng(1)), []);
  const lines = crystalLinesOf(rows);
  assert.equal(lines.length, 4);
  assert.equal(summarizeCrystals(lines).total, 470);
});

test("cristais: quantidade inválida lança RangeError", () => {
  assert.throws(() => buildBatch([{ kind: "crystals", challengeRating: "1", color: "azul", quantity: 0 }]), RangeError);
  assert.throws(() => crystalLinesOf([{ kind: "crystals", challengeRating: "1", color: "azul", quantity: 100 }]), RangeError);
  assert.throws(() => crystalLinesOf([{ kind: "crystals", challengeRating: "1", color: "roxo", quantity: 1 }]), RangeError);
});

test("cristais: divisão entre jogadores arredonda para baixo e informa o resto", () => {
  assert.deepEqual(splitAmongPlayers(470, 5), { each: 94, remainder: 0 });
  assert.deepEqual(splitAmongPlayers(473.5, 4), { each: 118, remainder: 1.5 });
});
