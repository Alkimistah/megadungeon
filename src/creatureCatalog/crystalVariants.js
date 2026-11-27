const variants = {
  "horda-de-ko-kabuto": {
    id: "besouros-facetados",
    name: "Besouros Facetados",
    description: ["Besouros de carapaça violeta se escondem entre as farpas. Quando ameaçados, encaixam as placas do dorso como um mosaico."],
    actions: [{ name: "Corpo a Corpo", text: "[Bando] Mandíbulas +12 (2d6+10 perfuração)." }],
    abilities: {
      Agarralhada: { name: "Pinça da Horda", text: "A horda usa suas mandíbulas para prender as presas. Recebe +2 em testes para agarrar e derrubar." },
      "Formação Defensiva": { text: "Os besouros encaixam suas carapaças em mosaico. A horda recebe +2 na Defesa até seu próximo turno." }
    }
  },
  canceronte: {
    id: "caranguejo-de-quartzo",
    name: "Caranguejo de Quartzo",
    description: ["Este crustáceo de pinças leitosas quebra placas para abrir tocas nas bordas do recife."],
    actions: [{ name: "Corpo a Corpo", text: "Duas pinças +14 (1d8+6)." }],
    abilities: {
      Autotomia: { text: "O caranguejo pode partir uma pinça na junta de quartzo. Quando faz isso, passa automaticamente em um teste para evitar uma condição de movimento, como um teste de ataque para se libertar de um agarramento, mas perde um ataque de pinça. A pinça se regenera em um mês." },
      "Quebrar Tudo!": { text: "O caranguejo recebe +2 em testes de ataque para quebrar (teste total +18) e causa +1d8 pontos de dano contra objetos." }
    }
  },
  cocatriz: {
    id: "cocatriz-de-vidro",
    name: "Cocatriz de Vidro",
    description: ["Esta ave semitransparente salta de placa em placa. Sua bicada faz cristais crescerem sobre as articulações da presa."],
    abilities: {
      "Bicada Petrificante": { text: "Uma criatura que sofra dano da bicada fica lenta (Fort CD 19 evita). Se já estiver lenta por esta habilidade, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação." }
    }
  },
  ganchador: {
    id: "ganchador-das-fendas",
    name: "Ganchador das Fendas",
    description: ["O predador escala as fendas com garras de cristal fosco. Da sombra das placas, procura presas ao redor dos focos solares."]
  },
  "zangao-do-pesadelo": {
    id: "zangao-prismatico",
    name: "Zangão Prismático",
    description: ["Inseto de cristal vivo com asas facetadas que espalham cores pelas paredes. A cauda se dobra para disparar estilhaços."],
    actions: [
      { name: "Corpo a Corpo", text: "Mordida +17 (2d8+11)." },
      { name: "À Distância", text: "Cauda de Estilhaços +17 (2d6+8 de perfuração, alcance curto)." }
    ],
    abilities: {
      "Cauda Especializada": { name: "Cauda de Estilhaços", text: "Ataque à distância +17, alcance curto, que causa 2d6+8 de perfuração. Pode ser usado como parte da mesma ação Agredir que a mordida." },
      "Mente Alienígena": { text: "Quando uma criatura usa um efeito mental ou de encantamento contra o zangão, um clarão devolve o choque à mente dela. A criatura sofre 6d6 pontos de dano psíquico e fica atordoada por 1 rodada e abalada (Von CD 20 reduz à metade e evita as condições)." }
    }
  },
  bulette: {
    id: "bulette-de-geodo",
    name: "Bulette de Geodo",
    description: ["Este predador escava sob as placas translúcidas. Ao emergir, a couraça opaca se abre e revela cristais vivos no interior."],
    abilities: {
      "Aura Cáustica": { name: "Estilhaços Soltos", text: "No início de cada turno do bulette, todas as criaturas adjacentes sofrem 4d6 pontos de dano de corte." },
      "Espreitador das Dunas": { name: "Espreitador sob as Placas" }
    }
  },
  "carrasco-oco": {
    id: "geodo-vivo",
    name: "Geodo Vivo",
    description: ["Parece uma formação de cristal até abrir a carapaça como uma concha e projetar dois braços. As paredes internas distorcem a imagem de quem está do lado de fora."],
    abilities: {
      Engolir: { text: "O geodo pode engolir criaturas da sua categoria de tamanho. No início de cada um dos seus turnos, a criatura engolida sofre 2d6+5 pontos de dano de perfuração mais 2d6 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano a ele (Defesa 10, redução de dano 0)." },
      Imobilidade: { text: "O geodo pode permanecer completamente imóvel. Uma personagem precisa passar num teste de Percepção (CD 35) para reconhecê-lo como uma criatura enquanto estiver imóvel." },
      "(Livre)": { name: "Pavor Claustrofóbico", timing: "livre", text: "Quando o geodo engole uma criatura, as paredes translúcidas distorcem tudo que ela vê. Ela fica apavorada por 1 rodada e depois abalada enquanto permanecer engolida (Von CD 24 evita e a criatura não pode mais ser afetada por esta habilidade até o fim da cena)." }
    }
  }
};

export function getCrystalVariant(base) {
  const variant = variants[base.id];
  if (!variant) return null;
  const { abilities, description, ...overrides } = variant;
  return {
    ...base,
    ...overrides,
    regionalVariantOf: base.id,
    source: { book: "Masmorra de Práxis" },
    sources: [{ book: "Masmorra de Práxis" }],
    description: [...description, `Adaptação de ${base.name}${base.source?.book ? `, de ${base.source.book}` : ""}.`],
    abilities: base.abilities.map(ability => ({ ...ability, ...abilities?.[ability.name] }))
  };
}
