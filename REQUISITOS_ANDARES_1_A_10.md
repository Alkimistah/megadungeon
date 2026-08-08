# Requisitos — Andares 1 a 10

Documento de análise para adaptar os andares 1 a 10 da Masmorra de Práxis ao app Mega Dungeon.

## Contexto

Os andares 1 a 10 representam a primeira etapa da masmorra. A expectativa é que os personagens estejam aproximadamente entre os níveis 1 e 4, então CDs, NDs, armadilhas, encontros e recompensas devem permanecer dentro desse patamar.

A lógica desses andares é diferente da lógica atual dos andares 11 a 20. O app hoje usa um mapa em grafo com nodos e rotas ramificadas. Para os andares 1 a 10, a exploração funciona como um teste estendido por andar: o grupo acumula sucessos para encontrar a saída do andar, falhas geram eventos pela tabela d100, e falhas demais resetam o progresso daquele andar.

Portanto, a visualização ideal não é reaproveitar diretamente o mapa de nodos atual. A nova etapa deve ter um modo próprio de exploração em formato de labirinto abstrato.

## Objetivo

Criar um modo de exploração para os andares 1 a 10 que permita ao mestre conduzir a progressão do grupo por testes estendidos, registrar sucessos e falhas, resolver rolagens d100, gerar cenas de exploração e disparar um encontro obrigatório antes de avançar ao próximo andar.

## Perguntas Pendentes Para Próximos Patches

Esta seção concentra decisões que dependem de definição do mestre. Cada resposta pode virar um patch futuro no perfil dos andares 1 a 10, nas tabelas de encontro, nas tabelas d100 ou no gerador de mapa tático.

### Catálogo de Inimigos

- Quais inimigos, nomes específicos, tipos ou categorias podem aparecer nos andares 1 a 10?
- Quais inimigos do catálogo geral devem ser proibidos nesses andares, mesmo que o ND pareça compatível?
- A seleção deve ser definida por andar individual, por tier de andares ou por subtema, como labirinto comum, área abandonada, área ocupada e covil aracnídeo?
- Existem inimigos exclusivos desses andares que ainda precisam ser criados além da Aranha Matriarca e seus filhotes?
- Em quais andares começam a aparecer criaturas aracnídeas, teias, ovos ou sinais diretos da Matriarca?

### Encontros Finais

- Quais são os encontros concretos da lista de cada tier e qual é o gimmick específico de cada andar de 1 a 9? (A estrutura, os tipos de cena e a regra de tesouro já estão decididos; falta autorar o conteúdo.)

### Tabelas d100

- As faixas e resultados da tabela d100 atualizada estão finais ou ainda precisam de revisão?
- Quais resultados d100 devem virar estados mecânicos automáticos e quais devem virar apenas notas acionáveis para o mestre?
- Existem resultados que devem ser diferentes por andar, mesmo dentro do mesmo tier?
- A chance de combate, armadilha, tesouro e evento deve mudar conforme o andar aumenta?

### Armadilhas e Obstáculos

- Quais tipos de armadilha podem aparecer em cada tier: fosso, arame, lâmina, runa, gás, queda de pedras, teia, pressão, alarme ou outro?
- Quais armadilhas devem bloquear passagem e quais apenas pressionam deslocamento?
- Uma armadilha pode aparecer junto de inimigos como complicador secundário ou deve ser sempre a ameaça principal quando for resultado de armadilha?
- Qual deve ser o dano, CD, perícia de detecção/desarme e XP de cada tipo de armadilha?

### Mapa Tático

- O gerador deve continuar apenas com botão de gerar outro mapa ou precisa permitir edição leve, como mover inimigos, grupo, portas e armadilhas?
- Quais layouts devem ser mais comuns em cada andar: corredor, T, cruz, sala, corredor com sala, sala com corredor, gargalo, pilares ou sala irregular?
- Portas devem ser raras, comuns ou variar por andar?
- Posições de vantagem devem aparecer em todos os encontros, apenas em alguns ou somente quando o resultado indicar vantagem?

### Progressão, Tempo e Balanceamento

