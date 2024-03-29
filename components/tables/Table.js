import { useState } from "react";
import TableModal from "@/tables/TableModal";

const tableStyling =
  "border hover:shadow-md transition-all absolute font-medium xt-xl";

const Table = ({
  table,
  physicalTable,
  createNewTable,
  date,
  physicalTables,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {table && (
        <TableModal
          open={open}
          setOpen={setOpen}
          table={table}
          date={date}
          physicalTables={physicalTables}
        />
      )}
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
              ? table.wantsToPay && !table.paid
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
