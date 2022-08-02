// React imports
import { useState, useEffect, useRef } from "react";
// Component imports
import ChatButton from "@/components/chat/ChatButton";
import CloseIcon from "@/icons/CloseIcon";
import SendIcon from "@/icons/SendIcon";
import SupportIcon from "@/icons/SupportIcon";
import IconBtn from "@/components/IconBtn";
// Function imports
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
// Hook imports
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import useWindowSize from "@/hooks/useWindowSize";
import usePath from "@/hooks/usePath";
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
  increment,
  orderBy,
  getDoc,
} from "firebase/firestore";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(false);
  const [chatID, setChatID] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [processing, setProcessing] = useState(false);

  // We need to know if store is online to display online or offline
  const {
    storeInfo: { openingTime, closingTime },
    currentTimeInSeconds,
  } = useStoreInfo();
  const online =
    currentTimeInSeconds > openingTime && currentTimeInSeconds < closingTime;
  const { user } = useAuth();
  const { atMenu } = usePath();
  const { width } = useWindowSize();
  const {
    cartState: { cart },
  } = useCart();
  // We need ref to check when users clicks outside of the chat.
  const chatRef = useRef(null);
  useOnClickOutside(chatRef, () => setOpen(false));
  // We need the input ref to auto focus when the chat is open && after submit.
  const inputRef = useRef(null);
  // We need the ref for the last element in message so we can scroll there.
  const lastMessageRef = useRef(null);

  const scrollToBottom = () => {
    // We use setTimeout so that this functions happens after the element mounts.
    // A weird workout that works not sure how to do it in a another way.
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView();
    }, 0);
  };

  // We call the function everything the modal and messages updates.
  useEffect(() => {
    scrollToBottom();
  }, [open, chatMessages]);

  // useEffect to update chatID
  useEffect(() => {
    if (user) {
      return setChatID(user.uid);
    }
    // If there is no user we check if there is an chatID stored in localStorage.
    const data = localStorage.getItem("chatID");
    // If there is an id and id !== chatID then update chatID
    if (data) {
      return setChatID(data.id);
    }
  }, [user]);

  const submit = async () => {
    // If there is no input we return from function.
    // We also return if function is already processing.
    if (!chatInput || processing) return;
    // We first check if there is an chatID. If there is no chatID we need to create one.
    if (!chatID) {
      // We create a new collection for the chat.
      const newChatRef = collection(db, "chats");
      const { id } = await addDoc(newChatRef, {
        lastMessageTimeStamp: serverTimestamp(),
        lastMessage: chatInput,
        name: user ? user.name : null,
        email: user ? user.email : null,
        unreadAdmin: 1,
        unreadUser: 0,
      });

      // We add the new message to this collection.
      addDoc(collection(db, `chats/${id}/messages`), {
        message: chatInput,
        messageTimeStamp: serverTimestamp(),
        admin: false,
      });
      // We save the id to the chatID.
      setChatID(id);
      // We also save it to the locale storage.
      localStorage.setItem("chatID", { id });
    } else {
      // If there is an ChatID it means the there is a user logged in or there is a chatID stored in localStorage.
      // If chatID Already exists
      const chatRef = doc(db, `chats/${chatID}`);
      const snapshot = await getDoc(chatRef);
      // If chat already exists
      if (snapshot.exists) {
        updateDoc(chatRef, {
          lastMessageTimeStamp: serverTimestamp(),
          lastMessage: chatInput,
          name: user ? user.name : null,
          email: user ? user.email : null,
          unreadAdmin: increment(1),
          unreadUser: increment(0),
        });
        // If there is no doc we create a new one.
      } else {
        setDoc(chatRef, {
          lastMessageTimeStamp: serverTimestamp(),
          lastMessage: chatInput,
          unreadAdmin: 1,
          unreadUser: 0,
        });
      }
      // We add the message to the chat
      const ref = collection(db, `chats/${chatID}/messages`);
      addDoc(ref, {
        message: chatInput,
        messageTimeStamp: serverTimestamp(),
        admin: false,
      });
    }

    // We reset the message to empty.
    setChatInput("");
    // // We set focus back on the input.
    inputRef.current.focus();
    // And we turn off the processing.
    setProcessing(false);
  };

  // useEffect to update chatMessages
  useEffect(() => {
    let unsubscribe = null;
    if (chatID) {
      const q = query(
        collection(db, `chats/${chatID}/messages`),
        orderBy("messageTimeStamp", "asc")
      );
      unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const waitForTimeStamp = data.every((x) => x.messageTimeStamp);
        if (waitForTimeStamp) setChatMessages(data);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chatID]);

  const resetUnreadCountForUsers = () => {
    const ref = doc(db, `chats/${chatID}`);
    setDoc(ref, { unreadUser: 0 }, { merge: true });
  };

  // Check for unread messages.
  useEffect(() => {
    if (!chatID) return;
    if (open) resetUnreadCountForUsers();

    const ref = doc(db, `chats/${chatID}`);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        if (open) {
          resetUnreadCountForUsers();
          return setUnread(false);
        }
        if (data?.unreadUser > 0) {
          setUnread(true);
        }
      }
    });

    return () => unsubscribe();
  }, [chatID, open]);

  return (
    <div ref={chatRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            drag={width > 640 ? true : false}
            className={`fixed w-full h-full bottom-0 right-0 sm:w-96 sm:h-[576px] z-50 border bg-white sm:right-5 ${
              cart.length > 0 && atMenu
                ? "sm:bottom-36 md:bottom-20"
                : "sm:bottom-20"
            } flex flex-col rounded-lg shadow`}
          >
            {/* ********* HEADER OF CHAT ********** */}
            <div className="border-b p-4 flex items-center justify-between">
              <div className="font-semibold flex items-center">
                <SupportIcon size="36" className="mr-2" />
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-medium">New Hong Kong</span>
                  <div className="flex items-center">
                    <span className="text-xs">
                      {online ? "online" : "offline"}
                    </span>
                    <span className="flex h-2.5 w-2.5 ml-1">
                      <span
                        className={`h-2.5 w-2.5 absolute inline-flex rounded-full opacity-75 ${
                          online ? "bg-green-600 animate-ping" : "bg-main"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                          online ? "bg-green-600" : "bg-main"
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
            <div className="flex-grow flex flex-col w-full overflow-y-scroll px-1 py-2 text-sm font-normal bg-gray-50">
              {chatMessages.map((message, index) => {
                const timeStamp = getDigitalTime(
                  getCurrentTimeInSeconds(
                    new Date(message.messageTimeStamp.seconds * 1000)
                  )
                );
                if (message.admin) {
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
                disabled={!chatInput || processing}
                className="ml-4"
                onClick={() => submit()}
              >
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
