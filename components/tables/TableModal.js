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
import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
// Function imports
import createItemDescription from "@/functions/createItemDescription";
import createItemId from "@/functions/createItemId";

const TableModal = ({ open, setOpen, table, date, physicalTables }) => {
  const [tableNumber, setTableNumber] = useState(table.number);
  const [tableName, setTableName] = useState(`TAFEL ${tableNumber}`);

  // This the ref of the current table we are dealing with.
  const ref = doc(db, `tables/${table.id}`);

  // ********** THESE ARE THE FUNCTIONS FOR FOOD ***********
  const food = table.food;

  const addDishToTable = (dish) => {
    const selectedOptions = dish.selectedOptions || [];
    const selectedSides = dish.selectedSides || [];

    // We extract the id of the selected sides and options to create a new id.
    // We sort them so that we always get the same id even if the order is chosen differently.
    const optionID = selectedOptions.map((x) => x.id).sort();
    const sidesID = selectedSides.map((x) => x.id).sort();

    // Creates a new id with the selected sides and options.
    const ID = createItemId(dish, optionID, sidesID);

    // check if ID is in the food array or not
    const found = food.find((x) => x.id === ID);

    // If the dish already exists we just modify the existing one
    if (found) {
      updateDoc(ref, {
        food: food.map((x) => {
          return x.id === ID
            ? {
                ...x,
                qwt: x.qwt + 1,
                price: (x.price / x.qwt) * (x.qwt + 1),
              }
            : x;
        }),
      });
      // If product does not exist we add it to the array with qwt
      // and the recalculate the price
      // and create a new description for the client
    } else {
      let totalPrice = dish.price;
      totalPrice += selectedOptions.reduce((x, y) => x + y.price, 0);
      totalPrice += selectedSides.reduce((x, y) => x + y.price, 0);

      // We create a new description with the selected sides and options.
      // this return all languages but actually only need dutch.
      const description = createItemDescription(
        dish,
        selectedOptions,
        selectedSides
      );

      // We need to check if the option is main because if it is it means that option is also the name of the dish
      // The name of the item is different if optionIsMain is true.
      const name = dish.optionIsMain ? selectedOptions[0].name : dish.name;

      updateDoc(ref, {
        food: [
          ...food,
          {
            ...dish,
            price: totalPrice,
            printed: false,
            name,
            qwt: 1,
            id: ID,
            description: description.nl,
          },
        ],
      });
    }
  };

  const incrementDish = (dishToIncrement) => {
    const newFood = food.map((dish) => {
      return dish.id === dishToIncrement.id
        ? {
            ...dishToIncrement,
            qwt: dish.qwt + 1,
            price: (dish.price / dish.qwt) * (dish.qwt + 1),
          }
        : dish;
    });

    updateDoc(ref, {
      food: newFood,
    });
  };

  const decrementDish = (dishToDecrement) => {
    // If the dish that we want to decrement is only 1 we remove the item from the array.
    if (dishToDecrement.qwt === 1) {
      updateDoc(ref, {
        food: food.filter((dish) => dish.id !== dishToDecrement.id),
      });
      // Otherwise we decrement by one and we deduct the price of one.
    } else {
      const newFood = food.map((dish) => {
        return dish.id === dishToDecrement.id
          ? {
              ...dish,
              qwt: dish.qwt - 1,
              price: (dish.price / dish.qwt) * (dish.qwt - 1),
            }
          : dish;
      });

      updateDoc(ref, {
        food: newFood,
      });
    }
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
      className="w-full h-full max-w-[1080px] max-h-[770px] relative bg-white xl:rounded-xl overflow-hidden"
      toggle={open}
      close={() => {
        setOpen(false);
      }}
    >
      <IconBtn
        onClick={() => {
          setOpen(false);
        }}
        className="absolute right-4 top-4"
      >
        <CloseIcon />
      </IconBtn>
      {/* Two containers left and right one is the receipt and the other items that we can add to the receipt */}
      <div className="grid grid-cols-12 w-full h-full gap-1">
        <div className="col-span-6 relative h-full flex border-r bg-white flex-col overflow-scroll">
          <TableModalMenu
            addBeverageToTable={addBeverageToTable}
            addDishToTable={addDishToTable}
            table={table}
          />
        </div>
        <div className="col-span-6 h-full flex border-l bg-white flex-col overflow-scroll">
          <div className="border-b flex justify-center p-4 shadow">
            <input
              value={tableName}
              className="appearance-none focus:outline-none text-center font-bold text-2xl mt-6 pb-2"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                const number = value === "" ? 0 : parseInt(value, 10); // If there is no digit at all we use 0

                // We set table to the number
                setTableNumber(number);
                // And we display the number with a prefix.
                setTableName(`TAFEL ${number}`);
              }}
              onBlur={async () => {
                // We don't need to run this code if nothing changed
                if (tableNumber === table.number) return;
                // We get all the tables that are still open
                const q = query(
                  collection(db, "tables"),
                  where("paid", "==", false),
                  where("date", "==", date)
                );

                const snapshot = await getDocs(q);
                const tables = snapshot.docs.map((doc) => doc.data().number);

                // If table number already exists or or table doesn't exist at all we give a warning.
                const physicalTableNumbers = physicalTables.map(
                  (x) => x.number
                );
                if (
                  // If the table already exists
                  tables.includes(tableNumber) ||
                  // If the table number doesn't exist
                  !physicalTableNumbers.includes(tableNumber)
                ) {
                  setTableNumber(table.number);
                  setTableName(`TAFEL ${table.number}`);
                  window.alert("TAFEL IS BEZET OF TAFEL BESTAAT NIET");
                } else {
                  // Otherwise we update the new table with the new number
                  const ref = doc(db, `tables/${table.id}`);
                  await updateDoc(ref, {
                    number: tableNumber,
                  });
                }
              }}
            />
          </div>
          <Receipt
            table={table}
            incrementBeverage={incrementBeverage}
            decrementBeverage={decrementBeverage}
            incrementDish={incrementDish}
            decrementDish={decrementDish}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TableModal;
