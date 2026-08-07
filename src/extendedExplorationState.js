import { formatChallengeRating } from "./challenge.js";
import { assignCreatureProfile } from "./creatures.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { pick, randomInt } from "./random.js";
import { assignTrapProfile } from "./traps.js";

const INITIAL_LOG_LIMIT = 40;
const COMBAT_CATEGORIES = new Set(["easy", "medium", "hard"]);
const TACTICAL_WIDTH = 14;
const TACTICAL_HEIGHT = 10;

function getFloorRules(profile, floor) {
  return profile.extendedExploration.progressByFloor[floor] || null;
}

function getTier(profile, floor) {
  return profile.extendedExploration.tiers.find((tier) => tier.floors.includes(floor)) || null;
}

function getCategory(profile, categoryId) {
  return profile.extendedExploration.categories[categoryId] || {
    label: categoryId,
    challengeByTier: { default: 0 }
  };
}

function getCategoryChallenge(category, tier) {
  return category.challengeByTier[tier?.id] ?? category.challengeByTier.default ?? 0;
}

function getApproach(profile, approachId) {
  return profile.extendedExploration.approaches.find((approach) => approach.id === approachId)
    || profile.extendedExploration.approaches[0];
}

function getFloorApproaches(profile, floor) {
  const approachIds = profile.extendedExploration.approachIdsByFloor?.[floor];

  if (!approachIds?.length) return profile.extendedExploration.approaches;

  const approachesById = new Map(profile.extendedExploration.approaches.map((approach) => [approach.id, approach]));

  return approachIds
    .map((approachId) => approachesById.get(approachId))
    .filter(Boolean);
}

function getExplorationMinutes(profile, floor, approach) {
  const baseMinutes = profile.extendedExploration.baseMinutesByFloor?.[floor] || 10;
  const multiplier = approach.timeMultiplier || 1;

  return Math.max(Math.round(baseMinutes * multiplier), 1);
}

function getUsedApproachLabels(profile, floor, usedApproachIds) {
  const approachesById = new Map(getFloorApproaches(profile, floor).map((approach) => [approach.id, approach]));

  return [...usedApproachIds]
    .map((approachId) => approachesById.get(approachId)?.label)
    .filter(Boolean);
}

function getApproachAction(approach) {
  return approach.label.includes(":")
    ? approach.label.split(":").slice(1).join(":").trim()
    : approach.label;
}

function getApproachNarrative(approach, outcome) {
  const action = getApproachAction(approach);
  const actionLower = action.toLocaleLowerCase("pt-BR");
  const isSuccess = outcome === "success" || outcome === "criticalSuccess";
  const prefix = {
    Acrobacia: `Um personagem assume a dianteira e tenta ${actionLower} para vencer a geometria irregular do labirinto.`,
    Adestramento: `Um personagem tenta ${actionLower} para lidar com uma criatura ou sinal animal no caminho.`,
    Atletismo: `Um personagem usa força e impulso para ${actionLower} e abrir passagem pelo obstáculo.`,
    Conhecimento: `Um personagem recorre ao estudo para usar ${actionLower} como chave de leitura do labirinto.`,
    Cura: `Um personagem examina vestígios físicos e usa ${actionLower} para entender o que aconteceu ali.`,
    Diplomacia: `Um personagem tenta ${actionLower} para transformar um encontro social em rota segura.`,
    Enganação: `Um personagem usa ${actionLower} para atravessar a situação sem revelar a intenção do grupo.`,
    Fortitude: `Um personagem se coloca à prova para ${actionLower} e manter o grupo em movimento.`,
    Furtividade: `Um personagem reduz o ritmo do grupo para ${actionLower} sem chamar atenção.`,
    Guerra: `Um personagem lê o espaço como campo de batalha e tenta ${actionLower}.`,
    Intimidação: `Um personagem usa presença e ameaça para ${actionLower} e abrir caminho.`,
    Intuição: `Um personagem segue um pressentimento e tenta ${actionLower}.`,
    Investigação: `Um personagem assume a busca ativa e tenta ${actionLower} pistas úteis no labirinto.`,
    Ladinagem: `Um personagem trabalha com cuidado para ${actionLower} sem acionar riscos ocultos.`,
    Misticismo: `Um personagem interpreta sinais arcanos e tenta ${actionLower}.`,
    Nobreza: "Com sua educação de nobre, um personagem interpreta símbolos, etiqueta e arquitetura para indicar uma rota segura pelo labirinto.",
    Ofício: `Um personagem usa conhecimento técnico para ${actionLower} e transformar o obstáculo em passagem.`,
    Percepção: action === "Observar"
      ? "Um personagem decidiu tomar a liderança e observar possíveis caminhos."
      : `Um personagem se concentra nos seus sentidos e tenta ${actionLower} sinais do caminho.`,
    Reflexos: `Um personagem se move no instante certo para ${actionLower} ao perigo do labirinto.`,
    Religião: `Um personagem usa tradição sagrada para ${actionLower} os sinais do caminho.`,
    Sobrevivência: `Um personagem usa experiência de jornada para ${actionLower} dentro do labirinto.`,
    Vontade: `Um personagem se centra e tenta ${actionLower} diante da pressão mental da masmorra.`
  }[approach.skill] || `Um personagem tenta ${actionLower} para avançar pelo labirinto.`;

  return isSuccess
    ? `${prefix} A leitura estava correta.`
    : `${prefix} A tentativa não encontra uma rota segura.`;
}

