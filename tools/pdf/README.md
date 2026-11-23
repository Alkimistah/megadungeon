# Ferramentas de PDF

Elas leem os livros em `recursos/livros/`, pasta ignorada pelo Git. Os livros são a fonte das fichas, das tabelas e das regras. Esta pasta fica fora do app e tem dependências próprias.

```bash
cd tools/pdf && npm install            # só na primeira vez
node find.mjs bestiario "Habitat"      # em quais páginas aparece um termo
node text.mjs "livro basico" 300 302   # texto das páginas, separado por coluna
node render.mjs ameacas 396 397        # PNG das páginas em tools/pdf/out/
```

O livro pode ser indicado por um trecho do nome do arquivo, sem acento e sem diferenciar maiúsculas. As páginas são as do PDF, não as impressas.
