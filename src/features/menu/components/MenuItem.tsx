import React from "react";
import classnames from "classnames";
import styled from "styled-components";
import { menuClasses } from "../../../utils/utilClasses";
import { MenuItemElement, MenuItemProps, StyledMenuItemProps } from "../../../types/menu.types";
import { MenuAnchor, MenuAnchorStyles } from "../menuAnchor";
import { MenuIcon } from "./MenuIcon";
import { MenuLabel } from "./MenuLabel";
import { MenuPrefix } from "./MenuPrefix";
import { MenuSuffix } from "./MenuSuffix";
import { useMenu } from "../hooks/useMenu";
import { LevelContext } from "../context/MenuContext";

const StyledMenuItem = styled.li<StyledMenuItemProps>`
  width: 100%;
  position: relative;

  ${({ menuItemStyles }) => menuItemStyles};

  ${({ styles }) => styles};

  > .${menuClasses.anchor} {
    ${({ level, disabled, active, collapsed }) =>
      MenuAnchorStyles({
        level,
        disabled,
        active,
        collapsed,
      })};

    ${({ buttonStyles }) => buttonStyles};
  }
`;

export const MenuItemFR: React.ForwardRefRenderFunction<HTMLLIElement, MenuItemProps> = (
  { children, icon, className, prefix, suffix, active = false, disabled = false, component, styles, ...rest },
  ref
) => {
  const level = React.useContext(LevelContext);
  // Don't create a new context on each render - this causes the infinite updates
  const sidebarDefaults = { collapsed: false, toggled: false, duration: 300 };
  const { collapsed = false, duration = 300 } = sidebarDefaults;
  // Get menu styles with fallback for when not in a MenuProvider
  const { menuItemStyles } = useMenu();

  const getMenuItemStyles = (element: MenuItemElement) => {
    if (menuItemStyles) {
      const params = { level, disabled, active, isSubmenu: false };
      const {
        root: rootElStyles,
        button: buttonElStyles,
        label: labelElStyles,
        icon: iconElStyles,
        prefix: prefixElStyles,
        suffix: suffixElStyles,
      } = menuItemStyles;

      switch (element) {
        case "root":
          return typeof rootElStyles === "function" ? rootElStyles(params) : rootElStyles;

        case "button":
          return typeof buttonElStyles === "function" ? buttonElStyles(params) : buttonElStyles;

        case "label":
          return typeof labelElStyles === "function" ? labelElStyles(params) : labelElStyles;

        case "icon":
          return typeof iconElStyles === "function" ? iconElStyles(params) : iconElStyles;

        case "prefix":
          return typeof prefixElStyles === "function" ? prefixElStyles(params) : prefixElStyles;

        case "suffix":
          return typeof suffixElStyles === "function" ? suffixElStyles(params) : suffixElStyles;

        default:
          return undefined;
      }
    }
    return undefined;
  };

  const sharedClasses = {
    [menuClasses.active]: active,
    [menuClasses.disabled]: disabled,
  };

  return (
    <StyledMenuItem
      ref={ref}
      className={classnames(menuClasses.menuItemRoot, sharedClasses, className)}
      menuItemStyles={getMenuItemStyles("root")}
      level={level}
      collapsed={collapsed}
      disabled={disabled}
      active={active}
      buttonStyles={getMenuItemStyles("button")}
      styles={styles}
    >
      <MenuAnchor
        className={classnames(menuClasses.anchor, sharedClasses)}
        data-testid={`${menuClasses.anchor}-test-id`}
        component={component}
        tabIndex={0}
        {...rest}
      >
        {icon && (
          <MenuIcon className={classnames(menuClasses.icon, sharedClasses)} styles={getMenuItemStyles("icon")}>
            {icon}
          </MenuIcon>
        )}

        {prefix && (
          <MenuPrefix
            collapsed={collapsed}
            duration={duration}
            firstLevel={level === 0}
            className={classnames(menuClasses.prefix, sharedClasses)}
            styles={getMenuItemStyles("prefix")}
          >
            {prefix}
          </MenuPrefix>
        )}

        <MenuLabel className={classnames(menuClasses.label, sharedClasses)} styles={getMenuItemStyles("label")}>
          {children}
        </MenuLabel>

        {suffix && (
          <MenuSuffix
            collapsed={collapsed}
            duration={duration}
            firstLevel={level === 0}
            className={classnames(menuClasses.suffix, sharedClasses)}
            styles={getMenuItemStyles("suffix")}
          >
            {suffix}
          </MenuSuffix>
        )}
      </MenuAnchor>
    </StyledMenuItem>
  );
};

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(MenuItemFR);
