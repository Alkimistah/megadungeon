# Requisitos — Andares 21 a 30

Documento inicial de análise para desenhar os andares 21 a 30 da Masmorra de Práxis no app Mega Dungeon.

## Contexto

Os andares 21 a 30 representam uma terceira etapa da campanha. O conceito inicial é um arquipélago com 10 ilhas distintas. Cada ilha corresponde a um andar, possui identidade própria e oferece um objetivo diferente.

Diferente dos andares 1 a 10, essa etapa não deve ser um labirinto abstrato por sucessos e falhas. Diferente dos andares 11 a 20, ela também não deve ser apenas um mapa em nodos linear ou em "taça". A ideia principal é exploração aberta: o grupo pode escolher qual ilha visitar, voltar para ilhas já conhecidas e conduzir objetivos em ordem flexível.

A exceção é a última ilha, associada ao boss da etapa. Essa ilha deve permanecer bloqueada até que as outras 9 ilhas sejam concluídas e o grupo reúna todos os fragmentos necessários para traçar a rota final.

## Objetivo

Criar um modo de exploração para os andares 21 a 30 baseado em arquipélago aberto, com 10 ilhas visíveis no mapa, objetivos distintos por ilha, liberdade de escolha de rota e uma ilha final de boss desbloqueada quando as 9 ilhas anteriores estiverem marcadas como concluídas.

O app deve ajudar o mestre a controlar:

- quais ilhas já foram visitadas;
- quais objetivos foram concluídos;
- quais pistas, chaves, bênçãos, recursos ou consequências foram obtidos;
- quantos fragmentos do mapa de rotas foram recuperados;
- quando a ilha do boss fica acessível;
- quais encontros, obstáculos, tesouros e mapas táticos pertencem a cada ilha.

## Princípios de Design

- A unidade principal da exploração é a ilha.
- Cada ilha deve ter uma identidade mecânica e narrativa própria.
- O arquipélago deve comunicar liberdade de escolha, não progressão linear.
- A ilha do boss deve ficar bloqueada no início.
- O desbloqueio do boss deve exigir a conclusão das 9 ilhas anteriores.
- Cada exploração de ilha consome 8 horas.
- O grupo só pode explorar 1 ilha por descanso.
- O barco funciona como acampamento: ao descansar nele, o grupo recupera forças e o contador de esforço do dia é resetado.
- O mestre deve poder resolver objetivos em mesa e marcar o estado no app.
- O app deve registrar progresso, consequências e recompensas, mas não deve substituir decisões narrativas do mestre.
- Encontros, criaturas, armadilhas, tesouros, ND e mapas táticos devem reaproveitar sistemas existentes quando possível.
- O mapa principal do arquipélago não é um mapa tático. Mapas táticos devem existir apenas para cenas específicas dentro das ilhas.

## Fluxo Geral

### 1. Início da Faixa

Ao selecionar a faixa "Andares de 21 a 30", o app deve carregar:

- perfil do arquipélago;
- mapa com 10 ilhas;
- estado de bloqueio da ilha final;
- objetivos de cada ilha;
- fragmentos do mapa de rotas obtidos;
- progresso geral da etapa;
- estado de esforço do dia;
- estado de descanso no barco;
- regras de viagem entre ilhas;
- tema visual marítimo/insular;
- tabelas ou cenas de encontro por ilha;
- regras de ND por ilha;
- regras de tesouro e recompensas por objetivo.

### 2. Mapa do Arquipélago

O mapa principal deve mostrar o barco do grupo e 10 ilhas em formato de pirâmide.

Requisitos:

- o barco fica na base da pirâmide e representa a base operacional do grupo;
- o barco funciona como acampamento e deve ser clicável;
- acima do barco ficam 4 ilhas de menor dificuldade;
- acima dessas ficam 3 ilhas de dificuldade intermediária;
- acima dessas ficam 2 ilhas avançadas;
- no topo fica a ilha 30, a ilha do boss;
- ilhas 21 a 24 ficam disponíveis desde o início;
- ilhas 25 a 27 ficam disponíveis após as ilhas 21 a 24 estarem marcadas como objetivo concluído;
- ilhas 28 e 29 ficam disponíveis após as ilhas 25 a 27 estarem marcadas como objetivo concluído;
- ilha 30 fica bloqueada até as outras 9 ilhas estarem concluídas;
- cada ilha deve ter nome, número, objetivo e estado;
- cada ilha concluída deve mostrar um check próximo ao marcador;
- cada ilha concluída deve adicionar um ícone ao barco, representando um fragmento do mapa de rotas recuperado;
- se o grupo já explorou uma ilha desde o último descanso, as outras ilhas devem indicar que uma nova exploração exige descanso no barco;
- estados mínimos:
  - não visitada;
  - visitada;
  - objetivo em andamento;
  - objetivo concluído;
  - consequência ativa;
  - bloqueada;
  - boss disponível;
  - concluída.

O mapa deve permitir clicar em uma ilha para abrir sua ficha. A pirâmide comunica dificuldade: quanto mais alta a ilha, mais perigosa ela tende a ser. O barco deve abrir a ficha de acampamento ou acionar a ação de descanso.

