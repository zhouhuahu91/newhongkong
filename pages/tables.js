import { useState } from "react";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Component imports
import Header from "@/tables/Header";

const Tables = () => {
  const { currentDate } = useStoreInfo();
  const [date, setDate] = useState(currentDate);
  return <Header date={date} setDate={setDate} />;
};

export default Tables;
