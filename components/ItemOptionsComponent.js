// React imports
import { useRef, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import ToolTip from "@/components/ToolTip";
import IconButton from "@/components/IconButton";
// Function imports
import euro from "@/functions/euro";

const ItemOptionsComponent = ({
  options,
  selectedOptions,
  setSelectedOptions,
  qwtOptions,
  errors,
  resetErrors,
}) => {
  const t = useI18n();
  // We use this ref to scroll to the options when there are errors.
  const el = useRef(null);
  // We want to scroll to the element where there is an error.
  useEffect(() => {
    // We passed the reference to the element and when error is true...
    // we scroll the elementIntoView.
    if (errors) {
      el.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [errors]); // triggers everytime error gets updated.

  // This function gets called when user clicks on the checkbox.
  const handleChange = (e) => {
    // We reset errors.
    resetErrors();
    // We get the value of the checkbox.
    const value = e.target.value;
    // We first check if the value is already included.
    if (selectedOptions.includes(value)) {
      // If included we uncheck the box by removing it from the array.
      return setSelectedOptions((selectedOptions) =>
        selectedOptions.filter((option) => option !== value)
      );
    }
    // If it is not included we add the item to the array.
    // We sort the array so that the id is always the same...
    // ...even when users picks options in a different order.
    setSelectedOptions((selectedOptions) => [...selectedOptions, value].sort());
  };

  return (
    <div ref={el} className="my-2">
      <h3
        className={`text-xs lowercase ${
          errors ? "text-main" : "text-gray-500"
        }`}
      >
        {qwtOptions > 1
          ? qwtOptions > 2
            ? t.choose_three_options
            : t.choose_two_options
          : t.choose_an_option}
      </h3>
      {options.map((option) => {
        // We disable and show different markup when selectedOptions.length has reached the qwtOptions...
        // and we only disable if the item is not included oterwise we can't uncheck the boxes.
        const disabled =
          selectedOptions.length === qwtOptions &&
          !selectedOptions.includes(option.id);

        return (
          <div key={option.id} className="flex items-center">
            <div className="flex flex-grow items-center space-x-2">
              <input
                className={`form-checkbox p-2 rounded shadow border-gray-300 text-main focus:ring-red-200 focus:ring-offset-0 ${
                  disabled ? "" : "cursor-pointer"
                }`}
                id={`id${option.id}`}
                value={option.id}
                type="checkbox"
                onChange={handleChange}
                checked={selectedOptions.includes(option.id)}
                disabled={disabled}
              />
              <label
                className={`${disabled ? "text-gray-300" : "cursor-pointer"}`}
                htmlFor={`id${option.id}`}
              >
                {option.name[t.locale]}
              </label>
              {option.description && (
                <ToolTip
                  tip={option.description[t.locale]}
                  disabled={disabled}
                />
              )}
            </div>
            {/* We only show a price if the options price is > € 0,00. */}
            <div className="flex items-center">
              {option.price > 0 && (
                <label
                  className={`text-sm ${disabled && "text-gray-300"}`}
                  htmlFor={`id${option.id}`}
                >
                  {euro(option.price)}
                </label>
              )}
              {/* If total options is bigger than 1 and it is selected than we want to give the option to increase & decrease. */}
              {qwtOptions > 1 && selectedOptions.includes(option.id) && (
                <div className="flex justify-between items-center space-x-2 ml-2">
                  <IconButton
                    variant="remove_circle_outline"
                    color="main"
                    onClick={() => {
                      // First we reset the errors.
                      resetErrors();
                      // We check for the last occurance of this id.
                      const index = selectedOptions.lastIndexOf(option.id);
                      //we check if it exists
                      if (index !== -1) {
                        // If it exists we create a new array.
                        const x = [...selectedOptions];
                        // Than we remove the last occurance from the array.
                        x.splice(index, 1);
                        // And we use this array to set the new state.
                        setSelectedOptions([...x]);
                      }
                    }}
                  />
                  <div className="font-semibold">
                    {selectedOptions.filter((x) => x === option.id).length}
                  </div>
                  <IconButton
                    color="main"
                    variant="add_circle_outline"
                    disabled={selectedOptions.length === qwtOptions}
                    onClick={() => {
                      // If the maximum is reached we exit this function.
                      if (selectedOptions.length === qwtOptions) return;
                      // We reset the errors.
                      resetErrors();
                      // If the maximum isn't reached we spread in the old array and add the new item.
                      setSelectedOptions((options) => [...options, option.id]);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemOptionsComponent;
