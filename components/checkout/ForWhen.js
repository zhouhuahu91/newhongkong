// React imports
import { useEffect, useRef, useState } from "react";
// NextJs imports
import Image from "next/image";
// Hooks imports
import useI18n from "@/hooks/useI18n";
import useTimePicker from "@/hooks/useTimePicker";
import { useCart } from "@/hooks/useCart";
// Component imports
import StoreIcon from "@/icons/StoreIcon";
import PedalBikeIcon from "@/icons/PedalBikeIcon";

const ForWhen = ({ register, errors, watch, setValue }) => {
  const [slotsContainerRoom, setSlotsContainerRoom] = useState();
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
  // Ref for slots container
  const slotsContainerRef = useRef(null);

  // We reset the value of "time" everytime the user changes delivery.
  useEffect(() => {
    if (selectedTime !== "null") {
      setValue("time", "null");
    } // Only setValue when it is not null.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delivery]);

  // This useEffect checks how many slots fit in the div.
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      if (slotsContainerRef.current) {
        setSlotsContainerRoom(
          // 38 is the width of the select box.
          // 126 is the minimum width needed for the buttons.
          Math.floor((slotsContainerRef.current.offsetWidth - 38) / 126)
        );
      }
    };
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* The title of this component. */}
      <h2 className="text-lg font-normal mt-4 mb-2">{t.for_when}</h2>
      {/* The main container for the inputs. */}
      <div className="relative">
        {/* <label htmlFor="time" className={`text-sm text-gray-500`}>
          {t.select_time}
        </label> */}
        <div ref={slotsContainerRef} className="flex space-x-2">
          {timeSlots.map((slot, idx) => {
            // We want to display the frist n slots.
            // But if the selectime is not in these n slots we want to display one less.
            let nrOfSlotsToDisplay = slotsContainerRoom;
            if (timeSlots.indexOf(selectedTime) >= slotsContainerRoom) {
              nrOfSlotsToDisplay -= 1;
            }
            // We also make sure to display the selected slot.
            if (
              idx < nrOfSlotsToDisplay ||
              idx === timeSlots.indexOf(selectedTime)
            ) {
              return (
                <div
                  key={slot}
                  style={{ width: `${100 / slotsContainerRoom}%` }}
                >
                  <button
                    type="button"
                    onClick={() => setValue("time", slot)}
                    className={`border w-full h-16 text-left red-focus-ring text-sm font-medium p-3 bg-white rounded-md flex flex-col ${
                      selectedTime === slot
                        ? "border-main selected text-main"
                        : "text-gray-500"
                    }`}
                  >
                    {slot.includes(":") && delivery && (
                      <PedalBikeIcon color="#6b7280" width="18" height="18" />
                    )}
                    {slot.includes(":") && !delivery && (
                      <StoreIcon color="#6b7280" width="18" height="18" />
                    )}
                    {slot}
                  </button>
                </div>
              );
            }
          })}
          {/* Here we display all the other options that are not shows as buttons. */}
          <div
            style={{ minWidth: "40px" }}
            className="relative border bg-white red-focus-ring rounded-md overflow-hidden p-3"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <Image src="/moreHoriz.svg" width={10} height={10} />
            </div>
            <select
              {...register("time")}
              id="time"
              className="appearance-none cursor-pointer bg-transparent focus:outline-none absolute inset-0 h-full w-full text-white"
            >
              <option value="null">
                {timeSlots.length ? t.select_time : t.closed_for_delivery}
              </option>
              {timeSlots.map((slot) => {
                return (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
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
