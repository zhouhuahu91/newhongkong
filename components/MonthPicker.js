// React imports
import { useState, useRef, useEffect } from "react";
// Third party date picker import
import DatePicker from "react-datepicker";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Styling imports
import "react-datepicker/dist/react-datepicker.css";
// Animation imports
import { motion, AnimatePresence } from "framer-motion";
// Component imports
import CalendarIcon from "@/icons/CalendarIcon";

const MonthPicker = ({ setDate, date, className }) => {
  const [show, setShow] = useState(false);
  const t = useI18n();

  // This is a reference to the div surrounding this component.
  const ref = useRef();
  // This useEffect adds an event listener to the document and triggers the click functions.
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick); // This removes the eventlistener when the component gets dismounted.
    };
  }, []);

  // When the user clicks we check if the click in inside or outside the div.
  const handleClick = (e) => {
    // If it's inside the div nothing happens.
    if (ref.current.contains(e.target)) {
      return;
    }
    // If it's outside the div we close the locale menu.
    setShow(false);
  };

  return (
    <div ref={ref} className={`relative mx-2 ${className && className} flex`}>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
        type="button"
        className="flex items-center red-focus-ring px-1 space-x-2 rounded-md"
      >
        <span className="capitalize font-medium">
          {t.months[date.getMonth()]}
        </span>
        <CalendarIcon />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={`absolute w-[220px] top-10 z-10`}
          >
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              inline
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MonthPicker;
