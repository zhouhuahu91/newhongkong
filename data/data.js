const sidesOptions = [
  {
    id: "B1",
    name: {
      nl: "nasi",
      en: "fried rice",
      de: "gebratener Reis",
    },
    price: 0,
  },
  {
    id: "B2",
    name: {
      nl: "bami",
      en: "noodles",
      de: "gebratene Nudeln",
    },
    price: 0,
  },
  {
    id: "B7",
    name: {
      nl: "vegetarische nasi",
      en: "vegetarian fried rice",
      de: "gebratener Reis (vegetarisch)",
    },
    price: 0,
  },
  {
    id: "B8",
    name: {
      nl: "vegetarische bami",
      en: "vegetarian noodles",
      de: "gebratene Nudeln (vegetarisch)",
    },
    price: 0,
  },
  {
    id: "B3",
    name: {
      nl: "witte rijst",
      en: "white rice",
      de: "weißer Reis",
    },
    price: 0,
  },
  {
    id: "B4",
    name: {
      nl: "mihoen",
      en: "rice noodles",
      de: "Glasnudeln",
    },
    // price: 350, new price is of 2022
    price: 390,
  },
  {
    id: "B5",
    name: {
      nl: "Chinese bami",
      en: "chow mein",
      de: "chow mein",
    },
    // price: 350, new price is of 2022
    price: 390,
  },
  {
    id: "B6",
    name: {
      nl: "halve nasi en bami",
      en: "half fried rice and half noodles",
      de: "halb gebratener Reis und halb Nudeln",
    },
    // price: 150, new price is of 2022
    price: 200,
  },
];

const maandmenu = {
  id: "100",
  name: {
    nl: "maandmenu",
    en: "menu of April",
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
        nl: "foe yong hai",
        en: "egg foo young",
        de: "egg foo young",
      },
      description: {
        nl: "omelet in zoete tomatensaus",
        en: "omelet in a sweet tomato sauce",
        de: "Omelett in einer süßen Tomatensoße",
      },
    },
    {
      name: {
        nl: "saté ajam",
        en: "chicken satay",
        de: "Hähnchenspieß",
      },
      description: {
        nl: "3 stokjes kipsaté in satesaus",
        en: "3 chicken satay in peanut sauce",
        de: "3 Hähnchenspieß mit Erdnusssoße",
      },
    },
  ],
  // price: 2150, new price is of 2022
  price: 2370,
  sides,
  totalSides: 2,
};

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

const adminItems = {
  category: {
    nl: "Admin",
    en: "Admin",
    de: "Admin",
  },
  admin: true,
  items: [
    {
      id: "15k",
      name: {
        nl: "casava klein",
        en: "casava small",
        de: "kleines casava",
      },
      description: {
        nl: "klein zakje casava",
        en: "klein zakje casava",
        de: "klein zakje casava",
      },
      price: 100,
    },
    {
      id: "64",
      name: {
        nl: "kleine nasi of bami goreng",
        en: "small fried rice or noodles",
        de: "kleine gebratener Reis oder Nudeln",
      },
      description: {
        nl: "kleine nasi of bami goreng, roergebakken met ei, varkensvlees, ham en prei",
        en: "small fried rice or noodles, stir fried with egg, pork, ham and leek",
        de: "kleine gebratener Reis oder Nudeln mit eiern, Schweinefleisch, Schinken und Lauch",
      },
      price: 470,
      options: [
        {
          id: "H64N",
          name: {
            nl: "kleine nasi goreng",
            en: "small fried rice",
            de: "kleine gebratener Reis",
          },
          price: 0,
        },
        {
          id: "H64B",
          name: {
            nl: "kleine bami goreng",
            en: "small noodles",
            de: "kleine Nudeln",
          },
          price: 0,
        },
        {
          id: "VH64N",
          name: {
            nl: "kleine vegetarische nasi goreng",
            en: "small vegetarian fried rice",
            de: "kleine gebratener Reis, vegetarisch",
          },
          price: 0,
        },
        {
          id: "VH64B",
          name: {
            nl: "kleine vegetarische bami goreng",
            en: "small vegetarian noodles",
            de: "kleine Nudeln, vegetarisch",
          },
          price: 0,
        },
      ],
      optionIsMain: true,
    },
    {
      id: "H60",
      name: {
        nl: "kleine babi pangang",
        en: "small babi pangang",
        de: "kleine babi pangang",
      },
      description: {
        nl: "geroosterde varkensvlees reepjes in licht pikante tomatensaus",
        en: "deep fried lean pork strips in a mild spicy sauce",
        de: "fritierte magerer Schweinefleisch in Streifen in leicht scharfer Soße",
      },
      price: 1100,
      sides: sidesOptions,
    },
    {
      id: "H43",
      name: {
        nl: "kleine foe yong hai kip",
        en: "small egg foo young chicken",
        de: "kleine egg foo young Huhn",
      },
      description: {
        nl: "omelet met kipfilet in zoete tomatensaus",
        en: "omelet with chicken in a sweet tomato sauce",
        de: "Omelett mit Hähnchen in einer süßen Tomatensoße",
      },
      price: 840,
      sides: sidesOptions,
    },
    {
      id: "H49",
      name: {
        nl: "kleine tjap tjoy kip",
        en: "small tjap tjoy chicken",
        de: "kleine tjap tjoy chicken",
      },
      description: {
        nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet",
        en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken",
        de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Hähnchen",
      },
      price: 920,
      sides: sidesOptions,
    },
  ],
};

