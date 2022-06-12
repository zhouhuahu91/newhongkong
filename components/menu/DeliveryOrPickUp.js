// React imports
import { useState, useEffect } from "react";
// Component imports
import Modal from "@/components/Modal";
import Input from "@/components/Input";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Form imports
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
// Function imports
import fetchAddressFromAPI from "@/functions/fetchAddressFromAPI";

// The user has to decide if they want to have there food delivered or picked up.
// When the user clicks on an item card we check if delivery === "undecided".
// If it is, we open the modal for them to pick one.
const DeliveryOrPickUp = ({ open, setOpen }) => {
  // Returns the state of the cart and dispatch to manipulate the cart.
  const { dispatch, cartState } = useCart();
  const [delivery, setDelivery] = useState(cartState.delivery);
  // t is used to translate the text.
  const t = useI18n();
  // Style of the button.
  const btnStyle =
    "flex items-center justify-center text-sm py-2 focus:outline-none font-medium w-1/2 border transition-colors duration-200 ease-in-out";
  const schema = yup.object().shape({
    postalcode: yup
      .string()
      .required(t.required)
      // We check if the postalcode is a dutch postalcode e.g. 1234AB.
      .matches(/^[1-9][0-9]{3}[\s]?[a-z]{2}[\s]?$/i, t.postalcode_not_valid)
      // We check if the postalcode is in our area. Only 2211, 2212 and limited 2204.
      // Note that 2204 is with limited options not all letter combos are allowed.
      .matches(
        /^(2211)[\s]?[a-z]{2}$|^(2212)[\s]?[a-z]{2}$|^(2204)[\s]?([a][bcjklnprstwx])|(2204)[\s]?([b-c][a-z])$/i,
        t.no_delivery_here
      ),
    // House number only needs validation when delivery is selected.
    houseNumber: yup
      .string()
      // Only numbers are allowed 0-9.
      .matches(/^[0-9]*[\s]?$/, t.house_number_not_valid)
      .required(t.required),
    // Can be whatever. Not sure is 10 is long enough but haven't encountered...
    // a addition to hosue number longer than 5 characters
    addition: yup.string().max(10),
  });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const postalcode = watch("postalcode");
  const houseNumber = watch("houseNumber");

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetchAddressFromAPI(postalcode, houseNumber);
      console.log(response);
    };

    fetchAddress();
  }, [postalcode, houseNumber]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="bg-white max-w-sm w-full m-4 rounded-lg flex flex-col justify-between"
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
              <div className="flex flex-col mt-4 space-y-2">
                <Input
                  register={register}
                  errors={errors.postalcode}
                  name="postalcode"
                  autoComplete="postal-code"
                  type="text"
                  label={t.postalcode}
                  asterisk
                />
                {/* Container for the houseNumber. */}
                <div className="w-full flex space-x-2">
                  <Input
                    register={register}
                    errors={errors.houseNumber}
                    name="houseNumber"
                    type="tel"
                    label={t.house_number}
                    wrapper="w-7/12"
                    asterisk
                  />
                  <Input
                    register={register}
                    errors={errors.addition}
                    name="addition"
                    type="text"
                    label={t.house_number_addition}
                    wrapper="w-5/12"
                  />
                </div>
              </div>
              <div></div>
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
