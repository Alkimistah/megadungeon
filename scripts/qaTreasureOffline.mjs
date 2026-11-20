import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

// Roteiro offline: a modal de tesouros precisa abrir sem rede depois da carga e do pré-carregamento.
// Roda contra o build de produção (vite preview), onde o service worker se comporta como em produção.
const url = process.env.QA_APP_URL || "http://localhost:4174/megadungeon/";
const browser = await chromium.launch({ headless: true, executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const errors = [];
try {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(error.message));

  await page.goto(url);
  await page.locator("#rangeDialog[open]").waitFor();
  await page.locator("#rangeConfirm").click();
  await page.locator("#rangeDialog").waitFor({ state: "hidden" });

  // Na primeira carga o service worker registra mas ainda não controla a página: uma recarga dá o controle.
  await page.waitForTimeout(3000);
  const controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
  let reloaded = false;
  if (!controlled) {
    reloaded = true;
    await page.reload();
    await page.locator("#rangeDialog[open]").waitFor();
    await page.locator("#rangeConfirm").click();
    await page.locator("#rangeDialog").waitFor({ state: "hidden" });
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), null, { timeout: 10000 });
  }
  // Espera o pré-carregamento em tempo ocioso e o cache do service worker.
  await page.waitForTimeout(3000);

  const swControlling = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
  await context.setOffline(true);
  await page.locator("#missionDialog[open]").waitFor({ timeout: 20000 }).catch(() => {});
  await page.evaluate(() => {
    document.querySelectorAll("dialog[open]").forEach(d => d.close());
    document.getElementById("treasureButton").click();
  });
  await page.locator("#treasureDialog[open]").waitFor({ timeout: 5000 });
  await page.locator("#treasureDialog button", { hasText: "Rolar tudo" }).first().waitFor({ timeout: 5000 });
  assert.equal(await page.locator("#treasureDialog").evaluate(d => d.open), true);
  assert.equal(await page.locator("#treasureDialog button", { hasText: "Rolar tudo" }).count() >= 1, true, "botão Rolar tudo ausente");
  assert.deepEqual(errors, [], "erros de JavaScript na página");

  console.log(`OK offline: modal de tesouros abriu sem rede (service worker controlando: ${swControlling ? "sim" : "não"}, recarga antes do offline: ${reloaded ? "sim" : "não"}). pageerrors: 0`);
} catch (error) {
  console.error("FALHA offline:", error.message);
  if (errors.length) console.error("pageerrors:", errors);
  process.exitCode = 1;
} finally {
  await browser.close();
}
