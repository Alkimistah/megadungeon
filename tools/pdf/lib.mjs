// Abre um livro de tmp/livros/ e lê páginas do PDF. Aceita caminho completo ou um trecho do nome do arquivo.
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const BOOKS_DIR = resolve(import.meta.dirname, "../../tmp/livros");

export function findBook(query) {
  if (query.endsWith(".pdf") && query.includes("/")) return query;
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const match = readdirSync(BOOKS_DIR).filter((f) => f.endsWith(".pdf")).find((f) => norm(f).includes(norm(query)));
  if (!match) throw new Error(`Livro não encontrado em ${BOOKS_DIR}: ${query}`);
  return resolve(BOOKS_DIR, match);
}

export async function openBook(query) {
  const data = new Uint8Array(readFileSync(findBook(query)));
  return getDocument({ data, verbosity: 0 }).promise;
}

// Texto da página separado em colunas pela posição horizontal (os livros usam duas colunas).
export async function pageText(doc, pageNumber, columns = 2) {
  const page = await doc.getPage(pageNumber);
  const { items } = await page.getTextContent();
  const width = page.view[2];
  const cols = Array.from({ length: columns }, () => []);
  for (const item of items) {
    const col = Math.min(columns - 1, Math.floor((item.transform[4] / width) * columns));
    cols[col].push(item);
  }
  return cols.map((list) => {
    list.sort((a, b) => b.transform[5] - a.transform[5] || a.transform[4] - b.transform[4]);
    let out = "", lastY = null;
    for (const it of list) {
      const y = Math.round(it.transform[5]);
      if (lastY !== null && Math.abs(y - lastY) > 2) out += "\n";
      else if (lastY !== null) out += " ";
      out += it.str;
      lastY = y;
    }
    return out.replace(/ +/g, " ").trim();
  });
}
