import React, { useState } from "react";
import styled from "styled-components";
import { Dialog } from "..";
import {
  Button,
  SecondaryButton,
  ExampleBlock,
  InputText,
  Link,
} from "../../../docs";

const ButtonSpacing = styled.div`
  margin: 0 var(--spacing-xs);
  display: inline-block;
`;

function DeleteDialog() {
  const [visible, setVisible] = useState(false);
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <>
      <Dialog
        controlId="delete-2"
        isOpen={visible}
        onClose={closeDialog}
        aria-label="Delete user"
      >
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
    </>
  );
}

function ApplyDialog() {
  const [visible, setVisible] = useState(false);
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <>
      <Dialog
        controlId="apply-changes"
        isOpen={visible}
        onClose={closeDialog}
        aria-label="Apply changes"
      >
        <Dialog.Trigger as={SecondaryButton} onClick={openDialog}>
          Apply changes
        </Dialog.Trigger>
        <Dialog.Header title="Apply changes?" />
        <Dialog.Content>
          This will overwrite all visualizations on connected dashboard widgets.
        </Dialog.Content>
        <Dialog.Footer>
          <div>
            <ButtonSpacing>
              <Button
                variant="secondary"
                size="small"
                onClick={() => closeDialog()}
              >
                Cancel
              </Button>
            </ButtonSpacing>
            <Button
              size="small"
              onClick={() => {
                window.alert("Dashboard visualizations overwriteen.");
                closeDialog();
              }}
            >
              Apply changes
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

function AlertDialog() {
  const [visible, setVisible] = useState(false);
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <>
      <Dialog
        controlId="alert"
        isOpen={visible}
        onClose={closeDialog}
        aria-label="Alert"
      >
        <Dialog.Trigger onClick={openDialog}>Trigger warning</Dialog.Trigger>
        <Dialog.Header title="Alert" onClose={closeDialog} />
        <Dialog.Content>
          Something happened and we need your attention.
        </Dialog.Content>
      </Dialog>
    </>
  );
}

function ContactSupport() {
  const [visible, setVisible] = useState(false);
  const openDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <>
      <Dialog
        controlId="contact-support"
        isOpen={visible}
        onClose={closeDialog}
        aria-label="Contact support"
      >
        <Dialog.Trigger as={Link} onClick={openDialog}>
          Contact support
        </Dialog.Trigger>
        <Dialog.Header title="Contact support" onClose={closeDialog} />
        <Dialog.Content>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <InputText name="e-mail" aria-label="E-mail" placeholder="E-mail" />
            <InputText
              name="subject"
              aria-label="Subject"
              placeholder="Subject"
            />
            <InputText
              name="Message"
              aria-label="Message"
              placeholder="Message"
            />
          </div>
        </Dialog.Content>
        <Dialog.Footer>
          <div>
            <ButtonSpacing>
              <Button
                variant="secondary"
                size="small"
                onClick={() => closeDialog()}
              >
                Cancel
              </Button>
            </ButtonSpacing>
            <Button
              size="small"
              onClick={() => {
                window.alert("Dashboard visualizations overwriteen.");
                closeDialog();
              }}
            >
              Submit
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

export function ComplexExample() {
  return (
    <ExampleBlock>
      <ButtonSpacing>
        <DeleteDialog />
      </ButtonSpacing>
      <ButtonSpacing>
        <ApplyDialog />
      </ButtonSpacing>
      <ButtonSpacing>
        <AlertDialog />
      </ButtonSpacing>
      <ButtonSpacing>
        <ContactSupport />
      </ButtonSpacing>
    </ExampleBlock>
  );
}
