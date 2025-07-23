// React imports
import { useState, useRef, useEffect } from "react";
// Hook imports
import useOnClickOutside from "@/hooks/useOnClickOutside";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";
import getFullDate from "@/functions/getFullDate";
// Date Picker imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Animation imports
import { motion, AnimatePresence } from "framer-motion";
// Component imports
import CalendarIcon from "@/icons/CalendarIcon";

const DatePickerComponent = ({ setDate, className, date, top }) => {
  // Split the string into parts
  const parts = date.split("-");
  // Rearrange the parts to match "yyyy-mm-dd" format
  const rearrangedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  const [selectedDate, setSelectedDate] = useState(new Date(rearrangedDate));
  const [show, setShow] = useState(false);
  // This is a reference to the div surrounding this component.
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  useEffect(() => {
    // Split the string into parts
    const parts = date.split("-");
    // Rearrange the parts to match "yyyy-mm-dd" format
    const rearrangedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    setSelectedDate(new Date(rearrangedDate));
  }, [date]);

  return (
    <div ref={ref} className={`relative mx-2 ${className && className} flex`}>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
        type="button"
        className={`flex items-center red-focus-ring px-1 rounded-md ${
          getCurrentDate() !== date ? "fill-main text-main" : ""
        }`}
      >
        <span
          className={`mt-1 mr-2 font-medium hidden sm:block mb-0.5 text-inherit`}
        >
          {getFullDate(selectedDate)}
        </span>
        <CalendarIcon className="fill-inherit" />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className={`absolute ${top ? "-top-64" : "top-10"} -right-10 z-10`}
          >
            <DatePicker
              selected={selectedDate}
              calendarStartDay={1}
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
