//React imports
import { useState, useEffect } from "react";

// Hook imports
import { useMenu } from "@/hooks/useMenu";
import { useAuth } from "@/hooks/useAuth";

const Menu = () => {
  const { data } = useMenu();
  const { user } = useAuth();

  console.log(user);

  return <div>menu</div>;
};

export default Menu;
