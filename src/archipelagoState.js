import { createArchipelagoFinalBoss } from "./archipelagoFinalBoss.js";
import { asIslandTreasureEvent, rollIslandSectorTreasure } from "./archipelagoSectorTreasure.js";
import { getIslandCreatureRules } from "./archipelagoCreatureRules.js";
import { withIslandTacticalLayout } from "./archipelagoTacticalMap.js";
import { canRerollNodeCreatures, rerollNodeCreatures } from "./encounterResolver.js";
import { createRng, pick } from "./random.js";
import { getGuardianPenalty, updateSavedGuardianVulnerabilities } from "./archipelagoGuardianPenalties.js";
import {
  createIslandPilot, createIslandPilotScene, createIslandSectorCombat, createIslandGuardian, createIslandSector,
  hasIslandSectors, pickIslandGuardian, reopenIslandSector, rerollDinosaurSector
} from "./archipelagoPilot.js";
import { getEncounterForSave } from "./encounterCreatureHealth.js";
import { applyLiburnaLayout, createBoatAmbush, rerollBoatAmbush } from "./archipelagoBoatAmbush.js";

const INITIAL_LOG = "Arquipélago gerado. As ilhas iniciais estão acessíveis.";

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
  const { enabledThemeIds, themePools, sectorTreasureChance } = profile.archipelago;
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

  const entries = profile.floors.map((floor) => {
    const difficulty = getDifficulty(profile, floor);
    const theme = pickedThemes[difficulty][usedByDifficulty[difficulty]] || pick(rng, availableThemes(difficulty));
    usedByDifficulty[difficulty] += 1;
    const baseChallenge = getBaseChallenge(profile, floor);

    return [floor, {
      floor,
      name: theme.name,
      themeId: theme.id,
      themeName: theme.name,
      ...(theme.arenaName ? { arenaName: theme.arenaName } : {}),
      icon: theme.icon,
      narrative: theme.narrative,
      difficulty,
      baseChallenge,
      objectives: createPlaceholderObjectives(profile, floor, theme),
      ...createIslandPilot(floor, theme.id, profile.recommendations.baseDcByFloor[floor], rng)
    }];
  });
  if (sectorTreasureChance) {
    const roll = createRng(`tesouros-de-setor:${rng()}`);
    for (const [, island] of entries) {
      if (island.floor === 30 || !hasIslandSectors(island)) continue;
      island.objectives = island.objectives.map(objective => roll() < sectorTreasureChance
        ? asIslandTreasureEvent(objective, island.baseChallenge)
        : objective);
    }
  }
  return Object.fromEntries(entries);
}

function getThemesById(profile) {
  return Object.values(profile.archipelago?.themePools || {})
    .flat()
    .reduce((themesById, theme) => themesById.set(theme.id, theme), new Map());
}

