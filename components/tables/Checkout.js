import receiptline from "receiptline";

// Icon imports
import PrintIcon from "@/icons/PrintIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
import CashIcon from "@/icons/CashIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
// Function imports
import euro from "@/functions/euro";
import createStoreLogo from "@/functions/createStoreLogo";
import calculateTableTotal from "@/functions/calculateTableTotal";
import calculateTableVat from "@/functions/calculateTableVat";

const Checkout = ({ setMainCategory, mainCategory, table, buttonStyle }) => {
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
    ^^^Totaal ${euro(calculateTableTotal(table))}|


    `;

    const vat = calculateTableVat(table);
    const vatLow = Math.round((vat.low / 109) * 9);
    const vatHigh = Math.round((vat.high / 121) * 21);

    markup += `{w:*,10}
    |Totaal is inclusief BTW: | ${euro(vatLow + vatHigh)}
    `;

    markup += `BTW 9% | ${euro(vatLow)}
    `;
    markup += `BTW 21% | ${euro(vatHigh)}
    `;

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

  if (mainCategory === "checkout") {
    return (
      <>
        <button
          onClick={async () => {
            // We first check if the printer is busy
            const ref = collection(db, "printer");
            const snapshot = await getDocs(ref);
            const printJobs = snapshot.docs.map((doc) => doc.data());
            if (printJobs.length > 0) {
              return window.alert("printer busy try again later");
            }
            printReceipt();
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
          updateDoc(doc(db, `tables/${table.id}`), {
            wantsToPay: true,
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
