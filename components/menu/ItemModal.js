// React imports
import { useState, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";

// Component Imports
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
import Tooltip from "../ToolTip";

const ItemModal = ({ item, open, setOpen }) => {
  // t is used to translate the text.
  const t = useI18n();
  // This hook is to acces cart dispatch
  const { dispatch } = useCart();
  // qwt stands for quantity of the item.
  const [qwt, setQwt] = useState(1);

  // When we close modal we want to reset all the values.
  useEffect(() => {
    setQwt(1);
  }, [open]);

  // This function gets called when we add the item to the cart.
  const addItemToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item, qwt },
    });
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="bg-white h-auto w-10/12 max-w-sm rounded-lg relative flex flex-col overflow-hidden"
    >
      {/* Container for the title */}
      <div className="p-4 flex justify-between items-center shadow-sm border-b">
        <h1 className="text-xl font-semibold">{item.name[t.locale]}</h1>
      </div>
      {/* Container for the information and options. */}
      <div className="p-4 bg-neutral-50">
        <h2>{item.description[t.locale]}</h2>
        {/* Container for increment and decrement */}
        <div className="my-2">
          {/* If the item is a menu it most likely contains a list of items they get. */}
          {item.menuList && (
            <>
              {item.menuList.map((menuItem, idx) => (
                <div className="flex space-x-1" key={idx}>
                  <span>{menuItem.name[t.locale]}</span>
                  {menuItem.description && (
                    <Tooltip tip={menuItem.description[t.locale]} />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex items-center justify-evenly relative h-10">
          <IconButton
            onClick={() => setQwt((qwt) => (qwt > 1 ? qwt - 1 : qwt))}
            variant="remove_circle_outline"
            color="main"
          />
          <div className="text-2xl font-semibold absolute">{qwt}</div>
          <IconButton
            onClick={() => setQwt((qwt) => qwt + 1)}
            variant="add_circle_outline"
            color="main"
          />
        </div>
      </div>
      {/* Container for add and cancel */}
      <div className="p-4 shadow grid grid-cols-12 gap-4">
        <button
          onClick={() => setOpen(false)}
          type="button"
          className="col-span-5 button border"
        >
          {t.cancel}
        </button>
        <button
          onClick={() => addItemToCart()}
          type="button"
          className="bg-main text-white button col-span-7"
        >
          {t.add_for}
        </button>
      </div>
    </Modal>
  );
};

export default ItemModal;
