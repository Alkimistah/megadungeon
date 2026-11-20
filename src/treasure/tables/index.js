import { BASIC_BOOK_TABLES } from "./basicBook.js";
import { THREATS_LISTS } from "./threats.js";
import { HEROES_LISTS } from "./heroes.js";
import { GODS_LISTS } from "./gods.js";

// Listas de itens dos outros livros, por id ("ameacas/armas", "herois/acessorios/menor"...).
// São tabelas à parte, rolam ou se consultam sozinhas, e não renumeram as tabelas d% do Livro Básico.
export const LIST_TABLES = Object.fromEntries([...THREATS_LISTS, ...HEROES_LISTS, ...GODS_LISTS].map((list) => [list.id, list]));

export const ALL_TABLES = { ...BASIC_BOOK_TABLES, ...LIST_TABLES };