function clampRoll(value) {
  if (value === null || value === undefined || value === "") return null;

  const number = Number(value);

  if (!Number.isFinite(number)) return null;

  return Math.min(Math.max(Math.floor(number), 1), 100);
}

function createLogEntry(message, kind = "info") {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    message
  };
}

function getD100Range(tier, roll) {
  return tier.d100.find((range) => roll >= range.min && roll <= range.max);
}

function createSceneDetail(profile, categoryId, rng) {
  const table = profile.extendedExploration.commonTables[categoryId];

  if (table?.length) {
    return pick(rng, table);
  }

  if (categoryId === "obstacle") {
    return "Use um obstáculo ou armadilha do tier atual. Gere mapa tático se a posição importar.";
  }

  if (categoryId === "treasure") {
    return "Use a tabela de tesouro ou achado útil do tier atual antes de entregar a recompensa.";
  }

  return "Encontro gerado para uma sala fechada do labirinto.";
}

function getEncounterTerrain(floor, categoryId, rng) {
  if (floor >= 7 || categoryId === "hard") {
    return pick(rng, ["Labirinto", "Covil aracnídeo"]);
  }

  return "Labirinto";
}

function createEncounterNode({ categoryId, categoryLabel, challenge, floor, profile, rng, seedSuffix }) {
  const node = {
    id: `extended-${floor}-${seedSuffix}`,
    encounterSeed: `extended-${floor}-${seedSuffix}`,
    type: categoryId === "obstacle" ? "trap" : "normal",
    label: categoryLabel,
    short: "E",
    level: floor,
    column: 0,
    environment: {
      terrain: {
        name: getEncounterTerrain(floor, categoryId, rng),
        effect: "Sala fechada da masmorra; sem clima externo.",
        features: []
      },
      climate: []
    },
    challenge: {
      climate: 0,
      encounter: challenge,
      terrain: 0,
      total: challenge
    },
    creature: null,
    trap: null,
    resolvedEncounter: null
  };

  assignTrapProfile(node, profile, rng);
  if (node.challenge.creatures > 0) {
    assignCreatureProfile(node, profile, rng);
  }
  resolveNodeEncounter(node, { mapSeed: `extended-floor-${floor}` });

  return node;
}

function getEncounterEnemyCount(encounterNode) {
  return encounterNode?.resolvedEncounter?.items
    ?.filter((item) => item.kind === "creature")
    .reduce((total, item) => total + (item.quantity || 1), 0) || 0;
}

function hasTrap(encounterNode) {
  return Boolean(encounterNode?.resolvedEncounter?.items?.some((item) => item.kind === "trap"));
}

function createEmptyTacticalMap() {
  return Array.from({ length: TACTICAL_HEIGHT }, (_, y) =>
    Array.from({ length: TACTICAL_WIDTH }, (_, x) =>
      x === 0 || y === 0 || x === TACTICAL_WIDTH - 1 || y === TACTICAL_HEIGHT - 1 ? "wall" : "floor"
    )
  );
}

function fillInterior(cells, marker) {
  for (let y = 1; y < TACTICAL_HEIGHT - 1; y += 1) {
    for (let x = 1; x < TACTICAL_WIDTH - 1; x += 1) {
      cells[y][x] = marker;
    }
  }
}

function setCells(cells, positions, marker) {
  positions.forEach(([x, y]) => {
    if (cells[y]?.[x]) cells[y][x] = marker;
  });
}

function carveRect(cells, x1, y1, x2, y2) {
  for (let y = y1; y <= y2; y += 1) {
    for (let x = x1; x <= x2; x += 1) {
      if (cells[y]?.[x]) cells[y][x] = "floor";
    }
  }
}

function createPassage(edge, index) {
  if (edge === "top") return { edge, index, cells: [[index, 0], [index + 1, 0]] };
  if (edge === "bottom") return { edge, index, cells: [[index, TACTICAL_HEIGHT - 1], [index + 1, TACTICAL_HEIGHT - 1]] };
  if (edge === "left") return { edge, index, cells: [[0, index], [0, index + 1]] };
  return { edge, index, cells: [[TACTICAL_WIDTH - 1, index], [TACTICAL_WIDTH - 1, index + 1]] };
}

function addLayoutMeta(cells, meta) {
  Object.defineProperty(cells, "__layout", {
    configurable: true,
    enumerable: false,
    value: meta
  });
}

