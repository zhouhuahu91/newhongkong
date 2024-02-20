import { useState } from "react";
import TableModal from "@/tables/TableModal";

// These are the types of tables.
const sizes = {
  round: "aspect-square w-28 rounded-full",
  small: "w-24 h-24 rounded-md",
  normal: "w-24 h-36 rounded-md",
  normalH: "h-24 w-36 rounded-md",
  big: "w-24 h-52 rounded-md",
  bigH: "w-52 h-24 rounded-md",
};

const tableStyling = "border rounded-md shadow-md absolute font-medium text-xl";

const Table = ({ table, physicalTable, createNewTable }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {table && <TableModal open={open} setOpen={setOpen} table={table} />}
      <button
        onClick={() => {
          // if there is a table with the same number as the physical table we open the modal
          if (table) {
            setOpen(true);
          } else {
            createNewTable(physicalTable.number);
            setOpen(true);
          }
        }}
        type="button"
        className={`${tableStyling} ${physicalTable.position} ${
          physicalTable.type
        } 
          ${
            table
              ? table?.printed && !table.paid
                ? "bg-red-100"
                : "bg-green-100"
              : ""
          } 
          `}
      >
        {physicalTable.number}
      </button>
    </>
  );
};

export default Table;