### 3. Escolha de Ilha

O grupo pode escolher qualquer ilha acessível.

Ao escolher uma ilha, o app deve:

- abrir a ficha da ilha;
- mostrar se o grupo ainda pode explorar uma ilha neste dia;
- mostrar objetivo principal;
- mostrar cenas disponíveis;
- mostrar encontros ou perigos associados;
- permitir registrar avanço ou conclusão do objetivo;
- consumir 8 horas quando o mestre registrar a exploração da ilha;
- bloquear nova exploração de ilha até o próximo descanso no barco;
- manter histórico das visitas.

A escolha de ilha não deve exigir que as ilhas anteriores estejam concluídas.

### 4. Objetivos por Ilha

Cada ilha deve ter um objetivo distinto.

Exemplos de tipos de objetivo:

- derrotar uma ameaça dominante;
- recuperar um fragmento, chave ou relíquia;
- negociar com uma facção ou entidade local;
- purificar uma fonte corrompida;
- sobreviver a um fenômeno ambiental;
- resolver um enigma ou ritual;
- explorar ruínas e encontrar a saída;
- libertar prisioneiros ou aliados;
- interromper um culto, máquina ou processo mágico;

O objetivo deve ter:

- título;
- descrição curta;
- estado;
- condição de conclusão;
- recompensa;
- fragmento do mapa de rotas recebido ao concluir a ilha.

Não existe falha definitiva da ilha. Se o grupo não completar a ilha inteira no mesmo dia de exploração, ela não concede fragmento e seu progresso interno é perdido ao descansar.

### 4.1 Modal da Ilha

Quando uma ilha for selecionada, o app deve abrir uma modal ou ficha detalhada com os objetivos/encontros daquela ilha.

A quantidade de objetivos ou encontros deve ser definida pelo andar que a ilha representa. Exemplo inicial:

| Ilha | Quantidade sugerida de objetivos/encontros |
|---|-------------------------------------------:|
| 21 |                                          3 |
| 22 |                                          3 |
| 23 |                                          5 |
| 24 |                                          5 |
| 25 |                                          7 |
| 26 |                                          7 |
| 27 |                                          9 |
| 28 |                                          9 |
| 29 |                                         11 |
| 30 |              boss e cenas finais a definir |

Cada objetivo/encontro pode ter:

- título;
- tipo;
- ND;
- estado;
- criatura, armadilha, obstáculo ou cena narrativa;
- recompensa;
- mapa tático, quando aplicável.

O mestre deve poder marcar objetivos/encontros como resolvidos. A ilha só fica marcada como OK quando todos os objetivos/encontros exigidos daquela exploração forem resolvidos antes do próximo descanso. Se o grupo descansar sem completar tudo, a próxima tentativa na mesma ilha começa do zero.

### 5. Progressão Global

O app deve controlar um progresso global da etapa.

Modelo definido:

- ilhas 21 a 24 ficam disponíveis desde o início;
- ilhas 25 a 27 ficam disponíveis após as ilhas 21 a 24 estarem marcadas como objetivo concluído;
- ilhas 28 e 29 ficam disponíveis após as ilhas 25 a 27 estarem marcadas como objetivo concluído;
- cada ilha concluída concede 1 fragmento do mapa de rotas;
- o barco exibe um ícone para cada fragmento obtido;
- a ilha 30 é desbloqueada quando os 9 fragmentos forem obtidos;
- na prática, a ilha 30 só fica acessível quando todas as outras ilhas estiverem marcadas como objetivo concluído.

Esse modelo torna a etapa aberta na ordem de exploração, mas fechada na condição de conclusão: o grupo escolhe a sequência das ilhas, porém precisa resolver todas antes de alcançar o boss.

### 6. Ilha do Boss

A ilha 30 deve ser a ilha final da etapa.

Requisitos:

- começa bloqueada;
- aparece no mapa desde o início, mas com acesso impedido;
- deve indicar claramente que exige 9 fragmentos do mapa de rotas;
- ao desbloquear, muda para estado acessível;
- deve ter encontro final próprio;
- deve usar mapa tático especial;
- deve considerar vantagens ou consequências obtidas nas ilhas anteriores.

Possíveis efeitos de progresso sobre o boss:

- reduzir ou aumentar perigos ambientais da ilha final;
- remover reforços;
- enfraquecer uma defesa;
- abrir rota alternativa;
- conceder posição inicial melhor ao grupo;
- reduzir CD de uma mecânica do boss;
- liberar tesouro adicional.

O boss ainda não está definido neste documento.

Também fica em aberto se a ilha 30 terá objetivos preliminares antes do boss ou se, ao entrar nela, o grupo já inicia diretamente a luta final.

### 7. Cenas Dentro de Cada Ilha

Cada ilha pode conter cenas internas.

Modelos possíveis:

- uma cena principal por ilha;
- uma lista de objetivos/encontros conforme o número da ilha;
- uma sequência curta de cenas;
- um mini-mapa em nodos por ilha;
- uma tabela d100 local;
- encontros opcionais ligados ao objetivo.

