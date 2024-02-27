import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@/icons/CloseIcon";
import IconBtn from "@/components/IconBtn";

const Snackbar = ({ snackbar, setSnackbar, duration }) => {
  useEffect(() => {
    const x = duration ? duration : 3000;
    const timer = setTimeout(() => {
      setSnackbar(false);
    }, x);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <AnimatePresence>
      {snackbar && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1,
          }}
          exit={{ y: 100 }}
          className="flex items-center fixed bottom-4 left-4 border p-4 bg-red-50 rounded-lg min-w-72 min-h-14"
        >
          <span className="text-sm mr-8">{snackbar}</span>
          <IconBtn
            className="absolute top-1/2 -translate-y-1/2 right-4"
            onClick={() => setSnackbar(false)}
          >
            <CloseIcon size="20" />
          </IconBtn>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
