import { pick } from "./random.js";

export const FOREST_UNKNOWN_REVEALS = [
  { label: "Encontro normal", weight: 25 },
  { label: "Encontro elite", weight: 10 },
  { label: "Armadilha", weight: 10 },
  { label: "Obstáculo", weight: 5 },
  { label: "Exploração", weight: 20 },
  { label: "Descoberta", weight: 10 },
  { label: "Tesouro", weight: 6 },
  { label: "Acampamento", weight: 8 },
  { label: "Descanso falso", weight: 6 }
];

const SCENES = {
  Obstáculo: [
    {
      kind: "obstacle", title: "Margem instável", nd: 1, skill: "Atletismo",
      terrains: ["Aquático", "Pântano"],
      description: "A beira da água cede em placas e deixa firme apenas uma faixa estreita.",
      approach: "Atravessem um de cada vez por terreno firme ou ajudem o grupo a passar.",
      success: "O grupo cruza pela margem sem se expor à água.",
      failure: "O grupo precisa lidar com a água ou lama já descrita no terreno para terminar a travessia."
    },
    {
      kind: "obstacle", title: "Passagem interrompida", nd: 1, skill: "Sobrevivência",
      description: "O caminho termina em um trecho de solo rompido, com a continuação visível do outro lado.",
      approach: "Procurem uma volta firme ou tracem uma passagem curta pelo terreno ao redor.",
      success: "O grupo encontra um traçado firme e retoma a rota.",
      failure: "O grupo segue pela volta mais longa. O mestre decide se os efeitos do terreno se aplicam."
    }
  ],
  Exploração: [
    {
      kind: "exploration", title: "Pedido na margem", nd: 0.5, skill: "Atletismo",
      terrains: ["Aquático", "Pântano"],
      description: "Dois viajantes observam um embrulho preso junto à margem. Eles pedem ajuda para recuperá-lo.",
      approach: "Perguntem o que há no embrulho, ajudem a puxá-lo de terra firme ou sigam viagem.",
      success: "Os viajantes recuperam o material e contam o que observaram nesta travessia.",
      failure: "O embrulho se perde de vista. O mestre pode encerrar a interação e seguir com a rota."
    },
    {
      kind: "exploration", title: "Marcas de passagem", nd: 0.5, skill: "Sobrevivência",
      description: "Marcas recentes cruzam a rota e desaparecem em solo mais firme.",
      approach: "Leiam as marcas a partir da trilha ou façam uma busca curta pelas imediações.",
      success: "O grupo distingue a direção aproximada e há quanto tempo houve movimento por ali.",
      failure: "As marcas ficam inconclusivas. O grupo pode prosseguir sem essa informação."
    }
  ],
  Descoberta: [
    {
      kind: "discovery", title: "Vista da encosta", nd: 0.5, skill: "Percepção",
      terrains: ["Colinas"],
      description: "Uma abertura na encosta permite observar o trecho já percorrido e a saída desta passagem.",
      approach: "Procurem uma posição firme e façam um esboço do entorno.",
      success: "O grupo identifica um ponto de referência para orientar o deslocamento nesta região.",
      failure: "A vista é parcial. O grupo mantém as referências que já possuía."
    },
    {
      kind: "discovery", title: "Referência de viagem", nd: 0.5, skill: "Percepção",
      description: "Uma marca de viajantes indica um ponto de referência reconhecível no terreno ao redor.",
      approach: "Inspecionem a marca e comparem a indicação com o terreno visível.",
      success: "O grupo consegue identificar este ponto de passagem se precisar voltar.",
      failure: "O sentido da marca não fica claro. A rota permanece disponível."
    }
  ],
  "Descanso falso": [
    {
      kind: "falseRest", title: "Abrigo no leito de cheia", nd: 1,
      terrains: ["Aquático", "Pântano"],
      description: "Uma saliência parece seca, mas galhos presos acima do chão mostram que a água alcança o abrigo.",
      approach: "Observem as marcas de cheia e identifiquem uma saída para solo firme.",
      success: "O grupo reconhece o risco e atravessa a área sem montar acampamento.",
      failure: "O grupo precisa abandonar o abrigo pela margem. Aplique apenas os efeitos de água ou lama que o terreno apresenta."
    },
    {
      kind: "falseRest", title: "Abrigo sem saída segura", nd: 1,
      description: "O recanto oferece cobertura, mas a passagem de volta se estreita sobre solo instável.",
      approach: "Confiram o solo e as saídas antes de pousar o equipamento.",
      success: "O grupo reconhece a instabilidade e sai com o equipamento.",
      failure: "O mestre descreve a retirada sob pressão e usa os efeitos do terreno já informados, se relevantes."
    }
  ]
};

export function isForestSceneReveal(label) {
  return Object.hasOwn(SCENES, label);
}

export function chooseForestUnknownScene(label, environment, rng) {
  const scenes = SCENES[label];
  const matching = scenes.filter(scene => scene.terrains?.includes(environment.terrain.name));
  const { terrains, ...scene } = pick(rng, matching.length ? matching : scenes.filter(scene => !scene.terrains));
  return scene;
}
