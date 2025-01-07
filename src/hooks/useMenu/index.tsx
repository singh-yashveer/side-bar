import React from "react";
import { MenuContext } from "../../components/menu";

export const useMenu = () => {
  const context = React.useContext(MenuContext);
  if (context === undefined) {
    throw new Error("Menu Component is required");
  }

  return context;
};
