import assert from "node:assert/strict";

import { createRng } from "../src/random.js";
import { generateMapData } from "../src/generator.js";
import { archipelago21to30Profile } from "../src/floorProfiles/archipelago21to30.js";
import { dungeon1to10Profile } from "../src/floorProfiles/dungeon1to10.js";
import { forest11to20Profile } from "../src/floorProfiles/forest11to20.js";
import { decodeSessionCode, encodeSessionCode, isSessionCode } from "../src/sessionCode.js";
import { DIFFICULTY_MULTIPLIERS } from "../src/missions/missionTables.js";
import { createMissionGenerationContext, generateMissionOffers } from "../src/missions/missionGenerator.js";
import { materializeMissionsForCurrentContent } from "../src/missions/missionProfileAdapters.js";
import { createMissionState } from "../src/missions/missionState.js";
import { getMissionFloors, validateMission, validateMissionSelection } from "../src/missions/missionValidator.js";

const SAMPLE_COUNT = 250;
const DIRECT_COMBAT_CATEGORIES = new Set(["extermination", "specialHunt"]);
const DIFFICULTY_BY_ID = new Map(DIFFICULTY_MULTIPLIERS.map((difficulty) => [difficulty.id, difficulty]));
const PROFILES = [
  dungeon1to10Profile,
  forest11to20Profile,
  archipelago21to30Profile
];

function fail(message, details = {}) {
  const suffix = Object.keys(details).length ? `\n${JSON.stringify(details, null, 2)}` : "";
  throw new Error(`${message}${suffix}`);
}

function assertClose(actual, expected, details) {
  const difference = Math.abs(Number(actual) - Number(expected));

  if (difference > 0.000001) {
    fail("Valor numérico fora do esperado.", { actual, expected, ...details });
  }
}

function getOfferCountBounds(profile) {
  const rules = profile.missionRules || {};
  const minimum = Math.max(1, Number(rules.offerCountMin || 1));
  const maximum = Math.max(minimum, Number(rules.offerCountMax || 8));

  return { minimum, maximum };
}

function getWorldDraft(profile) {
  if (profile.mode !== "archipelago") return null;

  return {
    islands: getMissionFloors(profile).map((floor) => ({
      floor,
      name: `Ilha de teste ${floor}`,
      themeId: `tema-${floor}`,
      objectives: [
        { id: `main-${floor}`, title: `Objetivo principal ${floor}`, type: "objetivo principal", challenge: profile.missionRules.rewardChallengeByFloor[floor] },
        { id: `scene-${floor}`, title: `Cena da ilha ${floor}`, type: "cena da ilha", challenge: profile.missionRules.rewardChallengeByFloor[floor] }
      ]
    }))
  };
}

function assertOfferCount(profile, offers, countsSeen, context) {
  const { minimum, maximum } = getOfferCountBounds(profile);

  countsSeen.add(offers.length);
  assert.ok(offers.length >= minimum, `${profile.id}: menos ofertas que o mínimo`);
  assert.ok(offers.length <= maximum, `${profile.id}: mais ofertas que o máximo`);
  assert.ok(validateMissionSelection(offers.slice(0, 3), context).valid, `${profile.id}: seleção válida foi rejeitada`);
  if (offers.length >= 4) {
    assert.equal(validateMissionSelection(offers.slice(0, 4), context).valid, false, `${profile.id}: seleção com quatro missões foi aceita`);
  }
}

