import { auth, db } from "@/firebase/admin";

export default async function customclaims(req, res) {
  try {
    const { user, email, roll } = req.body;

    // If there is no user we return the error message
    if (!user) {
      return res.json({ error: "Only admins can asign rolls." });
    }

    // If there is a user we get the users credentials
    const { customClaims } = await auth.getUserByEmail(user.email);

    // If the user is not an admin we return him with the same error.
    if (!customClaims.admin) {
      return res.json({ error: "Only admins can asign rolls." });
    }

    // We get the uid of the email.
    const { uid } = await auth.getUserByEmail(email);

    const ref = db.doc(`users/${uid}`);

    // If roll is delete we delete the rolls from the claims.
    if (roll === "delete") {
      // We delete the custom Claims.
      await auth.setCustomUserClaims(uid, {
        admin: false,
        employee: false,
        accountant: false,
      });
      // Update user db.
      await ref.update({
        admin: false,
        employee: false,
        accountant: false,
      });
      return res.json({ message: `Deleted custom claims from ${email}` });
    }

    await auth.setCustomUserClaims(uid, {
      admin: roll === "admin" ? true : false,
      employee: roll === "employee" ? true : false,
      accountant: roll === "accountant" ? true : false,
    });

    await ref.update({
      admin: roll === "admin" ? true : false,
      employee: roll === "employee" ? true : false,
      accountant: roll === "accountant" ? true : false,
    });

    return res.json({ message: `${email} is now a ${roll}.` });
  } catch (e) {
    if (e.code === "auth/user-not-found") {
      return res.json({ error: `There is no user with that email.` });
    }
    return res.status(500).json({ e });
  }
}
