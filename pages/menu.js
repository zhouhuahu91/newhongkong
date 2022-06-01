//React imports
import { useState, useEffect } from "react";

// Hook imports
import useI18n from "@/hooks/useI18n";
import { useMenu } from "@/hooks/useMenu";
import uploadData from "../data/uploadData";

const Menu = () => {
  const { data } = useMenu();
  const t = useI18n();

  useEffect(() => {
    uploadData();
  });

  return (
    <div>
      {data.map((category) => {
        return (
          <div key={category.category[t.locale]}>
            {category.category[t.locale]}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