Modelo inicial recomendado:

- cada ilha possui uma ficha compacta;
- a ficha contém objetivo principal e uma lista de objetivos/encontros;
- a quantidade de objetivos/encontros pode variar por ilha, definida no perfil;
- o app pode gerar ou exibir encontros associados;
- cenas de combate, obstáculo ou armadilha podem abrir mapa tático;
- o mestre marca manualmente o objetivo como concluído quando a ilha for resolvida.

Esse modelo preserva liberdade de mesa sem exigir um subsistema pesado para cada ilha.

Regra de reset: objetivos/encontros resolvidos durante uma exploração só contam para concluir a ilha naquele mesmo dia. Ao descansar no barco, qualquer ilha parcialmente resolvida perde seu progresso parcial. Exemplo: se a ilha 21 tem 4 objetivos e o grupo resolve 3 antes de descansar, ao voltar em outro dia precisa resolver novamente os 4 objetivos.

### 8. Tempo, Descanso e Viagem Entre Ilhas

Cada exploração de ilha consome 8 horas e representa um dia de esforço. Após explorar uma ilha, o grupo não pode explorar outra até descansar no barco.

O app deve:

- registrar o consumo de 8 horas por exploração de ilha;
- preservar o tempo de exploração atual no código de sessão;
- mostrar o tempo de exploração desde o último descanso;
- mostrar se o grupo já gastou o esforço do dia;
- registrar no log quando uma ilha for explorada;
- bloquear a ação de explorar outra ilha enquanto o esforço do dia estiver gasto;
- permitir descanso no barco;
- ao descansar no barco, resetar o esforço do dia e permitir nova exploração;
- evitar que o consumo de tempo dependa de microações internas, salvo se uma ilha tiver regra especial.

O barco funciona como acampamento.

Ao clicar no barco ou em um botão de descanso, o app deve:

- registrar descanso no log;
- recuperar o estado de esforço do grupo para o próximo dia;
- zerar o contador do dia atual usado para bloquear nova exploração;
- resetar o contador de tempo de exploração exibido, seguindo o comportamento de descanso dos outros perfis;
- limpar progresso parcial de ilhas não concluídas;
- permitir que o grupo escolha outra ilha para explorar.

### 8.1 Ataques ao Barco

O barco é o acampamento, mas pode se tornar mais vulnerável conforme o grupo avança.

Ideia a considerar:

- a cada ilha concluída, aumenta a chance de ataque ao barco durante uma noite de descanso;
- esses ataques representam que o arquipélago reage ao avanço do grupo;
- a chance, ND e composição desses ataques ainda precisam ser definidos;
- essa regra não deve transformar todo descanso em punição constante.

Na primeira versão, ataques ao barco podem ser opcionais ou apenas uma regra preparada no perfil.

A viagem entre ilhas pode ser simples ou mecânica.

Opção simples:

- o grupo escolhe uma ilha acessível e viaja para ela;
- o app registra a visita;
- não há teste de viagem por padrão.

Opção com risco:

- viagem pode gerar evento marítimo;
- rotas específicas podem ser perigosas;
- tempestades, correntes, monstros marinhos ou bloqueios podem aparecer;
- falhas podem consumir recurso, tempo ou gerar encontro.

Modelo inicial recomendado:

- começar com viagem simples;
- considerar que o bloco de 8 horas inclui aproximação, desembarque, exploração e retorno ao barco;
- deixar eventos de viagem como melhoria ou regra opcional;
- não impedir a exploração aberta por excesso de rolagens entre ilhas.

### 8.2 Clima do Dia de Exploração

O efeito climático de uma ilha persiste pelo dia de exploração.

Quando o grupo inicia a exploração de uma ilha, o app deve determinar ou carregar o clima daquele dia de exploração. Esse clima vale para todos os objetivos/encontros resolvidos naquela exploração.

Exemplo: se o grupo explora uma ilha vulcânica e o clima gerado é Furacão, o Furacão afeta o dia inteiro naquela ilha.

Requisitos:

- clima deve ser exibido com destaque na modal da ilha;
- todos os objetivos/encontros daquela exploração devem referenciar o mesmo clima;
- o clima pode influenciar ND, texto narrativo e mapas táticos;
- ao descansar, um novo clima diário deve ser gerado para cada ilha.

Antes de se comprometer com a exploração, os jogadores podem tentar avaliar o clima que afeta uma ilha naquele dia sem conhecer seus detalhes internos. Isso pode ser feito com testes como Percepção, Sobrevivência ou perícias equivalentes. A CD deve ser relacionada à dificuldade da ilha.

Decisão de persistência recomendada: salvar o clima diário gerado para cada ilha até o próximo descanso. Se a ilha já teve conteúdo gerado, salvar também a identidade do tema, objetivos/encontros e estados resolvidos da exploração ativa, em vez de depender apenas de regeneração mínima por seed.

### 9. ND e Patamar

Os andares 21 a 30 devem usar NDs apropriados ao patamar esperado da etapa.

