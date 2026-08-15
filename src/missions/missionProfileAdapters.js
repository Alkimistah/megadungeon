function bindMissionToFloor(mission) {
  const floor = mission.destination?.floor;

  if (!floor) return mission;

  return {
    ...mission,
    status: mission.status === "completed" ? "completed" : "materialized",
    integration: {
      ...mission.integration,
      bindings: [{
        kind: mission.destination.kind === "island" ? "island" : "floor",
        floor,
        label: mission.destination.label
      }],
      state: mission.status === "completed" ? "resolved" : "materialized"
    }
  };
}

export function materializeMissionsForCurrentContent({ floor, levels = null, missions }) {
  const nextMissions = missions.map((mission) => {
    if (mission.status === "completed") return mission;

    if (levels && mission.destination?.floor === floor) {
      const candidate = levels
        .flat()
        .find((node) => !["boss", "camp"].includes(node.type));

      if (candidate) {
        const binding = {
          kind: "node",
          floor,
          nodeId: candidate.id,
          label: candidate.label || `Nodo ${candidate.id}`
        };
        candidate.missionBindings = [...(candidate.missionBindings || []), {
          id: mission.id,
          title: mission.title,
          categoryLabel: mission.categoryLabel
        }];

        return {
          ...mission,
          status: "materialized",
          integration: {
            ...mission.integration,
            bindings: [binding],
            state: "materialized"
          }
        };
      }
    }

    return bindMissionToFloor(mission);
  });

  return nextMissions;
}
