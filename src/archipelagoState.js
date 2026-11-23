import { getIslandCreatureRules } from "./archipelagoCreatureRules.js";
import { canRerollNodeCreatures, rerollNodeCreatures } from "./encounterResolver.js";
import { createRng, pick } from "./random.js";
import { getGuardianPenalty, updateSavedGuardianVulnerabilities } from "./archipelagoGuardianPenalties.js";
import {
  createIslandPilot, createIslandPilotScene, createIslandSectorCombat, createIslandGuardian, createIslandSector,
  hasIslandSectors, pickIslandGuardian, reopenIslandSector
} from "./archipelagoPilot.js";
import { getEncounterForSave } from "./encounterCreatureHealth.js";
import { applyLiburnaLayout, createBoatAmbush, rerollBoatAmbush } from "./archipelagoBoatAmbush.js";

function shuffle(rng, items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(rng() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }

  return copy;
}

function getDifficulty(profile, floor) {
  return profile.archipelago.islandDifficultyByFloor[floor] || "initial";
}

function getBaseChallenge(profile, floor) {
  const difficulty = getDifficulty(profile, floor);
  return profile.archipelago.challengeByDifficulty[difficulty] || 8;
}

function createPlaceholderObjectives(profile, floor, theme) {
  const count = profile.archipelago.objectiveCountByFloor[floor] || 1;

  if (floor === 30) {
    return [{
      id: `${floor}-boss`,
      title: "Confronto final",
      type: "boss",
      challenge: getBaseChallenge(profile, floor),
      description: theme.objective
    }];
  }

  return Array.from({ length: count }, (_, index) => ({
    id: `${floor}-${index + 1}`,
    title: `Objetivo ${index + 1}`,
    type: index === count - 1 ? "objetivo principal" : "cena da ilha",
    challenge: getBaseChallenge(profile, floor),
    description: index === count - 1
      ? theme.objective
      : "Cena placeholder a detalhar no perfil da ilha."
  }));
}

function createGeneratedIslands(profile, rng) {
  const { enabledThemeIds, themePools } = profile.archipelago;
  const availableThemes = difficulty => themePools[difficulty].filter(theme =>
    !enabledThemeIds || enabledThemeIds.includes(theme.id)
  );
  const pickedThemes = {
    initial: shuffle(rng, availableThemes("initial")).slice(0, 4),
    intermediate: shuffle(rng, availableThemes("intermediate")).slice(0, 3),
    advanced: shuffle(rng, availableThemes("advanced")).slice(0, 2),
    boss: availableThemes("boss").slice(0, 1)
  };
  const usedByDifficulty = { initial: 0, intermediate: 0, advanced: 0, boss: 0 };

  return Object.fromEntries(profile.floors.map((floor) => {
    const difficulty = getDifficulty(profile, floor);
    const theme = pickedThemes[difficulty][usedByDifficulty[difficulty]] || pick(rng, availableThemes(difficulty));
    usedByDifficulty[difficulty] += 1;
    const baseChallenge = getBaseChallenge(profile, floor);

    return [floor, {
      floor,
      name: theme.name,
      themeId: theme.id,
      themeName: theme.name,
      icon: theme.icon,
      narrative: theme.narrative,
      difficulty,
      baseChallenge,
      objectives: createPlaceholderObjectives(profile, floor, theme),
      ...createIslandPilot(floor, theme.id, profile.recommendations.baseDcByFloor[floor], rng)
    }];
  }));
}

function getThemesById(profile) {
  return Object.values(profile.archipelago?.themePools || {})
    .flat()
    .reduce((themesById, theme) => themesById.set(theme.id, theme), new Map());
}

function hydrateSessionIslands(profile, sessionIslands) {
  const themesById = getThemesById(profile);

  return Object.fromEntries(Object.entries(sessionIslands).map(([floor, island]) => {
    const theme = themesById.get(island.themeId);
    return [floor, {
      ...island,
      ...(hasIslandSectors(island) ? {
        objectives: island.objectives.map((objective, index) => {
          const current = createIslandSector(island, index, objective.variant, profile.recommendations.baseDcByFloor[floor], objective.penaltyId);
          return island.outcomes?.[objective.id]
            ? { ...objective, name: current.name, effect: objective.penaltyId ? getGuardianPenalty(objective.penaltyId, index).label : objective.effect }
            : current;
        })
      } : {}),
      icon: theme?.icon || island.icon,
      narrative: island.themeId === "tropical" ? theme?.narrative ?? island.narrative : island.narrative || theme?.narrative
    }];
  }));
}

function toNumberSet(values = []) {
  return new Set(values.map(Number));
}

