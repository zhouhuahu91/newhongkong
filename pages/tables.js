import { useState, useEffect } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  query,
  updateDoc,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Header from "@/tables/Header";
import Spinner from "@/components/Spinner";
import StoreLayout from "@/tables/StoreLayout";
import Dragable from "@/components/Dragable";

const Tables = () => {
  const { currentDate } = useStoreInfo();
  const { user } = useAuth();
  const [tables, setTables] = useState([]);
  const [date, setDate] = useState(currentDate);

  const createNewTable = () => {
    const table = {
      number: tables.length + 1,
      position: {
        x: 0,
        y: 0,
      },
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

  return (
    <>
      <Header date={date} setDate={setDate} />
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="w-full border rounded-xl relative h-[756px] mt-o xl:mt-20">
          <StoreLayout />
          {tables.map((table) => {
            const ref = doc(db, `tables/${table.id}`);
            return (
              <Dragable
                position={table.position}
                setPosition={(position) => {
                  updateDoc(ref, {
                    position,
                  });
                }}
                key={table.id}
              >
                <div
                  className={`fixed w-24 aspect-square bg-white rounded-md border shadow-xl flex items-center justify-center text-3xl font-bold`}
                >
                  {table.number}
                </div>
              </Dragable>
            );
          })}
          <button
            onClick={() => createNewTable()}
            type="button"
            className="button absolute bottom-3 right-80 bg-main text-white w-40"
          >
            Nieuwe tafel
          </button>
        </div>
      </div>
    </>
  );
};

export default Tables;
