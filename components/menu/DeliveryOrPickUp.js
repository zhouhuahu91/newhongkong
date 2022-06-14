// React imports
import { useState, useEffect } from "react";
// Component imports
import Modal from "@/components/Modal";
import Input from "@/components/Input";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
// Form imports
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
// Function imports
import fetchAddressFromAPI from "@/functions/fetchAddressFromAPI";

// The user has to decide if they want to have there food delivered or picked up.
// When the user clicks on an item card we check if delivery === "undecided".
// If it is, we open the modal for them to pick one.
const DeliveryOrPickUp = ({ open, setOpen }) => {
  // Returns the state of the cart and dispatch to manipulate the cart.
  const { dispatch, cartState } = useCart();
  // Stores the state of delivery or pickup. true = delivery, false = pickup.
  const [delivery, setDelivery] = useState(cartState.delivery);
  // Store the state of the address.
  const [address, setAddress] = useState({});
  // t is used to translate the text.
  const t = useI18n();
  // We need the user to prefill the address if they have one.
  const { user } = useAuth();
  // Style of the button.
  const btnStyle =
    "flex items-center justify-center text-sm py-2 focus:outline-none font-medium w-1/2 border transition-colors duration-200 ease-in-out";
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
            /^(2211)[\s]?[a-z]{2}$|^(2212)[\s]?[a-z]{2}$|^(2204)[\s]?([a][bcjklnprstwx])|(2204)[\s]?([b-c][a-z])$/i,
            t.no_delivery_here
          )
      : yup.string(),
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
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // These variablles updates when users provide data.
  const postalcode = watch("postalcode");
  const houseNumber = watch("houseNumber");
  const addition = watch("addition");

  // We need to know if the user is trying to fill in the form so that we do not override their data.
  const { isDirty } = useFormState({ control });

  const onSubmit = () => {
    // If delivery === "undecided" we need to let the user know it needs to be decided.
    // Not sure yet how to let the user know.
    if (delivery === "undecided") return;

    // If delivery === false we need to set the cartState to false for delivery
    if (delivery === false) {
      dispatch({ type: "SET_DELIVERY", payload: false });
      return setOpen(false);
    }

    // If delivery === true we need to set the cartState to true for delivery and set the address.
    if (delivery === true) {
      dispatch({ type: "SET_ADDRESS", payload: address });
      dispatch({ type: "SET_DELIVERY", payload: true });
      return setOpen(false);
    }
  };

  // This useEffect fetches the address from an API if the postalcode and house number are valid.
  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetchAddressFromAPI(postalcode, houseNumber);
      setAddress({ ...response, addition });
    };

    fetchAddress();
  }, [postalcode, houseNumber]);

  // We check cart, localstorage and user data to see if we can prefill the form.
  useEffect(() => {
    // If delivery is false we do not need to prefill the form.
    if (!delivery) return;

    // If the form is dirty we do not prefill the form.
    if (isDirty) return;

    // First we check if the cartState already has a address.
    if (cartState.address) {
      // We set the address to the cartState address.
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
      open={open}
      setOpen={setOpen}
      className="bg-white max-w-md w-full m-4 rounded-lg flex flex-col justify-between"
    >
      <h2 className="text-lg p-4">{t.pickup_delivery}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-neutral-50 p-4 border">
          <div className="flex justify-between">
            {/* This button sets delivery to false which means the customer will pcik up the order */}
            <button
              onClick={() => setDelivery(false)}
              type="button"
              className={`${btnStyle} rounded-l-md ${
                delivery === false ? "bg-neutral-100" : "shadow-md bg-white"
              }`}
            >
              <span className="material-symbols-rounded mr-3">store</span>
              {t.pick_up}
            </button>
            {/* This button sets delivery to true which means the order will be delivered. */}
            <button
              onClick={() => setDelivery(true)}
              type="button"
              className={`${btnStyle} rounded-r-md ${
                delivery === true ? "bg-neutral-100" : "shadow-md bg-white"
              }`}
            >
              <span className="material-symbols-rounded mr-3">pedal_bike</span>
              {t.delivery}
            </button>
          </div>
          {/* We show the adress for the store if users decides to pick it up. */}
          {delivery === false && (
            <div className="text-xs p-2 mt-4">
              <h3 className="font-semibold">{t.address}:</h3>
              <span className="">
                Havenstraat 13
                <br />
                2211EE Noordwijkerhout
              </span>
            </div>
          )}
          {delivery === true && (
            <>
              <div className="grid grid-cols-12 mt-4 gap-2">
                <Input
                  register={register}
                  errors={errors.postalcode}
                  name="postalcode"
                  autoComplete="postal-code"
                  type="text"
                  label={t.postalcode}
                  asterisk
                  wrapper="col-span-12 sm:col-span-5"
                />
                {/* Container for the houseNumber. */}
                <Input
                  register={register}
                  errors={errors.houseNumber}
                  name="houseNumber"
                  type="tel"
                  label={t.house_number}
                  wrapper="col-span-7 sm:col-span-4"
                  asterisk
                />
                <Input
                  register={register}
                  errors={errors.addition}
                  name="addition"
                  type="text"
                  label={t.house_number_addition}
                  wrapper="col-span-5 sm:col-span-3"
                />
                {address.street && (
                  <div className="text-xs text-gray-600 col-span-12">
                    {address.street} {address.houseNumber}
                    {addition && ` ${addition}`}, {address.postalcode}{" "}
                    {address.city}
                  </div>
                )}
                {address.error === "not found" && (
                  <div className="text-xs text-gray-600 col-span-12">
                    {t.can_not_find_address}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="p-4 space-x-4 flex w-full">
          <button
            onClick={() => {
              reset();
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

export default DeliveryOrPickUp;
