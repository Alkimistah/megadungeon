import { formatChallengeRating } from "../challenge.js";
import { getCreatureById } from "../creatureCatalog/index.js";
import { createRng, pick, pickWeighted, randomInt } from "../random.js";
import { DEFAULT_CATEGORY_WEIGHTS, DEFAULT_COMPLICATIONS, DEFAULT_ISSUER_WEIGHTS, DIFFICULTY_MULTIPLIERS, MISSION_CATEGORIES } from "./missionTables.js";
import { calculateMissionReward } from "./missionRewards.js";
import { getMissionFloors, validateMission } from "./missionValidator.js";

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getWeightedCategories(profile, usedCategories) {
  const rules = profile.missionRules || {};
  const categoryIds = rules.allowedCategories?.length
    ? rules.allowedCategories
    : Object.keys(MISSION_CATEGORIES);
  const weights = rules.categoryWeights || DEFAULT_CATEGORY_WEIGHTS;
  const unused = categoryIds.filter((categoryId) => !usedCategories.has(categoryId));
  const source = unused.length >= 1 ? unused : categoryIds;

  return source
    .filter((categoryId) => MISSION_CATEGORIES[categoryId])
    .map((categoryId) => ({
      categoryId,
      weight: weights[categoryId] ?? DEFAULT_CATEGORY_WEIGHTS[categoryId] ?? 1
    }));
}

function getRewardChallengeByFloor(profile, floor) {
  const challenge = profile.missionRules?.rewardChallengeByFloor?.[floor];

  if (challenge !== undefined) return challenge;

  const baseDc = profile.recommendations?.baseDcByFloor?.[floor] || 15;
  return Math.max(0.25, Math.min(10, Math.round((baseDc - 10) / 5)));
}

function getCreatureTarget(profile, floor, rng) {
  const allowedIds = profile.creatureRules?.allowedCreatureIdsByFloor?.[floor]
    || profile.creatureRules?.allowedCreatureIds
    || [];
  const candidates = allowedIds
    .map((id) => getCreatureById(id))
    .filter((creature) => creature && typeof creature.challengeRating === "number" && creature.challengeRating <= 10);

  if (!candidates.length) return null;

  const creature = pick(rng, candidates);

  return {
    id: creature.id,
    name: creature.name,
    challenge: creature.challengeRating,
    type: "creature"
  };
}

function getPoolValue(profile, poolName, rng) {
  const values = profile.missionRules?.targetPools?.[poolName] || [];

  if (!values.length) return null;
  return pick(rng, values);
}

function getLocation(profile, floor, rng) {
  return getPoolValue(profile, "locations", rng) || `um ponto instável do andar ${floor}`;
}

function getMaterial(profile, rng) {
  return getPoolValue(profile, "materials", rng) || "amostras úteis";
}

function getObject(profile, rng) {
  return getPoolValue(profile, "objects", rng) || "um objeto extraviado";
}

function getMemento(profile, rng) {
  return getPoolValue(profile, "mementos", rng) || "um pertence sentimental";
}

function getPhenomenon(profile, rng) {
  return getPoolValue(profile, "phenomena", rng) || "um fenômeno instável";
}

function getDestination(profile, floor, worldDraft = null) {
  const mode = profile.mode || "node-map";

  if (mode === "archipelago") {
    const island = worldDraft?.islands?.find((item) => item.floor === floor);
    const label = island?.name ? `Ilha ${floor} - ${island.name}` : `Ilha ${floor}`;

    return {
      kind: "island",
      floor,
      floorMin: floor,
      floorMax: floor,
      targetId: island?.themeId || null,
      label
    };
  }

  return {
    kind: "floor",
    floor,
    floorMin: floor,
    floorMax: floor,
    label: `Andar ${floor}`
  };
}

