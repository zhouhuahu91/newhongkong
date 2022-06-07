// React imports
import { useState, useEffect, useContext, createContext } from "react";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";

// First we create a context
const storeInfoContext = createContext();

// We export this context so we can use it in other components.
export const useStoreInfo = () => {
  return useContext(storeInfoContext);
};

// This Hook provides store data to all pages suchs as closing hours, phone number, etc.
const useStoreProvider = () => {
  const [storeInfo, setStoreInfo] = useState({
    // true if store is open today. Defaults to true.
    open: true,
    // The time that the store opens. Defaults to "16:00".
    openingTime: 16 * 3600,
    // The time that the store closes. Defaults to "21:00".
    closingTime: 21 * 3600,
    // The time we start to deliver. Defaults to "17:00".
    startTimeDelivery: 17 * 3600,
    // The time we stop to deliver. Defaults to "21:00".
    endTimeDelivery: 21 * 3600,
    // This creates a date based on the current date on users computer.
    // We later fetch the current date from server just in case the users...
    // ...computer's date is not correct.
    currentDate: getCurrentDate(),
  });

  return { ...storeInfo };
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
