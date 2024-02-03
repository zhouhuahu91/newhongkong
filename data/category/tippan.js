import sidesOptions from "../options/sidesOptions";
const tippanSauce = [
  {
    id: "S3",
    name: {
      nl: "oester saus",
      en: "oyster sauce",
      de: "Austernsauce",
      zh: "蚝油酱",
    },
    price: 0,
  },
  {
    id: "S4",
    name: {
      nl: "pikante saus",
      en: "spicy sauce",
      de: "Scharfe Sauce",
      zh: "辣酱",
    },
    price: 0,
  },
  {
    id: "S5",
    name: {
      nl: "kerrie saus",
      en: "curry sauce",
      de: "Curry Soße",
      zh: "加里酱",
    },
    price: 0,
  },
  {
    id: "S7",
    name: {
      nl: "zwarte bonen saus",
      en: "black bean sauce",
      de: "Sauce aus schwarzen Bohnen",
      zh: "黑豆酱",
    },
    price: 0,
  },
];

export default {
  category: {
    nl: "tippan",
    en: "tippan dishes",
    de: "Tippan Gerichte",
    zh: "",
  },
  id: 14,
  items: [
    {
      id: "88",
      name: {
        nl: "tippan kipfilet",
        en: "tippan chicken",
        de: "Tippan Hühnerfleisch",
        zh: "铁鸡",
      },
      description: {
        nl: "roergebakken kipfilet met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried chicken with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratenes Hühnerfleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
      price: 1660,
      qtyPlastic: 2,
      options: tippanSauce,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "89",
      name: {
        nl: "tippan varkensvlees",
        en: "tippan pork",
        de: "Tippan Schweinefleisch",
        zh: "铁肉",
      },
      description: {
        nl: "roergebakken varkensvlees met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried pork with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratenes Schweinefleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
      price: 1660,
      qtyPlastic: 2,
      options: tippanSauce,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "90",
      name: {
        nl: "tippan bief",
        en: "tippan beef",
        de: "Tippan Rindfleisch",
        zh: "铁牛片",
      },
      description: {
        nl: "roergebakken biefstukjes met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried beef with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratenes Rindfleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
      price: 1810,
      qtyPlastic: 2,
      options: tippanSauce,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "91",
      name: {
        nl: "tippan ossenhaas",
        en: "tippan beef tenderloin",
        de: "Tippan Rinderfilet",
        zh: "铁牛排",
      },
      description: {
        nl: "roergebakken ossenhaas met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried beef tenderloin with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratener Rinderfilet mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
      price: 2090,
      qtyPlastic: 2,
      options: tippanSauce,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "92",
      name: {
        nl: "tippan garnalen",
        en: "tippan shrimp",
        de: "Tippan Schrimps",
        zh: "铁虾",
      },
      description: {
        nl: "roergebakken garnalen met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried shrimp with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratene Schrimps mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
      price: 1920,
      qtyPlastic: 2,
      options: tippanSauce,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "93",
      name: {
        nl: "tippan ocean",
        en: "tippan ocean",
        de: "Tippan Ozean",
        zh: "铁海",
      },
      description: {
        nl: "roergebakken shrimp and krabsticks met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried shrimp and crab sticks with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratene Schrimps und Krabben-Sticks mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
      price: 1920,
      qtyPlastic: 2,
      options: tippanSauce,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "94",
      name: {
        nl: "tippan 3 sterren",
        en: "tippan 3 stars",
        de: "Tippan 3 Sterne",
        zh: "铁3星",
      },
      description: {
        nl: "roergebakken kipfilet, varkensvlees en biefstukjes met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried chicken, pork and beef with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratenes Hühnerfleisch, Schweinefleisch und Rindfleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
      price: 1810,
      qtyPlastic: 2,
      options: tippanSauce,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "95",
      name: {
        nl: "tippan 4 sterren",
        en: "tippan 4 stars",
        de: "Tippan 4 Sterne",
        zh: "铁4星",
      },
      description: {
        nl: "roergebakken kipfilet, varkensvlees, biefstukjes en garnalen met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried chicken, pork, beef and shrimp with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratenes Hühnerfleisch, Schweinefleisch, Rindfleisch und Schrimps mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
      price: 1920,
      qtyPlastic: 2,
      options: tippanSauce,
      sides: sidesOptions,
      btw: btw.laag,
    },
  ],
};
