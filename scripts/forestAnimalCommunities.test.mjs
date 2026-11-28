import test from "node:test";
import assert from "node:assert/strict";
import { calculateCombatND } from "../src/challenge.js";
import { createRng } from "../src/random.js";
import { THREAT_CHALLENGE_ORDER } from "../src/threatCreationRules.js";
import {
  canComposeAnimalCommunity,
  composeAnimalCommunityGroup,
  getAnimalCommunities,
  getCommunityAnimals
} from "../src/forestAnimalCommunities.js";

// Catálogo de teste: não depende das fichas reais.
const animal = (id, challengeRating, family, terrains, group = "solitaria") => ({
  id, name: id, type: "animal", challengeRating, ecology: { family, terrains, group }
});

const catalog = [
  animal("croc-pequeno", 2, "crocodiliano", ["pantano"]),
  animal("croc-grande", 4, "crocodiliano", ["pantano", "aquatico"], "dupla"),
  animal("croc-do-rio", 3, "crocodiliano", ["aquatico"]),
  animal("sanguessuga", 1, "sanguessuga", ["pantano"], "horda"),
  animal("sanguessuga-gigante", 3, "sanguessuga", ["pantano"], "bando"),
  animal("lobo", 2, "canideo", ["floresta"], "bando"),
  animal("lobo-atroz", 4, "canideo", ["floresta"], "dupla"),
  animal("raposa", 1, "canideo", ["floresta"], "dupla"),
  animal("urso", 5, "ursideo", ["floresta"]),
  animal("urso-negro", 3, "ursideo", ["floresta"]),
  animal("coruja", 1, "ave-de-rapina", ["floresta"], "dupla"),
  animal("gavião", 2, "ave-de-rapina", ["floresta"]),
  animal("enxame", 1, "inseto", ["floresta"], "enxame"),
  { id: "dríade", name: "dríade", type: "spirit", challengeRating: 3, ecology: { family: "canideo", terrains: ["floresta"] } }
];

const swamp = { id: "pantano-feroz", name: "Pântano feroz", families: ["crocodiliano", "sanguessuga"], maxSheets: 2, weight: 1 };
const forest = { id: "matilha", name: "Matilha e caçadores", families: ["canideo", "ursideo", "ave-de-rapina"], maxSheets: 3, weight: 1 };
const groupND = entries => calculateCombatND(entries.map(({ creature, quantity }) => ({ challengeRating: creature.challengeRating, quantity })));
const composition = entries => JSON.stringify(entries.map(({ creature, quantity }) => [creature.baseCreatureId || creature.id, quantity]).sort());
const eliteStub = calls => (creature, challengeRating) => {
  calls?.push({ creature, challengeRating });
  return { ...creature, id: `${creature.id}-elite-cr${challengeRating}`, baseCreatureId: creature.id, challengeRating, generated: true };
};

test("getAnimalCommunities lê as comunidades do terreno no perfil", () => {
  const profile = { creatureRules: { animalCommunities: { Pântano: [swamp] } } };
  assert.deepEqual(getAnimalCommunities(profile, "Pântano"), [swamp]);
  assert.deepEqual(getAnimalCommunities(profile, "Colinas"), []);
  assert.deepEqual(getAnimalCommunities({}, "Pântano"), []);
});

test("getCommunityAnimals filtra animais pela família e pela etiqueta do terreno", () => {
  const ids = getCommunityAnimals(catalog, swamp, "pantano").map(creature => creature.id).sort();
  assert.deepEqual(ids, ["croc-grande", "croc-pequeno", "sanguessuga", "sanguessuga-gigante"]);
  const forestIds = getCommunityAnimals(catalog, forest, "floresta").map(creature => creature.id);
  assert.ok(!forestIds.includes("dríade"), "só criaturas do tipo animal");
});

