# Cristais na rolagem de tesouros

As decisões abaixo são do PO, de 21/11/2026, salvo quando indicado como decisão do gerente.

## Contexto

Na Mega Dungeon de Práxis, cada monstro derrotado deixa um cristal do seu ND. Durante a expedição, um jogador anota no papel os tesouros, os cristais e os itens conquistados. No fim, o grupo rola o que for preciso nas tabelas e divide o total igualmente entre os jogadores, que podem ser de 3 a 6. A contagem automática de cristais durante a expedição foi descartada.

As regras vêm de `tmp/cristais/cristais.md`, um arquivo do PO que não é versionado:
- **Azul:** o cristal comum, de criaturas normais. Vale o valor da tabela.
- **Verde:** raro, de criaturas especiais. Hoje são os chefes. O PO fixou **5×** o valor do ND.
- **Irregular** ou de coloração incomum: perigoso, ilegal ou muito disputado. Não tem valor definido; o PO fixou **10×** como **estimativa**, que depende da negociação dos jogadores.

## Tabela de valores (`src/economy/crystalValues.js`)

- **ND 1/4 a 10:** não mudam, e seguem os valores atuais: 5, 10, 20, 40, 75, 120, 200, 300, 450, 650, 900 e 1.200.
- **ND 11 a 20:** decisão do gerente, aprovada pelo PO. O valor cresce cerca de 1,3× por ND, e de ND 10 a 20 isso dá 13×, perto das cerca de 12× da média da Tabela 8-1 simulada.

| ND | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
|---|---|---|---|---|---|---|---|---|---|---|
| Azul (T$) | 1.600 | 2.000 | 2.600 | 3.400 | 4.400 | 5.700 | 7.400 | 9.600 | 12.500 | 16.000 |

A mesma tabela já serve às recompensas de missão. Com a extensão, as missões acima de ND 10 deixam de travar em T$ 1.200.

## Aba Gerar tesouros

- **Origem “Cristais”.** O campo Origem da linha ganha a opção **Cristais**. A linha de cristais tem três campos:
  - **ND:** 1/4, 1/2 e 1 a 20.
  - **Cor:** Azul, Verde ou Irregular. Vem **Azul** por padrão.
  - **Quantidade:** de 1 a 99, com a mesma validação das outras linhas.
  
  Os campos de tesouro (Tipo, Rolar, Tabela) não aparecem nessa linha.
- **Sem sorteio.** Cristais não passam pelo motor de rolagem. O valor é `quantidade × valor do ND × multiplicador da cor`, com os multiplicadores 1 (azul), 5 (verde) e 10 (irregular).
- **Resultado.** As linhas de cristais não entram na lista numerada de tesouros, mas aparecem no rodapé do lote.
- **Posição no rodapé.** Os cristais ficam **logo abaixo de Dinheiro**, na mesma coluna, porque Dinheiro nunca tem muita informação:
  - uma linha por grupo, por exemplo “4× cristal azul ND 3 — T$ 75 cada — T$ 300”;
  - o irregular leva “(estimativa)”;
  - no fim do bloco, **“Total em cristais: T$ X”**.
- **Valor total.** A linha passa a ser **“Valor total (dinheiro + riquezas + cristais): T$ Y”**.
- **Divisão entre jogadores.**
  - No topo da aba fica a opção **“Dividir entre jogadores?”**: uma caixa ou um interruptor, mais um número de 1 a 10, que começa em 5.
  - Quando ligada, o rodapé mostra **“Por jogador: T$ Z”**, o valor total dividido pelo número de jogadores. É decisão do gerente que o valor seja arredondado para baixo, em tibares inteiros, com o resto informado (“sobram T$ R”).
  - Fica desligada por padrão. Leitura do gerente: “no começo da sessão” foi entendido como o topo da aba, antes das linhas.
- **Lote só de cristais.** Um lote apenas com linhas de cristais é válido. O rodapé mostra cristais e o valor total, e as seções vazias aparecem como hoje.

## Fora do escopo

- A aba Rolar na mesa, onde não há o que rolar.
- A contagem automática na expedição.
- Mudanças nos valores de ND 1/4 a 10.
