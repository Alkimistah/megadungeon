function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chance(percent) {
  return Math.random() < percent / 100;
}

function pick(array) {
  return array[randomInt(0, array.length - 1)];
}

function pickWeighted(options) {
  const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
  let roll = randomInt(1, totalWeight);

  for (const option of options) {
    roll -= option.weight;

    if (roll <= 0) {
      return option.value;
    }
  }

  return options[0].value;
}

const CLIMATE_NORMAL = {
  name: "Clima normal",
  effect: "Sem modificadores climáticos relevantes neste encontro."
};

const climateVariationCountOptions = [
  { weight: 68, value: 0 },
  { weight: 24, value: 1 },
  { weight: 7, value: 2 },
  { weight: 1, value: 3 }
];

const climateVariationOptions = [
  { weight: 18, value: "temperature" },
  { weight: 18, value: "fog" },
  { weight: 38, value: "precipitation" },
  { weight: 26, value: "wind" }
];

const temperatureOptions = [
  {
    weight: 43,
    value: {
      name: "Calor",
      effect: "Fortitude por dia; falha causa dano e impede recuperação completa."
    }
  },
  {
    weight: 18,
    value: {
      name: "Calor extremo",
      effect: "Como calor, mas o teste é por minuto."
    }
  },
  {
    weight: 29,
    value: {
      name: "Frio",
      effect: "Fortitude por dia; falha causa dano e impede recuperação completa."
    }
  },
  {
    weight: 10,
    value: {
      name: "Frio extremo",
      effect: "Como frio, mas o teste é por minuto."
    }
  }
];

const precipitationOptions = [
  {
    weight: 58,
    value: {
      name: "Chuva",
      effect: "-5 em Percepção e os mesmos efeitos de vento forte."
    }
  },
  {
    weight: 12,
    value: {
      name: "Granizo",
      effect: "Como chuva; no inicio de cada rodada causa 1 ponto de dano de impacto."
    }
  },
  {
    weight: 8,
    value: {
      name: "Neve",
      effect: "Como chuva, mas cria terreno dificil."
    }
  },
  {
    weight: 22,
    value: {
      name: "Tempestade",
      effect: "-10 em Percepção, efeitos de vendaval e chance de raio por rodada."
    }
  }
];

const windOptions = [
  {
    weight: 68,
    value: {
      name: "Vento forte",
      effect: "-2 em ataques a distância; apaga chamas e dissipa névoas com 50% de chance por rodada."
    }
  },
  {
    weight: 23,
    value: {
      name: "Vendaval",
      effect: "-5 em ataques a distância; apaga chamas e dissipa névoas."
    }
  },
  {
    weight: 7,
    value: {
      name: "Furacão",
      effect: "Ataques a distância impossíveis; criaturas podem ser arrastadas."
    }
  },
  {
    weight: 2,
    value: {
      name: "Tornado",
      effect: "Ataques a distância impossíveis; criaturas podem ser arrastadas e sofrer dano."
    }
  }
];

const fog = {
  name: "Neblina",
  effect: "Fornece camuflagem; neblina espessa pode fornecer camuflagem total a distância."
};

const forestFeatures = [
  { weight: 26, value: { name: "Árvores", effect: "Podem dar cobertura leve ou exigir Atletismo para subir." } },
  { weight: 24, value: { name: "Folhagens", effect: "Fornecem camuflagem leve." } },
  { weight: 24, value: { name: "Vegetação rasteira", effect: "Conta como terreno dificil e impõe -2 em Furtividade." } },
  { weight: 10, value: { name: "Inclinação suave", effect: "Não afeta movimento; terreno elevado concede bônus contra alvos inferiores." } },
  { weight: 8, value: { name: "Inclinação íngreme", effect: "Conta como terreno dificil e pode exigir teste em corrida/investida." } },
  { weight: 4, value: { name: "Penhasco", effect: "Escalar exige Atletismo; quedas causam dano." } },
  { weight: 4, value: { name: "Clareira", effect: "Abre linhas de visão e reduz cobertura natural." } }
];