function assertMissionShape(profile, mission, context, seed) {
  const validation = validateMission(mission, context);
  const missionFloors = new Set(context.missionFloors);
  const text = `${mission.title} ${mission.description}`;

  if (!validation.valid) {
    fail("Missão gerada inválida.", { profileId: profile.id, seed, missionId: mission.id, errors: validation.errors });
  }

  assert.equal(mission.status, "offered", `${profile.id}: missão gerada com status inesperado`);
  assert.ok(mission.id && mission.title && mission.description, `${profile.id}: missão sem texto essencial`);
  assert.ok(!/[{}]/.test(text), `${profile.id}: texto com placeholder`);
  assert.ok(!/ameaça adequada ao ambiente/i.test(text), `${profile.id}: texto manteve fallback genérico de criatura`);
  assert.ok(!/registro recuperado registra/i.test(text), `${profile.id}: texto repetiu registro/registrar`);
  assert.ok(!/pedido deixado.* solicita/i.test(text), `${profile.id}: texto deixou pedido inanimado solicitando`);
  assert.ok(!/\bcolete \d+\b/i.test(text), `${profile.id}: texto voltou ao formato cru de coleta`);
  assert.ok(!/\b\d+\s+(poeira|resíduo|sal|água|areia)\b/i.test(text), `${profile.id}: texto numerou material de massa sem unidade`);
  assert.ok(mission.reward?.totalPayout > 0, `${profile.id}: recompensa sem pagamento`);
  assert.ok(mission.reward.totalPayout > Number(mission.reward.turnInValue || 0), `${profile.id}: recompensa não supera entrega`);
  assert.ok(Number(mission.reward.effectiveMultiplier) >= 1, `${profile.id}: multiplicador efetivo abaixo de 1`);

  if (mission.destination?.floor !== null && mission.destination?.floor !== undefined) {
    assert.ok(missionFloors.has(mission.destination.floor), `${profile.id}: destino fora da faixa permitida`);
    assert.notEqual(mission.destination.floor % 10, 0, `${profile.id}: missão em andar de chefe`);
  }

  if (mission.category === "extermination") {
    assert.equal(mission.destination.kind, "progress", `${profile.id}: extermínio com destino específico`);
    assert.equal(mission.destination.floor, null, `${profile.id}: extermínio com andar definido`);
    assert.equal(mission.objective.targetType, "creature", `${profile.id}: extermínio sem criatura`);
    assert.ok(mission.objective.quantity >= 4, `${profile.id}: extermínio com menos de quatro inimigos`);
  }

  if (mission.category === "specialHunt") {
    assert.equal(mission.objective.quantity, 1, `${profile.id}: caçada especial com mais de um alvo`);
    assert.equal(mission.objective.targetType, "creature", `${profile.id}: caçada especial sem criatura`);
  }

  if (mission.category === "rescue") {
    assert.equal(mission.objective.targetType, "memento", `${profile.id}: resgate voltou a usar pessoa viva como alvo`);
  }

  const difficulty = DIFFICULTY_BY_ID.get(mission.difficulty);
  assert.ok(difficulty, `${profile.id}: dificuldade desconhecida`);
  const expectedRawMultiplier = DIRECT_COMBAT_CATEGORIES.has(mission.category)
    ? difficulty.value
    : difficulty.value * 1.15;
  const expectedEffectiveMultiplier = Math.max(1, expectedRawMultiplier);

  assertClose(mission.reward.multiplier, expectedRawMultiplier, { profileId: profile.id, seed, missionId: mission.id });
  assertClose(mission.reward.effectiveMultiplier, expectedEffectiveMultiplier, { profileId: profile.id, seed, missionId: mission.id });
}

function assertGenerationForProfile(profile) {
  const countsSeen = new Set();
  const categoriesSeen = new Set();

  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    const seed = `mission-sample-${profile.id}-${index}`;
    const context = createMissionGenerationContext({
      currentSeed: seed,
      profile,
      worldDraft: getWorldDraft(profile)
    });
    const offers = generateMissionOffers(context);
    const repeatedOffers = generateMissionOffers(context);
    const categories = new Set(offers.map((mission) => mission.category));
    const ids = new Set(offers.map((mission) => mission.id));

    assert.deepEqual(repeatedOffers, offers, `${profile.id}: geração não determinística na seed ${seed}`);
    assertOfferCount(profile, offers, countsSeen, context);
    assert.equal(ids.size, offers.length, `${profile.id}: ids repetidos na seed ${seed}`);
    assert.equal(categories.size, offers.length, `${profile.id}: categorias repetidas antes de esgotar categorias disponíveis`);

    offers.forEach((mission) => {
      categoriesSeen.add(mission.category);
      assertMissionShape(profile, mission, context, seed);
    });
  }

  assert.ok(countsSeen.size > 1, `${profile.id}: quantidade de ofertas não variou na amostragem`);
  profile.missionRules.allowedCategories.forEach((categoryId) => {
    assert.ok(categoriesSeen.has(categoryId), `${profile.id}: categoria nunca apareceu na amostragem: ${categoryId}`);
  });
}

