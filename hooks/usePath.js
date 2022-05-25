import { useRouter } from "next/router";

// This hooks checks on what page we are on
const usePath = () => {
  const { pathname } = useRouter();
  const home = pathname === "/";
  const menu = pathname === "/menu";
  const contact = pathname === "/contact";
  const catering = pathname === "/catering";
  const dashboard = pathname === "/dashboard";

  return { home, menu, contact, catering, dashboard };
};

export default usePath;
