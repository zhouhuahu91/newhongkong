// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Component imports
import PedalBikeIcon from "@/icons/PedalBikeIcon";
import StoreIcon from "@/icons/StoreIcon";
import InfoIcon from "@/icons/InfoIcon";

const PickUpOrDelivery = () => {
  const {
    dispatch,
    cartState: { delivery },
  } = useCart();
  const t = useI18n();
  const {
    deliveryEndedWhileStoreOpen,
    storeInfo: { openForDelivery },
  } = useStoreInfo();

  return (
    <>
      <h2 className="text-lg mb-2 font-normal">{t.pickup_delivery}</h2>
      {(deliveryEndedWhileStoreOpen || !openForDelivery) && (
        <div className="bg-amber-50 p-2 border text-sm mb-4 flex items-center">
          <span className="w-6 mr-1">
            <InfoIcon className="fill-main" />
          </span>
          {t.closed_for_delivery}
        </div>
      )}
      <div className="flex space-x-2">
        {/* This button sets delivery to false which means the customer will pcik up the order */}
        <button
          onClick={() => dispatch({ type: "SET_DELIVERY", payload: false })}
          type="button"
          className={`pick-up-deliver ${
            delivery === false
              ? "border-main selected text-main"
              : "text-gray-500"
          }`}
        >
          <StoreIcon
            size="18"
            className={`${delivery === false ? "fill-main" : "fill-gray-500"}`}
          />
          {t.pick_up}
        </button>
        {/* This button sets delivery to true which means the order will be delivered. */}
        {openForDelivery && !deliveryEndedWhileStoreOpen && (
          <button
            onClick={() => dispatch({ type: "SET_DELIVERY", payload: true })}
            type="button"
            disabled={!openForDelivery}
            className={`pick-up-deliver ${
              delivery === true
                ? "border-main selected text-main"
                : "text-gray-500"
            }`}
          >
            <PedalBikeIcon
              size="18"
              className={`${delivery === true ? "fill-main" : "fill-gray-500"}`}
            />
            {t.delivery}
          </button>
        )}
      </div>
      {delivery === false && (
        <div className="text-sm text-gray-600 col-span-12 mt-2">
          Havenstraat 13, 2211EE Noordwijkerhout
        </div>
      )}
    </>
  );
};

export default PickUpOrDelivery;
