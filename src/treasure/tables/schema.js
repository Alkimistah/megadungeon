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

// ---------- Listas de itens (Ameaças, Heróis, Deuses) ----------
// ListTable = { id, title, label, book, bookPage, pdfPage, kind: "list", category, tier?, items }
// item      = { name, price?, category, tier? }; `price` é número, ou o texto impresso ("—", "+T$ 300").
export const LIST_TIERS = Object.freeze(["menor", "médio", "maior"]);

// "1d<n>": o valor v (1..n) escolhe o v-ésimo item.
export function listDie(n) {
  if (!Number.isInteger(n) || n < 1) throw new RangeError(`Tamanho de lista inválido: ${n}`);
  return `1d${n}`;
}

// Preço impresso: "1.500" vira 1500; o que não for número ("—", "+T$ 300") fica como texto.
export function parsePrice(text) {
  return /^\d{1,3}(\.\d{3})*$|^\d+$/.test(text) ? Number(text.replaceAll(".", "")) : text;
}

export function validateListTable(list) {
  const errors = [];
  const id = list?.id ?? "(sem id)";
  if (list?.kind !== "list") return [`${id}: kind deve ser "list"`];
  for (const field of ["title", "label", "book", "bookPage", "pdfPage", "category"]) {
    if (list[field] === undefined || list[field] === "") errors.push(`${id}: campo ausente "${field}"`);
  }
  if (list.tier !== undefined && !LIST_TIERS.includes(list.tier)) errors.push(`${id}: categoria inválida "${list.tier}"`);
  if (!Array.isArray(list.items) || list.items.length === 0) return [...errors, `${id}: sem itens`];
  list.items.forEach((item, i) => {
    const where = `${id}: item ${i + 1}`;
    if (!item.name) errors.push(`${where}: sem nome`);
    if (!item.category) errors.push(`${where}: sem categoria`);
    if (item.price !== undefined && typeof item.price !== "number" && typeof item.price !== "string") errors.push(`${where}: preço inválido`);
    if (item.tier !== list.tier) errors.push(`${where}: categoria mágica diferente da lista`);
  });
  return errors;
}

// Monta uma lista a partir do texto impresso: uma linha por item, "Nome|preço" (preço opcional).
// `category` pode ser função do nome (listas mistas de armaduras e escudos).
// `armor(name)` dá "leve" ou "pesada" quando a tabela impressa separa as armaduras assim.
export function listTable({ id, title, label, book, bookPage, pdfPage, category, tier, text, appliesTo, armor }) {
  const items = text.trim().split("\n").map((line) => {
    const [name, price] = line.split("|");
    const cat = typeof category === "function" ? category(name) : category;
    return {
      name,
      ...(price !== undefined ? { price: parsePrice(price) } : {}),
      category: cat,
      ...(tier ? { tier } : {}),
      ...(appliesTo ? { appliesTo: [...appliesTo[name]] } : {}),
      ...(armor && cat === "armadura" ? { armor: armor(name) } : {}),
    };
  });
  const list = {
    id, title, label, book, bookPage, pdfPage, kind: "list",
    category: typeof category === "function" ? "armadura" : category,
    ...(tier ? { tier } : {}), items,
  };
  const errors = validateListTable(list);
  if (errors.length) throw new Error(errors.join("; "));
  return list;
}
