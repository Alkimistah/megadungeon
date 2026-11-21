import assert from "node:assert/strict";
import test from "node:test";

import { getNextFloorRange } from "../src/floorProfiles/index.js";

test("getNextFloorRange follows the profile order and ends at the last range", () => {
  assert.equal(getNextFloorRange("dungeon-1-10").id, "forest-11-20");
  assert.equal(getNextFloorRange("forest-11-20").id, "archipelago-21-30");
  assert.equal(getNextFloorRange("archipelago-21-30"), null);
});
