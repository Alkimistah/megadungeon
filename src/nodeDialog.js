import { DISCOVERY_MINUTES } from "./appState.js";
import { formatChallengeRating, getForestChallengeParts, isSpecialChallengeRating } from "./challenge.js";
import { createChimeraCombatControls } from "./chimeraCombatView.js";
import { CREATURE_REINFORCEMENT_BONUSES, getCreatureReinforcement } from "./creatureReinforcement.js";
import { createCreatureHealthControls } from "./encounterCreatureHealthView.js";
import { formatCreatureCatalogName, getCreatureById } from "./creatureCatalog/index.js";
import { getDamageType } from "./damageTypes.js";
import { getEncounterRerollLabel, getEncounterTabs } from "./encounterTabs.js";
import { getForestTrapPresentation } from "./forestTrapPresentation.js";
import { getWeaponVariationLabel } from "./equipment/weaponVariation.js";
import { GENERAL_CREATURE_ABILITIES, getSharedSubtypeRules } from "./generalCreatureAbilities.js";
import { getEncounterMissionMatches } from "./missions/missionEncounterIntegration.js";
import { createNodeTacticalMap } from "./nodeTacticalMap.js";
import { openTacticalMapFullscreen } from "./tacticalMapRenderer.js";
import { tacticalEncounterSession } from "./tacticalEncounterSession.js";
import { getTrapById } from "./traps.js";
import { assetUrl } from "./assetUrl.js";
import { getNodeContentPresentation, getNodeProgressPresentation } from "./nodeProgressPresentation.js";

const COMBAT_ICON = assetUrl("/assets/icons/winged-sword.svg");
const ENVIRONMENT_ICON = assetUrl("/assets/icons/earth-arrow-left.svg");
const TACTICAL_MAP_ICON = assetUrl("/assets/icons/game-icons--treasure-map.svg");
const xpNumberFormat = new Intl.NumberFormat("pt-BR");

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
    button.addEventListener("click", () => onOpenMission(mission.id, node));
    actions.appendChild(button);
  });
  notice.append(title, text, actions);
  for (const objective of node.missionObjectives || []) {
    const detail = document.createElement("p");
    detail.textContent = `${objective.description} ${objective.approach}`;
    notice.appendChild(detail);
  }

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
  if (value === null || value === undefined) return "—";
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

function formatForestChallengePart(label, challengeRating) {
  const nd = formatChallengeRating(challengeRating)
    .replace("1/4", "¼").replace("1/2", "½").replace("3/4", "¾");
  const xp = Number.isFinite(challengeRating) ? ` · ${xpNumberFormat.format(challengeRating * 1000)}&nbsp;XP` : "";
  return `<strong>${label}</strong> · ND ${nd}${xp}`;
}

function setNodeDialogMeta(element, checkText, explorationText, challenge, parts) {
  const exploration = `<strong>Teste de descoberta:</strong> ${checkText} | <strong>Exploração:</strong> ${explorationText}`;
  if (parts) {
    const challengeParts = [
      formatForestChallengePart("Ambiente", parts.environment),
      formatForestChallengePart("Criaturas", parts.creatures),
      formatForestChallengePart("Armadilha", parts.trap)
    ];
    element.innerHTML = [exploration, ...challengeParts].join(" | ");
    return;
  }

  const challengeText = challenge ? `ND ${formatChallengeRating(challenge.total)}` : "Desconhecido";
  const xpText = challenge && Number.isFinite(challenge.encounter) && Number.isFinite(challenge.total)
    ? ` | Com clima e terreno: ${xpNumberFormat.format(challenge.total * 1000)} XP · Sem clima e terreno: ${xpNumberFormat.format(challenge.encounter * 1000)} XP`
    : "";
  element.innerHTML = `${exploration} | <strong>Desafio:</strong> ${challengeText}${xpText}`;
}

function createDivider() {
  const divider = document.createElement("hr");

  divider.className = "modal-divider";

  return divider;
}

function canShowEnvironmentDetails(node, state) {
  return state.isNodeRevealed(node);
}

