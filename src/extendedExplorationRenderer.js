import { formatChallengeRating } from "./challenge.js";
import { createEncounterCombatPage, getDefaultEncounterItemKey } from "./nodeDialog.js";

function createElement(tagName, className = null, text = null) {
  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (text !== null) element.textContent = text;

  return element;
}

function createButton(label, className, onClick, disabled = false) {
  const button = createElement("button", className, label);

  button.type = "button";
  button.disabled = disabled;
  button.addEventListener("click", onClick);

  return button;
}

function getDcText(rules, approach) {
  if (!rules || !approach) return "—";

  const dc = rules.baseDc + approach.dcModifier;
  const modifier = approach.dcModifier > 0 ? `+${approach.dcModifier}` : "0";
  const minutes = Math.max(Math.round((rules.baseMinutes || 10) * (approach.timeMultiplier || 1)), 1);

  return `${approach.skill} CD ${dc} (${modifier}) | ${minutes}min`;
}

function parseManualRolls(value) {
  if (value.trim() === "") return [];

  return value
    .split(/[,\s]+/)
    .map((part) => Number(part.trim()))
    .filter((number) => Number.isFinite(number));
}

function createMeter(snapshot) {
  const meter = createElement("section", "labyrinth-meter");
  const title = createElement("div", "labyrinth-meter-title");
  const titleText = createElement("strong", null, "Labirinto");
  const subtitle = createElement("span", null, snapshot.tier?.label || "Sala do chefe");
  const path = createElement("div", "labyrinth-path");
  const failures = createElement("div", "failure-track");

  title.appendChild(titleText);
  title.appendChild(subtitle);

  if (snapshot.rules) {
    for (let index = 0; index < snapshot.rules.successesRequired; index += 1) {
      const segment = createElement("span", "labyrinth-segment", String(index + 1));
      segment.classList.toggle("is-complete", index < snapshot.successes);
      path.appendChild(segment);
    }
  } else {
    const bossSegment = createElement("span", "labyrinth-segment is-complete is-door", "Chefe");
    path.appendChild(bossSegment);
  }

  const door = createElement("span", "labyrinth-door", "Porta");
  door.classList.toggle("is-open", snapshot.phase === "floorEncounter" || snapshot.phase === "readyToAdvance");
  path.appendChild(door);

  if (snapshot.rules) {
    for (let index = 0; index < snapshot.rules.failureLimit; index += 1) {
      const mark = createElement("span", "failure-mark", "");
      mark.classList.toggle("is-filled", index < snapshot.failures);
      failures.appendChild(mark);
    }
  }

  meter.appendChild(title);
  meter.appendChild(path);
  meter.appendChild(failures);

  return meter;
}

function createHeader(snapshot) {
  const header = createElement("section", "extended-header");
  const title = createElement("div");
  const type = createElement("p", "node-dialog-type", snapshot.phase === "boss" ? "Chefe" : "Exploração estendida");
  const heading = createElement("h2", null, `Andar ${snapshot.floor}`);
  const meta = createElement("p", "node-dialog-meta");

  if (snapshot.rules) {
    meta.textContent = `CD base ${snapshot.rules.baseDc} | Sucessos ${snapshot.successes}/${snapshot.rules.successesRequired} | Falhas ${snapshot.failures}/${snapshot.rules.failureLimit}`;
  } else {
    meta.textContent = "Sala final dos andares 1 a 10.";
  }

  title.appendChild(type);
  title.appendChild(heading);
  title.appendChild(meta);
  header.appendChild(title);

  return header;
}

