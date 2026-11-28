# Plano de implementação da estrutura dos nós da floresta

> **Para os agentes:** usar superpowers:subagent-driven-development conforme o processo do projeto. Registrar os passos nas caixas abaixo e aplicar o fluxo de implementação, revisão e ledger de `docs/superpowers/processo-de-trabalho.md`.

**Objetivo.** Dar aos nós da floresta regras próprias de composição e mostrar as parcelas de ND e XP no cabeçalho.

**Arquitetura.** O perfil define as regras por tipo e o gerador aplica essas regras aos nós da versão 5. O resolvedor atual compõe criaturas e armadilhas dentro das regras gravadas no nó. O diálogo lê o desafio planejado até a resolução e passa a mostrar as parcelas efetivas quando houver itens resolvidos.

**Tecnologia.** JavaScript ESM, Node, DOM, Vite e Playwright.

**Design.** [Estrutura do nó da floresta](../specs/2026-11-27-floresta-estrutura-do-no-design.md).

## Retomada

- As cinco tarefas estão implementadas e as suítes e o QA passaram. Falta a revisão final de todo o conjunto da branch.
- O PO aprovou os 35 modos dos [cartões](../specs/2026-11-27-floresta-armadilhas-cartoes.md). Amostra final da tarefa 5, com sementes fixas: 642 armadilhas incidentais em 3.356 combates normais procedurais (19,13%, diferença de -0,87 ponto frente aos 20% de tentativa).
- A geração de novas expedições da floresta usa a versão 5; expedições salvas anteriores seguem restauradas como estão.

## Restrições gerais

- A versão 5 vale para novas expedições dos andares 11 a 20. Ativar somente na última tarefa. Preservar o formato de expedição e a versão dos encontros já resolvidos.
- Manter o fluxo atual para encontro manual, exploração estendida, restauração de mapas antigos e outras faixas. Preservar as cenas escritas, guardiões, mapas fixos e substituições por missões.
- Usar `calculateCombatND` para grupos. A armadilha incidental e o ambiente ficam fora do orçamento de criaturas.
- Exibir `Ambiente · ND ½ · 500 XP`, com os rótulos equivalentes para criaturas e armadilha. Usar 1.000 XP por ND, sem frase condicional e sem total automático de XP.
- Registrar os 35 modos com base na regra de cada ficha e submetê-los ao PO antes de alimentar o gerador.
- Rodar a verificação de cada tarefa antes do commit. Mostrar ao PO o resultado da primeira tarefa conforme o processo do projeto. Push e publicação seguem autorização própria.

## Foco de revisão

- Tarefa 1. O cabeçalho de um nó desconhecido ainda oculto deve preservar o mistério mesmo se o encontro já tiver sido calculado.
- Tarefa 2. Uma ficha ND ¼ dependente de escolta precisa continuar disponível como incidental em combate normal.
- Tarefa 3. Uma troca de armadilha pode ocupar espaço antes livre. Validar o encaixe e preservar o encontro anterior se a troca falhar.
- Tarefa 4. Quando o catálogo filtrado não fecha um elite dentro do alvo, a saída precisa respeitar a ecologia e aparecer com o tipo efetivo no mapa.
- Tarefa 5. Restauração deve diferenciar expedições antigas, encontros novos e rerrolagens já gravadas sem recalcular mapas ou aplicar XP de uma composição anterior.

## Arquivos e execução

| Tarefa | Arquivos de produção | Implementador | Revisor |
|---|---|---|---|
| 1 | `src/challenge.js`, `src/nodeDialog.js` | sonnet | sonnet |
| 2 | `src/floorProfiles/forest11to20.js`, `src/traps.js`, `src/generator.js` | sonnet | opus |
| 3 | `src/creatures.js`, `src/encounterResolver.js`, `src/traps.js`, `src/generator.js` | opus | opus |
| 4 | `src/encounterResolver.js`, `src/encounterGroupComposition.js`, `src/generator.js` | opus | opus |
| 5 | `src/forestExpedition.js`, `src/missions/forestMissionIntegration.js`, `src/appState.js`, `src/main.js` se necessário na passagem do contexto tático | sonnet | opus |

### Tarefa 1 · Parcelas de desafio e cabeçalho

**Interface.** Nó v5 tem `node.generationVersion = 5`. `getForestChallengeParts(node)` em `src/challenge.js` retorna `{ environment, creatures, trap }` ou `null` para nó legado ou cena com ND próprio ainda sem parcelas aplicáveis. `updateForestChallengeTotal(node, rules)` soma as parcelas planejadas e aplica os limites do perfil, preservando o cálculo das cenas próprias. `challenge.creatures` é o alvo de composição, enquanto o leitor das parcelas usa os itens quando resolvidos.

