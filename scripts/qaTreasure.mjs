import assert from "node:assert/strict";
import { mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";

const url = process.env.QA_APP_URL || "http://localhost:5173/megadungeon/";
const browser = await chromium.launch({ headless: true, executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const errors = [];
const shotDir = process.env.QA_SCREENSHOT_DIR || "tmp/treasure-qa";
mkdirSync(shotDir, { recursive: true });
const scratchImg = process.env.QA_COPY_DIR || "/tmp/claude-1000/-mnt-c-Users-Arthur-OneDrive-Documentos-Mega-Dungeon/9b4a7ac4-9b92-4710-9e4c-7f73d59acc52/scratchpad/img";
const shot = name => join(shotDir, name);
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

  // A seleção de missões pode reabrir por cima; reabre a modal de tesouros antes de usar o teclado.
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const d = document.getElementById("treasureDialog");
    d.close();
    d.showModal();
  });
  const tabs = page.locator("#treasureDialog [role=tab]");
  assert.deepEqual(await tabs.allInnerTexts(), ["Gerar tesouros", "Rolar na mesa"]);
  const panels = page.locator("#treasureDialog [role=tabpanel]");
  assert.equal(await panels.count(), 2);
  assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "true");
  // Setas navegam entre as abas.
  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true", "seta direita seleciona a segunda aba");
  await page.keyboard.press("ArrowLeft");
  assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "true", "seta esquerda volta à primeira");
  assert.equal(await panels.nth(0).isVisible(), true);
  assert.equal(await panels.nth(1).isVisible(), false);
  // Seletor segmentado: controle compacto com borda e cantos arredondados; painel com os quatro cantos arredondados.
  for (const vp of [{ width: 1024, height: 768 }, { width: 768, height: 1024 }]) {
    await page.setViewportSize(vp);
    const g = await page.evaluate(() => {
      const tabsEl = document.querySelector("#treasureDialog .treasure-tabs");
      const panel = document.getElementById("treasurePanelRoll");
      const ts = getComputedStyle(tabsEl);
      const [t0, t1] = [...tabsEl.querySelectorAll("[role=tab]")];
      return { border: ts.borderTopWidth, radius: parseFloat(ts.borderTopLeftRadius), tabsW: tabsEl.getBoundingClientRect().width, panelW: panel.getBoundingClientRect().width,
        top0: Math.round(t0.getBoundingClientRect().top), top1: Math.round(t1.getBoundingClientRect().top),
        activeBg: getComputedStyle(t0).backgroundColor, idleBg: getComputedStyle(t1).backgroundColor,
        corners: ["TopLeft", "TopRight", "BottomLeft", "BottomRight"].map(c => parseFloat(getComputedStyle(panel)[`border${c}Radius`])) };
    });
    const at = `(${vp.width}x${vp.height})`;
    assert.notEqual(g.border, "0px", `controle tem borda ${at}`);
    assert.ok(g.radius > 0, `controle arredondado ${at}`);
    assert.ok(g.tabsW < g.panelW, `controle não ocupa a linha inteira ${at}`);
    assert.equal(g.top0, g.top1, `abas na mesma linha ${at}`);
    assert.notEqual(g.activeBg, g.idleBg, `aba ativa com fundo diferente ${at}`);
    assert.ok(g.corners.every(c => c > 0), `painel com quatro cantos arredondados ${at}`);
  }
  await page.setViewportSize({ width: 1024, height: 768 });

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
  // Campo "Rolar" (antes "Colunas"), com opções novas; sem legenda e sem faixa fixa de totais.
  const rowField = rowsLoc.nth(0).locator("label", { has: page.locator(".treasure-f-columns") });
  assert.equal(await page.locator("#treasureDialog .treasure-hint").count(), 0);
  assert.match(await rowField.innerText(), /^Rolar\b/);
  assert.deepEqual(await rowsLoc.nth(0).locator(".treasure-f-columns option").allInnerTexts(), ["Itens e dinheiro", "Só itens", "Só dinheiro"]);
  assert.doesNotMatch(await rowField.innerText(), /moedas e riquezas/);
  assert.doesNotMatch(await rowsLoc.nth(0).innerText(), /Colunas/);
  assert.equal(await page.locator("#treasureStrip, .treasure-strip").count(), 0, "faixa fixa removida");
  await page.locator("#treasureDialog .treasure-roll").click();
  assert.match(await page.locator("#treasureDialog .treasure-group h3").last().innerText(), /Só itens/, "cabeçalho com o novo rótulo");
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
  assert.equal(shown.replace(/^T\$\s*/, "").replace(/\./g, "").replace(",", "."), String(footerTotal));
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
  // Lista de outro livro como tabela específica.
  await rowsLoc.nth(0).locator(".treasure-f-table").selectOption("herois/acessorios/menor");
  await page.locator("#treasureDialog .treasure-roll").click();
  assert.equal(await page.locator("#treasureDialog .treasure-error").innerText(), "");
  assert.match(await results.first().innerText(), /Heróis · Acessórios específicos \(menores\)/);
  const itemLine = await page.locator("#treasureFooter .treasure-item-line").last().innerText();
  assert.match(itemLine, /^\d+× .+ \(.+\) — (\+?T\$ [\d.,]+|—)( — .+)?$/, `item do rodapé com categoria: ${itemLine}`);
  const compTexts = await page.locator("#treasureFooter .treasure-component").allInnerTexts();
  assert.ok(compTexts.some(t => / — .+ p\. \d+$/.test(t)), "ao menos um componente com livro e página");
  assert.match(await page.locator("#treasureFooter").innerText(), /Total em dinheiro/);
  await page.locator("#treasureDialog .treasure-roll").click();
  // Lote cheio de itens de ND alto: totais visíveis e ao menos um item com componentes (melhoria/encanto).
  await rowsLoc.nth(0).locator(".treasure-f-kind").selectOption("nd");
  await rowsLoc.nth(0).locator(".treasure-f-nd").selectOption("20");
  await rowsLoc.nth(0).locator(".treasure-f-qty").fill("30");
  let extra = 0;
  for (let i = 0; i < 6 && !extra; i++) {
    await page.locator("#treasureDialog .treasure-roll").click();
    extra = await page.locator("#treasureFooter .treasure-component-extra").count();
  }
  assert.ok(extra > 0, "ao menos um item com componentes além da base");
  const price = await page.locator("#treasureFooter .treasure-item-line", { hasText: "T$" }).count();
  assert.ok(price > 0, "itens mostram o preço");
  assert.match(await page.locator("#treasureFooter .treasure-wealth-total").innerText(), /^Total em riquezas: T\$ [\d.,]+$/);
  assert.match(await page.locator("#treasureFooter .treasure-grand-total").innerText(), /^Valor total \(dinheiro \+ riquezas\): T\$ [\d.,]+$/);
  const num = t => Number(t.replace(/[^\d,]/g, "").replace(",", "."));
  const wealthShown = num(await page.locator("#treasureFooter .treasure-wealth-total").innerText());
  const grandShown = num(await page.locator("#treasureFooter .treasure-grand-total").innerText());
  const coinsShown = Number(await page.locator("#treasureFooter").getAttribute("data-total-tibars"));
  assert.equal(Math.round((coinsShown + wealthShown) * 10) / 10, grandShown, "valor total = dinheiro + riquezas");
  await page.locator("#treasurePanelRoll").evaluate(p => { p.scrollTop = p.scrollHeight; });
  assert.equal(await page.locator("#treasureFooter .treasure-grand-total").isVisible(), true);
  await page.screenshot({ path: shot("treasure-rolar.png") });

  await tabs.nth(1).click();
  assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
  assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "false");
  assert.equal(await panels.nth(1).isVisible(), true);
  assert.equal(await panels.nth(0).isVisible(), false);

  // Aba Consultar: 8-1 ND 3 Itens -> Equipamento -> tipo 2 (arma) -> d% da 8-4 (Adaga).
  const C = "#treasureDialog .treasure-consult-prompt";
  const step = () => page.locator(`${C} .treasure-c-value`);
  const apply = async v => { await step().fill(String(v)); await page.locator(`${C} .treasure-c-apply`).click(); };
  await page.screenshot({ path: shot("treasure-consultar-setup.png") });
  const widthOf = () => page.locator("#treasureDialog").evaluate(d => Math.round(d.getBoundingClientRect().width));
  const wConsult = await widthOf();
  await tabs.nth(0).click();
  assert.equal(await widthOf(), wConsult, "modal tem a mesma largura nas duas abas");
  await tabs.nth(1).click();
  await page.locator("#treasureDialog .treasure-c-source").selectOption("nd");
  await page.locator("#treasureDialog .treasure-c-nd").selectOption("3");
  await page.locator("#treasureDialog .treasure-c-column").selectOption("items");
  assert.equal(await page.locator("#treasureDialog .treasure-c-mode").isVisible(), false, "Metade some em Itens");
  await page.locator("#treasureDialog .treasure-c-start").click();
  assert.match(await page.locator(`${C} .treasure-consult-step`).innerText(), /8-1/);
  assert.equal(await page.locator("#treasureDialog .treasure-c-source option").first().innerText(), "Rolagem completa do livro (Tabela 8-1)");
  // Rolagem completa: o passo mostra a tabela 8-1 de ND 3 Itens como no livro.
  const bookTable = page.locator(`${C} table.treasure-book-table`);
  assert.equal(await bookTable.count(), 1, "tabela do passo");
  assert.match(await bookTable.locator("caption").textContent(), /8-1 · Itens ND 3/);
  assert.ok((await bookTable.locator("caption").boundingBox()).height <= 1, "legenda visualmente oculta");
  assert.deepEqual(await bookTable.locator("tbody tr td:first-child").allInnerTexts(), ["01–25", "26–35", "36–60", "61–85", "86–100"]);
  assert.match(await bookTable.locator("tbody tr").nth(2).innerText(), /Equipamento/);
  assert.equal(await bookTable.locator("[aria-current=true]").count(), 0, "sem destaque antes do valor");
  await step().fill("40");
  assert.equal(await bookTable.locator("[aria-current=true]").count(), 1, "uma linha destacada");
  assert.match(await bookTable.locator("[aria-current=true]").innerText(), /^36–60\s+Equipamento/);
  await step().fill("101");
  assert.equal(await bookTable.locator("[aria-current=true]").count(), 0, "valor fora da faixa não destaca");
  await step().fill("40");
  mkdirSync(scratchImg, { recursive: true });
  await page.screenshot({ path: shot("ajustes-livro-completo.png") });
  copyFileSync(shot("ajustes-livro-completo.png"), join(scratchImg, "ajustes-livro-completo.png"));
  await step().fill("");
  await apply(101);
  assert.match(await page.locator(`${C} .treasure-c-error`).innerText(), /inválido/i, "101 mostra erro");
  assert.equal(await page.locator("#treasureDialog .treasure-consult-history .treasure-step").count(), 0, "101 mantém o passo");
  await step().fill("1");
  assert.equal(await page.locator(`${C} .treasure-c-error`).innerText(), "", "erro some ao digitar");
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
  assert.match(await page.locator("#treasureDialog .treasure-consult-result").innerText(), /Valor total/, "rolagem completa termina no quadro completo");
  await page.screenshot({ path: shot("treasure-consultar.png") });
  await page.screenshot({ path: shot("ajustes-livro-completo-fim.png") });
  // Dinheiro e itens (padrão): duas cadeias em sequência, um único quadro de totais.
  await page.locator("#treasureDialog .treasure-c-reset").click();
  assert.deepEqual(await page.locator("#treasureDialog .treasure-c-column option").allInnerTexts(), ["Dinheiro e itens", "Só dinheiro", "Só itens"]);
  await page.locator("#treasureDialog .treasure-c-column").selectOption("both");
  await page.locator("#treasureDialog .treasure-c-nd").selectOption("5");
  await page.locator("#treasureDialog .treasure-c-start").click();
  for (let i = 0; i < 80 && await page.locator(C).isVisible(); i++) {
    const label = await page.locator(`${C} .treasure-consult-prompt label, ${C} label`).first().innerText();
    const max = Number(label.match(/a (\d+)\)/)?.[1] ?? "1");
    await apply(i === 0 ? 30 : 1 + Math.floor(Math.random() * max));
  }
  assert.equal(await page.locator(C).isVisible(), false, "as duas cadeias terminaram");
  const both = await page.locator("#treasureDialog .treasure-consult-result").innerText();
  assert.match(both, /Total em dinheiro: T\$ [\d.,]+/);
  assert.doesNotMatch(both, /Dinheiro: nenhum/, "dinheiro da primeira cadeia aparece");
  assert.match(await page.locator("#treasureDialog .treasure-consult-trail").innerText(), /Dinheiro ND 5[\s\S]*Itens ND 5/, "histórico contínuo");
  await page.screenshot({ path: shot("ajustes-final-completo.png") });
  copyFileSync(shot("ajustes-final-completo.png"), join(scratchImg, "ajustes-final-completo.png"));
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
  assert.equal(await page.locator(`${C} table`).count(), 0, "pesquisa avulsa não mostra a tabela");
  // Pesquisa avulsa em 8-12 com 50: só a poção, sem o quadro.
  await page.locator("#treasureDialog .treasure-c-reset").click();
  await page.locator("#treasureDialog .treasure-c-source").selectOption("8-12");
  await page.locator("#treasureDialog .treasure-c-start").click();
  await apply(50);
  const avulsa = page.locator("#treasureDialog .treasure-consult-result");
  assert.equal(await avulsa.locator(".treasure-result-card").count(), 1, "um cartão de resultado");
  assert.match(await avulsa.innerText(), /Camuflagem Ilusória.*T\$ 270/s);
  assert.doesNotMatch(await avulsa.innerText(), /Valor total|Riquezas|Total em dinheiro/);
  await page.screenshot({ path: shot("ajustes-livro-avulsa.png") });
  copyFileSync(shot("ajustes-livro-avulsa.png"), join(scratchImg, "ajustes-livro-avulsa.png"));
  await page.locator("#treasureDialog .treasure-c-reset").click();
  await page.locator("#treasureDialog .treasure-c-source").selectOption("8-4/arma");
  await page.locator("#treasureDialog .treasure-c-start").click();
  // Lista de outro livro: valor 1 dá o primeiro item.
  await page.locator("#treasureDialog .treasure-c-reset").click();
  await page.locator("#treasureDialog .treasure-c-source").selectOption("herois/acessorios/menor");
  await page.locator("#treasureDialog .treasure-c-start").click();
  assert.match(await page.locator(`${C} .treasure-consult-step`).innerText(), /Heróis · Acessórios específicos \(menores\) · 1d23/);
  await apply(1);
  assert.equal(await page.locator(C).isVisible(), false, "lista terminou em um passo");
  assert.match(await page.locator("#treasureDialog .treasure-consult-result").innerText(), /1× Algibeira mordedora/);

  await page.locator("#treasureClose").click();
  await page.locator("#treasureDialog").waitFor({ state: "hidden" });
  // Tema: as cores da modal seguem o perfil do andar (variáveis --page/--surface/--surface-alt).
  const themeOf = async profileIndex => {
    const p = await browser.newPage({ viewport: { width: 1024, height: 768 }, serviceWorkers: "block" });
    p.on("pageerror", error => errors.push(error.message));
    await p.goto(url);
    await p.locator("#rangeDialog[open]").waitFor();
    const ids = await p.locator("#floorRangeInput option").evaluateAll(os => os.map(o => o.value));
    await p.locator("#floorRangeInput").selectOption(ids[profileIndex]);
    await p.locator("#rangeConfirm").click();
    await p.locator("#rangeDialog").waitFor({ state: "hidden" });
    await p.locator("#missionDialog[open]").waitFor({ timeout: 20000 }).catch(() => {});
    await p.waitForTimeout(500);
    await p.evaluate(() => {
      document.querySelectorAll("dialog[open]").forEach(d => d.close());
      document.getElementById("treasureButton").click();
    });
    await p.waitForTimeout(300);
    await p.evaluate(() => { const d = document.getElementById("treasureDialog"); d.close(); d.showModal(); });
    const row = p.locator("#treasureDialog .treasure-input-row").first();
    await row.locator(".treasure-f-nd").selectOption("20");
    await row.locator(".treasure-f-qty").fill("12");
    for (let i = 0; i < 6; i++) {
      await p.locator("#treasureDialog .treasure-roll").click();
      if (await p.locator("#treasureFooter .treasure-component-extra").count()) break;
    }
    assert.ok(await p.locator("#treasureFooter .treasure-component-extra").count(), `componentes visíveis (${ids[profileIndex]})`);
    const read = await p.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const d = getComputedStyle(document.getElementById("treasureDialog"));
      const card = getComputedStyle(document.querySelector("#treasureDialog .treasure-result"));
      const tab = getComputedStyle(document.querySelector("#treasureDialog [role=tab][aria-selected=true]"));
      const idle = getComputedStyle(document.querySelector("#treasureDialog [role=tab][aria-selected=false]"));
      const panel = getComputedStyle(document.querySelector("#treasurePanelRoll"));
      const probe = document.createElement("i");
      const toRgb = v => { probe.style.color = v; document.body.append(probe); const r = getComputedStyle(probe).color; probe.remove(); return r; };
      return { dialogBg: d.backgroundColor, cardBg: card.backgroundColor, tabBg: tab.backgroundColor, tabBorder: tab.borderBottomColor, panelBg: panel.backgroundColor, idleBg: idle.backgroundColor,
        surface: toRgb(root.getPropertyValue("--surface").trim()), page2: toRgb(root.getPropertyValue("--page").trim()),
        page: toRgb(root.getPropertyValue("--page").trim()), alt: toRgb(root.getPropertyValue("--surface-alt").trim()),
        hover: toRgb(root.getPropertyValue("--action-hover").trim()), action: toRgb(root.getPropertyValue("--action").trim()) };
    });
    await p.locator("#treasureDialog").screenshot({ path: shot(`treasure-rolar-${ids[profileIndex]}.png`) });
    await p.locator("#treasurePanelRoll").evaluate(el => { el.scrollTop = el.scrollHeight; });
    await p.locator("#treasureDialog").screenshot({ path: shot(`treasure-rolar-${ids[profileIndex]}-fim.png`) });
    await p.close();
    return { id: ids[profileIndex], ...read };
  };
  const themeA = await themeOf(0);
  const themeB = await themeOf(1);
  const themeC = await themeOf(2);
  for (const t of [themeA, themeB, themeC]) {
    assert.equal(t.dialogBg, t.page, `fundo da modal = --page (${t.id})`);
    assert.equal(t.cardBg, t.alt, `cartão = --surface-alt (${t.id})`);
    assert.equal(t.panelBg, t.surface, `painel = --surface (${t.id})`);
    assert.equal(t.tabBg, t.action, `aba ativa = --action (${t.id})`);
    assert.notEqual(t.idleBg, t.tabBg, `aba inativa difere da ativa (${t.id})`);
  }
  assert.notEqual(themeA.dialogBg, themeB.dialogBg, "perfis diferentes têm fundos diferentes");
  assert.notEqual(themeA.cardBg, themeB.cardBg);
  assert.notEqual(themeC.dialogBg, themeB.dialogBg, "arquipélago difere dos demais");
  assert.notEqual(themeC.dialogBg, themeA.dialogBg, "arquipélago difere dos demais");
  console.log("temas:", themeA.id, themeA.dialogBg, "|", themeB.id, themeB.dialogBg, "|", themeC.id, themeC.dialogBg);
  assert.deepEqual(errors, [], `pageerror: ${errors.join("; ")}`);
  console.log("qaTreasure OK");
} finally {
  await browser.close();
}
