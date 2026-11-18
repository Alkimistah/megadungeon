# Andares 11–20 — decisões, prioridades e andamento

Atualizado em 18/11/2026. A expedição da última sessão foi recuperada no **andar 14**, após o descanso no acampamento e antes do último nodo. A próxima data de jogo ainda não foi registrada.

Este documento consolida as decisões, as entregas e as pendências dos andares 11–20. O MVP foi publicado no commit `7afd21b`. O histórico de salvamento automático no PWA e de importação e exportação por TXT está na [seção 13](#13-persistência-após-a-sessão).

A versão `c992c22` está publicada e inclui a continuidade de terreno e clima para novas expedições, os PV individuais e a adição temporária de criaturas. A validação em Chrome e a publicação no GitHub Pages foram concluídas. A conferência dessa versão no tablet físico está pendente. [Publicação no GitHub Pages](https://github.com/Alkimistah/megadungeon/actions/runs/44232391826).

A versão `398a98b` publicou a [modal do nodo em tela cheia](#17-modal-do-nodo-em-tela-cheia). [Publicação no GitHub Pages](https://github.com/Alkimistah/megadungeon/actions/runs/44235659633).

## 1. Leitura rápida: o que vem primeiro

**Entrega atual:** a [mecânica especial da Quimera](#6-p1--encontro-fixo-da-quimera) está implementada e validada no Chrome. A próxima entrega será a de pistas de rota.

| Ordem | Prioridade | Resultado esperado | Situação |
|---|---|---|---|
| 1 | P0 — missões | Missões próprias de 11–20, ligadas a nodos com conteúdo que permita cumpri-las e estado preservado | Implementado e validado para novas expedições |
| 2 | P1 — calibragem | CDs de exploração coerentes com personagens de níveis 4–7 | Curva 20–23 confirmada e implementada |
| 3 | P1 — regras essenciais | Revelação correta, descanso verdadeiro seguro e estados claros de resolução | Implementado, com relógios separados na floresta |
| 4 | P2 — desconhecidos | Mais variedade com tabela temática própria e descanso falso explícito | Primeira tabela implementada |
| 5 | P3 — continuidade | Terreno e clima com transições coerentes entre nodos | Publicado para novas expedições |
| 6 | PV individual | Registrar dano e cura por criatura nas fichas de combate | Publicado e validado no Chrome |
| 7 | P1 — Quimera | Arena fixa, chefe solo e quatro cabeças sorteadas no andar 20 | Implementado e validado no Chrome |
| 8 | P4 — pistas de rota | Informação parcial útil, sem entregar o tipo do nodo | Intenção aceita; regras ainda precisam de desenho |

**Regra de corte:** não iniciar P2–P4 enquanto o mínimo de missões não estiver validado. Não condicionar a correção das missões à construção do sistema completo de clima, terreno ou desconhecidos.

**Se o tempo acabar:** preferir uma versão estável, com o escopo validado claramente informado, a disponibilizar todas as ideias parcialmente funcionais. Falta de alvo ou vínculo de missão não pode ser tratada como mero detalhe narrativo.

## 2. Decisões confirmadas

- 11–20 continua sendo exploração de uma região selvagem por mapa em nodos. O grafo representa a região; mapas táticos representam cenas locais.
- O grupo entra nessa faixa no nível 4 e pode chegar ao nível 7. A referência completa está em [Progressão de níveis](PROGRESSAO_NIVEIS_GRUPO.md).
- Missões são essenciais por grupo de andares. Compartilhar infraestrutura não significa reutilizar o conteúdo de um labirinto na exploração externa.
- Toda missão aceita deve ter realização concreta em um ou mais nodos. Missão criada por outro fluxo também deve passar pela mesma integração.
- Cada nodo pode abrigar no máximo uma missão, inclusive quando os objetivos são semelhantes. Missões do mesmo andar ocupam nodos distintos numa rota possível. Extermínio pode ocupar vários nodos, sem compartilhar esses nodos com outra missão.
- Acampamento é descanso verdadeiro e seguro. Descanso falso é uma cena própria que só pode surgir dentro do desconhecido.
- A Quimera é a única criatura do encontro fixo do andar 20. A arena usa posições iniciais fixas. O app sorteia as cabeças e suas fraquezas ao preparar o andar 20 e guarda o resultado no save.
- Pistas específicas da Quimera só aparecem no andar 20.
- Desconhecidos devem aparecer mais e podem conter cenas sem combate, adequadas à região e ao clima.
- Terreno e clima devem apresentar continuidade entre nodos, sem exigir reconstruir a estrutura do grafo.
- As pistas antes da escolha precisam de mais cuidado: não podem funcionar como uma legenda que entrega o conteúdo do nodo.

Os percentuais e os detalhes técnicos propostos abaixo são pontos de partida para implementação e validação. Não são medidas de balanceamento já comprovadas em mesa.

## 3. Diagnóstico inicial, antes da implementação do MVP

Os achados desta seção registram a origem das correções. O estado entregue está na seção 11. Não reimplementar essas correções a partir desta lista histórica.

### Exploração

O gerador cria um grafo com rotas ramificadas. O perfil fornece profundidade e CD sugeridas por andar, ambiente, orçamento de ND, criaturas, armadilhas e acampamentos. Escolher um nodo libera os seguintes e resolve a composição do encontro. Mapas táticos de nodos já existem em `src/nodeTacticalMap.js`.

Na revisão anterior foram gerados 1.000 mapas, com 27.620 nodos: não houve nodos inacessíveis nem rotas encerradas antes do último nível. Isso verifica a estrutura nessa amostra, não todos os aspectos de jogabilidade.

### Missões: existe conteúdo específico para 11–20

O perfil `src/floorProfiles/forest11to20.js`, em `missionRules`, já define:

- Destinos nos andares 11–19; o andar 20 é excluído das missões comuns.
- Dez categorias: extermínio, coleta, exploração, recuperação, investigação, resgate, entrega protegida, caçada especial, teste/desafio e anômala.
- Contratantes como batedor, pesquisador de campo e equipe de contenção da mata.
- Locais como clareira, trilha alagada, curso d'água, ruína com raízes e acampamento abandonado.
- Materiais, objetos, lembranças, vestígios e fenômenos próprios da região.
- Listas de criaturas-alvo e recompensas por andar.

Portanto, **não é necessário criar do zero as missões da faixa**. A prioridade máxima é completar e verificar sua materialização no mapa. Títulos e estruturas comuns podem continuar compartilhados quando fizerem sentido.

### Vínculo existente e lacunas

`src/missions/missionProfileAdapters.js` escolhe um nodo por pontuação de tipo, perícia e ND e adiciona `missionBindings`. O mapa mostra um indicador; a modal permite abrir a missão depois de escolher o nodo. As missões e encontros resolvidos entram no código de sessão.

| Achado | Consequência | Tratamento necessário |
|---|---|---|
| Extermínio usa destino `progress`, sem andar e sem vínculo a nodo | O contador depende de encontrar alvos por acaso; em modo de nodos a missão pode aparecer aguardando nodo | Garantir fontes concretas de progresso em nodos |
| Caçada recebe vínculo, mas a composição normal não recebe o alvo obrigatório | Nodo marcado como missão pode conter criaturas diferentes das pedidas | O objetivo deve participar da geração do encontro |
| Pontuação escolhe nodo, mas não exige compatibilidade de clima/terreno com o objetivo | Um fenômeno ou material pode não combinar com a cena | Condições de elegibilidade e conteúdo de missão explícito |
| O posicionamento considera missões separadamente | Não há garantia de uma rota que permita realizar todas as missões do mesmo andar | Validar compatibilidade das colocações no grafo |
| Ao mudar de andar, missões são rematerializadas; vínculos de outros andares podem virar apenas indicação de andar | O vínculo anterior não constitui histórico estável | Preservar identidade e situação dos vínculos |
| O mapa tático usa uma seed diferente quando recebe uma missão | Abrir a missão pode rearranjar a cena tática do nodo | Usar a mesma cena e acrescentar o objetivo sem deslocar seus elementos |

No fluxo inspecionado há geração e seleção de ofertas, sem editor manual de missões. O requisito de integração deve valer para qualquer futura entrada manual; isso não obriga construir um editor completo antes da sessão.

### Evidência e limites da revisão

- `npm run test:missions` passou: geração e amostragem de códigos de sessão para três perfis, com 250 seeds por perfil, além das verificações específicas do script.
- A verificação existente de vínculo na floresta usa coleta; não comprova alvo correto em caçadas nem realização de todas as categorias.
- Auditoria adicional: 50 ofertas por categoria, forçando uma categoria por vez. As nove categorias com destino de andar vincularam 50/50 missões a nodos; extermínio vinculou 0/50.
- Nas 50 caçadas vinculadas, o encontro normal resolvido continha o alvo pedido em 0/50 casos. Isso demonstra ausência de garantia nessa amostra, não uma taxa universal de falha.
- Reprodução de exemplo: seed `mission-audit-specialHunt-0`, perfil de floresta com apenas `specialHunt` e uma oferta; destino 17, alvo Serpe, composição normal Goblin de Sombreiro e Enxame Kobold. Gerar o mapa com a mesma seed e a profundidade/CD recomendadas para o andar, materializar e resolver o nodo vinculado.
- Não houve QA visual novo nem sessão jogada nesta revisão. Passar nos testes existentes não declara P0 concluído.

## 4. P0 — missões realizáveis: primeira entrega

### Contrato funcional

**Aceitar uma missão deve criar uma obrigação para o gerador.** A missão não pode ser apenas texto e marcador sobre um encontro independente.

1. Validar perfil, destino, alvo, quantidade e dificuldade antes de confirmar a oferta.
2. Reservar um destino coerente dentro dos andares permitidos. Um destino futuro pode ficar como reserva de andar até seu mapa existir; não inventar um `nodeId` de mapa ainda não gerado.
3. Ao gerar o andar de destino, associar a missão a nodo(s) reais e gravar o vínculo nos dois sentidos: missão → nodo e nodo → missão.
4. Materializar o conteúdo necessário: criatura, quantidade, material, objeto, vestígio, fenômeno ou condição de desafio.
5. Recalcular e validar o orçamento do encontro. Não acrescentar uma ameaça obrigatória por cima de todo o combate aleatório sem contabilizá-la.
6. Mostrar o objetivo e as condições de resolução na cena do nodo. O mestre confirma os resultados da mesa.
7. Preservar vínculo, conteúdo e progresso ao salvar/restaurar. Abrir a modal não deve sortear outro alvo ou encontro.

Para missões em andar futuro, a interface deve informar o destino pendente. Ao chegar lá, a reserva precisa resultar em nodo concreto. Missão concluída deve manter histórico; não ser reaberta pela rematerialização.

### Requisitos por categoria

| Categoria | O que o nodo precisa conter |
|---|---|
| Extermínio | A criatura-alvo e uma fonte de quantidade suficiente para a meta, em um ou mais nodos compatíveis com a rota e o ND |
| Caçada especial | O alvo específico da oferta dentro da composição real do encontro |
| Coleta | O recurso na quantidade exigida e condições para coletar/entregar |
| Exploração | O local ou ponto de observação que permita cumprir o registro solicitado |
| Recuperação | O objeto recuperável e sua situação na cena |
| Investigação | Vestígios e uma pergunta que possa ser respondida com a cena |
| Resgate | A lembrança/pertence descrito; a implementação atual não é resgate de pessoa viva |
| Entrega protegida | A condição ou ponto de entrega do pertence; a implementação atual não é escolta de NPC |
| Teste/desafio | A tarefa, maneiras de abordá-la e consequências de sucesso/falha |
| Anômala | O fenômeno e o que constitui registrá-lo ou estabilizá-lo |

Extermínio pode continuar com contador agregado, mas não fica dispensado de nodos concretos. Não colocar todas as 4–8 criaturas juntas quando isso exceder o orçamento. Distribuir encontros ou limitar as ofertas antes da aceitação, sem alterar silenciosamente a promessa depois.

### Regras de posicionamento propostas

- Preservar boss fixo e descanso verdadeiro: por padrão, não usá-los para inserir conteúdo hostil de missão.
- Não depender de o desconhecido revelar por acaso o conteúdo necessário. Seu conteúdo real deve ser compatível com a missão desde a geração.
- Quando houver várias missões no mesmo andar, oferecer ao menos uma rota possível que as comporte; não tornar sua conclusão obrigatória para sair do andar.
- Uma escolha deliberada pode abandonar uma missão. A interface deve explicar quando o objetivo ficou para trás, em vez de mantê-lo indefinidamente como disponível.
- Não oferecer destinos já ultrapassados em fluxos que aceitem novas missões durante a exploração sem retorno.
- Se não houver posição válida, tentar outra colocação ou recusar a confirmação com explicação. Não declarar missão materializada apenas porque existe um marcador.
- Mostrar a missão não deve revelar automaticamente tipo, ND ou composição de um nodo desconhecido ao grupo. O mestre precisa consultar os dados reais.

### Aceite obrigatório de P0

- [x] Todas as categorias permitidas em 11–20 têm conteúdo próprio e vínculo concreto quando o andar de destino existe.
- [x] Caçada: `objective.targetId` consta nos itens reais do encontro vinculado.
- [x] Extermínio: nodos vinculados fornecem alvos suficientes numa rota possível, sem exceder os orçamentos definidos.
- [x] Material, objeto, fenômeno e desafio correspondem ao texto da missão e ao ambiente do nodo.
- [x] Seleção de até três missões não cria objetivos mutuamente impossíveis por posicionamento.
- [x] Missões futuras possuem vínculo real: os mapas futuros são preparados na aceitação e salvos com a expedição.
- [x] Consulta de missão e consulta de nodo usam a mesma cena, criaturas, armadilhas e mapa tático base.
- [x] Progresso confirmado não pode ser duplicado pelo mesmo resultado de encontro; existe correção manual pelo mestre.
- [x] Salvar/restaurar preserva os vínculos, conteúdo, progresso e conclusão; avançar não apaga silenciosamente o histórico.
- [x] Sessões anteriores continuam restauráveis; mudanças de geração não reinterpretam IDs antigos silenciosamente.
- [x] QA de navegador cobre escolher → alcançar → abrir → resolver → salvar → restaurar → avançar. Validação em mesa/tablet físico ainda pendente.

## 5. P1 — dificuldade, descanso, revelação e conclusão

### CDs e nível esperado

O grupo esperado é de níveis **4–7**. A configuração anterior subia de CD 15 a 30, chegando a 32–35 nos elites finais. Após validação e confirmação do usuário, o MVP usa as bases **20,20,21,21,21,22,22,22,23,23** nos andares 11–20. Mantém variação comum −3/+3 e elite +2/+5. A curva acompanha o ganho de +3 numa perícia treinada entre níveis 4 e 7, mantendo atributo e demais bônus, sem assumir crescimento automático de atributos.

Como comparação de atividade externa, a regra de Jornada pelos Ermos usa CDs por terreno: 15 para planícies/colinas, 20 para florestas/pântanos, 25 para desertos/montanhas e 30 para regiões planares perigosas/áreas de Tormenta. É referência de outra atividade, não fórmula automática para descoberta de nodos. [Fonte oficial: Tormenta20 — Jogo do Ano, Jambô](https://jamboeditora.com.br/wp-content/uploads/2022/09/jamboeditora-t20-jogo-do-ano-.pdf).

**Avaliação:** CDs 25–30 frequentes podem tornar a exploração excessivamente difícil para a faixa, dependendo das perícias do grupo. Aumentar o andar, sozinho, não justifica esse salto. ND de combate e CD de exploração são medidas distintas.

**Decisão para o MVP:** usar a curva 20–23 confirmada acima, em vez de manter CD 30 como rotina ou adotar uma base única. Não alterar as CDs próprias das fichas de criaturas e armadilhas. O mestre ainda pode ajustar a CD base antes de iniciar ações no andar inicial.

O teste de descoberta e suas marcações permanecem sob resolução do mestre. Não foram criadas penalidades numéricas novas por falha nem teste obrigatório para ações triviais. Uma evolução deve explicitar melhor essa apresentação e o relógio, sem alterar silenciosamente a regra de recuperação.

Não alterar o ND fixo da Quimera apenas por comparar seu ND ao nível máximo 7: o chefe é uma exceção deliberada e deve ser avaliado como encontro completo.

### Revelação dos desconhecidos

O tipo real orienta ND, teste, criatura, armadilha, duração e descanso nas novas expedições. A mecânica é resolvida pelo conteúdo real e a apresentação permanece oculta até a escolha da rota. O caminho legado de geração continua disponível para restaurar códigos anteriores.

Separar identidade real da cena de sua informação visível. Evitar trocar apenas o rótulo. Na amostra anterior houve 461 desconhecidos revelados como elite mantendo o orçamento base normal.

### Descanso verdadeiro e falso

| Aspecto | Acampamento verdadeiro | Descanso falso |
|---|---|---|
| Origem | Tipo acampamento ou revelação segura do desconhecido | Apenas conteúdo de desconhecido |
| Promessa | Lugar seguro que permite descanso | Abrigo aparente com problema concreto |
| Clima | Pode continuar chovendo fora; o abrigo protege a recuperação | Pode esconder exposição, enxurrada ou outro risco |
| Hostilidade | Não sortear emboscada ou interrupção que invalide a segurança | Problema possui causa, sinais e formas de resposta |
| Estado | Descanso seguro registrado | Descobrir/solucionar o problema é distinto de descansar |

Clima danoso num abrigo desconhecido só é erro se a cena prometer descanso verdadeiro sem proteção. Ao revelar o nodo, o abrigo verdadeiro e o falso aparecem como **Acampamento**, com o mesmo ícone e as mesmas ações. O tipo só fica explícito para o mestre depois da tentativa de descanso.

Na primeira entrega, preservar os acampamentos seguros existentes. O descanso falso pode aguardar a tabela P2, sem ser improvisado por sorteio de clima danoso.

### Tempo e resolução

- O painel da expedição de floresta mostra o tempo total de exploração e o tempo desde o último descanso. Descansar zera apenas o segundo. A duração do descanso ainda fica a cargo do mestre.
- Na geração de mapas novos, um nodo com teste custa 30 minutos, mais 15 por evento climático e mais 15 quando o ND do terreno é pelo menos 1, até 60 minutos. Nodos sem teste continuam em 30 minutos. Mapas armazenados mantêm as durações registradas.
- Tentativa custa 15 minutos e a escolha que vem depois cobra o tempo integral do nodo. Marcar explorado antes da escolha desconta os 15 minutos já gastos. Uma apresentação mais explícita do teste de descoberta permanece pendente.
- Implementado nas novas expedições: escolher a rota abre a cena; concluir o encontro libera os próximos nodos. O último encontro deve ser concluído antes de avançar. A Quimera possui confirmação de derrota.
- O mestre confirma a conclusão; isso não exige automatizar combate. O avanço normal deve depender da cena obrigatória concluída.

## 6. P1 — encontro fixo da Quimera

O MVP do andar 20 termina com a **Quimera ND 8 sozinha** numa clareira plana de 20×14, com posições iniciais fixas. Quatro personagens começam de um lado e a Quimera Grande ocupa 2×2 no outro. A rota anterior pode variar.

### Mecânica especial

1. **Sorteio na geração do andar 20.** Ao preparar a expedição, sortear quatro cabeças distintas entre as dez da ficha. Para cada uma, sortear uma fraqueza entre os candidatos da tabela abaixo. Numerar as quatro cabeças de **1 a 4**. A composição, a ordem e as fraquezas fazem parte do encontro original salvo com o andar. Abrir a ficha ou retomar a expedição usa o mesmo resultado.
2. **Um turno da Quimera.** O mestre rola **1d4** para escolher qual cabeça conduz a próxima ação no turno. O número corresponde à lista exibida. O chefe continua com o número de ataques da ficha como ponto de partida. Uma habilidade passiva atua enquanto a cabeça estiver ativa, independentemente do dado. Se a cabeça sorteada estiver atordoada ou com a ação indisponível, a Quimera usa os ataques normais.
3. **Dano e RD.** O mestre informa o valor, o tipo de dano e o alvo, **Corpo** ou uma das quatro cabeças. O corpo e uma cabeça atingida com tipo diferente de sua fraqueza aplicam **RD 5**, até o dano chegar a zero. Dano da fraqueza direcionado à cabeça passa integralmente. Todo dano reduz os PV compartilhados da Quimera. O app usa os tipos do [catálogo de dano do projeto](src/damageTypes.js), conferidos na [referência oficial de Tormenta20](https://jamboeditora.com.br/wp-content/uploads/2023/06/Tormenta20-Resumo-de-Regras.pdf).
4. **Atordoamento por cabeça.** A primeira vez que uma cabeça sofre dano de sua fraqueza, sua habilidade especial fica suspensa até o fim do próximo turno da Quimera. O mestre encerra esse turno com **Fim do turno da Quimera**. A ficha registra o atordoamento e se a cabeça já foi atordoada nesse combate. A fraqueza continua ignorando a RD depois de usado o atordoamento. A Quimera continua agindo com as demais cabeças e os ataques normais.
5. **Sopro do Dragão.** Se o Dragão for sorteado, **Usar sopro** marca o uso da ação padrão e muda o estado para **Em recarga**. **Recarregar sopro** volta a deixá-lo disponível quando o mestre registrar que a Quimera gastou uma ação de movimento. **Fim do turno** trata o atordoamento. Um Dragão atordoado fica impedido de usar o sopro mesmo que esteja carregado. O estado do sopro fica no save.
6. **Ficha do mestre.** No topo, mostrar PV atuais e máximos, RD 5 e o último lançamento, como `Corpo · 18 de corte − 5 de RD = 13 PV perdidos`. Em seguida, mostrar apenas as cabeças sorteadas, com número, habilidade, fraqueza sorteada e estado. Os ataques do corpo e as ações aplicáveis às cabeças sorteadas ficam acessíveis na mesma ficha, com os controles pertinentes a cada habilidade.
7. **Ajustes opcionais do chefe.** Reaproveitar **Iniciativa +2** e **Ataque +1**. Oferecer **PV extras** com valor escolhido pelo mestre, somado aos PV atuais e máximos para preservar o dano sofrido. A base é **333 PV** e a Defesa é **33**. Ajustes adicionais de Defesa ou resistências ficam para avaliação em mesa. O ND 8 e o XP de referência permanecem.
8. **Arena.** A Quimera fica sozinha e as posições iniciais são fixas. Em novas expedições, a clareira tem troncos marcados no mapa como coberturas destrutíveis. A destruição é resolvida em mesa. Pistas específicas ficam restritas ao andar 20 e entram no trabalho de pistas de rota.

### Fraquezas candidatas

Esta tabela é uma proposta para a luta do andar 20. A ficha do mestre mostra apenas a fraqueza efetivamente sorteada de cada cabeça presente.

| Cabeça | Fraquezas candidatas |
|---|---|
| Águia | Impacto ou eletricidade |
| Bode | Impacto ou perfuração |
| Dragão | Frio ou eletricidade |
| Gorlogg | Impacto ou psíquico |
| Hidra | Fogo ou ácido |
| Javali | Perfuração ou psíquico |
| Leão | Impacto ou corte |
| Serpente | Corte ou frio |
| Tigre | Perfuração ou eletricidade |
| Tubarão | Eletricidade ou corte |

A regra de cura acelerada da Hidra conserva fogo e ácido, conforme a ficha original. A fraqueza sorteada define qual dos dois tipos contorna a RD e pode atordoar a cabeça. O controlador recebe um tipo de dano por lançamento. Ataques com múltiplos tipos e efeitos das habilidades das cabeças são adjudicados pelo mestre. [Ficha original](src/creatureCatalog/monsters.js#L2993).

O autosave e o TXT preservam as quatro cabeças, a ordem, as fraquezas, o atordoamento, a recarga e os reforços. Os PV atuais e o último lançamento são anotações da sessão aberta. Ao retomar, a Quimera volta aos PV máximos com os reforços salvos. Um save anterior recebe o sorteio a partir da seed do andar 20 e preserva sua arena. Nas novas expedições, a arena inclui troncos como cobertura destrutível, com destruição resolvida em mesa.

## 7. P2 — desconhecidos e cenas externas

### Tipos de nodo

Combate normal, combate elite, boss, desconhecido, tesouro e acampamento permanecem os tipos funcionais acordados. O código também possui armadilha como nodo próprio: mantê-la nesta etapa, conforme a distribuição discutida, sem removê-la silenciosamente.

O desconhecido pode revelar os demais conteúdos comuns, cenas sem combate e descanso falso. Boss não entra no sorteio: a Quimera é exclusiva do final fixo.

### Distribuição dos novos mapas

| Tipo no sorteio inicial | Peso anterior | Peso novo |
|---|---:|---:|
| Combate normal | 62 | 47 |
| Elite | 11 | 11 |
| Armadilha | 16 | 11 |
| Desconhecido | 5 | 25 |
| Tesouro | 6 | 6 |

Acampamentos garantidos e boss são aplicados à parte. O novo gerador elimina a conversão automática de convergências em desconhecidos. Em uma amostra de 500 novas expedições com até três missões, 26.279 de 135.732 nodos eram desconhecidos, cerca de 19%. Houve 10.787 cenas externas e todas as expedições da amostra foram preparadas com sucesso. Mapas armazenados preservam a distribuição e o conteúdo com que foram criados.

### Tabela interna inicial do desconhecido

| d100 | Conteúdo |
|---|---|
| 01–25 | Combate normal |
| 26–35 | Combate elite |
| 36–45 | Armadilha |
| 46–50 | Obstáculo sem combate |
| 51–70 | Exploração ou encontro sem combate |
| 71–80 | Descoberta útil ou vantagem |
| 81–86 | Tesouro |
| 87–94 | Acampamento seguro |
| 95–100 | Descanso falso |

Os pesos iniciais preservam a calibragem recente de 8% para acampamentos seguros. A validade em mesa será avaliada pelo ritmo, risco e recuperação ao longo de rotas jogadas.

### Conteúdo e consequências

Usar as categorias dos andares 1–10 como inspiração, não copiar portas, corredores, salas móveis ou efeitos específicos de labirinto.

| Categoria | Exemplo externo | Condição de aplicação |
|---|---|---|
| Exploração/social | Exploradores precisam recuperar equipamento numa margem instável | Margem ou água compatível com a cena |
| Obstáculo | Barranco cede ou árvore bloqueia passagem | Inclinação ou vegetação adequada |
| Vantagem | Ponto elevado permite observar uma travessia | Elevação ou visibilidade coerente |
| Achado | Suprimentos protegidos da chuva | Local que justifique sua preservação |
| Anomalia | Clareira em que a chuva não toca o chão | Chuva presente; fenômeno assumidamente sobrenatural |
| Descanso falso | Abrigo sobre leito de enxurrada | Chuva atual/recente ou risco de cheia explicitamente gerado |

A primeira entrega inclui oito cenas de obstáculo, exploração, descoberta e descanso falso, com opções de margem, pântano e encosta e cenas de uso mais geral. A UI revela a cena, o teste e as abordagens ao escolher a rota. O mestre resolve sucesso ou falha e confirma a conclusão, que libera as saídas. O tempo segue a regra de travessia. Os efeitos e as descobertas são conduzidos em mesa. A preparação mantém essas cenas separadas dos nodos de missão.

Um acampamento descoberto permite **Seguir viagem** ou **Iniciar descanso**. Até decidir, o mestre vê a mesma apresentação para o acampamento seguro e para o falso. Em um acampamento falso, iniciar o descanso muda o nome do nodo para **Emboscada** e abre a ficha de combate. As criaturas usam o ND base do nodo. O total continua incluindo clima e terreno. A emboscada interrompe o descanso, preserva os relógios e fica gravada no save. A próxima rota só é liberada depois de **Confirmar conclusão da emboscada**.

## 8. P3 — continuidade de terreno e clima

### Arquitetura e sequência

Implementado a partir da geração 4 da floresta. A criação de níveis, nodos e links segue o mesmo fluxo. O ambiente é definido antes de compor encontros e vincular missões, pois influencia criatura, armadilha, missão, ND e mapa tático.

O contexto é gerado a partir da seed e a versão de geração fica no save. Os mapas já armazenados restauram seus ambientes originais.

### Terreno

Favorecer permanência e transições plausíveis. Exemplo possível: planície → colina com nascente → bosque com riacho → mata alagada → pântano. Não transformar essa sequência em roteiro obrigatório.

Nesta entrega, cada predecessor aumenta o peso de seu próprio terreno e o de terrenos compatíveis. Em convergências, os pesos consideram todos os caminhos de entrada. Uma planície pode aparecer sem acidentes especiais. Continuidade exata de rios, nascentes, margens e elevações permanece para uma expansão futura.

Na comparação de 500 mapas pareados com a geração anterior, o terreno se manteve em 7.357 de 17.332 conexões antes da mudança (42%) e em 10.560 depois (61%). Uma amostra de 500 novas expedições com até três missões foi preparada sem falhas de posicionamento.

### Clima

Tempo aberto → chuva leve → chuva leve, tempo aberto ou temporal é uma sequência possível. Permanecer no mesmo estado deve ser comum. Evitar saltos de calor extremo para neve sem justificativa excepcional.

Precipitação e temperatura compartilham uma tendência por etapa de cada andar. A temperatura muda gradualmente. Sem chuva, o terreno influencia a chance de vento ou neblina local.

| Precipitação na etapa atual | Tempo aberto | Chuva | Tempestade |
|---|---:|---:|---:|
| Tempo aberto | 88% | 12% | 0% |
| Chuva | 36% | 57% | 7% |
| Tempestade | 0% | 75% | 25% |

O clima pode deixar efeitos posteriores: solo molhado após abrir o tempo e rio cheio depois de uma chuva. Essa memória é uma evolução posterior à continuidade básica; não criar simulação meteorológica completa para a primeira versão.

A chuva e a tempestade usam os efeitos já cadastrados, inclusive os de vento. O acampamento seguro filtra os efeitos danosos da cena sem alterar o tempo regional dos nodos vizinhos. A arena fixa da Quimera prevalece sobre a geração procedural.

## 9. P4 — pistas antes da escolha

Pistas descrevem sinais verdadeiros e incompletos da cena, não seu tipo, ND ou recompensa. O mesmo sinal pode ocorrer em conteúdos diferentes: fumaça pode indicar exploradores, inimigos, abrigo ou restos de incêndio.

Testes podem revelar detalhes úteis, mas não devem entregar automaticamente a composição inteira. Evitar tanto sinais exclusivos de um tipo quanto pistas tão ambíguas que não ajudem em nenhuma decisão.

Ainda definir: quando aparecem, quanto revelam, custo dos testes, informação do mestre versus informação do grupo e interação com nodos de missão. Não implementar esse sistema por simples substituição de rótulos. Pistas específicas da Quimera ficam restritas ao andar 20.

## 10. Entregas, validação e retomada

### Entrega A — mínimo para o próximo uso

1. Concluir P0 usando os geradores e o conteúdo temático já existentes.
2. Calibrar as CDs de exploração para níveis 4–7; não depender de concluir P3.
3. Verificar revelação, descanso seguro e salvamento dos fluxos realmente usados.
4. Se a sessão alcançar o andar 20, a cena fixa e sua conclusão entram no mínimo dessa sessão. Como o andar inicial não foi informado, não declarar essa necessidade resolvida.
5. Executar testes e QA; informar exatamente quais partes foram entregues antes de disponibilizar a versão.

Sem prazo técnico estimado: a janela entre 02h42 e 15h do mesmo dia não é tempo integral disponível de desenvolvimento. O usuário precisa dormir e preparar a casa. O planejamento deve permitir retomar sem reabrir decisões já confirmadas.

### Entregas seguintes

- **B:** completar P1 restante, incluindo arena fixa se não tiver sido necessária em A, estados de conclusão e relógios claros.
- **C:** P2, com tabela pequena de cenas completas e revisão da frequência dos desconhecidos.
- **D:** P3, primeiro terreno e clima básicos, depois memória ambiental e continuidade detalhada de rios.
- **E:** P4, após definição e avaliação das pistas de rota.

### Mapa de implementação futura

| Área | Arquivos principais | Verificação esperada |
|---|---|---|
| Conteúdo e patamar | `src/floorProfiles/forest11to20.js`, `PROGRESSAO_NIVEIS_GRUPO.md` | Destinos, alvos, CDs e recompensas coerentes |
| Ofertas e validação | `src/missions/missionGenerator.js`, `missionValidator.js` | Nunca aceitar objetivo sem materialização viável |
| Posicionamento | `src/missions/missionProfileAdapters.js` | Vínculo bidirecional, compatibilidade ambiental e de rota |
| Composição | `src/encounterResolver.js`, `creatures.js`, `traps.js` | Alvo presente e ND do encontro validado |
| Estado e UI | `src/missions/missionState.js`, `missionDialog.js`, `src/main.js`, `nodeDialog.js`, `mapRenderer.js` | Disponibilidade, progresso, conclusão e histórico corretos |
| Cena tática | `src/nodeTacticalMap.js` | Abrir missão preserva a cena base do nodo |
| Persistência | `src/sessionCode.js`, `src/sessionAutosave.js`, `src/forestExpedition.js` e orquestração em `src/main.js` | Retomada local e exportação/importação sem perder ou trocar vínculos |
| Ambiente | `src/environment.js`, `generator.js` | Transições válidas e seed determinística |
| Chefe | Nova definição dedicada a decidir, com referência em `dungeon1to10FinalEncounters.js` | Mesma cena em seeds e restaurações diferentes |

Essa lista orienta o trabalho; o plano técnico executável de cada entrega deve definir interfaces e testes antes de alterar o produto. Não fazer uma refatoração geral nem trocar de framework para realizar este escopo.

### Validação de uma entrega

- Usar `npm run test:missions` como base, ampliando as verificações para os aceites de P0; os testes atuais, sozinhos, não bastam.
- Rodar `npm run test:floors-1-10` nas mudanças compartilhadas e `npm run build` na candidata à entrega.
- Fazer QA no navegador/tablet do fluxo de missão em nodo, avanço e restauração; conferir disponibilidade offline na versão candidata.
- Verificar códigos antigos antes de mudar pesos ou ordem de geração: mesma seed pode gerar outro mapa depois de alterar o algoritmo. Usar versão/migração ou estratégia equivalente explícita.
- Disponibilizar a versão conforme o fluxo do projeto, confirmando que o PWA carregou a versão validada. Build local não comprova atualização no tablet.

### Andamento após o MVP

- [x] Decisões e prioridades consolidadas neste documento.
- [x] Progressão oficial de níveis registrada.
- [x] Missões específicas de 11–20 localizadas e integração revisada.
- [x] Testes existentes de missões executados e lacunas amostradas.
- [x] P0 implementado e validado em novas expedições.
- [x] CDs recalibradas no aplicativo: curva 20–23 confirmada pelo usuário.
- [x] Revelação, descanso seguro, conclusão de cenas e Quimera simples fixa implementados e validados.
- [x] Salvamento automático local, retomada e importação/exportação TXT publicados.
- [x] Modal de missão enxuta, destaques no mapa e XP com e sem ambiente publicados. Primeira conferência no tablet aprovada pelo mestre.
- [x] P1: tempo total e tempo desde o último descanso separados.
- [ ] P1 restante: apresentação mais explícita do teste de descoberta.
- [ ] P2, P3 e P4 implementados e validados em entregas separadas.
- [ ] Confirmar no tablet usado em mesa a importação, a retomada pelo ícone do PWA e o download do TXT.
- [x] Registrar o relato da última sessão e identificar as correções que afetam o andamento da expedição.

## 11. Entrega do MVP e evidências

### O que foi entregue

- Mapas de toda a faixa preparados junto com as missões selecionadas. Vínculos futuros já apontam para mapas reais; não são IDs inventados.
- Caçadas com o alvo real; extermínio distribuído em nodos/andares e quantidades suficientes em rotas compatíveis.
- Objetivos locais de coleta, exploração, recuperação, entrega e resgate de lembranças. Investigação tem pergunta, evidências e conclusão para o mestre; desafios e fenômenos têm abordagens e condições de sucesso/falha.
- As cenas usam as regras existentes da ação, do terreno e do clima. Não foram inventados dano, custo ou penalidade adicionais por missão.
- Contagem por encontro idempotente e persistida; os controles manuais continuam disponíveis ao mestre.
- Conclusão separada da escolha de rota, descanso verdadeiro protegido e arena fixa da Quimera.
- Snapshot de mapas, ligações, objetivos e encontros em `forestExpedition`; estado atual e histórico de andares percorridos preservados. Códigos legados continuam usando a geração anterior, sem migração silenciosa de suas cenas.
- Erro de configuração incompatível explica o problema e conserva a sessão anterior. A aceitação de missões só ocorre depois da preparação válida.
- Correção do Escape no mapa tático: fechar o mapa não fecha também a janela do encontro.

### Verificações executadas

- `npm run test:floors-11-20`: 21 testes de regras, missões, compatibilidade de rota, persistência e regressões, incluindo a separação de missões por nodo.
- `npm run test:missions`: três perfis × 250 seeds, além das verificações específicas existentes.
- `npm run test:floors-1-10`: 13.500 encontros sem vazios ou divergência de ND, 32 composições finais e controles existentes.
- Amostragem adicional de 1.500 expedições, com 3.926 missões: nenhuma falha de preparação.
- `npm run qa:floors-11-20`: seleção, objetivos, contador, descanso, conclusão, salvar/restaurar, avanço, boss, viewport mobile e erro de configuração sem perda de estado.
- `npm run qa:floors-1-10`: fluxo existente, missões, chefe e 20 regressões de encontro fácil do andar 9 no navegador.
- `node scripts/qaForestMvp.mjs --production`: mesmos fluxos no build, mais recarga e início de exploração sem rede após cache do PWA. Sem erros de JavaScript.
- `npm run build`: passou. Mantém o alerta já conhecido de bundle acima de 500 kB; não foi feita uma refatoração de carregamento nesta entrega.
- Revisão independente identificou instruções genéricas em investigação/desafio; foram completadas e verificadas por regressões que falharam antes da correção e passaram depois.

### Limites e pendências

- O MVP foi publicado após as verificações no commit `7afd21b`. Não houve teste no tablet físico; o QA usou Chrome local e viewports de tablet/mobile.
- Sessões antigas são preservadas, mas não recebem retroativamente as garantias novas de materialização; iniciar uma nova expedição usa o MVP.
- No MVP, o contador zerava ao descansar. Os dois relógios foram implementados posteriormente. A duração do descanso continua a cargo do mestre.
- A mecânica especial da Quimera está planejada na seção 6 e aguarda o controle de PV individual.
- Não foram acrescentados editor manual, nova tabela de desconhecidos, descanso falso, continuidade de clima/terreno ou pistas de rota.

### Correção após uso: missões no mesmo nodo

O usuário encontrou duas missões do andar 15 no mesmo nodo. A busca anterior agrupava os objetivos não combativos compatíveis no primeiro ponto elegível. A busca agora escolhe no máximo uma missão por nodo e pode adiar objetivos para manter uma rota comum. Se faltarem posições distintas, tenta outro mapa ou recusa a configuração com explicação, preservando a sessão anterior. Snapshots já salvos não são reposicionados automaticamente.

## 12. Clareza visual antes da sessão

Implementados contorno tracejado para exploração registrada, marcador `…` para encontro pendente e `✓` para concluído, preservando o ícone do tipo. A legenda explica os estados e mapa/modal indicam a próxima ação. Não houve mudança de regra, permissão, encontro ou formato de sessão. Marcação extra de descanso foi excluída a pedido do usuário.

Suíte ampliada para 24 testes de 11–20. Testes de missões, de 1–10, build e QA de produção dos dois modos passaram, incluindo leitura em tablet/mobile e offline após cache. O [plano de usabilidade](docs/superpowers/plans/2026-11-14-usabilidade-nodos.md) registra os detalhes; a publicação segue o workflow do commit desta entrega.

## 13. Persistência após a sessão

- O código guardado no WhatsApp chegou cortado em 20.000 caracteres. A recuperação preservou o estado gravado do andar 14, as três missões e o histórico legível do andar 11. Os mapas foram reconstruídos pela seed com os vínculos de missão conferidos. O histórico percorrido nos andares 12 e 13 ficou fora do trecho disponível.
- O PWA guarda uma expedição por vez no IndexedDB do dispositivo. **Continuar expedição** abre o último estado salvo. Abrir a configuração ou sair da seleção antes de iniciar preserva o save anterior. Uma expedição iniciada ou uma importação bem-sucedida atualiza o autosave. [Publicação do autosave e da importação TXT](https://github.com/Alkimistah/megadungeon/actions/runs/44193664119).
- **Exportar sessão (.txt)**, em **Configurações**, baixa o código MD1 em um arquivo como `mega-dungeon-andar-14.txt`. Na tela inicial, **Importar arquivo de sessão** lê o TXT diretamente. A entrada dos códigos MD1 pelo campo de texto continua disponível. [Publicação da exportação TXT](https://github.com/Alkimistah/megadungeon/actions/runs/44195295956).
- O QA no Chrome confirmou a importação da sessão recuperada, o progresso das missões e o avanço ao andar 15. O build de produção foi verificado com retomada e exportação offline. O teste de exportação e reimportação comparou o estado dos nodos e as missões. A confirmação no tablet físico continua pendente.
- A ideia de compactar o backup permanece disponível para quando o tamanho do arquivo voltar a causar dificuldade. O formato atual preserva os mapas completos, o que evita depender de regeneração idêntica entre navegadores ou versões do jogo.

## 14. Retorno da mesa e propostas para a próxima entrega

A expedição avançou do andar 11 ao 14 com pouca necessidade de descanso. O mestre observou muitos acampamentos, inimigos repetidos e pouca pressão em combate. Na maioria das vezes, os inimigos, inclusive os Infectos, caíram antes de agir. Quando agiram, frequentemente erraram. O ambiente, sobretudo as quedas de penhascos, causou a maior parte do dano percebido. A missão aberta pelo nodo também apresentou diferenças no mapa e excesso de texto e tabelas.

### Interface do nodo e da missão

- Implementado, validado no Chrome e conferido pelo mestre no tablet. O mapa tático do nodo mantém terreno, inimigos e armadilhas e sobrepõe os destaques de missão. A modal integrada mostra objetivo, progresso e ações de registro ou conclusão, com pistas, prova e consequências recolhidas em **Detalhes da missão**. [Publicação da interface e do XP](https://github.com/Alkimistah/megadungeon/actions/runs/44201560517).
- Quando o desafio está revelado, **XP com clima e terreno** usa o ND total exibido e **XP sem clima e terreno** usa o ND base do encontro, preservando a contribuição de armadilhas. Cada valor é calculado como `1.000 × ND`. Exemplo com ND total 3¼ e ND base 3: **3.250 XP** e **3.000 XP**. Os valores são alternativas para o mestre usar, sem somá-los.
- O teste com a sessão recuperada confirmou **2.250 XP / 1.000 XP** no nodo da bússola e **4.000 XP / 3.000 XP** no nodo do Infecto. O progresso de **2 de 8 alvos** permaneceu preservado e o encontro já registrado não ofereceu nova contagem.

### Calibragem e variedade

- **Acampamentos e tempo:** novos mapas da floresta passaram de 20% para 8% de chance de um nodo desconhecido revelar acampamento. Os novos tempos e os relógios separados estão descritos na seção 5.
- **Composição:** oferecer ao mestre uma rerrolagem em nodos de combate sem missão, mantendo o orçamento de ND e as restrições do nodo. Guardar o resultado aceito na sessão. Considerar composições com mais de um adversário, quando houver alternativa no mesmo ND, para reduzir a frequência de encontros decididos antes da primeira ação inimiga.
- **Reforço:** o mestre pode aplicar **Iniciativa +2**, **Ataque +1** e **PV + valor base** separadamente. A ficha mostra a iniciativa ajustada e indica o bônus de ataque. O reforço de PV dobra o máximo exibido. Em combate, o mestre soma os PV originais ao valor atual, preservando o dano já sofrido, ou retira o bônus ao desativar. Os valores iniciais precisam ser avaliados em mesa.

## 15. Próximas entregas em ordem

1. **Variações de armadilhas por terreno.** Implementadas e verificadas no Chrome. Conferência no tablet pendente.
2. **Rerrolagem de criaturas no mesmo ND.** Implementada e verificada no Chrome. Em um nodo de combate pendente, **Rerrolar criaturas** busca outro grupo do mesmo tipo permitido, respeitando a lista de criaturas do nodo. Preserva o ND real das criaturas, o orçamento do encontro, terreno, clima e armadilhas. Missões vinculadas, cenas fixas e encontros já concluídos ou contabilizados em missão ficam protegidos. A composição escolhida é preservada no autosave e no TXT.
3. **Menos acampamentos ocultos.** Implementado para novos mapas dos andares 11–20, com chance de 8% por nodo desconhecido. Fileiras com acampamentos visíveis e acampamentos extras seguem as regras existentes. Em 1.000 mapas pareados, foram 423 acampamentos ocultos antes e 171 depois entre 2.270 nodos desconhecidos. Em 1.000 rotas simuladas, os acampamentos ocultos encontrados passaram de 115 para 47 e os visíveis permaneceram em 1.080. A restauração da sessão recuperada preservou os mapas já salvos.
4. **Tempo de exploração.** Implementado. Novas travessias com teste variam entre 30, 45 e 60 minutos. Os dois relógios persistem ao avançar, retomar e exportar. Em saves anteriores, o total é reconstruído a partir dos nodos e tentativas registrados. Quando faltam andares do histórico, o app indica **Tempo total (parcial)**.
5. **Reforço manual por criatura.** Implementado e verificado no Chrome. Disponível na ficha de um encontro pendente, inclusive em nodos de missão. Quando a ficha representa várias criaturas, o ajuste vale para todas as daquela ficha. Os bônus são reversíveis, ficam no save e não alteram ND ou XP. A Quimera mantém a ficha fixa. Se o mestre rerrolar as criaturas, as novas fichas começam com os reforços desativados.
6. **Cenas dos nodos desconhecidos.** Primeira tabela de exploração, obstáculo, descoberta e descanso falso implementada. Aplica-se às novas expedições.
7. **Continuidade de terreno e clima.** Publicada para novas expedições no commit `c992c22`. Terrenos consideram todas as entradas e o clima evolui por etapa. A geração preserva a estrutura do mapa e a restauração preserva os ambientes já salvos.
8. **Controle de PV individual.** Publicado no commit `c992c22`. As fichas de combate mantêm as anotações e as criaturas extras enquanto o app está aberto. Ver seção 16.
9. **Mecânica especial da Quimera.** A ficha integra PV compartilhados, RD, quatro cabeças, fraquezas, atordoamento e recarga do sopro. O QA no Chrome verificou a luta e a retomada por TXT. Ver seção 6.
10. **Pistas de rota.** Dar informação parcial antes da escolha, preservando o mistério do conteúdo.

### Ferramenta de variações de armadilha

A lista do combate mostra o nome narrativo quando há uma variação para a armadilha e o terreno. Na ficha, **Na cena** descreve o que o mestre pode narrar, e **Armadilha de referência** identifica a ficha de origem. A variação é derivada da seed do encontro salvo. Preserva ND, dano e seu tipo, área, resistência, detecção, desarme e posição no mapa tático. Quando falta uma variação compatível, o app mostra a ficha com o nome original.

| Referência | Variação narrativa possível |
|---|---|
| Lâmina na Parede | **Espada oculta no tronco**, em uma trilha entre árvores. Mantém o dano de corte. |
| Pêndulo de Teto | **Tronco laminado suspenso entre árvores**. A lâmina explica o dano de corte da ficha. |
| Bloco de Pedra | **Tronco que despenca da ribanceira**, em uma colina ou margem elevada. Mantém o dano de impacto. |
| Fosso com Estacas | **Fosso de estacas sob o capim** ou **fosso de estacas de punji**. Preserva a queda e o dano de perfuração da ficha. |
| Virote | **Dardo entre as folhagens** ou **Dardo da margem**, de acordo com o terreno. Mantém o dano de perfuração. |

No teste com a sessão recuperada do andar 14, o Pêndulo de Teto apareceu como **Tronco laminado do pântano** e a Lâmina na Parede como **Lâmina entre as raízes**. As fichas mantiveram os efeitos originais, os nomes se repetiram após a retomada e o estado do andar exportado coincidiu com o importado.

## 16. Controle de PV individual

O mestre pode registrar **dano**, **cura** e **desfazer o último lançamento** na ficha de combate. Cada criatura tem seus próprios PV atuais e máximos. Uma composição de três Infectos apresenta três contadores independentes sob a mesma ficha. A interface indica qual criatura recebe o lançamento antes de aplicá-lo.

O controlador está nas fichas de combate dos nodos, da exploração estendida e do gerador de encontro manual, acessível também durante o uso do arquipélago. Os PV anotados e o último lançamento para desfazer ficam disponíveis enquanto o app está aberto, inclusive ao fechar e reabrir a ficha. Ao retomar pelo autosave ou importar o TXT, os PV voltam ao máximo da ficha com os reforços salvos.

O reforço de PV soma o bônus ao atual e ao máximo, preservando o dano já sofrido. Uma criatura com **30 PV máximos e 10 restantes** passa a **40 de 60** com o reforço de **+30 PV**. Ao retirar o reforço, o controlador retira o mesmo bônus. Cada unidade mantém seu próprio dano acumulado, inclusive quando o reforço se aplica a todas as criaturas de uma ficha.

**Adicionar criatura da ficha selecionada.** O botão acrescenta uma unidade da mesma ficha. Em um encontro com dois zumbis e um rato, escolher o zumbi acrescenta um terceiro zumbi. A nova unidade começa com os PV máximos da ficha, incluindo reforço de PV se estiver ativo. As unidades existentes mantêm seus PV e lançamentos. Ao retomar pelo autosave ou importar o TXT, volta a composição gerada para o encontro, incluindo eventual rerrolagem já confirmada.

Se a criatura selecionada for alvo de uma missão de extermínio ativa no nodo, **Adicionar criatura** fica indisponível para aquela ficha. Assim, a quantidade de alvos usada para contabilizar a missão permanece a do encontro original. Outras criaturas presentes no mesmo nodo continuam elegíveis para adição.

O app apresenta o **ND de referência do nodo e os valores de XP calculados para o encontro gerado**.

**Bloqueio de rerrolagem.** O primeiro lançamento de dano ou cura, reforço ou adição manual bloqueia a rerrolagem do encontro. Desfazer um lançamento mantém o bloqueio na sessão aberta. Ao retomar, o app usa o estado salvo, incluindo os bloqueios por reforço ou progresso.

A implementação publicada registra o dano e a cura informados pelo mestre. A ficha especial da Quimera reutiliza o controle para os PV compartilhados e integra a RD 5, a fraqueza da cabeça atingida e o atordoamento. A conclusão do encontro permanece uma confirmação do mestre.

O QA no Chrome verificou a aplicação de dano e cura em unidades da mesma ficha, a adição de criaturas e o bloqueio da rerrolagem. Reabrir a ficha mantém os ajustes. Retomar pelo autosave ou pelo TXT recupera a composição salva com PV máximos. A suíte automatizada também verificou o bloqueio da adição do alvo de extermínio. A conferência no tablet físico está pendente.

## 17. Modal do nodo em tela cheia

- Em `dc8a7ce`, a ficha de combate passou a usar as mesmas dimensões do mapa tático. [Primeira publicação](https://github.com/Alkimistah/megadungeon/actions/runs/44234296015).
- Em `398a98b`, a tela cheia passou a valer para toda a modal do nodo. O cabeçalho e o rodapé ficam fixos enquanto o conteúdo central rola. Os botões para alternar entre clima e terreno e a ficha de combate, além do acesso ao mapa tático, aparecem no rodapé quando disponíveis. [Publicação da modal completa](https://github.com/Alkimistah/megadungeon/actions/runs/44235659633).
- O QA no Chrome verificou que a modal mantém as dimensões ao alternar entre as telas e que o rodapé permanece visível durante a rolagem. A conferência no tablet físico segue pendente.
