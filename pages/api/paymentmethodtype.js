import Stripe from "stripe";
import { buffer } from "micro";
import Cors from "micro-cors";

import { db } from "@/firebase/admin";

// We activate stripe by passing in the stripe secret.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
  apiVersion: "2020-08-27",
});

const webhookSecret = process.env.PAYMENT_METHOD_TYPE_STRIPE_WEBHOOK_SIG_TEST;

// To check if the webhook is coming from stripe we need the raw body from the req.
export const config = {
  api: {
    bodyParser: false,
  },
};

// To allow cross origin.
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req, res) => {
  // To check if the method is a "POST method".
  if (req.method === "POST") {
    // This part of the code I got from next.js
    // It checks if the webhook request comes from stripe or not.
    // ********
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (e) {
      console.log(`Error message: ${e.message}`);
      res.status(400).send(`Webhook Error: ${e.message}`);
      return;
    }
    // *******

    // If there is no error it means the reqeust comes from stripe itself...
    // The event will also be parsed.
    // We check if the event.type is indeed a succeeded payment or not.
    if (event.type === "payment_intent.succeeded") {
      try {
        const { id } = event.data.object.metadata;
        const paymentMethodDetails =
          event.data.object.charges.data[0].payment_method_details;

        // Look up the order on firebase.
        const ref = db.doc(`orders/${id}`);
        const snapshot = await ref.get();
        // Check if order exists.
        if (snapshot.exists) {
          // If it exists update payment to true.
          await ref.update({
            paymentMethodType: paymentMethodDetails.type,
          });
        }

        res.json({ updated: true });
      } catch (e) {
        console.log(`Error message: ${e.message}`);
      }
    }
  } else {
    // If it isn't "POST we let them know we only accept post methods."
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler);
