// React imports
import { useState } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Function imports
import euro from "@/functions/euro";
// Component imports
import ItemModal from "@/components/menu/ItemModal";

const Card = ({ item, setOpenDeliveryOrPickUp }) => {
  // This state holds the open or closed modal for ItemModal.
  const [open, setOpen] = useState(false);
  // t is to translate the text.
  const t = useI18n();
  // Returns the state of the cart and cart methods with dispatch.
  const { dispatch, cartState } = useCart();

  return (
    <>
      <ItemModal item={item} open={open} setOpen={setOpen} />
      <div
        onClick={() => {
          // If the user hasn't selected delivery or pick up, we open the modal for them to pick one.
          if (cartState.delivery === "undecided") {
            return setOpenDeliveryOrPickUp(true);
          }
          setOpen((prev) => !prev);
        }}
        className="p-4 flex flex-col rounded-lg bg-white hover:shadow hover:scale-[1.04] transition-all ease-in border cursor-pointer"
      >
        <h3 className="font-medium capitalize">{item.name[t.locale]}</h3>
        <span className="text-xs text-gray-500 block my-2 flex-grow line-clamp-2">
          {item.description[t.locale]}
        </span>
        <span className="font-medium">{euro(item.price)}</span>
      </div>
    </>
  );
};

export default Card;
