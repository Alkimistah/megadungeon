import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile } from "../src/floorProfiles/archipelago21to30.js";
import { getArchipelagoMissionTheme } from "../src/missions/archipelagoMissionThemes.js";
import { MISSION_CATEGORIES } from "../src/missions/missionTables.js";
import { getCreatureById, isAutomaticCreature } from "../src/creatureCatalog/index.js";
import { TACTICAL_LEGEND_ORDER } from "../src/tacticalMapRenderer.js";
import { createRng } from "../src/random.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { createMissionGenerationContext, generateMissionOffers } from "../src/missions/missionGenerator.js";
import { materializeMissionsForCurrentContent } from "../src/missions/missionProfileAdapters.js";
import { getCreatureOriginIds, getIslandCreatureIds, getOutOfPlaceCreatureIds } from "../src/archipelagoCreatureRules.js";
import { createArchipelagoHuntEncounter } from "../src/missions/archipelagoMissionEncounter.js";
import { calculateCombatND } from "../src/challenge.js";
import { getIslandThemeTerrain } from "../src/archipelagoPilot.js";
import { createMissionTacticalMap } from "../src/missions/missionTacticalMap.js";

const POOLS = ["locations", "materials", "objects", "mementos", "clues", "challenges", "phenomena"];
const themeIds = archipelago21to30Profile.archipelago.enabledThemeIds.filter(id => id !== "dinosaurs");
const allThemes = Object.values(archipelago21to30Profile.archipelago.themePools).flat();

function collectTexts(entry) {
  const { featured, map } = entry;
  return [
    ...POOLS.flatMap(pool => entry.pools[pool]),
    featured.title, featured.targetName, featured.lead, featured.condition, featured.proofType,
    featured.landmark?.name, featured.landmark?.effect, map.landmark.name, map.landmark.effect
  ].filter(Boolean);
}

test("todo tema ativo do arquipélago tem pacote de missões completo", () => {
  for (const id of themeIds) {
    const entry = getArchipelagoMissionTheme(id);
    assert.ok(entry, `${id} sem entrada`);
    for (const pool of POOLS)
      assert.ok(entry.pools[pool].length >= 4 && entry.pools[pool].length <= 6, `${id}.${pool}`);
    assert.ok(MISSION_CATEGORIES[entry.featured.category], `${id} categoria`);
    assert.notEqual(entry.featured.category, "extermination");
    if (entry.featured.category === "specialHunt") {
      const creature = getCreatureById(entry.featured.creatureId);
      assert.ok(creature, `${id} criatura`);
      assert.ok(creature.challengeRating >= 7 && creature.challengeRating <= 11, `${id} ND ${creature.challengeRating}`);
    }
    assert.ok(entry.map.markers.length >= 2);
    for (const marker of entry.map.markers) assert.ok(TACTICAL_LEGEND_ORDER.includes(marker), `${id} marcador ${marker}`);
    assert.ok(entry.map.landmark.name && entry.map.landmark.effect, `${id} ponto de referência`);
  }
  assert.equal(getArchipelagoMissionTheme("dinosaurs"), null);
});

test("ao menos duas missões em destaque são caçadas especiais", () => {
  const hunts = themeIds.filter(id => getArchipelagoMissionTheme(id).featured.category === "specialHunt");
  assert.ok(hunts.length >= 2);
});

test("nenhum texto de missão por tema cita o nome de uma ilha", () => {
  for (const id of themeIds) {
    for (const text of collectTexts(getArchipelagoMissionTheme(id))) {
      for (const island of allThemes) {
        assert.ok(!text.toLowerCase().includes(island.name.toLowerCase()), `${id}: "${text}" cita ${island.name}`);
      }
    }
  }
});

