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

// The user has to decide if they want to have there food delivered or picked up.
// When the user clicks on an item card we check if delivery === "undecided".
// If it is, we open the modal for them to pick one.
const DeliveryOrPickUp = ({ open, setOpen }) => {
  // Returns the state of the cart and dispatch to manipulate the cart.
  const {
    dispatch,
    cartState: { delivery },
  } = useCart();
  // t is used to translate the text.
  const t = useI18n();
  // Style of the button.
  const btnStyle =
    "flex items-center justify-center text-sm py-2 focus:outline-none font-medium w-1/2 border transition-colors duration-200 ease-in-out";
  const schema = yup.object().shape({
    // // Email is requiered and checked if it is a valid email.
    // email: yup.string().required(t.required).email(t.email_not_valid),
    // // Password is requiered.
    // password: yup.string().required(t.required),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="bg-white max-w-xs w-full h-60 p-4 rounded-lg flex flex-col space-y-4 justify-between"
    >
      <div className="flex justify-between">
        {/* This button sets delivery to false which means the customer will pcik up the order */}
        <button
          onClick={() => dispatch({ type: "SET_DELIVERY", payload: false })}
          type="button"
          className={`${btnStyle} rounded-l-md ${
            delivery === false ? "bg-neutral-100" : "shadow-md"
          }`}
        >
          <span className="material-symbols-rounded mr-3">store</span>
          {t.pick_up}
        </button>
        {/* This button sets delivery to true which means the order will be delivered. */}
        <button
          onClick={() => dispatch({ type: "SET_DELIVERY", payload: true })}
          type="button"
          className={`${btnStyle} rounded-r-md ${
            delivery === true ? "bg-neutral-100" : "shadow-md"
          }`}
        >
          <span className="material-symbols-rounded mr-3">pedal_bike</span>
          {t.delivery}
        </button>
      </div>
      {/* We show the adress for the store if users decides to pick it up. */}
      {delivery === false && (
        <div className="text-sm">
          <h3 className="font-semibold">adress:</h3>
          <span>
            Havenstraat 13
            <br />
            2211EE Noordwijkerhout
          </span>
        </div>
      )}
      {delivery === true && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
            <Input
              register={register}
              errors={errors.postalcode}
              name="postalcode"
              autoComplete="postal-code"
              type="text"
              label={t.postalcode}
              wrapper="w-4/12"
              asterisk
            />
            {/* Container for the houseNumber. */}
            <Input
              register={register}
              errors={errors.houseNumber}
              name="houseNumber"
              type="tel"
              label={t.house_number}
              wrapper="w-5/12"
              asterisk
            />
            <Input
              register={register}
              errors={errors.addition}
              name="addition"
              type="text"
              label={t.house_number_addition}
              wrapper="w-3/12"
            />
          </form>
          <div></div>
        </>
      )}
      <div>
        <button className="w-full bg-main text-white button">
          {t.back_to_menu}
        </button>
      </div>
    </Modal>
  );
};

export default DeliveryOrPickUp;
