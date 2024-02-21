import Link from "next/link";
// Icon imports
import DashboardIcon from "@/icons/DashboardIcon";
import ToiletIcon from "@/icons/ToiletIcon";
// Component imports
import DatePicker from "@/components/DatePicker";

const StoreLayout = ({ date, setDate }) => {
  return (
    <>
      {/* ********** WINDOW ********** */}
      <div className="absolute top-0 w-[36rem] h-2 bg-gray-200 border right-28 rounded-full">
        <div className="w-2 h-full bg-gray-100 absolute left-1/3 -translate-x-1/3" />
        <div className="w-2 h-full bg-gray-100 absolute right-1/3 translate-x-1/3" />
      </div>
      {/* ********** WINDOW ********** */}

      <div className="absolute w-44 h-72 text-xl font-bold bottom-24 left-44 border rounded-lg bg-gray-100 flex justify-center items-center select-none">
        <ToiletIcon size="36" className="" />
      </div>
      <div className="select-none text-xl font-bold absolute bottom-0 rounded-t-full bg-gray-100 w-10/12 h-16 border-t border-x left-1/2 -translate-x-1/2 flex items-center justify-between px-20">
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
          {/* <button
            onClick={() => createNewTable()}
            type="button"
            className="button bg-main ml-4 text-white w-40 gap-2"
          >
            Nieuwe Tafel <ForkAndSpoonIcon className="fill-white mb-0.5" />
          </button> */}
        </div>
      </div>
    </>
  );
};

export default StoreLayout;
