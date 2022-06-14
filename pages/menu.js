//React imports
import { useState, useEffect, useRef } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
// Component imports
import Card from "@/components/menu/Card";
import DesktopCart from "@/components/cart/DesktopCart";
import MobileCart from "@/components/cart/MobileCart";
import CategoryHeader from "@/components/menu/CategoryHeader";
import DeliveryOrPickUp from "@/components/menu/DeliveryOrPickUp";
// Upload new menu to firestore if needed.
// import uploadData from "../data/uploadData";

const Menu = () => {
  // This state holds the open or closed modal for DeliveryOrPickUp.
  const [open, setOpen] = useState(false);
  // This return the products that the restaurant sells in an array of objects.
  const { data } = useMenu();
  // This returns the cart state and dispatch functions.
  const { dispatch, cartState } = useCart();
  // t is to translate the text.
  const t = useI18n();
  // This ref holds all the category divs. We need it for category header...
  // ...where we can scroll to a category on click.
  const categoryRef = useRef([]);

  // useEffect(() => {
  //   uploadData();
  // }, []);

  if (data.length < 1) return <div>...loading</div>;

  return (
    <>
      <DeliveryOrPickUp open={open} setOpen={setOpen} />
      <CategoryHeader data={data} categoryRef={categoryRef} />
      {/* // Menu page is mainly devided in three sections top side where the title */}
      {/* and the search bar is, */}
      {/* // the bottom left is where the menu cards are and the bottom right is where the cart is. */}
      <div className="w-full max-w-screen-xl mx-auto relative">
        {/* This is the container where the menu cards and the cart. */}
        <div className="grid grid-cols-12 gap-4 mx-6 mt-3 mb-52">
          {/* This is the container where all the cards are.*/}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 place-self-center mb-20 w-full">
            {data.map((category, idx) => {
              return (
                <div
                  ref={(e) => (categoryRef.current[idx] = e)}
                  id={category.id}
                  key={category.id}
                >
                  <h2 className="font-semibold text-2xl uppercase mt-8 mb-4">
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
          <div className="hidden md:block col-span-6 lg:col-span-5">
            {/* This span is needed so that the desktop starts on the same height as the menu without title. */}
            {/* <span className="block text-2xl mt-8 mb-4">&nbsp;</span> */}
            <DesktopCart setOpen={setOpen} />
          </div>
        </div>
        <MobileCart setDeliveryOrPickUpOpen={setOpen} />
      </div>
    </>
  );
};

export default Menu;
