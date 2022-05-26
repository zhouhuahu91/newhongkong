// Import menu provider to wrap around all components.
import { MenuProvider } from "@/hooks/useMenu";
// Import Layout for components that we use on more than one page.
import Layout from "@/components/Layout";
// We import these styles that apply to all pages.
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MenuProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MenuProvider>
  );
}

export default MyApp;
