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
      <div className="col-span-5" />
      <div className="col-span-7">
        <textarea
          onBlur={() => upDateItemRemarks()}
          onChange={(e) => setRemarks(e.target.value)}
          className="appearance-none bg-white my-0.5 border rounded-md w-full text-sm focus:outline-none bg-inherit red-focus-ring p-2"
          id="itemRemarks"
          value={remarks}
          type="text"
          rows="1"
        />
      </div>
    </>
  );
};

export default ChangeItemRemarks;