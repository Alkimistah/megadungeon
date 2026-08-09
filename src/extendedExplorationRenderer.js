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

function getApplicableTestEffects(snapshot, approach) {
  return (snapshot.pendingTestEffects || []).filter((effect) => {
    if (!effect.skills?.length) return true;
    return effect.skills.includes(approach?.skill);
  });
}

function getDcText(snapshot, approach) {
  const rules = snapshot.rules;
  if (!rules || !approach) return "—";

  const testEffects = getApplicableTestEffects(snapshot, approach);
  const testModifier = testEffects.reduce((total, effect) => total + (effect.dcModifier || 0), 0);
  const dc = rules.baseDc + approach.dcModifier + testModifier;
  const modifier = approach.dcModifier > 0 ? `+${approach.dcModifier}` : "0";
  const minutes = Math.max(Math.round((rules.baseMinutes || 10) * (approach.timeMultiplier || 1)), 1);
  const effectText = testEffects.length
    ? ` | Estado: ${testEffects.map((effect) => effect.label).join(", ")}`
    : "";

  return `${approach.skill} CD ${dc} (${modifier}) | ${minutes}min${effectText}`;
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
  const titleText = createElement("strong", null, "Caminho pelo labirinto");
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
  const type = createElement("p", "node-dialog-type", snapshot.phase === "boss" ? "Chefe" : "Travessia da masmorra");
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
  const heading = createElement("h3", null, "Próxima abordagem");
  const controls = createElement("div", "extended-controls");
  const approachLabel = createElement("label");
  const approachText = document.createTextNode("Abordagem");
  const approachSelect = document.createElement("select");
  const selectedApproach = snapshot.approaches.find((approach) => approach.id === selectedApproachId)
    || snapshot.approaches[0];
  const selectedApproachAlreadyUsed = snapshot.usedApproachIds.includes(selectedApproach.id);
  const actionsDisabled = selectedApproachAlreadyUsed || snapshot.resetPending;
  const dc = createElement("p", "extended-dc", getDcText(snapshot, selectedApproach));
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
  const label = createElement("strong", null, "Caminhos já tentados neste andar:");
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
  const effects = [
    ...(snapshot.pendingSceneEffects || []),
    ...(snapshot.pendingTestEffects || [])
  ];

  if (!effects.length) return null;

  const container = createElement("div", "pending-effects");
  const label = createElement("strong", null, "Presságios pendentes:");
  const value = createElement(
    "span",
    null,
    effects.map((effect) => effect.label).join(", ")
  );

  container.appendChild(label);
  container.appendChild(value);

  return container;
}

function getSceneKey(scene) {
  return scene?.id || scene?.encounterNode?.id || `${scene?.roll}-${scene?.categoryId}`;
}

function createPendingResetPanel(snapshot, onConfirmFloorReset) {
  if (!snapshot.resetPending) return null;

  const section = createElement("section", "extended-panel reset-pending-panel");
  section.appendChild(createElement("h3", null, "O labirinto se fecha"));
  section.appendChild(createElement("p", "result-detail", "Erros demais chamaram a atenção da masmorra. Resolva a cena atual antes de voltar ao início do andar."));
  section.appendChild(createButton("Voltar ao início do andar", "extended-action is-danger", onConfirmFloorReset));
  return section;
}

function createPendingDescentPanel(snapshot, onConfirmPitDescent, onDismissPitDescent) {
  if (!snapshot.descentPending) return null;

  const section = createElement("section", "extended-panel pit-descent-panel");
  section.appendChild(createElement("h3", null, "Fosso para o andar inferior"));
  section.appendChild(createElement("p", "result-detail", "A queda revela uma rota bruta para baixo. O grupo pode aceitar a descida ou continuar procurando a saída deste andar."));
  section.appendChild(createButton("Descer para o próximo andar", "extended-action", onConfirmPitDescent));
  section.appendChild(createButton("Continuar neste andar", "extended-action", onDismissPitDescent));
  return section;
}

