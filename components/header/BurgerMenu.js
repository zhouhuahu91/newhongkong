import { useState } from "react";
// imports from nextjs
import Link from "next/link";
// imports from framer motion for animations
import { motion, AnimatePresence } from "framer-motion";
// import for from hooks
import usePath from "@/hooks/usePath";
import useI18n from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";

// This component is used in the header Component and is passed in two props that are used to handle the menu state.
const BurgerMenu = () => {
  // State for handling the menu
  // The menu is only visible on mobile (width < 768px)
  const [burgerMenu, setBurgerMenu] = useState(false);
  // This hook just returns true if we are on the home page
  const { atHome } = usePath();
  // This hook provides translations for the different languages.
  const t = useI18n();
  // To display user and let user log out.
  const auth = useAuth();

  return (
    // AnimatePresence is used to render exit animation.
    <>
      {/* This is the utton that shows when screen is smaller than md. */}
      <button
        type="button"
        onClick={() => setBurgerMenu((prev) => !prev)}
        className="flex items-center md:hidden red-focus-ring rounded-md"
      >
        <span className={`material-symbols-rounded ${atHome && "text-white"}`}>
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
              {/* We use Link so that NextJs can prefetch the pages. */}
              <div className="flex items-center justify-center px-4 z-10 h-16">
                <Link href="/">
                  <a
                    onClick={() => {
                      setBurgerMenu(false);
                    }}
                    className="text-2xl font-bold px-2 text-main red-focus-ring rounded-md"
                  >
                    nHK
                  </a>
                </Link>
              </div>
              <nav className="h-full w-full text-sm">
                <Link href="/">
                  <a
                    onClick={() => {
                      setBurgerMenu(false);
                    }}
                    className="py-2 pl-6 hover:bg-gray-100 block red-focus-text"
                  >
                    {t.home}
                  </a>
                </Link>
                <Link href="/menu">
                  <a
                    onClick={() => {
                      setBurgerMenu(false);
                    }}
                    className="py-2 pl-6 hover:bg-gray-100 block red-focus-text"
                  >
                    {t.menu}
                  </a>
                </Link>
                <Link href="/catering">
                  <a
                    onClick={() => {
                      setBurgerMenu(false);
                    }}
                    className="py-2 pl-6 hover:bg-gray-100 block red-focus-text"
                  >
                    {t.catering}
                  </a>
                </Link>
                <Link href="/contact">
                  <a
                    onClick={() => {
                      setBurgerMenu(false);
                    }}
                    className="py-2 pl-6 hover:bg-gray-100 block red-focus-text"
                  >
                    {t.contact}
                  </a>
                </Link>
                {(auth.user?.accountat || auth.user?.admin) && (
                  <Link href="/monthly_overview">
                    <a
                      onClick={() => {
                        setBurgerMenu(false);
                      }}
                      className="py-2 pl-6 hover:bg-gray-100 block red-focus-text"
                    >
                      {t.monthly_overview}
                    </a>
                  </Link>
                )}
                <div className="border-t mt-4 pt-4">
                  {auth.user ? (
                    <>
                      <div className="py-2 pl-6 text-left w-full">
                        {t.signed_in_as} <b>{auth.user.email}</b>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          auth.signOutUser();
                          setBurgerMenu(false);
                        }}
                        className="py-2 pl-6 hover:bg-gray-100 flex items-center w-full red-focus-text"
                      >
                        {t.sign_out}
                        <span className="material-symbols-rounded ml-9 text-inherit">
                          logout
                        </span>
                      </button>
                    </>
                  ) : (
                    <Link href="/sign_in">
                      <a
                        onClick={() => {
                          setBurgerMenu(false);
                        }}
                        className="py-2 pl-6 hover:bg-gray-100 flex items-center red-focus-text"
                      >
                        {t.sign_in}

                        <span className="material-symbols-rounded ml-9 text-inherit">
                          login
                        </span>
                      </a>
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;
