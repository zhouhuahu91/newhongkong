import sidesOptions from "../options/sidesOptions";

export default {
  category: {
    nl: "vleesgerechten",
    en: "pork dishes",
    de: "Schweinefleisch Gerichte",
  },
  id: 10,
  items: [
    {
      id: "60",
      name: {
        nl: "babi pangang",
        en: "babi pangang",
        de: "babi pangang",
        zh: "火肉",
      },
      description: {
        nl: "geroosterde varkensvlees reepjes in licht pikante tomatensaus",
        en: "deep fried lean pork strips in a mild spicy sauce",
        de: "fritierte magerer Schweinefleisch in Streifen in leicht scharfer Soße",
        zh: "",
      },
      price: 1660,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
    {
      id: "61",
      name: {
        nl: "babi pangang spek",
        en: "babi pangang bacon",
        de: "babi pangang Speck",
        zh: "火南",
      },
      description: {
        nl: "geroosterde spek reepjes met licht pikante tomatensaus, saus apart",
        en: "deep fried bacon strips with mild spicy tomato sauce, sauce comes separate",
        de: "Fritierte Speckstreifen mit leicht scharfer Tomatensoße, Soße wird separat serviert",
        zh: "",
      },
      price: 1790,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
    {
      id: "62",
      name: {
        nl: "babi ketjap",
        en: "babi soy",
        de: "babi soy",
        zh: "急肉",
      },
      description: {
        nl: "geroosterde varkensvlees reepjes in ketjapsaus",
        en: "deep fried pork strips in a sweet soy sauce",
        de: "Fritierte Schweinefleischstreifen mit einer süßen Sojasoße",
        zh: "",
      },
      price: 1690,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
    {
      id: "63",
      name: {
        nl: "kou lou yuk",
        en: "kou lou yuk",
        de: "kou lou yuk",
        zh: "古老肉",
      },
      description: {
        nl: "gepaneerde vleesballetjes met zoetzure saus",
        en: "deep fried pork in dough with a sweet & sour sauce",
        de: "fritiertes Schweinefleisch mit süß saurer Soße",
        zh: "",
      },
      price: 1440,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
  ],
};
