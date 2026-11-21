// Uso: node render.mjs <livro> <página inicial> [final] [pasta de saída] [escala=1.5]
// Gera PNG de cada página para conferir tabelas e diagramação à vista.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { openBook } from "./lib.mjs";
const [book, from, to = from, out = resolve(import.meta.dirname, "out"), scale = 1.5] = process.argv.slice(2);
if (!book || !from) { console.error("uso: node render.mjs <livro> <pág. inicial> [final] [saída] [escala]"); process.exit(1); }
mkdirSync(out, { recursive: true });
const doc = await openBook(book);
for (let p = Number(from); p <= Number(to); p++) {
  const page = await doc.getPage(p);
  const viewport = page.getViewport({ scale: Number(scale) });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
  const file = resolve(out, `${p}.png`);
  writeFileSync(file, canvas.toBuffer("image/png"));
  console.log(file);
}
