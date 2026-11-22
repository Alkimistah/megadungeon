import { calculateCombatND, formatChallengeRating, isSpecialChallengeRating } from "./challenge.js";
import { creatureCatalog, formatCreatureCatalogName, getAutomaticCreatureCatalog, getCreatureById } from "./creatureCatalog/index.js";
import { CONDITIONS, PLACES, TERRAINS } from "./creatureCatalog/ecologyVocabulary.js";
import { filterManualEncounterCreatures } from "./manualEncounterCatalog.js";
import { createEncounterCombatPage, getDefaultEncounterItemKey } from "./nodeDialog.js";
import { CREATURE_TYPES } from "./creatures.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { createRandomSeed, createRng, pickWeighted } from "./random.js";
import { THREAT_CHALLENGE_ORDER, THREAT_ROLES } from "./threatCreationRules.js";
import { assignTrapProfile } from "./traps.js";

function createOption(value, label) {
  const option = document.createElement("option");

  option.value = String(value);
  option.textContent = label;

  return option;
}

function populateChallengeOptions(selectElement) {
  selectElement.innerHTML = "";

  const numericRatings = [...THREAT_CHALLENGE_ORDER.filter(Number.isFinite), 0.75].sort((first, second) => first - second);
  numericRatings.forEach((challengeRating) => {
    selectElement.appendChild(
      createOption(challengeRating, `ND ${formatChallengeRating(challengeRating)}`)
    );
  });

  selectElement.value = "3";
}

const LEGACY_TERRAIN_LABELS = { colina: "Colinas", planicie: "Planície aberta" };

function populateOptions(select, emptyLabel, options) {
  select.replaceChildren(createOption("", emptyLabel), ...options.map(({ id, label }) => createOption(id, label)));
}

function populateCatalogFilters(filters) {
  const typeOptions = Object.values(CREATURE_TYPES);
  const typeIds = new Set(typeOptions.map(({ id }) => id));
  for (const { type } of creatureCatalog) {
    if (!typeIds.has(type)) {
      typeIds.add(type);
      typeOptions.push({ id: type, label: type === "event" ? "Evento" : "Desconhecido" });
    }
  }
  const ratings = [...new Set(creatureCatalog.map(({ challengeRating }) => challengeRating))];
  const numericRatings = ratings.filter(Number.isFinite).sort((first, second) => first - second);
  const specialRatings = ratings.filter(isSpecialChallengeRating);
  const books = [...new Set(creatureCatalog.flatMap(({ sources, source }) => (sources ?? [source])
    .map(value => value?.book)).filter(Boolean))].sort((first, second) => first.localeCompare(second, "pt-BR"));

  populateOptions(filters.terrain, "Todos os terrenos", TERRAINS);
  populateOptions(filters.place, "Todos os lugares", PLACES);
  populateOptions(filters.condition, "Todas as condições", CONDITIONS);
  populateOptions(filters.type, "Todos os tipos", typeOptions);
  populateOptions(filters.challenge, "Todos os NDs", [...numericRatings, ...specialRatings]
    .map(id => ({ id, label: formatChallengeRating(id) })));
  populateOptions(filters.role, "Todos os papéis", Object.values(THREAT_ROLES));
  populateOptions(filters.book, "Todos os livros", books.map(id => ({ id, label: id })));
}

function getTypeWeights(profile, terrainName) {
  return terrainName
    ? profile.creatureRules?.typeWeightsByTerrain?.[terrainName] || profile.creatureRules?.defaultTypeWeights
    : profile.creatureRules?.defaultTypeWeights;
}

function pickCreatureType(profile, terrainName, selectedType, rng) {
  if (selectedType && selectedType !== "auto") return selectedType;

  const options = getTypeWeights(profile, terrainName) || Object.keys(CREATURE_TYPES).map((type) => ({
    type,
    weight: 1
  }));

  return pickWeighted(rng, options).type;
}

function getTrapProfile(profile, trapMode) {
  if (trapMode !== "incidental") return profile;

  return {
    ...profile,
    trapRules: {
      ...(profile.trapRules || {}),
      incidentalChance: 1,
      incidentalChanceByRoomType: {
        normal: 1,
        elite: 1,
        boss: 1
      }
    }
  };
}

