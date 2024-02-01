// React imports
import { Fragment, useState } from "react";
import useI18n from "@/hooks/useI18n";
// Component imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import EmailReadIcon from "@/icons/EmailReadIcon";
import CloseIcon from "@/icons/CloseIcon";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";
import ChangeItemRemarks from "@/components/dashboard/ChangeItemRemarks";
// Function imports
import euro from "@/functions/euro";
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
// Form imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Styling variables.
const itemIdStyling = "col-span-10 sm:col-span-5 space-x-3";
const itemNameStyling = "hidden sm:block col-span-5";
const checkboxStyling =
  "form-checkbox p-2 rounded shadow border-gray-300 text-main focus:ring-red-200 focus:ring-offset-0 cursor-pointer";

const OrderModal = ({ open, setOpen, order }) => {
  const [processing, setProcessing] = useState(false);
  const t = useI18n();

  const schema = yup.object().shape({
    remarks: yup.string().max(500, t.remarks_max),
    date: yup
      .string()
      .required(t.required)
      .matches(
        /^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/,
        "Date is not valid"
      ),
    time: yup.string().required(t.required),
    tel: yup
      .string()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, t.tel_not_valid),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      remarks: order.remarks,
      date: order.date,
      time: order.time,
      tel: order.tel,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setProcessing(true);
    const ref = doc(db, `orders/${order.id}`);
    await updateDoc(ref, {
      remarks: formData.remarks,
      date: formData.date,
      time: formData.time,
      tel: formData.tel,
    });
    setProcessing(false);
    setOpen(false);
  };
  return (
    <Modal
      toggle={open}
      close={() => {
        reset();
        setOpen(false);
      }}
      className="max-w-xl w-full mx-2 bg-white rounded-lg overflow-hidden"
    >
      {/* THE HEADER OF THE MODAL */}
      <div className="flex items-center justify-between p-4 shadow border-b">
        <h2 className="text-xl font-bold">{order.name}</h2>
        <IconBtn
          onClick={() => {
            reset();
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
                    <ChangeItemRemarks item={cartItem} order={order} />
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
                <span className="text-lg font-semibold">
                  {order.storeFees.packagingFee === 10 ? "711" : "712"}
                </span>
              </div>
              <div className={itemNameStyling}>packaging fee</div>
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

        {/* THE FORM TO ALTER USER DATA STARTS HERE */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mt-2">
            <label htmlFor="remarks" className={`text-sm text-gray-500`}>
              {t.remarks}
            </label>
            <textarea
              className={`h-20 appearance-none my-0.5 border rounded-lg w-full text-sm py-2 px-3 focus:outline-none red-focus-ring ${
                errors.remarks && "border-main selected"
              }`}
              {...register("remarks")}
              type="text"
              id="remarks"
            />
            <label htmlFor="remarks" className="text-red-400 text-xs">
              {errors.remarks?.message}
            </label>
          </div>
          <Input
            register={register}
            errors={errors.time}
            name="time"
            type="text"
            label={t.time}
          />
          <Input
            register={register}
            errors={errors.date}
            name="date"
            type="text"
            label={t.date}
          />
          <Input
            register={register}
            errors={errors.tel}
            name="tel"
            type="text"
            label={t.phone_number}
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
          <div className="w-full flex mt-2">
            <button onClick={() => reset()} className="button w-2/5 bg-white">
              {t.cancel}
            </button>
            <SubmitButton
              processing={processing}
              className="button w-3/5 text-white bg-main ml-2"
            >
              {t.save}
            </SubmitButton>
          </div>
        </form>
        {/* FORM ENDS HERE */}
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
      </div>
    </Modal>
  );
};

export default OrderModal;
