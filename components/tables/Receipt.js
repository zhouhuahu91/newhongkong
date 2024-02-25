import receiptline from "receiptline";

import { useState } from "react";
// Function imports
import euro from "@/functions/euro";
import calculateTableTotal from "@/functions/calculateTableTotal";
// Component imports
import IconBtn from "@/components/IconBtn";
// Icon imports
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";
import PrintIcon from "@/icons/PrintIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const Receipt = ({
  table,
  incrementBeverage,
  decrementBeverage,
  incrementDish,
  decrementDish,
}) => {
  const [tip, setTip] = useState(table.tip);
  const [formattedTip, setFormattedTip] = useState(`TIP: ${euro(table.tip)}`);
  const total = calculateTableTotal(table);

  // I need an array of items in food that needs to be printed
  const needsToBePrinted = table.food.map((item) => {
    if (!item.printed) {
      return item;
    }
  });

  const printFood = async () => {
    let markup = `
    ^^^^^餐楼

    -
    ^^TAFEL ${table.number}

    _
    `;

    needsToBePrinted.forEach((item) => {
      markup += `

      |^^^^${item.qwt} ${item.name?.zh}`;

      // template to hold sides
      const sidesCount = {};
      // This part prints the sides after the item name if there are sides.
      if (item.selectedSides?.length > 0) {
        item.selectedSides.forEach((side) => {
          // Check if name is in template
          if (sidesCount[side.name.zh]) {
            // If name is in template we add 1
            sidesCount[side.name.zh]++;
          } else {
            // If not we set the name to one
            sidesCount[side.name.zh] = 1;
          }
        });
        // If there are sides we add this after the main item
        markup += ",";
        // We print the sides next to it.
        // Sides gets multiplied by the main item.
        for (const side in sidesCount) {
          const sideQwt = sidesCount[side] * item.qwt;
          // if there is only one side no need to show 1.
          if (sideQwt > 1) {
            markup += ` ${sideQwt}`;
          }
          markup += ` ${side}`;
        }
      }

      // This part prints the options on it's own line
      // If the option is main we don't need to prin the options
      if (item.selectedOptions?.length > 0 && !item.optionIsMain) {
        // template to hold options
        const optionsCount = {};
        item.selectedOptions.forEach((option) => {
          // Check if name is in template
          if (optionsCount[option.name.zh]) {
            // If name is in template we add 1
            optionsCount[option.name.zh]++;
          } else {
            // If not we set the name to one
            optionsCount[option.name.zh] = 1;
          }
        });
        // We print the options.
        // Options gets multiplied by the main item.
        for (const option in optionsCount) {
          markup += `
        |^^^^${optionsCount[option] * item.qwt} (${option})`;
        }
      }
    });

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
      type: "tableOrder",
      printContent: base64String,
      table: table, // we pass in the table so that we can set food to printed after completing
    });
  };

  console.log(test);
  if (table.food.length === 0 && table.beverages.length === 0) {
    return (
      <div className="w-full h-full flex justify-center mt-40 uppercase font-medium">
        nog niks besteld.
      </div>
    );
  }

  return (
    <div
      className={`px-8 pb-8 pt-4 h-full flex flex-col uppercase overflow-scroll ${
        table.food.length ? "gap-4" : ""
      }`}
    >
      <div className="">
        {table.food.map((dish) => {
          return (
            <div className="grid grid-cols-12" key={dish.id}>
              <div className="col-span-2 max-w-[4.5rem] flex items-center justify-between pr-2">
                <IconBtn onClick={() => decrementDish(dish)}>
                  <MinusIcon size="18" className="fill-main" />
                </IconBtn>
                <div className="">{dish.qwt}</div>
                <IconBtn onClick={() => incrementDish(dish)}>
                  <PlusIcon size="18" className="fill-main" />
                </IconBtn>
              </div>
              <div className="col-span-7 font-medium">{dish.name.nl}</div>
              <div className="col-span-3 text-right">{euro(dish.price)}</div>
              <div className="col-span-2" />
              <div className="col-span-7 -mt-1 text-xs">{dish.description}</div>
            </div>
          );
        })}
      </div>
      <div className="">
        {table.beverages.map((beverage) => {
          return (
            <div className="grid grid-cols-12" key={beverage.id}>
              <div className="col-span-2 max-w-[4.5rem] flex items-center justify-between pr-2">
                <IconBtn onClick={() => decrementBeverage(beverage)}>
                  <MinusIcon size="18" className="fill-main" />
                </IconBtn>
                <div className="">{beverage.qwt}</div>
                <IconBtn onClick={() => incrementBeverage(beverage)}>
                  <PlusIcon size="18" className="fill-main" />
                </IconBtn>
              </div>
              <div className="col-span-7 font-medium">{beverage.name}</div>
              <div className="col-span-3 text-right">
                {euro(beverage.price)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-right border-t pt-4 mt-4">
        <div className="">subtotaal: {euro(total - table.tip)}</div>
        <div className="">
          <input
            value={formattedTip}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
              const number = value === "" ? 0 : parseInt(value, 10);
              setFormattedTip(`TIP: ${euro(number)}`);
              setTip(number);
            }}
            className="text-right appearance-none focus:outline-none"
            onBlur={() => {
              const ref = doc(db, `tables/${table.id}`);
              updateDoc(ref, {
                tip: tip,
              });
            }}
          />
        </div>
      </div>
      <div className="text-right border-t pt-4 mt-4">
        <div className="font-medium">totaal: {euro(total)}</div>
      </div>
      {needsToBePrinted.length > 0 && (
        <button
          onClick={async () => {
            // We first check if the printer is busy
            const ref = collection(db, "printer");
            const snapshot = await getDocs(ref);
            const printJobs = snapshot.docs.map((doc) => doc.data());
            if (printJobs.length > 0) {
              return window.alert("printer busy try again later");
            }
            printFood();
          }}
          className="button border mt-4 uppercase gap-2"
        >
          <PrintIcon />
          eten afdrukken
        </button>
      )}
    </div>
  );
};

export default Receipt;
