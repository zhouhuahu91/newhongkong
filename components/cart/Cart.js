// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Component imports
import IconButton from "@/components/IconButton";

const Cart = () => {
  // t translates the text.
  const t = useI18n();
  // Return the cart.
  const { cart } = useCart();

  return (
    <div className="px-4 pb-4">
      {cart.items.map((item) => {
        return (
          // This is the main container where the cart items are.
          <div key={item.id} className="flex mt-2">
            {/* This container div is where we can increment and decrement the item in the cart. */}
            <div className="flex justify-between items-center w-10">
              <IconButton
                variant="remove_circle_outline"
                size="small"
                color="main"
              />
              <span>{item.qwt}</span>
              <IconButton
                variant="add_circle_outline"
                size="small"
                color="main"
              />
            </div>
            {item.name[t.locale]}
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
