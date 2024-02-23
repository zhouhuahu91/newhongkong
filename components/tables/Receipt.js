import { useState } from "react";
// Function imports
import euro from "@/functions/euro";
// Component imports
import IconBtn from "@/components/IconBtn";
// Icon imports
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const calculateTotal = (table) => {
  let price = 0;
  price += table.food.reduce((x, y) => x + y.price, 0);
  price += table.beverages.reduce((x, y) => x + y.price, 0);

  return price;
};

const Receipt = ({
  table,
  incrementBeverage,
  decrementBeverage,
  incrementDish,
  decrementDish,
}) => {
  const [tip, setTip] = useState(table.tip);
  const [formattedTip, setFormattedTip] = useState(`TIP: ${euro(table.tip)}`);
  const total = calculateTotal(table);

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
        <div className="">subtotaal: {euro(total)}</div>
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
      <div className="text-right border-t pt-4 mt-4 mb-20">
        <div className="font-medium">totaal: {euro(total + table.tip)}</div>
      </div>
    </div>
  );
};

export default Receipt;
