// NextJs imports
import Link from "next/link";
// Component imports
import DatePicker from "@/components/DatePicker";
import StoreSettings from "@/components/dashboard/StoreSettings";
import BurgerMenu from "@/components/header/BurgerMenu";
import TablesModal from "@/components/dashboard/TablesModal";
import Clock from "@/components/dashboard/Clock";

const DashboardHeader = ({ date, setDate, orders, printJobs }) => {
  return (
    <header className="bg-white shadow-sm border-b select-none">
      <div className="mx-auto max-w-screen-xl flex justify-between h-16 items-center px-4">
        <div className="hidden md:block w-60">
          <Link href="/menu">
            <a
              className={`text-2xl font-bold red-focus-ring rounded-md px-1 text-main`}
            >
              nHK
            </a>
          </Link>
        </div>
        <BurgerMenu />
        <Clock />
        <div className="flex items-center text-xl">
          <DatePicker date={date} setDate={setDate} />
          <TablesModal date={date} setDate={setDate} />
          <StoreSettings date={date} orders={orders} printJobs={printJobs} />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
