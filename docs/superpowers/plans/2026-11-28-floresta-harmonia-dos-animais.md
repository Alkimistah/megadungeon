# Plano de implementação da harmonia dos animais da floresta

> **Para os agentes:** usar superpowers:subagent-driven-development conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`). Os títulos das tarefas usam "Task N" para as ferramentas do processo.

**Objetivo.** Nos combates procedurais de animais da floresta (andares 11–20), sortear só animais das comunidades do terreno do nó, com de 1 a 3 fichas e versão melhorada dentro da família, a partir da geração 6.

**Arquitetura.** Um módulo puro, `src/forestAnimalCommunities.js`, recebe catálogo, comunidades e alvo e devolve um grupo. O resolvedor usa esse módulo nos nós `generationVersion >= 6` cujo tipo é animal: no combate normal, na principal e nos auxiliares do elite e na rerrolagem. O gerador só atribui o tipo animal quando alguma comunidade do terreno fecha o alvo. Os dados (família por animal, terrenos revistos e comunidades) entram depois da revisão do PO em cartões. A geração 6 só é ativada na última tarefa.

**Tecnologia.** JavaScript ESM, Node (`node --test`), Vite e Playwright.

**Spec.** [Harmonia dos animais da floresta](../specs/2026-11-28-floresta-harmonia-dos-animais-design.md).

## Retomada

- Tasks 1 e 2 concluídas e aprovadas em revisão (`747277d`, `aea5030`, `ddb79b8`, `71d26c1`). A geração 6 existe, mas `GENERATION_VERSION` continua 5 e nenhuma expedição usa a regra nova.
- O PO aceitou a escolha preguiçosa do grupo, que gera mais variedade entre os animais.
- Ruling registrado: na v6, animais em combates de outros tipos também precisam ser de uma comunidade do terreno do nó.
- A Task 3 foi interrompida a pedido do PO, por falta de tokens. Recomeçar pelo brief, conferindo antes se ficou rascunho parcial em `recursos/ecologia/harmonia-rascunho.json` ou em `tmp/previas/harmonia-animais/`.
- Depois da Task 3, parar para as decisões do PO nos cartões. Em seguida vêm as Tasks 4 e 5.
- Na Task 5, conferir com os dados reais a frequência de elites com animal principal (com dados de teste caiu de 33/291 para 8/291).

## Restrições gerais

- A regra vale para novas expedições da floresta, sob `generationVersion` 6. A versão 6 herda todo o comportamento da 5: as checagens `generationVersion === 5` passam a `>= 5`, e o comportamento novo fica atrás de `>= 6`. Expedições v5 e encontros já resolvidos não mudam.
- Só os animais mudam. Monstros, espíritos, mortos-vivos, construtos, humanoides e a escolta humanoide seguem a regra atual.
- Um animal entra quando sua família (`ecology.family`) está na comunidade sorteada e ele tem a etiqueta do terreno do nó (`terrainTagsByName` do perfil).
- Cada comunidade tem `maxSheets` de 1 a 3. Três é limite, não alvo.
- A versão melhorada usa `createEliteVariant` (Criação e Modificação de Ameaças, pp. 11–12) e conta como uma das fichas.
- Os grupos fecham o alvo por `calculateCombatND` e cabem no mapa tático.
- O resultado é determinístico pela semente. Arquipélago, andares 1–10, guardiões, mapas fixos, cenas escritas, missões com composição fixa e encontro manual não mudam.
- A revisão de dados do PO é feita em cartões (`tmp/previas/harmonia-animais/`), com decisões por regra, nunca em planilha longa.
- Push e publicação só com pedido do PO.

## Foco de revisão

- Terreno com poucas fichas, como pântano ou colinas: o nó não pode travar nem sair com animal fora da comunidade. Ele cai para outro tipo pela regra atual.
- Alvo alto com animais de ND baixo: a versão melhorada não pode passar do alvo, e o grupo não pode passar de 3 fichas.
- Rerrolagem de um nó cuja comunidade só fecha uma composição: o retorno é `null` e o encontro atual é mantido.
- Nó desconhecido revelado como combate de animais: segue a mesma regra, sem vazar a comunidade antes da descoberta.
- Expedição v5 salva e reaberta depois da ativação: mesmos animais e mesmo ND.

## Arquivos e execução

| Tarefa | Arquivos de produção | Implementador | Revisor |
|---|---|---|---|
| 1 | `src/forestAnimalCommunities.js` (novo) | opus | opus |
| 2 | `src/encounterResolver.js`, `src/generator.js`, `src/creatures.js`, checagens `=== 5` em `src/` | opus | opus |
| 3 | `recursos/ecologia/harmonia-rascunho.json`, `tmp/previas/harmonia-animais/` (fora do Git) | opus | sonnet |
| 4 | `src/creatureCatalog/ecologyVocabulary.js`, `scripts/ecology/apply.mjs`, `src/creatureCatalog/ecology.js` (gerado), `src/floorProfiles/forest11to20.js` | sonnet | sonnet |
| 5 | `src/forestExpedition.js` | sonnet | opus |

**Parada obrigatória:** a tarefa 3 termina com os cartões entregues ao PO. A tarefa 4 só começa depois das decisões dele.

---

### Task 1: Montagem do grupo por comunidade

**Arquivos:**
- Criar: `src/forestAnimalCommunities.js`
- Teste: `scripts/forestAnimalCommunities.test.mjs`

**Interfaces:**
- Produz o tipo `Community = { id: string, name: string, families: string[], maxSheets: 1 | 2 | 3, weight: number }`.
- Produz `getAnimalCommunities(profile, terrainName) -> Community[]`, que lê `profile.creatureRules.animalCommunities[terrainName] ?? []`.
- Produz `getCommunityAnimals(catalog, community, terrainTag) -> creature[]`: animais (`type === "animal"`) com `ecology.family` em `community.families` e `ecology.terrains` contendo `terrainTag`.
- Produz `composeAnimalCommunityGroup({ catalog, target, terrainTag, communities, rng, accepts, upgrade, excludeComposition }) -> { communityId, entries: Array<{ creature, quantity }> } | null`.
  - `accepts(entries, count) -> boolean` confere o mapa e é opcional.
  - `upgrade(creature, challengeRating) -> creature | null` é a ponte para `createEliteVariant` e evita importar o resolvedor.
  - `excludeComposition` é uma string no formato de `getCreatureComposition` e é opcional.
- Produz `canComposeAnimalCommunity({ catalog, target, terrainTag, communities, upgrade }) -> boolean`, a mesma busca sem `accepts`, para o gerador.

- [ ] **Passo 1: escrever o teste que falha** com catálogo e comunidades de teste montados no próprio arquivo (sem depender do catálogo real):
  - Comunidade `{ families: ["crocodiliano", "sanguessuga"], maxSheets: 2 }` e terreno `pantano`. Todo grupo devolvido só tem criaturas dessas famílias com a etiqueta `pantano`. Uma ficha `crocodiliano` sem `pantano` nunca aparece.
  - Para o mesmo alvo e a mesma semente, o resultado é igual (determinismo). O número de ids distintos em `entries` nunca passa de `maxSheets`. `calculateCombatND` das entradas é igual ao `target`.
  - Comunidade com `maxSheets: 1` nunca devolve duas fichas.
  - Em 200 sementes, uma comunidade com `maxSheets: 3` e fichas suficientes devolve grupos de 1, 2 e 3 fichas. Uma ficha é o mais comum e três é o menos comum.
  - Quando a primeira comunidade não fecha o alvo, outra do mesmo terreno fecha, e o `communityId` devolvido é o dela.
  - Quando nenhuma ficha nativa fecha o alvo, `upgrade` é chamado com uma criatura da comunidade e um ND de `THREAT_CHALLENGE_ORDER` que não passa do alvo. O grupo devolvido contém a versão melhorada.
  - Sem fichas na comunidade, ou com `upgrade` devolvendo `null`, o retorno é `null`, e `canComposeAnimalCommunity` dá `false`.
  - `accepts` que sempre recusa faz o retorno ser `null`. `excludeComposition` igual à única composição possível também.
- [ ] **Passo 2: rodar e ver falhar.** `node --test scripts/forestAnimalCommunities.test.mjs`. Esperado: falha de importação.
- [ ] **Passo 3: implementar.** Ordem de busca dentro de uma comunidade:
  1. sortear a quantidade de fichas `k` com pesos `{1: 3, 2: 2, 3: 1}`, limitados a `maxSheets`;
  2. tentar `k` e depois as outras quantidades, da menor para a maior;
  3. passar à próxima comunidade, sorteada por `weight` sem repetição;
  4. só depois de todas, tentar a versão melhorada.

  Os tamanhos de cada ficha seguem `getEcologyGroupWeight` e `canUseEcologyQuantity`. Reaproveitar `selectRatings` de `src/encounterGroupComposition.js` quando servir. Registrar a ruling sobre a quantidade sorteada (abaixo).
- [ ] **Passo 4: rodar e ver passar.** `node --test scripts/forestAnimalCommunities.test.mjs`.
- [ ] **Passo 5: incluir o teste em `test:ecology`** e rodar `npm run test:ecology`.
- [ ] **Passo 6: commit** `feat: monta grupos de animais por comunidade`.

> **Ruling do gerente (Task 1).** O spec lista a ordem "uma ficha, depois mais fichas". Se a busca tentasse sempre uma ficha primeiro, o catálogo quase sempre fecharia o ND sozinho e as comunidades de 2 ou 3 fichas nunca apareceriam, o que contraria a intenção do PO. Por isso a quantidade é sorteada favorecendo grupos menores e, depois, as outras quantidades são tentadas da menor para a maior. Se o PO preferir outra distribuição, basta mudar os pesos.

### Task 2: Integração na geração 6

**Arquivos:**
- Modificar: `src/encounterResolver.js`: `resolveCreatureGroup` (~680), `resolveForestElite` (~600–700), `canRerollNodeCreatures` / `rerollNodeCreatures` (~789–860) e as checagens `generationVersion === 5`.
- Modificar: `src/generator.js`: o marcador de versão (~543) e as checagens `=== 5` (~109, 111, 141).
- Modificar: `src/creatures.js`: `assignCreatureProfile` (~128) e a checagem `=== 5` (~51).
- Modificar as checagens `=== 5` em `src/traps.js`, `src/nodeTacticalMap.js` e `src/missions/forestMissionIntegration.js`.
- Teste: `scripts/forestAnimalHarmony.test.mjs`

**Interfaces:**
- Consome tudo da Task 1.
- Produz `generateMapData(..., { version: 6 })`, que marca `node.generationVersion = 6` nos nós da floresta, nas mesmas condições da versão 5.
- Produz `assignCreatureProfile(node, profile, rng, { excludeTypes = [] } = {})`, que sorteia o tipo sem os tipos excluídos.
- Produz `resolvedEncounter.animalCommunityId` nos encontros v6 de animais montados por comunidade.

- [ ] **Passo 1: escrever o teste que falha.** Em `scripts/forestAnimalHarmony.test.mjs`, usar um perfil derivado de `forest11to20Profile` com `creatureRules.animalCommunities` de teste para Floresta e Pântano, apontando para famílias atribuídas por um mapa de teste. Esse mapa sobrepõe `ecology.family` em cópias das criaturas, para não depender dos dados da Task 4. Gerar mapas com `generateMapData(..., { version: 6, mapSeed })` em sementes fixas.
  - Todo nó com `generationVersion` 6 (e nenhum nó com 5) mantém o comportamento da v5: elites, armadilhas e parcelas. As checagens existentes da v5 passam com `version: 6`.
  - Nos combates normais de animais resolvidos, toda criatura pertence a uma família da comunidade gravada em `resolvedEncounter.animalCommunityId` e tem a etiqueta do terreno do nó. O número de fichas é no máximo o `maxSheets` dela.
  - Num terreno sem comunidade viável para o alvo, o gerador não atribui tipo animal ao nó.
  - No elite v6 com principal animal, a principal e os auxiliares saem da mesma comunidade.
  - A rerrolagem de inimigos de um nó v6 de animais usa a mesma comunidade e não repete a composição. Sem alternativa, devolve `null`.
  - Um mapa gerado com `version: 5` produz os mesmos encontros de antes. Comparar com um instantâneo gravado no próprio teste, obtido antes da mudança, para uma semente fixa.
- [ ] **Passo 2: rodar e ver falhar.** `node --test scripts/forestAnimalHarmony.test.mjs`. Esperado: falha por `generationVersion` 6 ausente ou por animal fora da comunidade.
- [ ] **Passo 3: implementar.**
  - **Checagens de versão:** trocar todas as `generationVersion === 5` por `>= 5`, e o marcador do gerador de `version === 5` para `version >= 5`.
  - **Gerador:** nos nós v6 com tipo animal, chamar `canComposeAnimalCommunity` com o catálogo filtrado, o alvo de criaturas e a etiqueta do terreno. Se der `false`, refazer o tipo com `excludeTypes: ["animal"]`.
  - **Combate normal:** em `resolveCreatureGroup`, para v6, perfil `forest-11-20` e tipo animal, usar `composeAnimalCommunityGroup`. O `accepts` é a conferência de mapa já usada ali e `upgrade` é `createEliteVariant`. Gravar `animalCommunityId`. Se o retorno for `null`, seguir o caminho atual com o catálogo sem animais.
  - **Elite:** em `resolveForestElite`, para v6 e principal animal, escolher a comunidade antes. A principal é um animal da comunidade com ND E−1 ou a versão melhorada de um deles, e os auxiliares saem da mesma comunidade.
  - **Rerrolagem:** em `rerollNodeCreatures`, para v6 com `animalCommunityId`, usar só essa comunidade com `excludeComposition`.
- [ ] **Passo 4: rodar e ver passar.** `node --test scripts/forestAnimalHarmony.test.mjs scripts/forestElite.test.mjs scripts/forestNodeTraps.test.mjs scripts/escortReroll.test.mjs scripts/trapReroll.test.mjs`.
- [ ] **Passo 5: rodar as suítes.** Incluir o teste em `test:ecology`, depois rodar `npm run test:ecology`, `npm run test:floors-11-20`, `npm run test:missions` e `npm run test:floors-1-10`.
- [ ] **Passo 6: commit** `feat: aplica as comunidades de animais na geração 6 da floresta`.

### Task 3: Rascunho dos dados e cartões para o PO

**Arquivos (fora do Git):**
- Criar: `recursos/ecologia/harmonia-rascunho.json`
- Criar: `tmp/previas/harmonia-animais/index.html`
- Script auxiliar no scratchpad da sessão, se necessário.

**Interfaces:**
- Produz o rascunho no formato `{ families: [{ id, label }], animals: [{ id, name, challengeRating, family, terrains, group, note }], communities: { [terrainName]: Community[] } }`, que a Task 4 grava depois das decisões.

- [ ] **Passo 1: levantar os 87 animais** do catálogo automático da floresta, com nome, ND, grupo, etiquetas atuais e livro/página. Para os casos duvidosos, consultar o texto da ficha com `tools/pdf` (`node find.mjs bestiario "<nome>"`, `node text.mjs ...`).
- [ ] **Passo 2: propor uma família para cada animal.** Use famílias ecológicas, como canídeos, felinos, ursídeos, aracnídeos, insetos, répteis, crocodilianos, anfíbios, aves de rapina, peixes e grandes herbívoros. Proponha também os terrenos revistos de cada animal. Cada animal com um terreno da floresta (floresta, pântano, aquático, colina, planície) precisa da justificativa de uma linha, com base na ficha.
- [ ] **Passo 3: propor de 3 a 6 comunidades por terreno**: Floresta, Pântano, Aquático, Colinas e Planície aberta. Cada comunidade tem nome curto, famílias que caçam juntas ou se toleram, `maxSheets` e `weight`. Cada comunidade precisa ter animais suficientes para fechar os alvos 1 a 5 com fichas nativas ou versão melhorada. Registrar o resultado dessa conferência por comunidade.
- [ ] **Passo 4: montar os cartões** em `tmp/previas/harmonia-animais/index.html`. A página é estática e leve, com o visual do app (como `tmp/previas/abas-encontro/index.html`).
  - **Uma seção por terreno:** um cartão por comunidade, com nome, famílias, máximo de fichas, os animais que entram (nome, ND, grupo) e os alvos de 1 a 5 que fecham.
  - **Seção de famílias:** os animais de cada família.
  - **Seção "decisões por regra":** cada pergunta em uma linha, como "Sanguessugas gigantes convivem com crocodilianos? (sim/não)", "Animais sem terreno da floresta saem dos combates procedurais (lista)" e "Máximo de fichas da comunidade X".
- [ ] **Passo 5: conferir o rascunho com um script.**
  - todo animal de comunidade tem a família e o terreno dela;
  - nenhum terreno da floresta fica sem comunidade;
  - toda comunidade fecha os alvos de 1 a 5.
- [ ] **Passo 6: entregar ao gerente** os caminhos e um resumo. **Parada:** o gerente leva os cartões ao PO e registra as decisões no ledger antes da Task 4.

### Task 4: Gravação dos dados aprovados

**Arquivos:**
- Modificar: `src/creatureCatalog/ecologyVocabulary.js` (nova lista `FAMILIES` e validação de `family`)
- Modificar: `scripts/ecology/apply.mjs` (coluna `familia` na planilha `recursos/ecologia/revisao.csv`, campo `family` na saída)
- Regenerar: `src/creatureCatalog/ecology.js` com `npm run ecology:apply -- recursos/ecologia/revisao.csv`
- Modificar: `src/floorProfiles/forest11to20.js` (`creatureRules.animalCommunities`)
- Teste: `scripts/forestAnimalCommunitiesData.test.mjs`

**Interfaces:**
- Consome o rascunho da Task 3 com as decisões do PO registradas no ledger.
- Produz `ecology.family` (id de `FAMILIES` ou `null`) em cada criatura e `forest11to20Profile.creatureRules.animalCommunities`, no formato da Task 1.

- [ ] **Passo 1: escrever o teste que falha** em `scripts/forestAnimalCommunitiesData.test.mjs`, com o catálogo real:
  - os cinco terrenos da floresta têm ao menos uma comunidade;
  - toda família citada existe em `FAMILIES`;
  - todo `maxSheets` está entre 1 e 3;
  - toda comunidade tem animais com a família e o terreno dela;
  - `canComposeAnimalCommunity` fecha os alvos 1, 2, 3, 4 e 5 em toda comunidade, usando `createEliteVariant` como `upgrade`;
  - todo animal com terreno da floresta tem `family`.
- [ ] **Passo 2: rodar e ver falhar.** `node --test scripts/forestAnimalCommunitiesData.test.mjs`.
- [ ] **Passo 3: gravar os dados.**
  - Atualizar a planilha com as famílias e os terrenos aprovados.
  - Estender `apply.mjs` e o vocabulário.
  - Regenerar `ecology.js`.
  - Escrever as comunidades aprovadas no perfil.

  Nada além do que o PO aprovou entra.
- [ ] **Passo 4: rodar e ver passar.** Rodar o teste do Passo 1 e incluí-lo em `test:ecology`. Depois rodar `npm run test:ecology`, `npm run test:archipelago` (a ecologia é compartilhada) e `npm run test:floors-1-10`.
- [ ] **Passo 5: commit** `feat: grava famílias e comunidades de animais da floresta`.

### Task 5: Ativação da geração 6

**Arquivos:**
- Modificar: `src/forestExpedition.js` (`GENERATION_VERSION = 6`)
- Teste: `scripts/validateForestMvp.test.mjs`

**Interfaces:**
- Consome as Tasks 2 e 4.

- [ ] **Passo 1: escrever as expectativas que falham** em `scripts/validateForestMvp.test.mjs`, com 8 expedições de sementes fixas:
  - novas expedições têm `generationVersion` 6;
  - nenhum combate de animais tem família fora da comunidade gravada nem animal fora do terreno;
  - aparecem versões melhoradas (mais de 0);
  - aparecem grupos de 1, 2 e 3 fichas;
  - Pântano e Colinas têm combates de animais (mais de 0 cada);
  - uma expedição v5 serializada antes da ativação restaura com os mesmos encontros.

  Imprimir a distribuição só com a variável `FOREST_SAMPLE=1`.
- [ ] **Passo 2: rodar e ver falhar.** `npm run test:floors-11-20`.
- [ ] **Passo 3: ativar** `GENERATION_VERSION = 6`.
- [ ] **Passo 4: rodar todas as suítes:** `npm run test:floors-11-20`, `npm run test:floors-1-10`, `npm run test:missions`, `npm run test:ecology`, `npm run test:archipelago` e `npm run build`. Depois subir `npm run dev` e rodar `QA_APP_URL=http://localhost:5173/megadungeon/ npm run qa:floors-11-20`. Encerrar o servidor.
- [ ] **Passo 5: rodar a amostra** com `FOREST_SAMPLE=1` e anotar no relatório a distribuição por terreno, o número de fichas e as versões melhoradas.
- [ ] **Passo 6: commit** `feat: ativa a geração 6 com a harmonia dos animais`.
