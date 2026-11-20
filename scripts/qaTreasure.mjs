import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const url = process.env.QA_APP_URL || "http://localhost:5173/megadungeon/";
const browser = await chromium.launch({ headless: true, executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 }, serviceWorkers: "block" });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url);
  await page.locator("#rangeDialog[open]").waitFor();
  await page.locator("#rangeConfirm").click();
  await page.locator("#rangeDialog").waitFor({ state: "hidden" });

  const closeAndClick = () => page.evaluate(() => {
    document.querySelectorAll("dialog[open]").forEach(d => d.close());
    document.getElementById("treasureButton")?.click();
  });
  assert.equal(await page.locator("#treasureButton").count(), 1, "botão #treasureButton ausente");
  // A seleção de missões abre sozinha depois do intervalo; espera por ela para não cobrir a modal.
  await page.locator("#missionDialog[open]").waitFor({ timeout: 20000 }).catch(() => {});
  await closeAndClick();
  await page.locator("#treasureDialog[open]").waitFor({ timeout: 5000 });

  const tabs = page.locator("#treasureDialog [role=tab]");
  assert.deepEqual(await tabs.allInnerTexts(), ["Rolar", "Consultar"]);
  const panels = page.locator("#treasureDialog [role=tabpanel]");
  assert.equal(await panels.count(), 2);
  assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "true");
  assert.equal(await panels.nth(0).isVisible(), true);
  assert.equal(await panels.nth(1).isVisible(), false);

  // A seleção de missões reabre sozinha ao fechar e pode ficar por cima: reabre a modal de tesouros no topo.
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const d = document.getElementById("treasureDialog");
    d.close();
    d.showModal();
  });
  assert.equal(await page.locator("#treasureDialog").evaluate(d => d.open), true);
  // Aba Rolar: lote do spec (ND 1/4: 3 Padrão + 5 Metade; ND 3: 2 Padrão + 1 Só Item).
  const rowsLoc = page.locator("#treasureDialog .treasure-input-row");
  assert.equal(await rowsLoc.count(), 1, "deve começar com uma linha");
  for (let i = 0; i < 3; i++) await page.locator("#treasureDialog .treasure-add").click();
  assert.equal(await rowsLoc.count(), 4);
  const fill = async (i, nd, qty, mode, columns) => {
    const r = rowsLoc.nth(i);
    await r.locator(".treasure-f-nd").selectOption(nd);
    await r.locator(".treasure-f-qty").fill(String(qty));
    await r.locator(".treasure-f-columns").selectOption(columns);
    await r.locator(".treasure-f-mode").selectOption(mode);
  };
  await fill(0, "0.25", 3, "padrão", "both");
  await fill(1, "0.25", 5, "metade", "both");
  await fill(2, "3", 2, "padrão", "both");
  await fill(3, "3", 1, "padrão", "items");
  // Metade fica desativado em "Só Item".
  assert.equal(await rowsLoc.nth(3).locator(".treasure-f-mode").evaluate(s => s.querySelector('option[value=\"metade\"]').disabled), true);
  assert.equal(await page.locator("#treasureFooter").isVisible(), false);
  await page.locator("#treasureDialog .treasure-roll").click();
  const results = page.locator("#treasureDialog .treasure-result");
  assert.equal(await results.count(), 11, "11 tesouros");
  const indexes = await results.locator(".treasure-index").allInnerTexts();
  assert.deepEqual(indexes, Array.from({ length: 11 }, (_, i) => `${i + 1}.`));
  assert.equal(await page.locator("#treasureDialog .treasure-cascade").count(), 21, "21 cadeias");
  assert.ok(await page.locator("#treasureDialog .treasure-step").count() >= 21);
  assert.equal(await page.locator("#treasureFooter").isVisible(), true, "rodapé visível");
  const cellTotal = (await results.evaluateAll(els => els.map(e => Number(e.dataset.tibars)))).reduce((a, b) => a + b, 0);
  const footerTotal = Number(await page.locator("#treasureFooter").getAttribute("data-total-tibars"));
  assert.equal(Math.round(cellTotal * 10) / 10, footerTotal, "T$ do rodapé igual à soma das células");
  const shown = await page.locator("#treasureFooter .treasure-total-value").innerText();
  assert.equal(shown.replace(/\s*T\$$/, "").replace(/\./g, "").replace(",", "."), String(footerTotal));
  // Rolar de novo substitui o lote.
  await page.locator("#treasureDialog .treasure-roll").click();
  assert.equal(await results.count(), 11);
  // Remover linha.
  await rowsLoc.nth(3).locator(".treasure-remove").click();
  assert.equal(await rowsLoc.count(), 3);
  // Linha por tabela específica.
  await rowsLoc.nth(0).locator(".treasure-f-kind").selectOption("table");
  assert.equal(await rowsLoc.nth(0).locator(".treasure-f-table").isVisible(), true);
  await page.locator("#treasureDialog .treasure-roll").click();
  assert.equal(await page.locator("#treasureDialog .treasure-error").innerText(), "");
  await page.locator("#treasureDialog .treasure-roll").click();
  // Lote cheio de 11+ tesouros para a captura.
  await rowsLoc.nth(0).locator(".treasure-f-kind").selectOption("nd");
  await page.locator("#treasureDialog .treasure-roll").click();
  await page.screenshot({ path: process.env.QA_SHOT || "/tmp/claude-1000/-mnt-c-Users-Arthur-OneDrive-Documentos-Mega-Dungeon/9b4a7ac4-9b92-4710-9e4c-7f73d59acc52/scratchpad/img/treasure-rolar.png" });

  await tabs.nth(1).click();
  assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
  assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "false");
  assert.equal(await panels.nth(1).isVisible(), true);
  assert.equal(await panels.nth(0).isVisible(), false);

  // Aba Consultar: 8-1 ND 3 Itens -> Equipamento -> tipo 2 (arma) -> d% da 8-4 (Adaga).
  const C = "#treasureDialog .treasure-consult-prompt";
  const step = () => page.locator(`${C} .treasure-c-value`);
  const apply = async v => { await step().fill(String(v)); await page.locator(`${C} .treasure-c-apply`).click(); };
  await page.locator("#treasureDialog .treasure-c-source").selectOption("nd");
  await page.locator("#treasureDialog .treasure-c-nd").selectOption("3");
  await page.locator("#treasureDialog .treasure-c-column").selectOption("items");
  assert.equal(await page.locator("#treasureDialog .treasure-c-mode").isVisible(), false, "Metade some em Itens");
  await page.locator("#treasureDialog .treasure-c-start").click();
  assert.match(await page.locator(`${C} .treasure-consult-step`).innerText(), /8-1/);
  await apply(101);
  assert.match(await page.locator(`${C} .treasure-c-error`).innerText(), /inválido/i, "101 mostra erro");
  assert.equal(await page.locator("#treasureDialog .treasure-consult-history .treasure-step").count(), 0, "101 mantém o passo");
  await apply("abc");
  assert.notEqual(await page.locator(`${C} .treasure-c-error`).innerText(), "", "texto mostra erro");
  await apply(0);
  assert.notEqual(await page.locator(`${C} .treasure-c-error`).innerText(), "", "0 mostra erro");
  await apply(40);
  assert.match(await page.locator("#treasureDialog .treasure-consult-history").innerText(), /Equipamento/);
  assert.match(await page.locator(`${C} .treasure-consult-reason`).innerText(), /Tipo do equipamento/);
  await apply(2);
  assert.match(await page.locator(`${C} .treasure-consult-step`).innerText(), /8-4/, "abre na 8-4 de armas");
  await apply(1);
  assert.equal(await page.locator(C).isVisible(), false, "cadeia terminou");
  assert.match(await page.locator("#treasureDialog .treasure-consult-result").innerText(), /1× Adaga/);
  await page.screenshot({ path: process.env.QA_SHOT_CONSULT || "/tmp/claude-1000/-mnt-c-Users-Arthur-OneDrive-Documentos-Mega-Dungeon/9b4a7ac4-9b92-4710-9e4c-7f73d59acc52/scratchpad/img/treasure-consultar.png" });
  // Nova consulta reinicia. ND 4 Itens: 40 -> equipamento 2D com aviso; "rolar" em expressão.
  await page.locator("#treasureDialog .treasure-c-reset").click();
  assert.equal(await page.locator("#treasureDialog .treasure-consult-history .treasure-step").count(), 0);
  await page.locator("#treasureDialog .treasure-c-nd").selectOption("4");
  await page.locator("#treasureDialog .treasure-c-column").selectOption("items");
  await page.locator("#treasureDialog .treasure-c-start").click();
  await apply(40);
  assert.equal(await page.locator(`${C} .treasure-consult-warning`).count(), 1, "aviso 2D");
  assert.match(await page.locator(`${C} .treasure-consult-warning`).innerText(), /2D/);
  await page.locator("#treasureDialog .treasure-c-reset").click();
  await page.locator("#treasureDialog .treasure-c-column").selectOption("money");
  await page.locator("#treasureDialog .treasure-c-nd").selectOption("3");
  await page.locator("#treasureDialog .treasure-c-start").click();
  await apply(100);
  const expr = await page.locator(`${C} .treasure-consult-reason`).innerText();
  if (await page.locator(`${C} .treasure-c-roll`).count()) {
    await page.locator(`${C} .treasure-c-roll`).click();
    const v = Number(await step().inputValue());
    assert.ok(Number.isInteger(v) && v >= 1, `rolar preencheu valor válido (${expr})`);
    await page.locator(`${C} .treasure-c-apply`).click();
  }
  assert.equal(await page.locator("#treasureDialog .treasure-c-error").count() === 0 || await page.locator("#treasureDialog .treasure-c-error").innerText() === "", true);
  // Tabela específica (8-5 etc.) é oferecida e abre direto.
  await page.locator("#treasureDialog .treasure-c-reset").click();
  await page.locator("#treasureDialog .treasure-c-source").selectOption("8-4/arma");
  await page.locator("#treasureDialog .treasure-c-start").click();
  assert.match(await page.locator(`${C} .treasure-consult-step`).innerText(), /8-4/);

  await page.locator("#treasureClose").click();
  await page.locator("#treasureDialog").waitFor({ state: "hidden" });
  assert.deepEqual(errors, [], `pageerror: ${errors.join("; ")}`);
  console.log("qaTreasure OK");
} finally {
  await browser.close();
}
