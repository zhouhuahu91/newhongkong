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

const Table = ({ tables, createNewTable }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const activeTables = tables.map((table) => table.number);

  return (
    <>
      {tables.map((table) => {
        return (
          <TableModal
            key={table.id}
            table={table}
            sizes={sizes}
            open={selectedTable?.id === table.id}
            setSelectedTable={setSelectedTable}
          />
        );
      })}
      <button
        onClick={() => {
          // If there is already a table number 1 we open that table.
          if (activeTables.includes(1)) {
            setSelectedTable(tables.find((table) => table.number === 1));
          } else {
            createNewTable(1);
          }
        }}
        type="button"
        className={`${sizes.normal} ${tableStyling} ${
          activeTables.includes(1) ? "bg-green-100" : ""
        } top-6 right-56`}
      >
        1
      </button>
      <button
        onClick={() => {
          // If there is already a table number 2 we open that table.
          if (activeTables.includes(2)) {
            setSelectedTable(tables.find((table) => table.number === 2));
          } else {
            createNewTable(2);
          }
        }}
        type="button"
        className={`${sizes.normalH} ${tableStyling} ${
          activeTables.includes(2) ? "bg-green-100" : ""
        } top-[12rem] right-48`}
      >
        2
      </button>
      <button
        onClick={() => {
          // If there is already a table number 2 we open that table.
          if (activeTables.includes(3)) {
            setSelectedTable(tables.find((table) => table.number === 3));
          } else {
            createNewTable(3);
          }
        }}
        type="button"
        className={`${sizes.normalH} ${tableStyling} ${
          activeTables.includes(3) ? "bg-green-100" : ""
        } top-[19.5rem] right-48`}
      >
        3
      </button>
      <button
        onClick={() => {
          // If there is already a table number 2 we open that table.
          if (activeTables.includes(4)) {
            setSelectedTable(tables.find((table) => table.number === 4));
          } else {
            createNewTable(4);
          }
        }}
        type="button"
        className={`${sizes.normalH} ${tableStyling} ${
          activeTables.includes(4) ? "bg-green-100" : ""
        } top-[27rem] right-48`}
      >
        4
      </button>
      <button
        onClick={() => {
          // If there is already a table number 2 we open that table.
          if (activeTables.includes(5)) {
            setSelectedTable(tables.find((table) => table.number === 5));
          } else {
            createNewTable(5);
          }
        }}
        type="button"
        className={`${sizes.normalH} ${tableStyling} ${
          activeTables.includes(5) ? "bg-green-100" : ""
        } top-[34.5rem] right-48`}
      >
        5
      </button>
    </>
  );
};

export default Table;
