import styled, { CSSObject } from "styled-components";
interface ExpandIconProps {
  open?: boolean;
}

interface ExpandIconWrapperProps {
  collapsed?: boolean;
  level?: number;
  styles?: CSSObject;
}

export const ExpandIconWrapper = styled.span<ExpandIconWrapperProps>`
  ${({ collapsed, level }) =>
    collapsed &&
    level === 0 &&
    `
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    
      `}
  transition: transform 0.3s ease-in-out;

  ${({ styles }) => styles}
`;

export const ExpandIcon = styled.span<ExpandIconProps>`
  display: inline-block;
  transition: transform 0.3s;
  border-right: 1px solid currentcolor;
  border-bottom: 1px solid currentcolor;
  width: 5px;
  height: 5px;
  transform: rotate(${({ open }) => (open ? "-135deg" : "-45deg")});
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 2px;
`;

export const ExpandIconCollapsed = styled.span`
  width: 4px;
  height: 4px;
  background-color: currentcolor;
  border-radius: 50%;
  display: inline-block;
`;
