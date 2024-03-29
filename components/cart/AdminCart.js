import { useState } from "react";
import { useRouter } from "next/router";
// Component imports
import Cart from "@/components/cart/Cart";
import AdminCheckoutModal from "@/components/checkout/AdminCheckoutModal";
// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
// Icon imports
import CartIcon from "@/icons/CartIcon";

const AdminCart = ({}) => {
  const [checkOutModal, setCheckOutModal] = useState(false);
  const router = useRouter();
  const { cartState, dispatch } = useCart();
  // t translates the text.
  const t = useI18n();

  const cartIsEmpty = cartState.cart.length === 0;

  return (
    <>
      <AdminCheckoutModal open={checkOutModal} setOpen={setCheckOutModal} />
      <div className="hidden md:block sticky top-20 mt-20 mx-auto max-w-sm w-full z-40">
        <div
          // mt-20 so that the cart start at the same height as the title.
          className="border rounded-lg transition-shadow ease-in duration-300
           shadow bg-white"
        >
          <div className="flex p-4 gap-2">
            <button
              disabled={cartIsEmpty}
              onClick={() => {
                // When AdminCart starts up we need to set a few settings to default.
                // AdminCart is used for orders placed in the store.
                // delivery is always === false
                if (cartState.delivery !== false) {
                  dispatch({ type: "SET_DELIVERY", payload: false });
                }
                // paymentMethod === "in_person"
                if (cartState.paymentMethod !== "in_person") {
                  dispatch({
                    type: "SET_PAYMENT_METHOD",
                    payload: "in_person",
                  });
                }
                setCheckOutModal(true);
              }}
              className={`button w-2/3 text-white ${
                cartIsEmpty ? "bg-gray-300" : "bg-main"
              }`}
            >
              Afrekenen
            </button>
            <button
              disabled={cartIsEmpty}
              onClick={() => router.push("/checkout")}
              className={`button w-1/3 border ${
                cartIsEmpty ? "bg-gray-300 text-white" : ""
              }`}
            >
              Bestellen
            </button>
          </div>
          {/* If there are no cart items we show a empty basket div. */}
          {!cartIsEmpty ? (
            <Cart />
          ) : (
            <div className="flex justify-center items-center h-52 pb-4">
              <CartIcon size="38" className="fill-gray-300" />
            </div>
          )}
        </div>

        {!cartIsEmpty && (
          <div className="mx-auto max-w-sm w-full px-2">
            <button
              onClick={() => {
                dispatch({
                  type: "SET_DELIVERY",
                  payload: !cartState.delivery,
                });
              }}
              type="button"
              className="text-xs text-gray-500 text-right w-full red-focus-text"
            >
              {cartState.delivery ? t.rather_pick_up : t.rather_deliver}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminCart;
