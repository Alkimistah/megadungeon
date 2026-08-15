import { formatChallengeRating } from "./challenge.js";
import { getCreatureById } from "./creatureCatalog/index.js";
import { getDamageType } from "./damageTypes.js";
import { getWeaponVariationLabel } from "./equipment/weaponVariation.js";
import { getEncounterMissionMatches } from "./missions/missionEncounterIntegration.js";
import { createNodeTacticalMap } from "./nodeTacticalMap.js";
import { openTacticalMapFullscreen } from "./tacticalMapRenderer.js";
import { getTrapById } from "./traps.js";
import { assetUrl } from "./assetUrl.js";

const COMBAT_ICON = assetUrl("/assets/icons/winged-sword.svg");
const ENVIRONMENT_ICON = assetUrl("/assets/icons/earth-arrow-left.svg");
const TACTICAL_MAP_ICON = assetUrl("/assets/icons/game-icons--treasure-map.svg");

function createNodeMissionNotice(node, onOpenMission, state) {
  if (!node.missionBindings?.length) return null;
  if (!state.isNodeChosen(node)) return null;

  const notice = document.createElement("div");
  const title = document.createElement("strong");
  const text = document.createElement("span");
  const actions = document.createElement("div");

  notice.className = "mission-inline-indicator";
  actions.className = "mission-context-actions";
  title.textContent = "Missão";
  text.textContent = node.missionBindings
    .map((mission) => mission.context ? `${mission.title} (${mission.context})` : mission.title)
    .join(", ");
  node.missionBindings.forEach((mission) => {
    const button = document.createElement("button");
    button.className = "extended-action is-compact mission-context-action";
    button.type = "button";
    button.textContent = "Realizar missão";
    button.addEventListener("click", () => onOpenMission(mission.id));
    actions.appendChild(button);
  });
  notice.append(title, text, actions);

  return notice;
}

function createEnvironmentGroup(title, items) {
  const section = document.createElement("section");
  const heading = document.createElement("h3");
  const list = document.createElement("ul");

  heading.textContent = title;
  section.className = "environment-group";
  list.className = "environment-list";

  items.forEach((item) => {
    const entry = document.createElement("li");
    const name = document.createElement("strong");
    const effect = document.createElement("span");

    name.textContent = item.name;
    effect.textContent = item.effect;

    entry.appendChild(name);
    entry.appendChild(effect);
    list.appendChild(entry);
  });

  section.appendChild(heading);
  section.appendChild(list);

  return section;
}

function formatSkillCheck(check) {
  if (!check) return "Sem CD cadastrada";
  return `${check.skill} CD ${check.dc}`;
}

function formatTrapSave(save) {
  if (!save) return "Sem teste de resistência";
  if (Array.isArray(save)) {
    return save.map((entry) => `${entry.ability} CD ${entry.dc} (${entry.effect})`).join("; ");
  }
  return `${save.ability} CD ${save.dc} (${save.effect})`;
}

function formatAdditionalTrapTests(tests = []) {
  if (!tests.length) return null;

  return tests.map((test) => {
    const action = test.action ? `, ${test.action}` : "";
    return `${test.test} CD ${test.dc}${action}: ${test.purpose}`;
  }).join("; ");
}

function formatTrapDamageTypes(trap) {
  if (!trap.damageTypes?.length) return null;

  return trap.damageTypes
    .map((damageType) => getDamageType(damageType)?.label || damageType)
    .join(", ");
}

function formatAttribute(value) {
  return value === null || value === undefined ? "—" : String(value);
}

function formatAttributes(attributes = {}) {
  return [
    `For ${formatAttribute(attributes.str)}`,
    `Des ${formatAttribute(attributes.dex)}`,
    `Con ${formatAttribute(attributes.con)}`,
    `Int ${formatAttribute(attributes.int)}`,
    `Sab ${formatAttribute(attributes.wis)}`,
    `Car ${formatAttribute(attributes.cha)}`
  ].join(", ");
}

function createDetailLine(label, value) {
  const item = document.createElement("p");
  const name = document.createElement("strong");
  const text = document.createElement("span");

  item.className = "detail-line";
  name.textContent = `${label}: `;
  text.textContent = value;

  item.appendChild(name);
  item.appendChild(text);

  return item;
}

