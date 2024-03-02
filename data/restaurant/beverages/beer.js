import btw from "../../options/btw";

export default {
  name: "bier",
  id: "11000",
  items: [
    {
      id: "11001",
      name: "heineken fluitje",
      price: 320,
      btw: btw.hoog,
    },
    {
      id: "11002",
      name: "heineken pull",
      price: 640,
      btw: btw.hoog,
    },
    {
      id: "11003",
      name: "heineken fles",
      price: 350,
      btw: btw.hoog,
    },
    {
      id: "11004",
      name: "heineken fles 0.0",
      price: 350,
      btw: btw.hoog,
    },
    {
      id: "11005",
      name: "amstel radler 0.0",
      price: 350,
      btw: btw.hoog,
    },
  ],
};
