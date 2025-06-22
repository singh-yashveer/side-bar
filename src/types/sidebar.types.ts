import { CSSObject } from "styled-components";
import React from "react";

export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl" | "all";

export const BREAK_POINTS = {
  xs: "425px",
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
  all: "all",
};

export interface SidebarState {
  collapsed?: boolean;
  toggled?: boolean;
  broken?: boolean;
  duration?: number;
}

export interface SidebarContextValue extends SidebarState {
  updateSidebarState: (values: Partial<SidebarState>) => void;
  updateCollapseState: () => void;
  updateToggleState: () => void;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLHtmlElement> {
  collapsed?: boolean;
  width?: string;
  collapsedWidth?: string;
  defaultCollapsed?: boolean;
  breakPoint?: BreakPoint;
  customBreakPoint?: string;
  backgroundColor?: string;
  duration?: number;
  image?: string;
  toggled?: boolean;
  onBackdropClick?: () => void;
  onBreakPoint?: (broken: boolean) => void;
  styles?: CSSObject;
  children?: React.ReactNode;
}

export interface StyledSidebarProps extends Omit<SidebarProps, "backgroundColor"> {
  collapsed?: boolean;
  toggled?: boolean;
  broken?: boolean;
}

export interface StyledSidebarContainerProps {
  backgroundColor?: string;
}
