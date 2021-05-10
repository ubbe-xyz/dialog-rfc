import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  Children,
  cloneElement,
} from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useDialogPortal } from "../../hooks";
import { DialogContent } from "./DialogContent";
import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";
import { DialogTrigger } from "./DialogTrigger";

type DivProps = React.HTMLAttributes<HTMLDivElement>;
type DialogContextType = { isOpen: boolean; id: string };

interface Props extends DivProps {
  ["aria-label"]: string;
  isOpen: boolean;
  onClose: () => void;
  controlId: string;
}

const Root = styled.div`
  position: fixed;
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

Dialog.Trigger = DialogTrigger;
Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
Dialog.Root = () => <div id="dialog-root" />;

export const DialogContext = React.createContext<DialogContextType>({
  isOpen: false,
  id: "dialog",
});

export function Dialog({ children, isOpen, controlId, onClose }: Props) {
  const $root = useDialogPortal();
  const firstChildRef = useRef<HTMLDivElement>(null);
  const dialogChildren = Children.toArray(children);

  const [trigger] = dialogChildren.filter(
    (child: any) => child.type === DialogTrigger
  );

  const sectionChild = dialogChildren.filter(
    (child: any) => child.type !== DialogTrigger
  );

  const handleKey: KeyboardEventHandler = ({ key }) => {
    if (key === "Escape") onClose();
  };

  useEffect(() => {
    // Wait for the 1st child to mount before focusing on it
    if (isOpen) window.setTimeout(() => firstChildRef?.current?.focus(), 100);
  }, [isOpen]);

  return (
    <DialogContext.Provider value={{ isOpen, id: controlId }}>
      {trigger}
      {ReactDOM.createPortal(
        isOpen ? (
          <>
            <Overlay onClick={onClose} />
            <Root>
              {sectionChild.map((child: any, i) => {
                const allowedChild = [
                  DialogFooter,
                  DialogContent,
                  DialogHeader,
                ];

                if (
                  !child ||
                  typeof child !== "object" ||
                  !allowedChild.includes(child.type)
                )
                  throw new Error(
                    "[Dialog]: the only child supported by Dialog are: `<Dialog.Header />`, `<Dialog.Content />` and `<Dialog.Footer />`"
                  );

                return cloneElement(child, {
                  onKeyDown: handleKey,
                  ref: i === 0 ? firstChildRef : null,
                });
              })}
            </Root>
          </>
        ) : null,
        $root
      )}
    </DialogContext.Provider>
  );
}
