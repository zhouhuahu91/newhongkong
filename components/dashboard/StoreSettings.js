// React imports
import { useState, useEffect } from "react";
// Component imports
import IconButton from "@/components/IconButton";
import Modal from "@/components/Modal";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const StoreSettings = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState({});

  useEffect(() => {
    // We listen to the settings in the general collection.
    const ref = doc(db, "general/settings");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        const { openingHours, liveMessage } = snapshot.data();
        setSettings(openingHours);
        if (liveMessage) {
          setMessage(liveMessage);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton
        className="mx-2"
        variant="settings"
        onClick={() => setOpen(true)}
      />
      <Modal
        toggle={open}
        close={() => setOpen(false)}
        className="bg-white w-full max-w-md rounded-lg"
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-normal">Store Settings</h2>
          <IconButton variant="close" onClick={() => setOpen(false)} />{" "}
        </div>
        <div></div>
      </Modal>
    </>
  );
};

export default StoreSettings;
