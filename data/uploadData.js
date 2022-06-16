import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import data from "./data";

const uploadData = async () => {
  // upload the whole menu
  data.forEach((category, index) => {
    setDoc(doc(db, "menu", category.category["en"]), {
      ...category,
      id: index,
    });
  });
};

export default uploadData;
