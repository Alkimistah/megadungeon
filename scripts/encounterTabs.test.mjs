import test from "node:test";
import assert from "node:assert/strict";
import { getEncounterTabs, getEncounterRerollLabel, isTrapNode } from "../src/encounterTabs.js";

const items = (...kinds) => kinds.map(kind => ({ kind, quantity: 1 }));

test("nó normal com duas criaturas e uma armadilha: Inimigos e Armadilha", () => {
  assert.deepEqual(getEncounterTabs({ type: "normal", resolvedEncounter: { items: items("creature", "creature", "trap") } }),
    [{ kind: "creature", label: "Inimigos", count: 2 }, { kind: "trap", label: "Armadilha", count: 1 }]);
});

test("nó normal sem armadilha: só Inimigos", () => {
  assert.deepEqual(getEncounterTabs({ type: "normal", resolvedEncounter: { items: items("creature") } }),
    [{ kind: "creature", label: "Inimigos", count: 1 }]);
});

test("nó de armadilha com escolta, inclusive desconhecido revelado: Armadilha e Escolta", () => {
  assert.deepEqual(getEncounterTabs({ type: "unknown", contentType: "trap", resolvedEncounter: { items: items("creature", "trap") } }),
    [{ kind: "trap", label: "Armadilha", count: 1 }, { kind: "creature", label: "Escolta", count: 1 }]);
});

test("armadilha sozinha: só Armadilha", () => {
  assert.deepEqual(getEncounterTabs({ type: "trap", resolvedEncounter: { items: items("trap") } }),
    [{ kind: "trap", label: "Armadilha", count: 1 }]);
});

test("duas armadilhas: rótulo no plural", () => {
  assert.equal(getEncounterTabs({ type: "normal", resolvedEncounter: { items: items("creature", "trap", "trap") } })[1].label, "Armadilhas");
  assert.equal(getEncounterTabs({ type: "normal", resolvedEncounter: { items: items("creature", "trap", "trap") } })[1].count, 2);
});

test("sem itens: nenhuma aba", () => {
  assert.deepEqual(getEncounterTabs({ type: "normal", resolvedEncounter: { items: [] } }), []);
  assert.deepEqual(getEncounterTabs({ type: "normal" }), []);
});

test("rótulo do botão de rerrolar por tipo", () => {
  assert.equal(getEncounterRerollLabel({ type: "normal" }, "creature"), "Rerrolar inimigos");
  assert.equal(getEncounterRerollLabel({ type: "trap" }, "creature"), "Rerrolar escolta");
  assert.equal(getEncounterRerollLabel({ type: "trap" }, "trap"), "Rerrolar armadilha");
  assert.equal(getEncounterRerollLabel({ type: "elite" }, "trap"), "Rerrolar armadilha");
});

test("isTrapNode usa contentType antes de type", () => {
  assert.equal(isTrapNode({ type: "trap" }), true);
  assert.equal(isTrapNode({ type: "unknown", contentType: "trap" }), true);
  assert.equal(isTrapNode({ type: "normal", contentType: "trap" }), true);
  assert.equal(isTrapNode({ type: "trap", contentType: "normal" }), false);
  assert.equal(isTrapNode({ type: "normal" }), false);
});
