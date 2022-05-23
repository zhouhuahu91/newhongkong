// React imports
import { useState } from "react";
// Next.js imports
import Link from "next/link";
// Components imports
import HeaderMenu from "./HeaderMenu";

const Header = () => {
  // State for handling the menu
  // The menu is only visible on mobile (width < 768px)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // ********* HEADER *********
    <div className="bg-white w-full flex justify-center shadow">
      {/* ******** MAIN CONTAINER ******** */}
      <div className="max-w-screen-xl w-full flex items-center justify-between h-12 px-4 ">
        {/* ******** LOGO & HOME LINK ******** */}
        <Link href="/">
          <a className="text-2xl font-bold px-2 text-main">nHK</a>
        </Link>
        {/* ******** LOGO & HOME LINK ******** */}
        {/* ******** BURGER BUTTON ******** */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex items-center"
        >
          <span className="material-symbols-rounded">menu</span>
        </button>
        {/* ******** BURGER BUTTON ******** */}
        {/* ******** BURGER MENU ******** */}
        <HeaderMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {/* ******** BURGER MENU ******** */}
      </div>
      {/* ********* MAIN CONTAINER  ********* */}
    </div>
    // ********* HEADER  *********
  );
};

export default Header;
