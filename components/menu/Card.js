// React imports
import { useState } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Function imports
import euro from "@/functions/euro";
// Component imports
import ItemModal from "@/components/menu/ItemModal";

const Card = ({ item }) => {
  const [open, setOpen] = useState(false);
  const t = useI18n();

  return (
    <>
      <ItemModal item={item} open={open} setOpen={setOpen} />
      <div
        onClick={() => setOpen((prev) => !prev)}
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