export function createArchipelagoState(profile, rng = Math.random) {
  let activeProfile = profile;
  let islands = profile.archipelago ? createGeneratedIslands(profile, rng) : {};
  let visitedFloors = new Set();
  let completedFloors = new Set();
  let activeExploration = null;
  let boatAmbush = null;
  let nightsAtBoat = 0;
  let daySpent = false;
  let elapsedMinutes = 0;
  let log = ["Arquipélago gerado. As ilhas iniciais estão acessíveis."];

  function getRequiredFloorsFor(floor) {
    if (!activeProfile.archipelago) return [];
    if ([21, 22, 23, 24].includes(floor)) return [];
    if ([25, 26, 27].includes(floor)) return activeProfile.archipelago.unlockRules.intermediateRequires;
    if ([28, 29].includes(floor)) return activeProfile.archipelago.unlockRules.advancedRequires;
    if (floor === 30) return activeProfile.floors.filter((item) => item >= 21 && item <= 29);
    return [];
  }

  function getFragments() {
    return [...completedFloors].filter((floor) => floor >= 21 && floor <= 29).length;
  }

  function isIslandAvailable(floor) {
    if (completedFloors.has(floor)) return true;
    if (floor === 30) return getFragments() >= activeProfile.archipelago.unlockRules.bossRequiresFragments;
    return getRequiredFloorsFor(floor).every((requiredFloor) => completedFloors.has(requiredFloor));
  }

  function getIslandStatus(floor) {
    if (completedFloors.has(floor)) return floor === 30 ? "boss-completed" : "concluída";
    if (!isIslandAvailable(floor)) return "bloqueada";
    if (activeExploration?.floor === floor) return "objetivo em andamento";
    if (floor === 30) return "boss disponível";
    if (visitedFloors.has(floor)) return "visitada";
    return "não visitada";
  }

  function initialize(nextProfile, nextRng = Math.random, sessionState = null) {
    activeProfile = nextProfile;
    islands = sessionState?.islands
      ? hydrateSessionIslands(nextProfile, sessionState.islands)
      : createGeneratedIslands(nextProfile, nextRng);
    visitedFloors = toNumberSet(sessionState?.visitedFloors);
    completedFloors = toNumberSet(sessionState?.completedFloors);
    activeExploration = sessionState?.activeExploration || null;
    boatAmbush = sessionState?.boatAmbush ?? null;
    if (boatAmbush) applyLiburnaLayout(boatAmbush);
    nightsAtBoat = sessionState?.nightsAtBoat ?? 0;
    updateSavedGuardianVulnerabilities(activeExploration?.guardianScene?.resolvedEncounter?.items?.[0]?.creatureData?.stats);
    daySpent = Boolean(sessionState?.daySpent);
    elapsedMinutes = sessionState?.elapsedMinutes || 0;
    log = sessionState?.log || ["Arquipélago gerado. As ilhas iniciais estão acessíveis."];
  }

  function exploreIsland(floor, { mapSeed, rng } = {}) {
    const island = islands[floor];
    if (!island || !isIslandAvailable(floor) || daySpent || boatAmbush || completedFloors.has(floor) || island.defeated) return false;

    let reopened = null;
    if (hasIslandSectors(island)) {
      island.visits = (island.visits || 0) + 1;
      if (island.visits > 1) {
        const roll = rng ?? createRng(`${mapSeed}:ilha-${floor}:visita-${island.visits}`);
        reopened = reopenIslandSector(island, roll, activeProfile.recommendations.baseDcByFloor[floor]);
      }
    }

    visitedFloors.add(floor);
    daySpent = true;
    elapsedMinutes += activeProfile.archipelago.explorationMinutes;
    activeExploration = {
      floor,
      resolvedObjectiveIds: [],
      ...(hasIslandSectors(island) ? { mapSeed } : {}),
      ...(reopened ? { reopenedSector: reopened } : {})
    };
    if (islands[floor].pilot === "mangrove") {
      activeExploration.scene = createIslandPilotScene(islands[floor], activeProfile, mapSeed);
    }
    log = [reopened
      ? `Ilha ${floor}: o setor ${reopened.name} reabriu com um novo objetivo.`
      : `Ilha ${floor} explorada. O esforço do dia foi gasto.`, ...log].slice(0, 8);
    return true;
  }

  function openSector(floor, objectiveId) {
    const island = islands[floor];
    if (boatAmbush || !hasIslandSectors(island) || activeExploration?.floor !== floor || activeExploration.guardianScene ||
      island.outcomes?.[objectiveId]) return false;
    const objective = island.objectives.find(item => item.id === objectiveId);
    if (!objective) return false;
    if (objective.type === "combate") {
      island.scenes ??= {};
      if (!island.scenes[objectiveId]?.resolvedEncounter) {
        island.scenes[objectiveId] = createIslandSectorCombat(island, objective, activeProfile, activeExploration.mapSeed);
      }
    }
    return true;
  }

  function rerollSector(floor, objectiveId) {
    const island = islands[floor];
    if (boatAmbush || activeExploration?.floor !== floor || activeExploration.guardianScene || island?.outcomes?.[objectiveId]) return false;
    const scene = island?.scenes?.[objectiveId];
    if (!canRerollNodeCreatures(scene)) return false;
    const objective = island.objectives.find(item => item.id === objectiveId);
    const creature = getIslandCreatureRules(island, objective, scene.creature);
    if (creature.allowedCreatureIds?.length === 0) return false;
    const updated = rerollNodeCreatures({ ...scene, creature }, activeProfile);
    if (!updated) return false;
    scene.resolvedEncounter = updated;
    scene.creature = creature;
    return true;
  }

  function resolveObjective(floor, objectiveId, outcome) {
    if (boatAmbush || activeExploration?.floor !== floor) return false;
    const island = islands[floor];
    if (hasIslandSectors(island)) {
      if (!["success", "failure"].includes(outcome) || !openSector(floor, objectiveId)) return false;
      island.outcomes ??= {};
      island.outcomes[objectiveId] = outcome;
      if (outcome === "success") {
        island.earnedRewards ??= {};
        island.earnedRewards[objectiveId] = true;
      }
      const sector = island.objectives.find(item => item.id === objectiveId);
      log = [`Setor ${sector.name} da ilha ${floor}: ${outcome === "success" ? "sucesso" : "falha"}.`, ...log].slice(0, 8);
      return true;
    }
    if (activeExploration.resolvedObjectiveIds.includes(objectiveId)) return false;
    if (islands[floor].pilot) {
      const next = islands[floor].objectives.find(objective => !activeExploration.resolvedObjectiveIds.includes(objective.id));
      if (next?.id !== objectiveId) return false;
    }

    activeExploration = {
      ...activeExploration,
      resolvedObjectiveIds: [...activeExploration.resolvedObjectiveIds, objectiveId]
    };
    log = [`Objetivo resolvido na ilha ${floor}.`, ...log].slice(0, 8);
    return true;
  }

  function previewGuardian(island) {
    const seed = activeExploration?.mapSeed;
    const composition = island.guardianComposition ??
      pickIslandGuardian(island, createRng(`${seed}:guardiao:${island.floor}`));
    return createIslandGuardian(island, composition, activeProfile, seed);
  }

  function startGuardian(floor) {
    const island = islands[floor];
    if (boatAmbush || !hasIslandSectors(island) || activeExploration?.floor !== floor || activeExploration.guardianScene ||
      !island.objectives.every(item => island.outcomes?.[item.id])) return false;
    activeExploration.guardianScene = previewGuardian(island);
    log = [`Combate do Centro iniciado na ilha ${floor}.`, ...log].slice(0, 8);
    return true;
  }

  function loseGuardian(floor) {
    if (activeExploration?.floor !== floor || !activeExploration.guardianScene) return false;
    islands[floor].defeated = true;
    activeExploration = null;
    log = [`O grupo foi derrotado no Centro da ilha ${floor}.`, ...log].slice(0, 8);
    return true;
  }

  function completeIsland(floor) {
    if (boatAmbush) return false;
    const island = islands[floor];
    const resolved = new Set(activeExploration?.floor === floor ? activeExploration.resolvedObjectiveIds : []);
    const allResolved = hasIslandSectors(island)
      ? activeExploration?.floor === floor && Boolean(activeExploration.guardianScene)
      : island?.objectives.every((objective) => resolved.has(objective.id));

    if (!allResolved) return false;

    completedFloors.add(floor);
    activeExploration = null;
    log = [`Ilha ${floor} concluída.${floor === 30 ? " Etapa finalizada." : " Fragmento recuperado."}`, ...log].slice(0, 8);
    return true;
  }

  function restAtBoat({ mapSeed = activeExploration?.mapSeed, rng } = {}) {
    if (boatAmbush || activeExploration?.guardianScene) return false;
    if (daySpent && !completedFloors.has(30)) {
      nightsAtBoat += 1;
      const roll = rng ?? createRng(`${mapSeed}:barco:noite-${nightsAtBoat}`);
      boatAmbush = createBoatAmbush(getFragments(), nightsAtBoat, activeProfile, mapSeed, roll);
      if (boatAmbush) {
        log = ["Emboscada no barco. O descanso foi interrompido.", ...log].slice(0, 8);
        return true;
      }
    }
    finishBoatRest();
    return true;
  }

  function finishBoatAmbush() {
    if (!boatAmbush) return false;
    boatAmbush = null;
    log = ["Emboscada no barco concluída.", ...log].slice(0, 8);
    finishBoatRest();
    return true;
  }

  function finishBoatRest() {
    daySpent = false;
    elapsedMinutes = 0;
    if (hasIslandSectors(islands[activeExploration?.floor])) {
      const island = islands[activeExploration.floor];
      for (const [id, scene] of Object.entries(island.scenes ?? {})) {
        if (!island.outcomes?.[id]) scene.resolvedEncounter = getEncounterForSave(scene.resolvedEncounter);
      }
      log = [`Descanso no barco. O progresso da ilha ${activeExploration.floor} foi guardado.`, ...log].slice(0, 8);
    } else if (activeExploration) {
      log = [`Descanso no barco. O progresso parcial da ilha ${activeExploration.floor} foi perdido.`, ...log].slice(0, 8);
    } else {
      log = ["Descanso no barco. O grupo pode explorar outra ilha.", ...log].slice(0, 8);
    }
    activeExploration = null;
  }

  function getSnapshot() {
    if (!activeProfile.archipelago) {
      return {
        profile: activeProfile,
        islands: [],
        islandRows: [],
        boatLabel: "Barco do grupo",
        boatIcon: "/assets/icons/archipelago-boat.svg",
        daySpent,
        activeExploration,
        fragments: 0,
        bossUnlocked: false,
        elapsedMinutes,
        log
      };
    }

    const activeResolved = new Set(activeExploration?.resolvedObjectiveIds || []);

    return {
      profile: activeProfile,
      islands: activeProfile.floors.map((floor) => ({
        ...islands[floor],
        available: isIslandAvailable(floor),
        visited: visitedFloors.has(floor),
        completed: completedFloors.has(floor),
        status: islands[floor].defeated ? "grupo derrotado" : getIslandStatus(floor),
        ...(hasIslandSectors(islands[floor]) ? {
          guardian: {
            ready: islands[floor].objectives.every(item => islands[floor].outcomes?.[item.id]),
            preview: activeExploration?.floor === floor && !activeExploration.guardianScene &&
              islands[floor].objectives.every(item => islands[floor].outcomes?.[item.id])
              ? previewGuardian(islands[floor]) : null,
            effects: islands[floor].objectives.filter(item => islands[floor].outcomes?.[item.id] === "success").map(item => item.effect),
            scene: activeExploration?.floor === floor ? activeExploration.guardianScene : null
          }
        } : {}),
        objectives: islands[floor].objectives.map((objective, index, objectives) => ({
          ...objective,
          resolved: (Boolean(islands[floor].pilot) && completedFloors.has(floor)) ||
            (activeExploration?.floor === floor && activeResolved.has(objective.id)),
          ...(islands[floor].pilot === "mangrove" ? {
            available: index === 0 ||
              (activeExploration?.floor === floor && activeResolved.has(objectives[index - 1].id))
          } : {}),
          ...(objective.type === "combate" && activeExploration?.floor === floor
            ? { scene: hasIslandSectors(islands[floor]) ? islands[floor].scenes?.[objective.id] : activeExploration.scene } : {}),
          ...(hasIslandSectors(islands[floor]) ? {
            resolved: Boolean(islands[floor].outcomes?.[objective.id]),
            outcome: islands[floor].outcomes?.[objective.id],
            rewardEarned: Boolean(islands[floor].earnedRewards?.[objective.id])
          } : {})
        }))
      })),
      islandRows: activeProfile.archipelago.islandRows,
      boatLabel: activeProfile.archipelago.boatLabel,
      boatIcon: activeProfile.archipelago.boatIcon,
      boatAmbush,
      daySpent,
      activeExploration,
      fragments: getFragments(),
      bossUnlocked: getFragments() >= activeProfile.archipelago.unlockRules.bossRequiresFragments,
      elapsedMinutes,
      log
    };
  }

  return {
    completeIsland,
    exploreIsland,
    exportSessionState: () => ({
      islands,
      visitedFloors: [...visitedFloors],
      completedFloors: [...completedFloors],
      activeExploration: activeExploration?.scene
        ? {
          ...activeExploration,
          scene: { ...activeExploration.scene, resolvedEncounter: getEncounterForSave(activeExploration.scene.resolvedEncounter) }
        }
        : activeExploration,
      daySpent,
      elapsedMinutes,
      boatAmbush,
      nightsAtBoat,
      log
    }),
    finishBoatAmbush,
    rerollBoatAmbush: mapSeed => rerollBoatAmbush(boatAmbush, activeProfile, mapSeed),
    getElapsedMinutes: () => elapsedMinutes,
    getSnapshot,
    initialize,
    loseGuardian,
    openSector,
    rerollSector,
    resolveObjective,
    restAtBoat,
    startGuardian
  };
}