- Qual deve ser a CD base, quantidade de sucessos, limite de falhas e tempo base de teste para cada andar?
- Os multiplicadores de tempo por abordagem devem ser iguais em todos os andares ou variar por andar?
- O app deve alertar quando a sequência de eventos estiver ficando perigosa demais para personagens de nível 1 a 4?
- Como XP e loot devem ser distribuídos quando o grupo teve muitos encontros antes do encontro final obrigatório?

### Sessão e Histórico

- O código de sessão deve preservar apenas o estado mecânico atual ou também o log textual completo da exploração?
- O mapa tático atual deve ser preservado no código de sessão ou pode ser regenerado ao carregar?
- Estados pendentes de presságio/vantagem devem ser exportados sempre com a sessão?

## Princípios de Design

- A unidade principal da exploração é o andar atual, não um nodo de mapa.
- O labirinto deve comunicar progresso e tensão, sem tentar representar uma planta real.
- O mestre deve poder usar rolagens físicas ou deixar o app rolar dados.
- O app deve registrar o estado da exploração, mas não precisa substituir o julgamento do mestre.
- Encontros, armadilhas, tesouros, criaturas e ND devem reaproveitar os sistemas existentes quando possível.
- O modo dos andares 1 a 10 deve coexistir com o modo de mapa dos andares 11 a 20.

## Fluxo Geral

### 1. Início do Andar

Ao iniciar um andar entre 1 e 9, o app carrega:

- número do andar;
- tier correspondente;
- CD base;
- quantidade de sucessos necessários;
- limite de falhas antes de resetar;
- abordagens/perícias disponíveis;
- tabelas d100 do tier;
- tabelas de eventos, presságios, anomalias, obstáculos, encontros e tesouros.

O andar 10 não usa teste estendido; ele abre diretamente o fluxo de sala de chefe.

### 2. Escolha de Abordagem

O grupo escolhe uma abordagem narrativa, por exemplo:

- encontrar rota segura;
- procurar sinais no labirinto;
- entender alterações mágicas;
- mapear corredores;
- evitar inimigos;
- lidar com mecanismos perigosos;
- seguir pressentimentos;
- forçar passagem;
- outra abordagem criativa.

Cada abordagem sugere uma perícia e pode alterar a CD final. O app deve mostrar a CD final antes do teste.

Regra importante: uma mesma perícia só pode gerar 1 sucesso por andar. Após todas as perícias sugeridas terem gerado sucesso em um andar, elas podem ser usadas novamente.

### 3. Resolução do Teste

O app deve oferecer botões manuais para o mestre registrar o resultado do teste:

- Sucesso;
- Sucesso crítico ou margem 5+;
- Falha;
- Falha crítica ou margem 5+.

Comportamento:

- Sucesso: adiciona 1 sucesso.
- Sucesso crítico ou margem 5+: adiciona 1 sucesso e remove 1 falha, se houver.
- Falha: adiciona 1 falha e resolve 1 rolagem d100.
- Falha crítica ou margem 5+: adiciona 1 falha e resolve 2 rolagens d100.

Em uma fase posterior, o app pode aceitar valor rolado e bônus do jogador para calcular o resultado automaticamente, mas a primeira versão deve priorizar o controle manual.

### 4. Rolagem d100

Quando uma falha exige rolagem d100, o app deve permitir dois modos:

- rolar automaticamente;
- informar manualmente o valor rolado em dado físico.

O resultado do d100 determina uma categoria do tier, como:

- Evento de exploração;
- Presságio ou vantagem;
- Encontro fácil;
- Obstáculo ou armadilha;
- Encontro médio;
- Anomalia da dungeon;
- Encontro difícil;
- Tesouro ou achado útil.

Depois de determinar a categoria, o app deve gerar ou permitir escolher a cena concreta dentro da tabela apropriada.

Quando a categoria for encontro fácil, encontro médio, encontro difícil, obstáculo ou armadilha, o app deve gerar a cena de jogo imediatamente usando os sistemas existentes de criaturas, armadilhas e ND. O texto não deve ser apenas uma instrução genérica para o mestre consultar outra tabela.

O gerador manual de encontro continua existindo como alternativa, mas não deve ser o foco do fluxo dos andares 1 a 10. No fluxo principal, a falha na exploração deve produzir a cena já pronta: composição de inimigos, armadilha quando houver, ficha/estatísticas necessárias, estados mecânicos aplicados e mapa tático correspondente.

