// React imports
import { useState, useEffect } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import PedalBikeIcon from "@/icons/PedalBikeIcon";
import StoreIcon from "@/icons/StoreIcon";
import CloseIcon from "@/icons/CloseIcon";
// Hook imports
import useTimePicker from "@/hooks/useTimePicker";
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";

const DeleteTimeSlotModal = () => {
  const [open, setOpen] = useState(false);
  const timeSlots = useTimePicker();
  const t = useI18n();
  const {
    cartState: { delivery },
    dispatch,
  } = useCart();

  // When we open this modal we want to set delivery to false.
  useEffect(() => {
    if (delivery && open) dispatch({ type: "SET_DELIVERY", payload: false });
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xl font-medium text-center"
      >
        Nieuw
      </button>
      <Modal
        className="max-w-sm w-full mx-2 bg-white rounded-lg overflow-hidden"
        toggle={open}
        close={() => setOpen(false)}
      >
        <div className="flex p-4 justify-between items-center border-b shadow">
          <h1 className="font-semibold text-lg">Beschikbare tijden</h1>
          <IconBtn onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconBtn>
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
              <StoreIcon
                size="18"
                className={`${
                  delivery === false ? "fill-main" : "fill-gray-500"
                }`}
              />
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
              <PedalBikeIcon
                size="18"
                className={`${
                  delivery === true ? "fill-main" : "fill-gray-500"
                }`}
              />
              {t.delivery}
            </button>
          </div>
          <div className={`grid gap-2 grid-cols-2 h-full max-h-40`}>
            {timeSlots.map((timeSlot) => {
              if (!timeSlot.includes(":")) return;
              return (
                <button
                  className={`border p-1 rounded bg-white shadow-sm text-base font-normal`}
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
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteTimeSlotModal;
