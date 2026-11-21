// Texto de cada passo da cadeia de tesouro. Funções puras, usadas pelas abas Rolar e Consultar.
import { ALL_TABLES } from "./tables/index.js";

const fmt = (n) => {
  const [int, dec] = String(n).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
};

// Preço numérico vira "T$ 1.500"; o texto impresso ("—", "+T$ 300") segue como está.
export const formatPrice = (price) => (typeof price === "number" ? `T$ ${fmt(price)}` : price);

const TIER_PLURAL = { menor: "menores", média: "médias", maior: "maiores" };

export function describeRowResult(result) {
  switch (result.kind) {
    case "none": return "Nada";
    case "diverse": return "Item diverso";
    case "equipment": return "Equipamento";
    case "superior": return `Item superior (${result.improvements} ${result.improvements > 1 ? "melhorias" : "melhoria"})`;
    case "magic": return `Item mágico ${result.tier}`;
    case "potion": return `Poções: ${result.count}`;
    case "item": return result.price === undefined ? result.name : `${result.name} (${formatPrice(result.price)})`;
    case "improvement": return `Melhoria: ${result.name}`;
    case "enchantment": return `Encanto: ${result.name}`;
    case "money": return `${result.dice} × ${fmt(result.multiplier)} ${result.currency}`;
    case "wealth": return `Riquezas ${TIER_PLURAL[result.tier] ?? result.tier}: ${result.count}`;
    case "wealthValue": return `${result.dice} × ${fmt(result.multiplier)} T$`;
    default: return result.name ?? result.kind;
  }
}

const TIER_SINGULAR = { menor: "menor", média: "média", maior: "maior" };

// Texto de uma linha como impresso na Tabela 8-1 e afins (só nas linhas da tabela da rolagem completa).
export function describeBookRowResult(result) {
  const plural = (count) => count !== 1;
  switch (result.kind) {
    case "none": return "—";
    case "diverse": return "Diverso";
    case "equipment": return "Equipamento";
    case "superior": return `Superior (${result.improvements} ${result.improvements > 1 ? "melhorias" : "melhoria"})`;
    case "magic": return `Mágico (${result.tier})`;
    case "potion": return `${result.count} ${plural(result.count) ? "poções" : "poção"}`;
    case "wealth": return `${result.count} ${plural(result.count) ? "riquezas" : "riqueza"} ${(plural(result.count) ? TIER_PLURAL : TIER_SINGULAR)[result.tier] ?? result.tier}`;
    case "money": return `${result.dice}x${result.multiplier} ${result.currency}`;
    case "wealthValue": return `${result.dice}x${result.multiplier} T$`;
    default: return describeRowResult(result);
  }
}

function describeOutcome(outcome = {}) {
  if (outcome.currency) return `${fmt(outcome.amount)} ${outcome.currency}${outcome.halved ? " (Metade)" : ""}`;
  if (outcome.count !== undefined) return `Quantidade: ${outcome.count}`;
  if (outcome.type) return `Tipo: ${outcome.type}`;
  if (outcome.option !== undefined) return `Resultado: ${outcome.option}`;
  if (outcome.rejected) return `Resultado: ${outcome.name}${rowOutcomeNote(outcome)}`;
  return "";
}

function rowOutcomeNote(outcome) {
  if (!outcome) return "";
  if (outcome.rejected) return ` (recusado: ${outcome.rejected}; rola de novo)`;
  if (outcome.specific) return " (item específico)";
  return "";
}

// { roll, result }: `roll` mostra o dado (e +%, 2D), `result` o que a tabela ou a expressão deu.
export function describeStep(step) {
  if (step.kind === "list") return { roll: `${step.die} ${step.value}`, result: describeRowResult({ kind: "item", ...step.item }) };
  if (step.kind === "table") {
    const bonus = step.bonus
      ? ` +${step.bonus}% = ${step.effective}`
      : "";
    return { roll: `${step.die} ${step.value}${bonus}`, result: describeRowResult(step.row.result) + rowOutcomeNote(step.outcome) };
  }
  const roll = step.kind === "twoDice" && step.dice
    ? `${step.die}: ${step.dice[0]} e ${step.dice[1]}, escolhido ${step.chosen}`
    : step.kind === "twoDice" ? `${step.die}: escolhido ${step.chosen}`
    : `${step.die} = ${step.value}`;
  return { roll, result: describeOutcome(step.outcome) };
}

