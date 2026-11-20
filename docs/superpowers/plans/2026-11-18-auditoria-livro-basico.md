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
| Gorlogg | `gorlogg-livro-basico` | Lote de Montarias |

As versões do Básico estão disponíveis na seleção manual. As fichas de Ameaças mantêm os IDs originais e seguem como padrão dos perfis existentes. Não há versão pendente de separação por fonte. [Piloto do Gnoll Filibusteiro](2026-11-18-piloto-versoes-gnoll.md) · [Auditoria de Ameaças de Arton](2026-11-18-auditoria-orcs-ameacas.md)

Os PDFs e o relatório detalhado ficam em `tmp/livros/`.

## Segunda passada — 20 de novembro de 2026

A revisão cobriu as 76 fichas cuja fonte principal é o Livro Básico. As outras quatro entradas do inventário de 80 têm Ameaças como fonte principal e referência secundária ao Básico: Glop, Orc Combatente, Orc Chefe e Bandido Comum.

Foram cotejados 486 campos de ataques, habilidades, perícias, equipamentos e tesouro. A busca textual normalizada localizou 453 diretamente no bloco da ficha. Os outros 33 foram relidos na ficha ou no quadro de regras correspondente. O cotejo de Iniciativa, Percepção, Defesa, resistências, PV, PM quando impressos e atributos não encontrou diferença numérica nessas 76 fichas.

- **Oito alertas de transcrição e layout.** O Sopro do Golem de Ferro, a Sensibilidade a Luz do Orc Mutante e o Ataque Furtivo do Chefe Bandido têm redação equivalente. A arte interrompe Balistas, Arsenal de Engenhocas e Carapaça na extração. O Globo de Invulnerabilidade do Dragão Adulto tem uma letra inicial encoberta no texto extraído. O ataque do Reishid tem os mesmos dados, três bônus de +30, margem 19 e dano adicional de trevas em outra ordem.
- **25 alertas de regras compartilhadas.** Doze são habilidades dracônicas, com a regra geral na p. 311 e parâmetros de Aura Aterradora na ficha. Treze são habilidades lefeu, com a regra geral na p. 315 e a perda de PM e CD de Insanidade da Tormenta na ficha. A verificação dos custos também confirmou 4 PM de Magia Acelerada na Nagah Mística e no Sacerdote de Aharadak.
- **Papéis impressos.** A comparação visual usou a legenda da p. 283 impressa. São 43 Solo, 21 Lacaio e 12 Especial. Em 18 casos, o papel anterior do app diferia do impresso. As 76 fichas agora usam o papel impresso na apresentação e na geração. A tabela preserva o papel anterior para rastrear as mudanças.

