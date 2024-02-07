// Icon imports
import PrintIcon from "@/icons/PrintIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
// Function imports
import euro from "@/functions/euro";
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
import calculateVat from "@/functions/calculateVat";

import receiptline from "receiptline";

const CreateCustomerReceipt = ({ order, printerBusy }) => {
  const printReceipt = async () => {
    // We create the markup
    let markup = `
    "^^^^New Hong Kong

    Havenstraat 13
    2211EE Noordwijkerhout
    0252 37 29 02
    info@newhongkong.nl

    -
    ^^${order.date} | ^^${getDigitalTime(
      getCurrentTimeInSeconds(new Date(order.createdAt))
    )}
    -
    
`;

    order.cart.forEach((item) => {
      markup += `{w:*,10}
      ^^${item.qwt} ${item.name["nl"]} | ^^${euro(item.price)}
      `;

      if (item.description["nl"].length) {
        markup += `|${item.description["nl"]}
        `;
      }
    });

    // adds the total of all the items in the cart.
    markup += `{w:auto}
    
    -
    ^^Subtotaal ${euro(order.cart.reduce((x, y) => x + y.price, 0))}|`;

    // adds delivery cost of order is for delivery
    if (order.delivery) {
      markup += `
      ^^Bezorgkosten ${euro(order.storeFees.deliveryFee)}|`;
    }

    // adds fee for the bag if order.bag is true but only if order isn't for delivery bag fee is included in the delivery fee
    if (order.paymentMethod === "online") {
      markup += `
      ^^Transactiekosten ${euro(order.storeFees.transactionFee)}|`;
    }

    // adds fee for the bag if order.bag is true but only if order isn't for delivery bag fee is included in the delivery fee
    if (!order.delivery && order.bag) {
      markup += `
      ^^Tasje ${euro(order.storeFees.plasticBagFee)}|`;
    }

    //  adds tip if customer gave a tip
    if (order.tip > 0) {
      markup += `
      ^^Fooi ${euro(order.tip)}|`;
    }

    markup += `

    -
    ^^^Totaal ${euro(order.total)}|


`;

    const vat = calculateVat(order);
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
    if (!printerBusy) {
      await setDoc(doc(db, "printer", order.id), {
        type: "customerReceipt",
        printContent: base64String,
      });
    }
  };

  return (
    <button
      type="button"
      disabled={printerBusy}
      className="button w-40 border gap-4 bg-main text-white"
      onClick={() => printReceipt()}
    >
      Bonnetje <PrintIcon className="fill-gray-100" />
    </button>
  );
};

export default CreateCustomerReceipt;
