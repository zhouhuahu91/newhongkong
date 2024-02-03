import sidesOptions from "../options/sidesOptions";
import btw from "../options/btw";
export default {
  category: {
    nl: "specialiteiten uit Peking",
    en: "Peking specialties",
    de: "Peking Spezialitäten",
    zh: "",
  },
  id: 4,
  items: [
    {
      id: "27",
      name: {
        nl: "Peking eend",
        en: "Peking duck",
        de: "Peking Ente",
        zh: "鸭",
      },
      description: {
        nl: "geroosterd eend, saus apart",
        en: "roasted duck, sauce comes separate",
        de: "geröstete Ente, Soße separat serviert",
        zh: "",
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
            zh: "古老酱",
          },
          price: 0,
        },
        {
          id: "S3",
          name: {
            nl: "oestersaus",
            en: "oyster sauce",
            de: "Austernsoße",
            zh: "蚝油酱",
          },
          price: 0,
        },
        {
          id: "S4",
          name: {
            nl: "licht pikante saus (babi pangang saus)",
            en: "mild spicy sauce (babi pangang sauce)",
            de: "leicht scharfer Soße (babi pangang Soße)",
            zh: "火肉酱",
          },
          price: 0,
        },
        {
          id: "S7",
          name: {
            nl: "zwarte bonen saus",
            en: "black bean sauce",
            de: "schwarzer Bohnen Soße",
            zh: "黑豆酱",
          },
          price: 0,
        },
      ],
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "28",
      name: {
        nl: "tung koe ngaw",
        en: "tung koe ngaw",
        de: "tung koe ngaw",
        zh: "冬菇牛",
      },
      description: {
        nl: "roergebakken biefstukjes met poku champignons en groenten in een lichte oestersaus",
        en: "stir fried beef with poku mushrooms and vegetables in a mild oyster sauce",
        de: "gebratenes Rindfleisch mit Poku-Pilze und Gemüse in einer milden Austernsoße",
        zh: "",
      },
      price: 1810,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "29",
      name: {
        nl: "tung koe ha",
        en: "tung koe ha",
        de: "tung koe ha",
        zh: "冬菇虾",
      },
      description: {
        nl: "roergebakken garnalen met poku champignons en groenten in een lichte oestersaus",
        en: "stir fried shrimp with poku mushrooms and vegetables in a mild oyster sauce",
        de: "gebratene Schrimps mit Poku-Pilze und Gemüse in einer milden Austernsoße",
        zh: "",
      },
      price: 1920,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "30",
      name: {
        nl: "tung koe ha long",
        en: "tung koe ha long",
        de: "tung koe ha long",
        zh: "冬菇大虾",
      },
      description: {
        nl: "roergebakken gambas met poku champignons en groenten in een lichte oestersaus",
        en: "stir fried gambas with poku mushrooms and vegetables in a mild oyster sauce",
        de: "gebratene Garnelen mit Poku-Pilze und Gemüse in einer milden Austernsoße",
        zh: "",
      },

      price: 2120,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "31",
      name: {
        nl: "sin jien ha long",
        en: "sin jien ha long",
        de: "sin jien ha long",
        zh: "新炒大虾",
      },
      description: {
        nl: "roergebakken gambas met groenten in een licht pikante saus",
        en: "stir fried gambas with vegetables in a mild spicy sauce",
        de: "gebratene Garnelen mit Gemüse in einer leicht scharfen Soße",
        zh: "",
      },
      price: 2120,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
  ],
};
