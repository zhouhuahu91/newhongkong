// React imports
import { useState } from "react";
// Third party imports
import { useFloating } from "@floating-ui/react-dom";
import { motion, AnimatePresence } from "framer-motion";

const ToolTip = ({ tip, disabled }) => {
  const [open, setOpen] = useState(false);
  // We need this third party library to make the tooltip show outside of the scroll area.
  // Position relative doesn't work when the tooltip is outside of the scroll area.
  const { x, y, reference, floating, strategy } = useFloating({
    open,
    placement: "top",
  });

  return (
    <>
      <span
        ref={reference}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`material-symbols-rounded icon-small ${
          disabled && "text-gray-300"
        }`}
      >
        help
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            exit={{ opacity: 0, scale: 0.85 }}
            ref={floating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            className="border p-2 rounded-md bg-amber-50 text-sm w-52"
          >
            {tip}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToolTip;
