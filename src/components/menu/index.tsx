import React from "react";
import classnames from "classnames";
import styled, { CSSObject } from "styled-components";
import { menuClasses } from "../../utils/utilClasses";
import { Ul } from "../../styles/UL";

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

const StyledMenu = styled.nav<Pick<MenuProps, "styles">>`
  &.${menuClasses.root} {
    ${({ styles }) => styles}
  }
`;

export const MenuContext = React.createContext<MenuContextProps | undefined>(undefined);

export const LevelContext = React.createContext<number>(0);

const MenuFR: React.ForwardRefRenderFunction<HTMLMenuElement, MenuProps> = (
  { children, className, duration = 300, closeOnClick = false, styles, menuItemStyles, renderExpandIcon, ...rest },
  ref
) => {
  const providerValue = React.useMemo(
    () => ({ duration, closeOnClick, menuItemStyles, renderExpandIcon }),
    [duration, closeOnClick, menuItemStyles, renderExpandIcon]
  );

  return (
    <MenuContext.Provider value={providerValue}>
      <LevelContext.Provider value={0}>
        <StyledMenu ref={ref} className={classnames(menuClasses.root, className)} styles={styles} {...rest}>
          <Ul>{children}</Ul>
        </StyledMenu>
      </LevelContext.Provider>
    </MenuContext.Provider>
  );
};

export const Menu = React.forwardRef<HTMLMenuElement, MenuProps>(MenuFR);
