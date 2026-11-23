import { canRerollDinosaurSector } from "./archipelagoPilot.js";
import { withIslandTacticalLayout } from "./archipelagoTacticalMap.js";
import { canRerollNodeCreatures } from "./encounterResolver.js";
import { canRerollBoatAmbush } from "./archipelagoBoatAmbush.js";
import { assetUrl } from "./assetUrl.js";
import { createEncounterCombatPage } from "./nodeDialog.js";
import { createNodeTacticalMap } from "./nodeTacticalMap.js";
import { createRng, randomInt } from "./random.js";
import { createRangeEndActions } from "./rangeEndActions.js";
import { openTacticalMapFullscreen } from "./tacticalMapRenderer.js";
import { formatComponents, formatItemLine } from "./treasure/treasureFormat.js";
import { summarizeGains } from "./treasure/treasureSummary.js";

const UNEXPLORED_ISLAND_ICON = "/assets/icons/islands/ilha-nao-explorada.webp";
const SECTOR_COLORS = ["#a7bb91", "#d2af82", "#8fb4cc", "#c5a0bd", "#a5a1cf", "#c6bf83", "#d79f92", "#86b7aa"];

function renderSectorTreasure({ challenge, gains }) {
  const section = document.createElement("section");
  section.className = "archipelago-encounter-briefing";
  const heading = document.createElement("h3");
  heading.textContent = `Tesouro recuperado · ND ${challenge}`;
  const list = document.createElement("ul");
  const { coins, wealth, items } = summarizeGains(gains);
  const lines = [
    ...Object.entries(coins).filter(([, amount]) => amount > 0)
      .map(([currency, amount]) => `${amount.toLocaleString("pt-BR")} ${currency}`),
    ...wealth.map(({ value, examples }) => `T$ ${value.toLocaleString("pt-BR")} em riquezas (${examples})`),
    ...items.map(item => [formatItemLine(item), ...formatComponents(item.components)].join(" · "))
  ];
  for (const line of lines) {
    const entry = document.createElement("li");
    entry.textContent = line;
    list.appendChild(entry);
  }
  section.append(heading, list);
  return section;
}

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

function getIslandDisplayName(island, unknownPaths) {
  if (isIslandRevealed(island, unknownPaths)) return island.name;
  if (island.floor === 30) return "Ilha 30";
  return `Ilha ${island.floor}`;
}

function isIslandRevealed(island, unknownPaths) {
  return !unknownPaths || island.visited || island.completed;
}

function getIslandModalCopy(island, unknownPaths) {
  if (isIslandRevealed(island, unknownPaths)) {
    return island.narrative || island.objectives[island.objectives.length - 1]?.description || "";
  }

  if (!island.available) return "Esta ilha ainda não está acessível.";

  return "A identidade desta ilha será revelada quando o grupo iniciar a exploração.";
}

