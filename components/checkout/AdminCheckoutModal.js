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

const AdminCheckoutModal = ({ open, setOpen }) => {
  const { cartState, dispatch } = useCart();
  const { storeFees } = useStoreInfo();

  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentMethodType, setPaymentMethodType] = useState(
    cartState.paymentMethod
  );

  // When AdminCart starts up we need to set a few settings to default.
  // AdminCart is used for orders placed in the store.
  // delivery is always === false
  if (cartState.delivery !== false && open) {
    dispatch({ type: "SET_DELIVERY", payload: false });
  }
  // paymentMethod === "in_person"
  if (cartState.paymentMethod !== "in_person" && open) {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: "in_person" });
  }

  const onSubmit = () => {
    const order = {
      ...cartState,
      name,
      remarks,
      time: "",
      total: calculateTotalCartPrice(cartState, storeFees),
      // all this information is useless but we add it just in case we break the app.
      tel: "0252372902",
      email: "info@newhongkong.nl",
      postalcode: "2211EE",
      houseNumber: "13",
      addition: "",
      user: "guest",
    };
    console.log(cartState);
    console.log("submitted");
  };

  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="bg-white w-full max-w-md rounded-lg mx-2 overflow-hidden"
    >
      <div className="flex p-4 justify-between items-center border-b">
        <h1 className="font-semibold text-lg">Bestellen</h1>
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
        </div>
      </div>
      <div className="bg-white p-3 border-t">
        <button
          onClick={() => onSubmit()}
          type="button"
          className="button w-full bg-main text-white"
        >
          Betalen en bestelling plaatsen{" "}
          {euro(calculateTotalCartPrice(cartState, storeFees))}
        </button>
      </div>
    </Modal>
  );
};

export default AdminCheckoutModal;