function createHiddenEnvironmentNotice() {
  const notice = document.createElement("p");

  notice.className = "hidden-environment-notice";
  notice.textContent = "Clima e terreno desconhecidos. Explore ou escolha a rota para conhecer mais detalhes.";

  return notice;
}

function createOutdoorScene(node) {
  const section = document.createElement("section");
  section.className = "outdoor-scene mission-run-guidance";
  const heading = document.createElement("h3");
  const ambushed = node.scene.kind === "falseRest" && node.resolvedEncounter?.items.length;
  heading.textContent = ambushed ? "Descanso interrompido" : "Cena de exploração";
  const description = document.createElement("p");
  description.textContent = ambushed ? "Criaturas surpreenderam o grupo antes que pudesse se recuperar." : node.scene.description;
  section.append(heading, description);
  if (ambushed) return section;

  section.append(
    createDetailLine("Abordagem", node.scene.approach),
    createDetailLine("Sucesso", node.scene.success),
    createDetailLine("Falha", node.scene.failure)
  );
  return section;
}

function createHiddenCamp(onBeginRest) {
  const section = document.createElement("section");
  section.className = "hidden-camp mission-run-guidance";
  const description = document.createElement("p");
  description.textContent = onBeginRest
    ? "O grupo encontrou um lugar onde pode parar. Decida se vai descansar ou seguir viagem."
    : "O grupo seguiu viagem sem descansar.";
  section.appendChild(description);
  if (onBeginRest) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "extended-action is-compact";
    button.textContent = "Iniciar descanso";
    const status = document.createElement("p");
    status.setAttribute("role", "status");
    button.addEventListener("click", () => {
      if (!onBeginRest()) status.textContent = "Não foi possível iniciar o descanso.";
    });
    section.append(button, status);
  }
  return section;
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

function renderModalFooter(footer, pageToggleButton, alignment, tacticalMapButton) {
  if (!pageToggleButton && !tacticalMapButton) {
    footer.replaceChildren();
    return;
  }

  const leftSlot = document.createElement("div");
  const centerSlot = document.createElement("div");
  const rightSlot = document.createElement("div");

  leftSlot.className = "modal-footer-slot is-left";
  centerSlot.className = "modal-footer-slot is-center";
  rightSlot.className = "modal-footer-slot is-right";

  if (pageToggleButton) {
    (alignment === "start" ? leftSlot : rightSlot).appendChild(pageToggleButton);
  }
  if (tacticalMapButton) centerSlot.appendChild(tacticalMapButton);

  footer.replaceChildren(leftSlot, centerSlot, rightSlot);
}

function getEncounterItemKey(item, index) {
  return `${item.kind}:${item.creatureId || item.trapId || item.name}:${index}`;
}

function createEncounterBudget(node) {
  const budget = document.createElement("p");
  const { creatures, trap } = node.resolvedEncounter.budget;
  const combatChallenge = isSpecialChallengeRating(creatures) ? creatures : (creatures || 0) + (trap || 0);

  budget.className = "encounter-budget";
  budget.textContent = `ND do combate: ${formatChallengeRating(combatChallenge)}`;

  return budget;
}

function formatMissionMatchText(match) {
  if (match.recorded) return `${match.mission.title}: alvos deste encontro já registrados`;
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

export function createEncounterMissionPanel(matches, onAdjustMissionProgress = null) {
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
      button.addEventListener("click", () => onAdjustMissionProgress(match.mission.id, match.count, match.eventKey));
      row.appendChild(button);
    }

    panel.appendChild(row);
  });

  return panel;
}

let pendingTabFocus = null;

