// Conteúdo de missões por tema de ilha do arquipélago (andares 21 a 30).
// Os textos nunca citam o nome da ilha: com Caminhos desconhecidos ligado, o destino aparece como "Ilha N".
// `featured.lead` é a frase de abertura; o gerador acrescenta "na Ilha N" e a frase da recompensa.

export const ARCHIPELAGO_MISSION_THEMES = {
  tropical: {
    pools: {
      locations: ["uma calçada de pedra coberta de raízes", "os terraços de cultivo abandonados", "uma praça de pedra tomada pelo mato", "um mirante entre as copas"],
      materials: ["resina de árvore que brilha ao sol", "frutos de casca dourada", "folhas de cipó resistentes como corda", "pigmento extraído de flores raras"],
      objects: ["um disco solar de bronze", "uma estatueta de macaco entalhada", "um cantil de cerâmica selado com cera", "um cinto de ervas trançadas", "uma lança cerimonial de madeira"],
      mementos: ["um colar de sementes deixado por um explorador", "uma bandeira rasgada fincada em um tronco", "uma gaita de osso presa a uma raiz", "um retrato desbotado dentro de uma caixinha de madeira"],
      clues: ["degraus novos em uma escada antiga", "marcas de garra em um pilar caído", "fumaça de fogueira entre as copas", "símbolos solares riscados nas pedras da calçada"],
      challenges: ["abrir caminho pela mata fechada sem perder a trilha", "subir os degraus cobertos de raízes antes do anoitecer", "atravessar as ruínas sem acordar o que dorme nelas", "decifrar o mecanismo do disco solar"],
      phenomena: ["aves que silenciam todas de uma vez", "raízes que se mexem quando ninguém olha", "um rugido distante que acompanha o grupo", "luz dourada que atravessa as copas e aponta o templo"]
    },
    featured: {
      category: "recovery",
      title: "O disco solar perdido",
      targetName: "o disco solar de bronze esquecido nos terraços de cultivo",
      lead: "Recupere o disco solar de bronze que uma expedição deixou para trás nos terraços de cultivo",
      condition: "Achar o disco entre as raízes dos terraços e trazê-lo sem quebrar as bordas",
      proofType: "Entregar o disco de bronze, limpo da terra e das raízes."
    },
    map: {
      markers: ["tree", "canopy", "clearing", "slope"],
      landmark: { name: "Terraço do disco solar", effect: "Terraço de cultivo ao lado da calçada, ponto de referência da missão; os degraus cobertos de raízes são terreno difícil." }
    }
  },

  mangrove: {
    pools: {
      locations: ["um canal estreito entre as raízes", "uma ilhota de raízes firmes", "uma clareira de águas paradas", "uma passarela de troncos apodrecidos"],
      materials: ["lama escura rica em minerais", "raízes aéreas de casca grossa", "folhas de mangue cobertas de sal", "ovos de uma ave de pântano"],
      objects: ["uma canoa virada entre as raízes", "um lampião de gordura afundado na lama", "uma rede de pesca emaranhada", "uma urna de barro coberta de limo", "um remo entalhado com símbolos"],
      mementos: ["uma bota solitária presa na lama", "uma carta lacrada guardada num pote de barro", "um pente de madrepérola preso em uma raiz", "um chapéu de palha boiando num canal"],
      clues: ["pegadas largas que desaparecem na água", "raízes cortadas de forma limpa", "bolhas que sobem em fila no canal", "um rastro de escamas no lodo"],
      challenges: ["atravessar o lodaçal sem afundar", "seguir o canal certo entre dezenas iguais", "alcançar a ilhota antes que a água suba", "manter a luz acesa no escuro do mangue"],
      phenomena: ["neblina baixa que cheira a ovo podre", "coaxar que responde à voz do grupo", "raízes que se fecham atrás de quem passa", "vaga-lumes que se afastam de uma direção"]
    },
    featured: {
      category: "investigation",
      title: "O que se esconde nos canais",
      targetName: "a origem das marcas nos canais rasos",
      lead: "Descubra o que arrastou os barcos para dentro dos canais",
      condition: "Seguir o rastro pelos canais até a ilhota de raízes e identificar o que vive sob a lama",
      proofType: "Relatar a origem do rastro e entregar um desenho da ilhota."
    },
    map: {
      markers: ["swamp", "wet", "tree", "water"],
      landmark: { name: "Ilhota de raízes", effect: "Ponto de referência da missão no meio dos canais; o lodo ao redor é terreno difícil." }
    }
  },

  atoll: {
    pools: {
      locations: ["um banco de areia que surge na vazante", "a margem da lagoa central", "um canal entre dois bancos", "uma duna com palmeiras tortas"],
      materials: ["conchas de nácar raras", "areia branca com brilho perolado", "sal puro recolhido nas poças", "fibras de coqueiro secas ao sol"],
      objects: ["uma caixa de ferramentas de navegador", "um barril lacrado preso na areia", "uma âncora enterrada até a metade", "uma lanterna de maré rachada", "uma bússola que gira sem parar"],
      mementos: ["uma garrafa com um bilhete desbotado", "um par de óculos de mergulho antigos", "um colar de conchas feito à mão", "um brinquedo de madeira levado pela maré"],
      clues: ["marcas de maré em níveis impossíveis", "rastros que entram na lagoa e não saem", "uma fogueira recém-apagada na areia", "conchas dispostas em círculo"],
      challenges: ["cruzar o banco de areia antes da maré subir", "contornar a lagoa sem pisar na água funda", "marcar a rota enquanto a vazante dura", "vencer a correnteza do canal central"],
      phenomena: ["maré que sobe mais rápido do que deveria", "lagoa que muda de cor ao pôr do sol", "areia que canta com o vento", "ondas que quebram em direções opostas"]
    },
    featured: {
      category: "exploration",
      title: "A rota da vazante",
      targetName: "a rota segura pelos bancos de areia",
      lead: "Durante a vazante, mapeie a rota que se abre no anel de areia",
      condition: "Marcar os bancos transitáveis até a lagoa central antes da maré fechar o caminho",
      proofType: "Trazer a rota marcada na pulseira e descrever os canais perigosos."
    },
    map: {
      markers: ["water", "current", "wet", "clearing"],
      landmark: { name: "Duna das palmeiras tortas", effect: "Ponto de referência da missão no anel de areia; o canal ao lado tem correnteza e é terreno difícil." }
    }
  },

  "coral-coast": {
    pools: {
      locations: ["uma galeria de coral submersa", "um baixio de águas claras", "uma muralha de recife exposta na maré baixa", "um jardim de corais coloridos"],
      materials: ["amostras de coral vivo", "conchas espiraladas incomuns", "algas de brilho azulado", "pérolas ainda presas às ostras"],
      objects: ["um baú encrustado de corais", "uma lanterna submersa que ainda brilha", "um arpão preso em uma fenda", "uma vela de navio emaranhada no recife", "um sino de bronze coberto de cracas"],
      mementos: ["um anel de casamento preso em um coral", "um relicário de prata coberto de cracas", "uma flauta de concha de um pescador desaparecido", "um chapéu de capitão preso na rocha"],
      clues: ["cardumes que fogem sempre da mesma galeria", "casco quebrado de dentro para fora", "marcas de arrasto no fundo de areia", "corais recém-arrancados em linha reta"],
      challenges: ["nadar entre as cristas sem se ferir", "prender o fôlego até a próxima bolsa de ar", "contornar a muralha antes da maré subir", "sair da galeria sem perder o equipamento"],
      phenomena: ["luz do sol que forma desenhos no fundo", "cardumes que giram em volta do grupo", "um canto grave vindo do recife", "água que esquenta em manchas"]
    },
    featured: {
      category: "collection",
      title: "Amostras do recife vivo",
      targetName: "amostras do coral que cresce nas galerias",
      lead: "Colete amostras do coral raro que cresce nas galerias submersas",
      condition: "Recolher as amostras sem quebrar o recife e voltar com elas ainda vivas",
      proofType: "Entregar as amostras ainda vivas, mantidas em água do mar."
    },
    map: {
      markers: ["water", "trench", "difficult", "current"],
      landmark: { name: "Jardim das ostras", effect: "Ponto de referência da missão no baixio; as cristas ao redor são terreno difícil." }
    }
  },

  shipwrecked: {
    pools: {
      locations: ["um casco virado na linha da maré", "a paliçada do acampamento", "a trilha de bambu até a nascente", "a boca da gruta dos mapas"],
      materials: ["lona de vela ainda impermeável", "breu para calafetar", "cordame de cânhamo sem podridão", "óleo de baleia para lamparinas"],
      objects: ["um baú de cartas náuticas lacrado", "a luneta do capitão de um navio perdido", "um sino de bordo com o nome raspado", "uma caixa de instrumentos de navegação", "o diário de bordo de um náufrago"],
      mementos: ["um anel de noivado amarrado num barbante", "uma carta nunca enviada", "um boneco de pano encharcado", "uma medalha de marinheiro gravada"],
      clues: ["marcas de lenha arrastada até o rochedo", "cinzas frescas numa noite sem navio", "nomes riscados na parede da gruta", "pegadas que saem do mar e não voltam"],
      challenges: ["atravessar o recife na maré baixa", "subir o rochedo sem ser visto do farol", "achar água doce antes do anoitecer", "convencer o acampamento a falar"],
      phenomena: ["uma luz no rochedo que imita um porto", "destroços que chegam à praia toda manhã", "um sino de navio que toca sob a água", "fumaça de fogueira que não se dispersa"]
    },
    featured: {
      category: "rescue",
      title: "Os últimos do Estrela-d’Alva",
      targetName: "os sobreviventes do Estrela-d’Alva, escondidos num casco virado",
      lead: "Resgate os sobreviventes do Estrela-d’Alva, o último navio atraído pela luz falsa, que se esconderam num casco virado",
      condition: "Chegar ao casco antes do bando, tirar os sobreviventes de lá e levá-los até o barco do grupo",
      proofType: "Os sobreviventes embarcados e o nome do navio no diário de bordo."
    },
    map: {
      markers: ["water", "wet", "obstacle", "difficult"],
      landmark: { name: "Casco do Estrela-d’Alva", effect: "O casco virado dá cobertura. Os sobreviventes estão escondidos lá dentro." }
    }
  },

  "giant-kelp": {
    pools: {
      locations: ["um canal aberto entre frondes gigantes", "uma plataforma de frondes trançadas", "um banco de areia preso pelas algas", "um casco engolido pela floresta verde"],
      materials: ["seiva fresca de fronde antiga", "fibra de alga trançada", "pérolas de selako", "esporos verdes da arrebentação"],
      objects: ["uma rede de pesca de elfo-do-mar", "um arpão de osso entalhado", "uma lanterna de concha", "o leme de um barco preso nas algas", "uma caixa de mantimentos lacrada"],
      mementos: ["um colar de conchas trançado", "um pente de coral com um nome gravado", "uma carta selada num frasco", "o anzol de prata de um pescador"],
      clues: ["frondes cortadas a faca", "ovos de selako quebrados na plataforma", "redes rasgadas por dentes", "uma trilha de bolhas que some entre as algas"],
      challenges: ["atravessar a floresta sem se enroscar", "achar o canal que a maré abre", "convencer os pastores de algas a ouvir", "passar pelas frondes sem acordar o que vive nelas"],
      phenomena: ["luzes que piscam entre as frondes", "algas que se fecham depois que o barco passa", "um canto baixo vindo do fundo", "a água ficando verde e espessa ao entardecer"]
    },
    featured: {
      category: "collection",
      title: "A seiva das frondes antigas",
      targetName: "a seiva das frondes mais antigas",
      lead: "Recolha a seiva das frondes mais antigas, que só crescem perto do centro da floresta",
      condition: "Encher três frascos com seiva fresca sem cortar as frondes-mãe",
      proofType: "Os três frascos lacrados, ainda verdes."
    },
    map: {
      markers: ["water", "foliage", "concealment", "current"],
      landmark: { name: "Fronde-mãe", effect: "A fronde mais antiga, de onde se recolhe a seiva." }
    }
  },

  volcanic: {
    pools: {
      locations: ["uma praia de cinzas negras", "uma encosta cortada por rios de lava", "o topo de uma encosta de cinzas", "um túnel de lava endurecida"],
      materials: ["vidro vulcânico cortante", "enxofre amarelo das fumarolas", "pedra-pomes leve e quente", "cristais formados pela lava"],
      objects: ["uma picareta derretida pela metade", "um forno de campanha abandonado", "um escudo de bronze rachado pelo calor", "uma urna de obsidiana lacrada", "uma corrente de ferro enterrada em cinzas"],
      mementos: ["um capacete de mineiro chamuscado", "uma carta meio queimada de uma expedição", "uma pulseira de ferro marcada com um nome", "uma bandeira de tecido endurecido pelas cinzas"],
      clues: ["pegadas que terminam em rocha derretida", "símbolos riscados em pedra ainda quente", "ossos limpos pelo calor", "uma trilha de cinzas varrida de propósito"],
      challenges: ["cruzar o rio de lava pelas pedras firmes", "respirar sem se sufocar nas fumarolas", "chegar ao topo antes do próximo tremor", "estabilizar a rota entre as fendas"],
      phenomena: ["tremores curtos a cada poucos minutos", "chuva de cinzas finas", "ar que treme e distorce o horizonte", "um estrondo grave vindo do fundo da montanha"]
    },
    featured: {
      category: "trial",
      title: "A prova da encosta",
      targetName: "a travessia da encosta instável",
      lead: "Para provar que a rota é segura, percorra de ponta a ponta a encosta instável",
      condition: "Atravessar a encosta e firmar três marcos de pedra antes do próximo tremor grande",
      proofType: "Mostrar os marcos firmados e relatar os trechos que cederam."
    },
    map: {
      markers: ["lava", "slope", "difficult", "obstacle"],
      landmark: { name: "Encosta dos marcos", effect: "Ponto de referência da missão na encosta; os rios de lava ao redor são intransitáveis." }
    }
  },

  "sea-caves": {
    pools: {
      locations: ["a entrada voltada para o mar", "um túnel inundado", "uma plataforma de pedra entre dois canais", "um bolsão de ar escondido"],
      materials: ["cristais de sal das paredes", "musgo luminoso das cavernas", "lascas de rocha polida pela água", "bolsas de ar presas em algas secas"],
      objects: ["um bote preso entre duas pedras", "um baú encravado no teto da caverna", "uma corda de resgate cortada", "um lampião ainda aceso no escuro", "uma bússola de latão cheia de água"],
      mementos: ["uma bota de borracha cheia de água do mar", "um diário de bordo ensopado e ilegível", "um chapéu de pescador preso em uma estalactite", "um colar de dentes de peixe-lanterna"],
      clues: ["marcas de ventosas nas paredes", "um canal com água revolvida", "uma pilha de ossos de peixe junto à entrada", "ecos que voltam trocados"],
      challenges: ["achar a passagem que some com a maré", "nadar pelo túnel inundado sem perder o fôlego", "se orientar no escuro dos túneis", "voltar à entrada antes da maré encher"],
      phenomena: ["maré que entra cantando baixo", "gotas que formam um ritmo sozinhas", "ventos frios que sopram de dentro da pedra", "luz verde pulsando no fundo d'água"]
    },
    featured: {
      category: "specialHunt",
      title: "O morador dos túneis",
      targetName: "a lula-gigante que habita as cavernas",
      lead: "Cace a lula-gigante que arrasta barcos para as cavernas",
      condition: "Atrair a criatura para a plataforma de pedra e derrotá-la antes que a maré encha o túnel",
      proofType: "Trazer um tentáculo como prova da caçada.",
      creatureId: "lula-gigante",
      landmark: { name: "Plataforma da lula", effect: "Plataforma de pedra firme no meio dos canais; é onde a lula costuma emergir." }
    },
    map: {
      markers: ["water", "current", "wet", "concealment"],
      landmark: { name: "Plataforma dos três canais", effect: "Plataforma de pedra no cruzamento dos canais, ponto de referência da missão." }
    }
  },

  "pirate-held": {
    pools: {
      locations: ["um cais de contrabandistas", "a paliçada voltada para o mar", "uma passarela entre o fortim e o cais", "uma gruta usada como paiol"],
      materials: ["barris de pólvora úmida", "rolos de lona de vela", "garrafas de rum do próprio fortim", "pregos e ferragens de navio"],
      objects: ["um cofre de capitão trancado", "um mapa de rotas roubadas", "uma bandeira negra enrolada", "um diário de contas dos piratas", "um sino de alarme do fortim"],
      mementos: ["um medalhão de uma tripulação desaparecida", "uma fita de cabelo presa a uma grade", "uma pistola antiga com iniciais gravadas", "uma caixa de música tirada de um navio mercante"],
      clues: ["uma fogueira com pouca lenha, mas ainda quente", "marcações de carga em engradados", "bandeiras trocadas durante a noite", "dois horários diferentes no quadro de turnos"],
      challenges: ["passar pelos vigias sem soar o alarme", "infiltrar-se no depósito do fortim", "convencer um pirata a trair o capitão", "escapar do fortim com o que veio buscar"],
      phenomena: ["tambores batendo ao longe em ritmo regular", "um canhão que dispara sem aviso", "gaivotas que seguem os piratas", "bandeiras que mudam de cor com o vento"]
    },
    featured: {
      category: "rescue",
      title: "A lembrança do marinheiro",
      targetName: "o medalhão de um marinheiro que não voltou, guardado pelos piratas",
      lead: "Resgate o medalhão de um marinheiro que não voltou, tomado pelos piratas e guardado no paiol",
      condition: "Chegar ao paiol da gruta, recuperar o medalhão sem acionar o alarme e sair pelo cais",
      proofType: "Entregar o medalhão à família ou ao imediato do barco."
    },
    map: {
      markers: ["deck", "obstacle", "door", "advantage"],
      landmark: { name: "Paiol da gruta", effect: "Gruta usada como depósito, ponto de referência da missão; barris e engradados dão cobertura." }
    }
  },

  floating: {
    pools: {
      locations: ["uma ponte quebrada entre plataformas", "a borda de uma cachoeira que cai no vazio", "um mirante de ninhos", "uma ilhota de pedra girando devagar"],
      materials: ["penas de grifo", "pedras leves que flutuam", "cristal de nuvem condensada", "musgo que cresce no vazio"],
      objects: ["uma âncora de plataforma presa em raízes", "uma corda de ponte esticada", "um sino de vento de metal", "uma lanterna de sinalização antiga", "uma pá de escalada de ferro"],
      mementos: ["uma capa de viajante rasgada pelo vento", "uma luneta de latão sem lentes", "um chapéu preso em um galho no vazio", "uma pena de ave com um bilhete amarrado"],
      clues: ["penas grandes demais para qualquer ave", "pedras soltas que se alinham em um padrão", "marcas de garra na ponte", "um fio de água que sobe em vez de cair"],
      challenges: ["atravessar a ponte quebrada com o vento", "pular entre plataformas sem cair", "alcançar o mirante antes do vento mudar", "descer a cachoeira de volta ao barco"],
      phenomena: ["pedras menores girando em torno da ilha", "cachoeira que cai e some antes de chegar ao mar", "vento forte vindo de baixo", "nuvens que cobrem a plataforma por alguns instantes"]
    },
    featured: {
      category: "specialHunt",
      title: "O armento fora de lugar",
      targetName: "o armento de burafontes perdido nas plataformas",
      lead: "Cace o armento de burafontes que ninguém sabe como foi parar nas plataformas suspensas",
      condition: "Encurralar o armento na plataforma maior e derrotá-lo sem deixar que derrube a ponte",
      proofType: "Trazer uma presa como prova e explicar como eles chegaram ali.",
      creatureId: "armento-de-burafontes",
      landmark: { name: "Plataforma do armento", effect: "A maior plataforma do alto da ilha; a ponte que dá acesso a ela não suporta uma correria sem consequências." }
    },
    map: {
      markers: ["wind", "pit", "slope", "difficult"],
      landmark: { name: "Ponte dos ninhos", effect: "Ponte entre plataformas e referência da missão; áreas de vento forte ao redor." }
    }
  },

  storm: {
    pools: {
      locations: ["uma praia de destroços", "um pico rochoso castigado por raios", "uma enxurrada que corta a ilha ao meio", "um farol caído"],
      materials: ["pedras fulguradas", "água de chuva carregada de eletricidade", "pedaços de mastro queimados por raios", "sal endurecido pela tempestade"],
      objects: ["um para-raios de bronze torto", "um barril lacrado trazido pela enxurrada", "uma bandeira de sinal rasgada", "uma lanterna à prova de vento", "uma âncora arrancada de algum navio"],
      mementos: ["um diário de bordo de um capitão engolido pela tempestade", "um chapéu de oleado preso em um mastro", "um medalhão com um raio gravado", "um apito de marujo entalhado em osso"],
      clues: ["uma fileira de raios caindo no mesmo ponto", "marcas queimadas no formato de mãos", "um farol aceso em uma ilha sem faroleiro", "destroços de navios de várias épocas na praia"],
      challenges: ["chegar ao pico entre dois raios", "resistir ao vento na praia aberta", "atravessar a enxurrada com o equipamento", "manter o barco ancorado durante a tempestade"],
      phenomena: ["raios que caem sempre no mesmo ponto", "chuva que cai de lado", "trovões que formam palavras", "vento que muda de direção a cada minuto"]
    },
    featured: {
      category: "anomalous",
      title: "O raio que repete",
      targetName: "o ponto onde o mesmo raio cai sem parar",
      lead: "Investigue por que o mesmo raio cai a cada minuto sobre o mesmo ponto",
      condition: "Chegar ao ponto, observar o fenômeno por uma tempestade completa e descobrir o que o atrai",
      proofType: "Registrar o fenômeno e trazer uma lasca da pedra atingida."
    },
    map: {
      markers: ["wind", "wet", "water", "slope"],
      landmark: { name: "Pedra do raio", effect: "Pedra atingida pelo raio, ponto de referência da missão; o vento forte varre as áreas expostas ao redor." }
    }
  }
};

export function getArchipelagoMissionTheme(themeId) {
  return ARCHIPELAGO_MISSION_THEMES[themeId] || null;
}
