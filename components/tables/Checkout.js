// Icon imports
import PrintIcon from "@/icons/PrintIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
import CashIcon from "@/icons/CashIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import ReceiptIcon from "@/icons/ReceiptIcon";
import IconBtn from "@/components/IconBtn";

// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { tableReceipt, toPrintContent } from "@/functions/receipts";
import usePrintQueue, {
  queuePrintJob,
  PRINTER_BUSY_MESSAGE,
} from "@/hooks/usePrintQueue";
import Snackbar from "@/components/Snackbar";
import { useState } from "react";

const Checkout = ({
  setMainCategory,
  mainCategory,
  table,
  buttonStyle,
  justIcon,
  setOpen,
}) => {
  const { jobs: printJobs } = usePrintQueue();
  const [snackbar, setSnackbar] = useState(false);

  // Returns true when the bill was sent to the printer.
  const printReceipt = async () => {
    const ok = await queuePrintJob(
      table.id,
      "tableReceipt",
      toPrintContent(tableReceipt(table)),
    );
    if (!ok) setSnackbar(PRINTER_BUSY_MESSAGE);
    return ok;
  };

  if (justIcon) {
    return (
      <>
        <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        <IconBtn
          disabled={printJobs.length}
          onClick={async () => {
            setMainCategory("checkout");
            updateDoc(doc(db, `tables/${table.id}`), {
              wantsToPay: true,
            });
            if (await printReceipt()) setOpen(false);
          }}
        >
          {printJobs.length ? (
            <LoadingIcon className="animate-spin fill-main" />
          ) : (
            <ReceiptIcon className="fill-inherit" />
          )}
        </IconBtn>
      </>
    );
  }

  if (mainCategory === "checkout") {
    return (
      <>
        <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        <button
          disabled={printJobs.length}
          onClick={() => printReceipt()}
          className={`${buttonStyle} col-span-2 flex items-center justify-center gap-2`}
        >
          {table.printed && "opnieuw"} afdrukken
          {printJobs.length ? (
            <LoadingIcon className="animate-spin fill-main" />
          ) : (
            <PrintIcon className="fill-inherit" />
          )}
        </button>
        <button
          onClick={() => {
            updateDoc(doc(db, `tables/${table.id}`), {
              paid: true,
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
            size="20"
            className={`fill-inherit ${
              table.paymentMethodType === "card" ? "fill-main" : ""
            }`}
          />
          pinnen
        </button>
        <button
          onClick={() => {
            updateDoc(doc(db, `tables/${table.id}`), {
              paid: true,
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
            size="20"
            className={`fill-inherit ${
              table.paymentMethodType === "cash" ? "fill-main" : ""
            }`}
          />
          contant
        </button>
      </>
    );
  }

  if (mainCategory === false) {
    return (
      <button
        onClick={() => {
          setMainCategory("checkout");
          updateDoc(doc(db, `tables/${table.id}`), {
            wantsToPay: true,
          });
        }}
        type="button"
        className={`${buttonStyle} flex items-center justify-center gap-2 col-span-2`}
      >
        <CashIcon size="20" className="fill-inherit" />
        naar betalen
      </button>
    );
  }
};

export default Checkout;
