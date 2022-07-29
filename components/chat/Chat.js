// React imports
import { useState, useEffect, useRef } from "react";
// Component imports
import ChatButton from "@/components/chat/ChatButton";
import CloseIcon from "@/icons/CloseIcon";
import IconBtn from "@/components/IconBtn";
// Hook imports
import useOnClickOutside from "@/hooks/useOnClickOutside";
// Motion imports
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(false);
  const [chatID, setChatID] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // We need ref to check when users clicks outside of the chat.
  const chatRef = useRef(null);
  useOnClickOutside(chatRef, () => setOpen(false));

  return (
    <div ref={chatRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            drag
            className="fixed w-96 h-[576px] z-50 border bg-white right-5 bottom-20 flex flex-col rounded-lg shadow"
          >
            <div className="border-b p-4 flex items-center justify-between">
              <div className="font-semibold text-2xl">Stel je vragen hier.</div>
              <span className="flex h-3 w-3 mr-1">
                <span
                  className={`animate-ping h-3 w-3 absolute inline-flex rounded-full opacity-75 ${
                    true ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    true ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </span>
              <IconBtn onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconBtn>
            </div>
            test
          </motion.div>
        )}
      </AnimatePresence>

      <ChatButton unread={unread} setOpen={setOpen} />
    </div>
  );
};

export default Chat;
