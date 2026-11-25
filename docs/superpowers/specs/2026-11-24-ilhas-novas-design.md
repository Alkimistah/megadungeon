# Ilhas novas do arquipélago (os 13 temas fora do sorteio)

## Intenção

Hoje o arquipélago sorteia apenas 10 dos 23 temas cadastrados. Os outros 13 já têm nome, ícone, narrativa e objetivo em `src/floorProfiles/archipelago21to30.js`, mas nada do que faz a ilha funcionar na mesa. O PO quer devolver esses 13 temas ao sorteio, **cada um como ilha completa**, no mesmo nível de detalhe das 10 atuais. A ideia é que o mestre nunca perceba diferença de acabamento entre uma ilha antiga e uma nova. O objetivo é variedade de campanha sem queda de qualidade.

O PO pediu que o trabalho ande **de pouco em pouco**, com qualidade máxima em cada ilha: primeiro as iniciais, depois as intermediárias e por fim as avançadas.

## Objetivos

- Os 13 temas entram no sorteio da fileira deles, cada um com:
  1. **Setores e variantes** no formato da fileira (veja "Formato por fileira").
  2. **Guardião** com três composições curadas no ND do Centro, cada uma com texto de abertura (`briefing`). A primeira criatura de cada composição é a principal, que recebe penalidades e bônus.
  3. **Lista de criaturas da ilha** em `archipelagoCreatureRules.js`, capaz de gerar os combates de setor no ND exato.
  4. **Terreno** da ilha (`terrain`: nome, efeito e elementos) e **mapa tático** para cada setor e para o Centro em `archipelagoTacticalMap.js`, com ponto de referência e, quando a tarefa pedir, marco próprio em `landmarksByTask`.
  5. **Pacote de missões** em `src/missions/archipelagoMissionThemes.js`: listas temáticas, missão em destaque escrita à mão e marcadores e ponto de referência do mapa.
  6. **Etiquetas de ecologia** em `archipelagoEcologyContexts.byTheme`. Hoje falta só na Ilha Viva (`living`). Os Náufragos e a Ilha Sagrada já têm.
  7. **Testes** que cubram o novo tema e **documentação** atualizada (REQUISITOS_ANDARES_21_A_30.md, seção Retomada, e README).
- Cada ilha nova é ativada em `enabledThemeIds` na própria etapa, depois de passar nos testes.

## Fora do escopo

- Mudanças no motor das ilhas, nas penalidades e bônus compartilhados, nas emboscadas do barco e na Ilha dos Dinossauros.
- Arte nova: os ícones WebP das 13 ilhas já existem e a pirâmide já os trata.
- Cadastro de criaturas novas no catálogo. Se faltar uma criatura desejada, ela vai para uma lista de pendências e a ilha usa outra que já existe (veja a memória "revisar antes de cadastrar").
- Os quatro ajustes pequenos de código anotados na revisão das missões.
- A validação da campanha em mesa, que continua por último.

## O que seria um fracasso, mesmo funcionando

- Uma ilha nova visivelmente mais rasa que as antigas: menos variantes, textos genéricos, guardião sem identidade, mapa sem elementos do tema.
- Conteúdo que contradiz o tema, como corais na Névoa ou criaturas de deserto no Iceberg.
- Uma ilha nova que quebra códigos de sessão existentes ou muda o sorteio de expedições já salvas.
- Combates de setor que não fecham o ND pedido e caem no aviso de encontro vazio.

## Abordagens consideradas

- **A. Uma ilha por etapa (escolhida pelo PO).** São 13 etapas. Cada uma tem duas aprovações do PO: a prévia de conteúdo, antes do código, e a validação no app, depois. Ao fechar cada fileira há um ponto de controle. É mais lento, mas cada ilha recebe atenção total, e um erro de rumo aparece na primeira ilha, não na quarta.
- **B. Uma fileira por etapa.** Menos pausas, mas revisões grandes. O PO já disse que revisões longas cansam.
- **C. Duas ilhas por etapa.** É um meio-termo sem ganho real sobre a A.

## Ordem das etapas

