import { forest11to20Profile } from "./forest11to20.js";

export const FLOOR_PROFILES = [forest11to20Profile];

export function getFloorProfile(profileId) {
  return FLOOR_PROFILES.find((profile) => profile.id === profileId) || FLOOR_PROFILES[0];
}
