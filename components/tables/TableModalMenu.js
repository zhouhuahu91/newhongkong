import { useState } from "react";
// Icon imports
import ChevronRightIcon from "@/icons/ChevronRightIcon";
// component imports
import Beverages from "@/tables/items/Beverages";
import Food from "@/tables/items/Food";
import Dessert from "@/tables/items/Dessert";
import AllFood from "@/tables/items/AllFood";
import TableTypes from "@/tables/TableTypes";

const TableModalMenu = ({ sizes, table }) => {
  const [mainCategory, setMainCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(false);

  const buttonStyle =
    "bg-white col-span-1 h-24 border p-4 rounded-md shadow-md";

  return (
    <div className="grid grid-cols-2 gap-2 font-mono">
      {/* Header for the displaying menu */}
      <div className="col-span-2 flex items-center h-16 text-xl font-semibold">
        <button
          onClick={() => {
            setMainCategory(false);
            setSubCategory(false);
          }}
          type="button"
          className={`${mainCategory !== false ? "text-main" : ""}`}
        >
          home
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
      />
      <Food
        buttonStyle={buttonStyle}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
      />
      <Dessert
        buttonStyle={buttonStyle}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
      />
      <AllFood
        buttonStyle={buttonStyle}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
      />
      <TableTypes
        mainCategory={mainCategory}
        setMainCategory={setMainCategory}
        buttonStyle={buttonStyle}
        sizes={sizes}
        table={table}
      />
    </div>
  );
};

export default TableModalMenu;
