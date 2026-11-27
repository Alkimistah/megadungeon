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

## Tarefas

### Tarefa 1 · Cálculo pelo livro
Reescrever `calculateCombatND` em `src/challenge.js` com a regra acima. Testes primeiro, num arquivo novo `scripts/combatChallenge.test.mjs` (incluído em `npm run test:ecology` ou em um script próprio), cobrindo as linhas da tabela, o exemplo do livro, NDs iguais (2, 3, 4 e 8 ameaças), grupos com ameaças abaixo de 1, o reagrupamento por empate e os ND especiais. O teste existente "combat ND with several special or unrated sheets" continua passando.

### Tarefa 2 · Busca de composições
Adaptar quem dependia da média:
- `selectRatings` em `src/encounterGroupComposition.js`: a memória usa a chave `quantidade:soma:temNd≥1`, que só vale para a média. Com a regra nova, o ND depende de quais NDs foram escolhidos. A chave precisa refletir isso (por exemplo, a lista ordenada dos NDs já escolhidos), sem deixar a busca lenta.
- `getRequiredAdditionCR` e o refinamento em `src/encounterResolver.js`: hoje invertem a fórmula da média. Devem achar o ND a acrescentar testando candidatos com `calculateCombatND`.
- Conferir `archipelagoBoatAmbush.js`, `archipelagoPilot.js` e `missions/archipelagoMissionEncounter.js`, que comparam com `calculateCombatND`.
Testes: composições sorteadas fecham o ND alvo pela regra nova nas três faixas; a busca continua rápida nas suítes.

### Tarefa 3 · Suítes e elencos
Rodar todas as suítes (`test:floors-1-10`, `test:floors-11-20`, `test:archipelago`, `test:archipelago-rosters`, `test:archipelago-missions`, `test:ecology`, `test:ranges`, `test:missions`, `test:treasure`). Atualizar expectativas de teste que só refletiam a fórmula antiga. Para cada ilha, comparar a cobertura de fichas antes e depois e reportar perdas sem mexer no elenco.

### Tarefa 4 · Documentação
Registrar a regra e a decisão no design das ilhas (seção "Onde paramos" e "Decisões do PO"), em `REQUISITOS_ANDARES_21_A_30.md` se ele citar o cálculo, e no README se houver menção à fórmula.

## Execução

| Tarefa | Implementador | Revisor |
|---|---|---|
| 1 | `opus` | `opus` |
| 2 | `opus` | `opus` |
| 3 | `sonnet` | `sonnet` |
| 4 | `haiku` | `sonnet` |
| Revisão final | — | `opus` |
