import { createTacticalMapPanel } from "../tacticalMapRenderer.js";
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

function renderReward(mission) {
  const reward = createElement("p", "mission-reward");
  reward.appendChild(createElement("strong", null, "Recompensa: "));
  reward.appendChild(document.createTextNode(mission.reward?.text || "A definir."));
  return reward;
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

function getConfirmSelectionLabel(selectedCount) {
  if (selectedCount === 0) return "Continuar sem missões";
  if (selectedCount === 1) return "Confirmar 1 missão";
  return `Confirmar ${selectedCount} missões`;
}

function renderMissionCard(mission, { checked = false, disabled = false, onToggle = null, selectable = false, onComplete = null } = {}) {
  const card = createElement("article", `mission-card ${mission.status === "completed" ? "is-completed" : ""} ${selectable ? "is-selectable" : ""} ${checked ? "is-selected" : ""}`);
  const header = createElement("div", "mission-card-header");
  const titleBlock = createElement("div");
  const category = createElement("p", "node-dialog-type", createMissionMeta(mission));
  const title = createElement("h3", null, mission.title);
  const status = createElement("span", "mission-status", mission.status === "completed" ? "Concluída" : "Pendente");

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
  if (mission.complication) {
    const complication = createElement("p", "mission-complication");
    complication.appendChild(createElement("strong", null, "Complicação: "));
    complication.appendChild(document.createTextNode(mission.complication));
    card.appendChild(complication);
  }
  const proof = createElement("p", "mission-proof");
  proof.appendChild(createElement("strong", null, "Prova: "));
  proof.appendChild(document.createTextNode(mission.proofType || "Confirmação do mestre."));
  card.appendChild(proof);
  card.appendChild(renderReward(mission));

  if (!selectable && mission.status !== "completed") {
    const button = createElement("button", "extended-action is-compact", "Marcar como concluída");
    button.type = "button";
    button.addEventListener("click", () => onComplete?.(mission.id));
    card.appendChild(button);
  }

  return card;
}

function renderMissionRunContent(mission, onComplete) {
  const container = createElement("div", "mission-run");
  const card = renderMissionCard(mission, { onComplete });
  const guidance = createElement("section", "mission-run-guidance");
  const tacticalMap = createMissionTacticalMap(mission);
  const tacticalPanel = createTacticalMapPanel(tacticalMap, {
    mapKind: "Mapa tático da missão"
  });
  const title = createElement("h3", null, "Encontro de missão");
  const text = createElement(
    "p",
    null,
    "Use esta entrada como conteúdo adicional do andar. Abra a cena quando fizer sentido na exploração; resolver a cena não marca a missão automaticamente."
  );
  const objective = createElement("p", "mission-proof");
  objective.appendChild(createElement("strong", null, "Objetivo: "));
  objective.appendChild(document.createTextNode(`${mission.objective?.condition || "resolver"} ${mission.objective?.targetName || "o alvo da missão"}.`));

  guidance.append(title, text, objective);
  container.append(guidance, card);
  if (tacticalPanel) {
    tacticalPanel.classList.add("mission-tactical-map");
    const mapNote = createElement("p", "mission-map-note", "Mapa opcional para conduzir a missão sem substituir o encontro normal do andar.");

    container.append(mapNote, renderMissionMapDetails(mission, tacticalMap));
    if (tacticalMap.riskDetails?.length) {
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
  getOffers,
  getProfile,
  getSelected,
  onConfirmSelection,
  onMarkCompleted,
  openButton
}) {
  const selectedOfferIds = new Set();
  let mode = "view";
  let allowSelectionClose = false;

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
      list.appendChild(renderMissionCard(mission, {
        onComplete: (missionId) => {
          onMarkCompleted(missionId);
          renderView();
        }
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
    }));
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
