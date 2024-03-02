// React imports
import { useState, useEffect } from "react";
// Component imports
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import PedalBikeIcon from "@/icons/PedalBikeIcon";
import StoreIcon from "@/icons/StoreIcon";
import InfoIcon from "@/icons/InfoIcon";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Form imports
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
// Function imports
import fetchAddressFromAPI from "@/functions/fetchAddressFromAPI";
// Animation imports
import { motion, AnimatePresence } from "framer-motion";

// The user has to decide if they want to have there food delivered or picked up.
// When the user clicks on an item card we check if delivery === "undecided".
// If it is, we open the modal for them to pick one.
const PickUpOrDeliveryModal = ({ open, setOpen, delivery, setDelivery }) => {
  // We moved delivery and setDelivery up so that we can use it in the cart.
  // When user switches from true to false we can preset it.

  // Returns the state of the cart and dispatch to manipulate the cart.
  const { dispatch, cartState } = useCart();
  // Store the state of the address.
  const [address, setAddress] = useState(cartState.address);
  // t is used to translate the text.
  const t = useI18n();
  // We need the user to prefill the address if they have one.
  const { user } = useAuth();
  // We need store info to show customers that we are closed or just closed for delivery.
  const {
    closed,
    storeInfo: { openForDelivery },
  } = useStoreInfo();

  const schema = yup.object().shape({
    postalcode: delivery
      ? yup
          .string()
          .required(t.required)
          // We check if the postalcode is a dutch postalcode e.g. 1234AB.
          .matches(/^[1-9][0-9]{3}[\s]?[a-z]{2}[\s]?$/i, t.postalcode_not_valid)
          // We check if the postalcode is in our area. Only 2211, 2212 and limited 2204.
          // Note that 2204 is with limited options not all letter combos are allowed.
          .matches(
            /^(2211|2212)[\s]?[a-z]{2}[\s]?$|^(2204)[\s]?([a][bcdejklnprstwx]|[b-c][a-z])[\s]?$/i,
            t.no_delivery_here
          )
      : // .matches(/^(?!(2211)[\s]?(v[klmn]|zg|we)$)/i, t.no_delivery_here)
        yup.string(),
    // House number only needs validation when delivery is selected.
    houseNumber: delivery
      ? yup
          .string()
          // Only numbers are allowed 0-9.
          .matches(/^[0-9]*[\s]?$/, t.house_number_not_valid)
          .required(t.required)
      : yup.string(),
    // Can be whatever. Not sure is 10 is long enough but haven't encountered...
    // a addition to hosue number longer than 5 characters
    addition: yup.string().max(10),
  });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      postalcode: cartState.address.postalcode || "",
      houseNumber: cartState.address.houseNumber || "",
      addition: cartState.address.addition || "",
    },
  });

  // These variablles updates when users provide data.
  const postalcode = watch("postalcode");
  const houseNumber = watch("houseNumber");
  const addition = watch("addition");

  // We need to know if the user is trying to fill in the form so that we do not override their data.
  const { isDirty } = useFormState({ control });

  const onSubmit = (data) => {
    // If delivery === "undecided" we need to let the user know it needs to be decided.
    // Not sure yet how to let the user know.
    if (delivery === "undecided") return;

    // If delivery === false we need to set the cartState to false for delivery
    if (delivery === false) {
      dispatch({ type: "SET_DELIVERY", payload: false });
      // We also reset address and the address in the form.
      setAddress(cartState.address);
      reset();
      return setOpen(false);
    }

    // If delivery === true && the address is not found we need to show the user an error.
    if (address.error && delivery === true) {
      setError("houseNumber", {
        type: "manual",
      });
      return setError("postalcode", {
        type: "manual",
      });
    }

    // If delivery === true we need to set the cartState to true for delivery and set the address.
    if (delivery === true) {
      dispatch({
        type: "SET_ADDRESS",
        payload: { ...address, addition: data.addition },
      });
      dispatch({ type: "SET_DELIVERY", payload: true });
      return setOpen(false);
    }
  };
  // If user already selected delivery but we close for delivery we need to switch it back to false.
  useEffect(() => {
    if (delivery === true && openForDelivery === false) {
      setDelivery(false);
    }
  }, [openForDelivery]);

  // This useEffect fetches the address from an API if the postalcode and house number are valid.
  useEffect(() => {
    const fetchAddress = async () => {
      // If delivery === false we do not need the address.
      if (delivery === false) return;

      // If postalcode and housenumber in the input are the same as the cartState we do not need to fetch the address.
      if (
        postalcode === address.postalcode &&
        houseNumber === address.houseNumber &&
        !address.error
      ) {
        return;
      }

      // If there is not postalcode and house number in the input we do not need to fetch the address.
      if (!postalcode || !houseNumber) {
        return;
      }

      const response = await fetchAddressFromAPI(postalcode, houseNumber);
      setAddress({ ...response, addition });
    };

    fetchAddress();
  }, [postalcode, houseNumber, delivery]);

  // We check cart, localstorage and user data to see if we can prefill the form.
  useEffect(() => {
    // If delivery is false we do not need to prefill the form.
    if (!delivery) return;

    // If the form is dirty we do not prefill the form.
    if (isDirty) return;

    // First we check if the cartState already has a address.
    if (cartState.address.postalcode) {
      setValue("postalcode", cartState.address.postalcode);
      setValue("houseNumber", cartState.address.houseNumber);
      return setValue("addition", cartState.address.addition);
    }

    // Then we check if the user has a address.
    if (user && user.address) {
      setValue("postalcode", user.address.postalcode);
      setValue("houseNumber", user.address.houseNumber);
      return setValue("addition", user.address.addition);
    }
    // Finally we check if the user has a localstorage address.
    const guest = JSON.parse(localStorage.getItem("guest"));
    if (guest && guest.address) {
      setValue("postalcode", guest.address.postalcode);
      setValue("houseNumber", guest.address.houseNumber);
      return setValue("addition", guest.address.addition);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, delivery, cartState]);

  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="bg-white max-w-sm w-full m-4 rounded-lg flex flex-col justify-between"
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-normal">{t.pick_up_or_deliver}</h2>
        <IconBtn onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconBtn>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-neutral-50 p-4 border mb-4">
          {!openForDelivery && (
            <div className="bg-amber-50 p-2 border text-sm mb-4 flex items-center">
              <span className="w-6 mr-1">
                <InfoIcon className="fill-main" />
              </span>
              {t.closed_for_delivery}
            </div>
          )}
          <div className="flex space-x-2">
            {/* This button sets delivery to false which means the customer will pcik up the order */}
            <button
              onClick={() => setDelivery(false)}
              type="button"
              className={`pick-up-deliver ${
                delivery === false
                  ? "border-main selected text-main"
                  : "text-gray-500"
              }`}
            >
              <StoreIcon
                size="18"
                className={`${
                  delivery === false ? "fill-main" : "fill-gray-500"
                }`}
              />
              {t.pick_up}
            </button>
            {/* This button sets delivery to true which means the order will be delivered. */}
            {openForDelivery && (
              <button
                onClick={() => setDelivery(true)}
                type="button"
                // We disable this button if we are closed for delivery.
                disabled={!openForDelivery}
                className={`pick-up-deliver ${
                  delivery === true
                    ? "border-main selected text-main"
                    : "text-gray-500"
                }`}
              >
                <PedalBikeIcon
                  size="18"
                  className={`${
                    delivery === true ? "fill-main" : "fill-gray-500"
                  }`}
                />
                {t.delivery}
              </button>
            )}
          </div>
          {/* We show the adress for the store if users decides to pick it up. */}
          <AnimatePresence exitBeforeEnter>
            {delivery === false ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm p-2 mt-4"
              >
                <h3 className="font-semibold">{t.address}:</h3>
                <span className="">
                  Havenstraat 13
                  <br />
                  2211EE Noordwijkerhout
                </span>
              </motion.div>
            ) : (
              delivery === true && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-12 mt-4 gap-2"
                  >
                    <Input
                      register={register}
                      errors={errors.postalcode}
                      name="postalcode"
                      autoComplete="postal-code"
                      type="text"
                      label={t.postalcode}
                      wrapper="col-span-12"
                    />
                    {/* Container for the houseNumber. */}
                    <Input
                      register={register}
                      errors={errors.houseNumber}
                      name="houseNumber"
                      type="tel"
                      label={t.house_number}
                      wrapper="col-span-6"
                    />
                    <Input
                      register={register}
                      errors={errors.addition}
                      name="addition"
                      type="text"
                      label={t.house_number_addition}
                      wrapper="col-span-6"
                    />
                    {address.street && (
                      <div className="text-sm text-gray-600 col-span-12">
                        {address.street} {address.houseNumber}
                        {addition && ` ${addition}`}, {address.postalcode}{" "}
                        {address.city}
                      </div>
                    )}
                    {address.error === "not found" && (
                      <div className="text-sm text-red-400 col-span-12">
                        {t.can_not_find_address}
                      </div>
                    )}
                  </motion.div>
                </>
              )
            )}
          </AnimatePresence>
        </div>
        <div className="p-4 space-x-4 flex w-full">
          <button
            onClick={() => {
              // We reset the form.
              reset();
              // We reset the address.
              setAddress(cartState.address);
              setDelivery(cartState.delivery);
              setOpen(false);
            }}
            type="button"
            className="w-5/12 border button"
          >
            {t.cancel}
          </button>
          <button type="submit" className="w-7/12 bg-main text-white button">
            {t.save}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PickUpOrDeliveryModal;
