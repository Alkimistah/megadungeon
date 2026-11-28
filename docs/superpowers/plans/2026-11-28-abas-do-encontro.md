# Plano de implementação das abas do encontro

> **Para os agentes:** usar superpowers:subagent-driven-development conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`) para acompanhamento.

**Objetivo.** Separar inimigos e armadilhas em abas no componente compartilhado da lista do encontro, com um único botão de rerrolar por aba, e liberar a troca da escolta do nó de armadilha.

**Arquitetura.** Um módulo puro, `src/encounterTabs.js`, decide quais abas existem, a ordem, os rótulos e o texto do botão. O componente `createCombatPage` em `src/nodeDialog.js` deriva a aba ativa do tipo do item selecionado, por isso não há estado novo: a aba lembrada por nó vem do item lembrado por nó. O botão de rerrolar passa a ser desenhado pelo componente a partir de `options.reroll`, que o diálogo do nó e o arquipélago preenchem. A troca da escolta é uma função nova do resolvedor, no mesmo molde da troca de armadilha.

**Tecnologia.** JavaScript ESM, Node (`node --test`), DOM, Vite e Playwright.

**Spec.** [Abas do encontro](../specs/2026-11-28-abas-do-encontro-design.md). Referência visual: `tmp/previas/abas-encontro/index.html`, forma A.

## Situação

- Plano concluído em 28/11/2026. Tarefas em `d2453d4`, `1b27907` e `4806170`; correções da revisão final em `3d0d332` (trava de progresso de missão na troca da escolta, foco e semântica das abas). Suítes e QA de 11–20, 1–10 e arquipélago passaram.

## Restrições gerais

- As abas valem para todos os usos de `createEncounterCombatPage`: diálogo do nó, setores do arquipélago, exploração estendida e encontro manual.
- Mostrar só abas com conteúdo. Com um único tipo, sem barra de abas, só o título com o rótulo daquele tipo.
- Nó de armadilha (`(node.contentType || node.type) === "trap"`): ordem **Armadilha**, **Escolta**. Demais: **Inimigos**, **Armadilha**. A aba de armadilha diz "Armadilha" com um item e "Armadilhas" com mais. Cada aba mostra a contagem de itens da lista entre parênteses, como `Inimigos (2)`.
- Botão único embaixo da lista, com o texto `Rerrolar inimigos`, `Rerrolar escolta` ou `Rerrolar armadilha`, só quando a troca daquele tipo é permitida.
- Exploração estendida e encontro manual não ganham botão.
- A troca da escolta mantém a armadilha, usa o alvo `getForestEscortTarget(node.trap.challengeRating)`, só humanoides com o filtro ecológico do nó, encaixe conjunto no mapa e exclusão da combinação anterior. Sem alternativa, conserva a escolta e mostra a falha.
- Bloqueios da troca da escolta: reforço aplicado, missão vinculada, composição fixa e mapa fixo.
- Não mudar a ficha da direita, o cabeçalho de ND e XP nem as regras de composição da versão 5.
- Push e publicação só com pedido do PO.

## Foco de revisão

- Nó desconhecido ainda oculto: as abas e contagens não podem aparecer antes da descoberta (o componente só é desenhado quando `canShowCombatPage` permite; conferir que nada novo é desenhado fora dele).
- Reforço adicionado durante o combate (`Adicionar criatura`) gera item `generated`. Ele entra na aba de inimigos e na contagem, e o botão de inimigos ou de escolta some, como já acontece hoje.
- Item selecionado que deixa de existir após uma troca: a seleção cai no primeiro item da aba trocada, sem mudar de aba.
- Missão com objetivo de criatura em nó de armadilha com escolta: `canRerollNodeEscort` retorna `false`.
- Sessão restaurada após trocar a escolta: `escortRerolls` e os itens trocados voltam iguais, e o botão continua disponível.

## Arquivos e execução

| Tarefa | Arquivos de produção | Implementador | Revisor |
|---|---|---|---|
| 1 | `src/encounterTabs.js` (novo) | haiku | sonnet |
| 2 | `src/encounterResolver.js` | sonnet | opus |
| 3 | `src/nodeDialog.js`, `src/main.js`, `src/archipelagoRenderer.js`, `src/styles.css` | sonnet | sonnet |

---

### Tarefa 1 · Modelo das abas

**Arquivos:**
- Criar: `src/encounterTabs.js`
- Teste: `scripts/encounterTabs.test.mjs`

**Interfaces:**
- Produz: `getEncounterTabs(node) -> Array<{ kind: "creature" | "trap", label: string, count: number }>`, em ordem, só com tipos presentes em `node.resolvedEncounter.items` (o tipo de cada item está em `item.kind`).
- Produz: `getEncounterRerollLabel(node, kind) -> string`.
- Produz: `isTrapNode(node) -> boolean`, igual a `(node.contentType || node.type) === "trap"`.

- [x] **Passo 1: escrever o teste que falha.** Em `scripts/encounterTabs.test.mjs`, com nós literais:

```js
const items = (...kinds) => kinds.map(kind => ({ kind, quantity: 1 }));
// normal com duas criaturas e uma armadilha
assert.deepEqual(getEncounterTabs({ type: "normal", resolvedEncounter: { items: items("creature", "creature", "trap") } }),
  [{ kind: "creature", label: "Inimigos", count: 2 }, { kind: "trap", label: "Armadilha", count: 1 }]);
