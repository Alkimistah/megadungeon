import { createTacticalMapPanel } from "../tacticalMapRenderer.js";
import { createNodeTacticalMap } from "../nodeTacticalMap.js";
import { createMissionTacticalMap } from "./missionTacticalMap.js";

function createElement(tagName, className = null, text = null) {
  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (text !== null) element.textContent = text;

  return element;
}

function createMissionMeta(mission) {
  return [
    mission.categoryLabel,
    mission.destination?.label,
    mission.objective?.targetName
  ].filter(Boolean).join(" | ");
}

function formatMoney(value) {
  return `T$ ${Math.max(0, Number(value) || 0)}`;
}

function formatMultiplier(value) {
  const multiplier = Math.max(1, Number(value) || 1);

  return String(Number(multiplier.toFixed(2)));
}

function renderReward(mission, { expanded = false, onToggle = null } = {}) {
  const reward = createElement("div", "mission-reward");
  const rewardData = mission.reward || {};
  const total = formatMoney(rewardData.totalPayout);
  const turnInValue = Number(rewardData.turnInValue || 0);
  const completionBonus = Number(rewardData.completionBonus || 0);
  const unitValue = Number(rewardData.unitValue || 0);
  const summary = onToggle
    ? createElement("button", "mission-reward-summary")
    : createElement("div", "mission-reward-summary");
  const details = createElement("div", "mission-reward-details");

  if (onToggle) summary.type = "button";
  summary.setAttribute("aria-expanded", String(expanded));
  summary.appendChild(createElement("strong", null, `Recompensa: ${total}`));
  if (onToggle) {
    summary.appendChild(createElement("span", null, expanded ? "Ocultar detalhes" : "Ver detalhes"));
    summary.addEventListener("click", (event) => {
      event.stopPropagation();
      onToggle(mission.id);
    });
  }
  reward.appendChild(summary);

  if (!mission.reward) {
    reward.appendChild(createElement("span", null, "A definir."));
    return reward;
  }

  details.appendChild(createElement("span", null, `Entrega/cristais: ${formatMoney(turnInValue)}`));
  details.appendChild(createElement("span", null, `Bônus: ${formatMoney(completionBonus)}`));
  details.appendChild(createElement(
    "span",
    null,
    `Base: ND ${rewardData.challengeLabel || "?"}${unitValue ? ` = ${formatMoney(unitValue)}` : ""}`
  ));
  details.appendChild(createElement(
    "span",
    null,
    `Cálculo: qtd. ${rewardData.quantity ?? mission.objective?.quantity ?? 1}, fator ${rewardData.quantityFactor ?? 1}, mult. ${formatMultiplier(rewardData.effectiveMultiplier ?? rewardData.multiplier ?? 1)}`
  ));
  if (expanded) reward.appendChild(details);

  return reward;
}

function getMissionProgress(mission) {
  if (mission.category !== "extermination" && mission.integration?.capability !== "progress-counter") {
    return null;
  }

  const required = Math.max(1, Number(mission.progress?.required || mission.objective?.quantity || 1));
  const current = Math.min(required, Math.max(0, Number(mission.progress?.current || 0)));

  return {
    current,
    ready: current >= required,
    required
  };
}

function getMissionStatusLabel(mission, context = null) {
  if (mission.status === "completed") return "Concluída";
  const progress = getMissionProgress(mission);

  if (progress?.ready) return "Pronta";
  if (progress && progress.current > 0) return "Em progresso";
  if (context?.kind === "node") return "Disponível";
  if (context?.kind === "pending-node") return "Aguardando nodo";
  if (mission.integration?.bindings?.length) return "Vinculada";

  return "Aceita";
}

function getPrimaryBinding(mission) {
  return mission.integration?.bindings?.[0] || null;
}

