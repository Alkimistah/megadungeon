# Revisão da grade tática — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Objetivo.** Migrar as grades das três faixas para um tabuleiro em camadas, com peças móveis e coerência entre cenário, ficha, mapa e legenda.

**Arquitetura.** Os geradores atuais passam a compor uma cena estruturada. A apresentação e o estado transitório das peças ficam no renderizador e no fluxo ativo de jogo. Reter a leitura dos formatos anteriores durante a migração.

**Tecnologia.** JavaScript, DOM, CSS, eventos de ponteiro, atlas raster em pixel art, Node e Playwright.

**Design.** [Revisão da grade tática](../specs/2026-11-23-grade-tatica-design.md).

## Restrições gerais

- Preservar sementes, layouts, objetivos, dificuldade, composição e regras de conclusão dos encontros. Corrigir a representação tática quando divergir da ficha.
- Usar posição, largura e altura em células. Manter peças inteiras no tabuleiro e permitir sobreposição e soltura livre dentro dele.
- Conservar o estado temporário ao recolher o mapa e consultar fichas ou alterar PV. Descartá-lo ao abrir outro encontro, importar ou recarregar. Reconstruir posições iniciais válidas com os dados disponíveis no save.
- A configuração do grupo afeta a formação inicial. Mapas-base por ambiente ficam para uma iniciativa futura.

## Casos de revisão

1. Tempestade sem armadilha, floresta com submersão global e submersão localizada são três casos independentes e têm provas na tarefa 2.
2. Um encontro rerrolado ou com criatura adicionada deve atualizar as peças com identidade estável. A tarefa 4 cobre a reconciliação.
3. Salvar no meio do encontro, importar um save antigo e alternar entre dois encontros têm provas na tarefa 4.
4. Monstros de 3×3 ou 6×6, inclusive perto de uma borda, e sobreposição por toque têm provas na tarefa 3.
5. Objetivos vinculados a criatura e objetivos fixos precisam manter comportamento distinto, coberto pela tarefa 4.

## Tarefa 1. Cena e catálogo visual

**Arquivos.** Criar `src/tacticalScene.js`, `src/tacticalTerrain.js`, o atlas em `public/assets/` e `scripts/tacticalScene.test.mjs`. Usar a prévia como referência visual e levar sua arte para o app, mantendo os ajustes de estilos em `src/styles.css`.

**Interface.** `createTacticalScene({ width, height, terrain, features, markers, pieces, climate })` recebe terreno na ordem das células. Efeitos e marcadores têm tipo e células identificáveis. Peças têm `id`, `name`, `side`, `x`, `y`, `width` e `height`. Um marcador usa células fixas ou `pieceId`. `getTacticalFootprint(size)` retorna a largura e altura do porte. `readLegacyTacticalScene(tacticalMap)` adapta células antigas e suas marcações quando só o formato legado está disponível.

- [ ] Testar que efeitos e peças podem compartilhar células sem destruir o terreno, que o adaptador mantém dimensões e coordenadas antigas e que os seis portes retornam lados 1, 1, 1, 2, 3 e 6.
- [ ] Implementar contrato e atlas. Cobrir os 22 terrenos e as sobreposições já vistas na prévia. Acrescentar representações de gelo, rio congelado, abismo, paredão, seixos, dunas e inclinações suave e íngreme. Diferenciar o que muda por regra, conforme o Livro Básico, pp. 268–269.
- [ ] Rodar `node --test scripts/tacticalScene.test.mjs` e incluir o atlas no build offline já usado pelo app.

## Tarefa 2. Geradores e coerência

**Arquivos.** `src/nodeTacticalMap.js`, `src/extendedExplorationState.js`, `src/archipelagoTacticalMap.js`, `src/archipelagoBoatAmbush.js`, `src/missions/missionTacticalMap.js` e testes de geração existentes. Conferir `src/environment.js` e `src/floorProfiles/forest11to20.js` para efeitos descritos. Preservar formatos públicos usados por consumidores antigos até a troca na tarefa 4.

