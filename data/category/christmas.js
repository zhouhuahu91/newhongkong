import sidesOptions from "../options/sidesOptions";
import btw from "../options/btw";

const sidesOptionsB = [
  {
    id: "B1",
    name: {
      nl: "nasi",
      en: "fried rice",
      de: "gebratener Reis",
      zh: "饭",
    },
    price: 0,
  },
  {
    id: "B2",
    name: {
      nl: "bami",
      en: "noodles",
      de: "gebratene Nudeln",
      zh: "面",
    },
    price: 0,
  },
  {
    id: "B7",
    name: {
      nl: "vegetarische nasi",
      en: "vegetarian fried rice",
      de: "gebratener Reis (vegetarisch)",
      zh: "素饭",
    },
    price: 0,
  },
  {
    id: "B8",
    name: {
      nl: "vegetarische bami",
      en: "vegetarian noodles",
      de: "gebratene Nudeln (vegetarisch)",
      zh: "素面",
    },
    price: 0,
  },
  {
    id: "B3",
    name: {
      nl: "witte rijst",
      en: "white rice",
      de: "weißer Reis",
      zh: "白饭",
    },
    price: 0,
  },
  {
    id: "B4",
    name: {
      nl: "mihoen",
      en: "rice noodles",
      de: "Glasnudeln",
      zh: "米分",
    },
    price: 440,
  },
  {
    id: "B5",
    name: {
      nl: "Chinese bami",
      en: "chow mein",
      de: "chow mein",
      zh: "中面",
    },
    price: 440,
  },
];

const tippanSauce = [
  {
    id: "S3",
    name: {
      nl: "oester saus",
      en: "oyster sauce",
      de: "Austernsauce",
      zh: "",
    },
    price: 0,
  },
  {
    id: "S4",
    name: {
      nl: "pikante saus",
      en: "spicy sauce",
      de: "Scharfe Sauce",
      zh: "",
    },
    price: 0,
  },
  {
    id: "S5",
    name: {
      nl: "kerrie saus",
      en: "curry sauce",
      de: "Curry Soße",
      zh: "",
    },
    price: 0,
  },
  {
    id: "S7",
    name: {
      nl: "zwarte bonen saus",
      en: "black bean sauce",
      de: "Sauce aus schwarzen Bohnen",
      zh: "",
    },
    price: 0,
  },
];

