import { useState } from "react";
// Icon imports
import ChevronRightIcon from "@/icons/ChevronRightIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
// component imports
import Beverages from "@/tables/items/Beverages";
import Food from "@/tables/items/Food";
import Dessert from "@/tables/items/Dessert";
import AllFood from "@/tables/items/AllFood";
import TableTypes from "@/tables/TableTypes";

const TableModalMenu = ({ sizes, table, addBeverageToTable }) => {
  const [mainCategory, setMainCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(false);

  const buttonStyle =
    "bg-white col-span-1 h-24 border p-4 rounded-md shadow-md";

  return (
    <div className="grid grid-cols-2 gap-2 font-mono">
      {/* Header for the displaying menu */}
      <div className="col-span-2 flex items-center h-16 font-semibold ml-2">
        <button
          onClick={() => {
            setMainCategory(false);
            setSubCategory(false);
          }}
          type="button"
          className={`${mainCategory !== false ? "text-main" : ""}`}
        >
          menu
        </button>
        {mainCategory && (
          <button
            onClick={() => {
              setSubCategory(false);
            }}
            className={`flex items-center ${
              subCategory !== false ? "text-main" : ""
            }`}
          >
            <ChevronRightIcon /> {mainCategory}
          </button>
        )}
        {subCategory && (
          <button
            onClick={() => setSubCategory(false)}
            className="flex items-center"
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
        addBeverageToTable={addBeverageToTable}
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
        addBeverageToTable={addBeverageToTable}
      />
      <TableTypes
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
        buttonStyle={buttonStyle}
        sizes={sizes}
        table={table}
      />
      {mainCategory === false && (
        <button
          onClick={() => {
            const ref = doc(db, `tables/${table.id}`);
            deleteDoc(ref);
          }}
          type="button"
          className={buttonStyle}
        >
          delete
        </button>
      )}
    </div>
  );
};

export default TableModalMenu;
