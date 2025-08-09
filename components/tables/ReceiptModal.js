import { useState } from "react";
// we need a receipt modal for smallscreens
import Receipt from "@/tables/Receipt";
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import calculateTableTotal from "@/functions/calculateTableTotal";
import euro from "@/functions/euro";
import useWindowSize from "@/hooks/useWindowSize";
import Checkout from "@/tables/Checkout";
const ReceiptModal = ({
  table,
  incrementBeverage,
  decrementBeverage,
  incrementDish,
  decrementDish,
  setModalMenu,
  setMainCategory,
}) => {
  const tableTotal = calculateTableTotal(table);
  const { width } = useWindowSize();

  const [open, setOpen] = useState(
    tableTotal > 0 && table.wantsToPay === false ? true : false
  );

  return (
    <>
      <div className="lg:hidden fixed bottom-0 w-full px-4 pt-4 pb-8 bg-white border shadow">
        <button
          onClick={() => setOpen(true)}
          type="button"
          className={`w-full bg-main flex justify-center items-center p-2 rounded shadow`}
        >
          <span className="font-medium text-inherit text-white">
            Tafel {table.number} • {tableTotal > 0 ? euro(tableTotal) : ""}
          </span>
        </button>
      </div>
      {width < 1024 && (
        <Modal
          toggle={open}
          close={() => setOpen(false)}
          className="w-full h-full bg-white lg:hidden"
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
              <div className="flex gap-2">
                <Checkout
                  table={table}
                  justIcon={true}
                  setMainCategory={setMainCategory}
                  setOpen={setOpen}
                />
                <h1 className="font-bold">Tafel {table.number}</h1>
              </div>
              <IconBtn
                onClick={() => {
                  setModalMenu(false);
                }}
              >
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
      )}
    </>
  );
};

export default ReceiptModal;
