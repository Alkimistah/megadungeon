import { mkdir } from "node:fs/promises";

import { chromium } from "@playwright/test";

const APP_URL = process.env.QA_APP_URL || "http://localhost:5173/megadungeon/";
const SHOT_DIR = ".playwright-mcp/tela-inicial";
const VIEWPORTS = [
  { width: 1024, height: 768, tag: "paisagem" },
  { width: 768, height: 1024, tag: "retrato" }
];
const RANGES = [
  { id: "dungeon-1-10", name: "Masmorra", floors: "Andares 1–10", tagline: "Grande labirinto de corredores e salas", action: "rgb(91, 71, 50)", unknownPaths: false },
  { id: "forest-11-20", name: "Floresta", floors: "Andares 11–20", tagline: "Exploração em florestas, pântanos e colinas", action: "rgb(47, 107, 68)", unknownPaths: true },
  { id: "archipelago-21-30", name: "Arquipélago", floors: "Andares 21–30", tagline: "Reúna os fragmentos e explore o arquipélago", action: "rgb(47, 111, 115)", unknownPaths: false }
];
const HOME_BG = "rgb(19, 16, 13)";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const text = (page, selector) => page.locator(selector).innerText().then((value) => value.replace(/\s+/g, " ").trim());

async function openHome(browser, viewport) {
  const context = await browser.newContext({ viewport, serviceWorkers: "block" });
  const page = await context.newPage();
  page.on("pageerror", (error) => { throw error; });
  await page.goto(APP_URL);
  await page.locator("#rangeDialog[open]").waitFor();
  return page;
}

async function checkStructure(page) {
  assert((await text(page, "#rangeDialog h1")) === "Mega Dungeon de Práxis", "titulo incorreto");
  assert((await text(page, "#rangeDialog .home-subtitle")) === "Gerador de aventuras para Tormenta20", "subtitulo incorreto");
  assert((await page.locator("#seedInput").count()) === 0, "#seedInput deveria ter sido removido");
  assert((await page.locator("#floorRangeInput").count()) === 0, "#floorRangeInput deveria ter sido removido");
  assert((await page.locator("#rangeDialog select").count()) === 0, "nao deve haver select na tela inicial");
  assert((await page.locator("button.range-card").count()) === 3, "esperados tres cartoes");
  for (const range of RANGES) {
    const card = page.locator(`button.range-card[data-range="${range.id}"]`);
    const content = (await card.innerText()).replace(/\s+/g, " ");
    for (const part of [range.name, range.floors, range.tagline]) {
      assert(content.includes(part), `cartao ${range.id} sem "${part}": ${content}`);
    }
  }
  assert((await text(page, "#initialUnknownPathsField")).includes("A rota de cada andar se revela conforme o grupo avança."), "explicacao do interruptor ausente");
  // As ferramentas rapidas ficam ocultas ate a Tarefa 4 ligar os botoes.
  assert((await page.locator("#quickTreasure").count()) === 1 && (await page.locator("#quickEncounter").count()) === 1, "marcacao das ferramentas rapidas ausente");
  assert(!(await page.locator("#quickTreasure").isVisible()) && !(await page.locator("#quickEncounter").isVisible()), "ferramentas rapidas deveriam estar ocultas");
  assert((await text(page, "#importSessionFile")).includes("Importar arquivo de sessão"), "botao de importar ausente");
}

async function checkSelection(page) {
  for (const range of RANGES) {
    await page.locator(`button.range-card[data-range="${range.id}"]`).click();
    for (const other of RANGES) {
      const pressed = await page.locator(`button.range-card[data-range="${other.id}"]`).getAttribute("aria-pressed");
      assert(pressed === String(other.id === range.id), `aria-pressed de ${other.id} com ${range.id} escolhida: ${pressed}`);
    }
    const start = page.locator("#rangeConfirm");
    assert((await start.innerText()).trim() === `Iniciar ${range.name.toLowerCase()} ›`, `texto do botao iniciar para ${range.id}`);
    const bg = await start.evaluate((el) => getComputedStyle(el).backgroundColor);
    assert(bg === range.action, `cor do botao iniciar para ${range.id}: ${bg} != ${range.action}`);
    const visible = await page.locator("#initialUnknownPathsField").isVisible();
    assert(visible === range.unknownPaths, `interruptor visivel=${visible} em ${range.id}`);
    const dialogBg = await page.locator("#rangeDialog").evaluate((el) => getComputedStyle(el).backgroundColor);
    assert(dialogBg === HOME_BG, `fundo da tela inicial com ${range.id}: ${dialogBg}`);
  }
}

async function shot(page, viewport, name) {
  await page.screenshot({ path: `${SHOT_DIR}/final-${name}-${viewport.tag}.png` });
}

await mkdir(SHOT_DIR, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
try {
  for (const viewport of VIEWPORTS) {
    // Sem expedicao salva.
    const page = await openHome(browser, viewport);
    assert(await page.locator("#resumeExpedition").isHidden(), "Continuar deveria estar oculto sem expedicao salva");
    assert((await page.locator('button.range-card[data-range="dungeon-1-10"]').getAttribute("aria-pressed")) === "true", "Masmorra deveria vir escolhida");
    await checkStructure(page);
    await shot(page, viewport, "masmorra-sem-continuar");
    await checkSelection(page);

    // Inicia a Floresta e recarrega: a expedicao salva aparece no Continuar.
    await page.locator('button.range-card[data-range="forest-11-20"]').click();
    await page.locator("#rangeConfirm").click();
    await page.locator("#missionDialog").waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Continuar sem missões" }).click();
    await page.locator("#missionDialog").waitFor({ state: "hidden" });
    await page.waitForTimeout(500);
    await page.reload();
    await page.locator("#rangeDialog[open]").waitFor();
    await page.locator("#resumeExpedition").waitFor({ state: "visible" });
    const resume = await text(page, "#resumeExpedition");
    assert(/Continuar expedição/.test(resume) && resume.includes("Floresta · Andares 11–20 · parado no Andar 11") && resume.includes("Continuar ›"), `texto do Continuar: ${resume}`);
    assert((await page.locator('button.range-card[data-range="forest-11-20"]').getAttribute("aria-pressed")) === "true", "cartao da faixa salva deveria vir escolhido");
    const dialogBg = await page.locator("#rangeDialog").evaluate((el) => getComputedStyle(el).backgroundColor);
    assert(dialogBg === HOME_BG, `fundo apos usar a 11-20 e recarregar: ${dialogBg}`);
    await shot(page, viewport, "floresta-com-continuar");
    await page.locator("#resumeExpedition").click();
    await page.locator("#rangeDialog").waitFor({ state: "hidden" });
    await page.context().close();
    console.log(`ok tela inicial ${viewport.tag}`);
  }
  console.log("qa:home passou");
} finally {
  await browser.close();
}
