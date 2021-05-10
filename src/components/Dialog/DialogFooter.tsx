import React, { Children } from "react";
import { Tabbable, TabbableProps } from "reakit/Tabbable";
import styled, { css } from "styled-components";
import { sectionStyles } from "./constants";

interface Props extends TabbableProps {
  children: React.ReactNode;
}

interface SectionProps extends TabbableProps {
  items: number;
}

const Section = styled(Tabbable)<SectionProps>`
  ${sectionStyles}
  display: flex;
  align-items: center;
  ${({ items }) =>
    items <= 1
      ? css`
          justify-content: flex-end;
        `
      : css`
          justify-content: space-around;
        `}
`;

export const DialogFooter = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...rest }, ref) => {
    const childLength = Children.count(children);

    return (
      <Section items={childLength} ref={ref} {...rest}>
        {children}
      </Section>
    );
  }
);
