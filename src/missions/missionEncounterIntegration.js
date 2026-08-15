export function getEncounterMissionMatches(item, missions = []) {
  if (item?.kind !== "creature" || !item.creatureId) return [];

  return missions
    .filter((mission) =>
      mission.status !== "completed"
      && mission.category === "extermination"
      && mission.objective?.targetType === "creature"
      && mission.objective?.targetId === item.creatureId
    )
    .map((mission) => {
      const required = Math.max(1, Number(mission.progress?.required || mission.objective?.quantity || 1));
      const current = Math.min(required, Math.max(0, Number(mission.progress?.current || 0)));
      const remaining = Math.max(0, required - current);
      const count = remaining > 0 ? Math.min(remaining, item.quantity || 1) : 0;

      return {
        count,
        mission,
        remaining,
        required,
        current
      };
    });
}
