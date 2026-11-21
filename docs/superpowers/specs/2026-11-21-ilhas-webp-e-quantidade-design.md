# Ilhas em WebP e quantidade inválida nos tesouros

Pedidos do PO de 21/11/2026, depois da publicação das restrições dos itens superiores.

## 1. Ilhas em WebP

**Por quê.** O PO quer gastar menos recursos. As 24 ilhas do arquipélago (`public/assets/icons/islands/*.svg`) somam 13 MB e respondem por quase todo o download da primeira visita, que hoje é de cerca de 15 MB por causa do pré-cache. Cada ilha é um vetor de 1536×1024 com centenas de caminhos, mas aparece com no máximo 168 px de largura (`.archipelago-island-icon`). Ficar sem as imagens não é opção.

**O que muda:**
- **Formato.** Cada ilha vira um WebP de 512 px de largura, com altura proporcional, fundo transparente e qualidade 82. São cerca de três vezes o tamanho exibido. Num teste, a maior ilha caiu de 1,9 MB para 80 KB, e o conjunto de 13 MB para 1,4 MB.
- **Originais preservados.** Os SVGs originais saem de `public/` e vão para `assets-src/islands/`, que fica versionada no Git e não é publicada. É o caminho de volta se o WebP não agradar.
- **Script de conversão.** Um script reproduzível converte de `assets-src/islands/*.svg` para `public/assets/icons/islands/*.webp` (`npm run build:islands`). Ele usa o Playwright e o Chrome, que já são dependências do projeto: o SVG é desenhado num canvas e exportado com `toDataURL("image/webp", 0.82)`. Nenhuma dependência nova.
- **Referências.** Os caminhos `.svg` das ilhas em `src/floorProfiles/archipelago21to30.js` e `src/archipelagoRenderer.js` passam para `.webp`.
- **Sessões salvas.** O estado do arquipélago guarda o caminho do ícone. Hoje `hydrateSessionIslands` usa `island.icon || theme?.icon`, então uma sessão salva antes da mudança apontaria para um `.svg` que não existe mais. Ao restaurar, o ícone do tema atual passa a valer quando o tema existe (`theme?.icon || island.icon`).
- **Visual.** Os filtros CSS que deixam a ilha branca, cinza ou verde precisam continuar iguais. A conferência é por screenshot, comparando antes e depois, nos estados normal, inexplorada, bloqueada e concluída.

**Fora do escopo:** outros ícones, que já são pequenos, e o barco do arquipélago (`archipelago-boat.svg`, 58 KB).

## 2. Quantidade inválida nos tesouros

**Hoje.** Na aba Gerar tesouros, quando uma linha tem quantidade inválida (vazia, 0 ou acima de 99), “Rolar tudo” mostra a mensagem de erro, mas o lote anterior continua na tela. Isso pode parecer o resultado da rolagem atual.

**O que muda:**
- Com erro, o resultado anterior e o rodapé de totais somem.
- O campo de quantidade inválido fica marcado (`aria-invalid="true"` e borda de erro) até ser corrigido.
- A mensagem continua no mesmo lugar.
