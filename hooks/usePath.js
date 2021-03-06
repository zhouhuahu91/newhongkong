import { useRouter } from "next/router";

// This hooks checks on what page we are on
const usePath = () => {
  const { pathname } = useRouter();
  const atHome = pathname === "/";
  const atMenu = pathname === "/menu";
  const atContact = pathname === "/contact";
  const atCatering = pathname === "/catering";
  const atDashboard = pathname === "/dashboard";
  const atCheckout = pathname === "/checkout";

  return { atHome, atMenu, atContact, atCatering, atDashboard, atCheckout };
};

export default usePath;