function formatModifier(value) {
  if (value === null || value === undefined) return "?";
  return value > 0 ? `+${value}` : String(value);
}

function createSheetLine(label, value, label2=null, value2=null) {
  const item = document.createElement("p");
  const name = document.createElement("strong");
  const text = document.createElement("span");
  let name2 = null;
  let text2 = null;
  if(label2 !== null){
    name2 = document.createElement("strong");
  }
  if(value2 !== null){
    text2 = document.createElement("span");
  }

  item.className = "sheet-line";
  name.textContent = `${label} `;
  text.textContent = value;
  if(label2 !== null){
    name2.textContent = `${label2} `;
  }
  if(value2 !== null){
    text2.textContent = value2;
  }

  item.appendChild(name);
  item.appendChild(text);
  if(label2 !== null){
    item.appendChild(name2);
  }
  if(value2 !== null){
    item.appendChild(text2);
  }

  return item;
}

function createSheetAbilityLine(label, text) {
  const item = document.createElement("p");
  const name = document.createElement("strong");
  const description = document.createElement("span");

  item.className = "sheet-ability-line";
  name.textContent = `${label} `;
  description.textContent = text;

  item.appendChild(name);
  item.appendChild(description);

  return item;
}

function createTextList(className, entries) {
  const list = document.createElement("ul");

  list.className = className;

  entries.filter(Boolean).forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry.text || entry;
    list.appendChild(item);
  });

  return list;
}

function createModalCheckbox(className, checked, disabled, labelText, onChange) {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const text = document.createElement("span");

  label.className = className;
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  checkbox.disabled = disabled;
  text.textContent = labelText;

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      onChange();
    }
  });

  label.appendChild(checkbox);
  label.appendChild(text);

  return label;
}

function createIconButton(className, icon, label, onClick) {
  const button = document.createElement("button");
  const image = document.createElement("img");

  button.type = "button";
  button.className = className;
  button.setAttribute("aria-label", label);
  button.title = label;
  image.src = icon;
  image.alt = "";
  button.appendChild(image);
  button.addEventListener("click", onClick);

  return button;
}

function getChallengeText(node, state) {
  if (!state.isNodeRevealed(node)) return "Desconhecido";
  return `ND ${formatChallengeRating(node.challenge.total)}`;
}

function setNodeDialogMeta(element, checkText, explorationText, challengeText) {
  element.innerHTML = `<strong>Teste:</strong> ${checkText} | <strong>Exploração:</strong> ${explorationText} | <strong>Desafio:</strong> ${challengeText}`;
}

function getNodeDialogTitle(node, state) {
  if (!state.isNodeRevealed(node)) {
    return "Caminho desconhecido";
  }

  if (node.type === "unknown" && state.isNodeChosen(node)) {
    return node.revealedLabel;
  }

  return node.label;
}

function createDivider() {
  const divider = document.createElement("hr");

  divider.className = "modal-divider";

  return divider;
}

function canShowEnvironmentDetails(node, state) {
  return !state.isUnknownPathsEnabled() || state.isNodeExplored(node) || state.isNodeChosen(node);
}

function createHiddenEnvironmentNotice() {
  const notice = document.createElement("p");

  notice.className = "hidden-environment-notice";
  notice.textContent = "Clima e terreno desconhecidos. Explore ou escolha a rota para conhecer mais detalhes.";

  return notice;
}

function createEnvironmentColumns(node) {
  const columns = document.createElement("div");
  const terrainTitle = `Terreno (ND ${formatChallengeRating(node.challenge.terrain)})`;
  const climateTitle = `Clima (ND ${formatChallengeRating(node.challenge.climate)})`;

  columns.className = "environment-columns";
  columns.appendChild(
    createEnvironmentGroup(terrainTitle, [node.environment.terrain, ...node.environment.terrain.features])
  );
  columns.appendChild(createEnvironmentGroup(climateTitle, node.environment.climate));

  return columns;
}