// Profundidade na cadeia a partir do id hierárquico ("1" = 0, "1.2.1" = 2).
export function stepDepth(step) {
  return step.id.split(".").length - 1;
}

export { fmt as formatAmount };

const COLUMN_NAMES = { money: "Dinheiro", items: "Itens" };

// Rótulo curto de uma tabela: "Tabela 8-1 · Dinheiro ND 1/4", "Tabela 8-4 · Equipamento, Esotérico".
export function tableLabel(tableId) {
  const nd = tableId.match(/^8-1\/([^/]+)\/(money|items)$/);
  if (nd) return `Tabela 8-1 · ${COLUMN_NAMES[nd[2]]} ND ${nd[1] === "0.25" ? "1/4" : nd[1] === "0.5" ? "1/2" : nd[1]}`;
  const table = ALL_TABLES[tableId];
  if (table?.kind === "list") return table.label;
  const title = table?.title;
  return title ? title.replace(/^(Tabela [\d-]+): /, "$1 · ") : `Tabela ${tableId}`;
}

// "Livro p. N" da tabela de origem; vazio quando a tabela não tem livro/página.
export function bookReference(tableId) {
  const table = ALL_TABLES[tableId];
  if (!table?.book) return "";
  return table.bookPage ? `${table.book} p. ${table.bookPage}` : table.book;
}

// Página do passo: "p. N" no Livro Básico, "<livro> p. N" em outro livro, vazio sem livro.
export function stepReference(step) {
  const id = step.sourceTableId ?? step.tableId;
  const ref = bookReference(id);
  return ALL_TABLES[id]?.book === "Livro Básico" ? ref.replace(/^Livro Básico ?/, "") : ref;
}

// "2× Nome (categoria) — T$ X — Livro p. N"; preço e referência são omitidos quando ausentes.
export function formatItemLine(item) {
  const parts = [`${item.quantity}× ${item.name}${item.category ? ` (${item.category})` : ""}`];
  if (item.price !== undefined) parts.push(formatPrice(item.price));
  const ref = item.source && !item.components?.length ? bookReference(item.source) : "";
  if (ref) parts.push(ref);
  return parts.join(" — ");
}

// Uma linha por componente: o primeiro (base) sem marca, os demais com "· ".
export function formatComponents(components) {
  return (components ?? []).map((c, i) => {
    const ref = c.book ? ` — ${c.book}${c.bookPage ? ` p. ${c.bookPage}` : ""}` : "";
    return `${i ? "· " : ""}${c.name}${ref}`;
  });
}

// "Livro sorteado: <livro> (<%>)" só quando houve sorteio (share < 1); senão, vazio.
export function formatBookDraw(step) {
  if (!step.sourceBook || !(step.share < 1)) return "";
  const pct = Math.round(step.share * 1000) / 10;
  return `Livro sorteado: ${step.sourceBook} (${fmt(pct)}%)`;
}

// Valor digitado numa consulta; "00" vale 100 no d%. Texto inválido vira NaN.
export function parseTypedValue(text, die) {
  const t = text.trim();
  if (die === "d%" && t === "00") return 100;
  return /^-?\d+$/.test(t) ? Number(t) : NaN;
}

// Faixa como impressa: "01–30" no d%, "1–3" no 1d6, "05" (d%) ou "6" quando é um só valor.
export function formatRange(min, max, die) {
  const pad = (n) => (die === "d%" && n < 10 ? `0${n}` : String(n));
  return min === max ? pad(min) : `${pad(min)}–${pad(max)}`;
}