| ID | Página impressa | Página no PDF integral | Papel impresso | Papel anterior | Campos textuais |
|---|---:|---:|---|---|---:|
| `orc-mutante-livro-basico` | 286 | 292 | Lacaio | Lacaio | 5 |
| `rato-gigante` | 286 | 292 | Lacaio | Lacaio | 3 |
| `aranha-gigante` | 287 | 293 | Solo | Solo | 5 |
| `centopeia-dragao` | 287–288 | 293–294 | Solo | Solo | 5 |
| `gargula-livro-basico` | 287 | 293 | Solo | Solo | 3 |
| `guerreiro-de-chifres` | 287 | 293 | Solo | Solo | 5 |
| `manticora` | 287 | 293 | Solo | Solo | 3 |
| `golem-de-ferro-livro-basico` | 288 | 294 | Solo | Solo | 4 |
| `chefe-bandido-livro-basico` | 289 | 295 | Solo | Solo | 6 |
| `guarda-de-cidade` | 289 | 295 | Lacaio | Lacaio | 4 |
| `sargento-da-guarda` | 289 | 295 | Solo | Solo | 6 |
| `centauro-combatente` | 290 | 296 | Solo | Solo | 7 |
| `centauro-xama` | 290 | 296 | Especial | Especial | 10 |
| `gnoll-saqueador-livro-basico` | 290 | 296 | Lacaio | **Especial** | 4 |
| `lobo` | 290 | 296 | Lacaio | **Solo** | 5 |
| `gnoll-filibusteiro-livro-basico` | 291 | 297 | Solo | Solo | 5 |
| `gorlogg-livro-basico` | 291 | 297 | Solo | Solo | 4 |
| `trog` | 291–292 | 297–298 | Lacaio | Lacaio | 7 |
| `cao-do-inferno` | 292 | 298 | Solo | Solo | 4 |
| `grifo` | 292 | 298 | Solo | Solo | 3 |
| `lobo-das-cavernas` | 292 | 298 | Solo | Solo | 5 |
| `basilisco` | 293 | 299 | Solo | Solo | 4 |
| `ogro-livro-basico` | 293 | 299 | Solo | Solo | 6 |
| `serpe` | 293 | 299 | Solo | Solo | 4 |
| `urso-coruja` | 293 | 299 | Solo | Solo | 3 |
| `recruta-purista` | 294 | 300 | Lacaio | **Especial** | 4 |
| `sargento-mor` | 294 | 300 | Solo | Solo | 6 |
| `soldado-purista` | 294 | 300 | Lacaio | **Especial** | 5 |
| `capelao-de-guerra-livro-basico` | 295 | 301 | Especial | Especial | 9 |
| `capitao-baluarte` | 295 | 301 | Especial | Especial | 6 |
| `cavaleiro-do-leopardo-sangrento` | 295 | 301 | Solo | **Especial** | 10 |
| `colosso-supremo` | 296 | 302 | Solo | Solo | 8 |
| `esqueleto` | 297 | 303 | Lacaio | Lacaio | 3 |
| `esqueleto-de-elite` | 297–298 | 303–304 | Lacaio | **Especial** | 3 |
| `turba-zumbi` | 297 | 303 | Lacaio | **Solo** | 5 |
| `zumbi` | 297 | 303 | Lacaio | **Solo** | 3 |
| `aparicao` | 298 | 304 | Solo | **Especial** | 4 |
| `falange` | 298 | 304 | Lacaio | **Solo** | 5 |
| `necromante` | 298 | 304 | Especial | Especial | 10 |
| `vampiro` | 299 | 305 | Solo | Solo | 9 |
| `goblin-engenhoqueiro` | 300–301 | 306–307 | Especial | Especial | 9 |
| `goblin-salteador` | 300 | 306 | Lacaio | Lacaio | 4 |
| `hobgoblin-soldado` | 300 | 306 | Lacaio | Lacaio | 5 |
| `arauto-de-thwor` | 301 | 307 | Solo | Solo | 9 |
| `engenho-de-guerra-goblin` | 301–303 | 307–309 | Solo | Solo | 3 |
| `hobgoblin-mago-de-batalha` | 301 | 307 | Especial | Especial | 11 |
| `devorador-de-medos` | 303 | 309 | Solo | Solo | 7 |
| `sombra-de-thwor` | 303 | 309 | Especial | Especial | 10 |
| `cascavel` | 304 | 310 | Lacaio | **Especial** | 4 |
| `jiboia` | 304 | 310 | Lacaio | **Solo** | 5 |
| `naja` | 304 | 310 | Lacaio | Lacaio | 4 |
| `sucuri` | 304 | 310 | Solo | **Especial** | 5 |
| `nagah-guardiao` | 305 | 311 | Lacaio | **Especial** | 5 |
| `nagah-mistica` | 305 | 311 | Especial | Especial | 10 |
| `cultista-de-sszzaas` | 306 | 312 | Especial | Especial | 8 |
| `hidra` | 306 | 312 | Solo | Solo | 4 |
| `lagash` | 306 | 312 | Solo | Solo | 8 |
| `finntroll-cacador` | 307 | 313 | Solo | Solo | 9 |
| `finntroll-feitor` | 307 | 313 | Especial | Especial | 10 |
| `ganchador` | 308 | 314 | Solo | Solo | 5 |
| `troll` | 308–309 | 314–315 | Solo | Solo | 3 |
| `troll-das-cavernas` | 309 | 315 | Solo | Solo | 5 |
| `dragao-filhote` | 310 | 316 | Solo | Solo | 4 |
| `dragao-jovem` | 310–311 | 316–317 | Solo | Solo | 7 |
| `enxame-kobold` | 310 | 316 | Solo | **Especial** | 4 |
| `dragao-adulto` | 311 | 317 | Solo | Solo | 16 |
| `dragao-veneravel` | 311–312 | 317–318 | Solo | Solo | 19 |
| `dragao-rei` | 312–313 | 318–319 | Solo | Solo | 21 |
| `tirano-do-terceiro` | 313 | 319 | Solo | Solo | 9 |
| `geraktril` | 314 | 320 | Solo | Solo | 6 |
| `maniaco-lefou` | 314 | 320 | Lacaio | **Especial** | 4 |
| `reishid-livro-basico` | 314–315 | 320–321 | Especial | **Solo** | 11 |
| `uktril` | 314 | 320 | Lacaio | **Especial** | 6 |
| `otyugh` | 315–316 | 321–322 | Solo | Solo | 6 |
| `thuwarokk` | 315 | 321 | Solo | Solo | 9 |
| `sacerdote-de-aharadak` | 316 | 322 | Especial | Especial | 11 |
