// React imports
import { Fragment, useState } from "react";
// Component imports
import DatePicker from "react-datepicker";
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import EmailReadIcon from "@/icons/EmailReadIcon";
import CloseIcon from "@/icons/CloseIcon";
import ChangeItemRemarks from "@/components/dashboard/ChangeItemRemarks";
import Switch from "@/components/Switch";
import CreateCustomerReceipt from "@/components/dashboard/CreateCustomerReceipt";
// Function imports
import euro from "@/functions/euro";
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentDate from "@/functions/getCurrentDate";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
import calculateTotalOrderPrice from "@/functions/calculateTotalOrderPrice";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

// Styling variables.
const itemIdStyling = "col-span-10 sm:col-span-5 space-x-3";
const itemNameStyling = "hidden sm:block col-span-5";
const checkboxStyling =
  "form-checkbox p-2 rounded shadow border-gray-300 text-main focus:ring-red-200 focus:ring-offset-0 cursor-pointer";

const OrderModal = ({ open, setOpen, order, printerBusy }) => {
  const [remarks, setRemarks] = useState(order.remarks);
  const [time, setTime] = useState(order.time);
  const [tel, setTel] = useState(order.tel);
  const [tip, setTip] = useState(order.tip);
  const [formattedTip, setFormattedTip] = useState(euro(order.tip));

  // Reference to the order in firestire
  const ref = doc(db, `orders/${order.id}`);

  // I need to convert the dutch date of e.g. 01-01-2024 a new date.
  const convertDate = (d) => {
    const parts = d.split("-");
    return new Date(+parts[2], parts[1] - 1, +parts[0]);
  };

  return (
    <Modal
      toggle={open}
      close={() => {
        setOpen(false);
      }}
      className="max-w-xl w-full mx-2 bg-white rounded-lg overflow-hidden"
    >
      {/* THE HEADER OF THE MODAL */}
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

      {/* HERE ARE ALL THE ITEM IN THE CART */}
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
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  {euro(cartItem.price)}
                </div>
                <ChangeItemRemarks item={cartItem} order={order} />
              </Fragment>
            );
          })}

          <>
            <div className={itemIdStyling}>
              <span className="text-lg font-semibold">1x</span>
              <span className="text-lg font-semibold">887</span>
            </div>
            <div className={itemNameStyling}>tip</div>
            <div className="col-span-2 text-right">
              <input
                value={formattedTip}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                  const number = value === "" ? 0 : parseInt(value, 10);
                  setFormattedTip(euro(number));
                  setTip(number);
                }}
                className="input text-right"
                onBlur={() => {
                  updateDoc(ref, {
                    tip: tip,
                    total: calculateTotalOrderPrice({ ...order, tip: tip }),
                  });
                }}
              />
            </div>
          </>

          {!order.delivery && (
            <>
              <div className={itemIdStyling}>
                <span className="text-lg font-semibold">1x</span>
                <span className="text-lg font-semibold">720</span>
              </div>
              <div className={itemNameStyling}>bag</div>
              <div className="col-span-2 text-right flex items-center">
                <Switch
                  onClick={() => {
                    // Removes or adds the bag to the order
                    updateDoc(ref, {
                      bag: !order.bag,
                      // We need to calculate the new total price depending on this.
                      total: calculateTotalOrderPrice({
                        ...order,
                        bag: !order.bag,
                      }),
                    });
                  }}
                  toggle={order.bag}
                  className="mr-3"
                />
                {euro(order.storeFees.plasticBagFee)}
              </div>
            </>
          )}
          <div className="col-span-12 font-semibold text-right text-lg mt-2">
            Total {euro(order.total)}
          </div>
        </div>

        {/* THE FORM TO ALTER USER DATA STARTS HERE */}
        <div className="flex flex-col mt-2">
          <label htmlFor="remarks" className={`text-sm text-gray-500`}>
            Remarks
          </label>
          <textarea
            className={`h-20 appearance-none my-0.5 border rounded-lg w-full text-sm py-2 px-3 focus:outline-none red-focus-ring`}
            type="text"
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            onBlur={() => updateDoc(ref, { remarks: remarks })}
          />
        </div>
        <label htmlFor="time" className="text-gray-500 text-sm">
          Time
        </label>
        <input
          className="appearance-none my-0.5 border rounded-md w-full text-sm focus:outline-none red-focus-ring py-2 px-3"
          value={time}
          id="time"
          onChange={(e) => setTime(e.target.value)}
          onBlur={() => updateDoc(ref, { time: time })}
        />
        <span className="text-gray-500 text-sm">Date</span>
        <DatePicker
          className="appearance-none focus:outline-none red-focus-ring border w-full my-0.5 py-2 px-3 text-sm rounded-md"
          dateFormat="dd-MM-yyyy"
          calendarStartDay={1}
          selected={convertDate(order.date)}
          onChange={(date) => {
            const newDate = getCurrentDate(date);
            updateDoc(ref, {
              date: newDate,
            });
          }}
          inline
        />
        <label htmlFor="tel" className="text-gray-500 text-sm">
          Telephone
        </label>
        <input
          className="appearance-none my-0.5 border rounded-md w-full text-sm focus:outline-none red-focus-ring py-2 px-3"
          value={tel}
          id="tel"
          onChange={(e) => setTel(e.target.value)}
          onBlur={() => updateDoc(ref, { tel: tel })}
        />
        <h1 className="text-sm text-gray-500">Vaste gegevens</h1>
        <div className="bg-white p-3 border rounded-md">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Time ordered:</span>
            <span className="text-sm">
              {getDigitalTime(
                getCurrentTimeInSeconds(new Date(order.createdAt))
              )}
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
        </div>
      </div>

      {/* THE LAST PART IS TO CHECK AND UNCHECK THINGS WITHOUT IMPACTING PRINTING AND SUCH */}
      <div className="p-4 flex justify-evenly shadow">
        <div className="flex items-center space-x-1">
          <input
            className={checkboxStyling}
            type="checkbox"
            id="printed"
            checked={order.printed}
            onChange={() => {
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
              updateDoc(ref, {
                ready: !order.ready,
              });
            }}
          />
          <label className="cursor-pointer" htmlFor="ready">
            ready
          </label>
        </div>
        <CreateCustomerReceipt order={order} printerBusy={printerBusy} />
      </div>
    </Modal>
  );
};

export default OrderModal;