| Etapa | Fileira | Tema (`id`) | Situação |
|---|---|---|---|
| 1 | Inicial | Ilha dos Náufragos (`shipwrecked`) | Concluída e publicada (24/11/2026) |
| 2 | Inicial | Ilha de Algas Gigantes (`giant-kelp`) | Concluída e publicada (24/11/2026) |
| 3 | Inicial | Ilha de Névoa (`mist`) | Concluída e publicada (25/11/2026) |
| 4 | Inicial | Ilha-Cemitério de Navios (`ship-graveyard`) | Concluída e publicada (25/11/2026) |
| — | Ponto de controle das iniciais | | Concluído (25/11/2026) |
| 5 | Intermediária | Ilha das Ruínas Ciclópicas (`cyclopean-ruins`) | Concluída e publicada (25/11/2026) |
| 6 | Intermediária | Ilha Sagrada (`sacred`) | Concluída e publicada (25/11/2026) |
| 7 | Intermediária | Ilha de Cristal (`crystal`) | **Próxima.** Começa pela prévia de conteúdo |
| 8 | Intermediária | Navio Abandonado (`abandoned-ship`) | Pendente |
| 9 | Intermediária | Ilha de Maré Impossível (`impossible-tide`) | Pendente |
| — | Ponto de controle das intermediárias | | Pendente |
| 10–13 | Avançada | Iceberg, Ilha Viva, Sal e Ossos, Ilha Elemental (ordem definida no ponto de controle) | Pendente |
| — | Ponto de controle final | | Pendente |

O PO definiu a ordem das iniciais. A ordem das demais fileiras fica para o ponto de controle anterior a cada uma.

### Onde paramos

As etapas 1 e 2 foram concluídas e publicadas em 24/11/2026. As etapas 3 (Névoa) e 4 (Cemitério de Navios) foram concluídas e publicadas em 25/11/2026. Com elas, a fileira inicial está completa: oito temas para quatro vagas. Junto com as etapas 1 e 2, entraram melhorias que passam a valer para as próximas ilhas:

- **Uma planta por combate.** A planta é escolhida pela tarefa, em `byTask`, e cada setor tem pelo menos dois combates sorteáveis.
- **Mecânica própria de guardião (`rule`).** Por exemplo, a lente do farol contra a Aparição.
- **Área inicial dos inimigos (`enemyArea`).** Ela impede que a tarefa comece perdida.
- **Visual dos terrenos agrupados.** Elevação, inclinação, buraco, abismo, fosso, penhasco e toldo aparecem com contorno único. A porta é desenhada sobre o chão, o toldo fica por cima das peças, e os elementos sobre o platô ficam no mesmo nível dele.

O modelo de dados de uma ilha nova está em `src/archipelagoMist.js` e `src/archipelagoShipGraveyard.js`. Os testes de modelo estão em `scripts/archipelagoMist.test.mjs` e `scripts/archipelagoShipGraveyard.test.mjs`, que também conferem `calculateCombatND` dos guardiões e a distância dos inimigos ao marco.

**Ponto de controle das iniciais (25/11/2026).** As quatro ilhas novas estão no padrão. O PO decidiu a ordem das intermediárias (Ruínas Ciclópicas, Sagrada, Cristal, Navio Abandonado e Maré Impossível) e o formato delas, descrito em "Formato por fileira". O Navio Abandonado fica longe do Cemitério de Navios para não repetir. A Maré Impossível fica por último, porque é a mais difícil de expressar sem mexer no motor.

A etapa 5 (Ruínas Ciclópicas) foi concluída e publicada em 25/11/2026. Foi a primeira intermediária no formato novo. O modelo de ilha intermediária está em `src/archipelagoCyclopeanRuins.js` e `scripts/archipelagoCyclopeanRuins.test.mjs`. Para manter as rolagens fixas, os testes antigos da fileira intermediária usam `archipelagoBaseIntermediateRow`.

A etapa 6 (Ilha Sagrada) foi concluída e publicada em 25/11/2026. É uma ilha dividida: os espíritos antigos a oeste e uma cruzada da Supremacia Purista a leste, como releitura do Atlas de Arton. O Centro é o "Altar da Trilha Branca", e dois dos três guardiões são solo (Companhia Blindada e Forjador Litúrgico). Na mesma etapa, o motor passou a tentar toda a `enemyArea` antes de colocar uma peça grande fora dela (`src/nodeTacticalMap.js`, teste `scripts/tacticalEnemyArea.test.mjs`).

**Próximo passo:** etapa 7, Ilha de Cristal (`crystal`), pelo mesmo ciclo, com a prévia em `tmp/previas/ilha-cristal/`. Vale buscar no Atlas de Arton um lugar ou cultura para servir de releitura.

**Lições das etapas 3 e 4.**

