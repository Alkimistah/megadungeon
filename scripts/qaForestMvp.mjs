import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { forest11to20Profile as profile } from "../src/floorProfiles/forest11to20.js";
import { prepareForestExpedition, serializeForestExpedition } from "../src/forestExpedition.js";
import { encodeSessionCode, decodeSessionCode } from "../src/sessionCode.js";
import { formatElapsedTime } from "../src/format.js";
import { calculateCombatND } from "../src/challenge.js";
import { getCreatureUnits } from "../src/encounterCreatureHealth.js";
import { canRerollNodeCreatures, resolveNodeEncounter } from "../src/encounterResolver.js";

const production = process.argv.includes("--production");
const url = process.env.QA_APP_URL || (production ? "http://localhost:4173/megadungeon/" : "http://localhost:5173/megadungeon/");
const browser = await chromium.launch({ headless: true, executablePath: process.env.QA_CHROME || "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const errors = [];
await mkdir("tmp/forest-mvp-qa", { recursive: true });

function objective(category, targetName, targetId, quantity = 1, floor = 15) {
  return {
    id: `qa-${category}`, profileId: profile.id, title: `QA ${category}`, category, categoryLabel: category,
    status: "selected", description: `Objetivo: ${targetName}`, proofType: "Confirmação do mestre.",
    destination: category === "extermination" ? { kind: "progress", floor: null, floorMin: 11, floorMax: 19, label: "Andares 11–19" }
      : { kind: "floor", floor, label: `Andar ${floor}` },
    objective: { targetType: ["extermination", "specialHunt"].includes(category) ? "creature" : "material", targetName, targetId, quantity, condition: "Cumprir o objetivo" },
    integration: { bindings: [] }, reward: { totalPayout: 100 }
  };
}

function sessionFor(expedition, floor = expedition.startFloor) {
  const entry = expedition.floors.find(f => f.floor === floor);
  return {
    v: 1, mode: "node-map", profile: profile.id, floor,
    depth: entry.depth, baseDc: entry.baseDc, mapSeed: expedition.seed, unknownPaths: false,
    forestExpedition: serializeForestExpedition(expedition),
    missions: { profileId: profile.id, selected: expedition.missions, selectionLocked: true, history: [] },
    state: { chosenByLevel: [], completed: [], attempted: [], explored: [], rested: [], elapsedMinutes: 0 }
  };
}

function missionPath(entry) {
  const needed = new Set(entry.levels.flat().filter(n => n.missionBindings?.length).map(n => n.id));
  function visit(node, path) {
    const next = [...path, node];
    if (!node.links.length) return [...needed].every(id => next.some(n => n.id === id)) ? next : null;
    for (const target of node.links) { const found = visit(target, next); if (found) return found; }
    return null;
  }
  for (const first of entry.levels[0]) { const path = visit(first, []); if (path) return path; }
  throw new Error("Missões não compartilham uma rota válida.");
}

async function pageFor(code = null, viewport = { width: 1024, height: 768 }) {
  const page = await browser.newPage({ viewport, serviceWorkers: "block" });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url);
  await page.locator("#rangeDialog[open]").waitFor();
  if (code) {
    await page.locator("#seedInput").fill(code);
    await page.locator("#rangeConfirm").click();
    await page.locator("#rangeDialog").waitFor({ state: "hidden" });
  }
  return page;
}

async function exportSession(page) {
  if (!(await page.locator("#info").isVisible())) await page.locator("#settingsToggle").click();
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 5000 }),
    page.locator("#info").click()
  ]);
  assert.match(download.suggestedFilename(), /^mega-dungeon-andar-\d+\.txt$/);
  const code = await readFile(await download.path(), "utf8");
  assert.ok(code.startsWith("MD1."));
  return code;
}

async function newSelection(count) {
  const page = await pageFor();
  await page.locator("#floorRangeInput").selectOption(profile.id);
  await page.locator("#rangeConfirm").click();
  await page.locator("#missionDialog[open]").waitFor();
  const available = await page.locator(".mission-card.is-selectable").count();
  const selected = Math.min(count, available);
  for (let i = 0; i < selected; i++) await page.locator(".mission-card.is-selectable").nth(i).click();
  await page.locator(".mission-dialog-actions .generate-button").click();
  await page.locator("#missionDialog").waitFor({ state: "hidden" });
  const saved = decodeSessionCode(await exportSession(page));
  assert.equal(saved.missions.selected.length, selected);
  assert.ok(saved.forestExpedition);
  for (const m of saved.missions.selected) assert.ok(m.integration.bindings.length);
  await page.close();
  console.log(`Seleção de ${selected} missão/missões: passou.`);
}

