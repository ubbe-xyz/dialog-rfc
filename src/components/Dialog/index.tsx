import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Dialog({ children }: Props) {
  return <div>{children}</div>;
}
