import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
// Firebase imports
import { db } from "@/firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
// Component imports
import TableModal from "@/tables/TableModal";

const Table = ({ table }) => {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // I am not 100% sure how this work but this library solves the dragging issue.
  // it calculates the position of the div and also get() the correct top and left values.
  const x = useMotionValue(table.position.x);
  const y = useMotionValue(table.position.y);

  return (
    <>
      <TableModal talbe={table} open={open} table={table} setOpen={setOpen} />
      <motion.div
        onClick={() => {
          if (!isDragging) setOpen(true);
        }}
        drag
        onDragStart={() => setIsDragging(true)}
        onDragEnd={async () => {
          const ref = doc(db, `tables/${table.id}`);
          await updateDoc(ref, {
            position: {
              x: x.get(),
              y: y.get(),
            },
          });
          setIsDragging(false);
        }}
        style={{
          x,
          y,
        }}
        className={`absolute cursor-pointer select-none w-28 aspect-square bg-white rounded-full border shadow-md flex items-center justify-center text-3xl font-bold`}
      >
        {table.number}
      </motion.div>
    </>
  );
};
export default Table;