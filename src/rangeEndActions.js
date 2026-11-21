// Botões de fim de faixa: "Avançar para <próxima faixa>" (quando existe) e "Encerrar expedição".
export function createRangeEndActions({ nextName, onAdvance, onFinish }) {
  const actions = document.createElement("div");
  actions.className = "range-end-actions";

  const addButton = (label, className, onClick) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", onClick);
    actions.appendChild(button);
  };

  if (nextName && onAdvance) addButton(`Avançar para ${nextName}`, "generate-button range-end-advance", onAdvance);
  addButton("Encerrar expedição", "range-end-finish", onFinish);

  return actions;
}
