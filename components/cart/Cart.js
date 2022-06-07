// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Component imports
import IconButton from "@/components/IconButton";
import Switch from "@/components/Switch";
import Tooltip from "@/components/ToolTip";
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
      className="px-4 pb-4 select-none"
    >
      {cartState.cart.map((cartItem) => {
        return (
          // This is the main container where the cart items are.
          <div
            key={cartItem.id}
            className="flex mt-2 items-start overflow-auto"
          >
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
      {/* This is the container for subtotal, tips, delivery cost and total.  */}
      <div className="border-t mt-6 py-4">
        <div className="flex justify-between mt-2">
          <span>{t.subtotal}</span>
          <span>{euro(cartState.cart.reduce((x, y) => x + y.price, 0))}</span>
        </div>
        {/* If they selecte delivery we show the delivery price. */}
        {cartState.delivery && cartState.delivery !== "undecided" && (
          <div className="flex justify-between mt-2">
            <span>{t.delivery_fee}</span>
            <span>{euro(250)}</span>
          </div>
        )}
        {/* If they do NOT pay with cash we add the cost for transaction. */}
        {cartState.paymentMethod !== "cash" &&
          cartState.paymentMethod !== "undecided" && (
            <div className="flex justify-between mt-2">
              <span>{t.transaction_fee}</span>
              <span>{euro(30)}</span>
            </div>
          )}
      </div>
      {/* If they select for pick up they have to pay for the platic bag or... */}
      {/* they have to bring their own. */}
      {(!cartState.delivery || cartState.delivery === "undecided" || true) && (
        <div className="flex justify-between mt-2">
          <div className="flex space-x-1 items-center">
            <span>{t.bag}</span>
            <Tooltip tip={t.bag_tooltip} />
          </div>
          <div className="flex items-center space-x-4">
            <Switch
              toggle={cartState.bag}
              onClick={() => dispatch({ type: "TOGGLE_BAG" })}
            />
            <span>{cartState.bag ? euro(10) : euro(0)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
