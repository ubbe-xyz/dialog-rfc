import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  Children,
  cloneElement,
} from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { useDialogPortal } from "../../hooks";
import { DialogContent } from "./DialogContent";
import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

interface Props extends DivProps {
  ["aria-label"]: string;
  isOpen: boolean;
  onClose: () => void;
}

const Root = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  overflow-y: scroll;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  width: 80%;
  height: auto;
  max-width: 400px;
  max-height: 80vh;
  box-shadow: var(--shadow-lg);
  z-index: 3;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;

export function Dialog({ children, isOpen, onClose }: Props) {
  const $root = useDialogPortal();
  const firstChildRef = useRef<HTMLDivElement>(null);

  const handleKey: KeyboardEventHandler = ({ key }) => {
    if (key === "Escape") onClose();
  };

  useEffect(() => {
    // Wait for the 1st child to mount before focusing on it
    if (isOpen) window.setTimeout(() => firstChildRef?.current?.focus(), 100);
  }, [isOpen]);

  return ReactDOM.createPortal(
    isOpen ? (
      <>
        <Overlay onClick={onClose} />
        <Root>
          {Children.map(children, (child, i) => {
            const currentChild = child as any;
            const allowedChild = [DialogFooter, DialogContent, DialogHeader];

            if (
              !currentChild ||
              typeof currentChild !== "object" ||
              !allowedChild.includes(currentChild.type)
            )
              throw new Error(
                "[Dialog]: the only childs supported by Dialog are: `<Dialog.Header />`, `<Dialog.Content />` and `<Dialog.Footer />`"
              );

            return cloneElement(currentChild, {
              onKeyDown: handleKey,
              ref: i === 0 ? firstChildRef : null,
            });
          })}
        </Root>
      </>
    ) : null,
    $root
  );
}