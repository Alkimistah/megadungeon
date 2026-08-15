export function getMissionFloors(profile) {
  return (profile.missionRules?.missionFloors || profile.floors || [])
    .filter((floor) => Number.isInteger(floor) && floor % 10 !== 0);
}

export function validateMission(mission, context) {
  const errors = [];
  const allowedFloors = new Set(context.missionFloors || []);
  const destination = mission.destination || {};

  if (!mission.id) errors.push("Missão sem id.");
  if (!mission.category) errors.push("Missão sem categoria.");
  if (!mission.title || mission.title.includes("{")) errors.push("Título inválido.");
  if (!mission.description || mission.description.includes("{")) errors.push("Descrição inválida.");
  if (!mission.reward?.totalPayout) errors.push("Recompensa sem valor.");

  if (destination.kind === "floor" || destination.kind === "island") {
    if (!allowedFloors.has(destination.floor)) {
      errors.push("Destino fora dos andares permitidos.");
    }
  }

  if (mission.objective?.quantity && mission.objective.quantity < 1) {
    errors.push("Quantidade inválida.");
  }

  if (mission.category === "extermination") {
    if (destination.kind !== "progress") {
      errors.push("Extermínio deve ser uma missão de progresso da faixa.");
    }
    if ((mission.objective?.quantity || 0) < 4) {
      errors.push("Extermínio deve exigir pelo menos quatro inimigos.");
    }
  }

  return {
    errors,
    valid: errors.length === 0
  };
}

export function validateMissionSelection(missions, context) {
  if (missions.length > 3) {
    return {
      valid: false,
      errors: ["Selecione no máximo três missões."]
    };
  }

  const errors = missions.flatMap((mission) => validateMission(mission, context).errors);

  return {
    valid: errors.length === 0,
    errors
  };
}
