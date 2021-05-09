import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Hint = styled.span`
  display: block;
  font-size: var(--font-xs);
  margin-bottom: var(--spacing-xs);
  color: var(--color-neutral-darker);
`;

const Wrap = styled.div`
  padding: var(--spacing-md);
  background-color: var(--color-neutral);
  margin-bottom: var(--spacing-l);
`;

export function ExampleBlock({ children }: Props) {
  return (
    <Wrap>
      <Hint>Interactive example</Hint>
      {children}
    </Wrap>
  );
}
