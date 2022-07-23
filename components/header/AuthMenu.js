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
// Component imports
import LogoutIcon from "@/icons/LogoutIcon";
import AccountIcon from "@/icons/AccountIcon";

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
          className="flex items-center red-focus-ring rounded"
          type="button"
          onClick={() => setAuthMenu((prev) => !prev)}
        >
          <AccountIcon color={atHome && "#fff"} />
        </button>
      ) : (
        <Link href="/sign_in">
          <a
            className={`text-sm font-medium rounded-md px-1 ${
              atHome ? "red-focus-ring" : "red-focus-text"
            } ${atHome && "text-white"}`}
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
            className="absolute top-9 rounded-md border text-sm right-0 shadow bg-white py-2 z-10"
          >
            <div className="px-4 py-1 text-left w-full">
              {t.signed_in_as}{" "}
              <span className="font-medium">
                {auth.user.name ? auth.user.name : auth.user.email}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                auth.signOutUser();
                setAuthMenu(false);
              }}
              className="px-4 py-1 hover:bg-gray-100 flex items-center red-focus-text whitespace-nowrap"
            >
              {t.sign_out}
              <span className="ml-8">
                <LogoutIcon />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ******** AUTH MENU ******** */}
    </div>
  );
};

export default AuthMenu;
