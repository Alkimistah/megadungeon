import { createArchipelagoFinalBoss, dinosaurExploration } from "./archipelagoFinalBoss.js";
import { stormExploration } from "./archipelagoStorm.js";
import { floatingExploration } from "./archipelagoFloating.js";
import { pirateFortExploration } from "./archipelagoPirateFort.js";
import { seaCavesExploration } from "./archipelagoSeaCaves.js";
import { volcanicExploration } from "./archipelagoVolcanic.js";
import { atollExploration } from "./archipelagoAtoll.js";
import { coralCoastExploration } from "./archipelagoCoralCoast.js";
import { shipwreckedExploration } from "./archipelagoShipwrecked.js";
import { giantKelpExploration } from "./archipelagoGiantKelp.js";
import { mistExploration } from "./archipelagoMist.js";
import { shipGraveyardExploration } from "./archipelagoShipGraveyard.js";
import { cyclopeanRuinsExploration } from "./archipelagoCyclopeanRuins.js";
import { sacredExploration } from "./archipelagoSacred.js";
import { getEligibleGuardianPenalties, getGuardianPenalty } from "./archipelagoGuardianPenalties.js";
import { getCreatureById } from "./creatureCatalog/index.js";
import { getIslandCreatureRules } from "./archipelagoCreatureRules.js";
import { calculateCombatND } from "./challenge.js";
import { createRng, pick } from "./random.js";
import { hasEncounterAdjustments } from "./encounterCreatureHealth.js";
import { resolveNodeEncounter } from "./encounterResolver.js";
import { archipelagoEcologyContexts } from "./floorProfiles/archipelago21to30.js";

const COMBAT_CHANCE = 0.7;

function pickIslandVariant(tasks, rng, previous = null) {
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
  const config = SECTOR_ISLANDS[themeId];
  if (!config) return {};
  const island = { floor, themeId };
  const variants = config.sectors.map((_, index) => pickIslandVariant(getSectorTasks(config, index), rng));
  const guardianComposition = Math.floor(rng() * config.guardians.length);
  const composition = config.guardians[guardianComposition];
  const guardian = getCreatureById(composition.creatures[0].id);
  const penalties = getEligibleGuardianPenalties(guardian);
  const sectorPenalties = config.sectors.map(sector => {
    if (sector.defaultGuardianBuff) return undefined;
    const [penalty] = penalties.splice(Math.floor(rng() * penalties.length), 1);
    return penalty.id;
  });
  const defenses = guardian.stats.defensesText?.toLowerCase() ?? "";
  const buffs = !config.fixedGuardianBuffs && config.guardianBuffs?.filter(buff =>
    !sectorPenalties.includes(buff.incompatiblePenalty ?? null) && (!buff.eligible || buff.eligible(defenses))
  );
  return {
    pilot: config.pilot,
    objectives: variants.map((variant, index) => {
      const buff = buffs && config.sectors[index].defaultGuardianBuff
        ? buffs.splice(Math.floor(rng() * buffs.length), 1)[0]
        : undefined;
      return createIslandSector(island, index, variant, dc, sectorPenalties[index], buff?.id);
    }),
    guardianComposition: composition.id ?? guardianComposition
  };
}

export function createIslandPilotScene(island, profile, mapSeed, composition) {
  const objective = island.objectives.find(item => item.type === "combate");
  const challenge = objective.challenge;
  const scene = {
    id: `ilha-${objective.id}-${objective.variant ?? 0}`,
    type: "normal",
    environment: {
      terrain: SECTOR_ISLANDS[island.themeId]?.terrain ?? MANGROVE_TERRAIN,
      climate: []
    },
    ecologyContext: archipelagoEcologyContexts.byTheme[island.themeId],
    challenge: { total: challenge, encounter: challenge, creatures: challenge, trap: 0, climate: 0, terrain: 0 },
    creature: { targetChallenge: challenge, type: objective.preferredType }
  };
  if (composition) scene.fixedComposition = { ...composition, traps: [], useWeaponVariation: false };
  if (!composition) scene.creature = getIslandCreatureRules(island, objective, scene.creature);
  if (scene.creature.allowedCreatureIds?.length === 0) return scene;
  const encounter = resolveNodeEncounter(scene, { mapSeed, profile });
  if (scene.creature.allowedCreatureIds && encounter && calculateCombatND(encounter.items) !== challenge) {
    scene.resolvedEncounter = null;
  }
  return scene;
}

