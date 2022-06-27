// React imports
import { useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
// Component imports
import Input from "@/components/Input";
// Function imports
import fetchAddressFromAPI from "@/functions/fetchAddressFromAPI";

const ToWhere = ({
  register,
  errors,
  watch,
  address,
  setAddress,
  setValue,
  isDirty,
}) => {
  // Watch function is from react hook form it returns the current input.
  const postalcode = watch("postalcode");
  const houseNumber = watch("houseNumber");
  const addition = watch("addition");
  // t is used to translate.
  const t = useI18n();
  // returns the current user.
  const { user } = useAuth();
  // returns delivery in cartState.
  const {
    cartState: { delivery },
    cartState,
  } = useCart();

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
    <>
      {/* Main container of the inputs */}
      <div className="grid grid-cols-12 gap-2 mt-2">
        {/* Container for the postalcode. */}
        <Input
          register={register}
          errors={errors.postalcode}
          name="postalcode"
          autoComplete="postal-code"
          type="text"
          label={t.postalcode}
          wrapper="col-span-12 xs:col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5"
        />
        {/* Container for the houseNumber. */}
        <Input
          register={register}
          errors={errors.houseNumber}
          name="houseNumber"
          type="tel"
          label={t.house_number}
          wrapper="col-span-6 xs:col-span-4 sm:col-span-5 md:col-span-4 lg:col-span-5"
        />
        {/* Container for the addition. */}
        <Input
          register={register}
          errors={errors.addition}
          name="addition"
          type="text"
          label={t.house_number_addition}
          wrapper="col-span-6 xs:col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-2"
        />
        {address.street && (
          <div className="text-sm text-gray-600 col-span-12">
            {address.street} {address.houseNumber}
            {addition && ` ${addition}`}, {address.postalcode} {address.city}
          </div>
        )}
        {address.error === "not found" && (
          <div className="text-sm text-red-400 col-span-12">
            {t.can_not_find_address}
          </div>
        )}
      </div>
    </>
  );
};

export default ToWhere;
