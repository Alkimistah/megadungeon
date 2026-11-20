// Agregação dos ganhos de um lote de tesouros. Função pura.
//
// Moedas (TC, T$, TO) são somadas por moeda; riquezas não são moedas e ficam só na
// lista `wealth`; itens são agrupados por `name`, na ordem da primeira aparição.
// totalTibars = TC / 10 + T$ + TO * 10, arredondado a uma casa decimal.
export function summarizeGains(gains) {
  const coins = { TC: 0, "T$": 0, TO: 0 };
  const wealth = [];
  const itemsByName = new Map();

  for (const gain of gains) {
    if (gain.kind === "money") {
      coins[gain.currency] += gain.amount;
    } else if (gain.kind === "wealth") {
      wealth.push({ value: gain.value, examples: gain.examples });
    } else if (gain.kind === "item") {
      const existing = itemsByName.get(gain.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        itemsByName.set(gain.name, {
          name: gain.name,
          category: gain.category,
          price: gain.price,
          quantity: 1,
        });
      }
    }
  }

  const totalTibars = Math.round((coins.TC / 10 + coins["T$"] + coins.TO * 10) * 10) / 10;

  return { coins, totalTibars, wealth, items: [...itemsByName.values()] };
}
