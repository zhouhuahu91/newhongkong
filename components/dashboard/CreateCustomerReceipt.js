// Icon imports
import ReceiptIcon from "@/icons/ReceiptIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import { customerReceipt, toPrintContent } from "@/functions/receipts";
import { queuePrintJob, PRINTER_BUSY_MESSAGE } from "@/hooks/usePrintQueue";
import Snackbar from "@/components/Snackbar";
import { useState } from "react";

const CreateCustomerReceipt = ({ order, printerBusy }) => {
  const [snackbar, setSnackbar] = useState(false);
  const printReceipt = async () => {
    const ok = await queuePrintJob(
      order.id,
      "customerReceipt",
      toPrintContent(customerReceipt(order)),
    );
    if (!ok) setSnackbar(PRINTER_BUSY_MESSAGE);
  };

  return (
    <>
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <button
        type="button"
        disabled={printerBusy}
        className="button w-40 border gap-2 text-sm hover:shadow-lg"
        onClick={() => printReceipt()}
      >
        bonnetje{" "}
        {printerBusy ? (
          <LoadingIcon className="animate-spin" />
        ) : (
          <ReceiptIcon className="" />
        )}
      </button>
    </>
  );
};

export default CreateCustomerReceipt;
