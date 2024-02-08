// React imports
import { useState, useEffect } from "react";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
// Component imports
import Header from "@/components/dashboard/DashboardHeader";
import OrderCard from "@/components/dashboard/OrderCard";
import Spinner from "@/components/Spinner";
import DashboardChat from "@/components/dashboard/DashboardChat";
import ToolTip from "@/components/ToolTip";
import PrintIcon from "@/icons/PrintIcon";
import IconBtn from "@/components/IconBtn";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// Fucntion imports
import euro from "@/functions/euro";

const Dashboard = () => {
  const router = useRouter();
  const { currentDate } = useStoreInfo();
  const { user } = useAuth();
  // We store all orders here
  const [orders, setOrders] = useState([]);
  // We need to keep score of the orders length to know when we play a new order sound.
  const [ordersLength, setOrdersLength] = useState(0);
  // Audio will be stored here
  const [audio, setAudio] = useState(null);
  // Show orders that are completed or not.
  const [showCompleted, setShowCompleted] = useState(false);
  // Dashboard displays the orders made on this date.
  const [date, setDate] = useState(currentDate);
  // This state holds the id of the last selected order.
  const [lastSelectedOrder, setLastSelectedOrder] = useState(null);
  // The job currently in the printer.
  // Should never be more than one.
  const [printJobs, setPrintJobs] = useState([]);
  // We need the toggle for the chat modal here because when chat is open...
  // ... we need to disable the enter click event.
  const [chatModal, setChatModal] = useState(false);

  const totalTips = orders.reduce((x, y) => (y.delivery ? x + y.tip : x), 0);

  // listen for enter key with useEffect
  useEffect(() => {
    // listen for enter key
    const handleKeyDown = async (e) => {
      // chatModal has it's own enter key listener.
      if (e.key === "Enter" && lastSelectedOrder && !chatModal) {
        const ref = doc(db, `orders/${lastSelectedOrder.id}`);
        const [order] = orders.filter((x) => x.id === lastSelectedOrder.id);
        // If there is no order we return.
        if (!order) return;
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
  }, [lastSelectedOrder, chatModal, orders]);

  useEffect(() => {
    // If the current orders count is bigger than the length of orders
    if (ordersLength > orders.length) {
      return setOrdersLength(orders.length);
    }
    // If this is true we play the audio and set the new orders counts.
    if (orders.length > ordersLength && audio) {
      audio.play();
      setOrdersLength(orders.length);
    }
  }, [audio, ordersLength, orders.length]);

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
      setOrders([...sortedPickUpOrders, ...sortedDeliveryOrders]);
    });

    return () => unsubscribe();
  }, [date]);

  // Dashboard is only for admin...
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
    <div>
      <Header
        date={date}
        setDate={setDate}
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
        printJobs={printJobs}
        orders={orders}
      />
      <div className="p-4 mt-8 select-none">
        <div className="grid grid-cols-12">
          {/* ***** START FIRST COLUMN ****** */}

          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <div className="mb-4 border-b flex justify-center items-center">
              <h1 className="text-2xl font-semibold text-center mr-4">NEW</h1>
              <IconBtn
                // disable the button if there are no print jobs.
                disabled={printJobs.length < 1}
                onClick={() =>
                  printJobs.forEach(async (job) => {
                    const ref = doc(db, `printer/${job.id}`);
                    await deleteDoc(ref);
                  })
                }
              >
                <PrintIcon
                  className={printJobs.length > 0 ? "animate-bounce" : ""}
                />
              </IconBtn>
            </div>
            <div className="grid gap-4">
              {/* First column is for all the orders that are not printed aka new orders. */}
              {orders.map((order) => {
                if (order.printed === false) {
                  // We want the first order in line that hasn't been printed yet and doesn't have remarks.
                  const firstInLine = orders.find((order) => {
                    // We also need to check if one of the items in the cart has remarks
                    const itemsHasRemarks = order.cart.some(
                      (item) => item.remarks && item.remarks.trim() !== ""
                    );
                    if (order.paymentMethod === "online" && !order.paid) return;
                    if (order.remarks.trim()) return;
                    if (order.printed) return;
                    if (order.delivery) return;
                    if (itemsHasRemarks) return;
                    return order;
                  });
                  return (
                    <OrderCard
                      firstInLine={firstInLine}
                      key={order.id}
                      order={order}
                      atNew={true}
                      // We use this to disable print if there is already an order printing.
                      printerBusy={printJobs.length > 0}
                      // We want to show a spinner if current order is printing.
                      isPrinting={printJobs
                        .map((job) => job.id)
                        .includes(order.id)}
                      lastSelectedOrder={lastSelectedOrder}
                      setLastSelectedOrder={setLastSelectedOrder}
                    />
                  );
                }
              })}
            </div>
          </div>

          {/* ***** END FIRST COLUMN ****** */}
          {/* ***** START SECOND COLUMN ****** */}

          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              KITCHEN
            </h1>
            <div className="grid gap-4">
              {/* these are the orders that are in the kitchen. */}
              {orders.map((order) => {
                if (order.printed && !order.ready)
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      // We use this to disable print if there is already an order printing.
                      printerBusy={printJobs.length > 0}
                      // We want to show a spinner if current order is printing.
                      isPrinting={printJobs
                        .map((job) => job.id)
                        .includes(order.id)}
                      lastSelectedOrder={lastSelectedOrder}
                      setLastSelectedOrder={setLastSelectedOrder}
                    />
                  );
              })}
            </div>
          </div>

          {/* ***** END SECOND COLUMN ****** */}
          {/* ***** START THIRD COLUMN ****** */}

          <div className="col-span-12 md:col-span-6 xl:col-span-3 flex flex-col px-2">
            <h1 className="text-2xl mb-4 font-semibold text-center border-b">
              PICK UP
            </h1>
            <div className="grid gap-4">
              {/* These are orders that are printed and ready for pickup. */}
              {orders.map((order) => {
                // If order is already completed and show order is false we return
                if (order.completed && showCompleted === false) return;
                if (order.printed && order.ready && !order.delivery)
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      // We use this to disable print if there is already an order printing.
                      printerBusy={printJobs.length > 0}
                      // We want to show a spinner if current order is printing.
                      isPrinting={printJobs
                        .map((job) => job.id)
                        .includes(order.id)}
                      lastSelectedOrder={lastSelectedOrder}
                      setLastSelectedOrder={setLastSelectedOrder}
                    />
                  );
              })}
            </div>
          </div>

          {/* ***** END THIRD COLUMN ****** */}
          {/* ***** START FOURTH COLUMN ****** */}

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
              {/* These are orders that are on the way */}
              {orders.map((order) => {
                // If order is already completed and show order is false we return
                if (order.completed && showCompleted === false) return;
                if (order.printed && order.ready && order.delivery)
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      // We use this to disable print if there is already an order printing.
                      printerBusy={printJobs.length > 0}
                      // We want to show a spinner if current order is printing.
                      isPrinting={printJobs
                        .map((job) => job.id)
                        .includes(order.id)}
                      lastSelectedOrder={lastSelectedOrder}
                      setLastSelectedOrder={setLastSelectedOrder}
                    />
                  );
              })}
            </div>
          </div>
          {/* ***** END FOURTH COLUMN ****** */}
        </div>
      </div>
      <DashboardChat open={chatModal} setOpen={setChatModal} />
    </div>
  );
};

export default Dashboard;
