import { createRng, randomInt } from "../random.js";
import { createTacticalScene } from "../tacticalScene.js";
import { getTacticalEncounterUnits, getTacticalPartyPieces, placeTacticalEncounterUnits } from "../tacticalScenePieces.js";
import { getAbilityDcForChallenge } from "../threatCreationRules.js";
import { trapCatalog } from "../traps.js";
import { getIslandThemeTerrain } from "../archipelagoPilot.js";
import { getArchipelagoMissionTheme } from "./archipelagoMissionThemes.js";
import { getMissionDestinationLabel } from "./missionDestinationLabel.js";
import { createArchipelagoHuntEncounter } from "./archipelagoMissionEncounter.js";

const DEFAULT_WIDTH = 16;
const DEFAULT_HEIGHT = 12;
const EXTENDED_EXPLORATION_WIDTH = 14;
const EXTENDED_EXPLORATION_HEIGHT = 10;
const EXTENDED_EXPLORATION_BOSS_WIDTH = 20;
const EXTENDED_EXPLORATION_BOSS_HEIGHT = 14;
const COMBAT_KINDS = new Set(["defeat", "hunt"]);
const OBJECTIVE_HEAVY_KINDS = new Set([
  "collect",
  "deliverMemento",
  "explore",
  "investigate",
  "recover",
  "recoverMemento",
  "stabilize"
]);
const RESOLUTION_CHECKS_BY_CATEGORY = {
  anomalous: [{ skill: "Misticismo", action: "estabilizar ou registrar a anomalia" }],
  collection: [{ skill: "Sobrevivência", action: "coletar a amostra sem contaminar a prova" }],
  escort: [{ skill: "Furtividade", action: "levar a lembrança sem expor o grupo ou o objeto" }],
  exploration: [{ skill: "Sobrevivência", action: "confirmar a rota e registrar o ponto de interesse" }],
  extermination: [{ skill: "Sobrevivência", action: "rastrear ou atrair a ameaça antes do confronto" }],
  investigation: [{ skill: "Investigação", action: "interpretar os vestígios e chegar à conclusão útil" }],
  recovery: [{ skill: "Investigação", action: "localizar e extrair o objeto sem inutilizá-lo" }],
  rescue: [{ skill: "Investigação", action: "localizar e recuperar a lembrança sem destruí-la" }],
  specialHunt: [{ skill: "Sobrevivência", action: "seguir o rastro do alvo marcado" }],
  trial: [
    { skill: "Acrobacia", action: "superar a parte móvel do desafio" },
    { skill: "Atletismo", action: "vencer a parte física do desafio" },
    { skill: "Misticismo", action: "entender a lógica sobrenatural do desafio" },
    { skill: "Vontade", action: "resistir à pressão mental do desafio" }
  ]
};
const GENERIC_MECHANISM_RISKS = [
  {
    name: "Núcleo instável",
    effect: "A energia pulsa em intervalos irregulares; uma intervenção brusca pode agravar a anomalia.",
    checks: ["Analisar: Investigação CD {dc}", "Estabilizar: Misticismo CD {dc}"]
  },
  {
    name: "Condutor fraturado",
    effect: "O ponto de interesse descarrega energia quando alguém mexe no objetivo sem preparar a área.",
    checks: ["Preparar: Ladinagem CD {dc}", "Conter descarga: Reflexos CD {dc}"]
  },
  {
    name: "Selo desalinhado",
    effect: "O mecanismo prende o objetivo em um padrão repetitivo até que a sequência correta seja restaurada.",
    checks: ["Decifrar: Misticismo CD {dc}", "Executar sequência: Investigação CD {dc}"]
  }
];

function getMissionMapSize(mission, profile) {
  if (profile?.mode !== "extended-exploration") {
    return { height: DEFAULT_HEIGHT, width: DEFAULT_WIDTH };
  }

  return {
    height: mission.destination?.floor % 10 === 0 ? EXTENDED_EXPLORATION_BOSS_HEIGHT : EXTENDED_EXPLORATION_HEIGHT,
    width: mission.destination?.floor % 10 === 0 ? EXTENDED_EXPLORATION_BOSS_WIDTH : EXTENDED_EXPLORATION_WIDTH
  };
}

function createEmptyCells(size) {
  return Array.from({ length: size.height }, () => Array.from({ length: size.width }, () => "floor"));
}

function inBounds(x, y, size) {
  return x >= 0 && y >= 0 && x < size.width && y < size.height;
}

function setCell(cells, x, y, value, overwrite = ["floor"], size) {
  if (!inBounds(x, y, size) || !overwrite.includes(cells[y][x])) return false;

  cells[y][x] = value;
  return true;
}

