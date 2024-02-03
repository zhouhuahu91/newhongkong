import btw from "../options/btw";

export default {
  category: {
    nl: "kleine gerechten",
    en: "small dishes",
    de: "kleine gerichten",
    zh: "",
  },
  id: 16,
  adminOnly: true,
  items: [
    {
      id: "1500",
      name: {
        nl: "Casava klein",
        en: "",
        de: "",
        zh: "Casava klein",
      },
      description: {
        nl: "kleine stukjes pittige kroepoek",
        en: "",
        de: "",
        zh: "",
      },
      price: 100,
      qtyPlastic: 0,
      btw: btw.laag,
    },
    {
      id: "1600",
      name: {
        nl: "1 stokje ajam",
        en: "",
        de: "",
        zh: "(1地鸡)",
      },
      description: {
        nl: "kipsaté",
        en: "",
        de: "",
        zh: "",
      },
      price: 240,
      qtyPlastic: 1,
      btw: btw.laag,
    },
    {
      id: "1800",
      name: {
        nl: "kleine witte rijst",
        en: "",
        de: "",
        zh: "小白饭",
      },
      description: {
        nl: "klein bakje witte rijst",
        en: "",
        de: "",
        zh: "",
      },
      price: 320,
      qtyPlastic: 1,
      btw: btw.laag,
    },
  ],
};
