// React imports
import { useState, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Component Imports
import Modal from "@/components/Modal";
import ItemModalContent from "@/components/ItemModalContent";

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
        cartItem,
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
      <ItemModalContent
        item={item}
        errors={errors}
        setErrors={setErrors}
        setOpen={setOpen}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        selectedSides={selectedSides}
        setSelectedSides={setSelectedSides}
        remarks={remarks}
        setRemarks={setRemarks}
        qwt={qwt}
        setQwt={setQwt}
      />
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
