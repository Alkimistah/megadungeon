# Auditoria do Livro Básico — plano da primeira rodada

> Use a especificação de auditoria para as regras de versões, seleção e persistência.

- [x] Inventariar as 80 fichas do capítulo de ameaças e rastrear páginas impressas, páginas do PDF integral e fichas que atravessam páginas. A busca por blocos com Iniciativa e Defesa numéricas no restante do PDF ficou sem ocorrências.
- [x] Cruzar cada ficha por nome, aliases e valores de referência. Registrar divergências e campos que exigem leitura em `tmp/livros/auditoria-livro-basico.csv`.
- [x] Atualizar as referências confirmadas. Preservar IDs, mecânicas, criações de campanha e fontes principais já atribuídas a outro livro.
- [x] Verificar as 80 referências, a estabilidade dos 405 registros em relação ao catálogo anterior e os testes dos andares 1–10, 11–20 e de missões.

## Resultado da revisão

O cotejo de ND, atributos e estatísticas cobriu 1.120 campos. As diferenças numéricas são Reflexos do Gnoll Filibusteiro (+11 no Básico e +7 em Ameaças) e Carisma do Gorlogg (−2 no Básico e −4 em Ameaças). O cruzamento inicial de ações também confirmou que o machado do Orc Mutante tem ataque +11 no Básico e +20 em Ameaças. Os três registros atuais usam os valores de Ameaças.

A revisão manual resolveu os 48 alertas textuais de 17 fichas. Os resultados foram 32 regras compartilhadas confirmadas nos quadros de dragões (p. 311) e lefeu (p. 315), 9 diferenças de redação, abreviação ou layout, e 7 diferenças de ficha entre os livros. O relatório local `tmp/livros/auditoria-livro-basico-revisao.csv` registra cada decisão com páginas e campo.

Além das duas diferenças numéricas acima, a revisão confirmou diferenças no ataque do Orc Mutante, na munição do Gnoll Filibusteiro, em quatro entradas de magia e habilidade do Capelão de Guerra e no gatilho de Ataque Reflexo do Reishid. A primeira rodada registrou essas diferenças e preservou o conteúdo e os IDs existentes.

## Versões por fonte

| Ficha | ID do Livro Básico | Commit |
|---|---|---|
| Gnoll Filibusteiro | `gnoll-filibusteiro-livro-basico` | `7ca2fd8` |
| Gnoll Saqueador | `gnoll-saqueador-livro-basico` | Lote de Gnolls |
| Gárgula | `gargula-livro-basico` | Lote de Golens |
| Golem de Ferro | `golem-de-ferro-livro-basico` | Lote de Golens |
| Orc Mutante | `orc-mutante-livro-basico` | `78d85bf` |
| Ogro | `ogro-livro-basico` | `3c510e1` |
| Chefe Bandido | `chefe-bandido-livro-basico` | `3c510e1` |
| Reishid | `reishid-livro-basico` | Lote do Culto de Aharadak |
| Capelão de Guerra | `capelao-de-guerra-livro-basico` | Lote da Igreja de Arsenal |

As versões do Básico estão disponíveis na seleção manual. As fichas de Ameaças mantêm os IDs originais e seguem como padrão dos perfis existentes. Gorlogg segue pendente de separação por fonte. [Piloto do Gnoll Filibusteiro](2026-11-18-piloto-versoes-gnoll.md) · [Auditoria de Ameaças de Arton](2026-11-18-auditoria-orcs-ameacas.md)

Os PDFs e o relatório detalhado ficam em `tmp/livros/`.
