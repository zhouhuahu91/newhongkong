// React imports
import { useState } from "react";
// Hook imports
import { useMenu } from "@/hooks/useMenu";
// Function imports
import findItemInMenu from "@/functions/findItemInMenu";
import addExtraKroepoek from "@/functions/addExtraKroepoek";
import euro from "@/functions/euro";
// Data imports
import kroepoekIds from "@/data/options/kroepoek";
// Firebase imports
import { db } from "@/firebase/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

// Quick "+ kroepoek" for a customer at the counter. The first tap creates a
// separate quick order (no kitchen ticket, payment set later from its own modal);
// later taps while the modal is open add to that same quick order.
const ExtraKroepoek = ({ order, setRemarks }) => {
  const { data } = useMenu();
  // { id, ...doc } of the quick order made while this modal is open.
  const [quickOrder, setQuickOrder] = useState(null);
  const [saving, setSaving] = useState(false);

  if (order.delivery || order.canceled) return null;

  // Prices and names come from the live menu, so menu updates apply here too.
  const items = kroepoekIds
    .map((id) => findItemInMenu(id, data))
    .filter((item) => typeof item === "object");

  if (!items.length) return null;

  const add = async (menuItem) => {
    if (saving) return;
    setSaving(true);
    try {
      const { order: next, originalRemarks } = addExtraKroepoek({
        original: order,
        quickOrder,
        menuItem,
      });
      if (quickOrder) {
        await updateDoc(doc(db, `orders/${quickOrder.id}`), {
          cart: next.cart,
          total: next.total,
        });
        setQuickOrder({ ...next, id: quickOrder.id });
      } else {
        const { id } = await addDoc(collection(db, "orders"), next);
        setQuickOrder({ ...next, id });
        if (originalRemarks !== (order.remarks || "")) {
          await updateDoc(doc(db, `orders/${order.id}`), {
            remarks: originalRemarks,
          });
          setRemarks(originalRemarks);
        }
      }
    } catch (e) {
      console.error("Adding kroepoek failed", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="">
      <label htmlFor="time" className="text-gray-500 text-sm">
        Kroepoek toevoegen
      </label>
      <div className="flex gap-2 mt-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            disabled={saving}
            onClick={() => add(item)}
            className="button flex-1 flex flex-col border text-sm bg-white hover:shadow-lg disabled:opacity-50"
          >
            <span>{item.name.nl}</span>
            <span className="text-xs text-gray-500">{euro(item.price)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExtraKroepoek;