Como esses andares são em local fechado, resultados de encontro não devem aplicar clima, terreno externo ou variações ambientais abertas. A cena pode usar o tema "Labirinto" ou "Covil aracnídeo" apenas como contexto interno para seleção de criaturas e layout.

### 5. Progresso do Andar

Enquanto o grupo não atinge os sucessos necessários, o estado do andar permanece em exploração.

Se o grupo atinge o limite de falhas antes dos sucessos necessários:

- o progresso do andar é resetado;
- sucessos voltam para 0;
- falhas voltam para 0;
- perícias usadas com sucesso no andar são limpas;
- o log deve registrar que o grupo retornou ao início do andar.

Se o grupo atinge os sucessos necessários:

- o app não avança automaticamente para o próximo andar;
- o app muda para a fase de encontro final do andar.

### 6. Encontro Final do Andar

Após completar os sucessos necessários, existe um encontro obrigatório antes de avançar ao próximo andar.

Esse encontro representa a cena de fechamento do andar: a saída foi encontrada, mas ainda há um obstáculo, combate, guardião, anomalia ou risco final antes da descida.

O app deve:

- destacar visualmente a porta ou sala final do andar;
- gerar ou permitir escolher um encontro adequado ao tier;
- permitir marcar o encontro como resolvido;
- liberar o botão "Avançar para o próximo andar" apenas depois da resolução.

O encontro final deve respeitar o patamar dos personagens e as tabelas revisadas do tier. Ele não deve usar NDs dos andares 11 a 20.

### 7. Mapa Tático de Encontro

Quando uma falha, encontro final ou sala de chefe gerar uma cena de combate, armadilha ou obstáculo espacial, o app pode gerar um mapa tático simples para orientar a mesa física.

Esse mapa não substitui o labirinto abstrato. Ele representa apenas a sala, corredor ou câmara onde a cena atual acontece.

Formato base:

- matriz de 14 colunas por 10 linhas;
- exceção: a sala do chefe do andar 10 usa mapa maior, de ao menos 14x20;
- cada célula representa um quadrado do mapa físico do usuário;
- o tamanho real do quadrado não importa para o app;
- o mapa deve ser legível como grade e fácil de copiar para uma mesa física.

Elementos mínimos:

- parede;
- chão livre;
- posição inicial do grupo;
- inimigos;
- armadilhas ou perigos;
- portas ou saídas;
- posições de vantagem;
- obstáculos, se aplicável.

Convenção visual sugerida:

- preto: paredes;
- azul: início do grupo;
- vermelho: inimigos;
- verde: armadilha ou perigo;
- marrom: porta;
- branco ou marca clara: posição de vantagem;
- cinza: obstáculo, coluna, entulho ou cobertura.

Tipos de layout desejados:

- sala retangular simples;
- sala irregular;
- corredor com alcovas;
- câmara com pilares;
- sala dividida por parede parcial;
- ponte, fosso ou gargalo;
- sala com área elevada;
- sala com teias ou terreno difícil nos andares 7 a 10;
- sala de chefe maior e mais controlada no andar 10.

O gerador deve receber o contexto do encontro, como tier, categoria, presença de armadilha, quantidade de inimigos e tema do andar. A partir disso, posiciona elementos sem bloquear completamente o movimento do grupo.

O mapa tático deve ser derivado do encontro gerado. Se o resolvedor gerar 1 inimigo, o mapa deve mostrar 1 marcador vermelho; se gerar 4 inimigos, deve mostrar 4. O mesmo vale para armadilhas e posições de vantagem. O mapa não pode inventar uma quantidade de inimigos diferente da composição mecânica.

Regras mínimas de validade:

- deve existir área navegável suficiente para combate;
- grupo e inimigos não devem iniciar em células adjacentes, exceto se a cena pedir emboscada;
- portas devem conectar com áreas de chão;
- armadilhas não devem cobrir todas as rotas;
- pelo menos uma rota deve permitir contato entre grupo e inimigos;
- posições de vantagem devem ser opcionais, não obrigatórias.

O mestre deve poder usar o mapa como sugestão. Na primeira versão, não é necessário editar célula por célula; basta permitir gerar novamente o layout da cena caso o primeiro resultado não sirva bem para a mesa.

### 8. Avanço de Andar

Ao avançar:

