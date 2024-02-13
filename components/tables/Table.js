import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Firebase imports
import { db } from "@/firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";
// Component imports
import TableModal from "@/components/tables/TableModal";

const Table = ({ table }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition(table.position);
  }, []);

  return (
    <>
      <TableModal talbe={table} open={open} table={table} setOpen={setOpen} />
      <motion.div
        drag
        onDragEnd={async (e, info) => {
          const ref = doc(db, `tables/${table.id}`);
          await updateDoc(ref, {
            position: {
              x: info.point.x,
              y: info.point.y,
            },
          });
        }}
        style={{
          left: position.x + "px",
          top: position.y + "px",
        }}
        className={`absolute select-none w-24 aspect-square bg-white rounded-md border shadow-md flex items-center justify-center text-3xl font-bold`}
      >
        {table.position.x} {table.position.y}
      </motion.div>
    </>
  );
};
export default Table;
