import { formatChallengeRating } from "../challenge.js";
import { getAutomaticCreatureCatalog, getCreatureById, isAutomaticCreature } from "../creatureCatalog/index.js";
import { getIslandCreatureIds, getOutOfPlaceCreatureIds } from "../archipelagoCreatureRules.js";
import { createRng, pick, pickWeighted, randomInt } from "../random.js";
import { getArchipelagoMissionTheme } from "./archipelagoMissionThemes.js";
import { DEFAULT_CATEGORY_WEIGHTS, DEFAULT_ISSUER_WEIGHTS, DIFFICULTY_MULTIPLIERS, MISSION_CATEGORIES } from "./missionTables.js";
import { calculateMissionReward } from "./missionRewards.js";
import { getMissionFloors, validateMission } from "./missionValidator.js";

const CATEGORY_REWARD_BONUS = 1.15;
const DIRECT_COMBAT_CATEGORIES = new Set(["extermination", "specialHunt"]);
const FEATURED_CHANCE = 1 / 3;
const OUT_OF_PLACE_CHANCE = 1 / 4;
const FEATURED_TARGET_TYPES = {
  recovery: "object",
  investigation: "clue",
  exploration: "location",
  collection: "material",
  trial: "challenge",
  rescue: "memento",
  escort: "memento",
  anomalous: "phenomenon",
  specialHunt: "creature"
};

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

function getFallbackCreatureCandidates(profile, floor) {
  const targetChallenge = getRewardChallengeByFloor(profile, floor);
  const minimumChallenge = Math.max(0.25, targetChallenge - 2);
  const maximumChallenge = Math.min(10, Math.max(targetChallenge, minimumChallenge));
  const typeWeights = profile.creatureRules?.defaultTypeWeights || [];
  const allowedTypes = new Set(typeWeights.map((entry) => entry.type));

  return getAutomaticCreatureCatalog(profile).filter((creature) => (
    typeof creature.challengeRating === "number"
      && creature.challengeRating >= minimumChallenge
      && creature.challengeRating <= maximumChallenge
      && (!allowedTypes.size || allowedTypes.has(creature.type))
  ));
}

function getPreferredCreatureCandidates(candidates, profile, floor, categoryId) {
  if (!candidates.length) return candidates;

  const targetChallenge = getRewardChallengeByFloor(profile, floor);
  const minimumChallenge = Math.max(0.25, targetChallenge - (categoryId === "specialHunt" ? 0.5 : 1));
  const maximumChallenge = Math.max(targetChallenge, targetChallenge + (categoryId === "specialHunt" ? 1 : 0.5));
  const preferred = candidates.filter((creature) =>
    creature.challengeRating >= minimumChallenge
    && creature.challengeRating <= maximumChallenge
  );

  return preferred.length ? preferred : candidates;
}

function pickFallbackCreature(profile, floor, rng) {
  const candidates = getFallbackCreatureCandidates(profile, floor);

  if (!candidates.length) return null;

  const typeWeights = profile.creatureRules?.defaultTypeWeights || [];
  const availableTypes = new Set(candidates.map((creature) => creature.type));
  const weightedTypes = typeWeights.filter((entry) => availableTypes.has(entry.type));
  const type = weightedTypes.length ? pickWeighted(rng, weightedTypes).type : null;
  const typedCandidates = type ? candidates.filter((creature) => creature.type === type) : candidates;

  return pick(rng, typedCandidates.length ? typedCandidates : candidates);
}

