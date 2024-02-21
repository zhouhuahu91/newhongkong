import { useState } from "react";
import TableModal from "@/tables/TableModal";

const ClosedTable = ({ table }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableModal open={open} setOpen={setOpen} table={table} />
      <button
        onClick={() => setOpen(true)}
        className="border w-full flex items-center justify-center rounded-md p-2 font-medium"
        key={table.id}
      >
        {table.number}
      </button>
    </>
  );
};

export default ClosedTable;
