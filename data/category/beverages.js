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
        zh: "-",
      },
      description: {
        nl: "alle niet alcoholhoudende firsdranken",
        en: "alle niet alcoholhoudende firsdranken",
        de: "alle niet alcoholhoudende firsdranken",
        zh: "alle niet alcoholhoudende firsdranken",
      },
      price: 350,
      btw: btw.laag,
    },
    {
      id: "105",
      name: {
        nl: "bier",
        en: "bier",
        de: "bier",
        zh: "-",
      },
      description: {
        nl: "fluitje, voor groot bier 2x bier aanslaan",
        en: "fluitje, voor groot bier 2x bier aanslaan",
        de: "fluitje, voor groot bier 2x bier aanslaan",
        zh: "fluitje, voor groot bier 2x bier aanslaan",
      },
      price: 350,
      btw: btw.hoog,
    },
    {
      id: "106",
      name: {
        nl: "wijn",
        en: "wijn",
        de: "wijn",
        zh: "-",
      },
      description: {
        nl: "alle wijn soorten.",
        en: "alle wijn soorten.",
        de: "alle wijn soorten.",
        zh: "alle wijn soorten.",
      },
      price: 510,
      btw: btw.hoog,
    },
  ],
};
