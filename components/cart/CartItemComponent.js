// React imports
import { useState } from "react";
// Component imports
import IconButton from "@/components/IconButton";
// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
// Function imports
import euro from "@/functions/euro";

const CartItemComponent = ({ cartItem }) => {
  // Retrieves dispatch to increment and decrement cart.
  const { dispatch } = useCart();
  // t is used to translate.
  const t = useI18n();

  return (
    // ********* CART ITEM CONTAINER *********
    <div className="flex items-start mt-1">
      {/* ********** INCREMENT & DECEREMENT ********** */}
      <div
        style={{ maxWidth: "3.25rem" }}
        className="flex justify-between w-full items-center"
      >
        <IconButton
          variant="remove_circle_outline"
          size="small"
          color="main"
          onClick={() =>
            dispatch({
              type: "DECREMENT_ITEM",
              payload: cartItem,
            })
          }
        />
        <span>{cartItem.qwt}</span>
        <IconButton
          variant="add_circle_outline"
          size="small"
          color="main"
          onClick={() =>
            dispatch({
              type: "INCREMENT_ITEM",
              payload: cartItem,
            })
          }
        />
      </div>
      {/* ********** END INCREMENT & DECEREMENT ********** */}
      {/* ********** PRODUCT NAME & DESCRIPTION ********** */}
      <div className="flex-grow mx-3">
        <div>
          <span>{cartItem.name[t.locale]}</span>
        </div>
        <div className="leading-none">
          <span className="text-xs text-gray-500">
            {cartItem.description[t.locale]}
          </span>
        </div>
        <div className="leading-none flex items-center">
          <IconButton variant="edit" size="small" />
          <span className="text-xs text-gray-500">{cartItem.remarks}</span>
        </div>
      </div>
      {/* ********** END PRODUCT NAME & DESCRIPTION ********** */}
      {/* ********** PRICE ********** */}
      <div className="justify-self-end">
        <span>{euro(cartItem.price)}</span>
      </div>
      {/* ********** PRICE ********** */}
    </div>
    // ********* END CART ITEM CONTAINER *********
  );
};

export default CartItemComponent;
