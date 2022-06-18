// React imports
import { useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import Input from "@/components/Input";
// Function imports
import fetchAddressFromAPI from "@/functions/fetchAddressFromAPI";
// Animation imports
import { motion } from "framer-motion";

const ToWhere = ({ register, errors, watch, address, setAddress }) => {
  // Watch function is from react hook form it returns the current input.
  const postalcode = watch("postalcode");
  const houseNumber = watch("houseNumber");
  const addition = watch("addition");
  // t is used to translate.
  const t = useI18n();

  // This useEffect fetches the address from an API if the postalcode and house number are valid.
  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetchAddressFromAPI(postalcode, houseNumber);
      setAddress({ ...response, addition });
    };

    fetchAddress();
  }, [postalcode, houseNumber]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Title of this part of the form */}
      <h2 className="text-lg my-4">{t.to_where}</h2>
      {/* Main container of the inputs */}
      <div className="grid grid-cols-12 gap-2 my-4">
        {/* Container for the postalcode. */}
        <Input
          register={register}
          errors={errors.postalcode}
          name="postalcode"
          autoComplete="postal-code"
          type="text"
          label={t.postalcode}
          asterisk
          wrapper="col-span-12 xs:col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-5"
        />
        {/* Container for the houseNumber. */}
        <Input
          register={register}
          errors={errors.houseNumber}
          name="houseNumber"
          type="tel"
          label={t.house_number}
          asterisk
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
          <div className="text-xs text-gray-600 col-span-12">
            {address.street} {address.houseNumber}
            {addition && ` ${addition}`}, {address.postalcode} {address.city}
          </div>
        )}
        {address.error === "not found" && (
          <div className="text-xs text-gray-600 col-span-12">
            {t.can_not_find_address}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ToWhere;
