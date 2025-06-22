import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { SidebarContextValue } from "../../../types/sidebar.types";

export const useSidebar = (): SidebarContextValue | undefined => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    console.warn("useSidebar must be used within a SidebarProvider");
  }

  return context;
};
