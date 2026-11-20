// Motor de tesouros: funções puras que resolvem uma cadeia passo a passo.
//
// State   = { steps: Step[], gains: Gain[], pending: Request[], half: boolean }
// Request = { id, tableId, die, bonus, reason, kind: "table"|"expression"|"twoDice", context }
//   - "table": d% (ou 1d6) numa tabela; o valor informado é o do dado, e o motor
//     soma `bonus` (+%) com teto no máximo do dado antes de procurar a linha.
//   - "expression": total de uma expressão (`die`, ex.: "2d12", "1d3+1") pedida
//     pela linha da tabela `tableId`. `context.action` diz o que fazer com o total.
// Step    = { id, parentId, tableId, die, kind, reason, value, bonus, effective?, row?, outcome? }
// Gain    = { kind: "money", amount, currency }
//         | { kind: "wealth", tier, value, amount, currency: "T$", examples }
//
// `pending` é uma pilha: os pedidos gerados por um passo entram na frente, então a
// cadeia avança em profundidade (tipo e valor de uma riqueza antes da seguinte).
// Os ids são hierárquicos ("1", "1.1", "1.2"...), e o pai de um passo é o prefixo.
import { BASIC_BOOK_TABLES } from "./tables/basicBook.js";
import { dieRange, rollDice } from "./dice.js";

export const CHALLENGE_RATINGS = Object.freeze(["0.25", "0.5", ...Array.from({ length: 20 }, (_, i) => String(i + 1))]);
export const MODES = Object.freeze(["padrão", "metade", "dobro"]);
const COLUMNS = { money: "Dinheiro", items: "Itens" };
const WEALTH_TIERS = ["menor", "média", "maior"];
const WEALTH_PLURAL = { menor: "menores", média: "médias", maior: "maiores" };
const PLUS_PERCENT = 20;
const MAX_STEPS = 10000;

export function challengeRatingLabel(nd) {
  return nd === "0.25" ? "1/4" : nd === "0.5" ? "1/2" : nd;
}

function normalizeChallengeRating(value) {
  const text = String(value ?? "").trim();
  const nd = text === "1/4" ? "0.25" : text === "1/2" ? "0.5" : String(Number(text));
  if (!CHALLENGE_RATINGS.includes(nd)) throw new RangeError(`ND inválido: ${value}`);
  return nd;
}

function checkMode(mode) {
  if (!MODES.includes(mode)) throw new RangeError(`Tipo de tesouro inválido: ${mode}`);
}

