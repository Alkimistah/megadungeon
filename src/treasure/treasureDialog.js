// Casca da modal de tesouros e aba Rolar. A aba Consultar (Task 9) reusa describeStep e renderSummary.
import { CHALLENGE_RATINGS, challengeRatingLabel } from "./treasureEngine.js";
import { buildBatch, rollBatch, listSpecificTables, MAX_QUANTITY, MODE_LABELS } from "./treasureBatch.js";
import { describeStep, stepDepth, formatAmount, tableLabel } from "./treasureFormat.js";
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
      const price = it.price !== undefined ? ` — T$ ${formatAmount(it.price)}` : "";
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

export function openTreasureDialog(dialog) {
  if (!wired.has(dialog)) {
    wired.add(dialog);
    for (const tab of dialog.querySelectorAll("[role=tab]")) {
      tab.addEventListener("click", () => selectTab(dialog, tab.id));
    }
    dialog.querySelector("#treasureClose")?.addEventListener("click", () => dialog.close());
    setupRollTab(dialog.querySelector("#treasurePanelRoll"));
  }
  if (!dialog.open) dialog.showModal();
}
