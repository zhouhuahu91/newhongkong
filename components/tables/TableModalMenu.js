import { useState, useEffect } from "react";
// Icon imports
import ChevronRightIcon from "@/icons/ChevronRightIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
// component imports
import Beverages from "@/tables/items/Beverages";
import Food from "@/tables/items/Food";
import Dessert from "@/tables/items/Dessert";
import AllFood from "@/tables/items/AllFood";
import Checkout from "@/tables/Checkout";
import DeleteTable from "@/tables/DeleteTable";

const TableModalMenu = ({ table, addBeverageToTable, addDishToTable }) => {
  const [mainCategory, setMainCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(false);
  const [currentDish, setCurrentDish] = useState(false);
  const [currentDishAllFood, setCurrentDishAllFood] = useState(false);

  useEffect(() => {
    if ((table.paid || table.wantsToPay) && mainCategory === false) {
      setMainCategory("checkout");
    }
  }, []);

  const buttonStyle =
    "h-[6.8rem] border p-4 rounded-md hover:shadow-md uppercase font-medium transition-all hover:bg-red-50";

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Header for the displaying menu */}
      <div className="col-span-2 flex items-center h-16 font-medium ml-2">
        <button
          disabled={mainCategory === false}
          onClick={() => {
            setMainCategory(false);
            setSubCategory(false);
            if (table.wantsToPay) {
              updateDoc(doc(db, `tables/${table.id}`), {
                wantsToPay: false,
              });
            }
          }}
          type="button"
          className={`uppercase font-medium ${
            mainCategory !== false ? "text-main" : ""
          }`}
        >
          menu
        </button>
        {mainCategory && (
          <button
            disabled={subCategory === false}
            onClick={() => {
              setSubCategory(false);
            }}
            className={`flex items-center uppercase font-medium ${
              subCategory !== false ? "text-main" : ""
            }`}
          >
            <ChevronRightIcon /> {mainCategory}
          </button>
        )}
        {subCategory && (
          <button
            disabled={currentDish === false && currentDishAllFood === false}
            onClick={() => {
              if (currentDish) {
                setCurrentDish(false);
              }
              if (currentDishAllFood) {
                setCurrentDishAllFood(false);
              }
            }}
            className={`flex items-center uppercase font-medium ${
              currentDish || currentDishAllFood ? "text-main" : ""
            }`}
          >
            <ChevronRightIcon /> {subCategory}
          </button>
        )}
        {(currentDish || currentDishAllFood) && (
          <div className={`flex items-center uppercase font-medium`}>
            <ChevronRightIcon />{" "}
            {currentDish ? currentDish.name.nl : currentDishAllFood.name.nl}
          </div>
        )}
      </div>
      {/* These are the categories we can go in to.  */}
      {/* If mainCategory is false these will return a button which will select their... */}
      {/* category as the main one. */}
      <Beverages
        buttonStyle={buttonStyle}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
        addBeverageToTable={addBeverageToTable}
      />
      <Food
        buttonStyle={buttonStyle}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
        addDishToTable={addDishToTable}
        currentDish={currentDish}
        setCurrentDish={setCurrentDish}
      />
      <Dessert
        buttonStyle={buttonStyle}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
        addBeverageToTable={addBeverageToTable}
      />
      <Checkout
        buttonStyle={buttonStyle}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
        table={table}
      />
      <AllFood
        buttonStyle={buttonStyle}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
        addDishToTable={addDishToTable}
        currentDish={currentDishAllFood}
        setCurrentDish={setCurrentDishAllFood}
      />
      <DeleteTable
        table={table}
        buttonStyle={buttonStyle}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
      />
    </div>
  );
};

export default TableModalMenu;