Segundo o documento de progressão de níveis do grupo, a faixa 21-30 começa com o grupo no nível 7 e tem nível máximo esperado 10. O cálculo de ND deve partir dessa limitação de níveis, como nas demais faixas: o ND é definido com o nível dos personagens em mente.

Como ainda não há fórmula/tabela fechada para converter essa progressão em NDs por ilha, o documento não define valores finais de ND. O perfil deve conter:

- ND base por ilha;
- ND de encontros opcionais;
- ND do objetivo principal;
- ND da ilha final;
- modificadores por risco ambiental;
- teto de ND por etapa.

Uma possibilidade é escalar por grupos de ilhas:

| Ilhas | Função | ND sugerido |
|---|---|-------------|
| 21-24 | base da pirâmide, 4 ilhas iniciais | 8           |
| 25-27 | faixa intermediária, 3 ilhas | 9           |
| 28-29 | faixa avançada, 2 ilhas | 10          |
| 30 | boss | 11          |

Os valores devem ser definidos a partir do patamar real dos personagens e das ameaças escolhidas.

Essa mesma pirâmide também deve orientar o sorteio de temas por seed. A seed deve escolher 4 temas de dificuldade inicial para as ilhas 21 a 24, 3 temas de dificuldade intermediária para as ilhas 25 a 27 e 2 temas de dificuldade avançada para as ilhas 28 e 29. A ilha 30 deve ser fixa e reservada para o boss.

### 10. Identidade das Ilhas

Cada ilha deve ter um tema próprio, com pequena variação local. O tema pode ser definido diretamente pelo número do andar/ilha ou sorteado por seed.

Como o grupo pode sair da masmorra e retornar depois com progresso parcial em várias ilhas, a geração aleatória precisa ser persistente e específica. Se temas ou objetivos forem sorteados, o código de sessão deve preservar o resultado gerado para cada ilha, não apenas a seed global mínima.

Modelo recomendado de geração:

- a lista total de temas deve ser maior que 10;
- a seed sorteia exatamente 9 temas não repetidos para as ilhas 21 a 29, respeitando o grau de dificuldade da pirâmide;
- a ilha 30 não participa do sorteio e usa o tema fixo de ilha dos dinossauros;
- o resultado gerado deve ser salvo no código de sessão para que o arquipélago não mude entre retornos à campanha;
- temas podem ter variações internas, mas a identidade principal da ilha deve permanecer estável.

Distribuição inicial sugerida de temas por dificuldade:

| Dificuldade | Ilhas | Temas possíveis |
|---|---|---|
| Inicial | 21-24 | ilha tropical; ilha manguezal; atol circular; costa do coral; ilha dos náufragos; ilha de algas gigantes; ilha de névoa; ilha-cemitério de navios |
| Intermediária | 25-27 | ilha vulcânica; navio abandonado; ilha das ruínas ciclópicas; ilha-labirinto de cavernas marinhas; ilha tomada por piratas; ilha sagrada ou proibida; ilha de maré impossível; ilha de cristal |
| Avançada | 28-29 | iceberg; ilha flutuante; ilha de tempestades eternas; ilha viva; ilha de sal e ossos; ilha elemental |
| Boss | 30 | ilha dos dinossauros |

Critério de classificação:

- ilhas iniciais devem ter obstáculos claros, leitura visual simples e risco ambiental moderado;
- ilhas intermediárias podem exigir interação mais forte com água, ruínas, facções, navegação interna ou perigos ambientais constantes;
- ilhas avançadas devem concentrar alterações fortes de terreno, clima extremo, efeitos mágicos ou risco de cena mais complexo;
- a ilha do boss deve ser reconhecível desde o início no mapa, mas permanecer bloqueada até os 9 fragmentos serem obtidos.

Tema definido para a ilha do boss: ilha dos dinossauros. O boss planejado é uma versão ND 11 do Rei Tirano, ainda a ser criada e cadastrada no catálogo.

Exemplos iniciais:

| Ilha | Conceito possível | Objetivo possível |
|---|---|---|
| 21 | Ilha dos Náufragos | resgatar sobreviventes ou recuperar mapas |
| 22 | Ilha dos Corais Cortantes | atravessar recifes vivos e obter uma chave |
| 23 | Ilha Vulcânica | estabilizar ou sobreviver a uma erupção arcana |
| 24 | Ilha das Ruínas Afundadas | explorar ruínas que emergem com a maré |
| 25 | Ilha da Névoa | encontrar uma entidade ou verdade escondida |
| 26 | Ilha dos Predadores | derrotar ou evitar a cadeia alimentar local |
| 27 | Ilha do Culto | interromper ritual que protege o boss |
| 28 | Ilha Mecânica ou Cristalina | desativar um mecanismo antigo |
| 29 | Ilha Espelhada | resolver anomalia, duplicata ou prova mental |
| 30 | Ilha do Boss | enfrentar o chefe da etapa |

Esses conceitos são ponto de partida, não decisão final.

### 11. Mapas Táticos

O arquipélago deve usar dois níveis de mapa:

