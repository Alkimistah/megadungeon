import { formatChallengeRating } from "./challenge.js";
import { assignCreatureProfile } from "./creatures.js";
import { getCreatureById } from "./creatureCatalog/index.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { pick, randomInt } from "./random.js";
import { assignTrapProfile } from "./traps.js";

const INITIAL_LOG_LIMIT = 40;
const COMBAT_CATEGORIES = new Set(["easy", "medium", "hard"]);
const TACTICAL_WIDTH = 14;
const TACTICAL_HEIGHT = 10;
const BOSS_TACTICAL_WIDTH = 20;
const BOSS_TACTICAL_HEIGHT = 14;
const MENTAL_SOCIAL_SKILLS = ["Conhecimento", "Diplomacia", "Enganação", "Intimidação", "Intuição", "Misticismo", "Nobreza", "Religião", "Vontade"];
const SUBSTANCE_TRACE_SKILLS = ["Cura", "Investigação", "Ladinagem", "Misticismo", "Ofício", "Percepção", "Sobrevivência"];

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

function getGravityDamageDice(floor) {
  if (floor <= 2) return "1d6";
  if (floor <= 4) return "2d6";
  if (floor <= 6) return "3d6";
  return "4d6";
}

function getFloorName(floor) {
  return {
    1: "primeiro andar",
    2: "segundo andar",
    3: "terceiro andar",
    4: "quarto andar",
    5: "quinto andar",
    6: "sexto andar",
    7: "sétimo andar",
    8: "oitavo andar",
    9: "nono andar",
    10: "décimo andar"
  }[floor] || `andar ${floor}`;
}

