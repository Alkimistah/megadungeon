# Ajustes da modal de tesouros após o uso no tablet

Complementa `2026-11-20-rolagem-de-tesouros-design.md`. As decisões abaixo são do PO, salvo quando indicado como decisão do gerente.

## Mudanças

1. **Sem faixa fixa de totais.** O rodapé discriminado já mostra os valores.
2. **Campo “Rolar”.** O campo antes chamado “Colunas” passa a se chamar **Rolar** e tem as opções **Itens e dinheiro**, **Só itens** e **Só dinheiro**. Uma dica explica que “Dinheiro” significa moedas e riquezas, como na Tabela 8-1.
3. **Totais.** Abaixo da lista de riquezas aparece **Total em riquezas: T$ X**. O rodapé ganha a linha **Valor total (dinheiro + riquezas): T$ Y**. Dinheiro, riquezas e itens continuam em seções separadas.
4. **Preço de todos os itens:**
   - **Itens comuns.** O preço base sai do Livro Básico: Tabela 3-3 (armas, p. 144–145), Tabela 3-5 (armaduras e escudos, p. 153) e Tabela 3-6 (itens gerais e esotéricos, p. 156–157).
   - **Itens superiores.** Somam ao preço base o custo das melhorias da Tabela 3-7 (p. 164): +T$ 300, 3.000, 9.000 ou 18.000, para 1 a 4 melhorias. Se houver material especial, somam também o preço adicional da Tabela 3-9 (p. 167).
   - **Itens mágicos encantados.** Somam o preço dos encantos da Tabela 8-7 (+T$ 18.000, 36.000 ou 72.000).
   - **Itens dos outros livros.** Usam o preço impresso nas próprias listas.
5. **Aba “Rolar com o livro”, antes Consultar.** O seletor de tabela inicial tem dois modos:
   - **Rolagem completa do livro (Tabela 8-1).** É o passo a passo do livro. A cada passo, a modal mostra a tabela daquele passo com as faixas de d% e destaca a linha obtida, para dispensar a consulta às páginas. Ao fim, mostra o quadro completo de dinheiro, riquezas e itens.
   - **Pesquisa avulsa em qualquer outra tabela.** Mostra só o que foi rolado, com preço, livro e página, sem o quadro de dinheiro, riquezas e itens.
6. **Abas.** As abas passam a se chamar **Gerar tesouros**, a antiga Rolar, e **Rolar com o livro**, a antiga Consultar. O visual é de abas de fichário, diferente dos botões do resto do app.
7. **Pesos entre livros, só na aba Gerar tesouros.**
   - **Regra geral.** Quando uma rolagem cai numa tabela secundária que outros livros ampliam, há 70% de chance de usar a tabela do Livro Básico. Os outros 30% vão para as listas dos outros livros, divididos na proporção do número de itens elegíveis de cada uma.
   - **Exceção.** A aba Rolar com o livro segue só o Livro Básico, porque os dados físicos usam as faixas impressas. Para rolar numa lista de outro livro, o mestre usa a opção “Tabela específica”.
   - **Origem de cada componente.** Cada componente do resultado registra livro e página. Por exemplo, uma espada longa do Livro Básico com uma melhoria de Heróis e outra de Deuses mostra a página da espada e a página de cada melhoria.

## Categorias com peso

| Tabela do Livro Básico | Listas dos outros livros |
|---|---|
| 8-3 Itens diversos | Itens gerais de Ameaças (3-3), Heróis (3-4) e Deuses (1-3) |
| 8-4 Arma | Armas de Ameaças (3-1) e Heróis (3-1) |
| 8-4 Armadura/escudo | Armaduras e escudos de Ameaças (3-2) e Heróis (3-3) |
| 8-5 Melhorias, por tipo de item | Melhorias de Deuses (1-4) e Novas Melhorias de Heróis (3-5, p. 240, a transcrever), filtradas pelo tipo de item a que se aplicam |
| Material especial (sub-rolagem da 8-5) | Materiais especiais de Ameaças (3-4) |
| 8-9 Armas específicas | Armas específicas de Heróis (3-9) da mesma categoria do item mágico (menor, médio ou maior). Se não houver lista dessa categoria, vale só o Livro Básico. Decisão do gerente. |
| 8-11 Armaduras e escudos específicos | Armaduras e escudos específicos de Heróis (3-10), com a mesma regra |
| 8-13, 8-14 e 8-15 Acessórios | Acessórios específicos de Heróis (3-12) da categoria correspondente |

Itens esotéricos, poções, encantos (8-8 e 8-10) e riquezas ficam 100% no Livro Básico.

## Regras do motor

- **Onde o peso entra.** O peso é aplicado só pela fonte aleatória (`resolveWithDice`). O passo grava o livro sorteado, a lista e o valor rolado nela, e a cascata mostra “Livro sorteado: Heróis de Arton (30%)”.
- **Repetições.** As regras de repetição, de “conta como duas” e de “apenas escudos” valem também para melhorias e encantos de outros livros. A repetição é comparada pelo nome.
- **Componentes do ganho.** O `Gain` de item passa a trazer `details.components`: uma lista de `{ role: "base" | "melhoria" | "encanto" | "material" | "específico", name, book, bookPage }`, mais o `price` calculado.

## Fora do escopo

Pesos ajustáveis na modal, ou diferentes por categoria. Descrições de efeitos.