const TACTICAL_CELL_LABELS = {
  advantage: "Vantagem/elevação",
  boss: "Chefe Grande",
  difficult: "Terreno difícil",
  door: "Porta (entrada/saída)",
  enemy: "Inimigo",
  floor: "Chão",
  hidden: "Inimigo oculto/em potencial",
  mechanism: "Mecanismo",
  objective: "Objetivo/achado",
  obstacle: "Obstáculo",
  party: "Grupo",
  pit: "Fosso/vão",
  reinforcement: "Entrada de reforço",
  trap: "Armadilha",
  wall: "Parede",
  web: "Teia/casulo"
};

const TACTICAL_CELL_GLYPHS = {
  advantage: "✦",
  boss: "B",
  difficult: "D",
  enemy: "E",
  hidden: "?",
  mechanism: "M",
  objective: "!",
  party: "G",
  pit: "F",
  reinforcement: "R",
  trap: "T",
  web: "W"
};

const TACTICAL_LEGEND_ORDER = [
  "wall", "party", "boss", "enemy", "hidden", "trap", "pit", "web",
  "difficult", "mechanism", "objective", "door", "advantage", "obstacle", "reinforcement"
];

function getTacticalCellLabel(cell) {
  return TACTICAL_CELL_LABELS[cell] || cell;
}

function createTacticalGrid(tacticalMap) {
  const grid = createElement("div", "tactical-grid");

  grid.style.setProperty("--tactical-width", String(tacticalMap.width));
  grid.style.setProperty("--tactical-height", String(tacticalMap.height));
  grid.style.setProperty("--tactical-aspect", `${tacticalMap.width} / ${tacticalMap.height}`);
  grid.style.setProperty("--tactical-fit-ratio", String(tacticalMap.width / tacticalMap.height));
  grid.style.setProperty("--tactical-max-width", `${tacticalMap.width * 40}px`);

  tacticalMap.cells.forEach((cell) => {
    const tile = createElement("span", `tactical-cell is-${cell}`);
    const glyph = TACTICAL_CELL_GLYPHS[cell];
    tile.title = getTacticalCellLabel(cell);
    if (glyph) tile.textContent = glyph;
    grid.appendChild(tile);
  });

  return grid;
}

function createTacticalLegend(tacticalMap) {
  const legend = createElement("div", "tactical-legend");
  const presentCells = new Set(tacticalMap?.cells || []);
  const cells = TACTICAL_LEGEND_ORDER.filter((cell) => presentCells.has(cell));

  cells.forEach((cell) => {
    const item = createElement("span", "tactical-legend-item");
    const swatch = createElement("span", `tactical-swatch is-${cell}`);
    const glyph = TACTICAL_CELL_GLYPHS[cell];

    if (glyph) swatch.textContent = glyph;
    item.appendChild(swatch);
    item.appendChild(document.createTextNode(getTacticalCellLabel(cell)));
    legend.appendChild(item);
  });

  return legend;
}

