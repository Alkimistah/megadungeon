import { createRng, pick } from "./random.js";

const presentationsByTrap = {
  "lamina-na-parede": {
    Floresta: [
      ["Espada oculta no tronco", "Uma espada escondida em um tronco passa rente à trilha."],
      ["Lâmina entre as raízes", "Uma lâmina surge entre as raízes altas que margeiam a passagem."]
    ],
    Pântano: [
      ["Lâmina no tronco submerso", "Uma lâmina sai junto de um tronco semissubmerso na beira da passagem."]
    ],
    Colinas: [
      ["Lâmina na fenda", "Uma lâmina varre a passagem estreita entre duas rochas."]
    ],
    Aquático: [
      ["Lâmina entre as pedras da margem", "Uma lâmina faz um arco rente às pedras da travessia."]
    ],
    "Planície aberta": [
      ["Foice no capim alto", "Uma foice escondida no capim corta a passagem na borda da trilha."]
    ]
  },
  "pendulo-de-teto": {
    Floresta: [
      ["Tronco laminado suspenso", "Um tronco com uma lâmina na ponta balança entre as árvores."],
      ["Foice da copa", "Uma lâmina curva desce da copa e cruza a trilha em arco."]
    ],
    Pântano: [
      ["Tronco laminado do pântano", "Um tronco com uma lâmina na ponta balança sobre a passagem alagada."]
    ],
    Colinas: [
      ["Lâmina suspensa na ribanceira", "Uma lâmina passa em arco rente ao paredão da ribanceira."]
    ],
    Aquático: [
      ["Lâmina suspensa na travessia", "Uma lâmina balança entre as margens acima das pedras da travessia."]
    ]
  },
  "bloco-de-pedra": {
    Floresta: [
      ["Tronco em queda", "Um tronco pesado despenca sobre a trilha."]
    ],
    Pântano: [
      ["Toro na passagem alagada", "Um toro cai sobre a passagem estreita entre dois trechos alagados."]
    ],
    Colinas: [
      ["Tronco que despenca da ribanceira", "Um tronco pesado cai da borda da ribanceira."]
    ],
    Aquático: [
      ["Tronco em queda na margem", "Um tronco pesado despenca junto à margem da travessia."]
    ]
  },
  "fosso-com-estacas": {
    Floresta: [
      ["Fosso de estacas de punji", "A serapilheira esconde uma queda para o fundo de um fosso de estacas."]
    ],
    Pântano: [
      ["Fosso de estacas no brejo", "O capim do brejo esconde um fosso com estacas."]
    ],
    Colinas: [
      ["Fosso de estacas na encosta", "A vegetação baixa da encosta esconde um fosso com estacas."]
    ],
    "Planície aberta": [
      ["Fosso de estacas sob o capim", "Uma faixa de capim esconde um fosso com estacas."]
    ]
  },
  virote: {
    Floresta: [
      ["Dardo entre as folhagens", "Um dardo cruza a trilha vindo da vegetação."]
    ],
    Colinas: [
      ["Dardo da fenda", "Um dardo passa rente à trilha vindo de uma fenda nas rochas."]
    ],
    Aquático: [
      ["Dardo da margem", "Um dardo cruza o trecho raso vindo da vegetação na margem."]
    ]
  }
};

export function getForestTrapPresentation(profileId, node, item) {
  if (profileId !== "forest-11-20" || item?.kind !== "trap") return null;
  const terrain = node.environment?.terrain?.name;
  const variants = presentationsByTrap[item.trapId]?.[terrain];
  if (!variants?.length) return null;

  const seed = node.resolvedEncounter?.seed || node.encounterSeed || node.id;
  const [name, description] = pick(createRng(`${seed}:trap-presentation:${item.trapId}:${terrain}`), variants);
  return { name, description };
}
