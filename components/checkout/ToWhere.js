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
  clearErrors,
  setError,
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
    dispatch,
  } = useCart();

  // This useEffect fetches the address from an API if the postalcode and house number are valid.
  useEffect(() => {
    const fetchAddress = async () => {
      // We clear errors if there are errors
      if (errors) {
        clearErrors(["postalcode", "houseNumber"]);
      }
      // We fetch the address
      const response = await fetchAddressFromAPI(postalcode, houseNumber);
      setAddress({ ...response, addition });

      // If there are errors with the response we set errors.
      if (response.error) {
        setError("houseNumber", {
          type: "manual",
        });
        return setError("postalcode", {
          type: "manual",
        });
      }

      // If not we update the cartState with the new address.
      dispatch({
        type: "SET_ADDRESS",
        payload: { ...response, addition },
      });
    };

    // If postalcode and house number of the input is the same as the postalcode and house number of the address we don't need to fetch.
    if (
      postalcode !== cartState.address?.postalcode ||
      houseNumber !== cartState.address?.houseNumber ||
      !cartState.address
    ) {
      fetchAddress();
    }
  }, [postalcode, houseNumber]);

  // If addition changes we also want to update the address in cartState.
  useEffect(() => {
    setAddress((prev) => ({ ...prev, addition }));
  }, [addition]);

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
