# Ilha de Algas Gigantes — Plano de implementação (etapa 2 de 13)

> **Para agentes:** SUB-SKILL OBRIGATÓRIA: superpowers:subagent-driven-development, conforme `docs/superpowers/processo-de-trabalho.md`. Os passos usam caixas (`- [ ]`).

**Objetivo:** colocar a Ilha de Algas Gigantes (`giant-kelp`) no sorteio das ilhas iniciais como ilha completa, no mesmo padrão da Ilha dos Náufragos: uma planta por combate, ao menos dois combates sorteáveis por setor, pacote de missões e testes.

**Arquitetura:** a ilha é só dados e repete o desenho já usado nos Náufragos:
- `src/archipelagoGiantKelp.js`, registrado em `SECTOR_ISLANDS`;
- `islandCreatures["giant-kelp"]` **no fim** da lista;
- `layoutsByTheme["giant-kelp"]` com as plantas de direção e `byTask`;
- o pacote de missões em `archipelagoMissionThemes.js`;
- `arenaName` e a ativação no perfil.

O motor não muda.

**Tecnologias:** JavaScript ES Modules e Vite. Testes com `node --test`.

**Spec:** `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`. O conteúdo foi aprovado pelo PO na prévia `tmp/previas/ilha-algas/index.html` e está transcrito abaixo.

## Restrições globais

- Uma expedição salva antes desta etapa restaura igual depois dela.
- Só criaturas já existentes no catálogo. `islandCreatures["giant-kelp"]` entra no **fim** de `islandCreatures`, e as criaturas compartilhadas mantêm a origem anterior.
- Os testes antigos com seed fixa continuam exercitando todos os temas que já cobriam (agora são seis iniciais para quatro vagas) e afirmam isso explicitamente.
- Textos em português, transcritos literalmente deste plano.
- Só terrenos que a grade já tem. Nenhuma mudança no motor.
- Commits em `main`, em português, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Sem push.

## Foco da revisão

1. **Sessão salva antes da etapa.** Ela restaura igual. A fixture nova é capturada antes de qualquer mudança. Tarefa 1.
2. **Origem das criaturas compartilhadas.** Cada criatura da lista nova que já existia em outro tema mantém `getCreatureOriginThemeId` anterior. Isso vale, por exemplo, para canceronte, selako, peixe-recife, elfos-do-mar, irukanjin, sahuagin, homens-piranha, náiade, aquin'ne e tendrículo. Tarefa 1.
3. **ND exato.** Toda variante de combate fecha ND 6 com o tipo preferido, em três seeds. Cada guardião soma ND 8, inclusive a composição com quatro criaturas. Tarefa 1.
4. **Inimigo colado ao marco.** Em "Romper a guarda do viveiro" e "Interceptar a patrulha", nenhum inimigo começa a Chebyshev ≤ 1 da concha. Na patrulha, a distância até a saída é ≥ 3. Tarefa 1.
5. **Testes antigos.** O teste "as variantes das quatro ilhas…" e o teste de sorteio continuam cobrindo todos os temas iniciais, agora incluindo `shipwrecked` e `giant-kelp`. Tarefa 2.

---

### Task 1: Dados da Ilha de Algas Gigantes

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Criar: `src/archipelagoGiantKelp.js` (molde: `src/archipelagoShipwrecked.js`).
- Modificar:
  - `src/archipelagoPilot.js`;
  - `src/archipelagoCreatureRules.js`;
  - `src/archipelagoTacticalMap.js`;
  - `src/floorProfiles/archipelago21to30.js`: `arenaName` no tema `giant-kelp`. A ecologia já existe. **Não** ative o tema ainda.
- Criar: `scripts/fixtures/archipelago-sessao-antes-algas.json` e `scripts/archipelagoGiantKelp.test.mjs`.
- Modificar: `package.json`, incluindo o arquivo novo em `test:archipelago`.

**Interfaces:**
- Produz: `export const giantKelpExploration`, com `pilot: "giant-kelp-sectors"`, `terrain`, `sharedTasks: true`, `sectors[4]` com 3 tarefas próprias cada e `guardians[3]` com `id`.

#### Conteúdo aprovado (transcrever literalmente)

**Terreno:** `name: "Floresta de algas"`, `effect: "As frondes gigantes sobem do fundo e cobrem a água rasa. Os canais abertos são estreitos."`, `features: [{ name: "Frondes densas", effect: "Terreno difícil e camuflagem leve onde indicado no mapa." }]`.

