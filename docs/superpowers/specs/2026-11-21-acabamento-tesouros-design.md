# Acabamento da modal de tesouros

Complementa `2026-11-20-ajustes-tesouros-design.md` e fecha os “Próximos passos” da seção Rolagem de tesouros do `ARCHITECTURE.md`. O PO escolheu as quatro frentes e o visual das abas. O restante foi decidido pelo gerente e está marcado como tal.

## Mudanças

1. **Sem legenda no campo Rolar.** Sai o texto “Dinheiro: moedas e riquezas” abaixo do campo Rolar, na aba Gerar tesouros. As opções do campo continuam as mesmas. A regra `.treasure-hint` sai do CSS se nada mais a usar.
2. **Abas como seletor segmentado (versão C, escolhida pelo PO).**
   - **Problema.** As abas ficam soltas acima do painel. A causa é o `gap: 14px` da grade `.node-dialog`: abas e painel ocupam linhas diferentes da grade, e o `margin-bottom: -1px` das abas não vence esse espaço.
   - **Novo visual.** Um único controle com borda e cantos arredondados envolve as duas opções. A opção ativa fica preenchida com a cor de ação do tema, e a inativa fica só como texto. Abaixo dele vem o painel, com borda própria e os quatro cantos arredondados. O controle não tenta mais se fundir ao painel, então o espaço da grade passa a servir de respiro.
   - **Comportamento.** Não muda: `role="tab"`, teclado (setas, Home, End), foco visível e a troca de painéis continuam como estão. O visual precisa funcionar nos temas de todos os perfis de andares e na largura de tablet.
   - **Referência.** Protótipo em CSS injetado, no screenshot `.playwright-mcp/tabs-C.png`.
3. **Página do livro na cascata.** Cada passo da cascata, nas duas abas, mostra a referência da tabela consultada, que é a mesma usada no rodapé (`bookReference`).
   - **Decisão do gerente.** A referência fica junto ao nome da tabela, entre parênteses. Nas tabelas do Livro Básico aparece só “p. N”, para não repetir o nome do livro em toda linha. Nas tabelas de outros livros aparece “Livro p. N”.
   - **Tabela usada.** Quando houve sorteio entre livros, vale a tabela de origem (`sourceTableId ?? tableId`), a mesma que dá nome ao passo.
4. **Um só `renderStep`.** `renderChain` (Gerar tesouros) e `renderHistory` (Rolar com o livro) passam a montar cada linha com uma função comum. Ela recebe o passo e dois extras opcionais: a nota da aba Rolar com o livro e o “Livro sorteado” da aba Gerar tesouros. O texto que aparece na tela não muda, exceto pela página do item 3.
5. **Pré-cache offline na primeira visita.** Hoje `public/sw.js` guarda no `install` só o HTML e o manifesto. Os arquivos JS, CSS e ícones só entram no cache depois de passarem pela rede, então o app não abre offline na primeira visita.
   - **Abordagem (decisão do gerente).** Um pequeno plugin no `vite.config.js` que, ao fim do build, grava em `dist/sw.js` a lista de arquivos gerados (JS, CSS, chunks sob demanda como o `treasureDialog`, ícones e o manifesto). O `install` passa a pré-carregar essa lista.
   - **Nome do cache.** O nome do cache leva uma marca do build, para que o `activate` apague os caches de versões antigas. A estratégia do `fetch` (rede primeiro, cache como reserva) não muda.
   - **Alternativa descartada.** `vite-plugin-pwa` adicionaria uma dependência e trocaria o service worker inteiro, o que é demais para uma lista de arquivos.
   - **Ambiente de desenvolvimento.** O `vite dev` continua usando o `public/sw.js` sem lista, com o comportamento atual.

6. **Nome da segunda aba: “Rolar na mesa”.** A aba “Rolar com o livro” passa a se chamar **Rolar na mesa**. O PO pediu um nome que deixe claro que os dados são rolados fisicamente e os valores digitados na modal. Entre as sugestões dele (“rolar na mesa”, “rolagem física”), o gerente escolheu “Rolar na mesa”, que é curta e combina com “Gerar tesouros” no seletor. A troca vale para a aba, os textos e `aria-label`s que citam o nome antigo, os roteiros de QA e o `ARCHITECTURE.md`. Os specs anteriores ficam como estão, como registro histórico.

## Validação

- `npm run test:treasure` continua passando, e um teste cobre a referência de página de cada passo.
- `npm run qa:treasure` confere a ausência da legenda, o seletor segmentado (clique e teclado) e a página na cascata das duas abas.
- `npm run qa:treasure-offline` ganha um cenário de primeira visita: carrega a página uma vez, espera o service worker assumir, desliga a rede sem recarregar online antes e abre a modal de tesouros. O roteiro deixa de depender do nome fixo `mega-dungeon-v3`.
- Screenshots do seletor em dois temas de perfil, na largura de tablet, para o PO conferir.

## Fora do escopo

Mudanças nas regras de rolagem, nos preços e nos pesos entre livros.
