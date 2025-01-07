import { useContext } from "react";
import { SidebarContext, SidebarContextProps } from "../../components/sidebarContext";

export const useSidebar = (): SidebarContextProps | undefined => {
  const context = useContext(SidebarContext);

  return context;
};
