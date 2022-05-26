//React imports
import { useState, useEffect } from "react";

// Hook imports
import { useMenu } from "@/hooks/useMenu";

const Menu = () => {
  const { data } = useMenu();

  return <div>menu</div>;
};

export default Menu;