function createManualNode({
  challengeRating, profile, rng, seed, terrainName, trapMode, type, fixedCreature, quantity, creatureCandidates
}) {
  const node = {
    id: `manual-${seed}`,
    encounterSeed: `manual-${seed}`,
    type: trapMode === "primary" ? "trap" : "normal",
    label: "Encontro manual",
    short: "M",
    level: 0,
    column: 0,
    environment: {
      terrain: {
        name: terrainName || "Sem terreno específico",
        effect: "",
        features: []
      },
      climate: []
    },
    challenge: {
      climate: 0,
      encounter: challengeRating,
      terrain: 0,
      total: challengeRating
    },
    creature: null,
    trap: null,
    resolvedEncounter: null
  };

  if (trapMode === "none") {
    node.challenge.trap = 0;
    node.challenge.creatures = challengeRating;
    node.challenge.encounterBudgetLabel = `ND ${formatChallengeRating(challengeRating)} para criaturas`;
  } else {
    assignTrapProfile(node, getTrapProfile(profile, trapMode), rng);
  }

  if (fixedCreature) {
    node.fixedComposition = {
      creatures: [{ id: fixedCreature.id, quantity }],
      traps: [],
      useWeaponVariation: false
    };
  } else if (node.challenge.creatures > 0) {
    const creatureType = CREATURE_TYPES[type] || CREATURE_TYPES.monster;

    node.creature = {
      challengeSource: "manual",
      creatureId: null,
      creatureName: null,
      creatureRole: null,
      creatureRoleLabel: null,
      defaultPartySize: profile.creatureRules?.defaultPartySize || 4,
      groupGuidance: profile.creatureRules?.groupGuidance || [],
      targetChallenge: node.challenge.creatures,
      targetChallengeLabel: formatChallengeRating(node.challenge.creatures),
      type: creatureType.id,
      typeDescription: creatureType.description,
      typeLabel: creatureType.label
    };
  }

  resolveNodeEncounter(node, { mapSeed: `manual-${seed}`, profile, creatureCandidates });

  return node;
}