- incrementa o andar atual;
- reseta sucessos, falhas e perícias usadas;
- carrega a nova CD base e o novo limite de progresso;
- preserva o log geral da sessão;
- atualiza o tema visual conforme o tier, se houver variações.

### 9. Andar 10

O andar 10 é a sala do chefe e não usa exploração por testes estendidos.

O app deve apresentar:

- sala da Matriarca Aracnídea;
- crias presentes desde o início do combate;
- ovos que eclodem como reforços durante a luta;
- ND 4 fixo;
- teias como perigo ativo e terreno difícil, com pilares/cobertura na sala;
- mapa tático maior que o padrão: ao menos 14x20;
- recompensa principal: cristal verde (tesouro multiplicador, sem efeito mecânico).

O andar 10 deve ter uma tela de chefe ou estado especial, sem exigir sucessos/falhas para avanço. Após o chefe ser resolvido, o app apresenta a tela de conclusão da etapa 1-10 com resumo de XP, tesouros e log.

## Layout Ideal

### Estrutura da Tela

A tela do modo labirinto deve ter três áreas principais.

#### 1. Cabeçalho do Andar

Exibe:

- "Andar X";
- tier atual, por exemplo "Andares 5-6";
- CD base;
- sucessos necessários;
- falhas antes de resetar;
- estado atual: explorando, encontro final, pronto para avançar ou chefe.

#### 2. Labirinto Abstrato

O labirinto abstrato não é um mapa real e não deve funcionar como o grafo de nodos atual.

Ele é um medidor visual de progresso. Cada segmento representa um sucesso necessário para encontrar a saída do andar.

Exemplo conceitual:

```text
Entrada -- [1] -- [2] -- [3] -- [Porta]
```

Com dois sucessos acumulados:

```text
Entrada -- [x] -- [x] -- [ ] -- [Porta]
```

Falhas aparecem como marcas de instabilidade ao redor do labirinto:

```text
Entrada -- [x] -- [x] -- [ ] -- [Porta]
             Falhas: 2/4
```

Visualmente, pode parecer uma planta estilizada de corredores, portas, bifurcações falsas, salas bloqueadas e runas. O usuário não escolhe rotas clicando nesses segmentos. O objetivo é comunicar avanço, tensão e proximidade da saída.

Quando os sucessos são completados, a porta final deve ganhar destaque e a tela deve entrar na fase de encontro final.

#### 3. Painel de Resolução

Exibe:

- abordagem selecionada;
- ação de exploração selecionada, no formato `Perícia: Ação`;
- modificador da abordagem;
- CD final;
- ações que já foram usadas neste andar;
- botões de resultado do teste;
- campo para valor manual de d100;
- botão para rolar d100 automaticamente;
- resultado ou resultados d100 gerados pela última falha;
- log curto da exploração.

## Tema Visual

O tema dos andares 1 a 10 é labirinto/masmorra.

Direção visual:

- fundo de pedra escura;
- corredores em cinza frio;
- acentos azulados para cristais e magia da dungeon;
- verde apenas para elementos raros ou recompensa de chefe;
- falhas marcadas com rachaduras, runas vermelhas ou instabilidade;
- anomalias com aparência arcana ou geométrica;
- andares 7 a 9 podem introduzir mais teias;
- andar 10 deve ter presença visual de sala aracnídea.

O visual deve ser funcional e de mesa: rápido de ler, com poucos elementos decorativos competindo com o estado da exploração.

## Modelo de Estado Sugerido

```js
{
  mode: "extended-exploration",
  floor: 5,
  phase: "exploring",
  successes: 2,
  failures: 1,
  usedApproachIds: ["survival-orient", "perception-observe"],
  pendingRolls: [],
  currentResult: null,
  currentResults: [],
  finalEncounter: null,
  pendingSceneEffects: [],
  log: [],
  elapsedMinutes: 0
}
```

Fases possíveis:

- `exploring`: testes estendidos em andamento;
- `floorEncounter`: sucessos completos, encontro final pendente;
- `readyToAdvance`: encontro final resolvido;
- `boss`: andar 10;
- `completed`: chefe resolvido ou etapa encerrada.

Quando houver uma cena tática ativa, o estado pode incluir:

```js
{
  tacticalMap: {
    width: 14,
    height: 10,
    cells: [...],
    legend: {...},
    encounterId: "..."
  }
}
```

