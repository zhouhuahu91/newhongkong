import { useState } from "react";
import { useMenu } from "@/hooks/useMenu";
import euro from "@/functions/euro";

const AllFood = ({
  mainCategory,
  setMainCategory,
  subCategory,
  setSubCategory,
  buttonStyle,
  addDishToTable,
}) => {
  const { data } = useMenu();
  const [currentDish, setCurrentDish] = useState(false);
  const [sidesNeeded, setSidesNeeded] = useState(false);
  const [selectedSides, setSelectedSides] = useState([]);
  const [optionsNeeded, setOptionsNeeded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // If user goes out of the sides or options menu before they completed it we reset the values for sides or options.
  if (mainCategory !== "alle gerechten" || subCategory === false) {
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

  // If main category is equel to food we want to show all types of food but only if sub category is still false
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

  // If optionsNeeded is true we show the options that we can select.
  if (
    mainCategory === "alle gerechten" &&
    subCategory !== false &&
    optionsNeeded === true
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
                  ? "border-red-200 border-2"
                  : ""
              }`}
              key={option.id}
            >
              <span className="text-inherit font-medium">{option.name.nl}</span>
              <span className="text-sm">
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
    mainCategory === "alle gerechten" &&
    subCategory !== false &&
    sidesNeeded === true
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
                    (currentDish.totalSides || 1)
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
                  ? "border-red-200 border-2"
                  : ""
              }`}
              key={side.id}
            >
              <span className="text-inherit font-medium">{side.name.nl}</span>
              <span className="text-sm">
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
  if (mainCategory === "alle gerechten" && subCategory !== false) {
    return (
      <>
        {data.map((type) => {
          if (type.category.nl === subCategory) {
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

export default AllFood;