async function missionFlow() {
  const expedition = prepareForestExpedition({ seed: "qa-forest-live", profile, startFloor: 15, depth: 5, missions: [
    objective("specialHunt", "Sucuri", "sucuri"),
    objective("collection", "sementes de vegetação agressiva", "sementes", 4),
    objective("extermination", "Naja", "naja", 4)
  ] });
  const entry = expedition.floors.find(f => f.floor === 15);
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)));
  const path = missionPath(entry);
  let credited = false;
  let exploredChecked = false;
  let pendingCaptured = false;
  let reinforcedNodeId;
  let totalMinutes = 0;
  let sinceRestMinutes = 0;
  assert.match(await page.locator("#nodeMapGuidance").innerText(), /Escolha um nodo/);
  for (const node of path) {
    const index = entry.levels.flat().findIndex(n => n.id === node.id);
    await page.locator(".node").nth(index).click();
    await page.locator("#nodeDialog[open]").waitFor();
    if (!exploredChecked && node.skill && node.type !== "unknown") {
      const dialog = page.locator("#nodeDialog");
      assert.ok((await dialog.locator("#nodeDialogMeta").innerText()).includes(`Teste de descoberta: ${node.skill} (CD ${node.dc})`));
      await dialog.locator("#nodeDialogClose").click();
      const beforeDiscovery = await exportSession(page);
      await page.locator(".node").nth(index).click();
      await dialog.getByRole("checkbox", { name: "Registrar sucesso (+15 min)", exact: true }).click();
      assert.equal(await page.locator("#totalTimeTrackerValue").innerText(), formatElapsedTime(totalMinutes + 15));
      assert.equal(await page.locator("#nodeDialog .node-progress-status").innerText(), "Exploração registrada");
      assert.equal(await page.locator(".node").nth(index).getAttribute("data-progress"), "explored");

      const failed = await pageFor(encodeSessionCode({ ...decodeSessionCode(beforeDiscovery), unknownPaths: true }));
      const failedDialog = failed.locator("#nodeDialog");
      await failed.locator(".node").nth(index).click();
      await failedDialog.getByRole("checkbox", { name: "Registrar falha (+15 min)", exact: true }).click();
      assert.equal(await failedDialog.locator(".node-progress-status").innerText(), "Tentativa registrada");
      assert.equal(await failedDialog.locator(".environment-columns").count(), 0);
      assert.equal(await failed.locator("#totalTimeTrackerValue").innerText(), formatElapsedTime(totalMinutes + 15));
      await failedDialog.locator(".route-choice").click();
      assert.equal(await failed.locator("#totalTimeTrackerValue").innerText(), formatElapsedTime(totalMinutes + 15 + node.investigationMinutes));
      await failed.close();
      exploredChecked = true;
    }
    await page.locator(".route-choice").click();
    totalMinutes += node.investigationMinutes;
    sinceRestMinutes += node.investigationMinutes;
    assert.equal(await page.locator("#totalTimeTrackerValue").innerText(), formatElapsedTime(totalMinutes));
    assert.equal(await page.locator("#timeTrackerValue").innerText(), formatElapsedTime(sinceRestMinutes));
    await page.locator(".complete-choice").waitFor();
    assert.equal(await page.locator("#nodeDialog .node-progress-status").innerText(), "Encontro pendente");
    assert.equal(await page.locator(".node").nth(index).getAttribute("data-progress"), "pending");
    assert.equal(await page.locator(".node").nth(index).locator(".node-progress-badge text").textContent(), "…");
    assert.match(await page.locator("#nodeMapGuidance").innerText(), /Conclua o encontro/);
    const badgeBox = await page.locator(".node").nth(index).locator(".node-progress-badge").boundingBox();
    for (const selector of [".mission-node-label", ".check-label", ".node-icon"]) {
      const part = page.locator(".node").nth(index).locator(selector);
      if (!await part.count()) continue;
      const box = await part.boundingBox();
      if (box && badgeBox) {
        const overlapWidth = Math.min(box.x + box.width, badgeBox.x + badgeBox.width) - Math.max(box.x, badgeBox.x);
        const overlapHeight = Math.min(box.y + box.height, badgeBox.y + badgeBox.height) - Math.max(box.y, badgeBox.y);
        assert.ok(overlapWidth <= 1 || overlapHeight <= 1, `Progress badge overlaps ${selector}`);
      }
    }
    if (!pendingCaptured) {
      await page.screenshot({ path: "tmp/forest-mvp-qa/pending-scene.png", fullPage: true });
      pendingCaptured = true;
    }
    assert.equal(await page.locator("#advanceNodeFloorButton").isDisabled(), true);
    const extermIndex = node.missionBindings?.findIndex(m => m.id === "qa-extermination") ?? -1;
    if (extermIndex >= 0 && !credited) {
      const dialog = page.locator("#nodeDialog");
      const sheet = dialog.locator(".creature-detail-card");
      await dialog.getByRole("button", { name: "Mostrar criaturas e armadilhas" }).click();
      const initiative = sheet.getByRole("button", { name: "Iniciativa +2" });
      const attack = sheet.getByRole("button", { name: "Ataque +1" });
      const hitPoints = sheet.getByRole("button", { name: "PV +13" });
      assert.equal(await sheet.getByRole("button", { name: "Adicionar criatura" }).isDisabled(), true);
      const nd = await dialog.locator("#nodeDialogMeta").innerText();
      await initiative.click();
      assert.equal(await initiative.getAttribute("aria-pressed"), "true");
      assert.match(await sheet.innerText(), /INICIATIVA \+10 \(reforço \+2\)/);
      await attack.click();
      assert.match(await sheet.innerText(), /Some \+1 às jogadas de ataque/);
      await hitPoints.click();
      assert.match(await sheet.innerText(), /PONTOS DE VIDA 26 \(reforço \+13\)/);
      assert.match(await sheet.innerText(), /some 13 aos PV atuais/);
      await hitPoints.click();
      assert.equal(await hitPoints.getAttribute("aria-pressed"), "false");
      assert.match(await sheet.innerText(), /PONTOS DE VIDA 13/);
      await hitPoints.click();
      await initiative.click();
      assert.equal(await initiative.getAttribute("aria-pressed"), "false");
      assert.equal(await attack.getAttribute("aria-pressed"), "true");
      assert.equal(await dialog.locator("#nodeDialogMeta").innerText(), nd);
      reinforcedNodeId = node.id;
      const xp = new Intl.NumberFormat("pt-BR");
      assert.match(await page.locator("#nodeDialogMeta").innerText(), new RegExp(`Com clima e terreno.*${xp.format(node.challenge.total * 1000)} XP`, "i"));
      assert.match(await page.locator("#nodeDialogMeta").innerText(), new RegExp(`Sem clima e terreno.*${xp.format(node.challenge.encounter * 1000)} XP`, "i"));
      await page.locator('[aria-label="Abrir mapa tático"]').click();
      assert.ok(await page.locator(".tactical-map-fullscreen .is-enemy.has-objective").count() > 0);
      await page.keyboard.press("Escape");
      await page.locator(".mission-context-action").nth(extermIndex).click();
      await page.locator("#missionDialog[open]").waitFor();
      assert.equal(await page.locator("#missionDialog .tactical-grid, #missionDialog .mission-creature-details").count(), 0);
      const details = page.locator("#missionDialog details");
      assert.equal(await details.getAttribute("open"), null);
      await details.locator("summary").click();
      assert.match(await details.innerText(), /Evidências|Prova|Sucesso/);
      await page.locator("#missionDialog .encounter-mission-action").click();
      assert.equal(await page.locator("#missionDialog .encounter-mission-action").count(), 0);
      assert.match(await page.locator("#missionDialog").innerText(), /já registrados/);
      await page.locator("#missionClose").click();
      await page.locator(".mission-context-action").nth(extermIndex).click();
      assert.equal(await page.locator("#missionDialog .encounter-mission-action").count(), 0);
      await page.locator("#missionClose").click();
      credited = true;
    }
    if (node.contentType === "camp") {
      if (node.type === "unknown") await page.getByRole("button", { name: "Iniciar descanso" }).click();
      else await page.locator(".rest-choice").click();
      assert.match(await page.locator("#nodeDialog").innerText(), /Descanso registrado/);
      sinceRestMinutes = 0;
      assert.equal(await page.locator("#timeTrackerValue").innerText(), "0min");
      assert.equal(await page.locator("#totalTimeTrackerValue").innerText(), formatElapsedTime(totalMinutes));
    }
    await page.locator(".complete-choice").click();
    if (node.id === reinforcedNodeId) assert.equal(await page.locator(".creature-reinforcement").count(), 0);
    assert.equal(await page.locator("#nodeDialog .node-progress-status").innerText(), "Encontro concluído");
    assert.equal(await page.locator(".node").nth(index).getAttribute("data-progress"), "completed");
    assert.equal(await page.locator(".node").nth(index).locator(".node-progress-badge text").textContent(), "✓");
    await page.locator("#nodeDialogClose").click();
  }
  assert.equal(exploredChecked, true);
  assert.equal(credited, true);
  assert.equal(await page.locator("#advanceNodeFloorButton").isDisabled(), false);
  assert.match(await page.locator("#nodeMapGuidance").innerText(), /Andar concluído/);
  const code = await exportSession(page);
  const saved = decodeSessionCode(code);
  assert.ok(saved.missions.selected.find(m => m.id === "qa-extermination").progress.current > 0);
  assert.equal(saved.state.completed.length, 5);
  assert.deepEqual(new Map(saved.state.resolvedEncounters).get(reinforcedNodeId).items[0].reinforcement, { attack: true, hitPoints: true });
  await page.screenshot({ path: "tmp/forest-mvp-qa/mission-route.png", fullPage: true });
  await page.close();
  const restored = await pageFor();
  const [fileChooser] = await Promise.all([
    restored.waitForEvent("filechooser", { timeout: 5000 }),
    restored.getByRole("button", { name: "Importar arquivo de sessão" }).click()
  ]);
  await fileChooser.setFiles({
    name: "mega-dungeon-andar-15.txt",
    mimeType: "text/plain",
    buffer: Buffer.from(code)
  });
  await restored.locator("#rangeDialog").waitFor({ state: "hidden" });
  assert.equal(await restored.locator('.node[data-progress="completed"]').count(), 5);
  assert.equal(await restored.locator("#advanceNodeFloorButton").isDisabled(), false);
  const roundTrip = decodeSessionCode(await exportSession(restored));
  assert.deepEqual(roundTrip.missions, saved.missions);
  assert.deepEqual(roundTrip.state, saved.state);
  assert.equal(saved.state.totalElapsedMinutes, totalMinutes);
  assert.equal(saved.state.elapsedMinutes, sinceRestMinutes);
  await restored.locator("#advanceNodeFloorButton").click();
  assert.equal(await restored.locator("#floorInput").inputValue(), "16");
  assert.match(await restored.locator("#nodeMapGuidance").innerText(), /Escolha um nodo/);
  const advanced = decodeSessionCode(await exportSession(restored));
  assert.deepEqual(advanced.missions, saved.missions);
  assert.equal(advanced.state.totalElapsedMinutes, totalMinutes);
  assert.equal(advanced.state.elapsedMinutes, sinceRestMinutes);
  assert.equal(advanced.forestExpedition.floors.find(f => f.floor === 15).state.completed.length, 5);
  await restored.close();
  console.log("Objetivos, contador sem duplicação, descanso, conclusão, salvar/restaurar e avanço: passaram.");
}

