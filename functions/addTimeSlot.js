import { db } from "@/firebase/admin";

// This function only works on server because it uses the firebase admin sdk.
const addTimeSlot = async (data) => {
  const { date, time, delivery, total } = data;
  let existingSlots = [];

  try {
    // We look up the ref.
    const ref = db.doc(
      `timeSlots${delivery === true ? "Delivery" : "PickUp"}/${date}`
    );
    // We get the snapshot of the ref.
    const snapshot = await ref.get();
    // Exists is not a method in contrary to normal firebase.
    // We check if it exists.
    if (snapshot.exists) {
      // If it exists we replace the existingSlots
      // We can not array.union because that doesn't allow duplicates.
      existingSlots = snapshot.data().slots || [];
    }
    // the slotcount is the amount of time the timeslot will be added to the array
    // If the order is over € 80 we add two time slots.
    const slotCount = total > 8000 ? 2 : 1;

    await ref.set({
      slots: [...existingSlots, ...Array(slotCount).fill(time)],
    });
  } catch (e) {
    console.log(e);
  }
};

export default addTimeSlot;
