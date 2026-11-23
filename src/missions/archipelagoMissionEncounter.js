import { calculateCombatND, roundToQuarter } from "../challenge.js";
import { getCreatureOriginIds, getCreatureOriginThemeId, getIslandCreatureIds } from "../archipelagoCreatureRules.js";
import { getAutomaticCreatureCatalog, getCreatureById } from "../creatureCatalog/index.js";
import { resolveNodeEncounter } from "../encounterResolver.js";
import { archipelagoEcologyContexts } from "../floorProfiles/archipelago21to30.js";

function isIslandHunt(mission) {
  return mission?.category === "specialHunt" && mission.destination?.kind === "island" &&
    Boolean(mission.objective?.targetId);
}

const COMPANION_VARIANTS = 4;

function getCompanionBudgets(limit) {
  const budgets = [];
  for (let value = Math.floor(limit); value >= 1; value -= 1) budgets.push(value);
  return [...budgets, 0.5, 0.25];
}

function toItem(creatureId, name, quantity, challenge, isTarget) {
  return { creatureId, name, quantity, challenge, isTarget };
}

// Acompanhantes pelo mesmo gerador dos setores: um nó com a ecologia do elenco,
// resolvido com `creatureCandidates` restrito ao elenco sem o alvo. Como o ND do
// grupo não soma com o do alvo, testa orçamentos decrescentes e fica com o maior
// ND conjunto que não passa do limite.
function resolveCompanions(mission, target, roster, ecologyThemeId, limit, profile) {
  const rosterIds = new Set(roster.filter(id => id !== target.id));
  const candidates = getAutomaticCreatureCatalog(profile)
    .filter(creature => rosterIds.has(creature.id) && typeof creature.challengeRating === "number");
  if (!candidates.length) return [];

  const mapSeed = `${mission.id}:cacada`;
  let best = null;
  for (const ecologyProfile of [profile, null]) {
    for (const budget of getCompanionBudgets(limit)) {
      for (let variant = 0; variant < COMPANION_VARIANTS; variant += 1) {
        const node = {
          id: `acompanhantes-${budget}-${variant}`,
          type: "normal",
          environment: { terrain: null, climate: [] },
          ecologyContext: archipelagoEcologyContexts.byTheme[ecologyThemeId],
          challenge: { total: budget, encounter: budget, creatures: budget, trap: 0, climate: 0, terrain: 0 },
          creature: { targetChallenge: budget, type: null }
        };
        const encounter = resolveNodeEncounter(node, { mapSeed, profile: ecologyProfile, creatureCandidates: candidates });
        const group = (encounter?.items || []).filter(item => item.kind === "creature");
        if (!group.length || group.some(item => item.generated || !rosterIds.has(item.creatureId))) continue;

        const total = calculateCombatND([{ challengeRating: target.challengeRating, quantity: 1 }, ...group]);
        if (total > limit || (best && total <= best.total)) continue;
        best = { total, group };
        if (total === limit) return best.group;
      }
    }
  }
  if (best) return best.group;
  return [];
}

export function createArchipelagoHuntEncounter(mission, profile) {
  if (!isIslandHunt(mission)) return null;

  const objective = mission.objective;
  const creature = getCreatureById(objective.targetId);
  const targetChallenge = typeof creature?.challengeRating === "number"
    ? creature.challengeRating
    : Number(objective.challenge) || 0;
  const target = { id: objective.targetId, challengeRating: targetChallenge };
  const floorChallenge = profile?.missionRules?.rewardChallengeByFloor?.[mission.destination.floor];
  const limit = roundToQuarter((Number(floorChallenge) || targetChallenge) + 1);

  const roster = objective.outOfPlace ? getCreatureOriginIds(target.id) : getIslandCreatureIds(mission.themeId);
  const ecologyThemeId = objective.outOfPlace ? getCreatureOriginThemeId(target.id) : mission.themeId;
  const companions = targetChallenge >= limit
    ? []
    : resolveCompanions(mission, target, roster, ecologyThemeId, limit, profile);

  const items = [
    toItem(target.id, objective.targetName || creature?.name || "Alvo marcado", 1, targetChallenge, true),
    ...companions.map(item => toItem(item.creatureId, item.name, item.quantity, item.challengeRating, false))
  ];
  return {
    challenge: calculateCombatND(items.map(item => ({ challengeRating: item.challenge, quantity: item.quantity }))),
    items
  };
}
