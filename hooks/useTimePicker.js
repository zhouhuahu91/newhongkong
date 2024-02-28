// React imports
import { useEffect, useState } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
// Hook imports
import { useCart } from "@/hooks/useCart";
import { useStoreInfo } from "@/hooks/useStoreInfo";
import useI18n from "@/hooks/useI18n";
// Function imports

const useTimePicker = () => {
  const { cartState } = useCart(); // Returns state from cart.
  const {
    currentTimeInSeconds,
    closed,
    storeInfo: {
      openingTime,
      closingTime,
      startTimeDelivery,
      endTimeDelivery,
      asap,
    },
    currentDate,
  } = useStoreInfo();
  // We need to know if timepicker is for delivery or takeaway
  const { delivery, cart } = cartState;
  // t is used to translate asap.
  const t = useI18n();
  // All the options are stored in this state.
  const [options, setOptions] = useState([]);
  // All the time slots that are already taken for pickup only.
  // If needed we can also add it for delivery.
  const [takenSlots, setTakenSlots] = useState({});
  // StartTime is just the current hour.
  const startTime = Math.floor(currentTimeInSeconds / 3600) * 3600;
  // We use the totalCartPrice to calculate the min waiting time for orders.
  // storefees are actually not relevant for calculating the total price for min waiting time.
  const totalCartPrice = cart.reduce((x, y) => x + y.price, 0);

  // This functions returns second param 16:00 => 16:30.
  const addThirtyMinutes = (hour, min) => {
    let hour2 = hour;
    // We add 30 minutes to the original time.
    let min2 = min + 30;
    // If minutes exceeds 60 that means it is in the next hour.
    if (min2 >= 60) {
      // We remove 60 minutes and add that to the hour
      min2 -= 60;
      hour2 += 1;
    }
    // We do not need to do this for hour because that is always after 16:00 thus...
    // it is never < 10.
    min2 = min2 < 10 ? "00" : min2;
    return `${hour2}:${min2}`;
  };

  // This is the main functions that calculates all the slots depending on the values.
  const getTimeSlots = () => {
    // The temp array that we later set to the state.
    const temp = [];
    // If we are closed return from functions.
    if (closed) {
      return setOptions(temp);
    }

    // If user selects delivery it means delivery equels true. We specify (delivery === true)...
    // because just (delivery) also gives true for "not yet decided".
    if (delivery === true) {
      // The interval between every slot for delivery is 15 minutes.
      const interval = 15 * 60;

      // Minimum waiting time is 15 minutes.
      // Explanation: We make sure that the users can't order for 18:00 when...
      // the current time is 17:59.
      const minWaitingTime = 15 * 60;

      // During opening hours we always add asap.
      if (
        currentTimeInSeconds >= startTimeDelivery &&
        currentTimeInSeconds <= endTimeDelivery &&
        open &&
        asap
      ) {
        temp.push(t.asap);
      }

      for (let i = startTime; i < endTimeDelivery; i += interval) {
        // If the i is smaller than currentTimeInSeconds + minWaitingTime...
        // or the store is closed (smaller than opening time) we continue.
        if (i < currentTimeInSeconds + minWaitingTime || i < startTimeDelivery)
          continue;

        // We get the hour by deviding i by 3600 seconds. The remainder are the minutes...
        // that's why we parseInt it.
        const hour = parseInt(i / 3600);
        // The remainder we devide by 60 to get the minutes.
        const min = (i % 3600) / 60;
        // We pass in the hour and the min to get the second parameter. See function for more details.
        const secondParam = addThirtyMinutes(hour, min);
        // If min is < 10 it is always "00" because 05 doesn't interval is every 15 min.
        min = min < 10 ? "00" : min;

        // This is the slot we are going to add to the array
        const slot = `${hour}:${min} - ${secondParam}`;

        // If there are more than 2 of these slots in the existing slots we continue
        if (takenSlots[slot] >= 2) continue;
        // We push the first and second parameter to the temp array.
        temp.push(slot);
      }
      return setOptions(temp);
    }

    // If delivery === false aka !delivery and delivery !== "not yet decided" we run...
    // the code below here. This just mean the user selected pick up.
    if (delivery === false) {
      // The interval for every pickup slot is 5 minutes.
      const interval = 5 * 60;

      const waitingTimeRules = [
        { threshold: 10000, time: 30 }, // For more than 100 euros
        { threshold: 7500, time: 25 }, // For more than 75 euros
        { threshold: 5000, time: 20 }, // For more than 50 euros
        { threshold: 2500, time: 15 }, // For more than 25 euros
      ];

      // Default minimum waiting time is 10 minutes
      let minWaitingTime = 10 * 60;

      // Loop through the rules in descending order of threshold
      for (const rule of waitingTimeRules) {
        if (totalCartPrice > rule.threshold) {
          minWaitingTime = rule.time * 60;
          break;
        }
      }
      // With minimum waiting time people can't order 15 minutes before closing time.
      // We set the minimum waiting time to 0 minutes when it is 15 min before closing.
      if (currentTimeInSeconds >= closingTime - 15 * 60) {
        minWaitingTime = 0 * 60;
      }

      for (let i = startTime; i <= closingTime; i += interval) {
        // If the i is smaller than currentTimeInSeconds + minWaitingTime...
        // or the store is closed (smaller than opening time) we continue.
        if (i < currentTimeInSeconds + minWaitingTime || i < openingTime)
          continue;
        // We get the hour by deviding i by 3600 seconds. The remainder are the minutes...
        // that's why we parseInt it.
        const hour = parseInt(i / 3600);
        // The remainder we devide by 60 to get the minutes.
        let min = (i % 3600) / 60;
        // If minutes is smaller than 10 we add a zero in front of it.
        min = min < 10 ? `0${min}` : min;
        // This is the slot we are going to add to the array.
        const slot = `${hour}:${min}`;
        // We check how many of these already exist in the takenSlots array.
        // If it is 2 or more we continue
        if (takenSlots[slot] >= 2) continue;
        // Else we push the slot into temp that we later set as the options.
        temp.push(slot);
      }

      return setOptions(temp);
    }
  };

  // This useEffect is to retrieve all slots taken from the database.
  useEffect(() => {
    const ref = doc(
      db,
      `timeSlots${delivery ? "Delivery" : "PickUp"}/${currentDate}`
    );
    // We subscribe to the firestore to retrieve a live list of all taken time slots.
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const count = {};
        // We check of the slot exists if it does we add one to it...
        // if it doesn't we set the slot count to 1
        if (data) {
          data.slots.forEach((slot) => {
            count[slot] ? (count[slot] += 1) : (count[slot] = 1);
          });
        }

        // We set the taken slots state to the count
        setTakenSlots(count);
      } else {
        // If the snap doesn't exist we set the slot back to an empty object.
        setTakenSlots({});
      }
    });

    return () => {
      // We unsubscribe from firebase when the component unmounts.
      unsubscribe();
    };
  }, [currentDate, delivery]); // We trigger when the currentDate changes or delivery changes.

  // This useEffect triggers the getTimeSlots function.
  // This makes sure the user always gets up to date time slots.
  useEffect(() => {
    getTimeSlots();
  }, [
    asap,
    delivery,
    currentDate,
    takenSlots,
    openingTime,
    closingTime,
    closed,
    startTimeDelivery,
    endTimeDelivery,
    totalCartPrice,
    currentTimeInSeconds, // This refreshes every 60 seconds this means this will render every 60 seconds minimum.
  ]);

  return options; // We return all the options here
};

export default useTimePicker;
