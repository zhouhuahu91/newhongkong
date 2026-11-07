import receiptline from "receiptline";
import { useState, useEffect } from "react";
// Icon imports
import PrintIcon from "@/icons/PrintIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
import CashIcon from "@/icons/CashIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import ReceiptIcon from "@/icons/ReceiptIcon";
import IconBtn from "@/components/IconBtn";

// Firebase imports
import { db } from "@/firebase/firebase";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
// Function imports
import euro from "@/functions/euro";
import createStoreLogo from "@/functions/createStoreLogo";
// TODO: DELETE old import below. Replaced by tableTotal() from @/functions/ledger (food + beverages + tip).
// The call in the receipt template below was switched in place: tableTotal(table) → tableTotal(table).
// import calculateTableTotal from "@/functions/calculateTableTotal";
// TODO: DELETE old import below. Replaced by vatByRate() + vatRows() from @/functions/ledger.
// import calculateTableVat from "@/functions/calculateTableVat";
import { vatByRate, vatRows, tableTotal } from "@/functions/ledger";

const Checkout = ({
  setMainCategory,
  mainCategory,
  table,
  buttonStyle,
  justIcon,
  setOpen,
}) => {
  const [printJobs, setPrintJobs] = useState([]);

  // Gets all the id's of printer jobs
  useEffect(() => {
    const printerRef = collection(db, "printer");
    const unsubscribe = onSnapshot(printerRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setPrintJobs(data);
    });

    return () => unsubscribe();
  }, []);

  const printReceipt = async () => {
    // We need to create markup for the receipt
    let markup = `
    "^^^^New Hong Kong


    ${createStoreLogo()}

    Havenstraat 13
    2211EE Noordwijkerhout
    0252 37 29 02
    info@newhongkong.nl

    -
    ^^${table.date} | ^^tafel ${table.number}

    -
`;

    table.food.forEach((item) => {
      markup += `{w:*,10}
      ^^${item.qwt} ${item.name?.nl} | ^^${euro(item.price)}
      `;

      if (item.description) {
        markup += `|${item.description}
        `;
      }
    });

    table.beverages.forEach((item) => {
      markup += `{w:*,10}
      ^^${item.qwt} ${item.name} | ^^${euro(item.price)}
      `;

      if (item.description) {
        markup += `|${item.description}
        `;
      }
    });

    markup += `{w:auto}`;

    markup += `

    -
    ^^^Totaal ${euro(tableTotal(table))}|


    `;

    // TODO: DELETE old code below. Replaced by vatByRate() + vatRows() from @/functions/ledger,
    // which split the table per VAT rate and calculate the VAT inside each amount.
    // const vat = calculateTableVat(table);
    // const vatLow = Math.round((vat.low / 109) * 9);
    // const vatHigh = Math.round((vat.high / 121) * 21);
    //
    // markup += `{w:*,10}
    // |Totaal is inclusief BTW: | ${euro(vatLow + vatHigh)}
    // `;
    const vat = vatRows(vatByRate(table));
    const vatLow = vat.low.tax;
    const vatHigh = vat.high.tax;
    // VAT for rates other than 9% and 21% (usually none).
    const vatOther = vat.other.reduce((x, r) => x + r.tax, 0);

    markup += `{w:*,10}
    |Totaal is inclusief BTW: | ${euro(vatLow + vatHigh + vatOther)}
    `;

    markup += `BTW 9% | ${euro(vatLow)}
    `;
    markup += `BTW 21% | ${euro(vatHigh)}
    `;
    vat.other.forEach((r) => {
      markup += `BTW ${r.rate}% | ${euro(r.tax)}
    `;
    });

    markup += `{w:auto}`;

    markup += `


    "^^^BEDANKT EN TOT ZIENS!`;

    const report = receiptline.transform(markup, {
      cpl: 46,
      encoding: "cp936",
      spacing: true,
    });

    // We cant' send the svg so we convert it to a base 64 string
    const buffer = Buffer.from(report);
    const base64String = buffer.toString("base64");
    // We need to check if printer is busy or not
    await setDoc(doc(db, "printer", table.id), {
      type: "tableReceipt",
      printContent: base64String,
    });
  };

  if (justIcon) {
    return (
      <IconBtn
        disabled={printJobs.length}
        onClick={() => {
          setMainCategory("checkout");
          updateDoc(doc(db, `tables/${table.id}`), {
            wantsToPay: true,
          });
          printReceipt();
          setOpen(false);
        }}
      >
        {printJobs.length ? (
          <LoadingIcon className="animate-spin fill-main" />
        ) : (
          <ReceiptIcon className="fill-inherit" />
        )}
      </IconBtn>
    );
  }

  if (mainCategory === "checkout") {
    return (
      <>
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
