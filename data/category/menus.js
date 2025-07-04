import sidesOptions from "data/options/sidesOptions";
import btw from "../options/btw";

import { christmasA, christmasB } from "./christmas";

const maandmenu = {
  id: "100",
  name: {
    nl: "maandmenu",
    en: "menu of the month",
    de: "Menü des Monats",
    zh: "月全",
  },
  description: {
    nl: "voor ongeveer 3 personen",
    en: "for around 3 people",
    de: "für ca. 3 Personen",
    zh: "",
  },
  menuList: [
    {
      name: {
        nl: "mini loempia's",
        en: "mini rolls",
        de: "Minifrühlingsrolle",
        zh: "小卷",
      },
      description: {
        nl: "4 vegetarische mini loempias",
        en: "4 vegetarian mini rolls",
        de: "4 vegetarische Minifrühlingsrollen",
        zh: "",
      },
    },
    {
      name: {
        nl: "babi pangang",
        en: "babi pangang",
        de: "Babi pangang",
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
        nl: "foe yong hai",
        en: "egg foo young",
        de: "egg foo young",
        zh: "素夫下",
      },
      description: {
        nl: "omelet in een zoete tomatensaus",
        en: "omelet meat in a sweet tomato sauce",
        de: "Omelett in einer süßen Tomatensoße",
        zh: "",
      },
    },
    {
      name: {
        nl: "saté ajam",
        en: "chicken satay",
        de: "Hähnchenspieß",
        zh: "地鸡",
      },
      description: {
        nl: "3 stokjes kipsaté in satesaus",
        en: "3 chicken satay in peanut sauce",
        de: "3 Hähnchenspieß mit Erdnusssoße",
        zh: "",
      },
    },
  ],
  price: 2990,
  qtyPlastic: 5,
  sides: sidesOptions,
  totalSides: 2,
  btw: btw.laag,
};

