// React imports
import { useState, useEffect, useContext, createContext } from "react";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
import getDigitalTime from "@/functions/getDigitalTime";
import getURL from "@/functions/getURL";
import calculateDeliveryFees from "@/functions/calculateDeliveryFees";
// Hook imports
import { useCart } from "@/hooks/useCart";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import axios from "axios";

// First we create a context
const storeInfoContext = createContext();

// We export this context so we can use it in other components.
export const useStoreInfo = () => {
  return useContext(storeInfoContext);
};

// This Hook provides store data to all pages suchs as closing hours, phone number, etc.
const useStoreProvider = () => {
  const { cartState, dispatch } = useCart();
  // Information that we store in state we can let admins change.
  const [storeInfo, setStoreInfo] = useState({
    // True if store is open today. Defaults to true.
    open: true,
    // True if we are open for Delivery. Defaults to true.
    openForDelivery: true,
    // True if asap is available.
    asap: true,
    // The time that the store opens. Defaults to "16:00".
    openingTime: 16 * 3600,
    // The time that the store closes. Defaults to "21:00".
    closingTime: 21 * 3600,
    // The time we start to deliver. Defaults to "17:00".
    startTimeDelivery: 17 * 3600,
    // The time we stop to deliver. Defaults to "21:00".
    endTimeDelivery: 21 * 3600,
  });
  const [storeFees, setStoreFees] = useState({
    // The transaction fee. Defaults to 30 cents
    transactionFee: 30,
    // Delivery fee. Defaults to 250 cents
    deliveryFee: 250,
    // Minimum order amount. Defaults to 2000 cents.
    minimumOrderAmount: 2000,
    // Plastic bag fee. Defaults to 10 cents.
    plasticBagFee: 10,
  });
  const [notifications, setNotifications] = useState(false);
  const [printer, setPrinter] = useState(true);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(
    getCurrentTimeInSeconds()
  );

  const [liveMessage, setLiveMessage] = useState("");
  const URL = getURL();

  // These variables are just fixed and can't be changed by admin.
  // Users can order from 8 am while store is still closed.
  const preorderTime = 8 * 3600;

  // True if users can start placing orders.
  const openingSoon =
    currentTimeInSeconds > preorderTime &&
    currentTimeInSeconds < storeInfo.openingTime &&
    storeInfo.open;

  // True if we are closing soon to warn users..
  // In this case it is 30 minutes before closing time.
  // Also only is true when we are still open otherwise we are closed of course.
  const closingSoon =
    currentTimeInSeconds > storeInfo.closingTime - 1800 &&
    currentTimeInSeconds < storeInfo.closingTime &&
    storeInfo.open;

  // The remaining minutes untill we close.
  const remainingMinutes = Math.ceil(
    (storeInfo.closingTime - currentTimeInSeconds) / 60
  );

  // True if we are closed. // Uncomment this when going in production.
  const closed =
    currentTimeInSeconds > storeInfo.closingTime ||
    currentTimeInSeconds < preorderTime ||
    !storeInfo.open;

  // this is when delivery closes before closing time.
  const deliveryEndedWhileStoreOpen =
    currentTimeInSeconds > storeInfo.endTimeDelivery;

  const digitalClosingTime = getDigitalTime(storeInfo.closingTime);
  const digitalOpeningTime = getDigitalTime(storeInfo.openingTime);
  const digitalCurrentTime = getDigitalTime(currentTimeInSeconds);

  // This useEffect update the currentTime every minute.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeInSeconds(getCurrentTimeInSeconds());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // This useEffect fetches the currentDate and currentDay from the server.
  useEffect(() => {
    const fetchCurrentDate = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/fetchdate`);
        // If the dates are the same it means the users pc date is not wrong.
        if (currentDate !== data.currentDate) {
          setCurrentDate(data.currentDate);
        }
        // The same for day.
        if (currentDay !== data.day) {
          setCurrentDay(data.day);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCurrentDate();

    const fetchDatesInterval = setInterval(() => {
      fetchCurrentDate();
      // We refetch the dates every 10 minute.
    }, 600000);

    return () => clearInterval(fetchDatesInterval);
  }, []);

  // If we are not closed but we are closed for delivery and currently delivery is selected we need to revert it to "undecided".
  useEffect(() => {
    const deliveryShouldBeDisabled =
      (!storeInfo.openForDelivery || deliveryEndedWhileStoreOpen) &&
      cartState.delivery === true &&
      !closed;

    if (deliveryShouldBeDisabled) {
      dispatch({ type: "SET_DELIVERY", payload: false });
    }
  }, [
    closed,
    storeInfo.openForDelivery,
    cartState.delivery,
    dispatch,
    deliveryEndedWhileStoreOpen,
  ]);

  // // Fetches the store settings from server.
  // // We need new store info every day.
  useEffect(() => {
    const ref = doc(db, "general/settings");
    const unsubscribe = onSnapshot(ref, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setStoreInfo({ ...data.openingHours[currentDay] });
        setLiveMessage(data.liveMessage);
      }
    });

    return () => {
      unsubscribe();
    };
    // We refetch if the current date changes.
  }, [currentDate, currentDay]);

  // minimumOrderAmout and deliveryFee depends on the postalcode.
  useEffect(() => {
    // If there is no address in the cart we don't do anything.
    if (!cartState.address.postalcode) return;
    const deliveryFees = calculateDeliveryFees(cartState.address.postalcode);

    setStoreFees((prev) => ({
      ...prev,
      minimumOrderAmount: deliveryFees.minimum,
      deliveryFee: deliveryFees.fee,
    }));
  }, [cartState.address]);

  return {
    storeInfo,
    storeFees,
    currentTimeInSeconds,
    openingSoon,
    closingSoon,
    remainingMinutes,
    closed,
    deliveryEndedWhileStoreOpen,
    liveMessage,
    digitalClosingTime,
    digitalOpeningTime,
    digitalCurrentTime,
    currentDay,
    currentDate,
    notifications,
    setNotifications,
    printer,
    setPrinter,
  };
};

// We create the provider that we can rap our components.
export const StoreInfoProvider = ({ children }) => {
  const value = useStoreProvider();
  return (
    <storeInfoContext.Provider value={value}>
      {children}
    </storeInfoContext.Provider>
  );
};
