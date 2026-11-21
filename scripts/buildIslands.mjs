import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(ROOT, "assets-src/islands");
const OUTPUT_DIR = path.join(ROOT, "public/assets/icons/islands");
const WIDTH = 512;
const QUALITY = 0.82;
const CHROME_PATH = process.env.CHROME_PATH || "/usr/bin/google-chrome";

const formatKb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function main() {
  const files = (await readdir(SOURCE_DIR)).filter((file) => file.endsWith(".svg")).sort();
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME_PATH, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  let totalOld = 0;
  let totalNew = 0;

  try {
    for (const file of files) {
      const svg = await readFile(path.join(SOURCE_DIR, file));
      const dataUrl = await page.evaluate(async ({ svgText, width, quality }) => {
        const img = new Image();
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = Math.round(width * img.naturalHeight / img.naturalWidth);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/webp", quality);
      }, { svgText: svg.toString("utf8"), width: WIDTH, quality: QUALITY });

      if (!dataUrl.startsWith("data:image/webp")) throw new Error(`${file}: o navegador não exportou WebP.`);

      const outName = file.replace(/\.svg$/, ".webp");
      const webp = Buffer.from(dataUrl.split(",")[1], "base64");
      await writeFile(path.join(OUTPUT_DIR, outName), webp);

      const oldSize = (await stat(path.join(SOURCE_DIR, file))).size;
      totalOld += oldSize;
      totalNew += webp.length;
      console.log(`${file}: ${formatKb(oldSize)} -> ${outName}: ${formatKb(webp.length)}`);
    }
  } finally {
    await browser.close();
  }

  console.log(`Total: ${formatKb(totalOld)} -> ${formatKb(totalNew)} (${files.length} ilhas)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
