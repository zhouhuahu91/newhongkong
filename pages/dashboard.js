// React imports
import { useState, useEffect } from "react";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Header from "@/components/dashboard/DashboardHeader";
import OrderCard from "@/components/dashboard/OrderCard";
import Spinner from "@/components/Spinner";
import DashboardChat from "@/components/dashboard/DashboardChat";
import ToolTip from "@/components/ToolTip";
import PrintIcon from "@/icons/PrintIcon";
import IconBtn from "@/components/IconBtn";
import PrinterModal from "@/components/dashboard/PrinterModal";
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

  const [totalTips, setTotalTips] = useState(0);

  // We need the toggle for the chat modal here because when chat is open...
  // ... we need to disable the enter click event.
  const [chatModal, setChatModal] = useState(false);
  // We need the orders count to know when we play a new order sound.
  const [ordersCount, setOrdersCount] = useState(newOrders.length);
  // PrinterModal
  const [printerModal, setPrinterModal] = useState(false);
  const [printJobs, setPrintJobs] = useState([]);

  const { user } = useAuth();

  // listen for enter key with useEffect
  useEffect(() => {
    // listen for enter key
    const handleKeyDown = async (e) => {
      // chatModal has it's own enter key listener.
      if (e.key === "Enter" && lastSelectedOrder && !chatModal) {
        const ref = doc(db, `orders/${lastSelectedOrder.id}`);
        const snapshot = await getDoc(ref);
        const order = snapshot.data();
        // if enter key pressed we set order to printed
        // we get the ref

        // If order is printed ready and paid for we can put it on complete.
        if (order.printed && order.ready && order.paid) {
          await updateDoc(ref, {
            completed: true,
          });
          setLastSelectedOrder(null);
        }

        // If order is printed we can put it to ready.
        if (order.printed) {
          return updateDoc(ref, {
            ready: true,
          });
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lastSelectedOrder, chatModal]);

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

  // Gets all the id's of printer jobs
  useEffect(() => {
    const printerRef = collection(db, "printer");
    const unsubscribe = onSnapshot(printerRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setPrintJobs(data);
    });

    return () => unsubscribe();
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

      // We calculate all the tips for deliveryOrders.
      const tempTotalTips = deliveryOrders.reduce((x, y) => x + y.tip, 0);
      // If tempTotalTips is different than total tips we set totalTips to tempTotalTips.
      if (tempTotalTips !== totalTips) {
        setTotalTips(tempTotalTips);
      }

      // We sort the pick up orders by time. 16:00 => 1600.
      const sortedPickUpOrders = pickupOrders.sort((a, b) => {
        return a.time.replace(":", "") - b.time.replace(":", "");
      });
      // Delivery orders we need to check if it is an asap order if it is we just return the createdAt
      // This will return a really high number but we want these order to go on top so we devide it by even a bigger
      // number.
      // We just need the first time to sort the value. We slice the time to get 16:00 and then...
      // replace : with nothing so we eventually get 1600.

      const sortedDeliveryOrders = deliveryOrders.sort((a, b) => {
        let x = a.time.includes(":")
          ? a.time.slice(0, 5).replace(":", "")
          : a.createdAt / 10000000000000;
        let y = b.time.includes(":")
          ? b.time.slice(0, 5).replace(":", "")
          : b.createdAt / 10000000000000;
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
      <PrinterModal
        printerModal={printerModal}
        setPrinterModal={setPrinterModal}
        printJobs={printJobs}
      />
      <Header
        date={date}
        setDate={setDate}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />
      <div className="p-4 mt-8 select-none">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <div className="mb-4 border-b flex justify-center items-center">
              <h1 className="text-2xl font-semibold text-center mr-4">NEW</h1>
              <IconBtn onClick={() => setPrinterModal((prev) => !prev)}>
                <PrintIcon />
              </IconBtn>
            </div>
            <div className="grid gap-4">
              {newOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  atNew={true}
                  printJobs={printJobs}
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
                  printJobs={printJobs}
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
                  printJobs={printJobs}
                  lastSelectedOrder={lastSelectedOrder}
                  setLastSelectedOrder={setLastSelectedOrder}
                />
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <div className="text-2xl mb-4 font-semibold text-center border-b flex justify-center items-center">
              <h1 className="mr-2">DELIVERY</h1>
              <ToolTip
                tip={`total tips: ${euro(totalTips)} ${
                  totalTips > 0 ? "🥳" : "😭"
                }`}
                size="big"
              />
            </div>
            <div className="grid gap-4">
              {delivery.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  printJobs={printJobs}
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
