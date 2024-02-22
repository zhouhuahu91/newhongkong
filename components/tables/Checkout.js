// Icon imports
import PrintIcon from "@/icons/PrintIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
import CashIcon from "@/icons/CashIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const Checkout = ({ setMainCategory, mainCategory, table, buttonStyle }) => {
  if (mainCategory === "checkout") {
    return (
      <>
        <button
          onClick={() => {
            // TO DO: Print the receipt
            updateDoc(doc(db, `tables/${table.id}`), {
              printed: true,
            });
          }}
          className={`${buttonStyle} col-span-2 flex items-center justify-center gap-2`}
        >
          <PrintIcon />
          {table.printed && "opnieuw"} afdrukken
        </button>
        <button
          onClick={() => {
            updateDoc(doc(db, `tables/${table.id}`), {
              paymentMethodType: "cash",
            });
          }}
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
          onClick={() => {
            updateDoc(doc(db, `tables/${table.id}`), {
              paymentMethodType: "card",
            });
          }}
          className={`${buttonStyle} flex items-center justify-center gap-2 ${
            table.paymentMethodType === "card"
              ? "border-main text-main selected"
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
        <button
          disabled={table.paid}
          onClick={() => {
            if (!table.paymentMethodType) {
              return window.alert("selecteer betaalmethode");
            }
            updateDoc(doc(db, `tables/${table.id}`), {
              paid: true,
            });
          }}
          className={`button col-span-2 mt-5 uppercase text-white ${
            table.paid ? "bg-gray-300" : "bg-main"
          }`}
        >
          {table.paid ? "is betaald" : "tafel op betaald zetten"}
        </button>
      </>
    );
  }

  if (mainCategory === false) {
    return (
      <button
        onClick={() => {
          setMainCategory("checkout");
          // TO DO: Print the receipt
          updateDoc(doc(db, `tables/${table.id}`), {
            printed: true,
          });
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

export default Checkout;
