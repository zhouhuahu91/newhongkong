import { useState, useEffect } from "react";

const calculateCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const Clock = () => {
  const [time, setTime] = useState(calculateCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <h1 className="hidden sm:block text-3xl font-semibold font-mono">{time}</h1>
  );
};

export default Clock;
