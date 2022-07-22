//React imports
import { useState, useEffect, useRef } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Component imports
import Card from "@/components/menu/Card";
import DesktopCart from "@/components/cart/DesktopCart";
import MobileCart from "@/components/cart/MobileCart";
import CategoryHeader from "@/components/menu/CategoryHeader";
import PickUpOrDeliveryModal from "@/components/menu/PickUpOrDeliveryModal";
import Spinner from "@/components/Spinner";

// Upload new menu to firestore if needed.
// import uploadData from "../data/uploadData";

const Menu = () => {
  // This returns the cart state and dispatch functions.
  const { dispatch, cartState } = useCart();
  // This state holds the temporary state for delivery true || false.
  // It is used mainly in the delivery or pickup modal.
  const [delivery, setDelivery] = useState(cartState.delivery);
  // This state holds the open or closed modal for PickUpOrDeliveryModal.
  const [open, setOpen] = useState(false);
  // This return the products that the restaurant sells in an array of objects.
  const {
    filteredData,
    data,
    searchInput,
    favoriteMenuItems,
    popularMenuItems,
  } = useMenu();
  // This returns the closed state of the restaurant.
  const { closed } = useStoreInfo();
  // t is to translate the text.
  const t = useI18n();
  // This ref holds all the category divs. We need it for category header...
  // ...where we can scroll to a category on click.
  const categoryRef = useRef([]);

  // useEffect(() => {
  //   uploadData();
  // }, []);

  useEffect(() => {
    const localCartState = JSON.parse(localStorage.getItem("localCartState"));
    if (
      // No need to open when we are closed.
      !closed &&
      (localCartState?.delivery === "undecided" || !localCartState)
    ) {
      setOpen(true);
    }
  }, []);

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
      <CategoryHeader data={data} categoryRef={categoryRef} />
      {/* // Menu page is mainly devided in three sections top side where the title */}
      {/* and the search bar is, */}
      {/* // the bottom left is where the menu cards are and the bottom right is where the cart is. */}
      <div className="w-full max-w-screen-xl mx-auto relative">
        {/* This is the container where the menu cards and the cart. */}
        <div className="grid grid-cols-12 gap-4 mx-6 mt-3 mb-52">
          {/* This is the container where all the cards are.*/}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 place-self-center mb-20 w-full">
            {/* If there are not favorite items or the user is searching we remove favorites. */}
            {!!favoriteMenuItems.length && !searchInput.length && (
              <div className="">
                <h2 className="font-semibold text-2xl capitalize mt-8 mb-4 flex items-center">
                  {t.favorites}{" "}
                  <span className="material-symbols-outlined text-main ml-2">
                    favorite
                  </span>
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  {favoriteMenuItems.map((item) => {
                    return (
                      <Card
                        item={item}
                        key={item.id}
                        setOpenDeliveryOrPickUp={setOpen}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {!searchInput.length && (
              <div className="">
                <h2 className="font-semibold text-2xl capitalize mt-8 mb-4">
                  {t.popular}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  {popularMenuItems.map((item) => {
                    return (
                      <Card
                        item={item}
                        key={item.id}
                        setOpenDeliveryOrPickUp={setOpen}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {filteredData.map((category, idx) => {
              return (
                <div
                  ref={(e) => (categoryRef.current[idx] = e)}
                  id={category.id}
                  key={category.id}
                >
                  <h2 className="font-semibold text-2xl capitalize mt-8 mb-4">
                    {category.category[t.locale]}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                    {category.items.map((item) => {
                      return (
                        <Card
                          key={item.id}
                          item={item}
                          setOpenDeliveryOrPickUp={setOpen}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* This is the container where the desktopcart is. */}
          <div className="col-span-6 lg:col-span-5">
            {/* This span is needed so that the desktop starts on the same height as the menu without title. */}
            <DesktopCart setOpen={setOpen} setDelivery={setDelivery} />
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
