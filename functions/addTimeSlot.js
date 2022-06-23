import { db, FieldValue } from "@/firebase/admin";

// This function only works on server because it uses the firebase admin sdk.
const addTimeSlot = async (data) => {
  const { date, time, delivery } = data;
  try {
    // We look up the ref.
    const ref = db.doc(`timeSlots${delivery ? "Delivery" : "PickUp"}/${date}`);
    // We get the snapshot of the ref.
    const snapshot = await ref.get();
    // Exists is not a method in contrary to normal firebase.
    // We check if it exists.
    if (snapshot.exists) {
      // If the array already exists we push the new time on the array.
      return await ref.update({
        slots: FieldValue.arrayUnion(time),
      });
    }
    // If it doesn't we set the new array to slots.
    return await ref.set({
      slots: [time],
    });
  } catch (e) {
    console.log(e);
  }
};

export default addTimeSlot;
