import assert from "node:assert/strict";
import test from "node:test";
import { calculateCombatND } from "../src/challenge.js";
import { getAutomaticCreatureCatalog, getCreatureById } from "../src/creatureCatalog/index.js";
import { assignCreatureProfile } from "../src/creatures.js";
import { rerollNodeCreatures, resolveForestElite, resolveNodeEncounter } from "../src/encounterResolver.js";
import { forest11to20Profile } from "../src/floorProfiles/forest11to20.js";
import { generateMapData } from "../src/generator.js";
import { createRng } from "../src/random.js";

// Famílias de teste, para não depender dos dados da Task 4. O catálogo é global, então
// cada criatura do mapa recebe uma cópia da ecologia com a família de teste. Os terrenos
// continuam os do catálogo: lobo-das-cavernas e crocodilo não têm a etiqueta do terreno.
const TEST_FAMILIES = {
  lobo: "lobo", "lobo-das-cavernas": "lobo", pantera: "felino", tigre: "grande-felino", "urso-pardo": "urso",
  alce: "cervo", giralon: "primata", "rato-gigante": "roedor", raagoran: "raagoran", crocodilo: "crocodiliano"
};
for (const [id, family] of Object.entries(TEST_FAMILIES)) {
  const creature = getCreatureById(id);
  creature.ecology = { ...creature.ecology, family };
}

// Pântano: o brejo nunca fecha (raagoran ND 8 e crocodilo sem a etiqueta), então o
// gerador cai nos roedores, de uma ficha só.
const COMMUNITIES = {
  Floresta: [
    { id: "matilha", name: "Matilha", families: ["lobo"], maxSheets: 1, weight: 2 },
    { id: "predadores", name: "Predadores", families: ["felino", "grande-felino", "urso"], maxSheets: 2, weight: 1 },
    { id: "bosque", name: "Bosque", families: ["cervo", "primata"], maxSheets: 3, weight: 1 }
  ],
  Pântano: [
    { id: "brejo", name: "Brejo", families: ["crocodiliano", "raagoran"], maxSheets: 2, weight: 3 },
    { id: "roedores", name: "Roedores", families: ["roedor"], maxSheets: 1, weight: 1 }
  ]
};
const withCommunities = (communities, extra = {}) => ({
  ...forest11to20Profile,
  creatureRules: { ...forest11to20Profile.creatureRules, animalCommunities: communities, ...extra }
});
const profile = withCommunities(COMMUNITIES);
const TAGS = { Floresta: "floresta", Pântano: "pantano" };

const terrainOf = node => node.environment?.terrain?.name;
const creaturesOf = encounter => (encounter?.items ?? []).filter(item => item.kind === "creature");
const baseOf = item => getCreatureById(item.creatureData?.baseCreatureId || item.creatureId);
const sheetsOf = items => new Set(items.map(item => baseOf(item).id)).size;
const communityById = (terrain, id) => (COMMUNITIES[terrain] ?? []).find(community => community.id === id);

function assertInCommunity(items, community, terrain) {
  assert.ok(community, `comunidade ausente em ${terrain}`);
  for (const item of items) {
    const base = baseOf(item);
    assert.equal(base.type, "animal", `${item.creatureId} não é animal`);
    assert.ok(community.families.includes(base.ecology.family), `${item.creatureId} fora de ${community.id}`);
    assert.ok(base.ecology.terrains.includes(TAGS[terrain]), `${item.creatureId} sem a etiqueta de ${terrain}`);
  }
  assert.ok(sheetsOf(items) <= community.maxSheets, `${community.id} passou de ${community.maxSheets} fichas`);
}

