// React imports
import { useRef, useEffect, useState } from "react";
// Next.js imports
import { useRouter } from "next/router";
// Third party library imports
import { motion, AnimatePresence } from "framer-motion";
// Hook imports
import usePath from "@/hooks/usePath";
import useOnClickOutside from "@/hooks/useOnClickOutside";
// Icon imports
import LanguageIcon from "@/icons/LanguageIcon";

const I18nMenu = () => {
  // State for opening and closing the i18n menu
  const [i18nMenu, setI18nMenu] = useState(false);
  // Router is needed to push the correct locale.
  const router = useRouter();
  // This is a reference to the div surrounding this component.
  // This is needed to close the menu when clicking outside of it.
  const ref = useRef();
  // Returns true when we are on the home page.
  const { atHome } = usePath();
  // All languages on the website. Add here if we want to add a new language.
  // Do not forget to update next.config.js.
  const languages = [
    { name: "Nederlands", value: "nl" },
    { name: "English", value: "en" },
    { name: "Deutsch", value: "de" },
  ];
  // When user clicks outside of the menu, the menu will close.
  useOnClickOutside(ref, () => setI18nMenu(false));

  // When the users clicks on the button we get the value.
  const handleButtonClick = (e) => {
    const locale = e.target.value;
    // We push the value as the new locale.
    router.push(router.pathname, router.asPath, { locale });
    setI18nMenu(false);

    // Save locale to the locale storage.
    localStorage.setItem("locale", JSON.stringify(locale));
  };

  // If there is a locale saved to the locale storage and it is != to the current locale we update the language.
  useEffect(() => {
    const locale = JSON.parse(localStorage.getItem("locale"));
    if (locale && router.locale !== locale) {
      router.push(router.pathname, router.asPath, { locale });
    }
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* ******** LOCALE BUTTON ******** */}
      <button
        className="flex items-center red-focus-ring rounded"
        type="button"
        onClick={() => setI18nMenu((prev) => !prev)}
      >
        <LanguageIcon className={`${atHome && "fill-white"}`} />
      </button>
      {/* ******** LOCALE BUTTON ******** */}
      {/* ******** LOCALE MENU ******** */}
      <AnimatePresence>
        {i18nMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            exit={{ opacity: 0, scale: 0.85 }}
            style={{ zIndex: 999 }}
            className="absolute top-8 rounded-md border text-sm right-0 shadow bg-white py-2 w-40 z-10"
          >
            {languages.map((language) => {
              return (
                <button
                  type="button"
                  key={language.value}
                  className="py-1 px-4 w-full text-left hover:bg-gray-100 red-focus-text font-normal"
                  onClick={(e) => handleButtonClick(e)}
                  value={language.value}
                >
                  {language.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      {/* ******** LOCALE MENU ******** */}
    </div>
  );
};

export default I18nMenu;
