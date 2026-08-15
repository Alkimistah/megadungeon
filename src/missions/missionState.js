export function createMissionState() {
  let profileId = null;
  let offers = [];
  let selected = [];
  let selectionLocked = false;
  let history = [];

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
      .map((mission) => ({ ...mission, status: "selected" }));
    offers = [];
    selectionLocked = true;
  }

  function replaceSelected(nextSelected) {
    selected = nextSelected.map((mission) => ({ ...mission }));
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
    selected = sessionState?.selected || [];
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