function getFloorArrivalLog(floor, isInitial = false, rng = Math.random) {
  if (floor === 10) {
    return isInitial
      ? "A jornada começa diante da câmara final: fios grossos, casulos e silêncio anunciam a presença da Matriarca Aracnídea."
      : "O grupo desce até o décimo andar, onde a masmorra se abre no covil da Matriarca Aracnídea.";
  }

  if (isInitial || floor === 1) {
    return "O grupo entra na masmorra, começando sua jornada no primeiro andar.";
  }

  return pick(rng, [
    `O grupo desce mais profundamente na masmorra, chegando ao ${getFloorName(floor)}.`,
    `A escadaria termina em corredores mais escuros: o grupo alcança o ${getFloorName(floor)}.`,
    `A masmorra engole mais alguns passos, e o grupo chega ao ${getFloorName(floor)}.`
  ]);
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
    ? `${prefix} A leitura se confirma, e a masmorra cede alguns metros de caminho.`
    : `${prefix} O caminho parece promissor por um instante, mas a masmorra distorce a rota.`;
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
    const detail = pick(rng, table);

    if (detail.includes("Corredor troca de lugar")) {
      return pick(rng, [
        "Corredor troca de lugar: as paredes apagam a rota mapeada e removem 1 sucesso do progresso do andar.",
        "Corredor troca de lugar: a mudança revela um atalho improvável e adiciona 1 sucesso ao progresso do andar."
      ]);
    }

    if (detail.includes("Cheiro de ácido, sangue ou ferrugem")) {
      return pick(rng, [
        "Cheiro de ácido: o odor corrosivo denuncia perigo químico ou passagem recém-aberta, reduzindo em 2 a dificuldade do próximo teste apropriado.",
        "Cheiro de sangue: o rastro metálico conduz a sinais recentes, reduzindo em 2 a dificuldade do próximo teste apropriado.",
        "Cheiro de ferrugem: o ar denuncia metal velho, mecanismo ou armadilha, reduzindo em 2 a dificuldade do próximo teste apropriado."
      ]);
    }

    return detail;
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

function distanceBetween([x1, y1], [x2, y2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function clearMarker(cells, marker) {
  getMarkerPositions(cells, marker).forEach(([x, y]) => {
    cells[y][x] = "floor";
  });
}

function getThreatPositions(cells) {
  const priority = ["trap", "pit", "mechanism", "enemy", "web", "difficult", "reinforcement"];

  for (const marker of priority) {
    const positions = getMarkerPositions(cells, marker);
    if (positions.length) return positions;
  }

  return [];
}

function isAdjacentToAny(position, targets) {
  return targets.some((target) => distanceBetween(position, target) === 1);
}

function placePartyAdjacentToThreat(cells, rng) {
  const threats = getThreatPositions(cells);
  if (!threats.length) return;

  clearMarker(cells, "party");
  const formations = shufflePositions(getPartyFormations(), rng)
    .filter((formation) =>
      isFormationFree(cells, formation) && formation.some((position) => isAdjacentToAny(position, threats))
    );

  if (formations.length) {
    setCells(cells, formations[0], "party");
    return;
  }

  placePartyFormation(cells, rng);
}

function isolatePartyMarker(cells, rng) {
  const partyPositions = getMarkerPositions(cells, "party");
  if (partyPositions.length < 2) return;

  const remaining = partyPositions.slice(0, -1);
  const [removedX, removedY] = partyPositions[partyPositions.length - 1];
  cells[removedY][removedX] = "floor";

  const candidates = shufflePositions(allFreePositions(cells), rng)
    .map((position) => ({
      distance: Math.min(...remaining.map((partyPosition) => distanceBetween(position, partyPosition))),
      position
    }))
    .sort((a, b) => b.distance - a.distance);
  const selected = candidates.find((candidate) => candidate.distance >= 4) || candidates[0];

  if (selected) {
    const [x, y] = selected.position;
    cells[y][x] = "party";
  } else {
    cells[removedY][removedX] = "party";
  }
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
  return ["floor", "door", "party", "enemy", "trap", "web", "difficult", "mechanism", "objective", "reinforcement", "advantage"].includes(cell);
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

function normalizeTag(tag) {
  return String(tag || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function trapHasAnyTag(trap, tags) {
  const normalizedTags = (trap?.tags || []).map(normalizeTag);
  const normalizedName = normalizeTag(`${trap?.id || ""} ${trap?.name || ""}`);

  return tags.some((tag) =>
    normalizedTags.includes(normalizeTag(tag)) || normalizedName.includes(normalizeTag(tag))
  );
}

function hasArachnidCreature(encounterNode) {
  return Boolean(encounterNode?.resolvedEncounter?.items?.some((item) =>
    item.kind === "creature" && normalizeTag(`${item.creatureId || ""} ${item.name || ""}`).includes("aranh")
  ));
}

function getTacticalThreatKind(encounterNode) {
  const trap = encounterNode?.trap;

  if (trapHasAnyTag(trap, ["fosso", "queda", "estacas"])) return "pit";
  if (trapHasAnyTag(trap, ["lamina", "pendulo", "corte", "multiplos ataques"])) return "blade";
  if (trapHasAnyTag(trap, ["virote", "projetil", "perfuracao"])) return "projectile";
  if (trapHasAnyTag(trap, ["magica", "runa", "simbolo"])) return "rune";
  if (trapHasAnyTag(trap, ["gas", "veneno", "nuvem"])) return "gas";
  if (trapHasAnyTag(trap, ["impacto", "bloco", "desabamento"])) return "rubble";
  if (trapHasAnyTag(trap, ["rede", "agarrado", "teia"])) return "web";
  if (hasArachnidCreature(encounterNode)) return "webCombat";

  return trap ? "generic" : "none";
}

function setCellsIfOpen(cells, positions, marker) {
  positions.forEach(([x, y]) => {
    if (["floor", "trap", "web", "difficult", "advantage"].includes(cells[y]?.[x])) {
      cells[y][x] = marker;
    }
  });
}

function getThreatCenter(cells, openPassages) {
  const partyCenter = getCenter(getMarkerPositions(cells, "party"));
  const enemyPositions = getMarkerPositions(cells, "enemy");
  const targetCenter = enemyPositions.length ? getCenter(enemyPositions) : getEdgeCenter(openPassages);

  return [
    Math.min(Math.max(Math.round((partyCenter[0] + targetCenter[0]) / 2), 2), TACTICAL_WIDTH - 3),
    Math.min(Math.max(Math.round((partyCenter[1] + targetCenter[1]) / 2), 2), TACTICAL_HEIGHT - 3)
  ];
}

function placePitThreat(cells, openPassages) {
  const [centerX, centerY] = getThreatCenter(cells, openPassages);
  const horizontal = centerY >= 3 && centerY <= TACTICAL_HEIGHT - 4;
  const pitCells = horizontal
    ? Array.from({ length: TACTICAL_WIDTH - 4 }, (_, index) => [index + 2, centerY])
    : Array.from({ length: TACTICAL_HEIGHT - 4 }, (_, index) => [centerX, index + 2]);

  setCellsIfOpen(cells, pitCells, "pit");
}

function placeBladeThreat(cells, openPassages) {
  const [centerX, centerY] = getThreatCenter(cells, openPassages);
  const bladeCells = [
    [centerX, centerY],
    [centerX + 1, centerY],
    [centerX, centerY + 1]
  ];

  setCellsIfOpen(cells, bladeCells, "trap");
}

function placeProjectileThreat(cells, openPassages) {
  const [centerX, centerY] = getThreatCenter(cells, openPassages);
  const wallX = centerX < TACTICAL_WIDTH / 2 ? TACTICAL_WIDTH - 2 : 1;
  const lineStart = Math.min(wallX, centerX);
  const lineEnd = Math.max(wallX, centerX);

  setCellsIfOpen(
    cells,
    Array.from({ length: lineEnd - lineStart + 1 }, (_, index) => [lineStart + index, centerY]),
    "trap"
  );
  setCellsIfOpen(cells, [[wallX, centerY]], "mechanism");
}

function placeAreaThreat(cells, openPassages, marker = "trap") {
  const [centerX, centerY] = getThreatCenter(cells, openPassages);
  const area = [
    [centerX - 1, centerY - 1], [centerX, centerY - 1],
    [centerX - 1, centerY], [centerX, centerY]
  ];

  setCellsIfOpen(cells, area, marker);
}

function placeRubbleThreat(cells, openPassages) {
  const [centerX, centerY] = getThreatCenter(cells, openPassages);
  const rubble = [
    [centerX - 1, centerY], [centerX, centerY], [centerX + 1, centerY],
    [centerX, centerY - 1], [centerX, centerY + 1]
  ];

  setCellsIfOpen(cells, rubble.slice(0, 2), "obstacle");
  setCellsIfOpen(cells, rubble.slice(2), "difficult");
}

function placeWebThreat(cells, openPassages, rng, includeEgg = false) {
  const [centerX, centerY] = getThreatCenter(cells, openPassages);
  const web = [];

  for (let y = centerY - 1; y <= centerY + 1; y += 1) {
    for (let x = centerX - 1; x <= centerX + 1; x += 1) {
      web.push([x, y]);
    }
  }

  setCellsIfOpen(cells, web, "web");
  if (includeEgg) setCellsIfOpen(cells, [[centerX, centerY]], "reinforcement");

  const extra = shufflePositions(allFreePositions(cells), rng).slice(0, 4);
  setCellsIfOpen(cells, extra, "web");
}

function placeThreatFeature(cells, { encounterNode, floor, openPassages, trapCount, rng }) {
  const threatKind = getTacticalThreatKind(encounterNode);

  if (threatKind === "none") return;
  if (threatKind === "pit") return placePitThreat(cells, openPassages);
  if (threatKind === "blade") return placeBladeThreat(cells, openPassages);
  if (threatKind === "projectile") return placeProjectileThreat(cells, openPassages);
  if (threatKind === "rune") return placeAreaThreat(cells, openPassages, "mechanism");
  if (threatKind === "gas") return placeAreaThreat(cells, openPassages, "trap");
  if (threatKind === "rubble") return placeRubbleThreat(cells, openPassages);
  if (threatKind === "web") return placeWebThreat(cells, openPassages, rng, true);
  if (threatKind === "webCombat") {
    return placeWebThreat(cells, openPassages, rng, threatKind === "webCombat");
  }

  return placeTrapZone(cells, openPassages, trapCount, rng);
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
  const hasIsolatedParty = sceneEffects.some((effect) => effect.type === "isolatedParty");
  const hasAdjacentThreat = sceneEffects.some((effect) => effect.type === "partyAdjacentToThreat");
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

  if (hasAdvantage) {
    placeMarkers(cells, plan.advantages, "advantage", 2, rng);
  }

  normalizeTacticalConnectivity(cells);
  placeThreatFeature(cells, { encounterNode, floor, openPassages, trapCount, rng });
  if (hasAdjacentThreat) placePartyAdjacentToThreat(cells, rng);
  if (hasIsolatedParty) isolatePartyMarker(cells, rng);

  return {
    cells: cells.flat(),
    enemyCount,
    height: TACTICAL_HEIGHT,
    template,
    trapCount,
    width: TACTICAL_WIDTH
  };
}

// Mapas preset dos encontros finais: um caractere por célula, legenda no
// arquivo de dados do perfil (dungeon1to10FinalEncounters.js).
const PRESET_CELL_BY_CODE = {
  "#": "wall",
  ".": "floor",
  "P": "party",
  "E": "enemy",
  "H": "hidden",
  "T": "trap",
  "X": "pit",
  "W": "web",
  "D": "difficult",
  "M": "mechanism",
  "O": "objective",
  "d": "door",
  "V": "advantage",
  "B": "boss",
  "C": "obstacle",
  "R": "reinforcement"
};

function createPresetTacticalMap(template, { enemyCount = 0, trapCount = 0 } = {}) {
  if (!template?.length) return null;

  const height = template.length;
  const width = Math.max(...template.map((row) => row.length));
  const cells = [];
  for (let y = 0; y < height; y += 1) {
    const row = template[y] || "";
    for (let x = 0; x < width; x += 1) {
      cells.push(PRESET_CELL_BY_CODE[row[x]] || "floor");
    }
  }

  return {
    cells,
    enemyCount,
    height,
    preset: true,
    template: "preset",
    trapCount,
    width
  };
}

function createBossTacticalMap() {
  const cells = Array.from({ length: BOSS_TACTICAL_HEIGHT }, (_, y) =>
    Array.from({ length: BOSS_TACTICAL_WIDTH }, (_, x) =>
      x === 0 || y === 0 || x === BOSS_TACTICAL_WIDTH - 1 || y === BOSS_TACTICAL_HEIGHT - 1 ? "wall" : "floor"
    )
  );
  const webCenters = [[2, 2], [17, 2], [2, 11], [17, 11]];

  setCells(cells, [[0, 6], [0, 7]], "door");
  setCells(cells, [[19, 6], [19, 7]], "door");
  setCells(cells, [[1, 6], [2, 6], [1, 7], [2, 7]], "party");
  setCells(cells, [
    [4, 4], [8, 4], [11, 4], [15, 4],
    [4, 9], [8, 9], [11, 9], [15, 9]
  ], "obstacle");

  for (let y = 5; y <= 8; y += 1) {
    for (let x = 12; x <= 15; x += 1) {
      cells[y][x] = "web";
    }
  }
  setCells(cells, [[13, 6], [14, 6], [13, 7], [14, 7]], "boss");
  setCells(cells, [
    [17, 6], [18, 6], [17, 7], [18, 7],
    [5, 5], [6, 5], [5, 6], [6, 6],
    [10, 2], [11, 2], [10, 3], [11, 3],
    [8, 11], [9, 11], [8, 12], [9, 12],
    [9, 8], [10, 8], [9, 9], [10, 9]
  ], "web");

  webCenters.forEach(([centerX, centerY]) => {
    for (let y = centerY - 1; y <= centerY + 1; y += 1) {
      for (let x = centerX - 1; x <= centerX + 1; x += 1) {
        cells[y][x] = "web";
      }
    }
    cells[centerY][centerX] = "reinforcement";
  });

  return {
    cells: cells.flat(),
    enemyCount: 2,
    height: BOSS_TACTICAL_HEIGHT,
    preset: true,
    template: "boss-arachnid-arena",
    trapCount: webCenters.length,
    width: BOSS_TACTICAL_WIDTH
  };
}

function createBossEncounterNode(profile, floor, boss) {
  const encounterNode = {
    id: `extended-${floor}-boss`,
    encounterSeed: `extended-${floor}-boss`,
    type: "boss",
    label: "Sala da Matriarca Aracnídea",
    short: "B",
    level: floor,
    column: 0,
    environment: {
      terrain: {
        name: "Covil aracnídeo",
        effect: "Sala ampla fechada da masmorra, tomada por teias espessas, ovos e pilares.",
        features: []
      },
      climate: []
    },
    challenge: {
      climate: 0,
      encounter: boss.challengeOptions?.[0] || 4,
      terrain: 0,
      total: boss.challengeOptions?.[0] || 4
    },
    creature: null,
    trap: null,
    fixedComposition: {
      creatures: [
        { id: boss.creatureId, quantity: 1 },
        { id: boss.supportCreatureId, quantity: 1 }
      ],
      traps: []
    },
    resolvedEncounter: null
  };

  resolveNodeEncounter(encounterNode, { mapSeed: `extended-floor-${floor}` });

  return encounterNode;
}

function createSceneEffect(detail) {
  if (detail.includes("Sangue ainda fresco")) {
    return {
      label: "Rastro de sangue fresco: a próxima criatura entra ferida",
      type: "enemyWounded",
      value: 0.75,
      note: "Os sinais apontam para uma luta recente. Aplique PV inicial em 75% para cada inimigo gerado."
    };
  }

  if (detail.includes("Som de patrulha") || detail.includes("Teias, ossos") || detail.includes("menos surpreendente")) {
    return {
      label: "O grupo antecipa o perigo: próxima cena começa com vantagem",
      type: "partyAdvantage",
      note: "A ameaça deixa sinais suficientes para preparação. O mapa inclui posições claras de vantagem para o grupo."
    };
  }

  if (detail.includes("Passagem estreita")) {
    return {
      label: "A passagem aperta: um personagem começa isolado na próxima cena",
      type: "isolatedParty",
      note: "O grupo atravessa em fila e perde coesão. O mapa posiciona 1 marcador do grupo separado dos demais."
    };
  }

  if (detail.includes("Cristais falsos brilham")) {
    return {
      label: "Cristais falsos atraem o grupo para perto da ameaça",
      type: "partyAdjacentToThreat",
      note: "O brilho funciona como isca. O mapa posiciona o grupo adjacente à criatura, armadilha ou ameaça principal."
    };
  }

  return null;
}

function createImmediateSceneEffect(detail, profile, floor) {
  if (detail.includes("Sala se reconstrói sozinha") || detail.includes("remove 1 sucesso")) {
    return {
      label: "A sala se reconstrói e apaga parte da rota",
      type: "loseSuccess",
      value: 1
    };
  }

  if (detail.includes("adiciona 1 sucesso") || detail.includes("Corredor encurta")) {
    return {
      label: "Um atalho se revela entre os corredores",
      type: "gainSuccess",
      value: 1
    };
  }

  if (detail.includes("Rota circular evidente")) {
    return {
      label: "A rota circular finalmente faz sentido",
      type: "removeFailure",
      value: 1
    };
  }

  if (detail.includes("Gravidade falha por instantes")) {
    const dc = getFloorRules(profile, floor)?.baseDc || 10;
    const damage = getGravityDamageDice(floor);

    return {
      label: `A gravidade falha: teste de Reflexos DC ${dc}`,
      type: "sceneInstruction",
      note: `O chão foge sob os pés por um instante. Cada personagem faz teste de Reflexos DC ${dc}; em falha, sofre ${damage} de dano.`
    };
  }

  if (detail.includes("Parede respira lentamente")) {
    const dc = getFloorRules(profile, floor)?.baseDc || 10;

    return {
      label: `A parede respira: teste de Fortitude DC ${dc}`,
      type: "sceneInstruction",
      note: `A pedra pulsa como carne viva. O grupo faz teste de Fortitude DC ${dc}; em falha, fica enjoado no próximo combate.`
    };
  }

  return null;
}

function createTestEffectId(type) {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createPendingTestEffect(detail, currentFloor) {
  if (detail.includes("Vozes repetem frases do grupo")) {
    return {
      id: createTestEffectId("voices"),
      label: "As vozes da masmorra confundem o próximo teste: dificuldade +1",
      type: "testModifier",
      dcModifier: 1,
      skills: MENTAL_SOCIAL_SKILLS,
      note: "As paredes devolvem frases do grupo em tons errados. Aplica-se ao próximo teste mental ou social relevante."
    };
  }

  if (detail.includes("Sombras agem com atraso")) {
    return {
      id: createTestEffectId("delayed-shadows"),
      label: "As sombras se atrasam e traem os sentidos: dificuldade +1",
      type: "testModifier",
      dcModifier: 1,
      skills: ["Intuição", "Vontade"],
      note: "Os movimentos não batem com os reflexos na parede. Aplica-se ao próximo teste de Intuição ou Vontade."
    };
  }

  if (detail.includes("Cheiro de ácido") || detail.includes("Cheiro de sangue") || detail.includes("Cheiro de ferrugem")) {
    return {
      id: createTestEffectId("trace-scent"),
      label: `${detail.split(":")[0]} guia o caminho: dificuldade -2`,
      type: "testModifier",
      dcModifier: -2,
      skills: SUBSTANCE_TRACE_SKILLS,
      note: "O odor denuncia algo que a pedra tentava esconder. Aplica-se ao próximo teste apropriado para interpretar rastros, substâncias, mecanismos ou passagem."
    };
  }

  if (detail.includes("Corrente de ar diferente")) {
    return {
      id: createTestEffectId("air-current"),
      label: "Uma corrente de ar revela a rota: dificuldade -2",
      type: "testModifier",
      dcModifier: -2,
      skills: ["Percepção", "Sobrevivência"],
      note: "O vento carrega cheiro de espaço aberto. Aplica-se ao próximo teste de Percepção ou Sobrevivência para rota."
    };
  }

  if (detail.includes("Visão do andar seguinte")) {
    return {
      id: createTestEffectId("next-floor-vision"),
      label: "Um vislumbre do andar inferior permanece na memória: dificuldade -2",
      type: "testModifier",
      dcModifier: -2,
      targetFloor: Math.min(currentFloor + 1, 10),
      note: "A masmorra mostra uma imagem breve do caminho adiante. Aplica-se ao primeiro teste do próximo andar."
    };
  }

  return null;
}

function isTestEffectApplicable(effect, approach) {
  if (!effect || !approach) return false;
  if (effect.targetFloor) return false;
  if (!effect.skills?.length) return true;

  return effect.skills.includes(approach.skill);
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
  let bossEncounter = null;
  let log = [];
  let elapsedMinutes = 0;
  let pendingSceneEffects = [];
  let pendingTestEffects = [];
  let nextFloorTestEffects = [];
  let resetPending = false;
  let descentPending = false;

  function addLog(message, kind) {
    log = [createLogEntry(message, kind), ...log].slice(0, INITIAL_LOG_LIMIT);
  }

  function resetFloorProgress(message = "A masmorra dobra os caminhos sobre si mesmos; o grupo volta ao início do andar.") {
    successes = 0;
    failures = 0;
    usedApproachIds = new Set();
    currentResult = null;
    currentResults = [];
    finalEncounter = null;
    bossEncounter = null;
    pendingSceneEffects = [];
    pendingTestEffects = [];
    nextFloorTestEffects = [];
    resetPending = false;
    descentPending = false;
    phase = floor === 10 ? "boss" : "exploring";
    addLog(message, "reset");
  }

  function getFinalEncounterScenesForFloor() {
    const tier = getTier(activeProfile, floor);
    const scenes = activeProfile.extendedExploration.finalEncounters?.scenesByTier?.[tier?.id] || [];

    return scenes.filter((scene) => getSceneVariantsForFloor(scene).length > 0);
  }

  function getSceneVariantsForFloor(scene) {
    return scene.variants.filter((variant) => !variant.floors || variant.floors.includes(floor));
  }

  function countCompositionCreatures(variant, creatureTypes = null) {
    const allowedTypes = creatureTypes?.length ? new Set(creatureTypes) : null;

    return (variant.creatures || []).reduce((total, entry) => {
      const creature = getCreatureById(entry.id);

      if (allowedTypes && !allowedTypes.has(creature?.type)) return total;
      return total + (entry.quantity || 1);
    }, 0);
  }

  function finalGimmickApplies(gimmick, scene, variant) {
    const applicability = gimmick?.applicability;

    if (!applicability?.length) return true;

    return applicability.some((rule) => {
      if (
        rule.creatureCountAtLeast !== undefined &&
        countCompositionCreatures(variant) < rule.creatureCountAtLeast
      ) {
        return false;
      }
      if (
        rule.matchingCreatureCountAtLeast !== undefined &&
        countCompositionCreatures(variant, rule.creatureTypes) < rule.matchingCreatureCountAtLeast
      ) {
        return false;
      }
      if (rule.sceneTypeIncludes?.length) {
        const sceneType = String(scene.typeLabel || "").toLowerCase();
        const matchesType = rule.sceneTypeIncludes.some((term) =>
          sceneType.includes(String(term).toLowerCase())
        );

        if (!matchesType) return false;
      }

      return true;
    });
  }

  function createCuratedFinalEncounter(excludeSceneId = null) {
    const scenes = getFinalEncounterScenesForFloor();
    if (!scenes.length) return null;

    const pool = scenes.filter((scene) => scene.id !== excludeSceneId);
    const scene = pick(activeRng, pool.length ? pool : scenes);
    const variant = pick(activeRng, getSceneVariantsForFloor(scene));
    const configuredGimmick = activeProfile.extendedExploration.finalEncounters?.gimmicksByFloor?.[floor] || null;
    const gimmick = finalGimmickApplies(configuredGimmick, scene, variant) ? configuredGimmick : null;
    const seedSuffix = `final-${Date.now()}-${randomInt(activeRng, 1, 9999)}`;

    const encounterNode = {
      id: `extended-${floor}-${seedSuffix}`,
      encounterSeed: `extended-${floor}-${seedSuffix}`,
      type: "normal",
      label: `${scene.title} (encontro final)`,
      short: "E",
      level: floor,
      column: 0,
      environment: {
        terrain: {
          name: floor >= 7 ? "Covil aracnídeo" : "Labirinto",
          effect: "Sala fechada da masmorra; sem clima externo.",
          features: []
        },
        climate: []
      },
      challenge: {
        climate: 0,
        encounter: variant.challenge,
        terrain: 0,
        total: variant.challenge
      },
      creature: null,
      trap: null,
      fixedComposition: {
        creatures: variant.creatures,
        traps: variant.traps
      },
      resolvedEncounter: null
    };

    resolveNodeEncounter(encounterNode, { mapSeed: `extended-floor-${floor}` });

    return {
      categoryId: "finalScene",
      categoryLabel: scene.typeLabel,
      challenge: variant.challenge,
      detail: scene.detail,
      encounterNode,
      gimmick,
      sceneEffects: [],
      sceneId: scene.id,
      sceneOptions: scenes.length,
      tacticalMap: createPresetTacticalMap(variant.map || scene.map, {
        enemyCount: countCompositionCreatures(variant),
        trapCount: (variant.traps || []).length
      }),
      title: scene.title,
      treasureNote: scene.treasureNote
    };
  }

  function createFinalEncounter(excludeSceneId = null) {
    const curated = createCuratedFinalEncounter(excludeSceneId);
    if (curated) return curated;

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
    bossEncounter = null;
    pendingSceneEffects = [];
    pendingTestEffects = nextFloorTestEffects
      .filter((effect) => effect.targetFloor === floor)
      .map((effect) => {
        const { targetFloor, ...activeEffect } = effect;
        return activeEffect;
      });
    nextFloorTestEffects = nextFloorTestEffects.filter((effect) => effect.targetFloor !== floor);
    resetPending = false;
    descentPending = false;
    phase = floor === 10 ? "boss" : "exploring";
    addLog(
      getFloorArrivalLog(floor, false, activeRng),
      "floor"
    );
  }

  function sceneHasPitTrap(scene) {
    return Boolean(scene?.encounterNode?.trap?.tags?.includes("fosso"));
  }

  function hasPitTrapResult(results) {
    return results.some(sceneHasPitTrap);
  }

function refreshSceneEncounter(scene) {
    if (!scene?.encounterNode) return scene;

    resolveNodeEncounter(scene.encounterNode, { mapSeed: `extended-floor-${floor}` });
    return scene;
  }

  function restoreFinalEncounter(sessionState) {
    if (sessionState.finalEncounter) {
      return refreshSceneEncounter(sessionState.finalEncounter);
    }

    if (phase === "floorEncounter" || phase === "readyToAdvance") {
      return createFinalEncounter();
    }

    return null;
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
      currentResult = refreshSceneEncounter(sessionState.currentResult || null);
      currentResults = (sessionState.currentResults || (currentResult ? [currentResult] : []))
        .map(refreshSceneEncounter);
      finalEncounter = restoreFinalEncounter(sessionState);
      bossEncounter = refreshSceneEncounter(sessionState.bossEncounter || null);
      log = sessionState.log || [];
      elapsedMinutes = sessionState.elapsedMinutes || 0;
      pendingSceneEffects = sessionState.pendingSceneEffects || [];
      pendingTestEffects = sessionState.pendingTestEffects || [];
      nextFloorTestEffects = sessionState.nextFloorTestEffects || [];
      resetPending = Boolean(sessionState.resetPending);
      descentPending = Boolean(sessionState.descentPending ?? hasPitTrapResult(currentResults));
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
    bossEncounter = null;
    log = [];
    elapsedMinutes = 0;
    pendingSceneEffects = [];
    pendingTestEffects = [];
    nextFloorTestEffects = [];
    resetPending = false;
    descentPending = false;
    addLog(
      phase === "boss"
        ? getFloorArrivalLog(10, true, activeRng)
        : getFloorArrivalLog(floor, true, activeRng),
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
    const immediateEffect = createImmediateSceneEffect(detail, activeProfile, floor);
    const pendingTestEffect = createPendingTestEffect(detail, floor);
    const immediateEffects = [];
    let sceneEffects = [];
    let encounterNode = null;

    if (immediateEffect?.type === "loseSuccess" || immediateEffect?.type === "gainSuccess") {
      const previousSuccesses = successes;
      const rules = getFloorRules(activeProfile, floor);
      successes = immediateEffect.type === "loseSuccess"
        ? Math.max(0, successes - immediateEffect.value)
        : Math.min(rules?.successesRequired || successes + immediateEffect.value, successes + immediateEffect.value);
      const changedSuccesses = Math.abs(previousSuccesses - successes);
      const appliedEffect = {
        ...immediateEffect,
        appliedValue: changedSuccesses,
        note: changedSuccesses > 0
          ? `O progresso do andar caiu de ${previousSuccesses} para ${successes} sucesso${successes === 1 ? "" : "s"}.`
          : immediateEffect.type === "loseSuccess"
            ? "O grupo já estava sem sucessos acumulados; nenhum progresso foi perdido."
            : "O grupo já estava no máximo de sucessos deste andar; nenhum progresso foi adicionado."
      };

      if (immediateEffect.type === "gainSuccess" && changedSuccesses > 0) {
        appliedEffect.note = `O progresso do andar subiu de ${previousSuccesses} para ${successes} sucesso${successes === 1 ? "" : "s"}.`;
      }

      immediateEffects.push(appliedEffect);
      addLog(
        changedSuccesses > 0
          ? `${appliedEffect.label}. Progresso do andar: ${previousSuccesses} -> ${successes}.`
          : `${appliedEffect.label}, mas o progresso não muda.`,
        "state"
      );
    }

    if (immediateEffect?.type === "removeFailure") {
      const previousFailures = failures;
      failures = Math.max(0, failures - immediateEffect.value);
      const removedFailures = previousFailures - failures;
      const appliedEffect = {
        ...immediateEffect,
        appliedValue: removedFailures,
        note: removedFailures > 0
          ? `As falhas do andar caíram de ${previousFailures} para ${failures}.`
          : "O grupo já estava sem falhas acumuladas; nenhuma falha foi removida."
      };
      immediateEffects.push(appliedEffect);
      addLog(
        removedFailures > 0
          ? `${appliedEffect.label}. Falhas acumuladas: ${previousFailures} -> ${failures}.`
          : `${appliedEffect.label}, mas não havia falhas para remover.`,
        "state"
      );
    }

    if (immediateEffect?.type === "sceneInstruction") {
      immediateEffects.push(immediateEffect);
      addLog(`${immediateEffect.label}. ${immediateEffect.note}`, "state");
    }

    if (pendingTestEffect?.targetFloor) {
      nextFloorTestEffects.push(pendingTestEffect);
      immediateEffects.push({
        ...pendingTestEffect,
        note: `${pendingTestEffect.note} Estado guardado para o andar ${pendingTestEffect.targetFloor}.`
      });
      addLog(`${pendingTestEffect.label}. O presságio fica guardado para o andar ${pendingTestEffect.targetFloor}.`, "state");
    } else if (pendingTestEffect) {
      pendingTestEffects.push(pendingTestEffect);
      immediateEffects.push(pendingTestEffect);
      addLog(`${pendingTestEffect.label}.`, "state");
    }

    if (sceneEffect) {
      pendingSceneEffects.push(sceneEffect);
      addLog(`${sceneEffect.label}.`, "state");
    }

    if (COMBAT_CATEGORIES.has(categoryId) || categoryId === "obstacle") {
      sceneEffects = pendingSceneEffects.filter((effect) =>
        effect.type === "enemyWounded"
          || effect.type === "partyAdvantage"
          || effect.type === "isolatedParty"
          || effect.type === "partyAdjacentToThreat"
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
      immediateEffects,
      roll,
      rollSource,
      sceneEffects,
      tacticalMap: createTacticalMap({ encounterNode, floor, rng: activeRng, sceneEffects }),
      tierId: tier?.id,
      tierLabel: tier?.label
    };

    const challengeText = challenge > 0 ? `, ND ${formatChallengeRating(challenge)}` : "";
    addLog(`A masmorra responde ao erro. d100 ${roll} (${rollSource === "manual" ? "manual" : "automático"}): ${category.label}${challengeText}. ${detail}`, "roll");
    sceneEffects.forEach((effect) => addLog(`O presságio se cumpre nesta cena: ${effect.label}.`, "state"));

    return currentResult;
  }

  function completeSuccess(approach) {
    if (usedApproachIds.has(approach.id)) {
      addLog(`${approach.label} já abriu caminho neste andar; a masmorra exige uma abordagem diferente.`, "warning");
      return false;
    }

    successes += 1;
    usedApproachIds.add(approach.id);
    addLog(getApproachNarrative(approach, "success"), "info");
    addLog(`${approach.label}: o grupo avança pelo labirinto (${successes}/${getFloorRules(activeProfile, floor).successesRequired} sucessos).`, "success");

    const rules = getFloorRules(activeProfile, floor);
    if (successes >= rules.successesRequired) {
      successes = rules.successesRequired;
      phase = "floorEncounter";
      finalEncounter = createFinalEncounter();
      addLog(`A saída do andar finalmente aparece, mas algo ainda bloqueia a passagem: ${finalEncounter.title}. Resolva a cena antes de descer.`, "final");
    }

    return true;
  }

  function applyOutcome(outcome, approachId, manualRolls = []) {
    if (phase !== "exploring") return;
    if (resetPending) {
      addLog("A cena atual ainda precisa ser resolvida antes que a masmorra arraste o grupo de volta ao início.", "warning");
      return;
    }

    const rules = getFloorRules(activeProfile, floor);
    const approach = getFloorApproaches(activeProfile, floor).find((candidate) => candidate.id === approachId)
      || getApproach(activeProfile, approachId);

    if (descentPending) {
      if (failures >= rules.failureLimit) {
        descentPending = false;
        resetPending = true;
        addLog("O grupo deixa o fosso para trás, mas o labirinto já cobrou erros demais. Resolva a cena; depois retorne ao início do andar.", "warning");
        return;
      }

      descentPending = false;
      addLog("O grupo deixa o fosso para trás e insiste em explorar este andar.", "state");
    }

    if (usedApproachIds.has(approach.id)) {
      addLog(`${approach.label} já marcou este trecho do labirinto; escolha outra ação para seguir adiante.`, "warning");
      return;
    }

    const consumedTestEffects = pendingTestEffects.filter((effect) =>
      isTestEffectApplicable(effect, approach)
    );
    pendingTestEffects = pendingTestEffects.filter((effect) =>
      !consumedTestEffects.includes(effect)
    );
    consumedTestEffects.forEach((effect) => {
      addLog(`O presságio interfere no teste: ${effect.label} em ${approach.label}.`, "state");
    });

    if (outcome === "success" || outcome === "criticalSuccess") {
      const changed = completeSuccess(approach);
      if (!changed) return;

      const explorationMinutes = getExplorationMinutes(activeProfile, floor, approach);
      elapsedMinutes += explorationMinutes;
      addLog(`${approach.label}: mais ${explorationMinutes}min se perdem nos corredores.`, "time");

      if (outcome === "criticalSuccess" && failures > 0) {
        failures -= 1;
        addLog("O avanço foi limpo e preciso; uma falha acumulada deixa de pesar sobre o grupo.", "success");
      }

      return;
    }

    const explorationMinutes = getExplorationMinutes(activeProfile, floor, approach);
    elapsedMinutes += explorationMinutes;
    addLog(`${approach.label}: ${explorationMinutes}min desaparecem em voltas, portas falsas e corredores repetidos.`, "time");

    usedApproachIds.add(approach.id);
    addLog(getApproachNarrative(approach, outcome), "info");
    failures += 1;
    addLog(`${approach.label}: a masmorra resiste ao avanço (${failures}/${rules.failureLimit} falhas).`, "failure");

    const rollCount = outcome === "criticalFailure" ? 2 : 1;
    currentResults = [];
    for (let index = 0; index < rollCount; index += 1) {
      const result = resolveD100(manualRolls[index]);
      currentResults.push(result);
    }
    currentResult = currentResults[currentResults.length - 1] || null;

    if (hasPitTrapResult(currentResults) && floor < 10) {
      descentPending = true;
      addLog("Um fosso se abre como uma descida incerta. Resolva a cena; depois o grupo pode usá-lo para alcançar o andar inferior.", "warning");
    }

    if (failures >= rules.failureLimit && !descentPending) {
      failures = rules.failureLimit;
      resetPending = true;
      addLog("Erros demais acumulados: o labirinto se fecha ao redor do grupo. Resolva a cena; depois retorne ao início do andar.", "warning");
    }

    if (!resetPending && !descentPending && successes >= rules.successesRequired && phase === "exploring") {
      successes = rules.successesRequired;
      phase = "floorEncounter";
      finalEncounter = createFinalEncounter();
      addLog(`A saída do andar finalmente aparece, mas ainda há uma última ameaça: ${finalEncounter.title}. Resolva a cena antes de descer.`, "final");
    }
  }

  function confirmFloorReset() {
    if (!resetPending) return;

    resetFloorProgress("Falhas demais: depois da cena, a masmorra reorganiza os caminhos e devolve o grupo ao início do andar.");
  }

  function confirmPitDescent() {
    if (!descentPending) return;

    const nextFloor = Math.min(floor + 1, 10);
    enterFloor(nextFloor);
    addLog(`O grupo aceita a queda controlada pelo fosso e alcança o ${getFloorName(nextFloor)}.`, "floor");
  }

  function dismissPitDescent() {
    if (!descentPending) return;

    descentPending = false;
    const rules = getFloorRules(activeProfile, floor);

    if (rules && failures >= rules.failureLimit) {
      failures = rules.failureLimit;
      resetPending = true;
      addLog("O grupo contorna o fosso, mas o labirinto já cobrou erros demais. Resolva a cena; depois retorne ao início do andar.", "warning");
      return;
    }

    addLog("O grupo contorna o fosso e continua procurando a saída por conta própria.", "state");
  }

  function resolveFinalEncounter() {
    if (phase !== "floorEncounter") return;

    phase = "readyToAdvance";
    addLog("A ameaça final do andar cai. A passagem para descer está livre.", "final");
  }

  function advanceFloor() {
    if (phase !== "readyToAdvance") return;

    enterFloor(Math.min(floor + 1, 10));
  }

  function resolveBossEncounter() {
    if (phase !== "boss") return;

    phase = "completed";
    addLog("A Matriarca cai entre fios rompidos e casulos vazios. Os dez primeiros andares foram conquistados.", "final");
  }

  function rerollTacticalMap(target = "current") {
    const scene = target === "final"
      ? finalEncounter
      : currentResults.find((result) => result.id === target) || currentResult;

    if (scene?.tacticalMap?.preset) return;
    if (!scene?.encounterNode?.resolvedEncounter?.items?.length) return;

    scene.tacticalMap = createTacticalMap({
      encounterNode: scene.encounterNode,
      floor,
      rng: activeRng,
      sceneEffects: scene.sceneEffects || []
    });
    addLog("A cena tática foi redesenhada para representar outra leitura da sala.", "state");
  }

  function rerollFinalEncounter() {
    if (phase !== "floorEncounter" || !finalEncounter) return;

    finalEncounter = createFinalEncounter(finalEncounter.sceneId || null);
    addLog(`A sala final muda de forma. Novo encontro revelado: ${finalEncounter.title}.`, "final");
  }

  function getBossEncounter() {
    const boss = activeProfile.extendedExploration.boss;
    const mainCreature = getCreatureById(boss.creatureId);
    const supportCreature = getCreatureById(boss.supportCreatureId);

    if (!bossEncounter) {
      bossEncounter = {
        categoryId: "boss",
        categoryLabel: "Chefe",
        challenge: boss.challengeOptions?.[0] || 4,
        detail: "A arena tem 20x14 quadrados, com portas laterais de entrada e saída. O grupo começa alinhado ao centro da entrada. A Matriarca ocupa 2x2 quadrados perto da saída; ao redor dela, uma área 4x4 está tomada por teias. Nos quatro cantos internos, zonas 3x3 de teia guardam ovos e casulos que podem eclodir como reforços. Teias menores pressionam o centro, a frente da saída e as rotas laterais, enquanto oito pilares oferecem cobertura e controle de movimento.",
        encounterNode: createBossEncounterNode(activeProfile, floor, boss),
        sceneEffects: [],
        tacticalMap: createBossTacticalMap(),
        title: "Sala da Matriarca Aracnídea",
        treasureNote: `${boss.reward}. ${boss.rewardDetail || ""}`.trim()
      };
    }

    return {
      ...bossEncounter,
      creatureId: boss.creatureId,
      mainCreatureName: mainCreature?.name || boss.creatureId,
      supportCreatureId: boss.supportCreatureId,
      supportCreatureName: supportCreature?.name || boss.supportCreatureId,
      reward: boss.reward,
      challengeLabel: boss.challengeOptions.map(formatChallengeRating).join(" ou ")
    };
  }

  function exportSessionState() {
    return {
      descentPending,
      elapsedMinutes,
      failures,
      floor,
      log,
      nextFloorTestEffects,
      pendingSceneEffects,
      pendingTestEffects,
      phase,
      resetPending,
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
      completedSummary: phase === "completed"
        ? {
          reward: activeProfile.extendedExploration.boss.reward,
          title: "Andares 1-10 conquistados!",
          text: "A Matriarca Aracnídea foi eliminada, e o primeiro grande trecho da masmorra fica para trás. Entregue XP integral do encontro ND 4, o cristal verde e registre os tesouros dessa conquista."
        }
        : null,
      currentResult,
      currentResults,
      descentPending,
      elapsedMinutes,
      failures,
      finalEncounter,
      floor,
      log,
      pendingSceneEffects,
      pendingTestEffects,
      phase,
      resetPending,
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
    confirmFloorReset,
    confirmPitDescent,
    dismissPitDescent,
    exportSessionState,
    getElapsedMinutes: () => elapsedMinutes,
    getSnapshot,
    initialize,
    resolveD100,
    resolveBossEncounter,
    resolveFinalEncounter,
    rerollFinalEncounter,
    rerollTacticalMap
  };
}
