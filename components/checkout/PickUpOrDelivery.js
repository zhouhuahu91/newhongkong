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
    "flex flex-col p-3 rounded-md text-sm focus:outline-none font-medium w-1/2 border bg-white";

  return (
    <>
      <h2 className="text-lg mb-2 font-normal">{t.pickup_delivery}</h2>
      <div className="flex space-x-2">
        {/* This button sets delivery to false which means the customer will pcik up the order */}
        <button
          onClick={() => dispatch({ type: "SET_DELIVERY", payload: false })}
          type="button"
          className={`${btnStyle} red-focus-ring ${
            delivery === false && "border-main border-2 text-main"
          }`}
        >
          <span className="material-symbols-rounded text-inherit">store</span>
          {t.pick_up}
        </button>
        {/* This button sets delivery to true which means the order will be delivered. */}
        <button
          onClick={() => dispatch({ type: "SET_DELIVERY", payload: true })}
          type="button"
          className={`${btnStyle} red-focus-ring ${
            delivery === true && "border-main border-2 text-main"
          }`}
        >
          <span className="material-symbols-rounded text-inherit">
            pedal_bike
          </span>
          {t.delivery}
        </button>
      </div>
    </>
  );
};

export default PickUpOrDelivery;