function carveCorridorTemplate(cells, template, rng) {
  fillInterior(cells, "wall");

  if (template === "corridor-2") {
    const horizontal = rng() < 0.5;
    if (horizontal) {
      const y = randomInt(rng, 3, 5);
      carveRect(cells, 1, y, 12, y + 1);
      addLayoutMeta(cells, {
        exits: [createPassage("left", y), createPassage("right", y)],
        partyEdges: ["left", "right"]
      });
    } else {
      const x = randomInt(rng, 5, 7);
      carveRect(cells, x, 1, x + 1, 8);
      addLayoutMeta(cells, {
        exits: [createPassage("top", x), createPassage("bottom", x)],
        partyEdges: ["top", "bottom"]
      });
    }
    return;
  }

  if (template === "t-junction") {
    const stemX = randomInt(rng, 5, 7);
    const armY = randomInt(rng, 3, 5);
    carveRect(cells, stemX, 1, stemX + 1, 8);
    carveRect(cells, 2, armY, 11, armY + 1);
    addLayoutMeta(cells, {
      exits: [createPassage("top", stemX), createPassage("bottom", stemX), createPassage("left", armY), createPassage("right", armY)],
      maxBlockedExits: 1,
      partyEdges: ["left", "right", "top", "bottom"]
    });
    return;
  }

  if (template === "cross") {
    const x = randomInt(rng, 5, 7);
    const y = randomInt(rng, 3, 5);
    carveRect(cells, x, 1, x + 1, 8);
    carveRect(cells, 1, y, 12, y + 1);
    addLayoutMeta(cells, {
      exits: [createPassage("top", x), createPassage("bottom", x), createPassage("left", y), createPassage("right", y)],
      partyEdges: ["left", "right", "top", "bottom"]
    });
    return;
  }

  if (template === "corridor-room") {
    const roomOnTop = rng() < 0.5;
    const y = roomOnTop ? 6 : 2;
    carveRect(cells, 1, 4, 12, 5);
    carveRect(cells, randomInt(rng, 5, 7), y, randomInt(rng, 9, 11), roomOnTop ? 8 : 3);
    addLayoutMeta(cells, {
      exits: [createPassage("left", 4), createPassage("right", 4), createPassage(roomOnTop ? "bottom" : "top", 8)],
      maxBlockedExits: 1,
      partyEdges: ["left", "right"]
    });
    return;
  }

  if (template === "room-corridor") {
    const roomLeft = rng() < 0.5;
    if (roomLeft) {
      carveRect(cells, 1, 2, 5, 7);
      carveRect(cells, 6, 4, 12, 5);
      addLayoutMeta(cells, {
        exits: [createPassage("left", 4), createPassage("right", 4), createPassage("top", 2), createPassage("bottom", 2)],
        maxBlockedExits: 1,
        partyEdges: ["left", "right"]
      });
    } else {
      carveRect(cells, 8, 2, 12, 7);
      carveRect(cells, 1, 4, 7, 5);
      addLayoutMeta(cells, {
        exits: [createPassage("left", 4), createPassage("right", 4), createPassage("top", 9), createPassage("bottom", 9)],
        maxBlockedExits: 1,
        partyEdges: ["left", "right"]
      });
    }
  }
}

function carveTemplate(cells, template, rng) {
  if (["corridor-2", "t-junction", "cross", "corridor-room", "room-corridor"].includes(template)) {
    carveCorridorTemplate(cells, template, rng);
    return;
  }

  if (template === "pillars") {
    setCells(cells, [[5, 3], [8, 3], [5, 6], [8, 6]], "obstacle");
    return;
  }

  if (template === "split") {
    for (let y = 2; y <= 7; y += 1) {
      if (y !== 4 && y !== 5) cells[y][7] = "wall";
    }
    return;
  }

  if (template === "alcoves") {
    setCells(cells, [[3, 2], [3, 7], [10, 2], [10, 7]], "obstacle");
    return;
  }

  if (template === "columns") {
    setCells(cells, [[4, 2], [4, 7], [9, 2], [9, 7], [6, 4], [7, 5]], "obstacle");
    return;
  }

  if (template === "choke") {
    setCells(cells, [[5, 1], [5, 2], [5, 3], [5, 6], [5, 7], [5, 8], [8, 1], [8, 2], [8, 7], [8, 8]], "wall");
    setCells(cells, [[6, 4], [7, 5]], "obstacle");
    return;
  }

  if (template === "side-rooms") {
    setCells(cells, [[4, 1], [4, 2], [4, 3], [4, 6], [4, 7], [4, 8], [9, 1], [9, 2], [9, 7], [9, 8]], "wall");
    setCells(cells, [[6, 3], [7, 6]], "obstacle");
    return;
  }

  if (template === "rubble") {
    setCells(cells, [[4, 3], [5, 4], [6, 5], [7, 5], [8, 6], [9, 3], [10, 4]], "obstacle");
    return;
  }

  if (template === "webbed") {
    setCells(cells, [[3, 3], [4, 3], [8, 2], [9, 2], [6, 6], [7, 6], [10, 7]], "obstacle");
    return;
  }

  if (template === "irregular") {
    const blockers = [
      [2, 2], [11, 2], [2, 7], [11, 7],
      [6, 2 + randomInt(rng, 0, 1)],
      [9, 6 + randomInt(rng, 0, 1)]
    ];
    blockers.forEach(([x, y]) => {
      cells[y][x] = "wall";
    });
  }
}

