import { useState, useEffect } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
// Component imports
import StoreLayout from "@/tables/StoreLayout";
import Table from "@/tables/Table";
import ClosedTable from "@/tables/ClosedTable";
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
// Icon imports
import ForkAndSpoonIcon from "@/icons/ForkAndSpoonIcon";

const TablesModal = ({ date, setDate }) => {
  const [open, setOpen] = useState(false);
  const [tables, setTables] = useState([]);

  const createNewTable = (number) => {
    const table = {
      number,
      beverages: [],
      food: [],
      tip: 0,
      wantsToPay: false,
      paid: false,
      printed: false,
      paymentMethodType: null,
      date: date,
      createdAt: Date.now(),
    };

    addDoc(collection(db, "tables"), table);
  };

  useEffect(() => {
    const q = query(collection(db, "tables"), where("date", "==", date));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTables(data);
    });

    return () => unsubscribe();
  }, [date]);

  const sizes = {
    round: "aspect-square w-28 rounded-full",
    small: "w-24 h-24 rounded-md",
    normal: "w-24 h-36 rounded-md",
    normalH: "h-24 w-36 rounded-md",
    big: "w-24 h-52 rounded-md",
    bigH: "w-52 h-24 rounded-md",
  };

  const physicalTables = [
    {
      number: 1,
      type: sizes.normal,
      position: "top-6 right-36",
    },
    {
      number: 2,
      type: sizes.normalH,
      position: "top-[12rem] right-32",
    },
    {
      number: 3,
      type: sizes.normalH,
      position: "top-[19.5rem] right-32",
    },
    {
      number: 4,
      type: sizes.normalH,
      position: "top-[27rem] right-32",
    },
    {
      number: 5,
      type: sizes.normalH,
      position: "top-[34.5rem] right-32",
    },
    {
      number: 6,
      type: sizes.normal,
      position: "top-6 left-[26rem]",
    },
    {
      number: 7,
      type: sizes.big,
      position: "top-48 left-[26rem]",
    },
    {
      number: 8,
      type: sizes.round,
      position: "bottom-[14.5rem] left-[25.55rem]",
    },
    {
      number: 9,
      type: sizes.round,
      position: "bottom-[6rem] left-[25.55rem]",
    },
    {
      number: 10,
      type: sizes.normalH,
      position: "top-36 left-44",
    },
    {
      number: 11,
      type: sizes.normalH,
      position: "top-[16.7rem] left-44",
    },
  ];

  return (
    <>
      <IconBtn
        className="mx-2"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <ForkAndSpoonIcon />
      </IconBtn>
      <Modal
        toggle={open}
        close={() => {
          setOpen(false);
        }}
        className="w-full max-w-[1080px] grid grid-cols-10 border shadow-md rounded-xl bg-white gap-2 overflow-hidden"
      >
        <div className="w-full relative h-[770px] col-span-8 border bg-white text-base">
          {physicalTables.map((physicalTable) => {
            return (
              <Table
                key={physicalTable.number}
                table={tables.find(
                  (table) =>
                    // if table is paid we do not want it to be placed in a phsysical table.
                    table.number === physicalTable.number &&
                    table.paid === false
                )}
                physicalTable={physicalTable}
                physicalTables={physicalTables}
                createNewTable={createNewTable}
                date={date}
              />
            );
          })}
          <StoreLayout setOpen={setOpen} date={date} setDate={setDate} />
        </div>
        <div className="col-span-2 p-4 border-l shadow-inner bg-neutral-50 rounded-md overflow-scroll max-h-[800px]">
          <h1 className="px-2 pb-2 font-medium text-center text-sm border-b mb-2">
            gesloten tafels
          </h1>
          <div className="gap-2 flex flex-col overflow-scroll">
            {tables.map((table) => {
              if (table.paid) {
                return (
                  <ClosedTable
                    physicalTables={physicalTables}
                    date={date}
                    key={table.id}
                    table={table}
                  />
                );
              }
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TablesModal;
