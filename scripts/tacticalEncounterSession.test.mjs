import assert from "node:assert/strict";
import test from "node:test";
import { createTacticalEncounterSession } from "../src/tacticalEncounterSession.js";

const player = { id: "p1", name: "Jogador 1", side: "ally", kind: "party", x: 1, y: 1, width: 1, height: 1 };
const enemy = { id: "e1", name: "Rei Tirano", side: "enemy", kind: "boss", x: 4, y: 4, width: 3, height: 3 };
const scene = { width: 12, height: 10, terrain: Array(120).fill("floor"), features: [], markers: [], climate: [], pieces: [player, enemy] };
const map = { scene };

test("keeps movement and temporary pieces until another encounter is opened", () => {
  const session = createTacticalEncounterSession();
  const a = session.openMap("a", map);
  a.movePiece("e1", 11, 9);
  const first = a.addPiece({ name: "Lobo invocado", size: "Grande", side: "enemy" });
  a.addPiece({ name: "Lobo invocado", size: "Grande", side: "enemy" });
  assert.equal(first.kind, "extra");
  assert.deepEqual(a.pieces.filter(piece => piece.kind === "extra").map(piece => piece.glyph), ["LI1", "LI2"]);
  assert.deepEqual(a.pieces.filter(piece => piece.id === "e1").map(({ x, y }) => [x, y]), [[9, 7]]);
  assert.equal(session.openMap("a", map), a);
  assert.equal(scene.pieces.length, 2);
  assert.deepEqual([enemy.x, enemy.y], [4, 4]);
  session.activate("b");
  assert.equal(session.openMap("a", map).pieces.some(piece => piece.kind === "extra"), false);
});

test("reconciles changed encounter pieces and only changes the formation for party size", () => {
  const session = createTacticalEncounterSession();
  session.setPartySize(2);
  const a = session.openMap("a", map);
  a.movePiece("p1", 4, 4);
  const additionalEnemy = { ...enemy, id: "e2", x: 8 };
  const updated = session.openMap("a", { scene: { ...scene, pieces: [player, enemy, additionalEnemy] } });
  assert.equal(updated, a);
  assert.deepEqual(a.pieces.filter(piece => piece.kind === "party").map(piece => [piece.x, piece.y]).slice(0, 1), [[4, 4]]);
  assert.equal(a.pieces.filter(piece => piece.kind === "party").length, 2);
  assert.equal(a.pieces.filter(piece => piece.kind === "boss").length, 2);
  session.setPartySize(1);
  assert.equal(a.pieces.filter(piece => piece.kind === "party").length, 1);
  assert.equal(a.pieces.filter(piece => piece.kind === "boss").length, 2);
});

test("removes starting pieces for the active encounter without changing its formation", () => {
  const session = createTacticalEncounterSession();
  session.setPartySize(1);
  const state = session.openMap("a", map);
  state.selectPiece(enemy.id);
  state.removePiece(enemy.id);
  state.removePiece(player.id);
  assert.equal(state.selectedId, null);
  assert.equal(state.pieces.length, 0);
  assert.equal(session.openMap("a", map).pieces.length, 0);
  assert.equal(scene.pieces.length, 2);
  session.activate("b");
  assert.equal(session.openMap("a", map).pieces.length, 2);
});

test("counts selected movement with double diagonals until another piece is selected", () => {
  const session = createTacticalEncounterSession();
  const state = session.openMap("a", map);
  state.selectPiece(enemy.id);
  assert.equal(state.movementSquares, 0);
  assert.equal(state.previewMovement(6, 5), 3);
  assert.equal(state.movementSquares, 0);
  state.movePiece(enemy.id, 6, 5);
  state.selectPiece(enemy.id);
  state.movePiece(enemy.id, 4, 4);
  assert.equal(state.movementSquares, 6);
  assert.equal(session.openMap("a", map).movementSquares, 6);
  state.selectPiece(player.id);
  assert.equal(state.movementSquares, 0);
  state.selectPiece(enemy.id);
  assert.equal(state.movementSquares, 0);
});

test("charges difficult squares, opposing pieces and trench exits along the mapped route", () => {
  const terrain = [...scene.terrain];
  terrain[1 * scene.width + 2] = "difficult";
  terrain[1 * scene.width + 3] = "trench";
  const opponent = { ...player, id: "opponent", kind: "enemy", side: "enemy", x: 4 };
  const state = createTacticalEncounterSession().openMap("a", {
    scene: { ...scene, terrain, pieces: [player, opponent] }
  });
  state.selectPiece(player.id);
  assert.equal(state.previewMovement(4, 1), 5);
  state.movePiece(player.id, 3, 1);
  state.movePiece(player.id, 4, 1);
  assert.equal(state.movementSquares, 5);
});

test("doubles diagonal steps into difficult terrain once even when effects overlap", () => {
  const index = 2 * scene.width + 2;
  const terrain = [...scene.terrain];
  terrain[index] = "swamp";
  const state = createTacticalEncounterSession().openMap("a", {
    scene: { ...scene, terrain, features: [{ type: "wet", indices: [index] }] }
  });
  state.selectPiece(player.id);
  assert.equal(state.previewMovement(2, 2), 4);
});