- [x] Em `scripts/forestNodeChallenge.test.mjs`, testar `{ environment: 0.5, creatures: 3, trap: 1 }` e total `4.5`. Adicionar grupo resolvido de ND 2 sobre alvo 3, composição fixa com duas armadilhas e falso descanso antes e depois da emboscada. Confirmar que um nó legado retorna `null`.
- [x] Executar `node --test scripts/forestNodeChallenge.test.mjs` e confirmar falha por interface ausente.
- [x] Implementar as interfaces. Preservar clima e terreno como campos individuais. No `setNodeDialogMeta`, mostrar as três parcelas quando reveladas e disponíveis, usando a formatação de ND e XP existente. Usar a apresentação anterior nas cenas com ND próprio e em nós legados. Preservar zeros nas parcelas ausentes e o comportamento de valores especiais.
- [x] Em `scripts/qaForestMvp.mjs`, preparar o cenário v5 de cabeçalho da tarefa 5 com asserções para `500 XP`, `3.000 XP` e `1.000 XP`, ausência de frase condicional, e nó oculto que ainda não exibe parcelas.
- [x] Rodar o teste unitário e `npm run test:ecology`. Registrar a primeira entrega e mostrar o resultado ao PO.
- [x] Commit `feat: separa as parcelas de desafio da floresta`.

### Tarefa 2 · Modos de armadilha e combate normal

**Interface.** Cada entrada de `trapCatalog` ganha `mode: "standalone" | "requiresEscort"`. `getEligibleForestTraps(profile, { maximumChallenge, mode })` em `src/traps.js` filtra por fonte, teto de ND e modo opcional; sem candidatos retorna `[]`. `assignForestNormalTrap(node, profile, rng)` atribui um item incidental e atualiza a parcela de armadilha; mantém `challenge.creatures` igual ao alvo do andar.

- [x] Preparar os 35 cartões de revisão a partir de `src/traps.js`, com fonte e página, ND, efeito decisivo, modo e justificativa. Identificar casos mistos pelo efeito que sustenta o desafio. Submeter os cartões ao PO e incorporar suas decisões antes de gravar os modos.
- [x] Em `scripts/forestNodeTraps.test.mjs`, testar 35 modos, rede ND ¼ como `requiresEscort`, fosso camuflado como `standalone`, sorteios nos extremos do limiar de 20%, rede incidental, ausência de candidato e alvo da criatura igual ao ND do andar de 1 a 5.
- [x] Rodar `node --test scripts/forestNodeTraps.test.mjs` e confirmar a falha nova.
- [x] Cadastrar os modos aprovados. Em `forest11to20.js`, registrar chance `0.2` e o teto `Math.max(0.25, floorTarget - 1)` para armadilha normal. Em `traps.js`, reutilizar seleção ponderada por proximidade entre candidatos elegíveis. No fluxo v5 do gerador, marcar o nó antes de atribuir parcelas e aplicar a regra normal ao tipo efetivo. Atualizar a descrição da armadilha incidental v5 para acompanhar a regra nova.
- [x] Rodar `node --test scripts/forestNodeTraps.test.mjs scripts/trapReroll.test.mjs` e `npm run test:floors-11-20`. Medir a incidência em sementes fixas na tarefa 5.
- [x] Commit `feat: classifica armadilhas e preserva o ND do combate normal`.

### Tarefa 3 · Nó de armadilha e escolta humanoide

**Interface.** `getForestEscortTarget(trapChallenge)` em `src/traps.js` retorna `0` para ND ¼ e os demais alvos da tabela do design. Em `src/encounterResolver.js`, `resolveForestTrapNode(node, profile, { seed, tacticalLayout })` retorna `{ trap, items, creatureTarget }`, usando o sorteio do catálogo da tarefa 2. `items` contém as criaturas escolhidas e `trap` contém a armadilha principal com seu papel. `rerollNodeTrap` recebe um terceiro argumento opcional `{ tacticalLayout }`, mantendo o retorno existente.

- [x] Em `scripts/forestNodeTraps.test.mjs`, testar a tabela completa da escolta e os cenários com armadilha ND 3 e grupo humanoide ND 1, armadilha ND ¼ com escolta impossível, escolta obrigatória sem criatura compatível, e escolta opcional inviável. Verificar que um nó solitário rejeita na rerrolagem armadilha que exige escolta, e que a falta de espaço após a troca preserva o resultado anterior.
- [x] Rodar o teste e confirmar falhas nas regras de escolta.
- [x] Implementar seleção por ND real da armadilha, com chance de escolta de `0.25` para as autônomas elegíveis. Tentar combinações em ordem ponderada e reproduzível, sem repetir candidatas inviáveis. Quando a escolta opcional falhar, conservar a armadilha. Quando a obrigatória falhar, avançar no sorteio de armadilhas, mantendo o teto.
- [x] Aproveitar o filtro ecológico e a verificação de grade do resolvedor com a armadilha proposta e as criaturas. Bloquear a rerrolagem que não cabe ou que muda o papel, ND ou exigência de escolta do encontro. Usar a composição viável na atribuição do nó v5 e conservar sua identidade para reaplicar as regras na resolução e rerrolagem.
- [x] Rodar `node --test scripts/forestNodeTraps.test.mjs scripts/trapReroll.test.mjs scripts/forestTacticalLayouts.test.mjs`.
- [x] Commit `feat: gera escolta humanoide nos nós de armadilha`.

