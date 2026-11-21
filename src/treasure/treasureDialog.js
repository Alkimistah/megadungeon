// Casca da modal de tesouros e abas Gerar tesouros e Rolar na mesa.
import { CHALLENGE_RATINGS, challengeRatingLabel, startTreasure, startTable, nextStep, applyRoll } from "./treasureEngine.js";
import { rollDice, dieRange } from "./dice.js";
import { buildBatch, rollBatch, listSpecificTables, isValidQuantity, MAX_QUANTITY, MODE_LABELS, COLUMN_LABELS } from "./treasureBatch.js";
import { TYPE_ROLLS } from "./tables/basicBook.js";
import { ALL_TABLES } from "./tables/index.js";
import { describeStep, describeRowResult, formatRange, stepDepth, formatAmount, formatItemLine, formatComponents, formatBookDraw, stepReference, parseTypedValue, tableLabel, describeBookRowResult } from "./treasureFormat.js";
import { summarizeGains } from "./treasureSummary.js";
import { createRng, createRandomSeed } from "../random.js";

export { buildBatch };

const wired = new WeakSet();

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
    tab.tabIndex = selected ? 0 : -1;
    const panel = dialog.querySelector(`#${tab.getAttribute("aria-controls")}`);
    if (panel) panel.hidden = !selected;
  }
}

// ---------- Rodapé ----------

export function renderSummary(container, gains) {
  const summary = summarizeGains(gains);
  container.replaceChildren();
  container.dataset.totalTibars = String(summary.totalTibars);
  container.dataset.wealthTotal = String(summary.wealthTotal);
  container.dataset.grandTotal = String(summary.grandTotal);
  const coins = Object.entries(summary.coins).filter(([, n]) => n > 0).map(([c, n]) => `${formatAmount(n)} ${c}`);
  const money = el("p", "treasure-summary-line");
  money.append(el("strong", "", "Dinheiro: "), coins.length ? coins.join(" · ") : "nenhum");
  const total = el("p", "treasure-summary-line treasure-total");
  total.append(el("strong", "", "Total em dinheiro: "), el("span", "treasure-total-value", `T$ ${formatAmount(summary.totalTibars)}`));
  const moneyBlock = el("div", "treasure-summary-block");
  moneyBlock.append(money, total);

  const wealth = el("div", "treasure-summary-block");
  wealth.append(el("strong", "", "Riquezas"));
  if (!summary.wealth.length) wealth.append(el("p", "treasure-muted", "nenhuma"));
  else {
    const list = el("ul");
    for (const w of summary.wealth) list.append(el("li", "", `T$ ${formatAmount(w.value)} — ${w.examples}`));
    wealth.append(list);
  }
  const wealthTotal = el("p", "treasure-summary-line treasure-wealth-total");
  wealthTotal.append(el("strong", "", "Total em riquezas: "), `T$ ${formatAmount(summary.wealthTotal)}`);
  wealth.append(wealthTotal);

  const items = el("div", "treasure-summary-block");
  items.append(el("strong", "", "Itens"));
  if (!summary.items.length) items.append(el("p", "treasure-muted", "nenhum"));
  else {
    const list = el("ul", "treasure-items");
    for (const it of summary.items) {
      const li = el("li", "treasure-item");
      li.append(el("span", "treasure-item-line", formatItemLine(it)));
      for (const line of formatComponents(it.components)) li.append(el("span", `treasure-component${line.startsWith("· ") ? " treasure-component-extra" : ""}`, line));
      list.append(li);
    }
    items.append(list);
  }
  const grand = el("p", "treasure-summary-line treasure-grand-total");
  grand.append(el("strong", "", "Valor total (dinheiro + riquezas): "), el("span", "treasure-grand-value", `T$ ${formatAmount(summary.grandTotal)}`));
  container.append(moneyBlock, wealth, items, grand);
}

// ---------- Resultados ----------

function renderStep(step, { note, draw } = {}) {
  const { roll, result } = describeStep(step);
  const li = el("li", "treasure-step");
  li.style.marginLeft = `${stepDepth(step) * 14}px`;
  const shownId = step.sourceTableId ?? step.tableId;
  const table = el("span", "treasure-step-table", tableLabel(shownId));
  table.title = shownId;
  li.append(table, " ");
  const ref = stepReference(step);
  if (ref) li.append(el("span", "treasure-step-ref", `(${ref})`), " ");
  li.append(el("span", "treasure-step-roll", roll), " → ", el("span", "treasure-step-result", result));
  if (draw) li.append(" ", el("em", "treasure-book-draw", `(${draw})`));
  if (note) li.append(" ", el("em", "treasure-note", `(${note})`));
  return li;
}

