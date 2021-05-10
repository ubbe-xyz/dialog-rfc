import { useEffect } from "react";

const $dialog = document.createElement("div");

export function useDialogPortal() {
  useEffect(() => {
    const root = document.getElementById("dialog-root");

    if (!root)
      throw new Error(
        "[Dialog]: Trying to render a dialog without specifying its root: <div id='dialog-root' />"
      );

    root.appendChild($dialog);
    return () => {
      root.removeChild($dialog);
    };
  }, []);

  return $dialog;
}
