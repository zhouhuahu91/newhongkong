import { useState } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import CashIcon from "@/icons/CashIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
// Hook imports
import { useCart } from "@/hooks/useCart";

const AdminCheckoutModal = ({ open, setOpen }) => {
  const { cartState } = useCart();
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentMethodType, setPaymentMethodType] = useState(
    cartState.paymentMethod
  );

  const onSubmit = () => {
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
          Bestelling plaatsen
        </button>
      </div>
    </Modal>
  );
};

export default AdminCheckoutModal;
