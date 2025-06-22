import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";
import { MenuContextProps } from "../../../types/menu.types";

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);

  if (context === undefined) {
    console.warn("useMenu must be used within a MenuProvider");
    return {
      closeOnClick: false,
      duration: 300,
      menuItemStyles: undefined,
    };
  }

  return context;
};
