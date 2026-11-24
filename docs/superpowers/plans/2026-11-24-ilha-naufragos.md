# Ilha dos Náufragos — Plano de implementação (etapa 1 de 13)

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`) para acompanhamento.

**Objetivo:** colocar a Ilha dos Náufragos (`shipwrecked`) no sorteio das ilhas iniciais como ilha completa, no mesmo formato do Atol e da Costa do Coral.

**Arquitetura:** a ilha é só dados. Um módulo novo, `src/archipelagoShipwrecked.js`, segue o formato de `src/archipelagoAtoll.js` e é registrado em `SECTOR_ISLANDS` (`src/archipelagoPilot.js`). A lista de criaturas vai para `src/archipelagoCreatureRules.js`, os mapas para `src/archipelagoTacticalMap.js`, o pacote de missões para `src/missions/archipelagoMissionThemes.js`, e o nome do Centro e a ativação para `src/floorProfiles/archipelago21to30.js`. O motor não muda.

**Tecnologias:** JavaScript ES Modules e Vite. Testes com `node --test`.

**Spec:** `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`. O conteúdo aprovado pelo PO está transcrito neste plano. A prévia ficou em `tmp/previas/ilha-naufragos/index.html`.

## Restrições globais

- Códigos de sessão compatíveis: uma expedição salva antes desta etapa restaura igual depois dela.
- O conteúdo usa só criaturas que já estão no catálogo. Nada de cadastro novo.
- Textos em português, transcritos **literalmente** deste plano (aspas tipográficas e apóstrofos inclusive).
- O mapa usa só tipos de terreno que a grade já tem, sem terreno novo.
- Nenhuma mudança no motor (`createIslandPilot`, penalidades, renderer). Se algo parecer exigir mudança no motor, pare e avise o gerente.
- Commits em `main`, em português (`feat:`/`test:`/`docs:`), terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.

## Foco da revisão

1. **Sessão salva antes da etapa.** Ela tem de restaurar com as mesmas ilhas, temas e objetivos. O teste de regressão fica na Tarefa 1, com a fixture capturada antes de qualquer mudança.
2. **Penalidades do guardião.** Cada criatura principal (Legionário Insano, Cavaleiro Desonrado, Afogado) precisa de pelo menos 4 penalidades elegíveis, senão `createIslandPilot` quebra ao sortear. Teste na Tarefa 1.
3. **ND exato dos setores.** Toda variante de combate, com o tipo preferido dela, fecha ND 6 em várias seeds só com a lista da ilha. Teste na Tarefa 1.
4. **Ilha sorteada de verdade.** Uma expedição nova que sorteia `shipwrecked` precisa ter setores (`hasIslandSectors`), guardião, tesouro escondido possível e missão. Teste na Tarefa 2.
5. **Testes que fixam os "dez temas".** Testes antigos com seed fixa assumem exatamente os 10 temas atuais e quebram com o tema novo. Eles precisam ser ajustados ao novo conjunto sem perder o que verificam. Tarefa 2.

---

### Tarefa 1: Dados da ilha (setores, guardiões, criaturas, mapas, ecologia, nome do Centro)

**Modelo:** `sonnet` (transcrição conferida e integração entre arquivos). Revisão: `sonnet`.

**Arquivos:**
- Criar: `src/archipelagoShipwrecked.js`
- Modificar: `src/archipelagoPilot.js` (import e entrada `shipwrecked` em `SECTOR_ISLANDS`)
- Modificar: `src/archipelagoCreatureRules.js` (entrada `shipwrecked` em `islandCreatures`)
- Modificar: `src/archipelagoTacticalMap.js` (entrada `shipwrecked` em `layoutsByTheme` e novas chaves em `landmarksByTask`)
- Modificar: `src/floorProfiles/archipelago21to30.js` (`arenaName` no tema `shipwrecked` e `shipwrecked: shipwreck` em `archipelagoEcologyContexts.byTheme`). **Não** adicione o tema a `enabledThemeIds`, isso é da Tarefa 2.
- Criar: `scripts/fixtures/archipelago-sessao-antes-naufragos.json`
- Criar: `scripts/archipelagoShipwrecked.test.mjs`
- Modificar: `package.json` (incluir o arquivo novo no script `test:archipelago`)

**Interfaces:**
- Produz: `export const shipwreckedExploration` (mesmo formato de `atollExploration`: `pilot: "shipwrecked-sectors"`, `terrain`, `sharedTasks: true`, `sectors[4]` com 3 tarefas próprias cada e `guardians[3]`).
- Consome: `createIslandSector`, `createIslandSectorCombat`, `createIslandGuardian`, `createIslandPilot` e `getIslandThemeTerrain` (de `archipelagoPilot.js`), `withIslandTacticalLayout` (de `archipelagoTacticalMap.js`), `getEligibleGuardianPenalties` (de `archipelagoGuardianPenalties.js`), `calculateCombatND` (de `challenge.js`) e `createNodeTacticalMap` (como em `scripts/archipelagoState.test.mjs`).

#### Conteúdo aprovado (transcrever literalmente)

**Terreno:** `name: "Costa de destroços"`, `effect: "Cascos partidos e cordame cobrem a areia entre as barracas do acampamento."`, `features: [{ name: "Destroços espalhados", effect: "Terreno difícil onde indicado no mapa." }]`.

**Setores** (tupla `[título, tipo, descrição, tipoPreferido?]`; a 4ª variante vem de `SHARED_SECTOR_TASKS` via `sharedTasks: true`):

N — `"Praia dos destroços"`
1. `["Vasculhar a linha da maré", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Use Percepção para achar o baú de cartas entre os destroços e Atletismo ou Ladinagem para soltá-lo das ferragens antes que a maré suba. Na segunda falha, a onda arrasta o baú para o recife."]`
2. `["Afastar os carniceiros da praia", "combate", "Caranguejos e predadores disputam os destroços. Vença o combate e, até o fim da quarta rodada, uma personagem deve gastar uma ação padrão em duas rodadas diferentes para puxar o bote de resgate acima da linha d'água.", "animal"]`
3. `["Conter os afogados da arrebentação", "combate", "Os mortos do último naufrágio saem da água na direção do casco virado onde os sobreviventes se abrigam. Registre sucesso se o grupo vencer sem que nenhuma criatura alcance o casco.", "undead"]`

S — `"Acampamento dos Remendados"`
1. `["Ganhar a confiança dos sobreviventes", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ouça o porta-voz com Diplomacia, perceba quem mente sobre os Acendedores com Intuição e trate os feridos com Cura. Cada etapa exige um sucesso. Na segunda falha, os sobreviventes se fecham e escondem o que sabem."]`
2. `["Romper o cerco às barracas", "combate", "Os Acendedores cercam o acampamento para levar os sobreviventes. Vença o combate. Se ao fim da terceira rodada houver um adversário adjacente à barraca dos feridos, ele leva um sobrevivente. Registre sucesso apenas se ninguém for levado.", "humanoid"]`
3. `["Libertar os cativos da paliçada", "infiltração", "Obtenha 2 sucessos antes de 2 falhas. Passe pelos vigias com Furtividade ou Enganação e abra as correntes com Ladinagem. Na segunda falha, os vigias dão o alarme e os cativos são levados para o farol."]`

L — `"Nascente da encosta"`
1. `["Limpar a nascente", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Sobrevivência as carcaças que os Acendedores jogaram na bacia e filtre a água com Cura ou Ofício (alquimista). Na segunda falha, a contaminação se espalha pela bacia."]`
2. `["Disputar a bacia", "combate", "Feras sedentas tomaram a nascente. Vença o combate e, até o fim da quarta rodada, uma personagem adjacente à bacia gasta uma ação padrão em duas rodadas diferentes para encher os odres do acampamento.", "animal"]`
3. `["Desviar o cano do farol", "exploração", "Os Acendedores canalizam a nascente até o farol por canos de bambu. Obtenha 3 sucessos antes de 2 falhas. Siga o cano com Percepção, alcance a junta na encosta com Atletismo e desvie o fluxo com Ofício (carpinteiro). Cada etapa exige um sucesso. Na segunda falha, a junta desaba e o cano se perde no mato."]`

O — `"Gruta dos mapas"`
1. `["Copiar as rotas da parede", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Separe com Investigação as rotas verdadeiras das falsas, interprete as correntes com Conhecimento ou Sobrevivência e passe tudo a limpo com Ofício (escriba). Cada etapa exige um sucesso. Na segunda falha, a umidade apaga o trecho que faltava."]`
2. `["Proteger o cartógrafo", "combate", "O velho cartógrafo termina o último mapa enquanto as criaturas invadem a gruta. Ele gasta uma ação padrão em três rodadas. Se sofrer dano numa rodada, perde o progresso dela. Registre sucesso quando ele terminar e o grupo vencer.", "undead"]`
3. `["Selar a boca da gruta", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação a pedra que segura o desmoronamento antigo e escore a entrada com Atletismo ou Ofício (carpinteiro) antes da maré alta. Na segunda falha, a água invade e cobre as paredes riscadas."]`

**Guardiões** (a primeira criatura é a principal):
1. `{ id: "ultimo-legionario", name: "O Último Legionário", briefing: "No alto do farol de destroços, um legionário de armadura enferrujada ainda monta guarda para uma legião que afundou há anos. Ele ergue o escudo e grita uma ordem que ninguém mais vai cumprir.", creatures: [{ id: "legionario-insano", quantity: 1 }] }`
2. `{ id: "senhor-dos-acendedores", name: "O Senhor dos Acendedores", briefing: "O homem que acende o farol desce pela escada de cordas com o brasão raspado do peito. Atrás dele, o bando dos Acendedores fecha o caminho de volta para a praia.", creatures: [{ id: "cavaleiro-desonrado", quantity: 1 }, { id: "bando-pirata", quantity: 1 }] }`
3. `{ id: "primeiro-naufrago", name: "O Primeiro Náufrago", briefing: "A fogueira do farol se apaga num sopro frio. O primeiro náufrago da ilha sobe pela rocha molhada, e uma aparição pálida se ergue das cinzas ao lado dele.", creatures: [{ id: "afogado", quantity: 1 }, { id: "aparicao", quantity: 1 }] }`

**Criaturas da ilha** (`islandCreatures.shipwrecked`):
`["canceronte", "tumarkhan", "selako", "pliorex", "fobossuco", "crocodilo", "bando-pirata", "chefe-de-quadrilha", "saqueador-lider-de-bando", "saqueador-pugilista", "jagunco", "homem-piranha-imediato", "cavaleiro-desonrado", "lacedon", "imediato", "zumbi-fantasmagorico", "turba-zumbi", "aparicao", "carnical", "harpia-saqueadora", "tempestade-de-lagartos"]`

**Mapas** (`layout(nomeDoMarco, efeitoDoMarco, x, y, zonas)`, grade 20×14):
- `N: layout("Bote de resgate", "O bote está encalhado acima da arrebentação. A maré sobe pela direita.", 14, 5, [["water", 15, 0, 5, 14], ["wet", 12, 0, 3, 14], ["obstacle", 9, 3, 3, 2], ["obstacle", 13, 9, 2, 2], ["difficult", 6, 6, 5, 3], ["difficult", 10, 11, 3, 2]])`
- `S: layout("Barraca dos feridos", "As barracas dão cobertura. A paliçada fecha o fundo do acampamento.", 12, 6, [["wall", 17, 1, 1, 9], ["obstacle", 8, 2, 2, 2], ["obstacle", 13, 2, 2, 2], ["obstacle", 8, 9, 2, 2], ["obstacle", 14, 9, 2, 2], ["clearing", 10, 5, 4, 3], ["advantage", 18, 2, 2, 3]])`
- `L: layout("Bacia da nascente", "A água doce se acumula entre as pedras, ao pé da encosta.", 12, 8, [["water", 11, 5, 4, 3], ["slope", 15, 1, 5, 6], ["tree", 6, 2, 2, 2], ["tree", 17, 10, 2, 2], ["concealment", 6, 9, 4, 3], ["obstacle", 10, 9, 2, 1]])`
- `O: layout("Parede das rotas", "As rotas riscadas cobrem o fundo seco da gruta. A água entra pela boca.", 16, 6, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["wall", 8, 1, 2, 4], ["wall", 8, 10, 2, 3], ["water", 4, 4, 5, 6], ["wet", 9, 5, 4, 4], ["advantage", 15, 4, 4, 5]])`
- `center: layout("Fogueira-farol", "A fogueira que imita a luz de um porto queima no alto do rochedo, ao lado do fragmento.", 16, 4, [["water", 0, 0, 20, 2], ["slope", 8, 4, 4, 6], ["advantage", 12, 2, 7, 6], ["deck", 9, 10, 6, 2], ["obstacle", 14, 8, 2, 2], ["difficult", 4, 6, 4, 3]])`

**Marcos por tarefa** (novas chaves em `landmarksByTask`):
- `"Conter os afogados da arrebentação": ["Casco virado", "Os sobreviventes se abrigam sob o casco. Nenhuma criatura pode alcançá-lo."]`
- `"Libertar os cativos da paliçada": ["Portão da paliçada", "Os cativos estão acorrentados do lado de dentro do portão."]`
- `"Desviar o cano do farol": ["Junta do cano", "A junta de bambu leva a água da nascente até o farol."]`
- `"Proteger o cartógrafo": ["Cartógrafo", "O velho cartógrafo trabalha junto à parede riscada."]`

**Perfil:** no tema `shipwrecked` de `themePools.initial`, acrescentar `arenaName: "Farol dos Acendedores"`. Em `archipelagoEcologyContexts.byTheme`, acrescentar `shipwrecked: shipwreck`.

#### Passos

- [x] **Passo 1: capturar a fixture de sessão com o código atual (antes de qualquer mudança).**
  Escreva um script descartável no scratchpad que importe `createArchipelagoState`, `createRng` e `archipelago21to30Profile` e grave em `scripts/fixtures/archipelago-sessao-antes-naufragos.json` um objeto `{ "<seed>": exportSessionState() }` para as seeds `"regressao-1"`, `"regressao-2"` e `"regressao-3"`. Para cada seed, antes de exportar, chame a API pública de visita para registrar uma visita à ilha 21. Use a mesma API dos testes existentes em `scripts/archipelagoState.test.mjs`. Confirme que `git status` mostra só a fixture nova.

- [x] **Passo 2: escrever os testes em `scripts/archipelagoShipwrecked.test.mjs`.**
  - `test("sessão salva antes da Ilha dos Náufragos restaura igual")`: para cada seed da fixture, `state.initialize(profile, createRng("x"), fixture[seed])` e compare `state.getSnapshot().islands.map(({ floor, themeId, objectives }) => ...)` e `exportSessionState()` com a fixture (`deepEqual` nos campos de ilhas, temas e objetivos).
  - `test("náufragos têm 4 setores com 3 variantes próprias e a compartilhada")`: monte `island = { floor: 21, themeId: "shipwrecked" }`. Para os setores 0 a 3 e as variantes 0 a 3, `createIslandSector(island, s, v, 22)` existe. Os títulos das variantes 0 a 2 são os do conteúdo aprovado, e a variante 3 é a compartilhada. Cada setor tem ao menos um `"combate"` e um não combate.
  - `test("combates de setor dos náufragos fecham ND 6 só com o elenco da ilha")`: como no teste `as variantes das quatro ilhas…` de `archipelagoState.test.mjs`, para cada variante de combate e as seeds `a`, `b` e `c`, `calculateCombatND(items) === 6`, todos os ids estão em `allowedCreatureIds`, e o marco do mapa vira `"mechanism"`.
  - `test("guardiões dos náufragos somam ND 8 e a criatura principal tem penalidades suficientes")`: para os índices 0 a 2, `createIslandGuardian(...).resolvedEncounter.budget.creatures === 8`, há `briefing`, o mapa do Centro tem o marco `"mechanism"`, e `getEligibleGuardianPenalties(getCreatureById(principal)).length >= 4`.
  - `test("náufragos têm terreno, ecologia e nome do Centro")`: `getIslandThemeTerrain("shipwrecked").name === "Costa de destroços"`, `archipelagoEcologyContexts.byTheme.shipwrecked` existe e o tema tem `arenaName === "Farol dos Acendedores"`.

- [x] **Passo 3: rodar e ver falhar.** `node --test scripts/archipelagoShipwrecked.test.mjs`. O teste de regressão passa e os outros falham (tema sem config).

- [x] **Passo 4: implementar** o módulo, os registros, a lista, os mapas, os marcos e o perfil, com o conteúdo aprovado acima.

- [x] **Passo 5: rodar e ver passar.** `node --test scripts/archipelagoShipwrecked.test.mjs`: todos passam. Se uma variante de combate não fechar ND 6, **não** mude o elenco nem o tipo preferido. Pare e informe o gerente, porque isso é decisão de conteúdo.

- [x] **Passo 6: suítes vizinhas.** Inclua o arquivo novo em `test:archipelago` no `package.json`. Rode `npm run test:archipelago`, `npm run test:archipelago-missions` e `npm run test:ecology`: tudo verde.

- [x] **Passo 7: commit.** `feat: adiciona os dados da Ilha dos Náufragos`

---

### Tarefa 2: Pacote de missões, ativação no sorteio e documentação

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar: `src/missions/archipelagoMissionThemes.js` (entrada `shipwrecked`)
- Modificar: `src/floorProfiles/archipelago21to30.js` (`"shipwrecked"` em `enabledThemeIds`, depois de `"coral-coast"`)
- Modificar: `scripts/archipelagoState.test.mjs` (testes que assumem os 10 temas)
- Modificar: `scripts/archipelagoShipwrecked.test.mjs` (teste de ilha sorteada)
- Modificar: `REQUISITOS_ANDARES_21_A_30.md` (parágrafo da ilha na "Retomada do Arquipélago", ajuste de "dez temas" e "13 temas", e item 1 de "Por onde retomar") e `README.md` (linha do arquipélago: "Os 13 temas fora do sorteio" passa a 12)

**Interfaces:**
- Consome: `shipwreckedExploration` e as entradas da Tarefa 1.
- Produz: o tema `shipwrecked` sorteável em expedições novas.

#### Pacote de missões aprovado (transcrever literalmente)

```js
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
}
```

#### Passos

- [x] **Passo 1: teste da ilha sorteada.** Em `scripts/archipelagoShipwrecked.test.mjs`, `test("expedição nova pode sortear a Ilha dos Náufragos completa")`: procure, entre as seeds `"naufragos-0"` até `"naufragos-199"`, uma em que `createArchipelagoState(profile, createRng(seed))` sorteie `shipwrecked` (a primeira serve). Nela: a ilha está numa fileira inicial (21 a 24), `hasIslandSectors(island)` é verdadeiro, tem 4 objetivos com `penaltyId` distintos, tem `arenaName === "Farol dos Acendedores"` e `getArchipelagoMissionTheme("shipwrecked")` não é nulo.
- [x] **Passo 2: rodar e ver falhar.** `node --test scripts/archipelagoShipwrecked.test.mjs` falha nesse teste, porque o tema ainda não é sorteável.
- [x] **Passo 3: implementar.** Adicione o pacote de missões e `"shipwrecked"` a `enabledThemeIds`.
- [x] **Passo 4: ajustar os testes antigos.** Rode `npm run test:archipelago` e `npm run test:archipelago-missions`. Ajuste os testes que fixam o conjunto de temas:
  - `expedições novas sorteiam posições apenas entre os dez temas…` passa a aceitar os 11 temas ativos. Verifique que cada fileira só tem temas ativos daquela fileira, sem exigir o conjunto exato.
  - Testes com seed fixa que mapeiam por `themeId` (por exemplo `objectiveCounts` em `as variantes das quatro ilhas…`) incluem `shipwrecked: [4, 4, 4, 4]` ou trocam de seed, mantendo o que verificam.
  - Não apague nenhuma verificação.
- [x] **Passo 5: rodar tudo.** `npm run test:archipelago`, `npm run test:archipelago-missions`, `npm run test:ecology`, `npm run test:ranges` e `npm run build`: tudo verde.
- [x] **Passo 6: documentação.** Em `REQUISITOS_ANDARES_21_A_30.md`, acrescente à "Retomada do Arquipélago", depois do parágrafo da Costa do Coral, um parágrafo no mesmo estilo dos vizinhos:
  - a ideia (Acendedores e farol falso);
  - os 4 setores com 4 variantes, incluindo a compartilhada;
  - combates ND 6;
  - os 3 guardiões ND 8 com as criaturas;
  - o Centro, Farol dos Acendedores.

  Atualize "a seleção da primeira versão continua com dez temas" para onze. No item 1 de "Por onde retomar" e em "Pendências conhecidas", passe de 13 para 12 temas e cite o design `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`. No `README.md`, troque "Os 13 temas fora do sorteio ainda não têm pacote de missões" por "Os 12 temas fora do sorteio voltam um a um como ilhas completas".
- [x] **Passo 7: commit.** `feat: coloca a Ilha dos Náufragos no sorteio das ilhas iniciais`

---

### Fechamento (gerente)

- Revisão final do branch com `opus`.
- Validação pelo PO no app: o gerente roda `npm run dev` e informa uma seed ou um código de sessão que sorteie os Náufragos, com o roteiro do que conferir (setores, variantes, guardião, mapas e missão).
- Depois da validação, apagar `tmp/previas/ilha-naufragos/`.
