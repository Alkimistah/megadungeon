// Motor de tesouros: funções puras que resolvem uma cadeia passo a passo.
//
// State   = { steps: Step[], gains: Gain[], pending: Request[], half: boolean }
// Request = { id, tableId, die, bonus, reason, kind: "table"|"expression"|"twoDice", context }
//   - "table": d% (ou 1d6) numa tabela; o valor informado é o do dado, e o motor
//     soma `bonus` (+%) com teto no máximo do dado antes de procurar a linha.
//   - "expression": total de uma expressão (`die`, ex.: "2d12", "1d3+1") pedida
//     pela linha da tabela `tableId`. `context.action` diz o que fazer com o total.
//   - "twoDice": rolagem de tipo 2D. `die` é "1d6" e o valor é o dado escolhido;
//     resolve como uma expressão. Em `applyRoll`, `extra.dice` ([a, b]) é opcional.
//   - "list": 1d<n> numa lista de itens de outro livro (Ameaças, Heróis, Deuses); o valor v
//     (1 a n) dá o v-ésimo item na ordem impressa. Não tem bônus nem desdobramento.
// Step    = { id, parentId, tableId, die, kind, reason, value, bonus, effective?, row?, item?, outcome?,
//             dice?, chosen?, sourceBook?, sourceTableId?, share? }   (`row` é uma cópia da linha; `item` é
//             o item da lista, em "list" e quando a fonte sorteada é outro livro; `dice`/`chosen` só em 2D)
// Gain    = { kind: "money", amount, currency }
//         | { kind: "wealth", tier, value, amount, currency: "T$", examples }
//         | { kind: "item", name, category, source, price?, tier?, details }
//           details = { enchantments?, improvements?, material?, creature?, specific?, components }
//           components = [{ role: "base"|"melhoria"|"encanto"|"material"|"específico", name, book, bookPage }]
//
// Pesos entre livros (só em `resolveWithDice`): antes de rolar num pedido de um grupo de
// `WEIGHTED_POOLS`, sorteia a fonte (`pickSource`). Se for outro livro, o valor é 1d<n> na lista
// elegível, e o passo guarda `item` e uma linha montada a partir dele; a tabela do pedido
// (`tableId`) continua a do Livro Básico, e `sourceTableId` diz de onde veio. `applyRoll`, com
// valores digitados (aba Rolar com o livro), nunca sorteia fonte e não grava esses campos.
//
// `pending` é uma pilha: os pedidos gerados por um passo entram na frente, então a
// cadeia avança em profundidade (tipo e valor de uma riqueza antes da seguinte).
// Os ids são hierárquicos ("1", "1.1", "1.2"...), e o pai de um passo é o prefixo.
//
// Itens superiores e mágicos: o passo do item base (8-4) é o dono do item. Ele enfileira
// uma vaga por melhoria ou encanto (`context.itemId` = id do passo base, `role: "slot"`).
// Cada vaga confere repetição, "conta como duas" e "apenas escudos" contra os passos já
// aceitos do mesmo item; se recusar, a nova rolagem entra como filha do passo recusado.
// Quando não resta pedido pendente com o prefixo do dono, o motor monta o `Gain`.
import { BASIC_BOOK_TABLES, TYPE_ROLLS, ENCHANTMENT_COUNT } from "./tables/basicBook.js";
import { basePriceOf, priceOf, normalizeName } from "./tables/prices.js";
import { WEIGHTED_POOLS, pickSource, eligibleItems } from "./bookWeights.js";
import { ALL_TABLES } from "./tables/index.js";
import { listDie } from "./tables/schema.js";
import { dieRange, rollDice } from "./dice.js";
import { randomInt } from "../random.js";

export const CHALLENGE_RATINGS = Object.freeze(["0.25", "0.5", ...Array.from({ length: 20 }, (_, i) => String(i + 1))]);
export const MODES = Object.freeze(["padrão", "metade", "dobro"]);
const COLUMNS = { money: "Dinheiro", items: "Itens" };
const WEALTH_TIERS = ["menor", "média", "maior"];
const WEALTH_PLURAL = { menor: "menores", média: "médias", maior: "maiores" };
const PLUS_PERCENT = 20;
const ACCESSORY_TABLES = { menor: "8-13", médio: "8-14", maior: "8-15" };
const MAGIC_SLOT_TABLES = { arma: "8-8", armadura: "8-10" };
const SPECIFIC_TABLES = ["8-9", "8-11"];
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
  const list = ALL_TABLES[tableId];
  if (list?.kind === "list") {
    const request = { tableId, die: listDie(list.items.length), bonus: 0, reason: list.title, kind: "list", context: {} };
    return createState(request, false);
  }
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