const terrainOptions = [
  {
    weight: 60,
    value: {
      name: "Floresta",
      effect: "Ambiente dominante destes andares; favorece cobertura, camuflagem e obstruções naturais.",
      featureOptions: forestFeatures
    }
  },
  {
    weight: 24,
    value: {
      name: "Pântano",
      effect: "Brejos, charcos, mangues e lama; movimento e estabilidade ficam comprometidos.",
      featureOptions: [
        { weight: 38, value: { name: "Lodaçal", effect: "Conta como terreno dificil e deixa personagens vulneráveis enquanto permanecem nele." } },
        { weight: 32, value: { name: "Vegetação alagada", effect: "Folhagens e raízes dificultam deslocamento e percepção." } },
        { weight: 18, value: { name: "Água parada", effect: "Exige Atletismo para nadar, sem modificador adicional." } },
        { weight: 12, value: { name: "Árvores retorcidas", effect: "Podem conceder cobertura leve em meio à lama." } }
      ]
    }
  },
  {
    weight: 8,
    value: {
      name: "Aquático",
      effect: "Rios, lagos ou áreas alagadas dentro da floresta.",
      featureOptions: [
        { weight: 40, value: { name: "Água corrente", effect: "Arrasta criaturas; nadar contra a corrente exige Atletismo." } },
        { weight: 35, value: { name: "Água parada", effect: "Exige Atletismo para nadar, sem modificador adicional." } },
        { weight: 25, value: { name: "Personagens submersos", effect: "Ataques e Percepção sofrem penalidades; deslocamento de natação ignora parte disso." } }
      ]
    }
  },
  {
    weight: 6,
    value: {
      name: "Colinas",
      effect: "Ondulações, inclinações e possíveis penhascos dentro ou ao redor da mata.",
      featureOptions: [
        { weight: 45, value: { name: "Inclinação suave", effect: "Não afeta movimento; terreno elevado concede bônus contra alvos inferiores." } },
        { weight: 35, value: { name: "Inclinação íngreme", effect: "Conta como terreno dificil e pode exigir teste em corrida/investida." } },
        { weight: 20, value: { name: "Penhasco", effect: "Escalar exige Atletismo; quedas causam dano." } }
      ]
    }
  },
  {
    weight: 2,
    value: {
      name: "Planície aberta",
      effect: "Clareira, pasto ou campo aberto dentro do andar florestal.",
      featureOptions: [
        { weight: 100, value: { name: "Trincheira", effect: "Concede cobertura leve; sair exige movimento e conta como terreno dificil." } }
      ]
    }
  }
];

function hasWind(climate) {
  return climate.some((item) => ["Vento forte", "Vendaval", "Furacão", "Tornado"].includes(item.name));
}

function hasFog(climate) {
  return climate.some((item) => item.name === "Neblina");
}

function getClimateVariation(kind) {
  if (kind === "temperature") return pickWeighted(temperatureOptions);
  if (kind === "precipitation") return pickWeighted(precipitationOptions);
  if (kind === "wind") return pickWeighted(windOptions);
  return fog;
}

function getAvailableClimateKinds(climate, usedKinds) {
  return climateVariationOptions.filter((option) => {
    if (usedKinds.has(option.value)) return false;
    if (option.value === "fog" && hasWind(climate)) return false;
    if (option.value === "wind" && hasFog(climate)) return false;
    return true;
  });
}

function generateClimate() {
  const climate = [];
  const usedKinds = new Set();
  const variationCount = pickWeighted(climateVariationCountOptions);

  for (let index = 0; index < variationCount; index++) {
    const availableKinds = getAvailableClimateKinds(climate, usedKinds);

    if (availableKinds.length === 0) break;

    const kind = pickWeighted(availableKinds);
    const variation = getClimateVariation(kind);

    climate.push(variation);
    usedKinds.add(kind);
  }

  return climate.length > 0 ? climate : [CLIMATE_NORMAL];
}

function addUniqueFeature(features, feature) {
  if (!features.some((currentFeature) => currentFeature.name === feature.name)) {
    features.push(feature);
  }
}

function generateTerrain() {
  const terrain = pickWeighted(terrainOptions);
  const desiredFeatureCount = terrain.name === "Floresta" ? randomInt(1, 3) : randomInt(1, 2);
  const uniqueFeatureCount = new Set(terrain.featureOptions.map((option) => option.value.name)).size;
  const featureCount = Math.min(desiredFeatureCount, uniqueFeatureCount);
  const features = [];

  while (features.length < featureCount) {
    addUniqueFeature(features, pickWeighted(terrain.featureOptions));
  }

  if (terrain.name === "Floresta" && chance(12)) {
    addUniqueFeature(features, pickWeighted(terrainOptions.find((option) => option.value.name === "Aquático").value.featureOptions));
  }

  if (terrain.name !== "Pântano" && chance(8)) {
    addUniqueFeature(features, { name: "Solo encharcado", effect: "Trechos baixos contam como terreno dificil." });
  }

  return { name: terrain.name, effect: terrain.effect, features };
}

export function generateEnvironmentContext() {
  return {
    climate: generateClimate(),
    terrain: generateTerrain()
  };
}
