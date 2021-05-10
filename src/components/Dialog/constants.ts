import { css } from "styled-components";

export const sectionStyles = css`
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-neutral);

  &:last-of-type {
    border-bottom: none;
  }

  /* &:focus {
    background-color: var(--color-smoke);
  } */
`;
