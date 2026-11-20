# Fichas sem ND numérico: Luminar e Rival Espelho

## Intenção

Cadastrar as duas fichas que a auditoria deixou pendentes porque o app só trabalhava com ND fixo, para que o mestre possa abri-las na mesa como qualquer outra ficha. Elas servem de consulta: o app mostra o que o livro imprime e não tenta calcular estatísticas que o livro não dá.

- **Luminar**, Deuses de Arton, p. 275 impressa, p. 277 do PDF. ND, Defesa, resistências e PV impressos como “—”. Ícone de papel Especial.
- **Rival Espelho**, Ameaças de Arton, p. 335 impressa, p. 337 do PDF. ND “?”, tipo “???”, sem tamanho, sem linhas de estatística e sem ícone de papel. Copia as estatísticas e o ND do personagem.

## Abordagens

- **A) Ficha de consulta (escolhida).** As fichas guardam o ND impresso, “–” e “?”, e só aparecem na escolha exata de ficha. O mestre aplica a cópia do Rival de cabeça. É a opção mais simples e mais fiel ao livro.
- **B) Perguntar o ND do personagem copiado.** O ND do encontro refletiria a cópia, mas isso só faz diferença para recompensa ou XP e exigiria um campo novo no diálogo. Fica descartada.

## Desenho

1. **ND sem orçamento.** `challenge.js` passa a reconhecer “–” e “?” como ND especiais, ao lado de S e S+. A escolha exata de ficha lista as duas fichas, e o encontro com uma única ficha mostra o ND impresso. `getChallengeRatingForStatistics` não converte esses dois valores em 20.
2. **Fora do sorteio.** O sorteio automático, as rerrolagens e o gerador de missões já filtram ND numérico. Um teste garante que as duas fichas nunca são sorteadas.
3. **Valores ausentes.** Na ficha de combate, Iniciativa, Percepção, Defesa e resistências sem valor aparecem como “—”, como no livro, em vez de “?”. Isso também vale para o Vagalhão Kobold, única ficha atual com esses campos vazios. Quando todos os valores de uma linha estão vazios e não há texto complementar, a linha é omitida. Assim, o Rival mostra só as habilidades e o tesouro.
4. **Luminar.** Espírito (celestial) Minúsculo, papel Especial, com `hitPointsText: "—"`. As habilidades são Abençoar, Aliviar, Sacrifício e Ser de Luz, e as duas primeiras têm a marca mágica. O bloco de Parceiro fica fora da ficha.
5. **Rival Espelho.** Tipo exibido “???”, sem tamanho e sem papel, com o rótulo “Papel não definido” que o app já usa. As habilidades são “???” e Transferir Dor, que tem a marca mágica. Tesouro: Nenhum.
6. **Mais de uma ficha de ND especial.** O botão Adicionar criatura permitia somar fichas de ND especial, e o ND do combate virava `NaN`. Isso já acontecia com S e S+. Agora a presença de uma ficha sem ND dá “?”, que vira “–” quando todas as fichas são “–”. Sem fichas sem ND, vale o maior ND especial presente, com S+ acima de S, mesmo com fichas numéricas no encontro.
7. **PV e reforço.** Sem PV numérico, os controles de PV individuais e de reforço ficam indisponíveis, como já acontece com o Gigante Máximo.

## Fora do escopo

Calcular o ND ou as estatísticas do Rival a partir de um personagem. Usar o Luminar como parceiro.

## Validação

Testes de catálogo para as duas fichas, com ND, papel, páginas, marcas mágicas e a ausência delas no sorteio. Teste da ficha renderizada, com “—” no Luminar e sem linhas de estatística no Rival. Suítes `test:floors-1-10`, `test:missions`, `test:floors-11-20` e `build`.
