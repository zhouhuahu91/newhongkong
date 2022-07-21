// react imports
import { useState, useEffect } from "react";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
import { useMenu } from "@/hooks/useMenu";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteMenuItems, setFavoriteMenuItems] = useState([]);

  const { user } = useAuth();
  const { data } = useMenu();

  useEffect(() => {
    // If there is a user we set the favorites to the users favorites.
    if (user && user.favorites) {
      return setFavorites(user.favorites);
    }
    // If there is no user we check if there are favorites saved to the local storage.
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    // If there are we set the favorites to the saved ones in the local storage.
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // If the user updates we rerun the effect.

  useEffect(() => {
    // Temporary array we have for the favorite items
    const tempFavoritesArray = [];
    // We loop the state for every category.
    data.forEach((category) => {
      // Of every category we loop the items
      category.items.forEach((item) => {
        // If the item id is in the favorites array we push the item in the...
        // temparory array.
        if (favorites.includes(item.id)) tempFavoritesArray.push(item);
      });
    });
    // We set the faovirte items to the state.
    setFavoriteMenuItems(tempFavoritesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const toggleFavorite = (id) => {
    // We check if the id is already in the favorites array.
    if (favorites.includes(id)) {
      // If it is, we remove it.
      return setFavorites((prev) => {
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
    setFavorites((prev) => {
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

  return { favorites, toggleFavorite, favoriteMenuItems };
};

export default useFavorites;