function potionRequests(count, bonus) {
  return Array.from({ length: count }, (_, i) => {
    const position = count > 1 ? ` ${i + 1} de ${count}` : "";
    const plus = bonus ? ` (+${bonus}%)` : "";
    return tableRequest("8-12", `Poção${position}${plus}`, bonus);
  });
}

// Rolagem de tipo (1d6) de equipamento, item superior ou item mágico; 2D quando a linha pede.
function typeRequest(tableId, rolls, build, twoDice) {
  const options = TYPE_ROLLS[rolls].map(([min, max, type]) => `${min === max ? min : `${min}-${max}`} ${type}`).join(", ");
  const what = build.kind === "magic" ? `do item mágico ${build.tier}`
    : build.kind === "superior" ? `do item superior (${build.improvements} ${build.improvements > 1 ? "melhorias" : "melhoria"})`
    : "do equipamento";
  const reason = twoDice
    ? `Tipo ${what}, linha 2D: role 2d6, escolha um dos dois dados e informe esse dado (${options})`
    : `Tipo ${what}: 1d6 (${options})`;
  return { tableId, die: "1d6", bonus: 0, reason, kind: twoDice ? "twoDice" : "expression",
    context: { action: "itemType", rolls, build } };
}

// Livro e página de onde veio uma parte do item: a tabela (ou lista) em que foi rolada.
function component(role, name, tableId) {
  const table = ALL_TABLES[tableId];
  return { role, name, book: table.book, bookPage: table.bookPage };
}

// Tabela de onde o passo tirou o resultado: a lista do outro livro, se sorteada, ou a do pedido.
const originOf = (step) => step.sourceTableId ?? step.tableId;

// `origin` = tabela ou lista de onde o item veio; `tableId` = tabela do pedido (Livro Básico).
function itemGainFrom(result, origin, tableId) {
  const price = result.price !== undefined ? result.price : basePriceOf(result.name);
  const specific = SPECIFIC_TABLES.includes(tableId);
  return {
    kind: "item", name: result.name, category: result.category, source: origin,
    ...(price !== undefined ? { price } : {}),
    ...(result.tier !== undefined ? { tier: result.tier } : {}),
    details: {
      ...(specific ? { specific: true } : {}),
      components: [component(specific ? "específico" : "base", result.name, origin)],
    },
  };
}

function subrollRequest(tableId, result, itemId) {
  const { die, options } = result.subroll;
  const list = options.map((option, i) => `${i + 1} ${option}`).join(", ");
  return expressionRequest(tableId, die, `${result.name}: ${die} (${list})`,
    { action: "subroll", options: [...options], ...(result.kind === "improvement" ? { subroll: "material" } : {}),
      ...(itemId ? { itemId } : {}) });
}

// Passos aceitos (melhorias ou encantos) do item cujo passo base tem id `itemId`.
function acceptedSlots(steps, itemId) {
  return steps.filter((s) => s.outcome?.itemId === itemId && s.outcome.accepted);
}

const REROLL_TEXT = {
  repetida: (name) => `${name} já está no item`,
  "conta como duas": (name, ctx, free) =>
    `${name} conta como ${ctx.noun === "Encanto" ? "dois encantos" : "duas melhorias"}, e o item só tem ${free} ${free === 1 ? "vaga" : "vagas"}`,
  "apenas escudos": (name, ctx) => `${name} é só para escudos, e ${ctx.base} é armadura`,
};

