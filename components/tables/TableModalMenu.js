import { useState } from "react";
// Hook imports
import { useMenu } from "@/hooks/useMenu";
// Icon imports
import ChevronRightIcon from "@/icons/ChevronRightIcon";

const TableModalMenu = () => {
  const { data } = useMenu();
  const [mainCategory, setMainCategory] = useState(false);
  const [category, setCategory] = useState(false);

  console.log(category);

  const Eten = () => {
    return data
      .filter((x) => {
        if (category !== false) {
          return category === x.id;
        }
        return x.id !== 15;
      })
      .map((x) => {
        if (category !== false) {
          return x.items.map((item) => {
            return (
              <button
                className="col-span-1 border h-24 bg-white rounded-md font-bold"
                key={item.id}
              >
                {item.name["nl"]}
              </button>
            );
          });
        }
        return (
          <button
            onClick={() => setCategory(x.id)}
            className="col-span-1 border h-24 bg-white rounded-md font-bold"
            key={x.id}
          >
            {x.category["nl"]}
          </button>
        );
      });
  };
  const Drinken = data.filter((x) => x.id === 15);

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-2 flex items-center font-mono">
        <button
          onClick={() => {
            setMainCategory(false);
            setCategory(false);
          }}
          type="button"
          className=""
        >
          home
        </button>
        {mainCategory && (
          <button
            onClick={() => setCategory(false)}
            className="flex items-center"
          >
            <ChevronRightIcon /> {mainCategory}
          </button>
        )}
      </div>
      {!mainCategory && (
        <>
          <button
            type="button"
            onClick={() => setMainCategory("eten")}
            className="col-span-1 border h-24 bg-white rounded-md font-bold"
          >
            eten
          </button>
          <button
            type="button"
            onClick={() => setMainCategory("drinken")}
            className="col-span-1 border h-24 bg-white rounded-md font-bold"
          >
            drinken
          </button>
        </>
      )}
      {mainCategory === "eten" && <Eten />}
    </div>
  );
};

export default TableModalMenu;
