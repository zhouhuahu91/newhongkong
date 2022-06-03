// React imports
import { useRef, useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";

const ItemOptions = ({
  options,
  selectedOptions,
  setSelectedOptions,
  qwtOptions,
  errors,
  setErrors,
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

  return (
    <div ref={el}>
      <h3
        className={`text-xs lowercase ${
          errors ? "text-main" : "text-gray-600"
        }`}
      >
        {qwtOptions > 1
          ? qwtOptions > 2
            ? t.choose_three_options
            : t.choose_two_options
          : t.choose_an_option}
      </h3>
    </div>
  );
};

export default ItemOptions;