// normal sem armadilha
assert.deepEqual(getEncounterTabs({ type: "normal", resolvedEncounter: { items: items("creature") } }),
  [{ kind: "creature", label: "Inimigos", count: 1 }]);
// nó de armadilha com escolta, inclusive desconhecido revelado
assert.deepEqual(getEncounterTabs({ type: "unknown", contentType: "trap", resolvedEncounter: { items: items("creature", "trap") } }),
  [{ kind: "trap", label: "Armadilha", count: 1 }, { kind: "creature", label: "Escolta", count: 1 }]);
// armadilha sozinha
assert.deepEqual(getEncounterTabs({ type: "trap", resolvedEncounter: { items: items("trap") } }),
  [{ kind: "trap", label: "Armadilha", count: 1 }]);
// duas armadilhas
assert.equal(getEncounterTabs({ type: "normal", resolvedEncounter: { items: items("creature", "trap", "trap") } })[1].label, "Armadilhas");
// sem itens
assert.deepEqual(getEncounterTabs({ type: "normal", resolvedEncounter: { items: [] } }), []);
assert.equal(getEncounterRerollLabel({ type: "normal" }, "creature"), "Rerrolar inimigos");
assert.equal(getEncounterRerollLabel({ type: "trap" }, "creature"), "Rerrolar escolta");
assert.equal(getEncounterRerollLabel({ type: "trap" }, "trap"), "Rerrolar armadilha");
assert.equal(getEncounterRerollLabel({ type: "elite" }, "trap"), "Rerrolar armadilha");
```

- [x] **Passo 2: rodar e ver falhar.** `node --test scripts/encounterTabs.test.mjs`. Esperado: falha de importação de `src/encounterTabs.js`.
- [x] **Passo 3: implementar** as três funções em `src/encounterTabs.js`, sem dependências de DOM.
- [x] **Passo 4: rodar e ver passar.** `node --test scripts/encounterTabs.test.mjs`. Esperado: todos passam.
- [x] **Passo 5: incluir o teste em `test:ecology`** no `package.json` (é a suíte de encontros que roda no fluxo) e rodar `npm run test:ecology`.
- [x] **Passo 6: commit** `feat: define as abas do encontro`.

### Tarefa 2 · Troca da escolta

**Arquivos:**
- Modificar: `src/encounterResolver.js` (perto de `resolveForestTrapNode`, linha ~577, e de `rerollNodeTrap`, linha ~874)
- Teste: `scripts/escortReroll.test.mjs`

**Interfaces:**
- Consome: `getEscortGroups(catalog, target, ecology)`, `encounterFitsMap(node, layout, profileId, seed, items, count, objectives)`, `getForestEscortTarget` (de `src/traps.js`), `getTrapSummary`, `getCreatureComposition`, `hasEncounterAdjustments` e `pickEcologyWeighted`, todos já existentes.
- Produz: `canRerollNodeEscort(node) -> boolean`.
- Produz: `rerollNodeEscort(node, profile, { tacticalLayout = node.tacticalLayout, objectives } = {}) -> resolvedEncounter | null`. O retorno é `{ ...encounter, escortRerolls, items }`, com as criaturas novas seguidas dos itens que não são criatura, na ordem original.

- [x] **Passo 1: escrever o teste que falha.** Em `scripts/escortReroll.test.mjs`, obter um nó v5 de armadilha com escolta por sementes fixas, reaproveitando a forma como `scripts/forestNodeTraps.test.mjs` monta esses nós. Casos:
  - `canRerollNodeEscort(nodeComEscolta) === true` e `canRerollNodeCreatures(nodeComEscolta) === false`.
  - Depois de `rerollNodeEscort`, o item de armadilha é `deepEqual` ao original. A composição das criaturas difere da original, `calculateCombatND(criaturasNovas) === getForestEscortTarget(node.trap.challengeRating)`, esse valor é menor que `node.trap.challengeRating`, todas as criaturas são `type === "humanoid"` e `escortRerolls === 1`.
  - Determinismo: duas chamadas sobre cópias iguais do nó dão o mesmo resultado. Uma segunda troca sobre o resultado usa `escortRerolls === 2`.
  - Ida e volta por `JSON.parse(JSON.stringify(encounter))` preserva `escortRerolls` e os itens.
  - Sem alternativa: com um perfil de teste cujo catálogo humanoide só fecha uma combinação para o alvo, o retorno é `null`.
  - `canRerollNodeEscort` é `false` para: nó de armadilha sem escolta, encontro com reforço (`hasEncounterAdjustments` verdadeiro), `missionBindings` não vazio, `missionObjectives` não vazio, `fixedComposition`, `fixedTacticalMap` e nó normal com criaturas.
- [x] **Passo 2: rodar e ver falhar.** `node --test scripts/escortReroll.test.mjs`. Esperado: falha porque `rerollNodeEscort` não é exportado.
- [x] **Passo 3: implementar.**
  - Extrair de `resolveForestTrapNode` o catálogo humanoide filtrado pela ecologia em `getForestEscortCatalog(node, profile) -> { catalog, ecology }`, usado pelas duas funções, sem mudar o comportamento da resolução.
  - Usar a semente `${encounter.seed}:escort-reroll:${escortRerolls}`.
  - Retirar dos grupos o que tiver a mesma `getCreatureComposition` da escolta atual.
  - Sortear com `pickEcologyWeighted` sem repetir grupos.
  - Aceitar o primeiro que passar em `encounterFitsMap` com `[...grupo.items, getTrapSummary(node.trap)]`, `encounter.seed` e `objectives`.
- [x] **Passo 4: rodar e ver passar.** `node --test scripts/escortReroll.test.mjs scripts/forestNodeTraps.test.mjs scripts/trapReroll.test.mjs`. Esperado: todos passam, e `forestNodeTraps` mostra que a resolução não mudou.
- [x] **Passo 5: incluir o teste em `test:ecology`** e rodar `npm run test:ecology` e `npm run test:floors-11-20`.
- [x] **Passo 6: commit** `feat: permite rerrolar a escolta do nó de armadilha`.

### Tarefa 3 · Abas no componente e botão único

**Arquivos:**
- Modificar: `src/nodeDialog.js`: `createEncounterList` (~444), `getFirstEncounterItemKey` (~816), `createCombatPage` (~822), `renderCombatPage` (~1048) e as opções do controlador (~855–872).
- Modificar: `src/main.js`: opções do controlador (~307 e ~352–368).
- Modificar: `src/archipelagoRenderer.js`: `createIslandEncounter` (~112–150).
- Modificar: `src/styles.css`: estilos das abas, perto de `.encounter-list-panel` (~2408); remover `.archipelago-reroll-footer` (~4610–4630) se não sobrar uso.
- QA: `scripts/qaForestMvp.mjs` e o script de QA que já abre um encontro de setor do arquipélago (localizar com `grep -l archipelago scripts/qa*.mjs`).

**Interfaces:**
- Consome: `getEncounterTabs`, `getEncounterRerollLabel` (tarefa 1); `canRerollNodeEscort`, `rerollNodeEscort` (tarefa 2).
- Produz: a opção `options.reroll` de `createCombatPage` / `createEncounterCombatPage`, no formato `{ creature?: RerollAction, trap?: RerollAction, status?: string }`, com `RerollAction = { run: () => boolean, failure: string }`. O componente desenha o botão da aba ativa com `data-encounter-reroll="<kind>"`, a classe `extended-action is-compact` e o texto de `getEncounterRerollLabel`, dentro de `.encounter-reroll-actions`, no fim do painel da lista. Logo abaixo fica `<p class="node-dialog-meta encounter-reroll-status" role="status">` com `status`. Se `run()` retornar `false`, o componente escreve `failure` no status. Se retornar `true`, quem chamou redesenha e passa a mensagem de sucesso em `status`.
- Produz: no controlador do diálogo, `canRerollEscort(node)` e `onRerollEscort(node, context) -> boolean`, ao lado de `canRerollCreatures` e `onRerollTrap`.

- [x] **Passo 1: escrever as asserções de QA que falham** em `scripts/qaForestMvp.mjs`:
  - **Trocar os rótulos antigos:** `"Rerrolar criaturas"` vira `"Rerrolar inimigos"`. O cenário incidental passa a clicar na aba `Armadilha` antes de `Rerrolar armadilha` e confere que há um só botão em `.encounter-reroll-actions` por aba.
  - **Nó de armadilha com escolta:** a `tablist` tem as abas `Armadilha (1)` e `Escolta (n)` nessa ordem. Clicar em `Escolta` mostra `Rerrolar escolta`; clicar nele mostra o status `Escolta atualizada com o mesmo ND.` No save exportado, `escortRerolls === 1` e o item de armadilha não muda. Após restaurar, a aba `Escolta` continua com `Rerrolar escolta`.
  - **Normal sem armadilha:** não há `role="tablist"` e o título do painel é `Inimigos`.
  - **Armadilha sozinha:** não há `role="tablist"` e o título é `Armadilha`.
  - **Arquipélago:** no script do arquipélago, o encontro do setor mostra `Rerrolar inimigos` na aba de inimigos, e não há mais `Rerrolar criaturas`.
- [x] **Passo 2: rodar e ver falhar.** `npm run dev` em segundo plano e depois `QA_APP_URL=http://localhost:5173/megadungeon/ npm run qa:floors-11-20`. Esperado: falha em `Rerrolar inimigos` ou na `tablist`.
- [x] **Passo 3: implementar o componente.**
  - **Aba ativa:** é o `kind` do item selecionado. `getFirstEncounterItemKey` passa a devolver o primeiro item da primeira aba de `getEncounterTabs`.
  - **Barra de abas:** com mais de uma aba, desenhar uma barra com `role="tablist"` e botões `role="tab"` com `aria-selected`, no lugar do título "Combate". Clicar numa aba chama `onSelect` com a chave do primeiro item daquele tipo.
  - **Uma aba só:** o título é o rótulo da aba, sem contagem.
  - **Lista:** a linha de orçamento continua logo depois do título ou da barra. A lista mostra só os itens da aba ativa.
  - **Estilo:** seguir a forma A da prévia, com abas encostadas na borda de baixo, aba de armadilha com o tom alaranjado de `.encounter-list-item.is-trap` e a contagem com opacidade menor.