- mapa estratégico do arquipélago, com ilhas;
- mapa tático por cena, quando houver combate, armadilha, obstáculo espacial ou boss.

Mapas táticos podem representar:

- praia;
- recife;
- caverna costeira;
- ruína;
- floresta tropical;
- ponte natural;
- vulcão;
- navio encalhado;
- templo;
- arena do boss.

Regras mínimas:

- o mapa tático deve refletir a ilha e a cena;
- inimigos e armadilhas devem corresponder à composição mecânica;
- água, terreno difícil, elevação, cobertura e gargalos devem ser usados quando relevantes;
- a posição inicial do grupo deve ser clara;
- mapas do boss podem ter tamanho e estrutura especiais.

### 12. Recompensas

Cada ilha deve oferecer recompensa por objetivo.

Tipos possíveis:

- tesouro padrão por ND;
- fragmento do mapa de rotas para a ilha final;
- vantagem contra o boss;
- aliado;
- informação;
- redução de risco ambiental;
- recurso de viagem;
- item especial.

O documento assume a mesma regra geral já usada: quando o texto disser "tesouro padrão", o mestre rola na tabela de tesouros usando o ND indicado.

Além do tesouro, cada uma das ilhas 21 a 29 deve conceder um fragmento do mapa de rotas ao ser concluída. Com 9 fragmentos, a rota da ilha do boss pode ser encontrada.

Como ponto de progressão de campanha, o grupo pode ganhar níveis ao completar grupos de ilhas, não apenas por encontros individuais. Para o app, a regra principal é assumir o nível esperado por linha da pirâmide: ilhas de baixo usam o nível base da faixa, ilhas intermediárias assumem grupo mais avançado e ilhas superiores assumem grupo próximo da preparação para o boss. A forma exata de XP ou avanço de nível fica fora do escopo mecânico imediato do app.

### 13. Persistência de Sessão

O código de sessão deve preservar:

- perfil 21-30;
- seed do arquipélago;
- identidade gerada de cada ilha, se houver sorteio;
- tema de cada ilha;
- pequena variação de tema de cada ilha;
- objetivos/encontros gerados por ilha;
- estados resolvidos dos objetivos/encontros por ilha;
- ilhas visitadas;
- ilhas concluídas;
- ilha atual;
- objetivo em andamento;
- fragmentos do mapa de rotas;
- acesso à ilha final;
- tempo de exploração atual;
- esforço do dia gasto ou disponível;
- descanso disponível/realizado no barco;
- climas diários gerados por ilha;
- clima ativo da exploração atual;
- progresso parcial da exploração ativa;
- consequências ativas;
- vantagens obtidas;
- log recente;
- mapas/cenas ativos se forem necessários para continuidade.

Para essa faixa, a persistência deve ser mais explícita que uma regeneração mínima. Como os jogadores podem sair e retornar depois de cumprir ilhas diferentes, o app deve salvar a identidade das ilhas, seus objetivos/encontros, climas diários, progresso interno da exploração ativa e decisões do mestre. A seed continua útil para criar o arquipélago, mas não deve ser a única fonte de verdade depois que a sessão começou.

## Layout Ideal

### Estrutura da Tela

A tela dos andares 21 a 30 deve ter quatro áreas principais.

#### 1. Cabeçalho da Etapa

Exibe:

- "Andares 21 a 30";
- ilha atual;
- progresso global, como "fragmentos 4/9";
- condição de desbloqueio da ilha final;
- seed;
- tempo de exploração desde o último descanso;
- estado do dia, indicando se o grupo ainda pode explorar uma ilha antes de descansar.

#### 2. Mapa do Arquipélago

Mostra o barco e as 10 ilhas em pirâmide:

```text
               [30]
          [28]      [29]
      [25]    [26]      [27]
  [21]    [22]    [23]      [24]
              [Barco]
```

O barco é a base visual da etapa, funciona como acampamento e deve exibir os ícones dos fragmentos recuperados.

Cada ilha deve exibir:

- número;
- nome curto;
- estado visual;
- ícone ou cor de tema;
- indicador de objetivo concluído;
- indicador de bloqueio, quando aplicável.

#### 3. Ficha da Ilha

Ao selecionar uma ilha, mostra:

- nome;
- conceito;
- objetivo;
- estado;
- ND recomendado;
- clima do dia de exploração, quando houver;
- cenas disponíveis;
- recompensas;
- consequências;
- ações para marcar visita, progresso e conclusão.

Se o grupo já gastou o esforço do dia, a ficha deve deixar claro que a ilha pode ser consultada, mas não explorada novamente antes de descansar no barco.

#### 4. Cena Atual

Quando houver cena ativa, mostra:

- tipo da cena;
- texto narrativo;
- ND;
- criatura, armadilha ou obstáculo;
- recompensa;
- mapa tático, se aplicável;
- ações de resolução.

## Tema Visual

O tema dos andares 21 a 30 é arquipélago fantástico.

Direção visual:

