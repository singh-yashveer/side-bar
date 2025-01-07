import styled, { CSSObject } from "styled-components";
import { sidebarClasses } from "../../utils/utilClasses";
import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useSidebar } from "../../hooks/useSidebar";
import classnames from "classnames";
import { StyledBackdrop } from "../../styles/backdrop";

type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl" | "all";

const BREAK_POINTS = {
  xs: "425px",
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
  all: "all",
};

export interface SidebarProps extends React.HTMLAttributes<HTMLHtmlElement> {
  collapsed?: boolean;
  width?: string;
  collapsedWidth?: string;
  defaultCollapsed?: boolean;
  breakPoint?: BreakPoint;
  customBreakPoint?: string;
  backgroundColor?: string;
  duration?: number;
  image?: string;
  toggled?: boolean;
  onBackdropClick?: () => void;
  onBreakPoint?: (broken: boolean) => void;
  styles?: CSSObject;
  children?: React.ReactNode;
}

interface StyledSidebarProps extends Omit<SidebarProps, "backgroundColor"> {
  collapsed?: boolean;
  toggled?: boolean;
  broken?: boolean;
}

type StyledSidebarContainerProps = Pick<SidebarProps, "backgroundColor">;

const StyledSidebar = styled.aside<StyledSidebarProps>`
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

const StyledSidebarContainer = styled.div<StyledSidebarContainerProps>`
  position: relative;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 3;

  ${({ backgroundColor }) => (backgroundColor ? `background-color:${backgroundColor};` : "")}
`;

interface SidebarContextProps {
  collapsed?: boolean;
  toggled?: boolean;
  duration?: number;
}

export const SidebarContext = React.createContext<SidebarContextProps>({
  collapsed: false,
  toggled: false,
  duration: 300,
});

export const Sidebar = React.forwardRef<HTMLHtmlElement, SidebarProps>(
  (
    {
      collapsed,
      toggled,
      onBackdropClick,
      onBreakPoint,
      width = "256px",
      collapsedWidth = "80px",
      className,
      children,
      breakPoint,
      customBreakPoint,
      backgroundColor = "rgb(249, 249, 249, 1)",
      duration = 300,
      styles,
      ...rest
    },
    ref
  ) => {
    const getBreakpointValue = () => {
      if (customBreakPoint) {
        return `(max-width: ${customBreakPoint})`;
      }

      if (breakPoint) {
        if (["xs", "sm", "md", "lg", "xl", "xxl"].includes(breakPoint)) {
          return `(max-width: ${BREAK_POINTS[breakPoint]})`;
        }

        return `(max-width: ${breakPoint})`;
      }
    };

    const breakpointCallbackFnRef = React.useRef<(broken: boolean) => void>();

    breakpointCallbackFnRef.current = (broken: boolean) => {
      onBreakPoint?.(broken);
    };

    const broken = useMediaQuery(getBreakpointValue());

    const [mounted, setMounted] = React.useState(false);

    const sideBarContext = useSidebar();

    const collapsedValue = collapsed ?? (!mounted && collapsed ? true : sideBarContext?.collapsed);
    const toggledValue = toggled ?? sideBarContext?.toggled;

    const handleBackdropClick = () => {
      onBackdropClick?.();
      sideBarContext?.updateSidebarState({ toggled: false });
    };

    React.useEffect(() => {
      breakpointCallbackFnRef.current?.(broken);
    }, [broken]);

    React.useEffect(() => {
      sideBarContext?.updateSidebarState({ broken, duration });

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [broken, sideBarContext?.updateSidebarState, duration]);

    React.useEffect(() => {
      if (!mounted) {
        sideBarContext?.updateSidebarState({
          collapsed: collapsed,
        });
        setMounted(true);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collapsed, mounted, sideBarContext?.updateSidebarState]);

    return (
      <SidebarContext.Provider value={{ collapsed: collapsedValue, toggled: toggledValue }}>
        <StyledSidebar
          ref={ref}
          data-testid={`${sidebarClasses.root}-test-id`}
          styles={styles}
          width={width}
          collapsedWidth={collapsedWidth}
          duration={duration}
          className={classnames(
            sidebarClasses.root,
            {
              [sidebarClasses.collapsed]: collapsedValue,
              [sidebarClasses.toggled]: toggledValue,
              [sidebarClasses.broken]: broken,
            },
            className
          )}
          {...rest}
        >
          <StyledSidebarContainer
            data-testid={`${sidebarClasses.container}-test-id`}
            className={sidebarClasses.container}
            backgroundColor={backgroundColor}
          >
            {children}
          </StyledSidebarContainer>

          {broken && toggledValue && (
            <StyledBackdrop
              data-testid={`${sidebarClasses.backdrop}-test-id`}
              role="button"
              tabIndex={0}
              aria-label="backdrop"
              onClick={handleBackdropClick}
              onKeyPress={handleBackdropClick}
              className={sidebarClasses.backdrop}
            />
          )}
        </StyledSidebar>
      </SidebarContext.Provider>
    );
  }
);