function formatNumber(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function createState(rootRequest, half) {
  return { steps: [], gains: [], pending: [{ ...rootRequest, id: "1" }], half };
}

function tableRequest(tableId, reason, bonus = 0, context = {}) {
  return { tableId, die: BASIC_BOOK_TABLES[tableId].die, bonus, reason, kind: "table", context };
}

function expressionRequest(tableId, die, reason, context) {
  dieRange(die); // falha cedo se a tabela trouxer uma expressão inválida
  return { tableId, die, bonus: 0, reason, kind: "expression", context };
}

export function startTreasure({ challengeRating, column, mode = "padrão" } = {}) {
  const nd = normalizeChallengeRating(challengeRating);
  if (!COLUMNS[column]) throw new RangeError(`Coluna inválida: ${column}`);
  checkMode(mode);
  const tableId = `8-1/${nd}/${column}`;
  const copies = mode === "dobro" ? 2 : 1;
  const half = mode === "metade" && column === "money";
  const base = `Tesouro de ND ${challengeRatingLabel(nd)}, coluna ${COLUMNS[column]}`;
  return Array.from({ length: copies }, (_, i) => {
    const suffix = copies > 1 ? ` (Dobro, ${i + 1} de ${copies})` : half ? " (Metade)" : "";
    return createState(tableRequest(tableId, base + suffix), half);
  });
}

export function startTable(tableId, { tier, mode = "padrão" } = {}) {
  checkMode(mode);
  let id = tableId;
  if (tier !== undefined) {
    if (!WEALTH_TIERS.includes(tier)) throw new RangeError(`Categoria de riqueza inválida: ${tier}`);
    if (tableId === "8-2") id = `8-2/${tier}`;
  }
  const table = BASIC_BOOK_TABLES[id];
  if (!table) throw new RangeError(`Tabela inexistente: ${id}`);
  return createState(tableRequest(id, table.title), mode === "metade");
}

export function nextStep(state) {
  return state.pending[0] ?? null;
}

// ---------- Metade ----------

// Valores em T$ guardam uma casa decimal (TC); o que ficar abaixo de 0,1 T$ é descartado.
function halveTibars(amount) {
  return Math.floor(Math.round(amount * 10) / 2) / 10;
}

function halveCoins(amount, currency) {
  if (currency === "TC") return { amount: Math.floor(amount / 2), currency };
  if (currency === "TO") {
    if (amount % 2 === 0) return { amount: amount / 2, currency };
    return { amount: amount * 5, currency: "T$" }; // fração desce para T$
  }
  return { amount: halveTibars(amount), currency };
}

// ---------- Linhas das tabelas ----------

function wealthTypeRequests(count, tier, bonus) {
  return Array.from({ length: count }, (_, i) => {
    const position = count > 1 ? ` ${i + 1} de ${count}` : "";
    const plus = bonus ? ` (+${bonus}%)` : "";
    return tableRequest(`8-2/${tier}`, `Riqueza ${tier}${position}: tipo${plus}`, bonus);
  });
}

const ROW_HANDLERS = {
  none: () => ({}),
  money: ({ result }, request, half) => ({
    children: [expressionRequest(request.tableId, result.dice,
      `Quantia: ${result.dice} × ${formatNumber(result.multiplier)} ${result.currency}${half ? " (Metade)" : ""}`,
      { action: "money", multiplier: result.multiplier, currency: result.currency })],
  }),
  wealth: ({ result, flags }, request) => {
    const bonus = flags?.bonus20 ? PLUS_PERCENT : 0;
    if (typeof result.count === "number") return { children: wealthTypeRequests(result.count, result.tier, bonus) };
    return {
      children: [expressionRequest(request.tableId, result.count,
        `Quantidade de riquezas ${WEALTH_PLURAL[result.tier]}: ${result.count}`,
        { action: "wealthCount", tier: result.tier, bonus })],
    };
  },
  wealthValue: ({ result }, request, half) => {
    const tier = request.tableId.split("/")[1];
    return {
      children: [expressionRequest(request.tableId, result.dice,
        `Valor da riqueza ${tier}: ${result.dice} × ${formatNumber(result.multiplier)} T$${half ? " (Metade)" : ""}`,
        { action: "wealthValue", tier, multiplier: result.multiplier, examples: result.examples })],
    };
  },
};

// ---------- Expressões ----------

const EXPRESSION_HANDLERS = {
  money: (total, { context }, half) => {
    const raw = total * context.multiplier;
    const coins = half ? halveCoins(raw, context.currency) : { amount: raw, currency: context.currency };
    const gains = coins.amount > 0 ? [{ kind: "money", amount: coins.amount, currency: coins.currency }] : [];
    return { gains, outcome: { raw, currency: context.currency, ...coins, halved: half } };
  },
  wealthCount: (total, { context }) => ({
    children: wealthTypeRequests(total, context.tier, context.bonus),
    outcome: { count: total },
  }),
  wealthValue: (total, { context }, half) => {
    const raw = total * context.multiplier;
    const amount = half ? halveTibars(raw) : raw;
    const gains = amount > 0
      ? [{ kind: "wealth", tier: context.tier, value: amount, amount, currency: "T$", examples: context.examples }]
      : [];
    return { gains, outcome: { raw, amount, currency: "T$", halved: half } };
  },
};

function notSupported(what) {
  return new Error(`Resultado ainda não suportado pelo motor de tesouros: ${what}`);
}

function parentOf(id) {
  const cut = id.lastIndexOf(".");
  return cut < 0 ? null : id.slice(0, cut);
}

// Registra o valor do pedido atual e devolve um novo estado. Não altera `state`.
// `extra` ({ dice: [a, b] }) fica reservado para os pedidos 2D.
export function applyRoll(state, value, extra) { // eslint-disable-line no-unused-vars
  const request = nextStep(state);
  if (!request) throw new Error("A cadeia de tesouro já terminou.");
  const [min, max] = dieRange(request.die);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`Valor inválido para ${request.die}: ${value} (de ${min} a ${max}).`);
  }

  const step = {
    id: request.id, parentId: parentOf(request.id), tableId: request.tableId, die: request.die,
    kind: request.kind, reason: request.reason, value, bonus: request.bonus,
  };
  let resolved;
  if (request.kind === "table") {
    const effective = Math.min(max, value + request.bonus);
    const row = BASIC_BOOK_TABLES[request.tableId].rows.find((r) => r.min <= effective && effective <= r.max);
    const handler = ROW_HANDLERS[row.result.kind];
    if (!handler) throw notSupported(`${row.result.kind} (${request.tableId}, ${row.min}-${row.max})`);
    resolved = handler(row, request, state.half);
    Object.assign(step, { effective, row });
  } else if (request.kind === "expression") {
    const handler = EXPRESSION_HANDLERS[request.context?.action];
    if (!handler) throw notSupported(`expressão ${request.context?.action}`);
    resolved = handler(value, request, state.half);
    step.outcome = resolved.outcome;
  } else {
    throw notSupported(`pedido ${request.kind}`);
  }

  const children = (resolved.children ?? []).map((child, i) => ({ ...child, id: `${request.id}.${i + 1}` }));
  return {
    ...state,
    steps: [...state.steps, step],
    gains: [...state.gains, ...(resolved.gains ?? [])],
    pending: [...children, ...state.pending.slice(1)],
  };
}

// Resolve a cadeia inteira com dados aleatórios (aba Rolar).
export function resolveWithDice(state, rng) {
  let current = state;
  for (let request = nextStep(current), n = 0; request; request = nextStep(current), n++) {
    if (n >= MAX_STEPS) throw new Error("Cadeia de tesouro longa demais.");
    if (request.kind === "twoDice") throw notSupported("pedido twoDice");
    current = applyRoll(current, rollDice(request.die, rng).total);
  }
  return current;
}
