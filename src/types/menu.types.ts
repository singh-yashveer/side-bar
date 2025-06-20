import { CSSObject } from "styled-components";
import React from "react";

export interface MenuItemStylesParams {
  level: number;
  disabled: boolean;
  active: boolean;
  isSubmenu: boolean;
  open?: boolean;
}

export type ElementStyles = CSSObject | ((params: MenuItemStylesParams) => CSSObject | undefined);

export interface MenuItemStyles {
  root?: ElementStyles;
  button?: ElementStyles;
  label?: ElementStyles;
  prefix?: ElementStyles;
  suffix?: ElementStyles;
  icon?: ElementStyles;
  subMenuContent?: ElementStyles;
  SubMenuExpandIcon?: ElementStyles;
}

export interface RenderExpandIconParams {
  level: number;
  disabled: boolean;
  active: boolean;
  open: boolean;
}

export interface MenuContextProps {
  duration?: number;
  closeOnClick?: boolean;
  menuItemStyles?: MenuItemStyles;
  renderExpandIcon?: (params: RenderExpandIconParams) => React.ReactNode;
}

export interface MenuProps extends MenuContextProps, React.MenuHTMLAttributes<HTMLMenuElement> {
  styles?: CSSObject;
  children?: React.ReactNode;
}

export interface MenuItemProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "prefix"> {
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  component?: string | React.ReactElement;
  styles?: CSSObject;
  children?: React.ReactNode;
}

export interface StyledMenuItemProps extends Pick<MenuItemProps, "styles" | "active" | "disabled"> {
  level: number;
  menuItemStyles?: CSSObject;
  collapsed?: boolean;
  buttonStyles?: CSSObject;
}

export type MenuItemElement = "root" | "button" | "label" | "prefix" | "suffix" | "icon";