- fundo marítimo escuro;
- ilhas com silhuetas distintas;
- acentos de água, coral, luz solar, ruína e tempestade;
- boss com presença visual desde o início, mas inacessível;
- estados de ilha devem ser legíveis em tablet;
- evitar que o mapa estratégico pareça mapa tático quadriculado.

O visual deve favorecer escolha rápida de ilha e leitura clara do progresso.

## Modelo de Estado Sugerido

```js
{
  mode: "archipelago",
  profile: "archipelago-21-30",
  currentIsland: 24,
  bossIslandUnlocked: false,
  routeFragments: 3,
  elapsedHours: 8,
  dayEffortSpent: true,
  dailyWeatherByIsland: {
    21: "Chuva",
    22: "Neblina",
    24: "Furacão"
  },
  activeExploration: {
    island: 24,
    climate: "Furacão",
    completedEncounterIds: ["ruins-gate", "reef-sentinels"],
    startedAtElapsedHours: 0
  },
  islands: {
    21: {
      theme: "Ilha dos Náufragos",
      themeVariant: "praia de destroços recentes",
      status: "completed",
      visited: true,
      objectiveStatus: "completed",
      routeFragmentClaimed: true,
      rewardsClaimed: true,
      encounters: [
        { id: "wreck-camp", status: "resolved" },
        { id: "reef-ambush", status: "resolved" }
      ],
      consequences: []
    },
    24: {
      theme: "Ilha das Ruínas Afundadas",
      themeVariant: "ruínas expostas por maré baixa",
      status: "in-progress",
      visited: true,
      objectiveStatus: "in-progress",
      activeSceneId: "ruins-low-tide",
      dailyClimate: "Furacão",
      consequences: ["maré subindo"]
    },
    30: {
      status: "locked",
      visited: false,
      objectiveStatus: "locked"
    }
  },
  advantages: [],
  log: []
}
```

Estados possíveis de ilha:

- `locked`;
- `available`;
- `visited`;
- `in-progress`;
- `completed`;
- `boss-available`;
- `boss-completed`.

## Dados Estruturados Necessários

O perfil dos andares 21 a 30 deve conter:

- lista das 10 ilhas;
- nome e conceito de cada ilha;
- posição da ilha na pirâmide;
- estado inicial;
- regras de desbloqueio da ilha 30;
- regras do barco como acampamento;
- regras opcionais de ataque ao barco durante descanso;
- regra de uma exploração por descanso;
- objetivos por ilha;
- quantidade de objetivos/encontros por ilha;
- fragmento de rota concedido por ilha 21-29;
- tempo de exploração por ilha;
- regras de clima diário por ilha;
- regras de teste para avaliar clima antes de escolher a ilha;
- regras para tema fixo ou tema gerado por seed;
- recompensas por ilha;
- consequências por ilha;
- cenas obrigatórias e opcionais;
- NDs por ilha;
- regras de criatura por ilha;
- regras de armadilha por ilha;
- layouts táticos por tema de ilha;
- tema visual do arquipélago;
- regras opcionais de viagem;
- regras de persistência.

## Integração com Sistemas Existentes

Reaproveitar:

- catálogo de criaturas;
- catálogo de armadilhas;
- cálculo e formatação de ND;
- resolvedor de encontros;
- gerador de mapa tático, com novos layouts;
- código de sessão;
- tema por perfil;
- log narrativo;
- modal de cena ou estrutura similar à exploração estendida.

Criar ou separar:

- estado de arquipélago;
- renderização do mapa de ilhas;
- ficha de ilha;
- controlador de objetivos;
- controlador de descanso/esforço diário;
- controlador opcional de ataques ao barco;
- regra de desbloqueio da ilha final;
- perfil `archipelago-21-30`;
- templates de mapas táticos insulares.

## Critérios de Aceite

- O usuário consegue selecionar a faixa "Andares de 21 a 30".
- O app apresenta mapa de arquipélago, não labirinto abstrato e não grafo em "taça".
- O mapa mostra 10 ilhas.
- O mapa mostra o barco como base da pirâmide.
- O barco funciona como acampamento.
- As ilhas aparecem em pirâmide: 4 ilhas iniciais, 3 intermediárias, 2 avançadas e 1 ilha de boss.
- Ilhas 21 a 24 ficam disponíveis desde o início;
- Ilhas 25 a 27 ficam disponíveis após as ilhas 21 a 24 estarem marcadas como objetivo concluído;
- Ilhas 28 e 29 ficam disponíveis após as ilhas 25 a 27 estarem marcadas como objetivo concluído;
- Ilha 30 começa bloqueada.
- Cada ilha possui nome, conceito, objetivo, estado e recompensa.
- O usuário pode escolher qualquer ilha acessível.
- Cada exploração de ilha consome 8 horas.
- O grupo só pode explorar 1 ilha antes de descansar.
- Depois de explorar uma ilha, as demais ficam bloqueadas para exploração até descanso.
- Ao descansar no barco, o esforço do dia é resetado e uma nova exploração fica disponível.
- Ao descansar no barco, o contador de tempo de exploração é resetado.
- Ao descansar no barco, progresso parcial de ilha não concluída é perdido.
- A modal da ilha mostra objetivos/encontros em quantidade definida pela ilha.
- Uma ilha só fica OK se todos os objetivos/encontros exigidos forem resolvidos no mesmo dia de exploração.
- O clima da ilha persiste pelo dia inteiro de exploração.
- Após descanso, novos climas diários são gerados para as ilhas.
- O grupo pode tentar avaliar o clima de uma ilha antes de se comprometer com a exploração.
- O app registra ilhas visitadas e concluídas.
- O app controla fragmentos do mapa de rotas.
- Cada ilha 21-29 concluída concede 1 fragmento de rota.
- O barco exibe um ícone para cada fragmento obtido.
- O app informa claramente a condição para desbloquear a ilha final.
- Ao obter os 9 fragmentos, a ilha 30 fica acessível.
- A ilha 30 possui boss e cena final própria.
- O app preserva estado da exploração no código de sessão.
- O código de sessão preserva identidade das ilhas, temas, objetivos/encontros, climas diários, clima ativo e progresso interno da exploração ativa.
- Cenas de combate, armadilha ou boss podem exibir mapa tático.
- Mapas táticos representam a cena da ilha, não o mapa estratégico.
- O mestre pode marcar objetivo como concluído sem depender de cálculo automático.

