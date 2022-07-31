import Stripe from "stripe";

import { db } from "@/firebase/admin";

// We activate stripe by passing in the stripe secret.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE, {
  apiVersion: "2020-08-27",
});

const cancelorder = async (req, res) => {
  // We need the payment intent id to cancel the payment.
  const id = req.body.id;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    if (paymentIntent.status !== "canceled") {
      await stripe.paymentIntents.cancel(id);
      // In the metadata of the payment intent we can find the id of our order.
      const orderId = paymentIntent.metadata.id;
      // We update the order in firestore.
      const ref = db.doc(`orders/${orderId}`);

      ref.update({
        canceled: true,
      });
    }
    // We return the payment intent.
    res.status(200).json(paymentIntent.status);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export default cancelorder;
