// React imports
import { useState, useEffect } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
// Hook imports
import useTimePicker from "@/hooks/useTimePicker";
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";

const AddTimeSlotModal = () => {
  const [open, setOpen] = useState(false);
  const timeSlots = useTimePicker();
  const t = useI18n();
  const {
    cartState: { delivery },
    dispatch,
  } = useCart();

  // When we open this modal we want to set delivery to false.
  useEffect(() => {
    if (delivery) dispatch({ type: "SET_DELIVERY", payload: false });
  }, [open]);

  return (
    <>
      <IconButton
        className="mx-2"
        variant="manage_history"
        onClick={() => setOpen(true)}
      />
      <Modal
        className="max-w-sm w-full mx-2 bg-white rounded-lg overflow-hidden"
        toggle={open}
        close={() => setOpen(false)}
      >
        <div className="flex p-4 justify-between items-center border-b shadow">
          <h1 className="font-semibold text-lg">Time Slots</h1>
          <IconButton variant="close" onClick={() => setOpen(false)} />
        </div>
        <div
          style={{ maxHeight: "calc(100vh - 265px)" }}
          className="p-4 bg-neutral-50 overflow-scroll"
        >
          <div className="flex space-x-2 mb-4 bg-neutral-50">
            {/* This button sets delivery to false which means the customer will pcik up the order */}
            <button
              onClick={() => dispatch({ type: "SET_DELIVERY", payload: false })}
              type="button"
              className={`pick-up-deliver ${
                delivery === false && "border-main selected text-main"
              }`}
            >
              <span className="material-symbols-rounded text-inherit icon-small">
                store
              </span>
              {t.pick_up}
            </button>
            {/* This button sets delivery to true which means the order will be delivered. */}
            <button
              onClick={() => dispatch({ type: "SET_DELIVERY", payload: true })}
              type="button"
              className={`pick-up-deliver ${
                delivery === true && "border-main selected text-main"
              }`}
            >
              <span className="material-symbols-rounded text-inherit icon-small">
                pedal_bike
              </span>
              {t.delivery}
            </button>
          </div>
          <div
            className={`grid gap-2 ${
              delivery === true ? "grid-cols-2" : "grid-cols-5"
            }`}
          >
            {timeSlots.map((timeSlot) => (
              <button
                className="border p-1 rounded bg-white shadow-sm text-base font-normal"
                key={timeSlot}
                type="button"
                onClick={async () => {
                  try {
                    let existingSlots = [];
                    const ref = doc(
                      db,
                      `timeSlots${
                        delivery === true ? "Delivery" : "PickUp"
                      }/${getCurrentDate()}`
                    );

                    const snapshot = await getDoc(ref);
                    if (snapshot.exists()) {
                      existingSlots = snapshot.data().slots;
                    }
                    // We set the time slot twice removing it from the option.
                    // Max time slot per day is 2.
                    await setDoc(ref, {
                      slots: [...existingSlots, timeSlot, timeSlot],
                    });
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddTimeSlotModal;
