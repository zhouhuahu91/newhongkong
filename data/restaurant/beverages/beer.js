import btw from "../../options/btw";

export default {
  name: "bier",
  items: [
    {
      id: "1100",
      name: "heineken fluitje",
      price: 320,
      btw: btw.hoog,
    },
    {
      id: "1101",
      name: "heineken pull",
      price: 640,
      btw: btw.hoog,
    },
    {
      id: "1102",
      name: "heineken fles",
      price: 350,
      btw: btw.hoog,
    },
    {
      id: "1103",
      name: "heineken fles 0.0",
      price: 350,
      btw: btw.hoog,
    },
    {
      id: "1104",
      name: "amstel radler 0.0",
      price: 350,
      btw: btw.hoog,
    },
  ],
};