async function bossFlow() {
  const expedition = prepareForestExpedition({ seed: "qa-boss", profile, startFloor: 20, depth: 3, missions: [] });
  const entry = expedition.floors[0];
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)));
  const path = missionPath(entry);
  for (const node of path) {
    await page.locator(".node").nth(entry.levels.flat().findIndex(n => n.id === node.id)).click();
    await page.locator(".route-choice").click();
    if (node.type === "boss") {
      await page.locator("[aria-label='Mostrar criaturas e armadilhas']").click();
      assert.match(await page.locator("#nodeDialog").innerText(), /Quimera/);
      const dialog = page.locator("#nodeDialog");
      const heads = dialog.locator(".chimera-heads li");
      const dragonIndex = node.chimeraHeads.findIndex(head => head.name === "Dragão");
      assert.ok(dragonIndex >= 0, "A seed do teste deve sortear o Dragão");
      assert.deepEqual(await heads.locator("h5").allTextContents(),
        node.chimeraHeads.map((head, index) => `${index + 1}. ${head.name}`));
      assert.equal(await dialog.getByRole("button", { name: "Adicionar criatura" }).count(), 0);
      await dialog.getByRole("button", { name: "Iniciativa +2" }).click();
      await dialog.getByRole("button", { name: "Ataque +1" }).click();
      const summary = dialog.locator(".chimera-health-summary");
      const amount = dialog.getByRole("spinbutton", { name: "Quantidade de PV" });
      await amount.fill("18");
      await dialog.getByRole("button", { name: "Aplicar dano" }).click();
      assert.match(await summary.innerText(), /320\/333 PV/);
      await dialog.getByRole("spinbutton", { name: "PV extras da Quimera" }).fill("25");
      await dialog.getByRole("button", { name: "Aplicar PV extras" }).click();
      assert.match(await summary.innerText(), /345\/358 PV/);
      const useBreath = dialog.getByRole("button", { name: "Usar sopro" });
      await useBreath.click();
      await dialog.getByRole("button", { name: "Recarregar sopro" }).click();
      await dialog.getByRole("combobox", { name: "Alvo do dano" }).selectOption(String(dragonIndex));
      await dialog.getByRole("combobox", { name: "Tipo de dano" }).selectOption(node.chimeraHeads[dragonIndex].weakness);
      await amount.fill("10");
      await dialog.getByRole("button", { name: "Aplicar dano" }).click();
      assert.match(await summary.innerText(), /335\/358 PV/);
      assert.match(await heads.nth(dragonIndex).innerText(), /Atordoada/);
      assert.equal(await useBreath.isEnabled(), false);
      await dialog.getByRole("button", { name: "Fim do turno da Quimera" }).click();
      await useBreath.click();
      await dialog.locator("#nodeDialogClose").click();
      const bossCode = await exportSession(page);
      const restored = await pageFor(bossCode, { width: 390, height: 844 });
      await restored.locator(".node").nth(entry.levels.flat().indexOf(node)).click();
      await restored.getByRole("button", { name: "Mostrar criaturas e armadilhas" }).click();
      assert.match(await restored.locator(".chimera-health-summary").innerText(), /358\/358 PV/);
      assert.match(await restored.locator(".chimera-heads li").nth(dragonIndex).innerText(), /atordoamento já usado.*Sopro em recarga/s);
      const viewport = await restored.locator("#nodeDialogContent").evaluate(el => ({ scroll: el.scrollWidth, client: el.clientWidth }));
      assert.ok(viewport.scroll <= viewport.client + 2);
      await restored.close();
      await page.locator(".node").nth(entry.levels.flat().indexOf(node)).click();
      await page.locator("[aria-label='Abrir mapa tático']").click();
      await page.keyboard.press("Escape");
      assert.equal(await page.locator("#nodeDialog").evaluate(el => el.open), true, "Escape must close only the tactical map, keeping the encounter open");
    }
    await page.locator(".complete-choice").click();
    await page.locator("#nodeDialogClose").click();
  }
  assert.equal(await page.locator("#advanceNodeFloorButton").innerText(), "Faixa concluída");
  assert.equal(await page.locator("#nodeMapGuidance").innerText(), "Etapa concluída.");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#missionButton").click();
  const width = await page.locator("#missionDialog").evaluate(el => ({ scroll: el.scrollWidth, client: el.clientWidth }));
  assert.ok(width.scroll <= width.client + 2);
  await page.screenshot({ path: "tmp/forest-mvp-qa/mobile.png", fullPage: true });
  await page.locator("#missionClose").click();
  await page.locator("#legendToggle").click();
  await page.locator(".legend-progress").scrollIntoViewIfNeeded();
  const legend = await page.locator("#legendPanel").boundingBox();
  assert.ok(legend.y >= 0 && legend.y + legend.height <= 844);
  await page.screenshot({ path: "tmp/forest-mvp-qa/mobile-legend.png", fullPage: true });
  await page.close();
  console.log("Quimera fixa, conclusão da faixa e modal mobile: passaram.");
}

