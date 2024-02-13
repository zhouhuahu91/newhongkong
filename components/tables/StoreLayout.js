import Link from "next/link";
// Icon imports
import DashboardIcon from "@/icons/DashboardIcon";
import ForkAndSpoonIcon from "@/icons/ForkAndSpoonIcon";
import ToiletIcon from "@/icons/ToiletIcon";
// Component imports
import DatePicker from "@/components/DatePicker";

const StoreLayout = ({ date, setDate, createNewTable }) => {
  return (
    <>
      <div className="absolute top-0 w-2/3 h-2 bg-gray-200 border left-1/2 -translate-x-1/2 rounded-full">
        <div className="w-2 h-full bg-gray-600 absolute left-1/3 -translate-x-1/3" />
        <div className="w-2 h-full bg-gray-600 absolute right-1/3 translate-x-1/3" />
      </div>
      <div className="absolute bottom-40 w-full h-72">
        <div className="absolute w-44 text-xl font-bold h-full left-20 border rounded-lg bg-white flex justify-center items-center select-none">
          <ToiletIcon size="36" className="" />
        </div>
      </div>
      <div className="select-none text-xl font-bold absolute bottom-0 rounded-t-full w-2/3 h-16 border-t border-x bg-white left-1/2 -translate-x-1/2 flex items-center justify-between px-20">
        <Link href="/menu">
          <a
            className={`text-2xl font-bold red-focus-ring rounded-md px-1 text-main`}
          >
            nHK
          </a>
        </Link>
        <div className="flex items-center text-xl">
          <DatePicker top date={date} setDate={setDate} />
          <Link href="/dashboard">
            <a className="red-focus-ring rounded">
              <DashboardIcon />
            </a>
          </Link>
          <button
            onClick={() => createNewTable()}
            type="button"
            className="button bg-main ml-4 text-white w-40 gap-2"
          >
            Nieuwe Tafel <ForkAndSpoonIcon className="fill-white mb-0.5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default StoreLayout;
