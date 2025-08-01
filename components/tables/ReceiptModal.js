import { useState } from "react";
// we need a receipt modal for smallscreens
import Receipt from "@/tables/Receipt";
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import ReceiptIcon from "@/icons/ReceiptIcon";

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
        <ReceiptIcon className="fill-inherit" />{" "}
        <span className="font-medium text-inherit">Rekening</span>
      </button>
      <Modal
        toggle={open}
        close={() => setOpen(false)}
        className="w-full h-full bg-white"
      >
        <div className="p-4 font-bold text-lg flex justify-between items-center">
          <h1>Rekening</h1>
          <IconBtn onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconBtn>
        </div>
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
