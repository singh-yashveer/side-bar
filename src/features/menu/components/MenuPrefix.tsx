import styled from "styled-components";
import { CSSObject } from "styled-components";

interface MenuPrefixProps {
  className?: string;
  styles?: CSSObject;
  children?: React.ReactNode;
  collapsed?: boolean;
  duration?: number;
  firstLevel?: boolean;
}

export const MenuPrefix = styled.span<MenuPrefixProps>`
  display: flex;
  align-items: center;
  margin-right: 8px;

  ${({ collapsed, firstLevel }) =>
    collapsed && firstLevel
      ? `
    position: absolute;
    opacity: 0;
    visibility: hidden;
  `
      : ""}

  transition: ${({ duration }) => `visibility, opacity, ${duration}ms`};

  ${({ styles }) => styles}
`;
