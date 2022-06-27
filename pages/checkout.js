// React imports
import { useState, useEffect } from "react";
// NextJs imports
import Link from "next/link";
import { useRouter } from "next/router";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Component imports
import DesktopCart from "@/components/cart/DesktopCart";
import MobileCart from "@/components/cart/MobileCart";
import PickUpOrDelivery from "@/components/checkout/PickUpOrDelivery";
import ForWho from "@/components/checkout/ForWho";
import ToWhere from "@/components/checkout/ToWhere";
import ForWhen from "@/components/checkout/ForWhen_2.0";
import Remarks from "@/components/checkout/Remarks";
import Payment from "@/components/checkout/Payment";
import SubmitButton from "@/components/SubmitButton";
import StripePaymentModal from "@/components/checkout/StripePaymentModal";
// Third party imports
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
// Animation imports
import { AnimatePresence, motion } from "framer-motion";
// Function imports
import calculateTotalCartPrice from "@/functions/calculateTotalCartPrice";
import euro from "@/functions/euro";
import getURL from "@/functions/getURL";
// Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const CheckOut = () => {
  // Store stripe Promise in state.
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC_TEST)
  );
  // We store stripe client secret.
  const [clientSecret, setClientSecret] = useState(null);
  // Store state for stripe payment modal.
  const [stripePaymentModal, setStripePaymentModal] = useState(false);
  // We use this state to store the address that the api returns.
  const [address, setAddress] = useState({});
  // Holds the state for when submit is processing
  const [processing, setProcessing] = useState(false);
  // t is used to translate text.
  const t = useI18n();
  // Returns dispatch and cartState from cart provider.
  const {
    dispatch,
    cartState,
    cartState: { delivery, paymentMethod, cart },
  } = useCart();
  // Returns information about the store
  const { closed, storeFees } = useStoreInfo();
  // Returns the users info
  const { user } = useAuth();
  // Returns real URL or prodution URL
  const URL = getURL();
  // We need router to push the user to the succes page.
  const router = useRouter();

  const schema = yup.object().shape({
    // Postalcode only needs validation when delivery is selected.
    // If we would to remove this, eventhough the ToWhere component is not rendered the submit won't work...
    // because the postalcode and houseNumber are getting validated by yup.
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
      .required(t.select_time)
      // Default value is set to null so that people always select a time.
      .matches(/^(?!null$).*/, t.select_time),
    // Remarks is set to max 500 characters.
    remarks: yup.string().max(500, t.remarks_max),
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    setFocus,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    // We store the delivery method and payment method in the global state aka context.
    // We need there value outside the checkout.
  });
  // We need this to check if user already started with the form or not.
  const { isDirty } = useFormState({ control });

  // If there is no user signed in we check the local storage if there is a guest object.
  // With that object we fill in the form.
  useEffect(() => {
    const guest = JSON.parse(localStorage.getItem("guest"));
    // If user already started on the form we exit this function.
    if (isDirty) return;
    if (user) {
      // We check every just in case.
      if (user.name) setValue("name", user.name);
      if (user.email) setValue("email", user.email);
      if (user.tel) setValue("tel", user.tel);
      if (user.saveRemarks) setValue("saveRemarks", user.saveRemarks);
      if (user.saveRemarks && user.remarks) setValue("remarks", user.remarks);
      if (user.address) {
        setValue("postalcode", user.address.postalcode);
        setValue("houseNumber", user.address.houseNumber);
        setValue("addition", user.address.addition);
      }
    } else if (guest) {
      setValue("name", guest.name);
      setValue("email", guest.email);
      setValue("tel", guest.tel);
      setValue("postalcode", guest.postalcode);
      setValue("houseNumber", guest.houseNumber);
      setValue("addition", guest.addition);
      setValue("saveRemarks", guest.saveRemarks);
      // We check if the saveRemarks is true if it is we set it's value.
      if (guest.saveRemarks) {
        setValue("remarks", guest.remarks);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (formData) => {
    // We disable the submit button by setting the processing state to true.
    setProcessing(true);

    // If delivery === true && the address is not found we need to show the user an error.
    if (address.error === "not found" && delivery === true) {
      setError("houseNumber", {
        type: "manual",
      });
      setError("postalcode", {
        type: "manual",
      });
      setFocus("postalcode");
      return setProcessing(false);
    }

    // We collect al the users data in an object.
    const data = {
      user: user ? user.uid : "guest",
      ...formData,
      total: calculateTotalCartPrice(cartState, storeFees),
      ...cartState,
      address: { ...address, addition: formData.addition },
      storeFees,
    };

    // If there is a user we update there info to the database.
    if (user) {
      // updateUser(data); TODO MAKE A FUNCTION THAT UPDATES THE USERS INFO.
    }
    // We always save the information to localstorage.
    localStorage.setItem("guest", JSON.stringify({ ...data }));

    const {
      data: { secret, id, date },
    } = await axios.post(`${URL}/api/createorder`, data);

    console.log(secret, id, date);

    // There are two ways to this function can go.
    // 1. User pays in person.
    // 2. User pays online.
    if (paymentMethod === "in_person") {
      // If user pays in person we send mail and add time slot on the server.
      setProcessing(false);
      // return router.push(`/succes?redirect_status=succeeded&id=${id}`);
    } else if (paymentMethod === "online") {
      setClientSecret(secret);
      return setStripePaymentModal(true);
      // If it is not cash we use the stripe secret generated in create order api...
      // to open the payment modal.
    } else {
      // Just in case something went wrong.
      // We turn off Processing
      return setProcessing(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto relative">
        <MobileCart />
        <div className="grid md:grid-cols-12 gap-6 mx-4">
          {/* Container for left part of the content, the form. */}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 mb-20 w-full">
            {/* Main title of the checkout form. */}
            <h1 className="text-3xl font-semibold my-8">{t.almost_done}</h1>
            <PickUpOrDelivery />
            {delivery !== "undecided" && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <AnimatePresence>
                  {delivery === true && (
                    <ToWhere
                      register={register}
                      errors={errors}
                      watch={watch}
                      address={address}
                      setAddress={setAddress}
                      setValue={setValue}
                      isDirty={isDirty}
                    />
                  )}
                </AnimatePresence>
                <ForWho register={register} errors={errors} />
                <ForWhen
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                />
                <Remarks errors={errors} register={register} />
                <Payment />
                {paymentMethod !== "undecided" && cart.length > 0 && !closed && (
                  <>
                    <SubmitButton processing={processing} className="mt-12">
                      {paymentMethod === "online" ? t.pay : t.place_order}{" "}
                      {euro(calculateTotalCartPrice(cartState, storeFees))}
                    </SubmitButton>
                    <div className="text-xs flex justify-start w-full max-w-sm">
                      <span className="mt-2 text-gray-600">
                        {t.our}{" "}
                        <Link href="/privacy_policy">
                          <a className="text-main font-medium">
                            {t.privacy_policy}
                          </a>
                        </Link>{" "}
                        {t.applies}.
                      </span>
                    </div>
                  </>
                )}
              </motion.form>
            )}
          </div>
          {/* Container for the cart. */}
          <div className="col-span-6 lg:col-span-5">
            <DesktopCart />
          </div>
        </div>
      </div>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              variables: {
                colorPrimary: "#e76f51",
                colorText: "#6b7280",
                colorDanger: "#f87171",
                fontFamily: `'Poppins', sans-serif`,
                fontSizeBase: "16px",
              },
            },
          }}
        >
          <StripePaymentModal
            toggle={stripePaymentModal}
            cancel={() => {
              setStripePaymentModal(false);
              setClientSecret(null);
              setProcessing(false);
            }}
            total={calculateTotalCartPrice(cartState, storeFees)}
          />
        </Elements>
      )}
    </>
  );
};

export default CheckOut;
