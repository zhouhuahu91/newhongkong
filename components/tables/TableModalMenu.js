import { useState } from "react";
// Icon imports
import ChevronRightIcon from "@/icons/ChevronRightIcon";
import DeleteIcon from "@/icons/DeleteIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
// component imports
import Beverages from "@/tables/items/Beverages";
import Food from "@/tables/items/Food";
import Dessert from "@/tables/items/Dessert";
import AllFood from "@/tables/items/AllFood";
import PaymentMenu from "@/tables/PaymentMenu";

const TableModalMenu = ({ table, addBeverageToTable, addDishToTable }) => {
  const [mainCategory, setMainCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(false);
  const [currentDish, setCurrentDish] = useState(false);
  const [currentDishAllFood, setCurrentDishAllFood] = useState(false);

  const buttonStyle =
    "bg-white h-[6.8rem] border p-4 rounded-md shadow-md uppercase font-medium text-lg";

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Header for the displaying menu */}
      <div className="col-span-2 flex items-center h-16 font-medium ml-2">
        <button
          onClick={() => {
            setMainCategory(false);
            setSubCategory(false);
          }}
          type="button"
          className={`uppercase text-lg font-medium ${
            mainCategory !== false ? "text-main" : ""
          }`}
        >
          menu
        </button>
        {mainCategory && (
          <button
            onClick={() => {
              setSubCategory(false);
            }}
            className={`flex items-center uppercase text-lg font-medium ${
              subCategory !== false ? "text-main" : ""
            }`}
          >
            <ChevronRightIcon /> {mainCategory}
          </button>
        )}
        {subCategory && (
          <button
            onClick={() => {
              if (currentDish) {
                setCurrentDish(false);
              }
              if (currentDishAllFood) {
                setCurrentDishAllFood(false);
              }
            }}
            className="flex items-center uppercase text-lg font-medium"
          >
            <ChevronRightIcon /> {subCategory}
          </button>
        )}
      </div>
      {/* These are the categories we can go in to.  */}
      {/* If mainCategory is false these will return a button which will select their... */}
      {/* category as the main one. */}
      {table.paid === false && table.printed === false && (
        <>
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
          {/* TO DO: move delete to own component. let it return a warning if i acutally want to delete it or not */}
          {mainCategory === false && (
            <button
              onClick={() => {
                const ref = doc(db, `tables/${table.id}`);
                deleteDoc(ref);
              }}
              type="button"
              className={`${buttonStyle} flex items-center justify-center gap-2`}
            >
              <DeleteIcon />
              delete
            </button>
          )}
        </>
      )}
      <PaymentMenu
        buttonStyle={buttonStyle}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
        table={table}
      />
    </div>
  );
};

export default TableModalMenu;
