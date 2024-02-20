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
      type: "small",
      position: {
        x: 10,
        y: 10,
      },
      beverages: [],
      food: [],
      paid: false,
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
  return (
    <div className="w-full max-w-[1080px] mx-auto">
      <div className="w-full border rounded-xl shadow-md bg-white relative h-[770px] mt-5 xl:mt-20">
        <StoreLayout date={date} setDate={setDate} />
        <Table tables={tables} createNewTable={createNewTable} />
      </div>
    </div>
  );
};

export default Tables;
