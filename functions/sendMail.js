// This function only get's called on the server.
// Firebase imports
import { db } from "@/firebase/admin";
// Function imports
import createMail from "@/functions/createMailContent";

const nodemailer = require("nodemailer");

const sendMail = async (data) => {
  // We create the transporter to send the email with. See docs of nodemailer for more info.
  let transporter = nodemailer.createTransport({
    host: "smtp.transip.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // We create the email with the create mail function.
  const mail = createMail(data);

  try {
    // Mail never gets send if we do not use await here.
    const response = await transporter.sendMail(mail);

    // If there is a response.err it means something went wrong we return and console.log it.
    if (response.err) {
      return console.log(response.err);
    }

    // If there is no response.err we update the order status with the email send.
    const ref = db.doc(`orders/${data.id}`);
    await ref.update({
      mailSent: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export default sendMail;
