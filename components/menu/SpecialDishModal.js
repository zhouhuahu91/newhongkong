import { useState } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import Switch from "@/components/Switch";
import ForkAndSpoonIcon from "@/icons/ForkAndSpoonIcon";
// Icons imports
import CloseIcon from "@/icons/CloseIcon";
import MinusIcon from "@/icons/MinusIcon";
import InfoIcon from "@/icons/InfoIcon";
import PlusIcon from "@/icons/PlusIcon";
// Function imports
import euro from "@/functions/euro";
// Hook imports
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

// What are the basics for a dish to be added to the cart
// It needs an ID but every ID needs to be different because every special dish is not the same.
// It neews qwt.
// It needs a price * qwt.
// It needs a name, in dutch and chinese for the kitchen.
// We also add some extra empty things just in case we break the app
// We add also remarks
// description
// optionIsMain: false
// selectedOptions: []
// selectedOptionsForPrinter: []
// selectedSides: []
// selectedSidesForPrinter []

const SpecialDishModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [kitchenName, setKitchenName] = useState("");
  const [qwt, setQwt] = useState(1);
  const [price, setPrice] = useState(0);
  const [formattedPrice, setFormattedPrice] = useState(euro(0));
  const [msg, setMsg] = useState("");
  // true if btw high
  const [btw, setBtw] = useState(false);

  const { dispatch } = useCart();
  const { user } = useAuth();

  const resetValues = () => {
    // We reset the values.
    setName("");
    setMsg("");
    setKitchenName("");
    setFormattedPrice(euro(0));
    setPrice(0);
    setQwt(1);
    setBtw(false);
  };

  const addItemToCart = () => {
    // Check if there is a user
    if (!user) return setOpen(false);
    // Check if there is an admin
    if (!user.admin) return setOpen(false);

    // Now we check if name and kitchen name is populated
    if (name.length < 0) return setMsg("Naam is verplicht");
    if (kitchenName.length < 1) {
      return setMsg("Keuken omschrijving is verplicht");
    }

    setMsg("");

    // price can be zero if needed be.
    dispatch({
      type: "ADD_ITEM",
      payload: {
        item: {
          name: {
            nl: name,
            en: "",
            de: "",
            zh: kitchenName,
          },
          description: {
            nl: name,
            en: "",
            de: "",
            zh: kitchenName,
          },
          id: Date.now().toString(),
          price,
          optionIsMain: false,
          btw: btw ? 21 : 9,
        },
        selectedOptions: [],
        selectedSides: [],
        qwt,
        remarks: "",
      },
    });
    resetValues();
    setOpen(false);
  };

  return (
    <>
      <IconBtn onClick={() => setOpen(true)}>
        <ForkAndSpoonIcon className="fill-gray-200 hover:fill-main" />
      </IconBtn>
      <Modal
        toggle={open}
        close={() => {
          setOpen(false);
          resetValues();
        }}
        className="bg-white h-auto w-full mx-2 max-w-sm rounded-lg relative flex flex-col overflow-hidden select-none"
      >
        {/* Container for the title */}
        <div className="p-4 flex justify-between items-center shadow border-b">
          <div className="flex items-center">
            <h1
              tabIndex="0"
              className="text-lg capitalize font-semibold mr-2 focus:outline-none"
            >
              Stel samen
            </h1>
          </div>
          <IconBtn onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconBtn>
        </div>
        {/* Container for the inputs */}
        <div className="bg-gray-50 p-4 flex gap-1 flex-col">
          {msg && (
            <span className="flex items-center text-sm border w-full p-2 bg-yellow-100">
              <InfoIcon className="mr-2 fill-main" />
              {msg}
            </span>
          )}
          <div>
            <label htmlFor="name" className="label">
              Naam
            </label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nameForKitchen" className="label">
              Keuken omschrijving
            </label>
            <input
              id="nameForKitchen"
              className="input"
              value={kitchenName}
              onChange={(e) => setKitchenName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="label">
              Prijs
            </label>
            <input
              id="price"
              className="input remove-arrow"
              value={formattedPrice}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                const number = value === "" ? 0 : parseInt(value, 10);
                setFormattedPrice(euro(number));
                setPrice(number);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="btw" className="label mb-0.5">
              {btw ? "21% btw" : "9% btw"}
            </label>
            <Switch toggle={btw} onClick={() => setBtw((prev) => !prev)} />
          </div>
          <div className="flex items-center justify-evenly relative h-8 mt-2">
            <IconBtn onClick={() => setQwt((qwt) => (qwt > 1 ? qwt - 1 : qwt))}>
              <MinusIcon className="fill-main" />
            </IconBtn>
            <div className="text-2xl font-semibold absolute">{qwt}</div>
            <IconBtn onClick={() => setQwt((qwt) => qwt + 1)}>
              <PlusIcon className="fill-main" />
            </IconBtn>
          </div>
        </div>
        {/* Container for add and cancel */}
        <div className="p-4 shadow grid grid-cols-12 gap-4">
          <button
            onClick={() => {
              resetValues();
              setOpen(false);
            }}
            type="button"
            className="col-span-5 button border"
          >
            Annuleren
          </button>
          <button
            onClick={() => {
              // If the user hasn't selected delivery or pick up, we open the modal for them to pick one.
              addItemToCart();
            }}
            type="button"
            className="bg-main text-white button col-span-7"
          >
            Toevoegen {euro(price * qwt)}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SpecialDishModal;
