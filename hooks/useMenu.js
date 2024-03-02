// React imports
import { useState, useEffect, useContext, createContext, useRef } from "react";
//Firebase imports
import { db } from "@/firebase/firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
//Hook imports
import useI18n from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
//data for menu
import { data as menuData, version } from "@/data/data";

// First we create the context
const menuContext = createContext();

// We export this context so we can use it in other components.
export const useMenu = () => {
  return useContext(menuContext);
};

// This hook provides the menu for the store. As in the products that they sell.
const useMenuProvider = () => {
  // We start with menuData we have from the files
  const [data, setData] = useState(menuData);
  // This is the data that we use in the components it filters when filterData is called.
  const [filteredData, setFilteredData] = useState(menuData);
  // We need searchInput in different components.
  // Thats why I moved it in the context.
  const [searchInput, setSearchInput] = useState("");
  // Ref for the search input
  const searchInputRef = useRef();
  const [favoritesID, setFavoritesID] = useState([]);
  const [favoriteMenuItems, setFavoriteMenuItems] = useState([]);
  // these are the id's of dishes that are popular
  const popularID = [
    "8",
    "10",
    "11",
    "12",
    "14",
    "16",
    "43",
    "49",
    "58",
    "60",
    "64",
    "67",
  ];

  const getPopularItems = () => {
    const tempArray = [];
    data.forEach((category) => {
      // Of every category we loop the items
      category.items.forEach((item) => {
        // If the item id is in the favorites array we push the item in the...
        // temparory array.
        if (popularID.includes(item.id)) tempArray.push(item);
      });
    });
    return tempArray;
  };

  // Get's the popular items.
  const popularMenuItems = getPopularItems();

  const { locale } = useI18n();
  const { user } = useAuth();

  // ********* FUNCTIONs FOR ADDING AND REMOVING FAVORITES **********

  useEffect(() => {
    // If there is a user we set the favorites to the users favorites.
    if (user && user.favorites) {
      return setFavoritesID(user.favorites);
    }
    // If there is no user we check if there are favorites saved to the local storage.
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    // If there are we set the favorites to the saved ones in the local storage.
    if (savedFavorites) {
      setFavoritesID(savedFavorites);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, setFavoritesID]); // If the user updates we rerun the effect.

  useEffect(() => {
    // Temporary array we have for the favorite items
    const tempFavoritesArray = [];
    // We loop the state for every category.
    data.forEach((category) => {
      // Of every category we loop the items
      category.items.forEach((item) => {
        // If the item id is in the favorites array we push the item in the...
        // temparory array.
        if (favoritesID.includes(item.id)) tempFavoritesArray.push(item);
      });
    });
    // We set the faovirte items to the state.
    setFavoriteMenuItems(tempFavoritesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoritesID, data]);

  const toggleFavorite = (id) => {
    // We check if the id is already in the favorites array.
    if (favoritesID.includes(id)) {
      // If it is, we remove it.
      return setFavoritesID((prev) => {
        const x = prev.filter((x) => x !== id);

        // If there is a user we save it to the database.
        if (user) {
          const ref = doc(db, `users/${user.uid}`);
          updateDoc(ref, {
            favorites: x,
          });
        } else {
          // Else we save it to the local storage.
          localStorage.setItem("favorites", JSON.stringify(x));
        }

        return x;
      });
    }

    // If the favorite doesn't exist.
    setFavoritesID((prev) => {
      const x = [...prev, id];
      // We sort the array from the lowest id to the highest.
      const y = x.sort((a, b) => a - b);
      // If there is a user we save the favorites to users account.
      if (user) {
        const ref = doc(db, `users/${user.uid}`);
        updateDoc(ref, {
          favorites: y,
        });
      } else {
        // Else we save it to the local storage.
        localStorage.setItem("favorites", JSON.stringify(y));
      }
      return y;
    });
  };

  // ********* END FUNCTIONS FOR ADDING AND REMOVING FAVORITES **********

  // ********* FUNCTION FOR SEARCH AND FILTER *********

  // Simple function that check if the data is string.
  // Makes it lowercase.
  // And removes whitespaces.
  const sanitize = (string) => {
    if (typeof string !== "string") return string;
    return string.toLowerCase().replace(/\s/g, "");
  };

  // When function gets called we filter the data with matching the input
  const filterData = () => {
    const sanitizedInput = sanitize(searchInput);
    // This is the temporary array that we use to filter the data.
    const tempMenu = [];

    // We filter over the raw data and check every category and the items in that category.
    data.forEach((array) => {
      // We skip if the array is onlyAdmin and user is not admin
      if (!user?.admin && array.adminOnly) return;

      const { items, category } = array;
      // If the category matches with the input we push the whole array.
      if (sanitize(category[locale]?.includes(sanitizedInput))) {
        return tempMenu.push(array);
      }

      // If the category name doesn't match we check the ndividual items in the...
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

  useEffect(() => {
    // If there is a search input we filter the data. If there is not we reset the filter.
    if (searchInput.length > 0) {
      filterData();
    } else {
      resetFilter();
    }
  }, [searchInput]);

  // ******** END FUNCTION FOR SEARCH AND FILTER *********

  // Subscribe to menus on firestore
  useEffect(() => {
    const q = query(collection(db, "menu"), orderBy("id", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const menus = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      const filteredMenu = menus.filter((x) => x.id !== "config");
      const [config] = menus.filter((x) => x.id === "config");
      if (config.version !== version) {
        console.log(`Updating from ${version} to ${config.version}`);
        setData(filteredMenu);
        setFilteredData(filteredMenu);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    data,
    filteredData,
    filterData,
    resetFilter,
    searchInput,
    setSearchInput,
    searchInputRef,
    favoritesID,
    favoriteMenuItems,
    toggleFavorite,
    popularMenuItems,
  };
};

// We create the provider that we can rap our components.
export const MenuProvider = ({ children }) => {
  const value = useMenuProvider();
  return <menuContext.Provider value={value}>{children}</menuContext.Provider>;
};
