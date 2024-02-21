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
      date: currentDate,
      createdAt: Date.now(),
    };

    addDoc(collection(db, "tables"), table);
  };

  useEffect(() => {
    const q = query(collection(db, "tables"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTables(data);
    });

    return () => unsubscribe();
  }, []);

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
  ];

  // TO DO create a list a tables that are closed. that means paid and printed
  // We want to show these tables some how.

  return (
    <div className="w-full max-w-[1080px] mx-auto grid grid-cols-12 bg-white border shadow-md mt-5 xl:mt-20 rounded-xl">
      <div className="w-full relative h-[770px] col-span-10">
        <StoreLayout date={date} setDate={setDate} />
        {physicalTables.map((physicalTable) => (
          <Table
            key={physicalTable.number}
            table={tables.find(
              (table) => table.number === physicalTable.number
            )}
            physicalTable={physicalTable}
            createNewTable={createNewTable}
          />
        ))}
      </div>
      <div className="col-span-2"></div>
    </div>
  );
};

export default Tables;
