import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { data, version } from "./data";

const uploadData = async () => {
  setDoc(doc(db, "menu", "version"), {
    version: version,
    id: "version",
  });
  // upload the whole menu
  data.forEach((category, index) => {
    setDoc(doc(db, "menu", category.category["en"]), {
      ...category,
      id: index,
    });
  });
};

export default uploadData;
