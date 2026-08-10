export const vagalhaoKobold = {
    "id": "vagalhao-kobold",
    "name": "Vagalhão Kobold",
    "type": "event",
    "subtype": "kobold",
    "size": null,
    "challengeRating": 17,
    "description": [],
    "source": {
        "book": "Ameaças de Arton",
        "pdfFile": "ameacas de arton p170 ate 191.pdf",
        "pdfPage": 22,
        "bookPage": 189
    },
    "stats": {
        "initiative": null,
        "perception": 35,
        "defense": 50,
        "fortitude": null,
        "reflex": null,
        "will": null,
        "hitPoints": null,
        "speedText": null,
        "senses": null,
        "defensesText": "conta como enxame; imunidade a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano; sofre metade do dano de ataques com armas; vulnerabilidade a dano de área",
        "attributes": {
            "str": null,
            "dex": null,
            "con": null,
            "int": null,
            "wis": null,
            "cha": null
        }
    },
    "actions": [],
    "abilities": [
        {
            "name": "Objetivo",
            "timing": null,
            "text": "Sobreviver ao frenesi selvagem. A passagem do vagalhão dura 1d8+6 rodadas; após esse período, os kobolds se dispersam e retornam para o ninho com o que quer que tenham conseguido."
        },
        {
            "name": "Efeito",
            "timing": null,
            "text": "No início de seu turno, cada personagem deve fazer um teste de Fortitude para evitar ser engolfado pelo vagalhão; se estiver caído, falha automaticamente. Se falhar, sofre 12d12 pontos de dano de corte. Se falhar por 5 ou mais, sofre o dano e fica caído. A CD é 40+1d10, rolada uma vez no início de cada rodada para todos. Criaturas que sofram dano do vagalhão têm sua armadura avariada; se não usam armadura, sofrem +2d12 pontos de dano."
        },
        {
            "name": "Roubo de Itens",
            "timing": null,
            "text": "No fim de cada rodada, role 1d6 para cada item mágico vestido ou empunhado por cada personagem, ou 1d4 se o personagem estiver caído. Num resultado 1, o item é roubado. Pode ser encontrado após o vagalhão se dispersar com Sobrevivência (CD 35 + duração do vagalhão em rodadas), mas há 25% de chance de estar destruído."
        },
        {
            "name": "Enxame Infinito",
            "timing": null,
            "text": "O vagalhão conta como um enxame: é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, sofre apenas metade do dano de ataques com armas e tem vulnerabilidade a dano de área. Se sofrer 600 pontos de dano ou mais na mesma rodada, sua duração é reduzida em 1 rodada e, na próxima rodada, seu dano é reduzido à metade e ele não avaria nem rouba itens."
        },
        {
            "name": "Perceber Aproximação",
            "timing": null,
            "text": "Os personagens têm direito a um teste de Percepção (CD 35) para notar a aproximação do vagalhão. Quem passar pode realizar uma ação adicional em sua primeira rodada."
        },
        {
            "name": "Atacar",
            "timing": null,
            "text": "O personagem usa uma ação agredir contra o vagalhão (Defesa 50). Sofre –5 em testes de ataque à distância e, para cada ataque corpo a corpo que errar, sofre 4d12 pontos de dano de corte."
        },
        {
            "name": "Conjurar",
            "timing": null,
            "text": "O personagem tenta lançar uma magia e faz Vontade CD 35 + custo em PM da magia. Se falhar, a magia não funciona, mas os PM são gastos."
        },
        {
            "name": "Esconder Item",
            "timing": null,
            "text": "O personagem faz Ladinagem CD 35. Se passar, no fim da rodada rola 1d10, em vez do dado normal, para determinar se um item é roubado."
        },
        {
            "name": "Latir",
            "timing": null,
            "text": "O personagem faz Atuação ou Enganação CD 35 para tentar se passar por um kobold. Se passar, na próxima rodada não sofre dano e seus itens não são danificados nem roubados, mas sofre uma penalidade cumulativa de –1 em todos os testes de perícia."
        },
        {
            "name": "Levantar-se",
            "timing": null,
            "text": "Um personagem caído faz Atletismo ou Acrobacia CD 35. Se passar, se levanta."
        },
        {
            "name": "Proteger-se",
            "timing": null,
            "text": "Sem teste. O personagem se defende e recebe +5 no próximo teste de Fortitude contra o vagalhão."
        },
        {
            "name": "Ajudar",
            "timing": null,
            "text": "O personagem faz um teste para ajudar um aliado e pode usar qualquer perícia que conseguir justificar."
        }
    ],
    "equipment": null,
    "treasure": null,
    "skillsText": "Percepção CD 35 para notar a aproximação"
};

export const eventCreatures = [
    vagalhaoKobold
];
