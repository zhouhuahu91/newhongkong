// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Component imports
import IconButton from "@/components/IconButton";
// Function imports
import euro from "@/functions/euro";

const Cart = () => {
  // t translates the text.
  const t = useI18n();
  // Return the cart.
  const { cartState, dispatch } = useCart();

  return (
    <div
      style={{ maxHeight: "calc(100vh - 185px)" }}
      className="px-4 pb-4 select-none overflow-auto"
    >
      {cartState.cart.map((cartItem) => {
        return (
          // This is the main container where the cart items are.
          <div key={cartItem.id} className="flex mt-2 items-start">
            {/* This container div is where we can increment and decrement the item in the cart. */}
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
            {/* This is the cointainer for the cart item name and description. */}
            <div className="flex-grow mx-3">
              <div>
                <span>{cartItem.name[t.locale]}</span>
              </div>
              <div className="leading-none">
                {/* See modal for how the item description gets generated. */}
                <span className="text-xs text-gray-500">
                  {cartItem.description[t.locale]}
                  {/* {getItemDescription(item, t.locale)} */}
                </span>
              </div>
            </div>
            {/* This is the cointainer for the cart item price. */}
            <div className="justify-self-end">
              <span>{euro(cartItem.price)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