function shuffle(items, rng) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = randomInt(rng, 0, index);
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }

  return copy;
}

function getFreePositions(cells, size) {
  const positions = [];

  for (let y = 1; y < size.height - 1; y += 1) {
    for (let x = 1; x < size.width - 1; x += 1) {
      if (["floor", "difficult", "foliage", "concealment"].includes(cells[y][x])) {
        positions.push([x, y]);
      }
    }
  }

  return positions;
}

function placeParty(cells, size) {
  const partyY = Math.max(1, size.height - 3);

  [[1, partyY], [2, partyY], [1, partyY + 1], [2, partyY + 1]].forEach(([x, y]) => {
    if (inBounds(x, y, size)) cells[y][x] = "party";
  });
}

function placeObjective(cells, mission, rng, size) {
  const objectiveCount = mission.objective?.progressMode === "aggregate"
    ? Math.min(Math.max(mission.objective.quantity || 1, 2), 4)
    : 1;
  const right = size.width - 3;
  const upper = 2;
  const middle = Math.max(upper + 1, Math.floor(size.height * 0.42));
  const candidates = shuffle(
    [
      [right, upper],
      [right - 1, upper + 1],
      [right - 2, middle],
      [right - 3, upper],
      [right, middle + 1],
      [right - 4, upper + 1]
    ].filter(([x, y]) => inBounds(x, y, size)),
    rng
  );

  let placed = 0;
  const fallback = getFreePositions(cells, size).sort(([x1], [x2]) => x2 - x1);
  for (const [x, y] of [...candidates, ...fallback]) {
    if (placed === objectiveCount) break;
    if (setCell(cells, x, y, "objective", ["floor", "difficult", "foliage", "concealment"], size)) placed += 1;
  }
  return placed;
}

function getIslandMapTheme(mission) {
  const themeId = mission.destination?.kind === "island" ? mission.destination.targetId : null;
  const theme = themeId ? getArchipelagoMissionTheme(themeId) : null;
  const terrain = theme ? getIslandThemeTerrain(themeId) : null;

  return theme && terrain ? { theme, terrain } : null;
}

function placeEnemies(cells, mission, rng, size, enemyTotal = null) {
  if (!COMBAT_KINDS.has(mission.objective?.kind)) return 0;

  const count = enemyTotal ?? Math.min(Math.max(mission.objective?.quantity || 1, 1), 8);
  const enemyXMin = Math.max(3, Math.floor(size.width * 0.52));
  const enemyYMax = Math.max(2, size.height - 3);
  const candidates = shuffle(
    getFreePositions(cells, size).filter(([x, y]) => x >= enemyXMin && y <= enemyYMax),
    rng
  );

  candidates.slice(0, count).forEach(([x, y]) => {
    cells[y][x] = "enemy";
  });

  return count;
}

function placeRisk(cells, mission, rng, size) {
  const difficultyRisk = {
    simple: 1,
    standard: 2,
    risky: 3,
    hard: 4,
    severe: 5
  }[mission.difficulty] || 2;
  const trapCount = COMBAT_KINDS.has(mission.objective?.kind)
    ? Math.max(1, Math.floor(difficultyRisk / 2))
    : difficultyRisk;
  const marker = mission.objective?.kind === "stabilize" ? "mechanism" : "trap";
  const candidates = shuffle(getFreePositions(cells, size), rng)
    .filter(([x, y]) => x >= 4 && y >= 2 && y <= size.height - 3);

  candidates.slice(0, trapCount).forEach(([x, y]) => {
    cells[y][x] = marker;
  });

  return {
    count: trapCount,
    marker
  };
}

function placeTerrain(cells, mission, rng, size, themedMarkers = null) {
  const kind = mission.objective?.kind;
  const terrainMarkers = themedMarkers?.length ? themedMarkers : kind === "explore"
    ? ["difficult", "obstacle", "concealment"]
    : kind === "collect"
      ? ["foliage", "difficult", "obstacle"]
      : kind === "stabilize"
        ? ["mechanism", "difficult", "concealment"]
        : ["obstacle", "difficult", "concealment"];
  const candidates = shuffle(getFreePositions(cells, size), rng);

  candidates.slice(0, 14).forEach(([x, y], index) => {
    const marker = terrainMarkers[index % terrainMarkers.length];
    setCell(cells, x, y, marker, ["floor"], size);
  });
}

function getMissionDc(mission, profile) {
  const floorChallenge = profile?.missionRules?.rewardChallengeByFloor?.[mission.destination?.floor];
  const baseChallenge = Number(floorChallenge ?? mission.reward?.challenge ?? mission.objective?.challenge ?? 1);

  return getAbilityDcForChallenge(baseChallenge + 1);
}

