import { mkdir } from "node:fs/promises";

import { chromium } from "@playwright/test";

const APP_URL = process.env.QA_APP_URL || "http://localhost:5173/megadungeon/";
const SHOT_DIR = ".playwright-mcp/rodape";
const VIEWPORTS = [
  { width: 1024, height: 768 },
  { width: 768, height: 1024 }
];

// Unico ponto que escolhe a faixa e abre a tela principal.
async function startRange(page) {
  await page.goto(APP_URL);
  await page.locator("#floorRangeInput").selectOption("dungeon-1-10");
  await page.locator("#rangeConfirm").click();
  await page.locator("#missionDialog").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Continuar sem missões" }).click();
  await page.locator("#missionDialog").waitFor({ state: "hidden" });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function checkFooter(page, viewport) {
  const tag = `${viewport.width}x${viewport.height}`;
  const names = await page.locator(".floating-tools button span").allTextContents();
  assert(
    JSON.stringify(names.map((n) => n.trim())) === JSON.stringify(["Recarregar", "Encontro", "Missões", "Tesouros"]),
    `[${tag}] nomes dos botoes inesperados: ${JSON.stringify(names)}`
  );

  await page.evaluate(() => {
    const container = document.getElementById("container");
    container.scrollTop = container.scrollHeight;
    window.scrollTo(0, document.documentElement.scrollHeight);
  });

  const data = await page.evaluate(() => {
    const footer = document.querySelector(".floating-tools");
    const style = getComputedStyle(footer);
    const rect = footer.getBoundingClientRect();
    const container = document.getElementById("container");
    const blocks = [...container.children].filter((el) => el.getBoundingClientRect().height > 0);
    const last = blocks[blocks.length - 1];
    const lastBottom = last ? last.getBoundingClientRect().bottom : 0;
    const buttons = [...footer.querySelectorAll("button")].map((b) => b.getBoundingClientRect().top);
    const tracker = document.getElementById("timeTracker").getBoundingClientRect();
    return {
      position: style.position,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      top: rect.top,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      lastBottom,
      buttons,
      trackerInside: footer.contains(document.getElementById("timeTracker")),
      trackerTop: tracker.top,
      trackerHeight: tracker.height,
      buttonHeights: [...footer.querySelectorAll("button")].map((b) => b.getBoundingClientRect().height)
    };
  });

  assert(data.position === "fixed", `[${tag}] rodape nao e fixed: ${data.position}`);
  assert(Math.abs(data.bottom - data.viewportHeight) <= 1, `[${tag}] rodape nao encosta embaixo: ${data.bottom}`);
  assert(Math.abs(data.width - data.viewportWidth) <= 1 && Math.abs(data.left) <= 1, `[${tag}] rodape sem largura total: ${data.width}`);
  assert(data.lastBottom <= data.top + 1, `[${tag}] conteudo (${data.lastBottom}) passa do topo do rodape (${data.top})`);
  assert(data.trackerInside, `[${tag}] #timeTracker fora do rodape`);
  // mesma linha: centros verticais alinhados (tolerancia de 2px)
  const centers = data.buttons.map((t, i) => t + data.buttonHeights[i] / 2);
  centers.push(data.trackerTop + data.trackerHeight / 2);
  assert(Math.max(...centers) - Math.min(...centers) <= 2, `[${tag}] itens fora da mesma linha: ${centers}`);
  const tops = [...data.buttons, data.trackerTop];
  assert(Math.max(...tops) - Math.min(...tops) <= 2, `[${tag}] tops diferentes: ${tops}`);

  await page.screenshot({ path: `${SHOT_DIR}/rodape-${tag}.png` });
  console.log(`ok ${tag}`);
}

async function checkNarrow(page) {
  await page.setViewportSize({ width: 480, height: 800 });
  const visible = await page.locator(".floating-tools button span").evaluateAll((els) => els.map((e) => getComputedStyle(e).display !== "none" && e.getBoundingClientRect().width > 0));
  assert(visible.every((v) => !v), "nomes deveriam sumir abaixo de 560px");
  const labels = await page.locator(".floating-tools button").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label")));
  assert(labels.every(Boolean), "aria-label ausente");
  console.log("ok 480 sem nomes");
}

await mkdir(SHOT_DIR, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
try {
  for (const viewport of VIEWPORTS) {
    const page = await browser.newPage({ viewport });
    await startRange(page);
    await checkFooter(page, viewport);
    if (viewport.width === 1024) await checkNarrow(page);
    await page.close();
  }
  console.log("qa:layout passou");
} finally {
  await browser.close();
}