function createModalFooter(pageToggleButton, alignment = "end", tacticalMapButton = null) {
  const footer = document.createElement("footer");
  const leftSlot = document.createElement("div");
  const centerSlot = document.createElement("div");
  const rightSlot = document.createElement("div");

  footer.className = "modal-footer";
  leftSlot.className = "modal-footer-slot is-left";
  centerSlot.className = "modal-footer-slot is-center";
  rightSlot.className = "modal-footer-slot is-right";

  if (pageToggleButton) {
    (alignment === "start" ? leftSlot : rightSlot).appendChild(pageToggleButton);
  }
  if (tacticalMapButton) centerSlot.appendChild(tacticalMapButton);

  footer.appendChild(leftSlot);
  footer.appendChild(centerSlot);
  footer.appendChild(rightSlot);
  return footer;
}

function getEncounterItemKey(item, index) {
  return `${item.kind}:${item.creatureId || item.trapId || item.name}:${index}`;
}

function createEncounterBudget(node) {
  const budget = document.createElement("p");
  const resolved = node.resolvedEncounter;
  const combatChallenge = (resolved.budget.creatures || 0) + (resolved.budget.trap || 0);

  budget.className = "encounter-budget";
  budget.textContent = `ND do combate: ${formatChallengeRating(combatChallenge)}`;

  return budget;
}

function formatMissionMatchText(match) {
  if (match.count <= 0) return `${match.mission.title}: meta atingida`;

  const countText = match.count === 1 ? "1 alvo" : `${match.count} alvos`;

  return `${match.mission.title}: conta ${countText}`;
}

function createEncounterMissionBadge(match) {
  const badge = document.createElement("span");

  badge.className = "encounter-mission-badge";
  badge.textContent = formatMissionMatchText(match);

  return badge;
}

function createEncounterMissionPanel(matches, onAdjustMissionProgress = null) {
  if (!matches.length) return null;

  const panel = document.createElement("div");
  const title = document.createElement("strong");

  panel.className = "encounter-mission-panel";
  title.textContent = "Conta para missão";
  panel.appendChild(title);
  matches.forEach((match) => {
    const row = document.createElement("div");
    const line = document.createElement("span");

    row.className = "encounter-mission-row";
    line.textContent = `${formatMissionMatchText(match)} (${match.current}/${match.required})`;
    row.appendChild(line);

    if (onAdjustMissionProgress && match.count > 0) {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "extended-action is-compact encounter-mission-action";
      button.textContent = `Somar ${match.count}`;
      button.addEventListener("click", () => onAdjustMissionProgress(match.mission.id, match.count));
      row.appendChild(button);
    }

    panel.appendChild(row);
  });

  return panel;
}

function createEncounterList(node, selectedKey, onSelect, missions = []) {
  const panel = document.createElement("section");
  const heading = document.createElement("h3");
  const list = document.createElement("div");

  panel.className = "encounter-list-panel";
  heading.textContent = "Combate";
  list.className = "encounter-list";

  node.resolvedEncounter.items.forEach((item, index) => {
    const key = getEncounterItemKey(item, index);
    const button = document.createElement("button");
    const name = document.createElement("strong");

    button.type = "button";
    const kindClass = item.kind === "trap" ? "is-trap" : "is-creature";
    const generatedClass = item.generated ? " is-generated" : "";
    button.className = `encounter-list-item ${kindClass}${generatedClass}`;
    button.classList.toggle("is-selected", key === selectedKey);
    name.textContent = item.kind === "trap"
      ? `${item.quantity} x ${item.name}`
      : `${item.quantity} x ${item.name}`;
    button.appendChild(name);
    getEncounterMissionMatches(item, missions).forEach((match) => {
      button.appendChild(createEncounterMissionBadge(match));
    });
    button.addEventListener("click", () => onSelect(key));
    list.appendChild(button);
  });

  panel.appendChild(heading);
  panel.appendChild(createEncounterBudget(node));
  panel.appendChild(list);

  return panel;
}

function formatTiming(timing) {
  if (!timing) return null;

  return timing.charAt(0).toUpperCase() + timing.slice(1);
}

function formatEntryLabel(entry) {
  if (!entry?.name) return null;

  const timing = formatTiming(entry.timing);

  if (!timing || entry.name.includes("(")) return entry.name;

  return `${entry.name} (${timing})`;
}

function removeRepeatedLabel(text, label) {
  if (!label || !text.startsWith(label)) return text.trim();

  return text.slice(label.length).trim();
}

