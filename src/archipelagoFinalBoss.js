import { archipelagoEcologyContexts } from "./floorProfiles/archipelago21to30.js";
import { resolveNodeEncounter } from "./encounterResolver.js";

const deinonychusBands = [{ id: "bando-de-deinonicos", quantity: 2 }];
const burafontHerds = [{ id: "armento-de-burafontes", quantity: 2 }];
const mixedHerds = [{ id: "bando-de-deinonicos", quantity: 1 }, { id: "armento-de-burafontes", quantity: 1 }];
const deinonychusPack = [{ id: "deinonico", quantity: 8 }];
const burafontHerd = [{ id: "burafonte", quantity: 8 }];
const mixedPack = [{ id: "deinonico", quantity: 4 }, { id: "burafonte", quantity: 4 }];
const huntingPack = [{ id: "deinonico", quantity: 6 }, { id: "burafonte", quantity: 2 }];
const riverHerd = [{ id: "deinonico", quantity: 2 }, { id: "burafonte", quantity: 6 }];

export const dinosaurExploration = {
  pilot: "dinosaur-sectors",
  combatChallenge: 10,
  terrain: {
    name: "Vale dos dinossauros",
    effect: "A vegetação fecha parte do vale. Troncos e rochedos oferecem cobertura.",
    features: [{ name: "Trilhas de manada", effect: "As margens revolvidas pelas manadas são terreno difícil onde indicado." }]
  },
  fixedGuardianBuffs: true,
  guardianBuffs: [
    {
      id: "stomp", label: "Pisão no ataque corpo a corpo (+31, 4d8+15 de impacto)",
      applyToActions: actions => actions.map(action => action.name === "Corpo a Corpo"
        ? { ...action, text: `${action.text.replace(/\.$/, "")} e pisão +31 (4d8+15 de impacto).` }
        : action)
    },
    {
      id: "saves", label: "+5 em Fortitude, Reflexos e Vontade",
      apply: stats => {
        stats.fortitude += 5;
        stats.reflex += 5;
        stats.will += 5;
      }
    },
    {
      id: "roar", label: "Rugido Ensurdecedor (Confuso em alcance médio, Vontade CD 27 anula)",
      ability: {
        name: "Rugido Ensurdecedor",
        timing: "padrão",
        text: "Uma vez por cena, o Rei Tirano solta um rugido. Todas as outras criaturas em alcance médio ficam confusas até o fim da cena (Vontade CD 27 anula). A condição pode terminar antes conforme sua rolagem normal."
      }
    },
    {
      id: "deinonychus-retinue", label: "Dois Deinonicos acompanham o Rei Tirano no combate",
      companions: [{ id: "deinonico", quantity: 2 }]
    }
  ],
  guardians: [{ creatures: [{ id: "rei-tirano-nd-11", quantity: 1 }] }],
  sectors: [
    {
      direction: "N", name: "Trilha da manada", defaultGuardianBuff: "stomp",
      tasks: [
        ["Ferir a pata do Rei Tirano", "combate", "A manada ocupa o desfiladeiro por onde o Rei Tirano passa. Derrote-a para soltar o tronco que ele usa de apoio. Ao atravessar, o tirano machuca a pata e perde o Pisão."],
        ["Comprometer a pata de apoio", "combate", "O Rei Tirano segue a manada pelo corredor. Vença o combate para ceder a laje que sustenta sua pata na travessia, impedindo que ele use o Pisão ao chegar ao vale."]
      ]
    },
    {
      direction: "L", name: "Ninhos da escarpa", defaultGuardianBuff: "saves",
      tasks: [
        ["Quebrar os marcos de proteção", "combate", "As pedras entre os ninhos fortalecem as resistências do Rei Tirano. Derrote os dinossauros que cercam os marcos para desmontá-los."],
        ["Romper o círculo da escarpa", "combate", "Os dinossauros guardam o círculo de ossos que dá ao Rei Tirano força para resistir aos efeitos do grupo. Vença o encontro e desfaça o círculo."]
      ]
    },
    {
      direction: "S", name: "Baixada do riacho", defaultGuardianBuff: "roar",
      tasks: [
        ["Abafar o eco do rugido", "combate", "As fendas na margem devolvem o rugido para todo o vale. Vença os dinossauros na baixada para fechar as fendas com as pedras soltas."],
        ["Quebrar as pedras de ressonância", "combate", "Duas lajes junto ao vau amplificam o Rugido Ensurdecedor. Derrote as criaturas entre as lajes para derrubar uma delas e quebrar a ressonância."]
      ]
    },
    {
      direction: "O", name: "Mata dos fetos", defaultGuardianBuff: "deinonychus-retinue",
      tasks: [
        ["Dispersar os reforços jovens", "combate", "Os Deinonicos jovens se reúnem entre os fetos antes de seguir o Rei Tirano. Derrote o grupo que os protege para que eles se dispersem pela mata."],
        ["Cortar a rota dos reforços", "combate", "Uma patrulha escolta os dois Deinonicos jovens até o Vale da Ossada. Derrote a escolta e feche a trilha antes que os reforços alcancem o Rei Tirano."]
      ]
    }
  ],
  sectorCompositions: {
    N: [burafontHerds, mixedHerds, burafontHerd, riverHerd],
    L: [deinonychusBands, mixedHerds, mixedPack, huntingPack],
    S: [riverHerd, burafontHerd, mixedPack, mixedHerds],
    O: [deinonychusPack, huntingPack, deinonychusBands, mixedHerds]
  }
};

export function createArchipelagoFinalBoss(island, profile, mapSeed, companions = []) {
  const challenge = island.baseChallenge;
  const bossCreatureId = profile.archipelago.boss.creatureId;
  const scene = {
    id: `${island.floor}-boss`,
    type: "boss",
    bossCreatureId,
    briefing: "As pegadas levam a uma ossada no fundo do vale. O Rei Tirano sai da mata e avança pelas pedras acima do riacho.",
    challenge: { total: challenge, encounter: challenge, creatures: challenge, trap: 0, climate: 0, terrain: 0 },
    environment: {
      terrain: {
        name: "Vale da ossada",
        effect: "Um riacho raso corta a clareira. A margem úmida é terreno difícil e a ossada e os rochedos oferecem cobertura.",
        features: [{ name: "Ossada exposta", effect: "As costelas expostas estreitam a passagem para a margem alta." }]
      },
      climate: []
    },
    ecologyContext: archipelagoEcologyContexts.byTheme.dinosaurs,
    fixedComposition: {
      creatures: [{ id: bossCreatureId, quantity: 1 }, ...companions],
      traps: [],
      useWeaponVariation: false
    }
  };
  resolveNodeEncounter(scene, { mapSeed, profile });
  return scene;
}
