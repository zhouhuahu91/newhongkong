// React imports
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@/hooks/useOnClickOutside";
// Hook imports

const Search = () => {
  const [open, setOpen] = useState(false);
  const el = useRef();

  useOnClickOutside(el, () => setOpen(false));

  return (
    <div ref={el}>
      <AnimatePresence>
        {open && (
          <motion.div
            sizeTransition
            initial={{ width: 0 }}
            animate={{
              width: 384,
              transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 15,
              },
            }}
            exit={{ width: 44, transition: { duration: 0.2 } }}
            className="absolute bg-white z-10 border h-11 max-w-sm shadow rounded-full flex items-center justify-center"
          >
            <input
              autoFocus
              className="w-full mx-14 h-full appearance-none focus:outline-none text-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className={`${
          open ? "shadow" : "border"
        } relative transition-shadow rounded-full aspect-square w-11 h-11 flex items-center justify-center px-2 z-10`}
      >
        <span className="material-symbols-rounded">search</span>
      </button>
    </div>
  );
};

export default Search;
