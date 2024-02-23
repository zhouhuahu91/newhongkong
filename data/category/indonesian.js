import sidesOptions from "../options/sidesOptions";
import btw from "../options/btw";

export default {
  category: {
    nl: "Indische gerechten",
    en: "Indonesian dishes",
    de: "Indonesische Gerichte",
    zh: "",
  },
  id: 13,
  items: [
    {
      id: "82",
      name: {
        nl: "nasi of bami rames gewoon",
        en: "fried rice or noodles rames",
        de: "gebratener Reis oder Nudeln rames",
        zh: "马饭面",
      },
      description: {
        nl: "met Indische rundvlees & groenten",
        en: "comes with spicy beef and vegetables",
        de: "serviert mit scharfer Rindfleisch und Gemüse",
        zh: "",
      },
      price: 1200,
      dineInPrice: 1550,
      qtyPlastic: 2,
      options: [
        {
          id: "82N",
          name: {
            nl: "nasi rames gewoon",
            en: "fried rice rames",
            de: "gebratener Reis rames",
            zh: "马饭",
          },
          price: 0,
        },
        {
          id: "82B",
          name: {
            nl: "bami rames gewoon",
            en: "noodles rames",
            de: "Nudeln rames",
            zh: "马面",
          },
          price: 0,
        },
      ],
      optionIsMain: true,
      btw: btw.laag,
    },
    {
      id: "83",
      name: {
        nl: "nasi of bami rames speciaal",
        en: "fried rice or noodles rames special",
        de: "gebratener Reis oder Nudeln rames spezial",
        zh: "大马饭面",
      },
      description: {
        nl: "met een stokje kipsate, kippebout in licht pikante tomatensaus en Indische rundvlees & groenten",
        en: "comes with a chicken satay, chicken drumstick in a mild spicy sauce, spicy beef and vegetables",
        de: "serviert mit einem Hühnerspieß, Hähnchenschenkel in leicht scharfer Soße sowie scharfer Rindfleisch und Gemüse",
        zh: "",
      },
      price: 1620,
      dineInPrice: 1950,
      qtyPlastic: 3,
      options: [
        {
          id: "83N",
          name: {
            nl: "nasi rames speciaal",
            en: "fried rice rames special",
            de: "gebratener Reis rames spezial",
            zh: "大马饭",
          },
          price: 0,
        },
        {
          id: "83B",
          name: {
            nl: "bami rames speciaal",
            en: "noodles rames special",
            de: "Nudeln rames spezial",
            zh: "大马面",
          },
          price: 0,
        },
      ],
      optionIsMain: true,
      btw: btw.laag,
    },
    {
      id: "84",
      name: {
        nl: "gado gado",
        en: "gado gado",
        de: "gado gado",
        zh: "加多",
      },
      description: {
        nl: "vegetarische Indische salade met taugé, komkommer, winterpeen en een spiegelei in satesaus",
        en: "Indonesian salad with beansprout, cucumber, carrot and a fried egg in peanut sauce",
        de: "Indonesischer Salat mit Sojasprossen, Gurken, Karotten und ein Spiegelei in Erdnusssoße",
        zh: "",
      },
      price: 1270,
      dineInPrice: 1520,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "85",
      name: {
        nl: "daging roedjak",
        en: "daging roedjak",
        de: "daging roedjak",
        zh: "马辣肉",
      },
      description: {
        nl: "gestoofd rundvlees in pittige gekruide saus",
        en: "stewed beef in a spicy sauce",
        de: "geschmortes Rindfleisch in scharfer Soße",
        zh: "",
      },
      price: 1710,
      dineInPrice: 2080,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "86",
      name: {
        nl: "ajam smoor",
        en: "ajam smoor",
        de: "ajam smoor",
        zh: "急鸡",
      },
      description: {
        nl: "roergebakken kipfilet met groenten in ketjapsaus",
        en: "stir fried chicken with vegetables in a sweet soy sauce",
        de: "gebratenes Hühnerfleisch mit Gemüse in süßer Sojasoße",
        zh: "",
      },
      price: 1440,
      dineInPrice: 1730,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "87",
      name: {
        nl: "ajam pangang",
        en: "ajam pangang",
        de: "ajam pangang",
        zh: "火鸡",
      },
      description: {
        nl: "kipreepjes in licht pikante tomatensaus",
        en: "chicken strips in a mild spicy tomoato sauce",
        de: "Hühnerstreifen in leicht scharfer Tomatensoße",
        zh: "",
      },
      price: 1770,
      dineInPrice: 2120,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
  ],
};