async function configurationFailure() {
  const expedition = prepareForestExpedition({ seed: "qa-config-base", profile, startFloor: 19, depth: 8, missions: [
    objective("specialHunt", "Serpe", "serpe", 1, 19),
    objective("extermination", "Infecto", "infecto", 15)
  ] });
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)));
  const before = decodeSessionCode(await exportSession(page));
  await page.locator("#depthInput").fill("3");
  await page.evaluate(() => { Math.random = () => 0.25; Date.now = () => 1000; });
  await page.locator("#generateButton").click();
  assert.match(await page.locator("#info").innerText(), /Não há nodos suficientes/);
  const after = decodeSessionCode(await exportSession(page));
  assert.deepEqual(after, before, "A failed reconfiguration must preserve the entire expedition");
  await page.close();
  console.log("Configuração impossível é explicada e preserva a sessão anterior: passou.");
}

async function futureAndLegacyFlow() {
  const expedition = prepareForestExpedition({ seed: "qa-future-binding", profile, startFloor: 15, missions: [
    objective("recovery", "uma bússola desregulada", "bussola", 1, 16)
  ] });
  const binding = expedition.missions[0].integration.bindings[0];
  assert.equal(binding.nodeId, 0);
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)));
  await page.locator(".node").first().click();
  await page.locator(".route-choice").click();
  await page.locator("#nodeDialogClose").click();
  await page.locator("#missionButton").click();
  assert.match(await page.locator("#missionDialog").innerText(), /andares seguintes/);
  assert.equal(await page.locator("#missionDialog").getByRole("button", { name: "Abrir encontro", exact: true }).count(), 0);
  await page.screenshot({ path: "tmp/forest-mvp-qa/future-mission.png", fullPage: true });
  await page.close();

  const legacy = await pageFor(encodeSessionCode({
    v: 1, mode: "node-map", profile: profile.id, floor: 11, depth: 3, baseDc: 15,
    mapSeed: "qa-legacy-forest", unknownPaths: false,
    state: { chosenByLevel: [], attempted: [], explored: [], rested: [], elapsedMinutes: 0 }
  }));
  await legacy.locator(".node.is-active").first().click();
  await legacy.locator(".route-choice").click();
  assert.equal(await legacy.locator(".complete-choice").count(), 0);
  assert.equal(await legacy.locator("#nodeDialog .node-progress-status").innerText(), "Rota percorrida");
  await legacy.locator("#nodeDialogClose").click();
  assert.ok(await legacy.locator(".node.is-active").count() > 0);
  const saved = decodeSessionCode(await exportSession(legacy));
  assert.equal(saved.baseDc, 15);
  assert.equal(saved.forestExpedition, undefined);
  await legacy.locator("#floorInput").selectOption("12");
  assert.equal(await legacy.locator("#advanceNodeFloorButton").isDisabled(), true);
  assert.match(await legacy.locator("#nodeMapGuidance").innerText(), /Gere o mapa do andar selecionado/);
  await legacy.close();
  console.log("Missão futura não colide com ID atual; sessão legada preserva geração e fluxo: passaram.");
}