function renderChain(state) {
  const list = el("ol", "treasure-cascade");
  for (const step of state.steps) list.append(renderStep(step, { draw: formatBookDraw(step) }));
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
  qty.addEventListener("input", () => qty.removeAttribute("aria-invalid"));
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
  const rollField = field("Rolar", columns);
  type.addEventListener("change", sync);
  columns.addEventListener("change", sync);
  row.append(field("Origem", type), field("ND", nd), field("Tabela", table, "treasure-table-field"),
    field("Quantidade", qty), field("Tipo", mode), rollField, remove);
  sync();
  row.markQuantity = () => {
    if (isValidQuantity(Number(qty.value))) qty.removeAttribute("aria-invalid");
    else qty.setAttribute("aria-invalid", "true");
  };
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

  const addRow = () => rowsBox.append(createRow((row) => {
    if (rowsBox.children.length > 1) row.remove();
  }));
  add.addEventListener("click", addRow);
  roll.addEventListener("click", () => {
    error.textContent = "";
    for (const r of rowsBox.children) r.markQuantity();
    try {
      const batch = rollBatch([...rowsBox.children].map((r) => r.readValue()), createRng(createRandomSeed()));
      renderResults(results, batch);
      renderSummary(footer, batch.flatMap((g) => g.treasures.flatMap((t) => t.states.flatMap((s) => s.gains))));
      footer.hidden = false;
    } catch (e) {
      error.textContent = e.message;
      results.replaceChildren();
      footer.hidden = true;
    }
  });
  const actions = el("div", "treasure-actions");
  actions.append(add, roll);
  panel.append(rowsBox, actions, error, results, footer);
  addRow();
}

// ---------- Aba Rolar na mesa ----------

// Vagas de melhoria/encanto ainda na fila de um item.
function openSlots(state, itemId) {
  return state.pending.filter((r) => r.context?.itemId === itemId && r.context.role === "slot").length;
}

// Estados a percorrer, em sequência: "both" faz a cadeia de dinheiro e depois a de itens.
function startConsult({ source, nd, column, mode }) {
  if (source !== "nd") return [startTable(source)];
  const one = (col) => startTreasure({ challengeRating: nd, column: col, mode: col === "items" ? "padrão" : mode })[0];
  return column === "both" ? [one("money"), one("items")] : [one(column)];
}

function renderHistory(state, notes, prefix = "") {
  const list = el("ol", "treasure-cascade treasure-consult-history");
  for (const step of state.steps) list.append(renderStep(step, { note: notes.get(prefix + step.id) }));
  return list;
}

// Linhas impressas de um pedido: tabela d%/1d6 (8-x) ou a rolagem de tipo (TYPE_ROLLS); sem linhas = expressão.
function bookRows(request) {
  if (request.kind === "table") {
    return (ALL_TABLES[request.tableId]?.rows ?? []).map((r) => ({ min: r.min, max: r.max, text: describeBookRowResult(r.result) }));
  }
  const types = TYPE_ROLLS[request.context?.rolls];
  if (request.context?.action === "itemType" && types) return types.map(([min, max, type]) => ({ min, max, text: type }));
  return [];
}

// Tabela como no livro: faixa e resultado de cada linha. `highlight(value)` marca a linha obtida.
function renderBookTable(request, rows) {
  const wrap = el("div", "treasure-book-table-wrap");
  const table = el("table", "treasure-book-table");
  table.append(el("caption", "treasure-visually-hidden", tableLabel(request.tableId)));
  const head = el("tr");
  head.append(el("th", "", request.die), el("th", "", "Resultado"));
  const thead = el("thead");
  thead.append(head);
  table.append(thead);
  const body = el("tbody");
  const trs = rows.map((row) => {
    const tr = el("tr");
    tr.append(el("td", "treasure-book-range", formatRange(row.min, row.max, request.die)), el("td", "", row.text));
    body.append(tr);
    return tr;
  });
  table.append(body);
  wrap.append(table);
  const highlight = (value) => {
    const [lo, hi] = dieRange(request.die);
    const inRange = Number.isInteger(value) && value >= lo && value <= hi;
    const effective = inRange ? Math.min(rows.at(-1).max, value + (request.bonus ?? 0)) : NaN;
    trs.forEach((tr, i) => {
      const hit = effective >= rows[i].min && effective <= rows[i].max;
      if (hit) tr.setAttribute("aria-current", "true"); else tr.removeAttribute("aria-current");
      if (hit) {
        const top = tr.offsetTop - wrap.clientHeight / 2 + tr.offsetHeight / 2;
        if (wrap.scrollTo) wrap.scrollTo({ top: Math.max(0, top) });
      }
    });
  };
  return { wrap, highlight };
}

