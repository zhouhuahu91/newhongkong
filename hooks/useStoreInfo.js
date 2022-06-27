// React imports
import { useState, useEffect, useContext, createContext } from "react";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
// Hook imports
import { useCart } from "@/hooks/useCart";

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
    // This creates a date based on the current date on users computer.
    // We later fetch the current date from server just in case the users...
    // ...computer's date is not correct.
    currentDate: getCurrentDate(),
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
  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(
    getCurrentTimeInSeconds()
  );
  const [liveMessage, setLiveMessage] = useState("");
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
  const closed = false;
  // currentTimeInSeconds > storeInfo.closingTime ||
  // currentTimeInSeconds < preorderTime ||
  // !storeInfo.open;

  // This useEffect update the currentTime every minute.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeInSeconds(getCurrentTimeInSeconds());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // minimumOrderAmout and deliveryFee depends on the postalcode.
  useEffect(() => {
    // If there is no address in the cart we don't do anything.
    if (!cartState.address) return;
    if (/^(2204)[\s]?[a-z]{2}$/i.test(cartState.address.postalcode)) {
      setStoreFees((prev) => ({
        ...prev,
        minimumOrderAmount: 3000,
        deliveryFee: 350,
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
