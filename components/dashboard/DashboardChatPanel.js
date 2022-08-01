// React imports
import { useState, useEffect } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
// Hook imports
import useI18n from "@/hooks/useI18n";

const DashboardChatPanel = ({ currentChat, setCurrentChat }) => {
  const [chats, setChats] = useState([]);
  const t = useI18n();
  // Gets all chats from the server.
  useEffect(() => {
    const q = query(
      collection(db, "chats"),
      orderBy("lastMessageTimeStamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // makes the unread not jump when the current chat is the same and the document.
        unreadAdmin: currentChat?.id === doc.id ? 0 : doc.data().unreadAdmin,
      }));
      // When we send message with serverTimestamp it will be null first...
      // with null we can't order the latest chat. Therefor before we update the...
      // chat we wait untill every chat (data) has a lastUpdate timestamp.
      const waitForTimeStamp = data.every((x) => x.lastMessageTimeStamp);
      if (waitForTimeStamp) {
        data.forEach((chat) => {
          if (chat.id === currentChat?.id) {
            setCurrentChat(chat);
          }
        });
        setChats(data);
      }
    });

    return () => unsubscribe();
  }, []);

  // Return the correct day to display
  const getDisplayDate = (time) => {
    const d = new Date(time.seconds * 1000);
    const firstDate = new Date(d).setHours(0, 0, 0, 0);
    const secondDate = new Date().setHours(0, 0, 0, 0);
    const calcDiff = (x, y) => {
      return Math.round((y - x) / (1000 * 60 * 60 * 24));
    };
    const diff = calcDiff(firstDate, secondDate);
    if (diff === 0) {
      return getDigitalTime(getCurrentTimeInSeconds(d));
    }
    if (diff === 1) {
      return t.yesterday;
    }
    if (diff > 1 && diff < 7) {
      return t.days[d.getDay()];
    }
    if (diff >= 7) {
      return getCurrentDate(d);
    }
  };

  return (
    <>
      {chats.map((chat, idx) => {
        return (
          <div
            key={idx}
            className={`flex flex-col w-full p-4 border-b ${
              chat.id === currentChat?.id ? "bg-gray-100" : ""
            }`}
            onClick={() => {
              setCurrentChat(chat);
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold capitalize">
                {chat.name ? chat.name : "unknown"}
              </span>
              <span
                className={`text-xs ${
                  chat.unreadAdmin > 0 ? "text-green-600" : ""
                }`}
              >
                {getDisplayDate(chat.lastMessageTimeStamp)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="line-clamp-1 w-11/12">{chat.lastMessage}</div>
              <span
                className={`flex items-center justify-center text-xs text-white font-semibold ${
                  chat.unreadAdmin > 0
                    ? "rounded-full w-5 h-5 bg-green-600"
                    : ""
                }`}
              >
                {chat.unreadAdmin > 0 ? chat.unreadAdmin : ""}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DashboardChatPanel;
