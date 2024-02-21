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

const ClosedTable = ({ table, date, physicalTables }) => {
  const [tableNumber, setTableNumber] = useState(table.number);
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableModal open={open} setOpen={setOpen} table={table} date={date} />
      <div
        onClick={() => setOpen(true)}
        className="border bg-red-100 w-full flex items-center justify-center gap-4 rounded-md p-2 font-medium cursor-pointer"
        key={table.id}
      >
        <IconBtn
          onClick={async (e) => {
            e.stopPropagation();
            const q = query(
              collection(db, "tables"),
              where("paid", "==", false),
              where("date", "==", date)
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
          className="appearance-none focus:outline-none text-center font-bold w-8 bg-red-100"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
            const number = value === "" ? 0 : parseInt(value, 10); // If there is no digits we use 0
            setTableNumber(number);
          }}
          onBlur={async () => {
            // If physical table doesn't exist we reset the table number
            const physicalTableNumbers = physicalTables.map((x) => x.number);
            if (!physicalTableNumbers.includes(tableNumber)) {
              setTableNumber(table.number);
              // and return by warning the table doesn't exist
              return window.alert(`TAFEL ${tableNumber} BESTAAT NIET!`);
            }
            const ref = doc(db, `tables/${table.id}`);
            await updateDoc(ref, {
              number: tableNumber,
            });
          }}
          value={tableNumber}
        />
      </div>
    </>
  );
};

export default ClosedTable;
