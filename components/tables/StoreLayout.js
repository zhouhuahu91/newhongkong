import Link from "next/link";
// Icon imports
import DashboardIcon from "@/icons/DashboardIcon";
import ToiletIcon from "@/icons/ToiletIcon";
// Component imports
import IconBtn from "@/components/IconBtn";
// Function imports
import getFullDate from "@/functions/getFullDate";

const StoreLayout = ({ setOpen }) => {
  return (
    <>
      {/* ********** WINDOW ********** */}
      <div className="absolute top-0 w-[27rem] h-2 bg-gray-200 border right-28 rounded-full">
        <div className="w-2 h-full bg-gray-100 absolute left-1/4 -translate-x-1/4" />
        <div className="w-2 h-full bg-gray-100 absolute left-1/2 -translate-x-1/2" />
        <div className="w-2 h-full bg-gray-100 absolute right-1/4 translate-x-1/4" />
      </div>
      {/* ********** WINDOW ********** */}

      <div className="absolute w-44 h-72 text-xl font-bold bottom-24 left-44 border rounded-lg bg-gray-100 flex justify-center items-center select-none">
        <ToiletIcon size="36" className="" />
      </div>
      <div className="select-none font-bold absolute bottom-0 rounded-t-full bg-gray-100 w-10/12 h-16 border-t border-x left-1/2 -translate-x-1/2 flex items-center justify-between px-20">
        <Link href="/menu">
          <a
            className={`text-2xl font-bold red-focus-ring rounded-md px-1 text-main`}
          >
            nHK
          </a>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-medium">{getFullDate()}</span>
          <IconBtn onClick={() => setOpen(false)}>
            <DashboardIcon />
          </IconBtn>
        </div>
      </div>
    </>
  );
};

export default StoreLayout;
