//React imports
import { useState, useEffect } from "react";

// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import { useMenu } from "@/hooks/useMenu";
// Component imports
import Card from "@/components/menu/Card";

// Upload new menu to firestore if needed.
// import uploadData from "../data/uploadData";

const Menu = () => {
  const { data } = useMenu();
  const { dispatch, cart } = useCart();
  const t = useI18n();

  console.log(cart);

  // useEffect(() => {
  //   uploadData();
  // }, []);
  return (
    // Menu page is mainly devided in three sections top side where the title and the search bar is,
    // the bottom left is where the menu cards are and the bottom right is where the cart is.
    <div className="max-w-screen-xl mx-auto relative">
      {/* This is the container where the menu cards and the cart. */}
      <div className="grid grid-cols-12 gap-4 mx-6 mt-4">
        {/* This is the container where all the cards are.*/}
        <div className="col-span-12 md:col-span-6 lg:col-span-7 place-self-center mb-20 w-full">
          {data.map((category) => {
            return (
              <div key={category.id}>
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
        {/* This is the container where the cart is. */}
        <div></div>
      </div>
    </div>
  );
};

export default Menu;
