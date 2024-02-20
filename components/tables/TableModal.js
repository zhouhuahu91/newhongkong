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
// Function imports
import createItemDescription from "@/functions/createItemDescription";
import createItemId from "@/functions/createItemId";

const TableModal = ({ open, setOpen, table, sizes }) => {
  const [tableNumber, setTableNumber] = useState(table.number);
  const [tableName, setTableName] = useState(`Tafel ${tableNumber}`);

  // This the ref of the current table we are dealing with.
  const ref = doc(db, `tables/${table.id}`);

  // ********** THESE ARE THE FUNCTIONS FOR FOOD ***********
  const food = table.food;

  console.log(food);

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
    const found = food.find((x) => x.id === dish.id);

    // If the dish already exists we just modify the existing one
    if (found) {
      updateDoc(ref, {
        food: food.map((x) => {
          return x.id === dish.id
            ? {
                ...x,
                qwt: x.qwt + 1,
                price: (x.price / x.qwt) * x.qwt + 1,
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
      close={() => setOpen(false)}
    >
      <IconBtn
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4"
      >
        <CloseIcon />
      </IconBtn>
      {/* Two containers left and right one is the receipt and the other items that we can add to the receipt */}
      <div className="flex flex-row w-full h-full max justify-between gap-2 b-50">
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
            className="appearance-none focus:outline-none text-center font-bold text-2xl border-b mt-6 pb-2"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
              const number = value === "" ? 0 : parseInt(value, 10);
              setTableNumber(number);
              setTableName(`TAFEL ${number}`);
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
            incrementDish={incrementDish}
            decrementDish={decrementDish}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TableModal;
