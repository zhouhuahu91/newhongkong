// React imports
import { useState, useEffect, useContext, createContext } from "react";
//Firebase imports
import { db } from "@/firebase/firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
//Hook imports
import useI18n from "@/hooks/useI18n";

// First we create the context
const menuContext = createContext();

// We export this context so we can use it in other components.
export const useMenu = () => {
  return useContext(menuContext);
};

// This hook provides the menu for the store. As in the products that they sell.
const useMenuProvider = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { locale } = useI18n();

  const sanitize = (string) => {
    if (typeof string !== "string") return string;
    return string.toLowerCase().replace(/\s/g, "");
  };

  const filterData = (input) => {
    const sanitizedInput = sanitize(input);
    const filteredMenu = [];

    data.forEach((array) => {
      const { items, category } = array;
      // If the category matches with the input we push the whole array.
      if (sanitize(category[locale]?.includes(sanitizedInput)))
        return filteredMenu.push(array);

      // If the category name doesn't match we check the individual items in the...
      // category with .filter.
      const filteredItem = items.filter((item) => {
        return (
          sanitize(item.name[locale]).includes(sanitizedInput) ||
          sanitize(item.description[locale]).includes(sanitizedInput) ||
          item.id.includes(sanitizedInput)
        );
      });
      // If there is length to the filteredItems that means that are matches.
      // We push those matches to the filtered menu.
      if (filteredItem.length)
        filteredMenu.push({ ...array, items: filteredItem });
    });

    setFilteredData(filteredMenu);
  };

  const resetFilter = () => {
    setFilteredData(data);
  };

  // Subscribe to menus on firestore
  useEffect(() => {
    const q = query(collection(db, "menu"), orderBy("id", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const menus = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setData(menus);
      setFilteredData(menus);
    });
    return () => unsubscribe();
  }, []);

  return { data, filteredData, filterData, resetFilter };
};

// We create the provider that we can rap our components.
export const MenuProvider = ({ children }) => {
  const value = useMenuProvider();
  return <menuContext.Provider value={value}>{children}</menuContext.Provider>;
};
