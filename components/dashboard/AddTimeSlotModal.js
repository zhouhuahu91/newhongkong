// React imports
import { useState } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
// Hook imports
import useTimePicker from "@/hooks/useTimePicker";
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";

const AddTimeSlotModal = () => {
  const [open, setOpen] = useState(false);
  const timeSlots = useTimePicker();
  const t = useI18n();
  const {
    cartState: { delivery },
    dispatch,
  } = useCart();

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
        <div className="flex p-4 justify-between items-center">
          <h1 className="font-semibold text-lg">Time Slots</h1>
          <IconButton variant="close" onClick={() => setOpen(false)} />
        </div>
        <div className="flex space-x-2">
          {/* This button sets delivery to false which means the customer will pcik up the order */}
          <button
            onClick={() => dispatch({})}
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
            onClick={() => dispatch({})}
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
      </Modal>
    </>
  );
};

export default AddTimeSlotModal;