function shufflePositions(positions, rng) {
  const shuffled = [...positions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(rng, 0, index);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function getFreePositions(cells, positions) {
  return positions.filter(([x, y]) => cells[y]?.[x] === "floor");
}

function allFreePositions(cells) {
  const positions = [];
  for (let y = 1; y < TACTICAL_HEIGHT - 1; y += 1) {
    for (let x = 1; x < TACTICAL_WIDTH - 1; x += 1) {
      if (cells[y][x] === "floor") positions.push([x, y]);
    }
  }
  return positions;
}

function placeMarkers(cells, positions, marker, count, rng) {
  let placed = 0;
  const candidates = [
    ...shufflePositions(getFreePositions(cells, positions), rng),
    ...shufflePositions(allFreePositions(cells), rng)
  ];

  for (const [x, y] of candidates) {
    if (placed >= count) break;
    if (cells[y]?.[x] === "floor") {
      cells[y][x] = marker;
      placed += 1;
    }
  }
}

function getPartyFormations() {
  const formations = [];

  for (let y = 1; y < TACTICAL_HEIGHT - 1; y += 1) {
    for (let x = 1; x < TACTICAL_WIDTH - 1; x += 1) {
      if (x <= TACTICAL_WIDTH - 3 && y <= TACTICAL_HEIGHT - 3) {
        formations.push([[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]]);
      }
      if (x <= TACTICAL_WIDTH - 5) {
        formations.push([[x, y], [x + 1, y], [x + 2, y], [x + 3, y]]);
      }
      if (y <= TACTICAL_HEIGHT - 5) {
        formations.push([[x, y], [x, y + 1], [x, y + 2], [x, y + 3]]);
      }
      if (x <= TACTICAL_WIDTH - 3 && y <= TACTICAL_HEIGHT - 3) {
        formations.push([[x, y], [x + 1, y], [x, y + 1], [x, y + 2]]);
        formations.push([[x, y], [x + 1, y], [x + 1, y + 1], [x + 1, y + 2]]);
        formations.push([[x, y], [x, y + 1], [x + 1, y + 1], [x + 2, y + 1]]);
        formations.push([[x + 2, y], [x, y + 1], [x + 1, y + 1], [x + 2, y + 1]]);
      }
    }
  }

  return formations;
}

function distanceToEdges(formation, edges) {
  return Math.min(...formation.map(([x, y]) =>
    Math.min(...edges.map((edge) => {
      if (edge === "left") return x;
      if (edge === "right") return TACTICAL_WIDTH - 1 - x;
      if (edge === "top") return y;
      return TACTICAL_HEIGHT - 1 - y;
    }))
  ));
}

function isFormationFree(cells, formation) {
  return formation.every(([x, y]) => cells[y]?.[x] === "floor");
}

function placePartyFormation(cells, rng) {
  const preferredEdges = cells.__layout?.partyEdges || ["left", "right", "top", "bottom"];
  const formations = getPartyFormations()
    .filter((formation) => isFormationFree(cells, formation))
    .sort((a, b) => distanceToEdges(a, preferredEdges) - distanceToEdges(b, preferredEdges));
  if (!formations.length) return;

  const bestDistance = distanceToEdges(formations[0], preferredEdges);
  const nearBest = formations.filter((formation) =>
    distanceToEdges(formation, preferredEdges) <= Math.min(3, bestDistance + 1)
  );
  const selected = pick(rng, nearBest.length ? nearBest : formations);

  if (selected) setCells(cells, selected, "party");
}

function getRoomPlan(rng) {
  return pick(rng, [
    {
      entrance: [[0, 4], [0, 5]],
      exit: [[13, 4], [13, 5]],
      party: [[1, 3], [1, 4], [1, 5], [1, 6], [2, 4], [2, 5]],
      enemies: [[11, 3], [11, 4], [11, 5], [11, 6], [10, 2], [10, 7], [9, 4], [9, 5]],
      traps: [[6, 4], [6, 5], [7, 3], [7, 6]],
      advantages: [[3, 2], [3, 7], [4, 4]]
    },
    {
      entrance: [[6, 9], [7, 9]],
      exit: [[6, 0], [7, 0]],
      party: [[5, 8], [6, 8], [7, 8], [8, 8], [6, 7], [7, 7]],
      enemies: [[5, 1], [6, 1], [7, 1], [8, 1], [4, 2], [9, 2], [6, 3], [7, 3]],
      traps: [[5, 5], [6, 5], [7, 4], [8, 4]],
      advantages: [[2, 6], [11, 6], [3, 4]]
    },
    {
      entrance: [[0, 2], [0, 3]],
      exit: [[13, 6], [13, 7]],
      party: [[1, 2], [1, 3], [2, 2], [2, 3], [3, 2]],
      enemies: [[11, 6], [11, 7], [10, 6], [10, 7], [9, 5], [9, 7], [8, 6]],
      traps: [[6, 4], [7, 4], [7, 5], [8, 5]],
      advantages: [[3, 5], [4, 6], [5, 2]]
    },
    {
      entrance: [[13, 2], [13, 3]],
      exit: [[0, 6], [0, 7]],
      party: [[12, 2], [12, 3], [11, 2], [11, 3], [10, 3]],
      enemies: [[2, 6], [2, 7], [3, 6], [3, 7], [4, 5], [4, 7], [5, 6]],
      traps: [[6, 4], [7, 4], [6, 5], [7, 5]],
      advantages: [[10, 6], [9, 7], [8, 2]]
    }
  ]);
}

function getEdgePassagePairs(cells) {
  const candidates = [];

  for (let x = 1; x < TACTICAL_WIDTH - 2; x += 1) {
    if (cells[1][x] === "floor" && cells[1][x + 1] === "floor") {
      candidates.push({ edge: "top", index: x, cells: [[x, 0], [x + 1, 0]] });
    }
    if (cells[TACTICAL_HEIGHT - 2][x] === "floor" && cells[TACTICAL_HEIGHT - 2][x + 1] === "floor") {
      candidates.push({ edge: "bottom", index: x, cells: [[x, TACTICAL_HEIGHT - 1], [x + 1, TACTICAL_HEIGHT - 1]] });
    }
  }

  for (let y = 1; y < TACTICAL_HEIGHT - 2; y += 1) {
    if (cells[y][1] === "floor" && cells[y + 1][1] === "floor") {
      candidates.push({ edge: "left", index: y, cells: [[0, y], [0, y + 1]] });
    }
    if (cells[y][TACTICAL_WIDTH - 2] === "floor" && cells[y + 1][TACTICAL_WIDTH - 2] === "floor") {
      candidates.push({ edge: "right", index: y, cells: [[TACTICAL_WIDTH - 1, y], [TACTICAL_WIDTH - 1, y + 1]] });
    }
  }

  return candidates;
}

function isSeparatePassage(a, b) {
  if (a.edge !== b.edge) return true;

  return Math.abs(a.index - b.index) > 2;
}

function pickPassagePairs(cells, rng, count) {
  const selected = [];
  const candidates = shufflePositions(getEdgePassagePairs(cells), rng);

  for (const candidate of candidates) {
    if (selected.length >= count) break;
    if (selected.every((other) => isSeparatePassage(candidate, other))) {
      selected.push(candidate);
    }
  }

  return selected;
}

function getInnerPassageCells(passage) {
  if (passage.edge === "top") return passage.cells.map(([x]) => [x, 1]);
  if (passage.edge === "bottom") return passage.cells.map(([x]) => [x, TACTICAL_HEIGHT - 2]);
  if (passage.edge === "left") return passage.cells.map(([, y]) => [1, y]);
  return passage.cells.map(([, y]) => [TACTICAL_WIDTH - 2, y]);
}

function placeEdgePassages(cells, rng) {
  const layoutExits = cells.__layout?.exits || null;
  const maxBlockedExits = cells.__layout?.maxBlockedExits ?? 0;
  let passages;

  if (layoutExits?.length) {
    passages = [...layoutExits];
    if (maxBlockedExits > 0 && passages.length > 2 && rng() < 0.22) {
      const blockedCount = randomInt(rng, 1, maxBlockedExits);
      const blocked = new Set(shufflePositions(passages, rng).slice(0, blockedCount));
      passages = passages.filter((passage) => !blocked.has(passage));
    }
  } else {
    const passageCount = pick(rng, [1, 2, 2, 3]);
    passages = pickPassagePairs(cells, rng, passageCount);
  }

  passages.forEach((passage) => {
    setCells(cells, [...passage.cells, ...getInnerPassageCells(passage)], "floor");
  });

  return passages;
}

function placeOptionalDoors(cells, rng, openPassages) {
  const doorPairCount = pick(rng, [0, 0, 1, 1, 2]);
  if (doorPairCount === 0) return;

  const doorCandidates = shufflePositions(openPassages, rng).slice(0, doorPairCount);
  doorCandidates.forEach((passage) => setCells(cells, passage.cells, "door"));
}

function isWalkableCell(cell) {
  return ["floor", "door", "party", "enemy", "trap", "advantage"].includes(cell);
}

function isTrapPlacementCell(cell) {
  return cell === "floor" || cell === "advantage";
}

function getMarkerPositions(cells, marker) {
  const positions = [];
  for (let y = 0; y < TACTICAL_HEIGHT; y += 1) {
    for (let x = 0; x < TACTICAL_WIDTH; x += 1) {
      if (cells[y][x] === marker) positions.push([x, y]);
    }
  }
  return positions;
}

function getCenter(positions) {
  if (!positions.length) return [Math.floor(TACTICAL_WIDTH / 2), Math.floor(TACTICAL_HEIGHT / 2)];

  const [sumX, sumY] = positions.reduce(([accX, accY], [x, y]) => [accX + x, accY + y], [0, 0]);
  return [Math.round(sumX / positions.length), Math.round(sumY / positions.length)];
}

function getEdgeCenter(passages) {
  return getCenter(passages.flatMap((passage) => passage.cells));
}

function getTrapZoneCandidates(cells, openPassages, rng) {
  const partyCenter = getCenter(getMarkerPositions(cells, "party"));
  const enemyPositions = getMarkerPositions(cells, "enemy");
  const targetCenter = enemyPositions.length ? getCenter(enemyPositions) : getEdgeCenter(openPassages);
  const midX = Math.round((partyCenter[0] + targetCenter[0]) / 2);
  const midY = Math.round((partyCenter[1] + targetCenter[1]) / 2);
  const zones = [];

  for (let y = 1; y < TACTICAL_HEIGHT - 1; y += 1) {
    zones.push(Array.from({ length: TACTICAL_WIDTH - 2 }, (_, index) => [index + 1, y]));
  }

  for (let x = 1; x < TACTICAL_WIDTH - 1; x += 1) {
    zones.push(Array.from({ length: TACTICAL_HEIGHT - 2 }, (_, index) => [x, index + 1]));
  }

  zones.push([[midX - 1, midY], [midX, midY], [midX + 1, midY], [midX, midY - 1], [midX, midY + 1]]);
  zones.push([[midX - 1, midY - 1], [midX, midY - 1], [midX + 1, midY - 1], [midX - 1, midY], [midX, midY], [midX + 1, midY]]);
  zones.push([[midX - 1, midY - 1], [midX - 1, midY], [midX - 1, midY + 1], [midX, midY - 1], [midX, midY], [midX, midY + 1]]);

  openPassages.forEach((passage) => {
    zones.push([...passage.cells, ...getInnerPassageCells(passage)]);
  });

  return shufflePositions(zones, rng)
    .map((zone) => zone.filter(([x, y]) =>
      x > 0 && y > 0 && x < TACTICAL_WIDTH - 1 && y < TACTICAL_HEIGHT - 1 && isTrapPlacementCell(cells[y][x])
    ))
    .filter((zone) => zone.length >= 2)
    .sort((a, b) => {
      const aCenter = getCenter(a);
      const bCenter = getCenter(b);
      const aScore = Math.abs(aCenter[0] - midX) + Math.abs(aCenter[1] - midY);
      const bScore = Math.abs(bCenter[0] - midX) + Math.abs(bCenter[1] - midY);
      return aScore - bScore;
    });
}

function placeTrapZone(cells, openPassages, trapCount, rng) {
  if (trapCount <= 0) return;

  const targetSize = randomInt(rng, 3, 7);
  const candidates = getTrapZoneCandidates(cells, openPassages, rng);
  const selected = candidates.find((zone) => zone.length >= targetSize) || candidates[0];

  if (!selected) return;

  setCells(cells, selected.slice(0, Math.min(selected.length, targetSize)), "trap");
}

function getWalkablePositions(cells) {
  const positions = [];
  for (let y = 0; y < TACTICAL_HEIGHT; y += 1) {
    for (let x = 0; x < TACTICAL_WIDTH; x += 1) {
      if (isWalkableCell(cells[y][x])) positions.push([x, y]);
    }
  }
  return positions;
}

function getNeighbors([x, y]) {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1]
  ].filter(([nextX, nextY]) =>
    nextX >= 0 && nextY >= 0 && nextX < TACTICAL_WIDTH && nextY < TACTICAL_HEIGHT
  );
}