test("alvos genéricos do perfil não carregam itens de um tema específico", () => {
  const pools = archipelago21to30Profile.missionRules.targetPools;
  for (const [name, list] of Object.entries(pools)) {
    assert.ok(list.length >= 3, `targetPools.${name}`);
    for (const item of list) assert.ok(!/coral|recife|alga|areia/i.test(item), `${name}: ${item}`);
  }
});

test("missões em destaque e pontos de referência não usam a arena do guardião", () => {
  const arenaNames = allThemes.map(theme => theme.arenaName).filter(Boolean);
  for (const id of themeIds) {
    const entry = getArchipelagoMissionTheme(id);
    for (const text of collectTexts(entry)) {
      for (const arena of arenaNames) {
        assert.ok(!text.toLowerCase().includes(arena.toLowerCase()), `${id}: "${text}" cita ${arena}`);
      }
    }
  }
});

// --- Gerador: uma missão por ilha (Tarefa 2) ---

const profile = archipelago21to30Profile;
const SEEDS = 300;
const CATEGORY_POOL = {
  collection: "materials", exploration: "locations", recovery: "objects", rescue: "mementos",
  escort: "mementos", anomalous: "phenomena", investigation: "clues", trial: "challenges"
};

function draftFor(seed) {
  const snapshot = createArchipelagoState(profile, createRng(seed)).getSnapshot();
  return {
    islands: snapshot.islands.map((island) => ({
      baseChallenge: island.baseChallenge,
      difficulty: island.difficulty,
      floor: island.floor,
      name: island.name,
      objectives: island.objectives,
      themeId: island.themeId,
      themeName: island.themeName
    }))
  };
}

const samples = Array.from({ length: SEEDS }, (_, s) => {
  const seed = `seed-${s}`;
  const worldDraft = draftFor(seed);
  const offers = generateMissionOffers(createMissionGenerationContext({ currentSeed: seed, profile, worldDraft }));
  return { seed, worldDraft, offers };
});
const allOffers = samples.flatMap(sample => sample.offers);

test("cada oferta ocupa uma ilha diferente", () => {
  for (const { offers } of samples) {
    const floors = offers.map(o => o.destination.floor);
    assert.equal(new Set(floors).size, floors.length);
    assert.ok(offers.length >= 1 && offers.length <= 8);
    for (const floor of floors) assert.ok(floor >= 21 && floor <= 29);
  }
});

test("alvos de texto vêm do tema da ilha ou da lista genérica", () => {
  let fromTheme = 0;
  for (const offer of allOffers) {
    const pool = CATEGORY_POOL[offer.category];
    if (!pool) continue;
    const entry = getArchipelagoMissionTheme(offer.destination.targetId);
    if (offer.featured) {
      assert.equal(offer.objective.targetName, entry.featured.targetName);
      continue;
    }
    const themed = entry?.pools[pool] || [];
    const generic = profile.missionRules.targetPools[pool];
    assert.ok(themed.includes(offer.objective.targetName) || generic.includes(offer.objective.targetName),
      `${offer.category}: ${offer.objective.targetName}`);
    if (themed.includes(offer.objective.targetName)) fromTheme += 1;
  }
  assert.ok(fromTheme > 0);
});

test("a missão em destaque aparece para o tema e usa o título dele", () => {
  const seen = new Set();
  for (const offer of allOffers) {
    assert.equal(typeof offer.featured, "boolean");
    if (!offer.featured) continue;
    const entry = getArchipelagoMissionTheme(offer.themeId);
    assert.equal(offer.destination.targetId, offer.themeId);
    assert.equal(offer.title, entry.featured.title);
    assert.equal(offer.category, entry.featured.category);
    assert.equal(offer.objective.condition, entry.featured.condition);
    assert.equal(offer.proofType, entry.featured.proofType);
    assert.ok(offer.description.startsWith(`${entry.featured.lead} na Ilha ${offer.destination.floor}`), offer.description);
    if (entry.featured.category === "specialHunt") {
      assert.equal(offer.objective.targetId, entry.featured.creatureId);
      assert.equal(offer.objective.outOfPlace, !getIslandCreatureIds(offer.themeId).includes(entry.featured.creatureId));
    }
    seen.add(offer.themeId);
  }
  for (const id of themeIds) assert.ok(seen.has(id), `${id} sem destaque`);
  assert.equal(allOffers.find(o => o.featured && o.themeId === "floating")?.objective.outOfPlace, true);
});

