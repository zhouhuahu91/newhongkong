// This function only works on server because it uses the firebase admin sdk.
const addTimeSlot = async (data) => {
  const { date, time, delivery } = data;
  let existingOptions = [];
  try {
    const ref = db.doc(`timeSlots${delivery ? "Delivery" : "PickUp"}/${date}`);
    const snapshot = await ref.get();
    if (snapshot.exists()) {
      existingOptions = snapshot.data().slots;
    }
    await ref.set({
      slots: [...existingOptions, time],
    });
  } catch (e) {
    console.log(e);
  }
};

export default addTimeSlot;
