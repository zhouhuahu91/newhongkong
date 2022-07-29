// React imports
import { useState, useEffect } from "react";
// Icon import
import ChatIcon from "@/icons/ChatIcon";
// Hook imports
import { useCart } from "@/hooks/useCart";

const ChatButton = ({ setOpen }) => {
  const [unread, setUnread] = useState(false);
  // We need to know if there is a cart or not if there is we need to put the icon a little bit higher because of the cart.
  const {
    cartState: { cart },
  } = useCart();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`bg-main w-12 h-12 rounded-full fixed ${
        cart.length > 0 ? "bottom-20 md:bottom-4" : "bottom-4"
      } right-4 flex items-center justify-center red-focus-ring shadow ${
        unread && "animate-bounce"
      }`}
    >
      <ChatIcon className="fill-white" size="28" />
      {unread && (
        <div className="w-2.5 h-2.5 bg-green-600 rounded-full border-2 border-white top-2 right-3.5 absolute" />
      )}
    </button>
  );
};

export default ChatButton;
