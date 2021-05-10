import styled from "styled-components";

export const InputText = styled.input.attrs({
  type: "text",
})`
  padding: var(--spacing-s) var(--spacing-l);
  border: 1px solid var(--color-neutral);
  border-radius: var(--radius);
  width: 70%;
  margin-bottom: var(--spacing-md);
`;
