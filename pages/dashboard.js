// React imports
import { useState, useEffect, useRef } from "react";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Header from "@/components/dashboard/DashboardHeader";
import OrderCard from "@/components/dashboard/OrderCard";
import Spinner from "@/components/Spinner";
// Firebase imports
import { db } from "@/firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Dashboard = () => {
  const { currentDate } = useStoreInfo();
  // Show orders that are completed or not.
  const [showCompleted, setShowCompleted] = useState(false);
  // Dashboard displays the orders made on this date.
  const [date, setDate] = useState(currentDate);
  // Dashboard orders are filtered in 4 categories:
  // 1. New orders.
  const [newOrders, setNewOrders] = useState([]);
  // 2. Orders in the kitchen.
  const [printed, setPrinted] = useState([]);
  // 3. Orders that are ready for pickup.
  const [pickup, setPickup] = useState([]);
  // 4. Orders that are being delivered.
  const [delivery, setDelivery] = useState([]);
  const { user } = useAuth();

  // const newOrdersCount = useRef(0);

  // useEffect(() => {
  //   const audio = new Audio("/bell.mp3");
  //   if (newOrdersCount.current > newOrders.length) {
  //     return (newOrdersCount.current = newOrders.length);
  //   }
  //   if (newOrders.length > newOrdersCount.current) {
  //     audio.play();
  //     newOrdersCount.current = newOrders.length;
  //   }
  // }, [newOrders]);

  useEffect(() => {
    const q = query(collection(db, "orders"), where("date", "==", date));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      // We sort the data by time.
      data.sort((a, b) => {
        // If a.time or b.time includes ":" it means...
        // the order isn't asap and we set x or y to 0.
        // This way that order is always on top.
        let x = a.time.includes(":")
          ? a.time.slice(0, 5).replace(":", "")
          : "0";
        let y = b.time.includes(":")
          ? b.time.slice(0, 5).replace(":", "")
          : "0";
        return x - y;
      });

      const filtered = data.filter((order) =>
        showCompleted ? order : order.completed === false
      );

      // Sets newOrders to orders that haven't been printed and aren't ready yet.
      setNewOrders(
        filtered.filter((order) => {
          if (!order.printed) return order;
        })
      );

      // Sets printed to orders that are printed and that aren't ready yet.
      setPrinted(
        filtered.filter((order) => {
          if (order.printed && !order.ready) return order;
        })
      );

      // Sets delivery to orders that are for delivery and are ready.
      setDelivery(
        filtered.filter((order) => {
          if (order.delivery && order.ready) return order;
        })
      );

      // Sets pickup to orders that are for pickup and are ready.ƒ
      setPickup(
        filtered.filter((order) => {
          if (!order.delivery && order.ready) return order;
        })
      );
    });

    return () => unsubscribe();
  }, [date, showCompleted]);

  useEffect(() => {
    if (user !== null && !user?.admin) {
      router.push("/sign_in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || (!user?.admin && !user?.employee)) return <Spinner />;

  return (
    <div>
      <Header
        date={date}
        setDate={setDate}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      <div className="p-4 mt-8 select-none">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              NEW
            </h1>
            <div className="grid gap-4">
              {newOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              KITCHEN
            </h1>
            <div className="grid gap-4">
              {printed.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              PICK UP
            </h1>
            <div className="grid gap-4">
              {pickup.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              DELIVERY
            </h1>
            <div className="grid gap-4">
              {delivery.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