function splitSheetAbility(text, fallbackLabel = null) {
  const knownLabels = [
    "Corpo a Corpo",
    "À Distância",
    "Agarrar Aprimorado",
    "Arremessar Rochas",
    "Ataque Furtivo",
    "Enxame"
  ];
  const label = knownLabels.find((knownLabel) => text.startsWith(knownLabel));

  if (label) {
    return { label, text: text.slice(label.length).trim() };
  }

  if (fallbackLabel && text.startsWith(fallbackLabel)) {
    return { label: fallbackLabel, text: text.slice(fallbackLabel.length).trim() };
  }

  const match = text.match(/^(.+?)(?=\s(?:Uma|Um|O|A|No|Na|Quando|Se|Criaturas|Todo|Toda|Cada|Ele|Ela)\b)/);

  if (match) {
    return { label: match[1].trim(), text: text.slice(match[1].length).trim() };
  }

  return { label: fallbackLabel || "Habilidade", text };
}

function createSheetAbilityOriginalLine(originalText) {
  const item = document.createElement("p");
  item.className = "sheet-ability-original";
  item.textContent = originalText;
  return item;
}

function appendCreatureSheetAbilities(section, entries, { preferEntryName = false } = {}) {
  entries.filter(Boolean).forEach((entry) => {
    if (preferEntryName && typeof entry === "object" && entry.name) {
      const label = formatEntryLabel(entry);
      const text = removeRepeatedLabel(entry.text || "", entry.name);

      section.appendChild(createSheetAbilityLine(label, text));
      return;
    }

    const rawText = entry.text || entry.name || entry;
    const { label, text } = splitSheetAbility(rawText, entry.name);

    section.appendChild(createSheetAbilityLine(label, text));

    if (entry.originalText) {
      section.appendChild(createSheetAbilityOriginalLine(entry.originalText));
    }
  });
}

function createCreatureDetail(item, missions = [], onAdjustMissionProgress = null) {
  const creature = item.creatureData ?? getCreatureById(item.creatureId);
  const section = document.createElement("section");
  const missionPanel = createEncounterMissionPanel(getEncounterMissionMatches(item, missions), onAdjustMissionProgress);

  section.className = "encounter-detail-card creature-detail-card tormenta-creature-sheet";

  if (!creature) {
    const heading = document.createElement("h3");
    heading.textContent = item.name;
    section.appendChild(heading);
    section.appendChild(createDetailLine("Quantidade", String(item.quantity)));
    section.appendChild(createDetailLine("ND", `ND ${item.challengeLabel}`));
    if (missionPanel) section.appendChild(missionPanel);
    section.appendChild(createDetailLine("Aviso", "Criatura não encontrada no catálogo atual."));
    return section;
  }

  const header = document.createElement("header");
  const title = document.createElement("h3");
  const challenge = document.createElement("span");
  const subtitle = document.createElement("p");
  const stats = creature.stats || {};
  const source = creature.source || creature.sources?.[0];
  const typeText = `${item.typeLabel}${creature.subtype ? ` (${creature.subtype})` : ""}`;

  header.className = "creature-sheet-header";
  title.textContent = item.name;
  challenge.textContent = `ND ${item.challengeLabel}`;
  subtitle.className = "creature-sheet-subtitle";
  subtitle.textContent = `${typeText} ${creature.size || ""} · ${item.roleLabel} · ${item.quantity} no encontro`;

  header.appendChild(title);
  if (item.generated) {
    const badge = document.createElement("span");
    badge.className = "creature-generated-badge";
    badge.textContent = "Gerada";
    header.appendChild(badge);
  }
  header.appendChild(challenge);
  section.appendChild(header);
  section.appendChild(subtitle);
  if (missionPanel) section.appendChild(missionPanel);
  section.appendChild(createDivider());

  const perceptionText = [formatModifier(stats.perception), stats.senses].filter(Boolean).join(", ");
  section.appendChild(createSheetLine("INICIATIVA", `${formatModifier(stats.initiative)},`, " PERCEPÇÃO", `${perceptionText}`));
  section.appendChild(createSheetLine("DEFESA", `${stats.defense ?? "?"}, FORT ${formatModifier(stats.fortitude)}, REF ${formatModifier(stats.reflex)}, VON ${formatModifier(stats.will)}${stats.defensesText ? `, ${stats.defensesText}` : ""}`));
  section.appendChild(createSheetLine("PONTOS DE VIDA", String(stats.hitPoints ?? "?")));

  if (stats.speedText) {
    section.appendChild(createSheetLine("DESLOCAMENTO", stats.speedText));
  }

  section.appendChild(createDivider());

  if (creature.actions?.length) {
    appendCreatureSheetAbilities(section, creature.actions);
  }

  const weaponVariationLabel = getWeaponVariationLabel(creature);
  if (weaponVariationLabel) {
    section.appendChild(createSheetLine("ARMA SORTEADA", weaponVariationLabel));
  }

  if (creature.abilities?.length) {
    if (item.generated) {
      const note = document.createElement("p");
      note.className = "creature-generated-note";
      note.textContent = "Habilidades exibem valores da criatura base.";
      section.appendChild(note);
    }
    appendCreatureSheetAbilities(section, creature.abilities, { preferEntryName: true });
  }

  if (stats.attributes) {
    section.appendChild(createDivider());
    section.appendChild(createSheetLine("", formatAttributes(stats.attributes)));
  }

  if (creature.skillsText) {
    section.appendChild(createSheetLine("PERÍCIAS", creature.skillsText.replace(/^Perícias\s*/i, "")));
  }

  if (creature.equipment) {
    section.appendChild(createSheetLine("EQUIPAMENTO", creature.equipment));
  }

  if (creature.treasure) {
    section.appendChild(createSheetLine("TESOURO", creature.treasure));
  }

  if (item.generated) {
    section.appendChild(createSheetLine("ORIGEM", `Variante gerada de ${creature.baseCreatureName || item.name}`));
  } else if (source) {
    const page = source.bookPage ? `, p. ${source.bookPage}` : "";
    section.appendChild(createSheetLine("FONTE", `${source.book}${page}`));
  }

  return section;
}

