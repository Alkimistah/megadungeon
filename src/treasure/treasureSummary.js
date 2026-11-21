// Agregação dos ganhos de um lote de tesouros. Função pura.
//
// Moedas (TC, T$, TO) são somadas por moeda; riquezas não são moedas e ficam só na
// lista `wealth`; itens são agrupados por `name` + `source` (tabela de origem), na ordem da primeira aparição.
// wealthTotal = soma das riquezas; grandTotal = totalTibars + wealthTotal (uma casa decimal).
// totalTibars = TC / 10 + T$ + TO * 10, arredondado a uma casa decimal.
export function summarizeGains(gains) {
  const coins = { TC: 0, "T$": 0, TO: 0 };
  const wealth = [];
  const itemsByKey = new Map();

  for (const gain of gains) {
    if (gain.kind === "money") {
      coins[gain.currency] += gain.amount;
    } else if (gain.kind === "wealth") {
      wealth.push({ value: gain.value, examples: gain.examples });
    } else if (gain.kind === "item") {
      const components = gain.details?.components;
      const key = `${gain.name}\u0000${gain.source ?? ""}\u0000${components ? JSON.stringify(components) : ""}`;
      const existing = itemsByKey.get(key);
      if (existing) {
        existing.quantity += 1;
      } else {
        itemsByKey.set(key, {
          name: gain.name,
          category: gain.category,
          ...(gain.source !== undefined ? { source: gain.source } : {}),
          price: gain.price,
          ...(components ? { components } : {}),
          quantity: 1,
        });
      }
    }
  }

  const totalTibars = Math.round((coins.TC / 10 + coins["T$"] + coins.TO * 10) * 10) / 10;

  const round1 = (n) => Math.round(n * 10) / 10;
  const wealthTotal = round1(wealth.reduce((sum, w) => sum + w.value, 0));
  const grandTotal = round1(totalTibars + wealthTotal);

  return { coins, totalTibars, wealthTotal, grandTotal, wealth, items: [...itemsByKey.values()] };
}

// Cristais: linhas de crystalLine() e o total delas.
export function summarizeCrystals(lines) {
  return { lines, total: lines.reduce((sum, l) => sum + l.total, 0) };
}

// Divisão igual entre jogadores, em tibares inteiros (para baixo); `remainder` é o que sobra.
export function splitAmongPlayers(total, players) {
  const each = Math.floor(total / players);
  const remainder = Math.round((total - each * players) * 10) / 10;
  return { each, remainder };
}
