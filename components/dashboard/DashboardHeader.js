import { useState, useEffect } from "react";
// NextJs imports
import Link from "next/link";
// Component imports
import DatePicker from "@/components/DatePicker";
import StoreSettings from "@/components/dashboard/StoreSettings";
import BurgerMenu from "@/components/header/BurgerMenu";
import TablesModal from "@/components/dashboard/TablesModal";

const calculateCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const DashboardHeader = ({ date, setDate, orders, printJobs }) => {
  const [time, setTime] = useState(calculateCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b select-none">
      <div className="mx-auto max-w-screen-xl flex justify-between h-16 items-center px-4">
        <div className="hidden md:block">
          <Link href="/menu">
            <a
              className={`text-2xl font-bold red-focus-ring rounded-md px-1 text-main`}
            >
              nHK
            </a>
          </Link>
        </div>
        <BurgerMenu />
        <h1 className="hidden sm:block text-3xl font-semibold absolute right-1/2 translate-x-1/2 font-mono">
          {time}
        </h1>
        <div className="flex items-center text-xl">
          <DatePicker date={date} setDate={setDate} />
          <TablesModal date={date} />
          <StoreSettings date={date} orders={orders} printJobs={printJobs} />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
