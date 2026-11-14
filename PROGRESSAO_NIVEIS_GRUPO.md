# Progressão de níveis do grupo

Referência de campanha confirmada pelo usuário em 14/11/2026.

## Tabela oficial do projeto

| Andares | Nível do grupo ao entrar | Nível máximo esperado |
|---|---:|---:|
| 1–10 | 1 | 4 |
| 11–20 | 4 | 7 |
| 21–30 | 7 | 10 |
| 31–40 | 10 | 12 |
| 41–50 | 12 | 14 |
| 51–60 | 14 | 16 |
| 61–70 | 16 | 17 |
| 71–80 | 17 | 18 |
| 81–90 | 18 | 19 |
| 91–100 | 19 | 20 |

## Como usar esta referência

- Andar da masmorra não é nível do personagem. Entrar no andar 11 pressupõe grupo de nível 4, não de nível 11.
- A tabela define entrada e limite esperado por faixa. Não define em qual andar o grupo sobe de nível, nem concede níveis automaticamente.
- CDs, NDs, criaturas, armadilhas, missões e recompensas devem ser avaliados dentro desse patamar, considerando também os bônus reais e os recursos do grupo.
- Nível máximo esperado não é teto automático de ND. Um chefe pode ultrapassar o nível do grupo, desde que isso seja uma decisão explícita de dificuldade.
- Não deduzir uma fórmula de CD diretamente do número do andar. A tarefa e suas condições precisam justificar a dificuldade.
- Não implementar perfis 31–100 apenas porque constam nesta tabela. Ela registra a progressão da campanha, não o andamento do aplicativo.

## Situação do código em 14/11/2026

O perfil `src/floorProfiles/dungeon1to10.js` contém a orientação textual de personagens de níveis 1–4. Os requisitos de 21–30 mencionam níveis 7–10. O MVP registra `partyLevels: { entry: 4, maximum: 7 }` no perfil `forest11to20` e usa a curva de CD 20–23 confirmada pelo usuário. As CDs ainda são uma tabela de campanha explícita, não um cálculo automático dos bônus atuais do grupo.

As faixas 31–100 continuam sendo referência documental. Uma evolução pode centralizar toda a progressão em dados compartilhados. O nível atual informado pelo mestre, quando houver esse recurso, deve prevalecer sobre uma estimativa automática.

As prioridades para aplicar esta referência estão em [Planejamento dos andares 11–20](PLANEJAMENTO_ANDARES_11_A_20.md).
