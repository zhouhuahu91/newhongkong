// React imports
import { useState } from "react";
// Next.js imports
import Link from "next/link";
// Components imports
import BurgerMenu from "./BurgerMenu";
import I18nMenu from "./I18nMenu";
import useI18n from "@/hooks/useI18n";
import usePath from "@/hooks/usePath";

const Header = () => {
  // t stands for translation.
  const t = useI18n();
  // We need the pathname because of different styling for home page.
  const { home } = usePath();
  return (
    <>
      {/* ********* HEADER ********* */}
      <div
        className={`w-full flex justify-center ${
          home ? "bg-main" : "bg-white shadow"
        }`}
      >
        {/* ******** MAIN CONTAINER ******** */}
        <div className="max-w-screen-xl w-full flex items-center justify-between h-16 px-4 ">
          {/* ******** BURGER BUTTON ******** */}
          <BurgerMenu />
          {/* ******** BURGER BUTTON ******** */}
          {/* ******** LOGO & HOME LINK ******** */}
          <Link href="/">
            <a
              className={`text-2xl font-bold px-2 ${
                home ? "text-white" : "text-main"
              }`}
            >
              nHK
            </a>
          </Link>
          <div className={`hidden md:block ${home && "text-white"}`}>
            <Link href="/menu">
              <a className="text-sm mx-8">{t.menu}</a>
            </Link>
            <Link href="/catering">
              <a className="text-sm mx-8">{t.catering}</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm mx-8">{t.contact}</a>
            </Link>
          </div>
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
