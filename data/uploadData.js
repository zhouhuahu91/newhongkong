import { db } from "../firebase/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

// all category imports
import menus from "./category/menus.js";
import soups from "./category/soups.js";
import sides from "./category/sides.js";
import peking from "./category/peking.js";
import canton from "./category/canton.js";
import mongolian from "./category/mongolian";
import sieSheun from "./category/sieSheun";
import egg from "./category/egg.js";
import vegetable from "./category/vegetable.js";
import chicken from "./category/chicken.js";
import pork from "./category/pork.js";
import riceOrNoodles from "./category/riceOrNoodles.js";
import riceNoodlesOrChowMein from "./category/riceNoodlesOrChowMein.js";
import indonesian from "./category/indonesian.js";
import tippan from "./category/tippan.js";

const uploadData = async () => {
  const menu = [
    menus,
    soups,
    sides,
    canton,
    peking,
    mongolian,
    sieSheun,
    egg,
    vegetable,
    chicken,
    pork,
    riceOrNoodles,
    riceNoodlesOrChowMein,
    indonesian,
    tippan,
  ];
  // upload the whole menu
  menu.forEach((category) => {
    setDoc(doc(db, "menu", category.category["en"]), {
      ...category,
      createdAt: Timestamp.now(),
    });
  });
};

export default uploadData;
