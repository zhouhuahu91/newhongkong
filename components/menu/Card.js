// React imports
import { useState } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Function imports
import euro from "@/functions/euro";
// Component imports
import AddItemToCartModal from "@/components/menu/AddItemToCartModal";

import { motion } from "framer-motion";

const Card = ({ item }) => {
  // This state holds the open or closed modal for ItemModal.
  const [open, setOpen] = useState(false);
  // t is to translate the text.
  const t = useI18n();

  return (
    <>
      <AddItemToCartModal item={item} open={open} setOpen={setOpen} />
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className="p-3 text-left flex flex-col rounded-lg bg-white hover:shadow hover:scale-[1.04] red-focus-ring transition-all ease-in border cursor-pointer"
      >
        <h3 className="font-medium capitalize">{item.name[t.locale]} </h3>
        <span className="text-xs text-gray-500 block my-2 flex-grow line-clamp-2">
          {item.description[t.locale]}
        </span>
        <span className="font-medium">{euro(item.price)}</span>
      </motion.button>
    </>
  );
};

export default Card;
