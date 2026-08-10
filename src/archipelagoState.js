import { pick } from "./random.js";

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
  const pickedThemes = {
    initial: shuffle(rng, profile.archipelago.themePools.initial).slice(0, 4),
    intermediate: shuffle(rng, profile.archipelago.themePools.intermediate).slice(0, 3),
    advanced: shuffle(rng, profile.archipelago.themePools.advanced).slice(0, 2),
    boss: [profile.archipelago.themePools.boss[0]]
  };
  const usedByDifficulty = { initial: 0, intermediate: 0, advanced: 0, boss: 0 };

  return Object.fromEntries(profile.floors.map((floor) => {
    const difficulty = getDifficulty(profile, floor);
    const theme = pickedThemes[difficulty][usedByDifficulty[difficulty]] || pick(rng, profile.archipelago.themePools[difficulty]);
    usedByDifficulty[difficulty] += 1;

    return [floor, {
      floor,
      name: theme.name,
      themeId: theme.id,
      themeName: theme.name,
      icon: theme.icon,
      narrative: theme.narrative,
      difficulty,
      baseChallenge: getBaseChallenge(profile, floor),
      objectives: createPlaceholderObjectives(profile, floor, theme)
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
      icon: island.icon || theme?.icon,
      narrative: island.narrative || theme?.narrative
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
    daySpent = Boolean(sessionState?.daySpent);
    elapsedMinutes = sessionState?.elapsedMinutes || 0;
    log = sessionState?.log || ["Arquipélago gerado. As ilhas iniciais estão acessíveis."];
  }

  function exploreIsland(floor) {
    if (!isIslandAvailable(floor) || daySpent || completedFloors.has(floor)) return false;

    visitedFloors.add(floor);
    daySpent = true;
    elapsedMinutes += activeProfile.archipelago.explorationMinutes;
    activeExploration = {
      floor,
      resolvedObjectiveIds: []
    };
    log = [`Ilha ${floor} explorada. O esforço do dia foi gasto.`, ...log].slice(0, 8);
    return true;
  }

  function resolveObjective(floor, objectiveId) {
    if (activeExploration?.floor !== floor) return false;
    if (activeExploration.resolvedObjectiveIds.includes(objectiveId)) return false;

    activeExploration = {
      ...activeExploration,
      resolvedObjectiveIds: [...activeExploration.resolvedObjectiveIds, objectiveId]
    };
    log = [`Objetivo resolvido na ilha ${floor}.`, ...log].slice(0, 8);
    return true;
  }

  function completeIsland(floor) {
    const island = islands[floor];
    const resolved = new Set(activeExploration?.floor === floor ? activeExploration.resolvedObjectiveIds : []);
    const allResolved = island.objectives.every((objective) => resolved.has(objective.id));

    if (!allResolved) return false;

    completedFloors.add(floor);
    activeExploration = null;
    log = [`Ilha ${floor} concluída.${floor === 30 ? " Etapa finalizada." : " Fragmento recuperado."}`, ...log].slice(0, 8);
    return true;
  }

  function restAtBoat() {
    daySpent = false;
    elapsedMinutes = 0;
    if (activeExploration) {
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
        status: getIslandStatus(floor),
        objectives: islands[floor].objectives.map((objective) => ({
          ...objective,
          resolved: activeExploration?.floor === floor && activeResolved.has(objective.id)
        }))
      })),
      islandRows: activeProfile.archipelago.islandRows,
      boatLabel: activeProfile.archipelago.boatLabel,
      boatIcon: activeProfile.archipelago.boatIcon,
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
      activeExploration,
      daySpent,
      elapsedMinutes,
      log
    }),
    getElapsedMinutes: () => elapsedMinutes,
    getSnapshot,
    initialize,
    resolveObjective,
    restAtBoat
  };
}
