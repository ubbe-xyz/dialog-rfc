import React from "react";
import { MDXProvider } from "./mdx";
import { Wrapper } from "./components";
/* eslint-disable import/no-webpack-loader-syntax */
// @ts-ignore
import DialogExample from "!babel-loader!@mdx-js/loader!./components/Dialog/example.mdx";

export function App() {
  return (
    <MDXProvider>
      <Wrapper>
        <DialogExample />
      </Wrapper>
    </MDXProvider>
  );
}