function getMissionAvailability(mission, context = null) {
  if (mission.status === "completed") {
    return {
      label: "Concluída",
      text: "O mestre marcou esta missão como resolvida.",
      canOpen: false
    };
  }

  if (context?.kind === "node") {
    return {
      label: "Disponível",
      text: `Integrada ao nodo escolhido: ${getPrimaryBinding(mission)?.context || context.node?.label || "nodo vinculado"}.`,
      canOpen: true
    };
  }

  if (context?.kind === "pending-node") {
    return {
      label: "Aguardando nodo",
      text: "Nos andares 11 a 20, a missão só pode ser realizada quando o nodo vinculado for marcado como rota escolhida.",
      canOpen: false
    };
  }

  const binding = getPrimaryBinding(mission);
  if (binding?.context || binding?.label) {
    return {
      label: "Vinculada",
      text: binding.context || binding.label,
      canOpen: false
    };
  }

  if (mission.destination?.kind === "progress") {
    const progress = getMissionProgress(mission);

    return {
      label: progress?.ready ? "Pronta para entregar" : "Progresso",
      text: progress
        ? `${mission.destination.label}. Progresso: ${progress.current}/${progress.required}.`
        : `${mission.destination.label}. Conte qualquer alvo compatível encontrado durante a exploração.`,
      canOpen: false
    };
  }

  return {
    label: "Pendente",
    text: mission.destination?.label ? `Destino: ${mission.destination.label}.` : "Aguardando contexto da exploração.",
    canOpen: false
  };
}

function renderMissionProgress(mission, onAdjustProgress = null) {
  const progress = getMissionProgress(mission);

  if (!progress) return null;

  const wrapper = createElement("div", `mission-progress ${progress.ready ? "is-ready" : ""}`);
  const text = createElement(
    "span",
    null,
    `${progress.current} de ${formatCountLabel(progress.required, "alvo", "alvos")}`
  );
  const controls = createElement("div", "mission-progress-controls");
  const decrement = createElement("button", "extended-action is-compact mission-progress-button", "-");
  const increment = createElement("button", "extended-action is-compact mission-progress-button", "+");

  decrement.type = "button";
  increment.type = "button";
  decrement.disabled = progress.current <= 0 || mission.status === "completed";
  increment.disabled = progress.current >= progress.required || mission.status === "completed";
  decrement.setAttribute("aria-label", `Diminuir progresso de ${mission.title}`);
  increment.setAttribute("aria-label", `Aumentar progresso de ${mission.title}`);
  decrement.addEventListener("click", () => onAdjustProgress?.(mission.id, -1));
  increment.addEventListener("click", () => onAdjustProgress?.(mission.id, 1));

  wrapper.appendChild(createElement("strong", null, progress.ready ? "Objetivo pronto" : "Progresso"));
  controls.append(decrement, increment);
  wrapper.append(text, controls);

  return wrapper;
}

function renderMissionAvailability(mission, context) {
  const availability = getMissionAvailability(mission, context);
  const panel = createElement("div", `mission-availability ${availability.canOpen ? "is-available" : ""}`);

  panel.appendChild(createElement("strong", null, availability.label));
  panel.appendChild(createElement("span", null, availability.text));

  return panel;
}