test("descrição e rótulo não trazem o nome da ilha", () => {
  for (const { worldDraft, offers } of samples) {
    for (const offer of offers) {
      const island = worldDraft.islands.find(item => item.floor === offer.destination.floor);
      assert.equal(offer.destination.kind, "island");
      assert.equal(offer.destination.label, `Ilha ${offer.destination.floor}`);
      assert.equal(offer.destination.islandName, island.name);
      assert.equal(offer.themeId, island.themeId);
      assert.ok(!offer.description.includes(island.name), offer.description);
      assert.ok(offer.description.includes(`Ilha ${offer.destination.floor}`), offer.description);
    }
  }
});

test("caçada usa elenco da ilha e às vezes alvo fora do lugar", () => {
  const hunts = allOffers.filter(o => o.category === "specialHunt" && !o.featured);
  assert.ok(hunts.length >= 40, `poucas caçadas: ${hunts.length}`);
  let outOfPlace = 0;
  for (const hunt of hunts) {
    assert.equal(typeof hunt.objective.outOfPlace, "boolean");
    const ids = hunt.objective.outOfPlace ? getOutOfPlaceCreatureIds(hunt.themeId) : getIslandCreatureIds(hunt.themeId);
    assert.ok(ids.includes(hunt.objective.targetId), `${hunt.themeId}: ${hunt.objective.targetId}`);
    if (hunt.objective.outOfPlace) {
      outOfPlace += 1;
      assert.ok(hunt.description.includes("está longe de onde deveria estar"), hunt.description);
    }
  }
  const ratio = outOfPlace / hunts.length;
  assert.ok(ratio >= 0.15 && ratio <= 0.35, `proporção ${ratio}`);
});

test("elenco fora do lugar junta os outros temas e os dinossauros, sem o tema atual", () => {
  for (const id of themeIds) {
    const own = getIslandCreatureIds(id);
    const other = getOutOfPlaceCreatureIds(id);
    assert.ok(own.length > 0);
    assert.ok(other.length > 0);
    for (const creatureId of other) assert.ok(!own.includes(creatureId), `${id}: ${creatureId}`);
    assert.ok(other.includes("armento-de-burafontes") || own.includes("armento-de-burafontes"));
    assert.equal(new Set(other).size, other.length);
  }
  assert.ok(getOutOfPlaceCreatureIds("floating").includes("armento-de-burafontes"));
  assert.ok(getOutOfPlaceCreatureIds("floating").includes("pirata"));
});

test("arquipélago não oferece extermínio", () => {
  assert.ok(!allOffers.some(o => o.category === "extermination"));
  assert.ok(profile.missionRules.allowedCategories.includes("specialHunt"));
  assert.ok(!profile.missionRules.allowedCategories.includes("extermination"));
  assert.equal(profile.missionRules.categoryWeights.specialHunt, 10);
});

test("missões de ilha não se vinculam a setores", () => {
  const { worldDraft, offers } = samples[0];
  const islands = worldDraft.islands;
  const withStaleBinding = offers.map(offer => ({
    ...offer,
    integration: { ...offer.integration, bindings: [{ kind: "objective", floor: offer.destination.floor, objectiveId: "x" }], state: "materialized" }
  }));
  for (const input of [offers, withStaleBinding]) {
    const result = materializeMissionsForCurrentContent({ islands, missions: input });
    for (const mission of result) {
      assert.deepEqual(mission.integration.bindings, []);
      assert.equal(mission.integration.state, "pending");
    }
  }
});

