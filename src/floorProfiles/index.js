import { dungeon1to10Profile } from "./dungeon1to10.js";
import { forest11to20Profile } from "./forest11to20.js";
import { archipelago21to30Profile } from "./archipelago21to30.js";

export const FLOOR_PROFILES = [dungeon1to10Profile, forest11to20Profile, archipelago21to30Profile];

export function getFloorProfile(profileId) {
  return FLOOR_PROFILES.find((profile) => profile.id === profileId) || FLOOR_PROFILES[0];
}
