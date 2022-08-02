// React imports
import { useState, useRef, useEffect } from "react";
// Component imports
import ChatButton from "@/components/chat/ChatButton";
import DashboardChatPanel from "@/components/dashboard/DashboardChatPanel";
import IconBtn from "@/components/IconBtn";
import AccountIcon from "@/icons/AccountIcon";
import CloseIcon from "@/icons/CloseIcon";
import SendIcon from "@/icons/SendIcon";
// Animation impors
import { motion, AnimatePresence } from "framer-motion";
// Function imports
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
import getDigitalTime from "@/functions/getDigitalTime";
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
  increment,
  orderBy,
  getDoc,
} from "firebase/firestore";

const DashboardChat = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(false);
  const [chat, setChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [processing, setProcessing] = useState(false);

  const chatRef = useRef(null);
  const lastMessageRef = useRef(null);
  const inputRef = useRef(null);

  // useEffect to update chatMessages
  useEffect(() => {
    let unsubscribe = null;
    if (chat) {
      const q = query(
        collection(db, `chats/${chat.id}/messages`),
        orderBy("messageTimeStamp", "asc")
      );
      unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((x) => x.data());
        const waitForTimeStamp = data.every((y) => y.messageTimeStamp);
        if (waitForTimeStamp) setChatMessages(data);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chat]);

  const submit = () => {
    // If there is not chat input, or chat or processing, return.
    if (!chatInput || !chat || processing) return;
    // Set processing to true.
    setProcessing(true);

    const chatRef = doc(db, `chats/${chat.id}`);
    const snapshot = getDoc(chatRef);
    // If chat already exists
    if (snapshot.exists) {
      updateDoc(chatRef, {
        lastMessageTimeStamp: serverTimestamp(),
        lastMessage: chatInput,
        unreadAdmin: increment(0),
        unreadUser: increment(1),
      });
      // If there is no doc we create a new one.
    } else {
      setDoc(chatRef, {
        lastMessageTimeStamp: serverTimestamp(),
        lastMessage: chatInput,
        unreadAdmin: 0,
        unreadUser: 1,
      });
    }
    // We add the message to the chat
    const ref = collection(db, `chats/${chat.id}/messages`);
    addDoc(ref, {
      message: chatInput,
      messageTimeStamp: serverTimestamp(),
      admin: true,
    });

    // We reset the message to empty.
    setChatInput("");
    // // We set focus back on the input.
    inputRef.current.focus();
    // And we turn off the processing.
    setProcessing(false);
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
            className={`fixed w-full h-full bottom-0 right-0 sm:w-[670px] sm:h-[576px] z-50 border bg-white sm:right-5 sm:bottom-20 flex rounded-lg shadow overflow-hidden`}
          >
            <div className="max-w-[256px] w-full border-r-2">
              <DashboardChatPanel
                currentChat={chat}
                setCurrentChat={setChat}
                unread={unread}
                setUnread={setUnread}
                open={open}
              />
            </div>
            <div className="flex flex-col w-full">
              {/* ********* HEADER OF CHAT ********** */}
              <div className="border-b p-4 flex items-center justify-between">
                <div className="font-semibold flex items-center">
                  <AccountIcon size="36" className="mr-2" />
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-medium">{chat?.name}</span>
                    <span className="text-sm font-medium">{chat?.email}</span>
                  </div>
                </div>
                <IconBtn onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconBtn>
              </div>
              {/* ********** HEADER OF CHAT ********** */}
              {/* ********** CHAT MESSAGES ********** */}
              <div className="flex-grow flex flex-col w-full overflow-y-scroll px-1 py-2 text-sm font-normal bg-gray-50">
                {chatMessages.map((message, index) => {
                  const timeStamp = getDigitalTime(
                    getCurrentTimeInSeconds(
                      new Date(message.messageTimeStamp.seconds * 1000)
                    )
                  );
                  if (!message.admin) {
                    return (
                      <div
                        key={index}
                        className="mx-1 mb-2 border max-w-xs py-1 px-2 rounded-t-xl rounded-r-xl self-start flex space-x-2 bg-white relative shadow-sm"
                      >
                        <div className="pr-7">{message.message}</div>
                        <div className="text-[10px] absolute right-1.5 bottom-0">
                          {timeStamp}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="mx-1 mb-2 border max-w-xs py-1 px-2 rounded-t-xl rounded-l-xl self-end flex bg-main relative shadow-sm"
                      >
                        <div className="text-white pr-7">{message.message}</div>
                        <div className="text-[10px] absolute right-1 -bottom-0.5">
                          {timeStamp}
                        </div>
                      </div>
                    );
                  }
                })}
                <div ref={lastMessageRef} />
              </div>
              {/* ********** CHAT MESSAGES ********** */}
              {/* ********** CHAT INPUT ********** */}
              <div className="p-4 shadow flex items-center">
                <input
                  ref={inputRef}
                  onChange={(e) => setChatInput(e.target.value)}
                  value={chatInput}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                  type="text"
                  className="appearance-none my-0.5 px-3 border rounded-md w-full text-sm focus:outline-none bg-inherit red-focus-ring py-2 placeholder-gray-500"
                />
                <IconBtn
                  disabled={!chatInput || processing || !chat}
                  className="ml-4"
                  onClick={() => submit()}
                >
                  <SendIcon />
                </IconBtn>
              </div>
              {/* ********** CHAT INPUT ********** */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ChatButton setOpen={setOpen} unread={unread} />
    </div>
  );
};

export default DashboardChat;
