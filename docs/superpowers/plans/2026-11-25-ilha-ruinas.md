# Ilha das Ruínas Ciclópicas — Plano de implementação (etapa 5 de 13)

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`).

**Objetivo:** colocar a Ilha das Ruínas Ciclópicas (`cyclopean-ruins`) no sorteio das ilhas intermediárias como ilha completa. É a primeira intermediária nova e segue o formato decidido no ponto de controle das iniciais:
- 6 setores (NO, NL, O, L, SO, SL), cada um com 3 variantes próprias (2 combates e 1 teste estendido), sem variante compartilhada;
- combates ND 7 (`combatChallenge: 7`), cada um com a própria planta;
- SO e SL removem um bônus do guardião (`defaultGuardianBuff`), como na Vulcânica;
- guardião com 3 composições ND 9.

**Arquitetura:** só dados, no desenho das ilhas novas, com o formato de setores e bônus da Vulcânica (`src/archipelagoVolcanic.js`):
- `src/archipelagoCyclopeanRuins.js`, registrado em `SECTOR_ISLANDS` depois de `"ship-graveyard"`;
- `islandCreatures["cyclopean-ruins"]` **no fim**;
- `layoutsByTheme["cyclopean-ruins"]` com as 6 plantas de direção, o Centro e 6 `byTask`;
- o pacote de missões;
- `arenaName` e a ativação.

O motor não muda.

**Spec:** `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`, que traz o formato das intermediárias em "Formato por fileira". O PO aprovou o conteúdo na prévia `tmp/previas/ilha-ruinas/index.html` em 25/11/2026: o Centro "Trono dos Gigantes", os mercenários de Aslothia e o Gigante do Trono (gigante dos mares).

## Restrições globais

- Uma expedição salva antes desta etapa restaura igual depois dela.
- Só criaturas já existentes no catálogo. A lista entra no **fim** de `islandCreatures`, e as criaturas compartilhadas mantêm a origem anterior.
- Os testes antigos com seed fixa continuam exercitando todos os temas que já cobriam (agora são quatro intermediárias para três vagas) e afirmam isso explicitamente. Se algum teste antigo depender do sorteio exato da fileira intermediária, filtre o tema novo como `archipelagoBaseInitialRow` faz com a inicial. Não apague nenhuma verificação.
- Textos em português, transcritos literalmente deste plano.
- Só terrenos que a grade já tem. Nenhuma mudança no motor.
- Commits em `main`, em português, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.

## Foco da revisão

1. **Sessão salva antes da etapa.** Ela restaura igual. A fixture é capturada antes de qualquer mudança. Tarefa 1.
2. **Origem das criaturas compartilhadas.** Cada uma mantém a origem anterior:
   - canceronte, selako, selako-tigre, pliorex e lula-gigante: `sea-caves`;
   - crocodilo, esqueleto e esqueleto-de-elite: `mangrove`;
   - gargula-assassina e grifo: `floating`;
   - jagunco: `shipwrecked`;
   - necromante: `mist`.

   As outras 13 passam a ter origem `cyclopean-ruins`. Tarefa 1.
3. **ND exato.** Os 12 combates fecham ND 7 com o tipo preferido, em três seeds. Cada guardião soma ND 9 pelo orçamento e por `calculateCombatND`. Tarefa 1.
4. **Formato intermediário.** Cada setor tem exatamente 2 combates e 1 teste. Os 4 primeiros setores aplicam penalidade. SO remove `defense` e SL remove `hp`. Tarefa 1.
5. **Inimigo colado ao marco.** Veja a tabela de distâncias. Tarefa 1.
6. **Testes antigos.** Tarefa 2.

---

### Task 1: Dados da Ilha das Ruínas Ciclópicas

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Criar: `src/archipelagoCyclopeanRuins.js`.
- Modificar:
  - `src/archipelagoPilot.js`;
  - `src/archipelagoCreatureRules.js`;
  - `src/archipelagoTacticalMap.js`;
  - `src/floorProfiles/archipelago21to30.js`: `arenaName: "Trono dos Gigantes"` no tema `cyclopean-ruins`. A ecologia já existe. **Não** ative o tema.
- Criar: `scripts/fixtures/archipelago-sessao-antes-ruinas.json` e `scripts/archipelagoCyclopeanRuins.test.mjs`.
- Modificar: `package.json`, incluindo o arquivo novo em `test:archipelago`.

#### Conteúdo aprovado (transcrever literalmente)

**`src/archipelagoCyclopeanRuins.js`** (arquivo completo):

```js
import { islandGuardianBuffs } from "./archipelagoGuardianBuffs.js";

