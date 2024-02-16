import { useState } from "react";
// Icon imports
import ChevronRightIcon from "@/icons/ChevronRightIcon";
// component imports
import Beverages from "@/tables/items/Beverages";
import Food from "@/tables/items/Food";

const TableModalMenu = () => {
  const [mainCategory, setMainCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(false);

  const buttonStyle = "bg-white col-span-1 h-24 border rounded-md shadow-md";

  return (
    <div className="grid grid-cols-2 gap-2 font-mono">
      {/* Header for the displaying menu */}
      <div className="col-span-2 flex items-center h-12 text-lg font-semibold">
        <button
          onClick={() => {
            setMainCategory(false);
            setSubCategory(false);
          }}
          type="button"
          className=""
        >
          home
        </button>
        {mainCategory && (
          <button
            onClick={() => {
              setSubCategory(false);
            }}
            className="flex items-center"
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
    </div>
  );
};

export default TableModalMenu;
