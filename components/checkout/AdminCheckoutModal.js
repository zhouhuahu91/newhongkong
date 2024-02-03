import { useState } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import CashIcon from "@/icons/CashIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
// Hook imports
import { useCart } from "@/hooks/useCart";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Function imports
import calculateTotalCartPrice from "@/functions/calculateTotalCartPrice";
import euro from "@/functions/euro";
import getCurrentDate from "@/functions/getCurrentDate";
import getCurrentTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
// Firebase imports
import { db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

const AdminCheckoutModal = ({ open, setOpen }) => {
  const { cartState, dispatch } = useCart();
  const { storeFees } = useStoreInfo();

  const [processing, setProcessing] = useState(false);
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentMethodType, setPaymentMethodType] = useState(null);
  const [errors, setErrors] = useState({});

  const onSubmit = async (paid) => {
    // If name is not filled in we return with error.
    if (name.length === 0) {
      return setErrors((prev) => ({ ...prev, name: "Is verplicht" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }

    setProcessing(true);
    const order = {
      ...cartState,
      name,
      remarks,
      paid,
      paymentMethodType,
      paymentMethod: "in_person",
      time: getCurrentTime(getCurrentTimeInSeconds()),
      total: calculateTotalCartPrice(cartState, storeFees),
      canceled: false,
      printed: false,
      ready: false,
      mailSent: false,
      completed: false,
      delivery: false,
      date: getCurrentDate(),
      createdAt: Date.now(),
      storeFees,
      // all this information below is useless but we add it just in case we break the app.
      saveRemarks: false,
      tel: "0252372902",
      email: "info@newhongkong.nl",
      postalcode: "2211EE",
      houseNumber: "13",
      addition: "",
      address: {},
      user: "guest",
    };
    try {
      await addDoc(collection(db, "orders"), order);
      // If it is a succes we reset every state
      setName("");
      setRemarks("");
      setPaymentMethodType("");
      setProcessing(false);
      setErrors({});
      // We clear the cart and close the modal
      dispatch({ type: "RESET_CART" });
      setOpen(false);
    } catch (e) {
      // If error we log the message.
      console.log(e.message);
    }
  };

  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="bg-white w-full max-w-md rounded-lg mx-2 overflow-hidden"
    >
      <div className="flex p-4 justify-between items-center border-b">
        <h1 className="font-semibold text-lg">Afhaal</h1>
        <IconBtn onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconBtn>
      </div>
      <div className="bg-neutral-50 p-4">
        <div>
          <label htmlFor="name" className="text-gray-500 text-sm">
            Naam
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Verplicht"
            className="appearance-none my-0.5 border rounded-md w-full text-sm focus:outline-none red-focus-ring py-2 px-3"
          />
          <label htmlFor="name" className="text-red-400 text-sm">
            {errors.name}
          </label>
        </div>
        <div>
          <label htmlFor="remarks" className="text-sm text-gray-500">
            Opmerkingen
          </label>
          <textarea
            className={`h-20 appearance-none my-0.5 border rounded-lg w-full text-sm py-2 px-3 focus:outline-none red-focus-ring`}
            type="text"
            id="remarks"
            value={remarks}
            placeholder="Optioneel"
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <div>
          <span className="text-sm text-gray-500">Betaalmethode</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setPaymentMethodType("cash")}
              type="button"
              className={`pick-up-deliver ${
                paymentMethodType === "cash"
                  ? "border-main selected text-main"
                  : "text-gray-500"
              }`}
            >
              <div className="flex items-center space-x-1 text-inherit">
                <CashIcon
                  size="18"
                  className={`${
                    paymentMethodType === "cash" ? "fill-main" : "fill-gray-500"
                  }`}
                />
              </div>
              Contant
            </button>
            <button
              onClick={() => setPaymentMethodType("card")}
              type="button"
              className={`pick-up-deliver ${
                paymentMethodType === "card"
                  ? "border-main selected text-main"
                  : "text-gray-500"
              }`}
            >
              <div className="flex items-center space-x-1 text-inherit">
                <CreditCardIcon
                  size="18"
                  className={`${
                    paymentMethodType === "card" ? "fill-main" : "fill-gray-500"
                  }`}
                />
              </div>
              Pinnen
            </button>
          </div>
          <label htmlFor="name" className="text-red-400 text-sm">
            {errors.paymentMethodType}
          </label>
        </div>
      </div>
      <div className="flex bg-white p-4 border-t gap-2">
        <button
          disabled={processing}
          onClick={() => {
            if (paymentMethodType === null) {
              return setErrors((prev) => ({
                ...prev,
                paymentMethodType: "Is verplicht",
              }));
            }
            onSubmit(true);
          }}
          type="button"
          className="button bg-main text-white w-3/5"
        >
          Direct afrekenen {euro(calculateTotalCartPrice(cartState, storeFees))}
        </button>
        <button
          disabled={processing}
          onClick={() => onSubmit(false)}
          type="button"
          className="button border w-2/5"
        >
          Straks afrekenen
        </button>
      </div>
    </Modal>
  );
};

export default AdminCheckoutModal;