function assertCombatWeights(profile) {
  const weights = profile.missionRules?.categoryWeights || {};
  const allowed = new Set(profile.missionRules?.allowedCategories || []);

  if (!allowed.has("extermination") && !allowed.has("specialHunt")) return;
  assert.ok(weights.extermination > 10, `${profile.id}: extermínio não está acima do peso base`);
  assert.ok(weights.specialHunt > 10, `${profile.id}: caçada especial não está acima do peso base`);
}

function assertForestNodeMaterialization() {
  const seed = "mission-node-sample";
  const profile = {
    ...forest11to20Profile,
    missionRules: {
      ...forest11to20Profile.missionRules,
      allowedCategories: ["collection"],
      offerCountMin: 1,
      offerCountMax: 1
    }
  };
  const context = createMissionGenerationContext({
    currentSeed: seed,
    profile
  });
  const [mission] = generateMissionOffers(context);
  const floor = mission.destination.floor;
  const baseDc = profile.recommendations.baseDcByFloor[floor];
  const levels = generateMapData(5, baseDc, profile, floor, createRng(`${seed}|map`));
  const [materialized] = materializeMissionsForCurrentContent({ floor, levels, missions: [mission] });
  const binding = materialized.integration?.bindings?.[0];
  const boundNode = levels.flat().find((node) => node.id === binding?.nodeId);

  assert.equal(materialized.status, "materialized", "11-20: missão de andar não foi materializada");
  assert.equal(binding?.kind, "node", "11-20: missão não vinculou em nodo");
  assert.ok(boundNode, "11-20: nodo vinculado não existe no mapa");
  assert.ok(!["boss", "camp"].includes(boundNode.type), "11-20: missão vinculada a boss ou acampamento");
  assert.ok(boundNode.missionBindings?.some((item) => item.id === mission.id), "11-20: nodo não recebeu indicador de missão");
}

function assertMissionStateProgress() {
  const profile = {
    ...dungeon1to10Profile,
    missionRules: {
      ...dungeon1to10Profile.missionRules,
      allowedCategories: ["extermination"],
      offerCountMin: 1,
      offerCountMax: 1
    }
  };
  const context = createMissionGenerationContext({
    currentSeed: "mission-state-progress",
    profile
  });
  const [mission] = generateMissionOffers(context);
  const state = createMissionState();

  assert.ok(mission, "Estado: nenhuma missão de extermínio encontrada");
  state.startBoard(profile.id, [mission]);
  state.confirmSelection([mission.id]);
  state.adjustProgress(mission.id, 999);

  const [selected] = state.getSelected();
  assert.equal(selected.progress.current, selected.progress.required, "Estado: progresso ultrapassou o necessário");
  assert.equal(selected.integration.state, "ready", "Estado: missão pronta não atualizou integração");

  const restored = createMissionState();
  restored.importSessionState(state.exportSessionState());
  assert.deepEqual(restored.getSelected(), state.getSelected(), "Estado: progresso não restaurou de forma estável");
}

function roundTripSession(session) {
  const code = encodeSessionCode(session);

  assert.ok(isSessionCode(code), "Sessão: código gerado não foi reconhecido como MD1");
  return decodeSessionCode(code);
}

