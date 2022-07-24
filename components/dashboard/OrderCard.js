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
import usePath from "@/hooks/usePath";
// Function imports
import euro from "@/functions/euro";
// Component imports
import OrderModal from "@/components/dashboard/OrderModal";
import DeliveryOrderModal from "@/components/dashboard/DeliveryOrderModal";
import DeleteOrderModal from "@/components/dashboard/DeleteOrderModal";
import IconBtn from "@/components/IconBtn";
import PrintIcon from "@/icons/PrintIcon";
import ReceiptIcon from "@/icons/ReceiptIcon";
import PedalBikeIcon from "@/icons/PedalBikeIcon";
import DeleteIcon from "@/icons/DeleteIcon";
import CloseIcon from "@/icons/CloseIcon";
import CreditCardIcon from "@/icons/CreditCardIcon";
import UndoIcon from "@/icons/UndoIcon";

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [openDeleteOrderModal, setOpenDeleteOrderModal] = useState(false);
  const { user } = useAuth();
  const { atDashboard } = usePath();

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
      {atDashboard ? (
        <OrderModal open={open} setOpen={setOpen} order={order} />
      ) : (
        <DeliveryOrderModal open={open} setOpen={setOpen} order={order} />
      )}
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
            {!(order.paymentMethod === "online" && order.paid) && user?.admin && (
              <IconBtn
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteOrderModal(true);
                }}
              >
                <DeleteIcon className="fill-gray-100 hover:fill-main" />
              </IconBtn>
            )}
          </div>
          {/* If order is not printed we show the print icon */}
          {!order.printed && (
            <IconBtn
              onClick={(e) => {
                e.stopPropagation();
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, {
                  printed: true,
                });
              }}
            >
              <PrintIcon />
            </IconBtn>
          )}
          {/* If order is rinted but not yet ready we show the shopping bag icon indicating... */}
          {/* the order is ready and packed. */}
          {order.printed && !order.ready && (
            <IconBtn
              onClick={(e) => {
                e.stopPropagation();
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, {
                  ready: true,
                });
              }}
            >
              <ReceiptIcon />
            </IconBtn>
          )}
          {/* If the order is ready and paid for but not yet completed we show... */}
          {/* the icon that indicates that it can be put on completed. */}
          {order.ready && order.paid && !order.completed && (
            <IconBtn
              onClick={(e) => {
                e.stopPropagation();
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, {
                  completed: true,
                });
              }}
            >
              <CloseIcon className="hover:fill-main" />
            </IconBtn>
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
            >
              <UndoIcon />
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
                  className="flex red-focus-ring rounded"
                >
                  <PedalBikeIcon />
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
              <IconBtn
                onClick={(e) => {
                  if (order.paymentMethod === "online") return;
                  e.stopPropagation();
                  const ref = doc(db, `orders/${order.id}`);
                  updateDoc(ref, {
                    paid: !order.paid,
                  });
                }}
              >
                <CreditCardIcon
                  off={!order.paid}
                  className={`${order.paid ? "fill-green-700" : "fill-main"}`}
                />
              </IconBtn>
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
