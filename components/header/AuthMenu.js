// React imports
import { useRef, useEffect, useState } from "react";
// Next.js imports
import { useRouter } from "next/router";
import Link from "next/link";
// Third party library imports
import { motion, AnimatePresence } from "framer-motion";
// Hook imports
import useI18n from "@/hooks/useI18n";
import usePath from "@/hooks/usePath";
import { useAuth } from "@/hooks/useAuth";

const AuthMenu = () => {
  // State for opening and closing the auth menu
  const [authMenu, setAuthMenu] = useState(false);
  // Router is needed to push the correct locale.
  const router = useRouter();
  const t = useI18n();
  const { home } = usePath();
  const auth = useAuth();

  // This is a reference to the div surrounding this component.
  // This is needed to close the menu when clicking outside of it.
  const node = useRef();
  // This useEffect adds an event listener to the document and triggers the click functions.
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick); // This removes the eventlistener when the component gets dismounted.
    };
  }, [node]);

  // When the user clicks we check if the click in inside or outside the div.
  const handleClick = (e) => {
    // If it's inside the div nothing happens.
    if (node.current?.contains(e.target)) {
      return;
    }
    // If it's outside the div we close the locale menu.
    setAuthMenu(false);
  };

  return (
    <div ref={node} className="relative hidden md:block">
      {/* ******** AUTH BUTTON ******** */}
      {auth.user ? (
        <button
          className="flex items-center"
          type="button"
          onClick={() => setAuthMenu((prev) => !prev)}
        >
          <span className={`${home && "text-white"} material-symbols-rounded`}>
            account_circle
          </span>
          {/* <span className={`${home && "text-white"} material-symbols-rounded`}>
            expand_more
          </span> */}
        </button>
      ) : (
        <Link href="/sign_in">
          <a className={`text-sm ${home && "text-white"}`}>{t.sign_in}</a>
        </Link>
      )}
      {/* ******** AUTH BUTTON ******** */}
      {/* ******** AUTH MENU ******** */}
      <AnimatePresence>
        {authMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="absolute top-9 rounded-md border text-sm right-0 shadow bg-white py-2 z-10"
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
