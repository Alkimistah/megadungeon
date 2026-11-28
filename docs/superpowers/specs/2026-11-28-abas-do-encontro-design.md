# Abas do encontro

## Intenção

A lista do encontro mistura criaturas e armadilhas, e o mestre não consegue trocar a escolta de um nó de armadilha. A mudança separa os dois tipos em abas, com um único botão de rerrolar que age só sobre a aba aberta, e libera a troca da escolta.

## Objetivos

- Separar inimigos e armadilhas em abas no componente compartilhado da lista do encontro (`createEncounterList` / `createEncounterCombatPage` em `src/nodeDialog.js`). Isso vale para o diálogo do nó, os setores do arquipélago, a exploração estendida e o encontro manual.
- Mostrar só as abas que têm conteúdo. Combate sem armadilha não mostra a aba de armadilhas; armadilha sem escolta não mostra a aba de inimigos. Com um único tipo, a barra de abas some e fica só o título.
- Trocar os dois botões atuais por um único botão de rerrolar, embaixo da lista, que age sobre a aba aberta.
- Permitir rerrolar a escolta de um nó de armadilha.

## Fora do escopo

- Criar rerrolagem onde hoje não existe (exploração estendida e encontro manual continuam sem botão).
- Mudar a ficha da direita, o cabeçalho de ND e XP ou as regras de composição da versão 5.

## Desenho aprovado (forma A da prévia)

- **Lugar das abas.** No topo da coluna da lista. A ficha à direita não muda.
- **Rótulos e ordem.** Nos nós de armadilha (`type`/`contentType` = `trap`), a aba **Armadilha** vem primeiro e a outra se chama **Escolta**. Nos demais, **Inimigos** vem primeiro, seguida de **Armadilha** (singular com um item, plural com mais). Cada aba mostra a quantidade de itens entre parênteses.
- **Aba inicial.** A primeira da ordem acima. Ao trocar de aba, a ficha passa ao primeiro item da aba. A aba aberta é lembrada por nó durante a sessão, como já acontece com o item selecionado.
- **Botão único.** Embaixo da lista, com o texto conforme a aba: "Rerrolar inimigos", "Rerrolar escolta" ou "Rerrolar armadilha". Aparece só quando a troca daquele tipo é permitida. A mensagem de resultado continua logo abaixo do botão.
- **Por lugar.**
  - Diálogo do nó: inimigos, escolta e armadilha, conforme as regras abaixo.
  - Arquipélago: o botão próprio de troca de criaturas passa a ficar na aba de inimigos, com o mesmo comportamento de hoje.
  - Exploração estendida e encontro manual: só as abas, sem botão.

## Troca da escolta (decisão do gerente)

- A armadilha principal fica igual.
- Sai um novo grupo humanoide com o mesmo alvo de escolta (`getForestEscortTarget` do ND da armadilha), sempre abaixo do ND da armadilha, com o filtro ecológico do nó.
- O grupo novo precisa caber no mapa tático junto com a armadilha, com a mesma semente de arena do diálogo.
- A combinação anterior é excluída do sorteio. Sem alternativa, a escolta atual fica e aparece a mensagem de falha vigente.
- Bloqueios iguais aos da troca de inimigos: reforço aplicado, missão vinculada, composição fixa e mapa fixo.
- A troca é reproduzível por semente e contador de rerrolagens e sobrevive ao salvar e restaurar a sessão, como as outras rerrolagens.

## Abordagens consideradas

| Abordagem | Troca | Decisão |
|---|---|---|
| A. Abas no painel da lista, botão único embaixo | Menor mudança na modal e no celular | Escolhida pelo PO |
| B. Seletor acima da página de combate, botão ao lado | Mais visível, ocupa uma linha a mais | Descartada |
| C. Duas seções sem abas, um botão por seção | Tudo visível, lista mais longa | Descartada |
| Abas só no diálogo do nó | Menos arquivos | Descartada; o PO quer consistência em todos os usos do componente |

## Para o construtor

- A estrutura exata das funções, o nome do estado da aba e os atributos de acessibilidade (`role="tablist"`, `role="tab"`, `aria-selected`, navegação por teclado) ficam a seu critério, seguindo os padrões do arquivo.
- Atualizar os testes e o QA que procuram `data-encounter-reroll` e a lista misturada.
- Referência visual: `tmp/previas/abas-encontro/index.html`, forma A.
