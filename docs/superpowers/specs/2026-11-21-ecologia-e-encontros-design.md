# Ecologia das criaturas e encontros por etiquetas

As decisões abaixo são do PO, tomadas em 21/11/2026, salvo quando indicado como decisão do gerente.

## Intenção

O catálogo tem 574 fichas conferidas: Livro Básico 76, Ameaças de Arton 418, Deuses de Arton 76 e Masmorra de Práxis 4. Já chegou o **Bestiário de Arton**, com cerca de 200 monstros. O PDF já está em `tmp/livros/T20 Bestiario de Arton.pdf` e tem um apêndice “Criaturas por ND” (PDF 188).

Hoje os encontros automáticos escolhem a criatura por ND e por tipo. A afinidade com o terreno existe só para cerca de 20 criaturas e alguns subtipos, numa lista fixa no código (`TERRAIN_AFFINITIES` em `src/encounterResolver.js`). As criaturas de apoio também estão numa lista fixa (`SUPPORT_CREATURE_IDS_BY_TYPE`). A faixa 21–30 ainda não tem regras de criatura.

O encontro manual mostra ND, tipo, armadilha e só os terrenos da faixa ativa.

O PO quer três coisas:
- criaturas que façam sentido no lugar, como os enxames de mãos-garra no pântano com neblina, que “foi muito bom e marcante”;
- o catálogo pronto para receber livros novos sem refazer o gerador;
- um encontro manual que acompanhe o catálogo.

**Objetivos:**
- cada criatura diz onde aparece, como aparece e com que frequência;
- o gerador escolhe por essas etiquetas;
- cada faixa de andares se torna configuração;
- livro novo significa só fichas novas com etiquetas.

**Não objetivos:**
- mudar o cálculo de ND, que o PO considera correto;
- mexer na faixa 1–10, que mantém a curadoria por andar (`allowedCreatureIdsByFloor`).

**Anti-objetivos:**
- etiquetas sem fonte, inventadas;
- um gerador que exige ou necessite editar código a cada livro;
- uma revisão impossível de fazer, com mil fichas soltas e sem agrupamento.

## Vocabulário

### 1. Terreno

São os 9 terrenos oficiais do Livro Básico, conforme a habilidade de terreno e o capítulo Terrenos (PDF 274–275): **aquático, ártico, colina, deserto, floresta, montanha, pântano, planície, subterrâneo**. Uma criatura pode ter vários.

### 2. Lugar especial

É opcional e pode ter mais de um valor:
- **masmorra construída**;
- **ruínas**;
- **catacumbas/necrópole**;
- **cavernas profundas/minas**;
- **colmeia/ninho**;
- **urbano**;
- **alturas**;
- **vulcânico**;
- **costa e ilhas**;
- **mar aberto**;
- **planos elementais**;
- **infernal/abissal**;
- **Tormenta**.

Os lugares vêm do esboço de progressão dos andares do PO, de 1 a 100:

| Faixa | Lugar |
|---|---|
| 1–10 | Labirinto |
| 11–20 | Floresta com névoa |
| 21–30 | Oceano e ilhas |
| 31–40 | Zona vulcânica e elemental |
| 41–50 | Ártico e montanha |
| 51–60 | Catacumbas |
| 61–70 | Cavernas de minério e autômatos |
| 71–80 | Domínio insetoide |
| 81–94 | Covil dos dragões, com tempestade, fogo e relâmpago |
| 95 | Zona segura e urbana |
| 96–99 | Portões do Inferno |
| 100 | Núcleo |

### 3. Condição

É uma preferência e dá peso extra: **neblina, escuridão, calor extremo, frio extremo, tempestade, miasma**.

### 4. Comportamento em grupo

**solitária, dupla, bando, enxame, horda**. Define a quantidade e com quem a criatura aparece.

### 5. Raridade

**comum, incomum, rara**. Serve para que criaturas marcantes não se repitam.

### 6. Só manual

É uma marca. A criatura nunca entra em sorteio, mas aparece no encontro manual. Entram aqui:
- avatares e aspectos divinos;
- NPCs únicos;
- fichas de consulta sem ND numérico, como o Luminar e o Rival Espelho;
- o tipo `event`.

**Família/tema não é etiqueta nova.** As faixas temáticas, como mortos-vivos, construtos, insetos e dragões, usam o **tipo** e o **subtipo** que a ficha já tem.

