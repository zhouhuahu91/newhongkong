import { useMenu } from "@/hooks/useMenu";
import euro from "@/functions/euro";

const getCustomFoodMenu = (data) => {
  const soupID = ["1", "2", "3", "6", "7"];
  const sidesID = ["14", "8", "9", "10", "11", "12", "16", "18", "17"];
  const mainID = [
    "43",
    "49",
    "54",
    "56",
    "21",
    "58",
    "60",
    "61",
    "20",
    "24",
    "27",
    "38",
    "39",
    "31",
    "84",
  ];
  const nasiBamiMihoenID = ["64", "67", "68", "73", "75", "80"];
  const rijsttafelsID = ["101", "102", "103"];
  const soup = {
    name: "soepen",
    id: "1",
    items: [],
  };
  const sides = {
    name: "bijgerechten",
    id: "2",
    items: [],
  };
  const main = {
    name: "hoofdgerechten",
    id: "3",
    items: [],
  };
  const tippan = {
    name: "tippan",
    id: "4",
    items: [],
  };
  const nasiBamiMihoen = {
    name: "nasi, bami of mihoen",
    id: "5",
    items: [],
  };

  const rijsttafels = {
    name: "rijsttafels",
    id: "6",
    items: [],
  };

  data.forEach((category) => {
    if (category.id === 14) {
      tippan.items.push(category.items);
    }
    category.items.forEach((item) => {
      if (soupID.includes(item.id)) {
        soup.items.push(item);
      }
      if (mainID.includes(item.id)) {
        main.items.push(item);
      }
      if (sidesID.includes(item.id)) {
        sides.items.push(item);
      }
      if (nasiBamiMihoenID.includes(item.id)) {
        nasiBamiMihoen.items.push(item);
      }
      if (rijsttafelsID.includes(item.id)) {
        rijsttafels.items.push(item);
      }
    });
  });

  sides.items = sidesID.map((id) => sides.items.find((item) => item.id === id));
  main.items = mainID.map((id) => main.items.find((item) => item.id === id));
  nasiBamiMihoen.items = nasiBamiMihoenID.map((id) =>
    nasiBamiMihoen.items.find((item) => item.id === id)
  );

  return [soup, sides, main, tippan, nasiBamiMihoen, rijsttafels];
};

const Food = ({
  mainCategory,
  setMainCategory,
  subCategory,
  setSubCategory,
  buttonStyle,
}) => {
  const { data } = useMenu();
  const food = getCustomFoodMenu(data);

  // If there is no main category selected we just return the button for beverages.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("food")}
        type="button"
        className={buttonStyle}
      >
        eten
      </button>
    );
  }

  // If main category is equel to food we want to show all types of food but only if sub category is still false
  if (mainCategory === "food" && subCategory === false) {
    return (
      <>
        {food.map((type) => {
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
  // As soon as the main category is food and subcategory is not false we check if the id of the subCategory of the food
  // and return those items.
  if (mainCategory === "food" && subCategory !== false) {
    return (
      <>
        {food.map((type) => {
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

export default Food;