// Linha de melhoria (8-5) ou de encanto (8-8, 8-10).
function slotHandler({ result }, request, half, state) {
  const ctx = request.context ?? {};
  const { itemId } = ctx;
  const owner = itemId ? { itemId } : {};
  let used = 0;
  if (itemId) {
    const taken = acceptedSlots(state.steps, itemId);
    used = taken.reduce((n, s) => n + s.outcome.slots, 0);
    const free = ctx.capacity - used;
    const name = normalizeName(result.name);
    const cause = taken.some((s) => normalizeName(s.outcome.name) === name) ? "repetida"
      : result.special === "counts-as-two" && free < 2 ? "conta como duas"
      : result.special === "shield-only" && ctx.category !== "escudo" ? "apenas escudos"
      : null;
    if (cause) {
      const { id, ...again } = request; // eslint-disable-line no-unused-vars
      const reason = `${ctx.noun} de novo na Tabela ${request.tableId} (${cause}): ${REROLL_TEXT[cause](result.name, ctx, free)}`;
      return { outcome: { ...owner, rejected: cause, name: result.name }, children: [{ ...again, reason }] };
    }
  }
  if (result.special === "specific") {
    return {
      outcome: { ...owner, specific: true, name: result.name },
      children: [tableRequest(result.next, `${result.name}: role na Tabela ${result.next}; o item troca e os encantos são descartados`,
        0, itemId ? { itemId, role: "specific", ...(ctx.tier ? { tier: ctx.tier } : {}) } : {})],
      prune: itemId,
    };
  }
  const slots = result.special === "counts-as-two" ? 2 : 1;
  return {
    outcome: { ...owner, accepted: true, name: result.name, slots },
    children: result.subroll ? [subrollRequest(request.tableId, result, itemId)] : [],
    prune: itemId && used + slots >= ctx.capacity ? itemId : undefined,
  };
}

function lowerFirst(text) {
  return text.charAt(0).toLocaleLowerCase("pt-BR") + text.slice(1);
}

// Monta o Gain do item superior ou mágico a partir dos passos do dono `itemId`.
function buildItemGain(steps, itemId) {
  const own = steps.filter((s) => s.outcome?.itemId === itemId);
  const replacement = own.find((s) => s.outcome.specificItem);
  if (replacement) return itemGainFrom(replacement.row.result, originOf(replacement), replacement.tableId);
  const base = steps.find((s) => s.id === itemId);
  const { build } = base.outcome;
  const options = new Map(own.filter((s) => s.outcome.option !== undefined).map((s) => [s.parentId, s]));
  const accepted = own.filter((s) => s.outcome.accepted);
  const superior = build.kind === "superior";
  const details = { [superior ? "improvements" : "enchantments"]: accepted.map((s) => s.outcome.name) };
  const components = [component("base", base.row.result.name, originOf(base))];
  const segments = accepted.map((s) => {
    components.push(component(superior ? "melhoria" : "encanto", s.outcome.name, originOf(s)));
    const optionStep = options.get(s.id);
    if (optionStep === undefined) return lowerFirst(s.outcome.name);
    const option = optionStep.outcome.option;
    const isMaterial = s.row.result.kind === "improvement";
    details[isMaterial ? "material" : "creature"] = option;
    if (isMaterial) components.push(component("material", option, originOf(optionStep)));
    return `${lowerFirst(s.outcome.name)}: ${option}`;
  });
  details.components = components;
  const counted = { ...details };
  if (details.improvements) counted.improvementCount = accepted.reduce((n, s) => n + s.outcome.slots, 0);
  if (details.enchantments) counted.enchantmentCount = accepted.reduce((n, s) => n + s.outcome.slots, 0);
  const price = priceOf(counted, base.row.result);
  return {
    kind: "item", name: `${base.row.result.name} (${segments.join(", ")})`, category: base.row.result.category,
    source: base.tableId,
    ...(price !== undefined ? { price } : {}),
    ...(build.kind === "magic" ? { tier: build.tier } : {}),
    details,
  };
}

