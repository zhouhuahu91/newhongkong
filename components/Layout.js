// NextJs imports
import Head from "next/head";
// Components imports
import Header from "@/components/header/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
// Hook imports
import usePath from "@/hooks/usePath";

// This component is used to render the layout of the website.
// Here we can put components that are used on all pages e.a. the header, footer, etc.
// We also can put the NextJs Head that are used on all pages here e.a. the title, description, etc.
const Layout = ({ children }) => {
  // Styling and components "render" depending on the page we are on.
  const { atHome, atDashboard, atTables } = usePath();
  return (
    <>
      <Head>
        {/* Title of the website  */}
        <title>New Hong Kong</title>
        <link rel="icon" href="/nHK.png" />
        <link rel="apple-touch-icon" href="/nHK.png" />
        <link rel="shortcut icon" href="/nHK.png" />
        {/* Meta for the viewport */}
        <meta
          name="viewport"
          // This makes sure that the viewport is responsive and doesn't zoom in on mobile devices.
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        {/* Main color of the website witch is red. */}
        <meta name="theme-color" content="#E76F51" />
        {/* Description for google. */}
        <meta
          name="description"
          content="Heerlijke Chinees & Indisch eten bij restaurant New Hong Kong in Noordwijkerhout. Eet in het restaurant, haal af of laat eten bezorgen. Ook catering is mogelijk."
        />
        <meta
          name="keywords"
          content="eten, noordwijkerhout, afhaal, chinees, indish, restaurant, catering, bezorgen"
        />
      </Head>
      <div
        className={`flex flex-col min-h-[100.1vh] ${
          atHome ? "bg-main" : "bg-neutral-50"
        }`}
      >
        {!atDashboard && !atHome && !atTables && <Banner />}
        {!atDashboard && !atTables && <Header />}
        <div className="flex-grow">{children}</div>
        {!atHome && !atTables && <Footer />}
      </div>
    </>
  );
};

export default Layout;
