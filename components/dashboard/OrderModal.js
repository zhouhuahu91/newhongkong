// React imports
import { Fragment } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconButton from "@/components/IconButton";
// Function imports
import euro from "@/functions/euro";

// Styling variables.
const itemIdStyling = "col-span-10 sm:col-span-5 space-x-3";
const itemNameStyling = "hidden sm:block col-span-5";

const OrderModal = ({ open, setOpen, order }) => {
  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="max-w-xl w-full mx-2 bg-white rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 shadow border-b">
        <h2 className="text-lg font-normal">{order.name}</h2>
        <IconButton
          variant="close"
          onClick={() => {
            setOpen(false);
          }}
        />
      </div>
      <div className="p-4 overflow-y-scroll bg-neutral-50">
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
                <span className="text-lg font-semibold">bez</span>
              </div>
              <div className={itemNameStyling}>delivery</div>
              <div className="col-span-2 text-right">€ 2,50</div>
            </>
          )}
          {order.paymentMethod === "online" && (
            <>
              <div className={itemIdStyling}>
                <span>1x</span>
                <span>ideal</span>
              </div>
              <div className={itemNameStyling}>transactiekosten</div>
              <div className="col-span-2 text-right">€ 0,30</div>{" "}
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
          {order.bag && !order.delivery && (
            <>
              <div className={itemIdStyling}>
                <span className="text-lg font-semibold">1x</span>
                <span className="text-lg font-semibold">720</span>
              </div>
              <div className={itemNameStyling}>bag</div>
              <div className="col-span-2 text-right">€ 0,10</div>
            </>
          )}
          <div className="col-span-12 font-semibold text-right text-lg mt-2">
            Total {euro(order.total)}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
