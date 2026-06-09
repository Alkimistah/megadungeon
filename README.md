# Mega Dungeon

Gerador procedural de andares e encontros para Tormenta20. Cria mapas em grafo com layout em "taça", geração determinística por seed, rastreamento de exploração e exportação de sessão como código portátil.

## O que o app faz

- Gera um mapa de nós com múltiplos níveis e caminhos ramificados.
- Cada nó tem tipo de sala (normal, elite, armadilha, tesouro, boss, acampamento), perícia de descoberta, DC, ND calculado, ambiente (clima + terreno) e perfil de criatura quando aplicável.
- O jogador navega pelo mapa escolhendo rotas, marcando encontros como explorados ou tentados, e descansando em acampamentos.
- O estado completo (mapa + progresso) é exportado como um código de sessão que pode ser copiado e restaurado a qualquer momento — sem conta, sem backend.
- Funciona offline e pode ser instalado como PWA.

## Desenvolvimento local

Instale as dependências:

```bash
npm install
```

Rode o servidor local:

```bash
npm run dev
```

Crie uma versão de produção:

```bash
npm run build
```

A pasta `dist/` gerada pelo build pode ser servida por qualquer host estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## Estrutura resumida

```
src/
├── main.js           # Entrada; bindings de UI e orquestração
├── generator.js      # Algoritmo de geração do mapa
├── appState.js       # Estado de exploração (rota, tempo, visibilidade)
├── mapRenderer.js    # Renderização SVG
├── nodeDialog.js     # Modal de detalhes do nó
├── challenge.js      # Cálculo de ND
├── creatures.js      # Tipos de criatura e perfil de encontro
├── creatureCatalog/  # Fichas por tipo, fonte e papel de ameaça inferido/explícito
├── threatCreationRules.js # Criação, modificação, papéis e bandos de ameaças
├── environment.js    # Geração de clima e terreno
├── tables.js         # Tabelas de perícias por tipo de sala
├── floorRanges.js    # Gerenciamento de perfis de andar
├── floorProfiles/    # Um arquivo por faixa de andares
├── random.js         # RNG com seed (cyrb128 + sfc32)
└── sessionCode.js    # Codificação/decodificação do código de sessão
```

Toda a documentação técnica detalhada — arquitetura, sistemas, estrutura de dados, fluxo da aplicação e pontos de extensão — está em [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Adicionando uma nova faixa de andares

1. Criar `src/floorProfiles/meuPerfil.js` seguindo a estrutura de `forest11to20.js`.
2. Exportar o novo perfil em `src/floorProfiles/index.js`.
3. Ele aparece automaticamente no seletor da interface.

O perfil define pesos de tipos de sala, NDs por faixa de nível, pesos de tipos de criatura por terreno, tema visual (cores CSS), e regras de geração de clima e terreno.

## Próximos passos sugeridos

- Adicionar mais faixas de andares (atualmente apenas Floresta 11-20).
- Salvar histórico de andares gerados no navegador (localStorage).
- Adicionar tabelas de encontros, tesouros e eventos específicos por perfil.
- Completar ícones PWA em `manifest.webmanifest`.