function getAutomaticPool(ids) {
  return ids.map(id => getCreatureById(id))
    .filter(creature => creature && isAutomaticCreature(creature, profile) && typeof creature.challengeRating === "number");
}

test("alvo da caçada é o mais forte disponível quando ninguém cabe na janela de ND", () => {
  let strongestPicks = 0;
  for (const hunt of allOffers.filter(o => o.category === "specialHunt" && !o.featured)) {
    const target = profile.missionRules.rewardChallengeByFloor[hunt.destination.floor];
    const limit = target + 1;
    const ids = hunt.objective.outOfPlace ? getOutOfPlaceCreatureIds(hunt.themeId) : getIslandCreatureIds(hunt.themeId);
    const pool = getAutomaticPool(ids);
    const windowed = pool.filter(c => c.challengeRating >= Math.max(0.25, target - 0.5) && c.challengeRating <= limit);
    const challenge = getCreatureById(hunt.objective.targetId).challengeRating;
    if (windowed.length) {
      assert.ok(windowed.some(c => c.id === hunt.objective.targetId), `${hunt.themeId}: ${hunt.objective.targetId} fora da janela`);
    } else {
      const strongest = Math.max(...pool.filter(c => c.challengeRating <= limit).map(c => c.challengeRating));
      assert.equal(challenge, strongest, `${hunt.themeId}: ${hunt.objective.targetId} ND ${challenge}, esperado ${strongest}`);
      strongestPicks += 1;
    }
  }
  assert.ok(strongestPicks > 0);
});

test("toda caçada de ilha traz outOfPlace booleano, mesmo sem elenco", () => {
  const hunts = allOffers.filter(o => o.category === "specialHunt");
  assert.ok(hunts.length > 0);
  for (const hunt of hunts) assert.equal(typeof hunt.objective.outOfPlace, "boolean");
  let checked = 0;
  for (let s = 0; s < 60; s++) {
    const worldDraft = { islands: profile.missionRules.missionFloors.map(floor => ({ floor, name: `Ilha de teste ${floor}`, themeId: `tema-${floor}`, objectives: [] })) };
    for (const offer of generateMissionOffers(createMissionGenerationContext({ currentSeed: `sem-elenco-${s}`, profile, worldDraft }))) {
      if (offer.category !== "specialHunt") continue;
      assert.equal(offer.objective.outOfPlace, false);
      checked += 1;
    }
  }
  assert.ok(checked > 0);
});

test("lead da destaque lê bem seguido de \"na Ilha N\"", () => {
  for (const id of themeIds) {
    const lead = getArchipelagoMissionTheme(id).featured.lead;
    assert.ok(!/(por quê|ponta a ponta|vazante)$/i.test(lead), `${id}: ${lead}`);
  }
});

// --- Encontro da caçada (Tarefa 3) ---

function sampleHunts(count) {
  return allOffers.filter(o => o.category === "specialHunt" && o.destination?.kind === "island").slice(0, count);
}

function getHuntRoster(mission) {
  return mission.objective.outOfPlace
    ? getCreatureOriginIds(mission.objective.targetId)
    : getIslandCreatureIds(mission.themeId);
}

test("caçada gera encontro com exatamente um alvo e ND dentro do limite", () => {
  const hunts = sampleHunts(300);
  assert.ok(hunts.length >= 100, `poucas caçadas: ${hunts.length}`);
  let withCompanions = 0;
  for (const mission of hunts) {
    const enc = createArchipelagoHuntEncounter(mission, profile);
    assert.ok(enc, mission.id);
    const targets = enc.items.filter(i => i.isTarget);
    assert.equal(targets.length, 1);
    assert.equal(targets[0].quantity, 1);
    assert.equal(targets[0].creatureId, mission.objective.targetId);
    assert.equal(enc.items[0].isTarget, true);
    const limit = profile.missionRules.rewardChallengeByFloor[mission.destination.floor] + 1;
    const total = calculateCombatND(enc.items.map(i => ({ challengeRating: i.challenge, quantity: i.quantity })));
    assert.ok(total <= limit, `${mission.themeId}: ND ${total} > ${limit}`);
    assert.equal(enc.challenge, total);
    if (enc.items.length > 1) withCompanions += 1;
  }
  assert.ok(withCompanions > hunts.length / 2, `poucos encontros com acompanhantes: ${withCompanions}`);
});

