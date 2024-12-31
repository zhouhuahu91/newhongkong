import sidesOptions from "../options/sidesOptions";
import btw from "../options/btw";

export default {
  category: {
    nl: "specialiteiten uit Mongolië",
    en: "Mongolian specialties",
    de: "Mongolische Spezialitäten",
    zh: "",
  },
  id: 5,
  items: [
    {
      id: "32",
      name: {
        nl: "tjong sik ngaw law",
        en: "tjong sik ngaw law",
        de: "tjong sik ngaw law",
        zh: "中式牛排",
      },
      description: {
        nl: "roergebakken ossenhaas met groenten in een zoetzure saus",
        en: "stir fried beef tenderloin with vegetables in a sweet & sour sauce",
        de: "gebratenes Rinderfilet mit Gemüse in einer süß sauren Soße",
        zh: "",
      },
      price: 2190,
      dineInPrice: 2640,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
    {
      id: "33",
      name: {
        nl: "tjong sik tjun paa",
        en: "tjong sik tjun paa",
        de: "tjong sik tjun paa",
        zh: "中式肉排",
      },
      description: {
        nl: "roergebakken varkenskarbonade met groenten in een zoetzure saus",
        en: "stir fried pork chop with vegetables in a sweet and sour sauce",
        de: "gebratenes Schweinekotelett mit Gemüse in einer süß sauren Soße",
        zh: "",
      },
      price: 2070,
      dineInPrice: 2640,
      qtyPlastic: 2,
      sides: sidesOptions,
      btw: btw.laag,
    },
  ],
};