function createApproachControls(snapshot, selectedApproachId, setSelectedApproachId, manualRollInput, onOutcome) {
  const section = createElement("section", "extended-panel");
  const heading = createElement("h3", null, "Teste de exploração");
  const controls = createElement("div", "extended-controls");
  const approachLabel = createElement("label");
  const approachText = document.createTextNode("Abordagem");
  const approachSelect = document.createElement("select");
  const selectedApproach = snapshot.approaches.find((approach) => approach.id === selectedApproachId)
    || snapshot.approaches[0];
  const dc = createElement("p", "extended-dc", getDcText(snapshot.rules, selectedApproach));
  const rollLabel = createElement("label");
  const rollText = document.createTextNode("d100 manual");
  const rollInput = document.createElement("input");
  const buttons = createElement("div", "extended-action-grid");

  snapshot.approaches.forEach((approach) => {
    const option = document.createElement("option");
    option.value = approach.id;
    option.textContent = `${approach.label} (${approach.skill})`;
    approachSelect.appendChild(option);
  });

  approachSelect.value = selectedApproach.id;
  approachSelect.addEventListener("change", () => setSelectedApproachId(approachSelect.value));

  rollInput.type = "text";
  rollInput.autocomplete = "off";
  rollInput.inputMode = "numeric";
  rollInput.placeholder = "Ex: 74 ou 12, 88";
  rollInput.value = manualRollInput.value;
  rollInput.addEventListener("input", () => {
    manualRollInput.value = rollInput.value;
  });

  approachLabel.appendChild(approachText);
  approachLabel.appendChild(approachSelect);
  rollLabel.appendChild(rollText);
  rollLabel.appendChild(rollInput);

  buttons.appendChild(createButton("Sucesso", "extended-action", () => onOutcome("success", parseManualRolls(rollInput.value))));
  buttons.appendChild(createButton("Sucesso +5", "extended-action", () => onOutcome("criticalSuccess", parseManualRolls(rollInput.value))));
  buttons.appendChild(createButton("Falha", "extended-action is-danger", () => onOutcome("failure", parseManualRolls(rollInput.value))));
  buttons.appendChild(createButton("Falha +5", "extended-action is-danger", () => onOutcome("criticalFailure", parseManualRolls(rollInput.value))));

  controls.appendChild(approachLabel);
  controls.appendChild(rollLabel);

  section.appendChild(heading);
  section.appendChild(controls);
  section.appendChild(dc);
  section.appendChild(createUsedSkills(snapshot));
  const pendingEffects = createPendingEffects(snapshot);
  if (pendingEffects) section.appendChild(pendingEffects);
  section.appendChild(buttons);

  return section;
}

function createUsedSkills(snapshot) {
  const container = createElement("div", "used-skills");
  const label = createElement("strong", null, "Perícias com sucesso neste andar:");
  const value = createElement(
    "span",
    null,
    snapshot.usedSuccessfulSkills.length ? snapshot.usedSuccessfulSkills.join(", ") : "nenhuma"
  );

  container.appendChild(label);
  container.appendChild(value);

  return container;
}

function createPendingEffects(snapshot) {
  if (!snapshot.pendingSceneEffects?.length) return null;

  const container = createElement("div", "pending-effects");
  const label = createElement("strong", null, "Estados pendentes:");
  const value = createElement(
    "span",
    null,
    snapshot.pendingSceneEffects.map((effect) => effect.label).join(", ")
  );

  container.appendChild(label);
  container.appendChild(value);

  return container;
}

function createCurrentResult(snapshot) {
  const section = createElement("section", "extended-panel");
  const heading = createElement("h3", null, "Cena atual");

  section.appendChild(heading);

  if (!snapshot.currentResult) {
    const empty = createElement("p", "hidden-environment-notice", "Nenhuma cena d100 resolvida ainda. Registre uma falha para gerar a próxima cena.");
    section.appendChild(empty);
    return section;
  }

  const result = snapshot.currentResult;
  const challengeText = result.challenge > 0 ? ` | ND ${formatChallengeRating(result.challenge)}` : "";
  const sourceText = result.rollSource === "manual" ? "manual" : "automático";
  const title = createElement("p", "result-title", `d100 ${result.roll} (${sourceText}): ${result.categoryLabel}${challengeText}`);
  const detail = createElement("p", "result-detail", result.detail);

  section.appendChild(title);
  section.appendChild(detail);

  return section;
}