test("acompanhantes vêm do elenco da ilha, ou da origem quando o alvo está fora do lugar", () => {
  let outOfPlace = 0;
  for (const mission of sampleHunts(300)) {
    const roster = getHuntRoster(mission);
    const enc = createArchipelagoHuntEncounter(mission, profile);
    for (const item of enc.items.filter(i => !i.isTarget)) {
      assert.ok(roster.includes(item.creatureId), `${mission.themeId}: ${item.creatureId} fora do elenco`);
      assert.notEqual(item.creatureId, mission.objective.targetId);
      assert.ok(getCreatureById(item.creatureId), item.creatureId);
    }
    if (mission.objective.outOfPlace) {
      outOfPlace += 1;
      const local = new Set(getIslandCreatureIds(mission.themeId));
      for (const item of enc.items.filter(i => !i.isTarget)) assert.ok(!local.has(item.creatureId), `escolta local ${item.creatureId}`);
    }
  }
  assert.ok(outOfPlace > 0);
});

test("origem de uma criatura fora do lugar é o primeiro tema que a contém, ou os dinossauros", () => {
  assert.ok(getCreatureOriginIds("pirata").includes("capitao-pirata"));
  assert.ok(getCreatureOriginIds("armento-de-burafontes").includes("burafonte"));
  assert.ok(!getCreatureOriginIds("armento-de-burafontes").includes("pirata"));
  assert.deepEqual(getCreatureOriginIds("criatura-inexistente"), []);
});

test("encontro é determinístico pela missão", () => {
  for (const mission of sampleHunts(40)) {
    assert.deepEqual(createArchipelagoHuntEncounter(mission, profile), createArchipelagoHuntEncounter(mission, profile));
  }
});

test("encontro só existe para caçadas de ilha", () => {
  const other = allOffers.find(o => o.category !== "specialHunt");
  assert.equal(createArchipelagoHuntEncounter(other, profile), null);
  const hunt = sampleHunts(1)[0];
  assert.equal(createArchipelagoHuntEncounter({ ...hunt, destination: { kind: "floor", floor: 22 } }, profile), null);
});

test("caçada sem criatura viável ainda abre", () => {
  const hunt = sampleHunts(300).find(o => !o.objective.outOfPlace && o.themeId === "coral-coast");
  assert.ok(hunt);
  const low = { ...hunt, objective: { ...hunt.objective, targetId: "selako", challenge: getCreatureById("selako").challengeRating } };
  const enc = createArchipelagoHuntEncounter(low, profile);
  assert.equal(enc.items[0].creatureId, "selako");
  assert.equal(enc.items.filter(i => i.isTarget).length, 1);
  const lonely = { ...hunt, themeId: "tema-sem-elenco", objective: { ...hunt.objective, outOfPlace: false } };
  const alone = createArchipelagoHuntEncounter(lonely, profile);
  assert.deepEqual(alone.items.map(i => i.isTarget), [true]);
  const strong = { ...hunt, objective: { ...hunt.objective, targetId: "serpe-ancia" } };
  assert.doesNotThrow(() => createArchipelagoHuntEncounter(strong, profile));
});

