import { getCreatureById } from "./creatureCatalog/index.js";
import { pick } from "./random.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { archipelagoEcologyContexts } from "./floorProfiles/archipelago21to30.js";

const COMBAT_CHANCE = 0.7;

function pickMangroveVariant(tasks, rng, previous = null) {
  const available = tasks.map((_, index) => index).filter(index => index !== previous);
  const combat = available.filter(index => tasks[index][1] === "combate");
  const other = available.filter(index => tasks[index][1] !== "combate");
  if (!combat.length || !other.length) return pick(rng, available);

  const roll = rng();
  const testChance = 1 - COMBAT_CHANCE;
  return roll < testChance
    ? other[Math.floor(roll / testChance * other.length)]
    : combat[Math.floor((roll - testChance) / COMBAT_CHANCE * combat.length)];
}

export function createIslandPilot(floor, themeId, dc, rng) {
  if (themeId !== "mangrove") return {};
  return {
    pilot: "mangrove-sectors",
    objectives: MANGROVE_SECTORS.map(({ tasks }, index) => createMangroveSector(floor, index, pickMangroveVariant(tasks, rng), dc)),
    guardianComposition: Math.floor(rng() * GUARDIAN_COMPOSITIONS.length)
  };
}

export function createIslandPilotScene(island, profile, mapSeed, composition) {
  const objective = island.objectives.find(item => item.type === "combate");
  const challenge = objective.challenge;
  const scene = {
    id: `ilha-${objective.id}-${objective.variant ?? 0}`,
    type: "normal",
    environment: {
      terrain: { name: "Pântano", effect: "Canais rasos e lama entre as raízes do mangue.", features: [{ name: "Lodaçal", effect: "Terreno difícil." }] },
      climate: []
    },
    ecologyContext: archipelagoEcologyContexts.byTheme[island.themeId],
    challenge: { total: challenge, encounter: challenge, creatures: challenge, trap: 0, climate: 0, terrain: 0 },
    creature: { targetChallenge: challenge, type: objective.preferredType }
  };
  if (composition) scene.fixedComposition = { ...composition, traps: [], useWeaponVariation: false };
  resolveNodeEncounter(scene, { mapSeed, profile });
  return scene;
}

