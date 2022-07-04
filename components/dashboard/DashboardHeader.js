// NextJs imports
import Link from "next/link";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
// React imports
import { useState } from "react";
// Component imports
import DatePicker from "@/components/DatePicker";
import Switch from "@/components/Switch";
// Function imports
import getCurrentDate from "@/functions/getCurrentDate";

const DashboardHeader = () => {
  const [date, setDate] = useState(getCurrentDate());
  const [showAll, setShowAll] = useState(false);
  const { digitalCurrentTime } = useStoreInfo();

  return (
    <header className="bg-white shadow-sm border-b select-none">
      <div className="mx-auto max-w-screen-lg flex justify-between h-16 items-center px-4">
        <Link href="/">
          <a
            className={`text-2xl font-bold red-focus-ring rounded-md px-1 text-main`}
          >
            nHK
          </a>
        </Link>
        <div className="flex items-center space-x-6 text-xl">
          <span className="mt-1">{digitalCurrentTime}</span>
          <DatePicker date={date} setDate={setDate} />
          <Switch
            toggle={showAll}
            onClick={() => setShowAll((prev) => !prev)}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
