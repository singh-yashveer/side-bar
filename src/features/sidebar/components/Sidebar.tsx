import React from "react";
import classnames from "classnames";
import { sidebarClasses } from "../../../utils/utilClasses";
import { BREAK_POINTS, SidebarProps } from "../../../types/sidebar.types";
import { StyledBackdrop } from "./StyledBackdrop";
import { StyledSidebar, StyledSidebarContainer } from "./SidebarStyles";
import { SidebarProvider } from "../context/SidebarContext";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";
import { useSidebar } from "../hooks/useSidebar";

export const SidebarInner = React.forwardRef<HTMLHtmlElement, SidebarProps>(
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
        if (["xs", "sm", "md", "lg", "xl"].includes(breakPoint)) {
          return `(max-width: ${BREAK_POINTS[breakPoint]})`;
        }

        return `(max-width: ${breakPoint})`;
      }
      return undefined;
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
      breakpointCallbackFnRef.current?.(!!broken);
    }, [broken]);

    // Use a layout effect to avoid unnecessary re-renders
    React.useLayoutEffect(() => {
      if (sideBarContext && (sideBarContext.broken !== broken || sideBarContext.duration !== duration)) {
        sideBarContext.updateSidebarState({ broken, duration });
      }
    }, [broken, duration, sideBarContext]);

    // Use a ref to track if we've initialized yet
    const initializedRef = React.useRef(false);

    // This effect runs only once after the component mounts
    React.useEffect(() => {
      if (!initializedRef.current && sideBarContext && collapsed !== undefined) {
        sideBarContext.updateSidebarState({
          collapsed: collapsed,
        });
        setMounted(true);
        initializedRef.current = true;
      }
    }, [collapsed, sideBarContext]);

    return (
      <>
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
      </>
    );
  }
);

export const Sidebar = React.forwardRef<HTMLHtmlElement, SidebarProps>((props, ref) => {
  return (
    <SidebarProvider>
      <SidebarInner ref={ref} {...props} />
    </SidebarProvider>
  );
});
