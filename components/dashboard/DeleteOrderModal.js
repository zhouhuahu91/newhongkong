// React imports
import { useState, useEffect } from "react";
// Component imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

// We can only delete orders if they are not paid online.
// We have to wait atleast x amount of minutes before we can delete an order just in case...
// ... we delete orders that we shouldn't delete.

const DeleteOrderModal = ({ open, setOpen, order }) => {
  const { remarks } = order;
  const overRide = remarks === "DELETE NOW";
  const [secondsLeft, setSecondsLeft] = useState(1);

  // The amount of miliseconds to wait before we can delete the order. Currently it's set to 5 minutes
  const deleteDelay = 5 * 60 * 1000;

  // We update the secondsLeft every second.
  useEffect(() => {
    const calcSecondsLeft = () => {
      return Math.floor((order.createdAt + deleteDelay - Date.now()) / 1000);
    };

    const interval = setInterval(() => {
      const seconds = calcSecondsLeft();

      if (seconds <= 0) {
        setSecondsLeft(0);
        clearInterval(interval); // stop interval when timer hits 0
      } else {
        setSecondsLeft(seconds);
      }
    }, 1000);

    if (order.canceled) {
      clearInterval(interval);
      setSecondsLeft(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [order]);

  return (
    <Modal
      toggle={open}
      close={() => setOpen(false)}
      className="bg-white w-full max-w-md rounded-lg mx-2"
    >
      <div className="flex p-4 justify-between items-center border-b">
        <h1 className="font-semibold text-lg">Warning</h1>
        <IconBtn onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconBtn>
      </div>
      <div className="p-4 bg-neutral-50">
        {secondsLeft > 0 && overRide === false ? (
          <div>
            <p>
              You have to wait atleast {deleteDelay / 60000} minutes before you
              can delete this order.
            </p>
          </div>
        ) : (
          <p>
            Are you sure you want to delete the order placed by{" "}
            <span className="font-semibold text-main">{order.name}</span>? You
            can not undo this.
          </p>
        )}
      </div>
      <div className="flex justify-evenly p-4 space-x-4">
        <button
          onClick={() => {
            setOpen(false);
          }}
          type="button"
          className="button border w-5/12"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            const ref = doc(db, `orders/${order.id}`);
            deleteDoc(ref);
            setOpen(false);
          }}
          disabled={secondsLeft > 0 && !overRide}
          type="button"
          className={`button text-white w-7/12 ${
            secondsLeft > 0 && !overRide
              ? "bg-gray-300 pointer-events-none"
              : "bg-main"
          }`}
        >
          {secondsLeft > 0 && !overRide ? (
            <span className="font-medium text-white">
              0{Math.floor(secondsLeft / 60)}:
              {secondsLeft % 60 > 9 ? secondsLeft % 60 : `0${secondsLeft % 60}`}
            </span>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteOrderModal;
