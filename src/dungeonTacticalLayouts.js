import { randomInt } from "./random.js";

export const DUNGEON_MAP_WIDTH = 16;
export const DUNGEON_MAP_HEIGHT = 12;

// Retângulos inclusivos [x inicial, y inicial, x final, y final].
export const dungeonTacticalLayouts = [
  {
    id: "straight-corridor",
    floor: [[0, 5, 15, 6]],
    entry: ["left", 5], exits: [["right", 5]]
  },
  {
    id: "dead-end",
    floor: [[0, 5, 12, 6]],
    entry: ["left", 5]
  },
  {
    id: "elbow",
    floor: [[0, 7, 10, 8], [9, 0, 10, 8]],
    entry: ["left", 7], exits: [["top", 9]]
  },
  {
    id: "double-elbow",
    floor: [[0, 8, 6, 9], [5, 3, 6, 9], [5, 3, 15, 4]],
    entry: ["left", 8], exits: [["right", 3]]
  },
  {
    id: "t-junction",
    floor: [[7, 5, 8, 11], [0, 4, 15, 5]],
    entry: ["bottom", 7], exits: [["left", 4], ["right", 4]]
  },
  {
    id: "crossroads",
    floor: [[0, 5, 15, 6], [7, 0, 8, 11]],
    entry: ["left", 5], exits: [["top", 7], ["right", 5], ["bottom", 7]]
  },
  {
    id: "corridor-hall", hall: true,
    floor: [[0, 5, 6, 6], [6, 2, 13, 9], [13, 5, 15, 6]],
    entry: ["left", 5], exits: [["right", 5]], doors: [[[5, 5], [5, 6]]]
  },
  {
    id: "zigzag-hall", hall: true,
    floor: [[0, 8, 3, 9], [3, 2, 13, 9], [13, 8, 15, 9]],
    walls: [[5, 2, 5, 6], [8, 5, 8, 9], [11, 2, 11, 6]],
    entry: ["left", 8], exits: [["right", 8]]
  },
  {
    id: "side-room", room: true,
    floor: [[0, 7, 15, 8], [6, 5, 7, 7], [4, 2, 9, 4]],
    entry: ["left", 7], exits: [["right", 7]], doors: [[[6, 5], [7, 5]]]
  },
  {
    id: "two-side-rooms", room: true,
    floor: [[0, 5, 15, 6], [5, 4, 5, 5], [3, 1, 7, 3], [10, 6, 10, 7], [8, 8, 12, 10]],
    entry: ["left", 5], exits: [["right", 5]], doors: [[[5, 4]], [[10, 7]]]
  },
  {
    id: "parallel-corridors",
    floor: [[0, 3, 13, 4], [3, 8, 15, 9], [3, 4, 4, 8], [12, 4, 13, 8]],
    entry: ["left", 3], exits: [["right", 8]]
  },
  {
    id: "linked-rooms", hall: true,
    floor: [[0, 5, 3, 6], [3, 3, 6, 8], [7, 5, 8, 6], [9, 2, 13, 9], [13, 5, 15, 6]],
    entry: ["left", 5], exits: [["right", 5]], doors: [[[7, 5], [7, 6]]]
  }
];

function paint(cells, rectangles, tile) {
  for (const [left, top, right, bottom] of rectangles) {
    for (let y = top; y <= bottom; y += 1) {
      for (let x = left; x <= right; x += 1) cells[y][x] = tile;
    }
  }
}

function passage([edge, offset]) {
  const coordinates = {
    left: [0, offset, 1, 0],
    right: [DUNGEON_MAP_WIDTH - 1, offset, -1, 0],
    top: [offset, 0, 0, 1],
    bottom: [offset, DUNGEON_MAP_HEIGHT - 1, 0, -1]
  };
  const [x, y, dx, dy] = coordinates[edge];
  const cells = [[x, y], [x + Math.abs(dy), y + Math.abs(dx)]];
  return { cells, inner: cells.map(([column, row]) => [column + dx, row + dy]), dx, dy };
}

export function createDungeonTacticalLayout(layout, rng) {
  const cells = Array.from({ length: DUNGEON_MAP_HEIGHT }, () =>
    Array(DUNGEON_MAP_WIDTH).fill("wall"));
  paint(cells, layout.floor, "floor");
  paint(cells, layout.walls ?? [], "wall");

  const entry = passage(layout.entry);
  const exits = (layout.exits ?? []).map(passage);
  const openPassages = [entry];
  for (const exit of exits) {
    const tile = rng() < 0.35 ? "wall" : rng() < 0.25 ? "door" : "floor";
    for (const [x, y] of exit.cells) cells[y][x] = tile;
    if (tile !== "wall") openPassages.push(exit);
  }
  for (const door of layout.doors ?? []) {
    if (rng() < 0.45) {
      for (const [x, y] of door) cells[y][x] = "door";
    }
  }

  const party = [...entry.inner, ...entry.inner.map(([x, y]) => [x + entry.dx, y + entry.dy])];
  for (const [x, y] of party) cells[y][x] = "party";

  const mirror = randomInt(rng, 0, 3);
  const flipX = mirror % 2 === 1;
  const flipY = mirror >= 2;
  const transform = ([x, y]) => [flipX ? DUNGEON_MAP_WIDTH - 1 - x : x, flipY ? DUNGEON_MAP_HEIGHT - 1 - y : y];
  if (flipX) cells.forEach(row => row.reverse());
  if (flipY) cells.reverse();
  return {
    cells,
    openPassages: openPassages.map(({ cells, inner }) => ({ cells: cells.map(transform), inner: inner.map(transform) }))
  };
}
