import dessert from "@/data/restaurant/dessert/dessert";
import euro from "@/functions/euro";

const Dessert = ({
  mainCategory,
  setMainCategory,
  subCategory,
  setSubCategory,
  buttonStyle,
}) => {
  // If there is no main category selected we just return the button for beverages.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("dessert")}
        type="button"
        className={buttonStyle}
      >
        dessert
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
        })}
      </>
    );
  }
};

export default Dessert;
