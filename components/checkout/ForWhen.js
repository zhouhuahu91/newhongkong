// React imports
import { useEffect } from "react";
// Hooks imports
import useI18n from "@/hooks/useI18n";
import useTimePicker from "@/hooks/useTimePicker";
import { useCart } from "@/hooks/useCart";

const ForWhen = ({ register, errors, watch, setValue }) => {
  // t is used to translate
  const t = useI18n();
  // Returns delivery state of cart.
  const {
    cartState: { delivery },
  } = useCart();
  // Checks what the current selected option is.
  const selectedTime = watch("time");
  // Returns the available options.
  const timeSlots = useTimePicker();

  // We reset the value of "time" everytime the user changes delivery.
  useEffect(() => {
    if (selectedTime !== "null") {
      setValue("time", "null");
    } // Only setValue when it is not null.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delivery]);

  return (
    <>
      {/* The title of this component. */}
      <h2 className="text-lg my-4">{t.for_when}</h2>
      {/* The main container for the inputs. */}
      <div className="relative">
        <label
          htmlFor="time"
          className={`text-xs ${
            errors.time ? "text-red-400" : "text-gray-500"
          }`}
        >
          {t.time} *
        </label>
        <select
          {...register("time")}
          id="time"
          className={`appearance-none my-0.5 border rounded-lg w-full text-sm py-2 px-3 focus:outline-none focus:shadow hover:shadow transition-shadow ease-linear duration-150 cursor-pointer ${
            // If the selected time is null than the text will be set to gray.
            selectedTime === "null" ? "text-gray-400" : ""
          }`}
        >
          {/* First value is null and can't be selected. This also gives instruction to the user. */}
          <option value="null">
            {!timeSlots.length && delivery === true
              ? t.closed_for_delivery
              : t.select_time}
          </option>
          {/* This function returns all the possible availeble time slots. */}
          {timeSlots.map((slot) => {
            return (
              <option key={slot} value={slot}>
                {slot}
              </option>
            );
          })}
        </select>
        <label htmlFor="time" className="text-red-400 text-xs">
          {errors.time?.message}
        </label>
        {/* // Problem with this label is that you can't open a select dropdown with a label you can only put focus on it. */}
        {/* <label
          htmlFor="time"
          className="absolute top-8 right-6 flex flex-col select-none"
        >
          <span className="material-symbols-rounded absolute text-base -top-0.5">
            expand_less
          </span>
          <span className="material-symbols-rounded absolute text-base top-1">
            expand_more
          </span>
        </label> */}
      </div>
    </>
  );
};

export default ForWhen;