async function outdoorSceneFlow() {
  let expedition;
  let entry;
  let scene;
  let safeCamp;
  for (let attempt = 0; attempt < 100 && (!scene || !safeCamp); attempt++) {
    const candidate = prepareForestExpedition({ seed: `qa-outdoor-${attempt}`, profile, startFloor: 18, missions: [] });
    const floor = candidate.floors[0];
    const fake = floor.levels[0].find(node => node.scene?.kind === "falseRest");
    const safe = floor.levels[0].find(node => node.type === "unknown" && node.contentType === "camp");
    if (!scene && fake) {
      expedition = candidate;
      entry = floor;
      scene = fake;
    }
    if (!safeCamp && safe) safeCamp = { expedition: candidate, node: safe };
  }
  assert.ok(scene, "A amostra precisa de um descanso falso na entrada do andar.");
  assert.ok(safeCamp, "A amostra precisa de um acampamento seguro na entrada do andar.");
  const code = encodeSessionCode(sessionFor(expedition));
  const index = entry.levels.flat().indexOf(scene);
  const page = await pageFor(code, { width: 768, height: 1024 });
  const dialog = page.locator("#nodeDialog");
  await page.locator(".node").nth(index).click();
  assert.equal(await dialog.locator("#nodeDialogType").textContent(), "Caminho desconhecido");
  assert.equal(await dialog.locator(".outdoor-scene").count(), 0);
  assert.equal(await dialog.getByRole("button", { name: "Iniciar descanso" }).count(), 0);
  await dialog.locator(".route-choice").click();
  assert.equal(await dialog.locator(".outdoor-scene").count(), 0);
  assert.equal(await dialog.locator("#nodeDialogType").textContent(), "Acampamento");
  assert.match(await page.locator(".node").nth(index).getAttribute("aria-label"), /^Acampamento,/);
  assert.equal(await dialog.locator(".rest-choice").count(), 0);
  assert.equal(await dialog.getByRole("button", { name: "Mostrar criaturas e armadilhas" }).count(), 0);
  assert.equal(await page.locator(".node.is-active").count(), 0);
  const shelter = await dialog.innerText();
  const campIcon = await page.locator(".node").nth(index).locator(".node-icon").getAttribute("href");
  const safePage = await pageFor(encodeSessionCode(sessionFor(safeCamp.expedition)), { width: 768, height: 1024 });
  const safeIndex = safeCamp.expedition.floors[0].levels.flat().indexOf(safeCamp.node);
  await safePage.locator(".node").nth(safeIndex).click();
  await safePage.locator(".route-choice").click();
  assert.equal(await safePage.locator("#nodeDialog").innerText(), shelter);
  assert.equal(await safePage.locator(".node").nth(safeIndex).locator(".node-icon").getAttribute("href"), campIcon);
  await safePage.getByRole("button", { name: "Iniciar descanso" }).click();
  assert.match(await safePage.locator("#nodeDialog").innerText(), /Descanso registrado/);
  assert.equal(await safePage.locator("#timeTrackerValue").innerText(), "0min");
  await safePage.close();
  await dialog.locator("#nodeDialogClose").click();
  const saved = await exportSession(page);
  await page.close();

  const restored = await pageFor(saved);
  await restored.locator(".node").nth(index).click();
  const restoredDialog = restored.locator("#nodeDialog");
  assert.equal(await restoredDialog.locator("#nodeDialogType").textContent(), "Acampamento");
  const elapsed = await restored.locator("#timeTrackerValue").innerText();
  await restoredDialog.getByRole("button", { name: "Iniciar descanso" }).click();
  assert.equal(await restoredDialog.locator("#nodeDialogType").textContent(), "Emboscada");
  assert.match(await restored.locator(".node").nth(index).getAttribute("aria-label"), /^Emboscada,/);
  assert.match(await restoredDialog.locator(".outdoor-scene").innerText(), /Descanso interrompido/);
  assert.ok(await restoredDialog.locator(".encounter-list-item.is-creature").count() > 0);
  assert.equal(await restoredDialog.getByRole("button", { name: "Iniciar descanso" }).count(), 0);
  assert.equal(await restored.locator("#timeTrackerValue").innerText(), elapsed);
  assert.equal(await restored.locator(".node.is-active").count(), 0);
  await restoredDialog.locator("#nodeDialogClose").click();
  const ambushCode = await exportSession(restored);
  const encounter = new Map(decodeSessionCode(ambushCode).state.resolvedEncounters).get(scene.id);
  assert.equal(calculateCombatND(encounter.items), scene.challenge.encounter);
  assert.equal(encounter.budget.total, scene.challenge.total);
  await restored.close();

  const ambushed = await pageFor(ambushCode);
  await ambushed.locator(".node").nth(index).click();
  const ambushDialog = ambushed.locator("#nodeDialog");
  assert.equal(await ambushDialog.locator("#nodeDialogType").textContent(), "Emboscada");
  assert.equal(await ambushDialog.getByRole("button", { name: "Iniciar descanso" }).count(), 0);
  assert.equal(await ambushed.locator(".node.is-active").count(), 0);
  await ambushDialog.getByText("Confirmar conclusão da emboscada", { exact: true }).click();
  await ambushDialog.locator("#nodeDialogClose").click();
  assert.equal(await ambushed.locator(".node.is-active").count(), scene.links.length);
  await ambushed.close();

  const avoided = await pageFor(saved);
  await avoided.locator(".node").nth(index).click();
  await avoided.locator(".complete-choice").click();
  assert.equal(await avoided.getByRole("button", { name: "Iniciar descanso" }).count(), 0);
  await avoided.locator("#nodeDialogClose").click();
  const avoidedSession = decodeSessionCode(await exportSession(avoided));
  assert.equal(new Map(avoidedSession.state.resolvedEncounters).has(scene.id), false);
  await avoided.close();
  console.log("Descanso falso, emboscada opcional, salvamento e liberação da próxima rota: passaram.");
}

