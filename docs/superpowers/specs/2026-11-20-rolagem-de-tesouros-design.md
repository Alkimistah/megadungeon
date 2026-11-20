# Rolagem de tesouros

## Intenção

O mestre precisa resolver tesouros na mesa sem folhear as tabelas do Livro Básico. A modal **Tesouros** cobre dois usos:

- **Rolar:** o sistema rola um lote inteiro, por exemplo 3 tesouros Padrão e 5 Metade de ND 1/4, mais 2 Padrão e 1 só de item de ND 3. Cada rolagem aparece discriminada, e o rodapé soma o lote.
- **Consultar:** o mestre rolou os dados físicos. Ele segue o processo do livro para um tesouro por vez: escolhe a tabela, informa o valor do dado e recebe o resultado, encadeando as tabelas seguintes.

Os itens de Ameaças de Arton, Heróis de Arton e Deuses de Arton entram como tabelas próprias, que podem ser roladas ou consultadas à parte.

## Objetivos

- Reproduzir as Tabelas 8-1 a 8-15 do Livro Básico (pp. 328–343 impressas, PDF 334–349), com as regras de tesouro da p. 327: Nenhum, Padrão, Metade e Dobro, além das marcas +% e 2D da Tabela 8-1.
- Mostrar cada passo: o valor rolado, a linha da tabela e o encadeamento para a tabela seguinte. Expressões de dados aparecem com a expressão e o valor obtido.
- Agregar o lote no rodapé: dinheiro por moeda e total em T$, riquezas discriminadas e itens com quantidades.
- Organizar os dados por livro e por categoria, para permitir a ponderação futura entre livros.

## Fora do escopo

- Ler encontros ou fichas. A modal não conversa com o combate, e os dados são informados à mão.
- Guardar o lote. Ele vive na modal até ela ser fechada ou o app recarregado, e não entra no código de sessão.
- Ponderar livros nas tabelas secundárias, por exemplo 70% para a tabela do Livro Básico. Fica para uma etapa futura, já prevista na organização dos dados.
- Descrever efeitos de itens, encantos e melhorias. A modal mostra nome, categoria, preço e página.

## Antiobjetivos

- Alterar as faixas de d% das tabelas do Livro Básico. A aba Consultar depende delas para bater com os dados físicos.
- Carregar as tabelas na abertura do app.

## Restrições

- JavaScript vanilla com ES Modules, sem dependências novas. O app é estático no GitHub Pages e funciona offline como PWA.
- A modal e as tabelas são carregadas com `import()` na primeira abertura. O service worker precisa cachear o chunk gerado, e o builder deve confirmar isso no modo offline.
- Moedas (Livro Básico, p. 140): TC vale T$ 0,1 e TO vale T$ 10.
- Os PDFs ficam em `tmp/livros/`. A transcrição é local, e o repositório guarda só os dados transcritos.

## Abordagens

- **A) Motor único com fonte de dados plugável (escolhida).** As tabelas são dados puros. Um motor resolve as cadeias passo a passo e pede cada valor de dado a uma fonte. Na aba Rolar, a fonte é o gerador aleatório; na aba Consultar, é o valor digitado. As duas abas compartilham a exibição e o rodapé, e a ponderação futura vira mais um passo do motor.
- **B) Uma implementação por aba.** Mais rápida no início, mas duplicaria encadeamento, Metade, Dobro, +% e 2D, que tenderiam a divergir.
- **C) Tabelas como texto, com cálculo à mão.** Perderia o encadeamento, que é o centro do pedido.

Para os outros livros, foi escolhida a opção de tabelas próprias. Uma tabela estendida mudaria as faixas do livro, e a sub-rolagem por livro fica para a etapa de ponderação.

## Desenho

### Dados

`src/treasure/tables/basicBook.js` contém as quinze tabelas, cada uma com `id` (`"8-1"`…`"8-15"`), título, páginas impressa e do PDF, e o dado da tabela. Cada linha tem `min`, `max` e um `result` tipado:

| `kind` | Campos | Origem |
|---|---|---|
| `none` | — | “—” |
| `money` | `dice` (ex.: `"2d6+1"`), `multiplier`, `currency` (`TC`, `T$`, `TO`) | 8-1, Dinheiro |
| `wealth` | `count` (`1` ou expressão), `tier` (`menor`, `média`, `maior`), `bonus20` | 8-1, Dinheiro |
| `diverse` | — | 8-1, Itens → 8-3 |
| `equipment` | — | 8-1, Itens → 1d6 → 8-4 |
| `potion` | `count`, `bonus20` | 8-1, Itens → 8-12 |
| `superior` | `improvements`, `twoDice` | 8-1, Itens → tipo → 8-4 → 8-5 |
| `magic` | `tier`, `twoDice` | 8-1, Itens → 1d6 → 8-4/8-8/8-9, 8-10/8-11 ou 8-13/8-14/8-15 |
| `item` | `name`, `price`, `spaces` e campos da tabela | tabelas finais |
| `wealthValue` | `dice`, `multiplier`, `average`, `examples` | 8-2 |
| `enchantment` / `improvement` | `name`, `special` (ex.: arma específica) | 8-5, 8-8, 8-10 |

As tabelas de várias colunas, 8-2, 8-4 e 8-5, ficam como subtabelas nomeadas, por exemplo `8-2/menor` e `8-4/arma`. A Tabela 8-1 fica indexada por ND e por coluna (`money`, `items`).

`src/treasure/tables/threats.js`, `heroes.js` e `gods.js` guardam listas, não tabelas d%. Cada item tem `name`, `category` (`arma`, `armadura`, `escudo`, `esotérico`, `acessório`, `item geral`, `material`, `melhoria`, `poção`), `tier` quando for mágico, `price` e página. Cada lista é numerada de 1 a N na ordem do livro, e a modal indica o dado correspondente. Fontes previstas:

- Ameaças: novas armas, armaduras e escudos, itens gerais e materiais especiais (Tabelas 3-1 a 3-4, pp. 394–400).
- Heróis: armas, munições, armaduras e escudos, itens gerais, armas, armaduras e escudos, esotéricos e acessórios específicos (Tabelas 3-1 a 3-4 e 3-9 a 3-12).
- Deuses: itens gerais e melhorias (Tabelas 1-3 e 1-4).

### Motor

`src/treasure/treasureEngine.js`, com funções puras:

- `startTreasure({ challengeRating, column, mode })` e `startTable(tableId, options)` criam o estado de uma cadeia.
- `nextStep(state)` devolve o próximo pedido de dado (`{ tableId, die, bonus, reason }`) ou `null` quando a cadeia termina.
- `applyRoll(state, value)` registra o valor, resolve a linha e devolve o novo estado.
- `resolveWithDice(state, diceSource)` repete `nextStep` e `applyRoll` com uma fonte aleatória. É o que a aba Rolar usa.
- O resultado é uma árvore de passos (`{ tableId, die, value, entry, children }`) mais uma lista plana de ganhos (`money`, `wealth`, `item`), que o rodapé agrega.

Regras:

1. **Metade:** divide por dois os resultados da coluna Dinheiro, tanto as moedas quanto o valor de cada riqueza. Os itens não mudam.
2. **Dobro:** cria duas cadeias para cada coluna pedida.
3. **+%:** soma 20 ao d% seguinte, que define o tipo de riqueza ou de poção, com máximo de 100.
4. **2D:** a rolagem de tipo usa 2d6.
   - **Na aba Rolar:** se os dois dados forem iguais, vale esse valor. Se forem diferentes, o sistema sorteia um dos dois com chance igual. O passo mostra os dois dados e qual foi escolhido.
   - **Na aba Consultar:** o passo informa que a linha tem 2D e pede o valor do dado que o mestre escolheu.
5. **Encanto ou melhoria repetidos:** um resultado que repete um encanto ou uma melhoria já obtidos no mesmo item é rolado de novo. O passo registra a repetição. Na aba Consultar, o motor pede um novo valor e explica o motivo.
6. **Contagem:** “1d3+1 riquezas menores” rola a contagem e depois cada riqueza na 8-2. Poções seguem a mesma lógica na 8-12.
7. **Item mágico:** a categoria define 1, 2 ou 3 encantos, um por rolagem na 8-8 ou na 8-10. O resultado “específica” troca o item pela 8-9 ou pela 8-11 e descarta os encantos rolados.
8. **Notas de rodapé das tabelas:** viram restrições da linha, aplicadas pelo motor com nova rolagem registrada no passo. Os casos:
   - “Conta como dois encantos. Para itens menores, role novamente.”
   - “Conta como duas melhorias. Se o item só possuir uma, role novamente.”
   - “Apenas escudos. Para armaduras, role novamente.”
   - Na aba Consultar, o passo pede um novo valor e explica o motivo.
