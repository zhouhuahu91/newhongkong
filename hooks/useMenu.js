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
  // This is the raw data that we get back from firebase.
  const [data, setData] = useState([]);
  // This is the data that we use in the components it filters when filterData is called.
  const [filteredData, setFilteredData] = useState([]);

  const { locale } = useI18n();

  // Simple function that check if the data is string.
  // Makes it lowercase.
  // And removes whitespaces.
  const sanitize = (string) => {
    if (typeof string !== "string") return string;
    return string.toLowerCase().replace(/\s/g, "");
  };

  // When function gets called we filter the data with matching the input
  const filterData = (input) => {
    const sanitizedInput = sanitize(input);
    // This is the temporary array that we use to filter the data.
    const tempMenu = [];

    // We filter over the raw data and check every category and the items in that category.
    data.forEach((array) => {
      const { items, category } = array;
      // If the category matches with the input we push the whole array.
      if (sanitize(category[locale]?.includes(sanitizedInput))) {
        return tempMenu.push(array);
      }

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
      if (filteredItem.length) tempMenu.push({ ...array, items: filteredItem });
    });

    setFilteredData(tempMenu);
  };

  // We always reset the filtered data to the raw data.
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
