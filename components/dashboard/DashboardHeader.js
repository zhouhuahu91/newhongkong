// NextJs imports
import Link from "next/link";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Component imports
import DatePicker from "@/components/DatePicker";
import Switch from "@/components/Switch";
import StoreSettings from "@/components/dashboard/StoreSettings";
import BurgerMenu from "@/components/header/BurgerMenu";
import AddEmployeeRoll from "@/components/dashboard/AddEmployeeRoll";
import AddTimeSlotModal from "@/components/dashboard/AddTimeSlotModal";

const DashboardHeader = ({
  date,
  setDate,
  showCompleted,
  setShowCompleted,
}) => {
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
        <div className="flex items-center text-xl">
          <span className="mt-1 hidden sm:block font-medium -mr-0.5">
            {digitalCurrentTime}
          </span>
          <DatePicker date={date} setDate={setDate} />
          <Switch
            className="mr-3 ml-1"
            toggle={showCompleted}
            onClick={() => setShowCompleted((prev) => !prev)}
          />
          <AddEmployeeRoll />
          <AddTimeSlotModal />
          <StoreSettings />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
