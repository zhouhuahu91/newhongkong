import { useState } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
// Component imports
import Dragable from "@/components/Dragable";
import TableModal from "@/components/tables/TableModal";

const Table = ({ table }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableModal talbe={table} open={open} setOpen={setOpen} />
      <Dragable
        onClick={() => setOpen(true)}
        position={table.position}
        setPosition={(position) => {
          const ref = doc(db, `tables/${table.id}`);
          updateDoc(ref, {
            position,
          });
        }}
      >
        <div
          className={`select-none fixed w-24 aspect-square bg-white rounded-md border shadow-md flex items-center justify-center text-3xl font-bold`}
        >
          {table.number}
        </div>
      </Dragable>
    </>
  );
};
export default Table;