export const christmasA = {
  id: "200",
  name: {
    nl: "kerstmenu A",
    en: "christmas menu A",
    de: "Weihnachtsmenü A",
    zh: "圣诞节 A",
  },
  description: {
    nl: "voor ongeveer 3 personen",
    en: "for around 3 people",
    de: "für ca. 3 Personen",
    zh: "",
  },
  price: 5490,
  sides: sidesOptions,
  totalSides: 2,
  options: tippanSauce,
  btw: btw.laag,
  menuList: [
    {
      name: {
        nl: "3 vegetarische mini loempias",
        en: "3 vegetarian mini rolls",
        de: "3 vegetarische Minifrühlingsrollen",
        zh: "",
      },
    },
    {
      name: {
        nl: "3 gebakken bananen",
        en: "3 fried bananas",
        de: "3 fritierte Bananen",
        zh: "",
      },
    },
    {
      name: {
        nl: "3 Cantonese pangsit goreng",
        en: "3 fried wonton",
        de: "3 Gebackene Wantan",
        zh: "",
      },
      description: {
        nl: "krokant gebakken wantan gevuld met kip, met zoetzure saus",
        en: "crunchy fried chicken wonton, comes with sweet & sour sauce",
        de: "knusprig fritierte Hähnchen Wantan, mit süß saurer Soße",
        zh: "",
      },
    },
    {
      name: {
        nl: "3 stokjes kipsaté",
        en: "3 chicken satay",
        de: "3 Hähnchenspieß",
        zh: "",
      },
    },
    {
      name: {
        nl: "babi pangang",
        en: "babi pangang",
        de: "babi pangang",
        zh: "",
      },
      description: {
        nl: "geroosterde varkensvlees reepjes in licht pikante tomatensaus",
        en: "deep fried lean pork strips in a mild spicy sauce",
        de: "fritierte magerer Schweinefleisch in Streifen in leicht scharfer Soße",
        zh: "",
      },
    },
    {
      name: {
        nl: "go bo hu yuk",
        en: "go bo hu yuk",
        de: "go bo hu yuk",
        zh: "",
      },
      description: {
        nl: "roergebakken garnalen en varkansvlees met groenten in pikante gon bao saus",
        en: "stir fried shrimp and pork with vegetables in a spicy gon bao sauce",
        de: "gebratenes Schweinefleisch und Schrimps mit Gemüse in scharfer gon bao Soße",
        zh: "",
      },
    },
    {
      name: {
        nl: "tippan bief",
        en: "tippan beef",
        de: "Tippan Rindfleisch",
        zh: "",
      },
      description: {
        nl: "roergebakken biefstukjes met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried beef with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratenes Rindfleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
    },
    {
      name: {
        nl: "kroepoek udang",
        en: "prawn crackers",
        de: "Krabbenchips",
        zh: "",
      },
      description: {
        nl: "kroepoek gemaakt van garnalen",
        en: "shrimp crackers",
        de: "Krabbenchips",
        zh: "",
      },
    },
  ],
};

export const christmasB = {
  id: "201",
  name: {
    nl: "kerstmenu B",
    en: "christmas menu B",
    de: "Weihnachtsmenü B",
    zh: "圣诞节 B",
  },
  description: {
    nl: "voor ongeveer 5 á 6 personen",
    en: "for around 5 to 6 people",
    de: "für ca. 5 oder 6 Personen",
    zh: "",
  },
  price: 8890,
  sides: sidesOptionsB,
  totalSides: 2,
  options: tippanSauce,
  btw: btw.laag,
  menuList: [
    {
      name: {
        nl: "6 vegetarische mini loempias",
        en: "6 vegetarian mini rolls",
        de: "6 vegetarische Minifrühlingsrollen",
        zh: "",
      },
    },
    {
      name: {
        nl: "6 gebakken bananen",
        en: "6 fried bananas",
        de: "6 fritierte Bananen",
        zh: "",
      },
    },
    {
      name: {
        nl: "6 Cantonese pangsit goreng",
        en: "6 fried wonton",
        de: "6 Gebackene Wantan",
        zh: "",
      },
      description: {
        nl: "krokant gebakken wantan gevuld met kip, met zoetzure saus",
        en: "crunchy fried chicken wonton, comes with sweet & sour sauce",
        de: "knusprig fritierte Hähnchen Wantan, mit süß saurer Soße",
        zh: "",
      },
    },
    {
      name: {
        nl: "babi pangang spek",
        en: "babi pangang bacon",
        de: "babi pangang Speck",
        zh: "",
      },
      description: {
        nl: "geroosterde spek reepjes met licht pikante tomatensaus, saus apart",
        en: "deep fried bacon strips with mild spicy tomato sauce, sauce comes separate",
        de: "Fritierte Speckstreifen mit leicht scharfer Tomatensoße, Soße wird separat serviert",
        zh: "",
      },
    },
    {
      name: {
        nl: "Thaise kip",
        en: "Thai chicken",
        de: "Thai chicken",
        zh: "",
      },
      description: {
        nl: "gepaneerde kipfilet roergebakken met groenten in pikante ketjapsaus",
        en: "deep fried breaded chicken stir fried with vegetables in a spicy soy sauce",
        de: "paniertes Hühnerfleisch gebraten mit Gemüse in einer scharfen Sojasoße",
        zh: "",
      },
    },
    {
      name: {
        nl: "tippan ossenhaas",
        en: "tippan beef tenderloin",
        de: "Tippan Rinderfilet",
        zh: "",
      },
      description: {
        nl: "roergebakken ossenhaas met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried beef tenderloin with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratener Rinderfilet mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
        zh: "",
      },
    },
    {
      name: {
        nl: "sin jien ha long",
        en: "sin jien ha long",
        de: "sin jien ha long",
        zh: "",
      },
      description: {
        nl: "roergebakken gambas met groenten in een lichte pikante",
        en: "stir fried gambas with vegetables in a mild spicy sauce",
        de: "gebratene Garnelen mit Gemüse in einer leicht scharfen Soße",
        zh: "",
      },
    },
    {
      name: {
        nl: "kroepoek udang",
        en: "prawn crackers",
        de: "Krabbenchips",
        zh: "",
      },
      description: {
        nl: "kroepoek gemaakt van garnalen",
        en: "shrimp crackers",
        de: "Krabbenchips",
        zh: "",
      },
    },
  ],
};
