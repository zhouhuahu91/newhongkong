import { useState, useEffect } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
// Icon imports
import ReportIcon from "@/icons/ReportIcon";
import PrintIcon from "@/icons/PrintIcon";
import CloseIcon from "@/icons/CloseIcon";
import LoadingIcon from "@/icons/LoadingIcon";
// Component imports
import IconBtn from "@/components/IconBtn";
import Modal from "@/components/Modal";
// Function Imports
import { summarize } from "@/functions/ledger";
import euro from "@/functions/euro";
import {
  dailyReport,
  renderReceipt,
  svgToPrintContent,
} from "@/functions/receipts";
import { queuePrintJob, PRINTER_BUSY_MESSAGE } from "@/hooks/usePrintQueue";
import Snackbar from "@/components/Snackbar";

const DailyReportModal = ({ date, printJobs, orders }) => {
  // State for opening and closing the modal
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [tables, setTables] = useState([]);

  // // This useEffect fetches all tables from firestore
  useEffect(() => {
    const fetchTables = async () => {
      const q = query(
        collection(db, "tables"),
        where("paid", "==", true),
        where("date", "==", date),
      );
      const snapshot = await getDocs(q);
      const raw = snapshot.docs.map((doc) => doc.data());
      setTables(raw);
    };
    if (open) {
      fetchTables();
    }
  }, [open, date]);

  // summarize() keeps only countable orders and paid tables, then returns the
  // revenue, the cash/card/online/op rekening split and the VAT split per channel.
  const summary = summarize(orders, tables);
  const revenue = summary.totals.takeaway;
  const revenueTables = summary.totals.restaurant;
  const markup = dailyReport(summary, date);

  const report = renderReceipt(markup);

  return (
    <>
      <button
        className="flex items-center px-3 button border bg-main"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ReportIcon className="fill-white" />
        <span className="font-bold ml-2 text-base text-white">
          {euro(revenue + revenueTables)}
        </span>
      </button>
      <Modal
        toggle={open}
        close={() => setOpen(false)}
        className="bg-white max-w-2xl rounded-lg text-sm mx-2 overflow-scroll"
      >
        <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
        <div className="flex items-center justify-between p-4 shadow border-b">
          <h2 className="text-lg font-medium">Dagrapport</h2>
          <IconBtn
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconBtn>
        </div>
        <div
          style={{ maxHeight: "calc(100vh - 265px)" }}
          className="flex bg-neutral-50 w-full justify-center p-10 max-w-md overflow-scroll"
          dangerouslySetInnerHTML={{ __html: report }}
        />
        <div className="w-full bg-white p-4 border-t">
          <button
            disabled={printJobs.length > 0}
            onClick={async () => {
              // `report` is the preview SVG, so it isn't rendered a second time.
              const ok = await queuePrintJob(
                date,
                "dailyReport",
                svgToPrintContent(report),
              );
              if (!ok) setSnackbar(PRINTER_BUSY_MESSAGE);
            }}
            className="button w-full border gap-2"
          >
            afdrukken
            {printJobs.length > 0 ? (
              <LoadingIcon className="animate-spin " />
            ) : (
              <PrintIcon className="" />
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DailyReportModal;
