// React imports
import { useState } from "react";
// NextJs imports
import Link from "next/link";
// Component imports
import Modal from "@/components/Modal";
import Cart from "@/components/cart/Cart";
import IconButton from "@/components/IconButton";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import usePath from "@/hooks/usePath";
// Functions imports
import calculateTotalCartPrice from "@/functions/calculateTotalCartPrice";
import euro from "@/functions/euro";
// Third party imports
import { AnimatePresence, motion } from "framer-motion";

const MobileCart = () => {
  // State for opening and closing mobile cart
  const [open, setOpen] = useState(false);
  // t translates the text.
  const t = useI18n();
  const { atMenu, atCheckout } = usePath();
  // Returns the cart state.
  const { cartState } = useCart();

  return (
    <>
      {/* Container for the button to open cart on small devices. */}
      <AnimatePresence>
        {/* If cart is empty we do not show this button */}
        {cartState.cart.length > 0 && (
          <motion.div
            initial={{ y: atCheckout ? -100 : 100 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeIn",
            }}
            // When spring animation bounces it shows the bottom of the cart button.
            // To fix this we make the cart button a bit bigger.
            className={`md:hidden ${
              atCheckout
                ? "top-0 sticky shadow border-b"
                : "bottom-0 fixed border-t"
            } p-4 w-full bg-white`}
          >
            <button
              type="button"
              className="button text-white bg-main w-full"
              onClick={() => setOpen(true)}
            >
              {t.to_cart} {euro(calculateTotalCartPrice(cartState))}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Container for the cart that covers the whole screen. */}
      <Modal
        open={open}
        setOpen={setOpen}
        className="bg-white fixed inset-0 w-full h-full flex flex-col sm:p-4"
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="font-semibold text-2xl">{t.cart}</h1>
          <IconButton variant="close" onClick={() => setOpen(false)} />
        </div>
        <Cart />
        <div className="p-4 flex flex-col space-y-2">
          {atMenu && (
            <>
              <Link href="/checkout">
                <a className="button bg-main text-white">{t.to_checkout}</a>
              </Link>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="button border"
              >
                {t.back_to_menu}
              </button>
            </>
          )}
          {atCheckout && (
            <>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="button bg-main text-white"
              >
                {t.back_to_checkout}
              </button>
              <Link href="/menu">
                <a className="button border">{t.back_to_menu}</a>
              </Link>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default MobileCart;
