# Piloto das versões do Gnoll Filibusteiro

> Execute cada etapa e confira a regressão antes de avançar. A especificação da auditoria define as regras de fonte e persistência.

- [x] Fixar em teste a ficha de Ameaças no ID original, registrar a ficha do Livro Básico com ID próprio e conferir a resolução de um encontro salvo e seu vínculo de missão.
- [x] Aplicar a preferência de cada perfil na seleção automática de candidatos, antes de ND, tipo e demais filtros. Exercitar resolução normal, rerrolagem e ofertas novas de missão com as duas versões na lista de candidatos.
- [x] Oferecer as duas fichas no seletor do encontro manual e conferir no Chrome que a ficha escolhida abre sozinha com seu ND, sua fonte e os valores auditados. Preservar o caminho atual por filtros.
- [x] Rodar os testes dos perfis e de missões, o build e os fluxos do Chrome. Manter a entrega separada da publicação das 80 referências.

O campo `variantOf` aponta para o ID da ficha padrão. O perfil pode escolher outro ID da família com `creatureRules.preferredCreatureIdsByFamily`. Listas explícitas de candidatos continuam usando IDs de fichas. Para escolher uma versão alternativa em um perfil com lista restrita, inclua também o ID dessa versão na lista pertinente. Saves e composições fixas abrem pelo ID gravado.

O ID `gnoll-filibusteiro` continua sendo o padrão dos perfis existentes, com Reflexos +7 e 20 balas. O Livro Básico fica em `gnoll-filibusteiro-livro-basico`, com Reflexos +11 e 10 balas. A escolha manual exata usa o equipamento da ficha.
