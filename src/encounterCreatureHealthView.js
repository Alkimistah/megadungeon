import {
  canAddEncounterCreature,
  getCreatureUnits,
  withCreatureAdded,
  withCreatureHealthChange,
  withLastHealthChangeUndone
} from "./encounterCreatureHealth.js";

const selectedUnitsByNode = new WeakMap();

function action(label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "extended-action is-compact";
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
}

export function createCreatureHealthControls(node, item, missions, onEncounterAdjusted) {
  const encounter = node.resolvedEncounter;
  const units = getCreatureUnits(item);
  const isFixedChimera = node.contentType === "boss" && item.creatureId === "quimera";
  const canAdd = !isFixedChimera && canAddEncounterCreature(item, missions);
  if (!units.length && !onEncounterAdjusted) return null;

  const panel = document.createElement("fieldset");
  panel.className = "creature-health";
  const legend = document.createElement("legend");
  legend.textContent = "PV individuais";
  panel.appendChild(legend);

  if (!onEncounterAdjusted) {
    const summary = document.createElement("p");
    summary.textContent = units.map(unit => `#${unit.index + 1}: ${unit.current}/${unit.max} PV`).join(" · ");
    panel.appendChild(summary);
    return panel;
  }

  function update(next) {
    if (next === encounter) return;
    node.resolvedEncounter = next;
    onEncounterAdjusted();
  }

  if (units.length) {
    const itemIndex = encounter.items.indexOf(item);
    if (!selectedUnitsByNode.has(node)) selectedUnitsByNode.set(node, new Map());
    const selections = selectedUnitsByNode.get(node);
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Criatura para registrar PV");
    for (const unit of units) {
      const option = document.createElement("option");
      option.value = String(unit.index);
      option.textContent = `${item.name} ${unit.index + 1} · ${unit.current}/${unit.max} PV`;
      select.appendChild(option);
    }
    select.value = String(selections.get(itemIndex) ?? 0);
    if (!select.value) select.value = "0";
    select.addEventListener("change", () => selections.set(itemIndex, Number(select.value)));
    const amount = document.createElement("input");
    amount.type = "number";
    amount.min = "1";
    amount.step = "1";
    amount.placeholder = "PV";
    amount.setAttribute("aria-label", "Quantidade de PV");
    const changeHealth = direction => {
      if (!Number.isSafeInteger(amount.valueAsNumber) || amount.valueAsNumber < 1) {
        amount.setCustomValidity("Informe uma quantidade inteira de PV maior que zero.");
        amount.reportValidity();
        return;
      }
      update(withCreatureHealthChange(encounter, item, Number(select.value), direction * amount.valueAsNumber));
    };
    amount.addEventListener("input", () => amount.setCustomValidity(""));
    amount.addEventListener("keydown", event => {
      if (event.key === "Enter") event.preventDefault();
    });
    panel.append(select, amount, action("Aplicar dano", () => changeHealth(1)), action("Curar", () => changeHealth(-1)));
  }
  const undo = action("Desfazer último lançamento", () => update(withLastHealthChangeUndone(encounter)));
  undo.disabled = !encounter.lastHealthEdit;
  const add = action("Adicionar criatura", () => {
    if (canAdd) update(withCreatureAdded(encounter, item, missions));
  });
  add.disabled = !canAdd;
  panel.append(undo, add);
  if (!canAdd) {
    const reason = document.createElement("p");
    reason.textContent = isFixedChimera
      ? "A Quimera é a única criatura deste encontro."
      : "A quantidade do alvo de extermínio permanece fixa para a missão.";
    panel.appendChild(reason);
  }
  return panel;
}
