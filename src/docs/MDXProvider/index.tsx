import React from "react";
import { MDXProvider as MDXProviderBase } from "@mdx-js/react";
import { CodeBlock } from "../CodeBlock";

type Props = {
  children: React.ReactNode;
};

const components = {
  code: CodeBlock,
};

export function MDXProvider({ children, ...rest }: Props) {
  return (
    <MDXProviderBase components={components} {...rest}>
      {children}
    </MDXProviderBase>
  );
}
