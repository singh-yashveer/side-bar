import React from "react";
import classNames from "classnames";
import { menuClasses } from "../../../utils/utilClasses";
import { MenuContextProps, MenuProps } from "../../../types/menu.types";
import { LevelContext, MenuProvider } from "../context/MenuContext";
import styles from "./Menu.module.css";

const MenuFR: React.ForwardRefRenderFunction<HTMLMenuElement, MenuProps> = (
  { children, className, duration = 300, closeOnClick = false, styles: customStyles, menuItemStyles, renderExpandIcon, ...rest },
  ref
) => {
  const providerValue = React.useMemo<MenuContextProps>(
    () => ({ duration, closeOnClick, menuItemStyles, renderExpandIcon }),
    [duration, closeOnClick, menuItemStyles, renderExpandIcon]
  );

  const menuStyles = {
    ...customStyles,
  };

  return (
    <MenuProvider value={providerValue}>
      <LevelContext.Provider value={0}>
        <nav ref={ref} className={classNames(styles.menu, menuClasses.root, className)} style={menuStyles} {...rest}>
          <ul className={styles.menuList}>{children}</ul>
        </nav>
      </LevelContext.Provider>
    </MenuProvider>
  );
};

export const MenuCssModules = React.forwardRef<HTMLMenuElement, MenuProps>(MenuFR);
