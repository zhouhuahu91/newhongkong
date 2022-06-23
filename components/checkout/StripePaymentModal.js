// React imports
import { useState } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";
// Stripe imports
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// Function imports
import getURL from "@/functions/getURL";

const StripePaymentModal = ({ open, setOpen }) => {
  const stripe = useStripe();
  const elements = useElements();
  // Store state for processing payment
  const [processing, setProcessing] = useState(false);
  // t is used to translate text.
  const t = useI18n();
  // GetUrl returns the URL depending on the environment.
  const URL = getURL();

  // Handle payment submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make sure stripe and elements is loaded
    if (!stripe || !elements) {
      return;
    }
    // Set processing to true
    setProcessing(true);
    // Confirm stripe payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: URL,
      },
    });

    // If there is no error customer will get redirected to the return url.
    // TODO handle ERROR
    setProcessing(false);
  };
  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="bg-white w-full max-w-md p-6 rounded"
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <SubmitButton processing={processing || !stripe || !elements}>
          {t.pay}
        </SubmitButton>
      </form>
    </Modal>
  );
};

export default StripePaymentModal;