function formatCountLabel(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function renderMissionMapDetails(mission, tacticalMap) {
  const list = createElement("ul", "mission-map-details");
  const objective = mission.objective || {};
  const resolution = tacticalMap.resolutionCheck;
  const resolutionText = resolution
    ? `${resolution.skill} CD ${resolution.dc} (${resolution.action})`
    : `CD ${tacticalMap.missionDc} para resolver a parte central da missão`;
  const riskNames = tacticalMap.riskDetails?.length
    ? tacticalMap.riskDetails.map((risk) => risk.name).join("; ")
    : "Sem risco adicional detalhado";
  const entries = [
    ["Alvo", `${objective.condition || "resolver"} ${objective.targetName || "o objetivo"}`],
    ["Teste central", resolutionText],
    ["Riscos", riskNames],
    ["Mapa", `${formatCountLabel(tacticalMap.objectiveCount, "ponto de interesse", "pontos de interesse")}, ${formatCountLabel(tacticalMap.enemyCount, "inimigo", "inimigos")} e ${formatCountLabel(tacticalMap.trapCount, "zona de risco", "zonas de risco")}`]
  ];

  if (mission.destination?.label) {
    entries.unshift(["Local", mission.destination.label]);
  }

  entries.forEach(([label, value]) => {
    const item = createElement("li");

    item.appendChild(createElement("strong", null, `${label}: `));
    item.appendChild(document.createTextNode(value));
    list.appendChild(item);
  });

  return list;
}

function renderMissionRiskDetails(tacticalMap) {
  const riskDetails = tacticalMap.riskDetails || [];
  const list = createElement("div", "mission-risk-list");

  riskDetails.forEach((risk) => {
    const card = createElement("article", "mission-risk-card");
    const title = createElement("h4", null, risk.challengeLabel ? `${risk.name} (ND ${risk.challengeLabel})` : risk.name);
    const kind = createElement("p", "node-dialog-type", risk.kind);
    const effect = createElement("p", null, risk.effect);
    const checks = createElement("ul");

    risk.checks.forEach((check) => {
      checks.appendChild(createElement("li", null, check));
    });

    card.append(kind, title, effect);
    if (risk.area) {
      const area = createElement("p", null, `Área: ${risk.area}.`);
      card.appendChild(area);
    }
    if (risk.checks.length) card.appendChild(checks);
    list.appendChild(card);
  });

  return list;
}

function getEncounterItemsText(node) {
  const items = node?.resolvedEncounter?.items || [];

  if (!items.length) return "Encontro ainda não resolvido.";

  return items.map((item) => `${item.quantity || 1}x ${item.name}`).join("; ");
}

function renderIntegratedNodeDetails(mission, node, tacticalMap) {
  const list = createElement("ul", "mission-map-details");
  const binding = (mission.integration?.bindings || []).find((candidate) => candidate.kind === "node");
  const entries = [
    ["Nodo", binding?.context || node?.label || "Nodo vinculado"],
    ["Objetivo da missão", `${mission.objective?.condition || "resolver"} ${mission.objective?.targetName || "o objetivo"}`],
    ["Encontro do nodo", getEncounterItemsText(node)],
    ["Mapa", `${formatCountLabel(tacticalMap.objectiveCount || 0, "ponto de interesse", "pontos de interesse")}, ${formatCountLabel(tacticalMap.enemyCount, "inimigo", "inimigos")} e ${formatCountLabel(tacticalMap.trapCount, "zona de risco", "zonas de risco")}`]
  ];

  entries.forEach(([label, value]) => {
    const item = createElement("li");

    item.appendChild(createElement("strong", null, `${label}: `));
    item.appendChild(document.createTextNode(value));
    list.appendChild(item);
  });

  return list;
}

function getConfirmSelectionLabel(selectedCount) {
  if (selectedCount === 0) return "Continuar sem missões";
  if (selectedCount === 1) return "Confirmar 1 missão";
  return `Confirmar ${selectedCount} missões`;
}

function renderMissionCard(mission, {
  checked = false,
  disabled = false,
  missionContext = null,
  onOpenMission = null,
  onAdjustProgress = null,
  onToggleReward = null,
  onToggle = null,
  rewardExpanded = false,
  selectable = false,
  onComplete = null
} = {}) {
  const card = createElement("article", `mission-card ${mission.status === "completed" ? "is-completed" : ""} ${selectable ? "is-selectable" : ""} ${checked ? "is-selected" : ""}`);
  const header = createElement("div", "mission-card-header");
  const titleBlock = createElement("div");
  const category = createElement("p", "node-dialog-type", createMissionMeta(mission));
  const title = createElement("h3", null, mission.title);
  const status = createElement("span", "mission-status", getMissionStatusLabel(mission, missionContext));

  titleBlock.append(category, title);
  header.appendChild(titleBlock);

  if (selectable) {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = checked;
    input.disabled = disabled && !checked;
    input.setAttribute("aria-label", `Selecionar missão: ${mission.title}`);
    input.addEventListener("click", (event) => event.stopPropagation());
    input.addEventListener("change", () => onToggle?.(mission.id, input.checked));
    header.prepend(input);
    card.setAttribute("role", "checkbox");
    card.setAttribute("aria-checked", String(checked));
    card.tabIndex = 0;
    card.addEventListener("click", () => {
      if (disabled && !checked) return;
      onToggle?.(mission.id, !checked);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      if (disabled && !checked) return;
      onToggle?.(mission.id, !checked);
    });
  } else {
    header.appendChild(status);
  }

  card.appendChild(header);
  card.appendChild(createElement("p", "result-detail", mission.description));
  const proof = createElement("p", "mission-proof");
  proof.appendChild(createElement("strong", null, "Objetivo: "));
  proof.appendChild(document.createTextNode(mission.proofType || "Confirmação do mestre."));
  card.appendChild(proof);
  const progress = selectable ? null : renderMissionProgress(mission, onAdjustProgress);
  if (progress) card.appendChild(progress);
  card.appendChild(renderReward(mission, {
    expanded: rewardExpanded,
    onToggle: selectable ? null : onToggleReward
  }));

  if (!selectable) {
    card.appendChild(renderMissionAvailability(mission, missionContext));
  }

  if (!selectable && mission.status !== "completed") {
    const actions = createElement("div", "mission-card-actions");
    const availability = getMissionAvailability(mission, missionContext);

    if (availability.canOpen) {
      const openButton = createElement("button", "extended-action is-compact", "Abrir encontro");
      openButton.type = "button";
      openButton.addEventListener("click", () => onOpenMission?.(mission.id));
      actions.appendChild(openButton);
    }

    const completeButton = createElement("button", "extended-action is-compact", "Marcar como concluída");
    completeButton.type = "button";
    completeButton.addEventListener("click", () => onComplete?.(mission.id));
    actions.appendChild(completeButton);
    card.appendChild(actions);
  }

  return card;
}

function renderMissionRunContent(mission, onComplete, context = null, profile = null, onAdjustProgress = null, rewardExpanded = false, onToggleReward = null) {
  const container = createElement("div", "mission-run");
  const card = renderMissionCard(mission, { onAdjustProgress, onComplete, onToggleReward, rewardExpanded });
  const guidance = createElement("section", "mission-run-guidance");
  const node = context?.kind === "node" ? context.node : null;
  const pendingNode = context?.kind === "pending-node";
  const tacticalMap = node
    ? createNodeTacticalMap(node, { mission })
    : pendingNode
      ? null
      : createMissionTacticalMap(mission, { profile });
  const tacticalPanel = createTacticalMapPanel(tacticalMap, {
    mapKind: node ? "Mapa tático do nodo" : "Mapa tático da missão"
  });
  const title = createElement("h3", null, "Encontro de missão");
  const text = createElement(
    "p",
    null,
    node
      ? "Esta missão está integrada ao nodo vinculado. Use o encontro do nodo e trate o objetivo da missão como um ponto adicional dentro da mesma cena."
      : pendingNode
        ? "Esta missão será integrada a um nodo quando o andar vinculado for gerado. Ela não cria um encontro separado nos andares 11 a 20."
      : "Use esta entrada como conteúdo adicional do andar. Abra a cena quando fizer sentido na exploração; resolver a cena não marca a missão automaticamente."
  );
  const objective = createElement("p", "mission-proof");
  objective.appendChild(createElement("strong", null, "Objetivo: "));
  objective.appendChild(document.createTextNode(`${mission.objective?.condition || "resolver"} ${mission.objective?.targetName || "o alvo da missão"}.`));

  guidance.append(title, text, objective);
  container.append(guidance, card);
  if (tacticalPanel) {
    tacticalPanel.classList.add("mission-tactical-map");
    const mapNote = createElement(
      "p",
      "mission-map-note",
      node
        ? "Mapa do próprio nodo com o ponto de interesse da missão marcado."
        : "Mapa opcional para conduzir a missão sem substituir o encontro normal do andar."
    );

    container.append(mapNote, node ? renderIntegratedNodeDetails(mission, node, tacticalMap) : renderMissionMapDetails(mission, tacticalMap));
    if (!node && tacticalMap.riskDetails?.length) {
      container.appendChild(renderMissionRiskDetails(tacticalMap));
    }
    container.appendChild(tacticalPanel);
  }

  return container;
}

export function createMissionDialogController({
  closeButton,
  contentElement,
  dialogElement,
  getMissionContext = () => null,
  getOffers,
  getProfile,
  getSelected,
  onConfirmSelection,
  onAdjustProgress,
  onMarkCompleted,
  openButton
}) {
  const selectedOfferIds = new Set();
  const expandedRewardIds = new Set();
  let mode = "view";
  let allowSelectionClose = false;

  function toggleReward(missionId, renderCallback) {
    if (expandedRewardIds.has(missionId)) {
      expandedRewardIds.delete(missionId);
    } else {
      expandedRewardIds.add(missionId);
    }
    renderCallback();
  }

  function renderSelection() {
    const offers = getOffers();
    const selectedCount = selectedOfferIds.size;

    closeButton.hidden = true;
    contentElement.innerHTML = "";

    const summary = createElement("div", "mission-dialog-summary");
    summary.innerHTML = `
      <p class="node-dialog-meta">${getProfile().label}</p>
      <strong>${selectedCount}/3</strong>
    `;
    contentElement.appendChild(summary);

    const list = createElement("div", "mission-list");
    offers.forEach((mission) => {
      list.appendChild(renderMissionCard(mission, {
        checked: selectedOfferIds.has(mission.id),
        disabled: selectedCount >= 3,
        selectable: true,
        onToggle: (missionId, isSelected) => {
          if (isSelected) {
            if (selectedOfferIds.size >= 3) return;
            selectedOfferIds.add(missionId);
          } else {
            selectedOfferIds.delete(missionId);
          }
          renderSelection();
        }
      }));
    });

    const actions = createElement("div", "mission-dialog-actions");
    const confirm = createElement(
      "button",
      "generate-button",
      getConfirmSelectionLabel(selectedCount)
    );
    confirm.type = "button";
    confirm.addEventListener("click", () => {
      allowSelectionClose = true;
      onConfirmSelection([...selectedOfferIds]);
      selectedOfferIds.clear();
      dialogElement.close();
    });

    actions.appendChild(confirm);
    contentElement.append(list, actions);
  }

  function renderView() {
    const missions = getSelected();

    closeButton.hidden = false;
    contentElement.innerHTML = "";

    if (!missions.length) {
      contentElement.appendChild(createElement("p", "hidden-environment-notice", "Nenhuma missão selecionada."));
      return;
    }

    const list = createElement("div", "mission-list");
    missions.forEach((mission) => {
      const missionContext = getMissionContext(mission);

      list.appendChild(renderMissionCard(mission, {
        missionContext,
        onAdjustProgress: (missionId, delta) => {
          onAdjustProgress?.(missionId, delta);
          renderView();
        },
        onComplete: (missionId) => {
          onMarkCompleted(missionId);
          renderView();
        },
        onOpenMission: renderMissionRun,
        onToggleReward: (missionId) => toggleReward(missionId, renderView),
        rewardExpanded: expandedRewardIds.has(mission.id)
      }));
    });
    contentElement.appendChild(list);
  }

  function renderMissionRun(missionId) {
    const mission = getSelected().find((candidate) => candidate.id === missionId);

    closeButton.hidden = false;
    contentElement.innerHTML = "";

    if (!mission) {
      contentElement.appendChild(createElement("p", "hidden-environment-notice", "Missão não encontrada."));
      return;
    }

    contentElement.appendChild(renderMissionRunContent(mission, (completedMissionId) => {
      onMarkCompleted(completedMissionId);
      renderMissionRun(completedMissionId);
    }, getMissionContext(mission), getProfile(), (missionId, delta) => {
      onAdjustProgress?.(missionId, delta);
      renderMissionRun(missionId);
    }, expandedRewardIds.has(mission.id), (missionId) => toggleReward(missionId, () => renderMissionRun(missionId))));
  }

  function openSelection() {
    mode = "selection";
    allowSelectionClose = false;
    dialogElement.classList.add("is-selection-mode");
    selectedOfferIds.clear();
    renderSelection();
    dialogElement.showModal();
  }

  function openView() {
    mode = "view";
    allowSelectionClose = true;
    dialogElement.classList.remove("is-selection-mode");
    renderView();
    dialogElement.showModal();
  }

  function openMission(missionId) {
    mode = "mission";
    allowSelectionClose = true;
    dialogElement.classList.remove("is-selection-mode");
    renderMissionRun(missionId);
    dialogElement.showModal();
  }

  closeButton.addEventListener("click", () => {
    if (mode !== "selection") dialogElement.close();
  });
  openButton.addEventListener("click", openView);
  dialogElement.addEventListener("click", (event) => {
    if (event.target === dialogElement && mode !== "selection") {
      dialogElement.close();
    }
  });
  dialogElement.addEventListener("cancel", (event) => {
    if (mode === "selection") event.preventDefault();
  });
  dialogElement.addEventListener("close", () => {
    if (mode === "selection" && !allowSelectionClose) {
      dialogElement.classList.add("is-selection-mode");
      queueMicrotask(() => {
        if (!dialogElement.open) dialogElement.showModal();
      });
      return;
    }

    dialogElement.classList.remove("is-selection-mode");
    if (mode === "selection") selectedOfferIds.clear();
  });

  return {
    openMission,
    openSelection,
    openView,
    rerender: () => {
      if (!dialogElement.open) return;
      if (mode === "selection") renderSelection();
      else renderView();
    }
  };
}