function createObjective({ categoryId, floor, profile, rng }) {
  const category = MISSION_CATEGORIES[categoryId];
  const challenge = getRewardChallengeByFloor(profile, floor);

  if (category.targetTypes.includes("creature")) {
    const target = getCreatureTarget(profile, floor, rng);
    const quantity = categoryId === "specialHunt" ? 1 : randomInt(rng, 1, 4);

    if (target) {
      return {
        challenge: target.challenge,
        condition: categoryId === "specialHunt" ? "alvo específico" : "eliminar ameaça",
        kind: category.objectiveKind,
        progressMode: quantity > 1 ? "aggregate" : "single",
        quantity,
        targetId: target.id,
        targetName: target.name,
        targetType: "creature",
        turnInValue: target.challenge ? null : 0
      };
    }

    return {
      challenge,
      condition: "resolver ameaça local",
      kind: category.objectiveKind,
      progressMode: "manual",
      quantity,
      targetId: null,
      targetName: "ameaça adequada ao ambiente",
      targetType: "creature",
      turnInValue: 0
    };
  }

  if (categoryId === "collection") {
    const quantity = randomInt(rng, 2, 5);
    const material = getMaterial(profile, rng);
    return {
      challenge,
      condition: "coletar e entregar",
      kind: category.objectiveKind,
      progressMode: "aggregate",
      quantity,
      targetId: slugify(material),
      targetName: material,
      targetType: "material",
      turnInValue: 0
    };
  }

  if (categoryId === "exploration") {
    const location = getLocation(profile, floor, rng);
    return {
      challenge,
      condition: "confirmar rota ou local",
      kind: category.objectiveKind,
      progressMode: "single",
      quantity: 1,
      targetId: slugify(location),
      targetName: location,
      targetType: "location",
      turnInValue: 0
    };
  }

  if (categoryId === "recovery") {
    const object = getObject(profile, rng);
    return {
      challenge,
      condition: "recuperar objeto",
      kind: category.objectiveKind,
      progressMode: "single",
      quantity: 1,
      targetId: slugify(object),
      targetName: object,
      targetType: "object",
      turnInValue: 0
    };
  }

  if (categoryId === "rescue" || categoryId === "escort") {
    const memento = getMemento(profile, rng);
    return {
      challenge,
      condition: categoryId === "rescue" ? "recuperar lembrança" : "entregar lembrança",
      kind: category.objectiveKind,
      progressMode: "single",
      quantity: 1,
      targetId: slugify(memento),
      targetName: memento,
      targetType: "memento",
      turnInValue: 0
    };
  }

  if (categoryId === "anomalous") {
    const phenomenon = getPhenomenon(profile, rng);
    return {
      challenge,
      condition: "estabilizar ou registrar",
      kind: category.objectiveKind,
      progressMode: "manual",
      quantity: 1,
      targetId: slugify(phenomenon),
      targetName: phenomenon,
      targetType: "phenomenon",
      turnInValue: 0
    };
  }

  const targetName = categoryId === "investigation"
    ? getPoolValue(profile, "clues", rng) || "um vestígio contraditório"
    : getPoolValue(profile, "challenges", rng) || "um desafio local";

  return {
    challenge,
    condition: categoryId === "investigation" ? "investigar" : "superar",
    kind: category.objectiveKind,
    progressMode: "manual",
    quantity: 1,
    targetId: slugify(targetName),
    targetName,
    targetType: categoryId === "investigation" ? "clue" : "challenge",
    turnInValue: 0
  };
}

function getObjectivePhrase(objective) {
  const quantityText = objective.quantity > 1 ? `${objective.quantity}x ` : "";
  return `${quantityText}${objective.targetName}`;
}

function createMissionText({ category, destination, difficulty, issuer, objective }) {
  const targetPhrase = getObjectivePhrase(objective);
  const ndText = objective.challenge ? `ND ${formatChallengeRating(objective.challenge)}` : "ND por contexto";
  const verbByKind = {
    collect: "colete",
    completeTrial: "supere",
    defeat: "elimine",
    deliverMemento: "entregue",
    escort: "proteja",
    explore: "explore",
    hunt: "cace",
    investigate: "investigue",
    recover: "recupere",
    recoverMemento: "recupere",
    rescue: "resgate",
    stabilize: "estabilize ou registre"
  };
  const verb = verbByKind[objective.kind] || "resolva";

  return `${issuer} solicita que o grupo ${verb} ${targetPhrase} em ${destination.label}. A tarefa é ${difficulty.label} e usa ${ndText} como referência de recompensa.`;
}

