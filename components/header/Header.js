// Next.js imports
import Link from "next/link";
// Component imports
import BurgerMenu from "@/components/header/BurgerMenu";
import I18nMenu from "@/components/header/I18nMenu";
import AuthMenu from "@/components/header/AuthMenu";
// Hook imports
import useI18n from "@/hooks/useI18n";
import usePath from "@/hooks/usePath";
import useWindowSize from "@/hooks/useWindowSize";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  // This hook provides translations for the different languages.
  const t = useI18n();
  // We need the pathname because of different styling for home page.
  const { atHome, atCheckout, atMenu } = usePath();
  // Returns the current user that is logged in.
  const { user } = useAuth();
  const { width } = useWindowSize();

  return (
    <>
      {/* ********* HEADER ********* */}
      <header
        className={`w-full flex justify-center z-40 ${
          atHome ? "bg-main" : "bg-white"
        } ${
          // If we are not at menu and not at home we need shadow and border.
          // But if are on small screens on checkout page we don't need shadow and border.
          !atMenu &&
          !atHome &&
          `${atCheckout ? "md:shadow-sm md:border-b" : "shadow-sm border-b"}`
        }`}
      >
        {/* ******** MAIN CONTAINER ******** */}
        <div className="relative max-w-screen-xl w-full flex items-center justify-between h-16 px-4">
          <BurgerMenu />
          {/* This is the main logo nHK */}
          <Link href="/">
            <a
              className={`absolute md:relative left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 text-2xl font-bold red-focus-ring rounded-md px-1 ${
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
              <a
                className={`text-sm mx-8 rounded-md px-1 font-medium ${
                  atHome ? "red-focus-ring" : "red-focus-text"
                }`}
              >
                {t.menu}
              </a>
            </Link>
            <Link href="/catering">
              <a
                className={`text-sm mx-8 rounded-md px-1 font-medium ${
                  atHome ? "red-focus-ring" : "red-focus-text"
                }`}
              >
                {t.catering}
              </a>
            </Link>
            <Link href="/contact">
              <a
                className={`text-sm mx-8 rounded-md px-1 font-medium ${
                  atHome ? "red-focus-ring" : "red-focus-text"
                }`}
              >
                {t.contact}
              </a>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Dashboard menu for admins. */}
            {user?.admin && (
              <Link href="/dashboard">
                <a
                  className={`material-symbols-rounded red-focus-ring ${
                    atHome && "text-white "
                  }`}
                >
                  dashboard
                </a>
              </Link>
            )}
            {/* Graph of all orders per month. */}
            {(user?.admin || user?.accountant) &&
              !(user?.admin && width < 768) && (
                <Link href="/monthly_overview">
                  <a
                    className={`material-symbols-rounded red-focus-ring ${
                      user?.admin && "hidden md:block"
                    } ${atHome && "text-white "}`}
                  >
                    bar_chart
                  </a>
                </Link>
              )}
            {/* Link to delivery orders*/}
            {(user?.admin || user?.employee) && !(user?.admin && width < 768) && (
              <Link href="/delivery">
                <a
                  className={`material-symbols-rounded rounded-full red-focus-ring ${
                    atHome && "text-white "
                  }`}
                >
                  pedal_bike
                </a>
              </Link>
            )}
            {/* Options for language, available on all screen sizes. */}
            <I18nMenu />
            {/* Auth menu is only availeble on screens bigger than md. */}
            {/* Auth menu only smaller screens is in the BurgerMenu. */}
            <AuthMenu />
          </div>
        </div>
        {/* ********* MAIN CONTAINER  ********* */}
      </header>
      {/*  ********* HEADER ********* */}
    </>
  );
};

export default Header;
