// Lote de tesouros da aba Rolar. Funções puras: montam e resolvem as cadeias de cada linha.
//
// Linha de entrada: { challengeRating, quantity, mode, columns: "both"|"items"|"money" }
//                ou { tableId, quantity }.
// BatchRow = { row, treasures: [{ index, label, states: State[] }] }; `index` é global (1, 2, 3...).
import { CHALLENGE_RATINGS, MODES, challengeRatingLabel, startTreasure, startTable, resolveWithDice } from "./treasureEngine.js";
import { ALL_TABLES } from "./tables/index.js";
import { crystalLine, CRYSTAL_COLORS } from "../economy/crystalValues.js";
import { tableLabel } from "./treasureFormat.js";

export const MAX_QUANTITY = 99;
const COLUMN_SETS = { both: ["money", "items"], money: ["money"], items: ["items"] };
export const COLUMN_LABELS = { both: "Itens e dinheiro", items: "Só itens", money: "Só dinheiro" };
export const MODE_LABELS = { padrão: "Padrão", metade: "Metade", dobro: "Dobro" };

// Tabelas escolhíveis em "Tabela específica": as do Livro Básico (menos as de ND) e as listas dos outros livros.
export function listSpecificTables() {
  return Object.values(ALL_TABLES).filter((t) => !t.id.startsWith("8-1/"));
}

export function isValidQuantity(q) {
  return Number.isInteger(q) && q >= 1 && q <= MAX_QUANTITY;
}

function checkQuantity(row) {
  const q = row.quantity;
  if (!isValidQuantity(q)) throw new RangeError(`Quantidade inválida: ${q} (de 1 a ${MAX_QUANTITY})`);
}

function startRow(row) {
  if (row.tableId !== undefined) {
    return { label: tableLabel(row.tableId), start: () => [startTable(row.tableId)] };
  }
  const columns = COLUMN_SETS[row.columns];
  if (!columns) throw new RangeError(`Colunas inválidas: ${row.columns}`);
  if (!MODES.includes(row.mode)) throw new RangeError(`Tipo de tesouro inválido: ${row.mode}`);
  if (!CHALLENGE_RATINGS.includes(String(row.challengeRating))) throw new RangeError(`ND inválido: ${row.challengeRating}`);
  if (row.mode === "metade" && row.columns === "items") throw new RangeError("Metade não vale para a coluna Itens.");
  const column = row.columns === "both" ? "" : `, ${COLUMN_LABELS[row.columns]}`;
  const label = `ND ${challengeRatingLabel(String(row.challengeRating))}, ${MODE_LABELS[row.mode]}${column}`;
  return { label, start: () => columns.flatMap((column) => startTreasure({ challengeRating: row.challengeRating, column, mode: row.mode })) };
}

// Linhas de cristais ({ kind: "crystals", challengeRating, color, quantity }) não são roladas:
// ficam fora de buildBatch/rollBatch e viram linhas de valor em crystalLinesOf.
const isCrystalRow = (row) => row.kind === "crystals";

export function crystalLinesOf(rows) {
  return rows.filter(isCrystalRow).map((row) => {
    checkQuantity(row);
    if (!CHALLENGE_RATINGS.includes(String(row.challengeRating))) throw new RangeError(`ND inválido: ${row.challengeRating}`);
    if (!CRYSTAL_COLORS[row.color]) throw new RangeError(`Cor de cristal inválida: ${row.color}`);
    return crystalLine({ challenge: row.challengeRating, color: row.color, quantity: row.quantity });
  });
}

export function buildBatch(rows) {
  let index = 0;
  crystalLinesOf(rows);
  return rows.filter((row) => !isCrystalRow(row)).map((row) => {
    checkQuantity(row);
    if (row.tableId !== undefined && !ALL_TABLES[row.tableId]) throw new RangeError(`Tabela inexistente: ${row.tableId}`);
    const { label, start } = startRow(row);
    const treasures = Array.from({ length: row.quantity }, () => ({ index: ++index, label, states: start() }));
    return { row, label, treasures };
  });
}

export function rollBatch(rows, rng) {
  return buildBatch(rows).map((group) => ({
    ...group,
    treasures: group.treasures.map((t) => ({ ...t, states: t.states.map((s) => resolveWithDice(s, rng)) })),
  }));
}
