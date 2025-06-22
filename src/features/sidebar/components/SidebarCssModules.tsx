import React from "react";
import classNames from "classnames";
import { sidebarClasses } from "../../../utils/utilClasses";
import { BREAK_POINTS, SidebarProps } from "../../../types/sidebar.types";
import { SidebarProvider } from "../context/SidebarContext";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";
import { useSidebar } from "../hooks/useSidebar";
import styles from "./Sidebar.module.css";

interface BackdropProps {
  "data-testid"?: string;
  className?: string;
  onClick?: () => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  role?: string;
  tabIndex?: number;
  "aria-label"?: string;
}

const Backdrop: React.FC<BackdropProps> = (props) => <div {...props} className={styles.backdrop} />;

export const SidebarInnerCssModules = React.forwardRef<HTMLElement, SidebarProps>(
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
      styles: customStyles,
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
    // Use a ref to track if we've initialized yet
    const initializedRef = React.useRef(false);

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

    // Dynamic styles for width and transitions
    const sidebarStyle: React.CSSProperties = {
      transition: `width, left, right, ${duration}ms`,
      width,
      minWidth: width,
      ...(collapsedValue && {
        width: collapsedWidth,
        minWidth: collapsedWidth,
      }),
      ...(broken && {
        left: `-${collapsedValue ? collapsedWidth : width}`,
      }),
      ...(broken &&
        toggledValue && {
          left: 0,
        }),
      ...customStyles,
    };

    // Container style for background color
    const containerStyle: React.CSSProperties = {
      backgroundColor,
    };

    const sidebarClassNames = classNames(
      styles.sidebar,
      sidebarClasses.root,
      {
        [styles.collapsed]: collapsedValue,
        [sidebarClasses.collapsed]: collapsedValue,
        [styles.broken]: broken,
        [sidebarClasses.broken]: broken,
        [styles.toggled]: toggledValue,
        [sidebarClasses.toggled]: toggledValue,
      },
      className
    );

    const containerClassNames = classNames(styles.container, sidebarClasses.container);

    return (
      <aside
        ref={ref as React.RefObject<HTMLElement>}
        data-testid={`${sidebarClasses.root}-test-id`}
        style={sidebarStyle}
        className={sidebarClassNames}
        {...rest}
      >
        <div data-testid={`${sidebarClasses.container}-test-id`} className={containerClassNames} style={containerStyle}>
          {children}
        </div>

        {broken && toggledValue && (
          <Backdrop
            data-testid={`${sidebarClasses.backdrop}-test-id`}
            role="button"
            tabIndex={0}
            aria-label="backdrop"
            onClick={handleBackdropClick}
            onKeyPress={handleBackdropClick}
          />
        )}
      </aside>
    );
  }
);

export const SidebarCssModules = React.forwardRef<HTMLElement, SidebarProps>((props, ref) => {
  return (
    <SidebarProvider>
      <SidebarInnerCssModules ref={ref} {...props} />
    </SidebarProvider>
  );
});
