//React imports
import { useState, useEffect } from "react";
//Firebase imports
import { db } from "@/firebase/firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

const Menu = () => {
  const [data, setData] = useState([]);

  // Subscribe to menus on firestore
  useEffect(() => {
    const q = query(collection(db, "menu"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const menus = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(menus);
      console.log(menus);
    });
    return () => unsubscribe();
  }, []);

  return <div>menu</div>;
};

export default Menu;