## Status da Implementação Atual

### Implementado

- Perfil `archipelago-21-30` criado e registrado na seleção de perfis.
- Modo de exploração `archipelago` criado com estado próprio.
- Mapa estratégico do arquipélago renderizado em pirâmide, com 4 ilhas iniciais, 3 intermediárias, 2 avançadas e ilha 30 no topo.
- Barco exibido na base da pirâmide com ícone próprio e ação de descanso ao clicar.
- Modal de ilha implementada para exibir estado, dificuldade, ND base, descrição narrativa, objetivos e ações.
- Títulos das ilhas ficam ocultos até a ilha ser visitada ou concluída.
- Ilha 30 fica bloqueada até a obtenção dos 9 fragmentos.
- Conclusão de ilhas 21 a 29 concede fragmentos e atualiza o progresso global.
- Exploração de ilha consome 8 horas e bloqueia nova exploração até o próximo descanso.
- Descanso no barco reseta esforço do dia, contador de tempo de exploração e progresso parcial de ilhas não concluídas.
- Estado do arquipélago preserva ilhas, temas, objetivos, visitas, conclusões, fragmentos, clima diário, exploração ativa e log.
- Temas das ilhas 21 a 29 são sorteados por seed a partir de pools separados por dificuldade.
- Ilha 30 usa tema fixo de ilha dos dinossauros.
- Ícones SVG de barco, ilha não explorada e temas de ilha foram integrados ao mapa.
- Ícones de ilhas visitadas/em andamento usam coloração branca; ilhas concluídas usam coloração esverdeada.
- Alguns SVGs de ilha tiveram fundos opacos e linhas removidos para evitar blocos coloridos no mapa.

### Pendências Conhecidas

- Ainda existem ícones de ilhas com arte incorreta ou com transparência imperfeita que devem ser revisados/substituídos.
- Alguns SVGs vieram com camadas de fundo embutidas; quando recoloridos pelo CSS, essas camadas podem aparecer como retângulos ou massas verdes/brancas. Esses arquivos devem ser corrigidos na origem ou substituídos por versões realmente transparentes.
- A validação visual dos ícones precisa ser repetida após qualquer troca de SVG, especialmente nos estados visitada, em andamento, concluída e bloqueada.
- Os fragmentos obtidos ainda são representados principalmente por contador/progresso; a exibição visual individual no barco pode evoluir.
- Mapas táticos específicos por tema de ilha ainda não foram implementados.
- Encontros, criaturas, armadilhas e recompensas definitivas por ilha ainda não foram fechados.

### A Definir

- Nome final da etapa.
- Fórmula ou tabela exata de ND por ilha, baseada no grupo nível 7 a 10.
- Ficha definitiva do boss da ilha 30: versão ND 11 do Rei Tirano.
- Lista final dos temas disponíveis em cada grau de dificuldade.
- Objetivo definitivo de cada ilha.
- Quantidade definitiva de objetivos/encontros de cada ilha.
- Regra numérica para determinar automaticamente a quantidade de objetivos/encontros por ilha.
- Se viagem entre ilhas terá risco mecânico ou será apenas seleção livre.
- Se as ilhas terão uma cena principal única ou múltiplas cenas internas.
- Como vantagens obtidas nas ilhas afetam a ilha do boss.
- Se a ilha 30 exige objetivos preliminares ou abre diretamente a luta contra o boss.

## Decisões e Pontos de Atenção

### Decisões Iniciais

