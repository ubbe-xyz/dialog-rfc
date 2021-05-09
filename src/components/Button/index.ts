import React from "react";
import styled from "styled-components";

export const Button = styled.button`
  color: var(--color-text-contrast);
  border: 1px solid var(--color-action);
  background-color: var(--color-action);
  border-radius: var(--radius);
  cursor: pointer;
  white-space: nowrap;
  padding: var(--spacing-xs) var(--spacing-l);
  font-weight: var(--font-semibold);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-action-darker);
  }
`;
