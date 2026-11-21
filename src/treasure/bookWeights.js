// Pesos entre livros na geração automática de tesouros (aba Gerar tesouros).
//
// Quando a rolagem cai numa tabela do Livro Básico que outros livros ampliam, há 70% de chance
// de usar a tabela do Livro Básico; os 30% restantes vão para as listas dos outros livros, na
// proporção do número de itens elegíveis de cada uma (depois do filtro de `appliesTo`).
// A aba Rolar na mesa (`applyRoll` com valores digitados) nunca passa por aqui.
import { LIST_TABLES } from "./tables/index.js";

const BASIC_SHARE = 0.7;
const TIERS = { menor: "menor", médio: "medio", maior: "maior" };

const SERVICES = ["Casamento (por pessoa)", "Cerimônia religiosa", "Sacramento", "Condecoração militar", "Favor da pessoa amada"];

const pool = (others) => ({ basicShare: BASIC_SHARE, others });
const improvements = (type) => pool([
  { tableId: "herois/melhorias", filter: { appliesTo: type } },
  { tableId: "deuses/melhorias", filter: { appliesTo: type } },
]);
// Lista de itens específicos de Heróis da categoria do item mágico; sem lista, só o Livro Básico.
const specific = (slug, tier) => pool(LIST_TABLES[`herois/${slug}/${TIERS[tier]}`]
  ? [{ tableId: `herois/${slug}/${TIERS[tier]}` }] : []);

// Chave = id da tabela do Livro Básico; "material" = sub-rolagem de material especial da 8-5;
// "8-9/<categoria>" e "8-11/<categoria>" = item específico de um item mágico dessa categoria.
export const WEIGHTED_POOLS = Object.freeze({
  // Serviços (casamento, cerimônia, sacramento, condecoração, favor) não entram no sorteio ponderado.
  "8-3": pool([{ tableId: "ameacas/itens-gerais" }, { tableId: "herois/itens-gerais", filter: { excludeNames: SERVICES } },
    { tableId: "deuses/itens-gerais", filter: { excludeNames: SERVICES } }]),
  "8-4/arma": pool([{ tableId: "ameacas/armas" }, { tableId: "herois/armas" }, { tableId: "herois/municoes" }]),
  "8-4/armadura": pool([{ tableId: "ameacas/armaduras" }, { tableId: "herois/armaduras" }]),
  "8-4/esotérico": pool([]), // sem lista de outro livro: 100% Livro Básico
  "8-5/arma": improvements("arma"),
  "8-5/armadura": improvements("armadura"),
  "8-5/esotérico": improvements("esotérico"),
  material: pool([{ tableId: "ameacas/materiais" }]),
  ...Object.fromEntries(Object.keys(TIERS).flatMap((tier) => [
    [`8-9/${tier}`, specific("armas-especificas", tier)],
    [`8-11/${tier}`, specific("armaduras-especificas", tier)],
  ])),
  "8-13": pool([{ tableId: "herois/acessorios/menor" }]),
  "8-14": pool([{ tableId: "herois/acessorios/medio" }]),
  "8-15": pool([{ tableId: "herois/acessorios/maior" }]),
});

function matches(item, filter) {
  if (filter?.excludeNames?.includes(item.name)) return false;
  return !filter?.appliesTo || (item.appliesTo ?? []).includes(filter.appliesTo);
}

// Listas elegíveis já filtradas, calculadas uma vez: { tableId, items, n }[] e o total N.
const ELIGIBLE = Object.fromEntries(Object.entries(WEIGHTED_POOLS).map(([key, { others }]) => {
  const lists = others
    .map(({ tableId, filter }) => ({ tableId, items: Object.freeze(LIST_TABLES[tableId].items.filter((i) => matches(i, filter))) }))
    .filter((l) => l.items.length > 0)
    .map((l) => ({ ...l, n: l.items.length }));
  return [key, { lists, total: lists.reduce((sum, l) => sum + l.n, 0) }];
}));

// Itens elegíveis da lista `tableId` no grupo `poolKey`, na ordem impressa (o valor v escolhe o v-ésimo).
export function eligibleItems(poolKey, tableId) {
  return ELIGIBLE[poolKey]?.lists.find((l) => l.tableId === tableId)?.items;
}

// Sorteia a fonte de uma rolagem. `context.tableId` é a tabela do Livro Básico do pedido.
// Um único número do rng: abaixo de 0,7 fica o Livro Básico; de 0,7 para cima, o mesmo número
// escolhe a lista pelo acumulado das contagens. Sem lista elegível, Livro Básico com parcela 1.
export function pickSource(poolKey, context, rng) {
  const basic = context?.tableId ?? poolKey;
  const entry = ELIGIBLE[poolKey];
  if (!entry || entry.total === 0) return { tableId: basic, share: 1 };
  const { basicShare } = WEIGHTED_POOLS[poolKey];
  const r = rng();
  if (r < basicShare) return { tableId: basic, share: basicShare };
  const target = ((r - basicShare) / (1 - basicShare)) * entry.total;
  let acc = 0;
  const list = entry.lists.find((l) => (acc += l.n) > target) ?? entry.lists.at(-1);
  return { tableId: list.tableId, share: ((1 - basicShare) * list.n) / entry.total };
}