**Setores** (tupla `[título, tipo, descrição, tipoPreferido?]`):

N, `"Muralha das frondes"`:
1. `["Abrir o canal entre as frondes", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Ache com Sobrevivência o trecho de frondes mais fino, corte-o com Atletismo e conduza o bote pelo canal com Pilotagem. Cada etapa exige um sucesso. Na segunda falha, as algas fecham o canal atrás do grupo."]`
2. `["Romper a emboscada nas frondes", "combate", "Algo escondido nas frondes arrasta quem passa pelo canal. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente à proa do bote gasta uma ação padrão em duas rodadas diferentes para cortar as gavinhas presas ao casco.", "monster"]`
3. `["Cortar as redes dos sahuagin", "combate", "Os saqueadores estenderam uma rede entre duas estacas para prender barcos no canal. Vença o combate. Uma personagem adjacente à rede gasta uma ação padrão para cortá-la. Registre sucesso se a rede for cortada até o fim da quarta rodada.", "humanoid"]`

S, `"Viveiro dos pastores"`:
1. `["Negociar com os pastores de algas", "exploração", "Obtenha 3 sucessos antes de 2 falhas. Fale com o guardião do viveiro com Diplomacia, acalme os selakos de guarda com Adestramento e mostre respeito aos costumes do mar com Conhecimento. Cada etapa exige um sucesso. Na segunda falha, os pastores expulsam o grupo do viveiro."]`
2. `["Romper a guarda do viveiro", "combate", "Os defensores do viveiro não deixam estranhos passar. Vença o combate. Se algum adversário terminar o turno adjacente à concha de alarme, o viveiro inteiro desperta. Registre sucesso se nenhum adversário alcançar a concha.", "humanoid"]`
3. `["Impedir o roubo dos ovos", "combate", "Saqueadores tentam levar os ovos de selako do ninhal. Escolha uma criatura que carrega os ovos. Se ela ainda puder escapar ao fim da terceira rodada, foge com eles. Registre sucesso se o grupo impedir a fuga e vencer.", "humanoid"]`

L, `"Banco das gavinhas"`:
1. `["Recolher a seiva das frondes", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Ache com Sobrevivência a fronde madura e recolha a seiva com Ofício (alquimista) sem rasgar a casca. Na segunda falha, a seiva coagula e perde o efeito."]`
2. `["Amarrar o bote no banco", "travessia", "Obtenha 2 sucessos antes de 2 falhas. Leve o cabo até a rocha do banco com Atletismo e firme a amarra com Ofício (carpinteiro) antes que a maré vire. Na segunda falha, a correnteza arrasta o bote para dentro das algas."]`
3. `["Soltar o pescador das gavinhas", "combate", "Gavinhas prenderam um pescador elfo na areia do banco. Vença o combate. Até o fim da quarta rodada, uma personagem adjacente ao pescador gasta uma ação padrão em duas rodadas diferentes para soltá-lo.", "monster"]`

O, `"Cascos engolidos"`:
1. `["Resgatar a carga presa nas frondes", "recuperação", "Obtenha 2 sucessos antes de 2 falhas. Localize a caixa com Percepção e solte-a das frondes com Atletismo. Na segunda falha, a caixa afunda entre as algas."]`
2. `["Desenroscar o leme do casco", "engenho", "Obtenha 2 sucessos antes de 2 falhas. Ache com Investigação onde a alga travou o leme e solte o eixo com Ofício (carpinteiro). Na segunda falha, o leme se parte."]`
3. `["Enfrentar os predadores do casco", "combate", "Predadores fizeram ninho num casco engolido. Vença o combate. Até o fim da quarta rodada, uma personagem dentro do casco gasta uma ação padrão em duas rodadas diferentes para abrir a escotilha do porão.", "animal"]`

