// React imports
import { useRef, useState } from "react";
// NextJs imports
import Link from "next/link";
// Third party library imports
import { motion, AnimatePresence } from "framer-motion";
// Hook imports
import useI18n from "@/hooks/useI18n";
import usePath from "@/hooks/usePath";
import { useAuth } from "@/hooks/useAuth";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const AuthMenu = () => {
  // State for opening and closing the auth menu
  const [authMenu, setAuthMenu] = useState(false);
  // This is a reference to the div surrounding this component.
  // This is needed to close the menu when clicking outside of it.
  const ref = useRef();
  // t is used to translate the text.
  const t = useI18n();
  // Returns true if we are on the atHome page.
  const { atHome } = usePath();
  // Returns auth object with all auth functions.
  const auth = useAuth();
  // This hook closes the menu when clicking outside of it.
  useOnClickOutside(ref, () => setAuthMenu(false));

  return (
    <div ref={ref} className="relative hidden md:block">
      {/* ******** AUTH BUTTON ******** */}
      {auth.user ? (
        <button
          className="flex items-center red-focus-ring"
          type="button"
          onClick={() => setAuthMenu((prev) => !prev)}
        >
          <span
            className={`${atHome && "text-white"} material-symbols-rounded`}
          >
            account_circle
          </span>
          {/* <span className={`${atHome && "text-white"} material-symbols-rounded`}>
            expand_more
          </span> */}
        </button>
      ) : (
        <Link href="/sign_in">
          <a
            className={`text-sm red-focus-ring rounded-md px-0.5 ${
              atHome && "text-white"
            }`}
          >
            {t.sign_in}
          </a>
        </Link>
      )}
      {/* ******** AUTH BUTTON ******** */}
      {/* ******** AUTH MENU ******** */}
      <AnimatePresence>
        {authMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="absolute top-9 rounded-md border text-sm right-0 shadow bg-white py-2 z-20"
          >
            <div className="px-4 py-1 text-left w-full">
              {t.signed_in_as}{" "}
              <b>{auth.user.name ? auth.user.name : auth.user.email}</b>
            </div>
            <button
              type="button"
              onClick={() => {
                auth.signOutUser();
                setAuthMenu(false);
              }}
              className="px-4 py-1 hover:bg-gray-100 flex items-center w-full"
            >
              {t.sign_out}
              <span className="material-symbols-rounded ml-9">logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ******** AUTH MENU ******** */}
    </div>
  );
};

export default AuthMenu;
