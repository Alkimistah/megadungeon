import { calculateCombatND, formatChallengeRating, roundToQuarter, updateForestChallengeTotal } from "../challenge.js";
import { getCreatureById } from "../creatureCatalog/index.js";
import { createForestMissionObjective, isForestMissionEnvironmentCompatible } from "./forestMissionScenes.js";

// Nos mapas v5 a capacidade vem da parcela de criaturas; mapas legados leem o ND do encontro.
function getCreatureBudget(node) {
  return node.generationVersion === 5 ? node.challenge.creatures ?? 0 : node.challenge.encounter;
}

function isEligible(node, mission) {
  if (["boss", "camp", "scene"].includes(node.contentType || node.type)) return false;
  if (mission.objective?.targetType === "creature") {
    const creature = getCreatureById(mission.objective.targetId);
    return ["normal", "elite"].includes(node.contentType || node.type)
      && creature && creature.challengeRating <= getCreatureBudget(node);
  }
  return isForestMissionEnvironmentCompatible(node, mission);
}

function reservedQuantity(mission) {
  return (mission.integration?.bindings || [])
    .filter(b => b.kind === "node")
    .reduce((sum, b) => sum + (b.quantity || 0), 0);
}

function capacity(node, mission, remaining) {
  if (!isEligible(node, mission)) return 0;
  const creature = getCreatureById(mission.objective.targetId);
  let quantity = 0;
  for (let count = 1; count <= remaining; count++) {
    if (calculateCombatND([{ challengeRating: creature.challengeRating, quantity: count }]) <= getCreatureBudget(node)) quantity = count;
  }
  return quantity;
}

// O estado da busca contém apenas nodo, objetivos cobertos e quantidades ainda
// necessárias. Não enumera todas as rotas do grafo e não modifica cenas na busca.
function findRoute(levels, localMissions, exterminations, remaining) {
  const allMask = (1 << localMissions.length) - 1;
  const memo = new Map();
  function visit(node, mask, counts) {
    const key = `${node.id}:${mask}:${counts.join(",")}`;
    if (memo.has(key)) return memo.get(key);
    // Cada alternativa ocupa o nodo com no máximo uma missão. Deixar o nodo
    // livre também é necessário para distribuir objetivos numa rota comum.
    const options = [];
    localMissions.forEach((mission, index) => {
      if ((mask & (1 << index)) || !isEligible(node, mission)) return;
      const quantity = mission.objective.quantity || 1;
      if (mission.objective.targetType === "creature" && capacity(node, mission, quantity) < quantity) return;
      options.push({ mask: mask | (1 << index), counts, placement: { mission, quantity } });
    });
    exterminations.forEach((mission, index) => {
      const quantity = capacity(node, mission, counts[index]);
      if (!quantity) return;
      const next = [...counts];
      next[index] -= quantity;
      options.push({ mask, counts: next, placement: { mission, quantity } });
    });
    options.push({ mask, counts, placement: null });
    let best = null;
    for (const option of options) {
      const suffixes = node.links.length
        ? node.links.map(next => visit(next, option.mask, option.counts)).filter(Boolean)
        : option.mask === allMask ? [{ score: 0, placements: [], path: [] }] : [];
      for (const suffix of suffixes) {
        const score = suffix.score + (option.placement?.mission.category === "extermination" ? option.placement.quantity : 0);
        if (best && score <= best.score) continue;
        const current = option.placement ? [option.placement] : [];
        best = {
          score, path: [node.id, ...suffix.path],
          placements: [...current.map(item => ({ ...item, node })), ...suffix.placements]
        };
      }
    }
    memo.set(key, best);
    return best;
  }
  return levels[0].map(node => visit(node, 0, remaining)).filter(Boolean)
    .sort((left, right) => right.score - left.score)[0] || null;
}

function applyCombat(node, mission, quantity, rules) {
  const creature = getCreatureById(mission.objective.targetId);
  const actual = calculateCombatND([{ challengeRating: creature.challengeRating, quantity }]);
  node.fixedComposition = { creatures: [{ id: creature.id, quantity }], traps: [] };
  // A composição da missão prevalece e apaga o registro procedural substituído.
  delete node.forestComposition;
  node.trap = null;
  node.resolvedEncounter = null;
  node.creature = {
    ...node.creature, type: creature.type, creatureId: creature.id,
    creatureName: creature.name, targetChallenge: actual, targetChallengeLabel: formatChallengeRating(actual)
  };
  node.challenge = {
    ...node.challenge, encounter: actual, creatures: actual, trap: 0,
    total: Math.min(8, roundToQuarter(actual + node.challenge.climate + node.challenge.terrain))
  };
  if (node.generationVersion === 5) {
    node.challenge.encounterBudgetLabel = `ND ${formatChallengeRating(actual)} para criaturas`;
    updateForestChallengeTotal(node, rules);
  }
}

/** Materializa uma rota compatível de objetivos; falha antes de qualquer mutação. */
export function materializeForestFloorMissions({ floor, levels, missions, profile }) {
  const rules = profile?.challengeRules ?? { minimum: 0.25, maximum: 8 };
  const active = missions.filter(m => m.status !== "completed");
  const local = active.filter(m => m.category !== "extermination" && m.destination?.floor === floor);
  const exterminations = active.filter(m => m.category === "extermination"
    && floor >= (m.destination.floorMin || 11) && floor <= (m.destination.floorMax || 19));
  const remaining = exterminations.map(m => Math.max(0, m.objective.quantity - Math.max(reservedQuantity(m), m.progress?.current || 0)));
  const route = findRoute(levels, local, exterminations, remaining);
  if (!route) throw new Error(`Andar ${floor}: não há rota compatível para as missões selecionadas.`);

  const updated = new Map();
  for (const { node, mission, quantity } of route.placements) {
    if (mission.objective.targetType === "creature") applyCombat(node, mission, quantity, rules);
    const objective = createForestMissionObjective(mission, node, quantity);
    const binding = {
      kind: "node", floor, nodeId: node.id, quantity,
      label: node.label, context: objective.description
    };
    node.missionBindings = [...(node.missionBindings || []), {
      id: mission.id, title: mission.title, categoryLabel: mission.categoryLabel, context: objective.description
    }];
    node.missionObjectives = [...(node.missionObjectives || []), objective];
    const previous = updated.get(mission.id) || mission;
    updated.set(mission.id, {
      ...previous, status: "materialized",
      integration: { ...previous.integration, state: "materialized", bindings: [...(previous.integration?.bindings || []), binding] }
    });
  }
  return missions.map(m => updated.get(m.id) || m);
}
