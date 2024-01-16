// React imports
import { useState, useEffect } from "react";
// Animation imports
import { motion } from "framer-motion";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
import usePath from "@/hooks/usePath";
// Google Maps imports
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
// Function imports
import euro from "@/functions/euro";
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
import fetchLatLngFromApi from "@/functions/fetchLatLngFromApi";
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
import WarningIcon from "@/icons/WarningIcon";
import NoBagIcon from "@/icons/NoBagIcon";
import PaymentMethodType from "@/components/dashboard/PaymentMethodType";

const OrderCard = ({ order, setLastSelectedOrder, lastSelectedOrder }) => {
  const [open, setOpen] = useState(false);
  const [openDeleteOrderModal, setOpenDeleteOrderModal] = useState(false);
  const [position, setPosition] = useState({ lat: 52.26196, lng: 4.49463 });
  const { user } = useAuth();
  const { atDashboard } = usePath();
  const storePosition = { lat: 52.26196, lng: 4.49463 };

  const googleDirectionsLink = `https://www.google.com/maps/dir/?api=1&destination=${
    order.address.street
  }+${order.address.houseNumber}${
    order.address.addition ? `+${order.address.addition}` : ""
  }+${order.address.city}&travelmode=bicycling`;

  useEffect(() => {
    const getPosition = async () => {
      const data = await fetchLatLngFromApi(
        `${order.address.street}+${order.address.houseNumber}${
          order.address.addition ? `+${order.address.addition}` : ""
        }+${order.address.city}+Nederland`
      );
      if (data.msg) {
        return console.log(data.msg);
      }
      setPosition(data);
    };
    getPosition();
  }, []);

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
        className={`border bg-white rounded-xl col-span-12 sm:col-span-6 xl:col-span-4 space-y-1 overflow-hidden ${
          order.id === lastSelectedOrder?.id
            ? "selected border-main"
            : "hover:shadow"
        } ${
          !order.paymentMethod === "online" && !order.paid
            ? "cursor-wait"
            : "cursor-pointer"
        }`}
        onClick={() => {
          if (atDashboard) {
            setLastSelectedOrder(order);
          }
          setOpen(true);
        }}
      >
        <div className="p-4">
          <div className="flex items-center space-x-3 justify-between">
            <div className="flex items-center space-x-3">
              <h3
                className={`font-semibold text-2xl ${
                  order.canceled && "line-through"
                }`}
              >
                {order.name}
              </h3>
              {/* We do not want to delete orders where the payment method is online. */}
              {!(order.paymentMethod === "online" && order.paid) &&
                user?.admin && (
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
                  if (atDashboard) {
                    setLastSelectedOrder(order);
                  }
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
                  if (atDashboard) {
                    setLastSelectedOrder(order);
                  }
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
                  if (atDashboard) {
                    setLastSelectedOrder(null);
                  }
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
                  if (atDashboard) {
                    setLastSelectedOrder(order);
                  }
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
                  {order.time.includes(":") ? (
                    order.time
                  ) : (
                    <>
                      asap
                      <span className="text-xs ml-2">
                        {getDigitalTime(
                          getCurrentTimeInSeconds(new Date(order.createdAt))
                        )}
                      </span>
                    </>
                  )}
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
                {!order.delivery && !order.bag && (
                  <NoBagIcon className="fill-main mb-0.5" />
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
              {order.paymentMethod === "online" &&
                !order.paid &&
                !order.canceled && (
                  <div
                    className={`rounded-full border-white border-t-main border-2 animate-spin w-5 h-5`}
                  />
                )}
              {order.paymentMethod === "online" &&
                !order.paid &&
                order.canceled && <WarningIcon className="fill-main" />}
              {order.paymentMethod === "in_person" && (
                // If it is paid we show a green credit card otherwise we show a red credit card.
                <IconBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    if (atDashboard) {
                      setLastSelectedOrder(order);
                    }
                    if (order.paymentMethod === "online") return;
                    // Removes focus from this element. We do this so that we can still enter complete...
                    // If it is focused and we press enter it just toggle payed off.
                    document.activeElement.blur();
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
              )}
              {/* If paymentMethod === "online" && paid we want to display the correct image... */}
              {/* ...depending on the paymentMethodTpye the customer used. */}
              {order.paymentMethod === "online" && order.paid && (
                <div className="flex items-center">
                  <PaymentMethodType order={order} />
                </div>
              )}
            </div>
          </div>
          {order.remarks && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Remarks:</span>
              <span className="text-sm font-medium text-main">
                {order.remarks}
              </span>
            </div>
          )}
        </div>
        {order.delivery && (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLEMAPS_API}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-auto h-60 overflow-hidden roundedb-xl selected-none"
            >
              <Map
                zoom={14}
                // gets the center of store and delivery location
                center={{
                  lat: (storePosition.lat + position.lat) / 2,
                  lng: (storePosition.lng + position.lng) / 2,
                }}
                zoomControl={false}
                fullscreenControl={false}
                mapTypeControl={false}
                mapId="939f6f3f30a43f1a"
              >
                <AdvancedMarker position={storePosition}>
                  <Pin background="#e76f51" />
                </AdvancedMarker>
                <AdvancedMarker position={position}>
                  <Pin
                    background="lightgreen"
                    glyphColor="green"
                    borderColor="black"
                  />
                </AdvancedMarker>
              </Map>
            </div>
          </APIProvider>
        )}
      </motion.div>
    </>
  );
};

export default OrderCard;
