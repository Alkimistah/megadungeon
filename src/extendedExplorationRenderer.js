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

function getApproachPrompt(approach) {
  const action = approach.label.includes(":")
    ? approach.label.split(":").slice(1).join(":").trim()
    : approach.label;
  const actionLower = action.toLocaleLowerCase("pt-BR");

  return {
    Nobreza: "Com sua educação de nobre, um personagem indica uma rota segura pelo labirinto.",
    Percepção: action === "Observar"
      ? "Um personagem decidiu tomar a liderança e observar possíveis caminhos."
      : `Um personagem tenta ${actionLower} sinais discretos no labirinto.`,
    Reflexos: "Um personagem se prepara para reagir ao perigo e manter o avanço.",
    Vontade: "Um personagem se concentra para resistir à pressão mental da masmorra."
  }[approach.skill] || `Um personagem tenta ${actionLower} para conduzir o grupo pelo labirinto.`;
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
  const selectedApproachAlreadyUsed = snapshot.usedApproachIds.includes(selectedApproach.id);
  const actionsDisabled = selectedApproachAlreadyUsed || snapshot.resetPending;
  const dc = createElement("p", "extended-dc", getDcText(snapshot.rules, selectedApproach));
  const prompt = createElement("p", "extended-approach-prompt", getApproachPrompt(selectedApproach));
  const rollLabel = createElement("label");
  const rollText = document.createTextNode("d100 manual");
  const rollInput = document.createElement("input");
  const buttons = createElement("div", "extended-action-grid");

  snapshot.approaches.forEach((approach) => {
    const option = document.createElement("option");
    const alreadyUsed = snapshot.usedApproachIds.includes(approach.id);
    option.value = approach.id;
    option.textContent = `${approach.label}${alreadyUsed ? " — usada" : ""}`;
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

  buttons.appendChild(createButton("Sucesso", "extended-action", () => onOutcome("success", parseManualRolls(rollInput.value)), actionsDisabled));
  buttons.appendChild(createButton("Sucesso +5", "extended-action", () => onOutcome("criticalSuccess", parseManualRolls(rollInput.value)), actionsDisabled));
  buttons.appendChild(createButton("Falha", "extended-action is-danger", () => onOutcome("failure", parseManualRolls(rollInput.value)), actionsDisabled));
  buttons.appendChild(createButton("Falha +5", "extended-action is-danger", () => onOutcome("criticalFailure", parseManualRolls(rollInput.value)), actionsDisabled));

  controls.appendChild(approachLabel);
  controls.appendChild(rollLabel);

  section.appendChild(heading);
  section.appendChild(controls);
  section.appendChild(dc);
  section.appendChild(prompt);
  section.appendChild(createUsedSkills(snapshot));
  const pendingEffects = createPendingEffects(snapshot);
  if (pendingEffects) section.appendChild(pendingEffects);
  section.appendChild(buttons);

  return section;
}

function createUsedSkills(snapshot) {
  const container = createElement("div", "used-skills");
  const label = createElement("strong", null, "Ações usadas neste andar:");
  const value = createElement(
    "span",
    null,
    snapshot.usedApproachLabels.length ? snapshot.usedApproachLabels.join(", ") : "nenhuma"
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

function getSceneKey(scene) {
  return scene?.id || scene?.encounterNode?.id || `${scene?.roll}-${scene?.categoryId}`;
}

function createCurrentResult(snapshot, selectedEncounterItemByScene, onSelectItem, onRerollMap) {
  const section = createElement("section", "extended-panel");
  const heading = createElement("h3", null, "Cena atual");
  const results = snapshot.currentResults?.length
    ? snapshot.currentResults
    : snapshot.currentResult ? [snapshot.currentResult] : [];

  section.appendChild(heading);

  if (!results.length) {
    const empty = createElement("p", "hidden-environment-notice", "Nenhuma cena d100 resolvida ainda. Registre uma falha para gerar a próxima cena.");
    section.appendChild(empty);
    return section;
  }

  results.forEach((result, index) => {
    const scene = createElement("div", "current-scene-card");
    const challengeText = result.challenge > 0 ? ` | ND ${formatChallengeRating(result.challenge)}` : "";
    const sourceText = result.rollSource === "manual" ? "manual" : "automático";
    const titlePrefix = results.length > 1 ? `Rolagem ${index + 1}: ` : "";
    const title = createElement("p", "result-title", `${titlePrefix}d100 ${result.roll} (${sourceText}): ${result.categoryLabel}${challengeText}`);
    const detail = createElement("p", "result-detail", result.detail);
    const sceneKey = getSceneKey(result);
    const encounter = createResolvedEncounter(
      result,
      selectedEncounterItemByScene.get(sceneKey),
      (nextKey) => onSelectItem(sceneKey, nextKey),
      () => onRerollMap(result.id || "current")
    );

    scene.appendChild(title);
    scene.appendChild(detail);
    if (encounter) scene.appendChild(encounter);
    section.appendChild(scene);
  });

  return section;
}

function createPendingResetPanel(snapshot, onConfirmFloorReset) {
  if (!snapshot.resetPending) return null;

  const section = createElement("section", "extended-panel reset-pending-panel");
  section.appendChild(createElement("h3", null, "Retorno ao início"));
  section.appendChild(createElement("p", "result-detail", "O limite de falhas foi atingido. Resolva a cena atual antes de zerar o progresso do andar."));
  section.appendChild(createButton("Retornar ao início do andar", "extended-action is-danger", onConfirmFloorReset));
  return section;
}

function createPendingDescentPanel(snapshot, onConfirmPitDescent, onDismissPitDescent) {
  if (!snapshot.descentPending) return null;

  const section = createElement("section", "extended-panel pit-descent-panel");
  section.appendChild(createElement("h3", null, "Descida pelo fosso"));
  section.appendChild(createElement("p", "result-detail", "Uma armadilha de fosso leva ao andar inferior. O grupo pode descer ou continuar explorando o andar atual."));
  section.appendChild(createButton("Descer para o próximo andar", "extended-action", onConfirmPitDescent));
  section.appendChild(createButton("Continuar neste andar", "extended-action", onDismissPitDescent));
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

function createTacticalGrid(tacticalMap) {
  const grid = createElement("div", "tactical-grid");

  grid.style.setProperty("--tactical-width", String(tacticalMap.width));
  grid.style.setProperty("--tactical-height", String(tacticalMap.height));

  tacticalMap.cells.forEach((cell) => {
    const tile = createElement("span", `tactical-cell is-${cell}`);
    tile.title = getTacticalCellLabel(cell);
    grid.appendChild(tile);
  });

  return grid;
}

function createTacticalLegend() {
  const legend = createElement("div", "tactical-legend");

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

  return legend;
}

function openTacticalMapFullscreen(tacticalMap) {
  const overlay = createElement("div", "tactical-fullscreen");
  const panel = createElement("div", "tactical-fullscreen-panel");
  const header = createElement("div", "tactical-map-header");
  const title = createElement(
    "strong",
    null,
    `Mapa 14x10 | ${tacticalMap.enemyCount} inimigo(s) | ${tacticalMap.trapCount} armadilha(s)`
  );

  function close() {
    document.removeEventListener("keydown", onKeyDown);
    overlay.remove();
  }

  function onKeyDown(event) {
    if (event.key === "Escape") close();
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener("keydown", onKeyDown);

  header.appendChild(title);
  header.appendChild(createButton("Fechar", "extended-action is-compact", close));
  panel.appendChild(header);
  panel.appendChild(createTacticalGrid(tacticalMap));
  panel.appendChild(createTacticalLegend());
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
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
  const actions = createElement("div", "tactical-map-actions");

  actions.appendChild(createButton("Expandir", "extended-action is-compact", () => openTacticalMapFullscreen(scene.tacticalMap)));
  actions.appendChild(createButton("Gerar outro mapa", "extended-action is-compact", onRerollMap));
  header.appendChild(title);
  header.appendChild(actions);
  section.appendChild(header);
  section.appendChild(createTacticalGrid(scene.tacticalMap));
  section.appendChild(createTacticalLegend());

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
  onConfirmFloorReset,
  onConfirmPitDescent,
  onDismissPitDescent,
  onOutcome,
  onResolveFinalEncounter,
  onRerollTacticalMap
}) {
  let selectedApproachId = null;
  let selectedFloor = null;
  const manualRollInput = { value: "" };
  const selectedEncounterItemByScene = new Map();

  function setSelectedApproachId(approachId) {
    selectedApproachId = approachId;
    render();
  }

  function render() {
    const snapshot = getSnapshot();
    const firstApproachId = snapshot.approaches[0]?.id || null;
    const selectedApproachExists = snapshot.approaches.some((approach) => approach.id === selectedApproachId);

    if (selectedFloor !== snapshot.floor || !selectedApproachExists) {
      selectedApproachId = firstApproachId;
      manualRollInput.value = "";
      selectedFloor = snapshot.floor;
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
      const currentEncounter = createCurrentResult(
        snapshot,
        selectedEncounterItemByScene,
        (sceneKey, nextKey) => {
          selectedEncounterItemByScene.set(sceneKey, nextKey);
          render();
        },
        (target) => {
          onRerollTacticalMap(target);
          render();
        }
      );
      left.appendChild(currentEncounter);
      const resetPanel = createPendingResetPanel(snapshot, () => {
        onConfirmFloorReset();
        render();
      });
      if (resetPanel) left.appendChild(resetPanel);
      const descentPanel = createPendingDescentPanel(snapshot, () => {
        onConfirmPitDescent();
        render();
      }, () => {
        onDismissPitDescent();
        render();
      });
      if (descentPanel) left.appendChild(descentPanel);

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
