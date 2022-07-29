// React imports
import { useState, useEffect } from "react";
// Component imports
import ChatButton from "@/components/chat/ChatButton";
// Motion imports
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [chatID, setChatID] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed w-96 h-[576px] z-50 border right-5 bottom-20">
            test
          </motion.div>
        )}
      </AnimatePresence>

      <ChatButton setOpen={setOpen} />
    </>
  );
};

export default Chat;
