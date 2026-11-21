import assert from "node:assert/strict";
import test from "node:test";
import { archipelago21to30Profile } from "../src/floorProfiles/archipelago21to30.js";
import { createArchipelagoState } from "../src/archipelagoState.js";
import { createRng } from "../src/random.js";

test("sessão salva com ícone .svg antigo restaura o .webp do tema", () => {
  const generated = createArchipelagoState(archipelago21to30Profile, createRng("icones"));
  const saved = generated.exportSessionState();
  const legacyIslands = Object.fromEntries(Object.entries(saved.islands).map(([floor, island]) => [
    floor,
    { ...island, icon: island.icon.replace(/\.webp$/, ".svg") }
  ]));

  const restored = createArchipelagoState(archipelago21to30Profile, createRng("outra"));
  restored.initialize(archipelago21to30Profile, createRng("outra"), { ...saved, islands: legacyIslands });

  for (const island of restored.getSnapshot().islands) {
    assert.match(island.icon, /\.webp$/, `ilha ${island.floor} manteve ${island.icon}`);
    assert.equal(island.icon, saved.islands[island.floor].icon);
  }
});

test("ícone de ilha sem tema conhecido é preservado", () => {
  const state = createArchipelagoState(archipelago21to30Profile, createRng("x"));
  const saved = state.exportSessionState();
  const islands = { ...saved.islands, 21: { ...saved.islands[21], themeId: "inexistente", icon: "/custom.webp" } };
  state.initialize(archipelago21to30Profile, createRng("x"), { ...saved, islands });
  assert.equal(state.getSnapshot().islands[0].icon, "/custom.webp");
});