function keyOf([x, y]) {
  return `${x},${y}`;
}

function floodWalkable(cells, start) {
  const visited = new Set([keyOf(start)]);
  const queue = [start];

  while (queue.length) {
    const current = queue.shift();
    getNeighbors(current).forEach(([x, y]) => {
      const key = `${x},${y}`;
      if (visited.has(key) || !isWalkableCell(cells[y][x])) return;
      visited.add(key);
      queue.push([x, y]);
    });
  }

  return visited;
}

function findNearestConnectedPosition(disconnected, connected) {
  let best = null;
  let bestDistance = Infinity;

  connected.forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    const distance = Math.abs(disconnected[0] - x) + Math.abs(disconnected[1] - y);
    if (distance < bestDistance) {
      best = [x, y];
      bestDistance = distance;
    }
  });

  return best;
}

function carveLine(cells, from, to) {
  let [x, y] = from;
  const [targetX, targetY] = to;

  while (x !== targetX) {
    if (!isWalkableCell(cells[y][x])) cells[y][x] = "floor";
    x += x < targetX ? 1 : -1;
  }

  while (y !== targetY) {
    if (!isWalkableCell(cells[y][x])) cells[y][x] = "floor";
    y += y < targetY ? 1 : -1;
  }

  if (!isWalkableCell(cells[y][x])) cells[y][x] = "floor";
}

