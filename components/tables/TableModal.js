import { useState } from "react";
// Component imports
import TableModalMenu from "@/tables/TableModalMenu";
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
// Icon imports
import CloseIcon from "@/icons/CloseIcon";
// Hook imports
import { useMenu } from "@/hooks/useMenu";
// Firebase imports
import { db } from "@/firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

const TableModal = ({ open, setOpen, table, sizes }) => {
  const [tableNumber, setTableNumber] = useState(table.number);
  const [tableName, setTableName] = useState(`Tafel ${tableNumber}`);

  const addItemToTable = async (item) => {
    const ref = doc(db, `tables/${table.id}`);
    const drinks = table.drinks;

    updateDoc(ref, {
      drinks: [...drinks, item],
    });
  };

  return (
    <Modal
      className="w-full h-full max-w-[1080px] max-h-[820px] relative bg-white rounded-xl overflow-hidden"
      toggle={open}
      close={() => setOpen(false)}
    >
      <IconBtn
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4"
      >
        <CloseIcon />
      </IconBtn>
      {/* Two containers left and right one is the receipt and the other items that we can add to the receipt */}
      <div className="flex flex-row w-full h-full justify-between gap-2 b-50">
        <div className="w-full border-r p-4 overflow-scroll">
          <TableModalMenu
            addItemToTable={addItemToTable}
            sizes={sizes}
            table={table}
          />
        </div>
        <div className="w-full h-full flex border-l p-4 bg-white flex-col font-mono">
          <input
            value={tableName}
            className="appearance-none focus:outline-none text-center font-bold text-3xl border-b mt-6 pb-2"
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
              const number = value === "" ? 0 : parseInt(value, 10);
              setTableNumber(number);
              setTableName(`Tafel ${number}`);
            }}
            onBlur={() => {
              const ref = doc(db, `tables/${table.id}`);
              updateDoc(ref, {
                number: tableNumber,
              });
            }}
          />
          <div>test</div>
        </div>
      </div>
    </Modal>
  );
};

export default TableModal;