function getMissionsForObjective(missions, objective) {
  return missions.filter((mission) => {
    const objectiveBindings = (mission.integration?.bindings || [])
      .filter((binding) => binding.kind === "objective");

    if (!objectiveBindings.length) return true;

    return objectiveBindings.some((binding) => binding.objectiveId === objective.id);
  });
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

function createIslandEncounter(scene, onEncounterAdjusted = () => {}, {
  readOnly = false, onReroll, canReroll = canRerollNodeCreatures
} = {}) {
  const sheet = document.createElement("section");
  if (!scene.resolvedEncounter) {
    sheet.textContent = "Nenhuma composição elegível para o ND da cena com os livros selecionados. Conduza o encontro manualmente.";
    return sheet;
  }

  function showSheet(selectedKey, rerolled = false) {
    const page = createEncounterCombatPage(scene, selectedKey, showSheet, [], null, {
      readOnly,
      onEncounterAdjusted: () => {
        onEncounterAdjusted();
        showSheet(selectedKey);
      }
    });
    sheet.replaceChildren(page);
    if (onReroll && canReroll(scene)) {
      const rerollControls = document.createElement("div");
      rerollControls.className = "archipelago-reroll-footer";
      const status = document.createElement("p");
      status.className = "node-dialog-meta";
      status.setAttribute("role", "status");
      const button = createButton({
        className: "extended-action is-compact",
        label: "Rerrolar criaturas",
        onClick: () => {
          if (onReroll()) showSheet(undefined, true);
          else status.textContent = "Nenhuma outra composição compatível foi encontrada.";
        }
      });
      rerollControls.append(button, status);
      page.querySelector(".encounter-list-panel").appendChild(rerollControls);
      if (rerolled) {
        status.textContent = "Criaturas atualizadas com o mesmo ND.";
        button.focus();
      }
    }
  }
  showSheet();
  return sheet;
}

function createIslandMapButton(scene, themeId, objective) {
  return createIconButton({
    className: "icon-button modal-tactical-map-toggle",
    icon: "/assets/icons/game-icons--treasure-map.svg",
    label: "Abrir mapa tático",
    onClick: () => openTacticalMapFullscreen(createNodeTacticalMap(withIslandTacticalLayout(scene, themeId, objective)))
  });
}

function createEncounterActions() {
  const actions = document.createElement("div");
  actions.className = "archipelago-result-actions";
  return actions;
}

function addResultAction(actions, label, onClick, tone = "is-primary") {
  actions.appendChild(createButton({
    className: `extended-action is-compact ${tone}`,
    label,
    onClick
  }));
}

export function createArchipelagoRenderer({
  container,
  getMissionsForFloor = () => [],
  getSnapshot,
  getMapSeed = () => "",
  getUnknownPaths = () => false,
  getRangeEnd = () => null,
  onCompleteIsland,
  onEncounterAdjusted,
  onExploreIsland,
  onFinishBoatAmbush,
  onRerollBoatAmbush,
  onLoseGuardian,
  onOpenSector,
  onRerollSector,
  onOpenMission = () => {},
  onResolveObjective,
  onRestAtBoat,
  onStartGuardian
}) {
  let selectedFloor = 21;
  let selectedSector = null;
  let islandDialog = null;
  let sectorDialog = null;
  let sectorDialogLocked = false;

  function ensureDialog() {
    if (islandDialog) return islandDialog;

    islandDialog = document.createElement("dialog");
    islandDialog.className = "archipelago-dialog";
    islandDialog.setAttribute("aria-label", "Exploração da ilha");
    islandDialog.addEventListener("click", (event) => {
      if (event.target === islandDialog) islandDialog.close();
    });
    document.body.appendChild(islandDialog);
    return islandDialog;
  }

  function openIslandDialog(floor) {
    selectedFloor = floor;
    selectedSector = getSnapshot().activeExploration?.floor === floor &&
      getSnapshot().activeExploration?.guardianScene ? "center" : null;
    const dialog = ensureDialog();
    if (!dialog.open) dialog.showModal();
    render();
  }

  function closeSectorDialog() {
    selectedSector = null;
    if (sectorDialog?.open) sectorDialog.close();
    render();
  }

  function showSectorDialog(title, detail, actions, scene, { themeId, objective, lockOpen = false } = {}) {
    sectorDialogLocked = lockOpen;
    if (!sectorDialog) {
      sectorDialog = document.createElement("dialog");
      sectorDialog.className = "archipelago-dialog archipelago-encounter-dialog";
      sectorDialog.setAttribute("aria-labelledby", "archipelagoEncounterTitle");
      sectorDialog.addEventListener("cancel", event => {
        event.preventDefault();
        if (!sectorDialogLocked) closeSectorDialog();
      });
      document.body.appendChild(sectorDialog);
    }
    const panel = document.createElement("section");
    panel.className = "archipelago-detail archipelago-encounter-layout";
    const header = document.createElement("header");
    header.className = "archipelago-detail-header";
    const heading = document.createElement("h2");
    heading.id = "archipelagoEncounterTitle";
    heading.textContent = title;
    header.appendChild(heading);
    if (!lockOpen) {
      header.appendChild(createIconButton({
        className: "icon-button archipelago-dialog-close", icon: "/assets/icons/close-modal.svg",
        label: "Voltar para a ilha", onClick: closeSectorDialog
      }));
    }
    const footer = document.createElement("footer");
    footer.className = "archipelago-encounter-footer";
    if (scene?.resolvedEncounter) {
      const center = document.createElement("div");
      center.className = "archipelago-map-control";
      center.appendChild(createIslandMapButton(scene, themeId, objective));
      footer.appendChild(center);
    }
    if (actions.childElementCount && !detail.contains(actions)) detail.appendChild(actions);
    detail.className = "archipelago-encounter-body";
    detail.classList.toggle("is-text-encounter", !scene?.resolvedEncounter);
    panel.append(header, detail, footer);
    sectorDialog.replaceChildren(panel);
    if (!sectorDialog.open) {
      sectorDialog.showModal();
      sectorDialog.scrollTop = 0;
    }
  }

  function renderIslandButton(island) {
    const unknownPaths = getUnknownPaths();
    const revealed = isIslandRevealed(island, unknownPaths);
    const hasMissions = revealed && getMissionsForFloor(island.floor).length > 0;
    const button = document.createElement("button");
    button.className = [
      "archipelago-island",
      `archipelago-island-${island.difficulty}`,
      revealed && island.themeId ? `archipelago-island-theme-${island.themeId}` : "",
      revealed ? "" : "is-unexplored",
      island.completed ? "is-completed" : "",
      island.available ? "" : "is-locked",
      hasMissions ? "has-mission" : ""
    ].filter(Boolean).join(" ");
    button.type = "button";
    button.setAttribute("aria-disabled", String(!revealed && !island.available));
    button.classList.add("has-island-art");
    button.innerHTML = `
      <span class="archipelago-island-floor">${island.floor}</span>
      <img class="archipelago-island-icon" src="${assetUrl(revealed && island.icon ? island.icon : UNEXPLORED_ISLAND_ICON)}" alt="" />
      <strong>${getIslandDisplayName(island, unknownPaths)}</strong>
      <span>${island.status}</span>
      ${hasMissions ? `<span class="mission-island-badge">Missão</span>` : ""}
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
    boat.disabled = Boolean(snapshot.activeExploration?.guardianScene || snapshot.boatAmbush);
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

    if (island.floor === 30 && !island.available) {
      const locked = document.createElement("p");
      locked.className = "archipelago-objective";
      locked.textContent = `Reúna os nove fragmentos para abrir a rota final (${snapshot.fragments}/9).`;
      list.appendChild(locked);
      return list;
    }

    if (!isIslandRevealed(island, getUnknownPaths())) {
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

    if (island.floor === 30 && island.objectives[0]?.type === "boss") {
      const { preview, scene } = island.guardian;
      if (preview || scene) {
        list.appendChild(createButton({
          className: "archipelago-small-action",
          label: scene ? "Retomar confronto com o Rei Tirano" : "Ver confronto com o Rei Tirano",
          onClick: () => { selectedSector = "center"; render(); }
        }));
        if (selectedSector === "center") {
          const detail = document.createElement("div");
          const actions = createEncounterActions();
          renderGuardian(detail, actions, island);
          showSectorDialog(`${island.arenaName} · Rei Tirano ND ${island.baseChallenge}`, detail, actions, scene ?? preview, { themeId: island.themeId });
        }
      }
      return list;
    }

    if (island.guardian) {
      list.appendChild(renderSectors(island, snapshot));
      return list;
    }

    island.objectives.forEach((objective) => {
      const objectiveMissions = getMissionsForObjective(missions, objective);
      const item = document.createElement("div");
      item.className = `archipelago-objective ${objective.resolved ? "is-resolved" : ""}`;
      const canResolve = snapshot.activeExploration?.floor === island.floor && objective.available !== false && !objective.resolved;
      const showChallenge = !island.pilot || objective.type === "combate";

      item.innerHTML = `
        <div>
          <strong>${objective.title}</strong>
          <span>${objective.type}${showChallenge ? ` | ND ${objective.challenge}` : ""}</span>
        </div>
        <p>${objective.description}</p>
      `;
      if (objectiveMissions.length) {
        const indicator = document.createElement("div");
        indicator.className = "mission-inline-indicator";
        indicator.innerHTML = `<strong>Missão</strong><span>${objectiveMissions.map((mission) => mission.title).join(", ")}</span>`;
        item.appendChild(indicator);
      }
      if (canResolve && objective.scene) {
        if (objective.scene.resolvedEncounter) item.appendChild(createIslandMapButton(objective.scene));
        item.appendChild(createIslandEncounter(objective.scene));
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

  function renderSectors(island, snapshot) {
    const active = snapshot.activeExploration?.floor === island.floor;
    const guardian = island.guardian;
    const canLandAtCenter = island.floor === 30 && !active && guardian.ready &&
      !snapshot.daySpent && !snapshot.boatAmbush && !island.completed && !island.defeated;
    const section = document.createElement("section");
    if (island.floor === 30 && !island.completed && !island.defeated) {
      const hint = document.createElement("p");
      hint.className = "archipelago-objective";
      hint.textContent = `Você pode desembarcar direto no ${island.arenaName} ou vencer os setores opcionais para remover as proteções do Rei Tirano nesta visita.`;
      section.appendChild(hint);
    }
    const reopened = active ? snapshot.activeExploration.reopenedSector : null;
    const reopenedObjective = reopened && island.objectives.find(item => item.id === reopened.id && !item.resolved);
    if (reopenedObjective) {
      const notice = document.createElement("div");
      notice.className = "archipelago-reopened-notice";
      notice.setAttribute("role", "status");
      const title = document.createElement("strong");
      title.textContent = `Setor ${reopened.name} reaberto`;
      const message = document.createElement("p");
      message.textContent = reopened.lostSuccess && reopenedObjective.guardianBuff
        ? "O setor recebeu um novo objetivo e o bônus do guardião voltou. Resolva o setor para liberar novamente a arena."
        : reopened.lostSuccess
        ? "O setor recebeu um novo objetivo. A penalidade que ele aplicava ao guardião foi removida. Resolva o setor para liberar novamente a arena."
        : "O setor recebeu um novo objetivo. Resolva-o para liberar novamente a arena.";
      notice.append(title, message);
      section.appendChild(notice);
    }
    const map = document.createElement("div");
    map.className = "archipelago-sector-map";
    if (island.objectives.length === 6) map.classList.add("has-six-sectors");
    if (island.objectives.length === 8) map.classList.add("has-eight-sectors");
    map.setAttribute("aria-label", "Setores da ilha");
    if (island.icon) {
      const art = document.createElement("img");
      art.className = "archipelago-sector-art";
      art.src = assetUrl(island.icon);
      art.alt = "";
      map.appendChild(art);
    }

    function addSectorButton(direction, id, label, disabled, color, outcome, status) {
      const button = createButton({
        className: "archipelago-small-action",
        disabled, label,
        onClick: () => {
          selectedSector = id;
          if (id === "center" && canLandAtCenter) {
            exploreSelectedIsland(island);
            return;
          }
          if (active && id !== "center") onOpenSector(island.floor, id);
          render();
        }
      });
      button.dataset.direction = direction;
      if (id === "center" && canLandAtCenter) button.setAttribute("aria-label", `Desembarcar no ${island.arenaName} (8h)`);
      button.style.setProperty("--sector-color", color);
      const caption = document.createElement("span");
      caption.className = "archipelago-sector-caption";
      caption.textContent = label;
      if (outcome) {
        button.dataset.outcome = outcome;
        const mark = document.createElement("span");
        mark.className = "archipelago-sector-mark";
        mark.setAttribute("aria-hidden", "true");
        mark.textContent = outcome === "success" ? "✓" : "×";
        caption.prepend(mark);
      }
      if (status) {
        const statusText = document.createElement("span");
        statusText.textContent = status;
        caption.appendChild(statusText);
      }
      button.replaceChildren(caption);
      button.setAttribute("aria-pressed", String(selectedSector === id));
      button.setAttribute("aria-haspopup", "dialog");
      map.appendChild(button);
    }

    const rng = createRng(`${getMapSeed()}:${island.floor}:${island.themeId}:cores-dos-setores`);
    const colors = [...SECTOR_COLORS];
    for (const objective of island.objectives) {
      const isReopened = reopenedObjective?.id === objective.id;
      const status = objective.outcome === "success" ? " · Sucesso" : objective.outcome === "failure" ? " · Falha" : isReopened ? " · Reaberto" : "";
      const [color] = colors.splice(randomInt(rng, 0, colors.length - 1), 1);
      addSectorButton(objective.direction, objective.id, objective.name + status, Boolean(guardian.scene), color, objective.outcome);
      if (isReopened) map.lastElementChild.classList.add("is-reopened");
    }
    const centerOutcome = island.completed ? "success" : island.defeated ? "failure" : null;
    const centerStatus = island.completed ? "Sucesso" : island.defeated ? "Falha"
      : canLandAtCenter ? "8h" : guardian.ready ? "" : "Bloqueado";
    addSectorButton("center", "center", island.arenaName, !(canLandAtCenter || active && guardian.ready),
      "#782a32", centerOutcome, centerStatus);
    section.appendChild(map);
    const detail = document.createElement("div");
    const actions = createEncounterActions();
    if (selectedSector === "center" && active && guardian.ready) {
      renderGuardian(detail, actions, island);
      const title = island.floor === 30 ? `${island.arenaName} · Rei Tirano ND ${island.baseChallenge}` : island.arenaName;
      showSectorDialog(title, detail, actions, guardian.scene ?? guardian.preview, { themeId: island.themeId });
    } else {
      const objective = island.objectives.find(item => item.id === selectedSector);
      if (!objective) return section;
      const briefing = document.createElement("section");
      briefing.className = "archipelago-encounter-briefing";
      const description = document.createElement("p");
      description.textContent = objective.description;
      const treasureEvent = objective.type === "tesouro";
      const kind = document.createElement("span");
      kind.textContent = objective.type === "combate"
        ? `Combate de ND ${objective.challenge}`
        : treasureEvent ? "Evento raro" : "Teste estendido";
      const reward = document.createElement("p");
      const xp = `${(objective.challenge * 1000).toLocaleString("pt-BR")} XP`;
      const rewardSummary = objective.type === "combate"
        ? `${xp}. Tesouro indicado nas fichas das criaturas.`
        : `${xp} e tesouro padrão de ND ${objective.challenge}.`;
      if (objective.guardianBuff && !treasureEvent) {
        const buff = document.createElement("p");
        buff.textContent = objective.outcome === "success"
          ? `Bônus do guardião removido: ${objective.guardianBuff}.`
          : `Bônus ativo do guardião: ${objective.guardianBuff}.`;
        briefing.appendChild(buff);
      }
      reward.textContent = treasureEvent
        ? `Tesouro de ND ${objective.challenge}. Efeito sobre o guardião: nenhum.`
        : `Vantagem em caso de sucesso: ${objective.effect}. ${objective.rewardEarned
          ? "Recompensa deste setor já concedida."
          : `Recompensa: ${rewardSummary}`}`;
      briefing.append(kind, description, reward);
      if (objective.guardsTreasure) {
        const guarded = document.createElement("p");
        guarded.textContent = `Os dinossauros guardam um tesouro de ND ${island.baseChallenge}. Vença o combate para recuperá-lo.`;
        briefing.appendChild(guarded);
      }
      detail.appendChild(briefing);
      if (objective.treasureReward) detail.appendChild(renderSectorTreasure(objective.treasureReward));
      if (!active && !objective.resolved) {
        const preview = document.createElement("p");
        preview.textContent = snapshot.daySpent
          ? "Prévia do setor. Descanse no barco antes de desembarcar nesta ilha."
          : "Prévia do setor. Desembarque para jogar e registrar o resultado.";
        briefing.appendChild(preview);
        if (island.available && !island.defeated && !snapshot.daySpent) {
          addResultAction(actions, "Desembarcar para jogar este setor", () => exploreSelectedIsland(island));
        }
      }
      if (objective.scene) {
        const onReroll = active && !objective.resolved && !guardian.scene
          ? () => onRerollSector(island.floor, objective.id)
          : undefined;
        const canReroll = island.floor === 30 ? canRerollDinosaurSector : canRerollNodeCreatures;
        detail.appendChild(createIslandEncounter(objective.scene, onEncounterAdjusted, {
          readOnly: objective.resolved, onReroll, canReroll
        }));
      }
      if (active && !objective.resolved) {
        const resultActions = treasureEvent
          ? [["failure", "Deixar o tesouro", "is-danger"], ["success", "Recuperar tesouro", "is-primary"]]
          : [["failure", "Desistir do encontro", "is-danger"], ["success", "Conquistar encontro", "is-primary"]];
        for (const [outcome, label, tone] of resultActions) {
          addResultAction(actions, label, () => {
            onResolveObjective(island.floor, objective.id, outcome);
            if (!(treasureEvent || objective.guardsTreasure) || outcome !== "success") closeSectorDialog();
          }, tone);
        }
      }
      showSectorDialog(`${objective.name} · ${objective.title}`, detail, actions, objective.scene, { themeId: island.themeId, objective });
    }
    return section;
  }

  function exploreSelectedIsland(island) {
    const objective = island.objectives.find(item => item.id === selectedSector);
    onExploreIsland(island.floor);
    if (island.guardian && objective) onOpenSector(island.floor, objective.id);
    render();
  }

  function renderGuardian(detail, actions, island) {
    const { guardian } = island;
    const scene = guardian.scene ?? guardian.preview;
    if (scene?.briefing) {
      const introduction = document.createElement("p");
      introduction.className = "archipelago-encounter-briefing";
      introduction.textContent = scene.briefing;
      detail.appendChild(introduction);
    }
    if (island.floor !== 30 || guardian.effects.length || guardian.buffs.length) {
      renderGuardianEffects(detail, island, scene);
    }
    if (guardian.scene) {
      detail.appendChild(createIslandEncounter(guardian.scene, onEncounterAdjusted));
      for (const [label, action, tone] of [["Registrar derrota", onLoseGuardian, "is-danger"], ["Registrar vitória", onCompleteIsland, "is-primary"]]) {
        addResultAction(actions, label, () => { closeSectorDialog(); action(island.floor); render(); }, tone);
      }
      return;
    }
    const finalBoss = island.floor === 30;
    const warning = document.createElement("p");
    warning.textContent = finalBoss
      ? "Para lançar dano ou cura, inicie o confronto final. Depois de começar, a expedição só pode registrar vitória ou derrota."
      : "Depois de iniciar o combate, a expedição só pode registrar vitória ou derrota.";
    detail.appendChild(warning);
    const startLabel = finalBoss ? "Iniciar confronto final" : "Iniciar combate";
    addResultAction(actions, startLabel, () => { onStartGuardian(island.floor); render(); });
    if (finalBoss) detail.appendChild(actions);
    if (guardian.preview) detail.appendChild(createIslandEncounter(guardian.preview, undefined, { readOnly: true }));
  }

  function renderGuardianEffects(detail, island, scene) {
    const { guardian } = island;
    const effects = document.createElement("p");
    const leader = scene?.resolvedEncounter.items[0]?.name;
    const effectLabel = island.objectives.some(item => item.guardianBuff) ? "Efeitos dos sucessos" : "Penalidades";
    effects.textContent = guardian.effects.length
      ? `${effectLabel} ${leader ? `na ficha de ${leader}` : "na ficha do guardião principal"}: ${guardian.effects.join(" · ")}. Aliados mantêm seus valores.`
      : "Guardião em força plena.";
    effects.className = "archipelago-encounter-briefing";
    detail.appendChild(effects);
    if (guardian.buffs.length) {
      const buffs = document.createElement("p");
      buffs.className = "archipelago-encounter-briefing";
      buffs.textContent = `Bônus ativos do guardião: ${guardian.buffs.join(" · ")}.`;
      detail.appendChild(buffs);
    }
  }

  function renderDialog(snapshot) {
    if (!islandDialog?.open || snapshot.islands.length === 0) return;

    const island = snapshot.islands.find((item) => item.floor === selectedFloor) || snapshot.islands[0];
    const unknownPaths = getUnknownPaths();
    const activeObjectiveCount = island.objectives.filter((objective) => objective.resolved).length;
    const canExplore = island.available && !island.completed && !island.defeated && !snapshot.daySpent;
    const canComplete = snapshot.activeExploration?.floor === island.floor
      && activeObjectiveCount === island.objectives.length;

    islandDialog.innerHTML = "";

    const panel = document.createElement("form");
    panel.className = "archipelago-detail archipelago-island-layout";
    panel.method = "dialog";
    const revealed = isIslandRevealed(island, unknownPaths);
    panel.innerHTML = `
      <header class="archipelago-detail-header">
        ${revealed ? `<p>${getDifficultyLabel(island.difficulty)} | ND base ${island.baseChallenge}</p>` : ""}
        <h2>${island.floor} - ${getIslandDisplayName(island, unknownPaths)}</h2>
        <span>${island.status}</span>
      </header>
      <div class="archipelago-island-body">
        <p class="archipelago-detail-copy">${getIslandModalCopy(island, unknownPaths)}</p>
      </div>
    `;

    const closeButton = createIconButton({
      className: "icon-button archipelago-dialog-close",
      icon: "/assets/icons/close-modal.svg",
      label: "Voltar ao arquipélago",
      onClick: () => islandDialog.close()
    });
    panel.querySelector(".archipelago-detail-header").appendChild(closeButton);

    const actions = document.createElement("div");
    actions.className = "archipelago-actions";
    if (!island.guardian) {
      actions.appendChild(createButton({
        className: "archipelago-action",
        disabled: !canComplete,
        label: "Concluir ilha",
        onClick: (event) => {
          event.preventDefault();
          onCompleteIsland(island.floor);
          render();
        }
      }));
    }
    const body = panel.querySelector(".archipelago-island-body");
    if (island.completed && island.reward) {
      const reward = document.createElement("p");
      reward.textContent = island.reward;
      body.appendChild(reward);
    }
    if (island.floor === 30 && island.completed) {
      const rangeEnd = getRangeEnd();
      if (rangeEnd) body.appendChild(createRangeEndActions(rangeEnd));
    }
    body.appendChild(renderObjectiveList(island, snapshot));
    if (!island.completed && !island.defeated && snapshot.activeExploration?.floor !== island.floor) {
      const embark = document.createElement("div");
      embark.className = "archipelago-island-embark";
      embark.appendChild(createButton({
        className: "archipelago-action",
        disabled: !canExplore,
        label: "Explorar ilha (8h)",
        onClick: () => exploreSelectedIsland(island)
      }));
      body.appendChild(embark);
    }
    const footer = document.createElement("footer");
    footer.className = "archipelago-island-footer";
    if (island.guardian && revealed) {
      const progress = document.createElement("span");
      progress.textContent = island.floor === 30 && island.objectives[0]?.type === "combate"
        ? `${activeObjectiveCount} de ${island.objectives.length} setores opcionais resolvidos`
        : `${activeObjectiveCount} de ${island.objectives.length} setores resolvidos`;
      footer.appendChild(progress);
    }
    if (actions.childElementCount) footer.appendChild(actions);
    panel.appendChild(footer);
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
        <strong>${snapshot.boatAmbush ? "Descanso interrompido" : snapshot.daySpent ? "Gasto" : "Livre"}</strong>
      </div>
      <div class="archipelago-summary-log">
        <span>Registro</span>
        <strong>${latestLog}</strong>
      </div>
    `;
    return summary;
  }

  function renderBoatAmbush(scene) {
    if (islandDialog?.open) islandDialog.close();
    selectedSector = null;
    const detail = document.createElement("div");
    const briefing = document.createElement("p");
    briefing.className = "archipelago-encounter-briefing";
    briefing.textContent = scene.briefing;
    detail.append(briefing, createIslandEncounter(scene, onEncounterAdjusted, {
      canReroll: canRerollBoatAmbush,
      onReroll: () => {
        if (!onRerollBoatAmbush()) return false;
        briefing.textContent = scene.briefing;
        return true;
      }
    }));
    const actions = createEncounterActions();
    addResultAction(actions, "Concluir emboscada e descansar", onFinishBoatAmbush);
    showSectorDialog("Emboscada no barco", detail, actions, scene, { lockOpen: true });
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
    const bossIsland = snapshot.islands.find((island) => island.floor === 30);
    const rangeEnd = bossIsland?.completed ? getRangeEnd() : null;
    if (rangeEnd) {
      const section = document.createElement("section");
      section.className = "archipelago-detail range-end-block";
      section.innerHTML = "<h2>Arquipélago concluído</h2>";
      section.appendChild(createRangeEndActions(rangeEnd));
      container.appendChild(section);
    }
    if (snapshot.boatAmbush) {
      renderBoatAmbush(snapshot.boatAmbush);
      return;
    }
    if (sectorDialogLocked) {
      sectorDialogLocked = false;
      sectorDialog.close();
    }
    renderDialog(snapshot);
  }

  return { render };
}
