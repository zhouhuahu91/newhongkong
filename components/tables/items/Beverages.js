import beverages from "@/data/restaurant/beverages/_beverages.js";
import euro from "@/functions/euro";
import BeverageIcon from "@/icons/BeverageIcon";

const Beverages = ({
  buttonStyle,
  subCategory,
  setSubCategory,
  mainCategory,
  setMainCategory,
  addBeverageToTable,
}) => {
  // If there is no main category selected we just return the button for beverages.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("drankjes")}
        type="button"
        className={`${buttonStyle} col-span-2 flex items-center justify-center gap-2`}
      >
        <BeverageIcon size="28" /> <span className="font-medium">drankjes</span>
      </button>
    );
  }

  // If main category is equel to beverages we want to show all types of beverages but only if sub category is still false
  if (mainCategory === "drankjes" && subCategory === false) {
    return (
      <>
        {beverages.map((type) => {
          return (
            <button
              onClick={() => {
                setSubCategory(type.name);
              }}
              type="button"
              key={type.id}
              className={buttonStyle}
            >
              {type.name}
            </button>
          );
        })}
      </>
    );
  }

  // As soon as the main category is beverages and subcategory is not false we check if the id of the subCategory of the beverages
  // and return those items.
  if (mainCategory === "drankjes" && subCategory !== false) {
    return (
      <>
        {beverages.map((type) => {
          if (type.name === subCategory) {
            return type.items.map((item) => {
              return (
                <button
                  onClick={() => {
                    addBeverageToTable(item);
                    // To do: add item to the tabel.
                  }}
                  type="button"
                  key={item.id}
                  className={`${buttonStyle} flex flex-col justify-between text-left`}
                >
                  <span className="text-inherit font-medium">{item.name}</span>
                  <span className="text-sm">{euro(item.price)}</span>
                </button>
              );
            });
          }
        })}
      </>
    );
  }
};

export default Beverages;
