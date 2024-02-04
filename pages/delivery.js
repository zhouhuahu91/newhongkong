// React imports
import { useState, useEffect } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
// Component imports
import OrderCard from "@/components/dashboard/OrderCard";
import Spinner from "@/components/Spinner";
import PedalBikeIcon from "@/icons/PedalBikeIcon";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// NextJs imports
import { useRouter } from "next/router";

const Delivery = () => {
  const [orders, setOrders] = useState([]);
  const [comingUp, setComingUp] = useState([]);

  const router = useRouter();
  const t = useI18n();
  const { user } = useAuth();
  const { currentDate } = useStoreInfo();

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("delivery", "==", true),
      where("completed", "==", false),
      where("date", "==", currentDate)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      // filter orders that are ready
      const ready = data.filter((order) => {
        return order.ready;
      });
      // filter orders that are not ready but printed
      const notReady = data.filter((order) => {
        return !order.ready && order.printed;
      });
      setOrders(ready);
      setComingUp(notReady);
    });

    return () => unsubscribe();
  }, [currentDate]);

  // Delivery page is only for admins or emplyees
  // If user not fetched we show spinner
  // If there is no user we rerout to sign in
  // if there is a user but not an admin or emplyee we rerout to home page.
  if (user === null) {
    return <Spinner />;
  } else if (user === false) {
    router.push("/sign_in");
    return <Spinner />;
  } else if (!user?.admin && !user?.employee) {
    router.push("/");
    return <Spinner />;
  }

  return (
    <div className="max-w-sm mx-auto p-4 space-y-4">
      {orders.length === 0 && comingUp.length === 0 && (
        <div className="flex mt-20 flex-col items-center justify-center">
          <PedalBikeIcon size="38" />
          <span className="text-xs">{t.no_orders}...</span>
        </div>
      )}
      {orders.length > 0 && (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center border-b">
            {t.delivery}
          </h1>
          {orders.map((order) => {
            return <OrderCard order={order} key={order.id} />;
          })}
        </div>
      )}
      {comingUp.length > 0 && (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center border-b">
            {t.coming_up}
          </h1>
          {comingUp.map((order) => {
            return <OrderCard order={order} key={order.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Delivery;
