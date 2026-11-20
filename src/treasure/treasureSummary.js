// Agregação dos ganhos de um lote de tesouros. Função pura.
//
// Moedas (TC, T$, TO) são somadas por moeda; riquezas não são moedas e ficam só na
// lista `wealth`; itens são agrupados por `name` + `source` (tabela de origem), na ordem da primeira aparição.
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
      const key = `${gain.name}\u0000${gain.source ?? ""}`;
      const existing = itemsByKey.get(key);
      if (existing) {
        existing.quantity += 1;
      } else {
        itemsByKey.set(key, {
          name: gain.name,
          category: gain.category,
          ...(gain.source !== undefined ? { source: gain.source } : {}),
          price: gain.price,
          quantity: 1,
        });
      }
    }
  }

  const totalTibars = Math.round((coins.TC / 10 + coins["T$"] + coins.TO * 10) * 10) / 10;

  return { coins, totalTibars, wealth, items: [...itemsByKey.values()] };
}
