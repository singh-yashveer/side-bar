import styled from "styled-components";
import { CSSObject } from "styled-components";

interface MenuLabelProps {
  className?: string;
  styles?: CSSObject;
  children?: React.ReactNode;
}

export const MenuLabel = styled.span<MenuLabelProps>`
  flex: 1;
  display: flex;
  ${({ styles }) => styles}
`;
