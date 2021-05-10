import React, { HTMLAttributes, KeyboardEventHandler, useContext } from "react";
import { Button } from "../../docs";
import { DialogContext } from "./";

type Props = {
  as?: string | ((props: Props) => JSX.Element);
  onClick: () => void;
} & HTMLAttributes<HTMLElement>;

export function DialogTrigger({ as = Button, onClick, ...rest }: Props) {
  const { id, isOpen } = useContext(DialogContext);
  const Tag: any = as;

  const handleKey: KeyboardEventHandler = ({ key }) => {
    console.log(key);
    if (key === "Enter") onClick();
    if (key === " ") onClick();
  };

  return (
    <Tag
      aria-controls={id}
      aria-expanded={isOpen}
      role="button"
      onKeyDown={handleKey}
      onClick={onClick}
      {...rest}
    />
  );
}
