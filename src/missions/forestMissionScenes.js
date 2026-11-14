function normalize(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function isForestMissionEnvironmentCompatible(node, mission) {
  const name = normalize(mission.objective?.targetName);
  const terrain = node.environment?.terrain?.name;
  const climate = (node.environment?.climate || []).map(c => c.name);
  const features = (node.environment?.terrain?.features || []).map(f => f.name);
  const vegetation = ["Floresta", "Pântano"].includes(terrain);
  const water = ["Pântano", "Aquático"].includes(terrain) || features.some(f => /[áa]gua|alagada/i.test(f));
  const rain = climate.some(c => ["Chuva", "Tempestade", "Granizo"].includes(c));
  const wet = water || rain || features.includes("Solo encharcado");
  if (/neblina|agua de neblina/.test(name)) return climate.includes("Neblina");
  if (/chuva quente/.test(name)) return rain;
  if (/vento que/.test(name)) return rain || climate.some(c => /vento|vendaval|furacao|tornado/i.test(normalize(c)));
  if (/curso d.agua|inundado|trilha alagada/.test(name)) return water;
  if (/lama|chuva recente|expostos pela chuva/.test(name)) return wet;
  if (/raizes|vegetacao|fungos|clareira/.test(name)) return vegetation;
  if (/fenomeno climatico/.test(name)) return climate.some(c => c !== "Clima normal");
  return true;
}

const APPROACHES = {
  collection: "Localizar e recolher o material; conferir a quantidade e preservar as amostras.",
  exploration: "Observar o local e registrar a rota ou característica solicitada.",
  recovery: "Localizar o objeto e recuperá-lo das condições descritas na cena.",
  investigation: "Examinar os vestígios e apresentar uma conclusão ao contratante.",
  rescue: "Recuperar o pertence de quem não voltou; conferir sua identidade.",
  escort: "Levar o pertence ao ponto de entrega e confirmar sua chegada intacta.",
  trial: "Escolher uma abordagem para superar o desafio local.",
  anomalous: "Observar o fenômeno e registrar ou estabilizar conforme o objetivo da oferta.",
  specialHunt: "Enfrentar o alvo marcado e obter a prova solicitada.",
  extermination: "Registrar apenas os alvos abatidos confirmados pelo mestre."
};

// Cenas de missão, não uma tabela de encontros desconhecidos. Não adicionam
// dano/CDs próprios: ações, água e clima continuam usando as regras cadastradas.
const SCENES = {
  "marcas de arrasto na lama": {
    question: "As marcas de arrasto foram deixadas por uma criatura ou por uma expedição?",
    evidence: ["Duas linhas paralelas têm largura constante.", "Pegadas de botas acompanham as linhas e há fibras de corda num galho."],
    answer: "Exploradores arrastaram uma carga presa por cordas; o sulco não é o rastro de um corpo levado por um predador.",
    approaches: ["Sobrevivência: comparar sulcos com as pegadas.", "Investigação: examinar fibras e pontos em que a carga raspou o solo."]
  },
  "pegadas sobrepostas por chuva recente": {
    question: "As pegadas pertencem à mesma passagem ou a dois momentos diferentes?",
    evidence: ["Um conjunto está arredondado e cheio de sedimentos da chuva.", "Outro corta as bordas já lavadas e mantém as marcas nítidas das solas."],
    answer: "Dois grupos passaram em momentos diferentes; as pegadas de borda nítida são posteriores à chuva.",
    approaches: ["Sobrevivência: comparar a conservação das pegadas.", "Investigação: verificar onde as marcas novas interrompem as antigas."]
  },
  "cinzas frias em uma clareira": {
    question: "O fogo foi um incêndio natural ou uma fogueira de exploradores?",
    evidence: ["As cinzas estão concentradas num círculo de pedras.", "Há gravetos cortados e restos de alimento; a vegetação fora do círculo não está queimada."],
    answer: "Foi uma fogueira controlada de exploradores, não um incêndio se espalhando pela mata.",
    approaches: ["Sobrevivência: examinar a distribuição das cinzas.", "Investigação: reunir os sinais de preparo do acampamento."]
  },
  "ossos marcados por ferramenta": {
    question: "As marcas nos ossos são de dentes ou de ferramenta?",
    evidence: ["Os sulcos são retos, paralelos e repetidos perto das articulações.", "Não há perfurações pareadas de presas; pequenas lascas se acumulam junto aos cortes."],
    answer: "As marcas foram feitas com uma ferramenta de corte durante o processamento dos restos, não por mordidas.",
    approaches: ["Investigação: comparar os cortes e as lascas.", "Sobrevivência ou Cura: distinguir processamento de restos e alimentação de um predador."]
  },
  "cruzar terreno inundado": {
    setup: "Uma faixa de água separa o grupo de um ponto firme de apoio do outro lado. O objetivo é atravessar com o equipamento da expedição.",
    approaches: ["Atletismo: nadar, usando as regras de água/correnteza do terreno.", "Sobrevivência: procurar um trecho raso ou apoios existentes.", "Usar cordas, recursos ou magia de travessia conforme suas próprias regras."],
    onSuccess: "O grupo e o equipamento alcançam a margem ou apoio oposto; registre a travessia como prova do desafio.",
    onFailure: "A travessia não foi concluída. Resolva a falha pela regra da ação e do terreno usados; a missão permanece pendente."
  },
  "abrir passagem por vegetação densa": {
    setup: "Raízes e galhos entrelaçados impedem a passagem do equipamento. É preciso deixar uma abertura utilizável pelo grupo inteiro.",
    approaches: ["Sobrevivência: localizar uma abertura e orientar a passagem.", "Atletismo: transpor ou afastar os obstáculos adequados à ação.", "Empregar ferramentas ou magia conforme as regras do recurso."],
    onSuccess: "Uma passagem utilizável pelo grupo e seu equipamento foi aberta; registre o trecho e a solução.",
    onFailure: "O bloqueio ainda impede o equipamento de passar. A missão fica pendente; aplique somente consequências previstas na ação e na vegetação cadastradas."
  },
  "seguir uma trilha sem deixar rastro": {
    setup: "O grupo deve percorrer o trecho do nodo preservando o solo e a vegetação para não denunciar sua passagem.",
    approaches: ["Furtividade: atravessar discretamente com as penalidades do terreno, quando aplicáveis.", "Sobrevivência: reconhecer onde pegadas e galhos quebrados denunciariam a passagem.", "Usar um recurso que oculte rastros conforme sua descrição."],
    onSuccess: "O mestre confirma que a passagem não deixou rastros identificáveis; registre o método utilizado.",
    onFailure: "Ficam sinais reconhecíveis da passagem; a condição da missão ainda não foi cumprida. Não crie uma patrulha ou combate adicional automaticamente."
  },
  "resistir a um fenômeno climático": {
    setup: "O grupo precisa cruzar a área exposta e chegar a um ponto de abrigo usando proteção ou uma rota adequada ao clima deste nodo.",
    approaches: ["Aplicar os testes de resistência efetivamente exigidos pelo clima cadastrado.", "Sobrevivência: propor uma passagem abrigada quando o terreno permitir.", "Usar proteção ou magia conforme seus efeitos reais."],
    onSuccess: "O grupo concluiu a passagem sob o fenômeno e chegou ao abrigo; registre as condições e a proteção usada.",
    onFailure: "A passagem permanece inconclusa. Aplique os efeitos da regra climática cadastrada, sem acrescentar dano ou penalidade novos por causa da missão."
  },
  "neblina que apaga sons próximos": {
    setup: "Duas marcas delimitam uma faixa de névoa: dentro dela, vozes próximas desaparecem; fora dela, o mesmo chamado é audível.",
    approaches: ["Comparar o mesmo som dentro e fora da faixa, mantendo contato visual.", "Registrar o limite e as condições do fenômeno; Misticismo pode orientar a análise."],
    onSuccess: "O registro identifica o limite da névoa e comprova a diferença de som; isso cumpre a alternativa de registrar da missão.",
    onFailure: "O registro não distingue o fenômeno da dificuldade normal de ouvir no clima; a missão segue pendente."
  },
  "chuva quente localizada": {
    setup: "No meio da precipitação do nodo, uma pequena área recebe gotas perceptivelmente mais quentes que as recolhidas ao redor.",
    approaches: ["Recolher amostras dentro e fora da área e comparar as condições.", "Registrar extensão e duração observadas, evitando exposição desnecessária."],
    onSuccess: "O grupo apresenta amostras ou registro comparativo da área quente e da chuva comum.",
    onFailure: "As amostras ou observações não comprovam a diferença; o objetivo permanece pendente. Efeitos de exposição continuam sendo os cadastrados no clima."
  },
  "raízes que mudam a rota": {
    setup: "Raízes se movem lentamente dentro da cena, fechando uma passagem local e abrindo outra. Isso não altera automaticamente os links do mapa regional.",
    approaches: ["Marcar duas posições e observar a mudança mantendo uma referência estável.", "Registrar o ciclo e as aberturas locais; Sobrevivência ou Misticismo podem orientar a observação."],
    onSuccess: "O registro mostra a mudança entre as mesmas referências e documenta uma passagem local utilizável.",
    onFailure: "Não há comparação confiável entre as posições; a missão permanece pendente, sem regerar a rota regional."
  },
  "vento que carrega vozes falsas": {
    setup: "Rajadas repetem chamados sem fonte visível. Uma referência combinada entre os personagens permite comparar o chamado real com o eco carregado pelo vento.",
    approaches: ["Comparar o chamado combinado com as vozes das rajadas, mantendo o grupo à vista.", "Registrar direção e repetição; Percepção ou Misticismo podem orientar a análise."],
    onSuccess: "O grupo documenta uma voz sem emissor e distingue o fenômeno de um chamado real.",
    onFailure: "A observação ainda pode ser explicada por vozes reais ou ecos comuns; a missão permanece pendente."
  }
};

export function createForestMissionObjective(mission, node, quantity) {
  const target = mission.objective.targetName;
  const terrain = node.environment.terrain.name;
  const detail = Object.entries(SCENES).find(([name]) => normalize(name) === normalize(target))?.[1] || {};
  const onSuccess = detail.onSuccess || (mission.category === "investigation"
    ? "Apresente a conclusão sustentada pelos vestígios e registre a prova solicitada."
    : "Cumpra a condição e apresente a prova descritas na oferta; o mestre confirma a conclusão.");
  const onFailure = detail.onFailure || "Sem cumprir a condição ou comprovar o objetivo, a missão permanece pendente. Use apenas as consequências das regras da ação escolhida.";
  const placement = mission.category === "escort"
    ? `O ponto combinado para a entrega de ${target} fica neste trecho de ${terrain}.`
    : mission.objective.targetType === "creature"
      ? `Este encontro contém ${quantity} alvo(s) da missão: ${target}.`
      : `Neste trecho de ${terrain}, o grupo encontra o objetivo da missão: ${target}.`;
  return {
    missionId: mission.id, targetId: mission.objective.targetId,
    targetName: target, targetType: mission.objective.targetType, quantity,
    ...detail,
    description: `${placement}${detail.setup ? ` ${detail.setup}` : ""}`,
    approach: detail.approaches?.join(" ") || APPROACHES[mission.category] || mission.objective.condition,
    onSuccess, onFailure,
    resolution: `${mission.objective.condition || "Cumprir o objetivo"}. ${mission.proofType || "O mestre confirma a resolução e a prova obtida."}`
  };
}