function formatCheck(label, check) {
  if (!check) return null;

  const detail = check.effect || check.purpose || check.action;

  return `${label}: ${check.skill || check.ability || check.test} CD ${check.dc}${detail ? ` (${detail})` : ""}`;
}

function formatTemplateCheck(template, dc) {
  return template.replace("{dc}", String(dc));
}

function getMissionResolutionCheck(mission, rng, dc) {
  const options = RESOLUTION_CHECKS_BY_CATEGORY[mission.category] || [{ skill: "Investigação", action: "resolver a parte central da missão" }];
  const selected = options[randomInt(rng, 0, options.length - 1)];

  return {
    ...selected,
    dc
  };
}

function getRiskChallenge(mission) {
  const challenge = Number(mission.reward?.challenge || mission.objective?.challenge || 1);

  return Math.max(0.25, Math.min(10, challenge));
}

function getTrapRiskDetails(count, mission, rng) {
  const targetChallenge = getRiskChallenge(mission);
  const candidates = trapCatalog
    .filter((trapEntry) => trapEntry.challengeRating <= Math.max(targetChallenge, 0.25))
    .map((trapEntry) => ({
      trap: trapEntry,
      sort: Math.abs(trapEntry.challengeRating - targetChallenge) + rng()
    }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ trap }) => trap);

  return candidates.slice(0, count).map((trapEntry) => {
    const saves = Array.isArray(trapEntry.save)
      ? trapEntry.save
      : trapEntry.save
        ? [trapEntry.save]
        : [];
    const checks = [
      formatCheck("Detectar", trapEntry.detection),
      formatCheck("Desarmar", trapEntry.disable),
      ...saves.map((save) => formatCheck("Resistência", save)),
      ...trapEntry.additionalTests.map((test) => formatCheck("Teste adicional", test))
    ].filter(Boolean);

    return {
      area: trapEntry.area,
      challengeLabel: trapEntry.challengeLabel,
      checks,
      effect: trapEntry.effect,
      kind: "Armadilha",
      name: trapEntry.name
    };
  });
}

function getMechanismRiskDetails(count, rng, dc) {
  const risks = shuffle(GENERIC_MECHANISM_RISKS, rng);

  return Array.from({ length: count }, (_, index) => {
    const risk = risks[index % risks.length];

    return {
      area: "ponto de interesse da missão",
      challengeLabel: null,
      checks: risk.checks.map((check) => formatTemplateCheck(check, dc)),
      effect: risk.effect,
      kind: "Mecanismo",
      name: risk.name
    };
  });
}

function getRiskDetails(mission, risk, rng, dc) {
  if (!risk.count) return [];
  if (risk.marker === "mechanism") return getMechanismRiskDetails(risk.count, rng, dc);

  return getTrapRiskDetails(risk.count, mission, rng);
}

function formatResolutionCheck(check) {
  return `${check.skill} CD ${check.dc} (${check.action})`;
}

const MISSION_TERRAIN_EFFECTS = new Set(["canopy", "concealment", "current", "mechanism", "wet", "wind"]);

function buildMissionScene(size, baseCells, cells, mission, huntEncounter, risk, riskDetails, landmark) {
  const features = [];
  const markers = [];
  const terrain = baseCells.map((tile, index) => {
    if (!MISSION_TERRAIN_EFFECTS.has(tile)) {
      return tile === "pit" && mission.destination?.targetId === "floating" ? "abyss" : tile;
    }
    features.push({ type: tile, indices: [index] });
    return tile === "current" ? "deep-water" : "floor";
  });
  const toPosition = index => [index % size.width, Math.floor(index / size.width)];
  const indicesFor = tile => cells.flatMap((cell, index) => cell === tile ? [index] : []);
  const party = getTacticalPartyPieces(indicesFor("party").map(toPosition));
  const enemyPositions = indicesFor("enemy").map(toPosition);
  const enemyItems = (huntEncounter?.items ?? (enemyPositions.length ? [{
    creatureId: mission.objective?.targetId ?? "mission-threat",
    name: mission.objective?.targetName ?? "Ameaça da missão",
    quantity: enemyPositions.length
  }] : [])).map(item => ({ ...item, kind: "creature" }));
  const units = getTacticalEncounterUnits(enemyItems);
  const fallback = terrain.flatMap((tile, index) =>
    ["floor", "difficult", "foliage"].includes(tile) ? [toPosition(index)] : []);
  const blocked = new Set(["obstacle", "tree", "wall", "lava", "abyss", "pit", "cliff", "escarpment"]);
  const enemies = placeTacticalEncounterUnits(units, enemyPositions, fallback, size, party, {
    canOccupy: index => !blocked.has(terrain[index])
  });
  const targetIndex = huntEncounter?.items.findIndex(item => item.isTarget) ?? -1;
  const targetPiece = targetIndex >= 0 ? enemies.find(piece =>
    piece.id === `creature:${targetIndex}:${huntEncounter.items[targetIndex].creatureId}:0`) : null;
  const objectiveIndices = indicesFor("objective");
  if (targetPiece) {
    markers.push({ type: "objective", pieceId: targetPiece.id, label: targetPiece.name });
  } else {
    for (const index of objectiveIndices) {
      markers.push({ type: "objective", indices: [index], label: mission.objective?.targetName });
    }
  }
  if (landmark && objectiveIndices.length) {
    markers.push({
      type: "mechanism",
      id: landmark.id,
      label: landmark.name,
      indices: [objectiveIndices[0]]
    });
  }
  const riskIndices = indicesFor(risk.marker).filter(index => baseCells[index] !== risk.marker);
  riskDetails.forEach((detail, index) => {
    const cellIndex = riskIndices[index];
    if (cellIndex !== undefined) markers.push({ type: risk.marker, label: detail.name, indices: [cellIndex] });
  });
  return createTacticalScene({ ...size, terrain, features, markers, pieces: [...party, ...enemies] });
}

