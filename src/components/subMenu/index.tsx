import classnames from "classnames";
import { menuClasses } from "../../utils/utilClasses";
import { MenuSuffix } from "../../styles/menuSuffix";
import { MenuLabel } from "../../styles/menuLabel";
import { ExpandIcon, ExpandIconCollapsed, ExpandIconWrapper } from "../../styles/expandIcon";
import { LevelContext } from "../menu";
import React from "react";
import { MenuAnchor, MenuAnchorStyles } from "../menuAnchor";
import { MenuPrefix } from "../../styles/menuPrefix";
import { MenuIcon } from "../../styles/menuIcon";
import styled, { CSSObject } from "styled-components";
import { useMenu } from "../../hooks/useMenu";
import { SubMenuContent } from "../subMenuContent";
import { usePop } from "../../hooks/usePop";
import { SidebarContext } from "../sidebar";

export interface SubMenuProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "prefix"> {
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  active?: boolean;
  disabled?: boolean;
  component?: string | React.ReactElement;
  styles?: CSSObject;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

interface StyledSubMenuProps extends Pick<SubMenuProps, "styles" | "active" | "disabled"> {
  level: number;
  menuItemStyles?: CSSObject;
  collapsed?: boolean;
  buttonStyles?: CSSObject;
}

type MenuItemElement = "root" | "button" | "label" | "prefix" | "suffix" | "icon" | "subMenuContent" | "SubMenuExpandIcon";

const StyledSubMenu = styled.li<StyledSubMenuProps>`
  position: relative;
  width: 100%;

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

export const SubMenuFR: React.ForwardRefRenderFunction<HTMLLIElement, SubMenuProps> = (
  {
    children,
    className,
    label,
    icon,
    title,
    prefix,
    suffix,
    open: openControlled,
    defaultOpen,
    active = false,
    disabled = false,
    styles,
    component,
    onOpenChange,
    onClick,
    onKeyUp,
    ...rest
  },
  ref
) => {
  const level = React.useContext(LevelContext);

  const { collapsed, duration: sidebarTransitionDuration } = React.useContext(SidebarContext);
  const { renderExpandIcon, closeOnClick, menuItemStyles, duration } = useMenu();

  const [open, setOpen] = React.useState(!!defaultOpen);
  const [openWhenCollapsed, setOpenWhenCollapsed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const buttonRef = React.useRef<HTMLAnchorElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  const { popperInstance } = usePop({
    level,
    buttonRef,
    contentRef,
  });

  const expandContent = React.useCallback(() => {
    const target = contentRef.current;
    if (target) {
      const height = target?.querySelector(`.${menuClasses.subMenuContent} > ul`)?.clientHeight;
      target.style.overflow = "hidden";
      target.style.height = `${height}px`;

      timer.current = setTimeout(() => {
        target.style.overflow = "auto";
        target.style.height = "auto";
      }, duration);
    }
  }, [duration]);

  const collapseContent = () => {
    const target = contentRef.current;

    if (target) {
      const height = target?.querySelector(`.${menuClasses.subMenuContent} > ul`)?.clientHeight;
      target.style.overflow = "hidden";
      target.style.height = `${height}px`;
      target.offsetHeight;
      target.style.height = "0px";
    }
  };

  const handleSlideToggle = (): void => {
    if (!(level === 0 && collapsed)) {
      if (typeof openControlled === "undefined") {
        clearTimeout(Number(timer.current));
        open ? collapseContent() : expandContent();
        onOpenChange?.(!open);
        setOpen(!open);
      } else {
        onOpenChange?.(!openControlled);
      }
    }
  };

  React.useEffect(() => {
    if (!(level === 0 && collapsed) && typeof openControlled !== "undefined" && mounted) {
      clearTimeout(Number(timer.current));
      !openControlled ? collapseContent() : expandContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapsed, expandContent, label, level, onOpenChange, openControlled]);

  const handleOnClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onClick?.(event);
    handleSlideToggle();
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    onKeyUp?.(event);
    if (event.key === "Enter") {
      handleSlideToggle();
    }
  };

  const getSubMenuItemStyles = (element: MenuItemElement): CSSObject | undefined => {
    if (menuItemStyles) {
      const params = { level, disabled, active, isSubmenu: true, open: openControlled ?? open };
      const {
        root: rootElStyles,
        button: buttonElStyles,
        label: labelElStyles,
        icon: iconElStyles,
        prefix: prefixElStyles,
        suffix: suffixElStyles,
        subMenuContent: subMenuContentElStyles,
        SubMenuExpandIcon: SubMenuExpandIconElStyles,
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

        case "SubMenuExpandIcon":
          return typeof SubMenuExpandIconElStyles === "function" ? SubMenuExpandIconElStyles(params) : SubMenuExpandIconElStyles;

        case "subMenuContent":
          return typeof subMenuContentElStyles === "function" ? subMenuContentElStyles(params) : subMenuContentElStyles;

        default:
          return undefined;
      }
    }
  };

  React.useEffect(() => {
    setTimeout(() => popperInstance?.update(), sidebarTransitionDuration);
    if (collapsed && level === 0) {
      setOpenWhenCollapsed(false);
    }
  }, [collapsed, level, sidebarTransitionDuration, popperInstance]);

  React.useEffect(() => {
    const handleTogglePopper = (target: Node) => {
      if (!openWhenCollapsed && buttonRef.current?.contains(target)) setOpenWhenCollapsed(true);
      else if (
        (closeOnClick && !(target as HTMLElement).closest(`.${menuClasses.menuItemRoot}`)?.classList.contains(menuClasses.subMenuRoot)) ||
        (!contentRef.current?.contains(target) && openWhenCollapsed)
      ) {
        setOpenWhenCollapsed(false);
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      handleTogglePopper(event.target as Node);
    };

    const handleDocumentKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleTogglePopper(event.target as Node);
      } else if (event.key === "Escape") {
        setOpenWhenCollapsed(false);
      }
    };

    const removeEventListeners = () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keyup", handleDocumentKeyUp);
    };

    removeEventListeners();

    if (collapsed && level === 0) {
      document.addEventListener("click", handleDocumentClick, false);
      document.addEventListener("keyup", handleDocumentKeyUp, false);
    }

    return () => {
      removeEventListeners();
    };
  }, [collapsed, level, closeOnClick, openWhenCollapsed]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const sharedClasses = {
    [menuClasses.active]: active,
    [menuClasses.disabled]: disabled,
    [menuClasses.open]: openControlled ?? open,
  };

  return (
    <StyledSubMenu
      ref={ref}
      className={classnames(menuClasses.menuItemRoot, menuClasses.subMenuRoot, sharedClasses, className)}
      menuItemStyles={getSubMenuItemStyles("root")}
      level={level}
      collapsed={collapsed}
      disabled={disabled}
      active={active}
      buttonStyles={getSubMenuItemStyles("button")}
      styles={styles}
    >
      <MenuAnchor
        data-testid={`${menuClasses.anchor}-test-id`}
        ref={buttonRef}
        title={title}
        className={classnames(menuClasses.anchor, sharedClasses)}
        onClick={handleOnClick}
        onKeyUp={handleOnKeyUp}
        component={component}
        tabIndex={0}
        {...rest}
      >
        {icon && (
          <MenuIcon className={classnames(menuClasses.icon, sharedClasses)} styles={getSubMenuItemStyles("icon")}>
            {icon}
          </MenuIcon>
        )}

        {prefix && (
          <MenuPrefix
            collapsed={collapsed}
            duration={sidebarTransitionDuration}
            firstLevel={level === 0}
            className={classnames(menuClasses.prefix, sharedClasses)}
            styles={getSubMenuItemStyles("prefix")}
          >
            {prefix}
          </MenuPrefix>
        )}

        <MenuLabel className={classnames(menuClasses.label, sharedClasses)} styles={getSubMenuItemStyles("label")}>
          {label}
        </MenuLabel>

        {suffix && (
          <MenuSuffix
            collapsed={collapsed}
            duration={sidebarTransitionDuration}
            firstLevel={level === 0}
            className={classnames(menuClasses.suffix, sharedClasses)}
            styles={getSubMenuItemStyles("suffix")}
          >
            {suffix}
          </MenuSuffix>
        )}

        <ExpandIconWrapper
          className={classnames(menuClasses.SubMenuExpandIcon, sharedClasses)}
          collapsed={collapsed}
          level={level}
          styles={getSubMenuItemStyles("SubMenuExpandIcon")}
        >
          {renderExpandIcon ? (
            renderExpandIcon({
              level,
              disabled,
              active,
              open: openControlled ?? open,
            })
          ) : collapsed && level === 0 ? (
            <ExpandIconCollapsed />
          ) : (
            <ExpandIcon open={openControlled ?? open} />
          )}
        </ExpandIconWrapper>
      </MenuAnchor>

      <SubMenuContent
        ref={contentRef}
        openWhenCollapsed={openWhenCollapsed}
        open={openControlled ?? open}
        firstLevel={level === 0}
        collapsed={collapsed}
        defaultOpen={(openControlled && !mounted) || defaultOpen}
        className={classnames(menuClasses.subMenuContent, sharedClasses)}
        styles={getSubMenuItemStyles("subMenuContent")}
      >
        <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
      </SubMenuContent>
    </StyledSubMenu>
  );
};
export const SubMenu = React.forwardRef<HTMLLIElement, SubMenuProps>(SubMenuFR);
