import { useState } from "react";
import receiptline from "receiptline";
// Firebase imports
import { db } from "@/firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
// Icon imports
import ReportIcon from "@/icons/ReportIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import PrintIcon from "@/icons/PrintIcon";
import CloseIcon from "@/icons/CloseIcon";
// Component imports
import IconBtn from "@/components/IconBtn";
import Modal from "@/components/Modal";
// Function Imports
import calculateVat from "@/functions/calculateVat";
import euro from "@/functions/euro";

const DailyReportModal = ({ date, printJobs, orders }) => {
  // State for opening and closing the modal
  const [open, setOpen] = useState(false);

  // Total revenue
  const revenue = orders.reduce((x, y) => x + y.total, 0);
  // Total online payments
  const onlinePayments = {};
  orders.forEach((order) => {
    if (order.paymentMethod === "online") {
      if (onlinePayments[`${order.paymentMethodType}`] > 0) {
        onlinePayments[`${order.paymentMethodType}`] += order.total;
      } else {
        onlinePayments[`${order.paymentMethodType}`] = order.total;
      }
    }
  });

  // Total card payments in store, online payment is also set to card if they pay with credit card. Didn't know stripe did this.
  const cardPayments = orders.reduce((x, y) => {
    if (y.paymentMethod === "in_person" && y.paymentMethodType === "card") {
      return x + y.total;
    } else {
      return x;
    }
  }, 0);

  // This one is easier we just need to check paymentMethodType if that one is cash or not but we do it just in case.
  const cashPayments = orders.reduce((x, y) => {
    if (y.paymentMethod === "in_person" && y.paymentMethodType === "cash") {
      return x + y.total;
    } else {
      return x;
    }
  }, 0);

  const vat = orders.reduce(
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

  let markup = `
    "^^^^New Hong Kong

    Havenstraat 13  
    2211EE Noordwijkerhout
    0252 37 29 02
    info@newhongkong.nl

    -
    dagrapport | ${date}
    -

    "afhaal     | "omzet|             "btw  
    laag 9%     | ${euro(vat.low)}|   ${euro(lowBTW)}  
    hoog 21%    | ${euro(vat.high)}|  ${euro(highBTW)}
    geen 0%     | ${euro(vat.zero)}|  ${euro(0)}   
    ------------------------------------------------
    "           | "${euro(revenue)}|  "${euro(lowBTW + highBTW)}

    "restaurant | "omzet|             "btw  
    laag 9%     | €~~~~~~~~~|        €~~~~~~~~~|         
    hoog 21%    | €~~~~~~~~~|        €~~~~~~~~~|           
    geen 0%     | €~~~~~~~~~|        ${euro(0)}   
    ------------------------------------------------
    "           | "€~~~~~~~~~|       "€~~~~~~~~~|

    
                       ^^totaal afhaal ${euro(revenue)}|
                   ^^totaal restaurant €_~~~~~~~~~~~~~~|
                              ^^"totaal €~~~~~~~~~~~~~~| 



    |"betaalwijze | "afhaal|                "restaurant
    |cash         | ${euro(cashPayments)}|  €~~~~~~~~~|
    |pinnen       | ${euro(cardPayments)}|  €~~~~~~~~~|
`;

  for (const type in onlinePayments) {
    markup += `|${type.replace("_", " ")} | ${euro(
      onlinePayments[type]
    )}| ${euro(0)}
      `;
  }

  const report = receiptline.transform(markup, {
    cpl: 46,
    encoding: "cp936",
    spacing: true,
  });

  return (
    <>
      <IconBtn onClick={() => setOpen((prev) => !prev)}>
        <ReportIcon />
      </IconBtn>
      <Modal
        toggle={open}
        close={() => setOpen(false)}
        className="bg-white max-w-2xl w-full rounded-lg text-sm mx-2 max-h-[900px] overflow-scroll"
      >
        <div className="flex items-center justify-between p-4 shadow border-b">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-normal">Daily Report</h2>
            <IconBtn
              onClick={async () => {
                // Check if printer is busy
                if (printJobs.length > 0) return;
                // We cant' send the svg so we convert it to a base 64 string
                const buffer = Buffer.from(report);
                const base64String = buffer.toString("base64");
                await setDoc(doc(db, "printer", date), {
                  type: "dailyReport",
                  printContent: base64String,
                });
              }}
            >
              <PrintIcon />
            </IconBtn>
          </div>
          <IconBtn
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconBtn>
        </div>
        <div
          className="flex bg-neutral-50 w-full justify-center pt-10 pb-20"
          dangerouslySetInnerHTML={{ __html: report }}
        />
      </Modal>
    </>
  );
};

export default DailyReportModal;
