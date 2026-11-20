# Revisão de apresentação das fichas

## Intenção

Fechar os itens de apresentação anotados durante a auditoria. A ficha de combate deve mostrar a marca de habilidade mágica em todas as habilidades que o livro marca, e expor as regras compartilhadas de subtipo de que as fichas dependem.

## Abordagens

- **Varredura pela fonte do símbolo (escolhida).** A espiral de habilidade mágica é o caractere “e” na fonte `SpiralsFont`, nos três livros. Cada espiral das páginas de ficha é cruzada com a habilidade da ficha cadastrada naquela página pelo texto que a antecede. É uma verificação completa e repetível.
- **Conferência visual página a página.** Mais lenta e sujeita a omissões. Descartada.
- O ícone de novo item ou nova magia só remete a outra parte do livro e não muda nada na mesa. Fica fora.

## Resultado

1. **Marca mágica.** Encontradas 130 espirais em páginas de ficha. Cem já estavam marcadas, e 25 foram marcadas agora: 19 em Ameaças, uma em Deuses e cinco no Livro Básico. A comparação do catálogo inteiro antes e depois confirmou que só essas 25 habilidades mudaram. As cinco espirais sem correspondência automática foram conferidas à mão. Servos do Dragão, Chamado da Dama Altiva, Metamorfose Dracônica e Tomar Poder já estavam marcados. A espiral restante pertence ao quadro de raça Kappa, fora das fichas. As duas espirais dos poderes de Thwor ficam registradas no texto da habilidade, e a do gamo de parceiro fica fora da ficha.
2. **Regras compartilhadas.** `SHARED_SUBTYPE_RULES`, em `src/generalCreatureAbilities.js`, guarda os quadros Habilidades Lefeu (Livro Básico, p. 315) e Habilidades Dracônicas (Livro Básico, p. 311). A ficha os exibe no fim, como Bando e Enxame. O critério é o subtipo exato, conforme os livros. A regra lefeu vale para “todas as criaturas com o subtipo lefeu” (Ameaças, p. 21), e kaijin, lekael e lefou ficam de fora. A regra dracônica vale para toda criatura de subtipo dragão, inclusive necrodracos, avatares e aspectos.

## Validação

Um teste lista as 25 habilidades marcadas, e o teste da ficha renderizada cobre os dois quadros e as fichas que não devem recebê-los. As suítes `test:floors-1-10`, `test:missions`, `test:floors-11-20` e `build` passam.