const FLOORS = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const SEEDS = ["harmony-a", "harmony-b", "harmony-c"];
const maps = new Map();
function v6Map(floor, seed, floorProfile = profile) {
  const key = `${floor}:${seed}`;
  if (floorProfile === profile && maps.has(key)) return maps.get(key);
  const mapSeed = `${seed}:${floor}`;
  const nodes = generateMapData(8, 21, floorProfile, floor, createRng(mapSeed), { version: 6, mapSeed }).flat();
  const entry = { nodes, mapSeed };
  if (floorProfile === profile) maps.set(key, entry);
  return entry;
}
function* v6Nodes() {
  for (const floor of FLOORS) for (const seed of SEEDS) {
    const { nodes, mapSeed } = v6Map(floor, seed);
    for (const node of nodes) yield { node, mapSeed, floor };
  }
}

test("version 6 marks forest nodes and keeps the v5 composition rules", () => {
  const ceilings = [0.25, 1, 2, 3, 4];
  for (const [index, maximum] of ceilings.entries()) {
    const target = index + 1;
    const floor = 11 + index * 2;
    const nodes = generateMapData(8, 20, profile, floor, createRng("forest-normal-v5-2"), { version: 6 }).flat();
    assert.ok(nodes.every(node => node.generationVersion === 6));
    const normal = nodes.filter(node => node.contentType === "normal");
    assert.ok(normal.some(node => node.trap));
    for (const node of normal) {
      assert.equal(node.challenge.creatures, target);
      assert.equal(node.creature.targetChallenge, target);
      assert.ok((node.trap?.challengeRating ?? 0) <= maximum);
    }
  }
  const all = [...v6Nodes()].map(({ node }) => node);
  for (const node of all.filter(node => ["treasure", "camp"].includes(node.contentType))) {
    assert.equal(node.challenge.creatures, 0);
    assert.equal(node.challenge.trap, 0);
  }
  const elites = all.filter(node => node.contentType === "elite");
  assert.ok(elites.length && elites.every(node => node.forestComposition?.variant.startsWith("elite")));
  const traps = all.filter(node => node.contentType === "trap");
  assert.ok(traps.length && traps.every(node => node.forestComposition?.variant === "trap"));
  assert.ok(traps.every(node => node.forestComposition.creatures.every(({ id }) => getCreatureById(id).type === "humanoid")));
  const other = { ...profile, id: "other-profile" };
  assert.ok(generateMapData(5, 20, other, 11, createRng("x"), { version: 6 }).flat().every(node => node.generationVersion === undefined));
});

test("normal animal combats come from one community of the node terrain", () => {
  let communityCombats = 0;
  let hidden = 0;
  const sheetCounts = new Set();
  for (const { node, mapSeed } of v6Nodes()) {
    if (node.contentType !== "normal" || node.creature?.type !== "animal") continue;
    assert.ok(COMMUNITIES[terrainOf(node)], `animal em ${terrainOf(node)}, terreno sem comunidade`);
    assert.ok(!JSON.stringify(node).includes("animalCommunityId"), "comunidade gravada antes da descoberta");
    const encounter = resolveNodeEncounter(node, { profile, mapSeed });
    const creatures = creaturesOf(encounter);
    if (!encounter.animalCommunityId) {
      assert.ok(creatures.every(item => item.type !== "animal"), "saída para outro tipo ainda trouxe animal");
      continue;
    }
    communityCombats++;
    if (node.type === "unknown") hidden++;
    sheetCounts.add(sheetsOf(creatures));
    assertInCommunity(creatures, communityById(terrainOf(node), encounter.animalCommunityId), terrainOf(node));
    assert.equal(calculateCombatND(creatures), Math.floor(node.creature.targetChallenge));
  }
  assert.ok(communityCombats >= 10, `poucos combates de animais: ${communityCombats}`);
  assert.ok(hidden > 0, "nenhum desconhecido revelado como combate de animais");
  assert.ok(sheetCounts.size > 1, "só uma quantidade de fichas apareceu");
});

test("terrains without a viable community never get the animal type", () => {
  const empty = withCommunities({});
  const v6 = FLOORS.flatMap(floor => v6Map(floor, "harmony-a", empty).nodes);
  assert.ok(v6.some(node => node.creature));
  assert.ok(v6.filter(node => !node.forestComposition).every(node => node.creature?.type !== "animal"));
  const v5 = FLOORS.flatMap(floor => generateMapData(8, 21, empty, floor, createRng(`harmony-a:${floor}`), { version: 5 }).flat());
  assert.ok(v5.some(node => node.creature?.type === "animal"), "a v5 continua sorteando animais");
});