- **0 PV (decisão do PO):** na megadungeon, quem cai a 0 PV sai da masmorra. Nenhum guardião ou regra de cena pode ter como saída natural derrubar uma personagem. Por isso o Rival Espelho foi vetado.
- **Peças grandes e `enemyArea`:** quando as peças 2x2 não cabem na área inicial, o motor as coloca no primeiro espaço livre, ignorando a área. A planta precisa de espaço de sobra na área inicial, e o teste de distância ao marco deve cobrir todo combate em que um inimigo colado ao marco atrapalhe a tarefa.
- **Missão em destaque:** o texto não pode citar o nome da arena do guardião, e a frase de abertura recebe o nome da ilha no fim.
- **Releitura de Arton (decisão do PO, etapa 5):** as ilhas podem representar locais e culturas do Atlas de Arton (`recursos/livros/`), mas sempre como cenário ou releitura dentro da megadungeon, nunca como o lugar verdadeiro.
- **Peças grandes:** desde a etapa 6, o motor tenta toda a área inicial antes de colocar a peça fora. Mesmo assim, a área precisa ter espaço para o elenco inteiro, como os gigantes 3x3, ou o excedente vai para o primeiro espaço livre.

## Fluxo de cada etapa

1. **Rascunho de conteúdo.** O gerente escreve o conteúdo completo da ilha: setores, variantes, guardiões, lista de criaturas, terreno, esboço dos mapas e pacote de missões. Antes disso, confere no catálogo que cada criatura existe e que as composições do guardião fecham o ND.
2. **Prévia visual.** Uma página em cartões em `tmp/previas/ilha-<id>/`, leve para o dispositivo do PO. Ela mostra um cartão por setor com as variantes, um cartão por guardião com as criaturas e o ND, a lista de criaturas e um esboço simples de cada mapa. Nada de planilha. As decisões são por regra, não por linha.
3. **Aprovação do PO.** Ajustes voltam ao passo 2.
4. **Plano curto** em `docs/superpowers/plans/`, com o conteúdo aprovado já transcrito, executado conforme `docs/superpowers/processo-de-trabalho.md` (subagentes, revisão por tarefa, ledger).
5. **Validação no app pelo PO.** O gerente indica como chegar à ilha (por exemplo, um código de sessão com o tema sorteado) e o que conferir.
6. **Fechamento.** Docs atualizados, prévia apagada após validação e commit. O push fica para quando o PO pedir.

Os pontos de controle de fileira revisam o conjunto, decidem a ordem da próxima fileira e incorporam lições ao formato da fileira seguinte.

## Formato por fileira

Os números abaixo seguem as ilhas atuais da mesma fileira. São a referência de qualidade e quantidade.

**Iniciais (andares 21–24; Centro ND 8), com base em Atol e Costa do Coral:**
- 4 setores (N, S, L, O), cada um com **3 variantes próprias**, mais a variante compartilhada do setor (`sharedTasks: true`). São 4 variantes sorteáveis por setor.
- Tipos de variante: combates (ND 6, padrão do motor) e testes estendidos ("Obtenha N sucessos antes de 2 falhas…") nos tipos exploração, travessia, recuperação, engenho, ritual e infiltração. O motor atribui ND e CD aos testes. Cada setor tem pelo menos um combate e um teste, porque o sorteio usa 70% para combate.
- Combates com uma condição de sucesso própria (ação padrão em rodadas, impedir fuga, proteger alguém) e, quando fizer sentido, um tipo preferido de criatura (`animal`, `humanoid`, `construct`, `monster`, `spirit`, `undead`).
- Penalidades do guardião: as 4 sorteadas do conjunto compartilhado de 16, automáticas pelo motor. Sem bônus de guardião.
- Guardião: 3 composições ND 8.

**Intermediárias (andares 25–27; Centro ND 9), decididas no ponto de controle das iniciais:**
- 6 setores (NO, NL, O, L, SO, SL), cada um com **3 variantes próprias: 2 combates e 1 teste estendido**. Não há variante compartilhada, porque as tarefas compartilhadas do motor só cobrem 4 setores.
- Combates ND 7 (`combatChallenge: 7`), cada um com a própria planta. São 12 plantas de combate e a do Centro.
- Os 4 primeiros setores aplicam as penalidades sorteadas. Os 2 últimos (SO e SL) removem um bônus do guardião (`defaultGuardianBuff`), como na Vulcânica.
- Guardião: 3 composições ND 9.

**Avançadas (Centro ND 10):** o formato é o de Flutuante e Tempestades (8 setores, 3 variantes, combate ND 8, quatro setores de penalidade e quatro de bônus). Ele será detalhado no ponto de controle das intermediárias.

## Restrições

