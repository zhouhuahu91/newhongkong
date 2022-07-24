// React imports
import { useRef, useEffect, useState } from "react";
// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
import Image from "next/image";
// Component imports
import StoreIcon from "@/icons/StoreIcon";
import CashIcon from "@/icons/CashIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";

const Payment = () => {
  // Online payment button has too many icons when button width.
  // We need the width of the button to see when we should remove icons.
  const [buttonWidth, setButtonWidth] = useState(undefined);
  const {
    dispatch,
    cartState: { paymentMethod, delivery },
  } = useCart();
  const t = useI18n();
  const el = useRef();

  // This useEffect updates the button width.
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      if (el.current) {
        setButtonWidth(el.current.offsetWidth);
      }
    };
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <h2 className="text-lg font-normal mt-4 mb-2">{t.payment_method}</h2>
      <div className="flex space-x-2">
        {/* This button sets delivery to false which means the customer will pcik up the order */}
        <button
          onClick={() =>
            dispatch({ type: "SET_PAYMENT_METHOD", payload: "in_person" })
          }
          type="button"
          className={`pick-up-deliver ${
            paymentMethod === "in_person"
              ? "border-main selected text-main"
              : "text-gray-500"
          }`}
        >
          <div className="flex items-center space-x-1 text-inherit">
            {delivery === true ? (
              <CashIcon
                size="18"
                className={`${
                  paymentMethod === "in_person" ? "fill-main" : "fill-gray-500"
                }`}
              />
            ) : (
              <StoreIcon
                size="18"
                className={`${
                  paymentMethod === "in_person" ? "fill-main" : "fill-gray-500"
                }`}
              />
            )}
          </div>
          {delivery === true ? t.cash : t.at_store}
        </button>
        {/* This button sets delivery to true which means the order will be delivered. */}
        <button
          ref={el}
          onClick={() =>
            dispatch({ type: "SET_PAYMENT_METHOD", payload: "online" })
          }
          type="button"
          className={`pick-up-deliver ${
            paymentMethod === "online" && "border-main selected text-main"
          }`}
        >
          <div className="grid grid-flow-col gap-1 text-gray-500">
            <CreditCardIcon
              size="18"
              className={`${
                paymentMethod === "online" ? "fill-main" : "fill-gray-500"
              }`}
            />
            <Image
              src="/paymentIcons/ideal.svg"
              alt="ideal icon"
              width={17}
              height={17}
            />
            <Image
              src="/paymentIcons/klarna.svg"
              alt="klarna icon"
              width={17}
              height={17}
            />
            <Image
              src="/paymentIcons/giropay.svg"
              alt="giropay icon"
              width={17}
              height={17}
            />
            <Image
              src="/paymentIcons/banconnect.svg"
              alt="banconnect icon"
              width={17}
              height={17}
            />
            {buttonWidth > 150 && (
              <Image
                src="/paymentIcons/przelewy24.svg"
                alt="przelewy24 icon"
                width={17}
                height={17}
              />
            )}
          </div>
          {t.online}
        </button>
      </div>
    </>
  );
};

export default Payment;
