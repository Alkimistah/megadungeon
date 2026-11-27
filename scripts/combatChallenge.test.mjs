import test from "node:test";
import assert from "node:assert/strict";
import { calculateCombatND } from "../src/challenge.js";

// ND de grupo pela regra do livro (Ameaças de Arton p. 9).
const nd = items => calculateCombatND(items.map(([challengeRating, quantity = 1]) => ({ challengeRating, quantity })));

test("lista vazia vale ND 0", () => {
  assert.equal(calculateCombatND([]), 0);
  assert.equal(calculateCombatND(undefined), 0);
});

test("tabela do plano segue o livro", () => {
  assert.equal(nd([[7], [6], [5], [3]]), 8, "exemplo do livro: 7 + 1 + 1/2 = 8,5 → 8");
  assert.equal(nd([[9], [5, 3]]), 9, "Kallyanach e 3 Acólitos: 9 e 7 → 9,5 → 9");
  assert.equal(nd([[9], [2, 8]]), 10, "9 e 8 × ND 2 (grupo 8) → 10");
  assert.equal(nd([[6], [4]]), 6, "6 e 4 → 6,5 → 6");
  assert.equal(nd([[5, 2], [3, 2]]), 7, "grupos 7 e 5 → 7,5 → 7");
  assert.equal(nd([[3, 2]]), 5);
  assert.equal(nd([[3], [3]]), 5, "a mesma ficha em itens separados também é agrupada");
});

test("ameaças de ND igual somam +2 por dobra", () => {
  assert.equal(nd([[5, 1]]), 5);
  assert.equal(nd([[5, 2]]), 7);
  assert.equal(nd([[5, 3]]), 7, "três contam como duas");
  assert.equal(nd([[5, 4]]), 9);
  assert.equal(nd([[2, 8]]), 8);
});

test("grupos empatados são reagrupados", () => {
  assert.equal(nd([[7], [5, 2]]), 9, "7 e (5,5 → 7) viram dois grupos de 7 → 9");
  assert.equal(nd([[9], [7], [5, 2]]), 11, "7 e 7 → 9, depois 9 e 9 → 11");
  assert.equal(nd([[1], [0.25, 4]]), 3, "ND 1 e quatro ND 1/4 (grupo 1) → 3");
});

test("diferenças pela tabela de +1, +1/2, +1/4 e nada", () => {
  assert.equal(nd([[8], [7]]), 9, "1 abaixo soma +1");
  assert.equal(nd([[8], [4]]), 8, "4 abaixo não soma");
  assert.equal(nd([[7], [4]]), 7, "3 abaixo soma +1/4 e arredonda para baixo");
  assert.equal(nd([[8], [6], [5]]), 8, "8 + 1/2 + 1/4 = 8,75 → 8");
  assert.equal(nd([[8], [7], [6], [5]]), 9, "8 + 1 + 1/2 + 1/4 = 9,75 → 9");
  assert.equal(nd([[8], [7], [6]]), 9, "8 + 1 + 1/2 = 9,5 → 9");
});

test("ameaças abaixo de ND 1 sozinhas mantêm a regra em duas fases", () => {
  assert.equal(nd([[0.25, 4]]), 1);
  assert.equal(nd([[0.25, 8]]), 3);
  assert.equal(nd([[0.5, 2]]), 1);
  assert.equal(nd([[0.5, 1]]), 0.5);
  assert.equal(nd([[0.25, 3]]), 0.75);
  assert.equal(nd([[0.5], [0.25]]), 0.75);
  assert.equal(nd([[0.5, 4]]), 3);
});

test("ameaças abaixo de ND 1 entram como um grupo ao lado das maiores", () => {
  assert.equal(nd([[3], [0.5, 2]]), 3, "base 3, grupo 1/2+1/2 = 1 está 2 abaixo → 3,5 → 3");
  assert.equal(nd([[2], [0.5, 2]]), 3, "base 2, grupo 1 está 1 abaixo → 3");
  assert.equal(nd([[1], [0.5]]), 2, "base 1, grupo 1/2 está 1/2 abaixo → +1");
  assert.equal(nd([[2], [0.5]]), 2, "base 2, grupo 1/2 está 1 1/2 abaixo → +1/2 → 2");
  assert.equal(nd([[5], [0.25, 8]]), 5, "base 5, grupo 3 está 2 abaixo → 5,5 → 5");
});

test("combat ND with several special or unrated sheets never becomes NaN", () => {
  assert.equal(nd([["S", 2]]), "S");
  assert.equal(nd([["S"], [3]]), "S");
  assert.equal(nd([["S"], ["S+"]]), "S+");
  assert.equal(nd([["–", 2]]), "–");
  assert.equal(nd([["?"], ["S+"]]), "?");
  assert.equal(nd([["–"], [5]]), "?");
  assert.equal(nd([[3], [3]]), 5);
});
