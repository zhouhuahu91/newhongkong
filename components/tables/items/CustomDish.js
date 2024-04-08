import { useState } from "react";
import euro from "@/functions/euro";
import Switch from "@/components/Switch";
import InfoIcon from "@/icons/InfoIcon";

import { db } from "@/firebase/firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

const CustomDish = ({ mainCategory, setMainCategory, buttonStyle, table }) => {
  const [name, setName] = useState("");
  const [kitchenName, setKitchenName] = useState("");
  const [price, setPrice] = useState(0);
  const [formattedPrice, setFormattedPrice] = useState(euro(0));
  const [msg, setMsg] = useState("");
  // true if btw high
  const [btw, setBtw] = useState(false);

  const resetValues = () => {
    setName("");
    setKitchenName("");
    setPrice(0);
    setFormattedPrice(euro(0));
    setMsg("");
    setBtw(false);
  };

  const addItem = async () => {
    // Now we check if name and kitchen name is populated
    if (name.length < 1) return setMsg("Naam is verplicht");
    if (kitchenName.length < 1) {
      return setMsg("Keuken omschrijving is verplicht");
    }
    setMsg("");

    const ref = doc(db, `tables/${table.id}`);

    const dish = {
      name: {
        nl: name,
        en: "",
        de: "",
        zh: kitchenName,
      },
      description: "",
      id: Date.now().toString(),
      price,
      printed: false,
      optionIsMain: false,
      btw: btw ? 21 : 9,
      qwt: 1,
    };

    await updateDoc(ref, {
      food: arrayUnion(dish),
    });

    resetValues();
    setMainCategory(false);
  };

  // If there is no main category selected we just return the button for beverages.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("aangepast gerecht")}
        type="button"
        className={buttonStyle}
      >
        aangepast gerecht
      </button>
    );
  }

  if (mainCategory === "aangepast gerecht") {
    return (
      <div className="col-span-2 flex flex-col gap-4">
        <div className="font-semibold text-lg">Stel samen</div>
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

        <div className="grid grid-cols-12 gap-4">
          <button
            onClick={() => {
              resetValues();
              setMainCategory(false);
            }}
            type="button"
            className="col-span-5 button border"
          >
            Annuleren
          </button>
          <button
            onClick={() => {
              // If the user hasn't selected delivery or pick up, we open the modal for them to pick one.
              addItem();
            }}
            type="button"
            className="bg-main text-white button col-span-7"
          >
            Toevoegen {euro(price)}
          </button>
        </div>
      </div>
    );
  }
};

export default CustomDish;