async function creatureHealthFlow() {
  let expedition;
  let entry;
  let node;
  for (let attempt = 0; attempt < 60 && !node; attempt++) {
    expedition = prepareForestExpedition({ seed: `qa-health-${attempt}`, profile, startFloor: 14, missions: [] });
    entry = expedition.floors[0];
    node = entry.levels[0].find(candidate => {
      resolveNodeEncounter(candidate, { mapSeed: expedition.seed });
      return canRerollNodeCreatures(candidate) && getCreatureUnits(candidate.resolvedEncounter.items[0]).length >= 2;
    });
  }
  assert.ok(node);
  const item = node.resolvedEncounter.items[0];
  const max = getCreatureUnits(item)[0].max;
  const nodeIndex = entry.levels.flat().indexOf(node);
  const page = await pageFor(encodeSessionCode(sessionFor(expedition)), { width: 768, height: 1024 });
  const dialog = page.locator("#nodeDialog");
  await page.locator(".node").nth(nodeIndex).click();
  await dialog.locator(".route-choice").click();
  const environmentBounds = await dialog.boundingBox();
  await dialog.getByRole("button", { name: "Mostrar criaturas e armadilhas" }).click();
  const combatBounds = await dialog.boundingBox();
  await dialog.getByRole("button", { name: "Abrir mapa tático" }).click();
  const map = page.locator(".tactical-map-fullscreen-panel");
  assert.deepEqual(combatBounds, await map.boundingBox(), "A ficha de combate deve ocupar a mesma área que o mapa tático");
  assert.deepEqual(environmentBounds, combatBounds, "A modal deve manter as dimensões ao trocar de tela");
  await map.getByRole("button", { name: "Fechar", exact: true }).click();
  await page.setViewportSize({ width: 768, height: 600 });
  const content = dialog.locator("#nodeDialogContent");
  const footer = dialog.locator(".modal-footer");
  const footerBounds = await footer.boundingBox();
  assert.ok(footerBounds.y + footerBounds.height <= 600, "O rodapé deve estar visível antes de rolar");
  assert.ok(await content.evaluate(element => {
    element.scrollTop = element.scrollHeight;
    return element.scrollTop;
  }), "O conteúdo da ficha deve rolar");
  assert.deepEqual(await footer.boundingBox(), footerBounds, "O rodapé deve permanecer fixo durante a rolagem");
  await footer.getByRole("button", { name: "Mostrar clima e terreno" }).click();
  await footer.getByRole("button", { name: "Mostrar criaturas e armadilhas" }).click();
  assert.equal(await content.evaluate(element => element.scrollTop), 0);
  await page.setViewportSize({ width: 768, height: 1024 });
  assert.equal(await dialog.locator(".encounter-detail-card").evaluate(card => getComputedStyle(card).maxHeight), "none");
  const reroll = dialog.getByRole("button", { name: "Rerrolar criaturas" });
  const units = dialog.getByRole("combobox", { name: "Criatura para registrar PV" });
  const amount = dialog.getByRole("spinbutton", { name: "Quantidade de PV" });
  assert.equal(await reroll.count(), 1);
  await units.selectOption("1");
  await amount.fill("3");
  await dialog.getByRole("button", { name: "Aplicar dano" }).click();
  assert.equal(await reroll.count(), 0);
  assert.match(await units.locator("option").nth(0).innerText(), new RegExp(`${max}/${max} PV`));
  assert.match(await units.locator("option").nth(1).innerText(), new RegExp(`${max - 3}/${max} PV`));
  await dialog.getByRole("button", { name: "Adicionar criatura" }).click();
  assert.equal(await units.locator("option").count(), item.quantity + 1);
  assert.match(await units.locator("option").last().innerText(), new RegExp(`${max}/${max} PV`));
  await amount.fill("1");
  await dialog.getByRole("button", { name: "Curar" }).click();
  assert.match(await units.locator("option").nth(1).innerText(), new RegExp(`${max - 2}/${max} PV`));
  await dialog.locator("#nodeDialogClose").click();
  const exported = decodeSessionCode(await exportSession(page));
  const encounter = new Map(exported.state.resolvedEncounters).get(node.id);
  assert.deepEqual(encounter.budget, node.resolvedEncounter.budget);
  assert.equal(encounter.items[0].quantity, item.quantity);
  assert.equal(encounter.items[0].unitDamage, undefined);
  assert.equal(encounter.lastHealthEdit, undefined);
  assert.equal(encounter.temporaryAdjustments, undefined);
  await page.locator(".node").nth(nodeIndex).click();
  assert.equal(await units.locator("option").count(), item.quantity + 1);
  assert.equal(await reroll.count(), 0);
  assert.match(await units.locator("option").nth(1).innerText(), new RegExp(`${max - 2}/${max} PV`));
  await page.reload();
  await page.getByRole("button", { name: "Continuar expedição · Andar 14" }).click();
  await page.locator(".node").nth(nodeIndex).click();
  await dialog.getByRole("button", { name: "Mostrar criaturas e armadilhas" }).click();
  assert.equal(await reroll.count(), 1);
  assert.equal(await units.locator("option").count(), item.quantity);
  assert.equal(await dialog.getByRole("button", { name: "Desfazer último lançamento" }).isEnabled(), false);
  assert.match(await units.locator("option").nth(1).innerText(), new RegExp(`${max}/${max} PV`));
  await dialog.locator("#nodeDialogClose").click();

  await page.getByRole("button", { name: "Gerar encontro manual" }).click();
  const manual = page.locator("#manualEncounterDialog");
  await manual.getByRole("button", { name: "Gerar encontro", exact: true }).click();
  await manual.locator(".encounter-list-item.is-creature").first().click();
  assert.equal(await manual.getByRole("button", { name: "Adicionar criatura" }).isEnabled(), true);
  const creature = manual.getByLabel("Ficha da criatura");
  const budget = manual.getByLabel("Orçamento de combate");
  const list = manual.locator(".encounter-list-item");
  const detail = manual.locator(".creature-detail-card");
  await budget.selectOption("8");
  for (const [id, book, reflex, ammo, pdfPage] of [
    ["gnoll-filibusteiro", "Ameaças de Arton", 7, 20, 118],
    ["gnoll-filibusteiro-livro-basico", "Livro Básico", 11, 10, 297]
  ]) {
    await creature.selectOption({ label: `Gnoll Filibusteiro · ${book}` });
    assert.equal(await creature.inputValue(), id);
    assert.equal(await budget.isEnabled(), false);
    await manual.getByRole("button", { name: "Gerar encontro", exact: true }).click();
    assert.equal(await list.count(), 1);
    assert.match(await list.first().innerText(), new RegExp(`1 x Gnoll Filibusteiro · ${book}`));
    const text = await detail.innerText();
    assert.match(text, /ND 2/);
    assert.ok(text.includes(`REF +${reflex}`));
    assert.ok(text.includes(`Balas x${ammo}`));
    assert.ok(text.includes("Mosquete +12"));
    assert.ok(text.includes(`PDF p. ${pdfPage}`));
  }
  for (const [id, book, axeBonus, pdfPage] of [
    ["orc-mutante", "Ameaças de Arton", 20, 36],
    ["orc-mutante-livro-basico", "Livro Básico", 11, 292]
  ]) {
    const label = `Orc Mutante · ${book}`;
    await creature.selectOption(id);
    await manual.getByRole("button", { name: "Gerar encontro", exact: true }).click();
    assert.deepEqual(await list.locator("strong").allTextContents(), [`1 x ${label}`]);
    const text = await detail.innerText();
    assert.match(text, /ND 5/);
    assert.ok(text.includes(`Machado de guerra +${axeBonus}`));
    assert.ok(text.includes("mordida +20"));
    assert.ok(text.includes(`PDF p. ${pdfPage}`));
  }
  for (const [id, name, book, nd, pdfPage] of [
    ["gnoll-saqueador", "Gnoll Saqueador", "Ameaças de Arton", 1, 118],
    ["gnoll-saqueador-livro-basico", "Gnoll Saqueador", "Livro Básico", 1, 296],
    ["gargula", "Gárgula", "Ameaças de Arton", 2, 127],
    ["gargula-livro-basico", "Gárgula", "Livro Básico", 2, 293],
    ["golem-de-ferro", "Golem de Ferro", "Ameaças de Arton", 10, 132],
    ["golem-de-ferro-livro-basico", "Golem de Ferro", "Livro Básico", 10, 294],
    ["capelao-de-guerra", "Capelão de Guerra", "Ameaças de Arton", 4, 143],
    ["capelao-de-guerra-livro-basico", "Capelão de Guerra", "Livro Básico", 4, 301],
    ["gorlogg", "Gorlogg", "Ameaças de Arton", 1, 219],
    ["gorlogg-livro-basico", "Gorlogg", "Livro Básico", 1, 297],
    ["ogro", "Ogro", "Ameaças de Arton", 4, 43],
    ["ogro-livro-basico", "Ogro", "Livro Básico", 4, 299],
    ["chefe-bandido", "Chefe Bandido", "Ameaças de Arton", 1, 47],
    ["chefe-bandido-livro-basico", "Chefe Bandido", "Livro Básico", 1, 295]
  ]) {
    const label = `${name} · ${book}`;
    await creature.selectOption({ label });
    assert.equal(await creature.inputValue(), id);
    await manual.getByRole("button", { name: "Gerar encontro", exact: true }).click();
    assert.deepEqual(await list.locator("strong").allTextContents(), [`1 x ${label}`]);
    const text = await detail.innerText();
    assert.ok(text.includes(`ND ${nd}`));
    assert.ok(text.includes(`PDF p. ${pdfPage}`));
  }
  assert.match(await detail.innerText(), /Uma vez por rodada, causa \+2d6.*alvo desprevenido ou flanqueado/);
  for (const [name, book, nd, pdfPage, sheetText] of [
    ["Reishid", "Ameaças de Arton", 8, "58", /alcance natural que esteja desprevenido/],
    ["Reishid", "Livro Básico", 8, "320–321", /alvo adjacente que esteja desprevenido/],
    ["Avatar de Aharadak", "Ameaças de Arton", "S", "64", /Quatro tentáculos \+58/],
    ["Avatar de Aharadak", "Deuses de Arton", "S", "153", /Sete garras \+67/],
    ["Avatar de Kallyadranoch", "Ameaças de Arton", "S", "155", /Duas garras \+58/],
    ["Avatar de Kallyadranoch", "Deuses de Arton", 20, "173", /Mordida \+52/]
  ]) {
    const label = `${name} · ${book}`;
    await creature.selectOption({ label });
    await manual.getByRole("button", { name: "Gerar encontro", exact: true }).click();
    assert.deepEqual(await list.locator("strong").allTextContents(), [`1 x ${label}`]);
    assert.equal(await manual.locator(".encounter-budget").innerText(), `ND do combate: ${nd}`);
    const text = await detail.innerText();
    assert.match(text, sheetText);
    assert.ok(text.includes(`PDF p. ${pdfPage}`));
  }
  for (const [id, patterns] of [
    ["horda-de-otyughs", [/PDF p\. 301/, /Defesa por 10 ou mais/]],
    ["enxame-kobold", [/Solo/, /condição ruim para lançar magias/]],
    ["coruja-druida", [/Chamado da Dama Altiva \(Padrão\) · Mágica/i, /PONTOS DE MANA\s+55/]],
    ["serpe-ameacas-de-arton", [/Serpe · Ameaças de Arton/i, /PDF p\. 312/]],
    ["cardume-de-selakos", [/Defesa por 10 ou mais/, /PDF p\. 325/]],
    ["kraken", [/Chamado do Mar \(Padrão\) · Mágica/i, /PDF p\. 327/]],
    ["finntroll-senhor-de-estabulo", [/Corpo Vegetal/i, /PDF p\. 344–345/]],
    ["abahddon", [/ND S/, /PONTOS DE MANA\s+156/, /PDF p\. 262–263/]],
    ["aspecto-de-lin-wu", [/Dragão Divino/i, /Religião CD 29/, /PDF p\. 271–272/]],
    ["aspecto-de-khalmyr", [/Cura pelas Mãos \(Movimento\) · Mágica/i, /Religião CD 30/]],
    ["pilly", [/Lacaio/, /Raio Iridescente/i, /PDF p\. 276–277/]],
    ["probo", [/Especial/, /Negar Recurso \(Movimento, 3 PM\)/i, /Encontrar o Culpado · Mágica/i]],
    ["dragonete", [/Especial/, /Ladrão de Magias \(Reação\) · Mágica/i, /PDF p\. 291/]],
    ["eiradaan-nobre", [/Montaria Celestial/i, /PONTOS DE MANA\s+65/, /PDF p\. 298–299/]],
    ["allaraz", [/Especial/, /Proteger Criação \(Reação, 10 PM\) · Mágica/i, /PDF p\. 304–305/]],
    ["dabbus", [/Poderes Cósmicos Fenomenais \(Completa\)/i, /Viagem Planar sem componente material/, /PONTOS DE MANA\s+98/]],
    ["gigante-dos-mares", [/Coquetel Praiano/i, /Aguardente:.*Sidra:.*Vinho:/s, /PDF p\. 314/]],
    ["gigante-maximo", [/ND S\+/, /PONTOS DE VIDA\s+Especial \(veja Grande Demais\)/i, /3\.000 PV/, /PDF p\. 316–317/]]
  ]) {
    await creature.selectOption(id);
    await manual.getByRole("button", { name: "Gerar encontro", exact: true }).click();
    const text = await detail.innerText();
    for (const pattern of patterns) assert.match(text, pattern, id);
  }
  await creature.selectOption("");
  assert.equal(await budget.isEnabled(), true);
  await page.close();

  const dungeon = await pageFor(encodeSessionCode({
    v: 1, mode: "extended-exploration", profile: "dungeon-1-10", floor: 10, mapSeed: "qa-pv-matriarca",
    extendedState: { floor: 10, phase: "boss" }
  }));
  const matriarch = dungeon.getByRole("button", { name: "Abrir encontro da Matriarca" });
  const bossScene = dungeon.locator(".scene-modal");
  await matriarch.click();
  await bossScene.getByRole("spinbutton", { name: "Quantidade de PV" }).fill("8");
  await bossScene.getByRole("button", { name: "Aplicar dano" }).click();
  await bossScene.getByRole("button", { name: "Fechar", exact: true }).click();
  const dungeonSave = await exportSession(dungeon);
  const originalBoss = decodeSessionCode(dungeonSave).extendedState.bossEncounter;
  assert.ok(originalBoss?.encounterNode.resolvedEncounter.items.length);
  assert.ok(originalBoss.encounterNode.resolvedEncounter.items.every(item => !item.unitDamage));
  await dungeon.close();
  const resumed = await pageFor(dungeonSave);
  await resumed.getByRole("button", { name: "Abrir encontro da Matriarca" }).click();
  assert.equal(await resumed.locator(".scene-modal").getByRole("button", { name: "Desfazer último lançamento" }).isEnabled(), false);
  await resumed.locator(".scene-modal").getByRole("button", { name: "Fechar", exact: true }).click();
  const resumedBoss = decodeSessionCode(await exportSession(resumed)).extendedState.bossEncounter;
  assert.deepEqual(resumedBoss, originalBoss);
  await resumed.close();
  console.log("PV individuais, adição, bloqueio da rerrolagem, encontro manual e restauração nos dois perfis: passaram.");
}

