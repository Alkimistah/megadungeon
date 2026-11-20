// Esquema das tabelas de tesouro. Resultados são dados simples, sem funções.
export const RESULT_KINDS = Object.freeze([
  "none", "money", "wealth", "diverse", "equipment", "potion", "superior",
  "magic", "item", "wealthValue", "enchantment", "improvement",
]);

const DICE = { "d%": 100, "1d6": 6 };

export function validateTable(table) {
  const errors = [];
  const id = table?.id ?? "(sem id)";
  const size = DICE[table?.die];
  if (!size) return [`${id}: dado inválido "${table?.die}"`];
  for (const field of ["title", "book", "bookPage", "pdfPage"]) {
    if (table[field] === undefined || table[field] === "") errors.push(`${id}: campo ausente "${field}"`);
  }
  if (!Array.isArray(table.rows) || table.rows.length === 0) return [...errors, `${id}: sem linhas`];
  const rows = [...table.rows].sort((a, b) => a.min - b.min);
  let expected = 1;
  for (const row of rows) {
    if (!Number.isInteger(row.min) || !Number.isInteger(row.max) || row.min > row.max) {
      errors.push(`${id}: faixa inválida ${row.min}-${row.max}`);
      continue;
    }
    if (row.min > expected) errors.push(`${id}: lacuna de ${expected} a ${row.min - 1}`);
    else if (row.min < expected) errors.push(`${id}: sobreposição a partir de ${row.min}`);
    expected = Math.max(expected, row.max + 1);
    if (!row.result || !RESULT_KINDS.includes(row.result.kind)) {
      errors.push(`${id}: kind inválido na faixa ${row.min}-${row.max}`);
    }
  }
  if (expected !== size + 1) errors.push(`${id}: faixas terminam em ${expected - 1}, esperado ${size}`);
  return errors;
}