export function createManualEncounterDialogController({
  catalogStatus,
  challengeInput,
  closeButton,
  compositionInput,
  creatureInput,
  dialogElement,
  filters,
  formElement,
  getActiveMissions = () => [],
  getProfile,
  onAdjustMissionProgress = null,
  openButton,
  quantityField,
  quantityInput,
  resultElement,
  trapModeInput
}) {
  let currentNode = null;
  let selectedItemKey = null;
  let generationNotice = "";
  let matchingCreatures = [];
  // Perfil avulso (ferramentas rápidas da tela inicial): sem sessão ativa.
  let standaloneProfile = null;
  const currentProfile = () => standaloneProfile || getProfile();

  function renderResult() {
    resultElement.innerHTML = "";

    if (!currentNode?.resolvedEncounter) {
      const notice = document.createElement("p");
      notice.className = "hidden-environment-notice";
      notice.textContent = generationNotice || "Escolha uma ficha ou defina o orçamento e gere um encontro.";
      resultElement.appendChild(notice);
      return;
    }

    selectedItemKey = selectedItemKey || getDefaultEncounterItemKey(currentNode);
    resultElement.appendChild(createEncounterCombatPage(currentNode, selectedItemKey, (nextKey) => {
      selectedItemKey = nextKey;
      renderResult();
    }, standaloneProfile ? [] : getActiveMissions(), (missionId, delta) => {
      if (!standaloneProfile) onAdjustMissionProgress?.(missionId, delta);
      renderResult();
    }, { onEncounterAdjusted: renderResult }));
  }

  function generateEncounter() {
    const profile = currentProfile();
    const seed = createRandomSeed();
    const rng = createRng(`manual-${seed}`);
    const fixedCreature = getCreatureById(creatureInput.value);
    const composition = compositionInput.value;
    const trapMode = fixedCreature ? "none" : trapModeInput.value;
    if (composition && !fixedCreature) {
      generationNotice = "Escolha uma ficha para montar esta composição.";
      currentNode = null;
      renderResult();
      return;
    }
    const quantity = composition === "grupo" ? quantityInput.valueAsNumber : 1;
    if (fixedCreature && !quantityInput.disabled && !quantityInput.checkValidity()) return;
    const challengeRating = fixedCreature ? calculateCombatND([{
      challengeRating: fixedCreature.challengeRating,
      quantity
    }]) : Number(challengeInput.value);
    const terrain = filters.terrain.value;
    const terrainName = LEGACY_TERRAIN_LABELS[terrain] || TERRAINS.find(tag => tag.id === terrain)?.label;
    const type = fixedCreature?.type ?? pickCreatureType(profile, terrainName, filters.type.value, rng);
    const book = filters.book.value;
    const availableCreatures = book && profile.disabledCreatureBooks?.includes(book) ? [] : matchingCreatures;
    const creatureCandidates = fixedCreature ? undefined : getAutomaticCreatureCatalog(profile, availableCreatures);
    currentNode = createManualNode({
      challengeRating,
      profile,
      rng,
      seed,
      terrainName,
      trapMode,
      type,
      fixedCreature,
      quantity,
      creatureCandidates
    });
    generationNotice = "Nenhuma ficha disponível para sorteio com esses filtros e este orçamento.";
    if (currentNode.challenge.creatures > 0 &&
        !currentNode.resolvedEncounter?.items.some(item => item.kind === "creature")) {
      currentNode = null;
    }
    selectedItemKey = null;
    renderResult();
  }

  function syncSelection() {
    const composition = compositionInput.value;
    const usesExactCreature = Boolean(creatureInput.value || composition);
    for (const control of [challengeInput, trapModeInput]) {
      control.disabled = usesExactCreature;
    }
    quantityField.hidden = composition !== "grupo";
    quantityInput.disabled = quantityField.hidden;
  }

  function syncCatalog() {
    const selection = creatureInput.value;
    const activeFilters = Object.fromEntries(Object.entries(filters).map(([key, input]) => [key, input.value]));
    const composition = compositionInput.value;
    if (composition === "enxame") activeFilters.group = "enxame";
    matchingCreatures = filterManualEncounterCreatures(activeFilters)
      .filter(creature => {
        if (composition === "grupo" && !Number.isFinite(creature.challengeRating)) return false;
        return !["grupo", "solitaria"].includes(composition) || creature.ecology?.group !== "enxame";
      });
    const options = matchingCreatures
      .map(creature => createOption(creature.id, formatCreatureCatalogName(creature)))
      .sort((first, second) => first.textContent.localeCompare(second.textContent, "pt-BR"));
    creatureInput.replaceChildren(createOption("", composition ? "Escolher uma ficha" : "Gerar pelo orçamento"), ...options);
    if (matchingCreatures.some(creature => creature.id === selection)) creatureInput.value = selection;
    catalogStatus.hidden = matchingCreatures.length > 0;
    catalogStatus.textContent = catalogStatus.hidden ? "" : "Nenhuma ficha corresponde aos filtros.";
    syncSelection();
  }

  populateChallengeOptions(challengeInput);
  populateCatalogFilters(filters);
  for (const [key, input] of Object.entries(filters)) {
    input.addEventListener(key === "query" ? "input" : "change", syncCatalog);
  }
  compositionInput.addEventListener("change", syncCatalog);
  creatureInput.addEventListener("change", syncSelection);
  syncCatalog();
  renderResult();

  function openStandalone(profile) {
    standaloneProfile = profile;
    currentNode = null;
    selectedItemKey = null;
    generationNotice = "";
    renderResult();
    syncCatalog();
    if (!dialogElement.open) dialogElement.showModal();
  }

  dialogElement.addEventListener("close", () => {
    if (!standaloneProfile) return;
    standaloneProfile = null;
    currentNode = null;
    selectedItemKey = null;
    generationNotice = "";
    renderResult();
    syncCatalog();
  });

  openButton.addEventListener("click", () => {
    syncCatalog();
    if (!dialogElement.open) dialogElement.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialogElement.close();
  });

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    generateEncounter();
  });

  return {
    generateEncounter,
    openStandalone,
    syncProfileOptions: syncCatalog
  };
}
