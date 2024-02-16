import beverages from "@/data/restaurant/beverages/_beverages.js";
import euro from "@/functions/euro";

const Beverages = ({
  buttonStyle,
  subCategory,
  setSubCategory,
  mainCategory,
  setMainCategory,
}) => {
  // If there is no main category selected we just return the button for beverages.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("drinken")}
        type="button"
        className={buttonStyle}
      >
        drinken
      </button>
    );
  }

  // If main category is equel to beverages we want to show all types of beverages but only if sub category is still false
  if (mainCategory === "drinken" && subCategory === false) {
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
  if (mainCategory === "drinken" && subCategory !== false) {
    return (
      <>
        {beverages.map((type) => {
          if (type.name === subCategory) {
            return type.items.map((item) => {
              return (
                <button
                  onClick={() => {
                    console.log(item);
                    // To do: add item to the tabel.
                  }}
                  type="button"
                  key={item.id}
                  className={`${buttonStyle} flex flex-col justify-between text-left`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs">{euro(item.price)}</span>
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
