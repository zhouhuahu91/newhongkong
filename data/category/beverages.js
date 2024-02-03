import btw from "../options/btw";

export default {
  category: {
    nl: "dranken",
    en: "beverages",
    de: "Getranke",
    zh: "",
  },
  id: 15,
  adminOnly: true,
  items: [
    {
      id: "104",
      name: {
        nl: "fris",
        en: "fris",
        de: "fris",
        zh: "",
      },
      description: {
        nl: "",
        en: "",
        de: "",
        zh: "",
      },
      price: 320,
      btw: btw.laag,
    },
    {
      id: "105",
      name: {
        nl: "bier",
        en: "bier",
        de: "bier",
        zh: "",
      },
      description: {
        nl: "",
        en: "",
        de: "",
        zh: "",
      },
      price: 320,
      btw: btw.hoog,
    },
    {
      id: "106",
      name: {
        nl: "wijn",
        en: "wijn",
        de: "wijn",
        zh: "",
      },
      description: {
        nl: "",
        en: "",
        de: "",
        zh: "",
      },
      price: 460,
      btw: btw.hoog,
    },
  ],
};
