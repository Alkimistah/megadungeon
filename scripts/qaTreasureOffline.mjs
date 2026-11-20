import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

// Roteiro offline: a modal de tesouros precisa abrir sem rede depois de uma recarga, ou seja,
// com o HTML, os assets e o chunk da modal vindos do cache do service worker.
// Roda contra o build de produção (vite preview), onde o service worker se comporta como em produção.
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

  // 1) Carga online: o service worker precisa assumir a página e o cache se formar.
  await page.goto(url);
  await passRangeDialog(page);
  await swControls(page).catch(async () => {
    // Na primeira visita o service worker registra sem controlar a página: uma recarga online dá o controle.
    await page.reload();
    await passRangeDialog(page);
    await swControls(page);
  });
  // Espera o pré-carregamento em tempo ocioso e a gravação do cache.
  await page.waitForTimeout(3000);

  // 2) Sem rede, recarrega: tudo precisa vir do cache do service worker.
  await context.setOffline(true);
  await page.reload();
  // O diálogo de faixa pode voltar na recarga; ele é opcional, então a espera curta é intencional.
  const rangeReappeared = await page.locator("#rangeDialog[open]").waitFor({ timeout: 4000 }).then(() => true, () => false);
  if (rangeReappeared) await passRangeDialog(page);
  await swControls(page);
  assert.equal(await page.evaluate(() => Boolean(navigator.serviceWorker.controller)), true, "service worker não controla a página offline");

  // 3) Abre a modal de tesouros offline.
  await page.evaluate(() => {
    document.querySelectorAll("dialog[open]").forEach(d => d.close());
    document.getElementById("treasureButton").click();
  });
  await page.locator("#treasureDialog[open]").waitFor({ timeout: 5000 });
  await page.locator("#treasureDialog button", { hasText: "Rolar tudo" }).first().waitFor({ timeout: 5000 });
  assert.equal(await page.locator("#treasureDialog").evaluate(d => d.open), true, "#treasureDialog não abriu");
  assert.equal(await page.locator("#treasureDialog button", { hasText: "Rolar tudo" }).count() >= 1, true, "botão Rolar tudo ausente");
  assert.deepEqual(errors, [], "erros de JavaScript na página");

  console.log(`OK offline: recarga sem rede, modal de tesouros abriu (service worker controlando: sim, recarga online antes do offline: ${rangeReappeared ? "faixa reapareceu e foi confirmada" : "sem faixa na recarga"}). pageerrors: 0`);
} catch (error) {
  console.error("FALHA offline:", error.message);
  if (errors.length) console.error("pageerrors:", errors);
  process.exitCode = 1;
} finally {
  await browser.close();
}