function openTacticalMapFullscreen(tacticalMap) {
  const overlay = createElement("div", "tactical-fullscreen tactical-map-fullscreen");
  const panel = createElement("div", "tactical-fullscreen-panel tactical-map-fullscreen-panel");
  const header = createElement("div", "tactical-map-header");
  const title = createElement(
    "strong",
    null,
    `Mapa ${tacticalMap.width}x${tacticalMap.height} | ${tacticalMap.enemyCount} inimigo(s) | ${tacticalMap.trapCount} zona(s) de risco`
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
  panel.appendChild(createTacticalLegend(tacticalMap));
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
}

function openSceneModal({ title, tabs, initialTabIndex = 0 }) {
  const overlay = createElement("div", "tactical-fullscreen scene-modal");
  const panel = createElement("div", "tactical-fullscreen-panel scene-modal-panel");
  const header = createElement("div", "tactical-map-header");
  const tabBar = createElement("div", "scene-modal-tabs");
  const body = createElement("div", "scene-modal-body");
  let activeTabIndex = Math.min(initialTabIndex, tabs.length - 1);

  function close() {
    document.removeEventListener("keydown", onKeyDown);
    overlay.remove();
  }

  function onKeyDown(event) {
    if (event.key === "Escape") close();
  }

  function renderTabBar() {
    [...tabBar.children].forEach((child, index) => {
      child.classList.toggle("is-selected", index === activeTabIndex);
    });
  }

  function renderBody() {
    body.innerHTML = "";
    body.appendChild(tabs[activeTabIndex].renderContent(renderBody, close));
  }

  tabs.forEach((tab, index) => {
    tabBar.appendChild(createButton(tab.label, "extended-action is-compact", () => {
      activeTabIndex = index;
      renderTabBar();
      renderBody();
    }));
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener("keydown", onKeyDown);

  header.appendChild(createElement("strong", null, title));
  header.appendChild(createButton("Fechar", "extended-action is-compact", close));
  panel.appendChild(header);
  if (tabs.length > 1) panel.appendChild(tabBar);
  panel.appendChild(body);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  renderTabBar();
  renderBody();
}

function createTacticalMap(scene, onRerollMap, extraActions = []) {
  if (!scene?.tacticalMap) return null;

  const section = createElement("div", "tactical-map-panel");
  const header = createElement("div", "tactical-map-header");
  const mapKind = scene.tacticalMap.preset ? "Mapa da cena (fixo)" : "Mapa";
  const title = createElement(
    "strong",
    null,
    `${mapKind} ${scene.tacticalMap.width}x${scene.tacticalMap.height} | ${scene.tacticalMap.enemyCount} inimigo(s) | ${scene.tacticalMap.trapCount} zona(s) de risco`
  );
  const actions = createElement("div", "tactical-map-actions");

  actions.appendChild(createButton("Expandir", "extended-action is-compact", () => openTacticalMapFullscreen(scene.tacticalMap)));
  extraActions.forEach((action) => actions.appendChild(action));
  if (!scene.tacticalMap.preset) {
    actions.appendChild(createButton("Gerar outro mapa", "extended-action is-compact", onRerollMap));
  }
  header.appendChild(title);
  header.appendChild(actions);
  section.appendChild(header);
  section.appendChild(createTacticalGrid(scene.tacticalMap));
  section.appendChild(createTacticalLegend(scene.tacticalMap));

  return section;
}

function createSceneEffects(scene) {
  const effects = [
    ...(scene?.immediateEffects || []),
    ...(scene?.sceneEffects || [])
  ];

  if (!effects.length) return null;

  const list = createElement("ul", "scene-effects");
  effects.forEach((effect) => {
    const item = createElement("li");
    item.appendChild(createElement("strong", null, effect.label));
    if (effect.note) item.appendChild(document.createTextNode(` — ${effect.note}`));
    list.appendChild(item);
  });

  return list;
}

function createResolvedEncounter(scene, selectedItemKey, onSelectItem, onRerollMap, tacticalMapActions = []) {
  const hasItems = Boolean(scene?.encounterNode?.resolvedEncounter?.items?.length);
  const tacticalMap = createTacticalMap(scene, onRerollMap, tacticalMapActions);

  if (!hasItems && !tacticalMap) return null;

  const wrapper = createElement("div", "extended-encounter-result");
  const effects = createSceneEffects(scene);

  if (effects) wrapper.appendChild(effects);
  if (tacticalMap) wrapper.appendChild(tacticalMap);
  if (hasItems) {
    const selectedKey = selectedItemKey || getDefaultEncounterItemKey(scene.encounterNode);
    wrapper.appendChild(createEncounterCombatPage(scene.encounterNode, selectedKey, onSelectItem));
  }

  return wrapper;
}

function hasOpenableContent(scene) {
  return Boolean(scene?.encounterNode?.resolvedEncounter?.items?.length || scene?.tacticalMap);
}

function createFinalGimmick(gimmickData) {
  if (!gimmickData) return null;

  const gimmick = createElement("p", "final-gimmick");
  gimmick.appendChild(createElement("strong", null, `Gimmick do andar — ${gimmickData.name}: `));
  gimmick.appendChild(document.createTextNode(gimmickData.detail));

  return gimmick;
}

function buildSceneModalContent(scene, rerollTarget, selectedEncounterItemByScene, onRerollTacticalMap, refresh, tacticalMapActions = []) {
  const wrapper = createElement("div", "scene-modal-content");
  const sceneKey = getSceneKey(scene);

  if (scene.detail) wrapper.appendChild(createElement("p", "result-detail", scene.detail));
  const gimmick = createFinalGimmick(scene.gimmick);
  if (gimmick) wrapper.appendChild(gimmick);

  const encounter = createResolvedEncounter(
    scene,
    selectedEncounterItemByScene.get(sceneKey),
    (nextKey) => {
      selectedEncounterItemByScene.set(sceneKey, nextKey);
      refresh();
    },
    () => {
      onRerollTacticalMap(rerollTarget);
      refresh();
    },
    tacticalMapActions
  );
  if (encounter) wrapper.appendChild(encounter);

  return wrapper;
}

function createCurrentResult(snapshot, selectedEncounterItemByScene, onRerollTacticalMap) {
  const section = createElement("section", "extended-panel");
  const heading = createElement("h3", null, "Cena revelada");
  const results = snapshot.currentResults?.length
    ? snapshot.currentResults
    : snapshot.currentResult ? [snapshot.currentResult] : [];

  section.appendChild(heading);

  if (!results.length) {
    const empty = createElement("p", "hidden-environment-notice", "Nenhuma cena d100 foi revelada ainda. Quando o grupo falhar, a masmorra responderá.");
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
    const effects = createSceneEffects(result);

    scene.appendChild(title);
    scene.appendChild(detail);
    if (effects) scene.appendChild(effects);
    section.appendChild(scene);
  });

  const openable = results.filter(hasOpenableContent);
  if (openable.length) {
    section.appendChild(createButton(
      results.length > 1 ? "Abrir cenas reveladas" : "Abrir cena completa",
      "extended-action",
      () => openSceneModal({
        title: results.length > 1 ? "Cenas reveladas pela falha" : "Cena revelada pela masmorra",
        tabs: openable.map((result, index) => ({
          label: openable.length > 1 ? `Rolagem ${index + 1}` : "Cena",
          renderContent: (refresh) => buildSceneModalContent(
            result,
            result.id || "current",
            selectedEncounterItemByScene,
            onRerollTacticalMap,
            refresh
          )
        }))
      })
    ));
  }

  return section;
}

function createFinalEncounter(snapshot, onResolveFinalEncounter, onAdvanceFloor, selectedEncounterItemByScene, onRerollTacticalMap, onRerollFinalEncounter) {
  const section = createElement("section", "extended-panel final-encounter-panel");
  const heading = createElement("h3", null, "Última ameaça do andar");

  section.appendChild(heading);

  if (!snapshot.finalEncounter) {
    section.appendChild(createElement("p", "hidden-environment-notice", "Quando o grupo encontrar a saída, a última ameaça deste andar será revelada."));
    return section;
  }

  const finalEncounter = snapshot.finalEncounter;
  const challengeText = finalEncounter.challenge > 0
    ? `ND ${formatChallengeRating(finalEncounter.challenge)}`
    : "sem ND definido";
  const typeText = finalEncounter.categoryLabel ? ` | ${finalEncounter.categoryLabel}` : "";

  section.appendChild(createElement("p", "result-title", `${finalEncounter.title} (${challengeText}${typeText})`));

  if (finalEncounter.treasureNote) {
    const treasure = createElement("p", "final-treasure");
    treasure.appendChild(createElement("strong", null, "Recompensa: "));
    treasure.appendChild(document.createTextNode(`XP integral. ${finalEncounter.treasureNote}`));
    section.appendChild(treasure);
  }

  if (hasOpenableContent(finalEncounter)) {
    section.appendChild(createButton(
      "Abrir encontro completo",
      "extended-action",
      () => openSceneModal({
        title: finalEncounter.title,
        tabs: [{
          label: "Encontro",
          renderContent: (refresh, close) => buildSceneModalContent(
            finalEncounter,
            "final",
            selectedEncounterItemByScene,
            onRerollTacticalMap,
            refresh,
            finalEncounter.sceneId && (finalEncounter.sceneOptions || 0) > 1
              ? [createButton("Sortear outra cena", "extended-action is-compact", () => {
                onRerollFinalEncounter();
                close();
              })]
              : []
          )
        }]
      })
    ));
  }

  if (snapshot.phase === "floorEncounter") {
    const actions = createElement("div", "final-encounter-actions");
    actions.appendChild(createButton("Marcar ameaça resolvida", "extended-action is-door-open", onResolveFinalEncounter));
    section.appendChild(actions);
  }

  if (snapshot.phase === "readyToAdvance") {
    section.appendChild(createButton("Descer para o próximo andar", "extended-action is-door-open is-next-floor", onAdvanceFloor));
  }

  return section;
}

function createBossPanel(snapshot, selectedEncounterItemByScene, onResolveBossEncounter) {
  const section = createElement("section", "extended-panel boss-panel");
  const boss = snapshot.bossEncounter;

  section.appendChild(createElement("h3", null, boss.title));
  section.appendChild(createElement("p", "result-title", `ND ${boss.challengeLabel}`));
  section.appendChild(createElement("p", "result-detail", `No centro do covil está ${boss.mainCreatureName}. Desde o início, ${boss.supportCreatureName} se movem pelas teias. Recompensa: ${boss.reward}.`));
  section.appendChild(createElement("p", "result-detail", boss.detail));

  if (boss.treasureNote) {
    const treasure = createElement("p", "final-treasure");
    treasure.appendChild(createElement("strong", null, "Recompensa: "));
    treasure.appendChild(document.createTextNode(`XP integral do encontro ND ${boss.challengeLabel}. ${boss.treasureNote}`));
    section.appendChild(treasure);
  }

  section.appendChild(createButton(
    "Abrir encontro da Matriarca",
    "extended-action",
    () => openSceneModal({
      title: boss.title,
      tabs: [{
        label: "Encontro",
        renderContent: (refresh) => buildSceneModalContent(
          boss,
          "boss",
          selectedEncounterItemByScene,
          () => {},
          refresh
        )
      }]
    })
  ));
  section.appendChild(createButton("Marcar Matriarca derrotada", "extended-action is-door-open", onResolveBossEncounter));

  return section;
}

function createCompletedPanel(snapshot) {
  const section = createElement("section", "extended-panel boss-panel");
  const summary = snapshot.completedSummary;

  section.appendChild(createElement("h3", null, summary.title));
  section.appendChild(createElement("p", "result-detail", summary.text));
  section.appendChild(createElement("p", "final-treasure", `Recompensa principal: ${summary.reward}.`));

  return section;
}

function createLog(snapshot) {
  const section = createElement("section", "extended-panel log-panel");
  const heading = createElement("h3", null, "Crônica da exploração");
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
  onResolveBossEncounter,
  onResolveFinalEncounter,
  onRerollFinalEncounter,
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
      left.appendChild(createBossPanel(snapshot, selectedEncounterItemByScene, () => {
        onResolveBossEncounter();
        render();
      }));
    } else if (snapshot.phase === "completed") {
      left.appendChild(createCompletedPanel(snapshot));
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
        onRerollTacticalMap
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

      left.appendChild(createFinalEncounter(
        snapshot,
        onResolveFinalEncounter,
        onAdvanceFloor,
        selectedEncounterItemByScene,
        onRerollTacticalMap,
        () => {
          onRerollFinalEncounter();
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
