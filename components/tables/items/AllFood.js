import { useMenu } from "@/hooks/useMenu";
import euro from "@/functions/euro";

const AllFood = ({
  buttonStyle,
  subCategory,
  setSubCategory,
  mainCategory,
  setMainCategory,
}) => {
  const { data } = useMenu();

  // If there is no main category selected we just return the button for beverages.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("alle gerechten")}
        type="button"
        className={buttonStyle}
      >
        alle gerechten
      </button>
    );
  }

  // If main category is equel to alle gerechten we want to show all types of categories but only if sub category is still false
  if (mainCategory === "alle gerechten" && subCategory === false) {
    return (
      <>
        {data.map((type) => {
          return (
            <button
              onClick={() => {
                setSubCategory(type.category.nl);
              }}
              type="button"
              key={type.id}
              className={buttonStyle}
            >
              {type.category.nl}
            </button>
          );
        })}
      </>
    );
  }

  // As soon as the main category is alle gerechten and subcategory is not false we check if the name of the subCategory of the food
  // and return those items.
  if (mainCategory === "alle gerechten" && subCategory !== false) {
    return (
      <>
        {data.map((type) => {
          if (type.category.nl === subCategory) {
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
                  <span>{item.name.nl}</span>
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

export default AllFood;
