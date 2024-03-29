import dessert from "@/data/restaurant/dessert/dessert";
import euro from "@/functions/euro";

import DessertIcon from "@/icons/DessertIcon";

const Dessert = ({
  mainCategory,
  setMainCategory,
  buttonStyle,
  addBeverageToTable,
}) => {
  // If there is no main category selected we just return the button for dessert.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("dessert")}
        type="button"
        className={`${buttonStyle} col-span-2 flex items-center justify-center gap-2`}
      >
        <DessertIcon className="fill-inherit" />{" "}
        <span className="font-medium text-inherit">dessert</span>
      </button>
    );
  }
  // As soon as the main category is dessert
  if (mainCategory === "dessert") {
    return (
      <>
        {dessert.map((type) => {
          return type.items.map((item) => {
            return (
              <button
                onClick={() => {
                  addBeverageToTable(item);
                }}
                type="button"
                key={item.id}
                className={`${buttonStyle} flex flex-col justify-between text-left`}
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-xs">{euro(item.price)}</span>
              </button>
            );
          });
        })}
      </>
    );
  }
};

export default Dessert;
