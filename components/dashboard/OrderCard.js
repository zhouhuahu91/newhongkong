// React imports
import { useState, useEffect } from "react";
// NextJS imports
import Image from "next/image";
// Animation imports
import { motion } from "framer-motion";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
// Function imports
import euro from "@/functions/euro";
// Component imports
import OrderModal from "@/components/dashboard/OrderModal";
import DeleteOrderModal from "@/components/dashboard/DeleteOrderModal";

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [openDeleteOrderModal, setOpenDeleteOrderModal] = useState(false);
  const { user } = useAuth();

  const googleDirectionsLink = `https://www.google.com/maps/dir/?api=1&destination=${
    order.address.city
  }+${order.address.street}+${order.address.houseNumber}${
    order.address.addition ? `+${order.address.addition}` : ""
  }&travelmode=bicycling`;

  // listen for enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && open) {
      // if enter key pressed we set order to printed
      // we get the ref
      const ref = doc(db, `orders/${order.id}`);
      updateDoc(ref, {
        printed: true,
      });
      setOpen(false);
    }
    // if escape key is pressed and modal is open we close the modal
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  };
  // listen for enter key with useEffect
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <OrderModal open={open} setOpen={setOpen} />
      <DeleteOrderModal
        open={openDeleteOrderModal}
        setOpen={setOpenDeleteOrderModal}
        order={order}
      />
      <motion.div
        whileHover={{ scale: 1.03 }}
        layout
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.2, type: "spring", delay: 0.2 },
        }}
        className={`border bg-white hover:shadow-lg rounded-xl p-4 col-span-12 sm:col-span-6 xl:col-span-4 space-y-1 ${
          !order.paymentMethod === "online" && !order.paid
            ? "cursor-wait"
            : "cursor-pointer"
        }`}
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="flex items-center space-x-3 justify-between">
          <div className="flex items-center space-x-3">
            <h3 className={`font-semibold text-2xl`}>{order.name}</h3>
            {/* We do not want to delete orders where the payment method is online. */}
            {!(order.paymentMethod === "online" && order.paid) && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteOrderModal(true);
                }}
                className="material-symbols-rounded text-gray-100 hover:text-main"
              >
                delete
              </span>
            )}
          </div>
          {/* If order is not printed we show the print icon */}
          {!order.printed && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, {
                  printed: true,
                });
              }}
              className="material-symbols-rounded"
            >
              print
            </span>
          )}
          {/* If order is rinted but not yet ready we show the shopping bag icon indicating... */}
          {/* the order is ready and packed. */}
          {order.printed && !order.ready && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, {
                  ready: true,
                });
              }}
              className={`material-symbols-rounded`}
            >
              inventory
            </span>
          )}
          {/* If the order is ready and paid for but not yet completed we show... */}
          {/* the icon that indicates that it can be put on completed. */}
          {order.ready && order.paid && !order.completed && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, {
                  completed: true,
                });
              }}
              className={`material-symbols-rounded`}
            >
              task_alt
            </span>
          )}
          {/* If the order is completed we show the icon that can remove the order from being completed. */}
          {order.completed && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, {
                  completed: false,
                });
              }}
              className={`material-symbols-rounded`}
            >
              undo
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold">
                {order.time.includes(":") ? order.time : "asap"}
              </span>
              {order.delivery && (
                <a
                  href={googleDirectionsLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex"
                >
                  <span className="material-symbols-rounded">pedal_bike</span>
                </a>
              )}
            </div>
            <span className="text-sm">
              {order.delivery &&
                `${order.address.street} ${order.address.houseNumber}${
                  order.address.addition ? `-${order.address.addition}` : ""
                }`}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-semibold mr-3">
              {euro(order.total)}
            </span>
            {/* If user selectes Ideal and the order is not paid yet we show a spinner. */}
            {order.paymentMethod === "online" && !order.paid ? (
              <div
                className={`rounded-full border-white border-t-main border-2 animate-spin w-5 h-5`}
              />
            ) : order.paymentMethod === "in_person" ? (
              // If it is paid we show a green credit card otherwise we show a red credit card.
              <span
                onClick={(e) => {
                  if (order.paymentMethod === "online") return;
                  e.stopPropagation();
                  const ref = doc(db, `orders/${order.id}`);
                  updateDoc(ref, {
                    paid: !order.paid,
                  });
                }}
                className={`material-symbols-rounded ${
                  order.paid ? "text-green-600" : "text-main"
                }`}
              >
                {order.paid ? "credit_score" : "credit_card_off"}
              </span>
            ) : (
              <div className="flex items-center">
                <Image
                  src="/paymentIcons/ideal.svg"
                  alt="ideal icon"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
        </div>
        {order.remarks && (
          <div className="mt-6 flex flex-col">
            <span className="text-sm text-gray-500">Remarks:</span>
            <span className="text-sm font-normal">{order.remarks}</span>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrderCard;