function getTrapForItem(node, item) {
  if (node.trap?.id === item.trapId) return node.trap;
  return getTrapById(item.trapId);
}

function createTrapDetail(node, item) {
  const trap = getTrapForItem(node, item);
  const section = document.createElement("section");
  const heading = document.createElement("h3");

  section.className = "encounter-detail-card trap-detail-card";
  heading.textContent = item.name;
  section.appendChild(heading);

  if (!trap) {
    section.appendChild(createDetailLine("ND", `ND ${item.challengeLabel}`));
    section.appendChild(createDetailLine("Aviso", "Armadilha não encontrada no catálogo atual."));
    return section;
  }

  const source = trap.source;
  const damageTypes = formatTrapDamageTypes(trap);
  const additionalTests = formatAdditionalTrapTests(trap.additionalTests);

  if (item.quantity > 1) section.appendChild(createDetailLine("Quantidade", String(item.quantity)));
  section.appendChild(createDetailLine("ND", `ND ${item.challengeLabel}`));
  section.appendChild(createDetailLine("Papel", `${trap.roleLabel || item.roleLabel} - ${trap.roleDescription || "Armadilha do encontro"}`));
  section.appendChild(createDetailLine("Efeito", trap.effect));
  section.appendChild(createDetailLine("Resistência", formatTrapSave(trap.save)));
  section.appendChild(createDetailLine("Investigação", formatSkillCheck(trap.detection)));
  section.appendChild(createDetailLine("Desarme", formatSkillCheck(trap.disable)));

  if (damageTypes) section.appendChild(createDetailLine("Tipo de dano", damageTypes));
  if (trap.area) section.appendChild(createDetailLine("Área", trap.area));
  if (additionalTests) section.appendChild(createDetailLine("Testes adicionais", additionalTests));
  if (trap.notes?.length) section.appendChild(createDetailLine("Observações", trap.notes.join(" ")));

  if (source) {
    const page = source.bookPage ? `, p. ${source.bookPage}` : "";
    section.appendChild(createDetailLine("Fonte", `${source.book}${page}`));
  }

  return section;
}

