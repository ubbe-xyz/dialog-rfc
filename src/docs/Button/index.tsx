import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium";
  variant?: "primary" | "secondary" | "error";
}

export const Button = styled.button<Props>`
  border-radius: var(--radius);
  cursor: pointer;
  white-space: nowrap;
  font-weight: var(--font-semibold);
  transition: background-color 0.2s ease;
  padding: var(--spacing-xs) var(--spacing-l);

  ${({ size = "medium" }) =>
    size === "small"
      ? css`
          font-size: var(--font-xs);
        `
      : css`
          font-size: var(--font-md);
        `}

  ${({ variant = "primary" }) =>
    variant === "primary"
      ? css`
          color: var(--color-white);
          border: 1px solid var(--color-action);
          background-color: var(--color-action);
          &:hover {
            background-color: var(--color-action-darker);
          }
        `
      : variant === "error"
      ? css`
          color: var(--color-white);
          border: 1px solid var(--color-error);
          background-color: var(--color-error);
          &:hover {
            background-color: var(--color-error-darker);
          }
        `
      : variant === "secondary"
      ? css`
          color: var(--color-neutral-dark);
          border: 1px solid var(--color-neutral);
          background-color: var(--color-white);
        `
      : null}
`;

export const SecondaryButton = (props: Props) => (
  <Button variant="secondary" {...props} />
);
