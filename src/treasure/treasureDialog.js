// Casca da modal de tesouros e abas Rolar e Consultar.
import { CHALLENGE_RATINGS, challengeRatingLabel, startTreasure, startTable, nextStep, applyRoll } from "./treasureEngine.js";
import { rollDice, dieRange } from "./dice.js";
import { buildBatch, rollBatch, listSpecificTables, MAX_QUANTITY, MODE_LABELS } from "./treasureBatch.js";
import { describeStep, stepDepth, formatAmount, formatPrice, tableLabel } from "./treasureFormat.js";
import { summarizeGains } from "./treasureSummary.js";
import { createRng, createRandomSeed } from "../random.js";

export { buildBatch };

const wired = new WeakSet();
const COLUMN_LABELS = { both: "Item + Riqueza", items: "Só Item", money: "Só Riqueza" };

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function selectTab(dialog, tabId) {
  for (const tab of dialog.querySelectorAll("[role=tab]")) {
    const selected = tab.id === tabId;
    tab.setAttribute("aria-selected", String(selected));
    const panel = dialog.querySelector(`#${tab.getAttribute("aria-controls")}`);
    if (panel) panel.hidden = !selected;
  }
}

// ---------- Rodapé ----------

// `strip` (opcional) recebe a linha compacta de totais, que a aba mantém fixa no fim da modal.
export function renderSummary(container, gains, strip) {
  const summary = summarizeGains(gains);
  container.replaceChildren();
  container.dataset.totalTibars = String(summary.totalTibars);
  const coins = Object.entries(summary.coins).filter(([, n]) => n > 0).map(([c, n]) => `${formatAmount(n)} ${c}`);
  const money = el("p", "treasure-summary-line");
  money.append(el("strong", "", "Dinheiro: "), coins.length ? coins.join(" · ") : "nenhum");
  const total = el("p", "treasure-summary-line treasure-total");
  total.append(el("strong", "", "Total: "), el("span", "treasure-total-value", `${formatAmount(summary.totalTibars)} T$`));
  const moneyBlock = el("div", "treasure-summary-block");
  moneyBlock.append(money, total);
  strip?.replaceChildren();
  strip?.append(el("strong", "", "Dinheiro: "), `${coins.length ? coins.join(" · ") : "nenhum"} · `,
    el("strong", "treasure-total-value", `Total: ${formatAmount(summary.totalTibars)} T$`),
    ` · ${summary.wealth.length} ${summary.wealth.length === 1 ? "riqueza" : "riquezas"}`,
    ` · ${summary.items.reduce((n, i) => n + i.quantity, 0)} itens`);

  const wealth = el("div", "treasure-summary-block");
  wealth.append(el("strong", "", "Riquezas"));
  if (!summary.wealth.length) wealth.append(el("p", "treasure-muted", "nenhuma"));
  else {
    const list = el("ul");
    for (const w of summary.wealth) list.append(el("li", "", `T$ ${formatAmount(w.value)} — ${w.examples}`));
    wealth.append(list);
  }
  const items = el("div", "treasure-summary-block");
  items.append(el("strong", "", "Itens"));
  if (!summary.items.length) items.append(el("p", "treasure-muted", "nenhum"));
  else {
    const list = el("ul");
    for (const it of summary.items) {
      const price = it.price !== undefined ? ` — ${formatPrice(it.price)}` : "";
      list.append(el("li", "", `${it.quantity}× ${it.name}${price}`));
    }
    items.append(list);
  }
  container.append(moneyBlock, wealth, items);
}

// ---------- Resultados ----------

function renderChain(state) {
  const list = el("ol", "treasure-cascade");
  for (const step of state.steps) {
    const { roll, result } = describeStep(step);
    const li = el("li", "treasure-step");
    li.style.marginLeft = `${stepDepth(step) * 14}px`;
    const table = el("span", "treasure-step-table", tableLabel(step.tableId));
    table.title = step.tableId;
    li.append(table, " ", el("span", "treasure-step-roll", roll),
      " → ", el("span", "treasure-step-result", result));
    list.append(li);
  }
  return list;
}

