// imports from next.js
import Image from "next/image";
// import from hooks to deermine window size
import useWindowSize from "@/hooks/useWindowSize";
// import for animation
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const { width } = useWindowSize();
  const size = width * 0.8 > 500 ? 500 : width * 0.8;
  return (
    <div className="bg-main flex items-center justify-center mt-20">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0, 1], transition: { duration: 1 } }}
        >
          {width && (
            <Image src="/title_chinese.svg" width={size} height={size} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
