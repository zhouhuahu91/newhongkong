// Hook imports
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
// Third party libraries imports
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";

const backdropVariant = {
  hidden: { opacity: 0, transition: { type: "tween" } },
  visible: { opacity: 1 },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

const Modal = ({ toggle, children, close, className }) => {
  useLockBodyScroll(toggle);
  return (
    <AnimatePresence>
      {toggle && (
        <FocusTrap>
          <motion.div
            variants={backdropVariant}
            animate="visible"
            initial="hidden"
            exit="hidden"
            className="fixed inset-0 w-full bg-opacity-50 bg-black h-full flex justify-center items-center z-50"
            onClick={(e) => {
              close();
              e.stopPropagation();
            }}
          >
            <motion.div
              layout
              className={className}
              onClick={(e) => e.stopPropagation()}
              variants={modalVariant}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
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