function normalizeTacticalConnectivity(cells) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const walkable = getWalkablePositions(cells);
    if (!walkable.length) return;

    const connected = floodWalkable(cells, walkable[0]);
    if (connected.size === walkable.length) return;

    const disconnected = walkable.find((position) => !connected.has(keyOf(position)));
    const target = findNearestConnectedPosition(disconnected, connected);
    if (!target) return;

    carveLine(cells, disconnected, target);
  }
}

function createTacticalMap({ encounterNode, floor, rng, sceneEffects = [] }) {
  if (!encounterNode?.resolvedEncounter?.items?.length) return null;

  const enemyCount = getEncounterEnemyCount(encounterNode);
  const trapCount = hasTrap(encounterNode) ? 1 : 0;
  const hasAdvantage = sceneEffects.some((effect) => effect.type === "partyAdvantage");
  const cells = createEmptyTacticalMap();
  const templates = floor >= 7
    ? ["pillars", "split", "alcoves", "irregular", "columns", "choke", "side-rooms", "rubble", "webbed", "corridor-2", "t-junction", "cross", "corridor-room", "room-corridor"]
    : ["pillars", "split", "alcoves", "columns", "choke", "side-rooms", "rubble", "corridor-2", "t-junction", "cross", "corridor-room", "room-corridor"];
  const template = pick(rng, templates);
  const plan = getRoomPlan(rng);

  carveTemplate(cells, template, rng);
  const openPassages = placeEdgePassages(cells, rng);
  placeOptionalDoors(cells, rng, openPassages);

  placePartyFormation(cells, rng);
  placeMarkers(cells, plan.enemies, "enemy", enemyCount, rng);
  placeTrapZone(cells, openPassages, trapCount, rng);

  if (hasAdvantage) {
    placeMarkers(cells, plan.advantages, "advantage", 2, rng);
  }

  normalizeTacticalConnectivity(cells);

  return {
    cells: cells.flat(),
    enemyCount,
    height: TACTICAL_HEIGHT,
    template,
    trapCount,
    width: TACTICAL_WIDTH
  };
}

function createSceneEffect(detail) {
  if (detail.includes("Sangue ainda fresco")) {
    return {
      label: "Próximo encontro: inimigos entram feridos",
      type: "enemyWounded",
      value: 0.75,
      note: "Aplique PV inicial em 75% para cada inimigo gerado."
    };
  }

  if (detail.includes("Som de patrulha") || detail.includes("Teias, ossos") || detail.includes("menos surpreendente")) {
    return {
      label: "Próximo encontro: grupo começa em posição de vantagem",
      type: "partyAdvantage",
      note: "O mapa inclui posições claras de vantagem para o grupo."
    };
  }

  return null;
}