- A faixa 21-30 será um arquipélago.
- Existem 10 ilhas.
- Cada ilha é distinta e possui um objetivo diferente.
- As ilhas devem ser acessíveis em ordem livre.
- A última ilha é a ilha do boss.
- A ilha do boss começa inacessível.
- A ilha do boss exige 9 fragmentos do mapa de rotas.
- Cada ilha 21-29 concluída concede 1 fragmento.
- Cada exploração de ilha consome 8 horas.
- O grupo pode explorar apenas 1 ilha por descanso.
- O barco é o acampamento e reseta o esforço do dia ao descansar.
- O descanso no barco reseta o contador de tempo de exploração.
- Ilha parcialmente resolvida reseta ao descansar; para ficar OK, a ilha deve ser concluída inteira no mesmo dia.
- O clima gerado para a ilha persiste pelo dia inteiro de exploração.
- O descanso gera novos climas diários por ilha.
- Antes de explorar, o grupo pode tentar identificar o clima de uma ilha com teste apropriado.
- Fragmentos são apenas contador/chave para desbloquear a ilha 30; não possuem mecânica própria além disso.
- O mapa visual deve ser uma pirâmide com barco na base, 4 ilhas iniciais, 3 intermediárias, 2 avançadas e 1 ilha de boss no topo.
- O mapa principal é estratégico, não tático.
- As ilhas 21 a 29 devem ter tema sorteado por seed a partir de pools separados por dificuldade.
- A ilha 30 tem tema fixo: ilha dos dinossauros.
- O boss planejado da ilha 30 é uma versão ND 11 do Rei Tirano, ainda pendente de criação.

### Pontos de Atenção

- A liberdade de escolha pode tornar o balanceamento mais sensível, porque o grupo pode visitar ilhas de dificuldades diferentes em qualquer ordem.
- O app deve evitar exigir microgerenciamento de viagem se isso atrapalhar o ritmo.
- A ilha final precisa estar presente visualmente desde o início, para criar objetivo claro.
- Os objetivos das ilhas devem ser diferentes de verdade, não apenas variações de "derrotar inimigo".
- Recompensas e vantagens opcionais devem ser úteis sem tornar a ilha final trivial.
- Se cada ilha tiver muitas cenas internas, o modo pode ficar pesado demais; começar com ficha de ilha compacta parece mais seguro.
- Se os temas ou encontros forem aleatórios, o save precisa guardar o resultado gerado por ilha para evitar que retorno à masmorra mude a campanha.
- Ataques ao barco durante descanso podem escalar conforme ilhas concluídas, mas precisam ser opcionais ou bem sinalizados para não transformar o acampamento em punição constante.

### Pontos de Revisão Futura

- Definir fórmula ou tabela exata de quantidade de objetivos/encontros por ilha.
- Definir tabela exata de ND por ilha, derivada do grupo nível 7 a 10.
- Fechar a lista final de temas e objetivos das 10 ilhas.
- Definir o boss da ilha 30.
- Decidir se a ilha 30 terá objetivos preliminares ou se abre diretamente a luta contra o boss.
- Definir ataques ao barco durante descanso: chance, ND, composição e quando usar.

## Decisão Arquitetural Recomendada

Implementar os andares 21 a 30 como um terceiro modo de exploração: `archipelago`.

Esse modo deve compartilhar sistemas comuns com os modos anteriores, mas precisa de estado e renderização próprios. A estrutura mais adequada é um mapa estratégico de ilhas, com fichas de objetivo por ilha e cenas táticas abertas sob demanda.

O fluxo deve priorizar escolha aberta e controle manual do mestre. A primeira versão já cobre seleção de ilha, barco como acampamento, uma exploração por descanso, reset de progresso parcial no descanso, registro de objetivo, progresso global, clima persistente do dia, novos climas após descanso, desbloqueio da ilha final e persistência explícita por ilha. Mapas táticos e cenas detalhadas ainda devem evoluir por ilha conforme os objetivos forem fechados.

## Passo a Passo Inicial

1. Criar o perfil `archipelago-21-30` e o modo `archipelago`, ainda com dados simples de ilha. Implementado.
2. Renderizar o mapa estratégico em pirâmide com barco na base, 4 ilhas acessíveis, 5 ilhas travadas e ilha 30 bloqueada. Implementado.
3. Implementar ficha/modal da ilha com estado, clima diário, objetivos/encontros placeholder e ações de exploração. Implementado.
4. Implementar barco como acampamento: descanso reseta esforço do dia, tempo de exploração e progresso parcial. Implementado.
5. Implementar regra de 1 exploração por descanso, consumo de 8 horas e bloqueio de novas explorações até descansar. Implementado.
6. Implementar conclusão de ilha: todos os objetivos/encontros do dia resolvidos geram check, fragmento e progresso global. Implementado.
7. Implementar desbloqueio da ilha 30 quando os 9 fragmentos forem obtidos. Implementado.
8. Implementar persistência explícita por ilha: tema, variação, objetivos/encontros, climas diários, progresso ativo e fragmentos. Implementado.
9. Integrar ícones de barco, ilha não explorada e temas de ilha, com estado visual por visita/conclusão. Parcialmente implementado; ainda há pendência de revisão/substituição de ícones incorretos.
10. Evoluir balanceamento de ND, quantidade final de objetivos, temas definitivos, ataques ao barco, mapas táticos insulares e boss.
