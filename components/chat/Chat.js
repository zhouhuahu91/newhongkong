// React imports
import { useState, useEffect, useRef } from "react";
// Component imports
import ChatButton from "@/components/chat/ChatButton";
import CloseIcon from "@/icons/CloseIcon";
import SendIcon from "@/icons/SendIcon";
import SupportIcon from "@/icons/SupportIcon";
import IconBtn from "@/components/IconBtn";
// Hook imports
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
// Motion imports
import { motion, AnimatePresence } from "framer-motion";
// Firebase imports
import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  setDoc,
  updateDoc,
  orderBy,
  increment,
  getDoc,
} from "firebase/firestore";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(false);
  const [chatID, setChatID] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [processing, setProcessing] = useState(false);

  // We need to know if store is closed to display online or offline
  const { closed } = useStoreInfo();
  const { user } = useAuth();
  // We need ref to check when users clicks outside of the chat.
  const chatRef = useRef(null);
  useOnClickOutside(chatRef, () => setOpen(false));

  // useEffect to update chatID
  useEffect(() => {
    // If there is an user and userID is !== chatID then update chatID
    if (user && user.id !== chatID) {
      return setChatID(user.id);
    }
    // If there is no user we check if there is an chatID stored in localStorage.
    if (!user) {
      const data = localStorage.getItem("chatID");
      // If there is an id and id !== chatID then update chatID
      if (data && data !== chatID) {
        return setChatID(data.id);
      }
    }
  }, [chatID, user]);

  const submit = async () => {
    // If there is no input we return from function.
    // We also return if function is already processing.
    if (!chatInput || processing) return;
    // We first check if there is an chatID. If there is no chatID we need to create one.
    if (!chatID) {
    }
  };

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
            {/* ********* HEADER OF CHAT ********** */}
            <div className="border-b p-4 flex items-center justify-between">
              <div className="font-semibold flex items-center">
                <SupportIcon size="36" className="mr-2" />
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-medium">New Hong Kong</span>
                  <div className="flex items-center">
                    <span className="text-xs">
                      {closed ? "offline" : "online"}
                    </span>
                    <span className="flex h-2.5 w-2.5 ml-1">
                      <span
                        className={`animate-ping h-2.5 w-2.5 absolute inline-flex rounded-full opacity-75 ${
                          !closed ? "bg-green-600" : "bg-red-600"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                          !closed ? "bg-green-600" : "bg-red-500"
                        }`}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <IconBtn onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconBtn>
            </div>
            {/* ********** HEADER OF CHAT ********** */}
            {/* ********** CHAT MESSAGES ********** */}
            <div className="bg-neutral-50 flex-grow">messages</div>
            {/* ********** CHAT MESSAGES ********** */}
            {/* ********** CHAT INPUT ********** */}
            <div className="p-4 shadow flex items-center">
              <input
                onChange={(e) => setChatInput(e.target.value)}
                value={chatInput}
                autoFocus
                type="text"
                className="appearance-none my-0.5 px-3 border rounded-md w-full text-sm focus:outline-none bg-inherit red-focus-ring py-2 placeholder-gray-500"
              />
              <IconBtn className="ml-4">
                <SendIcon />
              </IconBtn>
            </div>
            {/* ********** CHAT INPUT ********** */}
          </motion.div>
        )}
      </AnimatePresence>

      <ChatButton unread={unread} setOpen={setOpen} />
    </div>
  );
};

export default Chat;
