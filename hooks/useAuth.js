//React imports.
import { useState, useEffect, useContext, createContext } from "react";
//Firebase imports.
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  onIdTokenChanged,
  FacebookAuthProvider,
} from "firebase/auth";

// First we create the context
const authContext = createContext();

// We export this context so we can use it in other components.
export const useAuth = () => {
  return useContext(authContext);
};

// This is the main function that return the data
const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [userUID, setUserUID] = useState(null);

  // This functions signs in the user.
  const signIn = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      // If sign in is succesfull we return the user, isn't really needed because...
      // the user will be updated with onIdTokenChanged
      if (user) return user;
    } catch (e) {
      // If we get an error we return this error.
      return e;
    }
  };

  // This function sign the user in via google.
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      // If sign in is succesfull we return the user, isn't really needed because...
      // the user will be updated with onIdTokenChanged
      if (user) return user;
    } catch (e) {
      // If we get an error we return this error.
      return e;
    }
  };

  // This function sign the user in via facebook.
  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const user = await signInWithPopup(auth, provider);
      // If sign in is succesfull we return the user, isn't really needed because...
      // the user will be updated with onIdTokenChanged
      if (user) return user;
    } catch (e) {
      // If we get an error we return this error.
      return e;
    }
  };

  // This function creates a new user with email and password
  const signUp = async (email, password, name) => {
    try {
      const { user, code } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // We create a new user in firestore
      const ref = doc(db, `users/${user.uid}`);
      // Get snapshot of ref
      const snapshot = await getDoc(ref);
      // If user exists we update it.
      if (!snapshot.exists()) {
        await setDoc(ref, {
          name: name.toLowerCase(),
          uid: user.uid,
          email: email.toLowerCase(),
        });
      } else {
        // If the user already exists in firestore we update it.
        await updateDoc(ref, {
          name: name.toLowerCase(),
        });
      }
      // We return the user and the code.
      return { user, code };
    } catch (e) {
      // If we get an error we return this error.
      return e;
    }
  };

  // This function signs the user out.
  // We call it signOutUser because signOut is used by firebase.
  const signOutUser = () => {
    signOut(auth);
  };

  // This function sends a password reset email to the user.
  const resetPassword = async (email) => {
    try {
      const res = await sendPasswordResetEmail(auth, email);
      // We do not warn the user if the email is found or not.
      return res;
    } catch (e) {
      // If we get an error we return this error.
      return e;
    }
  };

  // This function updates the user.
  const updateUser = async (user, data) => {
    try {
      // We update the user.
      const ref = doc(db, `users/${user.uid}`);
      // Get snapshot of ref
      const snapshot = await getDoc(ref);
      // If user exists we update it.
      if (snapshot.exists()) {
        return await updateDoc(ref, data);
      } else {
        // If user doesn't exist we return error message.
        return "User doesn't exist";
      }
    } catch (e) {
      // If we get an error we return this error.
      return e;
    }
  };

  // We listen to when a user is signed in or out.
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      // If there is a user we need to fetch the user info in firestore.
      if (user) {
        // We need the uid to check if the user is already in the firestore.
        const uid = user.uid;
        const ref = doc(db, `users/${uid}`);
        const snapshot = await getDoc(ref);
        // If there is no user in firestore it means that the user is new.
        if (!snapshot.exists()) {
          // We create the user in firestore.
          const newUser = {
            uid: user.uid,
            // We check for a display name in case user logged in with google or facebook.
            name: user.displayName ? user.displayName : "",
            // We set email to lowercase just in case.
            email: user.email.toLowerCase(),
          };
          // We use the users UID to create a new user in firestore.
          await setDoc(ref, newUser);
        }
        // We set the userUID to the user UID. With this we can than listen to...
        // to the user in firestore.
        return setUserUID(uid);
      }
      // If there is no user we reset the values to null
      setUserUID(null);
      setUser(null);
    });

    return () => unsubscribe();
  }, []);

  // This useEffect listen to the changes of the user in firestore.
  useEffect(() => {
    let unsubscribe = null;
    if (userUID) {
      const ref = doc(db, `users/${userUID}`);
      unsubscribe = onSnapshot(ref, (snapshot) => {
        // We check if the user is still in firestore.
        // They most likely do since there is a uid and the user get's created in firestore...
        // when there is a uid. See the useEffect above.
        if (snapshot.exists()) {
          // We set the data to the user
          const data = snapshot.data();
          setUser(data);
        }
      });
    }
    return () => {
      // Just in case something went wrong and there is no user in firestore...
      // unsubribe would not exist and we would get an error.
      // That is why we set unsubscribe to null first and than check if it exists.
      if (unsubscribe) unsubscribe();
    };
  }, [userUID]);

  return {
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signUp,
    signOutUser,
    resetPassword,
    updateUser,
    user,
  };
};

// We export this provider to wrap it around the other components.
export const AuthProvider = ({ children }) => {
  const value = useAuthProvider();
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