function createEncounterDetail(node, selectedKey, missions = [], onAdjustMissionProgress = null) {
  const panel = document.createElement("div");
  const selectedItem = node.resolvedEncounter.items.find((item, index) =>
    getEncounterItemKey(item, index) === selectedKey
  ) || node.resolvedEncounter.items[0];

  panel.className = "encounter-detail-panel";
  panel.appendChild(
    selectedItem.kind === "trap"
      ? createTrapDetail(node, selectedItem)
      : createCreatureDetail(selectedItem, missions, onAdjustMissionProgress)
  );

  return panel;
}

function getFirstEncounterItemKey(node) {
  return node.resolvedEncounter?.items?.[0]
    ? getEncounterItemKey(node.resolvedEncounter.items[0], 0)
    : null;
}

function createCombatPage(node, selectedKey, onSelect, missions = [], onAdjustMissionProgress = null) {
  const page = document.createElement("div");
  const currentSelectedKey = selectedKey || getFirstEncounterItemKey(node);

  page.className = "combat-page";
  page.appendChild(createEncounterList(node, currentSelectedKey, onSelect, missions));
  page.appendChild(createEncounterDetail(node, currentSelectedKey, missions, onAdjustMissionProgress));

  return page;
}

export function createEncounterCombatPage(node, selectedKey, onSelect = () => {}, missions = [], onAdjustMissionProgress = null) {
  return createCombatPage(node, selectedKey, onSelect, missions, onAdjustMissionProgress);
}

export function getDefaultEncounterItemKey(node) {
  return getFirstEncounterItemKey(node);
}

function createCombatUnavailableNotice() {
  const notice = document.createElement("p");

  notice.className = "hidden-environment-notice";
  notice.textContent = "Escolha esta rota para preparar as criaturas e armadilhas do encontro.";

  return notice;
}

