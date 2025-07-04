// React imports
import { useState, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
// Component Imports
import Modal from "@/components/Modal";
import ItemModalContent from "../ItemModalContent";
// Function imports
import euro from "@/functions/euro";
import { nanoid } from "nanoid";
// Firebase imports
import { db } from "@/firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const NewItemModal = ({ item, open, setOpen }) => {
  // t is used to translate the text.
  const t = useI18n();
  // This hook is to acces cart dispatch
  const { dispatch, cartState } = useCart();
  // qwt stands for quantity of the item.
  const [qwt, setQwt] = useState(1);
  // We define all the states we need.
  const [errors, setErrors] = useState({});
  // For the sides e.g. nasi en bami.
  const [selectedSides, setSelectedSides] = useState([]);
  // For the menu options e.g. babi pangang, foe yong hai.
  const [selectedOptions, setSelectedOptions] = useState([]);
  // This state holds the remarks for the item
  const [remarks, setRemarks] = useState("");
  // I want the user to see who added a item to a cart
  const { user } = useAuth();

  // When we close modal we want to reset all the values.
  useEffect(() => {
    if (!open) {
      setQwt(1);
      setErrors({});
      setSelectedOptions([]);
      setSelectedSides([]);
      setRemarks("");
    }
  }, [open]);

  const getOrCreateUserId = () => {
    let id = localStorage.getItem("anonId");
    if (!id) {
      id = nanoid(6); // or your preferred ID method
      localStorage.setItem("anonId", id);
    }
    return id;
  };

  // We need the total cost of the item + options & sides to show the user the price.
  const calcTotalItemPriceWithOptionsAndSides = () => {
    // base price is the price of the item.
    let total = item.price;
    // 1. We check if item has option, if true we add it on the price.
    if (selectedOptions.length > 0) {
      // 2. We loop over the selectedOptions and accumulate all the prices.
      total += selectedOptions.reduce((acc, selectedOption) => {
        // 3. We get the price by filtering the items.options matching the id
        const [{ price }] = item.options.filter(
          (option) => option.id === selectedOption
        );
        return acc + (price || 0);
      }, 0);
    }
    // Here we do the same for the sides.
    if (selectedSides.length) {
      total += selectedSides.reduce((acc, selectedSides) => {
        const [{ price }] = item.sides.filter(
          (side) => side.id === selectedSides
        );
        return acc + (price || 0);
      }, 0);
    }

    // We return the price * the qwt.
    return total * qwt;
  };

  // This function gets called when we add the item to the cart.
  const addItemToCart = () => {
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

    // We add the item to the cart.
    dispatch({
      type: "ADD_ITEM",
      payload: {
        item,
        qwt,
        selectedOptions,
        selectedSides,
        remarks,
      },
    });

    if (!user?.admin) {
      const guest = JSON.parse(localStorage.getItem("guest"));
      const userName =
        user?.name || guest?.name || `anon${getOrCreateUserId()}`;

      let displayName = item.name;

      if (item.optionIsMain) {
        const options = selectedOptions
          .map((id) => item.options.find((opt) => opt.id === id))
          .filter(Boolean);

        if (options.length > 0) {
          displayName = options[0].name;
        }
      }

      addDoc(collection(db, "logItemToCart"), {
        item: displayName,
        user: userName,
        timeStamp: serverTimestamp(),
      });
    }
    // We close the modal.
    setOpen(false);
  };

  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="bg-white h-auto w-full mx-2 max-w-sm rounded-lg relative flex flex-col overflow-hidden select-none"
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
          onClick={() => {
            addItemToCart();
          }}
          type="button"
          className="bg-main text-white button col-span-7"
        >
          {t.add_for} {euro(calcTotalItemPriceWithOptionsAndSides())}
        </button>
      </div>
    </Modal>
  );
};

export default NewItemModal;
