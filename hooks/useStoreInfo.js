// React imports
import { useState, useEffect, useContext, createContext } from "react";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
import getDigitalTime from "@/functions/getDigitalTime";
import getURL from "@/functions/getURL";
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
  const { cartState } = useCart();
  // Information that we store in state we can let admins change.
  const [storeInfo, setStoreInfo] = useState({
    // True if store is open today. Defaults to true.
    open: true,
    // The time that the store opens. Defaults to "16:00".
    openingTime: 16 * 3600,
    // The time that the store closes. Defaults to "21:00".
    closingTime: 24 * 3600,
    // The time we start to deliver. Defaults to "17:00".
    startTimeDelivery: 16 * 3600,
    // The time we stop to deliver. Defaults to "21:00".
    endTimeDelivery: 24 * 3600,
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

    const fetchDatesInterval = setInterval(() => {
      fetchCurrentDate();
      // We refetch the dates every 3 hours.
    }, 10800000);

    return () => clearInterval(fetchDatesInterval);
  }, []);

  // Fetches the store settings from server.
  // We need new store info every day.
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
  }, [currentDate]);

  // minimumOrderAmout and deliveryFee depends on the postalcode.
  useEffect(() => {
    // If there is no address in the cart we don't do anything.
    if (!cartState.address.postalcode) return;
    if (
      // 2211 postalcode is the hardest
      // We need to check every combination and see how far away it is. If it is pretty far away we add the extra cost...
      // ... and a higher minimum
      // 2211SW is vlak bij ruigerhoekerweg.
      // 2211TW is zo wat in Noordwijk.
      // 2211V... dat niet herenweg is ver weg.
      /^(2204)[\s]?([a][bcnprsx]|[b-c][a-z])$|^(2211)[\s]?(a[degl]|bl|nx|v[cdeghjst]|w[dekjhg]|x[nptwxz]|z[bceh])$|^(2212)[\s]?a[abcegh]$/i.test(
        cartState.address.postalcode
      )
    ) {
      setStoreFees((prev) => ({
        ...prev,
        minimumOrderAmount: 2500,
        deliveryFee: 350,
      }));
    } else if (
      /^(2211)[\s]?(s[wz]|tw|v[klmnrp]|we|x[rs]|zg)$|^(2204)[\s]?([a][jkltvw])$/i.test(
        cartState.address.postalcode
      )
    ) {
      setStoreFees((prev) => ({
        ...prev,
        minimumOrderAmount: 3000,
        deliveryFee: 350,
      }));
    } else {
      setStoreFees((prev) => ({
        ...prev,
        minimumOrderAmount: 2000,
        deliveryFee: 250,
      }));
    }
  }, [cartState.address]);

  return {
    storeInfo,
    storeFees,
    currentTimeInSeconds,
    openingSoon,
    closingSoon,
    remainingMinutes,
    closed,
    liveMessage,
    digitalClosingTime,
    digitalOpeningTime,
    digitalCurrentTime,
    currentDay,
    currentDate,
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
