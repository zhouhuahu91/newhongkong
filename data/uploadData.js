import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

// all category imports
import menus from "./category/menus";
import soups from "./category/soups";
import sides from "./category/sides";
import peking from "./category/peking";
import canton from "./category/canton";
import mongolian from "./category/mongolian";
import sieSheun from "./category/sieSheun";
import egg from "./category/egg";
import vegetable from "./category/vegetable";
import chicken from "./category/chicken";
import pork from "./category/pork";
import riceOrNoodles from "./category/riceOrNoodles";
import riceNoodlesOrChowMein from "./category/riceNoodlesOrChowMein";
import indonesian from "./category/indonesian";
import tippan from "./category/tippan";

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
  menu.forEach((category, index) => {
    setDoc(doc(db, "menu", category.category["en"]), {
      ...category,
      id: index,
    });
  });
};

export default uploadData;
