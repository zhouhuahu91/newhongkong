import sidesOptions from "../options/sidesOptions";

const tippanSauce = [
  {
    id: "S3",
    name: {
      nl: "oester saus",
      en: "oyster sauce",
      de: "Austernsauce",
    },
    price: 0,
  },
  {
    id: "S4",
    name: {
      nl: "pikante saus",
      en: "spicy sauce",
      de: "Scharfe Sauce",
    },
    price: 0,
  },
  {
    id: "S5",
    name: {
      nl: "kerrie saus",
      en: "curry sauce",
      de: "Curry Soße",
    },
    price: 0,
  },
  {
    id: "S7",
    name: {
      nl: "zwarte bonen saus",
      en: "black bean sauce",
      de: "Sauce aus schwarzen Bohnen",
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
  },
  description: {
    nl: "voor ongeveer 2 á 3 personen",
    en: "for around 2 to 3 people",
    de: "für ca. 2 oder 3 Personen",
  },
  price: 4990,
  sides: sidesOptions,
  totalSides: 2,
  options: tippanSauce,

  menuList: [
    {
      name: {
        nl: "3 vegetarische mini loempias",
        en: "3 vegetarian mini rolls",
        de: "3 vegetarische Minifrühlingsrollen",
      },
    },
    {
      name: {
        nl: "3 gebakken bananen",
        en: "3 fried bananas",
        de: "3 fritierte Bananen",
      },
    },
    {
      name: {
        nl: "3 Cantonese pangsit goreng",
        en: "3 fried wonton",
        de: "3 Gebackene Wantan",
      },
      description: {
        nl: "krokant gebakken wantan gevuld met kip, met zoetzure saus",
        en: "crunchy fried chicken wonton, comes with sweet & sour sauce",
        de: "knusprig fritierte Hähnchen Wantan, mit süß saurer Soße",
      },
    },
    {
      name: {
        nl: "3 stokjes kipsaté",
        en: "3 chicken satay",
        de: "3 Hähnchenspieß",
      },
    },
    {
      name: {
        nl: "babi pangang",
        en: "babi pangang",
        de: "babi pangang",
      },
      description: {
        nl: "geroosterde varkensvlees reepjes in licht pikante tomatensaus",
        en: "deep fried lean pork strips in a mild spicy sauce",
        de: "fritierte magerer Schweinefleisch in Streifen in leicht scharfer Soße",
      },
    },
    {
      name: {
        nl: "go bo hu yuk",
        en: "go bo hu yuk",
        de: "go bo hu yuk",
      },
      description: {
        nl: "roergebakken garnalen en varkansvlees met groenten in pikante gon bao saus",
        en: "stir fried shrimp and pork with vegetables in a spicy gon bao sauce",
        de: "gebratenes Schweinefleisch und Schrimps mit Gemüse in scharfer gon bao Soße",
      },
    },
    {
      name: {
        nl: "tippan 3 sterren",
        en: "tippan 3 stars",
        de: "Tippan 3 Sterne",
      },
      description: {
        nl: "roergebakken kipfilet, varkensvlees en biefstukjes met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried chicken, pork and beef with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratenes Hühnerfleisch, Schweinefleisch und Rindfleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
      },
    },
    {
      name: {
        nl: "kroepoek udang",
        en: "prawn crackers",
        de: "Krabbenchips",
      },
      description: {
        nl: "kroepoek gemaakt van garnalen",
        en: "shrimp crackers",
        de: "Krabbenchips",
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
  },
  description: {
    nl: "voor ongeveer 4 á 5 personen",
    en: "for around 4 to 5 people",
    de: "für ca. 4 oder 5 Personen",
  },
  price: 7990,
  sides: sidesOptions,
  totalSides: 2,
  options: tippanSauce,

  menuList: [
    {
      name: {
        nl: "6 vegetarische mini loempias",
        en: "6 vegetarian mini rolls",
        de: "6 vegetarische Minifrühlingsrollen",
      },
    },
    {
      name: {
        nl: "6 gebakken bananen",
        en: "6 fried bananas",
        de: "6 fritierte Bananen",
      },
    },
    {
      name: {
        nl: "6 Cantonese pangsit goreng",
        en: "6 fried wonton",
        de: "6 Gebackene Wantan",
      },
      description: {
        nl: "krokant gebakken wantan gevuld met kip, met zoetzure saus",
        en: "crunchy fried chicken wonton, comes with sweet & sour sauce",
        de: "knusprig fritierte Hähnchen Wantan, mit süß saurer Soße",
      },
    },
    {
      name: {
        nl: "babi pangang spek",
        en: "babi pangang bacon",
        de: "babi pangang Speck",
      },
      description: {
        nl: "geroosterde spek reepjes met licht pikante tomatensaus, saus apart",
        en: "deep fried bacon strips with mild spicy tomato sauce, sauce comes separate",
        de: "Fritierte Speckstreifen mit leicht scharfer Tomatensoße, Soße wird separat serviert",
      },
    },
    {
      name: {
        nl: "Thaise kip",
        en: "Thai chicken",
        de: "Thai chicken",
      },
      description: {
        nl: "gepaneerde kipfilet roergebakken met groenten in pikante ketjapsaus",
        en: "deep fried breaded chicken stir fried with vegetables in a spicy soy sauce",
        de: "paniertes Hühnerfleisch gebraten mit Gemüse in einer scharfen Sojasoße",
      },
    },
    {
      name: {
        nl: "tippan ossenhaas",
        en: "tippan beef tenderloin",
        de: "Tippan Rinderfilet",
      },
      description: {
        nl: "roergebakken ossenhaas met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
        en: "stir fried beef tenderloin with vegetables in a oyster, spicy, curry or black bean sauce",
        de: "gebratener Rinderfilet mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
      },
    },
    {
      name: {
        nl: "sin jien ha long",
        en: "sin jien ha long",
        de: "sin jien ha long",
      },
      description: {
        nl: "roergebakken gambas met groenten in een lichte pikante",
        en: "stir fried gambas with vegetables in a mild spicy sauce",
        de: "gebratene Garnelen mit Gemüse in einer leicht scharfen Soße",
      },
    },
    {
      name: {
        nl: "kroepoek udang",
        en: "prawn crackers",
        de: "Krabbenchips",
      },
      description: {
        nl: "kroepoek gemaakt van garnalen",
        en: "shrimp crackers",
        de: "Krabbenchips",
      },
    },
  ],
};