function treasureTibars(treasure) {
  return summarizeGains(treasure.states.flatMap((s) => s.gains)).totalTibars;
}

function renderResults(container, batch) {
  container.replaceChildren();
  for (const group of batch) {
    const section = el("section", "treasure-group");
    section.append(el("h3", "", `${group.label} × ${group.treasures.length}`));
    const list = el("ol", "treasure-list");
    for (const treasure of group.treasures) {
      const li = el("li", "treasure-result");
      li.value = treasure.index;
      li.dataset.tibars = String(treasureTibars(treasure));
      li.append(el("span", "treasure-index", `${treasure.index}.`));
      const cells = el("div", "treasure-cells");
      for (const state of treasure.states) cells.append(renderChain(state));
      li.append(cells);
      list.append(li);
    }
    section.append(list);
    container.append(section);
  }
}

// ---------- Linhas de entrada ----------

function option(value, label) {
  const o = el("option", "", label);
  o.value = value;
  return o;
}

function field(label, control, className) {
  const wrap = el("label", className ?? "");
  wrap.append(label, control);
  return wrap;
}

function createRow(onRemove) {
  const row = el("div", "treasure-input-row");
  const type = el("select", "treasure-f-kind");
  type.append(option("nd", "Por ND"), option("table", "Tabela específica"));
  const nd = el("select", "treasure-f-nd");
  for (const v of CHALLENGE_RATINGS) nd.append(option(v, challengeRatingLabel(v)));
  nd.value = "1";
  const qty = el("input", "treasure-f-qty");
  Object.assign(qty, { type: "number", min: 1, max: MAX_QUANTITY, value: 1 });
  const mode = el("select", "treasure-f-mode");
  for (const [v, l] of Object.entries(MODE_LABELS)) mode.append(option(v, l));
  const columns = el("select", "treasure-f-columns");
  for (const [v, l] of Object.entries(COLUMN_LABELS)) columns.append(option(v, l));
  const table = el("select", "treasure-f-table");
  for (const t of listSpecificTables()) table.append(option(t.id, t.title));
  const remove = el("button", "icon-button treasure-remove", "✕");
  Object.assign(remove, { type: "button" });
  remove.setAttribute("aria-label", "Remover rolagem");
  remove.addEventListener("click", () => onRemove(row));

  const sync = () => {
    const byTable = type.value === "table";
    nd.parentElement.hidden = mode.parentElement.hidden = columns.parentElement.hidden = byTable;
    table.parentElement.hidden = !byTable;
    // Metade não vale para a coluna Itens.
    const itemsOnly = columns.value === "items";
    mode.querySelector('option[value="metade"]').disabled = itemsOnly;
    if (itemsOnly && mode.value === "metade") mode.value = "padrão";
  };
  type.addEventListener("change", sync);
  columns.addEventListener("change", sync);
  row.append(field("Origem", type), field("ND", nd), field("Tabela", table, "treasure-table-field"),
    field("Quantidade", qty), field("Tipo", mode), field("Colunas", columns), remove);
  sync();
  row.readValue = () => {
    const quantity = Number(qty.value);
    return type.value === "table"
      ? { tableId: table.value, quantity }
      : { challengeRating: nd.value, quantity, mode: mode.value, columns: columns.value };
  };
  return row;
}

