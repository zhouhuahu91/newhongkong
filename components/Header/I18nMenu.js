// imports from react
import { useRef, useEffect, useState } from "react";
// imports from next.js
import { useRouter } from "next/router";

// import for animation.
import { motion, AnimatePresence } from "framer-motion";
// import for i18n
import useI18n from "@/hooks/useI18n";

const I18nMenu = () => {
  const [i18nMenu, setI18nMenu] = useState(false);
  const router = useRouter();
  const t = useI18n();
  const languages = [
    { name: "Nederlands", value: "nl" },
    { name: "English", value: "en" },
    { name: "Deutsch", value: "de" },
  ];
  // This is a reference to the div surrounding this component.
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
    setI18nMenu(false);
  };

  // When the users clicks on the button we get the value.
  const handleButtonClick = (e) => {
    const locale = e.target.value;
    // We push the value as the new locale.
    router.push(router.pathname, router.asPath, { locale });
    setI18nMenu(false);

    // Save locale to the locale storage.
    localStorage.setItem("locale", JSON.stringify(locale));
  };

  return (
    <div ref={node} className="relative ">
      <button
        className="flex items-center border rounded-3xl py-1 px-2"
        type="button"
        onClick={() => setI18nMenu((prev) => !prev)}
      >
        <span className="material-symbols-rounded text-xl">language</span>
        <span className="material-symbols-rounded">expand_more</span>
      </button>
      <AnimatePresence>
        {i18nMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="absolute top-11 rounded border text-sm text-gray-500 right-0 shadow bg-white py-2 w-40"
          >
            {languages.map((language) => {
              return (
                <button
                  type="button"
                  key={language.value}
                  className="py-1 px-4 w-full text-left hover:bg-gray-100"
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
    </div>
  );
};

export default I18nMenu;
