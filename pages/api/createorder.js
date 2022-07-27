const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
import { db } from "@/firebase/admin";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";
import sendMail from "@/functions/sendMail";
import addTimeSlot from "@/functions/addTimeSlot";

// We activate stripe by passing in the stripe secret.

// This function creates the stripe secret.
const createPaymentIntent = async (id, data) => {
  try {
    const { paymentMethod, total } = data;
    // If the user pays in cash we return null because we do not need the secret.
    if (paymentMethod === "in_person") return null;
    // In the secret we have the amount and the id of the order to later confirm the payment.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { id },
    });
    return paymentIntent;
  } catch (e) {
    return { e };
  }
};

// TODO:
// This function calculates the total amount again just in case user tries to manipulate the total.

const createorder = async (req, res) => {
  try {
    const data = req.body;
    // We create a new order in firestore this than will return the id it has...
    // generated for us.
    const date = getCurrentDate();
    const { id } = await db.collection("orders").add({
      paid: false,
      paymentMethodType: null,
      canceled: false,
      printed: false,
      ready: false,
      mailSent: false,
      completed: false,
      ...data,
      // date is UTC. Two hours earlier than The Netherlands. Doesn't effect the outcome.
      date,
      createdAt: Date.now(),
    });

    let paymentIntent = null;

    // The user has two options.
    // 1. The user pays online if he/she does we need to create an secret key.
    // 2. The user pays in person, then we need to send a confirmation email and add the time slot.
    if (data.paymentMethod === "in_person") {
      // We send the email.
      await sendMail({ ...data, id });
      // We add time slot.
      await addTimeSlot({ ...data, date });
    } else if (data.paymentMethod === "online") {
      // We create the secret and return it to the front-end where user get redirected to pay with stripe.
      paymentIntent = await createPaymentIntent(id, data);
    } else {
      console.log(
        "Something went wrong with the payment method.",
        data.paymentMethod
      );
      return res
        .status(500)
        .json({ error: "Something went wrong with the payment methid." });
    }

    // We return the secret to the front end.
    return res.status(201).json({ intent: paymentIntent, id, date });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e });
  }
};

export default createorder;
