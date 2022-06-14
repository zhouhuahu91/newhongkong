// React imports
import { useState } from "react";
import { motion } from "framer-motion";

const Search = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bg-white z-10 border h-11 w-full max-w-sm shadow rounded-full"
        ></motion.div>
      )}
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className={`${
          open ? "shadow" : "border"
        } relative transition-shadow rounded-full aspect-square w-11 h-11 flex items-center justify-center px-2 z-10`}
      >
        <span className="material-symbols-rounded">search</span>
      </button>
    </>
  );
};

export default Search;
