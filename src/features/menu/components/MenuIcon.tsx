import styled from "styled-components";
import { CSSObject } from "styled-components";

interface MenuIconProps {
  className?: string;
  styles?: CSSObject;
  children?: React.ReactNode;
}

export const MenuIcon = styled.span<MenuIconProps>`
  display: flex;
  align-items: center;
  margin-right: 16px;
  font-size: 1.25rem;
  ${({ styles }) => styles}
`;
