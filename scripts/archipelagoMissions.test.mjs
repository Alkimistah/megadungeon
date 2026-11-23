import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile } from "../src/floorProfiles/archipelago21to30.js";
import { getArchipelagoMissionTheme } from "../src/missions/archipelagoMissionThemes.js";
import { MISSION_CATEGORIES } from "../src/missions/missionTables.js";
import { getCreatureById } from "../src/creatureCatalog/index.js";
import { TACTICAL_LEGEND_ORDER } from "../src/tacticalMapRenderer.js";

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
