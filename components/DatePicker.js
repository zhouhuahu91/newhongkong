// React imports
import { useState, useRef } from "react";
// Hook imports
import useOnClickOutside from "@/hooks/useOnClickOutside";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";
// Date Picker imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Animation imports
import { motion, AnimatePresence } from "framer-motion";

const DatePickerComponent = ({ setDate, className, date }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  // This is a reference to the div surrounding this component.
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  return (
    <div ref={ref} className={`relative mx-2 ${className && className} flex`}>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
        type="button"
        className="flex items-center red-focus-ring px-1 rounded-md"
      >
        <span className={`mt-1 mr-2 font-medium`}>{date.slice(0, 5)}</span>
        <span
          className={`material-symbols-rounded cursor-pointer ${
            getCurrentDate() !== date ? "text-main" : "text-gray-700"
          }`}
        >
          today
        </span>
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={`absolute top-10 -right-16 z-10`}
          >
            <DatePicker
              selected={selectedDate}
              onChange={(d) => {
                setShow(false);
                setSelectedDate(d);
                setDate(getCurrentDate(d));
              }}
              inline
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePickerComponent;