test("assignCreatureProfile skips excluded types", () => {
  const node = { type: "normal", level: 1, challenge: { creatures: 2, encounter: 2 }, environment: { terrain: { name: "Floresta" } } };
  const rng = createRng("exclude");
  for (let index = 0; index < 200; index++) {
    assignCreatureProfile(node, profile, rng, { excludeTypes: ["animal"] });
    assert.notEqual(node.creature.type, "animal");
  }
});

const eliteNode = encounter => ({
  id: 8, level: 1, generationVersion: 6, type: "elite", contentType: "elite", encounterSeed: "15:8",
  challenge: { encounter }, environment: { terrain: { name: "Floresta" } }
});
function eliteScene(base, result, seed) {
  return { ...base, challenge: { ...base.challenge, creatures: result.creatureTarget },
    creature: { type: "animal", targetChallenge: result.creatureTarget }, trap: result.trap,
    forestComposition: { seed, variant: result.variant, animalCommunityId: result.animalCommunityId,
      creatures: result.composition } };
}

test("v6 animal elites take the principal and auxiliaries from one community", () => {
  const onlyAnimals = withCommunities(COMMUNITIES, {
    allowedCreatureIds: Object.keys(TEST_FAMILIES)
  });
  const noTraps = { ...onlyAnimals, trapRules: { ...onlyAnimals.trapRules, sources: [] } };
  let upgraded = 0;
  let groups = 0;
  for (const encounter of [3, 4, 5, 6]) {
    for (const seed of ["e1", "e2", "e3", "e4", "e5", "e6"]) {
      const result = resolveForestElite(eliteNode(encounter), noTraps, { seed });
      assert.equal(result.effectiveType, "elite", `elite ${encounter} sem composição`);
      assert.ok(result.animalCommunityId);
      const community = communityById("Floresta", result.animalCommunityId);
      assertInCommunity(result.items, community, "Floresta");
      if (result.items[0].generated) upgraded++;
      if (result.items.length > 1) groups++;
      const scene = eliteScene(eliteNode(encounter), result, seed);
      const resolved = resolveNodeEncounter(scene, { profile: noTraps });
      assert.deepEqual(creaturesOf(resolved).map(item => [item.creatureId, item.quantity]),
        result.items.map(item => [item.creatureId, item.quantity]));
      const reroll = rerollNodeCreatures(scene, noTraps);
      if (reroll) assertInCommunity(creaturesOf(reroll), community, "Floresta");
    }
  }
  assert.ok(upgraded > 0, "nenhuma principal melhorada");
  assert.ok(groups > 0, "nenhum elite com auxiliares");
  for (const { node } of v6Nodes()) {
    const composition = node.forestComposition;
    if (!composition?.variant.startsWith("elite") || getCreatureById(composition.creatures[0].id).type !== "animal") continue;
    const community = communityById(terrainOf(node), composition.animalCommunityId);
    assert.ok(community, "elite de animal sem comunidade");
    for (const { id } of composition.creatures) assert.ok(community.families.includes(getCreatureById(id).ecology.family));
  }
});

