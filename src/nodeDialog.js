import { formatChallengeRating } from "./challenge.js";

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

function createModalFooter(node) {
  const footer = document.createElement("footer");

  footer.className = "modal-footer";
  footer.appendChild(createDetailLine("Coluna", String(node.column + 1)));

  return footer;
}

export function createNodeDialogController({
  contentElement,
  dialogElement,
  metaElement,
  onAttempt,
  onChooseRoute,
  onExplore,
  onRest,
  state,
  titleElement,
  typeElement
}) {
  let currentNode = null;

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

  function render(node) {
    if (!state.canOpenNode(node)) return;

    const checkText = node.skill && node.dc ? `${node.skill} ${node.dc}` : "Sem teste de descoberta";
    const explorationText = `${node.investigationMinutes} min`;
    const challengeText = getChallengeText(node, state);

    currentNode = node;
    titleElement.textContent = `Encontro ${node.level}`;
    typeElement.textContent = getNodeDialogTitle(node, state);
    setNodeDialogMeta(metaElement, checkText, explorationText, challengeText);
    contentElement.innerHTML = "";
    contentElement.appendChild(createModalActions(node));

    if (canShowEnvironmentDetails(node, state)) {
      contentElement.appendChild(createEnvironmentColumns(node));
    } else {
      contentElement.appendChild(createHiddenEnvironmentNotice());
    }

    contentElement.appendChild(createDivider());
    contentElement.appendChild(createModalFooter(node));

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