**Guardiões:**
1. `{ id: "isca-do-coracao", name: "A Isca do Coração", briefing: "Uma luz suave pisca entre as frondes, como um náufrago pedindo ajuda. Quando o grupo se aproxima, a água se fecha em volta da pedra do fragmento, e vultos que pareciam algas abrem os olhos.", creatures: [{ id: "alghari", quantity: 2 }, { id: "irukanjin", quantity: 2 }] }`
2. `{ id: "mare-urticante", name: "A Maré Urticante", briefing: "A água do centro brilha em azul. Um enxame de águas-vivas sobe das frondes, e um peixe-recife enorme se solta da pedra onde estava preso.", creatures: [{ id: "enxame-de-aguas-vivas", quantity: 1 }, { id: "peixe-recife", quantity: 1 }] }`
3. `{ id: "pastor-das-frondes", name: "O Pastor das Frondes", briefing: "O chefe dos pastores de algas espera na pedra do fragmento, com a lança erguida. Atrás dele, a planta que a tribo alimenta há gerações abre a boca entre as frondes.", creatures: [{ id: "elfo-do-mar-chefe", quantity: 1 }, { id: "tendriculo", quantity: 1 }] }`

**Criaturas** (`islandCreatures["giant-kelp"]`, no fim do objeto):
`["canceronte", "platan", "selako", "selako-tigre", "pliorex", "peixe-recife", "enxame-de-aguas-vivas", "agua-viva", "elfo-do-mar-pescador", "elfo-do-mar-chefe", "irukanjin", "sahuagin-metamorfo", "sahuagin-predador", "homem-piranha", "homem-piranha-imediato", "alghari", "cipo-assassino", "tendriculo", "naiade", "aquinne"]`

**Perfil:** `arenaName: "Coração das Frondes"` no tema `giant-kelp`.

**Plantas** (`layoutsByTheme["giant-kelp"]`, grade 20×14):

Plantas de direção:
- `N: layout("Proa do bote", "As gavinhas presas ao casco são cortadas daqui.", 9, 7, [["foliage", 4, 0, 16, 6], ["deep-water", 0, 6, 20, 3], ["foliage", 6, 9, 14, 5], ["concealment", 10, 1, 6, 4], ["concealment", 12, 10, 5, 3], ["deck", 7, 7, 3, 1], ["wet", 0, 9, 6, 5]])`
- `S: { ...layout("Concha de alarme", "Pendurada no meio do viveiro.", 13, 5, [["water", 0, 0, 20, 14], ["foliage", 0, 0, 6, 7], ["foliage", 16, 0, 4, 14], ["deck", 6, 3, 10, 7], ["deck", 2, 9, 5, 2], ["clearing", 0, 10, 4, 4], ["obstacle", 8, 4, 2, 1], ["obstacle", 11, 8, 2, 1], ["obstacle", 14, 6, 1, 2]]), enemyArea: { minX: 16, maxX: 19, minY: 0, maxY: 13 } }`
- `L: layout("Pescador preso", "Enrolado nas gavinhas no meio do banco.", 14, 6, [["water", 0, 0, 20, 14], ["clearing", 2, 3, 15, 9], ["foliage", 12, 2, 6, 3], ["foliage", 5, 8, 3, 3], ["obstacle", 10, 5, 1, 1], ["difficult", 7, 3, 3, 2], ["wet", 1, 11, 12, 3], ["concealment", 16, 6, 3, 4]])`
- `O: layout("Escotilha do porão", "Dentro do casco engolido.", 14, 7, [["water", 0, 0, 20, 14], ["foliage", 0, 0, 8, 4], ["foliage", 17, 0, 3, 14], ["deck", 8, 4, 9, 6], ["obstacle", 8, 4, 9, 1], ["obstacle", 8, 9, 9, 1], ["foliage", 9, 11, 8, 3], ["concealment", 4, 5, 4, 4]])`
- `center: layout("Pedra do fragmento", "A rocha no meio do poço aberto entre as frondes.", 12, 6, [["water", 0, 0, 20, 14], ["foliage", 0, 0, 20, 3], ["foliage", 17, 3, 3, 11], ["foliage", 4, 12, 16, 2], ["deep-water", 6, 3, 11, 8], ["advantage", 11, 6, 3, 2], ["deck", 3, 7, 8, 1], ["concealment", 7, 3, 9, 2], ["wet", 0, 8, 3, 4]])`

