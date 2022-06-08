// Next.js imports
import Link from "next/link";
// Component imports
import BurgerMenu from "@/components/header/BurgerMenu";
import I18nMenu from "@/components/header/I18nMenu";
import AuthMenu from "@/components/header/AuthMenu";
// Hook imports
import useI18n from "@/hooks/useI18n";
import usePath from "@/hooks/usePath";

const Header = () => {
  // This hook provides translations for the different languages.
  const t = useI18n();
  // We need the pathname because of different styling for home page.
  const { atHome, atCheckout } = usePath();

  return (
    <>
      {/* ********* HEADER ********* */}
      <div
        className={`w-full flex justify-center z-10 ${
          atHome
            ? "bg-main"
            : // on smaller screens we do not want shadow and border when at checkout because of the cart menu that hovers beneath the header.
              `bg-white md:border-b md:shadow-sm ${
                !atCheckout && "shadow-sm border-b"
              }`
        }`}
      >
        {/* ******** MAIN CONTAINER ******** */}
        <div className="max-w-screen-xl w-full flex items-center justify-between h-16 px-4 ">
          <BurgerMenu />
          {/* This is the main logo nHK */}
          <Link href="/">
            <a
              className={`text-2xl font-bold px-2 ${
                atHome ? "text-white" : "text-main"
              }`}
            >
              nHK
            </a>
          </Link>
          {/* Navigation for screens bigger than md */}
          <nav
            className={`hidden md:block ${
              atHome && "text-white"
            } absolute left-1/2 -translate-x-1/2`}
          >
            <Link href="/menu">
              <a className="text-sm mx-8">{t.menu}</a>
            </Link>
            <Link href="/catering">
              <a className="text-sm mx-8">{t.catering}</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm mx-8">{t.contact}</a>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Options for language, available on all screen sizes. */}
            <I18nMenu />
            {/* Auth menu is only availeble on screens bigger than md. */}
            {/* Auth menu only smaller screens is in the BurgerMenu. */}
            <AuthMenu />
          </div>
        </div>
        {/* ********* MAIN CONTAINER  ********* */}
      </div>
      {/*  ********* HEADER ********* */}
    </>
  );
};

export default Header;
