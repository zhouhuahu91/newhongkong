// React imports
import { useState, useEffect, useRef } from "react";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Header from "@/components/dashboard/DashboardHeader";
import OrderCard from "@/components/dashboard/OrderCard";
import Spinner from "@/components/Spinner";
import DashboardChat from "@/components/dashboard/DashboardChat";
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

const Dashboard = () => {
  const { currentDate } = useStoreInfo();
  const [audio, setAudio] = useState(null);
  // Show orders that are completed or not.
  const [showCompleted, setShowCompleted] = useState(false);
  // Dashboard displays the orders made on this date.
  const [date, setDate] = useState(currentDate);
  // This state holds the id of the last selected order.
  const [lastSelectedOrder, setLastSelectedOrder] = useState(null);
  // Dashboard orders are filtered in 4 categories:
  // 1. New orders.
  const [newOrders, setNewOrders] = useState([]);
  // 2. Orders in the kitchen.
  const [printed, setPrinted] = useState([]);
  // 3. Orders that are ready for pickup.
  const [pickup, setPickup] = useState([]);
  // 4. Orders that are being delivered.
  const [delivery, setDelivery] = useState([]);

  // We need the toggle for the chat modal here because when chat is open...
  // ... we need to disable the enter click event.
  const [chatModal, setChatModal] = useState(false);
  // We need the orders count to know when we play a new order sound.
  const [ordersCount, setOrdersCount] = useState(newOrders.length);

  const { user } = useAuth();

  // listen for enter key
  const handleKeyDown = async (e) => {
    // chatModal has it's own enter key listener.
    if (e.key === "Enter" && lastSelectedOrder && !chatModal) {
      const ref = doc(db, `orders/${lastSelectedOrder.id}`);
      const snapshot = await getDoc(ref);
      const order = snapshot.data();
      // if enter key pressed we set order to printed
      // we get the ref

      if (order.printed && order.ready && order.paid) {
        updateDoc(ref, {
          completed: true,
        });
        setLastSelectedOrder(null);
      }

      if (order.printed && order.ready) {
        return updateDoc(ref, {
          paid: true,
        });
      }

      if (order.printed) {
        return updateDoc(ref, {
          ready: true,
        });
      }

      updateDoc(ref, {
        printed: true,
      });
    }
  };
  // listen for enter key with useEffect
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lastSelectedOrder, chatModal, handleKeyDown]);

  useEffect(() => {
    if (ordersCount > newOrders.length) {
      return setOrdersCount(newOrders.length);
    }
    if (newOrders.length > ordersCount && audio) {
      audio.play();
      setOrdersCount(newOrders.length);
    }
  }, [newOrders, audio, ordersCount]);

  useEffect(() => {
    setAudio(new Audio("/bell.mp3"));
  }, []);

  useEffect(() => {
    const q = query(collection(db, "orders"), where("date", "==", date));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      // We seperate the orders in delivery and pick up.
      const deliveryOrders = data.filter((order) => order.delivery);
      const pickupOrders = data.filter((order) => !order.delivery);

      // We sort the pick up orders by time. 16:00 => 1600.
      const sortedPickUpOrders = pickupOrders.sort((a, b) => {
        return a.time.replace(":", "") - b.time.replace(":", "");
      });
      // Delivery orders we need to check if it is an asap order if it is we just return 0 this makes the...
      // the order go on top. If not than the time will have a value e.a. 16:00 - 16:30.
      // We just need the first time to sort the value. We slice the time to get 16:00 and then...
      // replace : with nothing so we eventually get 1600.
      const sortedDeliveryOrders = deliveryOrders.sort((a, b) => {
        let x = a.time.includes(":")
          ? a.time.slice(0, 5).replace(":", "")
          : "0";
        let y = b.time.includes(":")
          ? b.time.slice(0, 5).replace(":", "")
          : "0";
        return x - y;
      });

      // Just to show completed or not completed orders.
      const filtered = [...sortedPickUpOrders, ...sortedDeliveryOrders].filter(
        (order) => (showCompleted ? order : order.completed === false)
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
                <OrderCard
                  key={order.id}
                  order={order}
                  lastSelectedOrder={lastSelectedOrder}
                  setLastSelectedOrder={setLastSelectedOrder}
                />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              KITCHEN
            </h1>
            <div className="grid gap-4">
              {printed.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  lastSelectedOrder={lastSelectedOrder}
                  setLastSelectedOrder={setLastSelectedOrder}
                />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              PICK UP
            </h1>
            <div className="grid gap-4">
              {pickup.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  lastSelectedOrder={lastSelectedOrder}
                  setLastSelectedOrder={setLastSelectedOrder}
                />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              DELIVERY
            </h1>
            <div className="grid gap-4">
              {delivery.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  lastSelectedOrder={lastSelectedOrder}
                  setLastSelectedOrder={setLastSelectedOrder}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <DashboardChat open={chatModal} setOpen={setChatModal} />
    </div>
  );
};

export default Dashboard;
