// React imports
import { useState } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
// Hook imports
import useTimePicker from "@/hooks/useTimePicker";
import { useCart } from "@/hooks/useCart";

const AddTimeSlotModal = () => {
  const [open, setOpen] = useState(false);
  const timeSlots = useTimePicker();
  const { cartState, dispatch } = useCart();

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
      </Modal>
    </>
  );
};

export default AddTimeSlotModal;
