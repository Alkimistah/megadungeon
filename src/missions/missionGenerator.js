import { formatChallengeRating } from "../challenge.js";
import { getCreatureById } from "../creatureCatalog/index.js";
import { createRng, pick, pickWeighted, randomInt } from "../random.js";
import { DEFAULT_CATEGORY_WEIGHTS, DEFAULT_ISSUER_WEIGHTS, DIFFICULTY_MULTIPLIERS, MISSION_CATEGORIES } from "./missionTables.js";
import { calculateMissionReward } from "./missionRewards.js";
import { getMissionFloors, validateMission } from "./missionValidator.js";

const CATEGORY_REWARD_BONUS = 1.15;
const DIRECT_COMBAT_CATEGORIES = new Set(["extermination", "specialHunt"]);

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

function getMissionSources(profile, categoryId) {
  const sources = profile.missionRules?.issuerWeights || DEFAULT_ISSUER_WEIGHTS;
  const compatible = sources.filter((source) =>
    !source.categories?.length || source.categories.includes(categoryId)
  );

  return compatible.length ? compatible : sources;
}

function getRewardChallengeByFloor(profile, floor) {
  const challenge = profile.missionRules?.rewardChallengeByFloor?.[floor];

  if (challenge !== undefined) return challenge;

  const baseDc = profile.recommendations?.baseDcByFloor?.[floor] || 15;
  return Math.max(0.25, Math.min(10, Math.round((baseDc - 10) / 5)));
}

