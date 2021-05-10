import React from "react";
import { Tabbable, TabbableProps } from "reakit/Tabbable";
import styled from "styled-components";
import { sectionStyles } from "./constants";

interface Props extends TabbableProps {
  title: string;
  onClose?: () => void;
}

const Section = styled(Tabbable)`
  ${sectionStyles}
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: var(--font-sm);
`;

const CloseButton = styled.button`
  cursor: pointer;
  padding: 0 var(--spacing-xs);
  border: none;
  background: transparent;
  display: flex;
`;

const CloseIcon = (
  <>
    <span id="icon-label" hidden>
      Close dialog
    </span>
    <svg
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 64 64"
      width="14"
      height="14"
    >
      <path
        d="M35.4,32l19.9-19.9c1-1,1-2.4,0-3.4s-2.4-1-3.4,0L32,28.6L12,8.8c-0.9-1-2.4-1-3.3,0s-1,2.4,0,3.4L28.6,32L8.7,51.9
	c-1,1-1,2.4,0,3.4c0.5,0.4,1,0.7,1.7,0.7s1.2-0.2,1.7-0.7l20-19.9l20,19.8c0.5,0.4,1.2,0.7,1.7,0.7c0.5,0,1.2-0.2,1.7-0.7
	c1-1,1-2.4,0-3.4L35.4,32z"
      />
    </svg>
  </>
);

export const DialogHeader = React.forwardRef<HTMLDivElement, Props>(
  ({ title, onClose, ...rest }, ref) => {
    return (
      <Section ref={ref} {...rest}>
        <Title>{title}</Title>
        {onClose && (
          <CloseButton aria-labelledby="icon-label" onClick={onClose}>
            {CloseIcon}
          </CloseButton>
        )}
      </Section>
    );
  }
);