test("rerolling a v6 animal combat keeps the community and changes the composition", () => {
  let rerolled = 0;
  for (const { node, mapSeed } of v6Nodes()) {
    if (node.contentType !== "normal" || node.creature?.type !== "animal") continue;
    const encounter = resolveNodeEncounter(node, { profile, mapSeed });
    if (!encounter.animalCommunityId) continue;
    const next = rerollNodeCreatures(structuredClone(node), profile);
    if (!next) continue;
    rerolled++;
    assert.equal(next.animalCommunityId, encounter.animalCommunityId);
    const creatures = creaturesOf(next);
    assertInCommunity(creatures, communityById(terrainOf(node), encounter.animalCommunityId), terrainOf(node));
    assert.equal(calculateCombatND(creatures), Math.floor(node.creature.targetChallenge));
    const key = items => JSON.stringify(items.map(item => [baseOf(item).id, item.quantity]).sort());
    assert.notEqual(key(creatures), key(creaturesOf(encounter)));
  }
  assert.ok(rerolled > 0, "nenhuma rerrolagem de animais");

  const lonely = withCommunities({ Floresta: [{ id: "tigre", name: "Tigre", families: ["grande-felino"], maxSheets: 1, weight: 1 }] });
  const node = {
    id: "N", encounterSeed: "15:N", type: "normal", contentType: "normal", generationVersion: 6, level: 1,
    challenge: { encounter: 3, creatures: 3, trap: 0 }, environment: { terrain: { name: "Floresta" } }, trap: null,
    creature: { type: "animal", targetChallenge: 3, challengeSource: "creatures" }
  };
  const encounter = resolveNodeEncounter(node, { profile: lonely, mapSeed: "lonely" });
  assert.equal(encounter.animalCommunityId, "tigre");
  assert.deepEqual(creaturesOf(encounter).map(item => [item.creatureId, item.quantity]), [["tigre", 1]]);
  assert.equal(rerollNodeCreatures(node, lonely), null);
});

