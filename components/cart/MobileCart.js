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
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Functions imports
import calculateTotalCartPrice from "@/functions/calculateTotalCartPrice";
import euro from "@/functions/euro";
// Third party imports
import { AnimatePresence, motion } from "framer-motion";

const MobileCart = ({ setDeliveryOrPickUpOpen, setDelivery }) => {
  // State for opening and closing mobile cart
  const [open, setOpen] = useState(false);
  // t translates the text.
  const t = useI18n();
  // Returns true if we are that path.
  const { atMenu, atCheckout } = usePath();
  // Returns the cart state.
  const { cartState } = useCart();
  // Returns information of the store
  const { storeFees, closed } = useStoreInfo();

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
                ? "top-0 sticky shadow-sm border-b"
                : "bottom-0 fixed border-t"
            } p-4 w-full bg-white`}
          >
            <button
              type="button"
              className="button text-white bg-main w-full"
              onClick={() => setOpen(true)}
            >
              {t.to_cart} {euro(calculateTotalCartPrice(cartState, storeFees))}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Container for the cart that covers the whole screen. */}
      <Modal
        toggle={open}
        close={() => setOpen(false)}
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
                <a
                  className={`${
                    closed ? "bg-gray-300 pointer-events-none" : "bg-main"
                  } button text-white`}
                >
                  {closed ? t.closed : t.to_checkout}
                </a>
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
          {atMenu && cartState.delivery !== "undecided" && (
            <div className="mx-auto max-w-sm w-full px-1">
              <button
                onClick={() => {
                  setOpen(false);
                  setDelivery(!cartState.delivery);
                  setDeliveryOrPickUpOpen(true);
                }}
                type="button"
                className="text-xs text-gray-500 text-right w-full"
              >
                {cartState.delivery ? t.rather_pick_up : t.rather_deliver}
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default MobileCart;
