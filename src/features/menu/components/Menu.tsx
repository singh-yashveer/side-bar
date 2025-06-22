import React from "react";
import classnames from "classnames";
import styled from "styled-components";
import { menuClasses } from "../../../utils/utilClasses";
import { MenuContextProps, MenuProps } from "../../../types/menu.types";
import { MenuContext, LevelContext } from "../context/MenuContext";

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledMenu = styled.nav<Pick<MenuProps, "styles">>`
  &.${menuClasses.root} {
    ${({ styles }) => styles}
  }
`;

const MenuFR: React.ForwardRefRenderFunction<HTMLMenuElement, MenuProps> = (
  { children, className, duration = 300, closeOnClick = false, styles, menuItemStyles, renderExpandIcon, ...rest },
  ref
) => {
  const providerValue = React.useMemo<MenuContextProps>(
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