function getCreatureTarget(profile, floor, rng, categoryId) {
  const creatureRuleIds = profile.creatureRules?.allowedCreatureIdsByFloor?.[floor]
    || profile.creatureRules?.allowedCreatureIds
    || [];
  const profileTargetIds = profile.missionRules?.creatureTargetIds || [];
  const categoryTargetIds = categoryId === "extermination"
    ? profile.missionRules?.exterminationTargetIds
    : categoryId === "specialHunt"
      ? profile.missionRules?.specialHuntTargetIds
      : null;
  const missionTargetIds = profile.missionRules?.creatureTargetIdsByFloor?.[floor]
    || categoryTargetIds
    || profileTargetIds
    || [];
  const allowedIds = creatureRuleIds.length ? creatureRuleIds : missionTargetIds;
  const maximumChallenge = missionTargetIds.length && !creatureRuleIds.length
    ? Math.max(1, getRewardChallengeByFloor(profile, floor) + (categoryId === "specialHunt" ? 1 : 0))
    : 10;
  let candidates = allowedIds
    .map((id) => getCreatureById(id))
    .filter((creature) => creature && isAutomaticCreature(creature, profile) &&
      typeof creature.challengeRating === "number" && creature.challengeRating <= maximumChallenge);

  candidates = getPreferredCreatureCandidates(candidates, profile, floor, categoryId);

  if (!candidates.length && categoryTargetIds?.length && profileTargetIds.length) {
    candidates = profileTargetIds
      .map((id) => getCreatureById(id))
      .filter((creature) => creature && isAutomaticCreature(creature, profile) &&
        typeof creature.challengeRating === "number" && creature.challengeRating <= maximumChallenge);
    candidates = getPreferredCreatureCandidates(candidates, profile, floor, categoryId);
  }

  const canUseCatalogFallback = !creatureRuleIds.length && !missionTargetIds.length && !profileTargetIds.length;
  const creature = candidates.length
    ? pick(rng, candidates)
    : canUseCatalogFallback
      ? pickFallbackCreature(profile, floor, rng)
      : null;

  if (!creature) return null;

  return {
    id: creature.id,
    name: creature.name,
    challenge: creature.challengeRating,
    type: "creature"
  };
}

function toHuntTarget(creature) {
  return {
    id: creature.id,
    name: creature.name,
    challenge: creature.challengeRating,
    type: "creature"
  };
}

// Janela de ND da caçada; sem ninguém na janela, o alvo é a criatura mais forte até ND do andar + 1.
function getHuntCandidates(ids, profile, floor) {
  const candidates = ids
    .map((id) => getCreatureById(id))
    .filter((creature) => creature && isAutomaticCreature(creature, profile) &&
      typeof creature.challengeRating === "number");
  const targetChallenge = getRewardChallengeByFloor(profile, floor);
  const minimumChallenge = Math.max(0.25, targetChallenge - 0.5);
  const maximumChallenge = targetChallenge + 1;
  const preferred = candidates.filter((creature) =>
    creature.challengeRating >= minimumChallenge && creature.challengeRating <= maximumChallenge);

  if (preferred.length) return preferred;

  const belowLimit = candidates.filter((creature) => creature.challengeRating <= maximumChallenge);
  if (!belowLimit.length) return [];

  const strongest = Math.max(...belowLimit.map((creature) => creature.challengeRating));
  return belowLimit.filter((creature) => creature.challengeRating === strongest);
}

// Caçada numa ilha com tema: o alvo vem do elenco da ilha; às vezes, de outro lugar do arquipélago.
function getIslandHuntTarget(profile, floor, rng, themeId) {
  const outOfPlace = rng() < OUT_OF_PLACE_CHANCE;
  const ids = outOfPlace ? getOutOfPlaceCreatureIds(themeId) : getIslandCreatureIds(themeId);
  const candidates = getHuntCandidates(ids, profile, floor);

  if (candidates.length) return { ...toHuntTarget(pick(rng, candidates)), outOfPlace };

  const fallback = getCreatureTarget(profile, floor, rng, "specialHunt");
  return fallback ? { ...fallback, outOfPlace: false } : null;
}

function getPoolValue(profile, poolName, rng, themePools = null) {
  const genericValues = profile.missionRules?.targetPools?.[poolName] || [];
  const values = themePools ? [...(themePools[poolName] || []), ...genericValues] : genericValues;

  if (!values.length) return null;
  return pick(rng, values);
}

function getLocation(profile, floor, rng, themePools) {
  return getPoolValue(profile, "locations", rng, themePools) || `um ponto instável do andar ${floor}`;
}

function getMaterial(profile, rng, themePools) {
  return getPoolValue(profile, "materials", rng, themePools) || "amostras úteis";
}

function getObject(profile, rng, themePools) {
  return getPoolValue(profile, "objects", rng, themePools) || "um objeto extraviado";
}

function getMemento(profile, rng, themePools) {
  return getPoolValue(profile, "mementos", rng, themePools) || "um pertence sentimental";
}