function createEncounterTabBar(tabs, activeKind, onSelectKind) {
  const bar = document.createElement("div");
  const buttons = [];

  bar.className = "encounter-tabs";
  bar.setAttribute("role", "tablist");
  bar.setAttribute("aria-label", "Combate");
  tabs.forEach((tab, index) => {
    const button = document.createElement("button");
    const count = document.createElement("span");
    const selected = tab.kind === activeKind;

    button.type = "button";
    button.id = `encounter-tab-${tab.kind}`;
    button.className = `encounter-tab is-${tab.kind}${selected ? " is-selected" : ""}`;
    button.dataset.encounterTab = tab.kind;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
    button.append(tab.label);
    count.className = "encounter-tab-count";
    count.textContent = `(${tab.count})`;
    button.append(" ", count);
    button.addEventListener("click", () => {
      if (selected) return;
      pendingTabFocus = tab.kind;
      onSelectKind(tab.kind);
    });
    button.addEventListener("keydown", (event) => {
      const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      event.preventDefault();
      buttons[(index + step + tabs.length) % tabs.length].click();
    });
    buttons.push(button);
    bar.appendChild(button);
    if (pendingTabFocus === tab.kind) {
      pendingTabFocus = null;
      requestAnimationFrame(() => { if (button.isConnected) button.focus(); });
    }
  });

  return bar;
}

function createEncounterRerollControls(node, activeKind, reroll, onRerolled) {
  const action = reroll?.[activeKind];
  if (!action) return null;

  const actions = document.createElement("div");
  const button = document.createElement("button");
  const status = document.createElement("p");

  actions.className = "encounter-reroll-actions";
  button.type = "button";
  button.className = "extended-action is-compact";
  button.dataset.encounterReroll = activeKind;
  button.textContent = getEncounterRerollLabel(node, activeKind);
  status.className = "node-dialog-meta encounter-reroll-status";
  status.setAttribute("role", "status");
  if (reroll.status) requestAnimationFrame(() => { status.textContent = reroll.status; });
  button.addEventListener("click", () => {
    if (action.run()) onRerolled?.(activeKind);
    else status.textContent = action.failure;
  });
  actions.appendChild(button);

  return [actions, status];
}

function createEncounterList(node, selectedKey, onSelect, missions, trapPresentations, reroll = null) {
  const panel = document.createElement("section");
  const heading = document.createElement("h3");
  const list = document.createElement("div");
  const items = node.resolvedEncounter.items;
  const tabs = getEncounterTabs(node);
  const selectedIndex = items.findIndex((item, index) => getEncounterItemKey(item, index) === selectedKey);
  const activeKind = items[selectedIndex]?.kind ?? tabs[0]?.kind;

  panel.className = "encounter-list-panel";
  list.className = "encounter-list";
  if (tabs.length > 1) {
    list.setAttribute("role", "tabpanel");
    list.setAttribute("aria-labelledby", `encounter-tab-${activeKind}`);
  }

  items.forEach((item, index) => {
    if (item.kind !== activeKind) return;
    const key = getEncounterItemKey(item, index);
    const button = document.createElement("button");
    const name = document.createElement("strong");

    button.type = "button";
    const kindClass = item.kind === "trap" ? "is-trap" : "is-creature";
    const generatedClass = item.generated ? " is-generated" : "";
    button.className = `encounter-list-item ${kindClass}${generatedClass}`;
    button.classList.toggle("is-selected", key === selectedKey);
    const itemName = item.kind === "creature"
      ? formatCreatureCatalogName(item.creatureData ?? getCreatureById(item.creatureId), item.name)
      : trapPresentations.get(item)?.name || item.name;
    name.textContent = `${item.quantity} x ${itemName}`;
    button.appendChild(name);
    getEncounterMissionMatches({ ...item, encounterKey: node.resolvedEncounter.seed }, missions).forEach((match) => {
      button.appendChild(createEncounterMissionBadge(match));
    });
    button.addEventListener("click", () => onSelect(key));
    list.appendChild(button);
  });

  if (tabs.length > 1) {
    panel.appendChild(createEncounterTabBar(tabs, activeKind, (kind) => {
      const first = items.findIndex(item => item.kind === kind);
      onSelect(getEncounterItemKey(items[first], first));
    }));
  } else {
    heading.textContent = tabs[0]?.label ?? "Combate";
    panel.appendChild(heading);
  }
  panel.appendChild(createEncounterBudget(node));
  panel.appendChild(list);
  const rerollControls = createEncounterRerollControls(node, activeKind, reroll, kind => reroll.onRerolled?.(kind));
  if (rerollControls) panel.append(...rerollControls);

  return panel;
}

