import React from "react";
import { CSSObject } from "styled-components";

interface MenuAnchorProps {
  component?: string | React.ReactElement;
  className?: string;
  children?: React.ReactNode;
  tabIndex?: number;
  "data-testid"?: string;
  [key: string]: unknown;
}

interface MenuAnchorStyleProps {
  level: number;
  disabled?: boolean;
  active?: boolean;
  collapsed?: boolean;
}

export const MenuAnchorStyles = ({ level, disabled, active }: MenuAnchorStyleProps): CSSObject => {
  return {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    position: "relative",
    padding: ".75rem 1rem",
    color: "#44596e",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    backgroundColor: active ? "#e6f4ff" : "",
    fontWeight: active ? 600 : 400,
    paddingLeft: `${level + 1}rem`,
  };
};

export const MenuAnchor: React.FC<MenuAnchorProps> = ({ component, children, ...rest }) => {
  const renderComponent = () => {
    if (!component || typeof component === "string") {
      return (
        <a href="#" {...rest}>
          {children}
        </a>
      );
    }

    return React.cloneElement(component, { ...rest, children });
  };

  return renderComponent();
};
