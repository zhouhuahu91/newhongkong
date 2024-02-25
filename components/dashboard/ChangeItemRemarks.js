import { useState } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const ChangeItemRemarks = ({ item, order }) => {
  const [remarks, setRemarks] = useState(item.remarks);

  const upDateItemRemarks = async () => {
    // Get current Index of item
    const index = order.cart.findIndex((x) => x.id === item.id);
    // Create duplicate the cart
    const cart = [...order.cart];
    // Create new item with the new remarks
    const newItem = { ...item, remarks };
    // Swap the item with the new item in the duplicate cart.
    cart[index] = newItem;

    const ref = doc(db, `orders/${order.id}`);
    await updateDoc(ref, {
      // Upload the duplicate cart as the new cart.
      cart: cart,
    });
  };

  return (
    <>
      <textarea
        onBlur={() => upDateItemRemarks()}
        onChange={(e) => setRemarks(e.target.value)}
        className="ml-[13.5px] appearance-none my-0.5 w-full text-xs focus:outline-none p-2 bg-inherit"
        id="itemRemarks"
        value={remarks}
        type="text"
        rows="1"
        placeholder="opmerkingen"
      />
    </>
  );
};

export default ChangeItemRemarks;
