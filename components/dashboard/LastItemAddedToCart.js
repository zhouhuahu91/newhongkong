import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// converts firestore time stamp to [hh:mm:ss]
const formatFirestoreTimestampToTimeString = (timestamp) => {
  if (!timestamp?.toDate) return "[--:--:--]";
  const date = timestamp.toDate();
  return `[${date.toLocaleTimeString("en-GB", { hour12: false })}]`;
};

const LastItemAddedToCart = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // midnight
    const q = query(
      collection(db, "logItemToCart"),
      where("timeStamp", ">=", startOfToday)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      const sortedData = data.sort(
        (a, b) => b.timeStamp.toDate() - a.timeStamp.toDate()
      );
      setLogs(sortedData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute left-2 bottom-2 space-y-1">
      {logs
        .slice(0, 5)
        .reverse()
        .map((log) => (
          <p key={log.id} className="font-mono text-xs">
            {formatFirestoreTimestampToTimeString(log.timeStamp)} {log.user}{" "}
            added {log.item.nl}
          </p>
        ))}
    </div>
  );
};

export default LastItemAddedToCart;
