// React imports
import { useState } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";
import IconButton from "@/components/IconButton";
// Stripe imports
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// Function imports
import getURL from "@/functions/getURL";
import euro from "@/functions/euro";

const StripePaymentModal = ({ toggle, cancel, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  // Store state for processing payment
  const [processing, setProcessing] = useState(false);
  // Shows loader when payment element is not ready
  const [loading, setLoading] = useState(true);
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
      toggle={toggle}
      // We do not allow user to close the modal via click on backdrop.
      // User can only close the modal via the cancel button.
      close={() => true}
      className="bg-neutral-50 w-full mx-2 max-w-md rounded-md overflow-hidden"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-4 bg-white border flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t.pay}</h1>
          <IconButton variant="close" onClick={() => cancel()} />
        </div>
        <div className="p-4">
          {loading && <div>loading...</div>}
          <PaymentElement
            id="payment-element"
            onReady={() => setLoading(false)}
          />
        </div>
        <div className="grid grid-cols-12 gap-4 bg-white shadow p-4">
          <button
            onClick={() => cancel()}
            type="button"
            className="button border col-span-5"
          >
            {t.cancel}
          </button>
          <SubmitButton
            className="col-span-7"
            processing={processing || !stripe || !elements}
          >
            {t.pay} {euro(total)}
          </SubmitButton>
        </div>
      </form>
    </Modal>
  );
};

export default StripePaymentModal;
