// Icon imports
import PrintIcon from "@/icons/PrintIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
import CashIcon from "@/icons/CashIcon";

const PaymentMenu = ({ setMainCategory, mainCategory, table, buttonStyle }) => {
  if (mainCategory === "checkout") {
    return (
      <>
        <button
          className={`${buttonStyle} col-span-2 flex items-center justify-center gap-2`}
        >
          <PrintIcon />
          afdrukken
        </button>
        <button
          className={`${buttonStyle} flex items-center justify-center gap-2 ${
            table.paymentMethodType === "cash"
              ? "border-main text-main selected"
              : ""
          }`}
        >
          <CashIcon
            className={`${
              table.paymentMethodType === "cash" ? "fill-main" : ""
            }`}
          />
          contant
        </button>
        <button
          className={`${buttonStyle} flex items-center justify-center gap-2 ${
            table.paymentMethodType === "card"
              ? "borer-main text-main selected"
              : ""
          }`}
        >
          <CreditCardIcon
            className={`${
              table.paymentMethodType === "card" ? "fill-main" : ""
            }`}
          />
          pinnen
        </button>
      </>
    );
  }

  if (mainCategory === false) {
    return (
      <button
        onClick={() => {
          setMainCategory("checkout");
          // TO DO: set main category to pay mode
          // in this pay mode we can select the amount the client pays and the tip amount
          // in this pay mode we can also select payment method
          // we can also reprint the receipt
          // TO DO: print receipt
        }}
        type="button"
        className={`${buttonStyle} flex items-center justify-center gap-2 col-span-2`}
      >
        <CashIcon />
        naar betalen
      </button>
    );
  }
};

export default PaymentMenu;
