# Mapas táticos da Floresta

**Objetivo**
Usar as 20 plantas aprovadas nas cenas dos andares 11 a 19 e posicionar chegada, perigo e objetivo nas cenas fixas de missão compatíveis.

**Integração**
Selecionar o desenho após resolver o ambiente e o encontro. Aplicar as regras à grade compartilhada e preservar a precedência de mapas fixos já cadastrados, inclusive a Quimera. Usar a seed do nodo e a ficha existente de cada armadilha.

- [x] Cobrir em teste as 20 plantas, a ponte de armadilha, a submersão e as cenas de missão.
- [x] Implementar o catálogo em `forestTacticalLayouts.js` e ligá-lo à abertura do mapa em `nodeDialog.js` e `nodeTacticalMap.js`.
- [x] Validar a grade no fluxo normal e rodar as suítes da Floresta, do Arquipélago e o build.
