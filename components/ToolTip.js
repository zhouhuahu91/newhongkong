// React imports
import { useState } from "react";
// Third party imports
import { useFloating } from "@floating-ui/react-dom";
import { motion, AnimatePresence } from "framer-motion";
// Component imports
import HelpIcon from "@/icons/HelpIcon";

const ToolTip = ({ tip, disabled, size }) => {
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
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <HelpIcon size="18" className={`${disabled && "fill-gray-400"}`} />
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
            className={`border p-2 rounded-md bg-amber-50 text-sm w-52 ${
              size === "big" && " text-xl"
            }`}
          >
            {tip}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ToolTip;
