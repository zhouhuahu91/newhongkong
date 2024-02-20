import { useState } from "react";
// Icon imports
import ChevronRightIcon from "@/icons/ChevronRightIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import PrintIcon from "@/icons/PrintIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
// component imports
import Beverages from "@/tables/items/Beverages";
import Food from "@/tables/items/Food";
import Dessert from "@/tables/items/Dessert";
import AllFood from "@/tables/items/AllFood";

const TableModalMenu = ({ table, addBeverageToTable, addDishToTable }) => {
  const [mainCategory, setMainCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(false);
  // We do this just so that we don't have to lift state
  // We want to be able to reset the options and sides selector from the bread crumb menu
  const [resetDish, setResetDish] = useState(false);

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
            onClick={() => setResetDish(true)}
            className="flex items-center uppercase text-lg font-medium"
          >
            <ChevronRightIcon /> {subCategory}
          </button>
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
        resetDish={resetDish}
        setResetDish={setResetDish}
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
        resetDish={resetDish}
        setResetDish={setResetDish}
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
      {mainCategory === false && (
        <button
          onClick={() => {
            const ref = doc(db, `tables/${table.id}`);
            // update status of table
            updateDoc(ref, {
              printed: true,
            });
            // TO DO: set main category to pay mode
            // in this pay mode we can select the amount the client pays and the tip amount
            // in this pay mode we can also select payment method
            // we can also reprint the receipt
            // TO DO: print receipt
          }}
          type="button"
          className={`${buttonStyle} flex items-center justify-center gap-2`}
        >
          <PrintIcon />
          betalen
        </button>
      )}
    </div>
  );
};

export default TableModalMenu;