const menu = {
  menu: [
    {
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
          price: 1130,
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
              price: 150,
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
          price: 1850,
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
              price: 150,
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
          price: 1850,
          options: [
            {
              id: "A",
              name: {
                nl: "A: babi pangang, kip kerry, 6 stuks mini loempias en 2 stokjes kipsate",
                en: "A: babi pangang, chicken curry, 6 mini rolls and 2 chicken satay",
                de: "A: babi pangang, Hühnerfleisch Curry, 6 Minifrühlingsrollen und 2 Hühnerspieße",
              },
              price: 0,
            },
            {
              id: "B",
              name: {
                nl: "B: babi pangang, go bo ky, kou lou kai en 6 stuks gebakken bananen",
                en: "B: babi pangang, go bo ky, kou lou kai and 6 pieces fried bananas",
                de: "B: babi pangang, go bo ky, kou lou kai und 6 Stück fritierte Bananen",
              },
              price: 0,
            },
            {
              id: "C",
              name: {
                nl: "C: babi pangang, Indische rundvlees, 6 stuks pangsit goreng en 2 stokjes kipsate",
                en: "C: babi pangang, spicy beef, 6 pieces of fried won ton and 2 chicken satay",
                de: "C: babi pangang, scharfer Rindfleisch, 6 Stück fritierte Wantan und 2 Hühnerspieße",
              },
              price: 0,
            },
            {
              id: "D",
              name: {
                nl: "D: babi pangang, tjap tjoy, kou lou kai en 2 stokjes kipsate",
                en: "D: babi pangang, tjap tjoy, kou lou kai and 2 chicken satay",
                de: "D: babi pangang, tjap tjoy, kou lou kai und 2 Hühnerspieße",
              },
              price: 0,
            },
            {
              id: "E",
              name: {
                nl: "E: babi pangang, foe yong hai, kou lou kai en 2 stokjes kipsate",
                en: "E: babi pangang, egg foo young, kou lou kai and 2 chicken satay",
                de: "E: babi pangang, egg foo young, kou lou kai und 2 Hühnerspieße",
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
          price: 3110,
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
                nl: "roergebaken tsa siu met groenten in licht pikante saus",
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
          price: 3660,
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
          price: 3910,
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
          price: 4980,
          sides: sidesOptions,
          totalSides: 2,
        },
      ],
    },
    adminItems,
    {
      category: {
        nl: "soepen",
        en: "soups",
        de: "Suppen",
      },
      items: [
        {
          id: "1",
          name: {
            nl: "kippensoep",
            en: "chicken soup",
            de: "Hühnersuppe",
          },
          description: {
            nl: "heldere soep van kipbouilion met kipstukjes, eigeel en lente-uitjes",
            en: "chicken broth with chicken, egg yolk and spring onion",
            de: "Hühnerbrühe mit Huhn, Eigelb und Frühlingszwiebeln",
          },
          price: 340,
        },
        {
          id: "2",
          name: {
            nl: "tomatensoep",
            en: "tomato soup",
            de: "Tomatensuppe",
          },
          description: {
            nl: "tomatensoep met kipstukjes, eigeel en lente-uitjes",
            en: "tomato soup with chicken, egg yolk and spring onion",
            de: "Tomatensuppe mit Huhn, Eigelb und Frühlingszwiebeln",
          },
          price: 340,
        },
        {
          id: "3",
          name: {
            nl: "haaienvinnensoep",
            en: "egg drop soup",
            de: "Eiertropfensuppe",
          },
          description: {
            nl: "gebonden soep gemaakt van eiwit met ham en lente-uitjes",
            en: "soup made of egg white with ham and spring onion",
            de: "Suppe aus Eiweiß mit Schinken und Frühlingszwiebeln",
          },
          price: 400,
        },
        {
          id: "4",
          name: {
            nl: "kippensoep met champignons",
            en: "chicken soup with mushrooms",
            de: "Hühnersuppe mit Pilzen",
          },
          description: {
            nl: "heldere soep van kipbouilion met champignons, kipstukjes, eigeel en lente-uitjes",
            en: "chicken broth with mushroom, chicken, egg yolk and spring onion",
            de: "Hühnerbrühe mit Pilzen, Hühnchen, Eigelb und Frühlingszwiebeln",
          },
          price: 430,
        },
        {
          id: "5",
          name: {
            nl: "Chinese champignonsoep",
            en: "Chinese mushroom soup",
            de: "Chinesische Pilzsuppe",
          },
          description: {
            nl: "gebonden soep gemaakt van donkere sojasaus met poku, kipstukjes, garnalen en lente-uitjes",
            en: "soup made from soy sauce with poku mushrooms, chicken, shrimp and spring onion",
            de: "Suppe aus Sojasauce mit Poku-Pilzen, Hühnchen, Garnelen und Frühlingszwiebeln",
          },
          price: 530,
        },
        {
          id: "6",
          name: {
            nl: "wan tan soep",
            en: "wonton soup",
            de: "Wantansuppe",
          },
          description: {
            nl: "heldere soep van kipbouilion met kip gevulde flensjes en groenten",
            en: "chicken broth with wonton filled with chicken, vegetables and spring onion",
            de: "Hühnerbrühe mit Wonton gefüllt mit Hühnchen, Gemüse und Frühlingszwiebeln",
          },
          price: 530,
        },
        {
          id: "7",
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
          price: 540,
        },
      ],
    },
    {
      category: {
        nl: "bijgerechten",
        en: "sides",
        de: "Beilagen",
      },
      items: [
        {
          id: "8",
          name: {
            nl: "mini loempia's",
            en: "mini rolls",
            de: "Minifrühlingsrolle",
          },
          description: {
            nl: "6 vegetarische mini loempias",
            en: "6 vegetarian mini rolls",
            de: "6 vegetarische Minifrühlingsrollen",
          },
          price: 400,
        },
        {
          id: "9",
          name: {
            nl: "Peking loempia",
            en: "Peking roll",
            de: "Peking Frühlingsrolle",
          },
          description: {
            nl: "2 kleine loempia's gevuld met vermicelli en tsa siu",
            en: "2 small rolls filled with chow mein and cha siu",
            de: "2 kleine Frühlingsrollen gefüllt mit chow mein und Cha Siu",
          },
          price: 410,
        },
        {
          id: "10",
          name: {
            nl: "loempia speciaal",
            en: "roll special",
            de: "Frühlingsrolle spezial",
          },
          description: {
            nl: "grote groente loempia gevuld met taugé en ei",
            en: "large vegetable roll filled with beansprout and egg",
            de: "große Gemüsefrühlingsrolle gefüllt mit Sojasprossen und Ei",
          },
          price: 450,
          options: [
            {
              id: "555",
              name: {
                nl: "vegetarisch",
                en: "vegetarian",
                de: "vegetarisch",
              },
              price: 0,
            },
            {
              id: "10",
              name: {
                nl: "met varkensvlees",
                en: "with pork",
                de: "mit Schweinefleisch",
              },
              price: 0,
            },
            {
              id: "151",
              name: {
                nl: "met kippenvlees",
                en: "with chicken",
                de: "mit Hühnerfleisch",
              },
              price: 0,
            },
          ],
        },
        {
          id: "11",
          name: {
            nl: "Cantonese pangsit goreng",
            en: "fried wonton",
            de: "Gebackene Wantan",
          },
          description: {
            nl: "8 krokant gebakken wantan gevuld met kip, met zoetzure saus",
            en: "8 crunchy fried chicken wonton, comes with sweet & sour sauce",
            de: "8 knusprig fritierte Hähnchen Wantan, mit süß saurer Soße",
          },
          price: 530,
        },
        {
          id: "12",
          name: {
            nl: "pisang goreng",
            en: "pisang goreng",
            de: "pisang goreng",
          },
          description: {
            nl: "6 gebakken bananen, zoet",
            en: "6 fried bananas, sweet",
            de: "6 fritierte Bananen, süß",
          },
          price: 450,
        },
        {
          id: "13",
          name: {
            nl: "siu mai",
            en: "siu mai",
            de: "siu mai",
          },
          description: {
            nl: "4 gestoomde kippenvleespasteitjes, met zoetzure saus",
            en: "4 steamed chicken dumplings, comes with sweet & sour sauce",
            de: "4 gedämpfte Hähnchen Teigtaschen mit süß saurer Soße",
          },
          price: 450,
        },
        {
          id: "14",
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
          price: 320,
        },
        {
          id: "15",
          name: {
            nl: "kroepoek casava",
            en: "spicy crackers",
            de: "spciy crackers",
          },
          description: {
            nl: "kleine stukjes pittige kroepoek",
            en: "small spicy chips like crackers",
            de: "kleine scharfe Chips wie Crackers",
          },
          price: 320,
        },
        {
          id: "16",
          name: {
            nl: "saté ajam",
            en: "chicken satay",
            de: "Hähnchenspieß",
          },
          description: {
            nl: "3 stokjes kipsaté in satesaus",
            en: "3 chicken satay in peanut sauce",
            de: "3 Hähnchenspieß mit Erdnusssoße",
          },
          price: 570,
        },
        {
          id: "17",
          name: {
            nl: "patat",
            en: "fries",
            de: "Pommes",
          },
          description: {
            nl: "zakje patat",
            en: "small bag of fries",
            de: "kleine Portion Pommes",
          },
          price: 290,
        },
        {
          id: "18",
          name: {
            nl: "witte rijst",
            en: "white rice",
            de: "weißer Reis",
          },
          description: {
            nl: "bakje witte rijst",
            en: "box of white rice",
            de: "Portion weißer Reis",
          },
          price: 400,
        },
        {
          id: "19",
          name: {
            nl: "diverse sauzen",
            en: "various sauces",
            de: "verschiedene Soßen",
          },
          description: {
            nl: "± 250ml",
            en: "± 250ml",
            de: "± 250ml",
          },
          price: 250,
          options: [
            {
              id: "S1",
              name: {
                nl: "pindasaus",
                en: "peanut sauce",
                de: "Erdnusssoße",
              },
              price: 0,
            },
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
                nl: "babi pangang saus",
                en: "babi pangang sauce",
                de: "babi pangang Soße",
              },
              price: 0,
            },
            {
              id: "S5",
              name: {
                nl: "kerriesaus",
                en: "curry sauce",
                de: "Curry Soße",
              },
              price: 0,
            },
            {
              id: "S6",
              name: {
                nl: "foe yong hai saus",
                en: "egg foo young sauce",
                de: "egg foo young Soße",
              },

              price: 0,
            },
            {
              id: "S7",
              name: {
                nl: "zwarte bonen saus",
                en: "black bean sauce",
                de: "schwarze Bohnen Soße",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
      ],
    },
    {
      category: {
        nl: "speciliteiten uit Canton",
        en: "Canton specialties",
        de: "Kantonesischer Spezialitäten",
      },
      items: [
        {
          id: "20",
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
          price: 1510,
          sides: sidesOptions,
        },
        {
          id: "21",
          name: {
            nl: "jiew ko ky",
            en: "jiew ko ky",
            de: "jiew ko ky",
          },
          description: {
            nl: "roergebakken kipfilet met groenten en cashewnoten",
            en: "stir fried chicken with vegetables and cashew nuts",
            de: "gebratenes Hühnerfleisch mit Gemüse und Cashew Nüssen",
          },
          price: 1470,
          sides: sidesOptions,
        },
        {
          id: "22",
          name: {
            nl: "tjap tjoy a la Canton",
            en: "tjap tjoy a la Canton",
            de: "tjap tjoy a la Canton",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips, prei, kipfilet, garnalen en tsa siu",
            en: "stir fried beansprout, onion, mushrooms, bamboo shoots, chicken, shrimp and cha siu ",
            de: "Gebratene Sojasprossen, Zwiebeln, Champignons, Bambussprossen, Hühnerfleisch, Schrimps sowie Cha Siu",
          },

          price: 1580,
          sides: sidesOptions,
        },
        {
          id: "23",
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
          price: 1470,
          sides: sidesOptions,
        },
        {
          id: "24",
          name: {
            nl: "tau sie ngaw",
            en: "tau sie ngaw",
            de: "tau sie ngaw",
          },
          description: {
            nl: "roergebakken biefstukjes met groenten in zwarte bonensaus",
            en: "stir fried beef with vegetables in a black bean sauce",
            de: "gebratenes Rindfleisch mit Gemüse in schwarzer Bohnen Soße",
          },
          price: 1630,
          sides: sidesOptions,
        },
        {
          id: "25",
          name: {
            nl: "tau sie ha",
            en: "tau sie ha",
            de: "tau sie ha",
          },
          description: {
            nl: "roergebakken garnalen met groenten in zwarte bonensaus",
            en: "stir fried shrimp with vegetables in a black bean sauce",
            de: "gebratene Schrimps mit Gemüse in schwarzer Bohnen Soße",
          },
          price: 1760,
          sides: sidesOptions,
        },
        {
          id: "26",
          name: {
            nl: "tau sie ha long",
            en: "tau sie ha long",
            de: "tau sie ha long",
          },
          description: {
            nl: "roergebakken gepelde gambas met groenten in zwarte bonensaus",
            en: "stir fried gambas with vegetables in a black bean sauce",
            de: "gebratene Garnelen mit Gemüse in schwarzer Bohnen Soße",
          },
          price: 2070,
          sides: sidesOptions,
        },
      ],
    },
    {
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
          price: 1670,
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
          price: 1630,
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
          price: 1760,
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

          price: 2060,
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
            nl: "roergebakken gambas met groenten in een lichte pikante",
            en: "stir fried gambas with vegetables in a mild spicy sauce",
            de: "gebratene Garnelen mit Gemüse in einer leicht scharfen Soße",
          },
          price: 2060,
          sides: sidesOptions,
        },
      ],
    },
    {
      category: {
        nl: "specialteiten uit Mongolië",
        en: "Mongolian specialties",
        de: "Mongolische Spezialitäten",
      },
      items: [
        {
          id: "32",
          name: {
            nl: "tjong sik ngaw law",
            en: "tjong sik ngaw law",
            de: "tjong sik ngaw law",
          },
          description: {
            nl: "roergebakken ossenhaas met groenten in een zoetzure saus",
            en: "stir fried beef tenderloin with vegetables in a sweet & sour sauce",
            de: "gebratenes Rinderfilet mit Gemüse in einer süß sauren Soße",
          },
          price: 1880,
          sides: sidesOptions,
        },
        {
          id: "33",
          name: {
            nl: "tjong sik tjun paa",
            en: "tjong sik tjun paa",
            de: "tjong sik tjun paa",
          },
          description: {
            nl: "roergebakken varkenskarbonade met groenten in een zoetzure saus",
            en: "stir fried pork chop with vegetables in a sweet and sour sauce",
            de: "gebratenes Schweinekotelett mit Gemüse in einer süß sauren Soße",
          },
          price: 1760,
          sides: sidesOptions,
        },
      ],
    },
    {
      category: {
        nl: "specialteiten uit Sie Sheun",
        en: "Sie Sheun specialties",
        de: "Sie Sheun Spezialitäten",
      },
      items: [
        {
          id: "34",
          name: {
            nl: "Sie Sheun ky",
            en: "Sie Sheun ky",
            de: "Sie Sheun ky",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in een licht pikante Sie Sheun saus",
            en: "stir fried chicken with vegetables in a mild spicy Sie Sheun sauce",
            de: "gebratenes Hühnerfleisch mit Gemüse in leicht scharfer Sie Sheun Soße",
          },
          price: 1470,
          sides: sidesOptions,
        },
        {
          id: "35",
          name: {
            nl: "Sie Sheun yuk",
            en: "Sie Sheun yuk",
            de: "Sie Sheun yuk",
          },
          description: {
            nl: "roergebakken varkensvlees met groenten in een licht pikante Sie Sheun saus",
            en: "stir fried pork with vegetables in a mild spicy Sie Sheun sauce",
            de: "gebratenes Schweinefleisch mit Gemüse in leicht scharfen Sie Sheun Soße",
          },
          price: 1470,
          sides: sidesOptions,
        },
        {
          id: "36",
          name: {
            nl: "Sie Sheun ha",
            en: "Sie Sheun ha",
            de: "Sie Sheun ha",
          },
          description: {
            nl: "roergebakken garnalen met groenten in een licht pikante Sie Sheun saus",
            en: "stir fried shrimp with vegetables in a mild spicy Sie Sheun sauce",
            de: "gebratene Schrimps mit Gemüse in leicht scharfen Sie Sheun Soße",
          },
          price: 1760,
          sides: sidesOptions,
        },
        {
          id: "37",
          name: {
            nl: "go bo yuk ky",
            en: "go bo yuk ky",
            de: "go bo yuk ky",
          },
          description: {
            nl: "roergebakken kipfilet en varkansvlees met groenten in pikante gon bao saus",
            en: "stir fried chicken and pork with vegetables in spicy gon bao sauce",
            de: "gebratenes Hühner- und Schweinefleisch mit Gemüse in scharfer gon bao Soße",
          },
          price: 1630,
          sides: sidesOptions,
        },
        {
          id: "38",
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
          price: 1840,
          sides: sidesOptions,
        },
        {
          id: "39",
          name: {
            nl: "go bo ha",
            en: "go bo ha",
            de: "go bo ha",
          },
          description: {
            nl: "roergebakken garnalen met groenten in pikante gon bao saus",
            en: "stir fried shrimp and vegetables in spicy gon bao sauce",
            de: "gebratene Schrimps mit Gemüse in scharfer gon bao Soße",
          },
          price: 1860,
          sides: sidesOptions,
        },
        {
          id: "40",
          name: {
            nl: "ma bor to foe",
            en: "ma bor to foe",
            de: "ma bor to foe",
          },
          description: {
            nl: "roergebakken garnalen, varkensvlees en tofu met groenten in licht pikante ma bor saus",
            en: "stir fried shrimp, pork and tofu with vegetables in a mild spicy ma bor sauce",
            de: "gebratene Schrimps, Schweinefleisch und Tofu mit Gemüse in leicht scharfer ma bor Soße",
          },
          price: 1840,
          sides: sidesOptions,
        },
      ],
    },
    {
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
    },
    {
      category: {
        nl: "groentegerechten",
        en: "vegetable dishes",
        de: "Gemüse Gerichte",
      },
      items: [
        {
          id: "47",
          name: {
            nl: "tjap tjoy vegetarisch",
            en: "tjap tjoy vegetarian",
            de: "tjap tjoy vegetarisch",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch",
          },
          price: 1120,
          sides: sidesOptions,
        },
        {
          id: "48",
          name: {
            nl: "tjap tjoy tofu",
            en: "tjap tjoy tofy",
            de: "tjap tjoy tofy",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met tofu",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with tofu",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Tofu",
          },
          price: 1210,
          sides: sidesOptions,
        },
        {
          id: "49",
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
          price: 1230,
          sides: sidesOptions,
        },
        {
          id: "50",
          name: {
            nl: "tjap tjoy varkensvlees",
            en: "tjap tjoy pork",
            de: "tjap tjoy Schweinefleisch",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestripse en prei met varkensvlees",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with pork",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Schweinefleisch",
          },
          price: 1230,
          sides: sidesOptions,
        },
        {
          id: "51",
          name: {
            nl: "tjap tjoy bief",
            en: "tjap tjoy beef",
            de: "tjap tjoy Rindfleisch",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met biefstukjes",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with beef",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Rindfleisch",
          },
          price: 1350,
          sides: sidesOptions,
        },
        {
          id: "52",
          name: {
            nl: "tjap tjoy garnalen",
            en: "tjap tjoy shrimp",
            de: "tjap tjoy Schrimps",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met garnalen",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with shrimp",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Schrimps",
          },
          price: 1530,
          sides: sidesOptions,
        },
        {
          id: "53",
          name: {
            nl: "tjap tjoy speciaal",
            en: "tjap tjoy special",
            de: "tjap tjoy special",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet, varkensvlees en garnalen",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken, pork and shrimp",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Hühnerfleisch, Schweinefleisch und Schrimps",
          },

          price: 1420,
          sides: sidesOptions,
        },
      ],
    },
    {
      category: {
        nl: "kipgerechten",
        en: "chicken dishes",
        de: "Hühnerfleisch Gerichte",
      },
      items: [
        {
          id: "54",
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
          price: 1270,
          sides: sidesOptions,
        },
        {
          id: "55",
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
          price: 1270,
          sides: sidesOptions,
        },
        {
          id: "56",
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
          price: 1270,
          sides: sidesOptions,
        },
        {
          id: "57",
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
          price: 1270,
          sides: sidesOptions,
        },
        {
          id: "58",
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
          price: 1520,
          sides: sidesOptions,
        },
        {
          id: "59",
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
          price: 1520,
          sides: sidesOptions,
        },
      ],
    },
    {
      category: {
        nl: "vleesgerechten",
        en: "pork dishes",
        de: "Schweinefleisch Gerichte",
      },
      items: [
        {
          id: "60",
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
          price: 1470,
          sides: sidesOptions,
        },
        {
          id: "61",
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
          price: 1580,
          sides: sidesOptions,
        },
        {
          id: "62",
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
          price: 1500,
          sides: sidesOptions,
        },
        {
          id: "63",
          name: {
            nl: "kou lou yuk",
            en: "kou lou yuk",
            de: "kou lou yuk",
          },
          description: {
            nl: "gepaneerde vleesballetjes met zoetzure saus",
            en: "deep fried pork in dough with a sweet & sour sauce",
            de: "fritiertes Schweinefleisch mit süß saurer Soße",
          },
          price: 1270,
          sides: sidesOptions,
        },
      ],
    },
    {
      category: {
        nl: "nasi of bami gerechten",
        en: "fried rice or noodle dishes",
        de: "gebratener Reis und Nudel Gerichte",
      },
      items: [
        {
          id: "64",
          name: {
            nl: "nasi of bami goreng",
            en: "fried rice or noodles",
            de: "gebratener Reis oder Nudeln",
          },
          description: {
            nl: "nasi of bami goreng, roergebakken met ei, varkensvlees, ham en prei",
            en: "fried rice or noodles, stir fried with egg, pork, ham and leek",
            de: "gebratener Reis oder Nudeln mit eiern, Schweinefleisch, Schinken und Lauch",
          },
          price: 630,
          options: [
            {
              id: "64N",
              name: {
                nl: "nasi goreng",
                en: "fried rice",
                de: "gebratener Reis",
              },
              price: 0,
            },
            {
              id: "64B",
              name: {
                nl: "bami goreng",
                en: "noodles",
                de: "Nudeln",
              },
              price: 0,
            },
            {
              id: "V64N",
              name: {
                nl: "vegetarische nasi goreng",
                en: "vegetarian fried rice",
                de: "gebratener Reis, vegetarisch",
              },
              price: 0,
            },
            {
              id: "V64B",
              name: {
                nl: "vegetarische bami goreng",
                en: "vegetarian noodles",
                de: "Nudeln, vegetarisch",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "65",
          name: {
            nl: "nasi of bami goreng extra",
            en: "fried rice or noodles extra",
            de: "gebratener Reis oder Nudeln extra",
          },
          description: {
            nl: "nasi of bami goreng met een stokje kipsaté en Indische rundvlees",
            en: "fried rice or noodles with a chicken satay and spicy beef",
            de: "gebratener Reis oder Nudeln mit Hühnerspieß und scharfer Rindfleisch",
          },
          price: 1060,
          options: [
            {
              id: "65N",
              name: {
                nl: "nasi goreng extra",
                en: "fried rice etra",
                de: "gebratener Reis extra",
              },
              price: 0,
            },
            {
              id: "65B",
              name: {
                nl: "bami goreng extra",
                en: "noodles extra",
                de: "Nudeln extra",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "66",
          name: {
            nl: "nasi of bami goreng speciaal",
            en: "fried rice or noodles special",
            de: "gebratener Reis oder Nudeln spezial",
          },
          description: {
            nl: "nasi of bami goreng met een stokje kipsaté en een kippenbout in licht pikante tomatensaus",
            en: "fried rice or noodles with a chicken satay and drumstick in a mild spicy sauce",
            de: "gebratener Reis oder Nudeln mit einem Hähnchenspieß sowie einen Hähnchenschenkel in einer leicht scharfen Soße",
          },
          price: 1060,
          options: [
            {
              id: "66N",
              name: {
                nl: "nasi goreng speciaal",
                en: "fried rice special",
                de: "gebratener Reis spezial",
              },
              price: 0,
            },
            {
              id: "66B",
              name: {
                nl: "bami goreng speciaal",
                en: "noodles special",
                en: "Nudeln spezial",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "67",
          name: {
            nl: "nasi of bami goreng met sate",
            en: "fried rice or noodles with satay",
            de: "gebratener Reis oder Nudeln mit Satay",
          },
          description: {
            nl: "nasi of bami goreng met 3 stokjes kipsaté",
            en: "fried rice or noodles with 3 chicken satay",
            de: "gebratener Reis oder Nudeln mit 3 Hühnerspieße",
          },
          price: 1130,
          options: [
            {
              id: "67N",
              name: {
                nl: "nasi goreng sate",
                en: "fried rice satay",
                de: "gebratener Reis Satay",
              },
              price: 0,
            },
            {
              id: "67B",
              name: {
                nl: "bami goreng sate",
                en: "noodles satay",
                de: "Nudeln Satay",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "68",
          name: {
            nl: "nasi of bami goreng compleet",
            en: "fried rice or noodles complete",
            de: "gebratener Reis oder Nudeln komplett",
          },
          description: {
            nl: "nasi of bami goreng met babi pangang, kou lou kai, een stokje kipsate en Indische rundvlees",
            en: "fried rice or noodles with babi pangang, kou lou kai, a chicken satay and spicy beef",
            de: "gebratener Reis oder Nudeln mit Babi Panggang, kou lou kai, ein Hühnerspieß und scharfer Rindfleisch",
          },

          price: 1600,
          options: [
            {
              id: "68N",
              name: {
                nl: "nasi goreng compleet",
                en: "fried rice complete",
                de: "gebratener Reis komplett",
              },
              price: 0,
            },
            {
              id: "68B",
              name: {
                nl: "bami goreng compleet",
                en: "noodles complete",
                de: "gebratene Nudeln komplett",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "69",
          name: {
            nl: "nasi of bami goreng kipfilet",
            en: "chicken fried rice or noodles",
            de: "gebratener Reis oder Nudeln mit Hühnerfleisch",
          },
          description: {
            nl: "nasi of bami goreng met roergebakken kipfilet en groenten",
            en: "fried rice or noodles with stir fried chicken and vegetables",
            de: "gebratener Reis oder Nudeln mit Hühnerfleisch und Gemüse",
          },
          price: 1130,
          options: [
            {
              id: "69N",
              name: {
                nl: "nasi goreng kipfilet",
                en: "chicken fried rice",
                de: "gebratener Reis mit Hühnerfleisch",
              },
              price: 0,
            },
            {
              id: "69B",
              name: {
                nl: "bami goreng kipfilet",
                en: "chicken noodles",
                de: "gebratene Nudeln mit Hühnerfleisch",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "70",
          name: {
            nl: "nasi of bami goreng varkensvlees",
            en: "pork fried rice or noodles",
            de: "gebratener Reis oder Nudeln mit Schweinefleisch",
          },
          description: {
            nl: "nasi of bami goreng met roergebakken varkensvlees en groenten",
            en: "fried rice or noodles with stir fried pork and vegetables",
            de: "gebratener Reis oder Nudeln mit Schweinefleisch und Gemüse",
          },
          price: 1130,
          options: [
            {
              id: "70N",
              name: {
                nl: "nasi goreng varkensvlees",
                en: "pork fried rice",
                de: "gebratener Reis mit Schweinefleisch",
              },
              price: 0,
            },
            {
              id: "70B",
              name: {
                nl: "bami goreng varkensvlees",
                en: "pork noodles",
                de: "gebratene Nudeln mit Schweinefleisch",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "71",
          name: {
            nl: "nasi of bami goreng garnalen",
            en: "shrimp fried rice or noodles",
            de: "gebratener Reis oder Nudeln mit Schrimps",
          },
          description: {
            nl: "nasi of bami goreng met roergebakken garnalen en groenten",
            en: "fried rice or noodles with stir fried shrimp and vegetables",
            de: "gebratener Reis oder Nudeln mit Schrimps und Gemüse",
          },
          price: 1490,
          options: [
            {
              id: "71N",
              name: {
                nl: "nasi goreng garnalen",
                en: "shrimp fried rice",
                de: "gebratener Reis mit Schrimps",
              },
              price: 0,
            },
            {
              id: "71B",
              name: {
                nl: "bami goreng garnalen",
                en: "shrimp noodles",
                de: "gebratene Nudeln mit Schrimps",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "72",
          name: {
            nl: "nasi of bami goreng krab",
            en: "crab fried rice or noodles",
            de: "gebratener Reis oder Nudeln mit Krabben",
          },
          description: {
            nl: "nasi of bami goreng met roergebakken krabsticks en groenten",
            en: "fried rice or noodles with stir fried crab sticks and vegetables",
            de: "gebratener Reis oder Nudeln mit Krabben-Sticks und Gemüse",
          },
          price: 1490,
          options: [
            {
              id: "72N",
              name: {
                nl: "nasi goreng krab",
                en: "crab fried rice",
                de: "gebratener Reis mit Krabben",
              },
              price: 0,
            },
            {
              id: "B",
              name: {
                nl: "bami goreng krab",
                en: "crab noodles",
                de: "gebratene Nudeln mit Krabben",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "73",
          name: {
            nl: "nasi Singapore",
            en: "fried rice Singapore",
            de: "gebratener Reis Singapur art",
          },
          description: {
            nl: "nasi gewokt met kipfilet, varkensvlees en garnalen in kerie",
            en: "fried rice stir fried with chicken, pork and shrimp in curry",
            de: "gebratener Reis mit Hühnerfleisch, Schweinefleisch und Schrimps in Curry",
          },
          price: 1430,
        },
      ],
    },
    {
      category: {
        nl: "mihoen of Chinese bami gerechten",
        en: "rice noodles or chow mein dishes",
        de: "Reisnudeln oder Chow Mein Gerichte",
      },
      items: [
        {
          id: "74",
          name: {
            nl: "mihoen of Chinese bami compleet",
            en: "rice noodles or chow mein complete",
            de: "Reisnudeln oder Chow Mein komplett",
          },
          description: {
            nl: "met babi pangang, kou lou kai, een stokje kipsaté en Indische rundvlees",
            en: "comes with babi pangang, kou lou kai, a chicken satay and spicy beef",
            de: "serviert mit Babi Pangang, kou lou kai, ein Hühnerspieß und scharfer Rindfleisch",
          },
          price: 1770,
          options: [
            {
              id: "74M",
              name: {
                nl: "mihoen compleet",
                en: "rice noodles complete",
                de: "Reisnudeln komplett",
              },
              price: 0,
            },
            {
              id: "74B",
              name: {
                nl: "Chinese bami compleet",
                en: "chow mein complete",
                de: "chow mein komplett",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "75",
          name: {
            nl: "mihoen of Chinese bami kipfilet",
            en: "chicken rice noodles or chow mein",
            de: "Reisnudeln mit Hühnerfleisch oder chow mein",
          },
          description: {
            nl: "mihoen of Chinese bami gewokt met kipfilet",
            en: "rice noodles or chow mein stir fried with chicken",
            de: "Reisnudeln oder chow mein mit Hühnerfleisch",
          },
          price: 1230,
          options: [
            {
              id: "75M",
              name: {
                nl: "mihoen kipfilet",
                en: "chicken rice noodles",
                de: "Reisnudeln mit Hühnerfleisch",
              },
              price: 0,
            },
            {
              id: "75B",
              name: {
                nl: "Chinese bami kipfilet",
                en: "chicken chow mein",
                de: "chow mein mit Hühnerfleisch",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "76",
          name: {
            nl: "mihoen of Chinese bami varkensvlees",
            en: "pork rice noodles or chow mein",
            de: "Reisnudeln mit Schweinefleisch oder chow mein",
          },
          description: {
            nl: "mihoen of Chinese bami gewokt met varkensvlees",
            en: "rice noodles or chow mein stir fried with pork",
            de: "Reisnudeln oder chow mein mit Schweinefleisch",
          },
          price: 1230,
          options: [
            {
              id: "76M",
              name: {
                nl: "mihoen varkensvlees",
                en: "pork rice noodles",
                de: "Reisnudeln mit Schweinefleisch",
              },
              price: 0,
            },
            {
              id: "76B",
              name: {
                nl: "Chinese bami varkensvlees",
                en: "pork chow mein",
                de: "chow mein mit Schweinefleisch",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "77",
          name: {
            nl: "mihoen of Chinese bami bief",
            en: "beef rice noodles or chow mein",
            de: "Reisnudeln mit Rindfleisch oder chow mein",
          },
          description: {
            nl: "mihoen of Chinese bami gewokt met biefstukjes",
            en: "rice noodles or chow mein stir fried with beef",
            de: "Reisnudeln oder chow mein mit Rindfleisch",
          },
          price: 1300,
          options: [
            {
              id: "77M",
              name: {
                nl: "mihoen bief",
                en: "beef rice noodles",
                de: "Reisnudeln mit Rindfleisch",
              },
              price: 0,
            },
            {
              id: "77B",
              name: {
                nl: "Chinese bami bief",
                en: "beef chow mein",
                de: "chow mein mit Rindfleisch",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "78",
          name: {
            nl: "mihoen of Chinese bami garnalen",
            en: "shrimp rice noodles or chow mein",
            de: "Reisnudeln mit Schrimps oder chow mein",
          },
          description: {
            nl: "mihoen of Chinese bami gewokt met garnalen",
            en: "rice noodles or chow mein stir fried with shrimp",
            de: "Reisnudeln oder chow mein mit Schrimps",
          },
          price: 1540,
          options: [
            {
              id: "78M",
              name: {
                nl: "mihoen garnalen",
                en: "shrimp rice noodles",
                de: "Reisnudeln mit Schrimps",
              },
              price: 0,
            },
            {
              id: "78B",
              name: {
                nl: "Chinese bami garnalen",
                en: "shrimp chow mein",
                de: "chow mein mit Schrimps",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "79",
          name: {
            nl: "mihoen of Chinese bami krab",
            en: "crab rice noodles or chow mein",
            de: "Reisnudeln mit Krabben oder chow mein",
          },
          description: {
            nl: "mihoen of Chinese bami gewokt met krabsticks",
            en: "rice noodles or chow mein stir fried with crab stick",
            de: "Reisnudeln oder chow mein mit Krabben-Sticks",
          },
          price: 1540,
          options: [
            {
              id: "79M",
              name: {
                nl: "mihoen krab",
                en: "crab rice noodles",
                de: "Reisnudeln mit Krabben",
              },
              price: 0,
            },
            {
              id: "79B",
              name: {
                nl: "Chinese bami krab",
                en: "crab chow mein",
                de: "chow mein mit Krabben",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "80",
          name: {
            nl: "mihoen Singapore",
            en: "rice noodles Singapore",
            de: "Reisnudeln Singapur art",
          },
          description: {
            nl: "mihoen gewokt met kipfilet, varkensvlees en garnalen in kerrie",
            en: "rice noodles stir fried with chicken, pork and shrimp in curry",
            de: "Reisnudeln mit Hühnerfleisch, Schweinefleisch und Schrimps in Curry",
          },
          price: 1530,
        },
        {
          id: "81",
          name: {
            nl: "tsa siu chow ming",
            en: "cha siu chow mein",
            de: "cha siu chow mein",
          },
          description: {
            nl: "Chinese bami gewokt met tsa siu",
            en: "chow mein stir fried with cha siu",
            de: "chow mein mit cha siu",
          },
          price: 1300,
        },
      ],
    },
    {
      category: {
        nl: "Indische gerechten",
        en: "Indonesian dishes",
        de: "Indonesische Gerichte",
      },
      items: [
        {
          id: "82",
          name: {
            nl: "nasi of bami rames gewoon",
            en: "fried rice or noodles rames",
            de: "gebratener Reis oder Nudeln rames",
          },
          description: {
            nl: "met Indische rundvlees & groenten",
            en: "comes with spicy beef and vegetables",
            de: "serviert mit scharfer Rindfleisch und Gemüse",
          },
          price: 1060,
          options: [
            {
              id: "82N",
              name: {
                nl: "nasi rames gewoon",
                en: "fried rice rames",
                de: "gebratener Reis rames",
              },
              price: 0,
            },
            {
              id: "82B",
              name: {
                nl: "bami rames gewoon",
                en: "noodles rames",
                de: "Nudeln rames",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "83",
          name: {
            nl: "nasi of bami rames speciaal",
            en: "fried rice or noodles rames special",
            de: "gebratener Reis oder Nudeln rames spezial",
          },
          description: {
            nl: "met een stokje kipsate, kippebout in licht pikante tomatensaus en Indische rundvlees & groenten",
            en: "comes with a chicken satay, chicken drumstick in a mild spicy sauce, spicy beef and vegetables",
            de: "serviert mit einem Hühnerspieß, Hähnchenschenkel in leicht scharfer Soße sowie scharfer Rindfleisch und Gemüse",
          },
          price: 1430,
          options: [
            {
              id: "83N",
              name: {
                nl: "nasi rames speciaal",
                en: "fried rice rames special",
                de: "gebratener Reis rames spezial",
              },
              price: 0,
            },
            {
              id: "83B",
              name: {
                nl: "bami rames speciaal",
                en: "noodles rames special",
                de: "Nudeln rames spezial",
              },
              price: 0,
            },
          ],
          optionIsMain: true,
        },
        {
          id: "84",
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
          price: 1110,
          sides: sidesOptions,
        },
        {
          id: "85",
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
          price: 1510,
          sides: sidesOptions,
        },
        {
          id: "86",
          name: {
            nl: "ajam smoor",
            en: "ajam smoor",
            de: "ajam smoor",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in ketjapsaus",
            en: "stir fried chicken with vegetables in a sweet soy sauce",
            de: "gebratenes Hühnerfleisch mit Gemüse in süßer Sojasoße",
          },
          price: 1270,
          sides: sidesOptions,
        },
        {
          id: "87",
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
          price: 1560,
          sides: sidesOptions,
        },
      ],
    },
    {
      category: {
        nl: "tippan",
        en: "tippan dishes",
        de: "Tippan Gerichte",
      },
      items: [
        {
          id: "88",
          name: {
            nl: "tippan kipfilet",
            en: "tippan chicken",
            de: "Tippan Hühnerfleisch",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
            en: "stir fried chicken with vegetables in a oyster, spicy, curry or black bean sauce",
            de: "gebratenes Hühnerfleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
          },
          price: 1560,
          options: tippanSauce,
          sides: sidesOptions,
        },
        {
          id: "89",
          name: {
            nl: "tippan varkensvlees",
            en: "tippan pork",
            de: "Tippan Schweinefleisch",
          },
          description: {
            nl: "roergebakken varkensvlees met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
            en: "stir fried pork with vegetables in a oyster, spicy, curry or black bean sauce",
            de: "gebratenes Schweinefleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
          },
          price: 1560,
          options: tippanSauce,
          sides: sidesOptions,
        },
        {
          id: "90",
          name: {
            nl: "tippan bief",
            en: "tippan beef",
            de: "Tippan Rindfleisch",
          },
          description: {
            nl: "roergebakken biefstukjes met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
            en: "stir fried beef with vegetables in a oyster, spicy, curry or black bean sauce",
            de: "gebratenes Rindfleisch mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
          },
          price: 1680,
          options: tippanSauce,
          sides: sidesOptions,
        },
        {
          id: "91",
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
          price: 1880,
          options: tippanSauce,
          sides: sidesOptions,
        },
        {
          id: "92",
          name: {
            nl: "tippan garnalen",
            en: "tippan shrimp",
            de: "Tippan Schrimps",
          },
          description: {
            nl: "roergebakken garnalen met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
            en: "stir fried shrimp with vegetables in a oyster, spicy, curry or black bean sauce",
            de: "gebratene Schrimps mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
          },
          price: 1880,
          options: tippanSauce,
          sides: sidesOptions,
        },
        {
          id: "93",
          name: {
            nl: "tippan ocean",
            en: "tippan ocean",
            de: "Tippan Ozean",
          },
          description: {
            nl: "roergebakken shrimp and krabsticks met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
            en: "stir fried shrimp and crab sticks with vegetables in a oyster, spicy, curry or black bean sauce",
            de: "gebratene Schrimps und Krabben-Sticks mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
          },
          price: 1880,
          options: tippanSauce,
          sides: sidesOptions,
        },
        {
          id: "94",
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
          price: 1750,
          options: tippanSauce,
          sides: sidesOptions,
        },
        {
          id: "95",
          name: {
            nl: "tippan 4 sterren",
            en: "tippan 4 stars",
            de: "Tippan 4 Sterne",
          },
          description: {
            nl: "roergebakken kipfilet, varkensvlees, biefstukjes en garnalen met groenten in oestersaus, pikante saus, kerrie saus of zwarte bonen saus",
            en: "stir fried chicken, pork, beef and shrimp with vegetables in a oyster, spicy, curry or black bean sauce",
            de: "gebratenes Hühnerfleisch, Schweinefleisch, Rindfleisch und Schrimps mit Gemüse in Austernsoße, scharfer Soße, Curry oder schwarze Bohnen Soße",
          },
          price: 1820,
          options: tippanSauce,
          sides: sidesOptions,
        },
      ],
    },
  ],
};

export default menu;
