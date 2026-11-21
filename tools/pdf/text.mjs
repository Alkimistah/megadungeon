// Uso: node text.mjs <livro> <página PDF inicial> [final] [colunas=2]
import { openBook, pageText } from "./lib.mjs";
const [book, from, to = from, columns = 2] = process.argv.slice(2);
if (!book || !from) { console.error("uso: node text.mjs <livro> <pág. inicial> [final] [colunas]"); process.exit(1); }
const doc = await openBook(book);
for (let p = Number(from); p <= Number(to); p++) {
  const cols = await pageText(doc, p, Number(columns));
  console.log(`\n=== PDF ${p} ===`);
  cols.forEach((c, i) => console.log(`--- coluna ${i + 1} ---\n${c}`));
}
