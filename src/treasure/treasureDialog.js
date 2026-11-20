// Casca da modal de tesouros. Tasks 8 e 9 preenchem os painéis e importam o motor e as tabelas aqui.
const wired = new WeakSet();

function selectTab(dialog, tabId) {
  for (const tab of dialog.querySelectorAll("[role=tab]")) {
    const selected = tab.id === tabId;
    tab.setAttribute("aria-selected", String(selected));
    const panel = dialog.querySelector(`#${tab.getAttribute("aria-controls")}`);
    if (panel) panel.hidden = !selected;
  }
}

export function openTreasureDialog(dialog) {
  if (!wired.has(dialog)) {
    wired.add(dialog);
    for (const tab of dialog.querySelectorAll("[role=tab]")) {
      tab.addEventListener("click", () => selectTab(dialog, tab.id));
    }
    dialog.querySelector("#treasureClose")?.addEventListener("click", () => dialog.close());
  }
  if (!dialog.open) dialog.showModal();
}
