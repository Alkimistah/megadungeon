export function createMissionState() {
  let profileId = null;
  let offers = [];
  let selected = [];
  let selectionLocked = false;
  let history = [];

  function getRequiredProgress(mission) {
    return Math.max(1, Number(mission.objective?.quantity || mission.progress?.required || 1));
  }

  function shouldTrackProgress(mission) {
    return mission.category === "extermination" || mission.integration?.capability === "progress-counter";
  }

  function normalizeMissionProgress(mission) {
    if (!shouldTrackProgress(mission)) return { ...mission };

    const required = getRequiredProgress(mission);
    const current = Math.min(required, Math.max(0, Number(mission.progress?.current || 0)));

    return {
      ...mission,
      progress: {
        current,
        required
      }
    };
  }

  function startBoard(nextProfileId, nextOffers) {
    profileId = nextProfileId;
    offers = nextOffers.map((mission) => ({ ...mission, status: "offered" }));
    selected = [];
    selectionLocked = false;
  }

  function confirmSelection(selectedIds) {
    const ids = new Set(selectedIds.slice(0, 3));

    selected = offers
      .filter((mission) => ids.has(mission.id))
      .map((mission) => normalizeMissionProgress({ ...mission, status: "selected" }));
    offers = [];
    selectionLocked = true;
  }

  function replaceSelected(nextSelected) {
    selected = nextSelected.map((mission) => normalizeMissionProgress(mission));
  }

  function markCompleted(missionId) {
    selected = selected.map((mission) => mission.id === missionId
      ? {
        ...mission,
        status: "completed",
        integration: {
          ...mission.integration,
          state: "resolved"
        }
      }
      : mission
    );
  }

  function adjustProgress(missionId, delta) {
    selected = selected.map((mission) => {
      if (mission.id !== missionId || !shouldTrackProgress(mission) || mission.status === "completed") {
        return mission;
      }

      const withProgress = normalizeMissionProgress(mission);
      const required = withProgress.progress.required;
      const current = Math.min(required, Math.max(0, withProgress.progress.current + delta));

      return {
        ...withProgress,
        progress: {
          current,
          required
        },
        integration: {
          ...withProgress.integration,
          state: current >= required ? "ready" : "pending"
        }
      };
    });
  }

  function getOffers() {
    return offers.map((mission) => ({ ...mission }));
  }

  function getSelected() {
    return selected.map((mission) => ({ ...mission }));
  }

  function getMissionsForFloor(floor) {
    return selected.filter((mission) => {
      if (mission.status === "completed") return false;
      const destination = mission.destination || {};
      if (destination.floor === floor) return true;
      return (mission.integration?.bindings || []).some((binding) => binding.floor === floor);
    });
  }

  function exportSessionState() {
    return {
      profileId,
      selectionLocked,
      selected,
      history
    };
  }

  function importSessionState(sessionState = null) {
    profileId = sessionState?.profileId || null;
    offers = [];
    selected = (sessionState?.selected || []).map((mission) => normalizeMissionProgress(mission));
    selectionLocked = Boolean(sessionState?.selectionLocked);
    history = sessionState?.history || [];
  }

  function reset() {
    profileId = null;
    offers = [];
    selected = [];
    selectionLocked = false;
    history = [];
  }

  return {
    adjustProgress,
    confirmSelection,
    exportSessionState,
    getMissionsForFloor,
    getOffers,
    getSelected,
    importSessionState,
    markCompleted,
    replaceSelected,
    reset,
    startBoard
  };
}
