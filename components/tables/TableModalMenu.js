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
    "min-h-20 border p-4 rounded-md text-base shadow-md capitalize font-medium transition-all hover:text-main hover:border-2 hover:border-main hover:fill-main";

  return (
    <>
      {/* Header for the displaying menu */}
      <div className="flex text-base items-center h-full max-h-24 border-b font-medium p-8 bg-white w-full absolute right-0 shadow">
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
          className={`capitalize font-medium ${
            mainCategory !== false ? "hover:text-main" : ""
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
            className={`flex items-center capitalize font-medium ${
              subCategory !== false ? "hover:text-main" : ""
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
            className={`flex items-center capitalize font-medium ${
              currentDish || currentDishAllFood ? "hover:text-main" : ""
            }`}
          >
            <ChevronRightIcon /> {subCategory}
          </button>
        )}
        {/* {(currentDish || currentDishAllFood) && (
          <div className={`absolute flex items-center capitalize font-medium`}>
            <ChevronRightIcon />{" "}
            {currentDish ? currentDish.name.nl : currentDishAllFood.name.nl}
          </div>
        )} */}
      </div>
      {/* These are the categories we can go in to.  */}
      {/* If mainCategory is false these will return a button which will select their... */}
      {/* category as the main one. */}
      {/* css is a pain in the ass need to do mt 97px so that items don't start below menu */}
      <div className="grid grid-cols-2 px-8 py-4 gap-2 overflow-scroll mt-[97px]">
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
    </>
  );
};

export default TableModalMenu;
