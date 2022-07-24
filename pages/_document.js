import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/nHK.png" />
          <link rel="apple-touch-icon" href="/nHK.png" />
          <link rel="shortcut icon" href="/nHK.png" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          {/* Link for Poppins font. */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
