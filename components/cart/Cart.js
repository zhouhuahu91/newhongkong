// React imports
import { useRef, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Component imports
import IconButton from "@/components/IconButton";
import Switch from "@/components/Switch";
import Tooltip from "@/components/ToolTip";
// Function imports
import euro from "@/functions/euro";
import calculateTotalCartPrice from "@/functions/calculateTotalCartPrice";

const Cart = () => {
  // t translates the text.
  const t = useI18n();
  // Return the cart.
  const { cartState, dispatch } = useCart();
  // We need the ref to scroll to the last item added to cart when cart is longer than the screen.
  const ref = useRef();
  useEffect(() => {
    // TODO: smooth scroll not working on ios.
    // We get the scroll distance by subtracting the clientHeight form the scrollheight.
    const scroll = ref.current.scrollHeight - ref.current.clientHeight;
    // We scrollTo the it with a behavior of smooth.
    // Not 100% sure how this works but it works!
    ref.current.scrollTo({ top: scroll, behavior: "smooth" });
  }, [cartState.cart]); // Triggers everytime the cart updates.

  return (
    //  ********* MAIN CART CONTAINER *********
    <>
      {/* ********* CART ITEMS CONTAINER ********* */}
      <div
        ref={ref}
        style={{ maxHeight: "calc(100vh - 250px)" }}
        className="select-none overflow-auto flex-grow px-4 pb-4"
      >
        {cartState.cart.map((cartItem) => {
          return (
            // ********* CART ITEM CONTAINER *********
            <div key={cartItem.id} className="flex items-start mt-1">
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
        })}
        {/* ******** SUBTOTAL ********* */}
        <div className="flex justify-between border-t mt-6 pt-4">
          <span>{t.subtotal}</span>
          <span>{euro(cartState.cart.reduce((x, y) => x + y.price, 0))}</span>
        </div>
        {/* ********* END SUBTOTAL ********** */}
        {/* ******** DELIVERY FEE ********* */}
        {cartState.delivery && cartState.delivery !== "undecided" && (
          <div className="flex justify-between mt-1">
            <span>{t.delivery_fee}</span>
            <span>{euro(250)}</span>
          </div>
        )}
        {/* ******** END DELIVERY FEE ********* */}
        {/* ******** DELIVERY FEE ********* */}
        {cartState.paymentMethod !== "cash" &&
          cartState.paymentMethod !== "undecided" && (
            <div className="flex justify-between mt-1">
              <span>{t.transaction_fee}</span>
              <span>{euro(30)}</span>
            </div>
          )}
        {/* ******** END DELIVERY FEE ********* */}
        {/* ******** BAG FEE ********* */}
        {/* If the user selects for pick up they have to pay for the platic bag or... */}
        {/* they have to bring their own. */}
        {(!cartState.delivery ||
          cartState.delivery === "undecided" ||
          true) && (
          <div className="flex justify-between mt-1">
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
        {/* ******** END BAG FEE ********* */}
      </div>
      {/* ********* CART SUMMARY CONTAINER ********* */}
      <div className="mx-4 pb-4 border-t">
        {/* ********* TIP CONTAINER ********* */}
        <div className="flex justify-between pt-4 mt-4">
          <span>{t.restaurant_tip}</span>
          <div className="flex items-center space-x-2">
            <IconButton
              size="small"
              color="main"
              variant="remove_circle_outline"
              onClick={() => dispatch({ type: "DECREMENT_TIP" })}
            />
            <IconButton
              size="small"
              color="main"
              variant="add_circle_outline"
              onClick={() => dispatch({ type: "INCREMENT_TIP" })}
            />
            <span>{euro(cartState.tip)}</span>
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <span>{t.total}</span>
          <span>{euro(calculateTotalCartPrice(cartState))}</span>
        </div>
      </div>
    </>
    // ********* END MAIN CART CONTAINER *********
  );
};

export default Cart;