function getPhenomenon(profile, rng, themePools) {
  return getPoolValue(profile, "phenomena", rng, themePools) || "um fenômeno instável";
}

function getDestination(profile, floor, worldDraft = null) {
  const mode = profile.mode || "node-map";

  if (mode === "archipelago") {
    const island = worldDraft?.islands?.find((item) => item.floor === floor);

    return {
      kind: "island",
      floor,
      floorMin: floor,
      floorMax: floor,
      targetId: island?.themeId || null,
      label: `Ilha ${floor}`,
      islandName: island?.name || null
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

function createFeaturedObjective({ featured, floor, profile, rng, themeId }) {
  const category = MISSION_CATEGORIES[featured.category];
  const targetType = FEATURED_TARGET_TYPES[featured.category] || "challenge";
  const base = {
    challenge: getRewardChallengeByFloor(profile, floor),
    condition: featured.condition,
    kind: category.objectiveKind,
    progressMode: "single",
    quantity: 1,
    targetId: slugify(featured.targetName),
    targetName: featured.targetName,
    targetType,
    turnInValue: 0
  };

  if (targetType === "creature") {
    const creature = getCreatureById(featured.creatureId);

    return {
      ...base,
      challenge: creature?.challengeRating ?? base.challenge,
      outOfPlace: !getIslandCreatureIds(themeId).includes(featured.creatureId),
      targetId: featured.creatureId,
      targetName: featured.targetName || creature?.name,
      turnInValue: null
    };
  }

  if (targetType === "material") {
    const quantity = randomInt(rng, 2, 5);
    return { ...base, progressMode: "aggregate", quantity };
  }

  if (["clue", "challenge", "phenomenon"].includes(targetType)) {
    return { ...base, progressMode: "manual" };
  }

  return base;
}

function createObjective({ categoryId, floor, isIsland = false, profile, rng, themeId = null, themePools = null }) {
  const category = MISSION_CATEGORIES[categoryId];
  const challenge = getRewardChallengeByFloor(profile, floor);

  if (category.targetTypes.includes("creature")) {
    const islandHunt = categoryId === "specialHunt" && isIsland;
    const target = islandHunt && themeId && getIslandCreatureIds(themeId).length > 0
      ? getIslandHuntTarget(profile, floor, rng, themeId)
      : getCreatureTarget(profile, floor, rng, categoryId);
    const quantity = categoryId === "specialHunt" ? 1 : categoryId === "extermination" ? randomInt(rng, 4, 8) : randomInt(rng, 1, 4);

    if (target) {
      return {
        ...(islandHunt ? { outOfPlace: Boolean(target.outOfPlace) } : {}),
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
      ...(islandHunt ? { outOfPlace: false } : {}),
      targetId: null,
      targetName: "ameaça adequada ao ambiente",
      targetType: "creature",
      turnInValue: 0
    };
  }

  if (categoryId === "collection") {
    const quantity = randomInt(rng, 2, 5);
    const material = getMaterial(profile, rng, themePools);
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
    const location = getLocation(profile, floor, rng, themePools);
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
    const object = getObject(profile, rng, themePools);
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
    const memento = getMemento(profile, rng, themePools);
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
    const phenomenon = getPhenomenon(profile, rng, themePools);
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
    ? getPoolValue(profile, "clues", rng, themePools) || "um vestígio contraditório"
    : getPoolValue(profile, "challenges", rng, themePools) || "um desafio local";

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
  if (objective.targetType === "material" && objective.quantity > 1) {
    const material = objective.targetName.replace(/^amostras de\s+/i, "");
    const unit = /^fragmentos|^lascas/i.test(material)
      ? "conjuntos de"
      : /^sementes/i.test(material)
        ? "punhados de"
        : /^água|^areia|^poeira|^resíduo|^sal/i.test(material)
          ? "porções de"
          : "amostras de";

    return `${objective.quantity} ${unit} ${material}`;
  }

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

function getDefiniteLabel(label) {
  return String(label || "")
    .replace(/^um\s+/i, "o ")
    .replace(/^uma\s+/i, "a ");
}

function createReferenceSentence(objective) {
  const ndText = objective.challenge ? `ND ${formatChallengeRating(objective.challenge)}` : "ND por contexto";

  return `A tarefa usa ${ndText} como referência de recompensa.`;
}

function createProgressSentence(destination, objective) {
  return destination.kind === "progress" && objective.targetType === "creature"
    ? "Qualquer inimigo desse tipo encontrado durante o progresso conta para esse objetivo."
    : "";
}

function createMissionLead(source, fallback = "O quadro de missões") {
  const sourceKind = getSourceKind(source);

  if (sourceKind === "signal") return "A pulseira destaca no mural uma missão sem fornecedor";
  if (sourceKind === "record" || sourceKind === "writtenRequest") return capitalizeFirst(getDefiniteLabel(source.label));

  return source?.label ? capitalizeFirst(source.label) : fallback;
}

function createCategorySentence({ categoryId, destinationText, objective, source, targetPhrase }) {
  const lead = createMissionLead(source);
  const sourceKind = getSourceKind(source);

  if (categoryId === "extermination") {
    return sourceKind === "signal"
      ? `${lead}: reduza a população de ${objective.targetName} ao longo da faixa.`
      : `${lead} abre uma ordem de contenção: elimine ${targetPhrase} ao longo da faixa.`;
  }

  if (categoryId === "specialHunt") {
    return sourceKind === "signal"
      ? `${lead}: o rastro de ${targetPhrase} foi marcado ${destinationText}.`
      : `${lead} marcou ${targetPhrase} como alvo prioritário ${destinationText}.`;
  }

  if (categoryId === "collection") {
    return sourceKind === "record"
      ? `${lead} descreve onde coletar ${targetPhrase} ${destinationText}.`
      : `${lead} solicita ${targetPhrase} ${destinationText}; o material deve voltar preservado.`;
  }

  if (categoryId === "exploration") {
    return sourceKind === "signal"
      ? `${lead}: confirme ${targetPhrase} ${destinationText}.`
      : `${lead} quer confirmação de ${targetPhrase} ${destinationText}.`;
  }

  if (categoryId === "investigation") {
    return sourceKind === "record"
      ? `${lead} indica ${targetPhrase} ${destinationText} como pista ainda sem explicação.`
      : `${lead} precisa que o grupo investigue ${targetPhrase} ${destinationText}.`;
  }

  if (categoryId === "recovery") {
    return sourceKind === "record"
      ? `${lead} aponta ${targetPhrase} ${destinationText} como item extraviado.`
      : sourceKind === "writtenRequest"
        ? `${lead} descreve onde recuperar ${targetPhrase} ${destinationText}.`
        : `${lead} solicita a recuperação de ${targetPhrase} ${destinationText}.`;
  }

  if (categoryId === "rescue") {
    return sourceKind === "record"
      ? `${lead} vincula ${targetPhrase} ${destinationText} a alguém que ficou para trás.`
      : sourceKind === "writtenRequest"
        ? `${lead} descreve ${targetPhrase} ${destinationText} como lembrança deixada para trás.`
        : `${lead} pede que o grupo recupere ${targetPhrase} ${destinationText} como lembrança de quem não voltou.`;
  }

  if (categoryId === "escort") {
    return sourceKind === "writtenRequest"
      ? `${lead} traz instruções para entregar ${targetPhrase} ${destinationText} sem expor o pertence.`
      : `${lead} solicita a entrega protegida de ${targetPhrase} ${destinationText}.`;
  }

  if (categoryId === "trial") {
    return sourceKind === "signal"
      ? `${lead}: supere ${targetPhrase} ${destinationText}.`
      : `${lead} separou um desafio de campo: ${targetPhrase} ${destinationText}.`;
  }

  if (categoryId === "anomalous") {
    return sourceKind === "signal"
      ? `${lead}: registre ou estabilize ${targetPhrase} ${destinationText}.`
      : `${lead} quer um registro confiável de ${targetPhrase} ${destinationText}.`;
  }

  return `${lead} solicita que o grupo resolva ${targetPhrase} ${destinationText}.`;
}

function createOutOfPlaceSentence(objective) {
  return objective.outOfPlace ? "O alvo está longe de onde deveria estar." : "";
}

function createMissionText({ categoryId, destination, featured = null, objective, source }) {
  const destinationText = getDestinationPhrase(destination);

  if (featured) {
    return capitalizeFirst(`${featured.lead} ${destinationText}. ${createReferenceSentence(objective)}`);
  }

  const targetPhrase = getObjectivePhrase(objective);
  const pieces = [
    createCategorySentence({ categoryId, destinationText, objective, source, targetPhrase }),
    createOutOfPlaceSentence(objective),
    createReferenceSentence(objective),
    createProgressSentence(destination, objective)
  ].filter(Boolean);

  return capitalizeFirst(pieces.join(" "));
}

function createMissionOffer({ categoryId, context, featured = null, floor: presetFloor = null, index, rng, usedIds }) {
  const { missionFloors, profile } = context;
  const category = MISSION_CATEGORIES[categoryId];
  const floor = presetFloor ?? pick(rng, missionFloors);
  const destination = categoryId === "extermination"
    ? getProgressDestination(profile)
    : getDestination(profile, floor, context.worldDraft);
  const isIsland = destination.kind === "island";
  const themeId = isIsland ? destination.targetId : null;
  const theme = themeId ? getArchipelagoMissionTheme(themeId) : null;
  const objective = featured
    ? createFeaturedObjective({ featured, floor, profile, rng, themeId })
    : createObjective({ categoryId, floor, isIsland, profile, rng, themeId, themePools: theme?.pools || null });
  const source = pickWeighted(rng, getMissionSources(profile, categoryId));
  const difficulty = pickWeighted(rng, DIFFICULTY_MULTIPLIERS);
  const rewardMultiplier = getRewardMultiplier(categoryId, difficulty.value);
  const title = featured ? featured.title : pick(rng, category.titleTemplates);
  const proofType = featured ? featured.proofType : pick(rng, category.proofTemplates);
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
    description: createMissionText({ categoryId, destination, featured, objective, source }),
    destination,
    ...(isIsland ? { themeId, featured: Boolean(featured) } : {}),
    objective: {
      kind: objective.kind,
      challenge: objective.challenge,
      targetType: objective.targetType,
      targetId: objective.targetId,
      targetName: objective.targetName,
      quantity: objective.quantity,
      condition: objective.condition,
      progressMode: objective.progressMode,
      ...(objective.outOfPlace !== undefined ? { outOfPlace: objective.outOfPlace } : {})
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

function getIslandThemeId(context, floor) {
  return context.worldDraft?.islands?.find((island) => island.floor === floor)?.themeId || null;
}

// Arquipélago: no máximo uma oferta por ilha; a ilha com tema pode trazer a sua missão em destaque.
function generateIslandMissionOffers(context, rng, offerCount) {
  const offers = [];
  const usedCategories = new Set();
  const usedFloors = new Set();
  const usedFeaturedThemes = new Set();
  const usedIds = new Set();
  let attempts = 0;

  while (offers.length < offerCount && attempts < offerCount * 20) {
    attempts += 1;
    const freeFloors = context.missionFloors.filter((floor) => !usedFloors.has(floor));

    if (!freeFloors.length) break;

    const floor = pick(rng, freeFloors);
    const themeId = getIslandThemeId(context, floor);
    const featuredEntry = themeId && !usedFeaturedThemes.has(themeId)
      ? getArchipelagoMissionTheme(themeId)?.featured || null
      : null;
    const featured = featuredEntry && rng() < FEATURED_CHANCE ? featuredEntry : null;
    const categoryId = featured
      ? featured.category
      : pickWeighted(rng, getWeightedCategories(context.profile, usedCategories)).categoryId;
    const mission = createMissionOffer({
      categoryId,
      context,
      featured,
      floor,
      index: offers.length + attempts,
      rng,
      usedIds
    });
    const validation = validateMission(mission, context);

    if (!validation.valid) continue;

    offers.push(mission);
    usedCategories.add(categoryId);
    usedFloors.add(floor);
    if (featured) usedFeaturedThemes.add(themeId);
  }

  return offers;
}

export function generateMissionOffers(context) {
  const rules = context.profile.missionRules || {};
  const rng = createRng(`${context.currentSeed}|missions|${context.profileId}`);
  const offerCount = getOfferCount(rules, rng);

  if (context.mode === "archipelago") return generateIslandMissionOffers(context, rng, offerCount);

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