export default {
  category: {
    nl: "menu's",
    en: "menus",
    de: "Menüs",
    zh: "",
  },
  id: 0,
  items: [
    {
      id: "96",
      name: {
        nl: "menu voor een",
        en: "menu for one",
        de: "Menü für einzel",
        zh: "一人全",
      },
      description: {
        nl: "voor ongeveer één persoon",
        en: "for around one person",
        de: "für ca. eine Person",
        zh: "",
      },
      price: 1390,
      qtyPlastic: 2,
      options: [
        {
          id: "A",
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
          price: 0,
        },
        {
          id: "B",
          name: {
            nl: "foe yong hai kip",
            en: "egg foo young chicken",
            de: "egg foo young Huhn",
            zh: "夫下",
          },
          description: {
            nl: "omelet met kipfilet in zoete tomatensaus",
            en: "omelet with chicken in a sweet tomato sauce",
            de: "Omelett mit Hähnchen in einer süßen Tomatensoße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "VB",
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
          price: 0,
        },
        {
          id: "C",
          name: {
            nl: "tjap tjoy kip",
            en: "tjap tjoy chicken",
            de: "tjap tjoy chicken",
            zh: "什菜",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Hähnchen",
            zh: "",
          },
          price: 0,
        },
        {
          id: "VC",
          name: {
            nl: "tjap tjoy vegetarisch",
            en: "tjap tjoy vegetarian",
            de: "tjap tjoy vegetarisch",
            zh: "素什菜",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch",
            zh: "",
          },
          price: 0,
        },
        {
          id: "D",
          name: {
            nl: "kip kerry",
            en: "chicken curry",
            de: "chicken curry",
            zh: "加里鸡",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in kerrie saus",
            en: "stir fried chicken with vegetables in curry sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in Curry Soße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "E",
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
            zh: "古老鸡",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "F",
          name: {
            nl: "sate ajam",
            en: "sate ajam",
            de: "sate ajam",
            zh: "地鸡",
          },
          description: {
            nl: "2 stokjes kipsate in satesaus",
            en: "2 chicken satay in peanut sauce",
            de: "2 Hähnchenspieße in Erdnusssoße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "G",
          name: {
            nl: "mini loempias",
            en: "mini rolls",
            de: "Minifrühlingsrollen",
            zh: "小卷",
          },
          description: {
            nl: "6 stuks vegetarische mini loempias",
            en: "6 vegetarian mini rolls",
            de: "6 vegetarische Minifrühlingsrollen",
            zh: "",
          },
          price: 0,
        },
        {
          id: "I",
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
          price: 200,
        },
      ],
      totalOptions: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "97",
      name: {
        nl: "mini sam fook",
        en: "mini sam fook",
        de: "mini sam fook",
        zh: "小三福",
      },
      description: {
        nl: "voor ongeveer twee personen",
        en: "for around two people",
        de: "für ca. zwei Personen",
        zh: "",
      },
      price: 2290,
      qtyPlastic: 4,
      options: [
        {
          id: "A",
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
          price: 0,
        },
        {
          id: "B",
          name: {
            nl: "foe yong hai kip",
            en: "egg foo young chicken",
            de: "egg foo young Huhn",
            zh: "夫下",
          },
          description: {
            nl: "omelet met kipfilet in zoete tomatensaus",
            en: "omelet with chicken in a sweet tomato sauce",
            de: "Omelett mit Hähnchen in einer süßen Tomatensoße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "VB",
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
          price: 0,
        },
        {
          id: "C",
          name: {
            nl: "tjap tjoy kip",
            en: "tjap tjoy chicken",
            de: "tjap tjoy chicken",
            zh: "什菜",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Hähnchen",
            zh: "",
          },
          price: 0,
        },
        {
          id: "VC",
          name: {
            nl: "tjap tjoy vegetarisch",
            en: "tjap tjoy vegetarian",
            de: "tjap tjoy vegetarisch",
            zh: "素什菜",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch",
            zh: "",
          },
          price: 0,
        },
        {
          id: "D",
          name: {
            nl: "kip kerry",
            en: "chicken curry",
            de: "chicken curry",
            zh: "加里鸡",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in kerrie saus",
            en: "stir fried chicken with vegetables in curry sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in Curry Soße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "E",
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
            zh: "古老鸡",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "F",
          name: {
            nl: "sate ajam",
            en: "sate ajam",
            de: "sate ajam",
            zh: "地鸡",
          },
          description: {
            nl: "3 stokjes kipsate in satesaus",
            en: "3 chicken satay in peanut sauce",
            de: "3 Hähnchenspieß mit Erdnusssoße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "G",
          name: {
            nl: "mini loempias",
            en: "mini rolls",
            de: "Minifrühlingsrollen",
            zh: "小卷",
          },
          description: {
            nl: "6 stuks vegetarische mini loempias",
            en: "6 vegetarian mini rolls",
            de: "6 vegetarische Minifrühlingsrollen",
            zh: "",
          },
          price: 0,
        },
        {
          id: "I",
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
          price: 200,
        },
      ],
      totalOptions: 3,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "98",
      name: {
        nl: "menus voor twee",
        en: "menu's for two",
        de: "Menüs für zwei",
        zh: "全",
      },
      description: {
        nl: "voor ongeveer twee personen",
        en: "for around two people",
        de: "für ca. zwei Personen",
        zh: "",
      },
      price: 2290,
      qtyPlastic: 4,
      optionIsMain: true,
      options: [
        {
          id: "98A",
          name: {
            nl: "menu A",
            en: "menu A",
            de: "menü A",
            zh: "全A",
          },
          description: {
            nl: "babi pangang, kip kerry, 6 stuks mini loempias en 2 stokjes kipsate",
            en: "babi pangang, chicken curry, 6 mini rolls and 2 chicken satay",
            de: "babi pangang, Hühnerfleisch Curry, 6 Minifrühlingsrollen und 2 Hühnerspieße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "98B",
          name: {
            nl: "menu B",
            en: "menu B",
            de: "menü B",
            zh: "全B",
          },
          description: {
            nl: "babi pangang, go bo ky, kou lou kai en 6 stuks gebakken bananen",
            en: "babi pangang, go bo ky, kou lou kai and 6 pieces fried bananas",
            de: "babi pangang, go bo ky, kou lou kai und 6 Stück fritierte Bananen",
            zh: "",
          },
          price: 0,
        },
        {
          id: "98C",
          name: {
            nl: "menu C",
            en: "menu C",
            de: "menü C",
            zh: "全C",
          },
          description: {
            nl: "babi pangang, Indische rundvlees, 6 stuks pangsit goreng en 2 stokjes kipsate",
            en: "babi pangang, spicy beef, 6 pieces of fried won ton and 2 chicken satay",
            de: "babi pangang, scharfer Rindfleisch, 6 Stück fritierte Wantan und 2 Hühnerspieße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "98D",
          name: {
            nl: "menu D",
            en: "menu D",
            de: "menü D",
            zh: "全D",
          },
          description: {
            nl: "babi pangang, tjap tjoy, kou lou kai en 2 stokjes kipsate",
            en: "babi pangang, tjap tjoy, kou lou kai and 2 chicken satay",
            de: "babi pangang, tjap tjoy, kou lou kai und 2 Hühnerspieße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "98E",
          name: {
            nl: "menu E",
            en: "menu E",
            de: "menü E",
            zh: "全E",
          },
          description: {
            nl: "babi pangang, foe yong hai, kou lou kai en 2 stokjes kipsate",
            en: "babi pangang, egg foo young, kou lou kai and 2 chicken satay",
            de: "babi pangang, egg foo young, kou lou kai und 2 Hühnerspieße",
            zh: "",
          },
          price: 0,
        },
      ],
      totalOptions: 1,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "99",
      name: {
        nl: "sam fook",
        en: "sam fook",
        de: "sam fook",
        zh: "三福",
      },
      description: {
        nl: "voor ongeveer 4 personen",
        en: "for around 4 people",
        de: "für ca. 4 Personen",
        zh: "",
      },
      price: 3890,
      qtyPlastic: 5,
      options: [
        {
          id: "A",
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
          price: 0,
        },
        {
          id: "B",
          name: {
            nl: "foe yong hai kip",
            en: "egg foo young chicken",
            de: "egg foo young Huhn",
            zh: "夫下",
          },
          description: {
            nl: "omelet met kipfilet in zoete tomatensaus",
            en: "omelet with chicken in a sweet tomato sauce",
            de: "Omelett mit Hähnchen in einer süßen Tomatensoße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "VB",
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
          price: 0,
        },
        {
          id: "C",
          name: {
            nl: "tjap tjoy kip",
            en: "tjap tjoy chicken",
            de: "tjap tjoy chicken",
            zh: "什菜",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch mit Hähnchen",
            zh: "",
          },
          price: 0,
        },
        {
          id: "VC",
          name: {
            nl: "tjap tjoy vegetarisch",
            en: "tjap tjoy vegetarian",
            de: "tjap tjoy vegetarisch",
            zh: "素什菜",
          },
          description: {
            nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei",
            en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek",
            de: "Gebratene Sojasprossen, Paprika, Zwiebeln, Champignons, Bambussprossen und Lauch",
            zh: "",
          },
          price: 0,
        },
        {
          id: "D",
          name: {
            nl: "kip kerry",
            en: "chicken curry",
            de: "chicken curry",
            zh: "加里鸡",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in kerrie saus",
            en: "stir fried chicken with vegetables in curry sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in Curry Soße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "E",
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
            zh: "古老鸡",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "F",
          name: {
            nl: "sate ajam",
            en: "sate ajam",
            de: "sate ajam",
            zh: "地鸡",
          },
          description: {
            nl: "6 stokjes kipsate in satesaus",
            en: "6 chicken satay in peanut sauce",
            de: "6 Hähnchenspieße in Erdnusssoße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "G",
          name: {
            nl: "pikante kip",
            en: "spicy chicken",
            de: "Hähnchen scharf",
            zh: "辣鸡",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in een licht pikante saus",
            en: "stir fried chicken with vegetables in a mild spicy sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in leicht scharfer Soße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "H",
          name: {
            nl: "sweet honey",
            en: "sweet honey",
            de: "sweet honey",
            zh: "姜鸡",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in zoete gembersaus",
            en: "stir fried chicken with vegetablaes in a sweet ginger sauce",
            de: "gebratener Hühnerfleisch mit Gemüse in einer süßen Ingwer Soße",
            zh: "",
          },
          price: 0,
        },
        {
          id: "I",
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
          price: 0,
        },
        {
          id: "J",
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
          price: 0,
        },
        {
          id: "K",
          name: {
            nl: "tau sie ky",
            en: "tau sie ky",
            de: "tau sie ky",
            zh: "黑豆鸡",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in zwarte bonensaus",
            en: "stir fried chicken with vegetables in a black bean sauce",
            de: "gebratenes Hühnerfleisch mit Gemüse in einer Soße aus schwarze Bohnen",
            zh: "",
          },
          price: 0,
        },
        {
          id: "L",
          name: {
            nl: "tau sie yuk",
            en: "tau sie yuk",
            de: "tau sie yuk",
            zh: "黑豆肉",
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
            zh: "叉烧",
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
            zh: "广东叉烧",
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
            zh: "菠萝牛",
          },
          description: {
            nl: "roergebakken biefstukjes met ananas in zoetzure saus",
            en: "stir fried beef with pineapples in a sweet and sour sauce",
            de: "gebratener Rindfleisch mit Ananas in süß saurer Soße",
            zh: "",
          },
          price: 0,
        },
      ],
      totalOptions: 3,
      sides: sidesOptions,
      totalSides: 2,
      btw: btw.laag,
    },
    maandmenu,
    {
      id: "101",
      name: {
        nl: "Indische rijsttafel",
        en: "Indonesian menu",
        de: "Indonesischer Menü",
        zh: "马全",
      },
      description: {
        nl: "voor ongeveer 4 personen",
        en: "for around 4 people",
        de: "für ca. 4 Personen",
        zh: "",
      },
      menuList: [
        {
          name: {
            nl: "2 stokjes kipsaté",
            en: "2 chicken satay",
            de: "2 Hähnchenspieß",
            zh: "",
          },
        },
        {
          name: {
            nl: "2 gebakken bananen",
            en: "2 fried bananas",
            de: "2 fritierte Bananen",
            zh: "",
          },
        },
        {
          name: {
            nl: "Indische groenten",
            en: "Indonesian vegetables",
            de: "Indonesischer Gemüse",
            zh: "",
          },
        },
        {
          name: {
            nl: "ajam pangang",
            en: "ajam pangang",
            de: "ajam pangang",
            zh: "",
          },
          description: {
            nl: "kipreepjes in licht pikante tomatensaus",
            en: "chicken strips in a mild spicy tomoato sauce",
            de: "Hühnerstreifen in leicht scharfer Tomatensoße",
            zh: "",
          },
        },
        {
          name: {
            nl: "daging roedjak",
            en: "daging roedjak",
            de: "daging roedjak",
            zh: "",
          },
          description: {
            nl: "gestoofd rundvlees in pittige gekruide saus",
            en: "stewed beef in a spicy sauce",
            de: "geschmortes Rindfleisch in scharfer Soße",
            zh: "",
          },
        },
        {
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
            zh: "",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
            zh: "",
          },
        },
        {
          name: {
            nl: "gado gado",
            en: "gado gado",
            de: "gado gado",
            zh: "",
          },
          description: {
            nl: "vegetarische Indische salade met taugé, komkommer, winterpeen en een spiegelei in satesaus",
            en: "Indonesian salad with beansprout, cucumber, carrot and a fried egg in peanut sauce",
            de: "Indonesischer Salat mit Sojasprossen, Gurken, Karotten und ein Spiegelei in Erdnusssoße",
            zh: "",
          },
        },
      ],
      price: 4490,
      dineInPrice: 2670,
      qtyPlastic: 7,
      sides: sidesOptions,
      totalSides: 2,
      btw: btw.laag,
    },
    {
      id: "102",
      name: {
        nl: "Chinese rijsttafel",
        en: "Chinese menu",
        de: "Chinesischer Menü",
        zh: "中全",
      },
      description: {
        nl: "voor ongeveer 4 á 5 personen",
        en: "for around 4 to 5 people",
        de: "für ca. 4 order 5 Personen",
        zh: "",
      },
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
            nl: "2 stokjes kipsaté",
            en: "2 chicken satay",
            de: "2 Hähnchenspieß",
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
            nl: "tippan kipfilet",
            en: "tippan chicken",
            de: "Tippan Hühnerfleisch",
            zh: "",
          },
          description: {
            nl: "roergebakken kipfilet met groenten in zwarte bonen saus",
            en: "stir fried chicken with vegetables in black bean sauce",
            de: "gebratenes Hühnerfleisch mit Gemüse in schwarze Bohnen Soße",
            zh: "",
          },
        },
        {
          name: {
            nl: "foe yong hai kip",
            en: "egg foo young chicken",
            de: "egg foo young Huhn",
            zh: "",
          },
          description: {
            nl: "omelet met kipfilet in zoete tomatensaus",
            en: "omelet with chicken in a sweet tomato sauce",
            de: "Omelett mit Hähnchen in einer süßen Tomatensoße",
            zh: "",
          },
        },
        {
          name: {
            nl: "kou lou kai",
            en: "kou lou kai",
            de: "kou lou kai",
            zh: "",
          },
          description: {
            nl: "gepaneerde kipballetjes met zoetzure saus",
            en: "deep fried chicken in dough with a sweet & sour sauce",
            de: "Fritierte Hühnerfleisch in einem Teig mit süß sauerer Soße",
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
      price: 4890,
      dineInPrice: 2830,
      qtyPlastic: 6,
      sides: sidesOptions,
      totalSides: 2,
      btw: btw.laag,
    },
    {
      id: "103",
      name: {
        nl: "Chinese rijsttafel new Hong Kong",
        en: "New Hong Kong menu",
        de: "New Hong Kong Menü",
        zh: "石全",
      },
      description: {
        nl: "voor ongeveer 4 á 5 personen",
        en: "for around 4 to 5 people",
        de: "für ca. 4 order 5 Personen",
        zh: "",
      },
      menuList: [
        {
          name: {
            nl: "sun la tong",
            en: "sun la tong",
            de: "sun la tong",
            zh: "",
          },
          description: {
            nl: "pikante soep gemaakt van donkere sojasaus met kipstukjes, garnalen, tofu en lente-uitjes",
            en: "spicy soup made from soy sauce with chicken, shrimp, tofu and spring onion",
            de: "würzige Suppe aus Sojasauce mit Hähnchen, Garnelen, Tofu und Frühlingszwiebeln",
            zh: "",
          },
        },
        {
          name: {
            nl: "2 sates van ossenhaas & garnalen",
            en: "2 satay of beef & shrimp",
            de: "2 Satay vom Rind und Schrimps",
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
            nl: "roergebakken ossenhaas met groenten in oestersaus",
            en: "stir fried beef tenderloin with vegetables in a oyster sauce",
            de: "gebratener Rinderfilet mit Gemüse in Austernsoße",
            zh: "",
          },
        },
        {
          name: {
            nl: "Peking eend",
            en: "Peking duck",
            de: "Peking Ente",
            zh: "",
          },
          description: {
            nl: "geroosterd eend, saus apart",
            en: "roasted duck, sauce comes separate",
            de: "geröstete Ente, Soße separat serviert",
            zh: "",
          },
        },
        {
          name: {
            nl: "gepaneerde kip",
            en: "sweet chicken",
            de: "sweet chicken",
            zh: "",
          },
          description: {
            nl: "gepaneerde kipfilet roergebakken met groenten in zoetzure saus",
            en: "deep fried breaded chicken stir fried with vegetables in a sweet sauce",
            de: "paniertes Hühnerfleisch gebraten mit Gemüse in einer süßen Soße",
            zh: "",
          },
        },
      ],
      price: 6150,
      dineInPrice: 3620,
      qtyPlastic: 8,
      sides: sidesOptions,
      totalSides: 2,
      btw: btw.laag,
    },
    // christmasA,
    // christmasB,
  ],
};
