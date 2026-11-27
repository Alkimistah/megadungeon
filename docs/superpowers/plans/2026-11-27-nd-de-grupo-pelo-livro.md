# ND de grupo pela regra do livro

Decisão do PO (27/11/2026, prévia do Iceberg): corrigir o cálculo de ND de encontros com ameaças de NDs diferentes antes da etapa 10. O plano segue `docs/superpowers/processo-de-trabalho.md`.

## Regra (Ameaças de Arton, p. 9)

1. **Ameaças de ND igual.** Abaixo de ND 1, mantém-se a regra atual do app em duas fases, decidida pelo PO no commit `2accaf5`: quatro ameaças de ND ¼ formam ND 1, oito formam ND 3, e duas de ND ½ formam ND 1. Com ND 1 ou mais, soma-se +2 ao ND a cada vez que a quantidade dobra: 2 ameaças dão +2, 4 dão +4 e 8 dão +6. Três ameaças contam como duas.
2. **Ameaças de ND diferentes.** O primeiro passo é agrupar as ameaças de mesmo ND e calcular o ND de cada grupo como no item 1. Se dois grupos terminarem com o mesmo ND, agrupa-se de novo, até não haver empate. O maior ND é a base. Cada outro grupo soma **+1** se estiver até 1 ponto abaixo da base, **+½** se estiver 2 pontos abaixo e **+¼** se estiver 3 pontos abaixo. Grupos 4 ou mais pontos abaixo não somam. O resultado é **arredondado para baixo** quando a base é 1 ou mais.
3. **ND especiais** (S, S+, –, ?) mantêm o tratamento atual.

| Grupo | ND pelo livro | ND antigo do app |
|---|---|---|
| 7, 6, 5 e 3 (exemplo do livro) | 8 | 9¼ |
| 9, 5, 5 e 5 (Kallyanach e 3 Acólitos) | 9 | 10 |
| 9 e 8 × ND 2 | 10 | 8¾ |
| 6 e 4 | 6 | 7 |
| 5, 5, 3 e 3 | 7 | 8 |
| 3 e 3 | 5 | 5 |

## Decisões do gerente

- **Ruling:** `ENCOUNTER_RESOLUTION_VERSION` não muda. Encontros já gravados em sessões salvas mantêm as criaturas que a mesa já viu. Só encontros novos usam a regra nova. *Custo se estiver errado:* um encontro misto antigo continua com a composição antiga, que pelo livro vale menos que o ND da cena.
- **Ruling:** conteúdo das ilhas (elencos, tipos preferidos) não muda nesta correção sem aviso ao PO. Se um setor deixar de fechar o ND ou uma ficha perder cobertura, o implementador para e reporta; o gerente leva a decisão ao PO.

- **Ruling:** todas as ameaças abaixo de ND 1 formam um único grupo, que pode empatar com outros grupos. Empates são reagrupados contando os grupos como ameaças. *Custo se estiver errado:* meio ponto de diferença em encontros raros com criaturas abaixo de ND 1.
- **Ruling:** quando o alvo de criaturas é 1 ou mais e fracionário (resto de armadilha incidental), as criaturas fecham `Math.floor(alvo)`. O diálogo continua mostrando o ND da cena. *Custo se estiver errado:* o mestre vê, por exemplo, 2¾ ao lado de um grupo de ND 2. A divisão linear entre criaturas e armadilha vai para a discussão da floresta.
- **Ruling:** a rerrolagem mira o orçamento de criaturas da cena, e não o ND do grupo gravado. *Custo se estiver errado:* nenhum para encontros novos. Encontros antigos voltam ao orçamento ao serem rerrolados.

## Tarefas

### Tarefa 1 · Cálculo pelo livro
Reescrever `calculateCombatND` em `src/challenge.js` com a regra acima. Testes primeiro, num arquivo novo `scripts/combatChallenge.test.mjs` (incluído em `npm run test:ecology` ou em um script próprio), cobrindo as linhas da tabela, o exemplo do livro, NDs iguais (2, 3, 4 e 8 ameaças), grupos com ameaças abaixo de 1, o reagrupamento por empate e os ND especiais. O teste existente "combat ND with several special or unrated sheets" continua passando.

### Tarefa 2 · Busca de composições
Adaptar quem dependia da média:
- `selectRatings` em `src/encounterGroupComposition.js`: a memória usa a chave `quantidade:soma:temNd≥1`, que só vale para a média. Com a regra nova, o ND depende de quais NDs foram escolhidos. A chave precisa refletir isso (por exemplo, a lista ordenada dos NDs já escolhidos), sem deixar a busca lenta.
- `getRequiredAdditionCR` e o refinamento em `src/encounterResolver.js`: hoje invertem a fórmula da média. Devem achar o ND a acrescentar testando candidatos com `calculateCombatND`.
- Conferir `archipelagoBoatAmbush.js`, `archipelagoPilot.js` e `missions/archipelagoMissionEncounter.js`, que comparam com `calculateCombatND`.
Testes: composições sorteadas fecham o ND alvo pela regra nova nas três faixas; a busca continua rápida nas suítes.

