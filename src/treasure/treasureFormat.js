// Texto de cada passo da cadeia de tesouro. Funções puras, usadas pelas abas Rolar e Consultar.
import { BASIC_BOOK_TABLES } from "./tables/basicBook.js";

const fmt = (n) => {
  const [int, dec] = String(n).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (dec ? `,${dec}` : "");
};

const TIER_PLURAL = { menor: "menores", média: "médias", maior: "maiores" };

export function describeRowResult(result) {
  switch (result.kind) {
    case "none": return "Nada";
    case "diverse": return "Item diverso";
    case "equipment": return "Equipamento";
    case "superior": return `Item superior (${result.improvements} ${result.improvements > 1 ? "melhorias" : "melhoria"})`;
    case "magic": return `Item mágico ${result.tier}`;
    case "potion": return `Poções: ${result.count}`;
    case "item": return result.price !== undefined ? `${result.name} (T$ ${fmt(result.price)})` : result.name;
    case "improvement": return `Melhoria: ${result.name}`;
    case "enchantment": return `Encanto: ${result.name}`;
    case "money": return `${result.dice} × ${fmt(result.multiplier)} ${result.currency}`;
    case "wealth": return `Riquezas ${TIER_PLURAL[result.tier] ?? result.tier}: ${result.count}`;
    case "wealthValue": return `${result.dice} × ${fmt(result.multiplier)} T$`;
    default: return result.name ?? result.kind;
  }
}

function describeOutcome(outcome = {}) {
  if (outcome.currency) return `${fmt(outcome.amount)} ${outcome.currency}${outcome.halved ? " (Metade)" : ""}`;
  if (outcome.count !== undefined) return `Quantidade: ${outcome.count}`;
  if (outcome.type) return `Tipo: ${outcome.type}`;
  if (outcome.option !== undefined) return `Resultado: ${outcome.option}`;
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
  const title = BASIC_BOOK_TABLES[tableId]?.title;
  return title ? title.replace(/^(Tabela [\d-]+): /, "$1 · ") : `Tabela ${tableId}`;
}