// Encontros de dois mapas v5 (semente fixa), gravados antes da geração 6.
const V5_SNAPSHOT = {
  12: [
    "0:normal:5:monster:piratax2+saqueador-brutox1",
    "1:elite:5:humanoid:purificadox1+legionariox1",
    "2:normal:5:animal:cavalo-de-montariax1+cavalo-de-cargax1+arame-farpadox1",
    "3:normal:5:humanoid:capangax1+goblin-salteadorx1+orc-enfraquecidox1+bandidox3",
    "4:treasure:5:-:",
    "5:normal:5:undead:rafeiro-putrefatox1+empalhado-corvox1+garra-zumbix1+devolvido-andarilhox1",
    "6:elite:5:monster:sapo-atrozx1+bloco-de-pedrax1",
    "7:scene:5:-:",
    "8:normal:5:monster:noggx1",
    "9:normal:5:humanoid:goblin-salteadorx4+orc-enfraquecidox2+bandidox1",
    "10:treasure:5:-:",
    "11:normal:5:humanoid:devoto-de-hyninn-manhosox2",
    "12:normal:5:animal:chacalx6",
    "13:treasure:5:-:",
    "14:normal:5:animal:goblin-salteadorx3+glopx1",
    "15:camp:5:-:",
    "16:camp:5:-:",
    "17:camp:5:-:",
    "18:camp:5:-:",
    "19:camp:5:-:",
    "20:camp:5:-:",
    "21:camp:5:-:",
    "22:trap:5:-:bloco-de-pedrax1",
    "23:normal:5:animal:drigg-artesaox1+bandidox1+chibi-kabutox1+javalix1+gali-galix1+rato-gigantex1",
    "24:normal:5:monster:drigg-artesaox2+goblin-salteadorx2+orc-enfraquecidox1+caprino-ensandecidox1",
    "25:trap:5:humanoid:drigg-artesaox1+lamina-na-paredex1",
    "26:normal:5:spirit:drigg-artesaox4",
    "27:treasure:5:-:",
    "28:elite:5:animal:cavalo-glacialx1+bloco-de-pedrax1",
    "29:trap:5:-:fosso-profundox1",
    "30:normal:5:spirit:drigg-artesaox1+orc-enfraquecidox1+javalix1+empalhado-corvox1+chibi-kabutox1+rato-gigantex1",
    "31:normal:5:humanoid:kobold-patrulheirox3",
    "32:normal:5:humanoid:drigg-artesaox5",
    "33:normal:5:animal:rato-gigantex4+goblin-salteadorx2",
    "34:normal:5:animal:perdigueiro-trollx1",
    "35:normal:5:monster:kobold-patrulheirox2",
    "36:camp:5:-:",
    "37:elite:5:monster:corcel-de-kallyx1+trog-anao-brutox1",
    "38:treasure:5:-:",
    "39:trap:5:-:runa-de-aceleracaox1",
    "40:camp:5:-:",
    "41:camp:5:-:",
    "42:camp:5:-:",
    "43:camp:5:-:",
  ],
  17: [
    "0:normal:5:animal:enxame-de-gali-galix1+selakox1+cascavelx1+lobox1+alcex1+hienax1+rato-gigantex1+javalix1+chibi-kabutox1",
    "1:trap:5:humanoid:bandidox1+slarkx1+parede-instavelx1",
    "2:normal:5:monster:bandidox1+goblin-salteadorx1+sapo-atrozx1+corcel-de-kallyx1",
    "3:scene:5:-:",
    "4:scene:5:-:",
    "5:normal:5:animal:lobo-das-cavernasx3",
    "6:trap:5:humanoid:goblin-salteadorx4+gas-venenosox1",
    "7:normal:5:humanoid:chefe-de-quadrilhax1",
    "8:normal:5:monster:anao-brigaox1+grickx1",
    "9:elite:5:humanoid:nagah-sacerdotisax1+bloco-de-pedrax1",
    "10:scene:5:-:",
    "11:normal:5:humanoid:drigg-cacadorx1+tabrachi-soldadox1+bandidox1+hipogrifox1+corcel-de-kallyx1",
    "12:trap:5:-:jato-de-chamasx1",
    "13:normal:5:animal:orc-chefex1+lobox2+javalix1+leaox1+simbolo-do-sonox1",
    "14:treasure:5:-:",
    "15:camp:5:-:",
    "16:camp:5:-:",
    "17:camp:5:-:",
    "18:camp:5:-:",
    "19:camp:5:-:",
    "20:camp:5:-:",
    "21:scene:5:-:",
    "22:camp:5:-:",
    "23:treasure:5:-:",
    "24:normal:5:humanoid:duplox1",
    "25:normal:5:animal:rato-gigantex1+hiena-rainhax1+panterax1",
    "26:scene:5:-:",
    "27:scene:5:-:",
    "28:elite:5:humanoid:orc-reix1+bruxo-ruralx1",
    "29:normal:5:monster:bruxo-ruralx1",
    "30:treasure:5:-:",
    "31:normal:5:monster:purificadox3",
    "32:normal:5:humanoid:nezumi-capangax1+orc-chefex1+guarda-de-cidadex1+capangax1+goblin-salteadorx2+gatunox1+drigg-artesaox1+grifilhox1",
    "33:trap:5:-:parede-instavelx1",
    "34:trap:5:-:estatua-executorax1",
    "35:elite:5:humanoid:decuriax1+bloco-de-pedrax1",
    "36:normal:5:monster:urso-corujax1+simbolo-do-sonox1",
    "37:normal:5:monster:mercenario-de-aslothiax1+mamae-glopx1",
    "38:camp:5:-:",
    "39:camp:5:-:",
    "40:camp:5:-:",
    "41:camp:5:-:",
  ],
};

test("a version 5 map keeps the encounters recorded before version 6", () => {
  for (const floor of [12, 17]) {
    const mapSeed = `harmony-v5:${floor}`;
    const nodes = generateMapData(8, 21, profile, floor, createRng(mapSeed), { version: 5, mapSeed }).flat();
    const summary = nodes.map(node => {
      const encounter = resolveNodeEncounter(node, { mapSeed, profile });
      const items = (encounter?.items ?? []).map(i => `${i.creatureId ?? i.trapId}x${i.quantity}`).join("+");
      assert.equal(encounter?.animalCommunityId, undefined);
      return `${node.id}:${node.contentType}:${node.generationVersion ?? "-"}:${node.creature?.type ?? "-"}:${items}`;
    });
    assert.deepEqual(summary, V5_SNAPSHOT[floor]);
  }
});

test("the automatic catalog sees the test families", () => {
  const catalog = getAutomaticCreatureCatalog(profile);
  for (const id of Object.keys(TEST_FAMILIES)) assert.ok(catalog.some(creature => creature.id === id), id);
});