// Cartão do resultado da pesquisa avulsa: o que foi rolado, sem o quadro de totais.
function renderResultCard(state) {
  const card = el("div", "treasure-result-card");
  const lines = [];
  const summary = summarizeGains(state.gains);
  for (const it of summary.items) {
    lines.push(el("p", "treasure-item-line", formatItemLine(it)));
    for (const line of formatComponents(it.components)) lines.push(el("p", `treasure-component${line.startsWith("· ") ? " treasure-component-extra" : ""}`, line));
  }
  for (const w of summary.wealth) lines.push(el("p", "treasure-item-line", `Riqueza: T$ ${formatAmount(w.value)} — ${w.examples}`));
  for (const [coin, n] of Object.entries(summary.coins)) if (n > 0) lines.push(el("p", "treasure-item-line", `${formatAmount(n)} ${coin}`));
  if (!lines.length) {
    const last = state.steps.map((st) => describeStep(st).result).filter(Boolean);
    lines.push(el("p", "treasure-item-line", last.length ? last.at(-1) : "Nada"));
  }
  card.append(...lines);
  return card;
}

function setupConsultTab(panel) {
  panel.replaceChildren();
  let state = null; // estado em andamento; os concluídos ficam em `stages`
  let stages = []; // estados já concluídos
  let queued = []; // estados ainda por começar
  let notes = new Map();
  let full = false;
  const setup = el("div", "treasure-consult-setup");
  const source = el("select", "treasure-c-source");
  source.append(option("nd", "Rolagem completa do livro (Tabela 8-1)"));
  for (const t of listSpecificTables()) source.append(option(t.id, t.title));
  const nd = el("select", "treasure-c-nd");
  for (const v of CHALLENGE_RATINGS) nd.append(option(v, challengeRatingLabel(v)));
  nd.value = "1";
  const column = el("select", "treasure-c-column");
  column.append(option("both", "Dinheiro e itens"), option("money", "Só dinheiro"), option("items", "Só itens"));
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
    stages.forEach((done, i) => history.append(renderHistory(done, notes, `${i}:`)));
    history.append(renderHistory(state, notes, `${stages.length}:`));
    const request = nextStep(state);
    if (!request && queued.length) {
      stages.push(state);
      state = queued.shift();
      render();
      return;
    }
    if (!request) {
      const all = [...stages, state];
      const gains = all.flatMap((s) => s.gains);
      result.classList.toggle("treasure-result-plain", !full);
      if (full) renderSummary(result, gains);
      else result.replaceChildren(renderResultCard(state));
      result.hidden = false;
      const done = el("p", "treasure-consult-done", "Cadeia concluída.");
      const outcomes = all.flatMap((s) => s.steps.map((st) => describeStep(st).result)).filter(Boolean);
      if (!gains.length) done.textContent = `Cadeia concluída. Resultado: ${outcomes.join("; ") || "nada"}.`;
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
    const rows = full ? bookRows(request) : [];
    let bookTable = null;
    if (rows.length) {
      bookTable = renderBookTable(request, rows);
      prompt.append(bookTable.wrap);
      input.addEventListener("input", () => bookTable.highlight(parseTypedValue(input.value, request.die)));
    }
    if (request.kind === "twoDice") {
      prompt.append(el("p", "treasure-consult-warning", "Linha 2D: role dois dados, escolha um deles e digite o dado escolhido."));
    }
    prompt.append(controls, error);
    prompt.hidden = false;
    prompt.onsubmit = (event) => {
      event.preventDefault();
      const text = input.value.trim();
      const value = parseTypedValue(text, request.die);
      try {
        const next = applyRoll(state, value);
        const step = next.steps[next.steps.length - 1];
        const owner = step.outcome?.itemId;
        if (step.outcome?.accepted && owner && openSlots(state, owner) - 1 > openSlots(next, owner)) {
          notes.set(`${stages.length}:${step.id}`, "ocupa as vagas restantes");
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
    full = source.value === "nd";
    [state, ...queued] = startConsult({ source: source.value, nd: nd.value, column: column.value, mode: mode.value });
    stages = [];
    notes = new Map();
    render();
  });
  restart.addEventListener("click", () => {
    state = null;
    stages = [];
    queued = [];
    notes = new Map();
    render();
    source.focus();
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
      tab.addEventListener("keydown", (event) => {
        const tabs = [...dialog.querySelectorAll("[role=tab]")];
        const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        const target = event.key === "Home" ? tabs[0] : event.key === "End" ? tabs.at(-1) : step ? tabs[(tabs.indexOf(tab) + step + tabs.length) % tabs.length] : null;
        if (!target) return;
        event.preventDefault();
        selectTab(dialog, target.id);
        target.focus();
      });
    }
    dialog.querySelector("#treasureClose")?.addEventListener("click", () => dialog.close());
    setupRollTab(dialog.querySelector("#treasurePanelRoll"));
    setupConsultTab(dialog.querySelector("#treasurePanelLookup"));
    selectTab(dialog, "treasureTabRoll");
  }
  if (!dialog.open) dialog.showModal();
}
