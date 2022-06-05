// NextJs imports
import Link from "next/link";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import usePath from "@/hooks/usePath";

const DesktopCart = () => {
  const t = useI18n();
  const { cart } = useCart();
  const { menu } = usePath();
  // This is true when cart is empty
  const empty = cart.items.length === 0;

  return (
    <div
      className={`sticky top-0 border rounded-lg max-w-sm w-full transition-shadow ease-in duration-300 ${
        empty ? "shadow-sm bg-white" : ""
      }`}
    >
      <div className="flex p-4">
        {menu ? (
          <Link href="/checkout">
            <a className={`button w-full text-white bg-main`}>
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
      {cart.items.length ? (
        <></>
      ) : (
        // <CartContent />
        <div className="flex justify-center items-center h-52 pb-6">
          <span className="text-gray-300 text-sm">{t.your_cart_is_empty}</span>
        </div>
      )}
    </div>
  );
};

export default DesktopCart;