- [x] **Passo 4: ligar o diálogo do nó.**
  - **Ações:** `renderCombatPage` passa `options.reroll` em vez de montar os botões. `creature` usa a troca da escolta quando `canRerollEscort(node)` e a troca de inimigos quando `canRerollCreatures(node)`; `trap` usa `canRerollTrap`.
  - **Mensagens:** sucesso `Criaturas atualizadas com o mesmo ND.`, `Escolta atualizada com o mesmo ND.` e `Armadilha atualizada com o mesmo ND.`; falha `Nenhuma outra composição compatível foi encontrada.`, `Nenhuma outra escolta compatível foi encontrada.` e `Nenhuma outra armadilha com o mesmo ND foi encontrada.`
  - **Após a troca:** selecionar o primeiro item do tipo trocado e devolver o foco ao botão.
  - **`main.js`:** acrescentar `canRerollEscort: node => isPendingForestEncounter(node) && canRerollNodeEscort(node)`. `onRerollEscort` chama `rerollNodeEscort(node, activeFloorRange, context)`, grava `node.resolvedEncounter` e chama `refreshExplorationDisplay()`, como `onRerollTrap`. O contexto é `{ tacticalLayout: node.tacticalLayout, objectives: getTacticalObjectives(node) }`.
- [x] **Passo 5: ligar o arquipélago.** `createIslandEncounter` passa `options.reroll.creature` (com as mesmas condições `onReroll && canReroll(scene)`) e `status` após a troca, em vez de anexar `.archipelago-reroll-footer`. O botão fica embaixo da lista, como no diálogo do nó, para manter um só visual.
- [x] **Passo 6: rodar o QA e ver passar.** `QA_APP_URL=http://localhost:5173/megadungeon/ npm run qa:floors-11-20`, o script de QA do arquipélago e `npm run qa:floors-1-10`, que cobre a exploração estendida. Esperado: todos passam sem erros de JavaScript. Encerrar o servidor.
- [x] **Passo 7: rodar as suítes.** `npm run test:ecology`, `npm run test:floors-11-20`, `npm run test:archipelago`, `npm run test:floors-1-10` e `npm run build`. Esperado: todas passam.
- [x] **Passo 8: commit** `feat: separa inimigos e armadilhas em abas no encontro`.