function createMissionOffer({ categoryId, context, index, rng, usedIds }) {
  const { missionFloors, profile } = context;
  const category = MISSION_CATEGORIES[categoryId];
  const floor = pick(rng, missionFloors);
  const destination = getDestination(profile, floor, context.worldDraft);
  const objective = createObjective({ categoryId, floor, profile, rng });
  const issuer = pickWeighted(rng, profile.missionRules?.issuerWeights || DEFAULT_ISSUER_WEIGHTS).label;
  const difficulty = pickWeighted(rng, DIFFICULTY_MULTIPLIERS);
  const title = pick(rng, category.titleTemplates);
  const proofType = pick(rng, category.proofTemplates);
  const complication = pick(rng, profile.missionRules?.complications || DEFAULT_COMPLICATIONS);
  const turnInValue = objective.targetType === "creature"
    ? objective.quantity * (calculateMissionReward({
      challenge: objective.challenge,
      multiplier: 0,
      quantity: 1,
      turnInValue: 0
    }).unitValue || 0)
    : objective.turnInValue;
  const reward = calculateMissionReward({
    challenge: objective.challenge,
    multiplier: difficulty.value,
    quantity: objective.quantity,
    turnInValue
  });
  const baseId = `${context.currentSeed}-${profile.id}-${categoryId}-${floor}-${slugify(objective.targetName)}-${index}`;
  const id = usedIds.has(baseId) ? `${baseId}-${usedIds.size}` : baseId;

  usedIds.add(id);

  return {
    id,
    seed: context.currentSeed,
    profileId: profile.id,
    status: "offered",
    category: category.id,
    categoryLabel: category.label,
    issuer,
    title,
    description: createMissionText({ category, destination, difficulty, issuer, objective }),
    destination,
    objective: {
      kind: objective.kind,
      targetType: objective.targetType,
      targetId: objective.targetId,
      targetName: objective.targetName,
      quantity: objective.quantity,
      condition: objective.condition,
      progressMode: objective.progressMode
    },
    complication,
    difficulty: difficulty.id,
    difficultyLabel: difficulty.label,
    proofType,
    reward,
    integration: {
      capability: "floor-indicator",
      eventType: objective.kind,
      eventPayload: {
        floor,
        targetId: objective.targetId,
        targetName: objective.targetName
      },
      bindings: [],
      state: "pending"
    }
  };
}

export function createMissionGenerationContext({ currentSeed, profile, worldDraft = null }) {
  return {
    currentSeed,
    missionFloors: getMissionFloors(profile),
    mode: profile.mode || "node-map",
    profile,
    profileFloors: profile.floors || [],
    profileId: profile.id,
    worldDraft
  };
}

export function generateMissionOffers(context) {
  const rules = context.profile.missionRules || {};
  const offerCount = rules.offerCount || 7;
  const rng = createRng(`${context.currentSeed}|missions|${context.profileId}`);
  const offers = [];
  const usedCategories = new Set();
  const usedIds = new Set();
  let attempts = 0;

  while (offers.length < offerCount && attempts < offerCount * 20) {
    attempts += 1;
    const categoryOptions = getWeightedCategories(context.profile, usedCategories);
    const categoryId = pickWeighted(rng, categoryOptions).categoryId;
    const mission = createMissionOffer({
      categoryId,
      context,
      index: offers.length + attempts,
      rng,
      usedIds
    });
    const validation = validateMission(mission, context);

    if (!validation.valid) continue;

    offers.push(mission);
    usedCategories.add(categoryId);
  }

  return offers;
}
