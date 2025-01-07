import React from "react";
import styled, { CSSObject } from "styled-components";
import { useMenu } from "../../hooks/useMenu";
import { menuClasses } from "../../utils/utilClasses";
import { Ul } from "../../styles/UL";

interface SubMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  open?: boolean;
  openWhenCollapsed?: boolean;
  firstLevel?: boolean;
  collapsed?: boolean;
  defaultOpen?: boolean;
  styles?: CSSObject;
  children?: React.ReactNode;
}

const StyledSubMenuContent = styled.div<SubMenuContentProps>`
  height: 0px;
  overflow: hidden;
  z-index: 999;
  transition: height ${({ duration }) => duration}ms;
  box-sizing: border-box;
  background-color: white;

  ${({ firstLevel, collapsed }) =>
    firstLevel &&
    collapsed &&
    `
     background-color: white;
     box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
     `}

  ${({ defaultOpen }) => defaultOpen && "height: auto;display: block;"}

  ${({ collapsed, firstLevel, openWhenCollapsed }) =>
    collapsed && firstLevel
      ? `
      position: fixed;
      padding-left: 0px;
      width: 200px;
      border-radius: 4px;
      height: auto!important;
      display: block!important;     
      transition: none!important;     
      visibility: ${openWhenCollapsed ? "visible" : "hidden"};
     `
      : `
      position: static!important;
      transform: none!important;
      `};

  ${({ styles }) => styles};
`;

const SubMenuContentFR: React.ForwardRefRenderFunction<HTMLDivElement, SubMenuContentProps> = (
  { children, open, openWhenCollapsed, firstLevel, collapsed, defaultOpen, ...rest },
  ref
) => {
  const { duration } = useMenu();
  const [defaultOpenState] = React.useState(defaultOpen);

  return (
    <StyledSubMenuContent
      data-testid={`${menuClasses.subMenuContent}-test-id`}
      ref={ref}
      firstLevel={firstLevel}
      collapsed={collapsed}
      open={open}
      openWhenCollapsed={openWhenCollapsed}
      duration={duration}
      defaultOpen={defaultOpenState}
      {...rest}
    >
      <Ul>{children}</Ul>
    </StyledSubMenuContent>
  );
};

export const SubMenuContent = React.forwardRef(SubMenuContentFR);