test("grupos do pântano só usam a comunidade, são determinísticos e fecham o alvo", () => {
  for (const target of [3, 4, 5, 6, 7]) {
    for (let seed = 0; seed < 40; seed++) {
      const group = composeAnimalCommunityGroup({
        catalog, target, terrainTag: "pantano", communities: [swamp], rng: createRng(`pantano-${target}-${seed}`)
      });
      assert.ok(group, `alvo ${target} semente ${seed}`);
      assert.equal(group.communityId, "pantano-feroz");
      for (const { creature } of group.entries) {
        assert.ok(swamp.families.includes(creature.ecology.family));
        assert.ok(creature.ecology.terrains.includes("pantano"));
        assert.notEqual(creature.id, "croc-do-rio");
      }
      assert.ok(new Set(group.entries.map(({ creature }) => creature.id)).size <= swamp.maxSheets);
      assert.equal(groupND(group.entries), target);
      const again = composeAnimalCommunityGroup({
        catalog, target, terrainTag: "pantano", communities: [swamp], rng: createRng(`pantano-${target}-${seed}`)
      });
      assert.deepEqual(again, group);
    }
  }
});

test("comunidade com uma ficha nunca devolve duas", () => {
  const single = { ...forest, id: "solitarios", maxSheets: 1 };
  for (let seed = 0; seed < 60; seed++) {
    const group = composeAnimalCommunityGroup({
      catalog, target: 6, terrainTag: "floresta", communities: [single], rng: createRng(`uma-${seed}`)
    });
    assert.ok(group);
    assert.equal(group.entries.length, 1);
    assert.equal(groupND(group.entries), 6);
  }
});

test("em 200 sementes aparecem grupos de 1, 2 e 3 fichas, favorecendo os menores", () => {
  const counts = { 1: 0, 2: 0, 3: 0 };
  for (let seed = 0; seed < 200; seed++) {
    const group = composeAnimalCommunityGroup({
      catalog, target: 7, terrainTag: "floresta", communities: [forest], rng: createRng(`fichas-${seed}`)
    });
    assert.ok(group);
    assert.equal(groupND(group.entries), 7);
    counts[group.entries.length]++;
  }
  assert.ok(counts[1] > 0 && counts[2] > 0 && counts[3] > 0, JSON.stringify(counts));
  assert.ok(counts[1] > counts[2] && counts[2] > counts[3], JSON.stringify(counts));
});

test("quando a primeira comunidade não fecha, outra do mesmo terreno fecha", () => {
  const empty = { id: "sem-fichas", name: "Sem fichas", families: ["peixe"], maxSheets: 3, weight: 1000 };
  for (let seed = 0; seed < 20; seed++) {
    const group = composeAnimalCommunityGroup({
      catalog, target: 5, terrainTag: "pantano", communities: [empty, swamp], rng: createRng(`outra-${seed}`)
    });
    assert.ok(group);
    assert.equal(group.communityId, "pantano-feroz");
  }
});

test("sem ficha nativa que feche, usa a versão melhorada de um animal da comunidade", () => {
  const insects = { id: "insetos", name: "Insetos", families: ["inseto"], maxSheets: 2, weight: 1 };
  const calls = [];
  const upgrade = eliteStub(calls);
  const group = composeAnimalCommunityGroup({
    catalog, target: 6, terrainTag: "floresta", communities: [insects], rng: createRng("melhorada"), upgrade
  });
  assert.ok(group);
  assert.ok(calls.length > 0);
  for (const { creature, challengeRating } of calls) {
    assert.equal(creature.ecology.family, "inseto");
    assert.ok(THREAT_CHALLENGE_ORDER.includes(challengeRating));
    assert.ok(challengeRating <= 6);
  }
  assert.ok(group.entries.some(({ creature }) => creature.baseCreatureId === "enxame"));
  assert.equal(groupND(group.entries), 6);
  assert.equal(canComposeAnimalCommunity({ catalog, target: 6, terrainTag: "floresta", communities: [insects], upgrade }), true);
});

