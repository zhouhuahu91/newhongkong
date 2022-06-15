// React imports
import { useState, useRef, useEffect } from "react";
// Third party imports
import { motion, AnimatePresence } from "framer-motion";
// Hook imports
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useMenu } from "@/hooks/useMenu";
// Component imports
import IconButton from "@/components/IconButton";

const Search = () => {
  // This state holds the input for search,
  const [searchInput, setSearchInput] = useState("");
  // Holds the state of the search input.
  const [open, setOpen] = useState(false);
  // This returns functions to filter the data.
  const { filterData, resetFilter } = useMenu();
  // We need this reference to close the search when the user clicks outside of it.
  const el = useRef();
  // We need the input ref to focus it when we clear the input.
  const inputRef = useRef();
  useOnClickOutside(el, () => {
    setOpen(false), setSearchInput("");
  });

  useEffect(() => {
    // If there is a search input we filter the data. If there is not we reset the filter.
    if (searchInput.length > 0) {
      filterData(searchInput);
    } else {
      resetFilter();
    }
  }, [searchInput]);

  const handleKeyDown = (e) => {
    // If user presses enter we open the search.
    if (e.key === "Enter" && !open) {
      setOpen(true);
    }
    // If user presses escape we close the search.
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  };
  // listen for enter key with useEffect
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpen, open]);

  return (
    <div ref={el}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: 384,
              opacity: 1,
            }}
            exit={{ width: 44, transition: { duration: 0.1 } }}
            className="absolute bg-white z-10 border h-11 max-w-sm shadow rounded-full flex items-center justify-center"
          >
            <input
              ref={inputRef}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
              className="w-full ml-14 h-full appearance-none focus:outline-none text-sm"
            />
            <IconButton
              // This clears the searc input.
              onClick={() => {
                setSearchInput("");
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              variant="close"
              size="small"
              className="mx-4"
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
