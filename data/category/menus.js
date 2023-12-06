import sidesOptions from "data/options/sidesOptions";

import { christmasA, christmasB } from "./christmas";

const maandmenu = {
  id: "100",
  name: {
    nl: "maandmenu",
    en: "menu of the month",
    de: "Menü des Monats",
  },
  description: {
    nl: "voor ongeveer 3 personen",
    en: "for around 3 people",
    de: "für ca. 3 Personen",
  },
  menuList: [
    {
      name: {
        nl: "mini loempia's",
        en: "mini rolls",
        de: "Minifrühlingsrolle",
      },
      description: {
        nl: "4 stuks mini loempia's",
        en: "4 pieces of mini rolls",
        de: "4 Stück Mini-Frühlingsrollen",
      },
    },
    {
      name: {
        nl: "babi pangang",
        en: "babi pangang",
        de: "Babi pangang",
      },
      description: {
        nl: "geroosterde varkensvlees reepjes in licht pikante tomatensaus",
        en: "deep fried lean pork strips in a mild spicy sauce",
        de: "fritierte magerer Schweinefleisch in Streifen in leicht scharfer Soße",
      },
    },
    {
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
    },
    {
      name: {
        nl: "kip kerry",
        en: "chicken curry",
        de: "chicken curry",
      },
      description: {
        nl: "roergebakken kipfilet met groenten in kerrie saus",
        en: "stir fried chicken with vegetables in curry sauce",
        de: "gebratener Hühnerfleisch mit Gemüse in Curry Soße",
      },
    },
  ],
  price: 2490,
  qtyPlastic: 5,
  sides: sidesOptions,
  totalSides: 2,
};

