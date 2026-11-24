import { createRng, pick } from "./random.js";

const crossingTraps = new Set(["virote", "lamina-na-parede", "pendulo-de-teto", "bloco-de-pedra"]);
const normal = value => (value ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function selectPlan(name, has, objectives, submerged, trapId, rng) {
  const hasObjective = (type, target) => objectives.some(objective =>
    objective.targetType === type && (!target || normal(objective.targetName) === target));
  const recovery = objectives.some(objective => objective.targetType === "object" &&
    !normal(objective.targetName).includes("preso em raizes"));
  if (name === "Floresta") {
    if (hasObjective("clue", "cinzas frias em uma clareira")) return "mission-clearing";
    if (has("Clareira")) return "enclosed-clearing";
    return pick(rng, ["forest-trail", "dense-woods"]);
  }
  if (name === "Pântano") {
    if (hasObjective("challenge", "cruzar terreno inundado")) return "mission-flooded-crossing";
    return pick(rng, ["marsh-bank", "continuous-marsh", "marsh-islets"]);
  }
  if (name === "Aquático") {
    if (recovery) {
      return "mission-riverbed";
    }
    if (submerged) return "submerged-bed";
    if (has("Água parada") && !has("Água corrente")) return "lake";
    return pick(rng, ["river-ford", "river-channel", "river-bridge"]);
  }
  if (name === "Colinas") {
    if (recovery && has("Penhasco")) {
      return "mission-gorge";
    }
    if (has("Paredão")) return pick(rng, ["cliff-full", "cliff-end"]);
    if (has("Penhasco")) {
      const plans = ["gorge", "gorge-bridge", "gorge-two-crossings", "cliff-full", "cliff-end"];
      // Quando o perigo é a travessia, as cenas com ponte ganham prioridade.
      if (crossingTraps.has(trapId)) plans.push("gorge-bridge");
      return pick(rng, plans);
    }
    if (has("Inclinação suave") && has("Inclinação íngreme")) return "ridge";
    return "hill-slope";
  }
  if (name === "Planície aberta") return has("Trincheira") ? "open-trench" : "open-field";
  return null;
}

export function createForestTacticalLayout(node, objectives, { width, height }) {
  const terrain = node.environment?.terrain;
  const definitions = terrain?.features ?? [];
  const features = new Set(definitions.filter(feature => !feature.area).map(feature => normal(feature.name)));
  const has = name => features.has(normal(name));
  const submerged = definitions.some(feature => !feature.area &&
    (feature.id === "submersion" || normal(feature.name) === "personagens submersos"));
  const trap = node.resolvedEncounter?.items?.find(item => item.kind === "trap");
  const trapId = trap?.trapId ?? node.trap?.id;
  const rng = createRng(`${node.encounterSeed ?? node.id}:forest-tactical-layout`);
  const id = selectPlan(terrain?.name, has, objectives, submerged, trapId, rng);
  if (!id) return null;

  const cells = Array.from({ length: height }, () => Array(width).fill("floor"));
  const right = width - 1;
  const middle = Math.floor(width / 2);
  const center = Math.floor(height / 2);
  const paint = (x1, y1, x2, y2, tile) => {
    for (let y = y1; y <= y2; y += 1) {
      for (let x = x1; x <= x2; x += 1) cells[y][x] = tile;
    }
  };
  const trapPositions = [];
  const prepareRisk = (positions, eligible = crossingTraps.has(trapId)) => {
    if (trap && eligible) trapPositions.push(...positions);
  };
  const objectivePositions = new Map();
  const placeObjective = (x, y, match) => {
    for (const objective of objectives.filter(match)) objectivePositions.set(objective, [x, y]);
  };

  if (["forest-trail", "dense-woods", "enclosed-clearing", "mission-clearing"].includes(id)) {
    const clearingX = middle + 2;
    for (let y = 0; y < height; y += 1) {
      const trailY = center + (y % 4 < 2 ? 0 : 1);
      for (let x = 0; x < width; x += 1) {
        if (id === "forest-trail" && Math.abs(y - trailY) <= 1) continue;
        if (["enclosed-clearing", "mission-clearing"].includes(id) &&
            x >= clearingX && x <= right - 2 && y >= 3 && y <= height - 4) {
          cells[y][x] = "clearing";
        } else if ((x * 5 + y * 7) % (id === "forest-trail" ? 13 : 9) < 2) {
          cells[y][x] = "tree";
        } else if (has("Folhagens") && (x + y * 2) % 5 < 2) {
          cells[y][x] = "foliage";
        } else if (has("Vegetação rasteira") && (x * 2 + y) % 6 < 2) {
          cells[y][x] = "difficult";
        }
      }
    }
    if (has("Inclinação suave")) paint(1, 2, 5, 3, "gentle-slope");
    if (has("Inclinação íngreme")) paint(6, height - 3, 10, height - 2, "steep-slope");
    if (has("Penhasco")) {
      paint(middle + 3, 1, right - 1, 1, "cliff");
      paint(middle + 3, 0, right - 1, 0, "advantage");
    }
    if (id === "mission-clearing") {
      for (let y = 0; y < height; y += 1) {
        paint(middle, y, middle + 1, y, y === center || y === center + 1 ? "floor" : y % 2 ? "tree" : "obstacle");
      }
      paint(2, center, middle - 1, center + 1, "floor");
      prepareRisk([[middle, center], [middle, center + 1]], trapId === "virote");
      placeObjective(clearingX + 3, center, objective => normal(objective.targetName) === "cinzas frias em uma clareira");
    }
  }

  if (["marsh-bank", "continuous-marsh", "marsh-islets", "mission-flooded-crossing"].includes(id)) {
    paint(0, 0, right, height - 1, "water");
    if (has("Lodaçal")) {
      paint(2, 2, middle - 2, 5, "swamp");
      paint(middle + 2, 8, right - 2, height - 2, "swamp");
    }
    if (has("Vegetação alagada")) {
      for (let y = 1; y < height - 1; y += 2) {
        for (let x = (y % 4) + 1; x < right; x += 5) cells[y][x] = "foliage";
      }
    }
    if (has("Árvores retorcidas")) {
      for (const [x, y] of [[1, 2], [5, 8], [middle + 3, 3], [right - 1, 9]]) cells[y][x] = "tree";
    }
    if (id === "marsh-bank") {
      for (let x = 0; x < width; x += 1) {
        const y = center + Math.floor(x / 5) - 1;
        paint(x, y, x, y + 1, "floor");
      }
    } else if (["marsh-islets", "mission-flooded-crossing"].includes(id)) {
      paint(1, 9, 5, 12, "floor");
      paint(middle + 2, 2, right - 2, 5, "floor");
      if (id === "marsh-islets") {
        paint(7, 4, 10, 6, "floor");
        paint(middle + 4, 8, right - 2, 9, "floor");
      } else {
        paint(4, 7, middle - 2, 9, "floor");
        paint(middle + 1, 5, middle + 4, center, "floor");
        paint(middle - 1, center, middle, center + 1, "water");
        prepareRisk([[middle - 1, center], [middle, center]], crossingTraps.has(trapId) || trapId === "fosso-com-estacas");
        placeObjective(middle + 4, 4, objective => normal(objective.targetName) === "cruzar terreno inundado");
      }
    }
  }

  if (["river-ford", "river-channel", "river-bridge", "lake", "submerged-bed", "mission-riverbed"].includes(id)) {
    const river = id.startsWith("river-");
    if (river) {
      for (let y = 0; y < height; y += 1) {
        const bank = middle - 3 + Math.floor(y / 5);
        paint(bank, y, bank + 4, y, "water");
        paint(bank + 1, y, bank + 3, y,
          id === "river-ford" && Math.abs(y - center) <= 1 ? "water" : has("Água corrente") ? "current" : "deep-water");
      }
      if (id === "river-bridge") {
        paint(middle - 3, center, middle + 3, center + 1, "bridge");
        prepareRisk([[middle, center], [middle, center + 1]]);
      } else if (id === "river-ford") {
        prepareRisk([[middle, center], [middle, center + 1]]);
      }
    } else if (id === "submerged-bed" || submerged) {
      paint(0, 0, right, height - 1, "deep-water");
    } else {
      paint(4, 0, right, height - 1, "water");
      paint(6, 2, right, height - 1, "deep-water");
      if (has("Água corrente")) paint(7, 5, right, 6, "current");
    }
    if (["submerged-bed", "mission-riverbed"].includes(id)) {
      for (const [x, y] of [[8, 3], [9, 3], [12, 8], [13, 9], [15, 10], [14, 5]]) {
        cells[y][x] = "obstacle";
      }
    }
    if (id === "mission-riverbed") {
      if (!submerged) prepareRisk([[4, center], [4, center + 1]], trapId === "virote");
      placeObjective(right - 3, height - 4, objective => objective.targetType === "object");
    }
  }

  if (["hill-slope", "ridge", "cliff-full", "cliff-end", "gorge", "gorge-bridge", "gorge-two-crossings", "mission-gorge"].includes(id)) {
    const cliff = id.startsWith("cliff-");
    const gorge = id.startsWith("gorge") || id === "mission-gorge";
    for (let y = 0; y < height; y += 1) {
      const edge = middle - 2 + Math.floor(y / 5);
      if (gorge) {
        paint(edge, y, edge + 3, y, "abyss");
        paint(edge - 1, y, edge - 1, y, "cliff");
        paint(edge + 4, y, edge + 4, y, "cliff");
      } else if (cliff) {
        paint(edge + 1, y, right, y, "advantage");
        if (id === "cliff-full" || y < center) {
          paint(edge, y, edge, y, has("Paredão") ? "escarpment" : "cliff");
        } else {
          paint(edge - 2, y, edge + 2, y, "steep-slope");
        }
      } else {
        const uphill = has("Inclinação íngreme") && (!has("Inclinação suave") || y < center);
        paint(edge, y, edge + 2, y, uphill ? "steep-slope" : "gentle-slope");
        paint(edge + 3, y, id === "ridge" ? edge + 5 : right, y, "advantage");
        if (id === "ridge") paint(edge + 6, y, edge + 8, y, "steep-slope");
      }
    }
    if (cliff || gorge) {
      if (has("Inclinação suave")) paint(3, 2, 5, 4, "gentle-slope");
      if (has("Inclinação íngreme")) paint(3, height - 4, 5, height - 2, "steep-slope");
    }
    if (["gorge-bridge", "gorge-two-crossings", "mission-gorge"].includes(id)) {
      paint(middle - 2, center, middle + 4, center + 1, "bridge");
      if (id === "gorge-two-crossings") paint(middle - 4, 2, middle + 2, 2, "floor");
      const trigger = id === "mission-gorge" ? middle + 3 : middle;
      prepareRisk([[trigger, center], [trigger, center + 1]]);
    }
    if (id === "mission-gorge") {
      paint(right - 4, 3, right, 3, "wall");
      paint(right - 4, height - 4, right, height - 4, "wall");
      paint(right, 3, right, height - 4, "wall");
      placeObjective(right - 1, center - 1, objective => objective.targetType === "object");
    }
  }

  if (id === "open-trench") {
    paint(4, 4, middle, 4, "trench");
    paint(middle, 4, middle, center, "trench");
    paint(middle, center, right - 4, center, "trench");
  }

  const partyY = id === "marsh-bank" ? center - 1
    : terrain.name === "Pântano" || terrain.name === "Aquático" ? height - 4 : center;
  const partyPositions = [[2, partyY], [3, partyY], [2, partyY + 1], [3, partyY + 1]];
  for (const [x, y] of partyPositions) {
    // Um alagado sem terra firme começa com o grupo na água.
    if (!["floor", "water", "deep-water", "swamp", "foliage", "difficult"].includes(cells[y][x])) {
      cells[y][x] = submerged ? "deep-water" : "floor";
    }
  }
  return { id, cells, partyPositions, objectivePositions, trapPositions };
}
