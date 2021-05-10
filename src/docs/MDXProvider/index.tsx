import React from "react";
import { MDXProvider as MDXProviderBase } from "@mdx-js/react";
import { CodeBlock, Heading2 } from "../";

type Props = {
  children: React.ReactNode;
};

const components = {
  h2: Heading2,
  code: CodeBlock,
};

export function MDXProvider({ children, ...rest }: Props) {
  return (
    <MDXProviderBase components={components} {...rest}>
      {children}
    </MDXProviderBase>
  );
}
