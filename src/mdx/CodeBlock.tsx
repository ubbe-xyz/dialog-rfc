import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import oceanicNext from "prism-react-renderer/themes/oceanicNext";

type Props = {
  children: string;
};

export function CodeBlock({ children }: Props) {
  return (
    <Highlight
      {...defaultProps}
      code={children}
      theme={oceanicNext}
      language="tsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
