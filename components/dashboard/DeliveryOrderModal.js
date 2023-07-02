// Component imports
import Modal from "@/components/Modal";
// Function imports
import euro from "@/functions/euro";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import IconBtn from "@/components/IconBtn";
import PhoneIcon from "@/icons/PhoneIcon";
import CloseIcon from "../icons/CloseIcon";

const DeliveryModal = ({ open, setOpen, order }) => {
  const t = useI18n();

  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="bg-white max-w-sm w-full mx-2 rounded-xl overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 shadow border-b">
        <h2 className="text-xl font-bold">{order.name}</h2>
        <IconBtn onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconBtn>
      </div>
      <div className="p-4 overflow-y-scroll bg-gray-50">
        {order.cart.map((item) => {
          return (
            <div key={item.id} className="flex mt-2">
              <span>{item.qwt}</span>
              <div className="flex-grow mx-3">
                <div>
                  <span>{item.name[t.locale]}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500">
                    {item.description[t.locale]}
                  </span>
                </div>
              </div>
              <div className="justify-self-end">
                <span>{euro(item.price)}</span>
              </div>
            </div>
          );
        })}
        <div className="border-t mt-4">
          <div className="flex justify-between mt-4">
            <span>{t.subtotal}</span>
            <span>{euro(order.cart.reduce((x, y) => x + y.price, 0))}</span>
          </div>
          {/* Only orders for delivery are shown but just in case we check if the order is delivery or not. */}
          {order.delivery && (
            <div className="flex justify-between mt-2">
              <span>{t.delivery_fee}</span>
              <span>{euro(order.storeFees.deliveryFee)}</span>
            </div>
          )}
          {order.paymentMethod === "online" && (
            <div className="flex justify-between mt-2">
              <span>{t.transaction_fee}</span>
              <span>{euro(order.storeFees.transactionFee)}</span>
            </div>
          )}
          {order.storeFees.packagingFee > 0 && (
            <>
              <div className="flex justify-between mt-2">
                <span>{t.packaging}</span>
                <span>{euro(order.storeFees.packagingFee)}</span>
              </div>
            </>
          )}
          {/* Just in case bag slips through for delivery. */}
          {order.bag && !order.delivery && (
            <div className="flex justify-between mt-2">
              <span>{t.bag}</span>
              <span>{euro(order.storeFees.plasticBagFee)}</span>
            </div>
          )}
        </div>
        {/* This is the cointainer for the tip. */}
        <div className="mt-4 border-t">
          <div className="flex justify-between mt-4">
            <span>{t.restaurant_tip}</span>
            <span>{euro(order.tip)}</span>
          </div>
          {/* This is the container for the total cost*/}
          <div className="flex justify-between my-2">
            <span>{t.total}</span>
            <span>{euro(order.total)}</span>
          </div>
        </div>
      </div>
      <div className="p-4 shadow">
        <a
          href={`tel:${order.tel}`}
          className="button bg-main flex items-center w-full justify-center space-x-1"
        >
          <PhoneIcon className="fill-white" />
          <span className="text-white font-semibold">{order.tel}</span>
        </a>
      </div>
    </Modal>
  );
};

export default DeliveryModal;
