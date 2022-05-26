import sidesOptions from "../options/sidesOptions";

export default {
  category: {
    nl: "eiergerechten",
    en: "egg foo young",
    de: "Eiergerichte",
  },
  items: [
    {
      id: "41",
      name: {
        nl: "foe yong hai vegetarisch",
        en: "egg foo young vegetarian",
        de: "egg foo young vegetarisch",
      },
      description: {
        nl: "omelet zondervlees in een zoete tomatensaus",
        en: "omelet without meat in a sweet tomato sauce",
        de: "Omelett ohne Fleisch in einer süßen Tomatensoße",
      },
      price: 1020,
      sides: sidesOptions,
    },
    {
      id: "42",
      name: {
        nl: "foe yong hai ham",
        en: "egg foo young ham",
        de: "egg foo young ham",
      },
      description: {
        nl: "omelet met ham in een zoete tomatensaus",
        en: "omelet with ham in a sweet tomato sauce",
        de: "Omelett mit Schicken in süßen Tomatensoße",
      },
      price: 1070,
      sides: sidesOptions,
    },
    {
      id: "43",
      name: {
        nl: "foe yong hai kip",
        en: "egg foo young chicken",
        de: "egg foo young Huhn",
      },
      description: {
        nl: "omelet met kipfilet in zoete tomatensaus",
        en: "omelet with chicken in a sweet tomato sauce",
        de: "Omelett mit Hähnchen in einer süßen Tomatensoße",
      },
      price: 1120,
      sides: sidesOptions,
    },
    {
      id: "44",
      name: {
        nl: "foe yong hai varkensvlees",
        en: "egg foo young pork",
        de: "egg foo young Schwein",
      },
      description: {
        nl: "omelet met varkensvlees in zoete tomatensaus",
        en: "omelet with pork in a sweet tomato sauce",
        de: "Omelett mit Schweinefleisch in einer süßen Tomatensoße",
      },
      price: 1120,
      sides: sidesOptions,
    },
    {
      id: "45",
      name: {
        nl: "foe yong hai garnalen",
        en: "egg foo young Shrimps",
        de: "egg foo young Schrimps",
      },
      description: {
        nl: "omelet met garnalen in zoete tomatensaus",
        en: "omelet with shrimp in a sweet tomato sauce",
        de: "Omelett mit Schrimps in einer süßen Tomatensoße",
      },
      price: 1390,
      sides: sidesOptions,
    },
    {
      id: "46",
      name: {
        nl: "foe yong hai speciaal",
        en: "egg foo young special",
        de: "egg foo young spezial",
      },
      description: {
        nl: "omelet met kipfilet, varkensvlees en garnalen in zoete tomatensaus",
        en: "omelet with chicken, pork and shrimp in a sweet tomato sauce",
        de: "Omelett mit Hühnerfleisch, Schweinefleisch und Schrimps in einer süßen Tomatensoße",
      },
      price: 1290,
      sides: sidesOptions,
    },
  ],
};
