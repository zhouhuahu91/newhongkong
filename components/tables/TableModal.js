import { useState } from "react";
// Component imports
import TableModalMenu from "@/tables/TableModalMenu";
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import Receipt from "@/tables/Receipt";
// Icon imports
import CloseIcon from "@/icons/CloseIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

const TableModal = ({ open, setOpen, table, sizes }) => {
  const [tableNumber, setTableNumber] = useState(table.number);
  const [tableName, setTableName] = useState(`Tafel ${tableNumber}`);

  // This the ref of the current table we are dealing with.
  const ref = doc(db, `tables/${table.id}`);

  // ********** THESE ARE THE FUNCTIONS FOR FOOD ***********

  const addDishToTable = (dish) => {
    console.log(dish);
  };

  //  ********* THESE ARE FUNCTION FOR DRINKS AND DESSERT THAT DON'T HAVE SIDES OR OPTIONS *********
  //  MAKES EVERTYTHING A LOT EASIER
  // Current beverages in the table
  const beverages = table.beverages;
  // This function adds a beverage to the beverages array.
  const addBeverageToTable = async (beverageToAdd) => {
    // We need to check if the item is already in the beverages array.
    const found = beverages.find(
      (beverage) => beverage.id === beverageToAdd.id
    );

    // If items is already in the beverages array we increment the item instead.
    if (found) {
      updateDoc(ref, {
        beverages: beverages.map((beverage) => {
          return beverage.id === beverageToAdd.id
            ? {
                ...beverage,
                qwt: beverage.qwt + 1,
                price: beverage.price + beverageToAdd.price,
              }
            : beverage;
        }),
      });
      // If not found we add the new item to the array and set qwt to 1
    } else {
      updateDoc(ref, {
        beverages: [
          ...beverages,
          {
            ...beverageToAdd,
            qwt: 1,
          },
        ],
      });
    }
  };

  const incrementBeverage = (beverageToIncrement) => {
    const newBeverages = beverages.map((beverage) => {
      return beverage.id === beverageToIncrement.id
        ? {
            ...beverage,
            qwt: beverage.qwt + 1,
            price: (beverage.price / beverage.qwt) * (beverage.qwt + 1),
          }
        : beverage;
    });

    updateDoc(ref, {
      beverages: newBeverages,
    });
  };

  const decrementBeverage = (beverageToDecrement) => {
    // If the beverage that we want to decrement is only 1 we remove the item from the array.
    if (beverageToDecrement.qwt === 1) {
      updateDoc(ref, {
        beverages: beverages.filter(
          (beverage) => beverage.id !== beverageToDecrement.id
        ),
      });
      // Otherwise we decrement by one and we deduct the price of one.
    } else {
      const newBeverages = beverages.map((beverage) => {
        return beverage.id === beverageToDecrement.id
          ? {
              ...beverage,
              qwt: beverage.qwt - 1,
              price: (beverage.price / beverage.qwt) * (beverage.qwt - 1),
            }
          : beverage;
      });

      updateDoc(ref, {
        beverages: newBeverages,
      });
    }
  };

  return (
    <Modal
      className="w-full h-full max-w-[1080px] max-h-[820px] relative bg-white rounded-xl overflow-hidden"
      toggle={open}
      close={() => setOpen(false)}
    >
      <IconBtn
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4"
      >
        <CloseIcon />
      </IconBtn>
      {/* Two containers left and right one is the receipt and the other items that we can add to the receipt */}
      <div className="flex flex-row w-full h-full justify-between gap-2 b-50">
        <div className="w-full border-r p-4 overflow-scroll">
          <TableModalMenu
            addBeverageToTable={addBeverageToTable}
            addDishToTable={addDishToTable}
            sizes={sizes}
            table={table}
          />
        </div>
        <div className="w-full h-full flex border-l p-4 bg-white flex-col">
          <input
            value={tableName}
            className="appearance-none focus:outline-none text-center font-bold text-3xl border-b mt-6 pb-2"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
              const number = value === "" ? 0 : parseInt(value, 10);
              setTableNumber(number);
              setTableName(`Tafel ${number}`);
            }}
            onBlur={() => {
              const ref = doc(db, `tables/${table.id}`);
              updateDoc(ref, {
                number: tableNumber,
              });
            }}
          />
          <Receipt
            table={table}
            incrementBeverage={incrementBeverage}
            decrementBeverage={decrementBeverage}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TableModal;
