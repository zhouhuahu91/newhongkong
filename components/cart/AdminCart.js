import { useState } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Component imports
import Cart from "@/components/cart/Cart";
import AdminCheckoutModal from "@/components/checkout/AdminCheckoutModal";

const AdminCart = ({}) => {
  const [checkOutModal, setCheckOutModal] = useState(false);
  // t translates the text.
  const t = useI18n();
  // Return the cart.
  const { cartState, dispatch } = useCart();
  // This is true when cart is empty
  const empty = cartState.cart.length === 0;
  // Returns true if store is closed
  const { closed } = useStoreInfo();

  // When AdminCart starts up we need to set a few settings to default.
  // AdminCart is used for orders placed in the store.
  // delivery is always === false
  if (cartState.delivery) {
    dispatch({ type: "SET_DELIVERY", payload: false });
  }
  // paymentMethod === "in_person"
  if (cartState.paymentMethod === "online") {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: "in_person" });
  }

  return (
    <>
      <AdminCheckoutModal open={checkOutModal} setOpen={setCheckOutModal} />
      <div className="hidden md:block sticky top-20 mt-20 mx-auto max-w-sm w-full z-40">
        <div
          // mt-20 so that the cart start at the same height as the title.
          className={`border rounded-lg transition-shadow ease-in duration-300 ${
            !empty && "shadow bg-white"
          }`}
        >
          <div className="flex p-4">
            <button
              onClick={() => setCheckOutModal(true)}
              disabled={closed || empty}
              className="button w-full text-white bg-main"
            >
              Afrekenen
            </button>
          </div>
          {/* If there are no cart items we show a empty basket div. */}
          {!empty ? (
            <Cart />
          ) : (
            <div className="flex justify-center items-center h-52 pb-6">
              <span className="text-gray-300 text-sm">
                {t.your_cart_is_empty}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCart;
