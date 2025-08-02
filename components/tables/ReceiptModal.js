import { useState } from "react";
// we need a receipt modal for smallscreens
import Receipt from "@/tables/Receipt";
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import calculateTableTotal from "@/functions/calculateTableTotal";
import euro from "@/functions/euro";
const ReceiptModal = ({
  table,
  incrementBeverage,
  decrementBeverage,
  incrementDish,
  decrementDish,
}) => {
  const tableTotal = calculateTableTotal(table);

  const [open, setOpen] = useState(tableTotal > 0 ? true : false);

  return (
    <>
      <div className="lg:hidden fixed bottom-0 w-full px-4 pt-4 pb-8 bg-white border shadow">
        <button
          onClick={() => setOpen(true)}
          type="button"
          className={`w-full bg-main flex justify-center items-center p-2 rounded shadow`}
        >
          <span className="font-medium text-inherit text-white">
            Rekening {tableTotal > 0 ? euro(tableTotal) : ""}
          </span>
        </button>
      </div>
      <Modal
        toggle={open}
        close={() => setOpen(false)}
        className="w-full h-full bg-white"
      >
        <>
          <div className="fixed bottom-0 w-full px-4 pt-4 pb-8 bg-white border shadow">
            <button
              onClick={() => setOpen(false)}
              type="button"
              className={`w-full bg-main flex justify-center items-center p-2 rounded shadow`}
            >
              <span className="font-medium text-inherit text-white">
                Terug naar menu
              </span>
            </button>
          </div>
          <div className="p-4 font-bold text-lg flex justify-between items-center">
            <h1>Tafel {table.number}</h1>
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
        </>
      </Modal>
    </>
  );
};

export default ReceiptModal;