function hydrateSessionIslands(profile, { islands: sessionIslands, visitedFloors, completedFloors, activeExploration }, rng) {
  const exploredFloors = new Set([...(visitedFloors ?? []), ...(completedFloors ?? []), activeExploration?.floor].map(Number));
  const themesById = getThemesById(profile);

  return Object.fromEntries(Object.entries(sessionIslands).map(([floor, island]) => {
    const theme = themesById.get(island.themeId);
    const dc = profile.recommendations.baseDcByFloor[floor];
    const hasExpandedSectorFlow = ["volcanic", "sea-caves", "pirate-held", "floating", "storm"].includes(island.themeId);
    const finalIslandCanUpgrade = Number(floor) === 30 && !(completedFloors ?? []).map(Number).includes(30) &&
      !(activeExploration?.floor === 30 && activeExploration.guardianScene);
    const needsSectorUpgrade = !hasIslandSectors(island) &&
      (finalIslandCanUpgrade || hasExpandedSectorFlow && !exploredFloors.has(Number(floor)));
    const sectorUpgrade = needsSectorUpgrade ? createIslandPilot(Number(floor), island.themeId, dc, rng) : {};
    return [floor, {
      ...island,
      ...(hasIslandSectors(island) && !((hasExpandedSectorFlow || Number(floor) === 30) &&
        activeExploration?.floor === Number(floor) && activeExploration.guardianScene) ? {
        objectives: island.objectives.map((objective, index) => {
          const current = createIslandSector(island, index, objective.variant, dc, objective.penaltyId, objective.guardianBuffId);
          if (floor === "30") return current;
          if (objective.type === "tesouro") return asIslandTreasureEvent(current, island.baseChallenge);
          if (island.outcomes?.[objective.id] && current.guardianBuff) {
            const { penaltyId, ...savedObjective } = objective;
            return { ...savedObjective, guardianBuffId: current.guardianBuffId, guardianBuff: current.guardianBuff, effect: current.effect };
          }
          // A revisão mudou as variantes 0 e 1; expedições importadas conservam a tarefa sorteada.
          if (["volcanic", "sea-caves", "pirate-held"].includes(island.themeId) && !island.outcomes?.[objective.id] &&
              objective.title && objective.variant !== 2) {
            return { ...current, ...objective };
          }
          return island.outcomes?.[objective.id]
            ? { ...objective, name: current.name, effect: objective.penaltyId ? getGuardianPenalty(objective.penaltyId, index).label : objective.effect }
            : current;
        })
      } : {}),
      ...sectorUpgrade,
      ...(theme?.arenaName ? { arenaName: theme.arenaName } : {}),
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
  let log = [INITIAL_LOG];

  function getRequiredFloorsFor(floor) {
    if (!activeProfile.archipelago) return [];
    if ([21, 22, 23, 24].includes(floor)) return [];
    if ([25, 26, 27].includes(floor)) return activeProfile.archipelago.unlockRules.intermediateRequires;
    if ([28, 29].includes(floor)) return activeProfile.archipelago.unlockRules.advancedRequires;
    return [];
  }

  function getIslandVictoryNarrative(island) {
    if (!hasIslandSectors(island)) return undefined;
    return activeProfile.archipelago.themePools[island.difficulty]
      ?.find(theme => theme.id === island.themeId)?.victoryNarrative;
  }

  function getFragments() {
    return [...completedFloors].filter((floor) => floor >= 21 && floor <= 29).length;
  }

  function isIslandAvailable(floor) {
    if (completedFloors.has(floor)) return true;
    const rules = activeProfile.archipelago.unlockRules;
    if (floor === 30) return getFragments() >= rules.bossRequiresFragments;
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
    visitedFloors = toNumberSet(sessionState?.visitedFloors);
    completedFloors = toNumberSet(sessionState?.completedFloors);
    const restoredExploration = sessionState?.activeExploration;
    activeExploration = nextProfile.archipelago && restoredExploration && isIslandAvailable(restoredExploration.floor)
      ? restoredExploration : null;
    islands = sessionState?.islands
      ? hydrateSessionIslands(nextProfile, { ...sessionState, activeExploration }, nextRng)
      : createGeneratedIslands(nextProfile, nextRng);
    if (activeExploration) markVisited(activeExploration.floor);
    if (activeExploration?.floor === 30) prepareFinalIslandTreasure(islands[30], activeExploration.mapSeed);
    boatAmbush = sessionState?.boatAmbush ?? null;
    if (boatAmbush) applyLiburnaLayout(boatAmbush);
    nightsAtBoat = sessionState?.nightsAtBoat ?? 0;
    updateSavedGuardianVulnerabilities(activeExploration?.guardianScene?.resolvedEncounter?.items?.[0]?.creatureData?.stats);
    daySpent = Boolean(sessionState?.daySpent);
    elapsedMinutes = sessionState?.elapsedMinutes || 0;
    log = sessionState?.log || [INITIAL_LOG];
    if (restoredExploration && !activeExploration) {
      log = [`A exploração da ilha ${restoredExploration.floor} foi interrompida. A rota está bloqueada.`, ...log].slice(0, 8);
    } else if (sessionState?.testingFragments) {
      log = ["Expedição restaurada com os fragmentos conquistados.", ...log].slice(0, 8);
    }
  }

  function markVisited(floor) {
    visitedFloors.delete(floor);
    visitedFloors.add(floor);
  }

  function prepareFinalIslandTreasure(island, mapSeed) {
    if (!hasIslandSectors(island) || Object.hasOwn(island, "treasureSectorId")) return;
    const roll = createRng(`${mapSeed}:tesouro-ilha-dos-dinossauros`);
    island.treasureSectorId = roll() < activeProfile.archipelago.boss.treasureChance
      ? pick(roll, island.objectives).id
      : null;
  }

  function exploreIsland(floor, { mapSeed, rng } = {}) {
    const island = islands[floor];
    if (!island || !isIslandAvailable(floor) || daySpent || boatAmbush || completedFloors.has(floor) || island.defeated) return false;

    let reopened = null;
    if (hasIslandSectors(island)) {
      island.visits = (island.visits || 0) + 1;
      if (floor === 30) prepareFinalIslandTreasure(island, mapSeed);
      else if (island.visits > 1) {
        const roll = rng ?? createRng(`${mapSeed}:ilha-${floor}:visita-${island.visits}`);
        reopened = reopenIslandSector(island, roll, activeProfile.recommendations.baseDcByFloor[floor]);
      }
    }

    markVisited(floor);
    daySpent = true;
    elapsedMinutes += activeProfile.archipelago.explorationMinutes;
    activeExploration = {
      floor,
      resolvedObjectiveIds: [],
      ...(hasIslandSectors(island) || floor === 30 ? { mapSeed } : {}),
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
    const objective = island?.objectives.find(item => item.id === objectiveId);
    if (!objective) return false;
    if (floor === 30) return rerollDinosaurSector(island, objective, scene, activeProfile);
    if (!canRerollNodeCreatures(scene)) return false;
    const creature = getIslandCreatureRules(island, objective, scene.creature);
    if (creature.allowedCreatureIds?.length === 0) return false;
    const tacticalLayout = withIslandTacticalLayout(scene, island.themeId, objective).tacticalLayout;
    const updated = rerollNodeCreatures({ ...scene, creature }, activeProfile, { tacticalLayout });
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
      const sector = island.objectives.find(item => item.id === objectiveId);
      const awardsTreasure = sector.type === "tesouro" || island.treasureSectorId === objectiveId;
      if (outcome === "success" && awardsTreasure && !island.earnedRewards?.[objectiveId]) {
        const seed = `${activeExploration.mapSeed}:tesouro-de-setor:${objectiveId}`;
        const reward = rollIslandSectorTreasure(island.baseChallenge, seed);
        island.treasureRewards ??= {};
        island.treasureRewards[objectiveId] = reward;
      }
      island.outcomes ??= {};
      island.outcomes[objectiveId] = outcome;
      if (outcome === "success") {
        island.earnedRewards ??= {};
        island.earnedRewards[objectiveId] = true;
      }
      log = [`Setor ${sector.name} da ilha ${floor}: ${outcome === "success" ? "sucesso" : "falha"}.`, ...log].slice(0, 8);
      return true;
    }
    if (floor === 30 || activeExploration.resolvedObjectiveIds.includes(objectiveId)) return false;
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
    if (island.floor === 30 && !hasIslandSectors(island)) return createArchipelagoFinalBoss(island, activeProfile, seed);
    const composition = island.guardianComposition ??
      pickIslandGuardian(island, createRng(`${seed}:guardiao:${island.floor}`));
    return createIslandGuardian(island, composition, activeProfile, seed);
  }

  function startGuardian(floor) {
    const island = islands[floor];
    if (boatAmbush || activeExploration?.floor !== floor || activeExploration.guardianScene) return false;
    if (floor === 30 ? !isIslandAvailable(floor) :
      (!hasIslandSectors(island) || !island.objectives.every(item => island.outcomes?.[item.id]))) return false;
    activeExploration.guardianScene = previewGuardian(island);
    log = [floor === 30 ? "Confronto com o Rei Tirano iniciado." : `Ilha ${floor} · Combate iniciado na arena ${island.arenaName}.`, ...log].slice(0, 8);
    return true;
  }

  function loseGuardian(floor) {
    if (activeExploration?.floor !== floor || !activeExploration.guardianScene) return false;
    islands[floor].defeated = true;
    activeExploration = null;
    log = [floor === 30 ? "O Rei Tirano derrotou o grupo." : `Ilha ${floor} · Grupo derrotado na arena ${islands[floor].arenaName}.`, ...log].slice(0, 8);
    return true;
  }

  function completeIsland(floor) {
    if (boatAmbush) return false;
    const island = islands[floor];
    const resolved = new Set(activeExploration?.floor === floor ? activeExploration.resolvedObjectiveIds : []);
    const allResolved = floor === 30 || hasIslandSectors(island)
      ? activeExploration?.floor === floor && Boolean(activeExploration.guardianScene)
      : island?.objectives.every((objective) => resolved.has(objective.id));

    if (!allResolved) return false;

    completedFloors.add(floor);
    activeExploration = null;
    const ending = getIslandVictoryNarrative(island) ?? (floor === 30 ? "Etapa finalizada." : "Fragmento recuperado.");
    log = [`Ilha ${floor} concluída. ${ending}`, ...log].slice(0, 8);
    return true;
  }

  function getAnchoredIsland() {
    const island = islands[[...visitedFloors].at(-1)];
    return island && { themeId: island.themeId, name: island.name };
  }

  function restAtBoat({ mapSeed = activeExploration?.mapSeed, rng } = {}) {
    if (boatAmbush || activeExploration?.guardianScene) return false;
    if (daySpent && !completedFloors.has(30)) {
      nightsAtBoat += 1;
      const roll = rng ?? createRng(`${mapSeed}:barco:noite-${nightsAtBoat}`);
      boatAmbush = createBoatAmbush(getFragments(), nightsAtBoat, activeProfile, mapSeed, roll, getAnchoredIsland());
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
    if (activeExploration?.floor === 30 && hasIslandSectors(islands[30])) {
      delete islands[30].outcomes;
      delete islands[30].scenes;
      log = ["Descanso no barco. Os encontros da Ilha dos Dinossauros voltaram e o Rei Tirano recuperou os bônus.", ...log].slice(0, 8);
    } else if (hasIslandSectors(islands[activeExploration?.floor])) {
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

  function canPreviewGuardian(island) {
    return island.floor === 30
      ? isIslandAvailable(30)
      : island.objectives.every(item => island.outcomes?.[item.id]);
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
        ...(completedFloors.has(floor) ? { victoryNarrative: getIslandVictoryNarrative(islands[floor]) } : {}),
        status: islands[floor].defeated ? "grupo derrotado" : getIslandStatus(floor),
        ...(floor === 30 || hasIslandSectors(islands[floor]) ? {
          guardian: {
            ready: canPreviewGuardian(islands[floor]),
            preview: activeExploration?.floor === floor && !activeExploration.guardianScene &&
              canPreviewGuardian(islands[floor]) ? previewGuardian(islands[floor]) : null,
            effects: islands[floor].objectives.filter(item => item.type !== "tesouro" && islands[floor].outcomes?.[item.id] === "success").map(item => item.effect),
            buffs: islands[floor].objectives.filter(item => item.guardianBuff && (item.type === "tesouro" || islands[floor].outcomes?.[item.id] !== "success")).map(item => item.guardianBuff),
            scene: activeExploration?.floor === floor ? activeExploration.guardianScene : null
          }
        } : {}),
        objectives: islands[floor].objectives.map((objective, index, objectives) => ({
          ...objective,
          resolved: ((floor === 30 || Boolean(islands[floor].pilot)) && completedFloors.has(floor)) ||
            (floor !== 30 && activeExploration?.floor === floor && activeResolved.has(objective.id)),
          ...(islands[floor].pilot === "mangrove" ? {
            available: index === 0 ||
              (activeExploration?.floor === floor && activeResolved.has(objectives[index - 1].id))
          } : {}),
          ...(objective.type === "combate" && activeExploration?.floor === floor
            ? { scene: hasIslandSectors(islands[floor]) ? islands[floor].scenes?.[objective.id] : activeExploration.scene } : {}),
          ...(hasIslandSectors(islands[floor]) ? {
            resolved: Boolean(islands[floor].outcomes?.[objective.id]),
            outcome: islands[floor].outcomes?.[objective.id],
            rewardEarned: Boolean(islands[floor].earnedRewards?.[objective.id]),
            guardsTreasure: islands[floor].treasureSectorId === objective.id && !islands[floor].treasureRewards?.[objective.id],
            ...(islands[floor].treasureRewards?.[objective.id] ? { treasureReward: islands[floor].treasureRewards[objective.id] } : {})
          } : {})
        }))
      })),
      islandRows: activeProfile.archipelago.islandRows,
      boatLabel: activeProfile.archipelago.boatLabel,
      boatIcon: activeProfile.archipelago.boatIcon,
      lastVisitedFloor: [...visitedFloors].at(-1) ?? null,
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
    rerollBoatAmbush: mapSeed => rerollBoatAmbush(boatAmbush, activeProfile, mapSeed,
      boatAmbush?.boatAmbushIsland ?? getAnchoredIsland()),
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
