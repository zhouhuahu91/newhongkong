// React imports
import { useState, useRef } from "react";
// Hook imports
import useOnClickOutside from "@/hooks/useOnClickOutside";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";
// Date Picker imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ setDate, className, date }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  // This is a reference to the div surrounding this component.
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  return (
    <div ref={ref} className={`relative ${className && className} flex`}>
      <button
        onClick={() => {
          setShow((prev) => !prev);
        }}
        type="button"
        className="flex items-center"
      >
        <span className={`mt-1 mr-2`}>{date}</span>
        <span
          className={`material-symbols-rounded cursor-pointer ${
            getCurrentDate() !== date ? "text-main" : "text-gray-700"
          }`}
        >
          today
        </span>
      </button>
      <div className={`absolute top-10 right-0 ${!show && "hidden"} z-10`}>
        <DatePicker
          selected={selectedDate}
          onChange={(d) => {
            setShow(false);
            setSelectedDate(d);
            setDate(getCurrentDate(d));
          }}
          inline
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
