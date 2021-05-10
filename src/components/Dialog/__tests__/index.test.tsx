import React, { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "..";

export function DialogExample() {
  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return (
    <>
      <Dialog.Root />
      <Dialog
        isOpen={visible}
        onClose={close}
        aria-label="dialog-1"
        data-testid="DIALOG_ROOT"
      >
        <Dialog.Trigger onClick={open}>Open dialog</Dialog.Trigger>
        <Dialog.Header
          title="Greetings"
          onClose={close}
          data-testid="DIALOG_HEADER"
        />
        <Dialog.Content data-testid="DIALOG_CONTENT">
          Hello there.
        </Dialog.Content>
        <Dialog.Footer>
          <button onClick={close}>Got it</button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

describe("<Dialog />", () => {
  describe("WHEN is not open", () => {
    beforeEach(() => {
      render(<DialogExample />);
    });

    it("SHOULD just render the trigger with a11y attributes", () => {
      const button = screen.queryByRole("button");

      expect(button).toHaveTextContent("Open dialog");
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-controls", "dialog-1");
    });

    it("SHOULD not render the dialog contents", () => {
      const dialog = screen.queryByTestId("DIALOG_ROOT");
      expect(dialog).toBe(null);
    });

    it("SHOULD not render the dialog overlay", () => {
      const overlay = screen.queryByTestId("DIALOG_OVERLAY");
      expect(overlay).toBe(null);
    });

    describe("WHEN pressing `ENTER` and trigger has focus", () => {
      beforeEach(() => {
        expect(screen.queryByTestId("DIALOG_ROOT")).toBe(null);

        const trigger = screen.getByText("Open dialog");

        trigger.focus();
        fireEvent.keyDown(trigger, { key: "Enter" });
      });

      it("SHOULD open the dialog", () => {
        expect(screen.queryByTestId("DIALOG_ROOT")).not.toBe(null);
      });
    });

    describe("WHEN pressing `SPACE` and trigger has focus", () => {
      beforeEach(() => {
        expect(screen.queryByTestId("DIALOG_ROOT")).toBe(null);

        const trigger = screen.getByText("Open dialog");

        trigger.focus();
        fireEvent.keyDown(trigger, { key: " " });
      });

      it("SHOULD open the dialog", () => {
        expect(screen.queryByTestId("DIALOG_ROOT")).not.toBe(null);
      });
    });
  });

  describe("WHEN is open", () => {
    beforeEach(() => {
      render(<DialogExample />);
      userEvent.click(screen.getByRole("button"));
    });

    it("SHOULD render the dialog content and overlay", () => {
      expect(screen.queryByTestId("DIALOG_ROOT")).not.toBe(null);
      expect(screen.queryByTestId("DIALOG_OVERLAY")).not.toBe(null);
    });

    it("SHOULD link correctly the trigger and content via ARIA", () => {
      expect(screen.queryByText("Open dialog")).toHaveAttribute(
        "aria-controls",
        "dialog-1"
      );
      expect(screen.queryByTestId("DIALOG_ROOT")).toHaveAttribute(
        "aria-label",
        "dialog-1"
      );
    });

    it("SHOULD render the dialog contents", () => {
      expect(screen.queryByText("Greetings")).not.toBe(null);
      expect(screen.queryByText("Close dialog")).not.toBe(null);
      expect(screen.queryByText("Hello there.")).not.toBe(null);
      expect(screen.queryByText("Got it")).not.toBe(null);
    });

    it("SHOULD set focus on the 1st dialog section", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("DIALOG_HEADER")).toHaveFocus();
      });
    });

    describe("WHEN clicking on the overlay", () => {
      beforeEach(() => {
        expect(screen.queryByTestId("DIALOG_ROOT")).not.toBe(null);
        userEvent.click(screen.getByTestId("DIALOG_OVERLAY"));
      });

      it("SHOULD close the dialog", () => {
        expect(screen.queryByTestId("DIALOG_ROOT")).toBe(null);
      });
    });

    describe("WHEN pressing 'x' on the dialog header", () => {
      beforeEach(() => {
        expect(screen.queryByTestId("DIALOG_ROOT")).not.toBe(null);
        userEvent.click(screen.getByText("Close dialog"));
      });

      it("SHOULD close the dialog", () => {
        expect(screen.queryByTestId("DIALOG_ROOT")).toBe(null);
      });
    });

    describe("WHEN pressing `ESC`", () => {
      beforeEach(() => {
        expect(screen.queryByTestId("DIALOG_ROOT")).not.toBe(null);
        fireEvent.keyDown(screen.getByTestId("DIALOG_HEADER"), {
          key: "Escape",
        });
      });

      it("SHOULD close the dialog", () => {
        expect(screen.queryByTestId("DIALOG_ROOT")).toBe(null);
      });
    });

    describe("WHEN navigating through `TAB`", () => {
      it("SHOULD manage focus on dialog contents", async () => {
        expect(screen.queryByTestId("DIALOG_ROOT")).not.toBe(null);

        await waitFor(() => {
          expect(screen.getByTestId("DIALOG_HEADER")).toHaveFocus();
        });

        userEvent.tab();

        expect(screen.queryByText("Close dialog")?.parentElement).toHaveFocus();

        userEvent.tab();

        expect(screen.getByTestId("DIALOG_CONTENT")).toHaveFocus();

        userEvent.tab({ shift: true });
        userEvent.tab({ shift: true });

        expect(screen.getByTestId("DIALOG_HEADER")).toHaveFocus();
      });
    });
  });
});
