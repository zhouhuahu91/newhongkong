// React imports
import { useState, useEffect, useContext, createContext } from "react";
//Firebase imports
import { db } from "@/firebase/firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

// First we create the context
const menuContext = createContext();

// We export this context so we can use it in other components.
export const useMenu = () => {
  return useContext(menuContext);
};

// This hook provides the menu for the store. As in the products that they sell.
const useMenuProvider = () => {
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
    });
    return () => unsubscribe();
  }, []);

  return { data };
};

// We create the provider that we can rap our components.
export const MenuProvider = ({ children }) => {
  const value = useMenuProvider();
  return <menuContext.Provider value={value}>{children}</menuContext.Provider>;
};
