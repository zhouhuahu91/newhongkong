const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
import { db } from "@/firebase/admin";
import { getCurrentDate } from "@/functions/getCurrentDate";

// We activate stripe by passing in the stripe secret.

// This function creates the stripe secret.
const createSecret = async (id, data) => {
  try {
    const { cash, total } = data;
    // If the user pays in cash we return null because we do not need the secret.
    if (cash === "in_person") return null;
    // In the secret we have the amount and the id of the order to later confirm the payment.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { id },
    });
    return paymentIntent.client_secret;
  } catch (e) {
    return { e };
  }
};

const createorder = async (req, res) => {
  try {
    const data = req.body;
    // We create a new order in firestore this than will return the id it has...
    // generated for us.
    const date = getCurrentDate();
    const { id } = await db.collection("orders").add({
      paid: false,
      printed: false,
      ready: false,
      mailSent: false,
      completed: false,
      ...data,
      // date is UTC. Two hours earlier than The Netherlands. Doesn't effect the outcome.
      date,
      createdAt: Date.now(),
    });

    let secret = null;
    // We create a secret if user doesn't pay with cash
    if (data.cash !== "in_person") {
      secret = await createSecret(id, data);
    }

    // We return the secret to the front end.
    return res.status(201).json({ secret, id, date });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e });
  }
};

export default createorder;