function formatTiming(timing) {
  if (!timing) return null;

  return timing.charAt(0).toUpperCase() + timing.slice(1);
}

function formatEntryLabel(entry) {
  if (!entry?.name) return null;

  const timing = entry.name.includes("(") ? null : formatTiming(entry.timing);
  const details = [timing, entry.cost].filter(Boolean).join(", ");
  const name = entry.itemEnhanced ? `${entry.name}*` : entry.name;
  const label = details ? `${name} (${details})` : name;
  return entry.magical ? `${label} · Mágica` : label;
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

function createCreatureReinforcementControls(item, stats, onSetReinforcement, customHitPoints) {
  const controls = document.createElement("fieldset");
  controls.className = "creature-reinforcement";
  const legend = document.createElement("legend");
  legend.textContent = item.quantity > 1 ? `Reforço · ${item.quantity} criaturas desta ficha` : "Reforço";
  controls.appendChild(legend);
  const options = [
    ["initiative", "Iniciativa", Number.isFinite(stats.initiative) ? CREATURE_REINFORCEMENT_BONUSES.initiative : 0],
    ["attack", "Ataque", CREATURE_REINFORCEMENT_BONUSES.attack],
    ["hitPoints", "PV", stats.hitPoints]
  ];
  for (const [stat, label, bonus] of options) {
    if ((stat === "hitPoints" && customHitPoints) || !Number.isFinite(bonus) || bonus <= 0) continue;
    const button = document.createElement("button");
    const enabled = Boolean(item.reinforcement?.[stat]);
    button.type = "button";
    button.className = "extended-action is-compact";
    button.dataset.creatureReinforcement = stat;
    button.setAttribute("aria-pressed", String(enabled));
    button.textContent = `${label} +${bonus}`;
    button.addEventListener("click", () => onSetReinforcement(stat, !enabled));
    controls.appendChild(button);
  }
  return controls;
}

export function createCreatureDetail(item, missions = [], onAdjustMissionProgress = null, onSetReinforcement = null, healthControls = null, chimeraBoss = false) {
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
    if (healthControls) section.appendChild(healthControls);
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
  title.textContent = formatCreatureCatalogName(creature, item.name);
  challenge.textContent = `ND ${item.challengeLabel}`;
  subtitle.className = "creature-sheet-subtitle";
  const roleLabel = creature.roleMetadata?.label || item.roleLabel;
  subtitle.textContent = `${[typeText, creature.size].filter(Boolean).join(" ")} · ${roleLabel} · ${item.quantity} no encontro`;

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
  if (onSetReinforcement) section.appendChild(createCreatureReinforcementControls(item, stats, onSetReinforcement, chimeraBoss));
  if (healthControls) section.appendChild(healthControls);
  section.appendChild(createDivider());

  const reinforcement = getCreatureReinforcement(item, stats.hitPoints);
  const initiative = Number.isFinite(stats.initiative) ? stats.initiative + reinforcement.initiative : stats.initiative;
  const initiativeNote = reinforcement.initiative ? ` (reforço +${reinforcement.initiative})` : "";
  const perceptionText = [formatModifier(stats.perception), stats.senses].filter(Boolean).join(", ");
  const hasValue = value => value !== null && value !== undefined && value !== "";
  // Linhas sem nenhum valor impresso são omitidas, como no Rival Espelho.
  if ([stats.initiative, stats.perception, stats.senses].some(hasValue)) {
    section.appendChild(createSheetLine("INICIATIVA", `${formatModifier(initiative)}${initiativeNote},`, " PERCEPÇÃO", `${perceptionText}`));
  }
  if ([stats.defense, stats.fortitude, stats.reflex, stats.will, stats.defensesText].some(hasValue)) {
    section.appendChild(createSheetLine("DEFESA", `${stats.defense ?? "—"}, FORT ${formatModifier(stats.fortitude)}, REF ${formatModifier(stats.reflex)}, VON ${formatModifier(stats.will)}${stats.defensesText ? `, ${stats.defensesText}` : ""}`));
  }
  const hitPointsText = reinforcement.hitPoints
    ? `${stats.hitPoints + reinforcement.hitPoints} (reforço +${reinforcement.hitPoints})`
    : String(stats.hitPoints ?? stats.hitPointsText ?? "—");
  if ([stats.hitPoints, stats.hitPointsText].some(hasValue)) {
    section.appendChild(createSheetLine("PONTOS DE VIDA", hitPointsText));
  }
  if (reinforcement.hitPoints) {
    section.appendChild(createSheetLine(
      "REFORÇO DE PV",
      `Ao ativar, some ${reinforcement.hitPoints} aos PV atuais. Ao desativar, retire esse bônus.`
    ));
  }

  if (stats.speedText) {
    section.appendChild(createSheetLine("DESLOCAMENTO", stats.speedText));
  }
  if (Number.isFinite(stats.manaPoints)) {
    section.appendChild(createSheetLine("PONTOS DE MANA", String(stats.manaPoints)));
  }

  section.appendChild(createDivider());

  if (reinforcement.attack) {
    section.appendChild(createSheetLine("REFORÇO DE ATAQUE", `Some +${reinforcement.attack} às jogadas de ataque da ficha.`));
  }
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
    const abilities = chimeraBoss ? creature.abilities.filter(ability => ability.name === "Mente Tripla") : creature.abilities;
    appendCreatureSheetAbilities(section, abilities, { preferEntryName: true });
  }
  const entries = [...(creature.actions ?? []), ...(creature.abilities ?? [])];
  const groupRules = [
    [GENERAL_CREATURE_ABILITIES.band, entries.some(entry => /^\[Bando\]/i.test(entry.text))],
    [GENERAL_CREATURE_ABILITIES.swarm, entries.some(entry => entry.name === "Enxame")],
    ...getSharedSubtypeRules(creature).map(rule => [rule, true])
  ];
  for (const [rule, applies] of groupRules) {
    if (applies) {
      section.appendChild(createSheetAbilityLine(rule.label, [rule.summary, ...rule.notes].join(" ")));
    }
  }

  if (stats.attributes && Object.values(stats.attributes).some(value => value !== null && value !== undefined)) {
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
    const bookPage = source.bookPageEnd ? `${source.bookPage}–${source.bookPageEnd}` : source.bookPage;
    const pdfPage = source.pdfPageEnd ? `${source.pdfPage}–${source.pdfPageEnd}` : source.pdfPage;
    const reference = [
      source.book,
      source.edition,
      bookPage && `p. ${bookPage}`,
      source.edition && pdfPage && `PDF p. ${pdfPage}`
    ].filter(Boolean).join(" · ");
    section.appendChild(createSheetLine("FONTE", reference));
  }

  return section;
}

