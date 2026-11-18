import {
  CHIMERA_DAMAGE_REDUCTION, getChimeraHeadAbility, withChimeraBreath, withChimeraDamage,
  withChimeraHealthUndone, withChimeraTurnEnded
} from "./chimeraCombat.js";
import { damageTypeCatalog, getDamageType } from "./damageTypes.js";
import { getCreatureUnits, withCreatureHealthChange } from "./encounterCreatureHealth.js";
import { getCreatureReinforcement } from "./creatureReinforcement.js";

function button(label, handler, disabled = false) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "extended-action is-compact";
  element.textContent = label;
  element.disabled = disabled;
  element.addEventListener("click", handler);
  return element;
}

function numberInput(label, min, placeholder) {
  const input = document.createElement("input");
  input.type = "number";
  input.min = String(min);
  input.step = "1";
  input.placeholder = placeholder;
  input.setAttribute("aria-label", label);
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") event.preventDefault();
  });
  input.addEventListener("input", () => input.setCustomValidity(""));
  return input;
}

function readAmount(input) {
  const amount = input.valueAsNumber;
  if (Number.isSafeInteger(amount) && amount >= Number(input.min) && amount <= Number(input.max || Number.MAX_SAFE_INTEGER)) {
    return amount;
  }
  input.setCustomValidity("Informe um número inteiro de PV dentro do limite indicado.");
  input.reportValidity();
  return null;
}

function select(label, options) {
  const element = document.createElement("select");
  element.setAttribute("aria-label", label);
  for (const [value, text] of options) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    element.appendChild(option);
  }
  return element;
}

function paragraph(text) {
  const element = document.createElement("p");
  element.textContent = text;
  return element;
}

export function createChimeraCombatControls(node, item, onEncounterAdjusted, onSetReinforcement) {
  const encounter = node.resolvedEncounter;
  const heads = node.chimeraHeads;
  const [unit] = getCreatureUnits(item);
  const panel = document.createElement("div");
  panel.className = "chimera-combat";
  const health = document.createElement("fieldset");
  health.className = "creature-health";
  const legend = document.createElement("legend");
  legend.textContent = "PV compartilhados";
  const summary = paragraph(`${unit.current}/${unit.max} PV · RD ${CHIMERA_DAMAGE_REDUCTION}`);
  summary.className = "chimera-health-summary";
  health.append(legend, summary);

  const hit = encounter.lastChimeraHit;
  if (hit) health.appendChild(paragraph(
    `${hit.target} · ${hit.amount} de ${hit.type.toLowerCase()} − ${hit.reduction} de RD → ${hit.lost} PV perdidos`
  ));

  function update(next) {
    if (next === encounter) return;
    node.resolvedEncounter = next;
    onEncounterAdjusted();
  }

  if (onEncounterAdjusted) {
    const target = select("Alvo do dano", [["body", "Corpo"], ...heads.map((head, index) => [String(index), `${index + 1}. ${head.name}`])]);
    const type = select("Tipo de dano", damageTypeCatalog.map(damage => [damage.id, damage.label]));
    const amount = numberInput("Quantidade de PV", 1, "PV");
    health.append(target, type, amount,
      button("Aplicar dano", () => {
        const value = readAmount(amount);
        if (value !== null) update(withChimeraDamage(encounter, item, heads[target.value], type.value, value));
      }, unit.current === 0),
      button("Curar", () => {
        const value = readAmount(amount);
        if (value === null) return;
        const next = withCreatureHealthChange(encounter, item, 0, -value);
        if (next === encounter) return;
        const { lastChimeraHit, ...healed } = next;
        update(healed);
      }, unit.current === unit.max),
      button("Desfazer último lançamento", () => update(withChimeraHealthUndone(encounter)), !encounter.lastHealthEdit)
    );
  }

  if (onSetReinforcement) {
    const extra = numberInput("PV extras da Quimera", 0, "PV extras");
    const reinforced = getCreatureReinforcement(item, unit.max).hitPoints;
    extra.max = String(Number.MAX_SAFE_INTEGER - (unit.max - reinforced));
    extra.value = String(reinforced);
    health.append(extra, button("Aplicar PV extras", () => {
      const value = readAmount(extra);
      if (value !== null) onSetReinforcement("hitPoints", value);
    }));
  }

  const heading = document.createElement("h4");
  heading.textContent = "Cabeças da Quimera";
  const list = document.createElement("ol");
  list.className = "chimera-heads";
  for (const [index, head] of heads.entries()) {
    const entry = document.createElement("li");
    const title = document.createElement("h5");
    title.textContent = `${index + 1}. ${head.name}`;
    const status = encounter.chimera?.stuns?.[head.name];
    const state = status === "stunned" ? "Atordoada" : status === "used" ? "Ativa · atordoamento já usado" : "Ativa";
    entry.append(title, paragraph(`Fraqueza: ${getDamageType(head.weakness).label} · ${state}`),
      paragraph(getChimeraHeadAbility(head.name).text));
    if (head.name === "Dragão") {
      const ready = encounter.chimera?.breathReady !== false;
      entry.appendChild(paragraph(ready ? "Sopro disponível" : "Sopro em recarga"));
      if (onEncounterAdjusted) {
        entry.append(
          button("Usar sopro", () => update(withChimeraBreath(encounter, heads, false)), !ready || status === "stunned"),
          button("Recarregar sopro", () => update(withChimeraBreath(encounter, heads, true)), ready)
        );
      }
    }
    list.appendChild(entry);
  }
  panel.append(health, heading, paragraph("Role 1d4 para escolher a cabeça que conduz a ação. Se a habilidade estiver indisponível, use os ataques normais. Habilidades passivas valem enquanto a cabeça estiver ativa."), list);
  if (onEncounterAdjusted) panel.appendChild(button("Fim do turno da Quimera", () => update(withChimeraTurnEnded(encounter))));
  return panel;
}
