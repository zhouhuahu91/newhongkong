// React imports
import { useEffect, useState } from "react";
// Next.js imports
import Image from "next/image";
import Link from "next/link";
// Hook imports
import useWindowSize from "@/hooks/useWindowSize";
import useI18n from "@/hooks/useI18n";
// Icon imports
import ForkAndSpoonIcon from "@/icons/ForkAndSpoonIcon";
// Third party library imports
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  // This state is used to change between titles on home page, true for chinese and false for english.
  const [chinese, setChinese] = useState(false);
  // We need the width to determine the size of the svg.
  // These are the sizes for default to > sm to > md...
  // 192, 288 | 256 384 | 320 480.
  const { width } = useWindowSize();
  // This hook provides translations for the different languages.
  const t = useI18n();

  // In this useEffect we set up an interval to switch between the Chinese...
  // and English for the title New Hong Kong.
  useEffect(() => {
    const interval = setInterval(() => {
      setChinese((prev) => !prev);
      // Every 8 seconds we switch from new hong kong => 新香港酒楼
    }, 8000);
    return () => clearInterval(interval); // We clear the interval.
  }, []);

  return (
    <div className="bg-main flex items-center justify-center">
      {/* We make sure that animations finsihes before we start the next one. */}
      <AnimatePresence exitBeforeEnter>
        {chinese && (
          <motion.div
            key="chinese"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 2, type: "tween" },
            }}
            exit={{ opacity: 0, transition: { duration: 2, type: "tween" } }}
            className="absolute top-40 sm:top-28 md:top-36"
          >
            {width && (
              // This time we use an svg this way we do not have to import a font just for the index title.
              <Image
                src="/title_chinese.svg"
                width={width > 768 ? 320 : width > 640 ? 256 : 192}
                height={width > 768 ? 480 : width > 640 ? 384 : 288}
                alt="new hong kong in chinese"
                priority={true}
              />
            )}
          </motion.div>
        )}
        {!chinese && (
          // We do not need a svg for this because we already use this font for the whole website.
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 2, type: "tween" },
            }}
            exit={{ opacity: 0, transition: { duration: 2, type: "tween" } }}
            key="english"
            className="text-white font-bold text-7xl md:text-9xl
            cursor-pointer absolute top-44"
          >
            NEW
            <br /> HONG
            <br /> KONG
          </motion.div>
        )}
      </AnimatePresence>
      {/* This button is pushes to the menu where users can order. */}
      <Link href="/menu">
        <a
          className={`button border-md border-opacity-10 border-white px-6 py-1.5 absolute top-96 mt-40 md:mt-72 right-1/2 translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm`}
        >
          <ForkAndSpoonIcon color="#fff" />
          <span className="text-white uppercas font-medium uppercase text-sm ml-3">
            {t.order}
          </span>
        </a>
      </Link>
    </div>
  );
};

export default Home;