## Dados Estruturados Necessários

O perfil dos andares 1 a 10 deve conter:

- regras de progresso por andar;
- abordagens e modificadores de CD;
- tabelas d100 por tier;
- tabelas comuns de eventos de exploração;
- tabelas comuns de presságios ou vantagens;
- tabelas comuns de anomalias;
- obstáculos e armadilhas por tier;
- encontros fáceis, médios e difíceis por tier;
- tesouros e achados úteis;
- regras do encontro final por andar ou tier;
- regra especial do andar 10;
- templates e pesos para mapas táticos 14x10;
- catálogo permitido de criaturas por andar, tier ou subtema;
- pesos de seleção de criaturas por tema, como labirinto, masmorra e covil aracnídeo;
- listas de bloqueio para criaturas inadequadas aos andares 1 a 10;
- tags de armadilha que influenciem o mapa tático, como fosso, arame, runa, gás, queda de pedras, bloqueio de passagem ou terreno difícil.

Regra importante: os andares 1 a 10 não devem usar todo o catálogo global de inimigos. A seleção precisa ser limitada ao patamar esperado de personagens nível 1 a 4 e ao tema desses andares. Criaturas de tiers posteriores, encontros externos ou ameaças incompatíveis com a fase inicial da masmorra devem ficar indisponíveis nesse perfil, mesmo que existam no catálogo geral do app.

## Integração com Sistemas Existentes

Reaproveitar:

- catálogo de criaturas;
- catálogo de armadilhas;
- cálculo e formatação de ND;
- resolver encontros;
- código de sessão;
- tema por perfil;
- tempo decorrido, se aplicável.

Criar ou separar:

- estado de exploração estendida;
- renderização do labirinto abstrato;
- painel de abordagem/teste;
- resolvedor de d100;
- resolvedor de encontro final do andar;
- gerador de mapa tático 14x10;
- perfil `dungeon-1-10`.

## Critérios de Aceite

- O usuário consegue selecionar a faixa "Andares de 1 a 10".
- O app apresenta o modo labirinto em vez do mapa de nodos.
- O app mostra CD, sucessos necessários e limite de falhas do andar atual.
- O mestre consegue selecionar abordagem e registrar sucesso/falha manualmente.
- Sucessos e falhas alteram corretamente o progresso do andar.
- Falhas geram uma ou duas rolagens d100, conforme a regra.
- O app aceita d100 manual e também pode rolar automaticamente.
- Encontros e armadilhas gerados pelo d100 mostram a composição mecânica real, não apenas uma nota para consultar tabela.
- O mapa tático reflete a composição gerada, especialmente quantidade de inimigos e presença de armadilhas.
- Estados de presságio/vantagem aplicados automaticamente aparecem de forma clara na cena em que forem consumidos.
- Ao atingir o limite de falhas, o progresso do andar reseta.
- Ao atingir os sucessos necessários, o app inicia o encontro final do andar.
- O próximo andar só é liberado após o encontro final ser marcado como resolvido.
- O andar 10 abre como sala de chefe, sem testes estendidos.
- Encontros, armadilhas e chefe podem gerar um mapa tático 14x10.
- O mapa tático indica paredes, grupo, inimigos, armadilhas, portas e posições de vantagem.
- A sessão preserva estado, progresso, log e resultados gerados.
- Os encontros e armadilhas respeitam o patamar de personagens nível 1 a 4.
- Os inimigos usados nos andares 1 a 10 vêm apenas do subconjunto permitido para esse perfil, tier ou andar.
- Armadilhas no mapa tático criam empecilho real: bloqueiam ou pressionam rotas, protegem inimigos, ocupam mais de uma célula quando necessário e não aparecem como marcador irrelevante isolado.

## Status da Implementação Atual

### Implementado

