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
      <h2 className="text-lg font-normal mt-4 mb-2">{t.for_when}</h2>
      {/* The main container for the inputs. */}
      <div className="relative">
        <label htmlFor="time" className={`text-sm text-gray-500`}>
          {t.time}
        </label>
        {timeSlots.map((slot) => {
          return (
            <input {...register("time")} type="radio" key={slot} value={slot} />
          );
        })}
        <label htmlFor="time" className="text-red-400 text-sm">
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
