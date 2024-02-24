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
import { doc, updateDoc } from "firebase/firestore";

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

  console.log(needsToBePrinted);

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
        <button className="button border mt-4 uppercase gap-2">
          <PrintIcon />
          eten afdrukken
        </button>
      )}
    </div>
  );
};

export default Receipt;