const MANGROVE_SECTORS = [
  {
    direction: "N", name: "Norte", effect: "−15% dos PV máximos do guardião",
    tasks: [
      ["Cortar o suprimento do covil", "exploração", "Obtenha 3 sucessos antes de 2 falhas para desviar o canal. Use Sobrevivência para ler a corrente, Atletismo para firmar a barreira e Ofício (carpinteiro) para vedá-la. Cada etapa exige um sucesso. Na segunda falha, a corrente rompe a barreira."],
      ["Envenenar a isca do guardião", "preparação", "Obtenha 2 sucessos antes de 2 falhas. Prepare a isca com Ofício (alquimista) ou Sobrevivência e deixe-a no rastro do guardião com Furtividade. Na segunda falha, a isca é perdida."],
      ["Expulsar os predadores do canal", "combate", "Afaste os predadores que se alimentam no canal para interromper o suprimento do covil."],
      ["Tomar a reserva do covil", "combate", "Derrote os defensores da margem e corte as amarras das reservas antes que elas sejam levadas para o covil.", "humanoid"],
      ["Interceptar a caçada", "combate", "Enfrente as criaturas que trazem a caça para o covil. Se o grupo vencer, pode soltar ou dispersar as presas para cortar o suprimento.", "animal"]
    ]
  },
  {
    direction: "S", name: "Sul", effect: "−2 na Defesa do guardião",
    tasks: [
      ["Derrubar as raízes do abrigo", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Alcance a amarra com Acrobacia ou Atletismo e derrube a cobertura com Atletismo. Na segunda falha, as raízes cedem para dentro do covil e continuam servindo de abrigo."],
      ["Drenar a lama do covil", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Identifique o canal de escoamento com Investigação ou Sobrevivência e libere a comporta pelo mecanismo com Ladinagem ou à força com Atletismo. Na segunda falha, a lama volta a cobrir o covil."],
      ["Tomar a passagem das raízes", "combate", "Derrote as criaturas que ocupam a passagem e abra o acesso pelas raízes."],
      ["Defender a comporta", "combate", "As criaturas atacam enquanto a comporta está aberta. Derrote-as para manter o escoamento e expor o covil.", "monster"],
      ["Romper a escolta dos reparadores", "combate", "Intercepte a escolta que leva estacas para reforçar o abrigo. Vença o combate e jogue o material no canal antes que a cobertura seja refeita.", "humanoid"]
    ]
  },
  {
    direction: "L", name: "Leste", effect: "−4 na Iniciativa do guardião",
    tasks: [
      ["Eliminar os vigias do canal", "combate", "Derrote as criaturas do encontro antes de avançar. Elas avisam o guardião se o grupo abandonar a cena."],
      ["Silenciar o alarme", "infiltração", "Obtenha 2 sucessos antes de 2 falhas. Atravesse a zona vigiada com Furtividade ou Enganação e inutilize a concha com Ladinagem ou Ofício (artesão). Na segunda falha, o alarme alerta o guardião."],
      ["Romper a emboscada da vazante", "combate", "Derrote as criaturas que se escondem nos baixios e limpe a rota de aproximação ao Centro.", "animal"],
      ["Interceptar o mensageiro", "combate", "Impeça que a criatura à frente chegue ao Centro para dar o alarme. Se ela ainda puder agir no fim da terceira rodada, foge para avisar o guardião. O mestre registra sucesso se o grupo a impedir de levar o aviso.", "humanoid"]
    ]
  },
  {
    direction: "O", name: "Oeste", effect: "−1 em Fortitude, Reflexos e Vontade do guardião",
    tasks: [
      ["Romper o vínculo com o altar", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Identifique a âncora do vínculo com Religião ou Misticismo, remova-a com Ladinagem ou Atletismo e sele o altar com Religião ou Misticismo. Cada etapa exige um sucesso. Na segunda falha, o vínculo se recompõe."],
      ["Recolher as oferendas", "recuperação", "Obtenha 3 sucessos antes de 2 falhas. Identifique as oferendas com Investigação, desfaça o selo com Religião e erga o recipiente com Atletismo antes que a maré cubra o santuário. Cada etapa exige um sucesso. Na segunda falha, a maré cobre as oferendas."],
      ["Derrotar os sentinelas do santuário", "combate", "Derrote os sentinelas do santuário e remova as oferendas do altar."],
      ["Dispersar os defensores da âncora", "combate", "Derrote as criaturas reunidas ao redor da âncora ritual e rompa o vínculo com o guardião.", "spirit"],
      ["Proteger o círculo de ruptura", "combate", "Uma personagem dedica uma ação padrão por rodada ao círculo ritual. Proteja-a até completar três ações, mesmo sob ataque. Ao concluir o ritual, o mestre pode registrar sucesso.", "undead"]
    ]
  }
];

export const GUARDIAN_COMPOSITIONS = [
  { label: "Catóblepa", creatures: [{ id: "catoblepa", quantity: 1 }] },
  { label: "Elemental do Veneno Médio", creatures: [{ id: "elemental-do-veneno-medio", quantity: 1 }] },
  { label: "Capitão Homem-Piranha e Tempestade de Lagartos", creatures: [
    { id: "homem-piranha-capitao", quantity: 1 }, { id: "tempestade-de-lagartos", quantity: 1 }
  ] }
];

export function createMangroveSector(floor, index, variant, dc) {
  const { direction, name, effect, tasks } = MANGROVE_SECTORS[index];
  const [title, type, description, preferredType] = tasks[variant];
  const challenge = type === "combate" ? 6 : ["exploração", "ritual"].includes(type) ? 3 : 2;
  const testDc = challenge === 2 && type !== "recuperação" ? dc + 2 : dc;
  return {
    id: `${floor}-${index + 1}`, direction, name, effect, variant, title, type,
    challenge,
    ...(preferredType ? { preferredType } : {}),
    description: type === "combate" ? description : `${description} Em caso de falha num teste, repita a etapa. CD ${testDc}.`
  };
}

export function reopenMangroveSector(island, rng, dc) {
  const resolved = island.objectives.filter(({ id }) => island.outcomes?.[id]);
  if (!resolved.length || rng() >= resolved.length * 0.1) return null;
  const previous = pick(rng, resolved);
  const index = island.objectives.indexOf(previous);
  const variant = pickMangroveVariant(MANGROVE_SECTORS[index].tasks, rng, previous.variant);
  const lostSuccess = island.outcomes[previous.id] === "success";
  island.objectives[index] = createMangroveSector(island.floor, index, variant, dc);
  delete island.outcomes[previous.id];
  delete island.scenes?.[previous.id];
  return { id: previous.id, name: previous.name, lostSuccess };
}

export function createMangroveCombat(island, objective, profile, mapSeed) {
  return createIslandPilotScene({ ...island, objectives: [objective] }, profile, mapSeed);
}

export function createMangroveGuardian(island, compositionIndex, profile, mapSeed) {
  const scene = createIslandPilotScene({
    ...island,
    objectives: [{ id: `${island.floor}-centro`, type: "combate", challenge: island.baseChallenge }]
  }, profile, mapSeed, GUARDIAN_COMPOSITIONS[compositionIndex]);
  const leader = scene.resolvedEncounter.items[0];
  const creature = leader.creatureData ?? getCreatureById(leader.creatureId);
  const stats = { ...creature.stats };
  const won = index => island.outcomes[island.objectives[index].id] === "success";
  if (won(0)) stats.hitPoints = Math.ceil(stats.hitPoints * 0.85);
  if (won(1)) stats.defense -= 2;
  if (won(2)) stats.initiative -= 4;
  if (won(3)) for (const save of ["fortitude", "reflex", "will"]) stats[save] -= 1;
  leader.creatureData = { ...creature, stats };
  return scene;
}
