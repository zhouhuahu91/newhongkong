// Third party libraries imports
import { motion, AnimatePresence } from "framer-motion";

const backdropVariant = {
  hidden: { opacity: 0, transition: { type: "tween" } },
  visible: { opacity: 1 },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.95, transition: { type: "tween" } },
  visible: { opacity: 1, scale: 1, transition: { type: "tween" } },
};

const Modal = ({ open, children, setOpen, className }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariant}
          animate="visible"
          initial="hidden"
          exit="hidden"
          className="fixed inset-0 w-full bg-opacity-50 bg-black h-full flex justify-center items-center z-50"
          onClick={(e) => {
            setOpen(false);
            e.stopPropagation();
          }}
        >
          <motion.div
            className={className}
            onClick={(e) => e.stopPropagation()}
            variants={modalVariant}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;