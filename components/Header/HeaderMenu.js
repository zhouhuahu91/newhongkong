// imports from framer motion for animations
import { motion, AnimatePresence } from "framer-motion";

// import for i18n
import useI18n from "@/hooks/useI18n";

// This component is used in the header Component and is passed in two props that are used to handle the menu state.
const HeaderMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    // AnimatePresence is used to render exit animation.
    <AnimatePresence>
      {menuOpen && (
        // this is the main container and also the backdrop for the menu.
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-40"
          onClick={() => {
            // if the user clicks outside the menu, the menu will close.
            setMenuOpen(false);
          }}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.3 } }}
            exit={{ x: "100%", transition: { duration: 0.3 } }}
            className="fixed w-64 h-full flex flex-col bg-red-100 top-0 right-0"
            onClick={(e) => {
              // if the user clicks inside the menu, the menu will not close.
              e.stopPropagation();
            }}
          >
            <div>{}</div>
            <div>menu</div>
            <div>catering</div>
            <div>contact</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderMenu;
