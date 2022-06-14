// NextJs imports
import Link from "next/link";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import usePath from "@/hooks/usePath";
// Component imports
import Cart from "@/components/cart/Cart";

const DesktopCart = ({ setOpen }) => {
  // t translates the text.
  const t = useI18n();
  // Return the cart.
  const { cartState } = useCart();
  // Return true if we are at /menu
  const { atMenu } = usePath();
  // This is true when cart is empty
  const empty = cartState.cart.length === 0;

  return (
    <>
      <div
        // mt-20 so that the cart start at the same height as the title.
        className={`sticky top-16 mt-20 border rounded-lg mx-auto max-w-sm w-full transition-shadow ease-in duration-300 ${
          !empty && "shadow bg-white"
        }`}
      >
        <div className="flex p-4">
          {atMenu ? (
            <Link href="/checkout">
              <a
                className={`button w-full text-white ${
                  empty ? "bg-gray-300 pointer-events-none" : "bg-main"
                }`}
              >
                {t.to_checkout}
              </a>
            </Link>
          ) : (
            <Link href="/menu">
              <a className={`button w-full text-white bg-main`}>
                {t.back_to_menu}
              </a>
            </Link>
          )}
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
      <div className="mx-auto max-w-sm w-full px-2">
        <button
          onClick={() => {
            setOpen(true);
          }}
          type="button"
          className="text-xs text-gray-500 text-right w-full"
        >
          {cartState.delivery ? t.rather_pick_up : t.rather_deliver}
        </button>
      </div>
    </>
  );
};

export default DesktopCart;
