import { formatChallengeRating } from "./challenge.js";
import { assignCreatureProfile } from "./creatures.js";
import { getCreatureById } from "./creatureCatalog/index.js";
import { getEncounterForSave, hasEncounterAdjustments } from "./encounterCreatureHealth.js";
import {
  createDungeonTacticalLayout,
  DUNGEON_MAP_HEIGHT as TACTICAL_HEIGHT,
  DUNGEON_MAP_WIDTH as TACTICAL_WIDTH,
  dungeonTacticalLayouts
} from "./dungeonTacticalLayouts.js";
import { createExtendedTacticalMap } from "./extendedTacticalMap.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { pick, randomInt } from "./random.js";
import { assignTrapProfile } from "./traps.js";

const INITIAL_LOG_LIMIT = 40;
const COMBAT_CATEGORIES = new Set(["easy", "medium", "hard"]);
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
  resolveNodeEncounter(node, { mapSeed: `extended-floor-${floor}`, profile });

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

function setCells(cells, positions, marker) {
  positions.forEach(([x, y]) => {
    if (cells[y]?.[x]) cells[y][x] = marker;
  });
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

function distanceBetween([x1, y1], [x2, y2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
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

function getTrapZoneCandidates(cells, [midX, midY], rng) {
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

function placeTrapZone(cells, center, trapCount, rng) {
  if (trapCount <= 0) return;

  const targetSize = randomInt(rng, 3, 7);
  const candidates = getTrapZoneCandidates(cells, center, rng);
  const selected = candidates.find((zone) => zone.length >= targetSize) || candidates[0];

  if (!selected) return setCellsIfOpen(cells, [center], "trap");

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
    if (x > 0 && y > 0 && x < TACTICAL_WIDTH - 1 && y < TACTICAL_HEIGHT - 1 &&
      ["floor", "trap", "web", "difficult", "advantage"].includes(cells[y]?.[x])) {
      cells[y][x] = marker;
    }
  });
}

function getThreatCenter(cells, openPassages, adjacentToParty) {
  const party = getMarkerPositions(cells, "party");
  const partyCenter = getCenter(party);
  const enemies = getMarkerPositions(cells, "enemy");
  const free = allFreePositions(cells);
  const exits = openPassages.slice(1).flatMap(passage => passage.inner);
  const farthest = free.reduce((best, point) =>
    distanceBetween(point, partyCenter) > distanceBetween(best, partyCenter) ? point : best, partyCenter);
  const target = enemies.length ? getCenter(enemies) : exits.length ? getCenter(exits) : farthest;
  const center = getCenter([partyCenter, target]);
  const distance = adjacentToParty
    ? point => Math.min(...party.map(position => distanceBetween(position, point)))
    : point => distanceBetween(point, center);
  return free.sort((a, b) => distance(a) - distance(b))[0] ?? center;
}

function getThreatLines(cells, center) {
  const trace = (dx, dy) => {
    const points = [];
    let [x, y] = center;
    x += dx;
    y += dy;
    while (isTrapPlacementCell(cells[y]?.[x]) &&
      x > 0 && y > 0 && x < TACTICAL_WIDTH - 1 && y < TACTICAL_HEIGHT - 1) {
      points.push([x, y]);
      x += dx;
      y += dy;
    }
    return points;
  };
  return [
    [...trace(-1, 0).reverse(), center, ...trace(1, 0)],
    [...trace(0, -1).reverse(), center, ...trace(0, 1)]
  ];
}

function placePitThreat(cells, center) {
  const lines = getThreatLines(cells, center).filter(line => line.length > 1);
  const crossSection = lines.sort((a, b) => a.length - b.length)[0] ?? [center];
  // A armadilha pode tomar uma faixa inteira quando a cena é só de travessia.
  const pit = getMarkerPositions(cells, "enemy").length ? crossSection.slice(0, -1) : crossSection;
  setCellsIfOpen(cells, pit.length ? pit : [center], "pit");
}

function placeBladeThreat(cells, [centerX, centerY]) {
  const bladeCells = [
    [centerX, centerY],
    [centerX + 1, centerY],
    [centerX, centerY + 1]
  ];

  setCellsIfOpen(cells, bladeCells, "trap");
}

function placeProjectileThreat(cells, center) {
  const [line] = getThreatLines(cells, center).sort((a, b) => b.length - a.length);
  setCellsIfOpen(cells, line, "trap");
  if (line.length > 1) setCellsIfOpen(cells, [line[0]], "mechanism");
}

function placeAreaThreat(cells, [centerX, centerY], marker = "trap") {
  const area = [
    [centerX - 1, centerY - 1], [centerX, centerY - 1],
    [centerX - 1, centerY], [centerX, centerY]
  ];

  setCellsIfOpen(cells, area, marker);
}

function placeRubbleThreat(cells, [centerX, centerY]) {
  const rubble = [
    [centerX - 1, centerY], [centerX, centerY], [centerX + 1, centerY],
    [centerX, centerY - 1], [centerX, centerY + 1]
  ];

  setCellsIfOpen(cells, rubble.slice(0, 2), "obstacle");
  setCellsIfOpen(cells, rubble.slice(2), "difficult");
}

function placeWebThreat(cells, [centerX, centerY], rng) {
  const web = [];

  for (let y = centerY - 1; y <= centerY + 1; y += 1) {
    for (let x = centerX - 1; x <= centerX + 1; x += 1) {
      web.push([x, y]);
    }
  }

  setCellsIfOpen(cells, web, "web");
  setCellsIfOpen(cells, [[centerX, centerY]], "reinforcement");

  const extra = shufflePositions(allFreePositions(cells), rng).slice(0, 4);
  setCellsIfOpen(cells, extra, "web");
}

function placeThreatFeature(cells, { threat, openPassages, trapCount, rng, hasAdjacentThreat }) {
  if (threat === "none") return;

  const center = getThreatCenter(cells, openPassages, hasAdjacentThreat);
  if (threat === "pit") return placePitThreat(cells, center);
  if (threat === "blade") return placeBladeThreat(cells, center);
  if (threat === "projectile") return placeProjectileThreat(cells, center);
  if (threat === "rune") return placeAreaThreat(cells, center, "mechanism");
  if (threat === "gas") return placeAreaThreat(cells, center);
  if (threat === "rubble") return placeRubbleThreat(cells, center);
  if (threat === "web" || threat === "webCombat") return placeWebThreat(cells, center, rng);
  if (hasAdjacentThreat) return placeAreaThreat(cells, center);

  return placeTrapZone(cells, center, trapCount, rng);
}

function createTacticalMap({ encounterNode, floor, rng, sceneEffects = [] }) {
  if (floor < 1 || floor > 9 || !encounterNode?.resolvedEncounter?.items?.length) return null;

  const enemyCount = getEncounterEnemyCount(encounterNode);
  const trapCount = hasTrap(encounterNode) ? 1 : 0;
  const hasAdvantage = sceneEffects.some(effect => effect.type === "partyAdvantage");
  const hasIsolatedParty = sceneEffects.some(effect => effect.type === "isolatedParty");
  const hasAdjacentThreat = sceneEffects.some(effect => effect.type === "partyAdjacentToThreat");
  const threat = getTacticalThreatKind(encounterNode);
  const usesRoom = ["gas", "rubble", "web", "webCombat"].includes(threat) || enemyCount >= 5;
  const usesCorridor = ["pit", "blade", "projectile"].includes(threat);
  const rank = layout => {
    if (usesCorridor) return layout.hall ? 1 : 0;
    if (usesRoom) return layout.hall || layout.room ? 0 : 1;
    return 0;
  };
  const candidates = shufflePositions(dungeonTacticalLayouts, rng).sort((a, b) => rank(a) - rank(b));
  let bestMap;
  let bestOverlap = Infinity;

  for (const layout of candidates) {
    const { cells, openPassages } = createDungeonTacticalLayout(layout, rng);
    const party = getMarkerPositions(cells, "party");
    const distanceToParty = point => Math.min(...party.map(position => distanceBetween(point, position)));
    const free = allFreePositions(cells);
    const enemyPositions = free.filter(position => distanceToParty(position) >= 5);
    const adjacentEnemy = hasAdjacentThreat && threat === "none" && enemyCount > 0
      ? pick(rng, free.filter(position => distanceToParty(position) === 1))
      : null;
    if (adjacentEnemy) setCells(cells, [adjacentEnemy], "enemy");
    placeMarkers(cells, enemyPositions, "enemy", enemyCount - Number(Boolean(adjacentEnemy)), rng);

    if (hasAdvantage) {
      const nearParty = allFreePositions(cells).filter(position => distanceToParty(position) <= 3);
      placeMarkers(cells, nearParty, "advantage", 2, rng);
    }

    placeThreatFeature(cells, { threat, openPassages, trapCount, rng, hasAdjacentThreat });
    if (hasIsolatedParty) isolatePartyMarker(cells, rng);

    const tacticalMap = {
      cells: cells.flat(),
      enemyCount,
      height: TACTICAL_HEIGHT,
      template: layout.id,
      trapCount,
      width: TACTICAL_WIDTH
    };
    const { scene } = createExtendedTacticalMap({ tacticalMap, encounterNode });
    const occupied = new Set();
    let overlap = 0;
    for (const { x, y, width, height } of scene.pieces) {
      for (let row = y; row < y + height; row += 1) {
        for (let column = x; column < x + width; column += 1) {
          const index = row * TACTICAL_WIDTH + column;
          if (["wall", "pit", "obstacle", "reinforcement"].includes(tacticalMap.cells[index])) overlap += TACTICAL_WIDTH;
          if (occupied.has(index)) overlap += 1;
          occupied.add(index);
        }
      }
    }
    if (overlap === 0) return tacticalMap;
    if (overlap < bestOverlap) {
      bestOverlap = overlap;
      bestMap = tacticalMap;
    }
  }

  return bestMap;
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

    scene.encounterNode.resolvedEncounter = getEncounterForSave(scene.encounterNode.resolvedEncounter);
    resolveNodeEncounter(scene.encounterNode, { mapSeed: `extended-floor-${floor}`, profile: activeProfile });
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
      currentResults = (sessionState.currentResults || (sessionState.currentResult ? [sessionState.currentResult] : []))
        .map(refreshSceneEncounter);
      currentResult = currentResults.at(-1) || null;
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

    if (scene?.tacticalMap?.preset || hasEncounterAdjustments(scene?.encounterNode?.resolvedEncounter)) return;
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
    if (phase !== "floorEncounter" || !finalEncounter ||
      hasEncounterAdjustments(finalEncounter.encounterNode?.resolvedEncounter)) return;

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
    const sceneForSave = scene => {
      if (!scene.encounterNode?.resolvedEncounter) return scene;
      const { encounterNode } = scene;
      return { ...scene, encounterNode: { ...encounterNode, resolvedEncounter: getEncounterForSave(encounterNode.resolvedEncounter) } };
    };
    const results = currentResults.length ? currentResults : currentResult ? [currentResult] : [];
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
      usedSuccessfulSkills: [...usedApproachIds],
      ...(results.length ? { currentResults: results.map(sceneForSave) } : {}),
      ...(finalEncounter ? { finalEncounter: sceneForSave(finalEncounter) } : {}),
      ...(bossEncounter ? { bossEncounter: sceneForSave(bossEncounter) } : {})
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