function setupRollTab(panel) {
  panel.replaceChildren();
  const rowsBox = el("div", "treasure-rows");
  const add = el("button", "treasure-add", "+ Adicionar rolagem");
  const roll = el("button", "generate-button treasure-roll", "Rolar tudo");
  add.type = roll.type = "button";
  const error = el("p", "treasure-error");
  error.setAttribute("role", "alert");
  const results = el("div", "treasure-results");
  const footer = el("div", "treasure-footer");
  footer.id = "treasureFooter";
  footer.hidden = true;
  const strip = el("p", "treasure-strip");
  strip.id = "treasureStrip";
  strip.hidden = true;

  const addRow = () => rowsBox.append(createRow((row) => {
    if (rowsBox.children.length > 1) row.remove();
  }));
  add.addEventListener("click", addRow);
  roll.addEventListener("click", () => {
    error.textContent = "";
    try {
      const batch = rollBatch([...rowsBox.children].map((r) => r.readValue()), createRng(createRandomSeed()));
      renderResults(results, batch);
      renderSummary(footer, batch.flatMap((g) => g.treasures.flatMap((t) => t.states.flatMap((s) => s.gains))), strip);
      footer.hidden = strip.hidden = false;
    } catch (e) {
      error.textContent = e.message;
    }
  });
  const actions = el("div", "treasure-actions");
  actions.append(add, roll);
  panel.append(rowsBox, actions, error, results, footer, strip);
  addRow();
}

// ---------- Aba Consultar ----------

// Vagas de melhoria/encanto ainda na fila de um item.
function openSlots(state, itemId) {
  return state.pending.filter((r) => r.context?.itemId === itemId && r.context.role === "slot").length;
}

function startConsult({ source, nd, column, mode }) {
  if (source === "nd") return startTreasure({ challengeRating: nd, column, mode: column === "items" ? "padrão" : mode })[0];
  return startTable(source);
}

function renderHistory(state, notes) {
  const list = el("ol", "treasure-cascade treasure-consult-history");
  for (const step of state.steps) {
    const { roll, result } = describeStep(step);
    const li = el("li", "treasure-step");
    li.style.marginLeft = `${stepDepth(step) * 14}px`;
    const table = el("span", "treasure-step-table", tableLabel(step.tableId));
    table.title = step.tableId;
    li.append(table, " ", el("span", "treasure-step-roll", roll), " → ", el("span", "treasure-step-result", result));
    if (notes.has(step.id)) li.append(" ", el("em", "treasure-note", `(${notes.get(step.id)})`));
    list.append(li);
  }
  return list;
}

