// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";

const Payment = () => {
  const {
    dispatch,
    cartState: { paymentMethod, delivery },
  } = useCart();
  const t = useI18n();

  const btnStyle =
    "flex items-center justify-center text-sm py-2 focus:outline-none font-medium w-1/2 border transition-colors duration-200 ease-in-out";

  return (
    <>
      <h2 className="text-xl font-medium mt-4 mb-2">{t.payment_method}</h2>
      <div className="flex justify-between">
        {/* This button sets delivery to false which means the customer will pcik up the order */}
        <button
          onClick={() =>
            dispatch({ type: "SET_PAYMENT_METHOD", payload: "in_person" })
          }
          type="button"
          className={`${btnStyle} rounded-l-md ${
            paymentMethod === "in_person"
              ? "bg-neutral-100"
              : "shadow-md bg-white"
          }`}
        >
          <span className="material-symbols-rounded mr-3">point_of_sale</span>
          {delivery === true ? t.cash : t.at_store}
        </button>
        {/* This button sets delivery to true which means the order will be delivered. */}
        <button
          onClick={() =>
            dispatch({ type: "SET_PAYMENT_METHOD", payload: "online" })
          }
          type="button"
          className={`${btnStyle} rounded-r-md ${
            paymentMethod === "online" ? "bg-neutral-100" : "shadow-md bg-white"
          }`}
        >
          <span className="material-symbols-rounded mr-3">credit_card</span>
          {t.online}
          Online
        </button>
      </div>
    </>
  );
};

export default Payment;