const ROW_HANDLERS = {
  none: () => ({}),
  diverse: () => ({ children: [tableRequest("8-3", "Item diverso")] }),
  equipment: ({ flags }, request) => ({
    children: [typeRequest(request.tableId, "equipment", { kind: "equipment" }, flags?.twoDice)],
  }),
  superior: ({ result, flags }, request) => ({
    children: [typeRequest(request.tableId, "equipment", { kind: "superior", improvements: result.improvements }, flags?.twoDice)],
  }),
  magic: ({ result, flags }, request) => ({
    children: [typeRequest(request.tableId, "magic", { kind: "magic", tier: result.tier }, flags?.twoDice)],
  }),
  potion: ({ result, flags }, request) => {
    const bonus = flags?.bonus20 ? PLUS_PERCENT : 0;
    if (typeof result.count === "number") return { children: potionRequests(result.count, bonus) };
    return {
      children: [expressionRequest(request.tableId, result.count, `Quantidade de poções: ${result.count}`,
        { action: "potionCount", bonus })],
    };
  },
  item: ({ result }, request, half, state, origin) => {
    const { build, itemId } = request.context ?? {};
    if (build) {
      const superior = build.kind === "superior";
      const capacity = superior ? build.improvements : ENCHANTMENT_COUNT[build.tier];
      const table = superior ? `8-5/${build.type}` : MAGIC_SLOT_TABLES[build.type];
      const noun = superior ? "Melhoria" : "Encanto";
      const context = { itemId: request.id, role: "slot", capacity, category: result.category, base: result.name, noun,
        ...(superior ? {} : { tier: build.tier }) };
      return {
        outcome: { itemId: request.id, base: true, build },
        children: Array.from({ length: capacity }, (_, i) =>
          tableRequest(table, `${noun} ${i + 1} de ${capacity}: ${result.name}`, 0, { ...context })),
      };
    }
    if (itemId) return { outcome: { itemId, specificItem: true } };
    return { gains: [itemGainFrom(result, origin, request.tableId)] };
  },
  improvement: slotHandler,
  enchantment: slotHandler,
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
  potionCount: (total, { context }) => ({
    children: potionRequests(total, context.bonus),
    outcome: { count: total },
  }),
  itemType: (total, { context }) => {
    const [, , type] = TYPE_ROLLS[context.rolls].find(([min, max]) => min <= total && total <= max);
    const { build } = context;
    let child;
    if (build.kind === "equipment") child = tableRequest(`8-4/${type}`, `Equipamento: ${type}`);
    else if (type === "acessório") child = tableRequest(ACCESSORY_TABLES[build.tier], `Acessório mágico ${build.tier}`);
    else {
      const what = build.kind === "superior" ? "Item superior" : `Item mágico ${build.tier}`;
      child = tableRequest(`8-4/${type}`, `${what}: ${type} base`, 0, { build: { ...build, type } });
    }
    return { children: [child], outcome: { type } };
  },
  subroll: (total, { context }) => ({
    outcome: { ...(context.itemId ? { itemId: context.itemId } : {}), option: context.options[total - 1] },
  }),
};

function notSupported(what) {
  return new Error(`Resultado ainda não suportado pelo motor de tesouros: ${what}`);
}

function parentOf(id) {
  const cut = id.lastIndexOf(".");
  return cut < 0 ? null : id.slice(0, cut);
}

function checkTwoDice(dice, value, min, max) {
  const valid = Array.isArray(dice) && dice.length === 2
    && dice.every((d) => Number.isInteger(d) && d >= min && d <= max) && dice.includes(value);
  if (!valid) throw new RangeError(`Dados 2D inválidos: ${JSON.stringify(dice)} com o valor escolhido ${value}.`);
}

// Resultado de linha montado a partir de um item de lista de outro livro.
function listRowResult(item, tableId) {
  if (tableId.startsWith("8-5/")) return { kind: "improvement", name: item.name };
  const { appliesTo, ...rest } = item; // eslint-disable-line no-unused-vars
  return { kind: "item", ...structuredClone(rest) };
}

// Registra o valor do pedido atual e devolve um novo estado. Não altera `state`.
// `extra` ({ dice: [a, b] }) vale só para os pedidos 2D, e é opcional.
export function applyRoll(state, value, extra) {
  return advance(state, value, extra);
}

