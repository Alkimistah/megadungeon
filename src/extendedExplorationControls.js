export function canConfigureExtendedExplorationFloor(profile, snapshot) {
  if (profile?.mode !== "extended-exploration") return true;
  if (profile.extendedExploration?.allowManualFloorBacktracking !== false) return true;
  if (!snapshot) return true;

  const hasUsedApproach = (snapshot.usedApproachIds || snapshot.usedSuccessfulSkills || []).length > 0;
  const hasCurrentScene = Boolean(
    snapshot.currentResult ||
    snapshot.currentResults?.length ||
    snapshot.finalEncounter ||
    snapshot.bossEncounter
  );
  const hasProgress =
    Number(snapshot.successes || 0) > 0 ||
    Number(snapshot.failures || 0) > 0 ||
    Number(snapshot.elapsedMinutes || 0) > 0 ||
    hasUsedApproach ||
    hasCurrentScene ||
    Boolean(snapshot.resetPending) ||
    Boolean(snapshot.descentPending);

  return snapshot.phase === "exploring" && !hasProgress;
}
