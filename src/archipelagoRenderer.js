import { assetUrl } from "./assetUrl.js";

const UNEXPLORED_ISLAND_ICON = "/assets/icons/islands/ilha-nao-explorada.svg";

function byFloor(islands) {
  return new Map(islands.map((island) => [island.floor, island]));
}

function getDifficultyLabel(difficulty) {
  return {
    initial: "Inicial",
    intermediate: "Intermediária",
    advanced: "Avançada",
    boss: "Boss"
  }[difficulty] || difficulty;
}

function getIslandDisplayName(island) {
  if (island.visited || island.completed) return island.name;
  if (island.floor === 30) return "Ilha 30";
  return `Ilha ${island.floor}`;
}

function isIslandRevealed(island) {
  return island.visited || island.completed;
}

function getIslandModalCopy(island) {
  if (isIslandRevealed(island)) {
    return island.narrative || island.objectives[island.objectives.length - 1]?.description || "";
  }

  if (!island.available) return "Esta ilha ainda não está acessível.";

  return "A identidade desta ilha será revelada quando o grupo iniciar a exploração.";
}

function createButton({ className, disabled = false, label, onClick }) {
  const button = document.createElement("button");
  button.className = className;
  button.disabled = disabled;
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function createIconButton({ className, icon, label, onClick, type = "button" }) {
  const button = document.createElement("button");
  button.className = className;
  button.type = type;
  button.setAttribute("aria-label", label);
  button.innerHTML = `<img src="${assetUrl(icon)}" alt="" />`;
  button.addEventListener("click", onClick);
  return button;
}

export function createArchipelagoRenderer({
  container,
  getMissionsForFloor = () => [],
  getSnapshot,
  onCompleteIsland,
  onExploreIsland,
  onOpenMission = () => {},
  onResolveObjective,
  onRestAtBoat
}) {
  let selectedFloor = 21;
  let islandDialog = null;

  function ensureDialog() {
    if (islandDialog) return islandDialog;

    islandDialog = document.createElement("dialog");
    islandDialog.className = "archipelago-dialog";
    islandDialog.addEventListener("click", (event) => {
      if (event.target === islandDialog) islandDialog.close();
    });
    document.body.appendChild(islandDialog);
    return islandDialog;
  }

  function openIslandDialog(floor) {
    selectedFloor = floor;
    const dialog = ensureDialog();
    if (!dialog.open) dialog.showModal();
    render();
  }

  function renderIslandButton(island) {
    const missions = getMissionsForFloor(island.floor);
    const button = document.createElement("button");
    button.className = [
      "archipelago-island",
      `archipelago-island-${island.difficulty}`,
      island.themeId ? `archipelago-island-theme-${island.themeId}` : "",
      isIslandRevealed(island) ? "" : "is-unexplored",
      island.completed ? "is-completed" : "",
      island.available ? "" : "is-locked",
      missions.length ? "has-mission" : ""
    ].filter(Boolean).join(" ");
    button.type = "button";
    button.setAttribute("aria-disabled", String(!island.available && !island.completed));
    button.classList.add("has-island-art");
    button.innerHTML = `
      <span class="archipelago-island-floor">${island.floor}</span>
      <img class="archipelago-island-icon" src="${assetUrl(isIslandRevealed(island) && island.icon ? island.icon : UNEXPLORED_ISLAND_ICON)}" alt="" />
      <strong>${getIslandDisplayName(island)}</strong>
      <span>${island.status}</span>
      ${missions.length ? `<span class="mission-island-badge">Missão</span>` : ""}
    `;
    button.addEventListener("click", () => openIslandDialog(island.floor));
    return button;
  }

  function renderMap(snapshot) {
    const islandsByFloor = byFloor(snapshot.islands);
    const map = document.createElement("section");
    map.className = "archipelago-map";
    map.setAttribute("aria-label", "Mapa do arquipélago");

    snapshot.islandRows.forEach((row) => {
      const rowElement = document.createElement("div");
      rowElement.className = `archipelago-row archipelago-row-${row.length}`;
      row.forEach((floor) => rowElement.appendChild(renderIslandButton(islandsByFloor.get(floor))));
      map.appendChild(rowElement);
    });

    const boat = document.createElement("button");
    boat.className = "archipelago-boat";
    boat.type = "button";
    boat.setAttribute("aria-label", "Descansar no barco");
    boat.innerHTML = `<img src="${assetUrl(snapshot.boatIcon)}" alt="" />`;
    boat.addEventListener("click", () => {
      onRestAtBoat();
      render();
    });
    map.appendChild(boat);

    return map;
  }

  function renderObjectiveList(island, snapshot) {
    const list = document.createElement("div");
    list.className = "archipelago-objectives";
    const missions = getMissionsForFloor(island.floor);
    const canRunMissions = missions.length && (island.visited || snapshot.activeExploration?.floor === island.floor);

    if (canRunMissions) {
      const missionActions = document.createElement("div");
      missionActions.className = "mission-context-panel";
      missionActions.innerHTML = `<strong>Missão disponível</strong><span>${missions.map((mission) => mission.title).join(", ")}</span>`;
      missions.forEach((mission) => {
        missionActions.appendChild(createButton({
          className: "archipelago-small-action mission-context-action",
          label: "Realizar missão",
          onClick: () => onOpenMission(mission.id)
        }));
      });
      list.appendChild(missionActions);
    }

    if (!island.visited && !island.completed) {
      const hidden = document.createElement("div");
      hidden.className = "archipelago-objective";
      hidden.innerHTML = `
        <div>
          <strong>Objetivos desconhecidos</strong>
          <span>${island.available ? "Exploração necessária" : "Ilha bloqueada"}</span>
        </div>
        <p>Os objetivos e o tema da ilha aparecem após iniciar a exploração.</p>
      `;
      list.appendChild(hidden);
      return list;
    }

    island.objectives.forEach((objective) => {
      const item = document.createElement("div");
      item.className = `archipelago-objective ${objective.resolved ? "is-resolved" : ""}`;
      const canResolve = snapshot.activeExploration?.floor === island.floor && !objective.resolved;

      item.innerHTML = `
        <div>
          <strong>${objective.title}</strong>
          <span>${objective.type} | ND ${objective.challenge}</span>
        </div>
        <p>${objective.description}</p>
      `;
      if (missions.length) {
        const indicator = document.createElement("div");
        indicator.className = "mission-inline-indicator";
        indicator.innerHTML = `<strong>Missão</strong><span>${missions.map((mission) => mission.title).join(", ")}</span>`;
        item.appendChild(indicator);
      }
      item.appendChild(createButton({
        className: "archipelago-small-action",
        disabled: !canResolve,
        label: objective.resolved ? "Resolvido" : "Resolver",
        onClick: () => {
          onResolveObjective(island.floor, objective.id);
          render();
        }
      }));
      list.appendChild(item);
    });

    return list;
  }

  function renderDialog(snapshot) {
    if (!islandDialog?.open || snapshot.islands.length === 0) return;

    const island = snapshot.islands.find((item) => item.floor === selectedFloor) || snapshot.islands[0];
    const activeObjectiveCount = island.objectives.filter((objective) => objective.resolved).length;
    const canExplore = island.available && !island.completed && !snapshot.daySpent;
    const canComplete = snapshot.activeExploration?.floor === island.floor
      && activeObjectiveCount === island.objectives.length;

    islandDialog.innerHTML = "";

    const panel = document.createElement("form");
    panel.className = "archipelago-detail";
    panel.method = "dialog";
    panel.innerHTML = `
      <div class="archipelago-detail-header">
        <p>${getDifficultyLabel(island.difficulty)} | ND base ${island.baseChallenge}</p>
        <h2>${island.floor} - ${getIslandDisplayName(island)}</h2>
        <span>${island.status}</span>
      </div>
      <p class="archipelago-detail-copy">${getIslandModalCopy(island)}</p>
    `;

    const closeButton = createIconButton({
      className: "icon-button archipelago-dialog-close",
      icon: "/assets/icons/close-modal.svg",
      label: "Fechar",
      onClick: () => islandDialog.close()
    });
    panel.querySelector(".archipelago-detail-header").appendChild(closeButton);

    const actions = document.createElement("div");
    actions.className = "archipelago-actions";
    actions.append(
      createButton({
        className: "archipelago-action",
        disabled: !canExplore,
        label: "Explorar ilha (8h)",
        onClick: (event) => {
          event.preventDefault();
          onExploreIsland(island.floor);
          render();
        }
      }),
      createButton({
        className: "archipelago-action",
        disabled: !canComplete,
        label: island.floor === 30 ? "Concluir boss" : "Concluir ilha",
        onClick: (event) => {
          event.preventDefault();
          onCompleteIsland(island.floor);
          render();
        }
      })
    );
    panel.appendChild(actions);
    panel.appendChild(renderObjectiveList(island, snapshot));
    islandDialog.appendChild(panel);
  }

  function renderSummary(snapshot) {
    const summary = document.createElement("section");
    summary.className = "archipelago-summary";
    const latestLog = snapshot.log[0] || "Arquipélago gerado.";
    summary.innerHTML = `
      <div>
        <span>Fragmentos</span>
        <strong>${snapshot.fragments}/9</strong>
      </div>
      <div>
        <span>Dia</span>
        <strong>${snapshot.daySpent ? "Gasto" : "Livre"}</strong>
      </div>
      <div class="archipelago-summary-log">
        <span>Registro</span>
        <strong>${latestLog}</strong>
      </div>
    `;
    return summary;
  }

  function render() {
    const snapshot = getSnapshot();
    if (!snapshot.islands.some((island) => island.floor === selectedFloor)) {
      selectedFloor = snapshot.islands[0]?.floor || 21;
    }

    container.innerHTML = "";
    container.className = "extended-exploration archipelago-exploration";

    if (snapshot.islands.length === 0) {
      const empty = document.createElement("section");
      empty.className = "archipelago-detail";
      empty.innerHTML = "<h2>Arquipélago ainda não gerado</h2>";
      container.append(renderSummary(snapshot), empty);
      return;
    }

    container.append(
      renderSummary(snapshot),
      renderMap(snapshot)
    );
    renderDialog(snapshot);
  }

  return { render };
}