// `source` (só de `resolveWithDice`) = { book, tableId, share, items? }: a fonte sorteada; com
// `items` (lista elegível de outro livro), `value` é a posição na lista (1 a n).
function advance(state, value, extra, source) {
  const request = nextStep(state);
  if (!request) throw new Error("A cadeia de tesouro já terminou.");
  const list = source?.items;
  const die = list ? listDie(list.length) : request.die;
  const [min, max] = dieRange(die);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`Valor inválido para ${die}: ${value} (de ${min} a ${max}).`);
  }
  if (request.kind === "twoDice" && extra?.dice !== undefined) checkTwoDice(extra.dice, value, min, max);

  const step = {
    id: request.id, parentId: parentOf(request.id), tableId: request.tableId, die,
    kind: request.kind, reason: request.reason, value, bonus: request.bonus,
  };
  if (source) Object.assign(step, { sourceBook: source.book, sourceTableId: source.tableId, share: source.share });
  const origin = source?.tableId ?? request.tableId;
  let resolved;
  if (list) {
    const item = list[value - 1];
    step.item = structuredClone(item);
    if (request.kind === "table") {
      const row = { min: value, max: value, result: listRowResult(item, request.tableId) };
      resolved = ROW_HANDLERS[row.result.kind](row, request, state.half, state, origin);
      step.row = structuredClone(row);
    } else {
      // Sub-rolagem de material especial: o material vem da lista do outro livro.
      const { itemId } = request.context;
      resolved = { outcome: { ...(itemId ? { itemId } : {}), option: item.name } };
    }
    if (resolved.outcome) step.outcome = resolved.outcome;
  } else if (request.kind === "table") {
    const effective = Math.min(max, value + request.bonus);
    const row = BASIC_BOOK_TABLES[request.tableId].rows.find((r) => r.min <= effective && effective <= r.max);
    const handler = ROW_HANDLERS[row.result.kind];
    if (!handler) throw notSupported(`${row.result.kind} (${request.tableId}, ${row.min}-${row.max})`);
    resolved = handler(row, request, state.half, state, origin);
    Object.assign(step, { effective, row: structuredClone(row) });
    if (resolved.outcome) step.outcome = resolved.outcome;
  } else if (request.kind === "list") {
    const item = ALL_TABLES[request.tableId].items[value - 1];
    step.item = structuredClone(item);
    resolved = { gains: [{ kind: "item", ...structuredClone(item), source: request.tableId,
      details: { components: [component("base", item.name, request.tableId)] } }] };
  } else if (request.kind === "expression" || request.kind === "twoDice") {
    const handler = EXPRESSION_HANDLERS[request.context?.action];
    if (!handler) throw notSupported(`expressão ${request.context?.action}`);
    resolved = handler(value, request, state.half, state);
    step.outcome = resolved.outcome;
    if (request.kind === "twoDice") {
      if (extra?.dice !== undefined) step.dice = [...extra.dice];
      step.chosen = value;
    }
  } else {
    throw notSupported(`pedido ${request.kind}`);
  }

  const children = (resolved.children ?? []).map((child, i) => ({ ...child, id: `${request.id}.${i + 1}` }));
  // Vagas que sobraram de um item cheio ou trocado por um específico saem da fila.
  const rest = state.pending.slice(1).filter((r) => !resolved.prune
    || r.context?.itemId !== resolved.prune || r.context.role !== "slot");
  const pending = [...children, ...rest];
  const steps = [...state.steps, step];
  const gains = [...state.gains, ...(resolved.gains ?? [])];
  const owner = request.context?.itemId;
  if (owner && !pending.some((r) => r.id.startsWith(`${owner}.`))) gains.push(buildItemGain(steps, owner));
  return { ...state, steps, gains, pending };
}

const BASIC_BOOK = BASIC_BOOK_TABLES["8-3"].book;

// Grupo de pesos do pedido, ou null quando a rolagem fica só no Livro Básico.
function poolKeyOf(request) {
  if (request.kind === "expression") return request.context?.subroll === "material" ? "material" : null;
  if (request.kind !== "table") return null;
  const { tableId, context } = request;
  if (SPECIFIC_TABLES.includes(tableId)) return context?.tier ? `${tableId}/${context.tier}` : null;
  return WEIGHTED_POOLS[tableId] ? tableId : null;
}

// Resolve a cadeia inteira com dados aleatórios (aba Gerar tesouros), com os pesos entre livros.
export function resolveWithDice(state, rng) {
  let current = state;
  for (let request = nextStep(current), n = 0; request; request = nextStep(current), n++) {
    if (n >= MAX_STEPS) throw new Error("Cadeia de tesouro longa demais.");
    if (request.kind === "twoDice") {
      // 2D: dados iguais valem esse valor; diferentes, sorteia um dos dois com chance igual.
      const a = rollDice(request.die, rng).total;
      const b = rollDice(request.die, rng).total;
      const chosen = a === b ? a : randomInt(rng, 0, 1) === 0 ? a : b;
      current = applyRoll(current, chosen, { dice: [a, b] });
    } else {
      const key = poolKeyOf(request);
      if (!key) {
        current = advance(current, rollDice(request.die, rng).total);
        continue;
      }
      const { tableId, share } = pickSource(key, { tableId: request.tableId }, rng);
      const items = tableId === request.tableId ? undefined : eligibleItems(key, tableId);
      const source = { book: items ? ALL_TABLES[tableId].book : BASIC_BOOK, tableId, share, ...(items ? { items } : {}) };
      current = advance(current, rollDice(items ? listDie(items.length) : request.die, rng).total, undefined, source);
    }
  }
  return current;
}
