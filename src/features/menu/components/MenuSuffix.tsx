import styled from "styled-components";
import { CSSObject } from "styled-components";

interface MenuSuffixProps {
  className?: string;
  styles?: CSSObject;
  children?: React.ReactNode;
  collapsed?: boolean;
  duration?: number;
  firstLevel?: boolean;
}

export const MenuSuffix = styled.span<MenuSuffixProps>`
  display: flex;
  align-items: center;
  margin-left: 8px;

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
