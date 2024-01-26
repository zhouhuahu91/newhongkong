import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { data, version } from "./data";

const uploadData = async () => {
  setDoc(doc(db, "menu", "config"), {
    version: version,
    id: "config",
  });
  // upload the whole menu
  data.forEach((category, index) => {
    setDoc(doc(db, "menu", category.category["en"]), {
      ...category,
    });
  });
};

export default uploadData;
