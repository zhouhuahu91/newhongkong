// Icon import
import ChatIcon from "@/icons/ChatIcon";
// Hook imports
import { useCart } from "@/hooks/useCart";
import usePath from "@/hooks/usePath";

const ChatButton = ({ setOpen, unread }) => {
  // We need to know if there is a cart or not if there is we need to put the icon a little bit higher because of the cart.
  const {
    cartState: { cart },
  } = useCart();

  const { atMenu } = usePath();

  return (
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      className={`bg-main w-12 h-12 rounded-full fixed ${
        cart.length > 0 && atMenu ? "bottom-20 md:bottom-4" : "bottom-4"
      } right-4 flex items-center justify-center red-focus-ring border shadow ${
        unread && "animate-bounce"
      }`}
    >
      <ChatIcon className="fill-white" size="28" />
      {unread && (
        <>
          <div className="w-3 h-3 bg-green-600 rounded-full border border-white top-2 right-3 absolute animate-ping" />
          <div className="w-3 h-3 bg-green-600 rounded-full border border-white top-2 right-3 absolute" />
        </>
      )}
    </button>
  );
};

export default ChatButton;
