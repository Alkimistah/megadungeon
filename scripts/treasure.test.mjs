import assert from "node:assert/strict";
import test from "node:test";
import { validateTable } from "../src/treasure/tables/schema.js";
import { BASIC_BOOK_TABLES, TYPE_ROLLS, ENCHANTMENT_COUNT, ENCHANTMENT_PRICES } from "../src/treasure/tables/basicBook.js";

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
