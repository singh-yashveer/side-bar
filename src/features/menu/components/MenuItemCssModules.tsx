import React from "react";
import classNames from "classnames";
import { menuClasses } from "../../../utils/utilClasses";
import { MenuItemProps } from "../../../types/menu.types";
import { LevelContext } from "../context/MenuContext";
import { useMenu } from "../hooks/useMenu";
import styles from "./MenuItem.module.css";

export interface MenuAnchorProps {
  component?: string | React.ReactElement;
  className?: string;
  tabIndex?: number;
  "data-testid"?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  [key: string]: unknown;
}

const MenuAnchor: React.FC<MenuAnchorProps & { children: React.ReactNode }> = ({ component, children, ...rest }) => {
  if (!component || typeof component === "string") {
    return (
      <a href="#" {...rest}>
        {children}
      </a>
    );
  }

  return React.cloneElement(component, { ...rest, children });
};

export const MenuItemFR: React.ForwardRefRenderFunction<HTMLLIElement, MenuItemProps> = (
  { children, icon, className, prefix, suffix, active = false, disabled = false, component, ...rest },
  ref
) => {
  const level = React.useContext(LevelContext);
  // Default values when not inside a sidebar context
  const sidebarDefaults = { collapsed: false, duration: 300 };
  const { collapsed = false, duration = 300 } = sidebarDefaults;
  const { menuItemStyles } = useMenu();

  // Inline styles from menuItemStyles if provided
  const getInlineStyle = (element: string) => {
    if (!menuItemStyles) return {};

    const params = { level, disabled, active, isSubmenu: false };

    switch (element) {
      case "root":
        return typeof menuItemStyles.root === "function" ? menuItemStyles.root(params) : menuItemStyles.root || {};
      case "button":
        return typeof menuItemStyles.button === "function" ? menuItemStyles.button(params) : menuItemStyles.button || {};
      case "label":
        return typeof menuItemStyles.label === "function" ? menuItemStyles.label(params) : menuItemStyles.label || {};
      case "icon":
        return typeof menuItemStyles.icon === "function" ? menuItemStyles.icon(params) : menuItemStyles.icon || {};
      case "prefix":
        return typeof menuItemStyles.prefix === "function" ? menuItemStyles.prefix(params) : menuItemStyles.prefix || {};
      case "suffix":
        return typeof menuItemStyles.suffix === "function" ? menuItemStyles.suffix(params) : menuItemStyles.suffix || {};
      default:
        return {};
    }
  };

  const menuItemClassNames = classNames(
    styles.menuItem,
    menuClasses.menuItemRoot,
    {
      [styles.active]: active,
      [styles.disabled]: disabled,
      [menuClasses.active]: active,
      [menuClasses.disabled]: disabled,
    },
    className
  );

  const anchorClassNames = classNames(styles.anchor, menuClasses.anchor, {
    [styles.active]: active,
    [styles.disabled]: disabled,
  });

  const iconClassNames = classNames(styles.icon, menuClasses.icon, {
    [styles.active]: active,
    [styles.disabled]: disabled,
  });

  const labelClassNames = classNames(styles.label, menuClasses.label, {
    [styles.active]: active,
    [styles.disabled]: disabled,
  });

  const prefixClassNames = classNames(styles.prefix, menuClasses.prefix, {
    [styles.collapsedPrefix]: collapsed && level === 0,
    [styles.active]: active,
    [styles.disabled]: disabled,
  });

  const suffixClassNames = classNames(styles.suffix, menuClasses.suffix, {
    [styles.collapsedSuffix]: collapsed && level === 0,
    [styles.active]: active,
    [styles.disabled]: disabled,
  });

  // Apply padding based on nesting level
  const anchorStyle = {
    paddingLeft: `${level + 1}rem`,
    ...getInlineStyle("button"),
  };

  return (
    <li ref={ref} className={menuItemClassNames} style={getInlineStyle("root")}>
      <MenuAnchor
        className={anchorClassNames}
        data-testid={`${menuClasses.anchor}-test-id`}
        component={component}
        tabIndex={0}
        style={anchorStyle}
        {...rest}
      >
        {icon && (
          <span className={iconClassNames} style={getInlineStyle("icon")}>
            {icon}
          </span>
        )}

        {prefix && (
          <span
            className={prefixClassNames}
            style={{
              transition: `visibility, opacity, ${duration}ms`,
              ...getInlineStyle("prefix"),
            }}
          >
            {prefix}
          </span>
        )}

        <span className={labelClassNames} style={getInlineStyle("label")}>
          {children}
        </span>

        {suffix && (
          <span
            className={suffixClassNames}
            style={{
              transition: `visibility, opacity, ${duration}ms`,
              ...getInlineStyle("suffix"),
            }}
          >
            {suffix}
          </span>
        )}
      </MenuAnchor>
    </li>
  );
};

export const MenuItemCssModules = React.forwardRef<HTMLLIElement, MenuItemProps>(MenuItemFR);