`byTask`:
- `"Cortar as redes dos sahuagin": layout("Rede do canal", "Estendida entre duas estacas no canal.", 12, 6, [["water", 0, 0, 20, 14], ["current", 11, 0, 3, 14], ["foliage", 4, 0, 6, 7], ["foliage", 15, 0, 5, 6], ["foliage", 15, 10, 5, 4], ["obstacle", 12, 4, 1, 1], ["obstacle", 12, 9, 1, 1], ["clearing", 0, 8, 7, 6]])`
- `"Impedir o roubo dos ovos": layout("Ninhal dos ovos", "A plataforma onde os ovos de selako ficam presos às frondes.", 8, 5, [["water", 0, 0, 20, 14], ["deck", 3, 7, 15, 2], ["deck", 7, 2, 3, 5], ["foliage", 12, 0, 8, 5], ["foliage", 12, 10, 8, 4], ["obstacle", 8, 3, 1, 1], ["clearing", 0, 9, 5, 5], ["deck", 4, 9, 1, 1]])`
- `"Interceptar a patrulha": { ...layout("Saída pelo canal fundo", "A criatura escolhida que chegar aqui escapa.", 17, 2, [["water", 0, 0, 20, 14], ["deep-water", 15, 0, 5, 14], ["clearing", 1, 6, 14, 6], ["foliage", 4, 1, 8, 4], ["foliage", 8, 12, 6, 2], ["wet", 13, 5, 2, 7]]), enemyArea: { minX: 6, maxX: 13, minY: 6, maxY: 11 } }`
- `"Defender a posição avançada": layout("Jangada de frondes", "A posição é preparada sobre a jangada.", 9, 7, [["water", 0, 0, 20, 14], ["foliage", 0, 0, 20, 3], ["foliage", 15, 3, 5, 11], ["deep-water", 12, 4, 3, 7], ["deck", 7, 6, 5, 3], ["obstacle", 7, 5, 1, 1], ["foliage", 0, 12, 9, 2]])`

#### Passos

- [x] **Passo 1: capturar a fixture com o código atual**, antes de qualquer mudança. Use a técnica de `scripts/fixtures/archipelago-sessao-antes-naufragos.json` (seeds `"regressao-algas-1"` a `"regressao-algas-3"`, com uma visita à ilha 21) e grave em `scripts/fixtures/archipelago-sessao-antes-algas.json`.
- [x] **Passo 2: testes** em `scripts/archipelagoGiantKelp.test.mjs`, espelhando `scripts/archipelagoShipwrecked.test.mjs`:
  - a regressão com a fixture nova;
  - os 4 setores com as 3 variantes próprias e a compartilhada, cada setor com pelo menos 2 combates sorteáveis;
  - o ND 6 de cada combate em três seeds, só com o elenco;
  - o marco de cada combate, conforme a tabela abaixo, e zonas diferentes entre os combates do mesmo setor;
  - os guardiões com ND 8, `briefing` e pelo menos 4 penalidades elegíveis na criatura principal;
  - o terreno, a ecologia e o `arenaName`;
  - a origem das criaturas compartilhadas igual à anterior, comparada com a base, como no teste equivalente dos Náufragos;
  - os inimigos longe do marco no foco 4, em 50 seeds.

  | Combate | Marco |
  |---|---|
  | Romper a emboscada nas frondes | Proa do bote |
  | Cortar as redes dos sahuagin | Rede do canal |
  | Romper a guarda do viveiro | Concha de alarme |
  | Impedir o roubo dos ovos | Ninhal dos ovos |
  | Soltar o pescador das gavinhas | Pescador preso |
  | Interceptar a patrulha | Saída pelo canal fundo |
  | Enfrentar os predadores do casco | Escotilha do porão |
  | Defender a posição avançada | Jangada de frondes |

- [x] **Passo 3: rodar e ver falhar.** A regressão passa e o resto falha.
- [x] **Passo 4: implementar** com o conteúdo acima.
- [x] **Passo 5: rodar e ver passar.** Se algum combate não fechar ND 6 ou alguma criatura principal tiver menos de 4 penalidades, **pare e informe o gerente**, porque o conteúdo foi aprovado pelo PO. Depois rode `npm run test:archipelago`, `npm run test:archipelago-missions` e `npm run test:ecology`: tudo verde.
- [x] **Passo 6: commit.** `feat: adiciona os dados da Ilha de Algas Gigantes`

---

### Task 2: Pacote de missões, ativação e documentação

**Modelo:** `sonnet`. Revisão: `sonnet`.

**Arquivos:**
- Modificar:
  - `src/missions/archipelagoMissionThemes.js`: a entrada `"giant-kelp"`;
  - `src/floorProfiles/archipelago21to30.js`: `"giant-kelp"` em `enabledThemeIds`, depois de `"shipwrecked"`;
  - `scripts/archipelagoState.test.mjs`: os testes que percorrem temas;
  - `scripts/archipelagoGiantKelp.test.mjs`;
  - `REQUISITOS_ANDARES_21_A_30.md` e `README.md`.

