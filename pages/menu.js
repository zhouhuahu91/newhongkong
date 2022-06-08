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
// Upload new menu to firestore if needed.
// import uploadData from "../data/uploadData";

const Menu = () => {
  const { data } = useMenu();
  const { dispatch, cartState } = useCart();
  const t = useI18n();
  const categoryRef = useRef([]);

  // useEffect(() => {
  //   uploadData();
  // }, []);
  return (
    // Menu page is mainly devided in three sections top side where the title and the search bar is,
    // the bottom left is where the menu cards are and the bottom right is where the cart is.
    <div className="w-full max-w-screen-xl mx-auto relative">
      {/* This is the container where the menu cards and the cart. */}
      <div className="grid grid-cols-12 gap-4 mx-6 mt-4">
        {/* This is the container where all the cards are.*/}
        <div className="col-span-12 md:col-span-6 lg:col-span-7 place-self-center mb-20 w-full">
          <CategoryHeader data={data} categoryRef={categoryRef} />
          {data.map((category, idx) => {
            console.log(category);
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
                    return <Card key={item.id} item={item} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {/* This is the container where the desktopcart is. */}
        <div className="hidden md:block col-span-6 lg:col-span-5">
          {/* This span is needed so that the desktop starts on the same height as the menu without title. */}
          <span className="block text-2xl mt-8 mb-4">&nbsp;</span>
          <DesktopCart />
        </div>
      </div>
      <MobileCart />
    </div>
  );
};

export default Menu;
