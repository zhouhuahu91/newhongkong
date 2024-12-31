import sidesOptions from "../options/sidesOptions";
import btw from "../options/btw";

export default {
  category: {
    nl: "vleesgerechten",
    en: "pork dishes",
    de: "Schweinefleisch Gerichte",
    zh: "",
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
      price: 1740,
      dineInPrice: 2090,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
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
      price: 1880,
      dineInPrice: 2260,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
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
      price: 1770,
      dineInPrice: 2120,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
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
      price: 1510,
      dineInPrice: 1810,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
  ],
};