- Seleção da faixa "Andares de 1 a 10" com modo próprio de exploração estendida.
- Labirinto abstrato separado do mapa de nodos dos andares 11 a 20.
- Controle de sucessos, falhas, reset de andar e avanço apenas para frente.
- Consumo de tempo por teste com base no andar e multiplicador da abordagem.
- Rolagem d100 automática e manual, com indicação da origem da rolagem.
- Falha crítica ou margem 5+ gera duas rolagens d100 e exibe ambas na cena atual.
- Ações de exploração específicas no formato `Perícia: Ação`, com 10 opções por andar.
- Repetição de perícia permitida quando a ação é diferente; uma mesma ação não se repete no andar.
- Qualquer resultado de teste bloqueia a ação usada no andar, seja sucesso ou falha.
- Ao atingir o limite de falhas, a cena da última falha permanece ativa; o reset do andar só acontece quando o mestre confirma o retorno ao início.
- Armadilhas com tag `fosso` nos andares 1 a 9 oferecem uma descida opcional: após resolver a cena, o mestre pode avançar para o próximo andar ou continuar explorando o andar atual.
- Textos temáticos por ação aparecem abaixo da CD e no log de resolução.
- Tempo base ajustado para 1 a 9 minutos nos andares 1 a 9, mantendo multiplicadores por ação.
- Mapa tático com visualização expandida em tela cheia.
- Legenda global dos nodos escondida no modo labirinto dos andares 1 a 10.
- Falhas que geram encontro, obstáculo ou armadilha já produzem cena concreta, em vez de apenas orientar consulta manual.
- Encontro final obrigatório antes de liberar o próximo andar.
- Mapa tático 14x10 gerado para cenas relevantes.
- Layouts táticos com corredor de largura 2, T, cruz, corredor com sala, sala com corredor e variações internas.
- Portas opcionais com exatamente 2 quadrados e saídas abertas representadas como chão quando não houver porta.
- Grupo iniciado junto em 4 quadrados adjacentes.
- Armadilhas representadas como zonas de múltiplas células que podem bloquear ou pressionar o caminho.
- Aranha Matriarca e filhotes adicionados ao catálogo de criaturas.
- Encontros podem sortear armas compatíveis para criaturas armadas Pequenas ou Médias, preservando bônus de ataque e modificadores de dano da ficha base.
- Mímico Menor ND 2 adicionado como adaptação do Mímico para aparecer nos andares avançados de 1 a 10.
- Subconjunto de inimigos permitido por andar implementado nos andares 1 a 9 via lista de permissão no perfil; a seleção de criaturas usa apenas essas listas, impedindo criaturas de tiers posteriores ou tematicamente inadequadas.
- Encontros finais curados implementados: 25 cenas por tier com gimmick por andar (dungeon1to10FinalEncounters.js), composição fixa de criaturas/armadilhas do catálogo, ND por variante de andar, mapa preset 14x10 fixo por cena, gimmick e recompensa exibidos no painel, e botão de sortear outra cena do tier.
- Mapa tático com legenda expandida: inimigo oculto/em potencial, fosso/vão, teia/casulo, terreno difícil, mecanismo, objetivo/achado, entrada de reforço e porta como entrada/saída; legenda exibe apenas os tipos presentes no mapa e as cores são configuráveis por perfil via tema (tacticalColors).

### Parcialmente Implementado

- Presságios e vantagens já podem ser tratados como estados, mas ainda precisam de cobertura completa por tabela e comunicação visual refinada de criação, aplicação e consumo.
- O mapa tático já tem validações importantes, mas ainda precisa de ajuste fino por tipo de encontro, tipo de armadilha e gimmick de andar.
- Encontros finais existem como etapa obrigatória, mas ainda precisam de tabelas próprias por andar ou variações mais marcantes.
- As tabelas d100 estão estruturadas, mas precisam ser conferidas contra a versão definitiva do material.
- A seleção de ações por andar existe, mas ainda deve ser revisada contra a versão definitiva do documento de perícias e ações.
- As listas de criaturas permitidas por andar existem e são aplicadas, mas ainda precisam ser validadas contra a definição final do mestre por andar, tier ou subtema.

### Pendente

- Validar em mesa as listas de encontro final implementadas (NDs, CDs de negociação e valores custom dos obstáculos).
- Completar a sala do chefe do andar 10: Matriarca com crias desde o início, ovos que eclodem como reforços, teias ativas, pilares/cobertura, mapa de ao menos 14x20, tesouro do cristal verde e tela de conclusão da etapa.
- Implementar a regra de tesouro padrão por ND nos encontros finais: tesouro adicional em cenas de combate/armadilha e condicionado ao sucesso em cenas específicas.
- Associar cada tipo de armadilha a padrões táticos diferentes no mapa, em vez de usar apenas uma zona genérica.
- Ajustar balanceamento para personagens de nível 1 a 4, especialmente quantidade de inimigos, ND agregado, dano de armadilhas e frequência de falhas.
- Revisar persistência de sessão para garantir que estado mecânico, encontro atual, mapas atuais e efeitos pendentes carreguem sem fragilidade.

