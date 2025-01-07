import styled, { CSSObject } from "styled-components";

interface MenuSuffixProps {
  firstLevel?: boolean;
  collapsed?: boolean;
  duration?: number;
  styles?: CSSObject;
}

export const MenuSuffix = styled.span<MenuSuffixProps>`
  margin-right: 5px;
  margin-left: 5px;
  opacity: ${({ firstLevel, collapsed }) => (firstLevel && collapsed ? "0" : "1")};
  transition: opacity ${({ duration }) => duration}ms;

  ${({ styles }) => styles};
`;
