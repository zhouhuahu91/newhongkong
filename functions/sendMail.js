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

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mail, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const ref = db.doc(`orders/${data.id}`);
        await ref.update({
         mailSent: true,
        });
        resolve(info);
      }
    });
  });

};

export default sendMail;
