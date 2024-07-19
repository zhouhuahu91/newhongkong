import { useEffect } from "react";
// Hook imports
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
// Third party libraries imports
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";

const Modal = ({ toggle, children, close, className }) => {
  useLockBodyScroll(toggle);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && toggle) {
        close();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <AnimatePresence>
      {toggle && (
        <FocusTrap>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full bg-slate-900/20 backdrop-blur h-full flex justify-center items-center"
            style={{ zIndex: "100" }}
            onClick={(e) => {
              close();
              e.stopPropagation();
            }}
          >
            <motion.div
              className={className}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.25 } }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
};

export default Modal;
