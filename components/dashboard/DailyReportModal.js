import { useState, useEffect } from "react";
import receiptline from "receiptline";
// Firebase imports
import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
// Icon imports
import ReportIcon from "@/icons/ReportIcon";
import LoadingIcon from "@/icons/LoadingIcon";
// Component imports
import IconBtn from "@/components/IconBtn";
import Modal from "@/components/Modal";
// Function Imports
import calculateVat from "@/functions/calculateVat";
import euro from "@/functions/euro";

const DailyReportModal = ({ date }) => {
  // State for opening and closing the modal
  const [open, setOpen] = useState(false);
  // We store all the orders here
  const [report, setReport] = useState("");
  // Refresh is to not waste recourse. We don't need to fetch all the orders all the time.
  const [refresh, setRefresh] = useState(false);

  const fetchOrders = async () => {
    console.log("i fetched");
    // We want all the orders that are completed on this day.
    const q = query(
      collection(db, "orders"),
      where("date", "==", date),
      where("completed", "==", true)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());

    // Total revenue
    const revenue = data.reduce((x, y) => x + y.total, 0);
    // Total online payments
    const onlinePayments = data.reduce(
      (x, y) => (y.paymentMethod === "online" ? x + y.total : x),
      0
    );
    // Total card payments in store, online payment is also set to card if they pay with credit card. Didn't know stripe did this.
    const cardPayments = data.reduce((x, y) => {
      if (y.paymentMethod === "in_person" && y.paymentMethodType === "card") {
        return x + y.total;
      } else {
        return x;
      }
    }, 0);

    // This one is easier we just need to check paymentMethodType if that one is cash or not but we do it just in case.
    const cashPayments = data.reduce((x, y) => {
      if (y.paymentMethod === "in_person" && y.paymentMethodType === "cash") {
        return x + y.total;
      } else {
        return x;
      }
    }, 0);

    const vat = data.reduce(
      (x, y) => {
        // z returns the vat of the current order
        const z = calculateVat(y);
        // We add the vat of current order with the vat that is store in x.
        return {
          low: x.low + z.low,
          high: x.high + z.high,
          zero: x.zero + z.zero,
        };
      },
      { low: 0, high: 0, zero: 0 }
    );

    const lowBTW = Math.round((vat.low / 109) * 9);
    const highBTW = Math.round((vat.high / 121) * 21);

    const markup = `
    "^^^^New Hong Kong

    Havenstraat 13  
    2211EE Noordwijkerhout
    0252 37 29 02
    5 februari 2024

    ^^^OMZET AFHAAL

    BTW       | omzet|              BTW    
    geen 0%   | ${euro(vat.zero)}|  ${euro(0)}   
    laag 9%   | ${euro(vat.low)}|   ${euro(lowBTW)}
    hoog 21%  | ${euro(vat.high)}|  ${euro(highBTW)}
    ------------------------------------------------
    "totaal   | ${euro(revenue)}|   ${euro(lowBTW + highBTW)}

    Betaalwijze
    online | ${euro(onlinePayments)}
    pinnen | ${euro(cardPayments)}
    cash | ${euro(cashPayments)}

`;

    const svg = receiptline.transform(markup, {
      cpl: 46,
      encoding: "cp936",
      spacing: true,
    });

    setReport(svg);

    setRefresh(false);
  };

  useEffect(() => {
    if (open && refresh) {
      fetchOrders();
    }
  }, [open, date, refresh]);

  return (
    <>
      <IconBtn onClick={() => setOpen((prev) => !prev)}>
        <ReportIcon />
      </IconBtn>
      <Modal
        toggle={open}
        close={() => setOpen(false)}
        className="bg-white max-w-xl w-full rounded-lg overflow-hidden text-sm mx-2"
      >
        <div className="flex items-center justify-between p-4 shadow border-b">
          <h2 className="text-lg font-normal">Daily Report</h2>
          <IconBtn
            onClick={() => {
              setRefresh(true);
            }}
          >
            <LoadingIcon />
          </IconBtn>
        </div>
        <div
          className="flex bg-neutral-50 w-full justify-center"
          dangerouslySetInnerHTML={{ __html: report }}
        />
      </Modal>
    </>
  );
};

export default DailyReportModal;
