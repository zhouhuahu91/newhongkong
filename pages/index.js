// React imports
import { useEffect, useState } from "react";
// Next.js imports
import Image from "next/image";
import Link from "next/link";
// Hook imports
import useWindowSize from "@/hooks/useWindowSize";
import useI18n from "@/hooks/useI18n";
import { useStoreInfo } from "@/hooks/useStoreInfo";
// Icon imports
import ForkAndSpoonIcon from "@/icons/ForkAndSpoonIcon";

const Home = () => {
  // This state is used to change between titles on home page, true for chinese and false for english.
  const [chinese, setChinese] = useState(false);
  // We need the width to determine the size of the svg.
  // These are the sizes for default to > sm to > md...
  // 192, 288 | 256 384 | 320 480.
  const { width } = useWindowSize();
  // This hook provides translations for the different languages.
  const t = useI18n();
  const { closed } = useStoreInfo();
  console.log(closed);

  // In this useEffect we set up an interval to switch between the Chinese...
  // and English for the title New Hong Kong.
  useEffect(() => {
    const interval = setInterval(() => {
      setChinese((prev) => !prev);
      // Every 5 seconds we switch from new hong kong => 新香港酒楼
    }, 5000);
    return () => clearInterval(interval); // We clear the interval.
  }, []);

  return (
    <div className="bg-main flex items-center justify-center">
      {/* We make sure that animations finsihes before we start the next one. */}
      <div
        className={`absolute top-40 sm:top-28 md:top-36 transition-opacity duration-[3000ms] ${
          chinese ? "opacity-100 delay-[1600ms]" : "opacity-0"
        }`}
      >
        {width && (
          // This time we use an svg this way we do not have to import a font just for the index title.
          <Image
            src="/title_chinese.svg"
            width={width > 768 ? 320 : width > 640 ? 256 : 192}
            height={width > 768 ? 480 : width > 640 ? 384 : 288}
            alt="new hong kong in chinese"
          />
        )}
      </div>
      <div
        className={`text-white font-bold text-7xl md:text-9xl absolute top-44 transition-opacity duration-[3000ms] ${
          chinese ? "opacity-0" : "opacity-100 delay-[1600ms]"
        }`}
      >
        NEW
        <br /> HONG
        <br /> KONG
      </div>
      {/* This button is pushes to the menu where users can order. */}
      <Link href="/menu">
        <a
          className={`button border-md border-opacity-10 border-white px-6 py-1.5 absolute top-96 mt-40 md:mt-72 right-1/2 translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm`}
        >
          <ForkAndSpoonIcon className="fill-white" />
          <span className="text-white font-medium uppercase text-sm ml-3">
            {closed ? t.closed : t.order}
          </span>
        </a>
      </Link>
    </div>
  );
};

export default Home;
