// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
import Image from "next/image";

const Payment = () => {
  const {
    dispatch,
    cartState: { paymentMethod, delivery },
  } = useCart();
  const t = useI18n();

  const btnStyle =
    "flex flex-col p-3 rounded-md text-sm focus:outline-none font-medium w-1/2 border bg-white";

  return (
    <>
      <h2 className="text-lg mt-4 mb-2">{t.payment_method}</h2>
      <div className="flex space-x-2 mt-2">
        {/* This button sets delivery to false which means the customer will pcik up the order */}
        <button
          onClick={() =>
            dispatch({ type: "SET_PAYMENT_METHOD", payload: "in_person" })
          }
          type="button"
          className={`${btnStyle} red-focus-ring ${
            paymentMethod === "in_person" && "border-main border-2 text-main"
          }`}
        >
          <span className="material-symbols-rounded text-inherit">
            {delivery === true ? "account_balance_wallet" : "point_of_sale"}
          </span>
          {delivery === true ? t.cash : t.at_store}
        </button>
        {/* This button sets delivery to true which means the order will be delivered. */}
        <button
          onClick={() =>
            dispatch({ type: "SET_PAYMENT_METHOD", payload: "online" })
          }
          type="button"
          className={`${btnStyle} red-focus-ring ${
            paymentMethod === "online" && "border-main border-2 text-main"
          }`}
        >
          <div className="flex items-center text-inherit">
            <Image src="/ideal.svg" alt="ideal icon" width={24} height={18} />
            <span className="material-symbols-rounded text-inherit mx-1">
              credit_card
            </span>
            <Image src="/giropay.svg" alt="ideal icon" width={26} height={22} />
          </div>

          {t.online}
        </button>
      </div>
    </>
  );
};

export default Payment;