### Melhorias Futuras

- Criar pesos de criaturas por tema: labirinto comum, área abandonada, área ocupada, covil aracnídeo e sala de chefe.
- Permitir edição leve do mapa tático, como mover grupo, inimigos, armadilhas e portas, antes de considerar edição célula por célula.
- Exibir objetivo tático da cena, por exemplo "atravessar a armadilha", "segurar gargalo", "alcançar a porta", "interromper ritual" ou "sobreviver à emboscada".
- Fazer o gerador de mapa considerar papéis de inimigo, como solo, grupo, enxame, atirador, defensor ou criatura que usa teias.
- Fazer o mapa tático respeitar tamanho de criatura: Pequenas e Médias ocupam 1 quadrado; Grandes ocupam 2x2 quadrados adjacentes.
- Adicionar validações automáticas de mapa por tipo de layout: número esperado de saídas, conectividade, distância inicial, cobertura e relevância da armadilha.
- Criar prévias ou presets de mapas especiais para encontros finais e chefe.

## Decisões e Pontos de Atenção

### Decisões Fechadas

- O encontro final de cada andar deve ser diferente dos encontros genéricos do tier. Estrutura definida: lista comum de encontros finais por tier, com gimmick/modificador próprio por andar aplicado por cima.
- O encontro final pode ser de qualquer tipo de cena: combate com gimmick, combate com armadilha, obstáculo/armadilha como ameaça principal ou negociação/anomalia.
- Todo encontro final tem ND definido, respeitando o ND máximo do andar, e concede tesouro padrão: rolagem na tabela de tesouros do livro para esse ND. Em cenas de combate ou armadilha, esse tesouro é adicional ao que as criaturas já soltam; em cenas específicas (eventos, negociação, anomalia), o grupo só ganha o tesouro se for bem-sucedido.
- Sinais diretos da Matriarca (teias, ovos, crias) entram nos encontros finais a partir do andar 7, escalando até o covil no andar 10.
- Reforços em combate são proibidos nos andares 1 a 4 (toda a composição começa em cena). Nos andares 5 a 9, reforços são limitados a 1 criatura ou enxame a cada 2 rodadas, com máximo total por cena, e o ND somado incluindo reforços respeita o teto do andar. Habilidades de ficha que geram crias (ex.: Mamãe Glop) não contam como reforço externo.
- Toda cena de encontro final deve ser mecanicamente explícita: criatura com ficha do catálogo (nunca "um vigia" abstrato), armadilha exata do catálogo com CD/dano/detecção/desarme, posicionamento no mapa e regras de rodada quando houver. A especificação proposta está em ENCONTROS_FINAIS_ANDARES_1_A_9.md.
- A luta da Matriarca inclui crias presentes desde o início, ovos que eclodem como reforços durante o combate e teias como perigo ativo que restringe movimento.
- O ND da luta contra a Matriarca no andar 10 é fixo em 4, sem variação para 3.
- A sala do chefe usa mapa tático maior que o padrão: ao menos 14x20, com teias (terreno difícil), ovos como objetos no mapa e pilares/cobertura como elementos obrigatórios. Poços rasos são opcionais.
- O cristal verde não tem efeito mecânico: é tesouro. Todos os inimigos soltam cristais (normalmente azuis) conforme o ND, convertidos em dinheiro no comércio da cidade; o cristal verde é um cristal multiplicador, valendo o dobro ou o quádruplo do cristal azul de mesmo ND.
- Depois da vitória contra a Matriarca, o app mostra uma tela de conclusão da etapa 1-10 (estado `completed`) com resumo de XP, tesouros e log; a etapa 11-20 é um perfil separado iniciado manualmente.
- O encontro final concede XP integral sempre. Ele é obrigatório e garante algum ganho de XP e loot por andar, mesmo quando os personagens tiveram poucas ou muitas falhas durante a exploração.
- Os andares 1 a 10 não permitem retorno manual a andares anteriores. O fluxo é sempre avançar.
- As cores do mapa tático devem ser configuráveis por perfil/tema de andares, não fixas globalmente.
- Presságios e vantagens podem virar estados mecânicos automáticos, desde que o app deixe claro quando o estado foi criado e quando foi aplicado.
- O histórico de exploração pode ser preservado no código de sessão se isso não complicar o carregamento. Se gerar complexidade excessiva, basta preservar o estado mecânico atual.
- O mapa tático não precisa ser editável célula por célula na primeira versão. Um botão para gerar outro layout é suficiente.