function getTrapForItem(node, item) {
  if (node.trap?.id === item.trapId) return node.trap;
  return getTrapById(item.trapId);
}

function createTrapDetail(node, item, presentation) {
  const trap = getTrapForItem(node, item);
  const section = document.createElement("section");
  const heading = document.createElement("h3");

  section.className = "encounter-detail-card trap-detail-card";
  heading.textContent = presentation?.name || item.name;
  section.appendChild(heading);

  if (presentation) {
    section.append(
      createDetailLine("Na cena", presentation.description),
      createDetailLine("Armadilha de referência", trap?.name || item.name)
    );
  }

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

function createEncounterDetail(node, selectedKey, missions, onAdjustMissionProgress, trapPresentations, { onSetReinforcement, onEncounterAdjusted, readOnly = false }) {
  const panel = document.createElement("div");
  const selectedItem = node.resolvedEncounter.items.find((item, index) =>
    getEncounterItemKey(item, index) === selectedKey
  ) || node.resolvedEncounter.items[0];
  const chimeraBoss = selectedItem.creatureId === "quimera" && !!node.chimeraHeads;
  const setReinforcement = onSetReinforcement && ((stat, value) => onSetReinforcement(selectedItem, stat, value));

  panel.className = "encounter-detail-panel";
  panel.appendChild(
    selectedItem.kind === "trap"
      ? createTrapDetail(node, selectedItem, trapPresentations.get(selectedItem))
      : createCreatureDetail(
        { ...selectedItem, encounterKey: node.resolvedEncounter.seed },
        missions,
        onAdjustMissionProgress,
        setReinforcement,
        readOnly ? null : chimeraBoss
          ? createChimeraCombatControls(node, selectedItem, onEncounterAdjusted, setReinforcement)
          : createCreatureHealthControls(node, selectedItem, missions, onEncounterAdjusted),
        chimeraBoss
      )
  );

  return panel;
}

function getFirstEncounterItemKey(node) {
  const items = node.resolvedEncounter?.items || [];
  const kind = getEncounterTabs(node)[0]?.kind;
  const index = items.findIndex(item => item.kind === kind);
  return index === -1 ? null : getEncounterItemKey(items[index], index);
}

function createCombatPage(node, selectedKey, onSelect, missions, onAdjustMissionProgress, options = {}) {
  const page = document.createElement("div");
  const currentSelectedKey = selectedKey || getFirstEncounterItemKey(node);
  const trapPresentations = new Map(node.resolvedEncounter.items.map(item =>
    [item, getForestTrapPresentation(options.profileId, node, item)]
  ));

  page.className = "combat-page";
  page.appendChild(createEncounterList(node, currentSelectedKey, onSelect, missions, trapPresentations, options.reroll));
  page.appendChild(createEncounterDetail(node, currentSelectedKey, missions, onAdjustMissionProgress, trapPresentations, options));

  return page;
}

export function createEncounterCombatPage(node, selectedKey, onSelect = () => {}, missions = [], onAdjustMissionProgress = null, options = {}) {
  return createCombatPage(node, selectedKey, onSelect, missions, onAdjustMissionProgress, options);
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
  canReinforceCreatures = () => false,
  canRerollCreatures = () => false,
  canRerollEscort = () => false,
  canRerollTrap = () => false,
  contentElement,
  dialogElement,
  footerElement,
  metaElement,
  onAttempt,
  onBeginHiddenRest = () => false,
  onChooseRoute,
  onComplete = () => {},
  onEncounterAdjusted = () => {},
  onExplore,
  getActiveMissions = () => [],
  getProfileId = () => null,
  onAdjustMissionProgress = null,
  onOpenMission = () => {},
  onRerollCreatures = () => false,
  onRerollEscort = () => false,
  onRerollTrap = () => false,
  onSetCreatureReinforcement = () => false,
  onRest,
  state,
  titleElement,
  typeElement
}) {
  let currentNode = null;
  const selectedEncounterItemByNode = new Map();
  const viewModeByNode = new Map();
  let pendingRerollStatus = "";

  function createAttemptControl(node) {
    const attempted = state.isNodeAttempted(node);
    return createModalCheckbox(
      "modal-choice attempt-choice",
      attempted,
      attempted || state.isNodeExplored(node),
      attempted ? "Falha registrada" : `Registrar falha (+${DISCOVERY_MINUTES} min)`,
      () => onAttempt(node)
    );
  }

  function createExploredControl(node) {
    const explored = state.isNodeExplored(node);
    const attempted = state.isNodeAttempted(node);

    return createModalCheckbox(
      "modal-choice explored-choice",
      explored,
      explored || attempted,
      explored ? "Sucesso registrado" : `Registrar sucesso (+${DISCOVERY_MINUTES} min)`,
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
        contentElement.scrollTop = 0;
        footerElement.querySelector(".modal-page-toggle")?.focus();
      }
    );
  }

  function createModalActions(node, content) {
    const actions = document.createElement("div");

    actions.className = "modal-actions";

    if (node.skill && node.dc && !state.isNodeChosen(node) && !content.campUndecided &&
      !(node.requiresCompletion && node.type === "unknown")) {
      const explanation = document.createElement("p");
      explanation.className = "node-dialog-meta discovery-cost-note";
      explanation.textContent = `Sucesso revela detalhes ocultos e abate ${DISCOVERY_MINUTES} min da travessia. Em caso de falha, a travessia cobra seu tempo integral.`;
      actions.append(createExploredControl(node), createAttemptControl(node), explanation);
    }

    if (canRestAtNode(node) && !content.campUndecided) {
      actions.appendChild(createRestControl(node));
    }

    actions.appendChild(createRouteChoiceControl(node));
    if (node.requiresCompletion && state.isNodeChosen(node)) {
      const completed = state.isNodeCompleted(node);
      let label = completed ? "Encontro concluído" : "Concluir encontro";
      if (node.type === "boss") label = completed ? "Quimera derrotada" : "Confirmar derrota da Quimera";
      if (content.campUndecided && !completed) label = "Seguir viagem";
      if (content.ambush) label = completed ? "Emboscada concluída" : "Confirmar conclusão da emboscada";
      actions.appendChild(createModalCheckbox(
        "modal-choice complete-choice", completed, completed,
        label,
        () => onComplete(node)
      ));
    }

    return actions;
  }

  function getTacticalObjectives(node) {
    return node.missionObjectives || (node.missionBindings || []).flatMap(binding => {
      const mission = getActiveMissions().find(item => item.id === binding.id);
      if (!mission?.objective) return [];
      const { targetType, targetId, targetName } = mission.objective;
      return [{ missionId: mission.id, targetType, targetId, targetName }];
    });
  }

  function createTacticalMapControl(node) {
    if (!state.isNodeChosen(node)) return null;
    const objectives = getTacticalObjectives(node);
    if (!canShowCombatPage(node) && !objectives.length) return null;

    return createIconButton(
      "icon-button modal-tactical-map-toggle",
      TACTICAL_MAP_ICON,
      "Abrir mapa tático",
      () => {
        const map = createNodeTacticalMap(node, objectives, { profileId: getProfileId() });
        openTacticalMapFullscreen(map, { state: tacticalEncounterSession.openMap(`node:${node.id}`, map) });
      }
    );
  }

  function getSelectedEncounterItemKey(node) {
    const selectedKey = selectedEncounterItemByNode.get(node.id);
    const selectedExists = node.resolvedEncounter?.items?.some((item, index) =>
      getEncounterItemKey(item, index) === selectedKey
    );

    if (selectedExists) return selectedKey;

    const fallbackKey = getFirstEncounterItemKey(node);

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

    const selectNodeItem = (key) => {
      selectedEncounterItemByNode.set(node.id, key);
    };
    const rerollMessages = {
      creature: {
        success: "Criaturas atualizadas com o mesmo ND.",
        failure: "Nenhuma outra composição compatível foi encontrada."
      },
      escort: {
        success: "Escolta atualizada com o mesmo ND.",
        failure: "Nenhuma outra escolta compatível foi encontrada."
      },
      trap: {
        success: "Armadilha atualizada com o mesmo ND.",
        failure: "Nenhuma outra armadilha com o mesmo ND foi encontrada."
      }
    };
    const escortMode = canRerollEscort(node);
    const creatureMessages = rerollMessages[escortMode ? "escort" : "creature"];
    const reroll = { status: pendingRerollStatus, onRerolled: (kind) => {
      const items = node.resolvedEncounter.items;
      const index = items.findIndex(item => item.kind === kind);
      if (index !== -1) selectNodeItem(getEncounterItemKey(items[index], index));
      pendingRerollStatus = (kind === "trap" ? rerollMessages.trap : creatureMessages).success;
      render(node);
      contentElement.querySelector(`[data-encounter-reroll="${kind}"]`)?.focus();
    } };
    pendingRerollStatus = "";
    if (escortMode || canRerollCreatures(node)) {
      reroll.creature = {
        run: () => escortMode
          ? onRerollEscort(node, { tacticalLayout: node.tacticalLayout, objectives: getTacticalObjectives(node) })
          : onRerollCreatures(node),
        failure: creatureMessages.failure
      };
    }
    if (canRerollTrap(node)) {
      reroll.trap = {
        run: () => onRerollTrap(node, { tacticalLayout: node.tacticalLayout, objectives: getTacticalObjectives(node) }),
        failure: rerollMessages.trap.failure
      };
    }

    const page = createCombatPage(node, selectedKey, (nextSelectedKey) => {
      selectNodeItem(nextSelectedKey);
      render(node);
    }, getActiveMissions(), (missionId, delta, eventKey) => {
      onAdjustMissionProgress?.(missionId, delta, eventKey);
      render(node);
    }, {
      profileId: getProfileId(),
      reroll,
      onEncounterAdjusted: !state.isNodeCompleted(node) && (() => {
        onEncounterAdjusted();
        render(node);
      }),
      onSetReinforcement: canReinforceCreatures(node) && ((item, stat, enabled) => {
        if (!onSetCreatureReinforcement(node, item, stat, enabled)) return;
        render(node);
        contentElement.querySelector(`[data-creature-reinforcement="${stat}"]`)?.focus();
      })
    });
    contentElement.appendChild(page);
  }

  function render(node) {
    if (!state.canOpenNode(node)) return;

    const nodeView = state.getNodeViewState(node);
    const content = getNodeContentPresentation(node, nodeView);
    const checkText = node.requiresCompletion && node.type === "unknown" && !state.isNodeChosen(node)
      ? "Revelado ao escolher a rota"
      : node.skill && node.dc && !content.campUndecided ? `${node.skill} (CD ${node.dc})` : "Indisponível";
    const explorationText = `${node.investigationMinutes} min`;
    const challenge = nodeView.revealed && !content.campUndecided ? node.challenge : null;
    const challengeParts = challenge ? getForestChallengeParts(node) : null;
    const viewMode = getViewMode(node);

    currentNode = node;
    titleElement.textContent = `Encontro ${node.level}`;
    typeElement.textContent = content.label;
    setNodeDialogMeta(metaElement, checkText, explorationText, challenge, challengeParts);
    contentElement.innerHTML = "";
    const progress = getNodeProgressPresentation(node, nodeView);
    const progressNotice = document.createElement("p");
    progressNotice.className = "node-progress-status";
    progressNotice.dataset.progress = progress.kind;
    progressNotice.setAttribute("role", "status");
    progressNotice.textContent = progress.label;
    contentElement.appendChild(progressNotice);
    contentElement.appendChild(createModalActions(node, content));
    const missionNotice = createNodeMissionNotice(node, onOpenMission, state);
    if (missionNotice) contentElement.appendChild(missionNotice);
    if (content.campUndecided) {
      contentElement.appendChild(createHiddenCamp(!nodeView.completed ? () => {
        if (!onBeginHiddenRest(node)) return false;
        if (node.resolvedEncounter) viewModeByNode.set(node.id, "combat");
        render(node);
        return true;
      } : null));
    } else if (node.scene && nodeView.chosen) {
      contentElement.appendChild(createOutdoorScene(node));
    }
    if (node.safeRest && nodeView.chosen && !content.campUndecided) {
      const safeRestNotice = document.createElement("p");
      safeRestNotice.className = "safe-rest-notice";
      safeRestNotice.textContent = node.safeRest.description;
      contentElement.appendChild(safeRestNotice);
    }

    if (viewMode === "combat") {
      renderCombatPage(node);
    } else if (!content.campUndecided) {
      renderEnvironmentPage(node);
    }

    const pageToggleButton = canShowCombatPage(node) ? createPageToggleControl(node, viewMode) : null;
    const tacticalMapButton = createTacticalMapControl(node);

    renderModalFooter(footerElement, pageToggleButton, viewMode === "combat" ? "start" : "end", tacticalMapButton);

    if (!dialogElement.open) {
      dialogElement.showModal();
      contentElement.scrollTop = 0;
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
    open(node) {
      if (!state.canOpenNode(node)) return;
      tacticalEncounterSession.activate(`node:${node.id}`);
      render(node);
    },
    rerenderCurrent
  };
}