## Decisões de construção (escolhidas pelo PO)

1. **Onde moram as etiquetas: num arquivo próprio,** `src/creatureCatalog/ecology.js`, que liga o id da criatura às etiquetas, no mesmo padrão de `sources.js`.
   - As fichas continuam sendo transcrição do livro.
   - Uma ficha sem etiqueta continua funcionando, com peso neutro.
   - O vocabulário fica num módulo próprio. Qualquer etiqueta fora dele é erro de teste.
2. **Como sugerir: rascunho automático conferido com os livros.**
   - O rascunho combina regras por tipo e subtipo com a leitura do texto da descrição.
   - Nos casos sem descrição (157 fichas) ou ambíguos, subagentes leem a página original com `tools/pdf/` (pela `source.pdfPage` da ficha).
   - Cada sugestão traz o trecho do livro que a justifica.
3. **Como o PO revisa: planilha CSV agrupada por família.** Ela traz a criatura, as etiquetas sugeridas, a confiança e a citação. O PO corrige a planilha, e um script gera o `ecology.js`. O PO prefere conforto visual, então a planilha precisa ter colunas claras, uma etiqueta por coluna de categoria e as famílias ordenadas.

## Ordem dos projetos

Cada projeto tem o seu próprio plano.

1. **Etiquetas.** Vocabulário, `ecology.js`, rascunho com citações das 574 fichas, revisão do PO e aplicação. O plano é `docs/superpowers/plans/2026-11-21-ecologia-fase-1-etiquetas.md`.
2. **Gerador por etiquetas.**
   - `encounterResolver.js` passa a usar terreno, lugar e condição como peso ou filtro, com fallback, além da raridade, do comportamento em grupo e da marca só manual.
   - As listas fixas (`TERRAIN_AFFINITIES`, `SUPPORT_CREATURE_IDS_BY_TYPE`) saem.
   - Os perfis 11–20 e 21–30 declaram terrenos, lugares, condições e pesos de tipo e subtipo.
   - A faixa 1–10 não muda.
   - Cada livro pode ser ligado ou desligado nos sorteios.
3. **Encontro manual novo.**
   - Filtros por terreno, lugar e condição (todos, não só os da faixa), tipo, ND, papel e livro.
   - Busca por nome e composição opcional (solitária, grupo, enxame).
   - Usa a paleta bronze quando aberto pela tela inicial, o que já existe.
4. **Bestiário de Arton.**
   - Cadastro das cerca de 200 fichas, conferido com o apêndice “Criaturas por ND”.
   - As etiquetas entram junto com cada ficha.
   - Antes, é preciso conferir se alguma ficha já existe no catálogo, pela regra do PO “revisar antes de cadastrar”.

## Deixado ao builder

- A fórmula exata dos pesos do gerador, no projeto 2. Ela precisa ser documentada e ter testes estatísticos.
- O formato interno de `ecology.js`, desde que legível e validado.
- As palavras-chave e as regras de subtipo do rascunho, desde que cada etiqueta sugerida tenha um motivo registrado.

## Decisões do PO após a conferência (22/11/2026)

- **A planilha CSV ficou difícil de ler.** Muito texto junto, sem dar para distinguir o que é o quê. As etiquetas seguem como estão, sem revisão linha a linha. Uma revisão futura precisa de um formato visual, com uma criatura por cartão, etiquetas destacadas e a citação recolhida, e não de CSV.
- **Dragões** podem estar em praticamente qualquer lugar aberto, porque há tipos para vários ambientes. Os que não têm terreno citado no livro recebem todos os terrenos, menos Subterrâneo.
- **Avatares e aspectos** são deuses e só aparecem quando o PO os põe à mão, venham de qualquer livro. Entre eles está o Aspecto de Aharadak, de Ameaças de Arton.
- **Mortos-vivos** podem estar em diversos lugares, mas aparecem mais em catacumbas, com miasma e em pântanos. Os que não têm terreno citado no livro recebem Pântano, Catacumbas/necrópole e Miasma.
- **Consequência para a fase 2.** Terreno, lugar e condição são **peso**, não filtro exclusivo, pelo menos para mortos-vivos. Uma criatura etiquetada só com Pântano ainda pode aparecer em outros terrenos, com menos chance. Etiqueta vazia continua sendo neutra, valendo para qualquer lugar.