test("alvo fora do lugar não recebe escolta da fauna local mesmo com elencos sobrepostos", () => {
  const base = sampleHunts(1)[0];
  const local = new Set(getIslandCreatureIds("tropical"));
  const origin = getCreatureOriginIds("centopeia-dragao");
  assert.ok(origin.some(id => local.has(id)), "caso de teste precisa de sobreposição");
  for (let i = 0; i < 20; i++) {
    const mission = {
      ...base,
      id: `fora-do-lugar-${i}`,
      themeId: "tropical",
      destination: { ...base.destination, floor: 25, targetId: "tropical" },
      objective: { ...base.objective, targetId: "centopeia-dragao", outOfPlace: true }
    };
    const enc = createArchipelagoHuntEncounter(mission, profile);
    assert.equal(enc.items[0].creatureId, "centopeia-dragao");
    for (const item of enc.items.filter(it => !it.isTarget)) {
      assert.ok(!local.has(item.creatureId), `escolta local ${item.creatureId}`);
      assert.ok(origin.includes(item.creatureId), item.creatureId);
    }
  }
});

test("sem ND do andar no perfil, o limite é o ND do alvo + 1", () => {
  const base = sampleHunts(300).find(o => !o.objective.outOfPlace && o.themeId === "coral-coast");
  const mission = { ...base, destination: { ...base.destination, floor: 99 }, objective: { ...base.objective, targetId: "selako" } };
  const enc = createArchipelagoHuntEncounter(mission, profile);
  assert.ok(enc.challenge <= 3, `ND ${enc.challenge}`);
  assert.equal(enc.items[0].creatureId, "selako");
});

// --- Mapa tático com o terreno da ilha (Tarefa 4) ---

const activeThemes = themeIds;

function sampleMission(themeId, predicate = () => true) {
  const mission = allOffers.find(o => o.destination?.kind === "island" && o.themeId === themeId && predicate(o));
  assert.ok(mission, `sem missão para ${themeId}`);
  return mission;
}

test("todo tema ativo tem terreno de ilha", () => {
  for (const id of activeThemes) assert.ok(getIslandThemeTerrain(id)?.name, id);
  assert.equal(getIslandThemeTerrain("inexistente"), null);
});

test("mapa da missão de ilha usa terreno e marcadores do tema", () => {
  for (const theme of activeThemes) {
    const entry = getArchipelagoMissionTheme(theme);
    const mission = sampleMission(theme, o => !(o.featured && entry.featured.landmark));
    const map = createMissionTacticalMap(mission, { profile });
    const terrain = getIslandThemeTerrain(theme);
    assert.equal(map.terrain.name, terrain.name);
    assert.equal(map.terrain.features[0].name, terrain.features[0].name);
    const themed = new Set(entry.map.markers);
    assert.ok(map.cells.some(c => themed.has(c)), theme);
    assert.ok(map.terrain.features.some(f => f.name === entry.map.landmark.name), theme);
    assert.ok(map.terrain.features.some(f => f.name === mission.categoryLabel), theme);
    assert.ok(map.terrain.features.some(f => f.name === "Riscos"), theme);
    for (const c of map.cells) assert.ok(c === "floor" || TACTICAL_LEGEND_ORDER.includes(c), c);
  }
});