- Manter os códigos de sessão compatíveis. Expedições salvas mantêm as ilhas sorteadas. Ativar um tema só afeta expedições novas.
- O conteúdo segue as regras de Tormenta20. CD e ND vêm das tabelas do livro e dos parâmetros do perfil, nunca de fórmula inventada.
- Não misturar a etapa com refatoração do motor. Se o motor precisar de algo novo para um tema (por exemplo, um tipo de terreno inédito no mapa), isso vira uma tarefa explícita do plano daquela etapa e é avisado ao PO na prévia.
- Textos em português, no tom e no formato das ilhas atuais (frases curtas, regras explícitas).
- Nada de caixas de Parceiro ou Familiar nas fichas.

## Decisões do PO

- Os 13 temas viram ilhas completas, no mesmo nível das 10 atuais.
- Uma ilha por etapa, com mais de 3 etapas se preciso, para garantir qualidade.
- Ordem das iniciais: Náufragos, Algas Gigantes, Névoa e Cemitério de Navios.

## Decisões do gerente (o PO pode corrigir)

- Cada ilha entra no sorteio na própria etapa, depois dos testes, e não ao fim da fileira. A validação no app precisa da ilha sorteável.
- A prévia de conteúdo é o momento de aprovar a criatividade. O plano só transcreve e implementa o que foi aprovado.
- Uma criatura ausente do catálogo nunca é cadastrada dentro da etapa. Ela é anotada como pendência.
- **Reuso de criaturas.** A lista de uma ilha nova pode repetir criaturas que outras ilhas já usam, como piratas, humanoides costeiros ou o lacedon, como Atol e Costa do Coral já fazem. A lista ainda precisa ter identidade própria: a maior parte do elenco tem de ser típica do tema.
- **ND exato como teste.** Para cada variante de combate de setor, com o tipo preferido dela, o teste confirma em várias seeds que a lista da ilha fecha o ND do setor. Cada composição do guardião precisa somar exatamente o ND do Centro. Se uma variante não fechar, a lista cresce ou o tipo preferido sai. Isso é decidido na prévia, não no código.
- **Códigos de sessão.** As ilhas salvas guardam o `themeId` e os objetivos, então expedições antigas não sorteiam temas novos. Cada etapa inclui um teste de regressão: um código de sessão gerado antes da etapa carrega igual depois dela.
- **Nome do Centro.** Toda ilha ativa tem `arenaName`. Cada ilha nova ganha um nome de Centro, definido na prévia e gravado no `themePools`.
- **Mapas na prévia.** O esboço usa só os tipos de terreno que a grade já tem (água, água funda, corrente, lama, terreno difícil, obstáculo, parede, árvore, clareira, encosta, vantagem e afins). Se o tema pedir um terreno inédito, a prévia mostra isso à parte como tarefa extra, para o PO decidir se vale o custo.
- **Ordem das listas (lição da etapa 1).** Temas novos entram no **fim** de `islandCreatures`. A origem de uma criatura é o primeiro tema da lista que a contém. Inserir um tema no meio mudaria a escolta de caçadas já salvas. Cada etapa testa que as criaturas compartilhadas mantêm a origem anterior.
- **Testes antigos com seed fixa (lição da etapa 1).** Cada tema novo muda o sorteio das seeds fixas. Os testes que percorrem temas precisam continuar exercitando todos os temas que já cobriam e afirmar isso explicitamente.
- **Uma planta por combate (decisão do PO, etapa 1).** Só as variantes de combate e o Centro abrem mapa tático. Toda variante de combate, própria ou compartilhada, tem uma planta desenhada para a cena dela, com o ponto de interação onde a regra da tarefa acontece. A planta-base do setor serve a um dos combates. O Centro tem uma planta só, usada pelos três guardiões. As 10 ilhas antigas continuam com uma planta por setor. Levar o padrão a elas é uma etapa futura, à parte.
- **Mecânica própria de guardião (decisão do PO, etapa 1).** Uma composição de guardião pode trazer uma regra de cena própria (`rule`), que aparece na ficha só quando essa composição é sorteada. Exemplo: a lente do farol contra a Aparição, nos Náufragos.
- **Equilíbrio dos setores.** Cada setor deve ter ao menos dois combates entre as variantes sorteáveis, contando a compartilhada. Assim o mestre não vê sempre o mesmo combate.
- **Testes.** Cada ilha ganha seu arquivo de testes, ou um bloco por tema num arquivo comum das ilhas novas, à escolha do implementador.

## Fica a cargo do implementador

- A forma exata dos testes de cobertura (por exemplo, um teste por tema que valide setores, variantes, ND das composições do guardião, mapas para todas as direções, pacote de missões e ecologia).
- Se a ilha ganha arquivo próprio `src/archipelago<Tema>.js`, como Atol e Costa do Coral (recomendado), ou fica inline no piloto.
- As coordenadas dos mapas táticos, desde que respeitem o esboço aprovado.