export const cyclopeanRuinsExploration = {
  pilot: "cyclopean-ruins-sectors",
  combatChallenge: 7,
  guardianBuffs: islandGuardianBuffs,
  terrain: {
    name: "Ruínas ciclópicas",
    effect: "Blocos de pedra do tamanho de casas saem da água, cobertos de musgo e sal. Os degraus foram feitos para pés de gigante.",
    features: [{ name: "Blocos tombados", effect: "Terreno difícil onde indicado no mapa." }]
  },
  sectors: [
    {
      direction: "NO", name: "Escadaria afundada",
      tasks: [
        ["Subir os degraus dos gigantes", "travessia", "Obtenha 3 sucessos antes de 2 falhas. Ache com Percepção os blocos que não se movem, escale cada degrau com Atletismo e prenda a linha de segurança com Ofício (carpinteiro). Cada etapa exige um sucesso. Na segunda falha, um degrau desliza e o grupo volta à água."],
        ["Erguer o bote acima da maré", "combate", "A maré cheia sobe pelos degraus e traz predadores com ela. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao cabrestante gasta uma ação padrão em duas rodadas diferentes para içar o bote. Registre sucesso se o grupo vencer e içar o bote.", "animal"],
        ["Apagar a runa do patamar", "combate", "Quando alguém pisa no patamar, a runa acende e as sentinelas de pedra despertam. Vença o combate. Uma personagem adjacente à runa gasta uma ação padrão para apagá-la. Registre sucesso se a runa for apagada até o fim da terceira rodada e o grupo vencer.", "construct"]
      ]
    },
    {
      direction: "NL", name: "Jardim das estátuas",
      tasks: [
        ["Ler os rostos de pedra", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache com Investigação a estátua mais recente, descubra com Cura se ainda há vida sob a pedra e reconheça com Misticismo o que a petrificou. Cada etapa exige um sucesso. Na segunda falha, o grupo confunde uma estátua viva com pedra comum."],
        ["Virar o espelho de bronze", "combate", "Algo transforma em pedra quem atravessa o jardim. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao espelho de bronze gasta uma ação padrão em duas rodadas diferentes para virá-lo para a entrada. Registre sucesso se o grupo vencer e virar o espelho.", "monster"],
        ["Impedir o saque das estátuas", "combate", "Mercenários de Aslothia serram as estátuas para vender as cabeças de pedra. Escolha uma criatura para carregar a cabeça de um explorador petrificado. Se ele ainda puder escapar ao fim da terceira rodada, foge com ela. Registre sucesso se o grupo impedir a fuga e vencer.", "humanoid"]
      ]
    },
    {
      direction: "O", name: "Poço do olho",
      tasks: [
        ["Despertar o olho de pedra", "ritual", "Obtenha 3 sucessos antes de 2 falhas. Reconheça com Conhecimento os símbolos da borda, desenhe com Misticismo o círculo que o olho espera e entoe com Religião a oração dos construtores. Cada etapa exige um sucesso. Na segunda falha, o olho se fecha até a próxima maré."],
        ["Refazer o selo do poço", "combate", "Os ossos de um gigante afogado se erguem no fundo do poço e sobem pelas paredes. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao selo gasta uma ação padrão em duas rodadas diferentes para refazê-lo. Registre sucesso se o grupo vencer e refizer o selo.", "undead"],
        ["Travar a engrenagem do olho", "combate", "Os guardiões de pedra fazem a engrenagem girar, e o fundo do poço começa a se abrir. Vença o combate. Se ao fim de uma rodada houver um adversário adjacente à alavanca e nenhuma personagem adjacente a ela, o fundo se abre mais um passo. Registre sucesso se o grupo vencer antes do terceiro passo.", "construct"]
      ]
    },
    {
      direction: "L", name: "Acampamento de Aslothia",
      tasks: [
        ["Espionar o acampamento", "infiltração", "Obtenha 3 sucessos antes de 2 falhas. Aproxime-se sem ser visto com Furtividade, conte as sentinelas com Percepção e leia os planos dos mercenários com Investigação. Cada etapa exige um sucesso. Na segunda falha, um cão de guarda late e o acampamento inteiro acorda."],
        ["Libertar o guia capturado", "combate", "Os mercenários prenderam a um poste o guia que conhece as ruínas. Vença o combate. Uma personagem adjacente ao poste gasta uma ação padrão para soltá-lo. Registre sucesso se ele for solto até o fim da terceira rodada e o grupo vencer.", "humanoid"],
        ["Arrancar o cristal de comando", "combate", "Os mercenários religaram um construto das ruínas com um cristal de comando preso a um pilar. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao pilar gasta uma ação padrão em duas rodadas diferentes para arrancar o cristal. Registre sucesso se o grupo vencer e arrancar o cristal.", "construct"]
      ]
    },
    {
      direction: "SO", name: "Arco partido",
      defaultGuardianBuff: "defense",
      tasks: [
        ["Atravessar o arco partido", "travessia", "Obtenha 3 sucessos antes de 2 falhas. Ache com Percepção a fenda que ainda aguenta peso, salte o vão com Atletismo e equilibre-se na pedra molhada com Acrobacia. Cada etapa exige um sucesso. Na segunda falha, o grupo recua e procura outro caminho pela água."],
        ["Salvar o mercenário pendurado", "combate", "Um mercenário ferido está pendurado na borda do arco, e as feras do alto disputam a presa. Vença o combate. Se um adversário terminar o turno adjacente ao mercenário, ele cai no mar. Registre sucesso se o grupo vencer com o mercenário ainda pendurado.", "monster"],
        ["Proteger a leitura da inscrição", "combate", "O guia lê a inscrição que mostra a passagem pelo arco enquanto os mortos sobem da água. Ele gasta uma ação padrão em três rodadas. Se sofrer dano numa rodada, perde o progresso dela. Registre sucesso quando ele terminar e o grupo vencer.", "undead"]
      ]
    },
    {
      direction: "SL", name: "Trono afundado",
      defaultGuardianBuff: "hp",
      tasks: [
        ["Drenar a sala do trono", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação a passagem de água sob o trono e abra a comporta de pedra com Ofício (pedreiro) ou Atletismo. Na segunda falha, a comporta trava e a sala continua cheia."],
        ["Segurar a comporta do trono", "combate", "Predadores entram pela comporta aberta e tentam voltar ao mar aberto com ela. Vença o combate. Se um adversário terminar o turno adjacente à comporta, ela se fecha e a sala enche de novo. Registre sucesso se o grupo vencer com a comporta aberta.", "animal"],
        ["Render o capitão dos mercenários", "combate", "O capitão dos mercenários quer o trono antes do grupo. Vença o combate. Escolha a criatura de maior ND para ser o capitão. Registre sucesso se o grupo vencer sem que o capitão chegue ao degrau do trono.", "humanoid"]
      ]
    }
  ],
  guardians: [
    { id: "gigante-do-trono", name: "O Gigante do Trono", briefing: "Sentado no trono do centro, um gigante dos mares bebe de um barril do tamanho de um bote. Ele se levanta devagar, irritado com a visita, e a água escorre da barba até os joelhos.", creatures: [{ id: "gigante-dos-mares", quantity: 1 }] },
    { id: "senhora-das-estatuas", name: "A Senhora das Estátuas", briefing: "As estátuas do centro olham todas para o mesmo ponto. Uma górgona sai de trás do trono, e o maior dos guardiões de pedra dá o primeiro passo em séculos.", creatures: [{ id: "gorgona", quantity: 1 }, { id: "defensor-rochoso", quantity: 1 }] },
    { id: "golem-religado", name: "O Golem Religado", briefing: "Os mercenários de Aslothia chegaram primeiro. O líder ergue o cristal de comando, e um golem de bronze das ruínas range e marcha na direção do grupo.", creatures: [{ id: "golem-de-bronze", quantity: 1 }, { id: "lider-mercenario-de-aslothia", quantity: 1 }] }
  ]
};
```

**Criaturas** (`islandCreatures`, no fim do objeto, depois de `"ship-graveyard"`):

```js
"cyclopean-ruins": [
  "canceronte", "selako", "selako-tigre", "pliorex", "lula-gigante", "crocodilo",
  "soldado-mecanico", "gargula-assassina", "cariatide-mecanica", "carrasco-oco", "instrumento-divino",
  "cocatriz", "basilisco", "gorgona", "cocatriz-real", "grifo", "serpe",
  "esqueleto", "esqueleto-de-elite", "ogro-esqueleto", "gigante-esqueleto",
  "capanga", "jagunco", "lider-mercenario-de-aslothia", "gigante-das-colinas", "necromante"
]
```

**Plantas** (`layoutsByTheme`, depois de `"ship-graveyard"`):

```js
"cyclopean-ruins": {
    NO: { ...layout("Cabrestante", "Preso no degrau mais baixo. A corda desce até o bote na água.", 10, 5, [["water", 0, 0, 20, 4], ["deep-water", 0, 0, 20, 2], ["slope", 4, 4, 12, 2], ["advantage", 4, 6, 12, 3], ["wall", 16, 4, 4, 6], ["obstacle", 7, 7, 2, 2], ["wet", 0, 9, 20, 5], ["difficult", 12, 10, 4, 2]]), enemyArea: { minX: 0, maxX: 19, minY: 0, maxY: 3 }, enemyTiles: ["water"] },
    NL: layout("Espelho de bronze", "Um espelho do tamanho de uma porta, preso a um eixo de pedra.", 6, 4, [["clearing", 3, 2, 14, 10], ["obstacle", 4, 7, 1, 1], ["obstacle", 8, 6, 1, 1], ["obstacle", 11, 4, 1, 1], ["obstacle", 14, 7, 1, 1], ["obstacle", 16, 3, 1, 1], ["obstacle", 12, 10, 1, 1], ["obstacle", 6, 11, 1, 1], ["difficult", 9, 8, 3, 2], ["wall", 0, 0, 20, 1]]),
    O: { ...layout("Selo do poço", "Riscado na borda do poço, onde as pedras ainda encaixam.", 10, 3, [["deep-water", 8, 5, 5, 5], ["difficult", 6, 3, 9, 1], ["obstacle", 4, 2, 2, 2], ["obstacle", 16, 9, 2, 2], ["advantage", 15, 2, 4, 3], ["wet", 7, 10, 7, 1]]), enemyArea: { minX: 8, maxX: 12, minY: 5, maxY: 9 } },
    L: { ...layout("Poste do guia", "O guia está amarrado ao poste no meio do acampamento.", 13, 5, [["clearing", 8, 3, 11, 8], ["obstacle", 10, 1, 3, 2], ["obstacle", 16, 2, 3, 2], ["obstacle", 15, 9, 3, 2], ["obstacle", 12, 8, 1, 1], ["wall", 0, 0, 6, 3], ["difficult", 5, 9, 3, 3]]), enemyArea: { minX: 15, maxX: 19, minY: 3, maxY: 12 } },
    SO: { ...layout("Mercenário pendurado", "Agarrado à borda partida do arco, sobre o mar.", 9, 8, [["water", 0, 0, 20, 14], ["clearing", 0, 8, 10, 6], ["clearing", 13, 0, 7, 9], ["difficult", 5, 9, 3, 2], ["obstacle", 15, 3, 2, 2]]), enemyArea: { minX: 13, maxX: 19, minY: 0, maxY: 8 } },
    SL: { ...layout("Comporta do trono", "Uma laje de pedra na parede leste da sala alagada.", 19, 7, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["wall", 19, 1, 1, 6], ["wall", 19, 8, 1, 5], ["water", 6, 1, 13, 12], ["obstacle", 9, 3, 1, 1], ["obstacle", 9, 10, 1, 1], ["obstacle", 14, 3, 1, 1], ["obstacle", 14, 10, 1, 1], ["wet", 4, 1, 2, 12]]), enemyArea: { minX: 6, maxX: 15, minY: 1, maxY: 12 } },
    center: { ...layout("Trono do centro", "O trono de pedra fica no fundo do estrado, de frente para o mar.", 18, 6, [["water", 0, 0, 20, 2], ["advantage", 14, 3, 5, 7], ["slope", 12, 4, 2, 5], ["obstacle", 4, 3, 2, 2], ["obstacle", 4, 9, 2, 2], ["obstacle", 9, 3, 2, 2], ["obstacle", 9, 9, 2, 2], ["difficult", 6, 6, 3, 2], ["wall", 19, 2, 1, 10]]), enemyArea: { minX: 11, maxX: 15, minY: 2, maxY: 9 } },
    byTask: {
      "Apagar a runa do patamar": layout("Runa do patamar", "Gravada no chão do patamar, entre dois pedestais vazios.", 12, 3, [["advantage", 9, 1, 8, 5], ["slope", 9, 6, 8, 2], ["wall", 0, 0, 7, 4], ["obstacle", 10, 2, 1, 1], ["obstacle", 15, 2, 1, 1], ["water", 17, 8, 3, 6], ["difficult", 3, 7, 4, 2]]),
      "Impedir o saque das estátuas": { ...layout("Trilha do acampamento", "A criatura escolhida que chegar aqui foge com a cabeça de pedra.", 19, 7, [["clearing", 15, 5, 5, 5], ["wall", 15, 0, 5, 4], ["wall", 15, 11, 5, 3], ["obstacle", 6, 4, 1, 1], ["obstacle", 9, 7, 1, 1], ["obstacle", 12, 3, 1, 1], ["obstacle", 11, 10, 1, 1], ["difficult", 4, 6, 2, 2]]), enemyArea: { minX: 9, maxX: 14, minY: 4, maxY: 11 } },
      "Travar a engrenagem do olho": { ...layout("Alavanca da engrenagem", "A alavanca de pedra trava a engrenagem gigante.", 14, 6, [["obstacle", 15, 3, 3, 3], ["slope", 5, 4, 4, 6], ["advantage", 0, 0, 5, 4], ["difficult", 9, 8, 3, 2], ["obstacle", 8, 2, 2, 2], ["wet", 10, 11, 10, 3]]), enemyArea: { minX: 10, maxX: 19, minY: 9, maxY: 13 } },
      "Arrancar o cristal de comando": layout("Pilar do cristal", "O cristal de comando está preso no alto de um pilar das ruínas.", 11, 6, [["clearing", 6, 3, 12, 8], ["obstacle", 12, 5, 2, 3], ["advantage", 15, 2, 4, 4], ["obstacle", 7, 2, 1, 1], ["obstacle", 16, 10, 1, 1], ["difficult", 3, 6, 3, 3]]),
      "Proteger a leitura da inscrição": layout("Inscrição do arco", "Entalhada na mureta do arco, em letras do tamanho de um braço.", 6, 6, [["water", 0, 0, 20, 14], ["clearing", 0, 5, 20, 6], ["wet", 0, 11, 20, 3], ["wall", 3, 5, 7, 1], ["obstacle", 11, 7, 2, 2], ["difficult", 15, 6, 3, 2]]),
      "Render o capitão dos mercenários": { ...layout("Degrau do trono", "O primeiro degrau do estrado. O capitão não pode chegar aqui.", 17, 7, [["wall", 0, 0, 20, 1], ["wall", 0, 13, 20, 1], ["advantage", 18, 4, 2, 7], ["slope", 16, 5, 2, 5], ["water", 4, 1, 8, 4], ["obstacle", 8, 6, 1, 1], ["obstacle", 8, 9, 1, 1], ["obstacle", 12, 3, 1, 1], ["obstacle", 12, 10, 1, 1]]), enemyArea: { minX: 6, maxX: 12, minY: 1, maxY: 12 } }
    }
  }
```

#### Passos

- [ ] **Passo 1: capturar a fixture com o código atual**, antes de qualquer mudança. Use a técnica de `scripts/fixtures/archipelago-sessao-antes-cemiterio.json`, com as seeds `"regressao-ruinas-1"` a `"regressao-ruinas-3"`. Inclua uma visita a uma ilha intermediária (andar 25), além da visita ao andar 21. Grave em `scripts/fixtures/archipelago-sessao-antes-ruinas.json`.
- [ ] **Passo 2: testes** em `scripts/archipelagoCyclopeanRuins.test.mjs`, espelhando `scripts/archipelagoShipGraveyard.test.mjs`, com a ilha no andar 25 e `baseChallenge: 9`:
  - a regressão, que não contém `cyclopean-ruins`;
  - os 6 setores com 3 variantes próprias cada, exatamente 2 combates e 1 teste por setor, nas direções NO, NL, O, L, SO e SL;
  - os bônus: sem `guardianBuffId` nos 4 primeiros setores, `guardianBuffId === "defense"` em SO e `"hp"` em SL;
  - o ND 7 de cada combate em três seeds, só com o elenco;
  - o marco de cada combate (tabela abaixo) e as zonas diferentes entre os combates do mesmo setor;
  - os guardiões com ND 9 (orçamento e `calculateCombatND`), `briefing`, sem `rule`, e a criatura principal (`gigante-dos-mares`, `gorgona` e `golem-de-bronze`, nessa ordem) com pelo menos 4 penalidades elegíveis;
  - o terreno ("Ruínas ciclópicas"), a ecologia e o `arenaName`;
  - as origens: as compartilhadas iguais às anteriores e as 13 novas com origem `cyclopean-ruins`;
  - os inimigos longe do marco em 50 seeds, contando peças de vários quadrados, com as distâncias mínimas da tabela.

  | Combate | Marco | Distância mínima |
  |---|---|---|
  | Erguer o bote acima da maré | Cabrestante | 2 |
  | Apagar a runa do patamar | Runa do patamar | — |
  | Virar o espelho de bronze | Espelho de bronze | — |
  | Impedir o saque das estátuas | Trilha do acampamento | 3 |
  | Refazer o selo do poço | Selo do poço | — |
  | Travar a engrenagem do olho | Alavanca da engrenagem | 2 |
  | Libertar o guia capturado | Poste do guia | 2 |
  | Arrancar o cristal de comando | Pilar do cristal | — |
  | Salvar o mercenário pendurado | Mercenário pendurado | 2 |
  | Proteger a leitura da inscrição | Inscrição do arco | — |
  | Segurar a comporta do trono | Comporta do trono | 2 |
  | Render o capitão dos mercenários | Degrau do trono | 3 |

- [ ] **Passo 3: rodar e ver falhar.**
- [ ] **Passo 4: implementar.**
- [ ] **Passo 5: rodar e ver passar.** Se algum combate não fechar ND 7, ou alguma distância falhar, **pare e informe o gerente**. Depois rode `npm run test:archipelago`, `npm run test:archipelago-missions` e `npm run test:ecology`.
- [ ] **Passo 6: commit.** `feat: adiciona os dados da Ilha das Ruínas Ciclópicas`

---

### Task 2: Pacote de missões, ativação e documentação

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- `src/missions/archipelagoMissionThemes.js`;
- `src/floorProfiles/archipelago21to30.js`: `"cyclopean-ruins"` em `enabledThemeIds`, depois dos temas intermediários já ativos;
- `scripts/archipelagoState.test.mjs`;
- `scripts/archipelagoCyclopeanRuins.test.mjs`;
- `REQUISITOS_ANDARES_21_A_30.md` e `README.md`.

#### Pacote de missões aprovado (transcrever literalmente)

```js
"cyclopean-ruins": {
  pools: {
    locations: ["uma escadaria de degraus gigantes saindo do mar", "um jardim de estátuas cobertas de sal", "a borda de um poço redondo do tamanho de uma praça", "a sombra de um arco partido sobre a água"],
    materials: ["pó de pedra de uma estátua quebrada", "musgo de sal que cresce nos blocos", "bronze verde de uma engrenagem antiga", "lascas de basalto com runas"],
    objects: ["um cinzel de gigante do tamanho de uma lança", "uma placa de bronze com o mapa das ruínas", "um cristal de comando apagado", "o elmo de um mercenário de Aslothia", "uma chave de pedra com dentes de um palmo"],
    mementos: ["a estatueta de um explorador petrificado", "o diário de um arqueólogo com a última página em branco", "um anel preso no dedo de uma estátua", "um mapa rabiscado por um guia local"],
    clues: ["marcas de serra no pescoço das estátuas", "pegadas enormes sob a água rasa", "uma runa que brilha quando alguém pisa perto", "acampamentos abandonados com fogueiras frias"],
    challenges: ["subir degraus feitos para gigantes", "não olhar nos olhos de quem vive no jardim", "chegar ao trono antes dos mercenários", "decifrar uma escrita que ninguém usa há séculos"],
    phenomena: ["pedras que rangem como se respirassem", "o olho do poço que se abre na maré cheia", "estátuas que mudam de lugar à noite", "um eco grave que vem de baixo da água"]
  },
  featured: {
    category: "exploration",
    title: "O mapa dos construtores",
    targetName: "as inscrições dos construtores das ruínas",
    lead: "Copie as inscrições que mostram como as ruínas foram erguidas",
    condition: "Copiar as três inscrições maiores antes que os mercenários de Aslothia as quebrem",
    proofType: "As três cópias, com os símbolos completos."
  },
  map: {
    markers: ["obstacle", "water", "slope", "difficult"],
    landmark: { name: "Cabeça de pedra", effect: "A cabeça de uma estátua gigante tombada na água. Ponto de referência da missão." }
  }
}
```

#### Passos

- [ ] **Passo 1: teste da ilha sorteada**, com as seeds `"ruinas-0"` a `"ruinas-199"`:
  - a ilha está entre os andares 25 e 27;
  - `hasIslandSectors` é verdadeiro e há 6 objetivos;
  - há 4 `penaltyId` distintos nos 4 primeiros setores, e os setores 5 e 6 têm `guardianBuffId`;
  - `arenaName === "Trono dos Gigantes"`;
  - `guardianComposition` é um de `"gigante-do-trono"`, `"senhora-das-estatuas"` ou `"golem-religado"`;
  - o tema de missões existe.
- [ ] **Passo 2: rodar e ver falhar.**
- [ ] **Passo 3: implementar** o pacote e a ativação.
- [ ] **Passo 4: ajustar os testes antigos.**
  - O teste de sorteio passa a "quinze temas ativos": `length === 15`, `includes("cyclopean-ruins")`, `islands.length === 10` e as fileiras exatas.
  - Todo teste que percorre temas intermediários continua afirmando que exercitou todos os que cobria e passa a cobrir o novo, quando fizer sentido.
  - Não apague nenhuma verificação.
- [ ] **Passo 5: rodar tudo.** `npm run test:archipelago`, `npm run test:archipelago-missions`, `npm run test:ecology`, `npm run test:ranges` e `npm run build`.
- [ ] **Passo 6: documentação.**
  - Em `REQUISITOS_ANDARES_21_A_30.md`, acrescente um parágrafo da ilha depois do parágrafo do Cemitério de Navios, no mesmo estilo. Cubra o formato intermediário novo (6 setores com 2 combates e 1 teste), a ideia, os setores, os guardiões e o Centro.
  - Atualize "catorze temas" para quinze e a linha Intermediária da tabela: quatro temas, três sorteados.
  - Passe de 9 para 8 temas fora do sorteio em "Por onde retomar" e em "Pendências".
  - No README, troque 9 por 8 (duas ocorrências).
- [ ] **Passo 7: commit.** `feat: coloca a Ilha das Ruínas Ciclópicas no sorteio das ilhas intermediárias`

---

## Execução

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1. Dados | `sonnet` | `sonnet` |
| 2. Missões, ativação e docs | `sonnet` | `sonnet` |
| Revisão final | — | `opus` |

### Fechamento (gerente)

- Revisão final com `opus`.
- Validação pelo PO no app, com uma sessão que tenha as Ruínas num andar intermediário.
- Atualizar a spec e apagar `tmp/previas/ilha-ruinas/`.