export default {
  category: {
    nl: "menu's",
    en: "menus",
    de: "Menüs",
  },
  items: [
    {
      id: "96",
      name: {
        nl: "menu voor een",
        en: "menu for one",
        de: "Menü für einzel",
      },
      description: {
        nl: "voor ongeveer één persoon",
        en: "for around one person",
        de: "für ca. eine Person",
      },
      price: 1190,
      qtyPlastic: 2,
      options: [
        {
          id: "A",
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
          price: 0,
        },
        {
          id: "B",
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
          price: 0,
        },
        {
          id: "C",
          name: {
            nl: "tjap tjoy kip",
            en: "tjap tjoy chicken",
            de: "tjap tjoy chicken",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Hähnchen",
          },
          price: 0,
        },
        {
          id: "D",
          name: {
            nl: "kip kerry",
            en: "chicken curry",
            de: "chicken curry",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in kerrie saus",
            en: "stir fried chicken with vegetables in curry sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in Curry Soße",
          },
          price: 0,
        },
        {
          id: "E",
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
          },
          price: 0,
        },
        {
          id: "F",
          name: {
            nl: "sate ajam",
            en: "sate ajam",
            de: "sate ajam",
          },
          description: {
            nl: "2 stokjes kipsate in satesaus",
            en: "2 chicken satay in peanut sauce",
            de: "2 Hähnchenspieße in Erdnusssoße",
          },
          price: 0,
        },
        {
          id: "G",
          name: {
            nl: "mini loempias",
            en: "mini rolls",
            de: "Minifrühlingsrollen",
          },
          description: {
            nl: "6 stuks vegetarische mini loempias",
            en: "6 vegetarian mini rolls",
            de: "6 vegetarische Minifrühlingsrollen",
          },
          price: 0,
        },
        {
          id: "I",
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
          price: 200,
        },
      ],
      totalOptions: 2,
      sides: sidesOptions,
    },
    {
      id: "97",
      name: {
        nl: "mini sam fook",
        en: "mini sam fook",
        de: "mini sam fook",
      },
      description: {
        nl: "voor ongeveer twee personen",
        en: "for around two people",
        de: "für ca. zwei Personen",
      },
      price: 1940,
      qtyPlastic: 4,
      options: [
        {
          id: "A",
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
          price: 0,
        },
        {
          id: "B",
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
          price: 0,
        },
        {
          id: "C",
          name: {
            nl: "tjap tjoy kip",
            en: "tjap tjoy chicken",
            de: "tjap tjoy chicken",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Hähnchen",
          },
          price: 0,
        },
        {
          id: "D",
          name: {
            nl: "kip kerry",
            en: "chicken curry",
            de: "chicken curry",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in kerrie saus",
            en: "stir fried chicken with vegetables in curry sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in Curry Soße",
          },
          price: 0,
        },
        {
          id: "E",
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
          },
          price: 0,
        },
        {
          id: "F",
          name: {
            nl: "sate ajam",
            en: "sate ajam",
            de: "sate ajam",
          },
          description: {
            nl: "3 stokjes kipsate in satesaus",
            en: "3 chicken satay in peanut sauce",
            de: "3 Hähnchenspieß mit Erdnusssoße",
          },
          price: 0,
        },
        {
          id: "G",
          name: {
            nl: "mini loempias",
            en: "mini rolls",
            de: "Minifrühlingsrollen",
          },
          description: {
            nl: "6 stuks vegetarische mini loempias",
            en: "6 vegetarian mini rolls",
            de: "6 vegetarische Minifrühlingsrollen",
          },
          price: 0,
        },
        {
          id: "I",
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
          price: 200,
        },
      ],
      totalOptions: 3,
      sides: sidesOptions,
    },
    {
      id: "98",
      name: {
        nl: "menus voor twee",
        en: "menu's for two",
        de: "Menüs für zwei",
      },
      description: {
        nl: "voor ongeveer twee personen",
        en: "for around two people",
        de: "für ca. zwei Personen",
      },
      price: 1940,
      qtyPlastic: 4,
      optionIsMain: true,
      options: [
        {
          id: "98A",
          name: {
            nl: "menu A",
            en: "menu A",
            de: "menü A",
          },
          description: {
            nl: "babi pangang, kip kerry, 6 stuks mini loempias en 2 stokjes kipsate",
            en: "babi pangang, chicken curry, 6 mini rolls and 2 chicken satay",
            de: "babi pangang, Hühnerfleisch Curry, 6 Minifrühlingsrollen und 2 Hühnerspieße",
          },
          price: 0,
        },
        {
          id: "98B",
          name: {
            nl: "menu B",
            en: "menu B",
            de: "menü B",
          },
          description: {
            nl: "babi pangang, go bo ky, kou lou kai en 6 stuks gebakken bananen",
            en: "babi pangang, go bo ky, kou lou kai and 6 pieces fried bananas",
            de: "babi pangang, go bo ky, kou lou kai und 6 Stück fritierte Bananen",
          },
          price: 0,
        },
        {
          id: "98C",
          name: {
            nl: "menu C",
            en: "menu C",
            de: "menü C",
          },
          description: {
            nl: "babi pangang, Indische rundvlees, 6 stuks pangsit goreng en 2 stokjes kipsate",
            en: "babi pangang, spicy beef, 6 pieces of fried won ton and 2 chicken satay",
            de: "babi pangang, scharfer Rindfleisch, 6 Stück fritierte Wantan und 2 Hühnerspieße",
          },
          price: 0,
        },
        {
          id: "98D",
          name: {
            nl: "menu D",
            en: "menu D",
            de: "menü D",
          },
          description: {
            nl: "babi pangang, tjap tjoy, kou lou kai en 2 stokjes kipsate",
            en: "babi pangang, tjap tjoy, kou lou kai and 2 chicken satay",
            de: "babi pangang, tjap tjoy, kou lou kai und 2 Hühnerspieße",
          },
          price: 0,
        },
        {
          id: "98E",
          name: {
            nl: "menu E",
            en: "menu E",
            de: "menü E",
          },
          description: {
            nl: "babi pangang, foe yong hai, kou lou kai en 2 stokjes kipsate",
            en: "babi pangang, egg foo young, kou lou kai and 2 chicken satay",
            de: "babi pangang, egg foo young, kou lou kai und 2 Hühnerspieße",
          },
          price: 0,
        },
      ],
      totalOptions: 1,
      sides: sidesOptions,
    },
    {
      id: "99",
      name: {
        nl: "sam fook",
        en: "sam fook",
        de: "sam fook",
      },
      description: {
        nl: "voor ongeveer 4 personen",
        en: "for around 4 people",
        de: "für ca. 4 Personen",
      },
      price: 3260,
      qtyPlastic: 5,
      options: [
        {
          id: "A",
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
          price: 0,
        },
        {
          id: "B",
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
          price: 0,
        },
        {
          id: "C",
          name: {
            nl: "tjap tjoy kip",
            en: "tjap tjoy chicken",
            de: "tjap tjoy chicken",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Hähnchen",
          },
          price: 0,
        },
        {
          id: "D",
          name: {
            nl: "kip kerry",
            en: "chicken curry",
            de: "chicken curry",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in kerrie saus",
            en: "stir fried chicken with vegetables in curry sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in Curry Soße",
          },
          price: 0,
        },
        {
          id: "E",
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
          },
          price: 0,
        },
        {
          id: "F",
          name: {
            nl: "sate ajam",
            en: "sate ajam",
            de: "sate ajam",
          },
          description: {
            nl: "6 stokjes kipsate in satesaus",
            en: "6 chicken satay in peanut sauce",
            de: "6 Hähnchenspieße in Erdnusssoße",
          },
          price: 0,
        },
        {
          id: "G",
          name: {
            nl: "pikante kip",
            en: "spicy chicken",
            de: "Hähnchen scharf",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in een licht pikante saus",
            en: "stir fried chicken with vegetables in a mild spicy sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in leicht scharfer Soße",
          },
          price: 0,
        },
        {
          id: "H",
          name: {
            nl: "sweet honey",
            en: "sweet honey",
            de: "sweet honey",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in zoete gembersaus",
            en: "stir fried chicken with vegetablaes in a sweet ginger sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in einer süßen Ingwer Soße",
          },
          price: 0,
        },
        {
          id: "I",
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
          price: 0,
        },
        {
          id: "J",
          name: {
            nl: "babi ketjap",
            en: "babi soy",
            de: "babi soy",
          },
          description: {
            nl: "geroosterde varkensvlees reepjes in ketjapsaus",
            en: "deep fried pork strips in a sweet soy sauce",
            de: "Fritierte Schweinefleischstreifen mit einer süßen Sojasoße",
          },
          price: 0,
        },
        {
          id: "K",
          name: {
            nl: "tau sie ky",
            en: "tau sie ky",
            de: "tau sie ky",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in zwarte bonensaus",
            en: "stir fried chicken with vegetables in a black bean sauce",
            de: "gebratenes Hühnerfleisch mit Gemüse in einer Soße aus schwarze Bohnen",
          },
          price: 0,
        },
        {
          id: "L",
          name: {
            nl: "tau sie yuk",
            en: "tau sie yuk",
            de: "tau sie yuk",
          },
          description: {
            nl: "roergebakken varkensvlees met groenten in zwarte bonensaus",
            en: "stir fried pork with vegetables in a black bean sauce",
            de: "gebratenes Schweinefleisch mit Gemüse in einer Soße aus schwarze Bohnen",
          },
          price: 0,
        },
        {
          id: "M",
          name: {
            nl: "tsa siu",
            en: "cha siu",
            de: "cha siu",
          },
          description: {
            nl: "geroosterd varkensvlees, mals en zoet met licht pikante saus",
            en: "roasted pork, sweet and tender with mild spicy sauce",
            de: "geröstete Schweinefleisch, süß und zart in leicht schafer Soße",
          },
          price: 0,
        },
        {
          id: "N",
          name: {
            nl: "guang zhou tsa siu",
            en: "guang zhou cha siu",
            de: "guang zhou cha siu",
          },
          description: {
            nl: "roergebakken tsa siu met groenten in licht pikante saus",
            en: "stir fried cha siu with vegetables in a mild spicy sauce",
            de: "gebratener Cha Siu mit Gemüse in leicht scharfer Soße",
          },
          price: 0,
        },
        {
          id: "P",
          name: {
            nl: "baw law ngaw",
            en: "baw law ngaw",
            de: "baw law ngaw",
          },
          description: {
            nl: "roergebakken biefstukjes met ananas in zoetzure saus",
            en: "stir fried beef with pineapples in a sweet and sour sauce",
            de: "gebratener Rindfleisch mit Ananas in süß saurer Soße",
          },
          price: 0,
        },
      ],
      totalOptions: 3,
      sides: sidesOptions,
      totalSides: 2,
    },
    maandmenu,
    {
      id: "101",
      name: {
        nl: "Indische rijsttafel",
        en: "Indonesian menu",
        de: "Indonesischer Menü",
      },
      description: {
        nl: "voor ongeveer 4 personen",
        en: "for around 4 people",
        de: "für ca. 4 Personen",
      },
      menuList: [
        {
          name: {
            nl: "2 stokjes kipsaté",
            en: "2 chicken satay",
            de: "2 Hähnchenspieß",
          },
        },
        {
          name: {
            nl: "2 gebakken bananen",
            en: "2 fried bananas",
            de: "2 fritierte Bananen",
          },
        },
        {
          name: {
            nl: "Indische groenten",
            en: "Indonesian vegetables",
            de: "Indonesischer Gemüse",
          },
        },
        {
          name: {
            nl: "ajam pangang",
            en: "ajam pangang",
            de: "ajam pangang",
          },
          description: {
            nl: "kipreepjes in licht pikante tomatensaus",
            en: "chicken strips in a mild spicy tomoato sauce",
            de: "Hühnerstreifen in leicht scharfer Tomatensoße",
          },
        },
        {
          name: {
            nl: "daging roedjak",
            en: "daging roedjak",
            de: "daging roedjak",
          },
          description: {
            nl: "gestoofd rundvlees in pittige gekruide saus",
            en: "stewed beef in a spicy sauce",
            de: "geschmortes Rindfleisch in scharfer Soße",
          },
        },
        {
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
          },
        },
        {
          name: {
            nl: "gado gado",
            en: "gado gado",
            de: "gado gado",
          },
          description: {
            nl: "vegetarische Indische salade met taugé, komkommer, winterpeen en een spiegelei in satesaus",
            en: "Indonesian salad with beansprout, cucumber, carrot and a fried egg in peanut sauce",
            de: "Indonesischer Salat mit Sojasprossen, Gurken, Karotten und ein Spiegelei in Erdnusssoße",
          },
        },
      ],
      price: 3840,
      qtyPlastic: 7,
      sides: sidesOptions,
      totalSides: 2,
    },
    {
      id: "102",
      name: {
        nl: "Chinese rijsttafel",
        en: "Chinese menu",
        de: "Chinesischer Menü",
      },
      description: {
        nl: "voor ongeveer 4 á 5 personen",
        en: "for around 4 to 5 people",
        de: "für ca. 4 order 5 Personen",
      },
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
            nl: "2 stokjes kipsaté",
            en: "2 chicken satay",
            de: "2 Hähnchenspieß",
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
            nl: "tippan kipfilet",
            en: "tippan chicken",
            de: "Tippan Hühnerfleisch",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in zwarte bonen saus",
            en: "stir fried chicken with vegetables in black bean sauce",
            de: "gebratenes Hühnerfleisch mit Gemüse in schwarze Bohnen Soße",
          },
        },
        {
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
        },
        {
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
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
      price: 4110,
      qtyPlastic: 6,
      sides: sidesOptions,
      totalSides: 2,
    },
    {
      id: "103",
      name: {
        nl: "Chinese rijsttafel new Hong Kong",
        en: "New Hong Kong menu",
        de: "New Hong Kong Menü",
      },
      description: {
        nl: "voor ongeveer 4 á 5 personen",
        en: "for around 4 to 5 people",
        de: "für ca. 4 order 5 Personen",
      },
      menuList: [
        {
          name: {
            nl: "sun la tong",
            en: "sun la tong",
            de: "sun la tong",
          },
          description: {
            nl: "pikante soep gemaakt van donkere sojasaus met kipstukjes, garnalen, tofu en lente-uitjes",
            en: "spicy soup made from soy sauce with chicken, shrimp, tofu and spring onion",
            de: "würzige Suppe aus Sojasauce mit Hähnchen, Garnelen, Tofu und Frühlingszwiebeln",
          },
        },
        {
          name: {
            nl: "2 sates van ossenhaas & garnalen",
            en: "2 satay of beef & shrimp",
            de: "2 Satay vom Rind und Schrimps",
          },
        },
        {
          name: {
            nl: "tippan ossenhaas",
            en: "tippan beef tenderloin",
            de: "Tippan Rinderfilet",
          },
          description: {
            nl: "roergebakken ossenhaas met groenten in oestersaus",
            en: "stir fried beef tenderloin with vegetables in a oyster sauce",
            de: "gebratener Rinderfilet mit Gemüse in Austernsoße",
          },
        },
        {
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
        },
        {
          name: {
            nl: "gepaneerde kip",
            en: "sweet chicken",
            de: "sweet chicken",
          },
          description: {
            nl: "gepaneerde kipfilet roergebakken met groenten in zoetzure saus",
            en: "deep fried breaded chicken stir fried with vegetables in a sweet sauce",
            de: "paniertes Hühnerfleisch gebraten mit Gemüse in einer süßen Soße",
          },
        },
      ],
      price: 5230,
      qtyPlastic: 8,
      sides: sidesOptions,
      totalSides: 2,
    },
  ],
};
