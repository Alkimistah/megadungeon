// Lote de tesouros da aba Rolar. Funções puras: montam e resolvem as cadeias de cada linha.
//
// Linha de entrada: { challengeRating, quantity, mode, columns: "both"|"items"|"money" }
//                ou { tableId, quantity }.
// BatchRow = { row, treasures: [{ index, label, states: State[] }] }; `index` é global (1, 2, 3...).
import { CHALLENGE_RATINGS, MODES, challengeRatingLabel, startTreasure, startTable, resolveWithDice } from "./treasureEngine.js";
import { BASIC_BOOK_TABLES } from "./tables/basicBook.js";

export const MAX_QUANTITY = 99;
const COLUMN_SETS = { both: ["money", "items"], money: ["money"], items: ["items"] };
export const MODE_LABELS = { padrão: "Padrão", metade: "Metade", dobro: "Dobro" };

// Tabelas escolhíveis em "Tabela específica". A Task 10 aponta isto para ALL_TABLES.
export function listSpecificTables() {
  return Object.values(BASIC_BOOK_TABLES).filter((t) => !t.id.startsWith("8-1/"));
}

function checkQuantity(row) {
  const q = row.quantity;
  if (!Number.isInteger(q) || q < 1 || q > MAX_QUANTITY) throw new RangeError(`Quantidade inválida: ${q} (de 1 a ${MAX_QUANTITY})`);
}

function startRow(row) {
  if (row.tableId !== undefined) {
    return { label: `Tabela ${row.tableId}`, start: () => [startTable(row.tableId)] };
  }
  const columns = COLUMN_SETS[row.columns];
  if (!columns) throw new RangeError(`Colunas inválidas: ${row.columns}`);
  if (!MODES.includes(row.mode)) throw new RangeError(`Tipo de tesouro inválido: ${row.mode}`);
  if (!CHALLENGE_RATINGS.includes(String(row.challengeRating))) throw new RangeError(`ND inválido: ${row.challengeRating}`);
  if (row.mode === "metade" && row.columns === "items") throw new RangeError("Metade não vale para a coluna Itens.");
  const label = `ND ${challengeRatingLabel(String(row.challengeRating))}, ${MODE_LABELS[row.mode]}`;
  return { label, start: () => columns.flatMap((column) => startTreasure({ challengeRating: row.challengeRating, column, mode: row.mode })) };
}

export function buildBatch(rows) {
  let index = 0;
  return rows.map((row) => {
    checkQuantity(row);
    if (row.tableId !== undefined && !BASIC_BOOK_TABLES[row.tableId]) throw new RangeError(`Tabela inexistente: ${row.tableId}`);
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
