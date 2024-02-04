// React imports
import { useState } from "react";
// Animation imports
import { motion } from "framer-motion";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc, setDoc } from "firebase/firestore";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
import usePath from "@/hooks/usePath";

// Function imports
import euro from "@/functions/euro";
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";

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
import CashIcon from "@/icons/CashIcon";
import UndoIcon from "@/icons/UndoIcon";
import WarningIcon from "@/icons/WarningIcon";
import NoBagIcon from "@/icons/NoBagIcon";
import MapIcon from "@/icons/MapIcon";
import PaymentMethodType from "@/components/dashboard/PaymentMethodType";

const OrderCard = ({
  order,
  setLastSelectedOrder,
  lastSelectedOrder,
  atNew,
  isPrinting,
  idx,
  printerBusy,
}) => {
  const [open, setOpen] = useState(false);
  const [openedBefore, setOpenedBefore] = useState(false);
  const [openDeleteOrderModal, setOpenDeleteOrderModal] = useState(false);
  const { user } = useAuth();
  const { atDashboard } = usePath();
  const [showMap, setShowMap] = useState(!atDashboard);

  const destination = `${order.address.street}+${order.address.houseNumber}${
    order.address.addition ? `+${order.address.addition}` : ""
  }+${order.address.city}`;
  const origin = "havenstraat+13+2211EE+Noordwijkerhout+Nederland";
  const googleDirectionsLink = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=bicycling`;

  // Check if this order is at the printer
  const sendOrderToPrinter = async (order) => {
    // If printer already has this order inside it means it is printing it already.
    if (isPrinting) return;
    // If printer is printing different order.
    if (printerBusy) return;
    // If not we can add this order to the printer.
    // type let's the printer know what type of receipt we want
    await setDoc(doc(db, "printer", order.id), {
      type: "order",
      printContent: order,
    });
  };

  // There are a lot of reasons not to auto print an order.
  const autoPrintOrder = async (order) => {
    if (order.printed) return; // We don't need to print if order already printed.
    if (isPrinting) return; // If order is already in process of being printed.
    if (printerBusy) return; // Printer is already in printing different order.
    // We also do not want to print if this order isn't the first one in the array
    if (idx !== 0) return;
    if (order.delivery) return; // We don't want it to be printed if order is for delivery.
    if (order.paymentMethod === "online" && !order.paid) return; // We dont want it printed if user is in process of paying.
    if (order.remarks.trim()) return; // If there are remarks we want to read those before printing.

    // We also need to check if one of the items in the cart has remarks
    const itemsHasRemarks = order.cart.some(
      (item) => item.remarks && item.remarks.trim() !== ""
    );
    if (itemsHasRemarks) return; // We also do not print if one of the items in the order has remarks.

    // If it passes all these test we can safely send the order to be printed
    sendOrderToPrinter(order);
  };

  autoPrintOrder(order);

  return (
    <>
      {/* We use the modal card for the /delivery page and /dashboard page.*/}
      {/* Depending on where we are we open the correct modal. */}
      {atDashboard ? (
        <OrderModal open={open} setOpen={setOpen} order={order} />
      ) : (
        <DeliveryOrderModal open={open} setOpen={setOpen} order={order} />
      )}
      {/* This is the modal that popup when you try to delete an order.*/}
      <DeleteOrderModal
        open={openDeleteOrderModal}
        setOpen={setOpenDeleteOrderModal}
        order={order}
      />

      {/* This is the main component. */}
      <motion.div
        // This is for the animation of the div.
        whileHover={{ scale: 1.03 }}
        layout="position"
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: { duration: 0.2, type: "spring", delay: 0.2 },
        }}
        // We want the order to bounce if the order is at New and we haven't intereacted with it
        className={`border ${
          // If the order is at the section new and it hasn't but openened before we show the card in red.
          !openedBefore && atNew ? "bg-red-100" : "bg-white"
        } rounded-xl col-span-12 sm:col-span-6 xl:col-span-4 space-y-1 overflow-hidden ${
          order.id === lastSelectedOrder?.id
            ? "selected border-main"
            : "hover:shadow"
        } ${
          // If the paymentMethod is online and not paid yet it means user is in paying process.
          !order.paymentMethod === "online" && !order.paid
            ? "cursor-wait"
            : "cursor-pointer"
        }`}
        onClick={() => {
          if (atDashboard) {
            setLastSelectedOrder(order);
          }
          if (!openedBefore) setOpenedBefore(true);
          setOpen(true);
        }}
      >
        <div className="p-4">
          <div className="flex items-center space-x-3 justify-between">
            {/* ***** THIS PART SHOWS THE NAME AND DELETE ICON ***** */}

            <div className="flex items-center space-x-3">
              <h3
                className={`font-semibold text-2xl capitalize ${
                  order.canceled && "line-through"
                }`}
              >
                {order.name}
              </h3>
              {/* We do not want to delete orders where the payment method is online. */}
              {!(order.paymentMethod === "online" && order.paid) &&
                user?.admin &&
                openedBefore && (
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

            {/* ***** END PART NAME AND DELETE ICON ****** */}

            {/* ***** SHOWS PRINT, RECEIPT, CLOSE AND UNDO ICON ***** */}

            {/* If order is not printed we show the print icon */}
            {!order.printed && !isPrinting && (
              <IconBtn
                // disable button if order is printing.
                disabled={isPrinting}
                onClick={async (e) => {
                  e.stopPropagation();
                  if (atDashboard) {
                    setLastSelectedOrder(order);
                  }
                  sendOrderToPrinter(order);
                }}
              >
                <PrintIcon />
              </IconBtn>
            )}
            {/* If order is printing we show a spinner. */}
            {isPrinting && !order.printed && (
              <div
                className={`rounded-full border-white border-t-main border-2 animate-spin w-5 h-5`}
              />
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

          {/* ***** END OF PRINT, RECEIPT, CLOSE AND UNDO ICON ***** */}

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
              {order.delivery && (
                <span
                  className="text-sm flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMap((prev) => !prev);
                  }}
                >
                  {order.address.street} {order.address.houseNumber}
                  {order.address.addition
                    ? `-${order.address.addition}`
                    : ""}{" "}
                  <MapIcon size="16" className="mb-0.5 ml-1" />
                </span>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-xl font-semibold mr-3">
                {euro(order.total)}
              </span>

              {/* ***** SHOWS A SPINNER IF ORDER ONLINE AND NOT PAID ***** */}
              {order.paymentMethod === "online" &&
                !order.paid &&
                !order.canceled && (
                  <div
                    className={`rounded-full border-white border-t-main border-2 animate-spin w-5 h-5`}
                  />
                )}
              {/* ***** SHOWS A SPINNER IF ORDER ONLINE AND NOT PAID ***** */}

              {/* ***** SHOWS A WARNING ICON IF ORDER IS CANCELED ****** */}
              {order.paymentMethod === "online" &&
                !order.paid &&
                order.canceled && <WarningIcon className="fill-main" />}
              {/* ***** SHOWS A WARNING ICON IF ORDER IS CANCELED ****** */}

              {/* ***** IF PAYMEND METHOD IS in_person ****** */}
              {/* If method is in person we want to show 2 icons. one if customer pays with cash the other if.... */}
              {/* they pay with card. */}
              {/* We only show both if the paymentMethodType === null or === cash */}
              {order.paymentMethod === "in_person" && (
                <div className="flex items-center">
                  {/* ***** CASH BUTTON ****** */}
                  {/* We only show both if not paid or === null, we show this one if its paid and === card */}
                  {(!order.paid ||
                    order.paymentMethodType === "cash" ||
                    order.paymentMethodType === null) && (
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
                          // if the order is already paid and you press this icon we should
                          // set payment method back to null
                          paymentMethodType: order.paid ? null : "cash",
                          paid: !order.paid,
                        });
                      }}
                    >
                      <CashIcon
                        off={!order.paid}
                        className={`${
                          order.paid ? "fill-green-700" : "fill-main"
                        }`}
                      />
                    </IconBtn>
                  )}

                  {/* ***** END CASH BUTTON ***** */}
                  {/* We show this devider if order is not paid */}
                  {/* If the order is for delivery and the input comes not from dashboard the only option is cash */}
                  {/* customer can't pay with card when delivered at home */}
                  {/* but they can pay with card if they ordered it beforehand at the store. */}
                  {/* This means we don't need to show this devider if we are not at the dashboard */}
                  {!order.paid && atDashboard && <span>&nbsp;|&nbsp;</span>}
                  {/* ***** CARD ICON ***** */}
                  {/* This also means we don't need to show this payment method if we are not at the dashboard */}
                  {/* We only show both if not paid or === null, we show this one if its paid and === card */}
                  {(!order.paid ||
                    order.paymentMethodType === "card" ||
                    order.paymentMethodType === null) &&
                    atDashboard && (
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
                            // if the order is already paid and you press this icon we should
                            // set payment method back to null
                            paymentMethodType: order.paid ? null : "card",
                            paid: !order.paid,
                          });
                        }}
                      >
                        <CreditCardIcon
                          off={!order.paid}
                          className={`${
                            order.paid ? "fill-green-700" : "fill-main"
                          }`}
                        />
                      </IconBtn>
                    )}

                  {/* ***** END CARD ICON ***** */}
                </div>
              )}
              {/* ***** IF PAYMEND METHOD IS in_person ****** */}

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
            <div className="text-sm font-medium text-main uppercase mt-1">
              {order.remarks}
            </div>
          )}
          {order.cart.map((item) => {
            if (item.remarks) {
              return (
                <div
                  key={item.id}
                  className="text-sm font-medium text-main uppercase mt-1"
                >
                  {item.name.nl}: {item.remarks}
                </div>
              );
            }
          })}
        </div>
        {order.delivery && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: showMap ? 380 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full"
          >
            {showMap && (
              <iframe
                className="w-full h-full"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API}&origin=${origin}&destination=${destination}&mode=bicycling&zoom=14`}
                loading="lazy"
                title="google maps"
              />
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default OrderCard;
