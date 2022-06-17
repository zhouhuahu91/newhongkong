// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";

const PickUpOrDelivery = () => {
  const {
    dispatch,
    cartState: { delivery },
  } = useCart();
  const t = useI18n();

  // Style of the button.
  const btnStyle =
    "flex items-center justify-center text-sm py-2 focus:outline-none font-medium w-1/2 border transition-colors duration-200 ease-in-out";

  return (
    <>
      <h2 className="text-lg mt-2 my-4">{t.pickup_delivery}</h2>
      <div className="flex justify-between my-2">
        {/* This button sets delivery to false which means the customer will pcik up the order */}
        <button
          onClick={() => dispatch({ type: "SET_DELIVERY", payload: false })}
          type="button"
          className={`${btnStyle} rounded-l-md ${
            delivery === false ? "bg-neutral-100" : "shadow-md bg-white"
          }`}
        >
          <span className="material-symbols-rounded mr-3">store</span>
          {t.pick_up}
        </button>
        {/* This button sets delivery to true which means the order will be delivered. */}
        <button
          onClick={() => dispatch({ type: "SET_DELIVERY", payload: true })}
          type="button"
          className={`${btnStyle} rounded-r-md ${
            delivery === true ? "bg-neutral-100" : "shadow-md bg-white"
          }`}
        >
          <span className="material-symbols-rounded mr-3">pedal_bike</span>
          {t.delivery}
        </button>
      </div>
    </>
  );
};

export default PickUpOrDelivery;