export function createMissionTacticalMap(mission, { profile = null } = {}) {
  const rng = createRng(`${mission.id}:mission-tactical-map`);
  const detailRng = createRng(`${mission.id}:mission-tactical-details`);
  const size = getMissionMapSize(mission, profile);
  const cells = createEmptyCells(size);

  const islandTheme = getIslandMapTheme(mission);
  const huntEncounter = islandTheme ? createArchipelagoHuntEncounter(mission, profile) : null;
  const enemyTotal = huntEncounter
    ? huntEncounter.items.reduce((sum, item) => sum + item.quantity, 0)
    : null;

  placeTerrain(cells, mission, rng, size, islandTheme?.theme.map.markers);
  const baseCells = cells.flat();
  placeParty(cells, size);
  const objectiveCount = placeObjective(cells, mission, rng, size);
  const enemyCount = placeEnemies(cells, mission, rng, size, enemyTotal);
  const risk = placeRisk(cells, mission, rng, size);
  const missionDc = getMissionDc(mission, profile);
  const resolutionCheck = getMissionResolutionCheck(mission, detailRng, missionDc);
  const riskDetails = getRiskDetails(mission, risk, detailRng, missionDc);
  const objectiveLabel = OBJECTIVE_HEAVY_KINDS.has(mission.objective?.kind)
    ? mission.objective?.targetName
    : "ponto de pressão da missão";

  const missionFeatures = [
    {
      name: mission.categoryLabel,
      effect: mission.objective?.condition
        ? `${mission.objective.condition} ${mission.objective.targetName || "o objetivo"}.`
        : "Objetivo definido pela missão."
    },
    {
      name: "Riscos",
      effect: riskDetails.length
        ? riskDetails.map((riskDetail) => riskDetail.name).join("; ")
        : "Sem risco adicional no mapa."
    },
    {
      name: "Objetivo",
      effect: mission.proofType || "Confirmação do mestre."
    }
  ];
  const effect = `Objetivo: ${objectiveLabel}. Teste central: ${formatResolutionCheck(resolutionCheck)}.`;
  const sourceLandmark = mission.featured && islandTheme?.theme.featured.landmark
    ? islandTheme.theme.featured.landmark
    : islandTheme?.theme.map.landmark;
  const landmark = sourceLandmark ? { ...sourceLandmark, id: `${mission.id}:landmark` } : null;
  const terrain = islandTheme
    ? {
      name: islandTheme.terrain.name,
      effect: `${islandTheme.terrain.effect} ${effect}`,
      features: [
        ...islandTheme.terrain.features,
        ...missionFeatures,
        landmark
      ]
    }
    : {
      name: (mission.destination?.kind === "island"
        ? getMissionDestinationLabel(mission, { unknownPaths: true })
        : mission.destination?.label) || "Área da missão",
      effect,
      features: missionFeatures
    };

  const legacyCells = cells.flat();
  return {
    cells: legacyCells,
    scene: buildMissionScene(size, baseCells, legacyCells, mission, huntEncounter, risk, riskDetails, landmark),
    climate: [],
    enemyCount,
    height: size.height,
    missionDc,
    objectiveCount,
    resolutionCheck,
    riskDetails,
    terrain,
    template: mission.category,
    trapCount: risk.count,
    width: size.width
  };
}
