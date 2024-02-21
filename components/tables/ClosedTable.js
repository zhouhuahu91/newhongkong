import { useState } from "react";
// Component imports
import IconBtn from "@/components/IconBtn";
import TableModal from "@/tables/TableModal";
import UndoIcon from "@/icons/UndoIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const ClosedTable = ({ table }) => {
  const [tableNumber, setTableNumber] = useState(table.number);
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableModal open={open} setOpen={setOpen} table={table} />
      <button
        onClick={() => setOpen(true)}
        className="border bg-red-100 w-full flex items-center justify-center gap-4 rounded-md p-2 font-medium"
        key={table.id}
      >
        <IconBtn
          onClick={async (e) => {
            e.stopPropagation();

            const q = query(
              collection(db, "tables"),
              where("paid", "==", false)
            );

            const snapshot = await getDocs(q);
            const tables = snapshot.docs.map((doc) => doc.data().number);
            if (tables.includes(table.number)) {
              console.log("table already exists");
            } else {
              const ref = doc(db, `tables/${table.id}`);
              await updateDoc(ref, {
                paid: false,
                printed: false,
              });
            }
          }}
        >
          <UndoIcon size="20" />
        </IconBtn>
        <input
          className="appearance-none focus:outline-none text-center font-bold w-6 bg-red-100"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
            const number = value === "" ? 0 : parseInt(value, 10);
            setTableNumber(number);
          }}
          value={tableNumber}
        />
      </button>
    </>
  );
};

export default ClosedTable;