#### Pacote de missões aprovado (transcrever literalmente)

```js
"giant-kelp": {
  pools: {
    locations: ["um canal aberto entre frondes gigantes", "uma plataforma de frondes trançadas", "um banco de areia preso pelas algas", "um casco engolido pela floresta verde"],
    materials: ["seiva fresca de fronde antiga", "fibra de alga trançada", "pérolas de selako", "esporos verdes da arrebentação"],
    objects: ["uma rede de pesca de elfo-do-mar", "um arpão de osso entalhado", "uma lanterna de concha", "o leme de um barco preso nas algas", "uma caixa de mantimentos lacrada"],
    mementos: ["um colar de conchas trançado", "um pente de coral com um nome gravado", "uma carta selada num frasco", "o anzol de prata de um pescador"],
    clues: ["frondes cortadas a faca", "ovos de selako quebrados na plataforma", "redes rasgadas por dentes", "uma trilha de bolhas que some entre as algas"],
    challenges: ["atravessar a floresta sem se enroscar", "achar o canal que a maré abre", "convencer os pastores de algas a ouvir", "passar pelas frondes sem acordar o que vive nelas"],
    phenomena: ["luzes que piscam entre as frondes", "algas que se fecham depois que o barco passa", "um canto baixo vindo do fundo", "a água ficando verde e espessa ao entardecer"]
  },
  featured: {
    category: "collection",
    title: "A seiva das frondes antigas",
    targetName: "a seiva das frondes mais antigas",
    lead: "Recolha a seiva das frondes mais antigas, que só crescem perto do centro da floresta",
    condition: "Encher três frascos com seiva fresca sem cortar as frondes-mãe",
    proofType: "Os três frascos lacrados, ainda verdes."
  },
  map: {
    markers: ["water", "foliage", "concealment", "current"],
    landmark: { name: "Fronde-mãe", effect: "A fronde mais antiga, de onde se recolhe a seiva." }
  }
}
```

#### Passos

- [x] **Passo 1: teste da ilha sorteada** em `scripts/archipelagoGiantKelp.test.mjs`, como o dos Náufragos:
  - seeds `"algas-0"` a `"algas-199"`;
  - a ilha está entre os andares 21 e 24;
  - `hasIslandSectors` é verdadeiro e os 4 `penaltyId` são distintos;
  - `arenaName === "Coração das Frondes"`;
  - `guardianComposition` é um dos três ids;
  - o tema de missões existe.
- [x] **Passo 2: rodar e ver falhar.**
- [x] **Passo 3: implementar** o pacote e a ativação.
- [x] **Passo 4: ajustar os testes antigos.** O teste "as variantes das quatro ilhas…" passa a incluir `"giant-kelp": [4, 4, 4, 4]` em `objectiveCounts` e continua afirmando que todas as chaves foram exercitadas. O teste de sorteio aceita os 12 temas ativos, mantendo `islands.length === 10` e as fileiras exatas. Não apague nenhuma verificação.
- [x] **Passo 5: rodar tudo.** `npm run test:archipelago`, `npm run test:archipelago-missions`, `npm run test:ecology`, `npm run test:ranges` e `npm run build`: tudo verde.
- [x] **Passo 6: documentação.**
  - Em `REQUISITOS_ANDARES_21_A_30.md`, acrescente um parágrafo da ilha logo depois do parágrafo dos Náufragos, no mesmo estilo. Cubra a ideia, os setores, os combates por planta, os guardiões e o Centro.
  - Atualize "onze temas" para doze e a tabela "Temas da primeira versão" (linha Inicial: seis temas, quatro sorteados).
  - Em "Por onde retomar" e em "Pendências", passe de 12 para 11 temas fora do sorteio.
  - No `README.md`, troque "Os 12 temas fora do sorteio" por "Os 11 temas fora do sorteio".
- [x] **Passo 7: commit.** `feat: coloca a Ilha de Algas Gigantes no sorteio das ilhas iniciais`

---

### Fechamento (gerente)

- Revisão final com `opus`.
- Validação pelo PO no app.
- Depois da validação, apagar `tmp/previas/ilha-algas/`.
