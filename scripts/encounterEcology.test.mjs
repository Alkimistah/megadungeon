import assert from "node:assert/strict";
import test from "node:test";

import { calculateCombatND } from "../src/challenge.js";
import { creatureCatalog, getAutomaticCreatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";
import { getCreatureEcologyWeight, getEncounterEcologyContext } from "../src/encounterEcology.js";
import { rerollNodeCreatures, resolveForestAmbush, resolveNodeEncounter } from "../src/encounterResolver.js";

const profile = {
  id: "forest-11-20",
  creatureRules: {
    ecology: {
      terrainTagsByName: { "Pântano": ["pantano"], "Aquático": ["aquatico"] },
      conditionTagsByName: { Neblina: ["neblina"] }
    }
  }
};

function nodeFor(challenge, allowedCreatureIds, environment) {
  return {
    id: "ecology-test",
    type: "normal",
    challenge: { creatures: challenge, encounter: challenge, total: challenge },
    creature: { type: "animal", targetChallenge: challenge, allowedCreatureIds },
    environment
  };
}

function sample(challenge, ids, environment, selectedProfile = profile) {
  return Array.from({ length: 240 }, (_, index) => {
    const encounter = resolveNodeEncounter(nodeFor(challenge, ids, environment), {
      profile: selectedProfile,
      mapSeed: `ecology-${index}`
    });
    assert.equal(calculateCombatND(encounter?.items), challenge);
    return encounter.items[0];
  });
}

test("pântano favorece garra-zumbi e rato-gigante em sorteios independentes", () => {
  const ids = ["garra-zumbi", "rato-gigante", "cascavel"];
  const count = (terrain) => sample(0.25, ids, {
    terrain: { name: terrain }
  }).filter(item => item.creatureId === "garra-zumbi" || item.creatureId === "rato-gigante").length;
  assert.ok(count("Pântano") > count("Aquático") + 35);
});

test("lugar e clima do nó multiplicam a afinidade da Alma Acorrentada", () => {
  const creature = getCreatureById("alma-acorrentada");
  const rules = profile.creatureRules.ecology;
  const node = {
    environment: { terrain: { name: "Pântano" }, climate: [{ name: "Neblina" }] },
    ecologyContext: { places: ["catacumbas"] }
  };
  const context = getEncounterEcologyContext(node, rules);
  assert.deepEqual(context, { terrains: ["pantano"], places: ["catacumbas"], conditions: ["neblina"] });
  assert.equal(getCreatureEcologyWeight(creature, context), 12);

  const otherPlace = { ...node, ecologyContext: { places: ["urbano"], conditions: [] } };
  const overridden = getEncounterEcologyContext(otherPlace, rules);
  assert.equal(getCreatureEcologyWeight(creature, overridden), 2.25);
});

test("ficha sem etiquetas tem peso ambiental neutro", () => {
  const creature = getCreatureById("cascavel");
  const context = { terrains: ["floresta"], places: ["urbano"], conditions: ["neblina"] };
  assert.equal(getCreatureEcologyWeight(creature, context), 1);
});

test("raridade reduz a frequência sem retirar a criatura da rolagem", () => {
  const ids = ["carcaju", "urso-panda"];
  const rare = sample(1, ids).filter(item => item.creatureId === "urso-panda").length;
  assert.ok(rare > 25 && rare < 100, `raros: ${rare}`);
});

test("agrupamento favorece bando viável com o mesmo ND", () => {
  const items = sample(3, ["perdigueiro-troll"]);
  assert.ok(items.filter(item => item.quantity === 3).length > 140);
});

test("uma ficha de enxame não é multiplicada para preencher o ND", () => {
  const items = sample(3, ["aranhas-filhotes"]);
  assert.ok(items.every(item => item.quantity === 1));
});

test("a família substitui uma preferência de livro desativado pela variante elegível", () => {
  const selectedProfile = { ...profile, disabledCreatureBooks: ["Ameaças de Arton"] };
  const gnolls = getAutomaticCreatureCatalog(selectedProfile).filter(creature =>
    creature.id === "gnoll-saqueador" || creature.variantOf === "gnoll-saqueador"
  );
  assert.deepEqual(gnolls.map(creature => creature.id), ["gnoll-saqueador-livro-basico"]);
});

test("só manual e livros desativados não entram nos fallbacks ecológicos", () => {
  const disabledCreatureBooks = [...new Set(creatureCatalog.map(creature => creature.source?.book).filter(Boolean))];
  const selectedProfile = { ...profile, disabledCreatureBooks };
  const node = nodeFor(5, ["aspecto-de-allihanna", "lobo"]);
  assert.equal(resolveNodeEncounter(node, { profile: selectedProfile }), null);
  assert.equal(resolveNodeEncounter(nodeFor(5, ["aspecto-de-allihanna"]), { profile }), null);
  const ambush = { ...node, type: "unknown", scene: { kind: "falseRest" } };
  assert.equal(resolveForestAmbush(ambush, {
    ...selectedProfile, creatureRules: { ...selectedProfile.creatureRules, allowedCreatureIds: node.creature.allowedCreatureIds }
  }), null);
});

test("preferências de livros conservam encontros resolvidos e escolhas específicas", () => {
  const node = nodeFor(1, ["lobo"]);
  const alreadyResolved = resolveNodeEncounter(node, { profile });
  const selectedProfile = { ...profile, disabledCreatureBooks: [getCreatureById("lobo").source.book] };
  assert.equal(resolveNodeEncounter(node, { profile: selectedProfile }), alreadyResolved);
  assert.equal(rerollNodeCreatures(node, selectedProfile), null);

  const curated = nodeFor(5);
  curated.creature.creatureId = "aspecto-de-allihanna";
  assert.equal(resolveNodeEncounter(curated, { profile: selectedProfile }).items[0].creatureId, "aspecto-de-allihanna");
});

test("ficha compartilhada continua elegível enquanto qualquer livro de origem está habilitado", () => {
  const profileWithoutThreats = { ...profile, disabledCreatureBooks: ["Ameaças de Arton"] };
  const encounter = resolveNodeEncounter(nodeFor(0.25, ["glop"]), { profile: profileWithoutThreats });
  assert.equal(encounter?.items[0].creatureId, "glop");

  const profileWithoutEitherBook = { ...profile, disabledCreatureBooks: ["Ameaças de Arton", "Livro Básico"] };
  assert.equal(resolveNodeEncounter(nodeFor(0.25, ["glop"]), { profile: profileWithoutEitherBook }), null);
});
