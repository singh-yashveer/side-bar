import styled, { CSSObject } from "styled-components";

interface MenuPrefixProps {
  duration?: number;
  firstLevel?: boolean;
  collapsed?: boolean;
  styles?: CSSObject;
}
export const MenuPrefix = styled.span<MenuPrefixProps>`
  margin-right: 5px;
  opacity: ${({ firstLevel, collapsed }) => (firstLevel && collapsed ? "0" : "1")};
  transition: opacity ${({ duration }) => duration}ms;

  ${({ styles }) => styles};
`;