const MANGROVE_SECTORS = [
  {
    direction: "N", name: "Canal das Raízes", effect: "−15% dos PV máximos do guardião",
    tasks: [
      ["Cortar o suprimento do covil", "exploração", "Obtenha 3 sucessos antes de 2 falhas para desviar o canal. Use Sobrevivência para ler a corrente, Atletismo para firmar a barreira e Ofício (carpinteiro) para vedá-la. Cada etapa exige um sucesso. Na segunda falha, a corrente rompe a barreira."],
      ["Desviar a trilha pelo mangue", "preparação", "Pegadas recentes levam do canal ao covil. Obtenha 2 sucessos antes de 2 falhas. Use Sobrevivência para achar uma rota entre as raízes e Furtividade para marcá-la sem denunciar o desembarque. Na segunda falha, a água cobre a passagem."],
      ["Expulsar os predadores do canal", "combate", "A água se agita perto das raízes que servem de ponte. Afaste os predadores para garantir a travessia.", "animal"],
      ["Tomar a reserva do covil", "combate", "Há cestos amarrados à margem, prontos para seguir pelo canal. Derrote os defensores e corte as amarras para interromper o transporte.", "humanoid"],
      ["Interceptar a caçada", "combate", "Os caçadores bloqueiam a trilha junto à margem. Vença o combate e solte as presas antes que alcancem o covil.", "humanoid"]
    ]
  },
  {
    direction: "S", name: "Comporta do Lodaçal", effect: "−2 na Defesa do guardião",
    tasks: [
      ["Derrubar as raízes do abrigo", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Alcance a amarra com Acrobacia ou Atletismo e derrube a cobertura com Atletismo. Na segunda falha, as raízes cedem para dentro do covil e continuam servindo de abrigo."],
      ["Drenar a lama do covil", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Identifique o canal de escoamento com Investigação ou Sobrevivência e libere a comporta pelo mecanismo com Ladinagem ou à força com Atletismo. Na segunda falha, a lama volta a cobrir o covil."],
      ["Tomar a passagem das raízes", "combate", "Uma abertura entre as raízes leva ao outro lado da comporta. Vença o combate para liberar a passagem."],
      ["Defender a comporta", "combate", "A comporta range enquanto a lama escoa. As criaturas saem do canal para atacar. Derrote-as para manter a comporta aberta.", "monster"],
      ["Romper a escolta dos reparadores", "combate", "Intercepte a escolta que leva estacas para reforçar o abrigo. Vença o combate e jogue o material no canal antes que a cobertura seja refeita.", "humanoid"]
    ]
  },
  {
    direction: "L", name: "Posto da Vazante", effect: "−4 na Iniciativa do guardião",
    tasks: [
      ["Eliminar os vigias do canal", "combate", "Do posto, os vigias enxergam qualquer movimento nos baixios. Derrote-os para cruzar sem dar tempo ao toque de alarme.", "humanoid"],
      ["Silenciar o alarme", "infiltração", "Obtenha 2 sucessos antes de 2 falhas. Atravesse a zona vigiada com Furtividade ou Enganação e inutilize a concha com Ladinagem ou Ofício (artesão). Na segunda falha, o alarme alerta o guardião."],
      ["Romper a emboscada da vazante", "combate", "Derrote as criaturas que se escondem nos baixios e limpe a rota de aproximação ao Centro.", "animal"],
      ["Interceptar o mensageiro", "combate", "Escolha um mensageiro entre os adversários. Se ele ainda puder fugir ao fim da terceira rodada, alcança o covil e dá o alarme. Registre sucesso se o grupo impedir a fuga.", "humanoid"]
    ]
  },
  {
    direction: "O", name: "Santuário das Oferendas", effect: "−1 em Fortitude, Reflexos e Vontade do guardião",
    tasks: [
      ["Romper o vínculo com o altar", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Identifique a âncora do vínculo com Religião ou Misticismo, remova-a com Ladinagem ou Atletismo e sele o altar com Religião ou Misticismo. Cada etapa exige um sucesso. Na segunda falha, o vínculo se recompõe."],
      ["Recolher as oferendas", "recuperação", "Obtenha 3 sucessos antes de 2 falhas. Identifique as oferendas com Investigação, desfaça o selo com Religião e erga o recipiente com Atletismo antes que a maré cubra o santuário. Cada etapa exige um sucesso. Na segunda falha, a maré cobre as oferendas."],
      ["Derrotar os sentinelas do santuário", "combate", "As oferendas ainda estão no altar, cercadas por sentinelas. Abra caminho pelo santuário e retire-as antes que a maré suba."],
      ["Dispersar os defensores da âncora", "combate", "Derrote as criaturas reunidas ao redor da âncora ritual e rompa o vínculo com o guardião.", "spirit"],
      ["Proteger o círculo de ruptura", "combate", "Uma personagem dedica uma ação padrão por rodada ao círculo ritual. Proteja-a até completar três ações, mesmo sob ataque. Ao concluir o ritual, o mestre pode registrar sucesso.", "undead"]
    ]
  }
];

const GUARDIAN_COMPOSITIONS = [
  { briefing: "A água ferve em volta do altar. Uma catóblepa sai do canal e se arrasta por cima das raízes, na direção do grupo.", creatures: [{ id: "catoblepa", quantity: 1 }] },
  { briefing: "Uma névoa venenosa escorre das oferendas e se adensa sobre o altar até ganhar forma.", creatures: [{ id: "elemental-do-veneno-medio", quantity: 1 }] },
  { briefing: "O capitão homem-piranha bloqueia o acesso ao altar. Uma massa de lagartos se espalha pela margem quando ele ergue a arma.", creatures: [
    { id: "homem-piranha-capitao", quantity: 1 }, { id: "tempestade-de-lagartos", quantity: 1 }
  ] }
];

const TROPICAL_SECTORS = [
  {
    direction: "N", name: "Calçada inundada", effect: "−15% dos PV máximos do guardião",
    tasks: [
      ["Desviar o canal da praça", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Leia as marcas de cheia com Investigação, alcance a comporta com Atletismo e libere a trava com Ladinagem. Na segunda falha, a corrente fecha a comporta."],
      ["Tomar a comporta", "combate", "Defenda a manivela. Uma personagem precisa gastar uma ação padrão em duas rodadas para desviar a água que alimenta o mecanismo do templo.", "animal"]
    ]
  },
  {
    direction: "S", name: "Terraços de cultivo", effect: "−2 na Defesa do guardião",
    tasks: [
      ["Seguir os canais entre os terraços", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Use Sobrevivência para achar a passagem entre raízes e Atletismo ou Acrobacia para cruzar o terraço instável. Na segunda falha, o terraço cede e soterra a passagem para o templo."],
      ["Recolher o contrapeso", "combate", "Entre os canteiros, uma canaleta leva a um contrapeso de jade. Vença o combate e retire a peça para liberar a passagem para o templo.", "animal"]
    ]
  },
  {
    direction: "L", name: "Praça do Templo", effect: "−4 na Iniciativa do guardião",
    tasks: [
      ["Calçar as placas de pressão", "infiltração", "Obtenha 2 sucessos antes de 2 falhas. Localize o caminho seguro com Percepção ou Investigação e trave o disparador com Ladinagem ou Ofício (artesão). Na segunda falha, as máscaras de pedra disparam dardos contra as paredes e acionam o alarme do templo."],
      ["Silenciar as máscaras", "combate", "As máscaras de pedra começam a se virar na direção da praça. Enquanto o grupo contém os sentinelas, uma personagem adjacente ao pedestal deve gastar uma ação padrão para travá-lo até o fim da terceira rodada.", "construct"]
    ]
  },
  {
    direction: "O", name: "Observatório", effect: "−1 em Fortitude, Reflexos e Vontade do guardião",
    tasks: [
      ["Reorientar o disco solar", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Leia as marcas do calendário com Conhecimento ou Investigação, solte o eixo com Atletismo e alinhe o disco com Misticismo ou Religião. Cada etapa exige um sucesso. Na segunda falha, o eixo emperra."],
      ["Defender a escadaria do observatório", "combate", "Vença os sentinelas e gire o disco de pedra para interromper o feixe que alcança o altar.", "construct"]
    ]
  }
];

const SHARED_SECTOR_TASKS = [
  ["Abrir uma rota de retirada", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Use Sobrevivência para traçar uma rota segura e Atletismo ou Ofício (carpinteiro) para firmar a passagem. Na segunda falha, a rota cede. Se conseguir, o grupo terá uma passagem segura para chegar ao Centro."],
  ["Recuperar o equipamento perdido", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Localize a carga com Investigação ou Percepção e recupere-a com Atletismo ou Ladinagem. Na segunda falha, o terreno cede sob a carga. Se conseguir, o grupo recupera o material para a aproximação ao Centro."],
  ["Interceptar a patrulha", "combate", "Escolha uma criatura para ser a primeira a tentar fugir. Se ela ainda puder escapar ao fim da terceira rodada, o setor fica exposto. Registre sucesso se o grupo impedir a fuga."],
  ["Defender a posição avançada", "combate", "Escolha uma personagem para preparar a posição. Ela precisa gastar uma ação padrão em três rodadas enquanto as outras contêm o ataque. Registre sucesso quando a posição estiver pronta."]
];

const TROPICAL_EXTRA_TASKS = [
  ["Vencer a corrida da comporta", "combate", "A água transborda sobre a calçada. Contenha os predadores enquanto uma personagem cruza o canal e gasta uma ação padrão junto à comporta para fechar a passagem da água até o fim da terceira rodada.", "animal"],
  ["Desenterrar a engrenagem de jade", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Leia os sulcos no terraço com Investigação e solte a engrenagem com Ofício (artesão) ou Ladinagem. Na segunda falha, o contrapeso desce pelo canal e fica fora de alcance."],
  ["Decifrar a procissão de pedra", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Compare as máscaras com Conhecimento, siga a direção dos olhares com Percepção e bloqueie o sino oculto com Ladinagem. Cada etapa exige um sucesso. Na segunda falha, o sino alerta o Centro."],
  ["Travar a plataforma do observatório", "combate", "Suba a escadaria e atravesse a plataforma elevada até a roda de trava. Uma personagem adjacente à roda gasta uma ação padrão para travar a plataforma e fechar o feixe do altar. Registre sucesso quando o grupo vencer o combate e travar a roda.", "construct"]
];

const MANGROVE_TERRAIN = { name: "Pântano", effect: "Canais rasos e lama entre as raízes do mangue.", features: [{ name: "Lodaçal", effect: "Terreno difícil." }] };

const SECTOR_ISLANDS = {
  atoll: atollExploration,
  volcanic: volcanicExploration,
  "sea-caves": seaCavesExploration,
  "pirate-held": pirateFortExploration,
  floating: floatingExploration,
  storm: stormExploration,
  dinosaurs: dinosaurExploration,
  "coral-coast": coralCoastExploration,
  shipwrecked: shipwreckedExploration,
  "giant-kelp": giantKelpExploration,
  mist: mistExploration,
  "ship-graveyard": shipGraveyardExploration,
  "cyclopean-ruins": cyclopeanRuinsExploration,
  sacred: sacredExploration,
  mangrove: { pilot: "mangrove-sectors", sectors: MANGROVE_SECTORS, guardians: GUARDIAN_COMPOSITIONS },
  tropical: {
    pilot: "tropical-sectors",
    terrain: { name: "Floresta tropical", effect: "Raízes expostas, terraços e calçadas de pedra.", features: [{ name: "Degraus cobertos de raízes", effect: "Terreno difícil." }] },
    sectors: TROPICAL_SECTORS,
    extraTasks: TROPICAL_EXTRA_TASKS,
    sharedTasks: true,
    guardians: [
      { name: "Sentinela do Sol", briefing: "A sentinela se ergue entre os pilares quando o grupo se aproxima do altar.", creatures: [{ id: "golem-de-nor-grande", quantity: 1 }] },
      { name: "Defensor do Templo", briefing: "A estátua ao pé do altar vira o rosto na sua direção e desce o primeiro degrau.", creatures: [{ id: "defensor-rochoso", quantity: 1 }] },
      { name: "Serpe do Disco Solar", briefing: "A serpe pousa na borda do templo e abre as asas sobre o altar.", creatures: [{ id: "serpe-ancia", quantity: 1 }] }
    ]
  }
};

// Ids das criaturas que o próprio lugar usa (guardiões e composições de setor).
export function getIslandOwnCreatureIds(themeId) {
  const config = SECTOR_ISLANDS[themeId];
  if (!config) return [];
  // Guardiões legados (só para saves antigos) ficam de fora.
  const guardians = config.guardians || [];
  const sectors = Object.values(config.sectorCompositions || {}).flat();
  const ids = [...guardians, ...sectors].flatMap(entry =>
    (Array.isArray(entry) ? entry : entry.creatures || []).map(creature => creature.id));
  return [...new Set(ids.filter(Boolean))];
}

export function getIslandThemeTerrain(themeId) {
  const config = SECTOR_ISLANDS[themeId];
  if (!config) return null;
  return config.terrain ?? (themeId === "mangrove" ? MANGROVE_TERRAIN : null);
}

export function hasIslandSectors(island) {
  const config = SECTOR_ISLANDS[island?.themeId];
  return Boolean(config && island.pilot === config.pilot);
}

export function pickIslandGuardian(island, rng) {
  const { guardians } = SECTOR_ISLANDS[island.themeId];
  const index = Math.floor(rng() * guardians.length);
  return guardians[index].id ?? index;
}

function getSectorTasks(config, index) {
  const { tasks } = config.sectors[index];
  if (!config.sharedTasks) return tasks;
  const sharedTask = SHARED_SECTOR_TASKS[index];
  return config.extraTasks ? [...tasks, sharedTask, config.extraTasks[index]] : [...tasks, sharedTask];
}

export function createIslandSector({ floor, themeId }, index, variant, dc, penaltyId, guardianBuffId) {
  const config = SECTOR_ISLANDS[themeId];
  const { direction, name, effect, defaultGuardianBuff } = config.sectors[index];
  const buffId = config.fixedGuardianBuffs ? defaultGuardianBuff : guardianBuffId ?? defaultGuardianBuff;
  const guardianBuff = defaultGuardianBuff && config.guardianBuffs.find(buff => buff.id === buffId);
  const [title, type, description, preferredType] = getSectorTasks(config, index)[variant];
  const challenge = type === "combate" ? config.combatChallenge ?? 6 : ["exploração", "ritual"].includes(type) ? 3 : 2;
  const testDc = challenge === 2 && type !== "recuperação" ? dc + 2 : dc;
  return {
    id: `${floor}-${index + 1}`, direction, name, variant, title, type,
    ...(guardianBuff
      ? { guardianBuffId: guardianBuff.id, guardianBuff: guardianBuff.label, effect: `Remove o bônus do guardião (${guardianBuff.label})` }
      : { effect: penaltyId ? getGuardianPenalty(penaltyId, index).label : effect, ...(penaltyId ? { penaltyId } : {}) }),
    challenge,
    ...(preferredType ? { preferredType } : {}),
    description: type === "combate" ? description : `${description} Em caso de falha num teste, repita a etapa. CD ${testDc}.`
  };
}

export function reopenIslandSector(island, rng, dc) {
  const resolved = island.objectives.filter(({ id }) => island.outcomes?.[id]);
  if (!resolved.length || rng() >= resolved.length * 0.1) return null;
  const previous = pick(rng, resolved);
  const index = island.objectives.indexOf(previous);
  const variant = pickIslandVariant(getSectorTasks(SECTOR_ISLANDS[island.themeId], index), rng, previous.variant);
  const lostSuccess = previous.type !== "tesouro" && island.outcomes[previous.id] === "success";
  island.objectives[index] = createIslandSector(island, index, variant, dc, previous.penaltyId, previous.guardianBuffId);
  delete island.outcomes[previous.id];
  delete island.scenes?.[previous.id];
  return { id: previous.id, name: previous.name, lostSuccess };
}

export function createIslandSectorCombat(island, objective, profile, mapSeed) {
  const compositions = SECTOR_ISLANDS[island.themeId]?.sectorCompositions?.[objective.direction];
  if (!compositions) return createIslandPilotScene({ ...island, objectives: [objective] }, profile, mapSeed);

  const visit = island.visits ?? 1;
  const index = island.objectives.indexOf(objective);
  const offset = island.objectives[0].variant;
  const creatures = compositions[(index + offset + visit - 1) % compositions.length];
  return createIslandPilotScene(
    { ...island, objectives: [objective] }, profile, `${mapSeed}:visita-${visit}`, { creatures }
  );
}

export function canRerollDinosaurSector(scene) {
  return Boolean(scene?.fixedComposition?.creatures?.length && scene.resolvedEncounter?.items.length &&
    !hasEncounterAdjustments(scene.resolvedEncounter));
}

export function rerollDinosaurSector(island, objective, scene, profile) {
  if (!canRerollDinosaurSector(scene)) return false;

  const current = scene.fixedComposition.creatures;
  const alternatives = dinosaurExploration.sectorCompositions[objective.direction].filter(creatures =>
    creatures.length !== current.length || creatures.some(({ id, quantity }) =>
      !current.some(item => item.id === id && item.quantity === quantity)
    )
  );
  const rng = createRng(`${scene.resolvedEncounter.seed}:rerrolagem`);
  const creatures = pick(rng, alternatives);
  const updated = createIslandPilotScene(
    { ...island, objectives: [objective] }, profile, `dinossauros:rerrolagem:${rng()}`, { creatures }
  );
  Object.assign(scene, updated);
  return true;
}

export function createIslandGuardian(island, selection, profile, mapSeed) {
  const config = SECTOR_ISLANDS[island.themeId];
  const composition = typeof selection === "string"
    ? config.guardians.find(guardian => guardian.id === selection)
    : config.legacyGuardians?.[selection] ?? config.guardians[selection];
  const buffs = island.objectives.flatMap((objective, index) => {
    if (!objective.guardianBuff || (objective.type !== "tesouro" && island.outcomes?.[objective.id] === "success")) return [];
    const buffId = objective.guardianBuffId ?? config.sectors[index].defaultGuardianBuff;
    return [config.guardianBuffs.find(buff => buff.id === buffId)];
  });
  const scene = island.themeId === "dinosaurs"
    ? createArchipelagoFinalBoss(island, profile, mapSeed, buffs.flatMap(buff => buff.companions ?? []))
    : createIslandPilotScene({
      ...island,
      objectives: [{ id: `${island.floor}-centro`, type: "combate", challenge: island.baseChallenge }]
    }, profile, mapSeed, composition);
  if (composition.briefing) scene.briefing = composition.briefing;
  if (composition.rule) scene.rule = composition.rule;
  const leader = scene.resolvedEncounter.items[0];
  scene.bossCreatureId ??= leader.creatureId;
  const creature = leader.creatureData ?? getCreatureById(leader.creatureId);
  const stats = { ...creature.stats };
  let actions = creature.actions;
  let abilities = creature.abilities;
  const notes = [];
  island.objectives.forEach((objective, index) => {
    if (objective.type === "tesouro" || objective.guardianBuff || island.outcomes?.[objective.id] !== "success") return;
    const penalty = getGuardianPenalty(objective.penaltyId, index);
    if (penalty.apply) penalty.apply(stats);
    else notes.push(penalty.label);
  });
  for (const buff of buffs) {
    if (buff.apply) buff.apply(stats, creature.stats);
    else if (buff.applyToActions) actions = buff.applyToActions(actions);
    else if (buff.ability) abilities = [...(abilities ?? []), buff.ability];
    else if (!buff.companions) notes.push(buff.label);
  }
  if (notes.length) stats.defensesText = [stats.defensesText, ...notes].filter(Boolean).join("; ");
  const name = composition.name ?? creature.name;
  if (composition.name) leader.name = name;
  leader.creatureData = { ...creature, name, stats, actions, abilities };
  return scene;
}
