import classNames from "classnames";
import React from "react";

interface MenuAnchorProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "prefix"> {
  component?: string | React.ReactElement;
  children?: React.ReactNode;
}

interface MenuAnchorStylesProps {
  level: number;
  collapsed?: boolean;
  disabled?: boolean;
  active?: boolean;
}

export const MenuAnchorStyles = (props: MenuAnchorStylesProps) => {
  const { level, collapsed, disabled, active } = props;

  return `
    display: flex;
    align-items: center;
    height: 40px;
    text-decoration: none;
    color: inherit;
    box-sizing: border-box;
    cursor: pointer;
    padding-right: 16px;
    padding-left: ${level === 0 ? 16 : (collapsed ? level : level + 1) * 16}px;
          
    &:hover {
      background-color: #f3f3f3;
    }

    &:hover {
      .uix-submenu-expand-icon {
        transform: translateX(5px);
      }
    }

    ${
      disabled &&
      ` 
      pointer-events: none;
      cursor: default;
      color:#adadad;
        `
    }

    ${active && "background-color: #e2eef9;"}

  `;
};

export const MenuAnchorRef: React.ForwardRefRenderFunction<HTMLAnchorElement, MenuAnchorProps> = (
  { className, component, children, ...rest },
  ref
) => {
  if (component) {
    if (typeof component === "string") {
      return React.createElement(
        component,
        {
          className: classNames(className),
          ...rest,
          ref,
        },
        children
      );
    } else {
      const { className: classNameProp, ...props } = component.props;

      return React.cloneElement(
        component,
        {
          className: classNames(className, classNameProp),
          ...rest,
          ...props,
          ref,
        },
        children
      );
    }
  } else {
    return (
      <a ref={ref} className={classNames(className)} {...rest}>
        {children}
      </a>
    );
  }
};

export const MenuAnchor = React.forwardRef<HTMLAnchorElement, MenuAnchorProps>(MenuAnchorRef);