async function offlineFlow() {
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 }, serviceWorkers: "allow" });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url);
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
  await page.reload();
  await page.waitForFunction(async () => {
    const cache = await caches.open("mega-dungeon-v3");
    const urls = (await cache.keys()).map(request => request.url);
    return urls.some(url => /\/assets\/.*\.js$/.test(url)) && urls.some(url => /\/assets\/.*\.css$/.test(url));
  });
  await page.context().setOffline(true);
  await page.reload();
  await page.locator("#rangeDialog[open]").waitFor();
  await page.locator("#floorRangeInput").selectOption(profile.id);
  await page.locator("#rangeConfirm").click();
  await page.locator(".mission-dialog-actions .generate-button").click();
  await page.locator("#missionDialog").waitFor({ state: "hidden" });
  assert.ok(await page.locator(".node.is-active").count() > 0);
  assert.equal(decodeSessionCode(await exportSession(page)).profile, profile.id);
  await page.close();
  console.log("Build de produção recarrega, inicia floresta e exporta sessão sem rede após cache: passou.");
}

try {
  await newSelection(0);
  await newSelection(3);
  await missionFlow();
  await outdoorSceneFlow();
  await creatureHealthFlow();
  await bossFlow();
  await configurationFailure();
  await futureAndLegacyFlow();
  if (production) await offlineFlow();
  assert.deepEqual(errors, [], "Erros de JavaScript no navegador");
  console.log("QA do MVP 11–20 passou sem erros de JavaScript.");
} finally {
  await browser.close();
}
