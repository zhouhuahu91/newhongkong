// React imports
import { useState, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Component Imports
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
import Tooltip from "@/components/ToolTip";
import ItemOptions from "@/components/menu/ItemOptions";

const EditCartItemModal = ({ item, cartItem, open, setOpen }) => {
  // t is used to translate the text.
  const t = useI18n();
  // This hook is to acces cart dispatch
  const { dispatch } = useCart();
  // qwt stands for quantity of the item.
  const [qwt, setQwt] = useState(cartItem.qwt);
  // We define all the states we need.
  const [errors, setErrors] = useState({});
  // For the sides e.g. nasi en bami.
  const [selectedSides, setSelectedSides] = useState(cartItem.selectedSides);
  // For the menu options e.g. babi pangang, foe yong hai.
  const [selectedOptions, setSelectedOptions] = useState(
    cartItem.selectedOptions
  );
  // This state holds the remarks for the item
  const [remarks, setRemarks] = useState(cartItem.remarks);

  // When we close modal we want to reset all the values.
  useEffect(() => {
    if (!open) {
      setQwt(cartItem.qwt);
      setErrors({});
      setSelectedOptions(cartItem.selectedOptions);
      setSelectedSides(cartItem.selectedSides);
      setRemarks(cartItem.remarks);
    }
  }, [open]);

  // This function gets called when we save the item to the cart.
  const saveChangesToCart = () => {
    // We define tempErrors so we can return all errors at the same time.
    // We do this because setState is asynchronous.
    let tempErrors = {};
    // When submited we need to check if all the options are selected.
    // We check if the item has options and if the length of the selectedOptions...
    // is smaller than the total options available.
    if (item.options && selectedOptions.length < (item.totalOptions || 1)) {
      tempErrors.options = true;
    }
    // We do the same for sides.
    if (item.sides && selectedSides.length < (item.totalSides || 1)) {
      tempErrors.sides = true;
    }
    // We check if remarks isn't longer than 100 characters.
    if (remarks.length > 500) {
      tempErrors.remarks = true;
    }
    // If we have an error we return from submitting and we set the errors with tempErrors.
    if (tempErrors.sides || tempErrors.options || tempErrors.remarks) {
      // than we set the ErrorsState
      return setErrors({
        ...tempErrors,
      });
    }

    // We save the item.
    dispatch({
      type: "SAVE_ITEM",
      payload: {
        item,
        qwt,
        selectedOptions,
        selectedSides,
        remarks,
      },
    });

    // We close the modal.
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="bg-white h-auto w-10/12 max-w-sm rounded-lg relative flex flex-col overflow-hidden select-none"
    >
      {/* Container for the title */}
      <div className="p-4 flex justify-between items-center shadow border-b">
        <h1 className="text-xl font-semibold">{item.name[t.locale]}</h1>
        <IconButton variant="close" onClick={() => setOpen(false)} />
      </div>
      {/* Container for the information and options. */}
      <div
        style={{ maxHeight: "calc(100vh - 185px)" }}
        className="p-4 bg-neutral-50 flex-grow overflow-auto"
      >
        <h2>{item.description[t.locale]}</h2>
        {/* Container for increment and decrement */}
        <div className="my-2">
          {/* If the item is a menu it most likely contains a list of items they get. */}
          {item.menuList && (
            <>
              {item.menuList.map((menuItem, idx) => (
                <div className="flex space-x-1 items-center" key={idx}>
                  <span>• {menuItem.name[t.locale]}</span>
                  {menuItem.description && (
                    <Tooltip tip={menuItem.description[t.locale]} />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="my-2">
          {item.options && (
            <ItemOptions
              options={item.options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              qwtOptions={item.totalOptions || 1}
              errors={errors.options}
              resetErrors={() => {
                setErrors((prev) => ({
                  ...prev,
                  options: false,
                }));
              }}
            />
          )}
          {item.sides && (
            <ItemOptions
              options={item.sides}
              selectedOptions={selectedSides}
              setSelectedOptions={setSelectedSides}
              qwtOptions={item.totalSides || 1}
              errors={errors.sides}
              resetErrors={() => {
                setErrors((prev) => ({
                  ...prev,
                  sides: false,
                }));
              }}
            />
          )}
          <div className="">
            <label
              htmlFor="itemRemarks"
              className={`text-xs ${
                errors.remarks ? "text-red-400" : "text-gray-500"
              }`}
            >
              {errors.remarks ? t.remarks_max : t.remarks}
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              id="itemRemarks"
              className="appearance-none border w-full focus:outline-none py-2 px-3 rounded-lg text-sm focus:shadow hover:shadow transition-shadow"
            />
          </div>
        </div>
        <div className="flex items-center justify-evenly relative h-8">
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
          onClick={() => saveChangesToCart()}
          type="button"
          className="bg-main text-white button col-span-7"
        >
          {t.save}
        </button>
      </div>
    </Modal>
  );
};

export default EditCartItemModal;
