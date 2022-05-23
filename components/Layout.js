import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>New Hong Kong</title>
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1, width=device-width"
        />
        <meta name="theme-color" content="#E76F51" />
        <meta
          name="description"
          content="Heerlijke Chinees & Indisch eten bij restaurant New Hong Kong in Noordwijkerhout. Eet in het restaurant, haal af of laat eten bezorgen. Ook catering is mogelijk."
        />
        <meta
          name="keywords"
          content="eten, noordwijkerhout, afhaal, chinees, indish, restaurant, catering, bezorgen"
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow bg-gray-50">{children}</div>
      </div>
    </>
  );
};

export default Layout;
