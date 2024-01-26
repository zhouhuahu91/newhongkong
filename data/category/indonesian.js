import sidesOptions from "../options/sidesOptions";

export default {
  category: {
    nl: "Indische gerechten",
    en: "Indonesian dishes",
    de: "Indonesische Gerichte",
  },
  id: 13,
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
      price: 1200,
      qtyPlastic: 2,
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
      price: 1620,
      qtyPlastic: 3,
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
      price: 1270,
      qtyPlastic: 2,
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
      price: 1710,
      qtyPlastic: 2,
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
      price: 1440,
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
      price: 1770,
      qtyPlastic: 2,
      sides: sidesOptions,
    },
  ],
};
