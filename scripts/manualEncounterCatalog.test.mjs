import assert from "node:assert/strict";
import { test } from "node:test";
import { getAutomaticCreatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";
import { resolveNodeEncounter } from "../src/encounterResolver.js";
import { filterManualEncounterCreatures } from "../src/manualEncounterCatalog.js";

const ids = (filters, catalog) => filterManualEncounterCreatures(filters, catalog).map(creature => creature.id);

test("combina os filtros e aceita pesquisa sem acentos", () => {
  assert.deepEqual(ids({
    query: "   ALMA ACORRENTÁDA ",
    terrain: "Pântano",
    place: "catacumbas",
    condition: "Neblina",
    type: "undead",
    challenge: "7",
    role: "Lacaio",
    book: "Ameacas de Arton",
    group: "bando"
  }), ["alma-acorrentada"]);
  assert.deepEqual(ids({ query: "alma acorrentada", terrain: "deserto" }), []);
});

test("mantém fichas manuais e variantes no catálogo sem filtros", () => {
  const original = getCreatureById("avatar-de-kallyadranoch");
  const variant = getCreatureById("avatar-de-kallyadranoch-deuses-de-arton");
  const catalog = [original, variant];
  assert.equal(original.ecology.manualOnly, true);
  assert.deepEqual(ids({ query: "kallyadranoch" }, catalog), [original.id, variant.id]);
  assert.deepEqual(ids({ challenge: "S" }, catalog), [original.id]);
  assert.deepEqual(ids({ challenge: "20" }, catalog), [variant.id]);
});

test("aceita frações e fontes secundárias de uma mesma ficha", () => {
  const catalog = [getCreatureById("glop")];
  assert.deepEqual(ids({ challenge: "1/4", book: "Livro Básico" }, catalog), ["glop"]);
  assert.deepEqual(ids({ challenge: "0,25", book: "Ameaças de Arton" }, catalog), ["glop"]);
  assert.deepEqual(ids({ challenge: "0.25", book: "Deuses de Arton" }, catalog), []);
});

test("mantém fichas sem etiqueta disponíveis e exige etiqueta quando há filtro de ambiente", () => {
  const catalog = [getCreatureById("cascavel"), getCreatureById("garra-zumbi-enxame")];
  assert.deepEqual(ids({}, catalog), ["cascavel", "garra-zumbi-enxame"]);
  assert.deepEqual(ids({ terrain: "pantano", group: "Enxame" }, catalog), ["garra-zumbi-enxame"]);
  assert.deepEqual(ids({ terrain: "terreno inválido" }, catalog), []);
});

test("sorteio filtrado usa a variante disponível e exclui fichas só manuais", () => {
  const variants = filterManualEncounterCreatures({ query: "gnoll saqueador", book: "Livro Básico" });
  const manualOnly = getCreatureById("aspecto-de-allihanna");
  const candidates = getAutomaticCreatureCatalog({}, [...variants, manualOnly]);
  assert.deepEqual(candidates.map(creature => creature.id), ["gnoll-saqueador-livro-basico"]);

  const node = {
    id: "manual-fixture",
    challenge: { creatures: 1, total: 1 },
    creature: { challengeSource: "manual", type: "humanoid", targetChallenge: 1 }
  };
  const result = resolveNodeEncounter(node, { creatureCandidates: candidates });
  assert.equal(result.items[0].creatureId, "gnoll-saqueador-livro-basico");
  assert.equal(resolveNodeEncounter({ ...node, resolvedEncounter: null }, { creatureCandidates: [] }), null);
});
