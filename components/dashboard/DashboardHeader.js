// NextJs imports
import Link from "next/link";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
// React imports
import { useState } from "react";
// Component imports
import DatePicker from "@/components/DatePicker";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";

const DashboardHeader = () => {
  const [date, setDate] = useState(getCurrentDate());
  const { digitalCurrentTime } = useStoreInfo();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="mx-auto max-w-screen-lg flex justify-between h-16 items-center px-4">
        <Link href="/">
          <a
            className={`text-2xl font-bold red-focus-ring rounded-md px-1 text-main`}
          >
            nHK
          </a>
        </Link>
        <div className="flex items-center space-x-3">
          <span className="font-semibold mt-1">{digitalCurrentTime}</span>
          <DatePicker date={date} setDate={setDate} />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
