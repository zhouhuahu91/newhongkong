import { useState } from "react";
import { useRouter } from "next/router";
// Component imports
import Cart from "@/components/cart/Cart";
import AdminCheckoutModal from "@/components/checkout/AdminCheckoutModal";
// Hook imports
import { useCart } from "@/hooks/useCart";

const AdminCart = ({}) => {
  const [checkOutModal, setCheckOutModal] = useState(false);
  const router = useRouter();
  const { cartState } = useCart();

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
              onClick={() => setCheckOutModal(true)}
              className={`button w-1/3 text-white ${
                cartIsEmpty ? "bg-gray-300" : "bg-main"
              }`}
            >
              Afrekenen
            </button>
            <button
              disabled={cartIsEmpty}
              onClick={() => router.push("/checkout")}
              className={`button w-2/3 border ${
                cartIsEmpty ? "bg-gray-300 text-white" : ""
              }`}
            >
              Naar bestellen
            </button>
          </div>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default AdminCart;
