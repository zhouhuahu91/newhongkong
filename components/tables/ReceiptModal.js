import { useState } from "react";
// we need a receipt modal for smallscreens
import Receipt from "@/tables/Receipt";
import Modal from "@/components/Modal";

const ReceiptModal = ({
  table,
  incrementBeverage,
  decrementBeverage,
  incrementDish,
  decrementDish,
  buttonStyle,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className={`${buttonStyle} col-span-2 flex items-center justify-center gap-2`}
      >
        <span className="font-medium text-inherit">Rekening</span>
      </button>
      <Modal toggle={open} close={() => setOpen(false)}>
        <Receipt
          table={table}
          incrementBeverage={incrementBeverage}
          decrementBeverage={decrementBeverage}
          incrementDish={incrementDish}
          decrementDish={decrementDish}
        />
      </Modal>
    </>
  );
};

export default ReceiptModal;