### Tarefa 4 · Elite com criatura principal

**Interface.** `resolveForestElite(node, profile, { seed, tacticalLayout })` em `src/encounterResolver.js` retorna `{ items, trap, creatureTarget, effectiveType }` para composições viáveis. O gerador grava a variante e os alvos efetivos, usados pelo resolvedor e pela rerrolagem. Os dois resolvedores procedurais recebem uma semente derivada da geração do mapa e do nó para evitar repetir a composição entre mapas que compartilham o mesmo ID local. A busca normal continua disponível como saída para nós convertidos.

- [x] Em `scripts/forestElite.test.mjs`, testar para E = 7 os grupos `6 + 5` e `6 + armadilha 1`, a saída de principal única ND 7, a preferência por ND viável abaixo de 7 e a conversão para normal em cenário sem elite viável. Testar única principal com o maior ND individual, teto de ND e rerrolagens dentro da variante, inclusive armadilha sempre autônoma.
- [x] Rodar `node --test scripts/forestElite.test.mjs` e confirmar a falha por função ausente.
- [x] Implementar a busca partindo de principal E−1, com chance de `0.1` de tentar primeiro a variante de armadilha. A outra variante usa auxiliares cujo grupo fecha E por `calculateCombatND`. Se ambas falharem, testar principal única E e descer até a melhor composição viável. Reaproveitar o filtro de ecologia, os candidatos de grupo e a grade. Respeitar a apresentação de desconhecido e mostrar o tipo efetivo normal quando a saída mudar a composição.
- [x] Reaplicar a mesma variante e o orçamento na rerrolagem, inclusive ao avaliar o espaço conjunto com a armadilha existente. Conservar a composição quando não houver alternativa. Verificar as cinco faixas de alvos de elite, de 3 a 7, em uma amostra determinística por ambiente e registrar as saídas utilizadas.
- [x] Rodar `node --test scripts/forestElite.test.mjs scripts/groupCompositionChallenge.test.mjs scripts/tacticalEnemyArea.test.mjs` e `npm run test:ecology`.
- [x] Commit `feat: compõe elites da floresta com uma criatura principal`.

### Tarefa 5 · Missões, reabertura e ativação da versão 5

**Interface.** `prepareForestExpedition` cria novas expedições com `generationVersion: 5`. `restoreForestExpedition` conserva o mapa serializado. Missões de combate testam capacidade contra `challenge.creatures` nos nós v5 e mantêm a leitura anterior em mapas legados.

- [x] Em `scripts/validateForestMvp.test.mjs`, acrescentar uma expedição anterior à versão 5 e verificar que a restauração preserva nó, alvo e encontro resolvido. Acrescentar um ciclo v5 com missão que substitui criaturas e remove armadilha, outro ciclo com armadilha rerrolada, e sementes fixas para medir incidência. A incidência conta somente combates normais procedurais, inclusive revelações de desconhecidos, e informa numerador, denominador e diferença frente aos 20% de tentativa.
- [x] Rodar `npm run test:floors-11-20` e confirmar a falha das novas expectativas de ativação.
- [x] Em `forestMissionIntegration.js`, usar a parcela de criaturas v5 na elegibilidade e capacidade e atualizar o agregado ao fixar a composição. Confirmar que a restauração e `syncRerolledTrapProfile` leem a variante e as parcelas do nó salvo. Passar o contexto tático na rerrolagem pelo ponto de entrada em `main.js` se a grade disponível no diálogo exigir esse contexto.
- [x] Ativar `GENERATION_VERSION = 5`. Verificar a amostra por faixa e ambiente, campos ocultos e expedições com missões e guardiões. Evitar depender de sorte durante os testes usando sementes fixas.
- [x] Rodar `npm run test:floors-11-20`, `npm run test:floors-1-10`, `npm run test:missions`, `npm run test:ecology`, os três testes novos e `npm run build`. Rodar `npm run qa:floors-11-20` sobre `npm run dev`, com `QA_APP_URL=http://localhost:5173/megadungeon/` quando a porta padrão estiver disponível. Conferir as novas asserções de cabeçalho e mistério da tarefa 1.
- [x] Commit `feat: ativa a geração v5 nas novas expedições da floresta`. Solicitar revisão final de todo o conjunto e verificar novamente as alterações decorrentes da revisão.