const GENERIC_MAP_FIXTURE = {"cells":["floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","obstacle","floor","objective","floor","floor","floor","floor","floor","floor","floor","difficult","floor","floor","floor","floor","floor","floor","objective","floor","floor","floor","difficult","floor","floor","floor","foliage","floor","floor","floor","floor","floor","floor","floor","floor","trap","floor","trap","floor","floor","floor","floor","floor","floor","floor","foliage","floor","floor","floor","floor","floor","floor","objective","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","obstacle","floor","floor","floor","floor","floor","difficult","floor","floor","floor","floor","difficult","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","foliage","floor","floor","floor","floor","floor","floor","trap","floor","floor","floor","floor","trap","floor","floor","floor","floor","floor","floor","party","party","floor","foliage","floor","floor","foliage","floor","floor","floor","floor","floor","floor","floor","floor","floor","party","party","floor","floor","floor","difficult","floor","obstacle","obstacle","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor","floor"],"climate":[],"enemyCount":0,"height":12,"missionDc":28,"objectiveCount":3,"resolutionCheck":{"skill":"Sobrevivência","action":"coletar a amostra sem contaminar a prova","dc":28},"riskDetails":[{"area":"alcance curto","challengeLabel":"6","checks":["Detectar: Investigação CD 30","Desarmar: Ladinagem CD 30","Resistência: Vontade CD 25 (evita)"],"effect":"Criaturas em alcance curto ficam confusas permanentemente.","kind":"Armadilha","name":"Símbolo da Insanidade"},{"area":"todas as criaturas num quadrado de 6m de lado","challengeLabel":"6","checks":["Detectar: Investigação CD 25","Desarmar: Ladinagem CD 25","Resistência: Reflexos CD 30 (reduz à metade)"],"effect":"Causa 15d6 pontos de dano de impacto em todas as criaturas num quadrado de 6m de lado.","kind":"Armadilha","name":"Desabamento do Teto"},{"area":"alcance curto","challengeLabel":"5","checks":["Detectar: Investigação CD 30","Desarmar: Ladinagem CD 30","Resistência: Fortitude CD 25 (evita)"],"effect":"Criaturas em alcance curto ficam atordoadas por 1d6 rodadas.","kind":"Armadilha","name":"Símbolo do Atordoamento"},{"area":"esfera de 3m","challengeLabel":"5","checks":["Detectar: Investigação CD 25","Desarmar: Ladinagem CD 25","Resistência: Reflexos CD 25 (evita)"],"effect":"Causa 12d6 pontos de dano de impacto em todas as criaturas em uma esfera de 3m.","kind":"Armadilha","name":"Mina Terrestre"}],"terrain":{"name":"Ilha 4","effect":"Objetivo: cristais. Teste central: Sobrevivência CD 28 (coletar a amostra sem contaminar a prova).","features":[{"name":"Coleta","effect":"Colete cristais."},{"name":"Riscos","effect":"Símbolo da Insanidade; Desabamento do Teto; Símbolo do Atordoamento; Mina Terrestre"},{"name":"Objetivo","effect":"Amostra"}]},"template":"collection","trapCount":4,"width":16};

test("missão sem targetId usa o mapa genérico de antes", () => {
  const mission = {
    id: "fixture-generic-1", category: "collection", categoryLabel: "Coleta", difficulty: "hard", reward: { challenge: 6 },
    destination: { kind: "island", floor: 24, label: "Ilha 4" },
    objective: { kind: "collect", quantity: 3, progressMode: "aggregate", targetName: "cristais", condition: "Colete" },
    proofType: "Amostra"
  };
  assert.deepEqual(createMissionTacticalMap(mission, { profile }), GENERIC_MAP_FIXTURE);
});

test("destaque com landmark substitui o ponto de referência", () => {
  let checked = 0;
  for (const theme of activeThemes) {
    const entry = getArchipelagoMissionTheme(theme);
    if (!entry.featured.landmark) continue;
    const mission = sampleMission(theme, o => o.featured);
    const names = createMissionTacticalMap(mission, { profile }).terrain.features.map(f => f.name);
    assert.ok(names.includes(entry.featured.landmark.name), theme);
    assert.ok(!names.includes(entry.map.landmark.name), theme);
    checked += 1;
  }
  assert.ok(checked >= 2);
});

test("mapa da caçada posiciona um inimigo por criatura do encontro", () => {
  const hunts = sampleHunts(60);
  for (const mission of hunts) {
    const enc = createArchipelagoHuntEncounter(mission, profile);
    const total = enc.items.reduce((sum, item) => sum + item.quantity, 0);
    const map = createMissionTacticalMap(mission, { profile });
    assert.equal(map.enemyCount, total, mission.id);
    assert.equal(map.cells.filter(c => c === "enemy").length, total, mission.id);
  }
});
