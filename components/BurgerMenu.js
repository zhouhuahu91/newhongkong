import { useState } from "react";
// imports from nextjs
import Link from "next/link";
// imports from framer motion for animations
import { motion, AnimatePresence } from "framer-motion";

// import for from hooks
import usePath from "@/hooks/usePath";
import useI18n from "@/hooks/useI18n";

// This component is used in the header Component and is passed in two props that are used to handle the menu state.
const BurgerMenu = () => {
  // State for handling the menu
  // The menu is only visible on mobile (width < 768px)
  const [burgerMenu, setBurgerMenu] = useState(false);
  const { home } = usePath();
  const t = useI18n();
  return (
    // AnimatePresence is used to render exit animation.
    <>
      <button
        type="button"
        onClick={() => setBurgerMenu((prev) => !prev)}
        className="flex items-center md:hidden"
      >
        <span className={`material-symbols-rounded ${home && "text-white"}`}>
          menu
        </span>
      </button>
      <AnimatePresence>
        {burgerMenu && (
          // this is the main container and also the backdrop for the menu.
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 z-50"
            onClick={() => {
              // if the user clicks outside the menu, the menu will close.
              setBurgerMenu(false);
            }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0, transition: { duration: 0.3 } }}
              exit={{ x: "-100%", transition: { duration: 0.3 } }}
              className="fixed w-64 h-full flex flex-col bg-white top-0 left-0"
              onClick={(e) => {
                // if the user clicks inside the menu, the menu will not close.
                e.stopPropagation();
              }}
            >
              <div className="flex items-end justify-center shadow px-4 py-2 z-10">
                <Link href="/">
                  <a className="text-2xl font-bold px-2 text-main">nHK</a>
                </Link>
              </div>
              <div className="h-full w-full pt-3 bg-gray-50">
                <Link href="/">
                  <a className="py-3 pl-6 hover:bg-gray-100 flex w-full">
                    {t.home}
                  </a>
                </Link>
                <Link href="/">
                  <a className="py-3 pl-6 hover:bg-gray-100 flex w-full">
                    {t.menu}
                  </a>
                </Link>
                <Link href="/">
                  <a className="py-3 pl-6 hover:bg-gray-100 flex w-full">
                    {t.catering}
                  </a>
                </Link>
                <Link href="/">
                  <a className="py-3 pl-6 hover:bg-gray-100 flex w-full">
                    {t.contact}
                  </a>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;
