// Uso: node find.mjs <livro> "<termo>" [máx. resultados=40] — lista as páginas PDF onde o termo aparece.
import { openBook, pageText } from "./lib.mjs";
const [book, term, max = 40] = process.argv.slice(2);
if (!book || !term) { console.error('uso: node find.mjs <livro> "<termo>" [máx]'); process.exit(1); }
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const needle = norm(term);
const doc = await openBook(book);
let found = 0;
for (let p = 1; p <= doc.numPages && found < Number(max); p++) {
  const text = (await pageText(doc, p, 1))[0];
  const idx = norm(text).indexOf(needle);
  if (idx >= 0) { found++; console.log(`PDF ${p}: …${text.slice(Math.max(0, idx - 60), idx + 80).replace(/\n/g, " ")}…`); }
}
console.log(`${found} página(s) com "${term}" (${doc.numPages} páginas no PDF).`);
