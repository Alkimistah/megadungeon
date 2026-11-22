// CSV no padrão do Excel em pt-BR: BOM UTF-8, separador ";", aspas duplas e quebra CRLF.
// writeCsv(rows, file, columns?) grava uma lista de objetos; readCsv(file) devolve a mesma lista.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SEP = ";";
const BOM = "﻿";

function quote(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[;"\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function writeCsv(rows, file, columns = Object.keys(rows[0] ?? {})) {
  const lines = [columns.map(quote).join(SEP), ...rows.map((row) => columns.map((col) => quote(row[col])).join(SEP))];
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, BOM + lines.join("\r\n") + "\r\n", "utf8");
}

export function parseCsv(content) {
  const text = content.startsWith(BOM) ? content.slice(1) : content;
  const records = [];
  let record = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === SEP) { record.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      record.push(field); records.push(record); record = []; field = "";
    } else field += ch;
  }
  if (field !== "" || record.length) { record.push(field); records.push(record); }

  const [header = [], ...body] = records.filter((r) => !(r.length === 1 && r[0] === ""));
  return body.map((r) => Object.fromEntries(header.map((col, i) => [col, r[i] ?? ""])));
}

export function readCsv(file) {
  return parseCsv(readFileSync(file, "utf8"));
}
