import React from "react";
import { Tabbable, TabbableProps } from "reakit/Tabbable";
import styled from "styled-components";
import { sectionStyles } from "./constants";

interface Props extends TabbableProps {
  children: React.ReactNode;
}

const Section = styled(Tabbable)`
  ${sectionStyles}
  min-height: 3.5rem;
`;

export const DialogContent = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...rest }, ref) => {
    return (
      <Section ref={ref} {...rest}>
        {children}
      </Section>
    );
  }
);
