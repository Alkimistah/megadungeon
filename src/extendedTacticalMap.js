import { readLegacyTacticalScene } from "./tacticalScene.js";
import { getTacticalEncounterUnits, getTacticalPartyPieces, placeTacticalEncounterUnits } from "./tacticalScenePieces.js";

function coordinates(index, width) {
  return [index % width, Math.floor(index / width)];
}

export function createExtendedTacticalMap(scene) {
  const { tacticalMap, encounterNode, gimmick } = scene;
  if (!tacticalMap) return null;
  const { cells, width, height, template } = tacticalMap;
  const legacy = readLegacyTacticalScene(tacticalMap);
  const positions = type => cells.flatMap((cell, index) => cell === type ? [coordinates(index, width)] : []);
  const party = getTacticalPartyPieces(positions("party"));
  const bossStarts = legacy.pieces.filter(piece => piece.kind === "boss").map(({ x, y }) => [x, y]);
  const enemyStarts = positions("enemy");
  const units = getTacticalEncounterUnits(encounterNode?.resolvedEncounter?.items, {
    isBoss: encounterNode?.type === "boss",
    bossCreatureId: encounterNode?.fixedComposition?.creatures?.[0]?.id
  });
  const hiddenStarts = positions("hidden");
  const blocked = new Set(["wall", "pit", "obstacle", "party", "reinforcement"]);
  const fallback = cells.flatMap((cell, index) => blocked.has(cell) ? [] : [coordinates(index, width)]);
  const arachnidBoss = template === "boss-arachnid-arena";
  const supports = arachnidBoss ? positions("web").sort((a, b) => b[0] - a[0]) : [];
  const items = encounterNode?.resolvedEncounter?.items ?? [];
  const added = unit => {
    const [, itemIndex, , ordinal] = unit.id.split(":");
    const item = items[Number(itemIndex)];
    return Number(ordinal) >= (item.quantity || 1) - (item.addedQuantity || 0);
  };
  const ordered = [...units.filter(unit => !added(unit)), ...units.filter(added)];
  const starts = [...bossStarts, ...enemyStarts, ...hiddenStarts, ...supports];
  const enemies = placeTacticalEncounterUnits(ordered, starts, fallback, { width, height }, party, {
    canOccupy: index => !blocked.has(cells[index])
  });
  const terrain = [...legacy.terrain];
  const features = [...legacy.features];
  const hiddenByIndex = new Map(hiddenStarts.map(([x, y], index) => [
    y * width + x, enemies[bossStarts.length + enemyStarts.length + index]?.id
  ]));
  const markers = legacy.markers.flatMap(marker => {
    if (marker.type !== "hidden") return [marker];
    const pieceId = hiddenByIndex.get(marker.indices[0]);
    if (!pieceId) return [marker];
    if (scene.sceneId === "pedagio-goblin") return [];
    return [{ type: "hidden", label: marker.label, pieceId }];
  });

  if (arachnidBoss) {
    const underWeb = cells.flatMap((cell, index) => ["boss", "reinforcement"].includes(cell) ? [index] : []);
    features.push({ type: "web", label: "Teias do covil", indices: underWeb });
  }
  const open = fallback.filter(([x, y]) => cells[y * width + x] === "floor");
  const near = ([x, y]) => [...open].sort((a, b) =>
    Math.abs(a[0] - x) + Math.abs(a[1] - y) - Math.abs(b[0] - x) - Math.abs(b[1] - y));
  const indexOf = ([x, y]) => y * width + x;
  const threat = positions("trap")[0] ?? positions("mechanism")[0] ?? positions("door").at(-1);
  switch (gimmick?.name) {
    case "Alarme":
    case "Mecanismos": {
      const position = gimmick.name === "Alarme"
        ? near(enemyStarts[0] ?? [width - 2, height - 2])[0]
        : positions("mechanism")[0] ?? near(threat ?? [width - 2, height - 2])[0];
      if (position) markers.push({ type: "mechanism", label: gimmick.name === "Alarme" ? "Alarme" : "Mecanismo sabotável", indices: [indexOf(position)] });
      break;
    }
    case "Gosma viva":
      for (const position of near([Math.floor(width / 2), Math.floor(height / 2)]).slice(0, 2)) terrain[indexOf(position)] = "difficult";
      break;
    case "Primeiras teias":
    case "Caçada silenciosa":
    case "Véspera do covil": {
      const anchors = gimmick.name === "Primeiras teias" ? [[width - 4, 3]] : [[width / 2, 2], [width / 2, height - 3]];
      for (const anchor of anchors) {
        const indices = near(anchor).slice(0, 3).map(indexOf);
        if (indices.length) features.push({ type: "web", label: "Teias da cena", indices });
      }
      if (gimmick.name === "Caçada silenciosa") {
        for (const piece of enemies) {
          if (!markers.some(marker => marker.type === "hidden" && marker.pieceId === piece.id)) {
            markers.push({ type: "hidden", label: "Inimigo oculto", pieceId: piece.id });
          }
        }
      }
      break;
    }
  }

  return {
    ...tacticalMap,
    scene: { ...legacy, terrain, features, markers, pieces: [...party, ...enemies] }
  };
}
