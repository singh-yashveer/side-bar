import styled, { CSSObject } from "styled-components";

interface Separator {
  styles?: CSSObject;
  width?: string;
  height?: string;
  margin?: string;
  color: string;
  opacity?: number | string;
  align?: "left" | "center" | "right";
}

export const Separator = styled.hr<Separator>`
  border: none;
  width: ${({ width }) => width || "100%"};
  margin-top: ${({ margin }) => margin};
  margin-bottom: ${({ margin }) => margin};
  color: ${({ color }) => color || "black"};
  opacity: ${({ opacity }) => opacity || 1};
  height: ${({ height }) => height || "1px"};

  ${({ styles }) => styles};
`;
