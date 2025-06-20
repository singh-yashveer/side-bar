import React from "react";
import { SidebarContextValue, SidebarState } from "../../../types/sidebar.types";

export const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

interface SidebarProviderProps {
  children?: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [sidebarState, setSidebarState] = React.useState<SidebarState>({
    collapsed: false,
    toggled: false,
    broken: false,
    duration: 300,
  });

  const updateSidebarState = React.useCallback((values: Partial<SidebarState>) => {
    setSidebarState((prevState) => ({ ...prevState, ...values }));
  }, []);

  const updateCollapseState = React.useCallback(() => {
    setSidebarState((prevState) => ({ ...prevState, collapsed: !prevState?.collapsed }));
  }, []);

  const updateToggleState = React.useCallback(() => {
    setSidebarState((prevState) => ({ ...prevState, toggled: !prevState?.toggled }));
  }, []);

  const providerValue = React.useMemo(
    () => ({ ...sidebarState, updateSidebarState, updateCollapseState, updateToggleState }),
    [sidebarState, updateCollapseState, updateSidebarState, updateToggleState]
  );

  return <SidebarContext.Provider value={providerValue}>{children}</SidebarContext.Provider>;
};