function setupConsultTab(panel) {
  panel.replaceChildren();
  let state = null;
  let notes = new Map();
  const setup = el("div", "treasure-consult-setup");
  const source = el("select", "treasure-c-source");
  source.append(option("nd", "Tabela 8-1 por ND"));
  for (const t of listSpecificTables()) source.append(option(t.id, t.title));
  const nd = el("select", "treasure-c-nd");
  for (const v of CHALLENGE_RATINGS) nd.append(option(v, challengeRatingLabel(v)));
  nd.value = "1";
  const column = el("select", "treasure-c-column");
  column.append(option("money", "Dinheiro"), option("items", "Itens"));
  const mode = el("select", "treasure-c-mode");
  mode.append(option("padrão", "Padrão"), option("metade", "Metade"));
  const begin = el("button", "generate-button treasure-c-start", "Começar consulta");
  begin.type = "button";
  const sync = () => {
    const byNd = source.value === "nd";
    nd.parentElement.hidden = column.parentElement.hidden = !byNd;
    mode.parentElement.hidden = !byNd || column.value === "items";
  };
  source.addEventListener("change", sync);
  column.addEventListener("change", sync);
  setup.append(field("Tabela inicial", source, "treasure-table-field"), field("ND", nd),
    field("Coluna", column), field("Tipo", mode), begin);

  const history = el("div", "treasure-consult-trail");
  const prompt = el("form", "treasure-consult-prompt");
  prompt.noValidate = true;
  const result = el("div", "treasure-footer treasure-consult-result");
  result.hidden = true;
  const restart = el("button", "treasure-c-reset", "Nova consulta");
  restart.type = "button";
  restart.hidden = true;

  const render = () => {
    setup.hidden = state !== null;
    restart.hidden = state === null;
    history.replaceChildren();
    prompt.replaceChildren();
    prompt.hidden = true;
    result.hidden = true;
    if (!state) return;
    history.append(renderHistory(state, notes));
    const request = nextStep(state);
    if (!request) {
      renderSummary(result, state.gains);
      result.hidden = false;
      const done = el("p", "treasure-consult-done", "Cadeia concluída.");
      const outcomes = state.steps.map((s) => describeStep(s).result).filter(Boolean);
      if (!state.gains.length) done.textContent = `Cadeia concluída. Resultado: ${outcomes.join("; ") || "nada"}.`;
      history.append(done);
      return;
    }
    const [min, max] = dieRange(request.die);
    const input = el("input", "treasure-c-value");
    Object.assign(input, { type: "text", inputMode: "numeric", autocomplete: "off" });
    input.setAttribute("aria-label", `Valor do ${request.die}`);
    const submit = el("button", "generate-button treasure-c-apply", "Aplicar");
    submit.type = "submit";
    const error = el("p", "treasure-consult-error treasure-c-error");
    error.setAttribute("role", "alert");
    input.addEventListener("input", () => { error.textContent = ""; });
    const head = el("p", "treasure-consult-step");
    head.append(el("strong", "", `${tableLabel(request.tableId)} · ${request.die}`));
    const bonus = request.bonus ? ` (+${request.bonus}% será somado)` : "";
    const why = el("p", "treasure-consult-reason", `${request.reason}${bonus}`);
    const controls = el("div", "treasure-actions");
    controls.append(field(`Valor (${min} a ${max})`, input), submit);
    if (request.kind !== "table") {
      const roll = el("button", "treasure-c-roll", "Rolar");
      roll.type = "button";
      roll.addEventListener("click", () => {
        input.value = String(rollDice(request.die, createRng(createRandomSeed())).total);
        error.textContent = "";
      });
      controls.append(roll);
    }
    prompt.append(head, why);
    if (request.kind === "twoDice") {
      prompt.append(el("p", "treasure-consult-warning", "Linha 2D: role dois dados, escolha um deles e digite o dado escolhido."));
    }
    prompt.append(controls, error);
    prompt.hidden = false;
    prompt.onsubmit = (event) => {
      event.preventDefault();
      const text = input.value.trim();
      const value = /^-?\d+$/.test(text) ? Number(text) : NaN;
      try {
        const next = applyRoll(state, value);
        const step = next.steps[next.steps.length - 1];
        const owner = step.outcome?.itemId;
        if (step.outcome?.accepted && owner && openSlots(state, owner) - 1 > openSlots(next, owner)) {
          notes.set(step.id, "ocupa as vagas restantes");
        }
        state = next;
        render();
      } catch (e) {
        error.textContent = e instanceof RangeError ? e.message : `Erro: ${e.message}`;
        input.focus();
      }
    };
    input.focus();
  };
  begin.addEventListener("click", () => {
    state = startConsult({ source: source.value, nd: nd.value, column: column.value, mode: mode.value });
    notes = new Map();
    render();
  });
  restart.addEventListener("click", () => {
    state = null;
    notes = new Map();
    render();
  });
  panel.append(setup, history, prompt, result, restart);
  sync();
  render();
}

export function openTreasureDialog(dialog) {
  if (!wired.has(dialog)) {
    wired.add(dialog);
    for (const tab of dialog.querySelectorAll("[role=tab]")) {
      tab.addEventListener("click", () => selectTab(dialog, tab.id));
    }
    dialog.querySelector("#treasureClose")?.addEventListener("click", () => dialog.close());
    setupRollTab(dialog.querySelector("#treasurePanelRoll"));
    setupConsultTab(dialog.querySelector("#treasurePanelLookup"));
  }
  if (!dialog.open) dialog.showModal();
}
