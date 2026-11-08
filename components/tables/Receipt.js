import { useState } from "react";
// Function imports
import euro from "@/functions/euro";
import { tableTotal } from "@/functions/ledger";
// Component imports
import IconBtn from "@/components/IconBtn";
// Icon imports
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";
import LoadingIcon from "@/icons/LoadingIcon";
import ReceiptIcon from "@/icons/ReceiptIcon";
import PrintIcon from "@/icons/PrintIcon";
import BeverageIcon from "@/icons/BeverageIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { kitchenTicket, toPrintContent } from "@/functions/receipts";
import usePrintQueue, {
  queuePrintJob,
  PRINTER_BUSY_MESSAGE,
} from "@/hooks/usePrintQueue";
import Snackbar from "@/components/Snackbar";

const Receipt = ({
  table,
  incrementBeverage,
  decrementBeverage,
  incrementDish,
  decrementDish,
}) => {
  const [tip, setTip] = useState(table.tip);
  const { jobs: printJobs } = usePrintQueue();
  const [snackbar, setSnackbar] = useState(false);
  const [formattedTip, setFormattedTip] = useState(`Tip: ${euro(table.tip)}`);
  const total = tableTotal(table);

  // I need an array of items in food that needs to be printed
  const needsToBePrinted = table.food.filter((item) => !item.printed);
  const notServedBeverages = table.beverages.reduce(
    (acc, curr) => acc + curr.notServed,
    0
  );

  const printFood = async () => {
    const ok = await queuePrintJob(
      table.id,
      "tableOrder",
      toPrintContent(kitchenTicket(table, needsToBePrinted)),
      // we pass in the table so that the print service can set food to printed after completing
      { table: table },
    );
    if (!ok) setSnackbar(PRINTER_BUSY_MESSAGE);
  };

  if (table.food.length === 0 && table.beverages.length === 0) {
    return (
      <div className="w-full h-full flex justify-center mt-40 text-xs text-gray-400">
        nog niks besteld.
      </div>
    );
  }

  return (
    <div
      className={`px-2 lg:px-8 pb-20 pt-4 h-full flex flex-col ${
        table.food.length ? "gap-4" : ""
      }`}
    >
      <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      <div className="text-base">
        {table.food.map((dish) => {
          return (
            <div className="grid grid-cols-12" key={dish.id}>
              <div className="col-span-2 max-w-[4.5rem] flex items-center justify-between pr-2">
                <IconBtn onClick={() => decrementDish(dish)}>
                  <MinusIcon size="18" className="fill-main" />
                </IconBtn>
                <div className="font-medium">{dish.qwt}</div>
                <IconBtn onClick={() => incrementDish(dish)}>
                  <PlusIcon size="18" className="fill-main" />
                </IconBtn>
              </div>
              <div
                onClick={() => {
                  const ref = doc(db, `tables/${table.id}`);
                  updateDoc(ref, {
                    food: table.food.map((item) => {
                      return item.id === dish.id
                        ? { ...item, printed: !dish.printed }
                        : item;
                    }),
                  });
                }}
                className={`col-span-7 flex items-center gap-2 font-medium cursor-pointer`}
              >
                {dish.name.nl}{" "}
                {dish.printed ? (
                  <ReceiptIcon className="fill-green-700" size="20" />
                ) : (
                  <PrintIcon size="20" />
                )}
              </div>
              <div className="col-span-3 text-right">{euro(dish.price)}</div>
              <div className="col-span-2" />
              <div className="col-span-7 -mt-1 text-xs">{dish.description}</div>
            </div>
          );
        })}
      </div>
      <div className="text-base">
        {table.beverages.map((beverage) => {
          return (
            <div className="grid grid-cols-12" key={beverage.id}>
              <div className="col-span-2 max-w-[4.5rem] flex items-center justify-between pr-2">
                <IconBtn onClick={() => decrementBeverage(beverage)}>
                  <MinusIcon size="18" className="fill-main" />
                </IconBtn>
                <div className="font-medium">{beverage.qwt}</div>
                <IconBtn onClick={() => incrementBeverage(beverage)}>
                  <PlusIcon size="18" className="fill-main" />
                </IconBtn>
              </div>
              <div
                onClick={() => {
                  incrementBeverage(beverage);
                }}
                className="col-span-7 font-medium"
              >
                {beverage.notServed > 0 ? (
                  <span className="mr-2 text-main font-bold">
                    {beverage.notServed}
                  </span>
                ) : (
                  ""
                )}
                {beverage.name}
              </div>
              <div className="col-span-3 text-right">
                {euro(beverage.price)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-right border-t py-4 mt-4 text-base">
        <div className="">subtotaal: {euro(total - table.tip)}</div>
        <div className="">
          <input
            value={formattedTip}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
              const number = value === "" ? 0 : parseInt(value, 10);
              setFormattedTip(`Tip: ${euro(number)}`);
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
      <div className="text-right border-t pt-4 text-base">
        <div className="font-medium">totaal: {euro(total)}</div>
      </div>
      <div className="flex w-full gap-2">
        {notServedBeverages > 0 && (
          <button
            onClick={async () => {
              const ref = doc(db, `tables/${table.id}`);
              updateDoc(ref, {
                beverages: table.beverages.map((beverage) => {
                  return { ...beverage, notServed: 0 };
                }),
              });
            }}
            className="button border mt-4 gap-2 flex items-center w-full"
          >
            drank geserveerd
            <BeverageIcon />
          </button>
        )}
        {needsToBePrinted.length > 0 && (
          <button
            disabled={printJobs.length}
            onClick={async () => {
              printFood();
            }}
            className="button border mt-4 gap-2 flex items-center w-full"
          >
            eten afdrukken
            {printJobs.length ? (
              <LoadingIcon className="animate-spin fill-main" />
            ) : (
              <PrintIcon />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Receipt;
