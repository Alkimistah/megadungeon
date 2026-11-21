import { formatChallengeRating, isSpecialChallengeRating } from "./challenge.js";
import { creatureCatalog, formatCreatureCatalogName, getCreatureById } from "./creatureCatalog/index.js";
import { createEncounterCombatPage, getDefaultEncounterItemKey } from "./nodeDialog.js";
import { CREATURE_TYPES } from "./creatures.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { createRandomSeed, createRng, pickWeighted } from "./random.js";
import { assignTrapProfile } from "./traps.js";

const CHALLENGE_OPTIONS = [
  0.25,
  0.5,
  0.75,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
];

function createOption(value, label) {
  const option = document.createElement("option");

  option.value = String(value);
  option.textContent = label;

  return option;
}

function populateChallengeOptions(selectElement) {
  selectElement.innerHTML = "";

  CHALLENGE_OPTIONS.forEach((challengeRating) => {
    selectElement.appendChild(
      createOption(challengeRating, `ND ${formatChallengeRating(challengeRating)}`)
    );
  });

  selectElement.value = "3";
}

function populateCreatureTypeOptions(selectElement) {
  selectElement.innerHTML = "";
  selectElement.appendChild(createOption("auto", "Automático pelo terreno"));

  Object.values(CREATURE_TYPES).forEach((type) => {
    selectElement.appendChild(createOption(type.id, type.label));
  });
}

function populateTerrainOptions(selectElement, profile) {
  const terrains = Object.keys(profile.creatureRules?.typeWeightsByTerrain || {});

  selectElement.innerHTML = "";
  selectElement.appendChild(createOption("", "Sem terreno específico"));

  terrains.forEach((terrain) => {
    selectElement.appendChild(createOption(terrain, terrain));
  });
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

function createManualNode({ challengeRating, profile, rng, seed, terrainName, trapMode, type, fixedCreature }) {
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
      creatures: [{ id: fixedCreature.id, quantity: 1 }],
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

  resolveNodeEncounter(node, { mapSeed: `manual-${seed}`, profile });

  return node;
}

export function createManualEncounterDialogController({
  challengeInput,
  closeButton,
  creatureInput,
  creatureTypeInput,
  dialogElement,
  formElement,
  getActiveMissions = () => [],
  getProfile,
  onAdjustMissionProgress = null,
  openButton,
  resultElement,
  terrainInput,
  trapModeInput
}) {
  let currentNode = null;
  let selectedItemKey = null;
  // Perfil avulso (ferramentas rápidas da tela inicial): sem sessão ativa.
  let standaloneProfile = null;
  const currentProfile = () => standaloneProfile || getProfile();

  function renderResult() {
    resultElement.innerHTML = "";

    if (!currentNode?.resolvedEncounter) {
      const notice = document.createElement("p");
      notice.className = "hidden-environment-notice";
      notice.textContent = "Escolha uma ficha ou defina o orçamento e gere um encontro.";
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
    const challengeRating = fixedCreature?.challengeRating ?? Number(challengeInput.value);
    const terrainName = terrainInput.value;
    const type = fixedCreature?.type ?? pickCreatureType(profile, terrainName, creatureTypeInput.value, rng);

    currentNode = createManualNode({
      challengeRating,
      profile,
      rng,
      seed,
      terrainName,
      trapMode: fixedCreature ? "none" : trapModeInput.value,
      type,
      fixedCreature
    });
    selectedItemKey = null;
    renderResult();
  }

  function syncProfileOptions() {
    populateTerrainOptions(terrainInput, currentProfile());
  }

  populateChallengeOptions(challengeInput);
  populateCreatureTypeOptions(creatureTypeInput);
  const options = creatureCatalog
    .filter(creature => Number.isFinite(creature.challengeRating) || isSpecialChallengeRating(creature.challengeRating))
    .map(creature => createOption(creature.id, formatCreatureCatalogName(creature)))
    .sort((a, b) => a.textContent.localeCompare(b.textContent, "pt-BR"));
  creatureInput.replaceChildren(createOption("", "Gerar pelo orçamento"), ...options);
  const syncSelection = () => {
    const usesExactCreature = Boolean(creatureInput.value);
    for (const control of [challengeInput, creatureTypeInput, trapModeInput]) {
      control.disabled = usesExactCreature;
    }
  };
  creatureInput.addEventListener("change", syncSelection);
  syncSelection();
  syncProfileOptions();
  renderResult();

  function openStandalone(profile) {
    standaloneProfile = profile;
    currentNode = null;
    selectedItemKey = null;
    renderResult();
    syncProfileOptions();
    if (!dialogElement.open) dialogElement.showModal();
  }

  dialogElement.addEventListener("close", () => {
    if (!standaloneProfile) return;
    standaloneProfile = null;
    currentNode = null;
    selectedItemKey = null;
    renderResult();
    syncProfileOptions();
  });

  openButton.addEventListener("click", () => {
    syncProfileOptions();
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
    syncProfileOptions
  };
}
