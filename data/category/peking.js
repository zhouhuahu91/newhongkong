import sidesOptions from "../options/sidesOptions";

export default {
  category: {
    nl: "specialiteiten uit Peking",
    en: "Peking specialties",
    de: "Peking Spezialitäten",
  },
  items: [
    {
      id: "27",
      name: {
        nl: "Peking eend",
        en: "Peking duck",
        de: "Peking Ente",
      },
      description: {
        nl: "geroosterd eend, saus apart",
        en: "roasted duck, sauce comes separate",
        de: "geröstete Ente, Soße separat serviert",
      },
      price: 1890,
      qtyPlastic: 2,
      options: [
        {
          id: "S2",
          name: {
            nl: "zoetzure saus",
            en: "sweet & sour sauce",
            de: "süß saurer Soße",
          },
          price: 0,
        },
        {
          id: "S3",
          name: {
            nl: "oestersaus",
            en: "oyster sauce",
            de: "Austernsoße",
          },
          price: 0,
        },
        {
          id: "S4",
          name: {
            nl: "licht pikante saus (babi pangang saus)",
            en: "mild spicy sauce (babi pangang sauce)",
            de: "leicht scharfer Soße (babi pangang Soße)",
          },
          price: 0,
        },
        {
          id: "S7",
          name: {
            nl: "zwarte bonen saus",
            en: "black bean sauce",
            de: "schwarzer Bohnen Soße",
          },
          price: 0,
        },
      ],
      sides: sidesOptions,
    },
    {
      id: "28",
      name: {
        nl: "tung koe ngaw",
        en: "tung koe ngaw",
        de: "tung koe ngaw",
      },
      description: {
        nl: "roergebakken biefstukjes met poku champignons en groenten in een lichte oestersaus",
        en: "stir fried beef with poku mushrooms and vegetables in a mild oyster sauce",
        de: "gebratenes Rindfleisch mit Poku-Pilze und Gemüse in einer milden Austernsoße",
      },
      price: 1810,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
    {
      id: "29",
      name: {
        nl: "tung koe ha",
        en: "tung koe ha",
        de: "tung koe ha",
      },
      description: {
        nl: "roergebakken garnalen met poku champignons en groenten in een lichte oestersaus",
        en: "stir fried shrimp with poku mushrooms and vegetables in a mild oyster sauce",
        de: "gebratene Schrimps mit Poku-Pilze und Gemüse in einer milden Austernsoße",
      },
      price: 1920,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
    {
      id: "30",
      name: {
        nl: "tung koe ha long",
        en: "tung koe ha long",
        de: "tung koe ha long",
      },
      description: {
        nl: "roergebakken gambas met poku champignons en groenten in een lichte oestersaus",
        en: "stir fried gambas with poku mushrooms and vegetables in a mild oyster sauce",
        de: "gebratene Garnelen mit Poku-Pilze und Gemüse in einer milden Austernsoße",
      },

      price: 2120,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
    {
      id: "31",
      name: {
        nl: "sin jien ha long",
        en: "sin jien ha long",
        de: "sin jien ha long",
      },
      description: {
        nl: "roergebakken gambas met groenten in een licht pikante saus",
        en: "stir fried gambas with vegetables in a mild spicy sauce",
        de: "gebratene Garnelen mit Gemüse in einer leicht scharfen Soße",
      },
      price: 2120,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
  ],
};
