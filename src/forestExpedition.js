import { getRecordedExplorationMinutes } from "./appState.js";
import { prepareChimeraHeads } from "./chimeraCombat.js";
import { getEncounterForSave } from "./encounterCreatureHealth.js";
import { generateMapData } from "./generator.js";
import { createRng } from "./random.js";
import { materializeForestFloorMissions } from "./missions/forestMissionIntegration.js";

const GENERATION_VERSION = 5;

/** Prepara a faixa inteira antes de aceitar a seleção: cada vínculo aponta para
 * um mapa real. Os mapas futuros são salvos, não reinterpretados por outra seed. */
export function prepareForestExpedition({ seed, profile, missions, startFloor = 11, depth, baseDc }) {
  if (profile.id !== "forest-11-20") throw new Error("Perfil inválido para a expedição de floresta.");
  if (missions.some(m => m.profileId !== profile.id)) throw new Error("Missão pertence a outra faixa de andares.");
  if (missions.some(m => m.destination?.floor && m.destination.floor < startFloor)) {
    throw new Error("Uma missão selecionada está em andar anterior ao início da expedição.");
  }
  let preparedMissions = structuredClone(missions);
  const floors = [];
  for (const floor of profile.floors.filter(f => f >= startFloor)) {
    const floorDepth = floor === startFloor && depth !== undefined ? depth : profile.recommendations.encountersByFloor[floor];
    const floorDc = floor === startFloor && baseDc !== undefined ? baseDc : profile.recommendations.baseDcByFloor[floor];
    let prepared = null;
    for (let attempt = 0; attempt < 60 && !prepared; attempt++) {
      const mapSeed = `${seed}:forest:${floor}:${attempt}`;
      const levels = generateMapData(floorDepth, floorDc, profile, floor, createRng(mapSeed), { version: GENERATION_VERSION, mapSeed });
      for (const node of levels.flat()) {
        if (node.generationVersion !== 5) node.encounterSeed = `${floor}:${node.encounterSeed}`;
      }
      try {
        const nextMissions = materializeForestFloorMissions({ floor, levels, missions: preparedMissions, profile });
        prepared = { floor, depth: floorDepth, baseDc: floorDc, mapSeed, levels };
        preparedMissions = nextMissions;
      } catch (error) {
        if (!error.message.includes("rota compatível")) throw error;
      }
    }
    if (!prepared) throw new Error(`Não foi possível posicionar as missões no andar ${floor}. Altere a seleção ou aumente a profundidade.`);
    if (floor === 20) prepareChimeraHeads(prepared.levels, prepared.mapSeed);
    floors.push(prepared);
  }
  for (const mission of preparedMissions.filter(m => m.status !== "completed")) {
    const bindings = (mission.integration?.bindings || []).filter(b => b.kind === "node");
    const quantity = bindings.reduce((n, b) => n + b.quantity, 0);
    if (!bindings.length || (mission.category === "extermination" && quantity < mission.objective.quantity)) {
      throw new Error(`Não há nodos suficientes para cumprir a missão “${mission.title}”. Altere a seleção ou a profundidade.`);
    }
  }
  return { version: 1, generationVersion: GENERATION_VERSION, profileId: profile.id, seed, startFloor, floors, missions: preparedMissions };
}

export function serializeForestExpedition(expedition) {
  return {
    version: 1, profileId: expedition.profileId, seed: expedition.seed, startFloor: expedition.startFloor,
    ...(expedition.generationVersion ? { generationVersion: expedition.generationVersion } : {}),
    floors: expedition.floors.map(({ levels, ...entry }) => ({
      ...entry,
      levels: levels.map(row => row.map(({ links, ...node }) => {
        if (node.resolvedEncounter) node.resolvedEncounter = getEncounterForSave(node.resolvedEncounter);
        return { ...structuredClone(node), links: links.map(next => next.id) };
      }))
    }))
  };
}

export function restoreForestExpedition(snapshot) {
  if (snapshot?.version !== 1 || snapshot.profileId !== "forest-11-20" || !Array.isArray(snapshot.floors) || !snapshot.floors.length) {
    throw new Error("Expedição de floresta inválida.");
  }
  const restored = structuredClone(snapshot);
  const floorIds = new Set();
  for (const entry of restored.floors) {
    if (floorIds.has(entry.floor)) throw new Error("Andar duplicado na expedição.");
    floorIds.add(entry.floor);
    const nodes = entry.levels.flat();
    const byId = new Map(nodes.map(node => [node.id, node]));
    if (byId.size !== nodes.length) throw new Error("Nodo duplicado no andar.");
    for (const node of nodes) {
      if (node.resolvedEncounter) node.resolvedEncounter = getEncounterForSave(node.resolvedEncounter);
      node.links = node.links.map(id => {
        const next = byId.get(id);
        if (!next || next.level !== node.level + 1) throw new Error("Conexão inválida na expedição.");
        return next;
      });
    }
    if (entry.floor === 20) prepareChimeraHeads(entry.levels, entry.mapSeed || `${restored.seed}:forest:20:0`);
  }
  return restored;
}

export function withForestExplorationTime(expedition, floor, sessionState = {}) {
  if (Number.isFinite(sessionState.totalElapsedMinutes)) return sessionState;

  let recordedMinutes = 0;
  let totalElapsedPartial = false;
  for (const entry of expedition.floors) {
    if (entry.floor > floor) continue;
    const progress = entry.floor === floor ? sessionState : entry.state;
    if (progress) {
      recordedMinutes += getRecordedExplorationMinutes(entry.levels, progress);
    } else {
      totalElapsedPartial = true;
    }
  }

  const elapsedMinutes = sessionState.elapsedMinutes || 0;
  return {
    ...sessionState,
    totalElapsedMinutes: Math.max(recordedMinutes, elapsedMinutes),
    totalElapsedPartial: totalElapsedPartial || elapsedMinutes > recordedMinutes
  };
}
