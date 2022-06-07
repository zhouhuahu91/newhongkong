//Provider imports
import { MenuProvider } from "@/hooks/useMenu";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { StoreInfoProvider } from "@/hooks/useStoreInfo";
// Import Layout for components that we use on more than one page.
import Layout from "@/components/Layout";
// We import these styles that apply to all pages.
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StoreInfoProvider>
      <CartProvider>
        <AuthProvider>
          <MenuProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MenuProvider>
        </AuthProvider>
      </CartProvider>
    </StoreInfoProvider>
  );
}

export default MyApp;
