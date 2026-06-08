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
      effect: "Acima de 50 ºC. Teste de Fortitude por dia (CD 15 + 1 por teste anterior). Falha: sofre 1d6 de dano de fogo e não consegue recuperar PV/PM por descanso até sair do clima quente."
    }
  },
  {
    weight: 18,
    value: {
      name: "Calor extremo",
      effect: "Acima de 60 ºC. Teste de Fortitude por minuto (CD 15 + 1 por teste anterior). Falha: sofre 1d6 de dano de fogo e não consegue recuperar PV/PM por descanso até sair do clima quente."
    }
  },
  {
    weight: 29,
    value: {
      name: "Frio",
      effect: "Abaixo de -10 ºC. Teste de Fortitude por dia (CD 15 + 1 por teste anterior). Falha: sofre 1d6 de dano de frio e não consegue recuperar PV/PM por descanso até sair do clima frio."
    }
  },
  {
    weight: 10,
    value: {
      name: "Frio extremo",
      effect: "Abaixo de -20 ºC. Teste de Fortitude por minuto (CD 15 + 1 por teste anterior). Falha: sofre 1d6 de dano de frio e não consegue recuperar PV/PM por descanso até sair do clima frio."
    }
  }
];

const precipitationOptions = [
  {
    weight: 58,
    value: {
      name: "Chuva",
      effect: "-5 em testes de Percepção. Também aplica os efeitos de vento forte."
    }
  },
  {
    weight: 12,
    value: {
      name: "Granizo",
      effect: "Aplica chuva: -5 em testes de Percepção e efeitos de vento forte (-2 em ataques à distância; 50% de chance por rodada de apagar chamas ou dissipar névoas). Além disso, no início de cada rodada, todas as criaturas sofrem 1 ponto de dano de impacto."
    }
  },
  {
    weight: 8,
    value: {
      name: "Neve",
      effect: "Aplica chuva: -5 em testes de Percepção e efeitos de vento forte (-2 em ataques à distância; 50% de chance por rodada de apagar chamas ou dissipar névoas). Além disso, cria terreno difícil."
    }
  },
  {
    weight: 22,
    value: {
      name: "Tempestade",
      effect: "-10 em testes de Percepção. Aplica vendaval: -5 em ataques à distância, apaga chamas e dissipa névoas. No início de cada rodada, há 10% de chance de uma criatura aleatória ser atingida por um raio, sofrendo 8d10 de dano de eletricidade."
    }
  }
];

const windOptions = [
  {
    weight: 68,
    value: {
      name: "Vento forte",
      effect: "-2 em testes de ataque à distância. A cada rodada, 50% de chance de apagar chamas ou dissipar névoas."
    }
  },
  {
    weight: 23,
    value: {
      name: "Vendaval",
      effect: "-5 em testes de ataque à distância. Apaga chamas e dissipa névoas."
    }
  },
  {
    weight: 7,
    value: {
      name: "Furacão",
      effect: "Ataques à distância são impossíveis. Apaga chamas e dissipa névoas. No início de cada rodada, criaturas Médias ou menores fazem Fortitude CD 15; se falharem, são arrastadas 1d4 x 1,5 m e sofrem 1d6 de dano de impacto para cada 1,5 m."
    }
  },
  {
    weight: 2,
    value: {
      name: "Tornado",
      effect: "Ataques à distância são impossíveis. Apaga chamas e dissipa névoas. No início de cada rodada, criaturas Grandes ou menores fazem Fortitude CD 25; se falharem, são arrastadas 1d12 x 1,5 m em direção aleatória e sofrem 1d6 de dano de impacto para cada 1,5 m."
    }
  }
];

const fog = {
  name: "Neblina",
  effect: "Fornece camuflagem. Neblina espessa fornece camuflagem leve a criaturas a 1,5 m e camuflagem total a criaturas a mais de 1,5 m."
};

const heatClimateNames = ["Calor", "Calor extremo"];
const coldPrecipitationNames = ["Granizo", "Neve"];
const damagingClimateNames = [
  "Calor",
  "Calor extremo",
  "Frio",
  "Frio extremo",
  "Granizo",
  "Tempestade",
  "Furacão",
  "Tornado"
];

const forestFeatures = [
  { weight: 26, value: { name: "Árvores", effect: "Árvores estreitas têm menos de 1,5 m de largura; árvores largas têm mais de 1,5 m. Árvore estreita concede cobertura leve; árvore larga tem RD 5 e 500 PV. Subir exige Atletismo CD 15; permanecer no topo exige Equilíbrio CD 15, exceto em árvore larga, que concede cobertura leve contra criaturas no solo." } },
  { weight: 24, value: { name: "Folhagens", effect: "Mato e arbustos contam como terreno difícil e fornecem camuflagem leve para criaturas dentro deles." } },
  { weight: 24, value: { name: "Vegetação rasteira", effect: "Raízes, vinhas e outros tipos de vegetação rasteira contam como terreno difícil. Também impõem -2 em testes de Furtividade pelas folhas secas e galhos caídos." } },
  { weight: 10, value: { name: "Inclinação suave", effect: "Não afeta o movimento. Personagens no lado superior recebem bônus por terreno elevado contra personagens no lado inferior." } },
  { weight: 8, value: { name: "Inclinação íngreme", effect: "Conta como terreno difícil para subir. Descer correndo ou fazendo investida exige Acrobacia CD 10; em falha, cai no chão, rola 1d4 x 1,5 m para frente e sofre 1d6 de dano de impacto para cada 1,5 m." } },
  { weight: 4, value: { name: "Penhasco", effect: "Rochedo alto e escarpado. Escalar exige Atletismo CD 15. Cair de um penhasco causa 1d6 de dano para cada 3 m de altura." } },
  { weight: 4, value: { name: "Clareira", effect: "Área aberta dentro da mata. Reduz cobertura e camuflagem naturais, deixando linhas de visão e ataques à distância mais fáceis." } }
];

