// React imports
import { useState, useEffect } from "react";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Spinner from "@/components/Spinner";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
// Fucntion imports
import euro from "@/functions/euro";

const Kitchen = () => {
  const { currentDate, digitalCurrentTime } = useStoreInfo();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("date", "==", currentDate),
      where("printed", "==", true),
      where("completed", "==", false),
      where("ready", "==", false)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(data);
      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col p-2">
      <div>
        {currentDate} {digitalCurrentTime}
      </div>
      <div className="flex flex-row-reverse gap-4 overflow-y-scroll">
        {orders.map((order) => (
          <div
            className="border p-4 shadow-sm bg-white min-w-80 h-full"
            key={order.id}
          >
            <div className="w-full text-3xl flex justify-center font-bold py-2">
              {order.time}
            </div>
            <div className="flex justify-between border-y py-2 text-sm">
              <div>#001</div>
              <div>{order.date}</div>
            </div>
            <div className="text-xl font-medium py-2">
              {order.cart.map((item) => (
                <div key={item.id}>
                  <div className="grid grid-cols-12">
                    <div className="col-span-1">{item.qwt}</div>
                    <div className="col-span-8">{item.name["en"]}</div>
                    <div className="col-span-3 text-right">
                      {euro(item.price)}
                    </div>
                  </div>
                  {item.selectedOptions.map((side, id) => (
                    <div key={id} className="grid grid-cols-12">
                      <div className="col-span-1" />
                      <div>{side}</div>
                    </div>
                  ))}
                  {item.selectedSides.map((side, id) => (
                    <div key={id} className="grid grid-cols-12">
                      <div className="col-span-1" />
                      <div>{side}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="text-right text-xl border-t py-2 my-2">
              <div>totaal {euro(order.total)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kitchen;
