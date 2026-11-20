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
  await closeAndClick();
  await page.locator("#treasureDialog[open]").waitFor({ timeout: 5000 });

  const tabs = page.locator("#treasureDialog [role=tab]");
  assert.deepEqual(await tabs.allInnerTexts(), ["Rolar", "Consultar"]);
  const panels = page.locator("#treasureDialog [role=tabpanel]");
  assert.equal(await panels.count(), 2);
  assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "true");
  assert.equal(await panels.nth(0).isVisible(), true);
  assert.equal(await panels.nth(1).isVisible(), false);

  await tabs.nth(1).click();
  assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
  assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "false");
  assert.equal(await panels.nth(1).isVisible(), true);
  assert.equal(await panels.nth(0).isVisible(), false);

  await page.locator("#treasureClose").click();
  await page.locator("#treasureDialog").waitFor({ state: "hidden" });
  assert.deepEqual(errors, [], `pageerror: ${errors.join("; ")}`);
  console.log("qaTreasure OK");
} finally {
  await browser.close();
}