### Tempo de Exploração

Cada teste de exploração deve consumir tempo calculado por andar e abordagem.

Modelo sugerido:

```text
tempo do teste = tempo base do andar x multiplicador da abordagem
```

Exemplo:

- andar 1 tem tempo base de 1 minuto;
- Sobrevivência tem multiplicador 1;
- investigar/mapear pode ter multiplicador 1.5;
- uma abordagem mais lenta pode chegar a multiplicador 2.

Decisão atual: os andares 1 a 9 usam tempo base de 1 a 9 minutos, respectivamente. O multiplicador normalmente deve ficar entre 1 e 2. Cada ação pode ajustar esse multiplicador conforme risco, cuidado ou complexidade.

### Presságios e Vantagens

A dúvida original era se efeitos como "+2 no próximo teste", "remove 1 falha", "próxima criatura começa ferida" ou "próxima falha rola duas vezes" deveriam ser aplicados automaticamente pelo app ou apenas registrados para o mestre decidir.

Exemplos:

- Se cair "Cheiro de ácido, sangue ou ferrugem: +2 no próximo teste apropriado", o app poderia criar um bônus pendente e aplicar automaticamente quando a perícia combinar.
- Se cair "Rota circular evidente: remove 1 falha se o grupo mudar a abordagem", o app poderia esperar uma condição e remover a falha automaticamente.
- Se cair "Sangue ainda fresco: próxima criatura pode estar ferida", o app poderia marcar o próximo encontro com uma sugestão de PV reduzido.

Decisão: esses efeitos podem virar estados mecânicos automáticos, mas a interface deve comunicar explicitamente que o estado foi aplicado. Exemplo: "Estado aplicado: próxima criatura começa ferida" ao cair o presságio, e "Estado consumido: inimigos entram com 75% dos PV" quando o próximo encontro é gerado.

### Log de Exploração

O log é o histórico que aparece no painel do labirinto, registrando sucessos, falhas, d100, resets, encontros finais e avanço de andar.

Exemplo:

```text
Exploração iniciada no andar 1.
Sobrevivência: Orientar-se: sucesso (1/3).
Percepção: Observar: falha (1/5).
d100 74: Encontro médio, ND 1/2.
```

Decisão: preservar o log no código de sessão é desejável enquanto isso não tornar o carregamento frágil ou excessivamente complexo. Caso vire problema técnico, o requisito mínimo é preservar o estado mecânico atual.

### Edição do Mapa Tático

A dúvida original era se "editável célula por célula" significa permitir que o mestre altere o mapa durante a aventura, clicando em cada quadrado para trocar parede, chão, inimigo, armadilha, porta etc.

Opções:

- Apenas gerar novamente: o app cria outro layout 14x10 se o mestre não gostar.
- Edição leve: mover/remover marcadores como inimigos, grupo, armadilhas e portas.
- Edição completa: clicar célula por célula para trocar qualquer tile.

Decisão: na primeira versão, basta gerar novamente o mapa tático. Edição célula por célula pode ficar para uma etapa posterior se o uso real mostrar necessidade.

## Decisão Arquitetural Recomendada

Implementar os andares 1 a 10 como um segundo modo de exploração, não como uma variação do gerador de nodos atual.

O mapa de nodos continua sendo a melhor representação para andares 11 a 20, onde existem rotas e escolhas pré-geradas. Para os andares 1 a 10, o labirinto abstrato representa progresso acumulado num andar, enquanto as cenas surgem dinamicamente por falhas, anomalias, encontros e achados.

Essa separação preserva a clareza da experiência e reduz acoplamento técnico: o app passa a ter dois modos de geração/apresentação que compartilham sistemas comuns de regras, mas respeitam estruturas de jogo diferentes.
