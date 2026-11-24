import assert from "node:assert/strict";

import { chromium } from "@playwright/test";

const appUrl = new URL(process.env.QA_APP_URL || "http://localhost:5173/megadungeon/");
const browser = await chromium.launch({
  executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome",
  args: ["--no-sandbox"]
});

try {
  const page = await browser.newPage({ hasTouch: true, viewport: { width: 820, height: 1024 } });
  await page.route("**/tactical-qa.html", (route) => route.fulfill({
    contentType: "text/html",
    body: '<!doctype html><html lang="pt-BR"><meta name="viewport" content="width=device-width, initial-scale=1"><body></body></html>'
  }));
  await page.goto(new URL("tactical-qa.html", appUrl).href);
  await page.evaluate(async () => {
    await import("./src/styles.css");
    const { createTacticalMapPanel } = await import("./src/tacticalMapRenderer.js");
    const { createTacticalEncounterSession } = await import("./src/tacticalEncounterSession.js");
    const terrain = Array(64).fill("floor");
    terrain[18] = "deep-water";
    terrain[36] = "obstacle";
    const pieces = [
      { id: "king", name: "Rei Tirano", kind: "boss", side: "enemy", glyph: "RT", x: 4, y: 4, width: 4, height: 4 },
      { id: "giant", name: "Escorpião gigante", kind: "enemy", side: "enemy", glyph: "EG", x: 0, y: 0, width: 3, height: 3 }
    ];
    const scene = {
      width: 8, height: 8, terrain, pieces,
      features: [{ type: "web", label: "Teia", indices: [18] }],
      markers: [{ type: "objective", label: "Objetivo fixo", indices: [18] }, { type: "objective", label: "Caçada", pieceId: "king" }],
      climate: [{ name: "Chuva", effect: "Chuva sobre a cena" }]
    };
    const map = { width: 8, height: 8, cells: terrain, enemyCount: 2, trapCount: 0, scene };
    const state = createTacticalEncounterSession().openMap("fixture", map);
    document.body.append(createTacticalMapPanel(map, { state }));
  });

  const panel = page.locator(".tactical-map-panel");
  const king = panel.getByRole("button", { name: "Rei Tirano" });
  await king.click({ timeout: 3000 });
  assert.match(await panel.locator(".tactical-selection").innerText(), /Rei Tirano/);
  await king.press("ArrowLeft");
  assert.equal(await king.evaluate((piece) => piece.style.getPropertyValue("--piece-x")), "3");
  assert.match(await panel.locator(".tactical-selection").innerText(), /1 quadrado$/);
  await king.press("ArrowRight");
  assert.equal(await king.evaluate((piece) => piece.style.getPropertyValue("--piece-x")), "4");
  assert.equal(await king.evaluate((piece) => getComputedStyle(piece.firstElementChild).borderRadius), "50%");
  assert.equal(await king.evaluate((piece) => getComputedStyle(piece).borderRadius), "0px");

  const kingBounds = await king.boundingBox();
  await page.mouse.move(kingBounds.x + kingBounds.width / 2, kingBounds.y + kingBounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(kingBounds.x, kingBounds.y, { steps: 5 });
  const origin = panel.locator(".tactical-drag-origin");
  assert.equal(await origin.isVisible(), true);
  assert.deepEqual(await origin.evaluate(element =>
    ["--piece-x", "--piece-y", "--piece-width", "--piece-height"].map(property => element.style.getPropertyValue(property))),
  ["4", "4", "4", "4"]);
  await page.mouse.up();
  assert.equal(await origin.count(), 0);
  assert.equal(await king.evaluate((piece) => piece.style.getPropertyValue("--piece-x")), "2");
  assert.match(await panel.locator(".tactical-selection").innerText(), /6 quadrados$/);
  const water = panel.locator(".tactical-cell").nth(18);
  assert.equal(await water.locator(".tactical-overlay.is-web").count(), 1);
  assert.equal(await water.locator(".tactical-overlay.is-objective").getAttribute("title"), "Objetivo fixo");
  assert.equal(await king.locator(".tactical-overlay.is-objective").getAttribute("title"), "Caçada");
  assert.match(await panel.locator(".tactical-legend").innerText(), /Água profunda/);
  assert.match(await panel.locator(".tactical-climate").innerText(), /Chuva/);
  assert.equal(await water.evaluate(async (cell) => {
    const atlasUrl = getComputedStyle(cell).backgroundImage.match(/^url\("(.*)"\)$/)?.[1];
    if (!atlasUrl) return false;
    const image = new Image();
    image.src = atlasUrl;
    await image.decode();
    return image.naturalWidth > image.naturalHeight;
  }), true);

  await panel.getByRole("button", { name: "Expandir" }).click();
  const fullscreen = page.locator(".tactical-map-fullscreen");
  const giant = fullscreen.getByRole("button", { name: "Escorpião gigante" });
  assert.equal(await fullscreen.getByRole("button", { name: "Rei Tirano" }).evaluate((piece) => piece.style.getPropertyValue("--piece-x")), "2");
  const cdp = await page.context().newCDPSession(page);
  async function touchDrag(piece, delta) {
    const bounds = await piece.boundingBox();
    const x = Math.round(bounds.x + bounds.width / 2);
    const y = Math.round(bounds.y + bounds.height / 2);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x + bounds.width * delta, y: y + bounds.height * delta }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  }
  await touchDrag(giant, 2 / 3);
  assert.equal(await giant.evaluate((piece) => piece.style.getPropertyValue("--piece-x")), "2");
  assert.equal(await giant.evaluate((piece) => piece.style.getPropertyValue("--piece-y")), "2");
  await touchDrag(giant, 2);
  assert.equal(await giant.evaluate((piece) => piece.style.getPropertyValue("--piece-x")), "5");
  assert.equal(await giant.evaluate((piece) => piece.style.getPropertyValue("--piece-y")), "5");
  await fullscreen.getByRole("button", { name: "Fechar" }).click();
  assert.equal(await panel.getByRole("button", { name: "Escorpião gigante" }).evaluate((piece) => piece.style.getPropertyValue("--piece-x")), "5");

  const editor = panel.getByRole("dialog", { name: "Adicionar peça temporária" });
  const trigger = panel.getByRole("button", { name: "Adicionar peça", exact: true });
  const name = editor.getByRole("textbox", { name: "Nome da peça" });
  assert.equal(await name.count(), 0);
  await trigger.click();
  await name.waitFor();
  assert.equal(await name.evaluate(element => document.activeElement === element), true);
  assert.equal(await editor.locator("h3 + hr + .tactical-piece-form").count(), 1);
  assert.equal(await name.evaluate(element => Math.abs(element.offsetWidth - element.parentElement.clientWidth) <= 1), true);
  const [sizeBounds, sideBounds] = await Promise.all([
    editor.getByRole("combobox", { name: "Porte da peça" }).boundingBox(),
    editor.getByRole("combobox", { name: "Lado da peça" }).boundingBox()
  ]);
  assert.equal(sizeBounds.y, sideBounds.y);
  assert.ok(sizeBounds.x + sizeBounds.width < sideBounds.x);
  await name.press("Escape");
  await editor.waitFor({ state: "hidden" });
  await trigger.click();
  await name.fill("Lobo Invocado");
  await name.press("Enter");
  await editor.waitFor({ state: "hidden" });
  const wolf = panel.getByRole("button", { name: "Lobo Invocado" });
  assert.equal(await wolf.getAttribute("data-side"), "ally");
  assert.equal(await wolf.innerText(), "LI");
  await trigger.click();
  await name.fill("Lobo Infernal");
  await editor.getByRole("button", { name: "Adicionar", exact: true }).click();
  await editor.waitFor({ state: "hidden" });
  assert.equal(await wolf.innerText(), "LI1");
  assert.equal(await panel.getByRole("button", { name: "Lobo Infernal" }).innerText(), "LI2");
  await trigger.click();
  await name.fill("Lobo Inimigo");
  await panel.getByRole("combobox", { name: "Lado da peça" }).selectOption("enemy");
  await panel.getByRole("combobox", { name: "Porte da peça" }).selectOption("Grande");
  await editor.getByRole("button", { name: "Adicionar", exact: true }).click();
  await editor.waitFor({ state: "hidden" });
  const enemyWolf = panel.getByRole("button", { name: "Lobo Inimigo" });
  assert.equal(await enemyWolf.getAttribute("data-side"), "enemy");
  assert.equal(await enemyWolf.innerText(), "LI");
  assert.match(await panel.locator(".tactical-selection").innerText(), /Lobo Inimigo · Inimigo · 2×2/);
  await panel.getByRole("button", { name: "Remover peça" }).click();
  assert.equal(await enemyWolf.count(), 0);
  await trigger.click();
  await name.fill("Colosso");
  await panel.getByRole("combobox", { name: "Porte da peça" }).selectOption("Colossal");
  await editor.getByRole("button", { name: "Adicionar", exact: true }).click();
  await editor.waitFor({ state: "hidden" });
  const colossus = panel.getByRole("button", { name: "Colosso" });
  await colossus.press("ArrowRight");
  await colossus.press("ArrowDown");
  assert.deepEqual(await colossus.evaluate(piece =>
    ["--piece-x", "--piece-y", "--piece-width", "--piece-height"].map(property => piece.style.getPropertyValue(property))),
  ["2", "2", "6", "6"]);
  const remove = panel.getByRole("button", { name: "Remover peça" });
  await king.press("Enter");
  assert.match(await panel.locator(".tactical-add-piece > .tactical-selection").innerText(), /Rei Tirano/);
  assert.equal(await panel.locator(".tactical-piece-buttons").getByRole("button").count(), 2);
  await remove.click();
  assert.equal(await king.count(), 0);
  assert.equal(await remove.count(), 0);
  // Liburna: o toldo fica numa camada por cima das peças, sem capturar cliques.
  await page.evaluate(async () => {
    document.body.replaceChildren();
    const { createTacticalMapPanel } = await import("./src/tacticalMapRenderer.js");
    const { createTacticalEncounterSession } = await import("./src/tacticalEncounterSession.js");
    const { createBoatAmbush } = await import("./src/archipelagoBoatAmbush.js");
    const { createNodeTacticalMap } = await import("./src/nodeTacticalMap.js");
    const { archipelago21to30Profile } = await import("./src/floorProfiles/archipelago21to30.js");
    const ambush = createBoatAmbush(9, 1, archipelago21to30Profile, "toldo-qa", () => 0);
    const map = createNodeTacticalMap(ambush);
    const state = createTacticalEncounterSession().openMap("liburna", map);
    document.body.append(createTacticalMapPanel(map, { state }));
  });
  const boat = page.locator(".tactical-map-panel");
  const canopyLayer = boat.locator(".tactical-piece-layer + .tactical-canopy-layer");
  assert.equal(await canopyLayer.count(), 1);
  assert.equal(await canopyLayer.evaluate((layer) => getComputedStyle(layer).pointerEvents), "none");
  assert.ok(await canopyLayer.locator(".tactical-canopy-cell.is-auto.is-canopy").count());
  assert.equal(await boat.locator(".tactical-cell .tactical-feature.is-canopy").count(), 0);
  const rightmost = (await boat.locator('.tactical-piece[data-side="ally"]').evaluateAll((pieces) =>
    pieces.map((piece) => [piece.getAttribute("aria-label"), Number(piece.style.getPropertyValue("--piece-x")), Number(piece.style.getPropertyValue("--piece-y"))])))
    .sort((first, second) => second[1] - first[1] || first[2] - second[2])[0];
  const walker = boat.getByRole("button", { name: rightmost[0], exact: true });
  await walker.focus();
  await walker.press("ArrowRight");
  assert.equal(await walker.evaluate((piece) => piece.style.getPropertyValue("--piece-x")), "15");
  const insideCanopy = await walker.evaluate((piece, layerSelector) => {
    const area = piece.getBoundingClientRect();
    const canopy = document.querySelector(layerSelector).getBoundingClientRect();
    return area.right <= canopy.right && area.left >= canopy.left;
  }, ".tactical-canopy-layer");
  assert.ok(insideCanopy);
  const another = boat.locator('.tactical-piece[data-side="enemy"]').first();
  await another.click();
  assert.equal(await walker.getAttribute("aria-pressed"), "false");
  const bounds = await walker.boundingBox();
  const point = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
  assert.equal(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest(".tactical-piece")?.getAttribute("aria-label"), point), rightmost[0]);
  await page.mouse.click(point.x, point.y);
  assert.equal(await walker.getAttribute("aria-pressed"), "true");
  await page.screenshot({ path: process.env.QA_CANOPY_SHOT || "/tmp/liburna-toldo.png" });

  console.log("Grade tática: camadas, teclado, mouse, toque e painel compartilhado.");
} finally {
  await browser.close();
}
