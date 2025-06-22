import React from "react";
import { MenuContextProps } from "../../../types/menu.types";

export const MenuContext = React.createContext<MenuContextProps | undefined>(undefined);

export const LevelContext = React.createContext<number>(0);

interface MenuProviderProps {
  children: React.ReactNode;
  value: MenuContextProps;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children, value }) => {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
