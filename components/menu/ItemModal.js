// React imports
import { useState, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Function imports
import createItemId from "@/functions/createItemId";
// Component Imports
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
import Tooltip from "@/components/ToolTip";
import ItemOptions from "@/components/menu/ItemOptions";

const ItemModal = ({ item, open, setOpen }) => {
  // t is used to translate the text.
  const t = useI18n();
  // This hook is to acces cart dispatch
  const { dispatch } = useCart();
  // qwt stands for quantity of the item.
  const [qwt, setQwt] = useState(1);
  // We define all the states we need.
  const [errors, setErrors] = useState({});
  // For the sides e.g. nasi en bami.
  const [selectedSides, setSelectedSides] = useState([]);
  // For the menu options e.g. babi pangang, foe yong hai.
  const [selectedOptions, setSelectedOptions] = useState([]);

  // When we close modal we want to reset all the values.
  useEffect(() => {
    if (!open) {
      setQwt(1);
      setErrors({});
      setSelectedOptions([]);
      setSelectedSides([]);
    }
  }, [open]);

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
    // If we have an error we return from submitting and we set the errors with tempErrors.
    if (tempErrors.sides || tempErrors.options) {
      // than we set the ErrorsState
      return setErrors({
        ...tempErrors,
      });
    }

    // If we user selects all the required options and sides we add the item to the cart.
    // We need to prepare the item to be added to the cart.

    // We need a new id for the item that also includes the options and sides.
    const id = createItemId(item, selectedOptions, selectedSides);

    // We need the actual options and sides instead of only there id.
    const options = selectedOptions.map((selectedOption) =>
      item.options.find((option) => option.id === selectedOption)
    );
    const sides = selectedSides.map((selectedSide) =>
      item.sides.find((side) => side.id === selectedSide)
    );

    // We need the total price for the options and sides.
    let addedPrice = 0;
    if (options.length > 0) {
      addedPrice += options.reduce((acc, option) => acc + option.price, 0);
    }
    if (sides.length > 0) {
      addedPrice += sides.reduce((acc, side) => acc + side.price, 0);
    }
    // We need the total price for the item.
    const price = (item.price + addedPrice) * qwt;

    // The name of the item is different if optionIsMain is true.
    const name = item.optionIsMain ? options[0].name : item.name;

    // We need a description for the options and sides they have selected.
    // We need it in all the languages.
    const languages = ["nl", "en", "de"];
    const description = {};

    languages.forEach((language) => {
      let tempDescription = "";
      // We only at description for the option if there are options and if the selected option...
      // is not the main.
      if (options.length && !item.optionIsMain) {
        // We map over the selectedOptions.
        options.map((option, idx) => {
          // If the current option is the last one in the array we do not add a ",".
          return options.length - 1 === idx
            ? (tempDescription += `${option.name[language]} `)
            : (tempDescription += `${option.name[language]}, `);
        });
      }

      // We only at description for sides if there are sides.
      if (sides.length) {
        // If there are two sides and the both sides are the same we return...
        // "with 2x sides".
        if (sides.length === 2 && sides[0].id === sides[1].id) {
          tempDescription += `${t.with} 2x ${sides[0].name[language]}`;
        } else {
          // We map over the selectedSides.
          sides.map((side, idx) => {
            // If the current side is the first one we at "met " otherwise we add "en ".
            return idx === 0
              ? (tempDescription += `${t.with} ${side.name[language]} `)
              : (tempDescription += `${t.and} ${side.name[language]} `);
          });
        }
      }

      // We add the tempDescription to the description object.
      description[language] = tempDescription;
    });

    // We add the item to the cart.
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id,
        qwt,
        options: selectedOptions,
        sides: selectedSides,
        name,
        description,
        price,
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
      <div className="p-4 flex justify-between items-center shadow-sm border-b">
        <h1 className="text-xl font-semibold">{item.name[t.locale]}</h1>
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
