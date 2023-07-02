// React imports
import { Fragment, useState, useEffect } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import EmailReadIcon from "@/icons/EmailReadIcon";
import CloseIcon from "@/icons/CloseIcon";
// Function imports
import euro from "@/functions/euro";
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

// Styling variables.
const itemIdStyling = "col-span-10 sm:col-span-5 space-x-3";
const itemNameStyling = "hidden sm:block col-span-5";
const checkboxStyling =
  "form-checkbox p-2 rounded shadow border-gray-300 text-main focus:ring-red-200 focus:ring-offset-0 cursor-pointer";

const OrderModal = ({ open, setOpen, order }) => {
  const [remarks, setRemarks] = useState(order.remarks);
  const [dateOfOrder, setDateOfOrder] = useState(order.date);

  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="max-w-xl w-full mx-2 bg-white rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 shadow border-b">
        <h2 className="text-xl font-bold">{order.name}</h2>
        <IconBtn
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon />
        </IconBtn>
      </div>
      <div
        style={{ maxHeight: "calc(100vh - 265px)" }}
        className="p-4 overflow-y-scroll bg-neutral-50"
      >
        <div className="grid grid-cols-12 gap-1">
          {!order.delivery && (
            <>
              <div className={itemIdStyling}>
                <span className="text-lg font-semibold">1x</span>
                <span className="text-lg font-semibold">
                  {order.time.replace(":", "")}
                </span>
              </div>
              <div className={itemNameStyling}>{order.time}</div>
              <div className="col-span-2 text-right">€ 0,00</div>
            </>
          )}
          {order.delivery && (
            <>
              <div className={itemIdStyling}>
                <span className="text-lg font-semibold">1x</span>
                <span className="text-lg font-semibold">
                  {order.storeFees.deliveryFee === 250
                    ? "883"
                    : order.storeFees.deliveryFee === 300
                    ? "884"
                    : "885"}
                </span>
              </div>
              <div className={itemNameStyling}>delivery</div>
              <div className="col-span-2 text-right">
                {euro(order.storeFees.deliveryFee)}
              </div>
            </>
          )}
          {order.paymentMethod === "online" && (
            <>
              <div className={itemIdStyling}>
                <span className="text-lg font-semibold">1x</span>
                <span className="text-lg font-semibold">886</span>
              </div>
              <div className={itemNameStyling}>transactiekosten</div>
              <div className="col-span-2 text-right">
                {euro(order.storeFees.transactionFee)}
              </div>{" "}
            </>
          )}

          {order.cart.map((cartItem) => {
            return (
              <Fragment key={cartItem.id}>
                <div className={itemIdStyling}>
                  <span className="font-semibold text-lg">{cartItem.qwt}x</span>
                  <span className="font-semibold text-lg">{cartItem.id}</span>
                </div>
                <div className={itemNameStyling}>
                  <div className="flex flex-col">
                    <span>{cartItem.name["nl"]}</span>
                    <span className="text-xs text-gray-500">
                      {cartItem.description["nl"]}
                    </span>
                    <span className="text-xs font-medium text-main">
                      {cartItem.remarks}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  {euro(cartItem.price)}
                </div>
              </Fragment>
            );
          })}
          {order.tip > 0 && (
            <>
              <div className={itemIdStyling}>
                <span className="text-lg font-semibold">1x</span>
                <span className="text-lg font-semibold">887</span>
              </div>
              <div className={itemNameStyling}>tip</div>
              <div className="col-span-2 text-right">{euro(order.tip)}</div>
            </>
          )}
          {order.storeFees.packagingFee > 0 && (
            <>
              <div className={itemIdStyling}>
                <span className="text-lg font-semibold">1x</span>
                <span className="text-lg font-semibold">710</span>
              </div>
              <div className={itemNameStyling}>packaging</div>
              <div className="col-span-2 text-right">
                {euro(order.storeFees.packagingFee)}
              </div>
            </>
          )}
          {order.bag && !order.delivery && (
            <>
              <div className={itemIdStyling}>
                <span className="text-lg font-semibold">1x</span>
                <span className="text-lg font-semibold">720</span>
              </div>
              <div className={itemNameStyling}>bag</div>
              <div className="col-span-2 text-right">
                {euro(order.storeFees.plasticBagFee)}
              </div>
            </>
          )}
          <div className="col-span-12 font-semibold text-right text-lg mt-2">
            Total {euro(order.total)}
          </div>
        </div>
        <label htmlFor="orderRemarks" className="text-sm text-gray-500">
          Remarks
        </label>
        <textarea
          value={remarks}
          id="orderRemarks"
          onChange={(e) => setRemarks(e.target.value)}
          className="appearance-none bg-gray-50 border w-full red-focus-ring py-2 px-3 rounded-md text-sm"
        />
        {order.remarks !== remarks && (
          <div className="grid grid-cols-12 gap-4 mt-2">
            <button
              onClick={() => setRemarks(order.remarks)}
              type="button"
              className="col-span-3 col-start-6 button border"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, { remarks });
              }}
              type="button"
              className="bg-main text-white button col-span-4"
            >
              Save
            </button>
          </div>
        )}
        <label htmlFor="dateOforderInput" className="text-gray-500 text-sm">
          Date
        </label>
        <input
          id="dateOfOrderInput"
          className="appearance-none bg-gray-50 border w-full py-2 px-3 rounded-md text-sm red-focus-ring"
          value={dateOfOrder}
          onChange={(e) => {
            setDateOfOrder(e.target.value);
          }}
        />
        {order.date !== dateOfOrder && (
          <div className="grid grid-cols-12 gap-4 mt-2">
            <button
              onClick={() => setDateOfOrder(order.date)}
              type="button"
              className="col-span-3 col-start-6 button border"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, { date: dateOfOrder });
              }}
              type="button"
              className="bg-main text-white button col-span-4"
            >
              Save
            </button>
          </div>
        )}
        <div className="flex flex-col mt-2">
          <span className="text-sm text-gray-500">
            {order.delivery ? "Delivery Time" : "Pick Up Time"}
          </span>
          <span className="text-sm">{order.time}</span>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-sm text-gray-500">Time ordered:</span>
          <span className="text-sm">
            {getDigitalTime(getCurrentTimeInSeconds(new Date(order.createdAt)))}
          </span>
        </div>
        {order.delivery && (
          <div className="flex flex-col mt-2">
            <span className="text-sm text-gray-500">Address:</span>
            <span className="text-sm">
              {order.address.street} {order.address.houseNumber}
              {order.addition}
            </span>
            <span className="text-sm">
              {order.address.postalcode} {order.address.city}
            </span>
          </div>
        )}
        <div className="flex flex-col mt-2">
          <span className="text-sm text-gray-500">Email:</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm">{order.email}</span>
            {order.mailSent && (
              <EmailReadIcon size="18" className="fill-green-700" />
            )}
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-sm text-gray-500">Phone Number:</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm">{order.tel}</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-evenly shadow">
        <div className="flex items-center space-x-1">
          <input
            className={checkboxStyling}
            type="checkbox"
            id="printed"
            checked={order.printed}
            onChange={() => {
              const ref = doc(db, `orders/${order.id}`);
              updateDoc(ref, {
                printed: !order.printed,
              });
            }}
          />
          <label className="cursor-pointer" htmlFor="printed">
            printed
          </label>
        </div>
        <div className="flex items-center space-x-1">
          <input
            className={checkboxStyling}
            type="checkbox"
            id="ready"
            checked={order.ready}
            onChange={() => {
              const ref = doc(db, `orders/${order.id}`);
              updateDoc(ref, {
                ready: !order.ready,
              });
            }}
          />
          <label className="cursor-pointer" htmlFor="ready">
            ready
          </label>
        </div>
        {order.paymentMethod === "in_person" && (
          <div className="flex items-center space-x-1">
            <input
              className={checkboxStyling}
              type="checkbox"
              id="paid"
              checked={order.paid}
              onChange={() => {
                const ref = doc(db, `orders/${order.id}`);
                updateDoc(ref, {
                  paid: !order.paid,
                });
              }}
            />
            <label className="cursor-pointer" htmlFor="paid">
              paid
            </label>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <input
            className={checkboxStyling}
            type="checkbox"
            id="completed"
            checked={order.completed}
            onChange={() => {
              const ref = doc(db, `orders/${order.id}`);
              updateDoc(ref, {
                completed: !order.completed,
              });
            }}
          />
          <label className="cursor-pointer" htmlFor="completed">
            completed
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
