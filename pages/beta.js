//React imports
import { useState, useRef, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
import { useAuth } from "@/hooks/useAuth";
// Icon imports
import ChevronRightIcon from "@/icons/ChevronRightIcon";
// Components imports
import Search from "@/components/menu/Search";

// Component imports
import FavoriteIcon from "@/icons/FavoriteIcon";
import Card from "@/components/menu/Card";
import DesktopCart from "@/components/cart/DesktopCart";
import MobileCart from "@/components/cart/MobileCart";
import CategoryHeader from "@/components/menu/CategoryHeader";
import PickUpOrDeliveryModal from "@/components/menu/PickUpOrDeliveryModal";
import Spinner from "@/components/Spinner";
import AdminCart from "@/components/cart/AdminCart";
import SpecialDishModal from "@/components/menu/SpecialDishModal";
import SettingsIcon from "@/icons/SettingsIcon";
import IconBtn from "@/components/IconBtn";
import { motion } from "framer-motion";

// Upload new menu to firestore if needed.
// import uploadData from "../data/uploadData";

const Menu = () => {
  // This returns the cart state and dispatch functions.
  const { cartState } = useCart();
  // We want to know in what category the customer is.
  const [selectedCategory, setSelectedCategory] = useState(false);
  // This state holds the temporary state for delivery true || false.
  // It is used mainly in the delivery or pickup modal.
  const [delivery, setDelivery] = useState(cartState.delivery);
  // This state holds the open or closed modal for PickUpOrDeliveryModal.
  const [open, setOpen] = useState(false);
  // This return the products that the restaurant sells in an array of objects.
  const { filteredData, data, searchInput, favoriteMenuItems } = useMenu();
  const { user } = useAuth();
  // t is to translate the text.
  const t = useI18n();

  if (!data.length) {
    return <Spinner />;
  }

  return (
    <>
      <PickUpOrDeliveryModal
        open={open}
        setOpen={setOpen}
        delivery={delivery}
        setDelivery={setDelivery}
      />
      {/* // the bottom left is where the menu cards are and the bottom right is where the cart is. */}
      <div className="w-full max-w-screen-xl mx-auto relative">
        {/* This is the container where the menu cards and the cart. */}
        <div className="grid grid-cols-12 gap-4 mx-6 my-4">
          {/* This is the container where all the cards are.*/}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 w-full mt-4">
            {/* This div contains the title of where we are and the search. */}
            <div className="flex items-center text-lg gap-2 mb-5 relative">
              {/* This return the search */}
              <Search />
              {/* This buttons brings the user back to categories. */}
              <button
                disabled={!selectedCategory}
                onClick={() => setSelectedCategory(false)}
                className={`font-medium capitalize ${
                  selectedCategory ? "text-main" : ""
                }`}
              >
                Categoriën
              </button>
              {/* This shows in what category the user is. */}
              {selectedCategory !== false && (
                <>
                  <ChevronRightIcon />
                  <span className="font-medium capitalize flex items-center">
                    {selectedCategory[t.locale]}
                  </span>
                </>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {/* If there is no searchInput and selected category === false and there are favorites selected we show the favorites category button */}
              {!searchInput &&
                selectedCategory == false &&
                favoriteMenuItems.length > 0 && (
                  <button
                    onClick={() =>
                      // On Click we set the selected category to all available languages.
                      setSelectedCategory({
                        nl: "Favorieten",
                        de: "Favouriten",
                        en: "Favorites",
                      })
                    }
                    className="flex items-center justify-center gap-2 h-16 card"
                  >
                    <FavoriteIcon filled className="fill-main" />
                    {t.favorites}
                  </button>
                )}
              {/* If there is no search input and the selected category is favorites we show all favorites. */}
              {!searchInput &&
                selectedCategory[t.locale] === t.favorites &&
                favoriteMenuItems.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      item={item}
                      setOpenDeliveryOrPickUp={setOpen}
                    />
                  );
                })}
              {/* Here we render all items in the filtered data */}
              {filteredData.map((category) => {
                // If the category is only for admins and the user is not an admin we return
                if (category.adminOnly && !user?.admin) return;

                // We hard code one language instead.
                // This prevents matching when user switches language when already selected a category.
                if (
                  selectedCategory["nl"] === category.category.nl ||
                  //   If there is a search input we by pass everything and just render everything that matches that search input.
                  searchInput
                ) {
                  return (
                    <>
                      {category.items.map((item) => {
                        return (
                          <Card
                            key={item.id}
                            item={item}
                            setOpenDeliveryOrPickUp={setOpen}
                          />
                        );
                      })}
                    </>
                  );
                }
                // If selected category is false and there is no search input we render all categories that are available.
                if (selectedCategory === false && !searchInput) {
                  return (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedCategory(category.category)}
                      className="card cursor-pointer h-16 flex items-center justify-center hover:text-main hover:fill-main"
                      key={category.id}
                    >
                      {category.category[t.locale]}{" "}
                      <ChevronRightIcon className="fill-inherit" />
                    </motion.button>
                  );
                }
              })}
            </div>
          </div>
          {/* This is the container where the desktopcart is. */}
          <div className="col-span-6 lg:col-span-5">
            {/* This span is needed so that the desktop starts on the same height as the menu without title. */}
            {/* <DesktopCart setOpen={setOpen} setDelivery={setDelivery} /> */}

            {user && user?.admin === true ? (
              <AdminCart />
            ) : (
              <DesktopCart setOpen={setOpen} setDelivery={setDelivery} />
            )}
          </div>
        </div>
        <MobileCart
          setDeliveryOrPickUpOpen={setOpen}
          setDelivery={setDelivery}
        />
      </div>
    </>
  );
};

export default Menu;

// TODO: Filter out postalcodes and base delivery fee on distance.
