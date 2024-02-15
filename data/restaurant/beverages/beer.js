import btw from "../../options/btw";

export default {
  name: "bier",
  id: "1100",
  items: [
    {
      id: "1101",
      name: "heineken fluitje",
      price: 320,
      btw: btw.hoog,
    },
    {
      id: "1102",
      name: "heineken pull",
      price: 640,
      btw: btw.hoog,
    },
    {
      id: "1103",
      name: "heineken fles",
      price: 350,
      btw: btw.hoog,
    },
    {
      id: "1104",
      name: "heineken fles 0.0",
      price: 350,
      btw: btw.hoog,
    },
    {
      id: "1105",
      name: "amstel radler 0.0",
      price: 350,
      btw: btw.hoog,
    },
  ],
};
