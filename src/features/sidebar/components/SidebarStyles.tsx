import styled from "styled-components";
import { sidebarClasses } from "../../../utils/utilClasses";
import { StyledSidebarContainerProps, StyledSidebarProps } from "../../../types/sidebar.types";

export const StyledSidebar = styled.aside<StyledSidebarProps>`
  position: relative;
  border-right-width: 1px;
  border-right-style: solid;
  border-color: #efefef;

  transition: ${({ duration }) => `width, left, right, ${duration}ms`};

  width: ${({ width }) => width};
  min-width: ${({ width }) => width};

  &.${sidebarClasses.collapsed} {
    width: ${({ collapsedWidth }) => collapsedWidth};
    min-width: ${({ collapsedWidth }) => collapsedWidth};
  }

  &.${sidebarClasses.broken} {
    position: fixed;
    height: 100%;
    top: 0px;
    z-index: 100;
    left: -${(props) => props.width};

    &.${sidebarClasses.collapsed} {
      left: -${(props) => props.collapsedWidth};
    }

    &.${sidebarClasses.toggled} {
      left: 0;
    }
  }

  ${({ styles }) => styles}
`;

export const StyledSidebarContainer = styled.div<StyledSidebarContainerProps>`
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 3;

  ${({ backgroundColor }) => (backgroundColor ? `background-color:${backgroundColor};` : "")}
`;