test("sem fichas ou com melhoria nula, não há grupo", () => {
  const empty = { id: "sem-fichas", name: "Sem fichas", families: ["peixe"], maxSheets: 3, weight: 1 };
  const insects = { id: "insetos", name: "Insetos", families: ["inseto"], maxSheets: 2, weight: 1 };
  const upgrade = () => null;
  assert.equal(composeAnimalCommunityGroup({ catalog, target: 5, terrainTag: "floresta", communities: [empty], rng: createRng("a"), upgrade: eliteStub() }), null);
  assert.equal(canComposeAnimalCommunity({ catalog, target: 5, terrainTag: "floresta", communities: [empty], upgrade: eliteStub() }), false);
  assert.equal(composeAnimalCommunityGroup({ catalog, target: 6, terrainTag: "floresta", communities: [insects], rng: createRng("b"), upgrade }), null);
  assert.equal(canComposeAnimalCommunity({ catalog, target: 6, terrainTag: "floresta", communities: [insects], upgrade }), false);
  assert.equal(canComposeAnimalCommunity({ catalog, target: 5, terrainTag: "pantano", communities: [swamp] }), true);
});

test("accepts que sempre recusa e composição excluída anulam o grupo", () => {
  assert.equal(composeAnimalCommunityGroup({
    catalog, target: 5, terrainTag: "pantano", communities: [swamp], rng: createRng("recusa"), accepts: () => false
  }), null);
  const insects = { id: "insetos", name: "Insetos", families: ["inseto"], maxSheets: 2, weight: 1 };
  const only = composeAnimalCommunityGroup({ catalog, target: 1, terrainTag: "floresta", communities: [insects], rng: createRng("unica") });
  assert.ok(only);
  assert.equal(composition(only.entries), JSON.stringify([["enxame", 1]]));
  assert.equal(composeAnimalCommunityGroup({
    catalog, target: 1, terrainTag: "floresta", communities: [insects], rng: createRng("unica"), excludeComposition: composition(only.entries)
  }), null);
});

test("comunidade com peso 0 fica desligada", () => {
  const off = { ...swamp, id: "desligada", weight: 0 };
  for (let seed = 0; seed < 20; seed++) {
    assert.equal(composeAnimalCommunityGroup({
      catalog, target: 5, terrainTag: "pantano", communities: [off], rng: createRng(`peso-${seed}`), upgrade: eliteStub()
    }), null);
    const group = composeAnimalCommunityGroup({
      catalog, target: 5, terrainTag: "pantano", communities: [off, { ...swamp, id: "ligada" }], rng: createRng(`peso-${seed}`)
    });
    assert.equal(group.communityId, "ligada");
  }
  assert.equal(canComposeAnimalCommunity({ catalog, target: 5, terrainTag: "pantano", communities: [off], upgrade: eliteStub() }), false);
});

test("comunidade grande de ND baixo com alvo alto termina rápido", () => {
  const ratings = [0.25, 0.5, 1, 2];
  const groups = ["bando", "horda", "dupla", "solitaria"];
  const weak = Array.from({ length: 20 }, (_, index) => animal(`fraco-${index}`, ratings[index % 4], "inseto", ["mata"], groups[index % 4]));
  const swarm = { id: "fracos", name: "Fracos", families: ["inseto"], maxSheets: 3, weight: 1 };
  const elapsed = run => {
    const start = performance.now();
    const result = run();
    return { result, time: performance.now() - start };
  };
  const check = elapsed(() => canComposeAnimalCommunity({ catalog: weak, target: 12, terrainTag: "mata", communities: [swarm], upgrade: eliteStub() }));
  assert.equal(check.result, true);
  assert.ok(check.time < 250, `canComposeAnimalCommunity levou ${check.time.toFixed(0)} ms`);
  for (let seed = 0; seed < 5; seed++) {
    const group = elapsed(() => composeAnimalCommunityGroup({
      catalog: weak, target: 12, terrainTag: "mata", communities: [swarm], rng: createRng(`rapido-${seed}`), upgrade: eliteStub()
    }));
    assert.ok(group.result);
    assert.equal(groupND(group.result.entries), 12);
    assert.ok(group.time < 250, `composeAnimalCommunityGroup levou ${group.time.toFixed(0)} ms`);
  }
});
