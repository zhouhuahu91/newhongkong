import { useState } from "react";
import TableModal from "@/tables/TableModal";
import useWindowSize from "@/hooks/useWindowSize";
import calculateTableTotal from "@/functions/calculateTableTotal";
import euro from "@/functions/euro";

const Table = ({
  table,
  physicalTable,
  createNewTable,
  date,
  physicalTables,
}) => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();

  const lgTableStyling = `border hover:shadow-md transition-all absolute font-medium ${physicalTable.position} ${physicalTable.type}`;
  const tableStyling = `w-full border my-1 h-14 shadow rounded font-bold`;

  let tableTotal = 0;
  if (table) {
    tableTotal = calculateTableTotal(table);
  }

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
        className={`${width > 1024 ? lgTableStyling : tableStyling} 
          ${
            table
              ? table.wantsToPay && !table.paid
                ? "bg-red-100"
                : "bg-green-100"
              : "bg-white"
          } 
          `}
      >
        {width > 1024
          ? physicalTable.number
          : `Tafel ${physicalTable.number} ${
              tableTotal > 0 ? `• ${euro(tableTotal)}` : ""
            }`}
      </button>
    </>
  );
};

export default Table;
