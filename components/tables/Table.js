import { useState } from "react";
import Draggable from "react-draggable";
// Firebase imports
import { db } from "@/firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
// Component imports
import TableModal from "@/components/tables/TableModal";

const Table = ({ table }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableModal talbe={table} open={open} table={table} setOpen={setOpen} />
      <Draggable
        onStop={async (e) => {
          const ref = doc(db, `tables/${table.id}`);
          await updateDoc(ref, {
            position: {
              x: e.clientX,
              y: e.clientY,
            },
          });
        }}
      >
        <div
          className={`aboslute select-none w-24 aspect-square bg-white rounded-md border shadow-md flex items-center justify-center text-3xl font-bold`}
        >
          {table.number}
        </div>
      </Draggable>
    </>
  );
};
export default Table;
