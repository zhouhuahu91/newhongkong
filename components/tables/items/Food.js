import { useState, useEffect } from "react";
import euro from "@/functions/euro";
import { data } from "@/data/data";
import DishIcon from "@/icons/DishIcon";
import { carnaval } from "@/data/category/carnaval";

const getCustomFoodMenu = (rawData) => {
  // replace the price of data with dine in price if there is dine in price
  const data = rawData.map((category) => ({
    ...category,
    items: category.items.map((item) => ({
      ...item,
      price: item.dineInPrice ? item.dineInPrice : item.price,
    })),
  }));

  const soupID = ["1", "2", "3", "6", "7"];
  const sidesID = ["14", "8", "9", "10", "11", "12", "16", "18", "17", "19"];
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
    items: [carnaval],
  };

  data.forEach((category) => {
    if (category.id === 14) {
      tippan.items = category.items;
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
  addDishToTable,
  currentDish,
  setCurrentDish,
}) => {
  const food = getCustomFoodMenu(data);
  const [sidesNeeded, setSidesNeeded] = useState(false);
  const [selectedSides, setSelectedSides] = useState([]);
  const [optionsNeeded, setOptionsNeeded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    // If user goes out of the sides or options menu before they completed it we reset the values for sides or options.
    if (
      mainCategory !== "gerechten" ||
      subCategory === false ||
      currentDish === false
    ) {
      if (currentDish) {
        setCurrentDish(false);
      }
      if (sidesNeeded) {
        setSidesNeeded(false);
      }
      if (selectedSides.length) {
        setSelectedSides([]);
      }
      if (optionsNeeded) {
        setOptionsNeeded(false);
      }
      if (selectedOptions.length) {
        setSelectedOptions([]);
      }
    }
  }, [mainCategory, subCategory, currentDish]);

  // If there is no main category selected we just return the button for beverages.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("gerechten")}
        type="button"
        className={`${buttonStyle} col-span-2 flex items-center justify-center gap-2`}
      >
        <DishIcon className="fill-inherit" />{" "}
        <span className="font-medium text-inherit">gerechten</span>
      </button>
    );
  }

  // If main category is equel to food we want to show all types of food but only if sub category is still false
  if (mainCategory === "gerechten" && subCategory === false) {
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

  // If optionsNeeded is true we show the options that we can select.
  if (
    mainCategory === "gerechten" &&
    subCategory !== false &&
    optionsNeeded === true &&
    currentDish !== false
  ) {
    return (
      <>
        {currentDish.options.map((option) => {
          return (
            <button
              onClick={() => {
                setSelectedOptions((prev) => {
                  // we need to add one because when we click we this button we are adding one.
                  // that means if there are no selected sides after clicking this button there is 1.
                  if (
                    selectedOptions.length + 1 ===
                    (currentDish.totalOptions || 1)
                  ) {
                    // If the options requirements are okay but the dish still needs sides
                    // we set sides needed to true
                    // and we save the current selected options in the current dish
                    if (
                      currentDish.sides &&
                      selectedSides.length < (currentDish.totalSides || 1)
                    ) {
                      setCurrentDish((prevCurrentDish) => {
                        return {
                          ...prevCurrentDish,
                          selectedOptions: [...prev, option],
                        };
                      });
                      setOptionsNeeded(false);
                      setSidesNeeded(true);
                      // We reset the selectedOptions because it is saved in the current dish
                      return [];
                    }
                    // If there is enough of the selected option required and there are no sides required we reset the values
                    setCurrentDish(false);
                    setOptionsNeeded(false);
                    // We add the current dish to the table with the selected options
                    addDishToTable({
                      ...currentDish,
                      selectedOptions: [...prev, option],
                    });
                    // we reset selected options to an empty array
                    return [];
                  } else {
                    // if not that means we do not have enough selected options thus we return the prev
                    // selected sides with the new clicked on selected option.
                    return [...prev, option];
                  }
                });
              }}
              type="button"
              className={`${buttonStyle} flex flex-col justify-between text-left font-medium ${
                selectedOptions.some((x) => x.id === option.id)
                  ? "selected border-main"
                  : ""
              }`}
              key={option.id}
            >
              <span className="text-inherit font-medium">{option.name.nl}</span>
              <span className="text-xs">
                {option.price > 0 ? euro(option.price) : "gratis"}
              </span>
            </button>
          );
        })}
      </>
    );
  }

  // If sidesNeeded is true we show the sides that we can select.
  if (
    mainCategory === "gerechten" &&
    subCategory !== false &&
    sidesNeeded === true &&
    currentDish !== false
  ) {
    return (
      <>
        {currentDish.sides.map((side) => {
          return (
            <button
              onClick={() => {
                setSelectedSides((prev) => {
                  // we need to add one because when we click we this button we are adding one.
                  // that means if there are no selected sides after clicking this button there is 1.
                  if (
                    selectedSides.length + 1 ===
                    // use to be two sides but we  just need one because all menu's are seperated now
                    1
                  ) {
                    // If there is enough of the selected sides required we reset the values
                    setCurrentDish(false);
                    setSidesNeeded(false);
                    // We add the current dish to the table with the selected sides
                    addDishToTable({
                      ...currentDish,
                      selectedSides: [...prev, side],
                    });
                    // we reset selected sides to an empty array
                    return [];
                  } else {
                    // if not that means we do not have enough selected sides thus we return the prev
                    // selected sides with the new clicked on selected side.
                    return [...prev, side];
                  }
                });
              }}
              type="button"
              className={`${buttonStyle} flex flex-col justify-between text-left font-medium ${
                selectedSides.some((x) => x.id === side.id)
                  ? "selected border-main"
                  : ""
              }`}
              key={side.id}
            >
              <span className="text-inherit font-medium">{side.name.nl}</span>
              <span className="text-xs">
                {side.price > 0 ? euro(side.price) : "gratis"}
              </span>
            </button>
          );
        })}
      </>
    );
  }

  // As soon as the main category is food and subcategory is not false we check if the id of the subCategory of the food
  // and return those items.
  if (mainCategory === "gerechten" && subCategory !== false) {
    return (
      <>
        {food.map((type) => {
          if (type.name === subCategory) {
            return type.items.map((item) => {
              return (
                <button
                  onClick={() => {
                    if (
                      item.options &&
                      selectedOptions.length < (item.totalOptions || 1)
                    ) {
                      setCurrentDish(item);
                      return setOptionsNeeded(true);
                    }

                    // If the item has sides and the selectedSides is not the amount we want we set the current dish
                    // to the item and set sides needed to true
                    if (
                      item.sides &&
                      selectedSides.length < (item.totalSides || 1)
                    ) {
                      setCurrentDish(item);
                      return setSidesNeeded(true);
                    }
                    addDishToTable(item);
                    // To do: add item to the tabel.
                  }}
                  type="button"
                  key={item.id}
                  className={`${buttonStyle} flex flex-col justify-between text-left font-medium`}
                >
                  <span className="text-inherit font-medium">
                    {item.name?.nl}
                  </span>
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
