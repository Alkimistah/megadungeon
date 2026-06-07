# Mega Dungeon

Gerador local de andares e encontros para Tormenta20.

## Objetivo

Este projeto nasceu a partir do arquivo `arvore-encontros-com-pericias-v3.html` e agora está organizado como uma pequena aplicação web. A ideia é manter o app simples para uso no tablet, com caminho aberto para publicar como link e instalar como PWA.

## Desenvolvimento local

Instale as dependencias:

```bash
npm install
```

Rode o servidor local:

```bash
npm run dev
```

Crie uma versao de producao:

```bash
npm run build
```

## Proximos passos sugeridos

- Adicionar seed para repetir o mesmo andar quando necessario.
- Salvar historico de andares gerados no navegador.
- Adicionar tabelas de encontros, tesouros e eventos especificos.
- Publicar no GitHub Pages, Netlify, Vercel ou Cloudflare Pages.
- Completar icones PWA em `manifest.webmanifest`.