const terrainOptions = [
  {
    weight: 60,
    value: {
      name: "Floresta",
      effect: "Floresta fechada ou aberta. Normalmente há árvores, folhagens e vegetação rasteira; cobertura, camuflagem e terreno difícil são comuns.",
      featureOptions: forestFeatures
    }
  },
  {
    weight: 24,
    value: {
      name: "Pântano",
      effect: "Brejos, charcos, mangues e lama. Possui muita vegetação rasteira, folhagens, árvores, água parada e lodaçais.",
      featureOptions: [
        { weight: 38, value: { name: "Lodaçal", effect: "Poça com mistura de água e lama. Conta como terreno difícil e impõe a condição vulnerável a qualquer personagem dentro dele." } },
        { weight: 32, value: { name: "Vegetação alagada", effect: "Vegetação rasteira, folhagens e árvores em área alagada. Em geral conta como terreno difícil e pode fornecer camuflagem leve conforme a cobertura." } },
        { weight: 18, value: { name: "Água parada", effect: "Água parada exige testes de Atletismo para nadar, sem modificador adicional." } },
        { weight: 12, value: { name: "Árvores retorcidas", effect: "Árvores em terreno alagado podem conceder cobertura leve; deslocar-se entre raízes e lama normalmente conta como terreno difícil." } }
      ]
    }
  },
  {
    weight: 8,
    value: {
      name: "Aquático",
      effect: "Áreas com água corrente, como rios, ou água parada, como lagos e pântanos. Pode envolver natação, correnteza e criaturas submersas.",
      featureOptions: [
        { weight: 40, value: { name: "Água corrente", effect: "Corrente típica arrasta 1d6 x 3 m por rodada. No fim de cada rodada, todos na água são arrastados nessa velocidade. Nadar contra a corrente exige Atletismo CD 15 para corrente normal ou CD 20 para corrente rápida. Sair exige chegar à margem ou ponto de apoio e passar em Atletismo CD 20 para agarrar algo; em falha, segue sendo arrastado." } },
        { weight: 35, value: { name: "Água parada", effect: "Água parada exige testes de Atletismo para nadar, sem modificador adicional." } },
        { weight: 25, value: { name: "Personagens submersos", effect: "Criaturas submersas sofrem -2 em ataques e -5 em Percepção. Deslocamento de natação ignora essas penalidades. Armas à distância não podem ser usadas, exceto arremesso de perfuração, bestas e redes. Armas de corte e impacto causam metade do dano debaixo d’água. Criaturas submersas recebem camuflagem e cobertura leves contra personagens fora d’água." } }
      ]
    }
  },
  {
    weight: 6,
    value: {
      name: "Colinas",
      effect: "Ondulações suaves ou íngremes e eventuais penhascos. Em florestas destes andares, podem aparecer como elevações, ribanceiras e rochedos cobertos por vegetação.",
      featureOptions: [
        { weight: 45, value: { name: "Inclinação suave", effect: "Não afeta o movimento. Personagens no lado superior recebem bônus por terreno elevado contra personagens no lado inferior." } },
        { weight: 35, value: { name: "Inclinação íngreme", effect: "Conta como terreno difícil para subir. Descer correndo ou fazendo investida exige Acrobacia CD 10; em falha, cai no chão, rola 1d4 x 1,5 m para frente e sofre 1d6 de dano de impacto para cada 1,5 m." } },
        { weight: 20, value: { name: "Penhasco", effect: "Rochedo alto e escarpado. Escalar exige Atletismo CD 15. Cair de um penhasco causa 1d6 de dano para cada 3 m de altura." } }
      ]
    }
  },
  {
    weight: 2,
    value: {
      name: "Planície aberta",
      effect: "Clareira, estrada, pasto ou campo aberto dentro do andar florestal. Normalmente não há elementos associados a planícies, exceto trincheiras ou valas ocasionais.",
      featureOptions: [
        { weight: 100, value: { name: "Trincheira", effect: "Vala escavada no solo para proteção. Quem está dentro recebe cobertura leve contra ataques à distância. Sair exige movimento e conta como terreno difícil. Também pode representar valas, leitos de rio secos e acidentes geográficos similares." } }
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

function hasHeat(climate, rules) {
  return climate.some((item) => rules.heatClimateNames.includes(item.name));
}

function hasColdPrecipitation(climate, rules) {
  return climate.some((item) => rules.coldPrecipitationNames.includes(item.name));
}

function hasStorm(climate) {
  return climate.some((item) => item.name === "Tempestade");
}

function getClimateRules(options) {
  return options.environmentRules?.climate || {
    variationCountOptions: climateVariationCountOptions,
    variationKindOptions: climateVariationOptions,
    temperatureOptions,
    precipitationOptions,
    windOptions,
    fog,
    heatClimateNames,
    coldPrecipitationNames,
    damagingClimateNames
  };
}

function getTerrainRules(options) {
  return options.environmentRules?.terrain || {
    terrainOptions,
    forestAquaticFeatureChance: 12,
    wetSoilChance: 8,
    wetSoilFeature: {
      name: "Solo encharcado",
      effect: "Trechos baixos e encharcados contam como terreno difícil."
    }
  };
}

function isDamagingClimate(climate, rules) {
  return rules.damagingClimateNames.includes(climate.name);
}

function isClimateCompatible(candidate, climate, options, rules) {
  if (options.avoidDamagingClimate && isDamagingClimate(candidate, rules)) return false;
  if (candidate.name === "Neblina" && hasWind(climate)) return false;
  if (["Vento forte", "Vendaval", "Furacão", "Tornado"].includes(candidate.name) && hasFog(climate)) return false;
  if (candidate.name === "Tempestade" && hasWind(climate)) return false;
  if (["Vento forte", "Vendaval", "Furacão", "Tornado"].includes(candidate.name) && hasStorm(climate)) return false;
  if (rules.coldPrecipitationNames.includes(candidate.name) && hasHeat(climate, rules)) return false;
  if (rules.heatClimateNames.includes(candidate.name) && hasColdPrecipitation(climate, rules)) return false;

  return true;
}

function filterCompatibleWeightedOptions(weightedOptions, climate, options, rules) {
  return weightedOptions.filter((option) =>
    isClimateCompatible(option.value, climate, options, rules)
  );
}

function getClimateVariation(kind, climate, options, rules) {
  if (kind === "fog") return isClimateCompatible(rules.fog, climate, options, rules) ? rules.fog : null;

  const optionSourceByKind = {
    temperature: rules.temperatureOptions,
    precipitation: rules.precipitationOptions,
    wind: rules.windOptions
  };
  const compatibleOptions = filterCompatibleWeightedOptions(
    optionSourceByKind[kind],
    climate,
    options,
    rules
  );

  return compatibleOptions.length > 0 ? pickWeighted(compatibleOptions) : null;
}

function hasCompatibleClimateVariation(kind, climate, options, rules) {
  if (kind === "fog") return isClimateCompatible(rules.fog, climate, options, rules);

  const optionSourceByKind = {
    temperature: rules.temperatureOptions,
    precipitation: rules.precipitationOptions,
    wind: rules.windOptions
  };

  return filterCompatibleWeightedOptions(optionSourceByKind[kind], climate, options, rules).length > 0;
}

function getAvailableClimateKinds(climate, usedKinds, options, rules) {
  return rules.variationKindOptions.filter((option) => {
    if (usedKinds.has(option.value)) return false;
    return hasCompatibleClimateVariation(option.value, climate, options, rules);
  });
}

function generateClimate(options = {}) {
  const rules = getClimateRules(options);
  const climate = [];
  const usedKinds = new Set();
  const variationCount = pickWeighted(rules.variationCountOptions);

  for (let index = 0; index < variationCount; index++) {
    const availableKinds = getAvailableClimateKinds(climate, usedKinds, options, rules);

    if (availableKinds.length === 0) break;

    const kind = pickWeighted(availableKinds);
    const variation = getClimateVariation(kind, climate, options, rules);

    if (!variation) {
      usedKinds.add(kind);
      continue;
    }

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

function generateTerrain(options = {}) {
  const rules = getTerrainRules(options);
  const terrain = pickWeighted(rules.terrainOptions);
  const desiredFeatureCount = terrain.name === "Floresta" ? randomInt(1, 3) : randomInt(1, 2);
  const uniqueFeatureCount = new Set(terrain.featureOptions.map((option) => option.value.name)).size;
  const featureCount = Math.min(desiredFeatureCount, uniqueFeatureCount);
  const features = [];

  while (features.length < featureCount) {
    addUniqueFeature(features, pickWeighted(terrain.featureOptions));
  }

  if (terrain.name === "Floresta" && chance(rules.forestAquaticFeatureChance)) {
    const aquaticTerrain = rules.terrainOptions.find((option) => option.value.name === "Aquático");

    if (aquaticTerrain) {
      addUniqueFeature(features, pickWeighted(aquaticTerrain.value.featureOptions));
    }
  }

  if (terrain.name !== "Pântano" && chance(rules.wetSoilChance)) {
    addUniqueFeature(features, rules.wetSoilFeature);
  }

  return { name: terrain.name, effect: terrain.effect, features };
}

export function generateEnvironmentContext(options = {}) {
  return {
    climate: generateClimate(options),
    terrain: generateTerrain(options)
  };
}
