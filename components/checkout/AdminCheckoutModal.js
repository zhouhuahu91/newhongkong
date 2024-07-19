import { useState, useRef, useEffect } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import CashIcon from "@/icons/CashIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
import Cart from "@/components/cart/Cart";
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
  const [errors, setErrors] = useState({});

  const ref = useRef();

  useEffect(() => {
    if (open && ref.current) {
      ref.current.scrollIntoView();
    }
  }, [open]);

  const onSubmit = async (paid, paymentMethodType) => {
    setProcessing(true);
    const order = {
      ...cartState,
      name: name.length > 0 ? name : "afhaal",
      remarks,
      paid,
      paymentMethodType,
      paymentMethod: "in_person",
      time: getCurrentTime(getCurrentTimeInSeconds()),
      total: calculateTotalCartPrice(cartState, storeFees),
      canceled: false,
      printed: false,
      // We set ready true so that we know the order is placed locally
      ready: true,
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
      <div className="flex p-4 justify-between items-center border-b shadow">
        <h1 className="font-semibold text-lg">Afrekenen</h1>
        <IconBtn onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconBtn>
      </div>
      <div
        style={{ maxHeight: "calc(100vh - 265px)" }}
        className="p-4 overflow-scroll bg-neutral-50"
      >
        <Cart />
        <div ref={ref}>
          <label htmlFor="name" className="text-gray-500 text-sm">
            Naam
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Optioneel"
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
      </div>
      <div className="flex bg-white p-4 border-t gap-2 shadow">
        <button
          disabled={processing}
          onClick={() => onSubmit(true, "card")}
          type="button"
          className="button bg-main text-white w-full gap-2"
        >
          <CreditCardIcon size="18" className="fill-white" /> Pinnen
        </button>
        <button
          disabled={processing}
          onClick={() => onSubmit(true, "cash")}
          type="button"
          className="button border w-full gap-2"
        >
          <CashIcon size="18" className="fill-green-800" /> Contant
        </button>
        <button
          disabled={processing}
          onClick={() => onSubmit(false, null)}
          type="button"
          className="button border w-full"
        >
          Niet betaald
        </button>
      </div>
    </Modal>
  );
};

export default AdminCheckoutModal;