**Interface.** Cada ponto que gera um mapa fornece a cena da tarefa 1. Usar o mesmo identificador de elemento localizado ao montar área, texto e legenda. Representar como dados separados a profundidade da água, efeitos que coexistem com a água e a localização dos obstáculos.

- [ ] Criar casos de regressão com sementes fixas. Floresta com chuva e submersão global tem água profunda em toda a base e na formação inicial, mantém árvores previstas e leva a chuva ao cabeçalho. Zona localizada mantém a base original fora dela. Tempestade sem armadilhas produz zero marcadores de armadilha. Incluir penhasco separado de fosso e margem rasa separada de canal fundo.
- [ ] Modificar os geradores tomando a definição do cenário como fonte de terreno e efeitos. Construir a base, registrar efeitos e marcadores e só então posicionar peças. Nos layouts atuais, conservar as áreas válidas e corrigir os elementos sem correspondência na ficha. Tratar ambiente e condição global separadamente, inclusive quando o ambiente é Floresta.
- [ ] Auditar os elementos táticos atuais e relacionar cada descrição localizada à sua representação. Corrigir as divergências encontradas. Aplicar gelo, rio congelado, abismo, paredão, seixos, dunas e inclinações distintas quando previstos, preservando regras e pesos de cenários alheios a esses elementos. Comparar o texto de submersão do app com a regra básica, que inclui testes de natação e restrição à fala.
- [ ] Rodar `npm run test:floors-1-10`, `npm run test:floors-11-20`, `npm run test:archipelago`, `npm run test:archipelago-missions` e `npm run test:missions`.

## Tarefa 3. Renderizador compartilhado e interação

**Arquivos.** `src/tacticalMapRenderer.js`, `src/styles.css` e `scripts/qaTacticalScene.mjs`.

**Interface.** O painel e a tela cheia recebem a cena e o mesmo estado do encontro. O estado expõe a seleção e as operações para mover, adicionar e remover peças por identidade. Os eventos de ponteiro e teclado chamam as mesmas operações.

- [ ] Testar arraste com mouse e toque, mover por setas, seleção de peça 3×3 e 6×6 perto da borda e sobreposição em obstáculo, água e outra peça. Verificar terreno e marcadores ainda identificáveis, nome completo na seleção e arte circular com contorno quadrado.
- [ ] Renderizar terreno, efeitos, marcadores e tokens em camadas alinhadas, com sprites e amostras equivalentes na legenda. Validar toque em viewport de tablet. Usar abreviações como RT, D1/D2 e LI, numerar abreviações repetidas no mesmo lado e mostrar o lado das invocações.
- [ ] Testar o painel e a tela cheia com a mesma disposição de peças e validar o atlas no build de produção.

## Tarefa 4. Integração, sessões e validação

**Arquivos.** `src/main.js`, `src/nodeDialog.js`, `src/extendedExplorationRenderer.js`, `src/archipelagoRenderer.js`, `src/missions/missionDialog.js`, `src/encounterCreatureHealth.js` e pontos de configuração e serialização que esses fluxos já usam. Acrescentar os casos de navegação a `scripts/qaTacticalScene.mjs`.

- [ ] Integrar a criação do estado transitório à abertura do encontro, com identidade estável de cena e das unidades. Reutilizá-lo ao abrir a grade novamente, alterar PV ou alternar entre apresentação normal e expandida. Ao rerrolar ou adicionar criatura na ficha, reconciliar as unidades presentes e suas peças. Vincular objetivos de caçada à peça e objetivos de localização às células.
- [ ] Colocar a quantidade de jogadores na configuração da fase e refletir esse valor só no tabuleiro. Permitir adicionar e remover peças temporárias aliadas e inimigas de acordo com o design.
- [ ] Testar a mesma disposição após recolher, alterar PV e reabrir. Abrir B e voltar a A deve restaurar A às posições iniciais. Exportar durante o combate e importar deve restaurar a formação inicial sem invocações temporárias. Repetir a importação com um arquivo anterior à migração.
- [ ] Executar o QA nos fluxos de encontro dos andares 1–10 e 11–20, setor, arena, liburna e mapa de missão. Rodar `npm run build` e `git diff --check`. Revisar o resultado contra o design antes da entrega.