function assertLegacySessionWithoutMissions() {
  const decoded = roundTripSession({
    v: 1,
    mode: "node-map",
    profile: forest11to20Profile.id,
    floor: 11,
    depth: 5,
    baseDc: 15,
    unknownPaths: false,
    mapSeed: "legacy-no-missions",
    state: { route: [], completedNodeIds: [] }
  });
  const restored = createMissionState();

  restored.importSessionState(decoded.missions);
  assert.deepEqual(restored.exportSessionState(), {
    history: [],
    profileId: null,
    selected: [],
    selectionLocked: false
  }, "Sessão legada: ausência de missions não restaurou estado vazio");
}

function assertProgressSessionCodePersistence() {
  const profile = {
    ...dungeon1to10Profile,
    missionRules: {
      ...dungeon1to10Profile.missionRules,
      allowedCategories: ["extermination"],
      offerCountMin: 1,
      offerCountMax: 1
    }
  };
  const context = createMissionGenerationContext({
    currentSeed: "session-progress",
    profile
  });
  const [mission] = generateMissionOffers(context);
  const state = createMissionState();

  state.startBoard(profile.id, [mission]);
  state.confirmSelection([mission.id]);
  state.adjustProgress(mission.id, 2);

  const decoded = roundTripSession({
    v: 1,
    mode: "extended-exploration",
    profile: profile.id,
    floor: 4,
    mapSeed: "session-progress",
    missions: state.exportSessionState(),
    extendedState: { floor: 4 }
  });
  const restored = createMissionState();

  restored.importSessionState(decoded.missions);
  assert.deepEqual(restored.getSelected(), state.getSelected(), "Sessão: progresso de extermínio não sobreviveu ao código");
  assert.equal(restored.getSelected()[0].status, "selected", "Sessão: status selecionado foi alterado no round-trip");
}

function assertMaterializedCompletedSessionCodePersistence() {
  const profile = {
    ...forest11to20Profile,
    missionRules: {
      ...forest11to20Profile.missionRules,
      allowedCategories: ["collection"],
      offerCountMin: 1,
      offerCountMax: 1
    }
  };
  const seed = "session-materialized";
  const context = createMissionGenerationContext({
    currentSeed: seed,
    profile
  });
  const [offer] = generateMissionOffers(context);
  const floor = offer.destination.floor;
  const levels = generateMapData(5, profile.recommendations.baseDcByFloor[floor], profile, floor, createRng(`${seed}|map`));
  const state = createMissionState();

  state.startBoard(profile.id, [offer]);
  state.confirmSelection([offer.id]);
  state.replaceSelected(materializeMissionsForCurrentContent({
    floor,
    levels,
    missions: state.getSelected()
  }));

  const [materialized] = state.getSelected();
  assert.equal(materialized.status, "materialized", "Sessão: preparação não materializou missão de teste");
  state.markCompleted(materialized.id);

  const decoded = roundTripSession({
    v: 1,
    mode: "node-map",
    profile: profile.id,
    floor,
    depth: 5,
    baseDc: profile.recommendations.baseDcByFloor[floor],
    unknownPaths: false,
    mapSeed: seed,
    missions: state.exportSessionState(),
    state: { route: [materialized.integration.bindings[0].nodeId], completedNodeIds: [] }
  });
  const restored = createMissionState();

  restored.importSessionState(decoded.missions);
  assert.deepEqual(restored.getSelected(), state.getSelected(), "Sessão: missão materializada/concluída não sobreviveu ao código");
  assert.equal(restored.getSelected()[0].status, "completed", "Sessão: missão concluída perdeu status");
  assert.equal(restored.getSelected()[0].integration.state, "resolved", "Sessão: missão concluída perdeu estado resolvido");
}

function assertSessionCodePersistence() {
  assertLegacySessionWithoutMissions();
  assertProgressSessionCodePersistence();
  assertMaterializedCompletedSessionCodePersistence();
}

PROFILES.forEach(assertCombatWeights);
PROFILES.forEach(assertGenerationForProfile);
assertForestNodeMaterialization();
assertMissionStateProgress();
assertSessionCodePersistence();

console.log(`Mission generation and session-code sampling passed for ${PROFILES.length} profiles x ${SAMPLE_COUNT} seeds.`);
