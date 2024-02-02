import { useState } from "react";
import { useRouter } from "next/router";
// Component imports
import Cart from "@/components/cart/Cart";
import AdminCheckoutModal from "@/components/checkout/AdminCheckoutModal";

const AdminCart = ({}) => {
  const [checkOutModal, setCheckOutModal] = useState(false);
  const router = useRouter();

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
              onClick={() => setCheckOutModal(true)}
              className="button w-1/3 text-white bg-main"
            >
              Afrekenen
            </button>
            <button
              onClick={() => router.push("/checkout")}
              className="button w-2/3 text-main border"
            >
              Naar reserveren
            </button>
          </div>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default AdminCart;