function getTacticalCellLabel(cell) {
  return {
    advantage: "Vantagem",
    door: "Porta",
    enemy: "Inimigo",
    floor: "Chão",
    obstacle: "Obstáculo",
    party: "Grupo",
    trap: "Armadilha",
    wall: "Parede"
  }[cell] || cell;
}

function createTacticalMap(scene, onRerollMap) {
  if (!scene?.tacticalMap) return null;

  const section = createElement("div", "tactical-map-panel");
  const header = createElement("div", "tactical-map-header");
  const title = createElement(
    "strong",
    null,
    `Mapa 14x10 | ${scene.tacticalMap.enemyCount} inimigo(s) | ${scene.tacticalMap.trapCount} armadilha(s)`
  );
  const grid = createElement("div", "tactical-grid");
  const legend = createElement("div", "tactical-legend");

  grid.style.setProperty("--tactical-width", String(scene.tacticalMap.width));
  grid.style.setProperty("--tactical-height", String(scene.tacticalMap.height));

  scene.tacticalMap.cells.forEach((cell) => {
    const tile = createElement("span", `tactical-cell is-${cell}`);
    tile.title = getTacticalCellLabel(cell);
    grid.appendChild(tile);
  });

  [
    ["wall", "Parede"],
    ["party", "Grupo"],
    ["enemy", "Inimigo"],
    ["trap", "Armadilha"],
    ["door", "Porta"],
    ["advantage", "Vantagem"],
    ["obstacle", "Obstáculo"]
  ].forEach(([cell, label]) => {
    const item = createElement("span", "tactical-legend-item");
    item.appendChild(createElement("span", `tactical-swatch is-${cell}`));
    item.appendChild(document.createTextNode(label));
    legend.appendChild(item);
  });

  header.appendChild(title);
  header.appendChild(createButton("Gerar outro mapa", "extended-action is-compact", onRerollMap));
  section.appendChild(header);
  section.appendChild(grid);
  section.appendChild(legend);

  return section;
}

function createSceneEffects(scene) {
  if (!scene?.sceneEffects?.length) return null;

  const list = createElement("ul", "scene-effects");
  scene.sceneEffects.forEach((effect) => {
    const item = createElement("li");
    item.appendChild(createElement("strong", null, effect.label));
    item.appendChild(document.createTextNode(` — ${effect.note}`));
    list.appendChild(item);
  });

  return list;
}

function createResolvedEncounter(scene, selectedItemKey, onSelectItem, onRerollMap) {
  if (!scene?.encounterNode?.resolvedEncounter?.items?.length) return null;

  const wrapper = createElement("div", "extended-encounter-result");
  const selectedKey = selectedItemKey || getDefaultEncounterItemKey(scene.encounterNode);
  const tacticalMap = createTacticalMap(scene, onRerollMap);
  const effects = createSceneEffects(scene);

  if (effects) wrapper.appendChild(effects);
  if (tacticalMap) wrapper.appendChild(tacticalMap);
  wrapper.appendChild(createEncounterCombatPage(scene.encounterNode, selectedKey, onSelectItem));

  return wrapper;
}

function createFinalEncounter(snapshot, onResolveFinalEncounter, onAdvanceFloor, selectedItemKey, onSelectItem, onRerollMap) {
  const section = createElement("section", "extended-panel final-encounter-panel");
  const heading = createElement("h3", null, "Encontro final do andar");

  section.appendChild(heading);

  if (!snapshot.finalEncounter) {
    section.appendChild(createElement("p", "hidden-environment-notice", "Complete os sucessos do andar para revelar a sala final."));
    return section;
  }

  const challengeText = snapshot.finalEncounter.challenge > 0
    ? `ND ${formatChallengeRating(snapshot.finalEncounter.challenge)}`
    : "sem ND definido";

  section.appendChild(createElement("p", "result-title", `${snapshot.finalEncounter.title} (${challengeText})`));
  section.appendChild(createElement("p", "result-detail", snapshot.finalEncounter.detail));

  const encounter = createResolvedEncounter(snapshot.finalEncounter, selectedItemKey, onSelectItem, onRerollMap);
  if (encounter) section.appendChild(encounter);

  if (snapshot.phase === "floorEncounter") {
    section.appendChild(createButton("Marcar encontro resolvido", "extended-action", onResolveFinalEncounter));
  }

  if (snapshot.phase === "readyToAdvance") {
    section.appendChild(createButton("Avançar para o próximo andar", "extended-action", onAdvanceFloor));
  }

  return section;
}