export function createNodeDialogController({
  contentElement,
  dialogElement,
  metaElement,
  onAttempt,
  onChooseRoute,
  onExplore,
  getActiveMissions = () => [],
  onAdjustMissionProgress = null,
  onOpenMission = () => {},
  onRest,
  state,
  titleElement,
  typeElement
}) {
  let currentNode = null;
  const selectedEncounterItemByNode = new Map();
  const viewModeByNode = new Map();

  function createAttemptControl(node) {
    return createModalCheckbox(
      "modal-choice attempt-choice",
      state.isNodeAttempted(node),
      state.isNodeAttempted(node) || state.isNodeExplored(node) || state.isNodeChosen(node),
      state.isNodeAttempted(node) ? "Tentativa registrada" : "Tentativa de exploração",
      () => onAttempt(node)
    );
  }

  function createExploredControl(node) {
    const explored = state.isNodeExplored(node);
    const attempted = state.isNodeAttempted(node);
    const chosen = state.isNodeChosen(node);

    return createModalCheckbox(
      "modal-choice explored-choice",
      explored,
      explored || attempted || chosen,
      explored ? "Explorado" : "Marcar como explorado",
      () => onExplore(node)
    );
  }

  function canRestAtNode(node) {
    return node.type === "camp" || (
      node.type === "unknown" &&
      state.isNodeChosen(node) &&
      node.revealedLabel === "Acampamento"
    );
  }

  function createRestControl(node) {
    return createModalCheckbox(
      "modal-choice rest-choice",
      state.isNodeRested(node),
      !state.canRestAtNode(node),
      state.isNodeRested(node) ? "Descanso registrado" : "Grupo descansou",
      () => onRest(node)
    );
  }

  function createRouteChoiceControl(node) {
    const nodeState = state.getNodeViewState(node);

    return createModalCheckbox(
      "modal-choice route-choice",
      nodeState.chosen,
      nodeState.chosen || (!nodeState.active && !nodeState.chosen),
      nodeState.chosen ? "Rota escolhida" : "Marcar como rota escolhida",
      () => onChooseRoute(node)
    );
  }

  function canShowCombatPage(node) {
    return state.isNodeChosen(node) && Boolean(node.resolvedEncounter?.items?.length);
  }

  function canShowTacticalMap(node) {
    return canShowCombatPage(node);
  }

  function getViewMode(node) {
    const viewMode = viewModeByNode.get(node.id) || "environment";

    if (viewMode === "combat" && !canShowCombatPage(node)) return "environment";
    return viewMode;
  }

  function createPageToggleControl(node, viewMode) {
    const isCombat = viewMode === "combat";

    return createIconButton(
      `icon-button modal-page-toggle ${isCombat ? "is-return-toggle" : "is-combat-toggle"}`,
      isCombat ? ENVIRONMENT_ICON : COMBAT_ICON,
      isCombat ? "Mostrar clima e terreno" : "Mostrar criaturas e armadilhas",
      () => {
        viewModeByNode.set(node.id, isCombat ? "environment" : "combat");
        render(node);
      }
    );
  }

  function createModalActions(node) {
    const actions = document.createElement("div");

    actions.className = "modal-actions";

    if (node.skill && node.dc) {
      actions.appendChild(createAttemptControl(node));
      actions.appendChild(createExploredControl(node));
    }

    if (canRestAtNode(node)) {
      actions.appendChild(createRestControl(node));
    }

    actions.appendChild(createRouteChoiceControl(node));

    return actions;
  }

  function createTacticalMapControl(node) {
    if (!canShowTacticalMap(node)) return null;

    return createIconButton(
      "icon-button modal-tactical-map-toggle",
      TACTICAL_MAP_ICON,
      "Abrir mapa tático",
      () => openTacticalMapFullscreen(createNodeTacticalMap(node))
    );
  }

  function getSelectedEncounterItemKey(node) {
    const selectedKey = selectedEncounterItemByNode.get(node.id);
    const selectedExists = node.resolvedEncounter?.items?.some((item, index) =>
      getEncounterItemKey(item, index) === selectedKey
    );

    if (selectedExists) return selectedKey;

    const fallbackKey = node.resolvedEncounter?.items?.[0]
      ? getEncounterItemKey(node.resolvedEncounter.items[0], 0)
      : null;

    if (fallbackKey) selectedEncounterItemByNode.set(node.id, fallbackKey);
    return fallbackKey;
  }

  function renderEnvironmentPage(node) {
    if (canShowEnvironmentDetails(node, state)) {
      contentElement.appendChild(createEnvironmentColumns(node));
      return;
    }

    contentElement.appendChild(createHiddenEnvironmentNotice());
  }

  function renderCombatPage(node) {
    if (!canShowCombatPage(node)) {
      contentElement.appendChild(createCombatUnavailableNotice());
      return;
    }

    const selectedKey = getSelectedEncounterItemKey(node);

    contentElement.appendChild(createCombatPage(node, selectedKey, (nextSelectedKey) => {
      selectedEncounterItemByNode.set(node.id, nextSelectedKey);
      render(node);
    }, getActiveMissions(), (missionId, delta) => {
      onAdjustMissionProgress?.(missionId, delta);
      render(node);
    }));
  }

  function render(node) {
    if (!state.canOpenNode(node)) return;

    const checkText = node.skill && node.dc ? `${node.skill} ${node.dc}` : "Sem teste de descoberta";
    const explorationText = `${node.investigationMinutes} min`;
    const challengeText = getChallengeText(node, state);
    const viewMode = getViewMode(node);

    currentNode = node;
    titleElement.textContent = `Encontro ${node.level}`;
    typeElement.textContent = getNodeDialogTitle(node, state);
    setNodeDialogMeta(metaElement, checkText, explorationText, challengeText);
    contentElement.innerHTML = "";
    contentElement.appendChild(createModalActions(node));
    const missionNotice = createNodeMissionNotice(node, onOpenMission, state);
    if (missionNotice) contentElement.appendChild(missionNotice);

    if (viewMode === "combat") {
      renderCombatPage(node);
    } else {
      renderEnvironmentPage(node);
    }

    const pageToggleButton = canShowCombatPage(node) ? createPageToggleControl(node, viewMode) : null;
    const tacticalMapButton = createTacticalMapControl(node);

    contentElement.appendChild(createDivider());
    contentElement.appendChild(createModalFooter(pageToggleButton, viewMode === "combat" ? "start" : "end", tacticalMapButton));

    if (!dialogElement.open) {
      dialogElement.showModal();
    }
  }

  function rerenderCurrent() {
    if (dialogElement.open && currentNode) {
      render(currentNode);
    }
  }

  function clearCurrent() {
    currentNode = null;
  }

  return {
    clearCurrent,
    open: render,
    rerenderCurrent
  };
}
