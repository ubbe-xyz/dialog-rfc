import React, { useState } from "react";
import { Dialog } from "..";
import { Button, ExampleBlock } from "../../../docs";

export function BasicExample() {
  const [visible, setVisible] = useState(false);
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <ExampleBlock>
      <Dialog isOpen={visible} onClose={closeDialog} aria-label="Delete user">
        <Dialog.Trigger onClick={openDialog}>Delete user</Dialog.Trigger>
        <Dialog.Header title="Delete user?" onClose={closeDialog} />
        <Dialog.Content>
          This will permanently delete John Doe. This action cannot be undone.
        </Dialog.Content>
        <Dialog.Footer>
          <Button
            size="small"
            variant="error"
            onClick={() => {
              window.alert("User John Doe was deleted.");
              closeDialog();
            }}
          >
            Delete user
          </Button>
        </Dialog.Footer>
      </Dialog>
    </ExampleBlock>
  );
}