### Tarefa 5 · Guardiões refeitos (aprovado pelo PO em 27/11/2026)
Princípio do PO: o guardião é uma criatura forte e única na ilha. Ajudantes ficam só quando o conceito pede. Veja "Guardiões exclusivos" em `docs/superpowers/specs/2026-11-24-ilhas-novas-design.md`.

| Ilha | Guardião | Nova composição | ND |
|---|---|---|---|
| Costa do Coral | Lula e Pliorex (índice 1) | **Lula-Rainha do Recife**, versão de guardião da Lula-Gigante | 8 |
| Manguezal | Capitão Homem-Piranha (índice 2) | **Raagoran** (ficha oficial) | 8 |
| Ruínas Ciclópicas | A Senhora das Estátuas | **Senhora das Estátuas**, versão de guardião da Górgona | 9 |
| Névoa | O Sineiro | **O Sineiro**, versão de guardião do Fantasma | 8 |
| Névoa | O Mestre dos Ouvintes | Necromante, 3 Falsos Videntes e 2 Zumbis Fantasmagóricos | 8 |
| Cemitério | O Capitão dos Ossos | **O Capitão dos Ossos**, versão de guardião do Amálgama Esqueleto | 8 |
| Cemitério | O Caçador de Cabeças | Gnoll Caçador de Cabeças sozinho | 8 |
| Náufragos | O Primeiro Náufrago | **O Primeiro Náufrago**, versão de guardião do Afogado | 8 |
| Piratas | Capitão do Leilão | **Capitão do Leilão**, versão de guardião do Capitão do Conclave Pirata | 9 |
| Piratas | Ogro da Quilha | **Ogro da Quilha**, versão de guardião do Ogro das Sanguinárias | 9 |
| Vulcânica | Regente das Brasas | **Regente das Brasas**, versão de guardião da Salamandra Nobre | 9 |

**Versões de guardião.** Seguem o modelo do Corgann das Duas Marés em `src/creatureCatalog/spirits.js`: `regionalVariantOf`, `role: "solo"`, `roleSource: "adaptacao-nd"`, `source: { book: "Masmorra de Práxis" }` e uma descrição que credita a ficha base com livro e página. As habilidades se mantêm. Os números sobem até os da tabela solo do livro (`getThreatParameters("solo", nd)` em `src/threatCreationRules.js`) nos pontos em que a base estiver abaixo: PV, Defesa, resistências, bônus de ataque, dano médio e CD das habilidades. Nada é reduzido. As fichas ficam fora do sorteio global, como as variantes regionais.

**Textos de abertura.** Ajuste o `briefing` de cada composição alterada para a cena nova, com frases curtas e sem citar o nome da arena. Mantenha o `id` e o `name` de cada composição, para não mudar o sorteio de expedições salvas.

**Elencos.** Se uma ficha da lista da ilha (`islandCreatures`) deixar de aparecer em algum combate da ilha, retire-a da lista. Isso vale para o Capitão Pirata e o Amálgama Esqueleto no Cemitério e para o Fantasma na Névoa. Antes, fixe a origem anterior em `existingOriginByCreatureId`, para não mudar a escolta de caçadas já salvas. `npm run test:archipelago-rosters` precisa passar.

**Testes.** Os nove testes de guardião que estavam falhando voltam a passar, com o ND novo pela regra do livro. Cada versão de guardião ganha um teste que confere o ND, o papel, o vínculo com a ficha base, os valores mínimos da tabela solo e as habilidades preservadas.

### Tarefa 3 · Suítes e elencos
Rodar todas as suítes (`test:floors-1-10`, `test:floors-11-20`, `test:archipelago`, `test:archipelago-rosters`, `test:archipelago-missions`, `test:ecology`, `test:ranges`, `test:missions`, `test:treasure`). Atualizar expectativas de teste que só refletiam a fórmula antiga. Para cada ilha, comparar a cobertura de fichas antes e depois e reportar perdas sem mexer no elenco.

### Tarefa 4 · Documentação
Registrar a regra e a decisão no design das ilhas (seção "Onde paramos" e "Decisões do PO"), em `REQUISITOS_ANDARES_21_A_30.md` se ele citar o cálculo, e no README se houver menção à fórmula.

## Execução

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1 | `opus` | `opus` |
| 2 | `opus` | `opus` |
| 5 | `opus` | `opus` |
| 3 | `sonnet` | `sonnet` |
| 4 | `haiku` | `sonnet` |
| Revisão final | — | `opus` |

## Situação

- Tarefas 1, 2, 3 e 5 concluídas (commits d631119 a b37a262).
- Alvos fracionários de 1 ou mais na floresta: as criaturas fecham `Math.floor(alvo)`, e o ND da cena continua o mesmo.
- Onze guardiões refeitos e oito versões de guardião criadas.
- O PO manteve o Primeiro Náufrago com a Aura de Afogamento, por ser temático. A morte nas ilhas reinicia a ilha, e a mesa pode usar um mapa maior.
- O PO quer repensar a geração de encontros da floresta (11–20). O tema está em discussão separada.
