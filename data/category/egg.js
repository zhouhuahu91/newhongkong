import sidesOptions from "../options/sidesOptions";
import btw from "../options/btw";

export default {
  category: {
    nl: "eiergerechten",
    en: "egg foo young",
    de: "Eiergerichte",
    zh: "",
  },
  id: 7,
  items: [
    {
      id: "41",
      name: {
        nl: "foe yong hai vegetarisch",
        en: "egg foo young vegetarian",
        de: "egg foo young vegetarisch",
        zh: "素夫下",
      },
      description: {
        nl: "omelet zondervlees in een zoete tomatensaus",
        en: "omelet without meat in a sweet tomato sauce",
        de: "Omelett ohne Fleisch in einer süßen Tomatensoße",
        zh: "",
      },
      price: 1350,
      dineInPrice: 1650,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "42",
      name: {
        nl: "foe yong hai ham",
        en: "egg foo young ham",
        de: "egg foo young ham",
        zh: "火腿夫下",
      },
      description: {
        nl: "omelet met ham in een zoete tomatensaus",
        en: "omelet with ham in a sweet tomato sauce",
        de: "Omelett mit Schicken in süßen Tomatensoße",
        zh: "",
      },
      price: 1430,
      dineInPrice: 1730,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "43",
      name: {
        nl: "foe yong hai kip",
        en: "egg foo young chicken",
        de: "egg foo young Huhn",
        zh: "鸡夫下",
      },
      description: {
        nl: "omelet met kipfilet in zoete tomatensaus",
        en: "omelet with chicken in a sweet tomato sauce",
        de: "Omelett mit Hähnchen in einer süßen Tomatensoße",
        zh: "",
      },
      price: 1460,
      dineInPrice: 1750,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "44",
      name: {
        nl: "foe yong hai varkensvlees",
        en: "egg foo young pork",
        de: "egg foo young Schwein",
        zh: "肉夫下",
      },
      description: {
        nl: "omelet met varkensvlees in zoete tomatensaus",
        en: "omelet with pork in a sweet tomato sauce",
        de: "Omelett mit Schweinefleisch in einer süßen Tomatensoße",
        zh: "",
      },
      price: 1460,
      dineInPrice: 1750,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "45",
      name: {
        nl: "foe yong hai garnalen",
        en: "egg foo young Shrimps",
        de: "egg foo young Schrimps",
        zh: "虾夫下",
      },
      description: {
        nl: "omelet met garnalen in zoete tomatensaus",
        en: "omelet with shrimp in a sweet tomato sauce",
        de: "Omelett mit Schrimps in einer süßen Tomatensoße",
        zh: "",
      },
      price: 1730,
      dineInPrice: 2080,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "46",
      name: {
        nl: "foe yong hai speciaal",
        en: "egg foo young special",
        de: "egg foo young spezial",
        zh: "大夫下",
      },
      description: {
        nl: "omelet met kipfilet, varkensvlees en garnalen in zoete tomatensaus",
        en: "omelet with chicken, pork and shrimp in a sweet tomato sauce",
        de: "Omelett mit Hühnerfleisch, Schweinefleisch und Schrimps in einer süßen Tomatensoße",
        zh: "",
      },
      price: 1610,
      dineInPrice: 1940,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
  ],
};
