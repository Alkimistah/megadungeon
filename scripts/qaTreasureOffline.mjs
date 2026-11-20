import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

// Roteiro offline: a modal de tesouros precisa abrir sem rede depois de uma recarga.
// Segue o contrato offline de scripts/qaForestMvp.mjs (offlineFlow): controle do service worker, recarga online
// para os assets passarem pelo SW, recarga sem rede. Roda contra o build de produção (vite preview).
const url = process.env.QA_APP_URL || "http://localhost:4174/megadungeon/";
const browser = await chromium.launch({ headless: true, executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const errors = [];

const passRangeDialog = async page => {
  await page.locator("#rangeDialog[open]").waitFor();
  await page.locator("#rangeConfirm").click();
  await page.locator("#rangeDialog").waitFor({ state: "hidden" });
};
const swControls = page => page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), null, { timeout: 10000 });

try {
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(error.message));

  // 1) goto, controle do service worker e recarga online (contrato de qaForestMvp.offlineFlow).
  await page.goto(url);
  await passRangeDialog(page);
  await swControls(page);
  await page.reload();
  const reloadRange = await page.locator("#rangeDialog[open]").waitFor({ timeout: 4000 }).then(() => true, () => false);
  if (reloadRange) await passRangeDialog(page);
  await page.waitForFunction(async () => {
    const cache = await caches.open("mega-dungeon-v3");
    const urls = (await cache.keys()).map(request => request.url);
    return urls.some(u => /\/assets\/.*\.js$/.test(u)) && urls.some(u => /\/assets\/.*\.css$/.test(u));
  }, null, { timeout: 10000 });
  // 2) Espera o pré-carregamento em tempo ocioso do chunk da modal (sem espera fixa).
  await page.waitForFunction(() => performance.getEntriesByType("resource").some(e => e.name.includes("treasureDialog")), null, { timeout: 10000 });

  // 3) Sem rede, recarrega: HTML, assets e chunk da modal precisam vir do cache do service worker.
  await context.setOffline(true);
  await page.reload();
  const offlineRange = await page.locator("#rangeDialog[open]").waitFor({ timeout: 4000 }).then(() => true, () => false);
  if (offlineRange) await passRangeDialog(page);
  await swControls(page);
  assert.equal(await page.evaluate(() => Boolean(navigator.serviceWorker.controller)), true, "service worker não controla a página offline");

  // 4) Abre a modal de tesouros offline.
  await page.evaluate(() => {
    document.querySelectorAll("dialog[open]").forEach(d => d.close());
    document.getElementById("treasureButton").click();
  });
  await page.locator("#treasureDialog[open]").waitFor({ timeout: 5000 });
  await page.locator("#treasureDialog button", { hasText: "Rolar tudo" }).first().waitFor({ timeout: 5000 });
  assert.equal(await page.locator("#treasureDialog").evaluate(d => d.open), true, "#treasureDialog não abriu");
  assert.equal(await page.locator("#treasureDialog button", { hasText: "Rolar tudo" }).count() >= 1, true, "botão Rolar tudo ausente");
  await page.evaluate(() => document.querySelector("#treasureDialog .treasure-roll").click());
  await page.locator("#treasureDialog .treasure-result").first().waitFor({ timeout: 5000 });
  assert.equal(await page.locator("#treasureDialog .treasure-result").count() >= 1, true, "Rolar tudo offline não gerou resultado");
  assert.deepEqual(errors, [], "erros de JavaScript na página");

  console.log(`OK offline: recarga sem rede, modal de tesouros abriu (service worker controlando: sim; faixa na recarga online: ${reloadRange ? "sim" : "não"}; faixa na recarga offline: ${offlineRange ? "sim" : "não"}). pageerrors: 0`);
} catch (error) {
  console.error("FALHA offline:", error.message);
  if (errors.length) console.error("pageerrors:", errors);
  process.exitCode = 1;
} finally {
  await browser.close();
}
