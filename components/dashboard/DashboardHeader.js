// NextJs imports
import Link from "next/link";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Component imports
import DatePicker from "@/components/DatePicker";
import Switch from "@/components/Switch";
import StoreSettings from "@/components/dashboard/StoreSettings";
import BurgerMenu from "@/components/header/BurgerMenu";
import TablesModal from "@/components/dashboard/TablesModal";

const DashboardHeader = ({ date, setDate, orders, printJobs }) => {
  const { digitalCurrentTime } = useStoreInfo();

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
        <h1 className="hidden sm:block text-3xl font-semibold absolute right-1/2 translate-x-1/2">
          {digitalCurrentTime}
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