function createBossPanel(snapshot) {
  const section = createElement("section", "extended-panel boss-panel");
  const boss = snapshot.bossEncounter;

  section.appendChild(createElement("h3", null, boss.title));
  section.appendChild(createElement("p", "result-title", `ND ${boss.challengeLabel}`));
  section.appendChild(createElement("p", "result-detail", `Criatura principal: ${boss.creatureId}. Apoio: ${boss.supportCreatureId}. Recompensa: ${boss.reward}.`));
  section.appendChild(createElement("p", "hidden-environment-notice", "A composição completa do chefe será ligada ao resolvedor de encontros na próxima etapa."));

  return section;
}

function createLog(snapshot) {
  const section = createElement("section", "extended-panel log-panel");
  const heading = createElement("h3", null, "Log");
  const list = createElement("ul", "exploration-log");

  snapshot.log.forEach((entry) => {
    const item = createElement("li", `log-entry is-${entry.kind}`, entry.message);
    list.appendChild(item);
  });

  section.appendChild(heading);
  section.appendChild(list);

  return section;
}

export function createExtendedExplorationRenderer({
  container,
  getSnapshot,
  onAdvanceFloor,
  onOutcome,
  onResolveFinalEncounter,
  onRerollTacticalMap
}) {
  let selectedApproachId = null;
  const manualRollInput = { value: "" };
  const selectedEncounterItemByScene = new Map();

  function setSelectedApproachId(approachId) {
    selectedApproachId = approachId;
    render();
  }

  function render() {
    const snapshot = getSnapshot();

    if (!selectedApproachId && snapshot.approaches.length) {
      selectedApproachId = snapshot.approaches[0].id;
    }

    container.innerHTML = "";
    container.appendChild(createHeader(snapshot));
    container.appendChild(createMeter(snapshot));

    const body = createElement("div", "extended-layout");
    const left = createElement("div", "extended-main-column");
    const right = createElement("div", "extended-side-column");

    if (snapshot.phase === "boss") {
      left.appendChild(createBossPanel(snapshot));
    } else {
      left.appendChild(createApproachControls(
        snapshot,
        selectedApproachId,
        setSelectedApproachId,
        manualRollInput,
        (outcome, rolls) => {
          onOutcome(outcome, selectedApproachId, rolls);
          manualRollInput.value = "";
        }
      ));
      const currentSceneId = snapshot.currentResult?.encounterNode?.id;
      const currentEncounter = createCurrentResult(snapshot);
      const currentResolved = createResolvedEncounter(
        snapshot.currentResult,
        currentSceneId ? selectedEncounterItemByScene.get(currentSceneId) : null,
        (nextKey) => {
          selectedEncounterItemByScene.set(currentSceneId, nextKey);
          render();
        },
        () => {
          onRerollTacticalMap("current");
          render();
        }
      );
      left.appendChild(currentEncounter);
      if (currentResolved) currentEncounter.appendChild(currentResolved);

      const finalSceneId = snapshot.finalEncounter?.encounterNode?.id;
      left.appendChild(createFinalEncounter(
        snapshot,
        onResolveFinalEncounter,
        onAdvanceFloor,
        finalSceneId ? selectedEncounterItemByScene.get(finalSceneId) : null,
        (nextKey) => {
          selectedEncounterItemByScene.set(finalSceneId, nextKey);
          render();
        },
        () => {
          onRerollTacticalMap("final");
          render();
        }
      ));
    }

    right.appendChild(createLog(snapshot));
    body.appendChild(left);
    body.appendChild(right);
    container.appendChild(body);
  }

  return {
    render
  };
}
