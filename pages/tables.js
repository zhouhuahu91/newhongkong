import { useState, useEffect } from "react";
import router from "next/router";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
import useWindowSize from "@/hooks/useWindowSize";
// Component imports
import Spinner from "@/components/Spinner";
import StoreLayout from "@/tables/StoreLayout";
import Table from "@/tables/Table";
import ClosedTable from "@/tables/ClosedTable";
// import Table from "@/tables/Table";

const Tables = () => {
  const { currentDate } = useStoreInfo();
  const { user } = useAuth();
  const { width, height } = useWindowSize();
  const [tables, setTables] = useState([]);
  const [date, setDate] = useState(currentDate);

  const createNewTable = (number) => {
    const table = {
      number,
      beverages: [],
      food: [],
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

  // Tables page is only for admin...
  // If no user is not fetched yet we show spinner
  // If there is no user we redirect to log in
  // If there is a user but not an admin we redirect to home page.
  if (user === null) {
    return <Spinner />;
  } else if (user === false) {
    router.push("/sign_in");
    return <Spinner />;
  } else if (!user?.admin) {
    router.push("/");
    return <Spinner />;
  }

  if (width < 1080) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-4xl font-semibold">
        You need a bigger screen for tables.
      </div>
    );
  }

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

  // TO DO create a list a tables that are closed. that means paid and printed
  // We want to show these tables some how.

  return (
    <div className="w-full max-w-[1080px] mx-auto grid grid-cols-12 bg-white border shadow-md mt-5 xl:mt-20 rounded-xl">
      <div className="w-full relative h-[770px] col-span-10">
        {physicalTables.map((physicalTable) => {
          return (
            <Table
              key={physicalTable.number}
              table={tables.find(
                (table) =>
                  // if table is paid we do not want it to be placed in a phsysical table.
                  table.number === physicalTable.number && table.paid === false
              )}
              physicalTable={physicalTable}
              createNewTable={createNewTable}
              date={date}
            />
          );
        })}
        <StoreLayout date={date} setDate={setDate} />
      </div>
      <div className="col-span-2 p-4">
        <h1 className="px-2 pb-2 uppercase font-medium text-center text-sm border-b mb-2">
          gesloten tafels
        </h1>
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
  );
};

export default Tables;
