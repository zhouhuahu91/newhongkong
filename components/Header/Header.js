// React imports
import { useState } from "react";
// Next.js imports
import Link from "next/link";
// Components imports
import BurgerMenu from "./BurgerMenu";
import I18nMenu from "./I18nMenu";

const Header = () => {
  // State for handling the menu
  // The menu is only visible on mobile (width < 768px)
  const [burgerMenu, setBurgerMenu] = useState(false);
  // State for the i18n options, it is avaible on all screensizes

  return (
    <>
      {/* BurgerMenu is fixed and it doesn't mather where they are placed. */}
      <BurgerMenu
        className="md:hidden"
        burgerMenu={burgerMenu}
        setBurgerMenu={setBurgerMenu}
      />
      {/* ********* HEADER ********* */}
      <div className="bg-white w-full flex justify-center shadow">
        {/* ******** MAIN CONTAINER ******** */}
        <div className="max-w-screen-xl w-full flex items-center justify-between h-16 px-4 ">
          {/* ******** BURGER BUTTON ******** */}
          <button
            type="button"
            onClick={() => setBurgerMenu((prev) => !prev)}
            className="flex items-center md:hidden"
          >
            <span className="material-symbols-rounded">menu</span>
          </button>
          {/* ******** BURGER BUTTON ******** */}
          {/* ******** LOGO & HOME LINK ******** */}
          <Link href="/">
            <a className="text-2xl font-bold px-2 text-main">nHK</a>
          </Link>
          {/* ******** LOGO & HOME LINK ******** */}
          {/* ******** I18N BUTTON ******** */}
          {/* We place a div around the button and the i18n menu so we can fix the menu relative to the div. */}
          <I18nMenu />
          {/* ******** I18N BUTTON ******** */}
        </div>
        {/* ********* MAIN CONTAINER  ********* */}
      </div>
      {/*  ********* HEADER ********* */}
    </>
  );
};

export default Header;
