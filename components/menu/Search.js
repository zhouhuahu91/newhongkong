// React imports
import { useState, useRef, useEffect } from "react";
// Third party imports
import { motion, AnimatePresence } from "framer-motion";
// Hook imports
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useMenu } from "@/hooks/useMenu";
// Component imports
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import SearchIcon from "@/icons/SearchIcon";

const Search = () => {
  // Holds the state of the search input.
  const [open, setOpen] = useState(false);
  // Holds state for focus on input to change styling for parent div.
  const [inputFocus, setInputFocus] = useState(false);
  // This returns functions to filter the data.
  const { searchInput, setSearchInput } = useMenu();
  // We need the input ref to focus it when we clear the input.

  const searchContainerRef = useRef();
  const searchInputRef = useRef();

  useOnClickOutside(searchContainerRef, () => {
    if (searchInput === "") {
      setOpen(false);
    }
  });

  // If search is closed we clear input and reset the filter.
  useEffect(() => {
    if (!open) {
      setSearchInput("");
    }
  }, [open]);

  const handleKeyDown = (e) => {
    // if user presses shift enter we open or close chat
    if (e.key === "Enter" && e.shiftKey) {
      setOpen((prev) => !prev);
    }
    // If user presses backspace and search is open
    if (e.key === "Backspace" && open) {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
    // If user presses escape we close the search
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
    <div ref={searchContainerRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            initial={{ width: 0, opacity: 0 }}
            // Animate will override max width so we check width of screen and if it is bigger than 384 + 16 padding...
            // ...search width is than screen width minues padding which is 16px
            animate={{
              width: "100%",
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            exit={{ width: 44, transition: { duration: 0.1 } }}
            className={`absolute bg-white z-10 border max-w-sm h-11 rounded-full flex items-center justify-center ${
              inputFocus && "border-red-200 ring ring-red-100"
            }`}
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              autoFocus
              className="w-full ml-14 h-full appearance-none focus:outline-none text-sm"
            />
            <IconBtn
              className="mx-4"
              // This clears the search input.
              onClick={() => {
                // If search input is already clear we close the search.
                if (!searchInput.length) {
                  return setOpen(false);
                }
                setSearchInput("");
                if (searchInputRef.current) {
                  searchInputRef.current.focus();
                }
              }}
            >
              <CloseIcon size="18" />
            </IconBtn>
          </motion.div>
        )}
      </AnimatePresence>
      <IconBtn
        onClick={() => setOpen((prev) => !prev)}
        roundedFull
        className={`${
          open ? "shadow" : "border bg-white hover:shadow"
        } relative red-focus-ring transition-shadow w-11 h-11 flex items-center justify-center px-2 z-10`}
      >
        <SearchIcon />
      </IconBtn>
    </div>
  );
};

export default Search;
