// React imports
import { useState } from "react";
// Third party imports
import { motion, AnimatePresence } from "framer-motion";

// Tooltip that shows a question mark with a short explanation when hovered.
const Tooltip = ({ children, tip, disabled }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 bottom-7 text-xs text-white shadow-sm bg-main p-2 rounded -translate-x-1/2 w-56"
          >
            {tip}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="flex"
      >
        {children ? (
          children
        ) : (
          <span
            className={`material-symbols-rounded text-lg ${
              disabled ? "text-gray-300" : ""
            }`}
          >
            help
          </span>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