export function createExtendedExplorationState(profile, rng = Math.random) {
  let activeProfile = profile;
  let activeRng = rng;
  let floor = activeProfile.floors[0];
  let phase = "exploring";
  let successes = 0;
  let failures = 0;
  let usedApproachIds = new Set();
  let currentResult = null;
  let currentResults = [];
  let finalEncounter = null;
  let log = [];
  let elapsedMinutes = 0;
  let pendingSceneEffects = [];

  function addLog(message, kind) {
    log = [createLogEntry(message, kind), ...log].slice(0, INITIAL_LOG_LIMIT);
  }

  function resetFloorProgress(message = "O grupo retornou ao início do andar.") {
    successes = 0;
    failures = 0;
    usedApproachIds = new Set();
    currentResult = null;
    currentResults = [];
    finalEncounter = null;
    pendingSceneEffects = [];
    phase = floor === 10 ? "boss" : "exploring";
    addLog(message, "reset");
  }

  function createFinalEncounter() {
    const tier = getTier(activeProfile, floor);
    const categoryId = tier?.finalEncounterCategory || "medium";
    const category = getCategory(activeProfile, categoryId);
    const challenge = getCategoryChallenge(category, tier);

    const seedSuffix = `final-${Date.now()}-${randomInt(activeRng, 1, 9999)}`;
    const encounterNode = createEncounterNode({
      categoryId,
      categoryLabel: `${category.label} final`,
      challenge,
      floor,
      profile: activeProfile,
      rng: activeRng,
      seedSuffix
    });

    return {
      categoryId,
      categoryLabel: category.label,
      challenge,
      detail: `Encontro obrigatório de fechamento do ${tier?.label || `andar ${floor}`}.`,
      encounterNode,
      sceneEffects: [],
      title: `${category.label} final`,
      tacticalMap: createTacticalMap({ encounterNode, floor, rng: activeRng })
    };
  }

  function enterFloor(nextFloor) {
    floor = nextFloor;
    successes = 0;
    failures = 0;
    usedApproachIds = new Set();
    currentResult = null;
    currentResults = [];
    finalEncounter = null;
    pendingSceneEffects = [];
    phase = floor === 10 ? "boss" : "exploring";
    addLog(
      floor === 10
        ? "O grupo alcançou a sala da Matriarca Aracnídea."
        : `O grupo entrou no andar ${floor}.`,
      "floor"
    );
  }

  function initialize(nextProfile, nextFloor, nextRng, sessionState = null) {
    activeProfile = nextProfile;
    activeRng = nextRng || Math.random;

    if (sessionState) {
      floor = sessionState.floor || nextFloor || activeProfile.floors[0];
      phase = sessionState.phase || (floor === 10 ? "boss" : "exploring");
      successes = sessionState.successes || 0;
      failures = sessionState.failures || 0;
      usedApproachIds = new Set(sessionState.usedApproachIds || sessionState.usedSuccessfulSkills || []);
      currentResult = sessionState.currentResult || null;
      currentResults = sessionState.currentResults || (currentResult ? [currentResult] : []);
      finalEncounter = sessionState.finalEncounter || null;
      log = sessionState.log || [];
      elapsedMinutes = sessionState.elapsedMinutes || 0;
      pendingSceneEffects = sessionState.pendingSceneEffects || [];
      return;
    }

    floor = nextFloor || activeProfile.floors[0];
    phase = floor === 10 ? "boss" : "exploring";
    successes = 0;
    failures = 0;
    usedApproachIds = new Set();
    currentResult = null;
    currentResults = [];
    finalEncounter = null;
    log = [];
    elapsedMinutes = 0;
    pendingSceneEffects = [];
    addLog(
      phase === "boss"
        ? "A exploração começa na sala da Matriarca Aracnídea."
        : `Exploração iniciada no andar ${floor}.`,
      "floor"
    );
  }

  function resolveD100(manualRoll = undefined) {
    const tier = getTier(activeProfile, floor);
    const clampedManualRoll = clampRoll(manualRoll);
    const roll = clampedManualRoll ?? randomInt(activeRng, 1, 100);
    const rollSource = clampedManualRoll === null ? "automatic" : "manual";
    const range = getD100Range(tier, roll);
    const categoryId = range?.category || "explorationEvent";
    const category = getCategory(activeProfile, categoryId);
    const challenge = getCategoryChallenge(category, tier);
    const detail = createSceneDetail(activeProfile, categoryId, activeRng);
    const seedSuffix = `d100-${roll}-${Date.now()}-${randomInt(activeRng, 1, 9999)}`;
    const sceneEffect = createSceneEffect(detail);
    let sceneEffects = [];
    let encounterNode = null;

    if (sceneEffect) {
      pendingSceneEffects.push(sceneEffect);
      addLog(`Estado aplicado: ${sceneEffect.label}.`, "state");
    }

    if (COMBAT_CATEGORIES.has(categoryId) || categoryId === "obstacle") {
      sceneEffects = pendingSceneEffects.filter((effect) =>
        effect.type === "enemyWounded" || effect.type === "partyAdvantage"
      );
      pendingSceneEffects = pendingSceneEffects.filter((effect) =>
        !sceneEffects.includes(effect)
      );
      encounterNode = createEncounterNode({
        categoryId,
        categoryLabel: category.label,
        challenge,
        floor,
        profile: activeProfile,
        rng: activeRng,
        seedSuffix
      });
    }

    currentResult = {
      categoryId,
      categoryLabel: category.label,
      challenge,
      detail,
      encounterNode,
      id: seedSuffix,
      roll,
      rollSource,
      sceneEffects,
      tacticalMap: createTacticalMap({ encounterNode, floor, rng: activeRng, sceneEffects }),
      tierId: tier?.id,
      tierLabel: tier?.label
    };

    const challengeText = challenge > 0 ? `, ND ${formatChallengeRating(challenge)}` : "";
    addLog(`d100 ${roll} (${rollSource === "manual" ? "manual" : "automático"}): ${category.label}${challengeText}. ${detail}`, "roll");
    sceneEffects.forEach((effect) => addLog(`Estado consumido no encontro: ${effect.label}.`, "state"));

    return currentResult;
  }

  function completeSuccess(approach) {
    if (usedApproachIds.has(approach.id)) {
      addLog(`${approach.label} já foi usada neste andar. Escolha outra ação.`, "warning");
      return false;
    }

    successes += 1;
    usedApproachIds.add(approach.id);
    addLog(getApproachNarrative(approach, "success"), "info");
    addLog(`${approach.label}: sucesso (${successes}/${getFloorRules(activeProfile, floor).successesRequired}).`, "success");

    const rules = getFloorRules(activeProfile, floor);
    if (successes >= rules.successesRequired) {
      successes = rules.successesRequired;
      phase = "floorEncounter";
      finalEncounter = createFinalEncounter();
      addLog("A saída foi encontrada. Resolva o encontro final antes de avançar.", "final");
    }

    return true;
  }

  function applyOutcome(outcome, approachId, manualRolls = []) {
    if (phase !== "exploring") return;

    const rules = getFloorRules(activeProfile, floor);
    const approach = getFloorApproaches(activeProfile, floor).find((candidate) => candidate.id === approachId)
      || getApproach(activeProfile, approachId);

    if (usedApproachIds.has(approach.id)) {
      addLog(`${approach.label} já foi usada neste andar. Escolha outra ação.`, "warning");
      return;
    }

    if (outcome === "success" || outcome === "criticalSuccess") {
      const changed = completeSuccess(approach);
      if (!changed) return;

      const explorationMinutes = getExplorationMinutes(activeProfile, floor, approach);
      elapsedMinutes += explorationMinutes;
      addLog(`${approach.label}: ${explorationMinutes}min de exploração.`, "time");

      if (outcome === "criticalSuccess" && failures > 0) {
        failures -= 1;
        addLog("Sucesso superior: removeu 1 falha acumulada.", "success");
      }

      return;
    }

    const explorationMinutes = getExplorationMinutes(activeProfile, floor, approach);
    elapsedMinutes += explorationMinutes;
    addLog(`${approach.label}: ${explorationMinutes}min de exploração.`, "time");

    usedApproachIds.add(approach.id);
    addLog(getApproachNarrative(approach, outcome), "info");
    failures += 1;
    addLog(`${approach.label}: falha (${failures}/${rules.failureLimit}).`, "failure");

    const rollCount = outcome === "criticalFailure" ? 2 : 1;
    currentResults = [];
    for (let index = 0; index < rollCount; index += 1) {
      const result = resolveD100(manualRolls[index]);
      currentResults.push(result);
    }
    currentResult = currentResults[currentResults.length - 1] || null;

    if (failures >= rules.failureLimit) {
      resetFloorProgress("Falhas demais: o grupo retornou ao início do andar e zerou o progresso.");
    }
  }

  function resolveFinalEncounter() {
    if (phase !== "floorEncounter") return;

    phase = "readyToAdvance";
    addLog("Encontro final resolvido. O próximo andar está liberado.", "final");
  }

  function advanceFloor() {
    if (phase !== "readyToAdvance") return;

    enterFloor(Math.min(floor + 1, 10));
  }

  function rerollTacticalMap(target = "current") {
    const scene = target === "final"
      ? finalEncounter
      : currentResults.find((result) => result.id === target) || currentResult;

    if (!scene?.encounterNode?.resolvedEncounter?.items?.length) return;

    scene.tacticalMap = createTacticalMap({
      encounterNode: scene.encounterNode,
      floor,
      rng: activeRng,
      sceneEffects: scene.sceneEffects || []
    });
    addLog("Mapa tático regerado para a cena atual.", "state");
  }

  function getBossEncounter() {
    const boss = activeProfile.extendedExploration.boss;

    return {
      creatureId: boss.creatureId,
      supportCreatureId: boss.supportCreatureId,
      reward: boss.reward,
      title: "Sala da Matriarca Aracnídea",
      challengeLabel: boss.challengeOptions.map(formatChallengeRating).join(" ou ")
    };
  }

  function exportSessionState() {
    return {
      currentResult,
      currentResults,
      elapsedMinutes,
      failures,
      finalEncounter,
      floor,
      log,
      pendingSceneEffects,
      phase,
      successes,
      usedApproachIds: [...usedApproachIds],
      usedSuccessfulSkills: [...usedApproachIds]
    };
  }

  function getSnapshot() {
    const rules = getFloorRules(activeProfile, floor);
    const tier = getTier(activeProfile, floor);
    const rulesWithTime = rules
      ? {
        ...rules,
        baseMinutes: activeProfile.extendedExploration.baseMinutesByFloor?.[floor] || 10
      }
      : null;

    return {
      approaches: getFloorApproaches(activeProfile, floor),
      bossEncounter: phase === "boss" ? getBossEncounter() : null,
      currentResult,
      currentResults,
      elapsedMinutes,
      failures,
      finalEncounter,
      floor,
      log,
      pendingSceneEffects,
      phase,
      rules: rulesWithTime,
      successes,
      tier,
      usedApproachIds: [...usedApproachIds],
      usedApproachLabels: getUsedApproachLabels(activeProfile, floor, usedApproachIds),
      usedSuccessfulSkills: getUsedApproachLabels(activeProfile, floor, usedApproachIds)
    };
  }

  return {
    advanceFloor,
    applyOutcome,
    exportSessionState,
    getElapsedMinutes: () => elapsedMinutes,
    getSnapshot,
    initialize,
    resolveD100,
    resolveFinalEncounter,
    rerollTacticalMap
  };
}
