// React imports
import { useState } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";
// Component imports
import DesktopCart from "@/components/cart/DesktopCart";
import MobileCart from "@/components/cart/MobileCart";
import PickUpOrDelivery from "@/components/checkout/PickUpOrDelivery";
import ForWho from "@/components/checkout/ForWho";
import ToWhere from "@/components/checkout/ToWhere";
import ForWhen from "@/components/checkout/ForWhen";
import Remarks from "@/components/checkout/Remarks";

// Form imports
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Animation imports
import { AnimatePresence, motion } from "framer-motion";

const CheckOut = () => {
  // We use this state to store the address that the api returns.
  const [address, setAddress] = useState({});
  // t is used to translate text.
  const t = useI18n();
  // Returns dispatch and cartState from cart provider.
  const { dispatch, cartState } = useCart();

  const schema = yup.object().shape({
    // Postalcode only needs validation when delivery is selected.
    // If we would to remove this, eventhough the ToWhere component is not rendered the submit won't work...
    // because the postalcode and houseNumber are getting validated by yup.
    postalcode: cartState.delivery
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
    houseNumber: cartState.delivery
      ? yup
          .string()
          // Only numbers are allowed 0-9.
          .matches(/^[0-9]*[\s]?$/, t.house_number_not_valid)
          .required(t.required)
      : yup.string(),
    // Can be whatever. Not sure is 5 is long enough but haven't encountered...
    // a addition to hosue number longer than 5 characters
    addition: yup.string().max(5),
    name: yup.string().required(t.required),
    tel: yup
      .string()
      .required(t.required)
      // Old version check for a dutch number but than tourists can't use there phone number.
      // This now matches all phone numbers, also international ones.
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, t.tel_not_valid),
    email: yup.string().email(t.email_not_valid).required(t.required),
    // Date does't need much validation because it is a select input.
    time: yup
      .string()
      .required(t.required)
      // Default value is set to null so that people always select a time.
      .matches(/^(?!null$).*/, t.required),
    // Remarks is set to max 500 characters.
    remarks: yup.string().max(500, t.remarks_max),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    // We store the delivery method and payment method in the global state aka context.
    // We need there value outside the checkout.
  });

  const { isDirty } = useFormState({ control });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto relative">
      <MobileCart />
      <div className="grid md:grid-cols-12 gap-6 mx-4">
        {/* Container for left part of the content, the form. */}
        <div className="col-span-12 md:col-span-6 lg:col-span-7 mb-20 w-full">
          {/* Main title of the checkout form. */}
          <h1 className="text-5xl uppercase font-semibold my-8">
            {t.almost_done}
          </h1>
          <PickUpOrDelivery />
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <ForWho register={register} errors={errors} />
            <AnimatePresence>
              {cartState.delivery === true && (
                <ToWhere
                  register={register}
                  errors={errors}
                  watch={watch}
                  address={address}
                  setAddress={setAddress}
                />
              )}
            </AnimatePresence>
            <ForWhen
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <Remarks errors={errors} register={register} />
          </motion.form>
        </div>
        {/* Container for the cart. */}
        <div className="col-span-6 lg:col-span-5">
          <DesktopCart />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
