export const MISSION_CATEGORIES = {
  extermination: {
    id: "extermination",
    label: "Extermínio",
    objectiveKind: "defeat",
    targetTypes: ["creature"],
    titleTemplates: ["Limpeza necessária", "Ameaça a eliminar", "Caçada de contenção"],
    proofTemplates: ["Entregar os cristais das criaturas abatidas.", "Apresentar sinais claros da eliminação."]
  },
  collection: {
    id: "collection",
    label: "Coleta",
    objectiveKind: "collect",
    targetTypes: ["material"],
    titleTemplates: ["Amostras requisitadas", "Coleta sob risco", "Material instável"],
    proofTemplates: ["Entregar as amostras intactas.", "Registrar a origem e entregar o material."]
  },
  exploration: {
    id: "exploration",
    label: "Exploração",
    objectiveKind: "explore",
    targetTypes: ["location"],
    titleTemplates: ["Rota a confirmar", "Mapeamento urgente", "Ponto de interesse"],
    proofTemplates: ["Trazer a rota marcada na pulseira.", "Descrever o local e confirmar a exploração."]
  },
  recovery: {
    id: "recovery",
    label: "Recuperação",
    objectiveKind: "recover",
    targetTypes: ["object"],
    titleTemplates: ["Objeto perdido", "Resgate de equipamento", "Carga extraviada"],
    proofTemplates: ["Entregar o objeto recuperado.", "Trazer o item ou comprovar sua destruição."]
  },
  investigation: {
    id: "investigation",
    label: "Investigação",
    objectiveKind: "investigate",
    targetTypes: ["clue"],
    titleTemplates: ["Pergunta em aberto", "Vestígio suspeito", "Sinais contraditórios"],
    proofTemplates: ["Registrar a evidência encontrada.", "Relatar a conclusão ao contratante."]
  },
  rescue: {
    id: "rescue",
    label: "Resgate",
    objectiveKind: "recoverMemento",
    targetTypes: ["memento"],
    titleTemplates: ["Pertence deixado para trás", "Lembrança perdida", "Último pedido"],
    proofTemplates: ["Entregar o pertence recuperado.", "Trazer a lembrança ou comprovar seu destino."]
  },
  escort: {
    id: "escort",
    label: "Entrega protegida",
    objectiveKind: "deliverMemento",
    targetTypes: ["memento"],
    titleTemplates: ["Entrega delicada", "Carga pessoal", "Relíquia familiar"],
    proofTemplates: ["Entregar o pertence ao destino combinado.", "Confirmar que a lembrança chegou intacta."]
  },
  specialHunt: {
    id: "specialHunt",
    label: "Caçada especial",
    objectiveKind: "hunt",
    targetTypes: ["creature"],
    titleTemplates: ["Alvo marcado", "Predador incomum", "Rastro perigoso"],
    proofTemplates: ["Entregar o cristal ou troféu do alvo.", "Apresentar prova inequívoca da caçada."]
  },
  trial: {
    id: "trial",
    label: "Teste ou desafio",
    objectiveKind: "completeTrial",
    targetTypes: ["challenge"],
    titleTemplates: ["Provação local", "Teste de campo", "Desafio controlado"],
    proofTemplates: ["Registrar a superação do desafio.", "Confirmar a conclusão sem atalhos externos."]
  },
  anomalous: {
    id: "anomalous",
    label: "Anômala",
    objectiveKind: "stabilize",
    targetTypes: ["phenomenon"],
    titleTemplates: ["Anomalia em aberto", "Fenômeno instável", "Padrão impossível"],
    proofTemplates: ["Trazer evidência da anomalia estabilizada.", "Registrar o fenômeno antes e depois da intervenção."]
  }
};

export const DEFAULT_CATEGORY_WEIGHTS = Object.fromEntries(
  Object.keys(MISSION_CATEGORIES).map((categoryId) => [categoryId, 10])
);

export const DIFFICULTY_MULTIPLIERS = [
  { id: "simple", label: "simples", value: 0.75, weight: 18 },
  { id: "standard", label: "padrão", value: 1, weight: 38 },
  { id: "risky", label: "arriscada", value: 1.25, weight: 24 },
  { id: "hard", label: "difícil", value: 1.5, weight: 14 },
  { id: "severe", label: "severa", value: 2, weight: 6 }
];

export const DEFAULT_ISSUER_WEIGHTS = [
  { label: "o posto avançado", weight: 28 },
  { label: "um pesquisador da guilda", weight: 18 },
  { label: "um relatório recuperado", weight: 14 },
  { label: "a equipe de contenção", weight: 18 },
  { label: "um patrono anônimo", weight: 10 },
  { label: "a própria pulseira", weight: 12 }
];
