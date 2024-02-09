import Link from "next/link";
import DashboardIcon from "@/icons/DashboardIcon";
import DatePicker from "@/components/DatePicker";
import BurgerMenu from "@/components/header/BurgerMenu";

const Header = ({ date, setDate }) => {
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
          <DatePicker date={date} setDate={setDate} />
          <Link href="/dashboard">
            <a className="red-focus-ring rounded">
              <DashboardIcon />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
