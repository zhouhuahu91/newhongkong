import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@/icons/CloseIcon";
import IconBtn from "@/components/IconBtn";

const Snackbar = ({ open, setOpen, duration, message }) => {
  useEffect(() => {
    const x = duration ? duration : 3000;
    const timer = setTimeout(() => {
      setOpen(false);
    }, x);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1,
          }}
          exit={{ y: 100 }}
          className="flex items-center fixed bottom-4 left-4 border p-4 bg-red-50 rounded-lg min-w-72 min-h-14"
        >
          <span className="text-sm">{message}</span>
          <IconBtn
            className="absolute top-1/2 -translate-y-1/2 right-4"
            onClick={() => setOpen(false)}
          >
            <CloseIcon size="20" />
          </IconBtn>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