9. **Sub-rolagens indicadas na linha:** são passos extras da cadeia. É o caso do material (1d6: aço-rubi, adamante…) e do tipo de criatura de Anticriatura (1d6).

### Decisões do autor do design

- **Metade:** divide o valor final de cada resultado de Dinheiro, moedas e cada riqueza. A quantidade de riquezas não muda. Valores fracionários descem para a moeda menor, e o que restar abaixo de 1 TC é descartado. O livro diz apenas “divida pela metade quaisquer resultados rolados na coluna Dinheiro”.
- **Listas dos outros livros por categoria mágica:** viram uma tabela por categoria, por exemplo “Heróis — Acessórios específicos (menores)”, para casar com Mágico (menor/médio/maior) na ponderação futura.
- **Quantidade por linha do lote:** vai de 1 a 99.

### Interface

- **Botão:** fica no cabeçalho, junto ao encontro manual e às missões, com o ícone `streamline-cyber--treasure-chest-open.svg`. Ele abre `<dialog id="treasureDialog">`, cujo módulo é carregado na primeira abertura. Por decisão do PO, a modal segue a do nodo: ocupa a tela inteira (100vw × 100vh, sem bordas arredondadas), usa a moldura compartilhada das modais e mantém a mesma largura nas duas abas. As cores seguem o tema do perfil de andares selecionado: fundos, bordas, cartões, abas, botões e faixa de totais usam as variáveis que `applyTheme` define (`--page`, `--surface`, `--surface-alt`, `--panel`, `--border`, `--border-soft`, `--action`, `--action-hover`), sem cores de tema fixas.
- **Aba Rolar:** uma lista de linhas, cada uma com ND, Quantidade, Tipo (Padrão, Metade ou Dobro) e Colunas (Item + Riqueza, Só Item ou Só Riqueza). Uma linha também pode apontar para uma tabela específica, inclusive uma lista de outro livro, com quantidade. O botão “+ Adicionar rolagem” inclui uma linha, e “✕” a remove. Metade fica desativado em linhas “Só Item”.
  - **Rolar tudo:** gera o lote. Os resultados aparecem agrupados pela linha de entrada, com uma linha numerada por tesouro e a cascata de passos em cada célula. Rolar de novo substitui o lote.
- **Aba Consultar:** começa em qualquer tabela. A 8-1 pede ND e coluna. Cada passo mostra a tabela e um campo para o valor, e o motor abre o passo seguinte já com a tabela certa.
  - **Expressões de dados:** aceitam o total digitado ou um botão “rolar” só para aquela expressão.
  - **Fim da cadeia:** mostra o resultado consolidado, e “Nova consulta” reinicia.
- **Rodapé, nas duas abas:** dinheiro por moeda e total em T$, riquezas com valor e exemplo, e itens agrupados por nome completo com quantidade e preço.

## Validação

- **Dados:** em cada tabela ou subtabela d%, as faixas cobrem de 1 a 100 sem lacuna nem sobreposição, e as tabelas 1d6 cobrem de 1 a 6. Todo `kind` que encadeia aponta para uma tabela existente. A contagem de linhas de cada tabela confere com a página renderizada.
- **Motor:** testes com fonte de dados fixa reproduzem os exemplos do livro: o necromante de ND 7, uma espada longa com encanto uma cadeia com +%, o 2D com dados iguais e diferentes e um encanto repetido. Também cobrem Metade, Dobro e a contagem de riquezas e poções.
- **Interface:** um roteiro Playwright monta o lote do exemplo, com 8 tesouros de ND 1/4 (5 Metade) e 3 de ND 3 (1 só de item). Ele confere o número de linhas e o rodapé. Outro roteiro faz uma consulta encadeada, 8-1 → 8-4 → item. Tudo roda sem erros de JavaScript e também offline depois do cache.
- **Suítes existentes e build:** continuam passando.

## Ordem sugerida

1. Transcrever as tabelas do Livro Básico e validá-las.
2. Construir o motor e seus testes.
3. Montar a aba Rolar com o rodapé.
4. Montar a aba Consultar.
5. Transcrever as listas dos outros livros e integrá-las às duas abas.
6. Atualizar o `ARCHITECTURE.md`.

## Deixado ao builder

Os nomes de funções internas, o layout CSS dentro do padrão das modais existentes e a forma de numerar as listas dos outros livros, se por ordem impressa ou alfabética, mantendo a mesma ordem nas duas abas.
