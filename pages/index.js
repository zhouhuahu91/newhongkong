// imports from react
import { useEffect, useState } from "react";
// imports from next.js
import Image from "next/image";
import { useRouter } from "next/router";
// import from hooks
import useWindowSize from "@/hooks/useWindowSize";
import useI18n from "@/hooks/useI18n";
// import for animation
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [chinese, setChinese] = useState(false);
  const { width } = useWindowSize();
  const router = useRouter();
  const t = useI18n();
  // these are the sizes for smalles to sm to md
  // 192, 288, 256 384, 320 480
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
      <button
        type="button"
        onClick={() => router.push("/menu")}
        className={`${
          width < 768 ? "button-small" : "button w-36"
        } border absolute top-96 mt-32 md:mt-72 right-1/2 translate-x-1/2 flex items-center justify-center space-x-3`}
      >
        <span className="material-symbols-rounded text-white">
          restaurant_menu
        </span>
        <span className="text-white capitalize text-sm">{t.order}</span>
      </button>
    </div>
  );
};

export default Home;
