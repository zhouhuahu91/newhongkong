// React imports
import { useRef, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Component imports
import IconBtn from "@/components/IconBtn";
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";
import Switch from "@/components/Switch";
import ToolTip from "@/components/ToolTip";
import CartItemComponent from "@/components/cart/CartItemComponent";
// Function imports
import euro from "@/functions/euro";
import calculateTotalCartPrice from "@/functions/calculateTotalCartPrice";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Animation imports
import { AnimatePresence } from "framer-motion";

const Cart = () => {
  // t translates the text.
  const t = useI18n();
  // Returns information about the store.
  const { storeFees } = useStoreInfo();
  // Return the cart.
  const { cartState, dispatch } = useCart();
  // We need the ref to scroll to the last item added to cart when cart is longer than the screen.
  const ref = useRef();
  // This is the cart price without store fees
  const subtotal = cartState.cart.reduce((x, y) => x + y.price, 0);
  // Shortage to reach the required amount for delivery
  const shortForDelivery =
    storeFees.minimumOrderAmount - subtotal - cartState.tip;

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
        style={{ maxHeight: "calc(100vh - 265px)" }}
        className="overflow-auto flex-grow px-4 pb-4"
      >
        <AnimatePresence>
          {cartState.cart.map((cartItem) => {
            return <CartItemComponent key={cartItem.id} cartItem={cartItem} />;
          })}
        </AnimatePresence>
        {/* ******** SUBTOTAL ********* */}
        <div className="flex justify-between border-t mt-6 pt-4">
          <span>{t.subtotal}</span>
          <span>{euro(subtotal)}</span>
        </div>
        {/* ********* END SUBTOTAL ********** */}
        {/* ******** DELIVERY FEE ********* */}
        {cartState.delivery && cartState.delivery !== "undecided" && (
          <div className="flex justify-between mt-1">
            <span>{t.delivery_fee}</span>
            <span>{euro(storeFees.deliveryFee)}</span>
          </div>
        )}
        {/* ******** END DELIVERY FEE ********* */}
        {/* ******** DELIVERY FEE ********* */}
        {cartState.paymentMethod !== "in_person" &&
          cartState.paymentMethod !== "undecided" && (
            <div className="flex justify-between mt-1">
              <span>{t.transaction_fee}</span>
              <span>{euro(storeFees.transactionFee)}</span>
            </div>
          )}
        {/* ******** END DELIVERY FEE ********* */}
        {/* ******** PLASTIC FEE ********* */}
        {/* If the user selects for pick up they have to pay for the platic bag or... */}
        {/* they have to bring their own. */}
        {/* <div className="flex justify-between mt-1">
          <div className="flex space-x-1 items-center">
            <span>Toeslag plastic</span>
            <ToolTip tip={t.bag_tooltip} />
          </div>
          <div className="flex items-center space-x-4">
            {euro(storeFees.plasticFee)}
          </div>
        </div> */}
        {/* ******** END PLASTIC FEE ********* */}
        {/* ******** BAG FEE ********* */}
        {/* If the user selects for pick up they have to pay for the platic bag or... */}
        {/* they have to bring their own. */}
        {(!cartState.delivery || cartState.delivery === "undecided") && (
          <div className="flex justify-between mt-1">
            <div className="flex space-x-1 items-center">
              <span>{t.bag}</span>
              <ToolTip tip={t.bag_tooltip} />
            </div>
            <div className="flex items-center space-x-4">
              <Switch
                toggle={cartState.bag}
                onClick={() => dispatch({ type: "TOGGLE_BAG" })}
              />
              <span>
                {cartState.bag ? euro(storeFees.plasticBagFee) : euro(0)}
              </span>
            </div>
          </div>
        )}
        {/* ******** END BAG FEE ********* */}
        {/* ******** DELIVERY WARNING ********* */}
        {/* We need to let the user know there is a minimum for delivery. */}
        {shortForDelivery > 0 && cartState.delivery === true && (
          <div className="text-xs p-2 border mt-2 bg-amber-50">
            {t.delivery_warning(
              shortForDelivery,
              storeFees.minimumOrderAmount,
              `${cartState.address.street || ""} ${
                cartState.address.houseNumber || ""
              } ${cartState.address.addition || ""}`
            )}
          </div>
        )}
        {/* ******** END DELIVERY WARNING ********* */}
      </div>
      {/* ********* CART SUMMARY CONTAINER ********* */}
      <div className="mx-4 pb-4 border-t">
        {/* ********* TIP CONTAINER ********* */}
        <div className="flex justify-between pt-4 mt-4">
          <span>{t.restaurant_tip}</span>
          <div className="flex items-center space-x-2">
            <IconBtn onClick={() => dispatch({ type: "DECREMENT_TIP" })}>
              <MinusIcon size="18" className="fill-main" />
            </IconBtn>
            <IconBtn onClick={() => dispatch({ type: "INCREMENT_TIP" })}>
              <PlusIcon size="18" className="fill-main" />
            </IconBtn>
            <span>{euro(cartState.tip)}</span>
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <span>{t.total}</span>
          <span>{euro(calculateTotalCartPrice(cartState, storeFees))}</span>
        </div>
      </div>
    </>
    // ********* END MAIN CART CONTAINER *********
  );
};

export default Cart;