function getRewardMultiplier(categoryId, multiplier) {
  const baseMultiplier = Number(multiplier) || 1;

  return DIRECT_COMBAT_CATEGORIES.has(categoryId)
    ? baseMultiplier
    : baseMultiplier * CATEGORY_REWARD_BONUS;
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

function getProgressDestination(profile) {
  const missionFloors = getMissionFloors(profile);
  const firstFloor = missionFloors[0] || profile.floors?.[0] || null;
  const lastFloor = missionFloors[missionFloors.length - 1] || profile.floors?.[profile.floors.length - 1] || null;
  const rangeText = firstFloor && lastFloor
    ? `Andares ${firstFloor}-${lastFloor}`
    : profile.label || "Faixa atual";

  return {
    kind: "progress",
    floor: null,
    floorMin: firstFloor,
    floorMax: lastFloor,
    targetId: profile.id,
    label: `${rangeText} | progresso`
  };
}

function createObjective({ categoryId, floor, profile, rng }) {
  const category = MISSION_CATEGORIES[categoryId];
  const challenge = getRewardChallengeByFloor(profile, floor);

  if (category.targetTypes.includes("creature")) {
    const target = getCreatureTarget(profile, floor, rng);
    const quantity = categoryId === "specialHunt" ? 1 : categoryId === "extermination" ? randomInt(rng, 4, 8) : randomInt(rng, 1, 4);

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
  if (objective.quantity > 1 && objective.targetType === "creature") {
    return `${objective.quantity} inimigos do tipo ${objective.targetName}`;
  }

  const quantityText = objective.quantity > 1 ? `${objective.quantity} ` : "";
  return `${quantityText}${objective.targetName}`;
}

function capitalizeFirst(value) {
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;
}

function getDestinationPhrase(destination) {
  if (destination.kind === "progress") return "ao longo da faixa";
  if (destination.label?.startsWith("Andar ")) return `no ${destination.label}`;
  if (destination.label?.startsWith("Ilha ")) return `na ${destination.label}`;

  return `em ${destination.label}`;
}

function getSourceKind(source) {
  return source?.kind || "request";
}

function createRequestSentence(source, actionText, destinationText) {
  if (getSourceKind(source) === "writtenRequest") {
    return `${source.label} traz uma instrução direta: ${actionText} ${destinationText}.`;
  }

  return `${source.label} pede que o grupo ${actionText} ${destinationText}.`;
}

function createRecordSentence(source, objective, targetPhrase, destinationText) {
  if (objective.kind === "investigate") {
    return `${source.label} indica ${targetPhrase} ${destinationText} como pista a investigar.`;
  }

  if (objective.kind === "deliverMemento") {
    return `${source.label} aponta ${targetPhrase} ${destinationText} como item a entregar.`;
  }

  if (["recover", "recoverMemento"].includes(objective.kind)) {
    return `${source.label} aponta ${targetPhrase} ${destinationText} como item a recuperar.`;
  }

  return `${source.label} aponta ${targetPhrase} ${destinationText} como prioridade da exploração.`;
}

function createSignalSentence(objective, targetPhrase, destinationText) {
  if (objective.kind === "stabilize") {
    return `Uma missão sem fornecedor aparece destacada no mural: estabilize ou registre ${targetPhrase} ${destinationText}.`;
  }

  if (objective.kind === "hunt") {
    return `Uma missão sem fornecedor aparece destacada no mural: siga o rastro de ${targetPhrase} ${destinationText}.`;
  }

  if (objective.kind === "completeTrial") {
    return `Uma missão sem fornecedor aparece destacada no mural: supere o desafio: ${targetPhrase} ${destinationText}.`;
  }

  return `Uma missão sem fornecedor aparece destacada no mural: investigue ${targetPhrase} ${destinationText}.`;
}

function createMissionText({ destination, objective, source }) {
  const targetPhrase = getObjectivePhrase(objective);
  const ndText = objective.challenge ? `ND ${formatChallengeRating(objective.challenge)}` : "ND por contexto";
  const verbByKind = {
    collect: "colete",
    completeTrial: "supere",
    defeat: "elimine",
    deliverMemento: "entregue",
    escort: "proteja",
    explore: "explore",
    hunt: "rastreie e elimine",
    investigate: "investigue",
    recover: "recupere",
    recoverMemento: "recupere",
    rescue: "resgate",
    stabilize: "estabilize ou registre"
  };
  const verb = verbByKind[objective.kind] || "resolva";
  const actionText = objective.kind === "completeTrial"
    ? `supere o desafio: ${targetPhrase}`
    : `${verb} ${targetPhrase}`;
  const destinationText = getDestinationPhrase(destination);
  const progressText = destination.kind === "progress" && objective.targetType === "creature"
    ? " Qualquer inimigo desse tipo encontrado durante o progresso conta para esse objetivo."
    : "";
  const sourceKind = getSourceKind(source);
  const mainText = sourceKind === "record"
    ? createRecordSentence(source, objective, targetPhrase, destinationText)
    : sourceKind === "signal"
      ? createSignalSentence(objective, targetPhrase, destinationText)
      : createRequestSentence(source, actionText, destinationText);

  return capitalizeFirst(`${mainText} A tarefa usa ${ndText} como referência de recompensa.${progressText}`);
}

function createMissionOffer({ categoryId, context, index, rng, usedIds }) {
  const { missionFloors, profile } = context;
  const category = MISSION_CATEGORIES[categoryId];
  const floor = pick(rng, missionFloors);
  const destination = categoryId === "extermination"
    ? getProgressDestination(profile)
    : getDestination(profile, floor, context.worldDraft);
  const objective = createObjective({ categoryId, floor, profile, rng });
  const source = pickWeighted(rng, getMissionSources(profile, categoryId));
  const difficulty = pickWeighted(rng, DIFFICULTY_MULTIPLIERS);
  const rewardMultiplier = getRewardMultiplier(categoryId, difficulty.value);
  const title = pick(rng, category.titleTemplates);
  const proofType = pick(rng, category.proofTemplates);
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
    multiplier: rewardMultiplier,
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
    issuer: source.label,
    sourceId: source.id || slugify(source.label),
    sourceKind: getSourceKind(source),
    title,
    description: createMissionText({ destination, objective, source }),
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
    difficulty: difficulty.id,
    difficultyLabel: difficulty.label,
    proofType,
    reward,
    integration: {
      capability: destination.kind === "progress" ? "progress-counter" : "floor-indicator",
      eventType: objective.kind,
      eventPayload: {
        floor: destination.floor,
        targetId: objective.targetId,
        targetName: objective.targetName
      },
      bindings: [],
      state: "pending"
    }
  };
}

function getOfferCount(rules, rng) {
  const minimum = Math.max(1, Number(rules.offerCountMin || 1));
  const maximum = Math.max(minimum, Number(rules.offerCountMax || 8));

  return randomInt(rng, minimum, maximum);
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
  const rng = createRng(`${context.currentSeed}|missions|${context.profileId}`);
  const offerCount = getOfferCount(rules, rng);
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
